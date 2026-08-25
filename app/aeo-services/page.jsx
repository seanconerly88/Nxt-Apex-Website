import AEOAgencyPage from '@/components/AEOAgencyPage';

const SITE_URL = 'https://nxtapexai.com';

export const metadata = {
  title: 'AEO Services for Small Business | Nxt Apex AI',
  description: 'Most AEO agencies stop at visibility. Nxt Apex AI connects AI search citations to a pipeline built to close. Free AI Visibility Report — no sales call required.',
  alternates: { canonical: `${SITE_URL}/aeo-services` },
  openGraph: {
    title: 'AEO Services That Connect AI Visibility to Your Sales Pipeline',
    description: 'Most AEO agencies stop at citations. We fix your AI search presence and wire new leads directly into a pipeline built to close them.',
    url: `${SITE_URL}/aeo-services`,
  },
};

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AEO Services That Connect AI Visibility to Your Sales Pipeline',
    description: 'Most AEO agencies stop at visibility. Nxt Apex AI connects AI search citations to a pipeline built to close.',
    author: { '@type': 'Person', name: 'Sean Conerly', url: `${SITE_URL}/#sean-conerly` },
    publisher: { '@type': 'Organization', name: 'Nxt Apex AI', url: SITE_URL },
    url: `${SITE_URL}/aeo-services`,
    dateModified: '2026-07-07',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How is AEO different from SEO?', acceptedAnswer: { '@type': 'Answer', text: 'SEO targets rankings on Google\'s traditional search results page. AEO targets the data layer that AI engines pull from when generating recommendations. AEO focuses on structured data, entity clarity, FAQ content, and citation signals that influence AI-generated answers, not just page rankings.' } },
      { '@type': 'Question', name: 'How long does it take to show up in AI search?', acceptedAnswer: { '@type': 'Answer', text: 'Structural fixes like schema markup and crawler access corrections typically take effect within a few weeks of a crawler visit. Content and citation improvements compound over 60 to 90 days. Most clients see measurable improvement in AI citation frequency within a quarter.' } },
      { '@type': 'Question', name: 'Do I need to be a large company to benefit from AEO?', acceptedAnswer: { '@type': 'Answer', text: 'No. Local and regional businesses are the biggest opportunity in AEO right now. Most small and mid-size businesses have almost no AI presence at all — which means the gap to close is smaller and the competitive advantage of closing it first is larger.' } },
      { '@type': 'Question', name: 'What does the free AI Visibility Report include?', acceptedAnswer: { '@type': 'Answer', text: 'The report audits your domain across six categories: AI crawler access, structured data completeness, content clarity, citation strength, local authority signals, and overall AI readiness. It shows your score in each category, who is outranking you in AI search, and the highest-impact fixes.' } },
      { '@type': 'Question', name: 'Does this replace our current marketing?', acceptedAnswer: { '@type': 'Answer', text: 'No. AI visibility feeds the top of your pipeline alongside your existing channels. We connect AI-referred leads to the same pipeline your other marketing feeds.' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'AEO Services', item: `${SITE_URL}/aeo-services` },
    ],
  },
];

export default function AEOAgencyRoute() {
  return <AEOAgencyPage schema={schema} />;
}
