import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudyDetail from '@/components/CaseStudyDetail';
import { CASE_STUDIES, getCaseStudy } from '@/lib/case-studies';

const SITE_URL = 'https://nxtapexai.com';

export function generateStaticParams() {
  return CASE_STUDIES.map(cs => ({ slug: cs.slug }));
}

export function generateMetadata({ params }) {
  const study = getCaseStudy(params.slug);
  if (!study) return {};

  const title = `${study.client} Case Study: ${study.metric.label} ${study.metric.before} to ${study.metric.after} | Nxt Apex AI`;

  return {
    title,
    description: study.summary,
    keywords: [
      `${study.client} case study`,
      `${study.industry.toLowerCase()} AI automation`,
      ...study.agents.map(a => a.toLowerCase()),
      'AI implementation case study',
    ],
    openGraph: {
      title: `${study.client}: ${study.hook}`,
      description: study.summary,
      url: `${SITE_URL}/case-studies/${study.slug}`,
      type: 'article',
    },
    alternates: { canonical: `${SITE_URL}/case-studies/${study.slug}` },
  };
}

export default function CaseStudyPage({ params }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${study.client}: ${study.hook}`,
      description: study.summary,
      articleBody: [study.openLoop, ...study.built, ...study.results].join(' '),
      author: { '@type': 'Person', name: 'Sean Conerly', url: `${SITE_URL}/#sean-conerly` },
      publisher: {
        '@type': 'Organization',
        name: 'Nxt Apex AI',
        url: SITE_URL,
      },
      about: {
        '@type': 'Organization',
        name: study.client,
        ...(study.website ? { url: `https://${study.website}` } : {}),
      },
      url: `${SITE_URL}/case-studies/${study.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_URL}/case-studies` },
        { '@type': 'ListItem', position: 3, name: study.client, item: `${SITE_URL}/case-studies/${study.slug}` },
      ],
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <CaseStudyDetail study={study} />
      <Footer />
    </main>
  );
}
