import { NextResponse } from 'next/server';

const GHL_BASE    = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

function ghlHeaders(pitKey) {
  return {
    Authorization: `Bearer ${pitKey}`,
    Version: GHL_VERSION,
    'Content-Type': 'application/json',
  };
}

export async function GET() {
  try {
    const pitKey     = process.env.GHL_PIT_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!pitKey || !locationId) {
      return NextResponse.json({ reviews: [] });
    }

    // Fetch contacts tagged as approved reviews
    const res = await fetch(
      `${GHL_BASE}/contacts/?locationId=${locationId}&tags=nxa-review-approved&limit=50`,
      { headers: ghlHeaders(pitKey) }
    );

    if (!res.ok) {
      console.error('GHL reviews fetch failed:', res.status);
      return NextResponse.json({ reviews: [] });
    }

    const data = await res.json();
    const contacts = data.contacts ?? [];

    const reviews = contacts
      .map(c => {
        const fields = {};
        for (const f of c.customFields ?? []) {
          fields[f.fieldKey?.replace(/^contact\./, '') ?? f.id] = f.value;
        }

        const rating = parseInt(fields.nxa_review_rating ?? '0', 10);
        const text   = fields.nxa_review_text ?? '';
        const displayName = fields.nxa_review_display_name ?? '';
        const company = fields.nxa_review_company ?? '';

        if (!text || !displayName) return null;

        return { name: displayName, company, rating, quote: text };
      })
      .filter(Boolean);

    return NextResponse.json({ reviews }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } });
  } catch (err) {
    console.error('reviews GET fatal:', err.message);
    return NextResponse.json({ reviews: [] });
  }
}
