'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-28 bg-[#111111] relative overflow-hidden">
      {/* Warm gold glow from bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 110%, rgba(198,166,44,0.18) 0%, transparent 65%)',
        }}
      />

      {/* Floating capsule accent */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '580px',
          height: '155px',
          background: 'rgba(198,166,44,0.07)',
          top: '15%',
          right: '-8%',
          filter: 'blur(2px)',
          borderRadius: '9999px',
        }}
        animate={{ y: [0, -22, 0], rotate: [-26, -21, -26] }}
        initial={{ rotate: -26 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div
            className="inline-block px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-[0.14em] uppercase mb-8"
            style={{ borderColor: 'rgba(198,166,44,0.35)', color: '#C6A62C' }}
          >
            Ready to start?
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.05]">
            Find where AI fits
            <br />
            <span
              style={{
                backgroundImage: 'linear-gradient(92deg, #C6A62C 0%, #e8c84a 50%, #a08020 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              in your business.
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Book your AI Readiness Assessment. Walk away with a report that tells you exactly what
            to build, what to automate, and what to train your team on.
          </p>

          <a
            href="https://nxtapexai.com/ai-clarity-session"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-5 rounded-xl font-semibold text-lg text-white transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: '#C6A62C',
              boxShadow: '0 8px 40px rgba(198,166,44,0.45)',
            }}
          >
            Book Your Assessment →
          </a>

          <p className="mt-8 text-sm text-gray-600">
            Or call us at{' '}
            <a
              href="tel:+15042904780"
              className="font-semibold transition-colors duration-200 hover:text-[#e8c84a]"
              style={{ color: '#C6A62C' }}
            >
              (504) 290-4780
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
