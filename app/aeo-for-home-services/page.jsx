import VerticalPage from '@/components/VerticalPage';
import { VERTICALS } from '@/lib/verticalConfig';

const SITE_URL = 'https://nxtapexai.com';
const v = VERTICALS['home-services'];

export const metadata = {
  title: v.metaTitle,
  description: v.metaDesc,
  alternates: { canonical: `${SITE_URL}/${v.slug}` },
};

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Search Visibility for Home Services',
    description: 'Nxt Apex AI improves how HVAC, plumbing, electrical, and other home service companies appear in AI-generated search results from ChatGPT, Perplexity, and Google AI Overviews.',
    provider: { '@type': 'Organization', name: 'Nxt Apex AI', url: SITE_URL },
    serviceType: 'AI Search Optimization',
    areaServed: 'US',
    audience: { '@type': 'Audience', audienceType: 'HVAC, plumbing, electrical, roofing, and other home service businesses' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: v.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
];

export default function HomeServicesPage() {
  return <VerticalPage vertical={v} schema={schema} />;
}
