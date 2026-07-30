'use client';

import { useState } from 'react';

export default function AEOScanWidget({ industry, scanLabel }) {
  const [form, setForm] = useState({ businessName: '', city: '', domain: '', email: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function update(field, val) {
    setForm(prev => ({ ...prev, [field]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { businessName, city, domain, email } = form;
    if (!businessName || !city || !domain || !email) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/ai-visibility-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, city, domain, email, industry }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error || 'Something went wrong. Try again.');
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        className="w-full max-w-2xl mx-auto rounded-2xl p-8 text-center"
        style={{ background: '#0D1629', border: '1px solid rgba(198,166,44,0.25)' }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(198,166,44,0.12)', border: '1px solid rgba(198,166,44,0.3)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#C6A62C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-white font-bold text-xl mb-2">Your audit is running.</p>
        <p className="text-white/50 text-[15px] leading-relaxed">
          Check <span className="text-white/75">{form.email}</span> for your AI Visibility Report.
          Your full report with scores and a competitive breakdown is on its way.
        </p>
        <p className="mt-6 text-white/25 text-xs">
          If you don&apos;t see it in 5 minutes, check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-2xl mx-auto rounded-2xl p-7"
      style={{ background: '#0D1629', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {scanLabel && (
        <p className="text-white/45 text-sm mb-6 text-center leading-relaxed">{scanLabel}</p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-white/35 uppercase tracking-widest mb-2">
              Business Name
            </label>
            <input
              type="text"
              value={form.businessName}
              onChange={e => update('businessName', e.target.value)}
              placeholder="Acme Realty Group"
              required
              disabled={status === 'loading'}
              className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 disabled:opacity-50"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                caretColor: '#C6A62C',
              }}
              onFocus={e => { e.target.style.borderColor = 'rgba(198,166,44,0.5)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white/35 uppercase tracking-widest mb-2">
              City
            </label>
            <input
              type="text"
              value={form.city}
              onChange={e => update('city', e.target.value)}
              placeholder="New Orleans, LA"
              required
              disabled={status === 'loading'}
              className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 disabled:opacity-50"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                caretColor: '#C6A62C',
              }}
              onFocus={e => { e.target.style.borderColor = 'rgba(198,166,44,0.5)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white/35 uppercase tracking-widest mb-2">
              Website Domain
            </label>
            <input
              type="text"
              value={form.domain}
              onChange={e => update('domain', e.target.value)}
              placeholder="acmerealty.com"
              required
              disabled={status === 'loading'}
              className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 disabled:opacity-50"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                caretColor: '#C6A62C',
              }}
              onFocus={e => { e.target.style.borderColor = 'rgba(198,166,44,0.5)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white/35 uppercase tracking-widest mb-2">
              Your Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => update('email', e.target.value)}
              placeholder="you@yourcompany.com"
              required
              disabled={status === 'loading'}
              className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 disabled:opacity-50"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                caretColor: '#C6A62C',
              }}
              onFocus={e => { e.target.style.borderColor = 'rgba(198,166,44,0.5)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
          </div>
        </div>

        {status === 'error' && (
          <p className="text-red-400 text-sm mb-4 text-center">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading' || !form.businessName || !form.city || !form.domain || !form.email}
          className="w-full py-4 rounded-xl font-bold text-black text-[15px] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ backgroundColor: '#C6A62C', boxShadow: '0 6px 28px rgba(198,166,44,0.3)' }}
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Running your audit...
            </>
          ) : (
            'Get My Free AI Visibility Report →'
          )}
        </button>

        <p className="text-center text-white/20 text-xs mt-4">
          No obligation. Your report arrives by email in minutes.
        </p>
      </form>
    </div>
  );
}
