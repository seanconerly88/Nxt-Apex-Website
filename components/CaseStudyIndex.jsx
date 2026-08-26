'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CASE_STUDIES } from '@/lib/case-studies';

const EASE = [0.22, 1, 0.36, 1];

export default function CaseStudyIndex() {
  return (
    <section className="pt-36 lg:pt-44 pb-28 px-6" style={{ backgroundColor: '#060A18' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-[11px] font-bold tracking-[0.14em] uppercase"
            style={{ backgroundColor: 'rgba(198,166,44,0.1)', border: '1px solid rgba(198,166,44,0.2)', color: '#C6A62C' }}
          >
            Case Studies
          </div>
          <h1
            className="text-white font-extrabold mb-5"
            style={{ fontSize: 'clamp(32px, 4.6vw, 56px)', letterSpacing: '-0.025em', textWrap: 'balance' }}
          >
            Loops we have closed.
          </h1>
          <p className="text-white/45 text-lg max-w-2xl leading-relaxed">
            Every engagement starts by finding where revenue leaves the business. These are the numbers that moved once we closed it.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {CASE_STUDIES.map((cs, i) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: EASE }}
            >
              <Link href={`/case-studies/${cs.slug}`} className="block group">
                <motion.div
                  whileHover={{ y: -6, borderColor: 'rgba(198,166,44,0.4)', backgroundColor: 'rgba(198,166,44,0.04)' }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="rounded-2xl p-7 sm:p-9"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.025)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(255,255,255,0.07)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10">

                    {/* Metric */}
                    <div className="sm:w-[210px] flex-shrink-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/25 mb-2">
                        {cs.metric.label}
                      </p>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-white/30 text-[15px] line-through tabular-nums">{cs.metric.before}</span>
                        <span className="text-white/20 text-[13px]">→</span>
                      </div>
                      <p
                        className="font-extrabold tabular-nums leading-tight mt-0.5"
                        style={{ color: '#C6A62C', fontSize: 'clamp(20px, 2.4vw, 26px)', letterSpacing: '-0.02em' }}
                      >
                        {cs.metric.after}
                      </p>
                    </div>

                    {/* Body */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                        <h2 className="text-white font-bold text-xl">{cs.client}</h2>
                        <span className="text-white/20 text-[13px]">{cs.industry}</span>
                        {cs.website && (
                          <span className="text-white/25 text-[13px]">{cs.website}</span>
                        )}
                      </div>
                      <p className="text-white/45 text-[15px] leading-relaxed mb-5">{cs.summary}</p>

                      <div className="flex items-center gap-2 flex-wrap">
                        {cs.loops.map(loop => (
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

                      <p
                        className="text-[13px] font-bold mt-5 transition-colors"
                        style={{ color: 'rgba(198,166,44,0.75)' }}
                      >
                        Read the breakdown →
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Honest footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-white/20 text-[13px] mt-12 max-w-2xl leading-relaxed"
        >
          Results are specific to each engagement. Every business has different open loops, and the numbers above reflect what moved for these operators in their markets.
        </motion.p>
      </div>
    </section>
  );
}
