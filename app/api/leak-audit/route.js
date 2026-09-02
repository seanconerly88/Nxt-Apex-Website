import { NextResponse } from 'next/server';

const GHL_BASE    = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';
const OWNER_EMAIL  = 'sean@nxtapexai.com';

function ghlHeaders(pitKey) {
  return {
    Authorization: `Bearer ${pitKey}`,
    Version:       GHL_VERSION,
    'Content-Type':'application/json',
  };
}

async function upsertContact(pitKey, locationId, { businessName, email, phone, revenueRange, leadVolume, followUp }) {
  const nameParts = businessName.trim().split(/\s+/);
  const firstName = nameParts[0];
  const lastName  = nameParts.slice(1).join(' ') || '';

  const res = await fetch(`${GHL_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: ghlHeaders(pitKey),
    body: JSON.stringify({
      locationId,
      email,
      phone,
      firstName,
      lastName,
      companyName: businessName,
      tags: ['leak-audit-lead', 'meta-ads-funnel', 'stop-the-leaks'],
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`GHL upsert failed ${res.status}: ${t}`);
  }

  const data = await res.json();
  return data.contact?.id ?? data.id ?? null;
}

async function addNote(pitKey, locationId, contactId, { businessName, revenueRange, leadVolume, followUp }) {
  const note = [
    `Pipeline Leak Audit qualifier — ${new Date().toLocaleDateString()}`,
    `Business: ${businessName}`,
    `Monthly revenue: ${revenueRange}`,
    `Monthly lead volume: ${leadVolume}`,
    `What happens after a lead goes quiet: ${followUp}`,
    '',
    'Source: /stop-the-leaks (Meta ads funnel)',
  ].join('\n');

  try {
    await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: ghlHeaders(pitKey),
      body: JSON.stringify({ body: note, userId: '' }),
    });
  } catch (e) {
    console.warn('GHL note skipped:', e.message);
  }
}

async function getOrCreateConversation(pitKey, locationId, contactId) {
  try {
    const searchRes = await fetch(
      `${GHL_BASE}/conversations/search?locationId=${locationId}&contactId=${contactId}`,
      { headers: ghlHeaders(pitKey) }
    );
    const searchData = await searchRes.json();
    if (searchData.conversations?.[0]?.id) return searchData.conversations[0].id;
  } catch (e) {
    console.warn('Conversation search skipped:', e.message);
  }

  try {
    const createRes = await fetch(`${GHL_BASE}/conversations`, {
      method: 'POST',
      headers: ghlHeaders(pitKey),
      body: JSON.stringify({ locationId, contactId }),
    });
    const createData = await createRes.json();
    return createData.conversation?.id ?? createData.id ?? null;
  } catch (e) {
    console.warn('Conversation create skipped:', e.message);
    return null;
  }
}

async function notifyOwner(pitKey, locationId, contactId, { businessName, email, phone, revenueRange, leadVolume, followUp }) {
  try {
    const ownerUpsert = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: 'POST',
      headers: ghlHeaders(pitKey),
      body: JSON.stringify({ locationId, email: OWNER_EMAIL }),
    });
    const ownerData = await ownerUpsert.json();
    const ownerContactId = ownerData.contact?.id ?? ownerData.id;
    if (!ownerContactId) return;

    const ownerConvId = await getOrCreateConversation(pitKey, locationId, ownerContactId);
    const ghlLink = `https://app.gohighlevel.com/v2/location/${locationId}/contacts/detail/${contactId}`;

    const html = `<!DOCTYPE html><html><body style="margin:0;padding:24px;background:#060A18;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;">
        <tr><td style="background:#C6A62C;border-radius:10px 10px 0 0;padding:16px 24px;">
          <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#000;">New Leak Audit Lead</p>
          <p style="margin:4px 0 0;font-size:20px;font-weight:900;color:#000;">${businessName}</p>
        </td></tr>
        <tr><td style="background:#0D1220;border-radius:0 0 10px 10px;padding:20px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:18px;background:#060A18;border-radius:8px;padding:14px 16px;">
            <tr><td style="padding:4px 0;font-size:12px;color:rgba(255,255,255,0.4);width:110px;">Email</td><td style="font-size:12px;color:#fff;font-weight:600;">${email}</td></tr>
            <tr><td style="padding:4px 0;font-size:12px;color:rgba(255,255,255,0.4);">Phone</td><td style="font-size:12px;color:#fff;">${phone}</td></tr>
            <tr><td style="padding:4px 0;font-size:12px;color:rgba(255,255,255,0.4);">Revenue</td><td style="font-size:12px;color:#fff;">${revenueRange}</td></tr>
            <tr><td style="padding:4px 0;font-size:12px;color:rgba(255,255,255,0.4);">Lead volume</td><td style="font-size:12px;color:#fff;">${leadVolume}</td></tr>
            <tr><td style="padding:4px 0;font-size:12px;color:rgba(255,255,255,0.4);">Follow-up today</td><td style="font-size:12px;color:#fff;">${followUp}</td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <a href="${ghlLink}" style="display:inline-block;background:#C6A62C;color:#000;font-size:13px;font-weight:700;padding:10px 22px;border-radius:8px;text-decoration:none;">View in GHL →</a>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body></html>`;

    await fetch(`${GHL_BASE}/conversations/messages`, {
      method: 'POST',
      headers: ghlHeaders(pitKey),
      body: JSON.stringify({
        type: 'Email',
        contactId: ownerContactId,
        subject: `New Leak Audit Lead: ${businessName}`,
        html,
        emailTo: OWNER_EMAIL,
        ...(ownerConvId ? { conversationId: ownerConvId } : {}),
      }),
    });
  } catch (err) {
    console.warn('Owner notification failed:', err.message);
  }
}

export async function POST(request) {
  try {
    const { businessName, email, phone, revenueRange, leadVolume, followUp } = await request.json();

    if (!businessName || !email || !phone || !revenueRange || !leadVolume || !followUp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const pitKey     = process.env.GHL_PIT_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!pitKey || !locationId) {
      console.error('Missing GHL env vars');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const answers = { businessName, email, phone, revenueRange, leadVolume, followUp };

    const contactId = await upsertContact(pitKey, locationId, answers);
    if (!contactId) {
      return NextResponse.json({ error: 'Could not create contact' }, { status: 500 });
    }

    await addNote(pitKey, locationId, contactId, answers);
    notifyOwner(pitKey, locationId, contactId, answers).catch(e => console.warn('Owner notify skipped:', e.message));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('leak-audit fatal:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
