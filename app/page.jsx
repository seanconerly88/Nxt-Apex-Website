import Navbar from '@/components/Navbar';
import HeroGeometric from '@/components/HeroGeometric';
import ProblemSection from '@/components/ProblemSection';
import ProcessSection from '@/components/ProcessSection';
import TrainingSection from '@/components/TrainingSection';
import AssessmentSection from '@/components/AssessmentSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroGeometric />
      <ProblemSection />
      <ProcessSection />
      <TrainingSection />
      <AssessmentSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
