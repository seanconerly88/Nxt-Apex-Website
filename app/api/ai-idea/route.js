import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

function ghlHeaders(pitKey) {
  return {
    Authorization: `Bearer ${pitKey}`,
    Version: GHL_VERSION,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

const QUESTION_LABELS = {
  missedCall: 'When nobody picks up the phone',
  speedToLead: 'How fast a new lead hears from them',
  deadLeads: 'Last contact with non-buying database',
  websiteVisitors: 'Site visitor at 9pm with a question',
  reviews: 'How they collect reviews',
};

/**
 * Push the quiz lead into GHL: upsert the contact, tag it, and attach a note
 * with every answer plus the diagnosed loop. Never throws — a CRM failure
 * must not break the visitor's result screen.
 */
async function pushToGHL({ answers, contact, result }) {
  const pitKey = process.env.GHL_PIT_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!pitKey || !locationId) {
    console.warn('GHL push skipped: missing PIT key or location id');
    return;
  }
  if (!contact.email) {
    console.warn('GHL push skipped: no email');
    return;
  }

  const name = (contact.name || '').trim();
  const tags = ['closed-loop-quiz', 'website-lead'];
  if (result?.agent) {
    tags.push(`loop-${result.agent.toLowerCase().replace(/\s+/g, '-')}`);
  }

  const upsertRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: ghlHeaders(pitKey),
    body: JSON.stringify({
      locationId,
      email: contact.email,
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ').slice(1).join(' ') || '',
      phone: contact.phone || undefined,
      website: contact.domain || undefined,
      source: 'Closed Loop Quiz',
      tags,
    }),
  });

  if (!upsertRes.ok) {
    const text = await upsertRes.text();
    throw new Error(`GHL upsert failed ${upsertRes.status}: ${text}`);
  }

  const upsertData = await upsertRes.json();
  const contactId = upsertData.contact?.id ?? upsertData.id;
  if (!contactId) throw new Error('No contactId returned from GHL');

  console.log('✓ Quiz contact upserted:', contactId);

  const answerLines = Object.entries(QUESTION_LABELS)
    .map(([key, label]) => `${label}: ${answers[key] || 'no answer'}`)
    .join('\n');

  const noteBody = [
    'CLOSED LOOP QUIZ SUBMISSION',
    '',
    `Diagnosed loop: ${result?.leak || 'unknown'}`,
    `Closing agent: ${result?.agent || 'unknown'}`,
    contact.domain ? `Website: ${contact.domain}` : null,
    '',
    'ANSWERS',
    answerLines,
  ]
    .filter(Boolean)
    .join('\n');

  await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
    method: 'POST',
    headers: ghlHeaders(pitKey),
    body: JSON.stringify({ body: noteBody }),
  });

  console.log('✓ Quiz note added');
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { missedCall, speedToLead, deadLeads, websiteVisitors, reviews, name, email, phone, domain } = body;

  const answers = { missedCall, speedToLead, deadLeads, websiteVisitors, reviews };
  const contact = { name, email, phone, domain };

  let result;

  try {
    const prompt = `You are an AI operations analyst for Nxt Apex AI. We sell The Closed Loop System: six AI agents, each one closing a specific way revenue leaks out of a business.

The six loops and the agent that closes each one:
1. Response loop (leads not contacted fast enough) is closed by Speed to Lead
2. Missed call loop (calls that go unanswered) is closed by AI Receptionist
3. Dead lead loop (old leads never followed up) is closed by Database Reactivation
4. Browse and bounce loop (site visitors who leave without acting) is closed by Website Manager
5. Trust loop (reviews never asked for) is closed by Reputation Manager
6. Oversight loop (nobody watching the other five) is closed by Pipeline Manager

A business owner answered 5 diagnostic questions. Identify their single widest open loop and explain how the matching agent closes it.

Business owner: ${name || 'unknown'}
Domain: ${domain || 'not provided'}

Their answers:
1. What happens when nobody picks up the phone: ${missedCall}
2. How fast a new lead hears from them: ${speedToLead}
3. Last time they contacted their non-buying database: ${deadLeads}
4. What happens when someone visits their site at 9pm with a question: ${websiteVisitors}
5. How they collect reviews: ${reviews}

Respond with ONLY a valid JSON object. No markdown, no explanation, no extra text. Exact structure:
{
  "leak": "the name of the open loop, 2 to 5 words",
  "agent": "the exact name of the agent that closes it, from the six listed above",
  "agentSentence": "One sentence describing exactly what that agent does to close this specific loop",
  "twoWeekSentence": "One sentence opening with a real industry statistic, then a second person outcome tied to day six"
}

Rules:
- leak: name the loop their answers reveal as widest open. Use plain language like "Missed Call Loop" or "Dead Lead Loop", not jargon
- agent: must be one of Speed to Lead, AI Receptionist, Database Reactivation, Website Manager, Reputation Manager, Pipeline Manager
- agentSentence: concrete and specific. Name what the agent actually does. Use "you" and "your", never their name, never third person
- twoWeekSentence: MUST open with a real, specific industry statistic relevant to their loop (for the response loop use "Leads contacted within 5 minutes are 96x more likely to convert than those reached after 30 minutes"), then follow with a direct second person outcome that references what they said their current process is and what it becomes by day six. Use "you will" not "you'll see"
- Never use dashes anywhere in the output
- No hedging, no maybe, no could potentially`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    });

    result = JSON.parse(message.content[0].text.trim());
  } catch (err) {
    console.error('ai-idea generation error:', err);
    result = {
      leak: 'Response Loop',
      agent: 'Speed to Lead',
      agentSentence: 'Speed to Lead fires a personalized text to every new lead within 60 seconds, around the clock, with no manual step required.',
      twoWeekSentence: 'Leads contacted within 5 minutes are 96x more likely to convert than those reached after 30 minutes, and by day six you will have zero leads going cold in the first hour.',
    };
  }

  // Capture the lead regardless of whether generation succeeded.
  try {
    await pushToGHL({ answers, contact, result });
  } catch (err) {
    console.error('GHL push failed:', err);
  }

  return Response.json(result);
}
