// Copy for /closed-loop-system. Kept out of the client component so the route's
// server-side schema can import it without crossing the client boundary.

export const ANSWER_HEADING = 'What is the Closed Loop System?';
export const ANSWER_BODY =
  'The Closed Loop System is a set of six AI agents, each one closing a specific way revenue leaves a business before it becomes revenue. Speed to Lead closes the response loop, AI Receptionist closes the missed call loop, Database Reactivation closes the dead lead loop, Website Manager closes the browse and bounce loop, Reputation Manager closes the trust loop, and Pipeline Manager closes the oversight loop by watching the other five. The premise is that most businesses do not have a lead generation problem — they have a leak between the lead arriving and someone acting on it. Each loop is a named, separate failure point, which means each one can be measured, closed, and verified independently rather than treated as a vague follow-up problem.';

export const FAQS = [
  {
    q: 'Why call them loops instead of services?',
    a: 'A loop is something that opens and has to be closed. A lead arrives and the loop opens; someone responds and it closes. Naming them this way makes the failure visible — an open loop is a specific thing left hanging, not a general sense that follow-up could be better. It also means each one has a measurable close rate.',
  },
  {
    q: 'Do we have to implement all six?',
    a: 'No, and most businesses should not start with all six. One or two loops are usually leaking far more than the rest, and closing those first produces most of the available gain. The assessment exists to identify which ones, in what order.',
  },
  {
    q: 'How is this different from buying six separate tools?',
    a: 'Separate tools do not know about each other. A lead that an AI receptionist books does not appear in the follow-up sequence; a review request fires for a customer whose job was rescheduled. The loops share one view of the customer, which is also what makes oversight possible — Pipeline Manager can only watch the other five because they report into the same place.',
  },
  {
    q: 'Which loop is usually the biggest leak?',
    a: 'Speed to Lead and the missed call loop, for most service businesses. Both fail silently and both affect the highest-intent prospects, which is the expensive combination. Database Reactivation often produces the fastest visible return, because those contacts are already paid for.',
  },
  {
    q: 'How long does it take to close a loop?',
    a: 'The first two are typically live within six days. Most of that time goes to mapping how your business actually handles inquiries today and writing responses that sound like you, rather than to technical setup.',
  },
  {
    q: 'What happens if a loop breaks after it is built?',
    a: 'That is what the oversight loop is for. Automation fails silently more often than it fails loudly, so Pipeline Manager watches volume, response times, and booking rates across the other five and flags deviation rather than waiting for a total outage.',
  },
];

