// Blog posts. Mirrors lib/case-studies.js — content lives here, layout lives in
// components/BlogIndex.jsx and components/BlogPost.jsx.
//
// TO ADD A POST: append an object to POSTS below. Everything else is automatic —
// the index page, the post page, JSON-LD, and the sitemap all read from this file.
//
// Post shape:
//   slug        url segment, e.g. /blog/your-slug
//   title       H1. Write it as the question a prospect actually types.
//   metaTitle   browser tab + search result title
//   metaDesc    search result snippet, ~155 chars
//   date        ISO date, 'YYYY-MM-DD'
//   updated     ISO date, optional
//   category    short label shown on the card
//   readMinutes integer
//   answer      THE ANSWER-FIRST BLOCK. 100-170 words, self-contained, no
//               pronouns referring outside itself. This is what an AI engine
//               lifts and what Google shows as a snippet. Write it so it stands
//               alone with zero surrounding context.
//   sections    [{ h2, paras: [], list?: [] }] — question-shaped h2s where possible
//   relatedLoop slug of the loop page this post feeds, or null
//   faqs        [{ q, a }] — optional, renders + emits FAQPage schema

export const POSTS = [
  {
    slug: 'how-fast-should-you-respond-to-a-new-lead',
    title: 'How Fast Should You Respond to a New Lead?',
    metaTitle: 'How Fast Should You Respond to a New Lead? | Nxt Apex AI',
    metaDesc: 'The honest answer is under five minutes, and under one minute is meaningfully better. Here is why response time decides who gets the job.',
    date: '2026-09-01',
    category: 'Lead Response',
    readMinutes: 5,
    relatedLoop: 'speed-to-lead',

    answer:
      'You should respond to a new lead in under five minutes, and under one minute is meaningfully better. The reason is behavioral rather than technical. A prospect who just submitted a form is still at their desk with the tab open and is actively contacting other businesses in the same sitting. Reaching them inside that window means having a conversation. Reaching them an hour later means interrupting someone who has already started talking to a competitor. Most businesses believe they respond quickly because they measure their best case rather than their average, and averages are dragged down by nights, weekends, and hours when staff are already busy. Sustaining a sub-minute response time manually is not realistic, because it depends on a person being free, awake, and watching the right inbox at the moment the lead arrives.',

    sections: [
      {
        h2: 'Why the first response wins so often',
        paras: [
          'A form fill is not a commitment. It is a shortlist entry. Someone with a broken air conditioner or a legal question does not research one company and wait patiently — they submit two or three inquiries in a row and take the first useful reply.',
          'The business that answers first sets the frame. They ask the questions, they establish what matters, and by the time the second company calls back, the prospect has already had the conversation once and has less appetite to have it again. This is why response time beats service quality more often than anyone in business wants to admit.',
        ],
      },
      {
        h2: 'What most businesses actually average',
        paras: [
          'Owners consistently estimate their response time using the fastest case they can remember — the lead that came in at 10am on a Tuesday when someone happened to be at the desk. That is not the average.',
          'The average includes the lead that arrived at 6:40pm on Friday, the one that came in while the whole team was on a job, and the one that landed in a shared inbox nobody owns. Those cases are not edge cases. For most service businesses they are the majority of the week.',
        ],
        list: [
          'Nights and weekends are a majority of the hours in a week',
          'Peak inquiry times often overlap with peak service delivery times',
          'A shared inbox with no single owner is a queue with no server',
        ],
      },
      {
        h2: 'Why manual follow-up cannot hold a fast response time',
        paras: [
          'Speed is not a discipline problem. A motivated team can hit a two-minute response for about a week, and then a busy day arrives and the standard quietly resets.',
          'The dependency is the issue: manual response requires a specific person to be available, awake, and looking at the right place at the exact moment a lead arrives. Every one of those conditions fails regularly, and none of them fail in a way that shows up in a report.',
        ],
      },
      {
        h2: 'How to tell if slow response is costing you',
        paras: [
          'The clearest signal is a gap between inquiry volume and booked appointments that nobody can explain. If leads are arriving and conversion is weak, the instinct is to blame lead quality — and lead quality is the most expensive wrong answer available, because it leads to cutting the source rather than fixing the follow-up.',
          'Before changing anything about where leads come from, measure the time between arrival and first contact across an entire month, including the nights and weekends. That number is usually the surprise.',
        ],
      },
    ],

    faqs: [
      {
        q: 'Is five minutes really the cutoff?',
        a: 'It is a widely used benchmark rather than a hard threshold. Response value decays continuously, so there is no cliff at five minutes — one minute beats five, five beats thirty, and thirty beats two hours. The benchmark is useful because it is achievable and because most businesses are nowhere near it.',
      },
      {
        q: 'Does an automated first response hurt conversion?',
        a: 'Only when it reads like an autoresponder. A generic message saying your inquiry is important to us performs badly, because the prospect has already received that from other companies. A reply that references what they specifically asked about and moves toward scheduling performs like a fast human response, because functionally that is what it is.',
      },
      {
        q: 'What should the first message actually say?',
        a: 'It should acknowledge the specific thing they asked about, answer one immediate question if there is an obvious one, and propose a next step. The goal of the first message is not to close — it is to start the conversation before anyone else does.',
      },
      {
        q: 'Should we call or text first?',
        a: 'Text tends to get faster engagement for inbound web leads because it is lower friction and does not require the prospect to be free to talk. A call is stronger when the inquiry itself came by phone. The best setup uses both, starting with whichever channel the lead used to reach you.',
      },
    ],
  },
  {
    slug: 'what-does-a-missed-call-cost-your-business',
    title: 'What Does a Missed Call Actually Cost Your Business?',
    metaTitle: 'What Does a Missed Call Actually Cost Your Business? | Nxt Apex AI',
    metaDesc: 'A missed call costs more than a missed job, because the caller does not wait. Here is how to calculate what yours are worth and why the number is invisible.',
    date: '2026-09-01',
    category: 'Phone & Intake',
    readMinutes: 5,
    relatedLoop: 'ai-receptionist',

    answer:
      'The cost of a missed call is the value of the job multiplied by the share of callers who buy, because a caller who cannot reach you generally does not wait — they call the next business on the list. For a service business with an average job value of 400 dollars that closes half its phone inquiries, each unanswered call is worth roughly 200 dollars in expected revenue. The figure is invisible in normal reporting, which is why it goes unaddressed for years: an abandoned call leaves no lead record, no form entry, and no line item. It shows up only as revenue that never arrived. Calculating it requires pulling call logs from your phone provider and counting unanswered inbound calls over a full month, including nights and weekends, rather than estimating from memory.',

    sections: [
      {
        h2: 'Why phone callers are worth more than form fills',
        paras: [
          'Someone who picks up the phone has skipped the comparison stage. They are not gathering options — they want to talk to a person now, which usually means the need is immediate and the decision is close.',
          'That urgency is exactly why they will not wait for a callback. The same trait that makes a phone lead valuable makes them the least forgiving about being unable to reach you.',
        ],
      },
      {
        h2: 'How to work out your own number',
        paras: [
          'Most phone systems will export inbound call records. What you want is the count of calls that rang out, hit voicemail, or were abandoned, across a full month rather than a sample week.',
        ],
        list: [
          'Pull total unanswered inbound calls for a full month',
          'Subtract obvious spam and repeat calls from the same number within an hour',
          'Multiply what remains by your average job value',
          'Multiply that by the share of phone inquiries that normally become customers',
        ],
      },
      {
        h2: 'Why the number is almost always larger than expected',
        paras: [
          'Owners estimate missed calls from the ones they know about — the voicemail they listened to, the customer who mentioned trying twice. Those are the callers who persisted.',
          'The ones who hung up after four rings and dialed the next listing leave no trace at all. They are the majority, and they are entirely absent from the mental estimate.',
          'The second and third simultaneous call is the other blind spot. A front desk that answers every call it hears still misses everything that arrives while the line is busy.',
        ],
      },
      {
        h2: 'Why hiring is rarely the fix',
        paras: [
          'The instinct is to add front desk coverage, but the math usually does not work. Missed calls cluster at exactly the times staffing is hardest to justify: evenings, weekends, lunch, and peak service hours when everyone is already occupied.',
          'Covering those hours with people means paying for a full shift to catch a handful of calls. The calls are worth catching; a shift built around them usually is not.',
        ],
      },
    ],

    faqs: [
      {
        q: 'Do people really not leave voicemails anymore?',
        a: 'Voicemail rates for inbound sales calls have fallen sharply, and the reason is practical: a caller with a phone in their hand and a list of businesses in front of them can dial the next number in three seconds. Leaving a message and waiting is strictly slower than calling someone else.',
      },
      {
        q: 'What counts as a missed call worth measuring?',
        a: 'Any inbound call that did not reach a person, including calls that hit voicemail and calls abandoned during ringing. Exclude obvious spam and repeat dials from the same number inside a short window, since those represent one caller rather than several.',
      },
      {
        q: 'Is call volume or answer rate the more important number?',
        a: 'Answer rate, by a wide margin. Volume tells you how much demand you are generating, which is usually the thing already being invested in. Answer rate tells you how much of that demand you are converting into a conversation, which is usually the thing nobody is measuring.',
      },
      {
        q: 'Does an after-hours answering service solve this?',
        a: 'Partly. An answering service captures the caller details so the lead is not lost entirely, but the customer still waits for a callback, which means they can still book with whoever answers first. It converts a lost call into a delayed one rather than a completed one.',
      },
    ],
  },

  {
    slug: 'how-old-can-a-lead-be-before-its-not-worth-calling',
    title: 'How Old Can a Lead Be Before It Is Not Worth Calling?',
    metaTitle: 'How Old Can a Lead Be Before It Is Not Worth Calling? | Nxt Apex AI',
    metaDesc: 'Old leads convert more often than most businesses expect. What matters is why they went quiet, not how long ago it happened.',
    date: '2026-09-01',
    category: 'Follow-Up',
    readMinutes: 5,
    relatedLoop: 'database-reactivation',

    answer:
      'Leads two to three years old routinely convert, and past customers older than that often convert at the highest rate of any group. Age is a weak predictor on its own, because most contacts go quiet for reasons of timing rather than rejection: the prospect was not ready, the budget was not there that quarter, or follow-up simply stopped after two attempts. None of those conditions are permanent, and all of them change without the business ever hearing about it. What actually predicts whether an old lead is worth contacting is why they went quiet and whether their original need still exists. A contact who explicitly said no and bought elsewhere is genuinely dead. A contact who stopped replying is usually just a contact nobody followed up with a third time.',

    sections: [
      {
        h2: 'Why silence gets misread as rejection',
        paras: [
          'When a prospect stops replying, the record in your CRM shows nothing. Nothing looks the same whether they bought from a competitor, lost their budget, got busy, or never saw the second email.',
          'Because those outcomes are indistinguishable in the data, businesses collapse them into one category and call it dead. Most of that category is not dead. It is unattended.',
        ],
      },
      {
        h2: 'Which old contacts are actually worth working',
        paras: [
          'Not every contact deserves the same treatment, and the difference is not age. It is what the record says about how the relationship ended.',
        ],
        list: [
          'Past customers — the strongest group, because they already bought from you once',
          'Leads who engaged then went quiet — the largest group and usually the most recoverable',
          'Leads who never responded at all — worth one segmented attempt, low expectations',
          'Leads who explicitly declined and bought elsewhere — genuinely finished, leave them alone',
        ],
      },
      {
        h2: 'Why the third follow-up almost never happens',
        paras: [
          'Follow-up dies at roughly the second attempt for a structural reason rather than a motivational one. The first two are prompted by the lead arriving. Everything after that depends on someone remembering, unprompted, days later, while newer leads are arriving.',
          'Newer leads always win that competition, because they feel more alive. So the older contact quietly ages out, and the pattern repeats with the contact behind them.',
        ],
      },
      {
        h2: 'The thing that makes old outreach work or fail',
        paras: [
          'Relevance, not recency. A message that references what someone actually inquired about, two years later, reads as a business that kept track. The same message sent undifferentiated to an entire list reads as spam, and does real damage to your domain reputation and your brand.',
          'This is why segmentation comes before sending. The list has to be split by what each group originally wanted before a single message goes out.',
        ],
      },
    ],

    faqs: [
      {
        q: 'Is there an age where a lead is genuinely worthless?',
        a: 'Less often than expected. The clearer disqualifier is a record showing the person explicitly declined and purchased elsewhere. Beyond that, contact details going stale is a bigger practical limit than interest fading — a five year old phone number may simply no longer belong to that person.',
      },
      {
        q: 'Will contacting old leads hurt our sender reputation?',
        a: 'It can, if you send to an unclean list all at once. Bounces and spam complaints from dead addresses damage deliverability for your live contacts too. Cleaning the list and sending in segments rather than one batch is what protects the rest of your email.',
      },
      {
        q: 'How many contacts do we need for this to be worth doing?',
        a: 'A few hundred genuinely interested contacts is enough to learn whether the list responds. The deciding factor is whether those people had real intent when they first came in, not the raw count.',
      },
      {
        q: 'Should we call, email, or text old leads?',
        a: 'Start on the channel they originally used to reach you, since that is the one they chose and the one you most likely have consent for. Text tends to get the fastest response, but only where the contact opted into it — texting someone who never consented is both ineffective and a compliance problem.',
      },
    ],
  },

  {
    slug: 'why-website-visitors-leave-without-contacting-you',
    title: 'Why Do Most Website Visitors Leave Without Contacting You?',
    metaTitle: 'Why Do Most Website Visitors Leave Without Contacting You? | Nxt Apex AI',
    metaDesc: 'Most visitors leave over one unanswered question, not because they were not interested. Here is what actually blocks them and why forms make it worse.',
    date: '2026-09-01',
    category: 'Website Conversion',
    readMinutes: 5,
    relatedLoop: 'website-manager',

    answer:
      'Most website visitors leave because a specific question went unanswered, not because they lacked interest. The common blockers are narrow and practical: whether you serve their location, roughly what something costs, and how soon you can start. A visitor who cannot resolve one of those in a reasonable time leaves to find a site that answers it, and because they never identified themselves, the business has no record the visit happened. Contact forms do not solve this, because a form is not an answer — it is a request to wait. Someone deciding at 9pm on a Sunday wants their question resolved now, and a form offering a callback during business hours asks them to pause a decision they are ready to make. The result reads in analytics as a bounce, which is indistinguishable from disinterest.',

    sections: [
      {
        h2: 'The three questions that block most visitors',
        paras: [
          'Across service businesses the blockers are remarkably consistent, and none of them are objections. They are logistics.',
        ],
        list: [
          'Do you serve my area — asked constantly, answered vaguely on most sites',
          'What does this roughly cost — where a range beats silence, even a wide one',
          'How soon can you actually start — urgent buyers filter on this before anything else',
        ],
      },
      {
        h2: 'Why a contact form is not an answer',
        paras: [
          'A form transfers the work to the visitor and the timeline to you. They fill in their details, and in exchange they get a promise that someone will be in touch.',
          'For a visitor who is comparing options, that is a worse deal than clicking back and trying the next result, where the answer might be on the page. The form does not fail because it is ugly. It fails because it is slower than leaving.',
        ],
      },
      {
        h2: 'Why your best traffic arrives when nobody is there',
        paras: [
          'Evenings and weekends are when people research service purchases, because that is when they are home looking at the problem. That traffic is often the most motivated of the week.',
          'It is also the traffic with the least support available. The highest-intent visitors consistently arrive at the hours when there is nobody to answer a question, which means the conversion gap is largest exactly where the opportunity is biggest.',
        ],
      },
      {
        h2: 'What to fix before touching the design',
        paras: [
          'The instinct when conversion is weak is to redesign. That is usually expensive and beside the point, because the blockers above are content problems rather than layout problems.',
          'Putting service area, price range, and availability in plain language where a visitor will actually encounter them resolves more exits than a new template will. The next step beyond that is being able to answer the question live, at the moment it comes up, so nobody has to leave to find out.',
        ],
      },
    ],

    faqs: [
      {
        q: 'What is a normal bounce rate for a service business site?',
        a: 'It varies too much by traffic source to be a useful benchmark on its own. A more actionable measure is the ratio of visitors to contacts, tracked over time against your own baseline, because that reflects whether the site is converting the traffic you actually get.',
      },
      {
        q: 'Should we publish pricing on the website?',
        a: 'Publish a range or a starting point wherever the work allows it. Complete silence on price causes exits from qualified buyers, and it also attracts inquiries from people who were never in your budget. A range filters in both directions.',
      },
      {
        q: 'Do live chat widgets actually help?',
        a: 'Only when they answer. A widget that collects a name and email so someone can follow up later reproduces the form problem in a different shape. What changes behavior is a response that resolves the question during the visit.',
      },
      {
        q: 'Is this a mobile problem specifically?',
        a: 'Mobile makes it sharper. Most service business traffic is mobile, and a phone screen has less room for a visitor to hunt for a buried answer. If the answer is not obvious quickly, the exit happens faster than it would on desktop.',
      },
    ],
  },

  {
    slug: 'why-unhappy-customers-leave-more-reviews',
    title: 'Why Do Unhappy Customers Leave More Reviews Than Happy Ones?',
    metaTitle: 'Why Do Unhappy Customers Leave More Reviews Than Happy Ones? | Nxt Apex AI',
    metaDesc: 'Complaints are self-motivating and satisfaction is not. That asymmetry is why your public rating understates your work, and what to do about it.',
    date: '2026-09-01',
    category: 'Reputation',
    readMinutes: 4,
    relatedLoop: 'reputation-manager',

    answer:
      'Unhappy customers leave more reviews than happy ones because dissatisfaction is self-motivating and satisfaction is not. A customer whose expectations were violated experiences an unresolved grievance, and writing a review resolves it. A customer who got exactly what they paid for experiences nothing unusual — the outcome met expectations, so there is no internal prompt to act. The result is an asymmetry: left alone, a business collects reviews disproportionately from the minority it disappointed, and its public rating drifts below the quality of its actual work. The correction is not to suppress negative reviews, which violates platform terms and is usually visible anyway. It is to remove the asymmetry by asking every customer, so that satisfied customers are prompted at the same rate that dissatisfied ones prompt themselves.',

    sections: [
      {
        h2: 'The asymmetry, plainly',
        paras: [
          'Getting what you paid for is not a story. Getting less than you paid for is. Only one of those two experiences generates the impulse to tell other people about it.',
          'That means an unprompted review page is not a sample of your customers. It is a sample of your outliers, weighted toward the unhappy end, and it is what prospects use to judge you.',
        ],
      },
      {
        h2: 'Why timing decides whether the ask works',
        paras: [
          'Satisfaction peaks immediately after the customer experiences the result they hired you for, and it declines from there. Not into dissatisfaction — into indifference, as normal life resumes and the job stops being memorable.',
          'A request sent a week later is competing with everything that happened in the intervening week. The same customer, equally happy, is now far less likely to act.',
        ],
      },
      {
        h2: 'What separates a compliant process from a risky one',
        paras: [
          'The distinction platforms care about is whether everyone gets asked. Filtering the ask so only likely-positive customers are invited to review is a terms violation on Google and most other platforms.',
          'What is permitted, and what actually works better, is asking every customer and routing the conversation based on how it went. Everyone is asked. Nobody is prevented from reviewing you. Unhappy customers get a direct line to you first, which is service recovery rather than suppression.',
        ],
      },
      {
        h2: 'Why this matters more than it used to',
        paras: [
          'Review volume, recency, and rating are among the strongest signals AI engines use when recommending local businesses. A business with recent, plentiful reviews is materially more likely to appear in an AI-generated recommendation than an equivalent business without them.',
          'That raises the cost of the asymmetry. A rating that understates your work no longer just loses the prospect reading it — it removes you from answers you would otherwise have appeared in.',
        ],
      },
    ],

    faqs: [
      {
        q: 'Is it against Google policy to ask customers for reviews?',
        a: 'No. Asking customers for reviews is explicitly permitted. What is prohibited is review gating — selectively soliciting only customers you expect to be positive, or offering incentives in exchange for reviews.',
      },
      {
        q: 'How should we handle a negative review once it is posted?',
        a: 'Respond publicly, briefly, without defensiveness, and offer to resolve it directly. Prospects read the response more carefully than the complaint, and a measured reply often does more for your credibility than the review costs you.',
      },
      {
        q: 'Does an unbroken run of five star reviews look better?',
        a: 'It reads as less credible than a strong average with occasional criticism. A visible mix suggests the reviews are genuine, and it gives the positive ones weight they would not otherwise carry.',
      },
      {
        q: 'Which platform should we prioritize?',
        a: 'Google, for most local businesses, because it carries the most weight in both traditional search and AI-generated recommendations. Industry-specific platforms matter where your buyers actually look, which is worth checking rather than assuming.',
      },
    ],
  },

  {
    slug: 'how-to-tell-if-your-automation-is-broken',
    title: 'How Do You Know If Your Automation Is Quietly Broken?',
    metaTitle: 'How Do You Know If Your Automation Is Quietly Broken? | Nxt Apex AI',
    metaDesc: 'Automation usually fails silently, not loudly. Your dashboard will not tell you, because a broken system and a slow month look identical.',
    date: '2026-09-01',
    category: 'Operations',
    readMinutes: 4,
    relatedLoop: 'pipeline-manager',

    answer:
      'You find out your automation is broken by comparing current behavior against what it should be, because most automation failures produce no error message. An expired API token, a renamed form field, or a disconnected calendar will stop leads flowing while every system involved continues reporting normal operation. Standard reporting does not catch this, since a dashboard showing reduced numbers looks identical whether the cause is a broken integration or a genuinely slow week. The practical detection method is to track expected values for each stage of the pipeline — leads received, responses sent, appointments booked, handoffs completed — and treat a sustained deviation from your own baseline as a fault to investigate rather than a fluctuation to absorb. Manual spot checks work as a fallback: send a real test lead through the full path weekly and confirm it arrives.',

    sections: [
      {
        h2: 'Why failures are silent by default',
        paras: [
          'Integrations between systems fail at the seams, and the seams are where nobody owns the error. Your CRM believes it delivered the data. The receiving tool never knew it was expecting anything. Neither has a reason to raise an alarm.',
          'The most common causes are mundane: a credential expires, a form field gets renamed during a website edit, a calendar fills up, a plan limit is reached. Each stops the flow while leaving every dashboard reporting green.',
        ],
      },
      {
        h2: 'The specific things worth watching',
        paras: [
          'Whole-system outages are rare and obvious. The expensive failures are partial, and they are visible only at the stage where they happen.',
        ],
        list: [
          'Leads received per day against your normal range for that day of week',
          'Time between lead arrival and first response, tracked as a distribution rather than an average',
          'Share of conversations that reach a booked appointment',
          'Handoffs to a human that were actually picked up',
        ],
      },
      {
        h2: 'Why detection lag is the real cost',
        paras: [
          'Fixing a broken integration usually takes minutes. The expense is everything that fell through between the moment it broke and the day somebody noticed.',
          'When that gap is measured in weeks, the cost of the outage is a multiple of the cost of the fix — and it is entirely made of leads that never knew they failed to reach you.',
        ],
      },
      {
        h2: 'The cheapest check you can run today',
        paras: [
          'Submit a real lead through your own website form. Use a phone number and email you control, and follow it the whole way: did the automated response arrive, did it appear in the CRM, did the notification reach the right person, could you book a time.',
          'Doing this once a week catches most silent failures within days rather than months. It is not a substitute for monitoring, but it costs nothing and it is dramatically better than assuming.',
        ],
      },
    ],

    faqs: [
      {
        q: 'How often do automations actually break?',
        a: 'Often enough that it should be planned for. Anything depending on a third-party integration is exposed to credential expiry, API changes, plan limits, and edits made elsewhere on your own site. The more tools in the chain, the more seams there are to fail at.',
      },
      {
        q: 'Will my CRM tell me if something stops working?',
        a: 'Usually not. A CRM reports what it received; it has no expectation of what it should have received. Absence of data looks the same as absence of leads, which is exactly why silent failures survive so long.',
      },
      {
        q: 'What is the first thing to check when volume drops?',
        a: 'Send a test lead through the complete path before assuming demand fell. If the test arrives correctly at every stage, the drop is real and worth investigating on the marketing side. If it does not, you have found the fault in a few minutes.',
      },
      {
        q: 'Is monitoring worth it for a small operation?',
        a: 'The relevant question is what a fortnight of undetected downtime would cost you, not how large the business is. A small operation with high-value jobs can lose more to a silent two week failure than a larger one with cheaper work.',
      },
    ],
  },
];

export function getPost(slug) {
  return POSTS.find(p => p.slug === slug);
}

export const POSTS_BY_DATE = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
