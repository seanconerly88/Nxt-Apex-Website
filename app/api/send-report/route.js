import { NextResponse } from 'next/server';

const GHL_BASE    = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

const TOOL_NAMES = {
  hubspot:'HubSpot', salesforce:'Salesforce', ghl:'GoHighLevel', pipedrive:'Pipedrive',
  slack:'Slack', notion:'Notion', drive:'Google Drive', asana:'Asana',
  monday:'Monday.com', clickup:'ClickUp', airtable:'Airtable', zapier:'Zapier',
  zoom:'Zoom', teams:'MS Teams', quickbooks:'QuickBooks', gmail:'Gmail',
  calendly:'Calendly', loom:'Loom', stripe:'Stripe', shopify:'Shopify',
  xero:'Xero', gusto:'Gusto', mailchimp:'Mailchimp', klaviyo:'Klaviyo',
  activecampaign:'ActiveCampaign', constantcontact:'Constant Contact',
  docusign:'DocuSign', pandadoc:'PandaDoc', dropbox:'Dropbox',
  m365:'Microsoft 365 / Outlook', typeform:'Typeform', jotform:'Jotform',
  acuity:'Acuity', make:'Make',
};

const AI_NAMES = {
  chatgpt:'ChatGPT', claude:'Claude', gemini:'Gemini', openclaw:'OpenClaw',
  kimi:'Kimi', grok:'Grok', perplexity:'Perplexity', deepseek:'DeepSeek', local:'a local LLM',
};

function aiLabelFrom(arr) {
  const picks = (arr ?? []).filter(id => id !== 'none' && AI_NAMES[id]).map(id => AI_NAMES[id]);
  if (!picks.length) return 'AI';
  if (picks.length === 1) return picks[0];
  if (picks.length === 2) return `${picks[0]} and ${picks[1]}`;
  return `${picks.slice(0, -1).join(', ')}, and ${picks[picks.length - 1]}`;
}

function hasRealAi(arr) {
  return (arr ?? []).some(id => id !== 'none' && AI_NAMES[id]);
}

let fieldCache = null;

const REQUIRED_FIELDS = {
  quick_win_1_title:'Quick Win 1 Title', quick_win_1_body:'Quick Win 1 Body',
  quick_win_1_connection:'Quick Win 1 Connection', quick_win_2_title:'Quick Win 2 Title',
  quick_win_2_body:'Quick Win 2 Body', quick_win_2_connection:'Quick Win 2 Connection',
  nxa_biz_type:'NXA Biz Type', nxa_ai_tool:'NXA AI Tool',
  nxa_selected_tools:'NXA Selected Tools', nxa_pain_point:'NXA Pain Point',
};

function ghlHeaders(pitKey) {
  return {
    Authorization: `Bearer ${pitKey}`,
    Version: GHL_VERSION,
    'Content-Type': 'application/json',
  };
}

// ─── Step 1: Basic contact upsert (no custom fields — always runs) ─────────
async function upsertContact(pitKey, locationId, email, aiToolsArr, selectedTools) {
  const aiTags = (aiToolsArr ?? []).map(id => AI_NAMES[id] ? `AI: ${AI_NAMES[id]}` : (id === 'none' ? 'AI: None Yet' : null));
  const tags = [
    'Website Lead',
    'AI Readiness Report',
    ...aiTags,
    ...(Array.isArray(selectedTools) ? selectedTools : []),
  ].filter(Boolean);

  const res = await fetch(`${GHL_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: ghlHeaders(pitKey),
    body: JSON.stringify({ locationId, email, tags }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL upsert failed ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.contact?.id ?? data.id ?? null;
}

// ─── Step 2: Custom fields (optional — runs after contact is created) ──────
async function ensureCustomFields(pitKey, locationId) {
  if (fieldCache) return fieldCache;

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
  for (const [key, name] of Object.entries(REQUIRED_FIELDS)) {
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
        console.warn(`Could not create field ${key}:`, e.message);
      }
    }
  }

  fieldCache = ids;
  return ids;
}

async function updateContactCustomFields(pitKey, contactId, solutions, bizType, aiToolLabel, selectedTools, painPoint, fieldIds) {
  const customFields = [
    { id: fieldIds.quick_win_1_title,      field_value: solutions[0]?.title ?? '' },
    { id: fieldIds.quick_win_1_body,       field_value: solutions[0]?.body ?? '' },
    { id: fieldIds.quick_win_1_connection, field_value: solutions[0]?.connection ?? '' },
    { id: fieldIds.quick_win_2_title,      field_value: solutions[1]?.title ?? '' },
    { id: fieldIds.quick_win_2_body,       field_value: solutions[1]?.body ?? '' },
    { id: fieldIds.quick_win_2_connection, field_value: solutions[1]?.connection ?? '' },
    { id: fieldIds.nxa_biz_type,           field_value: bizType ?? '' },
    { id: fieldIds.nxa_ai_tool,            field_value: aiToolLabel ?? '' },
    { id: fieldIds.nxa_selected_tools,     field_value: Array.isArray(selectedTools) ? selectedTools.join(', ') : '' },
    { id: fieldIds.nxa_pain_point,         field_value: painPoint ?? '' },
  ].filter(f => f.id);

  if (!customFields.length) return;

  await fetch(`${GHL_BASE}/contacts/${contactId}`, {
    method: 'PUT',
    headers: ghlHeaders(pitKey),
    body: JSON.stringify({ customFields }),
  });
}

// ─── Step 3: Find or create conversation, then send email ─────────────────
async function sendEmail(pitKey, locationId, contactId, email, subject, html) {
  // Find existing conversation or create one
  let conversationId = null;

  try {
    const searchRes = await fetch(
      `${GHL_BASE}/conversations/search?locationId=${locationId}&contactId=${contactId}`,
      { headers: ghlHeaders(pitKey) }
    );
    const searchData = await searchRes.json();
    conversationId = searchData.conversations?.[0]?.id ?? null;
  } catch (e) {
    console.warn('Conversation search failed:', e.message);
  }

  if (!conversationId) {
    try {
      const createRes = await fetch(`${GHL_BASE}/conversations`, {
        method: 'POST',
        headers: ghlHeaders(pitKey),
        body: JSON.stringify({ locationId, contactId }),
      });
      const createData = await createRes.json();
      conversationId = createData.conversation?.id ?? createData.id ?? null;
    } catch (e) {
      console.warn('Conversation create failed:', e.message);
    }
  }

  // Send the email
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
    const text = await res.text();
    throw new Error(`GHL email send failed ${res.status}: ${text}`);
  }

  return true;
}

// ─── Claude AI generation ──────────────────────────────────────────────────
async function generateReportContent(solutions, bizType, aiToolsArr, selectedTools, painPoint, anthropicKey) {
  const toolList = (selectedTools ?? []).map(id => TOOL_NAMES[id] ?? id).join(', ');
  const aiLabel  = aiLabelFrom(aiToolsArr);
  const s1 = solutions[0] ?? {};
  const s2 = solutions[1] ?? {};

  const prompt = `You are Sean Conerly, founder of Nxt Apex AI. You have spent years inside businesses helping them put AI to work. A business owner just completed your AI readiness assessment. Write their personalized AI Readiness Report email. Three opportunities. All three must be fresh ideas. They already saw two cards on the website before submitting their email so do not repeat those connection angles.

WHO THEY ARE:
- Business type: ${bizType ?? 'Not specified'}
- AI tool they use or want: ${aiLabel}
- Tools in their stack: ${toolList || 'Not specified'}
- The problem costing them most right now: "${painPoint ?? 'General operations'}"
- What they already saw on the website: "${s1.connection ?? ''}" and "${s2.connection ?? ''}"

YOUR VOICE. Write exactly like this:
- Short sentences. One idea per sentence. If it has two clauses, break it into two sentences.
- Casual but direct. You have been in the room with businesses like theirs. You know what works.
- No hedging. No "might" or "could potentially." State what happens.
- Talk about specific people. "Your ops manager." "The person who builds the Monday report." "Your sales rep."
- Name their actual tools. Not "your CRM." Say "HubSpot." Not "your project tool." Say "Asana."

REVENUE AND TIME. Every opportunity must connect to one of these two outcomes:
- Specific time saved: "This gets your team back 4 hours every week." Be concrete. Name the number.
- Specific revenue protected or generated: "This recovers leads that go cold after day 3." Name the mechanism.
Do not be vague. "Saves time" is not enough. "Gets your account manager back 5 hours a week" is enough.

HARD RULES. BREAK ANY OF THESE AND THE CONTENT FAILS:
1. No dashes of any kind. No em dash. No en dash. No hyphen as a dash. Write a new sentence instead.
2. No run-on sentences. One idea per sentence. Period. New sentence.
3. 9th grade reading level. Short words. Short sentences. Plain English.
4. Never use: leverage, utilize, streamline, seamlessly, cutting-edge, robust, ecosystem, synergy, empower, revolutionize, transformative, innovative, game-changer, implement, facilitate, unlock.
5. No bullet points in body text. Full sentences only.
6. The hook names a problem they feel every single day. One sentence. Gut punch.
7. The "This week" action is doable in under 2 hours using tools they already have.
8. Every card ends on a dollar or hour outcome. Not a feature. A result.

Return ONLY valid JSON. No markdown. No explanation. Nothing before or after the JSON:
{
  "solution1": {
    "title": "Outcome-focused. Short. No dashes.",
    "connection": "Specific tool + Specific tool. No generics.",
    "hook": "One sentence. The daily problem they feel.",
    "body": "Three short paragraphs separated by two newlines. Para 1: the cost of the problem today. Para 2: exactly what changes and how. Para 3: the revenue or time outcome.",
    "extraSentences": "Two sentences. Concrete business value. No dashes.",
    "blueprint": "Step 1 label > Step 2 label > Step 3 label",
    "thisWeek": "One action. Under 2 hours. Their actual tools. No dashes.",
    "tags": ["short tag", "short tag", "short tag"]
  },
  "solution2": {
    "title": "...", "connection": "...", "hook": "...",
    "body": "...", "extraSentences": "...", "blueprint": "...", "thisWeek": "...",
    "tags": ["short tag", "short tag", "short tag"]
  },
  "solution3": {
    "title": "...", "connection": "...", "hook": "...",
    "body": "...", "extraSentences": "...", "blueprint": "...", "thisWeek": "...",
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
        max_tokens: 3200,
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
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('Claude generation failed:', err.message);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Email HTML ────────────────────────────────────────────────────────────
function buildEmailHTML(s1, s2, s3, aiToolsArr, painPoint, bizType) {
  const aiLabel = hasRealAi(aiToolsArr) ? aiLabelFrom(aiToolsArr) : null;
  const aiLabel2 = aiLabel ?? 'AI';
  const bizLabel = bizType ? ` ${bizType.toLowerCase()} business` : ' business';

  const openingSentence = `Thank you for taking the time to check out Nxt Apex. The three opportunities below are built around your specific tools and the problem your team is dealing with right now. Think of this as your starting point. A real look at where ${aiLabel2} fits in your${bizLabel} and what to actually do about it.`;

  const introLine = aiLabel && painPoint
    ? `You are investing in ${aiLabel} and your team's biggest friction is <strong style="color:#C6A62C;">${painPoint.toLowerCase()}</strong>. Here is exactly where that changes and what to do about it this week.`
    : aiLabel
    ? `You are investing in ${aiLabel}. Here is exactly where it creates the most impact in your stack and what to do about it this week.`
    : `Here is where AI creates the most immediate, measurable impact in your business and what to do about it this week.`;

  const tagPill = (tag) =>
    `<span style="display:inline-block;background:#C6A62C;color:#000;font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;margin:2px 3px 2px 0;letter-spacing:0.05em;">${tag}</span>`;

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
          ${sol.hook ? `<p style="margin:0 0 16px;font-size:15px;font-style:italic;color:rgba(255,255,255,0.5);line-height:1.6;border-left:2px solid rgba(198,166,44,0.4);padding-left:12px;">${sol.hook}</p>` : ''}
          ${formatBody(sol.body)}
          ${sol.extraSentences ? `<p style="margin:0 0 16px;font-size:14px;color:rgba(255,255,255,0.75);line-height:1.7;">${sol.extraSentences}</p>` : ''}
          ${sol.blueprint ? `
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 20px;">
            <tr><td style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px 16px;">
              <p style="margin:0 0 5px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);">How to set it up</p>
              <p style="margin:0;font-size:13px;font-weight:600;color:#C6A62C;line-height:1.5;">${sol.blueprint}</p>
            </td></tr>
          </table>` : ''}
          ${sol.thisWeek ? `
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px;">
            <tr><td style="background:rgba(198,166,44,0.1);border:1px solid rgba(198,166,44,0.25);border-radius:8px;padding:14px 16px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#C6A62C;">This week</p>
              <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.75);line-height:1.6;">${sol.thisWeek}</p>
            </td></tr>
          </table>` : ''}
          <div style="margin-top:4px;">${(sol.tags ?? []).map(tagPill).join('')}</div>
        </td>
      </tr>
    </table>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your AI Readiness Report — Nxt Apex</title></head>
<body style="margin:0;padding:0;background:#f4f4f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f0;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:#060A18;border-radius:16px 16px 0 0;padding:36px 36px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td>
              <span style="font-size:20px;font-weight:900;letter-spacing:-0.02em;color:#ffffff;">NXT APEX</span>
              <span style="font-size:12px;font-weight:700;color:#C6A62C;margin-left:6px;letter-spacing:0.1em;text-transform:uppercase;">AI</span>
            </td></tr>
          </table>
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:rgba(255,255,255,0.35);">Your AI Readiness Report</p>
          <p style="margin:0;font-size:30px;font-weight:900;line-height:1.15;color:#ffffff;">STOP Learning AI<br><span style="color:#C6A62C;">START Solving With It</span></p>
        </td></tr>
        <tr><td style="background:#080D1C;padding:32px 36px;">
          <p style="margin:0 0 16px;font-size:14px;color:rgba(255,255,255,0.7);line-height:1.75;">${openingSentence}</p>
          <p style="margin:0 0 28px;font-size:13px;color:rgba(255,255,255,0.4);line-height:1.7;border-top:1px solid rgba(255,255,255,0.06);padding-top:16px;">${introLine}</p>
          <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Opportunity #1</p>
          ${solutionCard(s1)}
          <p style="margin:20px 0 12px;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Opportunity #2</p>
          ${solutionCard(s2)}
          <p style="margin:20px 0 12px;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Opportunity #3</p>
          ${solutionCard(s3)}
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
            <tr><td style="height:1px;background:rgba(255,255,255,0.07);"></td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td style="background:#0F1629;border-radius:12px;padding:22px 24px;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#C6A62C;">About Nxt Apex</p>
              <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.7;">We teach businesses how to put AI to work in ways that actually move the needle. Whether you are just getting started or you have tried different tools without seeing results, we help you build something real.</p>
            </td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
            <tr><td align="center">
              <a href="https://api.leadconnectorhq.com/widget/booking/nxtapexai"
                 style="display:inline-block;background:#C6A62C;color:#000000;font-size:15px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;">
                Book Your Free Strategy Call →
              </a>
            </td></tr>
          </table>
          <p style="margin:10px 0 0;text-align:center;font-size:12px;color:rgba(255,255,255,0.3);">30 minutes. No pitch. We walk through your report together.</p>
        </td></tr>
        <tr><td style="background:#060A18;border-radius:0 0 16px 16px;padding:24px 36px;border-top:1px solid rgba(255,255,255,0.06);">
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
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ─── Owner notification email ─────────────────────────────────────────────
function buildNotificationHTML(leadEmail, bizType, aiToolLabel, toolNameList, painPoint, s1, s2, s3, contactId, locationId) {
  const ghlLink = `https://app.gohighlevel.com/v2/location/${locationId}/contacts/detail/${contactId}`;

  const cardRow = (num, sol) => sol?.title ? `
    <tr><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
      <p style="margin:0 0 2px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#C6A62C;">Opportunity #${num} — ${sol.connection ?? ''}</p>
      <p style="margin:0;font-size:14px;font-weight:600;color:#fff;">${sol.title}</p>
    </td></tr>` : '';

  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#060A18;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#0D1220;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#C6A62C;padding:16px 28px;">
          <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#000;">New Lead — AI Readiness Report</p>
          <p style="margin:4px 0 0;font-size:20px;font-weight:900;color:#000;">${leadEmail}</p>
        </td></tr>
        <tr><td style="padding:24px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr><td style="background:#060A18;border-radius:8px;padding:16px 18px;">
              <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);">What they told us</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:5px 0;font-size:13px;color:rgba(255,255,255,0.5);width:110px;">Business</td><td style="padding:5px 0;font-size:13px;color:#fff;font-weight:600;">${bizType ?? 'Not specified'}</td></tr>
                <tr><td style="padding:5px 0;font-size:13px;color:rgba(255,255,255,0.5);">AI Tools</td><td style="padding:5px 0;font-size:13px;color:#fff;font-weight:600;">${aiToolLabel}</td></tr>
                <tr><td style="padding:5px 0;font-size:13px;color:rgba(255,255,255,0.5);">Pain Point</td><td style="padding:5px 0;font-size:13px;color:#C6A62C;font-weight:600;">${painPoint ?? 'Not specified'}</td></tr>
                <tr><td style="padding:5px 0;font-size:13px;color:rgba(255,255,255,0.5);vertical-align:top;">Stack</td><td style="padding:5px 0;font-size:13px;color:#fff;">${toolNameList}</td></tr>
              </table>
            </td></tr>
          </table>
          <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);">What we sent them</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            ${cardRow(1, s1)}
            ${cardRow(2, s2)}
            ${cardRow(3, s3)}
          </table>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <a href="${ghlLink}" style="display:inline-block;background:#C6A62C;color:#000;font-size:13px;font-weight:700;padding:11px 24px;border-radius:8px;text-decoration:none;">View in GHL →</a>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

async function sendOwnerNotification(pitKey, locationId, leadEmail, bizType, aiToolLabel, selectedTools, painPoint, finalS1, finalS2, finalS3, leadContactId) {
  const SEAN_EMAIL = 'sean@nxtapexai.com';
  const toolNameList = (selectedTools ?? []).map(id => TOOL_NAMES[id] ?? id).join(', ') || 'None specified';

  const upsertRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: ghlHeaders(pitKey),
    body: JSON.stringify({ locationId, email: SEAN_EMAIL }),
  });
  if (!upsertRes.ok) throw new Error(`Owner upsert failed: ${upsertRes.status}`);
  const upsertData = await upsertRes.json();
  const seanContactId = upsertData.contact?.id ?? upsertData.id;
  if (!seanContactId) throw new Error('No owner contactId');

  const html = buildNotificationHTML(leadEmail, bizType, aiToolLabel, toolNameList, painPoint, finalS1, finalS2, finalS3, leadContactId, locationId);
  await sendEmail(pitKey, locationId, seanContactId, SEAN_EMAIL, `New Lead: ${leadEmail} — AI Readiness Report`, html);
}

// ─── POST handler ──────────────────────────────────────────────────────────
export async function POST(request) {
  const log = { contact: false, customFields: false, email: false, aiGenerated: false };

  try {
    const { email, solutions, bizType, aiTools, aiTool, selectedTools, painPoint } = await request.json();
    const aiToolsArr = Array.isArray(aiTools) ? aiTools : (aiTool ? [aiTool] : []);
    const aiToolLabel = aiLabelFrom(aiToolsArr);

    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const pitKey       = process.env.GHL_PIT_KEY;
    const locationId   = process.env.GHL_LOCATION_ID;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!pitKey || !locationId) {
      console.error('Missing GHL env vars');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // ── 1. Create contact (required) ────────────────────────────────────────
    const contactId = await upsertContact(pitKey, locationId, email, aiToolsArr, selectedTools);
    if (!contactId) return NextResponse.json({ error: 'Could not create GHL contact' }, { status: 500 });
    log.contact = true;
    console.log('✓ Contact created:', contactId);

    // ── 2. Custom fields + AI generation (parallel, both optional) ──────────
    const [fieldIds, aiContent] = await Promise.all([
      ensureCustomFields(pitKey, locationId).catch(e => {
        console.warn('Custom fields skipped:', e.message);
        return null;
      }),
      anthropicKey
        ? generateReportContent(solutions, bizType, aiToolsArr, selectedTools, painPoint, anthropicKey)
        : Promise.resolve(null),
    ]);

    // ── 3. Update contact with custom fields if available ───────────────────
    if (fieldIds) {
      try {
        await updateContactCustomFields(pitKey, contactId, solutions, bizType, aiToolLabel, selectedTools, painPoint, fieldIds);
        log.customFields = true;
        console.log('✓ Custom fields updated');
      } catch (e) {
        console.warn('Custom field update skipped:', e.message);
      }
    }

    // ── 4. Merge AI content over pre-scripted solutions ─────────────────────
    const finalS1 = aiContent?.solution1 ? { ...solutions[0], ...aiContent.solution1 } : solutions[0] ?? {};
    const finalS2 = aiContent?.solution2 ? { ...solutions[1], ...aiContent.solution2 } : solutions[1] ?? {};
    const finalS3 = aiContent?.solution3 ?? {};
    log.aiGenerated = !!aiContent;
    if (aiContent) console.log('✓ Claude content generated');

    // ── 5. Send email to lead ────────────────────────────────────────────────
    try {
      const html = buildEmailHTML(finalS1, finalS2, finalS3, aiToolsArr, painPoint, bizType);
      await sendEmail(pitKey, locationId, contactId, email, 'Your AI Readiness Report — Nxt Apex', html);
      log.email = true;
      console.log('✓ Email sent');
    } catch (e) {
      console.error('Email send failed:', e.message);
    }

    // ── 6. Notify Sean ───────────────────────────────────────────────────────
    sendOwnerNotification(
      pitKey, locationId, email, bizType, aiToolLabel,
      selectedTools, painPoint, finalS1, finalS2, finalS3, contactId
    ).then(() => console.log('✓ Owner notification sent'))
      .catch(e => console.warn('Owner notification skipped:', e.message));

    return NextResponse.json({ success: true, ...log });
  } catch (err) {
    console.error('send-report fatal:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
