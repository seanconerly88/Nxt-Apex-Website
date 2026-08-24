'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';
import { useBooking } from '@/contexts/BookingContext';

const SOURCE_OPTIONS = [
  'ChatGPT / Perplexity / AI search',
  'Google',
  'LinkedIn',
  'Referral from someone I know',
  'Social media',
  'Other',
];

export default function BookingModal() {
  const { isOpen, closeModal } = useBooking();
  const [source, setSource] = useState('');

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeModal]);

  return (
    <>
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="lazyOnload"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="booking-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <motion.div
              key="booking-modal"
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
              style={{ maxHeight: '92vh' }}
            >
              {/* Modal header */}
              <div className="px-7 pt-5 pb-4 border-b border-gray-100">
                {/* Top row: title + close */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#C6A62C] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 leading-none">
                        Book Your Assessment
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Pick a time. We'll take it from there.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {/* How did you find us */}
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">How did you find us?</p>
                  <div className="flex flex-wrap gap-2">
                    {SOURCE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSource(opt === source ? '' : opt)}
                        className="text-[12px] px-3 py-1.5 rounded-full border font-medium transition-all duration-150"
                        style={{
                          backgroundColor: source === opt ? '#C6A62C' : 'transparent',
                          borderColor: source === opt ? '#C6A62C' : 'rgba(0,0,0,0.12)',
                          color: source === opt ? '#fff' : '#6b7280',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* GHL Calendar iframe */}
              <div
                className="overflow-y-auto overscroll-contain"
                style={{ maxHeight: 'calc(92vh - 160px)', WebkitOverflowScrolling: 'touch' }}
              >
                <iframe
                  src="https://api.leadconnectorhq.com/widget/booking/skLPTNg3PVxukFM8OQHW"
                  style={{
                    width: '100%',
                    height: '1200px',
                    border: 'none',
                    display: 'block',
                  }}
                  id="skLPTNg3PVxukFM8OQHW_1779295626870"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
