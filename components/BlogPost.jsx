'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { LOOPS } from '@/lib/loopConfig';
import { POSTS_BY_DATE } from '@/lib/blog';

const EASE = [0.22, 1, 0.36, 1];
const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/nxtapexai';

function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
}

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <h3 className="text-gray-900 font-bold text-[17px] leading-snug group-hover:text-[#C6A62C] transition-colors duration-200">
          {faq.q}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
          style={{
            border: `1px solid ${isOpen ? 'rgba(198,166,44,0.4)' : 'rgba(0,0,0,0.1)'}`,
            color: isOpen ? '#C6A62C' : 'rgba(0,0,0,0.4)',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-gray-500 text-[15px] leading-relaxed pb-6 pr-12">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BlogPost({ post }) {
  const [openFaq, setOpenFaq] = useState(null);
  const reduceMotion = useReducedMotion();

  const loop = post.relatedLoop ? LOOPS[post.relatedLoop] : null;
  const more = POSTS_BY_DATE.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6" style={{ background: '#060A18' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          className="absolute top-0 left-1/3 w-[700px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center top, rgba(198,166,44,0.07) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-3xl mx-auto pt-8">
          <Link href="/blog" className="text-white/30 text-[13px] font-medium hover:text-white/60 transition-colors">
            ← Field Notes
          </Link>

          <div className="flex flex-wrap items-center gap-3 mt-6 mb-5 text-[11px] font-bold uppercase tracking-[0.12em]">
            <span style={{ color: '#C6A62C' }}>{post.category}</span>
            <span className="text-white/20">·</span>
            <span className="text-white/35">{formatDate(post.date)}</span>
            <span className="text-white/20">·</span>
            <span className="text-white/35">{post.readMinutes} min read</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="font-extrabold text-white leading-[1.08] tracking-tight"
            style={{ fontSize: 'clamp(30px, 3.6vw, 48px)', textWrap: 'balance' }}
          >
            {post.title}
          </motion.h1>
        </div>
      </section>

      {/* ── Answer-first block ─────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: 'rgba(198,166,44,0.05)', border: '1px solid rgba(198,166,44,0.22)' }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] mb-4" style={{ color: '#C6A62C' }}>
              The short answer
            </p>
            <p className="text-gray-800 text-[17px] leading-[1.75]">{post.answer}</p>
          </div>
        </div>
      </section>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <article className="pb-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          {post.sections.map((section) => (
            <section key={section.h2} className="mb-14">
              <h2 className="text-gray-900 font-extrabold text-2xl md:text-[28px] mb-5 leading-snug">
                {section.h2}
              </h2>
              {section.paras.map((para, i) => (
                <p key={i} className="text-gray-600 text-[17px] leading-[1.8] mb-5">{para}</p>
              ))}
              {section.list && (
                <ul className="mt-6 space-y-3">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-[16px] leading-relaxed">
                      <span
                        className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: '#C6A62C' }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Related loop */}
          {loop && (
            <Link href={`/${loop.slug}`} className="block mt-4">
              <motion.div
                whileHover={reduceMotion ? {} : { y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group rounded-2xl p-8"
                style={{ backgroundColor: '#080D1C', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: '#C6A62C' }}>
                  {loop.closes}
                </p>
                <h3 className="text-white font-bold text-xl mb-3">{loop.name}</h3>
                <p className="text-white/45 text-[15px] leading-relaxed mb-5">{loop.cardBody}</p>
                <span className="text-[13px] font-bold" style={{ color: '#C6A62C' }}>
                  See how it works →
                </span>
              </motion.div>
            </Link>
          )}
        </div>
      </article>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      {post.faqs?.length > 0 && (
        <section className="py-24 px-6 bg-[#FAFAF8]">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[11px] font-bold text-gray-500 tracking-[0.14em] uppercase mb-5">
              Common Questions
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Frequently Asked Questions</h2>
            {post.faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── More posts ─────────────────────────────────────────────────── */}
      {more.length > 0 && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">More field notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {more.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="block">
                  <motion.div
                    whileHover={reduceMotion ? {} : { y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="group h-full rounded-2xl p-7 bg-white"
                    style={{ border: '1px solid rgba(0,0,0,0.07)' }}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: '#C6A62C' }}>
                      {p.category}
                    </p>
                    <h3 className="text-gray-900 font-bold text-lg leading-snug group-hover:text-[#C6A62C] transition-colors duration-200">
                      {p.title}
                    </h3>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center" style={{ background: '#060A18', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-5 leading-tight">
          Book a free 30-minute strategy call.
        </h2>
        <p className="text-white/45 text-[15px] max-w-xl mx-auto mb-10 leading-relaxed">
          We map where your leads are actually leaking and what it is costing. No pitch, no obligation.
        </p>
        <motion.a
          href={BOOKING_URL}
          whileHover={reduceMotion ? {} : { scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block px-9 py-4 rounded-xl font-bold text-black text-[15px]"
          style={{ backgroundColor: '#C6A62C', boxShadow: '0 6px 32px rgba(198,166,44,0.38)' }}
        >
          Book Your Strategy Call →
        </motion.a>
      </section>
    </>
  );
}
