import { NextResponse } from 'next/server';

const GHL_BASE    = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';
const CUSTOM_VALUE_NAME = 'NXA Approved Reviews';

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
    if (!pitKey || !locationId) return NextResponse.json({ reviews: [] });

    const res = await fetch(
      `${GHL_BASE}/locations/${locationId}/customValues`,
      { headers: ghlHeaders(pitKey) }
    );

    if (!res.ok) return NextResponse.json({ reviews: [] });

    const data   = await res.json();
    const values = data.customValues ?? [];
    const entry  = values.find(v => v.name === CUSTOM_VALUE_NAME);
    if (!entry?.value) return NextResponse.json({ reviews: [] });

    const reviews = JSON.parse(entry.value);
    return NextResponse.json(
      { reviews },
      { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } }
    );
  } catch (err) {
    console.error('GET /api/reviews:', err.message);
    return NextResponse.json({ reviews: [] });
  }
}
