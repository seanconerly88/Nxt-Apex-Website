'use client';

import { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useBooking } from '@/contexts/BookingContext';

const EASE = [0.22, 1, 0.36, 1];

const QUESTIONS = [
  {
    id: 'missedCall',
    loop: 'Missed call loop',
    agent: 'AI Receptionist',
    question: 'What happens when someone calls and nobody picks up?',
    options: [
      'It goes to voicemail and we call back when we can',
      'Voicemail, and we do not always get to it',
      'We use an answering service',
      'We rarely miss calls',
    ],
  },
  {
    id: 'speedToLead',
    loop: 'Response loop',
    agent: 'Speed to Lead',
    highlight: true,
    question: 'How fast does a new lead hear from you?',
    options: ['Under 5 minutes', 'Within an hour', 'Same day', 'Next day or later', 'No consistent process'],
  },
  {
    id: 'deadLeads',
    loop: 'Dead lead loop',
    agent: 'Database Reactivation',
    highlight: true,
    question: 'When did you last contact everyone in your database who never bought?',
    options: ['Within the last month', 'Within the last six months', 'Over a year ago', 'Never'],
  },
  {
    id: 'websiteVisitors',
    loop: 'Browse and bounce loop',
    agent: 'Website Manager',
    question: 'Someone lands on your site at 9pm with a question. What happens?',
    options: [
      'A chat assistant answers and books them',
      'They fill out a form and wait',
      'They find a phone number and call tomorrow',
      'Nothing. They leave.',
    ],
  },
  {
    id: 'reviews',
    loop: 'Trust loop',
    agent: 'Reputation Manager',
    question: 'How do you collect client reviews?',
    options: [
      'Automated ask at the right moment',
      'We ask manually when we remember',
      'They happen on their own',
      'We do not have a process',
    ],
  },
];

const LOOPS = [
  { agent: 'Speed to Lead', loop: 'the response loop' },
  { agent: 'AI Receptionist', loop: 'the missed call loop' },
  { agent: 'Database Reactivation', loop: 'the dead lead loop' },
  { agent: 'Website Manager', loop: 'the browse and bounce loop' },
  { agent: 'Reputation Manager', loop: 'the trust loop' },
  { agent: 'Pipeline Manager', loop: 'the oversight loop' },
];

function wordCount(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export default function HomeHero() {
  const { openModal } = useBooking();
  const [step, setStep] = useState(0); // 0-4: questions, 5: contact, 6: loading, 7: result
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: '', email: '', phone: '', domain: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const reduceMotion = useReducedMotion();

  // Cursor-reactive tilt on the quiz card
  const cardRef = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.35 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), spring);
  // Sheen follows the cursor across the card face
  const sheenX = useSpring(useTransform(px, [-0.5, 0.5], ['20%', '80%']), spring);
  const sheenY = useSpring(useTransform(py, [-0.5, 0.5], ['15%', '85%']), spring);

  function handlePointerMove(e) {
    if (reduceMotion || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  const isQuestion = step >= 0 && step <= 4;
  const currentQ = isQuestion ? QUESTIONS[step] : null;
  const currentAnswer = currentQ ? (answers[currentQ.id] || '') : '';
  const currentOther = currentQ ? (answers[`${currentQ.id}Other`] || '') : '';
  const isOtherSelected = currentAnswer === 'Other';
  const otherWords = wordCount(currentOther);

  function canProceed() {
    if (isQuestion) {
      if (!currentAnswer) return false;
      if (isOtherSelected && (!currentOther.trim() || otherWords > 15)) return false;
      return true;
    }
    if (step === 5) return contact.name.trim() && contact.email.trim();
    return false;
  }

  function selectOption(opt) {
    setAnswers(a => ({ ...a, [currentQ.id]: opt }));
  }

  function setOtherText(val) {
    setAnswers(a => ({ ...a, [`${currentQ.id}Other`]: val }));
  }

  function next() {
    setDir(1);
    setStep(s => s + 1);
  }

  function back() {
    setDir(-1);
    setStep(s => s - 1);
  }

  async function submit() {
    setStep(6);
    setError('');
    try {
      const payload = {};
      QUESTIONS.forEach(q => {
        payload[q.id] = answers[q.id] === 'Other'
          ? (answers[`${q.id}Other`] || '')
          : (answers[q.id] || '');
      });

      const res = await fetch('/api/ai-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, ...contact }),
      });
      const data = await res.json();
      setResult(data);
      setStep(7);
    } catch {
      setError('Something went wrong. Try again.');
      setStep(5);
    }
  }

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 32 : -32 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -32 : 32 }),
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 pt-20 lg:pt-28 pb-14 lg:pb-8 z-10"
      style={{ backgroundColor: '#060A18' }}
    >
      {/* Drifting gold mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '46vw',
            height: '46vw',
            minWidth: '380px',
            minHeight: '380px',
            top: '-12%',
            right: '-6%',
            background: 'radial-gradient(circle, rgba(198,166,44,0.16) 0%, transparent 68%)',
            filter: 'blur(70px)',
          }}
          animate={reduceMotion ? {} : { x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '38vw',
            height: '38vw',
            minWidth: '320px',
            minHeight: '320px',
            bottom: '-14%',
            left: '-8%',
            background: 'radial-gradient(circle, rgba(198,166,44,0.10) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={reduceMotion ? {} : { x: [0, 46, 0], y: [0, -26, 0] }}
          transition={{ duration: 27, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-[11px] font-bold tracking-[0.14em] uppercase"
            style={{ backgroundColor: 'rgba(198,166,44,0.1)', border: '1px solid rgba(198,166,44,0.2)', color: '#C6A62C' }}
          >
            The Closed Loop System
          </div>

          <h1
            className="text-white font-extrabold leading-[1.08] mb-5"
            style={{ fontSize: 'clamp(30px, 4.6vw, 58px)', textWrap: 'balance' }}
          >
            The work your team hates doing?{' '}
            <span style={{ color: '#C6A62C' }}>It stops next week.</span>
          </h1>

          <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg font-light">
            Answer 5 questions. We find which loops are open in your pipeline and close the first one in four days.
          </p>

          <div className="hidden lg:block">
            <p className="text-white/25 text-[11px] font-bold uppercase tracking-widest mb-3.5">
              Six ways revenue leaves. Six ways we close it.
            </p>
            <div className="space-y-2">
              {LOOPS.map((item, i) => (
                <motion.div
                  key={item.agent}
                  className="flex items-baseline gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07, ease: EASE }}
                >
                  <span
                    className="flex-shrink-0 w-1.5 h-1.5 rounded-full translate-y-[-2px]"
                    style={{ backgroundColor: 'rgba(198,166,44,0.55)' }}
                  />
                  <span className="text-[13px] font-medium text-white/70">{item.agent}</span>
                  <span className="text-[12px] text-white/25">closes {item.loop}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — quiz card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="relative lg:translate-y-10"
          style={{ perspective: 1200 }}
        >
          {/* Layered glow bleed */}
          <div
            className="absolute -inset-6 rounded-[32px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(198,166,44,0.13) 0%, transparent 70%)', filter: 'blur(28px)' }}
          />

          <motion.div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative rounded-2xl"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(255,255,255,0.035)',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(198,166,44,0.06)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Cursor-tracked sheen */}
              {!reduceMotion && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: 'radial-gradient(420px circle at var(--sx) var(--sy), rgba(198,166,44,0.10), transparent 60%)',
                    '--sx': sheenX,
                    '--sy': sheenY,
                  }}
                />
              )}
              {/* Progress bar — questions only */}
              {isQuestion && (
                <div className="px-5 sm:px-8 pt-5 pb-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    {QUESTIONS.map((_, i) => (
                      <div
                        key={i}
                        className="h-1 rounded-full flex-1 transition-all duration-300"
                        style={{ backgroundColor: i <= step ? '#C6A62C' : 'rgba(255,255,255,0.1)' }}
                      />
                    ))}
                  </div>
                  <p className="text-white/25 text-[11px] font-bold tracking-widest uppercase">
                    Question {step + 1} of 5
                  </p>
                </div>
              )}

              <div className="px-5 sm:px-8 py-5 sm:py-6" style={{ minHeight: '420px' }}>
                <AnimatePresence mode="wait" custom={dir}>

                  {/* Questions */}
                  {isQuestion && (
                    <motion.div
                      key={`q-${step}`}
                      custom={dir}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.22, ease: EASE }}
                      className="flex flex-col h-full"
                    >
                      {/* Loop label */}
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span
                          className="text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase"
                          style={{
                            backgroundColor: currentQ.highlight ? 'rgba(198,166,44,0.15)' : 'rgba(255,255,255,0.06)',
                            color: currentQ.highlight ? '#C6A62C' : 'rgba(255,255,255,0.35)',
                          }}
                        >
                          {currentQ.loop}
                        </span>
                        <span className="text-white/25 text-[12px]">closed by {currentQ.agent}</span>
                      </div>

                      {/* Question */}
                      <p className="text-white font-bold text-[17px] sm:text-[19px] leading-snug mb-5">
                        {currentQ.question}
                      </p>

                      {/* Options */}
                      <div className="flex flex-col gap-2 flex-1">
                        {[...currentQ.options, 'Other'].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => selectOption(opt)}
                            className="w-full text-left px-4 py-3 rounded-xl text-[13px] sm:text-[14px] font-medium transition-all duration-150 border"
                            style={{
                              backgroundColor: currentAnswer === opt ? 'rgba(198,166,44,0.1)' : 'rgba(255,255,255,0.03)',
                              borderColor: currentAnswer === opt ? 'rgba(198,166,44,0.5)' : 'rgba(255,255,255,0.08)',
                              color: currentAnswer === opt ? '#e8c84a' : 'rgba(255,255,255,0.5)',
                            }}
                          >
                            {opt}
                          </button>
                        ))}

                        {/* Other text field */}
                        <AnimatePresence>
                          {isOtherSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="relative mt-1">
                                <textarea
                                  autoFocus
                                  rows={2}
                                  maxLength={120}
                                  placeholder="Describe in your own words..."
                                  value={currentOther}
                                  onChange={e => setOtherText(e.target.value)}
                                  className="w-full px-4 py-3 rounded-xl text-white text-[13px] outline-none resize-none transition-all duration-200"
                                  style={{
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    border: otherWords > 15 ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(198,166,44,0.4)',
                                  }}
                                />
                                <span
                                  className="absolute bottom-2.5 right-3 text-[11px] font-bold"
                                  style={{ color: otherWords > 15 ? '#ef4444' : 'rgba(255,255,255,0.25)' }}
                                >
                                  {otherWords}/15
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Nav buttons */}
                      <div className="flex gap-3 mt-5">
                        {step > 0 && (
                          <button
                            onClick={back}
                            className="px-5 py-3 rounded-xl text-[13px] font-bold transition-all duration-150 border"
                            style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}
                          >
                            Back
                          </button>
                        )}
                        <button
                          onClick={next}
                          disabled={!canProceed()}
                          className="flex-1 py-3 rounded-xl text-[14px] font-bold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                          style={{
                            backgroundColor: canProceed() ? '#C6A62C' : 'rgba(255,255,255,0.1)',
                            color: canProceed() ? '#fff' : 'rgba(255,255,255,0.3)',
                          }}
                        >
                          {step === 4 ? 'See my open loops →' : 'Next →'}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Contact */}
                  {step === 5 && (
                    <motion.div
                      key="contact"
                      custom={dir}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.22, ease: EASE }}
                      className="flex flex-col"
                    >
                      <p className="text-white font-bold text-[17px] sm:text-[19px] mb-1">Almost there.</p>
                      <p className="text-white/35 text-[13px] mb-5">Where should we send your results?</p>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-1.5">Name <span style={{ color: '#C6A62C' }}>*</span></label>
                            <input
                              type="text"
                              placeholder="Sean"
                              value={contact.name}
                              onChange={e => setContact(c => ({ ...c, name: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl text-white text-[14px] outline-none"
                              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                              onFocus={e => e.target.style.borderColor = 'rgba(198,166,44,0.5)'}
                              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-1.5">Email <span style={{ color: '#C6A62C' }}>*</span></label>
                            <input
                              type="email"
                              placeholder="you@company.com"
                              value={contact.email}
                              onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl text-white text-[14px] outline-none"
                              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                              onFocus={e => e.target.style.borderColor = 'rgba(198,166,44,0.5)'}
                              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-1.5">Phone <span className="text-white/20 normal-case font-normal">(opt)</span></label>
                            <input
                              type="tel"
                              placeholder="(555) 000-0000"
                              value={contact.phone}
                              onChange={e => setContact(c => ({ ...c, phone: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl text-white text-[14px] outline-none"
                              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                              onFocus={e => e.target.style.borderColor = 'rgba(198,166,44,0.5)'}
                              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-1.5">Website <span className="text-white/20 normal-case font-normal">(opt)</span></label>
                            <input
                              type="text"
                              placeholder="yoursite.com"
                              value={contact.domain}
                              onChange={e => setContact(c => ({ ...c, domain: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl text-white text-[14px] outline-none"
                              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                              onFocus={e => e.target.style.borderColor = 'rgba(198,166,44,0.5)'}
                              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                          </div>
                        </div>
                      </div>

                      {error && <p className="text-red-400 text-[13px] mt-3">{error}</p>}

                      <div className="flex gap-3 mt-5">
                        <button
                          onClick={back}
                          className="px-5 py-3 rounded-xl text-[13px] font-bold border transition-all"
                          style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}
                        >
                          Back
                        </button>
                        <button
                          onClick={submit}
                          disabled={!canProceed()}
                          className="flex-1 py-3 rounded-xl text-[14px] font-bold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                          style={{
                            backgroundColor: canProceed() ? '#C6A62C' : 'rgba(255,255,255,0.1)',
                            color: '#fff',
                            boxShadow: canProceed() ? '0 4px 20px rgba(198,166,44,0.3)' : 'none',
                          }}
                        >
                          Show me my open loops →
                        </button>
                      </div>
                      <p className="text-center text-white/20 text-[11px] mt-3">Free. No sales call.</p>
                    </motion.div>
                  )}

                  {/* Loading */}
                  {step === 6 && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16"
                    >
                      <motion.div
                        className="w-10 h-10 rounded-full border-2 mb-5"
                        style={{ borderColor: 'rgba(198,166,44,0.2)', borderTopColor: '#C6A62C' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                      />
                      <p className="text-white/50 text-[14px]">Finding your open loop...</p>
                    </motion.div>
                  )}

                  {/* Result */}
                  {step === 7 && result && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <p className="text-[11px] font-bold text-white/25 uppercase tracking-widest mb-3">Your widest open loop</p>
                      <div
                        className="rounded-xl px-5 py-4 mb-5"
                        style={{ backgroundColor: 'rgba(198,166,44,0.08)', border: '1px solid rgba(198,166,44,0.2)' }}
                      >
                        <p className="font-extrabold text-xl sm:text-2xl leading-tight" style={{ color: '#e8c84a' }}>
                          {result.leak}
                        </p>
                        {result.agent && (
                          <p className="text-white/40 text-[12px] mt-1.5">
                            Closed by {result.agent}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3 mb-6">
                        <p className="text-white/70 text-[14px] leading-relaxed">
                          {result.agentSentence}
                        </p>
                        <p className="text-white/50 text-[13px] leading-relaxed">
                          {result.twoWeekSentence}
                        </p>
                      </div>

                      <button
                        onClick={openModal}
                        className="w-full py-3.5 rounded-xl text-white font-bold text-[15px] transition-all duration-200 hover:-translate-y-0.5 mb-3"
                        style={{ backgroundColor: '#C6A62C', boxShadow: '0 4px 20px rgba(198,166,44,0.3)' }}
                      >
                        Book the Assessment call →
                      </button>
                      <button
                        onClick={() => { setStep(0); setDir(1); setAnswers({}); setContact({ name: '', email: '', phone: '', domain: '' }); setResult(null); }}
                        className="w-full py-2 text-white/25 text-[12px] hover:text-white/45 transition-colors"
                      >
                        Start over
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
