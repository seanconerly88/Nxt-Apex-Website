import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudyIndex from '@/components/CaseStudyIndex';
import { CASE_STUDIES } from '@/lib/case-studies';

const SITE_URL = 'https://nxtapexai.com';

export const metadata = {
  title: 'Case Studies | Speed to Lead, Reviews & Ops Results | Nxt Apex AI',
  description: 'Real numbers from real engagements. Speed to lead cut from 13 hours to 90 seconds, invoicing from 4.5 hours to 15 minutes, 20+ five star reviews in 48 hours.',
  keywords: ['AI case study', 'speed to lead results', 'AI automation case study', 'invoicing automation', 'Google AI Mode visibility', 'Nxt Apex AI'],
  openGraph: {
    title: 'Loops we have closed.',
    description: 'Speed to lead from 13 hours to 90 seconds. Invoicing from 4.5 hours to 15 minutes. Real engagements, real numbers.',
    url: `${SITE_URL}/case-studies`,
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/case-studies` },
};

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Nxt Apex AI Case Studies',
    description: 'Client engagements showing measured operational improvements from AI implementation.',
    url: `${SITE_URL}/case-studies`,
    hasPart: CASE_STUDIES.map(cs => ({
      '@type': 'Article',
      headline: `${cs.client}: ${cs.hook}`,
      description: cs.summary,
      url: `${SITE_URL}/case-studies/${cs.slug}`,
      author: { '@type': 'Person', name: 'Sean Conerly', url: `${SITE_URL}/#sean-conerly` },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_URL}/case-studies` },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <CaseStudyIndex />
      <Footer />
    </main>
  );
}
