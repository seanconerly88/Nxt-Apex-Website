'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    tag: 'Discovery',
    title: 'AI Readiness Assessment',
    description:
      'We walk your leadership team through a structured discovery session. We map your workflows, tools, team structure, and bottlenecks to surface every AI opportunity hiding in your operations.',
    detail: '~60–90 minute session',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    number: '02',
    tag: 'Deliverable',
    title: 'AI Opportunity Report',
    description:
      'Within 48 hours you receive a custom report detailing exactly where and how AI can be implemented in your business. Every recommendation is tied to real workflows, real tools, and real ROI — not generic advice.',
    detail: 'Delivered within 48 hours',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    number: '03',
    tag: 'Implementation',
    title: 'Train or Deploy',
    description:
      'Take the report and implement it yourself — or bring us in. We\'ll train your team directly on Claude Cowork and OpenAI Teams, building the exact workflows from your report into your daily operations.',
    detail: 'Your choice',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="process" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <div
            className="inline-block px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-[0.14em] uppercase mb-5"
            style={{
              backgroundColor: 'rgba(198,166,44,0.08)',
              borderColor: 'rgba(198,166,44,0.22)',
              color: '#8B6914',
            }}
          >
            Our Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            From assessment<br />to action.
          </h2>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            Three steps. No fluff. You walk out with a plan and the team trained to execute it.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.15 }}
              className="relative bg-white rounded-2xl p-9 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 group"
            >
              {/* Step number + icon row */}
              <div className="flex items-center justify-between mb-7">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-[#C6A62C] group-hover:bg-[#C6A62C] group-hover:text-white transition-all duration-300"
                  style={{ backgroundColor: 'rgba(198,166,44,0.1)' }}
                >
                  {step.icon}
                </div>
                <span className="text-6xl font-extrabold text-gray-100 select-none leading-none">
                  {step.number}
                </span>
              </div>

              <div className="inline-block px-2.5 py-1 rounded-md bg-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                {step.tag}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-7 text-[15px]">{step.description}</p>

              <div className="flex items-center gap-2 text-sm font-semibold text-[#C6A62C]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A62C]" />
                {step.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
