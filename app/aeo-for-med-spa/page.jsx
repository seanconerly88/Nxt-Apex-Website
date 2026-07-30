import VerticalPage from '@/components/VerticalPage';
import { VERTICALS } from '@/lib/verticalConfig';

const SITE_URL = 'https://nxtapexai.com';
const v = VERTICALS['med-spa'];

export const metadata = {
  title: v.metaTitle,
  description: v.metaDesc,
  alternates: { canonical: `${SITE_URL}/${v.slug}` },
};

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Search Visibility for Medical Spas',
    description: 'Nxt Apex AI improves how medical spas and aesthetic practices appear in AI-generated search results from ChatGPT, Perplexity, and Google AI Overviews for clients searching for cosmetic treatments.',
    provider: { '@type': 'Organization', name: 'Nxt Apex AI', url: SITE_URL },
    serviceType: 'AI Search Optimization',
    areaServed: 'US',
    audience: { '@type': 'Audience', audienceType: 'Medical spas, aesthetic practices, and cosmetic treatment providers' },
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

export default function MedSpaPage() {
  return <VerticalPage vertical={v} schema={schema} />;
}
