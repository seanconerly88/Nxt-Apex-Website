'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientLayout from '@/components/ClientLayout';
import { LOOPS, LOOP_ORDER } from '@/lib/loopConfig';

const EASE = [0.22, 1, 0.36, 1];
const SITE_URL = 'https://nxtapexai.com';
const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/nxtapexai';

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

function LoopRing({ inView, delay, reduceMotion }) {
  const C = 2 * Math.PI * 13;
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="13" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
      <motion.circle
        cx="16" cy="16" r="13"
        stroke="#C6A62C" strokeWidth="2" strokeLinecap="round"
        strokeDasharray={C}
        initial={{ strokeDashoffset: reduceMotion ? 0 : C }}
        animate={inView ? { strokeDashoffset: 0 } : {}}
        transition={{ duration: 1.1, delay, ease: EASE }}
        style={{ transformOrigin: '16px 16px', rotate: '-90deg' }}
      />
    </svg>
  );
}

export default function LoopPage({ loop, schema }) {
  const {
    slug, name, closes, h1, hook, pitch,
    answerHeading, answerBody,
    problemHeading, problems,
    stepsHeading, steps,
    faqs,
  } = loop;

  const [openFaq, setOpenFaq] = useState(null);
  const reduceMotion = useReducedMotion();

  const heroRef    = useRef(null);
  const answerRef  = useRef(null);
  const problemRef = useRef(null);
  const stepsRef   = useRef(null);
  const otherRef   = useRef(null);
  const faqRef     = useRef(null);
  const ctaRef     = useRef(null);

  const heroInView    = useInView(heroRef,    { once: true, margin: '-40px' });
  const answerInView  = useInView(answerRef,  { once: true, margin: '-80px' });
  const problemInView = useInView(problemRef, { once: true, margin: '-80px' });
  const stepsInView   = useInView(stepsRef,   { once: true, margin: '-80px' });
  const otherInView   = useInView(otherRef,   { once: true, margin: '-80px' });
  const faqInView     = useInView(faqRef,     { once: true, margin: '-80px' });
  const ctaInView     = useInView(ctaRef,     { once: true, margin: '-80px' });

  const otherLoops = LOOP_ORDER.filter(k => k !== slug).map(k => LOOPS[k]);

  const fullSchema = [
    ...(schema || []),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}/${slug}` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fullSchema) }}
      />
      <ClientLayout>
        <main>
          <Navbar />

          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section ref={heroRef} className="relative overflow-hidden pt-28 pb-20 px-6" style={{ background: '#060A18' }}>
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

            <div className="relative max-w-3xl mx-auto pt-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-8"
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[#C6A62C]"
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ boxShadow: '0 0 7px rgba(198,166,44,0.9)' }}
                />
                <span className="text-[11px] font-bold text-white/40 tracking-[0.15em] uppercase">
                  {closes}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
                className="font-extrabold text-white leading-[1.06] tracking-tight mb-6"
                style={{ fontSize: 'clamp(32px, 4vw, 56px)', textWrap: 'balance' }}
              >
                {h1}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="text-white/60 leading-relaxed mb-4 max-w-2xl mx-auto"
                style={{ fontSize: 'clamp(16px, 1.2vw, 19px)' }}
              >
                {hook}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.3, ease: EASE }}
                className="text-white/55 text-base leading-relaxed mb-10 max-w-2xl mx-auto"
              >
                {pitch}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <motion.a
                  href={BOOKING_URL}
                  whileHover={reduceMotion ? {} : { scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block px-7 py-3.5 rounded-xl font-bold text-black text-[15px]"
                  style={{ backgroundColor: '#C6A62C', boxShadow: '0 6px 28px rgba(198,166,44,0.38)' }}
                >
                  Book a Strategy Call →
                </motion.a>
                <a
                  href="#how-it-works"
                  className="text-sm font-medium text-white/35 hover:text-white/60 transition-colors duration-200"
                >
                  Or see how it works ↓
                </a>
              </motion.div>
            </div>
          </section>

          {/* ── Answer-first block (built to be quoted) ──────────────────── */}
          <section ref={answerRef} className="py-20 px-6 bg-white">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={answerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5 leading-tight">
                {answerHeading}
              </h2>
              <p className="text-gray-600 text-[17px] leading-[1.75]">
                {answerBody}
              </p>
            </motion.div>
          </section>

          {/* ── Problem — light bg, dark hover-reveal cards ──────────────── */}
          <section ref={problemRef} className="py-28 bg-[#FAFAF8] px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={problemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65 }}
                className="mb-14"
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[11px] font-bold text-gray-500 tracking-[0.14em] uppercase mb-5">
                  Why It Matters
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                  {problemHeading}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {problems.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 36 }}
                    animate={problemInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay: 0.1 + i * 0.12 }}
                  >
                    <motion.div
                      whileHover={reduceMotion ? {} : { scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                      className="group relative overflow-hidden rounded-2xl cursor-default select-none"
                      style={{ backgroundColor: '#080D1C', border: '1px solid rgba(255,255,255,0.06)', minHeight: 300 }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(198,166,44,0.14) 0%, transparent 70%)' }}
                      />
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(to right, transparent, #C6A62C 40%, #e8c84a 60%, transparent)' }}
                      />
                      <div className="relative z-10 p-8">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 text-xs font-black"
                          style={{ backgroundColor: 'rgba(198,166,44,0.1)', border: '1px solid rgba(198,166,44,0.18)', color: '#C6A62C' }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.22)' }}>
                          {p.hint}
                        </p>
                        <h3 className="text-[20px] font-bold text-white leading-snug">{p.title}</h3>
                      </div>
                      <div
                        className="absolute bottom-0 left-0 right-0 z-20 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-[300ms] ease-out"
                        style={{ backgroundColor: '#C6A62C' }}
                      >
                        <p className="text-black/80 font-medium leading-relaxed text-[14px]">{p.body}</p>
                        <div className="flex items-center gap-1.5 mt-4 text-black/50 text-xs font-bold uppercase tracking-widest">
                          <span>This is fixable</span>
                          <span>→</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={problemInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-center text-[11px] text-gray-400 mt-6 tracking-wide"
              >
                Hover each card
              </motion.p>
            </div>
          </section>

          {/* ── How it works ─────────────────────────────────────────────── */}
          <section ref={stepsRef} id="how-it-works" className="py-28 bg-white px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65 }}
                className="text-center mb-14"
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-[11px] font-bold text-gray-500 tracking-[0.14em] uppercase mb-5">
                  How It Works
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                  {stepsHeading}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {steps.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 36 }}
                    animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay: 0.08 + i * 0.1 }}
                  >
                    <motion.div
                      whileHover={reduceMotion ? {} : { y: -5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="group relative overflow-hidden rounded-2xl p-7 h-full cursor-default"
                      style={{ backgroundColor: '#080D1C', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(to right, transparent, #C6A62C 40%, #e8c84a 60%, transparent)' }}
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(198,166,44,0.1) 0%, transparent 70%)' }}
                      />
                      <div className="relative z-10">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center mb-5 text-[11px] font-black"
                          style={{ background: '#C6A62C', color: '#000' }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <p className="text-white font-bold text-[15px] mb-2.5">{s.title}</p>
                        <p className="text-white/45 text-[13px] leading-relaxed">{s.body}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── The other loops ──────────────────────────────────────────── */}
          <section ref={otherRef} className="py-24 px-6" style={{ backgroundColor: '#060A18' }}>
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={otherInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: EASE }}
                className="text-center mb-12"
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-[11px] font-bold tracking-[0.14em] uppercase"
                  style={{ backgroundColor: 'rgba(198,166,44,0.1)', border: '1px solid rgba(198,166,44,0.2)', color: '#C6A62C' }}
                >
                  The Closed Loop System
                </div>
                <h2 className="text-white font-extrabold mb-3" style={{ fontSize: 'clamp(26px, 3vw, 38px)', letterSpacing: '-0.02em' }}>
                  {name} is one of six.
                </h2>
                <p className="text-white/40 text-[15px] max-w-lg mx-auto">
                  Each one closes a different place revenue leaves. Most businesses are leaking from more than one.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {otherLoops.map((other, i) => (
                  <motion.div
                    key={other.slug}
                    initial={{ opacity: 0, y: 26 }}
                    animate={otherInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  >
                    <Link href={`/${other.slug}`} className="block h-full">
                      <motion.div
                        whileHover={reduceMotion ? {} : {
                          y: -6,
                          backgroundColor: 'rgba(198,166,44,0.05)',
                          borderColor: 'rgba(198,166,44,0.28)',
                          boxShadow: '0 18px 44px rgba(0,0,0,0.4)',
                        }}
                        className="group rounded-2xl p-7 h-full flex flex-col"
                        style={{ backgroundColor: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div className="mb-5">
                          <LoopRing inView={otherInView} delay={0.3 + i * 0.08} reduceMotion={reduceMotion} />
                        </div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2.5" style={{ color: '#C6A62C' }}>
                          {other.closes}
                        </p>
                        <h3 className="text-white font-bold text-xl mb-3">{other.name}</h3>
                        <p className="text-white/40 text-[14px] leading-relaxed flex-1">{other.cardBody}</p>
                        <span className="mt-5 text-[13px] font-bold" style={{ color: '#C6A62C' }}>
                          See how it works →
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────── */}
          <section ref={faqRef} className="py-28 bg-[#FAFAF8] px-6">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65 }}
                className="mb-10"
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[11px] font-bold text-gray-500 tracking-[0.14em] uppercase mb-5">
                  Common Questions
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900">{name} — Frequently Asked Questions</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.12 }}
              >
                {faqs.map((faq, i) => (
                  <FAQItem
                    key={i}
                    faq={faq}
                    isOpen={openFaq === i}
                    onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── Final CTA ────────────────────────────────────────────────── */}
          <section
            ref={ctaRef}
            className="py-24 px-6 text-center"
            style={{ background: '#060A18', borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="text-white/35 text-sm mb-5 uppercase tracking-widest font-semibold">
                {closes}
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-5 leading-tight">
                Book a free 30-minute strategy call.
              </h2>
              <p className="text-white/45 text-[15px] max-w-xl mx-auto mb-10 leading-relaxed">
                We map where your leads are actually leaking and what it is costing. You leave knowing which loop to close first, whether you work with us or not.
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
              <p className="mt-5 text-white/25 text-sm">
                No pitch. No obligation. Just a real conversation about where the leaks are.
              </p>
            </motion.div>
          </section>

          <Footer />
        </main>
      </ClientLayout>
    </>
  );
}
