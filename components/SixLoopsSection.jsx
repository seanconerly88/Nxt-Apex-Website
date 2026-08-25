'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const LOOPS = [
  {
    closes: 'Closes the response loop',
    name: 'Speed to Lead',
    body: 'Every new lead gets a personal reply in under 60 seconds, day or night, with nobody lifting a finger.',
  },
  {
    closes: 'Closes the missed call loop',
    name: 'AI Receptionist',
    body: 'Answers every call your team cannot get to and books the ones worth booking.',
  },
  {
    closes: 'Closes the dead lead loop',
    name: 'Database Reactivation',
    body: 'Works the list you already paid to build and never followed up on.',
  },
  {
    closes: 'Closes the browse and bounce loop',
    name: 'Website Manager',
    body: 'Answers questions on your site at 9pm and books the appointment before they leave.',
  },
  {
    closes: 'Closes the trust loop',
    name: 'Reputation Manager',
    body: 'Asks every happy customer for a review at the exact moment they are most likely to leave one.',
  },
  {
    closes: 'Closes the oversight loop',
    name: 'Pipeline Manager',
    body: 'Watches the other five and tells you the moment one starts slipping.',
  },
];

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
          {LOOPS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="rounded-2xl p-7 flex flex-col"
              style={{
                backgroundColor: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="mb-5">
                <LoopRing inView={inView} delay={0.3 + i * 0.08} reduceMotion={reduceMotion} />
              </div>

              <p
                className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2.5"
                style={{ color: '#C6A62C' }}
              >
                {item.closes}
              </p>

              <h3 className="text-white font-bold text-xl mb-3">{item.name}</h3>

              <p className="text-white/40 text-[14px] leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          className="text-center text-white/25 text-[14px] mt-12 max-w-xl mx-auto"
        >
          You do not need more leads. You need to stop losing the ones you have.
        </motion.p>
      </div>
    </section>
  );
}
