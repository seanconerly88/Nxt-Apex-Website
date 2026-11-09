// Content for /3-ways — "3 Ways Claude Makes a Service Business More Money".
// Model: connect Claude to GoHighLevel once, then tell Claude to build each thing.
// Each step has a stable `id` so saved progress survives copy edits.

export const INTRO_CALL_URL = 'https://api.leadconnectorhq.com/widget/booking/BTYyk6Ay7YbVtgfjQaKm';
export const GHL_MCP_URL = 'https://services.leadconnectorhq.com/mcp/anthropic/v2';

export const NEEDS = [
  { label: 'Claude', detail: 'A paid plan (Pro or higher), on the web or the desktop app' },
  { label: 'GoHighLevel', detail: 'Any plan, with your leads, calendar and phone number in it' },
  { label: 'About an hour', detail: 'Total. Connect once, then do one a day if that is easier' },
];

export const WAYS = [
  {
    key: 'connect',
    num: '00',
    title: 'Connect Claude to your GoHighLevel',
    time: 'About 10 minutes',
    problemLabel: 'The old way',
    problem:
      'Most people still copy prompts into Claude, then copy answers back into their CRM. That’s you doing the busywork for the AI.',
    result: 'Claude can see your contacts, calendar and pipeline, and build things inside GoHighLevel when you ask. You do this once.',
    steps: [
      {
        id: 'cn-1',
        text: 'Sign in to Claude (claude.ai or the desktop app) on a paid plan.',
      },
      {
        id: 'cn-2',
        text: 'Go to Settings → Connectors → Add custom connector. Name it GoHighLevel and paste this URL:',
        copy: { label: 'Connector URL', body: GHL_MCP_URL },
      },
      {
        id: 'cn-3',
        text: 'Click Connect. Sign in to GoHighLevel, pick your business’s sub-account, and approve.',
      },
      {
        id: 'cn-4',
        text: 'Open a new chat and test it. If you see your real contacts, you’re connected.',
        copy: { label: 'Test prompt', body: 'Show me the last 5 contacts added to my GoHighLevel.' },
      },
      {
        id: 'cn-5',
        text: 'Know the one rule: Claude asks before it changes anything in GoHighLevel. Read each request before you click approve.',
      },
    ],
  },
  {
    key: 'after-hours',
    num: '01',
    title: 'Answer every after-hours lead',
    time: 'About 20 minutes',
    problem:
      'Someone fills out your form at 9:47 at night. You call them back at 10 the next morning. By then they booked with whoever answered first.',
    result: 'Every missed call and form fill gets answered in under a minute, any hour, and booked on your calendar.',
    steps: [
      {
        id: 'ah-1',
        text: 'Fill in the brackets and send this to Claude. It builds all three pieces inside your GoHighLevel.',
        copy: {
          label: 'Tell Claude',
          body: `Using my GoHighLevel, set up after-hours lead response for my business:

1. A workflow: when a call to my business number is missed, text them back within 1 minute.
2. A workflow: when any form on my site is submitted, text them within 1 minute and ask what they need.
3. A Voice AI agent that answers calls after hours, answers questions using only the info below, and books them on my [calendar name] calendar. If it's an emergency or they're upset, it takes a message and tells them someone will call first thing.

Keep every text short and friendly, like a front-desk person. Ask me anything you need before you build.

My business: [type of business] in [city]
Hours: [hours]
Services and starting prices: [list]
Questions customers ask most: [list]`,
        },
      },
      {
        id: 'ah-2',
        text: 'Answer Claude’s questions and approve each change as it asks.',
      },
      {
        id: 'ah-3',
        text: 'Claude builds workflows as drafts. Read the texts, then tell Claude "publish both workflows" (or click Publish in Automation → Workflows).',
      },
      {
        id: 'ah-4',
        text: 'Make sure the voice agent is on your business phone number. If Claude says it can’t attach it, do that one click in AI Agents → Voice AI.',
      },
      {
        id: 'ah-5',
        text: 'Optional: want an AI that texts back and forth too? Claude can’t create Conversation AI bots yet, so have it write the instructions and paste them into AI Agents → Conversation AI.',
        copy: {
          label: 'Tell Claude',
          body: `Write the instructions for a GoHighLevel Conversation AI bot that texts with my leads after hours. Use the same business info and rules as my Voice AI agent. The goal of every conversation is to book them on my calendar.`,
        },
      },
      {
        id: 'ah-6',
        text: 'Test it tonight: call your business line and let it ring out, then fill out your own form. You should get a text back on both.',
      },
    ],
  },
  {
    key: 'dead-leads',
    num: '02',
    title: 'Find the money sitting in your CRM',
    time: 'About 30 minutes',
    problem:
      'You have leads who asked for a quote, said "call me next month," and never heard from you again. You already paid for them.',
    result: 'Every lead that went cold gets a personal text, and you get told the moment someone replies. No new ad spend.',
    steps: [
      {
        id: 'dl-1',
        text: 'Ask Claude to find your cold leads.',
        copy: {
          label: 'Tell Claude',
          body: `Look through my GoHighLevel contacts. Find everyone added in the last 6 months who:
- never booked an appointment, or
- asked for a quote and never bought, or
- hasn't heard from us in 30+ days

Group them by what they originally asked about. Show me a count per group and the 10 best leads in each, with why you picked them.`,
        },
      },
      {
        id: 'dl-2',
        text: 'Read the list and tell Claude who to take out: anyone who said no, asked you to stop, or is already a customer.',
      },
      {
        id: 'dl-3',
        text: 'Have Claude write the texts and tag everyone on the list.',
        copy: {
          label: 'Tell Claude',
          body: `For each group, write one text under 160 characters that mentions what they originally asked about. Sound like a person, not a company. No discounts, no "just checking in." End with a question they can answer in one word.

Then tag every contact on the final list "reactivation" plus their group name.`,
        },
      },
      {
        id: 'dl-4',
        text: 'Have Claude build the send.',
        copy: {
          label: 'Tell Claude',
          body: `Build a GoHighLevel workflow: when a contact gets the "reactivation" tag, send them their group's text. Send to 25 people a day, stop the workflow if they reply, and notify me when someone replies.`,
        },
      },
      {
        id: 'dl-5',
        text: 'Only text people who gave you permission to text them. Then read the draft and tell Claude to publish it.',
      },
      {
        id: 'dl-6',
        text: 'Each morning, ask Claude who replied. Book the yeses. That’s where the money is.',
        copy: {
          label: 'Tell Claude',
          body: `Who replied to the reactivation texts since yesterday? For each one, show me what they said and draft my reply.`,
        },
      },
    ],
  },
  {
    key: 'owner-os',
    num: '03',
    title: 'Get a morning briefing on your whole business',
    time: 'About 10 minutes',
    problem:
      'Most owners find out about problems last: a lead nobody called, a no-show nobody followed up, an invoice nobody chased.',
    result: 'A two-minute briefing every morning from your own GoHighLevel. You see the whole business without logging into anything.',
    steps: [
      {
        id: 'os-1',
        text: 'Ask Claude for your first briefing.',
        copy: {
          label: 'Tell Claude',
          body: `Check my GoHighLevel for the last 24 hours and give me a morning briefing:

1. New leads, and how many got a reply within 5 minutes
2. Appointments: booked, showed, no-showed
3. Deals stuck in the same pipeline stage for 7+ days
4. Unpaid or overdue invoices
5. The one thing I should do today, and why

Numbers first. Under 150 words. Flag anything that looks off.`,
        },
      },
      {
        id: 'os-2',
        text: 'Spot-check two of the numbers in GoHighLevel. If one’s off, tell Claude what you see so it counts it your way.',
      },
      {
        id: 'os-3',
        text: 'Put it on autopilot: tell Claude "run this briefing every weekday at 6:30am." No scheduled tasks on your plan? Keep this chat and say "briefing" each morning.',
      },
      {
        id: 'os-4',
        text: 'Ask follow-ups like you would a manager: "Why did no-shows go up?" or "Which leads should I call first today?"',
      },
    ],
  },
];

export const ALL_STEP_IDS = WAYS.flatMap(w => w.steps.map(s => s.id));
