'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const problems = [
  {
    icon: '💸',
    title: 'Subscribed but Underutilized',
    description:
      "You're paying for Claude, ChatGPT, Copilot — but your team treats them like search engines. The ROI isn't there because the strategy isn't there.",
  },
  {
    icon: '🧭',
    title: 'No Direction, Just Noise',
    description:
      'The internet is full of AI tutorials. None of them are about your business, your workflows, or your actual problems. Generic advice doesn\'t move the needle.',
  },
  {
    icon: '⏳',
    title: 'Learning AI Instead of Using It',
    description:
      'Teams spend hours in courses and webinars but never deploy anything real. The gap between learning and doing is where ROI dies.',
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
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #C6A62C, #e8c84a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
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
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.1 }}
              className="bg-white rounded-2xl p-9 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="text-4xl mb-6">{p.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#C6A62C] transition-colors duration-200">
                {p.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
