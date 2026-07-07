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

export default function Home() {
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
