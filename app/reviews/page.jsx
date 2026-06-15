'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const STAR_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Outstanding'];

function StarButton({ index, filled, hovered, onClick, onMouseEnter, onMouseLeave }) {
  const active = hovered !== null ? index <= hovered : filled;
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      className="p-1 transition-transform duration-100 hover:scale-110 focus:outline-none"
      aria-label={`${index} star${index !== 1 ? 's' : ''}`}
    >
      <svg width="36" height="36" viewBox="0 0 20 20" fill={active ? '#C6A62C' : 'none'} stroke={active ? '#C6A62C' : '#d1d5db'} strokeWidth="1.2">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );
}

export default function ReviewsPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', reviewText: '' });
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!rating) { setErrorMsg('Please select a star rating.'); return; }
    if (!form.name || !form.email || !form.reviewText) { setErrorMsg('Please fill out all required fields.'); return; }

    setErrorMsg('');
    setStatus('submitting');

    try {
      const res = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const approved = rating >= 4;

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="font-black text-gray-900 text-lg tracking-tight">NXT APEX</span>
            <span className="text-xs font-bold text-[#C6A62C] tracking-widest">AI</span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-20">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'linear-gradient(135deg, #C6A62C, #e8c84a)' }}
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Thank you.</h1>
                <p className="text-gray-500 text-lg mb-2">
                  {approved
                    ? 'Your review is live. We appreciate you taking the time.'
                    : 'Your feedback has been received. We take every review seriously.'}
                </p>
                <Link href="/" className="inline-block mt-8 text-sm font-semibold text-[#C6A62C] hover:underline">
                  Return to Nxt Apex →
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A62C]" style={{ boxShadow: '0 0 6px rgba(198,166,44,0.9)' }} />
                    <span className="text-[11px] font-bold text-gray-500 tracking-widest uppercase">Client Reviews</span>
                  </div>
                  <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-3">
                    How was your<br />
                    <span style={{ backgroundImage: 'linear-gradient(92deg, #C6A62C 0%, #e8c84a 42%, #a08020 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      experience with us?
                    </span>
                  </h1>
                  <p className="text-gray-500 text-base leading-relaxed">
                    Real feedback from real business owners. Tell us what working with Nxt Apex was actually like.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Star rating */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-sm font-semibold text-gray-700 mb-4">Your rating <span className="text-red-400">*</span></p>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map(i => (
                        <StarButton
                          key={i}
                          index={i}
                          filled={i <= rating}
                          hovered={hovered}
                          onClick={setRating}
                          onMouseEnter={setHovered}
                          onMouseLeave={() => setHovered(null)}
                        />
                      ))}
                      <AnimatePresence mode="wait">
                        {(hovered || rating) ? (
                          <motion.span
                            key={hovered ?? rating}
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="ml-3 text-sm font-semibold text-[#C6A62C]"
                          >
                            {STAR_LABELS[hovered ?? rating]}
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </div>
                    {rating > 0 && rating < 4 && (
                      <p className="text-xs text-gray-400 mt-2">Ratings under 4 stars are kept private and used for internal improvement.</p>
                    )}
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Sarah M."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C6A62C]/40 focus:border-[#C6A62C] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C6A62C]/40 focus:border-[#C6A62C] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Company / Title <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="CEO, 20-person agency"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C6A62C]/40 focus:border-[#C6A62C] transition-colors"
                    />
                  </div>

                  {/* Review text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Your review <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="reviewText"
                      value={form.reviewText}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell other business owners what it was like working with Nxt Apex — what changed, what you built, what you'd tell someone on the fence."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C6A62C]/40 focus:border-[#C6A62C] transition-colors resize-none leading-relaxed"
                    />
                    <p className="text-xs text-gray-400 mt-1.5">{form.reviewText.length} characters</p>
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {(errorMsg || status === 'error') && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3"
                      >
                        {errorMsg || 'Something went wrong. Please try again.'}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-xl font-bold text-base text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #C6A62C, #a08020)', boxShadow: '0 8px 24px rgba(198,166,44,0.35)' }}
                  >
                    {status === 'submitting' ? 'Submitting...' : 'Submit My Review →'}
                  </button>

                  <p className="text-xs text-center text-gray-400">
                    Your email is never shared publicly. Only your name and review are displayed.
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
