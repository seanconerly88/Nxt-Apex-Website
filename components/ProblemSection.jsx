'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const problems = [
  {
    hint: 'Tools paid for. Value: zero.',
    title: 'Subscribed but Underutilized',
    reveal:
      "You're paying for Claude, ChatGPT, Copilot — but your team treats them like search engines. The ROI isn't there because the strategy isn't there.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    rot: '-1.2deg',
  },
  {
    hint: 'Loud signal. Zero specificity.',
    title: 'No Direction, Just Noise',
    reveal:
      "The internet is full of AI tutorials. None of them are about your business, your workflows, or your actual problems. Generic advice doesn't move the needle.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    rot: '1deg',
  },
  {
    hint: 'All study. No output.',
    title: 'Learning AI Instead of Using It',
    reveal:
      'Teams spend hours in courses and webinars but never deploy anything real. The gap between learning and doing is where ROI dies.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    rot: '-0.8deg',
  },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-28 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[11px] font-bold text-gray-500 tracking-[0.14em] uppercase mb-5">
            The Reality
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Most teams have AI tools.
            <br />
            <span style={{
              backgroundImage: 'linear-gradient(90deg, #C6A62C, #e8c84a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Nobody knows how to use them.
            </span>
          </h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto font-light">
            The problem isn't access to AI. It's the absence of a plan.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.12 }}
            >
              {/* BounceCard wrapper */}
              <motion.div
                whileHover={{ scale: 0.965, rotate: p.rot }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="group relative overflow-hidden rounded-2xl cursor-default select-none"
                style={{
                  backgroundColor: '#080D1C',
                  border: '1px solid rgba(255,255,255,0.06)',
                  minHeight: 360,
                }}
              >
                {/* Ambient glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(198,166,44,0.14) 0%, transparent 70%)',
                  }}
                />

                {/* Gold top edge */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{
                    background: 'linear-gradient(to right, transparent, #C6A62C 40%, #e8c84a 60%, transparent)',
                  }}
                />

                {/* Main content */}
                <div className="relative z-10 p-8">
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 text-[#C6A62C] flex-shrink-0"
                    style={{
                      backgroundColor: 'rgba(198,166,44,0.1)',
                      border: '1px solid rgba(198,166,44,0.18)',
                    }}
                  >
                    {p.icon}
                  </div>

                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3"
                    style={{ color: 'rgba(255,255,255,0.22)' }}>
                    {p.hint}
                  </p>

                  <h3 className="text-xl font-bold text-white leading-snug">{p.title}</h3>
                </div>

                {/* Gold reveal panel — slides up from bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-20 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-[300ms] ease-out"
                  style={{ backgroundColor: '#C6A62C' }}
                >
                  <p className="text-black/80 font-medium leading-relaxed text-[15px]">{p.reveal}</p>
                  <div className="flex items-center gap-1.5 mt-4 text-black/50 text-xs font-bold uppercase tracking-widest">
                    <span>This is fixable</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Hover hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center text-[11px] text-gray-400 mt-6 tracking-wide"
        >
          Hover each card
        </motion.p>

      </div>
    </section>
  );
}
