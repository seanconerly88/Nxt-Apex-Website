import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'You\'re Booked | Nxt Apex AI',
  description: 'Your assessment call is confirmed. Check your text and email for details.',
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main style={{ backgroundColor: '#060A18', minHeight: '100vh' }}>
      <Navbar ctaLabel="View FAQ" ctaHref="/faq" />

      <section className="flex flex-col items-center justify-center px-6 text-center" style={{ minHeight: '80vh', paddingTop: '120px', paddingBottom: '80px' }}>

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-8"
          style={{ backgroundColor: 'rgba(198,166,44,0.12)', border: '1px solid rgba(198,166,44,0.25)' }}
        >
          <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
            <path d="M5 14l6.5 6.5L23 8" stroke="#C6A62C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Headline */}
        <h1
          className="font-extrabold text-white mb-4"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em' }}
        >
          You're on the calendar.
        </h1>

        {/* Subhead */}
        <p className="text-white/55 mb-3" style={{ fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: '520px' }}>
          Confirmation details are on their way via text and email.
        </p>

        <p className="text-white/30 text-[15px]" style={{ maxWidth: '420px', lineHeight: '1.7' }}>
          We'll review everything before the call. Come ready to talk through what's actually happening in your business.
        </p>

        {/* Divider */}
        <div className="w-16 h-px my-10" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />

        {/* Back link */}
        <a
          href="/"
          className="text-[13px] font-semibold transition-colors duration-200"
          style={{ color: '#C6A62C' }}
        >
          Back to homepage
        </a>
      </section>

      <Footer />
    </main>
  );
}
