import Navbar from '@/components/Navbar';
import HeroScan from '@/components/HeroScan';
import ProblemSection from '@/components/ProblemSection';
import ProcessSection from '@/components/ProcessSection';
import TrainingSection from '@/components/TrainingSection';
import AEOSection from '@/components/AEOSection';
import AssessmentSection from '@/components/AssessmentSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const SITE_URL = 'https://nxtapexai.com';

export const metadata = {
  title: 'AI Search Visibility & AEO Services | Nxt Apex AI',
  description: 'We use agents to upgrade and connect your existing tools to eliminate the work slowing your team down. AI search visibility, AEO audits, and pipeline connection for local businesses.',
  alternates: { canonical: `${SITE_URL}/ai-search` },
};

export default function AISearchPage() {
  return (
    <main>
      <Navbar />
      <HeroScan />
      <ProblemSection />
      <ProcessSection />
      <TrainingSection />
      <AEOSection />
      <AssessmentSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
