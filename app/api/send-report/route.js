import { NextResponse } from 'next/server';

const GHL_BASE    = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

// ─── Tool display names ───────────────────────────────────────────────────────
const TOOL_NAMES = {
  hubspot:    'HubSpot',
  salesforce: 'Salesforce',
  ghl:        'GoHighLevel',
  pipedrive:  'Pipedrive',
  slack:      'Slack',
  notion:     'Notion',
  drive:      'Google Drive',
  asana:      'Asana',
  monday:     'Monday.com',
  clickup:    'ClickUp',
  airtable:   'Airtable',
  zapier:     'Zapier',
  zoom:       'Zoom',
  teams:      'Microsoft Teams',
  quickbooks: 'QuickBooks',
  gmail:      'Gmail',
  calendly:   'Calendly',
  loom:       'Loom',
};

const AI_LABELS = {
  chatgpt: 'ChatGPT (OpenAI)',
  claude:  'Claude (Anthropic)',
  both:    'Claude and ChatGPT',
  neither: 'no AI tool yet',
};

// ─── Module-level GHL field cache ─────────────────────────────────────────────
let fieldCache = null;

const REQUIRED_FIELDS = {
  quick_win_1_title:      'Quick Win 1 Title',
  quick_win_1_body:       'Quick Win 1 Body',
  quick_win_1_connection: 'Quick Win 1 Connection',
  quick_win_2_title:      'Quick Win 2 Title',
  quick_win_2_body:       'Quick Win 2 Body',
  quick_win_2_connection: 'Quick Win 2 Connection',
  nxa_biz_type:           'NXA Biz Type',
  nxa_ai_tool:            'NXA AI Tool',
  nxa_selected_tools:     'NXA Selected Tools',
  nxa_pain_point:         'NXA Pain Point',
};

// ─── GHL helpers ──────────────────────────────────────────────────────────────
function ghlHeaders(pitKey) {
  return {
    Authorization: `Bearer ${pitKey}`,
    Version: GHL_VERSION,
    'Content-Type': 'application/json',
  };
}

async function ensureCustomFields(pitKey, locationId) {
  if (fieldCache) return fieldCache;

  const res = await fetch(
    `${GHL_BASE}/locations/${locationId}/customFields?model=contact`,
    { headers: ghlHeaders(pitKey) }
  );
  const data = await res.json();
  const existing = data.customFields ?? [];

  const existingMap = {};
  for (const f of existing) {
    const key = f.fieldKey?.replace(/^contact\./, '') ?? f.name?.toLowerCase().replace(/\s+/g, '_');
    existingMap[key] = f.id;
  }

  const ids = {};
  for (const [key, name] of Object.entries(REQUIRED_FIELDS)) {
    if (existingMap[key]) {
      ids[key] = existingMap[key];
    } else {
      const createRes = await fetch(`${GHL_BASE}/locations/${locationId}/customFields`, {
        method: 'POST',
        headers: ghlHeaders(pitKey),
        body: JSON.stringify({ name, dataType: 'TEXT', model: 'contact' }),
      });
      const created = await createRes.json();
      ids[key] = created.customField?.id ?? created.id;
    }
  }

  fieldCache = ids;
  return ids;
}

async function upsertContact(pitKey, locationId, email, solutions, bizType, aiTool, selectedTools, painPoint, fieldIds) {
  const customFields = [
    { id: fieldIds.quick_win_1_title,      field_value: solutions[0]?.title ?? '' },
    { id: fieldIds.quick_win_1_body,       field_value: solutions[0]?.body ?? '' },
    { id: fieldIds.quick_win_1_connection, field_value: solutions[0]?.connection ?? '' },
    { id: fieldIds.quick_win_2_title,      field_value: solutions[1]?.title ?? '' },
    { id: fieldIds.quick_win_2_body,       field_value: solutions[1]?.body ?? '' },
    { id: fieldIds.quick_win_2_connection, field_value: solutions[1]?.connection ?? '' },
    { id: fieldIds.nxa_biz_type,           field_value: bizType ?? '' },
    { id: fieldIds.nxa_ai_tool,            field_value: aiTool ?? '' },
    { id: fieldIds.nxa_selected_tools,     field_value: Array.isArray(selectedTools) ? selectedTools.join(', ') : '' },
    { id: fieldIds.nxa_pain_point,         field_value: painPoint ?? '' },
  ].filter(f => f.id);

  const tags = [
    'Website Lead',
    'AI Readiness Report',
    aiTool ?? 'no-ai-tool',
    ...(Array.isArray(selectedTools) ? selectedTools : []),
  ].filter(Boolean);

  const res = await fetch(`${GHL_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: ghlHeaders(pitKey),
    body: JSON.stringify({ locationId, email, tags, customFields }),
  });

  const data = await res.json();
  return data.contact?.id ?? data.id;
}

async function sendEmail(pitKey, contactId, subject, html) {
  const res = await fetch(`${GHL_BASE}/conversations/messages`, {
    method: 'POST',
    headers: ghlHeaders(pitKey),
    body: JSON.stringify({ type: 'Email', contactId, subject, html }),
  });
  return res.ok;
}

// ─── Claude AI report generation ─────────────────────────────────────────────
async function generateReportContent(solutions, bizType, aiTool, selectedTools, painPoint, anthropicKey) {
  const toolList  = (selectedTools ?? []).map(id => TOOL_NAMES[id] ?? id).join(', ');
  const aiLabel   = AI_LABELS[aiTool] ?? 'AI tools';
  const s1 = solutions[0] ?? {};
  const s2 = solutions[1] ?? {};

  const prompt = `You are a senior AI implementation consultant at Nxt Apex AI. A business owner just completed our AI readiness assessment. Write their personalized AI Readiness Report. Two opportunities. Make them read it and think "WE NEED THAT."

WHO THEY ARE:
- Business type: ${bizType ?? 'Not specified'}
- AI tool they use or want: ${aiLabel}
- Tools in their stack: ${toolList || 'Not specified'}
- The problem costing them most right now: "${painPoint ?? 'General operations'}"
- Opportunity 1: ${s1.connection ?? 'AI + Their Stack'}
- Opportunity 2: ${s2.connection ?? 'AI + Their Stack'}

HARD RULES. BREAK ANY OF THESE AND THE CONTENT FAILS:
1. Never use dashes of any kind. No em dash. No en dash. No hyphen used as a dash. Write a new sentence instead.
2. Write at a 9th grade reading level. Short sentences. Plain words. If a 14-year-old would not understand a word, replace it.
3. Never use these words: leverage, utilize, streamline, seamlessly, cutting-edge, robust, ecosystem, synergy, empower, revolutionize, transformative, innovative, game-changer, implement, facilitate.
4. No bullet points inside the body text. Full sentences only.
5. Every paragraph must answer "so what does this mean for my business?" Plain English. Real outcomes.
6. The hook must name a problem they feel every single day. Not a general problem. Their specific problem.
7. The "This week" action must be something they can do in under 2 hours with tools they already have. Name the exact steps.

WHAT MAKES IT LAND:
- Talk about real people at their company doing real work. "Your sales rep." "The person who builds the weekly report." "Your hiring manager."
- Name specific features of their tools. Not just "HubSpot." Say "HubSpot contact records" or "HubSpot sequences."
- Show the before and after. What their day looks like now vs. what it looks like when this is set up.
- Name the failure pattern. Tell them why most companies try this and quit. That builds more trust than any claim you can make.
- End on a business outcome they can feel. Revenue. Time. Fewer fires. Better hires. Not "efficiency gains."

Return ONLY valid JSON. No markdown. No explanation. No text before or after the JSON:
{
  "solution1": {
    "title": "Short title. What they get. Not what the tool does. No dashes.",
    "connection": "${s1.connection ?? ''}",
    "hook": "One sentence. The exact problem they live with right now. Make them nod.",
    "body": "Three paragraphs separated by two newlines. Para 1: what is happening at their company right now that is costing them. Para 2: exactly how this works with their specific tools, step by step, no jargon. Para 3: why most teams fail at this and what is different when it actually works.",
    "extraSentences": "Two sentences only. Go deeper on the business value. What does their team get back? What becomes possible that was not possible before? No dashes. Plain words.",
    "blueprint": "Step 1 label > Step 2 label > Step 3 label (each step is 2 to 4 words, plain English, no dashes, shows the setup sequence from zero to working)",
    "thisWeek": "One action. Under 2 hours. Exact steps using their actual tools. No dashes.",
    "tags": ["short tag", "short tag", "short tag"]
  },
  "solution2": {
    "title": "...",
    "connection": "${s2.connection ?? ''}",
    "hook": "...",
    "body": "...",
    "extraSentences": "...",
    "blueprint": "Step 1 label > Step 2 label > Step 3 label",
    "thisWeek": "...",
    "tags": ["short tag", "short tag", "short tag"]
  }
}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const res = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error('Claude API error:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const raw = data.content?.[0]?.text ?? '';

    // Strip markdown fences if Claude included them despite instructions
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('generateReportContent failed:', err.message);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── HTML Email Template ──────────────────────────────────────────────────────
function buildEmailHTML(s1, s2, aiTool, painPoint) {
  const aiLabel = { chatgpt: 'ChatGPT', claude: 'Claude', both: 'Claude and ChatGPT', neither: null }[aiTool] ?? null;

  const bizLabel = bizType ? ` ${bizType.toLowerCase()} business` : ' business';
  const aiLabel2 = aiLabel ?? 'AI';
  const openingSentence = `Thank you for taking the time to check out Nxt Apex. The two opportunities below are built around your specific tools and the problem your team is dealing with right now. Think of this as your starting point — a real look at where ${aiLabel2} fits in your${bizLabel} and what to actually do about it.`;

  const introLine = aiLabel && painPoint
    ? `You're investing in ${aiLabel} and your team's biggest friction is <strong style="color:#C6A62C;">${painPoint.toLowerCase()}</strong>. Here's exactly where that changes and what to do about it this week.`
    : aiLabel
    ? `You're investing in ${aiLabel}. Here's exactly where it creates the most impact in your stack and what to do about it this week.`
    : `Here's where AI creates the most immediate, measurable impact in your business and what to do about it this week.`;

  const tagPill = (tag) =>
    `<span style="display:inline-block;background:#C6A62C;color:#000;font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;margin:2px 3px 2px 0;letter-spacing:0.05em;">${tag}</span>`;

  // Convert double newlines to paragraph breaks for the body text
  const formatBody = (text = '') =>
    text.split(/\n\n+/).map(p =>
      `<p style="margin:0 0 12px;font-size:14px;color:rgba(255,255,255,0.65);line-height:1.7;">${p.trim()}</p>`
    ).join('');

  const solutionCard = (sol) => `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td style="border-left:3px solid #C6A62C;background:#0F1629;border-radius:12px;padding:24px 26px;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#C6A62C;">${sol.connection ?? ''}</p>
          <p style="margin:0 0 12px;font-size:18px;font-weight:700;color:#ffffff;line-height:1.3;">${sol.title ?? ''}</p>
          <p style="margin:0 0 16px;font-size:15px;font-style:italic;color:rgba(255,255,255,0.5);line-height:1.6;border-left:2px solid rgba(198,166,44,0.4);padding-left:12px;">${sol.hook ?? ''}</p>
          ${formatBody(sol.body)}
          ${sol.extraSentences ? `<p style="margin:0 0 16px;font-size:14px;color:rgba(255,255,255,0.75);line-height:1.7;">${sol.extraSentences}</p>` : ''}
          ${sol.blueprint ? `
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 20px;">
            <tr>
              <td style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px 16px;">
                <p style="margin:0 0 5px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);">How to set it up</p>
                <p style="margin:0;font-size:13px;font-weight:600;color:#C6A62C;line-height:1.5;">${sol.blueprint}</p>
              </td>
            </tr>
          </table>` : ''}
          ${sol.thisWeek ? `
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px;">
            <tr>
              <td style="background:rgba(198,166,44,0.1);border:1px solid rgba(198,166,44,0.25);border-radius:8px;padding:14px 16px;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#C6A62C;">This week</p>
                <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.75);line-height:1.6;">${sol.thisWeek}</p>
              </td>
            </tr>
          </table>` : ''}
          <div style="margin-top:4px;">${(sol.tags ?? []).map(tagPill).join('')}</div>
        </td>
      </tr>
    </table>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your AI Readiness Report — Nxt Apex</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#060A18;border-radius:16px 16px 0 0;padding:36px 36px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td>
                    <span style="font-size:20px;font-weight:900;letter-spacing:-0.02em;color:#ffffff;">NXT APEX</span>
                    <span style="font-size:12px;font-weight:700;color:#C6A62C;margin-left:6px;letter-spacing:0.1em;text-transform:uppercase;">AI</span>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:rgba(255,255,255,0.35);">Your AI Readiness Report</p>
              <p style="margin:0;font-size:30px;font-weight:900;line-height:1.15;color:#ffffff;">STOP Learning AI<br><span style="color:#C6A62C;">START Solving With It</span></p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#080D1C;padding:32px 36px;">

              <p style="margin:0 0 16px;font-size:14px;color:rgba(255,255,255,0.7);line-height:1.75;">${openingSentence}</p>
              <p style="margin:0 0 28px;font-size:13px;color:rgba(255,255,255,0.4);line-height:1.7;border-top:1px solid rgba(255,255,255,0.06);padding-top:16px;">${introLine}</p>

              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Opportunity #1</p>
              ${solutionCard(s1)}

              <p style="margin:20px 0 12px;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Opportunity #2</p>
              ${solutionCard(s2)}

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
                <tr><td style="height:1px;background:rgba(255,255,255,0.07);"></td></tr>
              </table>

              <!-- About -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#0F1629;border-radius:12px;padding:22px 24px;">
                    <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#C6A62C;">About Nxt Apex</p>
                    <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.7;">We teach businesses how to implement AI that drives real results. Whether you're unsure where to start or you've tried different tools without seeing tangible outcomes, Nxt Apex helps turn AI into a practical growth tool.</p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                <tr>
                  <td align="center">
                    <a href="https://api.leadconnectorhq.com/widget/booking/nxtapexai"
                       style="display:inline-block;background:#C6A62C;color:#000000;font-size:15px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;letter-spacing:0.01em;">
                      Book Your Free Strategy Call →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:10px 0 0;text-align:center;font-size:12px;color:rgba(255,255,255,0.3);">30 minutes. No pitch. We walk through your report together.</p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#060A18;border-radius:0 0 16px 16px;padding:24px 36px;border-top:1px solid rgba(255,255,255,0.06);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:13px;color:rgba(255,255,255,0.5);">(504) 290-4780</p>
                    <p style="margin:0 0 4px;font-size:13px;color:rgba(255,255,255,0.5);">sean@nxtapexai.com</p>
                    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);">LinkedIn: Sean Conerly</p>
                  </td>
                  <td align="right" valign="middle">
                    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);">© 2026 Nxt Apex AI</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const { email, solutions, bizType, aiTool, selectedTools, painPoint } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const pitKey      = process.env.GHL_PIT_KEY;
    const locationId  = process.env.GHL_LOCATION_ID;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!pitKey || !locationId) {
      console.error('Missing GHL credentials');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // Run field setup + Claude generation in parallel — independent of each other
    const [fieldIds, aiContent] = await Promise.all([
      ensureCustomFields(pitKey, locationId),
      anthropicKey
        ? generateReportContent(solutions, bizType, aiTool, selectedTools, painPoint, anthropicKey)
        : Promise.resolve(null),
    ]);

    // Merge AI-generated content over the pre-scripted solutions
    // If Claude failed or no key, fall back to pre-scripted gracefully
    const finalS1 = aiContent?.solution1
      ? { ...solutions[0], ...aiContent.solution1 }
      : solutions[0] ?? {};
    const finalS2 = aiContent?.solution2
      ? { ...solutions[1], ...aiContent.solution2 }
      : solutions[1] ?? {};

    // Upsert GHL contact
    const contactId = await upsertContact(
      pitKey, locationId, email,
      [finalS1, finalS2], bizType, aiTool, selectedTools, painPoint,
      fieldIds
    );

    if (!contactId) {
      return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
    }

    // Build and send email
    const html = buildEmailHTML(finalS1, finalS2, aiTool, painPoint);
    await sendEmail(pitKey, contactId, 'Your AI Readiness Report — Nxt Apex', html);

    return NextResponse.json({ success: true, aiGenerated: !!aiContent });
  } catch (err) {
    console.error('send-report error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
