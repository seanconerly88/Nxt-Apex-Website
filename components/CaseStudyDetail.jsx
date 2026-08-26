'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useBooking } from '@/contexts/BookingContext';

const EASE = [0.22, 1, 0.36, 1];

function Check() {
  return (
    <span
      className="w-[18px] h-[18px] rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
      style={{ backgroundColor: 'rgba(198,166,44,0.14)' }}
    >
      <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M2 5l2.5 2.5L8 3" stroke="#C6A62C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function CaseStudyDetail({ study }) {
  const { openModal } = useBooking();

  return (
    <article className="pt-36 lg:pt-44 pb-28 px-6" style={{ backgroundColor: '#060A18' }}>
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-[13px] mb-8"
        >
          <Link href="/case-studies" className="text-white/30 hover:text-white/60 transition-colors">
            Case Studies
          </Link>
          <span className="text-white/15">/</span>
          <span className="text-white/50">{study.client}</span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex items-center gap-2.5 mb-5 flex-wrap">
            <span className="text-white font-bold text-[15px]">{study.client}</span>
            <span className="text-white/20 text-[14px]">{study.industry}</span>
            {study.website && (
              <a
                href={`https://${study.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors hover:brightness-125"
                style={{ color: 'rgba(198,166,44,0.8)' }}
              >
                {study.website}
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M4 2h6v6M10 2L2.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>

          <h1
            className="text-white font-extrabold mb-6"
            style={{ fontSize: 'clamp(32px, 5vw, 58px)', letterSpacing: '-0.028em', lineHeight: 1.05, textWrap: 'balance' }}
          >
            {study.hook}
          </h1>

          <p className="text-white/50 text-lg leading-relaxed mb-10">{study.summary}</p>
        </motion.div>

        {/* Metric block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="rounded-2xl px-7 py-8 mb-14 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10"
          style={{ backgroundColor: 'rgba(198,166,44,0.05)', border: '1px solid rgba(198,166,44,0.18)' }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/30 mb-2">Before</p>
            <p className="text-white/40 font-bold tabular-nums" style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}>
              {study.metric.before}
            </p>
          </div>

          <svg className="w-6 h-6 flex-shrink-0 rotate-90 sm:rotate-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12h15m0 0l-5-5m5 5l-5 5" stroke="rgba(198,166,44,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: 'rgba(198,166,44,0.65)' }}>
              After
            </p>
            <p className="font-extrabold tabular-nums" style={{ color: '#C6A62C', fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em' }}>
              {study.metric.after}
            </p>
          </div>

          <p className="text-white/25 text-[13px] sm:ml-auto">{study.metric.label}</p>
        </motion.div>

        {/* The open loop */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14"
        >
          <h2 className="text-white font-bold text-2xl mb-4" style={{ letterSpacing: '-0.018em' }}>
            The open loop
          </h2>
          <p className="text-white/45 text-[16px] leading-relaxed">{study.openLoop}</p>

          <div className="flex items-center gap-2 flex-wrap mt-6">
            {study.loops.map(loop => (
              <span
                key={loop}
                className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: 'rgba(198,166,44,0.1)',
                  border: '1px solid rgba(198,166,44,0.22)',
                  color: '#C6A62C',
                }}
              >
                {loop}
              </span>
            ))}
          </div>
        </motion.section>

        {/* What we built */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14"
        >
          <h2 className="text-white font-bold text-2xl mb-5" style={{ letterSpacing: '-0.018em' }}>
            What we built
          </h2>
          <ul className="flex flex-col gap-3.5">
            {study.built.map(item => (
              <li key={item} className="flex gap-3 text-white/50 text-[15px] leading-relaxed">
                <Check />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Results */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14"
        >
          <h2 className="text-white font-bold text-2xl mb-5" style={{ letterSpacing: '-0.018em' }}>
            What moved
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {study.results.map((r, i) => (
              <div
                key={r}
                className="px-6 py-4 text-white/65 text-[15px] leading-relaxed"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.022)',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {r}
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="rounded-2xl px-8 py-10 text-center"
          style={{ backgroundColor: 'rgba(198,166,44,0.05)', border: '1px solid rgba(198,166,44,0.18)' }}
        >
          <p
            className="text-white font-extrabold mb-3"
            style={{ fontSize: 'clamp(20px, 2.6vw, 28px)', letterSpacing: '-0.018em', textWrap: 'balance' }}
          >
            Which loop is open in your business?
          </p>
          <p className="text-white/40 text-[15px] mb-7 max-w-md mx-auto">
            Answer 5 questions and find out, or book the assessment and we will map all of them.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              onClick={openModal}
              whileHover={{ y: -3, boxShadow: '0 10px 32px rgba(198,166,44,0.42)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-white font-bold text-[15px]"
              style={{ backgroundColor: '#C6A62C', boxShadow: '0 4px 20px rgba(198,166,44,0.3)' }}
            >
              Book your Assessment →
            </motion.button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-bold text-[15px] transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)' }}
            >
              Take the 5 question quiz
            </Link>
          </div>
        </motion.div>

        {/* Back */}
        <div className="mt-12 text-center">
          <Link href="/case-studies" className="text-white/25 text-[13px] hover:text-white/50 transition-colors">
            ← All case studies
          </Link>
        </div>
      </div>
    </article>
  );
}
