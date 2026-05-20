'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';
import { useBooking } from '@/contexts/BookingContext';

export default function BookingModal() {
  const { isOpen, closeModal } = useBooking();

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
              <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#C6A62C] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 leading-none">
                      Book Your Assessment
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Pick a time — we'll take it from there.
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

              {/* GHL Calendar iframe */}
              <div
                className="overflow-y-auto overscroll-contain"
                style={{ maxHeight: 'calc(90vh - 82px)', WebkitOverflowScrolling: 'touch' }}
              >
                <iframe
                  src="https://api.leadconnectorhq.com/widget/booking/skLPTNg3PVxukFM8OQHW"
                  style={{
                    width: '100%',
                    height: '880px',
                    border: 'none',
                    display: 'block',
                  }}
                  scrolling="no"
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
