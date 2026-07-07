'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientLayout from '@/components/ClientLayout';
import AEOScanWidget from '@/components/AEOScanWidget';

const EASE = [0.22, 1, 0.36, 1];

const SCORE_CATEGORIES = [
  { key: 'crawlability', label: 'AI Crawler Access', num: '01', desc: 'Whether ChatGPT, Perplexity, and Google can read your site.' },
  { key: 'structuredData', label: 'Structured Data', num: '02', desc: 'Schema markup that helps AI understand who you are and what you do.' },
  { key: 'contentClarity', label: 'Content Clarity', num: '03', desc: 'How clearly your pages communicate your services and location.' },
  { key: 'citations', label: 'Citation Strength', num: '04', desc: 'How consistently your business appears across directories and the web.' },
  { key: 'localAuthority', label: 'Local Authority', num: '05', desc: 'Your signal strength in the specific markets you serve.' },
  { key: 'aiReadiness', label: 'AI Readiness', num: '06', desc: 'Technical indicators AI engines use to trust and cite your content.' },
];

const FOUND_ITEMS = [
  { widthPct: 58, badge: '34 AI citations', delay: 0.9 },
  { widthPct: 44, badge: 'FAQ schema ✓',   delay: 1.2 },
  { widthPct: 62, badge: '22 AI citations', delay: 1.5 },
];

function CitationPreview({ industry, badgeText }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: 'rgba(8,13,32,0.92)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 32px 72px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Card header */}
      <div
        className="px-5 py-4 flex items-center gap-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(16,163,127,0.15)', border: '1px solid rgba(16,163,127,0.28)' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="rgba(16,163,127,0.85)" strokeWidth="1.75" />
            <path d="M8 12h8M12 8l4 4-4 4" stroke="rgba(16,163,127,0.85)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white/80 text-[13px] font-semibold">AI Recommendations</p>
          <p className="text-white/30 text-[11px] truncate">&ldquo;Best {badgeText} near me&rdquo;</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 5px rgba(52,211,153,0.7)' }}
          />
          <span className="text-[10px] font-semibold" style={{ color: 'rgba(52,211,153,0.6)' }}>LIVE</span>
        </div>
      </div>

      {/* Platform tabs */}
      <div className="px-5 pt-4 pb-1 flex gap-2">
        {['ChatGPT', 'Perplexity', 'Google AIO'].map((p, i) => (
          <span
            key={p}
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{
              background: i === 0 ? 'rgba(16,163,127,0.12)' : 'rgba(255,255,255,0.04)',
              color: i === 0 ? 'rgba(16,163,127,0.8)' : 'rgba(255,255,255,0.25)',
              border: `1px solid ${i === 0 ? 'rgba(16,163,127,0.25)' : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            {p}
          </span>
        ))}
      </div>

      {/* Results */}
      <div className="px-5 pt-3 pb-5 space-y-3">
        {FOUND_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: item.delay, duration: 0.5, ease: EASE }}
            className="flex items-center gap-3"
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)' }}
            >
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2.5 2.5L8 2.5" stroke="rgba(52,211,153,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div
              className="h-2 rounded-full flex-shrink-0"
              style={{ width: `${item.widthPct}%`, background: 'rgba(255,255,255,0.1)' }}
            />
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md flex-shrink-0 ml-auto"
              style={{ background: 'rgba(52,211,153,0.08)', color: 'rgba(52,211,153,0.65)', border: '1px solid rgba(52,211,153,0.15)' }}
            >
              {item.badge}
            </span>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="h-px"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        />

        {/* Missing entry */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.0, duration: 0.5, ease: EASE }}
          className="flex items-center gap-3"
        >
          <motion.div
            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.22)' }}
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M2 2l4 4M6 2L2 6" stroke="rgba(239,68,68,0.8)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
          <span className="text-white/45 text-[13px] font-medium flex-1">Your Business?</span>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-md flex-shrink-0"
            style={{ background: 'rgba(239,68,68,0.07)', color: 'rgba(239,68,68,0.55)', border: '1px solid rgba(239,68,68,0.14)' }}
          >
            Not in results
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-center pt-1"
          style={{ color: 'rgba(255,255,255,0.18)', fontSize: 11 }}
        >
          Scan your domain below to find your actual position
        </motion.p>
      </div>
    </motion.div>
  );
}

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span
          className="text-[16px] font-bold leading-snug pr-8 transition-colors duration-200"
          style={{ color: isOpen ? '#C6A62C' : '#111827' }}
        >
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-200"
          style={{
            borderColor: isOpen ? '#C6A62C' : 'rgba(0,0,0,0.15)',
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
            <p className="text-gray-500 text-[15px] leading-relaxed pb-6 pr-12">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SITE_URL = 'https://nxtapexai.com';

export default function VerticalPage({ vertical, schema }) {
  const {
    industry, badgeText, h1, hook, pitch,
    whyHeading, whyBody, scanLabel, faqs, slug, name,
  } = vertical;

  const fullSchema = [
    ...(schema || []),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: `AI Visibility for ${name}`, item: `${SITE_URL}/${slug}` },
      ],
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const whyRef  = useRef(null);
  const measRef = useRef(null);
  const faqRef  = useRef(null);
  const ctaRef  = useRef(null);

  const whyInView  = useInView(whyRef,  { once: true, margin: '-80px' });
  const measInView = useInView(measRef, { once: true, margin: '-80px' });
  const faqInView  = useInView(faqRef,  { once: true, margin: '-80px' });
  const ctaInView  = useInView(ctaRef,  { once: true, margin: '-80px' });

  return (
    <>
      {fullSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(fullSchema) }}
        />
      )}
      <ClientLayout>
        <main>
          <Navbar />

          {/* ── Hero — two-column ──────────────────────────────────────────── */}
          <section className="relative overflow-hidden pt-28 pb-20 px-6" style={{ background: '#060A18' }}>
            {/* Dot grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            {/* Ambient glow */}
            <div
              className="absolute top-0 left-1/3 w-[700px] h-[500px] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center top, rgba(198,166,44,0.07) 0%, transparent 65%)' }}
            />

            <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start pt-8">

              {/* ── Left: Copy ── */}
              <div className="flex flex-col justify-center">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-8 w-fit"
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[#C6A62C]"
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ boxShadow: '0 0 7px rgba(198,166,44,0.9)' }}
                  />
                  <span className="text-[11px] font-bold text-white/40 tracking-[0.15em] uppercase">
                    AI Visibility for {badgeText}
                  </span>
                </motion.div>

                {/* H1 */}
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
                  className="font-extrabold text-white leading-[1.06] tracking-tight mb-6"
                  style={{ fontSize: 'clamp(34px, 4vw, 58px)' }}
                >
                  {h1}
                </motion.h1>

                {/* Hook */}
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                  className="text-white/60 leading-relaxed mb-3"
                  style={{ fontSize: 'clamp(16px, 1.2vw, 19px)' }}
                >
                  {hook}
                </motion.p>

                {/* Pitch */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.3, ease: EASE }}
                  className="text-white/55 text-base leading-relaxed mb-10"
                >
                  {pitch}
                </motion.p>

                {/* CTA button */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                  className="flex flex-wrap items-center gap-4 mb-10"
                >
                  <motion.a
                    href="https://api.leadconnectorhq.com/widget/booking/nxtapexai"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block px-7 py-3.5 rounded-xl font-bold text-black text-[15px]"
                    style={{ backgroundColor: '#C6A62C', boxShadow: '0 6px 28px rgba(198,166,44,0.38)' }}
                  >
                    Book a Strategy Call →
                  </motion.a>
                  <a
                    href="#scan"
                    className="text-sm font-medium text-white/35 hover:text-white/60 transition-colors duration-200"
                  >
                    Or scan your site ↓
                  </a>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className="flex flex-wrap gap-x-6 gap-y-2 pt-8 border-t border-white/[0.07]"
                >
                  {['Free report', 'Delivered by email', 'No sales call required'].map((t) => (
                    <span key={t} className="flex items-center gap-1.5 text-white/30 text-xs">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {t}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* ── Right: Citation Preview + Scanner ── */}
              <div className="space-y-5" id="scan">
                <CitationPreview industry={industry} badgeText={badgeText} />

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.75, delay: 0.6, ease: EASE }}
                >
                  <AEOScanWidget industry={industry} scanLabel={scanLabel} />
                </motion.div>
              </div>

            </div>
          </section>

          {/* ── Why — LIGHT with ProblemSection hover reveal ───────────────── */}
          <section ref={whyRef} className="py-28 bg-[#FAFAF8] px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={whyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65 }}
                className="mb-14"
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[11px] font-bold text-gray-500 tracking-[0.14em] uppercase mb-5">
                  Why It Matters
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                  {whyHeading}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {whyBody.map((para, i) => {
                  const CARD_META = [
                    { hint: 'The search bar is obsolete.',     title: 'Buyers Stopped Googling' },
                    { hint: 'These leads already chose.',      title: 'AI Sends Pre-Sold Buyers' },
                    { hint: "Most haven't caught on yet.",     title: 'You Can Still Get There First' },
                  ];
                  const { hint, title } = CARD_META[i];

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 36 }}
                      animate={whyInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.65, delay: 0.1 + i * 0.12 }}
                    >
                      <motion.div
                        whileHover={{ scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                        className="group relative overflow-hidden rounded-2xl cursor-default select-none"
                        style={{
                          backgroundColor: '#080D1C',
                          border: '1px solid rgba(255,255,255,0.06)',
                          minHeight: 300,
                        }}
                      >
                        {/* Ambient glow on hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(198,166,44,0.14) 0%, transparent 70%)' }}
                        />
                        {/* Gold top edge */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'linear-gradient(to right, transparent, #C6A62C 40%, #e8c84a 60%, transparent)' }}
                        />

                        {/* Front content */}
                        <div className="relative z-10 p-8">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 text-xs font-black"
                            style={{ backgroundColor: 'rgba(198,166,44,0.1)', border: '1px solid rgba(198,166,44,0.18)', color: '#C6A62C' }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <p
                            className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3"
                            style={{ color: 'rgba(255,255,255,0.22)' }}
                          >
                            {hint}
                          </p>
                          <h3 className="text-[20px] font-bold text-white leading-snug">
                            {title}
                          </h3>
                        </div>

                        {/* Gold reveal panel — slides up on hover */}
                        <div
                          className="absolute bottom-0 left-0 right-0 z-20 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-[300ms] ease-out"
                          style={{ backgroundColor: '#C6A62C' }}
                        >
                          <p className="text-black/80 font-medium leading-relaxed text-[14px]">
                            {para}
                          </p>
                          <div className="flex items-center gap-1.5 mt-4 text-black/50 text-xs font-bold uppercase tracking-widest">
                            <span>This is fixable</span>
                            <span>→</span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={whyInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-center text-[11px] text-gray-400 mt-6 tracking-wide"
              >
                Hover each card
              </motion.p>
            </div>
          </section>

          {/* ── What We Measure — white bg, dark cards ────────────────────── */}
          <section ref={measRef} className="py-28 bg-white px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={measInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65 }}
                className="text-center mb-14"
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-[11px] font-bold text-gray-500 tracking-[0.14em] uppercase mb-5">
                  What We Measure
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                  Your AI Visibility Score covers six categories.
                </h2>
                <p className="text-gray-500 text-[16px] max-w-xl mx-auto">
                  Each one is a lever. Fix the right ones and you show up where your competitors don&apos;t.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {SCORE_CATEGORIES.map((cat, i) => (
                  <motion.div
                    key={cat.key}
                    initial={{ opacity: 0, y: 36 }}
                    animate={measInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay: 0.08 + i * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="group relative overflow-hidden rounded-2xl p-6 h-full cursor-default"
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
                          {cat.num}
                        </div>
                        <p className="text-white font-bold text-sm mb-2">{cat.label}</p>
                        <p className="text-white/45 text-xs leading-relaxed">{cat.desc}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Second Scan CTA — dark ────────────────────────────────────── */}
          <section
            className="py-20 px-6"
            style={{ background: '#060A18', borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <FadeUp className="max-w-2xl mx-auto text-center mb-10">
              <p className="text-white font-extrabold text-2xl md:text-3xl mb-3">
                Get your free AI Visibility Report.
              </p>
              <p className="text-white/45 text-[15px] leading-relaxed">
                We audit your domain, score it across all six categories, and show you exactly who is beating you in AI search right now.
              </p>
            </FadeUp>
            <AEOScanWidget industry={industry} />
          </section>

          {/* ── FAQ — light ───────────────────────────────────────────────── */}
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
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Frequently Asked Questions
                </h2>
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

          {/* ── Final CTA — dark ─────────────────────────────────────────── */}
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
                Ready to see where you stand?
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-5 leading-tight">
                Book a free 30-minute strategy call.
              </h2>
              <p className="text-white/45 text-[15px] max-w-xl mx-auto mb-10 leading-relaxed">
                We walk through your AI Visibility Report together. You leave with a clear picture of exactly what to fix and in what order.
              </p>
              <motion.a
                href="https://api.leadconnectorhq.com/widget/booking/nxtapexai"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block px-9 py-4 rounded-xl font-bold text-black text-[15px]"
                style={{ backgroundColor: '#C6A62C', boxShadow: '0 6px 32px rgba(198,166,44,0.38)' }}
              >
                Book Your Strategy Call →
              </motion.a>
              <p className="mt-5 text-white/25 text-sm">
                No pitch. No obligation. Just your report and a real conversation.
              </p>
            </motion.div>
          </section>

          <Footer />
        </main>
      </ClientLayout>
    </>
  );
}
