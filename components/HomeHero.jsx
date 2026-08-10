'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '@/contexts/BookingContext';

const EASE = [0.22, 1, 0.36, 1];

const QUESTIONS = [
  {
    id: 'leadSource',
    stage: 'Stage 1',
    stageName: 'Lead Generation',
    question: 'Where does most of your new business come from?',
    options: ['Referrals / Word of mouth', 'Social media / Content', 'Paid ads', 'Cold outreach / DMs', 'Mix / Not sure'],
  },
  {
    id: 'speedToLead',
    stage: 'Stage 4',
    stageName: 'Speed to Lead',
    highlight: true,
    question: 'How fast does a new lead hear from you?',
    options: ['Under 5 minutes', 'Within an hour', 'Same day', 'Next day or later', 'No consistent process'],
  },
  {
    id: 'noShowRecovery',
    stage: 'Stages 5+6',
    stageName: 'No-Show Recovery',
    question: 'What happens when a prospect misses a sales call?',
    options: ['Automated follow-up fires immediately', 'We reach out manually within 24 hrs', 'We try once and move on', 'Nothing consistent'],
  },
  {
    id: 'handoff',
    stage: 'Stage 7',
    stageName: 'Sales-to-Fulfillment Handoff',
    highlight: true,
    question: 'When a new client signs, how does your team find out?',
    options: ['Automated notification with all their info', 'I tell them directly', 'They check the CRM', "It's a bit chaotic"],
  },
  {
    id: 'reviews',
    stage: 'Stage 9',
    stageName: 'Review Flywheel',
    question: 'How do you collect client reviews?',
    options: ['Automated ask at the right moment', 'We ask manually when we remember', 'They happen on their own', "We don't have a process"],
  },
];

function wordCount(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export default function HomeHero() {
  const { openModal } = useBooking();
  const [step, setStep] = useState(0); // 0-4: questions, 5: contact, 6: loading, 7: result
  const [dir, setDir] = useState(1); // 1=forward, -1=back
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: '', email: '', phone: '', domain: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

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
        payload[`${q.id}Label`] = q.stageName;
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
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 pt-20 lg:pt-28 pb-14 lg:pb-20"
      style={{ backgroundColor: '#060A18' }}
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

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
            AI Readiness Assessment
          </div>

          <h1
            className="text-white font-extrabold leading-[1.1] mb-5"
            style={{ fontSize: 'clamp(28px, 4.5vw, 58px)' }}
          >
            Your business is leaking revenue in at least{' '}
            <span style={{ color: '#C6A62C' }}>3 places</span>{' '}
            right now.
          </h1>

          <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg font-light">
            We audit all 9 stages of your client journey and hand you a scored fix list in 4 days.
          </p>

          <div className="hidden lg:block space-y-2">
            <p className="text-white/25 text-[11px] font-bold uppercase tracking-widest mb-3">The 9-stage client journey we grade</p>
            {[
              'Lead Generation', 'Content Engine', 'Lead-to-Call Conversion',
              'Speed to Lead ★', 'Show Rate', 'No-Show Recovery',
              'Sales-to-Fulfillment Handoff ★', 'Post-Fulfillment Feedback Loop ★', 'Public Review Flywheel',
            ].map((stage, i) => (
              <div key={stage} className="flex items-center gap-3">
                <span
                  className="text-[10px] font-bold w-5 text-right flex-shrink-0"
                  style={{ color: stage.includes('★') ? '#C6A62C' : 'rgba(255,255,255,0.2)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-[13px] font-medium"
                  style={{ color: stage.includes('★') ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.35)' }}
                >
                  {stage.replace(' ★', '')}
                  {stage.includes('★') && (
                    <span
                      className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: 'rgba(198,166,44,0.15)', color: '#C6A62C' }}
                    >
                      HIGH WEIGHT
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — quiz card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            }}
          >
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
                    {/* Stage label */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase"
                        style={{
                          backgroundColor: currentQ.highlight ? 'rgba(198,166,44,0.15)' : 'rgba(255,255,255,0.06)',
                          color: currentQ.highlight ? '#C6A62C' : 'rgba(255,255,255,0.35)',
                        }}
                      >
                        {currentQ.stage}
                      </span>
                      <span className="text-white/30 text-[12px]">{currentQ.stageName}</span>
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
                        {step === 4 ? 'See my results →' : 'Next →'}
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
                        Show me where I&apos;m leaking →
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
                    <p className="text-white/50 text-[14px]">Finding your biggest leak...</p>
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
                    <p className="text-[11px] font-bold text-white/25 uppercase tracking-widest mb-3">Your biggest leak</p>
                    <div
                      className="rounded-xl px-5 py-4 mb-5"
                      style={{ backgroundColor: 'rgba(198,166,44,0.08)', border: '1px solid rgba(198,166,44,0.2)' }}
                    >
                      <p className="font-extrabold text-xl sm:text-2xl" style={{ color: '#e8c84a' }}>
                        {result.leak}
                      </p>
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
      </div>
    </section>
  );
}
