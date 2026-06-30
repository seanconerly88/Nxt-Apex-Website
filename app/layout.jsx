import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const SITE_URL = 'https://nxtapexai.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: 'Nxt Apex AI',
  url: SITE_URL,
  logo: `${SITE_URL}/og-logo.png`,
  image: `${SITE_URL}/og-logo.png`,
  description: 'Nxt Apex AI is an AI consulting firm that helps businesses implement artificial intelligence through readiness assessments, custom AI strategies, and hands-on team training using the CILAS framework.',
  founder: { '@type': 'Person', '@id': `${SITE_URL}/#sean-conerly`, name: 'Sean Conerly' },
  email: 'sean@nxtapexai.com',
  telephone: '+15042904780',
  serviceType: ['AI Consulting', 'AI Readiness Assessment', 'AI Team Training', 'Business Automation', 'AI Implementation'],
  areaServed: 'US',
  priceRange: '$$$$',
  knowsAbout: ['Artificial Intelligence', 'Business Automation', 'AI Implementation', 'CILAS Framework', 'Claude AI', 'OpenAI', 'AI Strategy'],
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#sean-conerly`,
  name: 'Sean Conerly',
  jobTitle: 'Founder & AI Strategist',
  description: 'MIT-trained AI strategist and founder of Nxt Apex AI. Specializes in helping businesses implement AI systems that drive measurable revenue and operational efficiency.',
  worksFor: { '@id': `${SITE_URL}/#organization` },
  url: SITE_URL,
  email: 'sean@nxtapexai.com',
  telephone: '+15042904780',
  knowsAbout: ['AI Strategy', 'Business Automation', 'CILAS Framework', 'AI Implementation', 'Revenue Operations'],
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Nxt Apex AI | AI Consulting & Implementation for Business',
  description: 'Nxt Apex AI helps businesses implement AI that drives real results. Led by Sean Conerly, we deliver AI readiness assessments, custom implementation strategies, and team training — built on the CILAS framework.',
  keywords: ['AI consulting', 'AI implementation', 'business automation', 'AI readiness assessment', 'CILAS framework', 'Sean Conerly', 'AI team training', 'AI strategy'],
  authors: [{ name: 'Sean Conerly', url: SITE_URL }],
  creator: 'Sean Conerly',
  icons: {
    icon: '/og-logo.png',
    apple: '/og-logo.png',
  },
  openGraph: {
    title: 'Stop Learning AI. Start Solving With It.',
    description: 'Nxt Apex AI helps businesses implement AI that drives real revenue. Find where AI fits in your business — then put it to work.',
    siteName: 'Nxt Apex AI',
    url: SITE_URL,
    type: 'website',
    images: [{ url: '/og-logo.png', width: 500, height: 500, alt: 'Nxt Apex AI' }],
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, personSchema]) }}
        />
        {children}
      </body>
    </html>
  );
}
