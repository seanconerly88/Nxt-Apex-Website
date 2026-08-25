import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const body = await req.json();
    const { missedCall, speedToLead, deadLeads, websiteVisitors, reviews, name, domain } = body;

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

    const raw = message.content[0].text.trim();
    const parsed = JSON.parse(raw);

    return Response.json(parsed);
  } catch (err) {
    console.error('ai-idea error:', err);
    return Response.json({
      leak: 'Response Loop',
      agent: 'Speed to Lead',
      agentSentence: 'Speed to Lead fires a personalized text to every new lead within 60 seconds, around the clock, with no manual step required.',
      twoWeekSentence: 'Leads contacted within 5 minutes are 96x more likely to convert than those reached after 30 minutes, and by day six you will have zero leads going cold in the first hour.',
    });
  }
}
