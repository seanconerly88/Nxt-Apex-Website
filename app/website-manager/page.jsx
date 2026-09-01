import LoopPage from '@/components/LoopPage';
import { LOOPS } from '@/lib/loopConfig';

const SITE_URL = 'https://nxtapexai.com';
const loop = LOOPS['website-manager'];

export const metadata = {
  title: loop.metaTitle,
  description: loop.metaDesc,
  alternates: { canonical: `${SITE_URL}/${loop.slug}` },
  openGraph: {
    title: loop.metaTitle,
    description: loop.metaDesc,
    url: `${SITE_URL}/${loop.slug}`,
    type: 'website',
  },
};

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: loop.name,
    alternateName: loop.closes,
    description: loop.metaDesc,
    provider: { '@type': 'Organization', name: 'Nxt Apex AI', url: SITE_URL },
    serviceType: 'AI Business Automation',
    areaServed: 'US',
    audience: { '@type': 'Audience', audienceType: 'Small and mid-sized businesses losing inbound leads to slow or incomplete follow-up' },
    url: `${SITE_URL}/${loop.slug}`,
    isPartOf: { '@type': 'Service', name: 'The Closed Loop System', provider: { '@type': 'Organization', name: 'Nxt Apex AI', url: SITE_URL } },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: loop.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
];

export default function WebsiteManagerPage() {
  return <LoopPage loop={loop} schema={schema} />;
}
