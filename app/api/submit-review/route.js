import { NextResponse } from 'next/server';

const GHL_BASE    = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

const REVIEW_FIELDS = {
  nxa_review_text:         'NXA Review Text',
  nxa_review_rating:       'NXA Review Rating',
  nxa_review_company:      'NXA Review Company',
  nxa_review_display_name: 'NXA Review Display Name',
  nxa_review_approved:     'NXA Review Approved',
};

let reviewFieldCache = null;

function ghlHeaders(pitKey) {
  return {
    Authorization: `Bearer ${pitKey}`,
    Version: GHL_VERSION,
    'Content-Type': 'application/json',
  };
}

function buildDisplayName(name = '') {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

async function ensureReviewFields(pitKey, locationId) {
  if (reviewFieldCache) return reviewFieldCache;

  const res = await fetch(
    `${GHL_BASE}/locations/${locationId}/customFields?model=contact`,
    { headers: ghlHeaders(pitKey) }
  );
  if (!res.ok) throw new Error(`Custom fields GET failed: ${res.status}`);

  const data = await res.json();
  const existing = data.customFields ?? [];
  const existingMap = {};
  for (const f of existing) {
    const key = f.fieldKey?.replace(/^contact\./, '') ?? '';
    if (key) existingMap[key] = f.id;
  }

  const ids = {};
  for (const [key, name] of Object.entries(REVIEW_FIELDS)) {
    if (existingMap[key]) {
      ids[key] = existingMap[key];
    } else {
      try {
        const cr = await fetch(`${GHL_BASE}/locations/${locationId}/customFields`, {
          method: 'POST',
          headers: ghlHeaders(pitKey),
          body: JSON.stringify({ name, dataType: 'TEXT', model: 'contact' }),
        });
        const created = await cr.json();
        ids[key] = created.customField?.id ?? created.id;
      } catch (e) {
        console.warn(`Could not create review field ${key}:`, e.message);
      }
    }
  }

  reviewFieldCache = ids;
  return ids;
}

async function addContactNote(pitKey, contactId, reviewText, rating, company) {
  const body = `Review submitted (${rating}/5 stars)\nCompany: ${company || 'N/A'}\n\n"${reviewText}"`;
  await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
    method: 'POST',
    headers: ghlHeaders(pitKey),
    body: JSON.stringify({ body, userId: '' }),
  });
}

export async function POST(request) {
  try {
    const { name, email, company, rating, reviewText } = await request.json();

    if (!email || !name || !rating || !reviewText) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const pitKey     = process.env.GHL_PIT_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!pitKey || !locationId) {
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const ratingNum = parseInt(rating, 10);
    const approved  = ratingNum >= 4;
    const displayName = buildDisplayName(name);

    // ── 1. Upsert contact ──────────────────────────────────────────────────
    const tags = ['nxa-review', ...(approved ? ['nxa-review-approved'] : [])];

    const upsertRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: 'POST',
      headers: ghlHeaders(pitKey),
      body: JSON.stringify({
        locationId,
        email,
        firstName: name.split(' ')[0] ?? name,
        lastName: name.split(' ').slice(1).join(' ') || '',
        companyName: company || '',
        tags,
      }),
    });

    if (!upsertRes.ok) {
      const text = await upsertRes.text();
      throw new Error(`GHL upsert failed ${upsertRes.status}: ${text}`);
    }

    const upsertData = await upsertRes.json();
    const contactId  = upsertData.contact?.id ?? upsertData.id;
    if (!contactId) throw new Error('No contactId returned from GHL');

    console.log('✓ Review contact upserted:', contactId);

    // ── 2. Ensure review custom fields + update them ───────────────────────
    try {
      const fieldIds = await ensureReviewFields(pitKey, locationId);
      const customFields = [
        { id: fieldIds.nxa_review_text,         field_value: reviewText },
        { id: fieldIds.nxa_review_rating,       field_value: String(ratingNum) },
        { id: fieldIds.nxa_review_company,      field_value: company || '' },
        { id: fieldIds.nxa_review_display_name, field_value: displayName },
        { id: fieldIds.nxa_review_approved,     field_value: approved ? 'true' : 'false' },
      ].filter(f => f.id);

      if (customFields.length) {
        await fetch(`${GHL_BASE}/contacts/${contactId}`, {
          method: 'PUT',
          headers: ghlHeaders(pitKey),
          body: JSON.stringify({ customFields }),
        });
        console.log('✓ Review custom fields updated');
      }
    } catch (e) {
      console.warn('Review custom fields skipped:', e.message);
    }

    // ── 3. Add note to contact ─────────────────────────────────────────────
    try {
      await addContactNote(pitKey, contactId, reviewText, ratingNum, company);
      console.log('✓ Review note added');
    } catch (e) {
      console.warn('Review note skipped:', e.message);
    }

    return NextResponse.json({ success: true, approved, displayName });
  } catch (err) {
    console.error('submit-review fatal:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
