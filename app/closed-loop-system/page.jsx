import ClosedLoopSystemPage from '@/components/ClosedLoopSystemPage';
import { ANSWER_HEADING, ANSWER_BODY, FAQS } from '@/lib/closedLoopSystem';
import { LOOPS, LOOP_ORDER } from '@/lib/loopConfig';

const SITE_URL = 'https://nxtapexai.com';

export const metadata = {
  title: 'The Closed Loop System | Six AI Agents That Stop Revenue Leaks | Nxt Apex AI',
  description: 'You do not need more leads. You need to stop losing the ones you already paid for. Six named loops, each closing one way revenue leaves your business.',
  keywords: ['Closed Loop System', 'AI agents for business', 'speed to lead', 'AI receptionist', 'database reactivation', 'revenue leaks', 'Nxt Apex AI'],
  alternates: { canonical: `${SITE_URL}/closed-loop-system` },
  openGraph: {
    title: 'Six ways revenue leaves. Six ways we close it.',
    description: 'The Closed Loop System: six AI agents, each closing one specific way revenue leaves a business.',
    url: `${SITE_URL}/closed-loop-system`,
    type: 'website',
  },
};

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/closed-loop-system#service`,
    name: 'The Closed Loop System',
    description: ANSWER_BODY,
    provider: { '@id': `${SITE_URL}/#organization` },
    serviceType: 'AI Business Automation',
    areaServed: 'US',
    audience: {
      '@type': 'Audience',
      audienceType: 'Small and mid-sized service businesses losing inbound revenue to slow or incomplete follow-up',
    },
    url: `${SITE_URL}/closed-loop-system`,
    // The six loops as a catalog, so the cluster reads as one system with six parts.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'The Six Loops',
      itemListElement: LOOP_ORDER.map((key, i) => {
        const loop = LOOPS[key];
        return {
          '@type': 'Offer',
          position: i + 1,
          itemOffered: {
            '@type': 'Service',
            name: loop.name,
            alternateName: loop.closes,
            description: loop.cardBody,
            url: `${SITE_URL}/${loop.slug}`,
            provider: { '@id': `${SITE_URL}/#organization` },
          },
        };
      }),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: ANSWER_HEADING,
        acceptedAnswer: { '@type': 'Answer', text: ANSWER_BODY },
      },
      ...FAQS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'The Closed Loop System', item: `${SITE_URL}/closed-loop-system` },
    ],
  },
];

export default function Page() {
  return <ClosedLoopSystemPage schema={schema} />;
}
