import Navbar from '@/components/Navbar';
import HomeHero from '@/components/HomeHero';
import CalloutBand from '@/components/CalloutBand';
import SixLoopsSection from '@/components/SixLoopsSection';
import TimelineSection from '@/components/TimelineSection';
import OfferStackSection from '@/components/OfferStackSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const SITE_URL = 'https://nxtapexai.com';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Closed Loop System?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Closed Loop System is six AI agents, each one closing a specific way revenue leaks out of a business: Speed to Lead closes the response loop, AI Receptionist closes the missed call loop, Database Reactivation closes the dead lead loop, Website Manager closes the browse and bounce loop, Reputation Manager closes the trust loop, and Pipeline Manager closes the oversight loop.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast should a business respond to a new lead?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Leads contacted within 5 minutes are up to 96x more likely to convert than leads reached after 30 minutes. This is the response loop, and it is the most common open loop we find. An AI agent closes it by replying to every new lead in under 60 seconds, around the clock.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does implementation take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Day 0 is your AI Readiness Assessment. By day 2 your open loops are named and ranked. By day 6 Speed to Lead and Database Reactivation are live. By day 12 all six agents are running and monitored. By day 30 the full system is implemented and tuned for performance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens when a business misses a phone call?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most missed calls go to voicemail and never get returned. This is the missed call loop. An AI Receptionist closes it by answering every call the team cannot get to, qualifying the caller, and booking the ones worth booking directly onto the calendar.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is database reactivation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Database reactivation is systematically contacting every lead in your CRM who never bought. Most businesses have paid to generate hundreds or thousands of these leads and never followed up. An AI agent works that list conversationally and books the ones who are ready now.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Nxt Apex AI a marketing agency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Marketing agencies create demand. Nxt Apex AI captures demand that already exists and is currently being lost. The work is AI operations and implementation, not advertising or lead generation.',
      },
    },
  ],
};

export const metadata = {
  title: 'The Closed Loop System | Six AI Agents That Stop Revenue Leaks | Nxt Apex AI',
  description: 'You do not need more leads. You need to stop losing the ones you have. Six AI agents close the six ways revenue leaves your business. First two live in six days.',
  keywords: [
    'AI receptionist',
    'speed to lead automation',
    'database reactivation AI',
    'AI implementation for service businesses',
    'closed loop system',
    'AI operations consulting',
    'missed call automation',
    'Nxt Apex AI',
  ],
  openGraph: {
    title: 'The work your team hates doing? It stops next week.',
    description: 'Six AI agents. Six ways revenue leaves your business, closed. Answer 5 questions and find which loop is widest open.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <HomeHero />
      <CalloutBand />
      <SixLoopsSection />
      <TimelineSection />
      <OfferStackSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
