// Content for /3-ways — "3 Ways Claude Makes a Service Business More Money".
// Each step has a stable `id` so saved checkbox progress survives copy edits.
// Prompts and templates are shown in copy-to-clipboard blocks.

export const INTRO_CALL_URL = 'https://api.leadconnectorhq.com/widget/booking/BTYyk6Ay7YbVtgfjQaKm';

export const NEEDS = [
  { label: 'Claude', detail: 'A paid plan (Pro or higher) so it can connect to your CRM' },
  { label: 'GoHighLevel', detail: 'Any plan, with your leads and calendar already in it' },
  { label: 'About 90 minutes', detail: 'Total, for all three. Do one a day if that is easier' },
];

export const WAYS = [
  {
    key: 'after-hours',
    num: '01',
    title: 'Answer every after-hours lead',
    time: 'About 30 minutes',
    problem:
      'Someone fills out your form at 9:47 at night. You call them back at 10 the next morning. By then they booked with whoever answered first.',
    result: 'Every form fill and missed call gets a reply in under a minute, any hour, and gets booked on your calendar.',
    steps: [
      {
        id: 'ah-1',
        text: 'Write down your basics in one note: services, starting prices, hours, service area, and the 10 questions customers ask most.',
      },
      {
        id: 'ah-2',
        text: 'Paste that note into Claude with the prompt below. Claude writes the script your AI agent will follow.',
        copy: {
          label: 'Prompt for Claude',
          body: `I run a [type of business] in [city]. Below are my services, prices, hours, and the questions customers ask most.

Write instructions for an AI assistant that replies to new leads by text after hours. Rules:
- Reply in 1–3 short sentences, like a friendly front-desk person
- Answer only from the info below. If it doesn't know, say someone will follow up first thing in the morning
- Never quote a price that isn't listed
- The goal of every conversation is to book a time on my calendar
- If the person is upset or it's an emergency, stop and tell them a team member will call them

My info:
[paste your note here]`,
        },
      },
      {
        id: 'ah-3',
        text: 'In GoHighLevel, go to AI Agents → Conversation AI. Paste Claude’s instructions in as the bot’s prompt and connect your booking calendar.',
      },
      {
        id: 'ah-4',
        text: 'Set the bot to Auto-Pilot for SMS and web chat, and limit it to after-hours if you want your team to handle the daytime.',
      },
      {
        id: 'ah-5',
        text: 'Go to Automation → Workflows → Create Workflow and start from the Missed Call Text Back recipe. Edit the text to sound like you.',
        copy: {
          label: 'Missed-call text',
          body: `Hey {{contact.first_name}}, sorry I missed your call! This is [your name] with [business]. What can I help you with?`,
        },
      },
      {
        id: 'ah-6',
        text: 'Make a second workflow with the trigger Form Submitted that sends a text within 1 minute of every form fill.',
        copy: {
          label: 'Form-fill text',
          body: `Hi {{contact.first_name}}, got your request, thanks! Quick question so we can help faster: what's going on and when do you need it done?`,
        },
      },
      {
        id: 'ah-7',
        text: 'Test it yourself tonight: call your business line and let it ring out, then fill out your own form. You should get a text back on both.',
      },
    ],
  },
  {
    key: 'dead-leads',
    num: '02',
    title: 'Find the money sitting in your CRM',
    time: 'About 45 minutes',
    problem:
      'You have leads who asked for a quote, said "call me next month," and never heard from you again. You already paid for them.',
    result: 'A list of every lead that went cold, and a personal text going out to each one. No new ad spend.',
    steps: [
      {
        id: 'dl-1',
        text: 'Connect Claude to GoHighLevel. In Claude, open Settings → Connectors and add GoHighLevel, then sign in and pick your sub-account.',
      },
      {
        id: 'dl-2',
        text: 'Ask Claude to find your cold leads with the prompt below.',
        copy: {
          label: 'Prompt for Claude',
          body: `Look at my GoHighLevel contacts. Find everyone added in the last 6 months who:
- never booked an appointment, or
- asked for a quote and never bought, or
- hasn't heard from us in 30+ days

Group them by what they originally asked about (use tags, source, or their first message). Give me a count per group and the 10 best leads in each group, with why you picked them.`,
        },
      },
      {
        id: 'dl-3',
        text: 'Read the list. Take out anyone who said no, asked to stop, or is already a customer.',
      },
      {
        id: 'dl-4',
        text: 'Have Claude write one short text per group.',
        copy: {
          label: 'Prompt for Claude',
          body: `For each group, write one text message I can send. Rules:
- Under 160 characters
- Mention what they originally asked about
- Sound like a person, not a company
- No discounts, no "just checking in"
- End with a simple question they can answer in one word`,
        },
      },
      {
        id: 'dl-5',
        text: 'Ask Claude to add a tag to each contact on the list (for example "reactivation-dec") so GoHighLevel can find them.',
      },
      {
        id: 'dl-6',
        text: 'In GoHighLevel, build a workflow with the trigger Contact Tag (your new tag) that sends the text. Turn on drip mode at 25 contacts a day so you can keep up with replies.',
      },
      {
        id: 'dl-7',
        text: 'Only text people who gave you permission to text them. Keep the opt-out line GoHighLevel adds.',
      },
      {
        id: 'dl-8',
        text: 'Answer every reply the same day. Book the yeses. That’s where the money is.',
      },
    ],
  },
  {
    key: 'owner-os',
    num: '03',
    title: 'Get a morning briefing on your whole business',
    time: 'About 20 minutes',
    problem:
      'Most owners find out about problems last: a lead nobody called, a no-show nobody followed up, an invoice nobody chased.',
    result: 'A two-minute briefing every morning from your own GoHighLevel data. You see the whole business without logging into anything.',
    steps: [
      {
        id: 'os-1',
        text: 'Make sure Claude is connected to GoHighLevel (step 1 of the last section).',
      },
      {
        id: 'os-2',
        text: 'Run the briefing prompt below once by hand.',
        copy: {
          label: 'Morning briefing prompt',
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
        id: 'os-3',
        text: 'Check two of the numbers against GoHighLevel yourself. If something’s wrong, tell Claude what you see and have it fix how it counts.',
      },
      {
        id: 'os-4',
        text: 'Set it to run on its own: in Claude, make it a scheduled task every weekday at 6:30am. No scheduled tasks on your plan? Save the prompt and run it with your coffee.',
      },
      {
        id: 'os-5',
        text: 'Add a weekly version for Monday mornings.',
        copy: {
          label: 'Weekly briefing prompt',
          body: `Same as my morning briefing, but for the last 7 days. Compare each number to the week before, and list the 3 leads most likely to buy this week.`,
        },
      },
    ],
  },
];

export const ALL_STEP_IDS = WAYS.flatMap(w => w.steps.map(s => s.id));
