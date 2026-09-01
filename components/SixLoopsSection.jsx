'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { LOOPS, LOOP_ORDER } from '@/lib/loopConfig';

const EASE = [0.22, 1, 0.36, 1];

const LOOP_CARDS = LOOP_ORDER.map(key => {
  const { slug, name, closes, cardBody } = LOOPS[key];
  return { slug, name, closes, body: cardBody };
});

function LoopRing({ inView, delay, reduceMotion }) {
  const C = 2 * Math.PI * 13; // circumference for r=13

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="13" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
      <motion.circle
        cx="16"
        cy="16"
        r="13"
        stroke="#C6A62C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={C}
        initial={{ strokeDashoffset: reduceMotion ? 0 : C }}
        animate={inView ? { strokeDashoffset: 0 } : {}}
        transition={{ duration: 1.1, delay, ease: EASE }}
        style={{ transformOrigin: '16px 16px', rotate: '-90deg' }}
      />
    </svg>
  );
}

export default function SixLoopsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="py-28 px-6" style={{ backgroundColor: '#060A18' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-[11px] font-bold tracking-[0.14em] uppercase"
            style={{ backgroundColor: 'rgba(198,166,44,0.1)', border: '1px solid rgba(198,166,44,0.2)', color: '#C6A62C' }}
          >
            The Closed Loop System
          </div>
          <h2
            className="text-white font-extrabold mb-4"
            style={{ fontSize: 'clamp(28px, 3.6vw, 48px)', letterSpacing: '-0.02em', textWrap: 'balance' }}
          >
            Six ways revenue leaves. Six ways we close it.
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Every one of these is a role you would otherwise have to hire for.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {LOOP_CARDS.map((item, i) => (
            <Link key={item.name} href={`/${item.slug}`} className="block h-full">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              whileHover={reduceMotion ? {} : {
                y: -6,
                backgroundColor: 'rgba(198,166,44,0.05)',
                borderColor: 'rgba(198,166,44,0.28)',
                boxShadow: '0 18px 44px rgba(0,0,0,0.4)',
              }}
              className="group rounded-2xl p-7 h-full flex flex-col cursor-pointer"
              style={{
                backgroundColor: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <motion.div
                className="mb-5"
                whileHover={reduceMotion ? {} : { rotate: 90 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <LoopRing inView={inView} delay={0.3 + i * 0.08} reduceMotion={reduceMotion} />
              </motion.div>

              <p
                className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2.5"
                style={{ color: '#C6A62C' }}
              >
                {item.closes}
              </p>

              <h3 className="text-white font-bold text-xl mb-3">{item.name}</h3>

              <p className="text-white/40 text-[14px] leading-relaxed flex-1">{item.body}</p>

              <span className="mt-5 text-[13px] font-bold" style={{ color: '#C6A62C' }}>
                See how it works →
              </span>
            </motion.div>
            </Link>
          ))}
        </div>

        {/* Bottom note + proof link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          className="flex flex-col items-center mt-12"
        >
          <p className="text-center text-white/25 text-[14px] max-w-xl mb-7">
            You do not need more leads. You need to stop losing the ones you have.
          </p>

          <Link href="/case-studies">
            <motion.span
              whileHover={reduceMotion ? {} : { y: -3, borderColor: 'rgba(198,166,44,0.55)', backgroundColor: 'rgba(198,166,44,0.08)' }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[15px] cursor-pointer"
              style={{
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(198,166,44,0.3)',
                backgroundColor: 'rgba(198,166,44,0.04)',
                color: '#C6A62C',
              }}
            >
              See the loops we have closed →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
