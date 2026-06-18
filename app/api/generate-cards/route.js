import { NextResponse } from 'next/server';

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

export async function POST(request) {
  try {
    const { bizType, aiTools, aiTool, selectedTools, painPoint } = await request.json();
    const aiToolsArr = Array.isArray(aiTools) ? aiTools : (aiTool ? [aiTool] : []);

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicKey) return NextResponse.json({ solutions: null }, { status: 200 });

    const aiLabel   = aiLabelFrom(aiToolsArr);
    const toolNames = (selectedTools ?? []).map(id => TOOL_NAMES[id] ?? id);

    // Pick the two most relevant tools to highlight
    const crmTools     = ['HubSpot','Salesforce','GoHighLevel','Pipedrive'];
    const primaryCRM   = toolNames.find(t => crmTools.includes(t));
    const otherTools   = toolNames.filter(t => t !== primaryCRM).slice(0, 4);
    const highlightTwo = [primaryCRM, ...otherTools].filter(Boolean).slice(0, 2);

    const prompt = `You are a senior AI implementation consultant at Nxt Apex AI. A business owner just told you about their setup. Write two highly specific AI opportunity cards that make them think "this is exactly what we need."

THEIR EXACT SETUP:
- Business type: ${bizType ?? 'Not specified'}
- AI tool they use or want: ${aiLabel}
- Tools in their stack: ${toolNames.length ? toolNames.join(', ') : 'Not specified'}
- The pain point costing them most right now: "${painPoint ?? 'General operations'}"
- Key tools to focus on: ${highlightTwo.length ? highlightTwo.join(' and ') : toolNames[0] ?? 'their stack'}

THE REACTION YOU ARE GOING FOR:
The reader sees these two cards and thinks two things. First: "Holy shit, I did not think of that." Second: "That would make us real money" or "That would save us real time." If a card does not trigger both, rewrite it.

WHAT MAKES A GREAT CARD:
- Uses their ACTUAL tool names. Not "your CRM." Say "HubSpot contact records." Not "your project tool." Say "Monday.com."
- Shows the exact before and after. What their team does today by hand. What stops happening when this is set up.
- Names a real person at their company. "Your sales rep." "The person who builds the weekly report." "Your account manager."
- The title is a benefit statement. What gets better. Not what the tool does.
- Body is 2-3 short sentences. Plain. Concrete. A 9th grader reads it and gets it immediately.
- Every card ends on a clear money or time outcome. Name a number when you can. "Gets your ops lead back 5 hours a week." "Recovers the leads that go cold after day 3."
- Card 1 addresses their stated pain point using their primary tool.
- Card 2 reveals a second opportunity they have NOT thought of. Something hiding in their stack. This is the "I did not think of that" card.

HARD RULES — break any of these and the card fails:
1. No dashes of any kind. No em dash, no en dash, no hyphen used as a dash. Write a new sentence instead.
2. No run-on sentences. One idea per sentence.
3. No forbidden words: leverage, utilize, streamline, seamlessly, cutting-edge, robust, ecosystem, synergy, empower, revolutionize, transformative, innovative, game-changer, implement, facilitate, unlock.
4. No generic phrases like "connect your stack" or "your tools operate in silos." Be specific.
5. The connection field must name specific tools. Example: "Claude + HubSpot" or "ChatGPT + QuickBooks." Not "AI + Your Stack."

Return ONLY valid JSON. No markdown. No explanation. Nothing before or after:
{
  "solutions": [
    {
      "title": "Short benefit statement. No dashes. One sentence.",
      "connection": "AI Tool + Specific Tool Name",
      "body": "2-3 sentences. Specific. Plain English. Names their actual tools.",
      "tags": ["${aiLabel}", "short outcome tag", "short outcome tag"]
    },
    {
      "title": "Short benefit statement. No dashes. One sentence.",
      "connection": "AI Tool + Specific Tool Name",
      "body": "2-3 sentences. Specific. Plain English. Names their actual tools.",
      "tags": ["${aiLabel}", "short outcome tag", "short outcome tag"]
    }
  ]
}`;

    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), 6000);

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
          max_tokens: 800,
          messages: [{ role: 'user', content: prompt }],
        }),
        signal: controller.signal,
      });

      if (!res.ok) return NextResponse.json({ solutions: null });

      const data    = await res.json();
      const raw     = data.content?.[0]?.text ?? '';
      const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
      const parsed  = JSON.parse(cleaned);

      return NextResponse.json({ solutions: parsed.solutions ?? null });
    } finally {
      clearTimeout(timeout);
    }
  } catch (err) {
    console.error('generate-cards:', err.message);
    return NextResponse.json({ solutions: null });
  }
}
