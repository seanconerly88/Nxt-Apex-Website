// The Closed Loop System — one page per loop.
// Mirrors lib/verticalConfig.js: page copy lives here, layout lives in components/LoopPage.jsx.

export const LOOPS = {
  'speed-to-lead': {
    slug: 'speed-to-lead',
    name: 'Speed to Lead',
    closes: 'Closes the response loop',
    cardBody: 'Every new lead gets a personal reply in under 60 seconds, day or night, with nobody lifting a finger.',
    metaTitle: 'Speed to Lead: Reply to Every Lead in Under 60 Seconds | Nxt Apex AI',
    metaDesc: 'Most leads go to whoever answers first. Speed to Lead replies to every new inquiry in under 60 seconds, day or night, with nobody lifting a finger.',
    h1: 'The Lead Went Cold in the Nine Minutes It Took You to Call Back',
    hook: 'A form fill has a shelf life. Somebody fills it out, waits, and starts contacting other companies while they wait. The business that answers first usually wins, and it is rarely the business with the better service.',
    pitch: 'Speed to Lead answers every new inquiry in under 60 seconds — text, email, or form — with a real reply that moves toward a booked appointment. It runs at 2am the same way it runs at 2pm.',

    // Answer-first block for AI engines and featured snippets.
    answerHeading: 'What is speed to lead?',
    answerBody: 'Speed to lead is the time between a prospect submitting an inquiry and your business making first contact. It matters because inquiry intent decays fast: a lead who filled out a form is actively shopping, and most of them contact several businesses in the same sitting. Whoever replies first anchors the conversation and usually keeps it. Manual follow-up cannot hold a sub-minute response time, because it depends on a person being free, awake, and looking at the right inbox. An automated speed-to-lead system removes that dependency by sending a personalized first reply the moment a lead arrives — nights, weekends, and while your team is on other calls — then continues following up until the lead responds or opts out.',

    problemHeading: 'Why response time decides who gets the job',
    problems: [
      { hint: 'They contacted four companies.', title: 'You Are In a Race You Did Not Know Started', body: 'A lead form is not a commitment. It is one of several a prospect submits in the same sitting. The clock starts the second they hit submit, and nobody tells you it started.' },
      { hint: 'Nobody is at the desk at 9pm.', title: 'Your Coverage Has Holes By Design', body: 'Leads arrive nights, weekends, and while your team is already on the phone. Human coverage cannot cover those hours without hiring for them. Most businesses just absorb the loss and call it normal.' },
      { hint: 'It looks like a lead quality problem.', title: 'You Will Blame the Wrong Thing', body: 'Slow response looks identical to bad leads in your reporting. Both show up as inquiries that never converted. Businesses cut ad spend over a follow-up problem all the time.' },
    ],

    stepsHeading: 'How Speed to Lead works',
    steps: [
      { title: 'The lead lands', body: 'Form, call, chat, or ad — every source routes into one place so nothing depends on someone checking the right inbox.' },
      { title: 'A reply goes out in under 60 seconds', body: 'A real, personalized message referencing what they asked about. Not an autoresponder that says we received your inquiry.' },
      { title: 'The conversation continues', body: 'It answers questions, handles the back and forth, and works toward a booked time on your calendar.' },
      { title: 'Your team gets a warm handoff', body: 'A person steps in when there is something worth a person. Everything before that is already done.' },
    ],

    faqs: [
      { q: 'What is a good speed to lead time?', a: 'Under five minutes is the common benchmark, and under one minute is meaningfully better. The reason is behavioral rather than technical: a prospect who just submitted a form is still at their desk with the tab open. Reach them in that window and you are having a conversation. Reach them an hour later and you are interrupting them.' },
      { q: 'Does an automated first reply feel robotic to the lead?', a: 'It should not, and that is the whole design constraint. The reply references what they specifically asked about and reads like a person who happened to be available. Generic autoresponders that say your inquiry is important to us do not work, because the prospect has already read that message from three other companies.' },
      { q: 'What happens if the lead replies with a question we cannot automate?', a: 'It hands off to your team with the full conversation attached. The system is built to handle the predictable part of the exchange — scheduling, qualification, common questions — and escalate anything else rather than guess.' },
      { q: 'Does this replace our CRM?', a: 'No. It connects to what you already run. The point is closing the response gap, not adding another platform your team has to check.' },
      { q: 'How long does it take to set up?', a: 'Most speed-to-lead builds are live within a couple of weeks. The bulk of that time goes to mapping your actual intake sources and writing replies that sound like your business, not to technical setup.' },
      { q: 'What if we already respond fast during business hours?', a: 'Then your gap is the other two thirds of the week. Nights, weekends, and holidays are when a lead is most likely to be shopping and least likely to reach anyone. That is usually where the recoverable revenue is.' },
    ],
  },

  'ai-receptionist': {
    slug: 'ai-receptionist',
    name: 'AI Receptionist',
    closes: 'Closes the missed call loop',
    cardBody: 'Answers every call your team cannot get to and books the ones worth booking.',
    metaTitle: 'AI Receptionist: Answer Every Call You Are Missing | Nxt Apex AI',
    metaDesc: 'Every missed call is a customer who called your competitor next. An AI receptionist answers the calls your team cannot get to and books the ones worth booking.',
    h1: 'The Calls You Miss Do Not Leave a Voicemail. They Call Someone Else.',
    hook: 'Nobody tracks missed calls because a missed call leaves no record worth looking at. A customer who needed something, could not reach you, and found someone else within the hour shows up nowhere in your reporting.',
    pitch: 'An AI receptionist picks up what your team cannot — during jobs, after hours, on the second and third simultaneous ring — and books the calls worth booking instead of sending them to voicemail.',

    answerHeading: 'What is an AI receptionist?',
    answerBody: 'An AI receptionist is a voice system that answers inbound calls in natural conversation, handles routine requests, and books appointments directly on your calendar. It differs from an automated phone menu in that the caller speaks normally instead of navigating options, and it differs from voicemail in that the caller gets an answer rather than a callback promise. Businesses use it to cover the calls a human team structurally cannot take: simultaneous calls, after-hours calls, and calls that come in while staff are with customers. It answers on the first ring every time, and escalates anything outside its scope to a person with the call context already captured.',

    problemHeading: 'Why missed calls are the quietest revenue leak you have',
    problems: [
      { hint: 'A missed call leaves no trace.', title: 'You Cannot See What You Are Losing', body: 'A lost lead form shows up in a report. A caller who hung up after four rings shows up nowhere. The leak is invisible, which is exactly why it never gets fixed.' },
      { hint: 'They needed it today.', title: 'Phone Callers Are Your Hottest Buyers', body: 'Someone who picks up the phone instead of filling out a form is further along and more urgent. That urgency is why they will not wait for a callback — they will call the next listing.' },
      { hint: 'Two calls, one person.', title: 'You Cannot Hire Your Way Out Of This', body: 'The second simultaneous call goes unanswered no matter how good your front desk is. Peak hours, lunch, sick days, and 8pm are all the same problem wearing different clothes.' },
    ],

    stepsHeading: 'How the AI Receptionist works',
    steps: [
      { title: 'It answers on the first ring', body: 'Every call, including the third one that comes in while two are already active.' },
      { title: 'It has a real conversation', body: 'The caller talks normally. No press one for scheduling. It answers what it knows and asks what it needs.' },
      { title: 'It books directly on your calendar', body: 'Qualified callers get a time before they hang up, with your availability rules respected.' },
      { title: 'It routes anything it should not handle', body: 'Emergencies, existing customers with issues, and anything unusual go to a person with the context attached.' },
    ],

    faqs: [
      { q: 'Can callers tell they are talking to AI?', a: 'Some can and some cannot, and it matters less than most owners expect. What callers react to is whether they got their question answered and their appointment booked. A caller who reaches a competent system on the first ring reports a better experience than one who reaches voicemail and waits for a callback.' },
      { q: 'What happens when someone calls with an emergency?', a: 'It is configured to identify urgent calls and route them to a real person immediately, using whatever escalation path you already use. Emergency handling is defined during setup rather than left to the system to interpret.' },
      { q: 'How is this different from an answering service?', a: 'An answering service takes a message and passes it along, which means the customer still waits. An AI receptionist completes the transaction — it answers the question, checks real availability, and books the appointment during the call.' },
      { q: 'Does it work alongside our existing front desk?', a: 'That is the most common setup. It takes overflow, after-hours, and simultaneous calls while your team handles what they are already handling. The goal is covering the gaps, not replacing the people.' },
      { q: 'What information does it need to answer questions accurately?', a: 'Your services, pricing structure, service area, hours, and booking rules. Setup is mostly loading what your front desk already knows so the answers match what a customer would hear from your team.' },
      { q: 'Can it handle calls in more than one language?', a: 'Yes. Language support is set during configuration based on the markets you serve.' },
    ],
  },

  'database-reactivation': {
    slug: 'database-reactivation',
    name: 'Database Reactivation',
    closes: 'Closes the dead lead loop',
    cardBody: 'Works the list you already paid to build and never followed up on.',
    metaTitle: 'Database Reactivation: Revenue From the List You Already Paid For | Nxt Apex AI',
    metaDesc: 'You already paid to acquire every contact in your CRM. Database reactivation works the list you stopped following up on and books appointments from contacts you wrote off.',
    h1: 'You Already Paid For These Leads. You Just Stopped Calling Them.',
    hook: 'There is a list in your CRM of people who inquired, got two follow-ups, and went quiet. You paid full acquisition cost for every one of them. Most businesses treat that list as dead and go buy new leads at the same price.',
    pitch: 'Database Reactivation works that list systematically — every contact, personalized, at a pace nobody has to manage — and puts the ones who are ready now back on your calendar.',

    answerHeading: 'What is database reactivation?',
    answerBody: 'Database reactivation is the process of systematically re-engaging old leads and past customers already in your CRM to generate new appointments and sales. It works because most contacts go cold for reasons of timing rather than interest — the prospect was not ready, the follow-up stopped after two attempts, or the inquiry arrived during a busy week. Those contacts are already acquired, so reactivation carries no new advertising cost. The practical obstacle is labor: working a list of several thousand contacts with personalized outreach is not something a sales team does between other duties. Automating the outreach and follow-up makes the list workable, and surfaces the subset of contacts who are ready to buy now.',

    problemHeading: 'Why the list you already own is the cheapest revenue available',
    problems: [
      { hint: 'You paid for them once already.', title: 'Acquisition Cost Is Already Sunk', body: 'Every contact in that database cost you money to get. Ignoring them and buying replacements means paying twice for the same customer.' },
      { hint: 'Most stopped at two attempts.', title: 'They Did Not Say No. Follow-Up Just Stopped.', body: 'Follow-up dies after a couple of tries because a person has to remember to make the third one. Silence gets recorded as rejection when it was usually just bad timing.' },
      { hint: 'Nobody has three weeks for this.', title: 'The Work Is Too Big To Do By Hand', body: 'Four thousand contacts with a personal message each is not a task a sales team gets to. So it never happens, and the list ages another year.' },
    ],

    stepsHeading: 'How Database Reactivation works',
    steps: [
      { title: 'We clean and segment the list', body: 'Bad numbers out, contacts grouped by what they originally wanted and how long ago they went quiet.' },
      { title: 'Each segment gets its own message', body: 'A lead from eight months ago hears something different from a customer who bought two years ago. Relevance is what separates this from a blast.' },
      { title: 'It runs the conversation, not just the send', body: 'Replies get handled and questions get answered. Interest gets converted into a booked time instead of a notification you have to act on.' },
      { title: 'Booked appointments land on your calendar', body: 'You work the people who raised their hand. The rest of the list keeps getting worked in the background.' },
    ],

    faqs: [
      { q: 'How old can a lead be and still be worth reactivating?', a: 'Older lists work more often than owners expect, because circumstances change even when contact details do not. Two to three year old contacts routinely convert. Past customers are usually the strongest segment of all, since they already bought from you once.' },
      { q: 'Will this annoy people or damage our reputation?', a: 'That depends entirely on segmentation and message quality. A relevant message referencing what someone actually inquired about reads as good service. An untargeted blast to everyone at once reads as spam, which is why the list gets segmented before anything sends.' },
      { q: 'What size database is worth doing this on?', a: 'A few hundred contacts is enough to see whether the list responds. Larger lists produce more volume, but the deciding factor is whether the contacts were genuinely interested when they came in, not how many there are.' },
      { q: 'Is this compliant with texting and email regulations?', a: 'Campaigns are built to respect consent status, opt-out handling, and contact-time rules. Contacts who never opted in to a channel are not contacted on it. Compliance requirements vary by industry and state, and get scoped during setup.' },
      { q: 'How fast do results show up?', a: 'Reactivation is one of the faster things to see movement on, because the contacts already exist. Appointments typically start landing within the first couple of weeks of a campaign going live.' },
      { q: 'What if our CRM data is a mess?', a: 'That is the normal starting condition. Cleaning and deduplication happen before any outreach, and a messy list is not a reason to delay — it is part of the work.' },
    ],
  },

  'website-manager': {
    slug: 'website-manager',
    name: 'Website Manager',
    closes: 'Closes the browse and bounce loop',
    cardBody: 'Answers questions on your site at 9pm and books the appointment before they leave.',
    metaTitle: 'Website Manager: Book Visitors Before They Leave Your Site | Nxt Apex AI',
    metaDesc: 'Most site visitors leave without contacting you. Website Manager answers their questions at 9pm and books the appointment before they bounce to a competitor.',
    h1: 'Almost Everyone On Your Site Leaves Without Telling You They Were There',
    hook: 'Someone reads three pages, cannot find whether you serve their area, and closes the tab. You have no record they existed. Your analytics call that a bounce. It was a customer with one unanswered question.',
    pitch: 'Website Manager answers questions on your site in real time — pricing, availability, service area, whatever is blocking them — and books the appointment while they are still reading.',

    answerHeading: 'What does an AI website assistant actually do?',
    answerBody: 'An AI website assistant answers visitor questions directly on your site and converts qualified visitors into booked appointments without a form. It differs from a traditional chat widget in that it responds instantly with answers drawn from your actual services, pricing, and availability rather than collecting a name and email for someone to follow up on later. This matters because most website visitors leave without identifying themselves, and the common reason is a single unanswered question — whether you serve their area, what something costs, or how soon you can start. Answering that question at the moment it comes up removes the reason to leave and keeps the visit from ending in silence.',

    problemHeading: 'Why your site loses people it already convinced',
    problems: [
      { hint: 'One question, no answer, gone.', title: 'They Leave Over Something Small', body: 'Do you serve my zip code. What does this run. Can you come this week. These are not objections. They are questions, and an unanswered question is an exit.' },
      { hint: 'A form is a delay, not an action.', title: 'Contact Forms Ask Them To Wait', body: 'A form says give us your information and someone will get back to you. Someone ready to buy tonight does not want a callback tomorrow. They want an answer now.' },
      { hint: '9pm is peak browsing.', title: 'They Visit When You Are Closed', body: 'Evenings and weekends are when people research. That is precisely when nobody is there to answer, so the highest-intent traffic gets the least support.' },
    ],

    stepsHeading: 'How Website Manager works',
    steps: [
      { title: 'It engages visitors who are actually stuck', body: 'Based on behavior, not a popup that fires at every visitor three seconds in.' },
      { title: 'It answers from your real information', body: 'Your services, your service area, your pricing structure, your availability. Not generic responses that send them looking elsewhere.' },
      { title: 'It books without a form', body: 'When someone is ready, they get a time on your calendar in the same conversation.' },
      { title: 'It captures the ones who are not ready yet', body: 'Visitors who need more time enter follow-up instead of disappearing into your bounce rate.' },
    ],

    faqs: [
      { q: 'How is this different from a chatbot?', a: 'A traditional chatbot follows a decision tree and usually ends by collecting contact details for someone to follow up on. This answers the actual question in natural language using your real business information, and completes the booking in the same conversation. The difference the visitor experiences is getting an answer versus getting a form.' },
      { q: 'What stops it from giving a wrong answer about pricing?', a: 'It is configured with your actual pricing structure and boundaries, including what it is not allowed to quote. For anything requiring a real estimate, it books the estimate rather than guessing at a number.' },
      { q: 'Will it annoy visitors with popups?', a: 'It is triggered by behavior rather than a timer, so it engages visitors showing signs of being stuck instead of interrupting everyone on arrival. Aggressive popups cost more conversions than they create.' },
      { q: 'Does it work on mobile?', a: 'Yes, and that is where most of the traffic is. The interface is built for phone screens rather than shrunk down from desktop.' },
      { q: 'What happens to conversations after hours?', a: 'They are handled the same as any other time. After-hours visitors are a large share of website traffic and the group least likely to reach a person, which is where most of the recovered bookings come from.' },
      { q: 'Do we need to rebuild our website first?', a: 'No. It installs on your existing site regardless of platform.' },
    ],
  },

  'reputation-manager': {
    slug: 'reputation-manager',
    name: 'Reputation Manager',
    closes: 'Closes the trust loop',
    cardBody: 'Asks every happy customer for a review at the exact moment they are most likely to leave one.',
    metaTitle: 'Reputation Manager: Get Reviews From Customers Who Would Leave One | Nxt Apex AI',
    metaDesc: 'Happy customers leave reviews when you ask at the right moment. Reputation Manager asks automatically, at that moment, and routes unhappy feedback to you first.',
    h1: 'Your Happiest Customers Are Not Leaving Reviews Because Nobody Asked Them',
    hook: 'Unhappy customers write reviews without being asked. Happy ones need a prompt, and the window where they will act on it is about a day wide. Most businesses miss it entirely and end up with a rating that does not match their work.',
    pitch: 'Reputation Manager asks every customer at the moment they are most likely to say yes, and routes unhappy feedback to you privately before it becomes a public review.',

    answerHeading: 'When should you ask a customer for a review?',
    answerBody: 'The best time to ask for a review is immediately after the customer experiences the result they hired you for — typically within 24 hours of job completion, while the outcome is still fresh and their satisfaction is at its peak. Asking days later competes with everything else that has happened since, and response rates drop sharply. The practical problem is that this window closes while your team is already on the next job, so the ask depends on someone remembering at exactly the right moment. Automating the request removes that dependency: every customer gets asked at the right point in their own timeline, in one click, on the platform where the review matters most to your business.',

    problemHeading: 'Why your rating understates your work',
    problems: [
      { hint: 'Complaints self-organize.', title: 'Only the Unhappy Ones Volunteer', body: 'Frustration motivates people to write. Satisfaction does not. Left alone, your public rating is assembled disproportionately by the people you disappointed.' },
      { hint: 'The window is about a day.', title: 'You Are Asking Too Late', body: 'Satisfaction peaks right after the work is done and drops fast. A request a week later competes with everything that happened in between.' },
      { hint: 'The crew is already on the next job.', title: 'Manual Asking Is Inconsistent By Nature', body: 'It depends on a person remembering, at the right moment, after every job. That works for a week and then quietly stops.' },
    ],

    stepsHeading: 'How Reputation Manager works',
    steps: [
      { title: 'It triggers on job completion', body: 'Every customer, at their own right moment, tied to when their work actually finished.' },
      { title: 'It gauges sentiment first', body: 'A quick read on how the job went before anything gets pointed at a public review page.' },
      { title: 'Happy customers get one click', body: 'Straight to the platform that matters for your business, with no friction between the ask and the review.' },
      { title: 'Unhappy customers reach you privately', body: 'Their feedback comes to you directly, which gives you the chance to fix it before it is public.' },
    ],

    faqs: [
      { q: 'Is it against the rules to filter who gets asked for a review?', a: 'Selectively soliciting only positive reviews violates the terms of most platforms, including Google. The compliant approach is to ask every customer and use sentiment to decide where the conversation goes — a public review request or a private service recovery channel. Everyone gets asked. Nobody is blocked from reviewing you.' },
      { q: 'How many more reviews should we expect?', a: 'It depends on your volume and how consistently you ask today. Businesses that never had a systematic process see the largest change, simply because the baseline was whoever happened to be motivated enough to act unprompted.' },
      { q: 'Which review platforms does it support?', a: 'Google is the priority for most local businesses because it carries the most weight in both search and AI-generated recommendations. Industry-specific platforms can be added based on where your buyers actually look.' },
      { q: 'Does it help with responding to reviews?', a: 'Yes. Consistent responses to reviews, positive and negative, signal an active business to both customers and search engines. Drafted responses go out for approval rather than posting unattended.' },
      { q: 'What if we get a bad review anyway?', a: 'You will, and it is survivable. A high volume of recent positive reviews dilutes any single negative one, and a measured public response to criticism often reads better to prospects than an unbroken wall of five stars.' },
      { q: 'How do reviews affect AI search results?', a: 'Review volume, recency, and rating are among the strongest signals AI engines use when recommending local businesses. A practice with recent, plentiful reviews is materially more likely to appear in an AI-generated recommendation than an equivalent one without them.' },
    ],
  },

  'pipeline-manager': {
    slug: 'pipeline-manager',
    name: 'Pipeline Manager',
    closes: 'Closes the oversight loop',
    cardBody: 'Watches the other five and tells you the moment one starts slipping.',
    metaTitle: 'Pipeline Manager: Know Which Loop Is Slipping Before the Month Ends | Nxt Apex AI',
    metaDesc: 'Automation fails quietly. Pipeline Manager watches the other five loops and tells you the moment one starts slipping, instead of at the end of a bad quarter.',
    h1: 'Automation Does Not Fail Loudly. It Fails Quietly, For Six Weeks.',
    hook: 'A booking calendar disconnects. Nothing errors. Nothing alerts. The system keeps running and keeps reporting success, and you find out when you look up and the month is short.',
    pitch: 'Pipeline Manager watches the other five loops end to end — volume, response times, booking rates, handoffs — and tells you the moment one moves in the wrong direction.',

    answerHeading: 'What is pipeline monitoring?',
    answerBody: 'Pipeline monitoring is continuous oversight of the automated systems handling your leads, so that a failure surfaces in hours rather than at the end of a reporting period. It matters because automation fails silently more often than it fails loudly: an expired integration, a changed form field, or a full calendar produces no error message while quietly dropping leads. Standard reporting will not catch this, because a dashboard showing lower numbers looks the same as a slow month. Monitoring works by tracking expected behavior for each stage — lead volume, response time, booking rate, handoff completion — and flagging deviation from the normal pattern rather than waiting for a total outage.',

    problemHeading: 'Why the failure you should fear is the silent one',
    problems: [
      { hint: 'No error. No alert. No leads.', title: 'Silent Failure Is the Default', body: 'An expired token or a changed form field does not throw an error anyone sees. The system reports normal operation while nothing gets through.' },
      { hint: 'A slow month looks identical.', title: 'Your Dashboard Will Not Tell You', body: 'Reporting shows numbers, not whether the numbers are supposed to look like that. Down twenty percent reads as a slow month until someone asks why.' },
      { hint: 'Six weeks at a time.', title: 'Detection Lag Is Where the Money Goes', body: 'The cost of a broken automation is not the fix. It is every lead that fell through between the break and the day somebody noticed.' },
    ],

    stepsHeading: 'How Pipeline Manager works',
    steps: [
      { title: 'It knows what normal looks like', body: 'Baseline volume, response times, and booking rates for each loop, specific to your business rather than a generic threshold.' },
      { title: 'It watches every stage continuously', body: 'Lead in, response out, conversation, booking, handoff. A break at any stage is visible at that stage.' },
      { title: 'It alerts on deviation, not just outage', body: 'A booking rate sliding for three days gets flagged. You do not have to wait for something to stop entirely.' },
      { title: 'You get a plain reading of what is happening', body: 'Which loop, what changed, and what it is costing — in language that does not require reading a dashboard to interpret.' },
    ],

    faqs: [
      { q: 'How is this different from the reporting we already have?', a: 'Standard reporting tells you what the numbers were. Monitoring tells you when the numbers stopped making sense. A dashboard showing thirty leads does not indicate whether you should have received forty-five — that comparison against expected behavior is the part that catches silent failures.' },
      { q: 'Will I get alerts constantly?', a: 'No. Thresholds are set to flag meaningful deviation rather than normal fluctuation. An alert system that cries wolf gets ignored, which defeats the purpose of having one.' },
      { q: 'Does this require the other five loops to be in place?', a: 'It is most useful when there is a system to monitor, but it can watch existing automations and integrations you already run. The value comes from having something automated that can quietly break.' },
      { q: 'What happens when it catches something?', a: 'You are told which loop, what changed, and when it started. For issues within scope of the systems we built, remediation is part of the engagement rather than a separate ticket.' },
      { q: 'Can it show which loop produces the most revenue?', a: 'Yes. Because it tracks each stage separately, it can attribute booked appointments back to the loop that generated them, which makes it clear where to invest and where the drop-off is.' },
      { q: 'How quickly does it catch a break?', a: 'Detection is typically within hours rather than weeks. The exact window depends on your normal volume — a business receiving many leads daily produces a detectable pattern faster than one receiving a few per week.' },
    ],
  },
};

export const LOOP_ORDER = [
  'speed-to-lead',
  'ai-receptionist',
  'database-reactivation',
  'website-manager',
  'reputation-manager',
  'pipeline-manager',
];
