'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export default function CalloutBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative px-6 pt-36 lg:pt-48 pb-24 lg:pb-28 overflow-hidden"
      style={{ backgroundColor: '#080D1C' }}
    >
      {/* Faint gold wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(198,166,44,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="w-14 h-px mx-auto mb-10"
          style={{ backgroundColor: '#C6A62C' }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="text-white font-extrabold leading-[1.15]"
          style={{ fontSize: 'clamp(26px, 4vw, 46px)', letterSpacing: '-0.02em', textWrap: 'balance' }}
        >
          You should see a result before you see a second invoice.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="w-14 h-px mx-auto mt-10"
          style={{ backgroundColor: 'rgba(198,166,44,0.35)' }}
        />
      </div>
    </section>
  );
}
