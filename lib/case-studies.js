export const CASE_STUDIES = [
  {
    slug: 'remastered-wellness',
    client: 'Remastered Wellness',
    industry: 'Wellness',
    website: 'remasteredwell.com',
    loops: ['Response Loop', 'Trust Loop', 'Oversight Loop'],
    agents: ['Speed to Lead', 'Reputation Manager', 'Pipeline Manager'],
    metric: { before: '6 hours', after: 'Under 60 seconds', label: 'Speed to lead' },
    hook: 'Six hours to sixty seconds.',
    summary:
      'Remastered Wellness was being found, then losing the people who found them. New leads sat for roughly six hours before anyone responded. We closed three loops in the same engagement.',
    openLoop:
      'Leads were arriving and going cold before anyone reached them. Reviews were happening by accident. Nobody had a clear view of how communication actually moved through the organization.',
    built: [
      'Speed to Lead deployed so every inbound lead gets a personal response in under 60 seconds, around the clock',
      'Calendar booking offered to every new lead within 30 minutes of first contact',
      'Reputation Manager wired to ask for a review at the right moment after service',
      'AEO work to surface the business inside Google AI Mode results',
      'A live dashboard showing communication patterns across the organization',
    ],
    results: [
      'Speed to lead cut from roughly 6 hours to under 60 seconds',
      'Surfaced in Google AI Mode within 24 hours',
      'Every new lead offered a calendar booking within 30 minutes',
      '20+ five star Google reviews collected in 48 hours',
      'Full visibility into organizational communication patterns',
    ],
  },
  {
    slug: 'compass-senior-benefits',
    client: 'Compass Senior Benefits',
    industry: 'Insurance',
    loops: ['Response Loop'],
    agents: ['Speed to Lead'],
    metric: { before: '13 hours', after: 'Under 90 seconds', label: 'Speed to lead' },
    hook: 'Thirteen hours to ninety seconds.',
    summary:
      'In senior benefits, the agency that answers first usually writes the policy. Compass Senior Benefits was averaging thirteen hours to first contact. Closing that single loop moved them to the top of their state.',
    openLoop:
      'New leads averaged thirteen hours before anyone reached out. In a market where prospects contact several agencies at once, that gap was handing business to whoever replied first.',
    built: [
      'Speed to Lead deployed across every inbound channel',
      'Personal response fired to every new lead in under 90 seconds, day or night',
      'Follow up sequencing so no lead sits without contact',
    ],
    results: [
      'Speed to lead cut from an average of 13 hours to under 90 seconds',
      'Became the number one WellCare insurance agency in the state of Tennessee',
    ],
  },
  {
    slug: 'behaviored',
    client: 'BehaviorEd',
    industry: 'Behavioral Services',
    website: 'getbehaviored.com',
    loops: ['Oversight Loop'],
    agents: ['Pipeline Manager'],
    metric: { before: '4.5 hours', after: 'Under 15 minutes', label: 'Invoicing cycle' },
    hook: 'Four and a half hours to fifteen minutes.',
    summary:
      'BehaviorEd could not see their own operation clearly enough to bill it accurately. Invoicing took four and a half hours. We closed the oversight loop and the invoicing fixed itself.',
    openLoop:
      'Nobody had a clear view of what was actually happening across the organization. Invoicing was the symptom: hours of manual reconciliation every cycle because the underlying data was scattered and nobody could see the whole picture.',
    built: [
      'Claude wired directly into their operational data to surface what was happening across the organization',
      'Automated invoicing workflow built on top of that visibility layer',
      'Reporting that answers operational questions without a manual pull',
    ],
    results: [
      'Invoicing cycle cut from about 4.5 hours to under 15 minutes',
      'Organization wide operational visibility through Claude',
      'Reporting available on demand instead of assembled by hand',
    ],
  },
];

export function getCaseStudy(slug) {
  return CASE_STUDIES.find(c => c.slug === slug);
}
