import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const body = await req.json();
    const { leadSource, speedToLead, noShowRecovery, handoff, reviews, name, domain } = body;

    const prompt = `You are an AI business operations analyst. A business owner answered 5 diagnostic questions about their client journey. Identify their single biggest operational leak and explain how an AI agent fixes it.

Business owner: ${name || 'unknown'}
Domain: ${domain || 'not provided'}

Their answers:
1. Lead generation source: ${leadSource}
2. Speed to lead (how fast new leads hear from them): ${speedToLead}
3. No-show recovery (what happens when a prospect misses a call): ${noShowRecovery}
4. Sales-to-fulfillment handoff (how team finds out when client signs): ${handoff}
5. Review collection process: ${reviews}

Respond with ONLY a valid JSON object. No markdown, no explanation, no extra text. Exact structure:
{
  "leak": "3-5 word name of their biggest operational leak",
  "agentSentence": "One sentence describing exactly what an AI agent does to fix this specific leak",
  "twoWeekSentence": "One sentence describing what the improvement concretely looks like in two weeks"
}

Rules:
- leak: name a specific stage such as Speed to Lead, No-Show Recovery, Review Flywheel, Sales Handoff — pick the one their answers reveal as weakest
- agentSentence: concrete and specific — name what the agent does, not just that it helps — use "you" and "your", never their name, never third person
- twoWeekSentence: MUST follow this structure exactly: open with a real, specific industry statistic relevant to their leak (e.g. for Speed to Lead: "Leads contacted within 5 minutes are 96x more likely to convert than those reached after 30 minutes"), then follow with a direct second-person outcome that references what they said their current process is and what it becomes in two weeks — use "you will" not "you'll see" or their name — no dashes, no hedging`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 450,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = message.content[0].text.trim();
    const parsed = JSON.parse(raw);

    return Response.json(parsed);
  } catch (err) {
    console.error('ai-idea error:', err);
    return Response.json({
      leak: 'Speed to Lead',
      agentSentence: 'An AI agent fires a personalized text to every new lead within 60 seconds, around the clock, with no manual step required.',
      twoWeekSentence: 'In two weeks you will have zero leads going cold in the first hour, the window where most buying decisions are made.',
    });
  }
}
