import { NextResponse } from 'next/server';

export const maxDuration = 45;

const GHL_BASE    = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

const INDUSTRY_LABELS = {
  'real-estate':  'Real Estate',
  'home-services':'Home Services',
  'medical':      'Medical Practice',
  'dental':       'Dental Practice',
  'law-firms':    'Law Firm',
  'insurance':    'Insurance Agency',
  'med-spa':      'Medical Spa',
};

function ghlHeaders(pitKey) {
  return {
    Authorization: `Bearer ${pitKey}`,
    Version:       GHL_VERSION,
    'Content-Type':'application/json',
  };
}

function normalizeDomain(raw) {
  let d = raw.trim().replace(/^https?:\/\//i, '').replace(/\/$/, '');
  return `https://${d}`;
}

async function fetchWithTimeout(url, opts = {}, ms = 7000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
}

async function fetchDomainData(domain) {
  const baseUrl = normalizeDomain(domain);

  const [homeRes, robotsRes, llmsRes] = await Promise.allSettled([
    fetchWithTimeout(baseUrl, { headers: { 'User-Agent': 'NxtApexAIScanner/1.0' } }),
    fetchWithTimeout(`${baseUrl}/robots.txt`),
    fetchWithTimeout(`${baseUrl}/llms.txt`),
  ]);

  let title = '', description = '', h1 = '', hasSchema = false, bodyText = '';
  let blocksCrawlers = false;
  let hasLlmsTxt = false;

  if (homeRes.status === 'fulfilled' && homeRes.value.ok) {
    const html = await homeRes.value.text();
    const titleMatch   = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch    = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i)
                      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description/i);
    const h1Match      = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    const schemaMatch  = html.includes('"@type"') || html.includes("'@type'") || html.includes('application/ld+json');

    title       = titleMatch?.[1]?.trim()  ?? '';
    description = descMatch?.[1]?.trim()   ?? '';
    h1          = h1Match?.[1]?.trim()     ?? '';
    hasSchema   = schemaMatch;
    bodyText    = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 1000);
  }

  if (robotsRes.status === 'fulfilled' && robotsRes.value.ok) {
    const robotsTxt = await robotsRes.value.text();
    const aiCrawlers = ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'anthropic-ai', 'CCBot', 'Googlebot-Extended'];
    blocksCrawlers = aiCrawlers.some(bot => {
      const pattern = new RegExp(`User-agent:\\s*${bot}[\\s\\S]*?Disallow:\\s*\\/`, 'i');
      return pattern.test(robotsTxt);
    });
  }

  if (llmsRes.status === 'fulfilled' && llmsRes.value.ok) {
    hasLlmsTxt = true;
  }

  return { baseUrl, title, description, h1, hasSchema, blocksCrawlers, hasLlmsTxt, bodyText };
}

async function analyzeWithClaude(domainData, businessName, city, industry, anthropicKey) {
  const industryLabel = INDUSTRY_LABELS[industry] ?? industry;

  const prompt = `You are an AI visibility analyst. Analyze this website data and return a JSON response.

Business: ${businessName}
City: ${city}
Industry: ${industryLabel}
Domain: ${domainData.baseUrl}

Website Data:
- Title: ${domainData.title || 'Not found'}
- Meta description: ${domainData.description || 'Not found'}
- H1: ${domainData.h1 || 'Not found'}
- Has schema markup: ${domainData.hasSchema}
- Has llms.txt file: ${domainData.hasLlmsTxt}
- AI crawlers blocked in robots.txt: ${domainData.blocksCrawlers}
- Page content preview: ${domainData.bodyText.slice(0, 400) || 'Could not load'}

SCORING RULES:
- crawlability: 100 if no AI crawlers blocked. Deduct 60 if major AI crawlers are blocked.
- structuredData: 80 if schema found, 20 if not. Bonus 10 if specific local business schema likely.
- contentClarity: Score 0-100 based on how clearly title/desc/h1 communicate the business type and location.
- citations: Estimate 40-70 based on industry. Cannot verify live but give a realistic starting estimate.
- localAuthority: Estimate 30-60 based on whether city/location is mentioned in visible content.
- aiReadiness: 100 if has llms.txt, 60-80 if has schema and clear content, 20-40 if neither.
- Overall score: weighted average (crawlability 20%, structuredData 20%, contentClarity 20%, citations 15%, localAuthority 10%, aiReadiness 15%).

COMPETITOR RULES:
List 3 businesses or brands known for strong ${industryLabel} AI search presence in markets like ${city}. Use your knowledge of well-known regional or national players. If you cannot name specific local competitors, name the types of businesses that dominate.

Return ONLY valid JSON, no markdown, nothing else:
{
  "overallScore": <0-100 integer>,
  "grade": <"A" | "B" | "C" | "D" | "F">,
  "categories": {
    "crawlability": <0-100>,
    "structuredData": <0-100>,
    "contentClarity": <0-100>,
    "citations": <0-100>,
    "localAuthority": <0-100>,
    "aiReadiness": <0-100>
  },
  "topFindings": [
    {"issue": "<one specific finding about their site>", "impact": "high"},
    {"issue": "<second finding>", "impact": "medium"},
    {"issue": "<third finding>", "impact": "medium"}
  ],
  "competitors": [
    "<competitor or type 1>",
    "<competitor or type 2>",
    "<competitor or type 3>"
  ],
  "headline": "<One sentence stating the most critical AI visibility gap. No dashes. Plain language.>"
}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1200,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error('Claude API error:', res.status);
      return null;
    }

    const data = await res.json();
    const raw = data.content?.[0]?.text ?? '';
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('Claude analysis failed:', err.message);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function upsertGHLContact(pitKey, locationId, businessName, city, domain, email, industry) {
  const nameParts = businessName.trim().split(/\s+/);
  const firstName = nameParts[0];
  const lastName  = nameParts.slice(1).join(' ') || '';

  const res = await fetch(`${GHL_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: ghlHeaders(pitKey),
    body: JSON.stringify({
      locationId,
      email,
      firstName,
      lastName,
      companyName: businessName,
      tags: ['ai-scan-pending', 'ai-visibility-scan', `aeo-${industry}`],
      customFields: [],
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`GHL upsert failed ${res.status}: ${t}`);
  }

  const data = await res.json();
  return data.contact?.id ?? data.id ?? null;
}

async function updateGHLContact(pitKey, locationId, contactId, analysis, businessName, city, domain, industry) {
  const note = [
    `AI Visibility Scan — ${new Date().toLocaleDateString()}`,
    `Business: ${businessName} | City: ${city} | Industry: ${industry}`,
    `Domain: ${domain}`,
    `Overall Score: ${analysis?.overallScore ?? 'N/A'}/100 (${analysis?.grade ?? 'N/A'})`,
    '',
    `Key Finding: ${analysis?.headline ?? 'See full report'}`,
    '',
    `Competitors in AI search: ${(analysis?.competitors ?? []).join(', ')}`,
    '',
    'Status: ai-scan-pending — full report being processed locally.',
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

function buildPartialReportEmail(businessName, city, domain, industry, analysis) {
  const industryLabel = INDUSTRY_LABELS[industry] ?? industry;
  const score = analysis?.overallScore ?? 0;
  const grade = analysis?.grade ?? 'N/A';
  const headline = analysis?.headline ?? 'No data found.';
  const competitors = analysis?.competitors ?? [];
  const cats = analysis?.categories ?? {};

  const gradeColor = score >= 70 ? '#22c55e' : score >= 45 ? '#f59e0b' : '#ef4444';
  const gradeLabel = score >= 70 ? 'Good' : score >= 45 ? 'Needs Work' : 'Critical';

  const catBar = (label, val) => {
    const pct = Math.round(val ?? 0);
    const col = pct >= 70 ? '#22c55e' : pct >= 45 ? '#f59e0b' : '#ef4444';
    return `
    <tr>
      <td style="padding:6px 0;font-size:12px;color:rgba(255,255,255,0.5);width:140px;vertical-align:middle;">${label}</td>
      <td style="padding:6px 0;vertical-align:middle;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="background:rgba(255,255,255,0.07);border-radius:4px;height:6px;overflow:hidden;">
            <div style="width:${pct}%;height:6px;background:${col};border-radius:4px;"></div>
          </td>
          <td style="width:36px;text-align:right;font-size:11px;font-weight:700;color:${col};padding-left:8px;">${pct}</td>
        </tr></table>
      </td>
    </tr>`;
  };

  const compRow = (name, i) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
        <span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:rgba(198,166,44,0.15);border:1px solid rgba(198,166,44,0.3);text-align:center;line-height:20px;font-size:10px;font-weight:700;color:#C6A62C;margin-right:10px;">${i + 1}</span>
        <span style="font-size:13px;color:rgba(255,255,255,0.7);">${name}</span>
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI Visibility Report — ${businessName}</title></head>
<body style="margin:0;padding:0;background:#f4f4f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f0;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#060A18;border-radius:16px 16px 0 0;padding:32px 36px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-size:18px;font-weight:900;letter-spacing:-0.02em;color:#fff;">NXT APEX</span>
                <span style="font-size:11px;font-weight:700;color:#C6A62C;margin-left:6px;letter-spacing:0.1em;text-transform:uppercase;">AI</span>
              </td>
              <td align="right">
                <span style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.12em;">AI Visibility Report</span>
              </td>
            </tr>
          </table>
          <div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.07);">
            <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.3);">${industryLabel}</p>
            <p style="margin:0;font-size:26px;font-weight:900;color:#fff;line-height:1.2;">${businessName}</p>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.35);">${city} &nbsp;·&nbsp; ${domain}</p>
          </div>
        </td></tr>

        <!-- Score -->
        <tr><td style="background:#080D1C;padding:28px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;width:120px;">
                <div style="width:96px;height:96px;border-radius:50%;background:rgba(255,255,255,0.04);border:3px solid ${gradeColor};display:flex;align-items:center;justify-content:center;text-align:center;padding:16px;box-sizing:border-box;">
                  <div>
                    <div style="font-size:32px;font-weight:900;color:${gradeColor};line-height:1;">${score}</div>
                    <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.35);margin-top:2px;">/ 100</div>
                  </div>
                </div>
              </td>
              <td style="padding-left:20px;vertical-align:middle;">
                <p style="margin:0 0 4px;font-size:20px;font-weight:900;color:#fff;">Grade: ${grade}</p>
                <span style="display:inline-block;background:${gradeColor};color:#000;font-size:10px;font-weight:700;padding:3px 10px;border-radius:999px;text-transform:uppercase;letter-spacing:0.08em;">${gradeLabel}</span>
                <p style="margin:10px 0 0;font-size:13px;color:rgba(255,255,255,0.5);line-height:1.6;">${headline}</p>
              </td>
            </tr>
          </table>

          <!-- Category scores -->
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.07);">
            <p style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Score Breakdown</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${catBar('AI Crawler Access', cats.crawlability)}
              ${catBar('Structured Data', cats.structuredData)}
              ${catBar('Content Clarity', cats.contentClarity)}
              ${catBar('Citations', cats.citations)}
              ${catBar('Local Authority', cats.localAuthority)}
              ${catBar('AI Readiness', cats.aiReadiness)}
            </table>
          </div>

          <!-- Competitors -->
          ${competitors.length ? `
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.07);">
            <p style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Who Is Winning AI Search Right Now</p>
            <p style="margin:0 0 12px;font-size:12px;color:rgba(255,255,255,0.35);">These businesses are currently appearing when ${industryLabel.toLowerCase()} clients ask AI engines for recommendations in your market.</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${competitors.map(compRow).join('')}
            </table>
          </div>` : ''}

          <!-- Full report hook -->
          <div style="margin-top:24px;background:#0F1629;border-radius:12px;padding:20px 24px;border:1px solid rgba(198,166,44,0.15);">
            <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#C6A62C;">Your full AI Visibility Report is ready.</p>
            <p style="margin:0 0 14px;font-size:13px;color:rgba(255,255,255,0.55);line-height:1.6;">The complete report includes your detailed findings, specific page-level fixes ranked by impact, and a full competitive breakdown. We walk through it together on a free 30-minute call.</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center">
                <a href="https://api.leadconnectorhq.com/widget/booking/nxtapexai"
                   style="display:inline-block;background:#C6A62C;color:#000;font-size:14px;font-weight:700;padding:12px 28px;border-radius:10px;text-decoration:none;">
                  Book Your Free Strategy Call →
                </a>
              </td></tr>
            </table>
            <p style="margin:10px 0 0;text-align:center;font-size:11px;color:rgba(255,255,255,0.25);">30 minutes. No pitch. We walk through your report together.</p>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#060A18;border-radius:0 0 16px 16px;padding:20px 36px;border-top:1px solid rgba(255,255,255,0.06);">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0 0 3px;font-size:12px;color:rgba(255,255,255,0.4);">(504) 290-4780 &nbsp;·&nbsp; sean@nxtapexai.com</p>
                <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);">nxtapexai.com</p>
              </td>
              <td align="right" valign="middle">
                <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.2);">© 2026 Nxt Apex AI</p>
              </td>
            </tr>
          </table>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

async function sendPartialEmail(pitKey, locationId, contactId, email, businessName, analysis, city, domain, industry) {
  const subject = `Your AI Visibility Report — ${businessName}`;
  const html = buildPartialReportEmail(businessName, city, domain, industry, analysis);

  const conversationId = await getOrCreateConversation(pitKey, locationId, contactId);

  const payload = {
    type: 'Email',
    contactId,
    subject,
    html,
    emailTo: email,
    ...(conversationId ? { conversationId } : {}),
  };

  const res = await fetch(`${GHL_BASE}/conversations/messages`, {
    method: 'POST',
    headers: ghlHeaders(pitKey),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const t = await res.text();
    console.error('Email send failed:', res.status, t);
  } else {
    console.log('✓ Partial report email sent to', email);
  }
}

async function notifyOwner(pitKey, locationId, businessName, city, domain, email, industry, analysis, contactId) {
  const OWNER_EMAIL = 'sean@nxtapexai.com';
  const industryLabel = INDUSTRY_LABELS[industry] ?? industry;
  const score = analysis?.overallScore ?? 'N/A';
  const grade = analysis?.grade ?? 'N/A';
  const ghlLink = `https://app.gohighlevel.com/v2/location/${locationId}/contacts/detail/${contactId}`;

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

    const html = `<!DOCTYPE html><html><body style="margin:0;padding:24px;background:#060A18;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;">
        <tr><td style="background:#C6A62C;border-radius:10px 10px 0 0;padding:16px 24px;">
          <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#000;">New AI Scan Lead</p>
          <p style="margin:4px 0 0;font-size:20px;font-weight:900;color:#000;">${businessName}</p>
        </td></tr>
        <tr><td style="background:#0D1220;border-radius:0 0 10px 10px;padding:20px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:18px;background:#060A18;border-radius:8px;padding:14px 16px;">
            <tr><td style="padding:4px 0;font-size:12px;color:rgba(255,255,255,0.4);width:90px;">Email</td><td style="font-size:12px;color:#fff;font-weight:600;">${email}</td></tr>
            <tr><td style="padding:4px 0;font-size:12px;color:rgba(255,255,255,0.4);">City</td><td style="font-size:12px;color:#fff;">${city}</td></tr>
            <tr><td style="padding:4px 0;font-size:12px;color:rgba(255,255,255,0.4);">Domain</td><td style="font-size:12px;color:#fff;">${domain}</td></tr>
            <tr><td style="padding:4px 0;font-size:12px;color:rgba(255,255,255,0.4);">Industry</td><td style="font-size:12px;color:#fff;">${industryLabel}</td></tr>
            <tr><td style="padding:4px 0;font-size:12px;color:rgba(255,255,255,0.4);">Score</td><td style="font-size:14px;color:#C6A62C;font-weight:700;">${score}/100 (${grade})</td></tr>
          </table>
          <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.3);">Key Finding</p>
          <p style="margin:0 0 18px;font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;">${analysis?.headline ?? 'Pending full analysis.'}</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <a href="${ghlLink}" style="display:inline-block;background:#C6A62C;color:#000;font-size:13px;font-weight:700;padding:10px 22px;border-radius:8px;text-decoration:none;">View in GHL →</a>
            </td></tr>
          </table>
          <p style="margin:12px 0 0;text-align:center;font-size:11px;color:rgba(255,255,255,0.2);">Full report being generated — check GHL for Drive link when ready.</p>
        </td></tr>
      </table>
    </body></html>`;

    await fetch(`${GHL_BASE}/conversations/messages`, {
      method: 'POST',
      headers: ghlHeaders(pitKey),
      body: JSON.stringify({
        type: 'Email',
        contactId: ownerContactId,
        subject: `New AI Scan: ${businessName} — Score ${score}/100`,
        html,
        emailTo: OWNER_EMAIL,
        ...(ownerConvId ? { conversationId: ownerConvId } : {}),
      }),
    });

    console.log('✓ Owner notification sent');
  } catch (err) {
    console.warn('Owner notification failed:', err.message);
  }
}

export async function POST(request) {
  try {
    const { businessName, city, domain, email, industry } = await request.json();

    if (!businessName || !city || !domain || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const pitKey       = process.env.GHL_PIT_KEY;
    const locationId   = process.env.GHL_LOCATION_ID;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!pitKey || !locationId) {
      console.error('Missing GHL env vars');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    console.log(`AI Visibility Scan: ${businessName} | ${city} | ${domain}`);

    // ── 1. Fetch domain data ────────────────────────────────────────────────
    let domainData = { baseUrl: normalizeDomain(domain), title: '', description: '', h1: '', hasSchema: false, blocksCrawlers: false, hasLlmsTxt: false, bodyText: '' };
    try {
      domainData = await fetchDomainData(domain);
      console.log('✓ Domain data fetched');
    } catch (e) {
      console.warn('Domain fetch partial:', e.message);
    }

    // ── 2. Claude analysis (optional) ──────────────────────────────────────
    let analysis = null;
    if (anthropicKey) {
      try {
        analysis = await analyzeWithClaude(domainData, businessName, city, industry ?? 'general', anthropicKey);
        console.log('✓ Claude analysis complete, score:', analysis?.overallScore);
      } catch (e) {
        console.warn('Claude analysis skipped:', e.message);
      }
    }

    // Fallback analysis if Claude unavailable or failed
    if (!analysis) {
      const fallbackScore = domainData.hasSchema ? 38 : 22;
      analysis = {
        overallScore: fallbackScore,
        grade: 'D',
        categories: {
          crawlability: domainData.blocksCrawlers ? 20 : 80,
          structuredData: domainData.hasSchema ? 70 : 20,
          contentClarity: domainData.title ? 45 : 20,
          citations: 40,
          localAuthority: 35,
          aiReadiness: domainData.hasLlmsTxt ? 90 : 25,
        },
        topFindings: [
          { issue: 'No AI visibility analysis was possible at this time.', impact: 'high' },
        ],
        competitors: [],
        headline: 'We could not fully analyze your domain at this time. Book a call for a manual review.',
      };
    }

    // ── 3. Upsert GHL contact ───────────────────────────────────────────────
    const contactId = await upsertGHLContact(pitKey, locationId, businessName, city, domain, email, industry ?? 'general');
    if (!contactId) {
      return NextResponse.json({ error: 'Could not create contact' }, { status: 500 });
    }
    console.log('✓ GHL contact upserted:', contactId);

    // ── 4. Add note to GHL contact ──────────────────────────────────────────
    await updateGHLContact(pitKey, locationId, contactId, analysis, businessName, city, domain, industry ?? 'general');

    // ── 5. Send partial email to lead ───────────────────────────────────────
    try {
      await sendPartialEmail(pitKey, locationId, contactId, email, businessName, analysis, city, domain, industry ?? 'general');
    } catch (e) {
      console.error('Partial email failed:', e.message);
    }

    // ── 6. Notify owner (fire and forget) ──────────────────────────────────
    notifyOwner(pitKey, locationId, businessName, city, domain, email, industry ?? 'general', analysis, contactId)
      .catch(e => console.warn('Owner notify skipped:', e.message));

    return NextResponse.json({ success: true, score: analysis.overallScore, grade: analysis.grade });
  } catch (err) {
    console.error('ai-visibility-scan fatal:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
