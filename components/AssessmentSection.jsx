'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const uncovered = [
  'Current tools and how your team actually uses them',
  'Workflows that are ripe for AI automation',
  'Where time is wasted on repetitive, low-value tasks',
  'Team readiness and technical capability',
  'Priority AI implementations with estimated ROI',
  'A clear 90-day implementation roadmap',
];

export default function AssessmentSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="assessment" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div
              className="inline-block px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-[0.14em] uppercase mb-6"
              style={{
                backgroundColor: 'rgba(198,166,44,0.08)',
                borderColor: 'rgba(198,166,44,0.22)',
                color: '#8B6914',
              }}
            >
              The Assessment
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              What we cover<br />in your assessment.
            </h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-10">
              The AI Readiness Assessment is a structured 60–90 minute discovery session.
              By the end, we have everything we need to build your custom AI Opportunity Report.
            </p>
            <a
              href="https://nxtapexai.com/ai-clarity-session"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: '#C6A62C',
                boxShadow: '0 8px 32px rgba(198,166,44,0.32)',
              }}
            >
              Book Your Assessment →
            </a>
          </motion.div>

          {/* Right: checklist card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="rounded-2xl p-10 border border-gray-100 bg-[#FAFAF8]"
          >
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-7">
              We'll uncover:
            </div>
            <div className="space-y-4">
              {uncovered.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 18 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: 'rgba(198,166,44,0.14)' }}
                  >
                    <svg
                      className="w-3 h-3"
                      style={{ color: '#C6A62C' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium text-[15px]">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-9 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 font-medium">
                Delivered as a written report within{' '}
                <strong className="text-gray-900">48 hours</strong> of the session.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
