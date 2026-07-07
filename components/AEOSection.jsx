'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const INDUSTRIES = [
  {
    slug: 'aeo-for-real-estate',
    name: 'Real Estate',
    line: 'Buyers find agents through AI before they open a browser.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    slug: 'aeo-for-home-services',
    name: 'Home Services',
    line: 'Homeowners ask AI for service recommendations before they call.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    slug: 'aeo-for-medical',
    name: 'Medical Practices',
    line: 'Patients vet providers through AI engines before they book.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    slug: 'aeo-for-dental',
    name: 'Dental Practices',
    line: 'New patients search AI the same way they used to search Google.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    slug: 'aeo-for-law-firms',
    name: 'Law Firms',
    line: 'Potential clients ask AI to recommend attorneys before they search.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    slug: 'aeo-for-insurance',
    name: 'Insurance Agencies',
    line: 'Buyers ask AI to compare and recommend agents before they shop.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    slug: 'aeo-for-med-spa',
    name: 'Medical Spas',
    line: 'Aesthetic clients find med spas through AI before they book.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export default function AEOSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-28 bg-[#FAFAF8] px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[11px] font-bold text-gray-500 tracking-[0.14em] uppercase mb-5">
            AI Visibility Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Your next client is already
            <br />
            <span style={{
              backgroundImage: 'linear-gradient(90deg, #C6A62C, #e8c84a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              asking AI where to go.
            </span>
          </h2>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            ChatGPT, Perplexity, and Google AI Overviews are recommending businesses to buyers right now.
            We fix how you show up in those answers — then connect that visibility to a pipeline built to close.
          </p>
        </motion.div>

        {/* Industry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {INDUSTRIES.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 + i * 0.07 }}
            >
              <Link href={`/${item.slug}`} className="group block h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="relative overflow-hidden rounded-2xl p-6 h-full"
                  style={{
                    backgroundColor: '#080D1C',
                    border: '1px solid rgba(255,255,255,0.06)',
                    minHeight: 160,
                  }}
                >
                  {/* Gold top edge on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to right, transparent, #C6A62C 40%, #e8c84a 60%, transparent)' }}
                  />
                  {/* Ambient glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(198,166,44,0.1) 0%, transparent 70%)' }}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-[#C6A62C] flex-shrink-0"
                      style={{ backgroundColor: 'rgba(198,166,44,0.1)', border: '1px solid rgba(198,166,44,0.18)' }}
                    >
                      {item.icon}
                    </div>

                    <p className="text-white font-bold text-[15px] mb-2 leading-snug">{item.name}</p>
                    <p className="text-white/40 text-[13px] leading-relaxed flex-1">{item.line}</p>

                    <div className="flex items-center gap-1 mt-5 text-[#C6A62C] text-[12px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span>Check your visibility</span>
                      <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="text-center text-[12px] text-gray-400 mt-8 tracking-wide"
        >
          Free AI Visibility Report for every industry above — no credit card, delivered by email.
        </motion.p>

      </div>
    </section>
  );
}
