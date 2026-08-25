'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { useBooking } from '@/contexts/BookingContext';

const EASE = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    when: 'Day 0',
    what: 'Your AI Readiness Assessment.',
    detail: 'We map how your business actually runs and find which loops are open.',
  },
  {
    when: 'Day 2',
    what: 'Your open loops named and ranked.',
    detail: 'You get the full picture and the order to close them in.',
  },
  {
    when: 'Day 6',
    what: 'Speed to Lead and Database Reactivation go live.',
    detail: 'Two loops closed four days after kickoff.',
    highlight: true,
  },
  {
    when: 'Day 12',
    what: 'All six agents running and monitored.',
    detail: 'The full system is deployed, tested, and handed off to your team.',
    highlight: true,
  },
  {
    when: 'Day 15',
    what: 'Weekly optimization calls on the calendar.',
    detail: 'We review what is working, what is not, and tune from there.',
  },
  {
    when: 'Day 30',
    what: 'Fully implemented and tuned for performance.',
    detail: 'Every loop closed, measured, and optimized against your numbers.',
  },
];

function Step({ step, index, reduceMotion }) {
  const ref = useRef(null);
  const active = useInView(ref, { once: true, margin: '-45% 0px -45% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      className="relative grid grid-cols-[auto_1fr] sm:grid-cols-[84px_auto_1fr] gap-x-4 sm:gap-x-6 items-start"
    >
      {/* Day label — desktop */}
      <motion.p
        className="hidden sm:block text-[13px] font-bold text-right pt-0.5 tabular-nums"
        animate={{ color: active || step.highlight ? '#C6A62C' : 'rgba(255,255,255,0.3)' }}
        transition={{ duration: 0.45 }}
      >
        {step.when}
      </motion.p>

      {/* Node */}
      <div className="pt-1.5">
        <motion.div
          className="w-[15px] h-[15px] rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#080D1C', borderWidth: '2px', borderStyle: 'solid' }}
          initial={{ borderColor: 'rgba(255,255,255,0.18)' }}
          animate={{
            borderColor: active ? '#C6A62C' : 'rgba(255,255,255,0.18)',
            scale: active && !reduceMotion ? 1.15 : 1,
            boxShadow: active ? '0 0 0 4px rgba(198,166,44,0.12)' : '0 0 0 0px rgba(198,166,44,0)',
          }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <motion.div
            className="rounded-full"
            animate={{
              width: active ? 5 : 0,
              height: active ? 5 : 0,
              backgroundColor: '#C6A62C',
            }}
            transition={{ duration: 0.35, ease: EASE }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div>
        <motion.p
          className="sm:hidden text-[12px] font-bold mb-1 tabular-nums"
          animate={{ color: active || step.highlight ? '#C6A62C' : 'rgba(255,255,255,0.3)' }}
          transition={{ duration: 0.45 }}
        >
          {step.when}
        </motion.p>
        <motion.p
          className="font-semibold text-[16px] sm:text-[17px] leading-snug mb-1"
          animate={{ color: active ? '#ffffff' : 'rgba(255,255,255,0.55)' }}
          transition={{ duration: 0.45 }}
        >
          {step.what}
        </motion.p>
        <p className="text-white/35 text-[14px] leading-relaxed">{step.detail}</p>
      </div>
    </motion.div>
  );
}

export default function TimelineSection() {
  const ref = useRef(null);
  const railRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();
  const { openModal } = useBooking();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 75%', 'end 55%'],
  });
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.3 });

  return (
    <section ref={ref} className="pt-36 lg:pt-48 pb-28 px-6" style={{ backgroundColor: '#080D1C' }}>
      <div className="max-w-4xl mx-auto">

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
            What happens after you book
          </div>
          <h2
            className="text-white font-extrabold"
            style={{ fontSize: 'clamp(28px, 3.6vw, 48px)', letterSpacing: '-0.02em', textWrap: 'balance' }}
          >
            Here is what the first thirty days look like.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={railRef} className="relative">
          {/* Track */}
          <div
            className="absolute left-[7px] sm:left-[91px] top-2 bottom-2 w-px"
            style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
          />
          {/* Scroll-linked fill */}
          <motion.div
            className="absolute left-[7px] sm:left-[91px] top-2 bottom-2 w-px origin-top"
            style={{
              backgroundColor: '#C6A62C',
              scaleY: reduceMotion ? 1 : railScale,
              boxShadow: '0 0 8px rgba(198,166,44,0.5)',
            }}
          />

          <div className="flex flex-col gap-8">
            {STEPS.map((s, i) => (
              <Step key={s.when} step={s} index={i} reduceMotion={reduceMotion} />
            ))}
          </div>
        </div>

        {/* Closing claim */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-16 rounded-2xl px-8 py-10 text-center"
          style={{
            backgroundColor: 'rgba(198,166,44,0.05)',
            border: '1px solid rgba(198,166,44,0.18)',
          }}
        >
          <p
            className="text-white font-extrabold mb-6"
            style={{ fontSize: 'clamp(20px, 2.6vw, 30px)', letterSpacing: '-0.018em', textWrap: 'balance' }}
          >
            All six loops installed before your second invoice.
          </p>
          <motion.button
            onClick={openModal}
            whileHover={reduceMotion ? {} : { y: -3, boxShadow: '0 10px 32px rgba(198,166,44,0.42)' }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-7 py-3.5 rounded-xl text-white font-bold text-[15px]"
            style={{ backgroundColor: '#C6A62C', boxShadow: '0 4px 20px rgba(198,166,44,0.3)' }}
          >
            Book your Assessment →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
