'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useBooking } from '@/contexts/BookingContext';
import { LOOPS, LOOP_ORDER } from '@/lib/loopConfig';
import LeakForm from '@/components/LeakForm';
import TestimonialsSection from '@/components/TestimonialsSection';

const EASE = [0.22, 1, 0.36, 1];

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function scrollToForm(e) {
  e.preventDefault();
  document.getElementById('leak-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function MinimalHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <img src="/logo-trans-light.png" alt="Nxt Apex AI" className="h-7 w-auto" />
          <span className="text-white font-extrabold tracking-tight text-[15px]">Nxt Apex AI</span>
        </a>
        <a
          href="tel:+15042904780"
          className="text-[13px] font-semibold hidden sm:block"
          style={{ color: '#C6A62C' }}
        >
          (504) 290-4780
        </a>
      </div>
    </header>
  );
}

function MinimalFooter() {
  return (
    <footer className="py-10 px-6" style={{ background: '#060A18', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-white/25 text-[12px]">&copy; 2026 Nxt Apex AI. New Orleans, LA.</p>
        <div className="flex items-center gap-5 text-[12px] text-white/30">
          <a href="mailto:sean@nxtapexai.com" className="hover:text-white/60 transition-colors">sean@nxtapexai.com</a>
          <a href="/privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default function StopTheLeaksPage() {
  const { openModal } = useBooking();
  const loopCards = LOOP_ORDER.map(key => LOOPS[key]);

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6" style={{ background: '#060A18' }}>
        <MinimalHeader />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center top, rgba(198,166,44,0.1) 0%, transparent 65%)' }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A62C]" style={{ boxShadow: '0 0 7px rgba(198,166,44,0.9)' }} />
            <span className="text-[11px] font-bold text-white/40 tracking-[0.15em] uppercase">
              Not a Lead Problem
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="font-extrabold text-white leading-[1.08] tracking-tight mb-6"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            You Don&apos;t Need More Leads.
            <br />
            You Need to Stop Losing Them.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          >
            Six AI agents close the six places your leads, calls, and quotes go quiet — while your ad spend keeps climbing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
          >
            <a
              href="#leak-form"
              onClick={scrollToForm}
              className="inline-block px-8 py-4 rounded-xl font-bold text-black text-[15px]"
              style={{ backgroundColor: '#C6A62C', boxShadow: '0 6px 28px rgba(198,166,44,0.38)' }}
            >
              Find My Leak →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Problem — the six loops ─────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0A0F1F' }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <h2 className="text-white font-extrabold mb-4" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)' }}>
              Six ways revenue leaves. Pick the ones costing you right now.
            </h2>
            <p className="text-white/40 text-base max-w-xl mx-auto">
              Every one of these is a role you would otherwise have to hire for.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {loopCards.map((loop, i) => (
              <motion.div
                key={loop.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
                className="rounded-2xl p-7"
                style={{ backgroundColor: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2.5" style={{ color: '#C6A62C' }}>
                  {loop.closes}
                </p>
                <h3 className="text-white font-bold text-xl mb-3">{loop.name}</h3>
                <p className="text-white/40 text-[14px] leading-relaxed">{loop.cardBody}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reframe strip ───────────────────────────────────────────── */}
      <section className="py-16 px-6 text-center" style={{ background: '#0D1220', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <FadeUp className="max-w-2xl mx-auto">
          <p className="text-white font-bold leading-snug" style={{ fontSize: 'clamp(20px, 2.6vw, 28px)' }}>
            It&apos;s not a lead generation problem. It&apos;s a follow-up problem —
            <span style={{ color: '#C6A62C' }}> and follow-up is the cheapest fix you&apos;re not making.</span>
          </p>
        </FadeUp>
      </section>

      {/* ── Why follow-up breaks down — disconnected systems ────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0A0F1F' }}>
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-14">
            <h2 className="text-white font-extrabold leading-tight" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)' }}>
              Your Tools Don&apos;t Talk. Leads Fall Through.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              'Your ad platform doesn’t know they already called your office.',
              'Your CRM doesn’t know they dropped off your website chat five minutes ago.',
              'Your calendar doesn’t know your team already quoted this lead last month.',
            ].map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                className="rounded-2xl p-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-white/70 text-[15px] leading-relaxed">{line}</p>
              </motion.div>
            ))}
          </div>

          <FadeUp delay={0.15} className="text-center">
            <p className="text-white/40 text-base max-w-xl mx-auto">
              Every one of those is a real lead, sitting in the gap between two tools that were never connected.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Qualifier form ───────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: '#060A18' }}>
        <FadeUp className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-white font-extrabold text-2xl md:text-3xl mb-3">
            Find out exactly where you&apos;re leaking.
          </p>
          <p className="text-white/45 text-[15px] leading-relaxed">
            Answer three quick questions and we&apos;ll tell you which loop is costing you the most before you ever book a call.
          </p>
        </FadeUp>
        <LeakForm />
      </section>

      {/* ── Objection handler ────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#FAFAF8]">
        <FadeUp className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[11px] font-bold text-gray-500 tracking-[0.14em] uppercase mb-6">
            Let&apos;s Be Clear
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
            This Isn&apos;t Another Marketing Pitch.
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
            Marketing agencies sell you more traffic. We don&apos;t touch your ad spend — we fix what happens after someone
            already raised their hand. If leads are dying in your CRM, going to voicemail, or waiting nine minutes for a
            text back, that&apos;s not a leads problem. That&apos;s ops, and ops is what we run.
          </p>
        </FadeUp>
      </section>

      <TestimonialsSection />

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center" style={{ background: '#060A18', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <FadeUp className="max-w-2xl mx-auto">
          <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-5 leading-tight">
            Stop Buying Leads You&apos;re Already Losing.
          </h2>
          <p className="text-white/45 text-[15px] mb-10 leading-relaxed">
            Find your leak in two minutes. No pitch, no cost, no catch.
          </p>
          <a
            href="#leak-form"
            onClick={scrollToForm}
            className="inline-block px-9 py-4 rounded-xl font-bold text-black text-[15px]"
            style={{ backgroundColor: '#C6A62C', boxShadow: '0 6px 32px rgba(198,166,44,0.38)' }}
          >
            Find My Leak →
          </a>
        </FadeUp>
      </section>

      <MinimalFooter />
    </main>
  );
}
