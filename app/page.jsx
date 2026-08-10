import Navbar from '@/components/Navbar';
import HomeHero from '@/components/HomeHero';
import OfferStackSection from '@/components/OfferStackSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const SITE_URL = 'https://nxtapexai.com';

const assessmentSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an AI Readiness Assessment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An AI Readiness Assessment is a 9-stage audit of your full client journey — from lead generation to public reviews — that identifies exactly where your business is leaking revenue, leads, and reputation. The result is a scored fix list delivered in 4 days.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast should a business respond to a new lead?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Research shows that responding to a new lead within 5 minutes increases contact rates by up to 900% compared to responding after 30 minutes. Speed to Lead is one of the highest-weight stages in the Nxt Apex AI Readiness Assessment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens when a prospect no-shows a sales call?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most businesses either try once and move on or do nothing consistent. An AI agent can fire a personalized follow-up within minutes of a missed call, recover 20-40% of no-shows, and keep the lead warm without any manual effort.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should a business collect client reviews?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most effective review collection is automated — a personalized ask sent at the right moment after fulfillment, triggered by a workflow rather than remembered manually. Businesses using automated review requests generate 3-5x more reviews than those asking manually.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does the AI Readiness Assessment cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The initial AI Readiness Assessment call is free. After the call, a scored fix list is delivered within 4 days. Implementation support is available through Advisory ($1,500/mo), Done-For-You ($3,500-$10K), Team Training ($500/person), or the full CILAS system deployment ($400/mo).',
      },
    },
  ],
};

export const metadata = {
  title: 'AI Readiness Assessment | Find Your Biggest Revenue Leak | Nxt Apex AI',
  description: 'Answer 5 questions about your operations. We identify your biggest revenue leak and show you exactly how an AI agent fixes it in 2 weeks. Free. No sales call.',
  keywords: ['AI readiness assessment', 'revenue leak audit', 'AI business consultant', 'business operations audit', 'speed to lead', 'AI implementation', 'Nxt Apex AI'],
  openGraph: {
    title: 'Your business is leaking revenue in at least 3 places right now.',
    description: 'Answer 5 questions. We find your biggest leak and show you how an AI agent fixes it in 2 weeks.',
    url: SITE_URL,
    type: 'website',
  },
  alternates: { canonical: SITE_URL },
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(assessmentSchema) }}
      />
      <Navbar />
      <HomeHero />
      <OfferStackSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
