'use client';

import { useState } from 'react';
import { useBooking } from '@/contexts/BookingContext';

const REVENUE_OPTIONS = ['Under $10K/mo', '$10K–$50K/mo', '$50K–$100K/mo', '$100K+/mo'];
const LEAD_VOLUME_OPTIONS = ['Under 25/mo', '25–100/mo', '100–500/mo', '500+/mo'];
const FOLLOWUP_OPTIONS = [
  'We call or text once, then move on',
  'We have a sequence, but it’s inconsistent',
  'It just sits in the CRM',
  'We don’t really track it',
];

function Pills({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className="text-[13px] px-3.5 py-2 rounded-full border font-medium transition-all duration-150 text-left"
          style={{
            backgroundColor: value === opt ? '#C6A62C' : 'rgba(255,255,255,0.03)',
            borderColor: value === opt ? '#C6A62C' : 'rgba(255,255,255,0.12)',
            color: value === opt ? '#000' : 'rgba(255,255,255,0.65)',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-white/35 uppercase tracking-widest mb-2.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  caretColor: '#C6A62C',
};

export default function LeakForm() {
  const { openModal } = useBooking();
  const [form, setForm] = useState({
    businessName: '', email: '', phone: '',
    revenueRange: '', leadVolume: '', followUp: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function update(field, val) {
    setForm(prev => ({ ...prev, [field]: val }));
  }

  const isComplete = Object.values(form).every(Boolean);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isComplete) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/leak-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
        className="w-full max-w-2xl mx-auto rounded-2xl p-8 md:p-10 text-center"
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
        <p className="text-white font-bold text-xl mb-2">We&apos;ve got your answers.</p>
        <p className="text-white/50 text-[15px] leading-relaxed mb-7 max-w-md mx-auto">
          Grab a time on the calendar and we&apos;ll walk through exactly where {form.businessName} is leaking revenue — live, on the call.
        </p>
        <button
          onClick={openModal}
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-black text-[15px] transition-all duration-200 hover:-translate-y-0.5"
          style={{ backgroundColor: '#C6A62C', boxShadow: '0 8px 32px rgba(198,166,44,0.32)' }}
        >
          Book Your Free Strategy Call →
        </button>
      </div>
    );
  }

  return (
    <div
      id="leak-form"
      className="w-full max-w-2xl mx-auto rounded-2xl p-7 md:p-9"
      style={{ background: '#0D1629', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <p className="text-white/45 text-sm mb-7 text-center leading-relaxed">
        Three questions. Two minutes. We&apos;ll tell you exactly where you&apos;re leaking before we ever get on a call.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <Field label="What happens to a lead once they go quiet?">
          <Pills options={FOLLOWUP_OPTIONS} value={form.followUp} onChange={v => update('followUp', v)} />
        </Field>

        <Field label="Monthly revenue">
          <Pills options={REVENUE_OPTIONS} value={form.revenueRange} onChange={v => update('revenueRange', v)} />
        </Field>

        <Field label="Monthly lead volume">
          <Pills options={LEAD_VOLUME_OPTIONS} value={form.leadVolume} onChange={v => update('leadVolume', v)} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Field label="Business name">
            <input
              type="text"
              value={form.businessName}
              onChange={e => update('businessName', e.target.value)}
              placeholder="Acme Home Services"
              required
              disabled={status === 'loading'}
              className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 disabled:opacity-50"
              style={inputStyle}
            />
          </Field>
          <Field label="Phone">
            <input
              type="tel"
              value={form.phone}
              onChange={e => update('phone', e.target.value)}
              placeholder="(504) 555-0100"
              required
              disabled={status === 'loading'}
              className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 disabled:opacity-50"
              style={inputStyle}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                placeholder="you@yourcompany.com"
                required
                disabled={status === 'loading'}
                className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 disabled:opacity-50"
                style={inputStyle}
              />
            </Field>
          </div>
        </div>

        {status === 'error' && (
          <p className="text-red-400 text-sm text-center">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading' || !isComplete}
          className="w-full py-4 rounded-xl font-bold text-black text-[15px] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ backgroundColor: '#C6A62C', boxShadow: '0 6px 28px rgba(198,166,44,0.3)' }}
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Finding your leak...
            </>
          ) : (
            'Find My Leak →'
          )}
        </button>

        <p className="text-center text-white/20 text-xs">
          No spam, no sales call to get your answer — just a straight read on where the revenue is going.
        </p>
      </form>
    </div>
  );
}
