import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogIndex from '@/components/BlogIndex';
import { POSTS_BY_DATE } from '@/lib/blog';

const SITE_URL = 'https://nxtapexai.com';

export const metadata = {
  title: 'Field Notes | Nxt Apex AI',
  description: 'Answers to the questions that come before the sales call. What we see breaking in real businesses, and what fixes it.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Field Notes | Nxt Apex AI',
    description: 'Answers to the questions that come before the sales call.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
};

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Nxt Apex AI Field Notes',
    description: 'Answers to the questions that come before the sales call.',
    url: `${SITE_URL}/blog`,
    publisher: { '@id': `${SITE_URL}/#organization` },
    blogPost: POSTS_BY_DATE.map(p => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.metaDesc,
      datePublished: p.date,
      url: `${SITE_URL}/blog/${p.slug}`,
      author: { '@id': `${SITE_URL}/#sean-conerly` },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Field Notes', item: `${SITE_URL}/blog` },
    ],
  },
];

export default function BlogPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <BlogIndex />
      <Footer />
    </main>
  );
}
