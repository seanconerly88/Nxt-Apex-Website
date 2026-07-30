import VerticalPage from '@/components/VerticalPage';
import { VERTICALS } from '@/lib/verticalConfig';

const SITE_URL = 'https://nxtapexai.com';
const v = VERTICALS['law-firms'];

export const metadata = {
  title: v.metaTitle,
  description: v.metaDesc,
  alternates: { canonical: `${SITE_URL}/${v.slug}` },
};

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Search Visibility for Law Firms',
    description: 'Nxt Apex AI improves how law firms and solo practitioners appear in AI-generated search results from ChatGPT, Perplexity, and Google AI Overviews when potential clients search for legal representation.',
    provider: { '@type': 'Organization', name: 'Nxt Apex AI', url: SITE_URL },
    serviceType: 'AI Search Optimization',
    areaServed: 'US',
    audience: { '@type': 'Audience', audienceType: 'Law firms, attorneys, and solo practitioners' },
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

export default function LawFirmsPage() {
  return <VerticalPage vertical={v} schema={schema} />;
}
