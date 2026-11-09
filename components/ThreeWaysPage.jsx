'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientLayout from '@/components/ClientLayout';
import { WAYS, NEEDS, ALL_STEP_IDS, INTRO_CALL_URL } from '@/lib/threeWays';

const EASE = [0.22, 1, 0.36, 1];
const GOLD = '#C6A62C';
const NAVY = '#060A18';
const STORAGE_KEY = 'nxt-3-ways-progress-v2';

function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Progress can also travel in the URL (#p=id.id.id) so a visitor can bookmark it
// or open it on another device. No signup, nothing stored on our side.
function progressFromHash() {
  try {
    const m = window.location.hash.match(/p=([\w.-]+)/);
    if (!m) return {};
    const valid = new Set(ALL_STEP_IDS);
    return Object.fromEntries(m[1].split('.').filter(id => valid.has(id)).map(id => [id, true]));
  } catch {
    return {};
  }
}

function progressLink(done) {
  const ids = ALL_STEP_IDS.filter(id => done[id]).join('.');
  return `${window.location.origin}${window.location.pathname}${ids ? `#p=${ids}` : ''}`;
}

function saveProgress(done) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
  } catch {
    /* storage blocked: progress just won't persist */
  }
}

function CopyBlock({ label, body }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: text is still selectable */
    }
  };
  return (
    <div className="mt-3 rounded-xl border border-gray-200 bg-[#FAFAF8] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-gray-500">{label}</span>
        <button
          type="button"
          onClick={copy}
          className="text-[12px] font-bold px-3 py-1.5 rounded-lg transition-colors duration-200"
          style={{ backgroundColor: copied ? '#16a34a' : NAVY, color: '#fff', minHeight: 32 }}
          aria-label={`Copy ${label}`}
        >
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <pre className="px-4 py-3 text-[13px] leading-relaxed text-gray-700 whitespace-pre-wrap font-mono">{body}</pre>
    </div>
  );
}

function Step({ step, index, checked, onToggle }) {
  const inputId = `step-${step.id}`;
  return (
    <li className="py-5 border-b border-gray-100 last:border-b-0">
      <div className="flex items-start gap-4">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(step.id)}
          className="mt-1 h-5 w-5 flex-shrink-0 cursor-pointer rounded border-gray-300"
          style={{ accentColor: GOLD }}
        />
        <div className="flex-1 min-w-0">
          <label
            htmlFor={inputId}
            className={`block cursor-pointer text-[16px] leading-relaxed transition-colors duration-200 ${
              checked ? 'text-gray-400 line-through' : 'text-gray-800'
            }`}
          >
            <span className="font-bold mr-1.5" style={{ color: checked ? '#9ca3af' : GOLD }}>
              {index + 1}.
            </span>
            {step.text}
          </label>
          {step.copy && <CopyBlock label={step.copy.label} body={step.copy.body} />}
        </div>
      </div>
    </li>
  );
}

function ProgressBar({ done, total, dark = false }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: dark ? 'rgba(255,255,255,0.1)' : '#e5e7eb' }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress"
      >
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: GOLD }} />
      </div>
      <span className={`text-[13px] font-bold tabular-nums ${dark ? 'text-white/60' : 'text-gray-500'}`}>
        {done}/{total}
      </span>
    </div>
  );
}

function IntroCallModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="intro-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-8"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          role="dialog"
          aria-modal="true"
          aria-label="Book a 10-minute intro call"
        >
          <motion.div
            key="intro-modal"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
              <div>
                <p className="font-bold text-gray-900">10-minute intro call</p>
                <p className="text-[13px] text-gray-500">Bring the problem that's in your way.</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="w-11 h-11 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <iframe
              src={INTRO_CALL_URL}
              title="Book a 10-minute intro call with Sean"
              style={{ width: '100%', height: '820px', border: 'none', display: 'block' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ThreeWaysPage({ schema }) {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState({});
  const [callOpen, setCallOpen] = useState(false);
  const openCall = () => setCallOpen(true);
  const closeCall = useCallback(() => setCallOpen(false), []);

  useEffect(() => {
    const merged = { ...loadProgress(), ...progressFromHash() };
    setDone(merged);
    saveProgress(merged);
  }, []);

  const [copiedKey, setCopiedKey] = useState(null);
  const copyProgressLink = async (key) => {
    const url = progressLink(done);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt('Copy your progress link:', url);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(k => (k === key ? null : k)), 2500);
  };

  const toggle = (id) => {
    setDone(prev => {
      const next = { ...prev, [id]: !prev[id] };
      saveProgress(next);
      return next;
    });
  };

  const reset = () => {
    setDone({});
    saveProgress({});
  };

  const totalDone = ALL_STEP_IDS.filter(id => done[id]).length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ClientLayout>
        <main>
          <Navbar />

          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="relative overflow-hidden pt-28 pb-16 px-6" style={{ background: NAVY }}>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="relative max-w-3xl mx-auto text-center pt-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
                <span className="text-[11px] font-bold text-white/50 tracking-[0.15em] uppercase">
                  Free checklist · No signup
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
                className="font-extrabold text-white leading-[1.06] tracking-tight mb-6"
                style={{ fontSize: 'clamp(32px, 4vw, 54px)', textWrap: 'balance' }}
              >
                3 Ways Claude Makes Your Service Business More Money
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto"
                style={{ fontSize: 'clamp(16px, 1.2vw, 19px)' }}
              >
                Not 31. Three. Connect Claude to your GoHighLevel once, then tell it what to build. Work down each checklist and have all three running by the end of the week.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left"
              >
                {WAYS.map(w => (
                  <a
                    key={w.key}
                    href={`#${w.key}`}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 hover:border-white/25 transition-colors duration-200"
                  >
                    <span className="block text-[11px] font-bold tracking-[0.12em]" style={{ color: GOLD }}>
                      {w.num}
                    </span>
                    <span className="block text-white text-[14px] font-semibold leading-snug mt-1">{w.title}</span>
                  </a>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── What you need + overall progress ─────────────────────────── */}
          <section className="py-14 px-6 bg-white border-b border-gray-100">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-[11px] font-bold tracking-[0.14em] uppercase text-gray-500 mb-5">What you need</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {NEEDS.map(n => (
                  <li key={n.label} className="rounded-xl border border-gray-200 p-4">
                    <span className="block font-bold text-gray-900">{n.label}</span>
                    <span className="block text-[14px] text-gray-500 mt-1 leading-snug">{n.detail}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-bold text-gray-700">Your progress (saved on this device)</span>
                {totalDone > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    className="text-[13px] font-medium text-gray-500 hover:text-gray-800 underline underline-offset-2"
                  >
                    Start over
                  </button>
                )}
              </div>
              <ProgressBar done={totalDone} total={ALL_STEP_IDS.length} />
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => copyProgressLink('top')}
                  className="text-[13px] font-bold px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 hover:border-gray-500 transition-colors duration-200"
                >
                  {copiedKey === 'top' ? 'Link copied ✓' : 'Save my progress link'}
                </button>
                <span className="text-[13px] text-gray-500">
                  Bookmark it or text it to yourself to pick up on any device.
                </span>
              </div>
            </div>
          </section>

          {/* ── The three checklists ─────────────────────────────────────── */}
          {WAYS.map((way, wi) => {
            const wayDone = way.steps.filter(s => done[s.id]).length;
            const complete = wayDone === way.steps.length;
            return (
              <section
                key={way.key}
                id={way.key}
                className="py-20 px-6 scroll-mt-20"
                style={{ backgroundColor: wi % 2 === 0 ? '#FAFAF8' : '#ffffff' }}
              >
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-[13px] font-black"
                      style={{ backgroundColor: NAVY, color: GOLD }}
                    >
                      {way.num}
                    </span>
                    <span className="text-[12px] font-bold tracking-[0.12em] uppercase text-gray-500">{way.time}</span>
                    {complete && (
                      <span className="ml-auto text-[12px] font-bold px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                        Done ✓
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">{way.title}</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="rounded-xl bg-white border border-gray-200 p-5">
                      <span className="block text-[11px] font-bold tracking-[0.12em] uppercase text-red-700 mb-2">{way.problemLabel || 'The leak'}</span>
                      <p className="text-gray-700 text-[15px] leading-relaxed">{way.problem}</p>
                    </div>
                    <div className="rounded-xl bg-white border border-gray-200 p-5">
                      <span className="block text-[11px] font-bold tracking-[0.12em] uppercase text-green-700 mb-2">When you're done</span>
                      <p className="text-gray-700 text-[15px] leading-relaxed">{way.result}</p>
                    </div>
                  </div>

                  <div className="mb-2">
                    <ProgressBar done={wayDone} total={way.steps.length} />
                  </div>
                  <ol className="rounded-2xl bg-white border border-gray-200 px-5 md:px-7">
                    {way.steps.map((step, i) => (
                      <Step key={step.id} step={step} index={i} checked={!!done[step.id]} onToggle={toggle} />
                    ))}
                  </ol>

                  <p className="mt-5 text-[14px] text-gray-500">
                    Stuck on a step?{' '}
                    <button
                      type="button"
                      onClick={openCall}
                      className="font-bold underline underline-offset-2"
                      style={{ color: NAVY }}
                    >
                      Grab 10 minutes with me
                    </button>
                    .
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => copyProgressLink(way.key)}
                      className="text-[13px] font-bold px-4 py-2.5 rounded-lg transition-colors duration-200"
                      style={{ backgroundColor: copiedKey === way.key ? '#16a34a' : NAVY, color: '#fff', minHeight: 44 }}
                    >
                      {copiedKey === way.key ? 'Link copied ✓' : 'Save my progress link'}
                    </button>
                    <span className="text-[13px] text-gray-500">
                      {copiedKey === way.key
                        ? 'Now paste it in a text to yourself. It reopens this page with your boxes checked.'
                        : 'Not done yet? Copy your link and text it to yourself to pick up later, on any device.'}
                    </span>
                  </div>
                </div>
              </section>
            );
          })}

          {/* ── 10-minute call ───────────────────────────────────────────── */}
          <section id="call" className="py-24 px-6 scroll-mt-20" style={{ background: NAVY }}>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm mb-4 uppercase tracking-widest font-semibold" style={{ color: GOLD }}>
                  10 minutes. That's it.
                </p>
                <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                  Something in the way? Let's look at it together.
                </h2>
                <p className="text-white/60 text-[16px] max-w-xl mx-auto leading-relaxed">
                  Come with the problem that's stopping you. Not a 60-minute sales call. Ten minutes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
                  <span className="block font-bold text-white mb-2">If it's a quick fix</span>
                  <p className="text-white/60 text-[15px] leading-relaxed">
                    I'll tell you how to fix it on the call. It's yours, free. Walk away with it.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
                  <span className="block font-bold text-white mb-2">If it's bigger</span>
                  <p className="text-white/60 text-[15px] leading-relaxed">
                    We'll both know whether a longer conversation is worth it. Nobody's time gets wasted.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <motion.button
                  type="button"
                  onClick={openCall}
                  whileHover={reduceMotion ? {} : { scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block px-9 py-4 rounded-xl font-bold text-black text-[16px]"
                  style={{ backgroundColor: GOLD, boxShadow: '0 6px 32px rgba(198,166,44,0.38)' }}
                >
                  Pick a 10-Minute Time →
                </motion.button>
                <p className="mt-5 text-white/40 text-sm">
                  No pitch. Bring the problem, and we'll figure out the fastest way through it.
                </p>
              </div>
            </div>
          </section>

          <Footer />
        </main>
        <IntroCallModal open={callOpen} onClose={closeCall} />
      </ClientLayout>
    </>
  );
}
