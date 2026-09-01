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
];

export function getPost(slug) {
  return POSTS.find(p => p.slug === slug);
}

export const POSTS_BY_DATE = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
