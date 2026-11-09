import ThreeWaysPage from '@/components/ThreeWaysPage';
import { WAYS } from '@/lib/threeWays';

const SITE_URL = 'https://nxtapexai.com';
const PAGE_URL = `${SITE_URL}/3-ways`;

export const metadata = {
  title: '3 Ways Claude Makes Your Service Business More Money | Free Checklist | Nxt Apex AI',
  description:
    'A free step-by-step checklist: connect Claude to GoHighLevel, then have it answer every after-hours lead, win back the cold leads in your CRM, and brief you on your business every morning.',
  keywords: ['Claude for business', 'Claude GoHighLevel', 'AI for service business', 'after-hours leads', 'database reactivation', 'GoHighLevel AI', 'Nxt Apex AI'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: '3 Ways Claude Makes Your Service Business More Money',
    description: 'Not 31. Three. A free checklist you can finish this week with Claude and GoHighLevel.',
    url: PAGE_URL,
    type: 'article',
  },
};

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${PAGE_URL}#howto`,
    name: '3 Ways Claude Makes Your Service Business More Money',
    description: metadata.description,
    tool: [{ '@type': 'HowToTool', name: 'Claude' }, { '@type': 'HowToTool', name: 'GoHighLevel' }],
    step: WAYS.map((w, i) => ({
      '@type': 'HowToSection',
      position: i + 1,
      name: w.title,
      itemListElement: w.steps.map((s, j) => ({
        '@type': 'HowToStep',
        position: j + 1,
        text: s.text,
      })),
    })),
    author: { '@id': `${SITE_URL}/#sean-conerly` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: '3 Ways Claude Makes More Money', item: PAGE_URL },
    ],
  },
];

export default function Page() {
  return <ThreeWaysPage schema={schema} />;
}
