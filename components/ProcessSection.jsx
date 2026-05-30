'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    tag: 'Discovery',
    title: 'AI Readiness Assessment',
    description:
      'We walk your leadership team through a structured discovery session. We map your workflows, tools, team structure, and bottlenecks to surface every AI opportunity hiding in your operations.',
    detail: '~60–90 minute session',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    number: '02',
    tag: 'Deliverable',
    title: 'AI Opportunity Report',
    description:
      'Within 48 hours you receive a custom report detailing exactly where and how AI can be implemented in your business. Every recommendation is tied to real workflows, real tools, and real ROI. Not generic advice.',
    detail: 'Delivered within 48 hours',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    number: '03',
    tag: 'Implementation',
    title: 'Train or Deploy',
    description:
      "Take the report and implement it yourself, or bring us in. We'll train your team directly on Claude and OpenAI for Business, building the exact workflows from your report into your daily operations.",
    detail: 'Your choice',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];

function TiltCard({ step, i, inView }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          boxShadow: hovered
            ? '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(198,166,44,0.18)'
            : '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative rounded-2xl p-9 overflow-hidden cursor-default select-none"
        style={{
          backgroundColor: '#0F1629',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Watermark number */}
        <div
          className="absolute top-4 right-5 font-extrabold leading-none select-none pointer-events-none transition-all duration-500"
          style={{
            fontSize: '96px',
            color: hovered ? 'rgba(198,166,44,0.22)' : 'rgba(255,255,255,0.05)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          {step.number}
        </div>

        {/* Subtle gold top-left glow on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background:
              'radial-gradient(ellipse 60% 40% at 20% 10%, rgba(198,166,44,0.1) 0%, transparent 70%)',
          }}
        />

        {/* Content — lifted in 3D */}
        <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-7 transition-all duration-300"
            style={{
              backgroundColor: hovered ? '#C6A62C' : 'rgba(198,166,44,0.1)',
              border: hovered
                ? '1px solid transparent'
                : '1px solid rgba(198,166,44,0.2)',
              color: hovered ? '#000' : '#C6A62C',
            }}
          >
            {step.icon}
          </div>

          {/* Tag */}
          <div
            className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest mb-3 transition-all duration-300"
            style={{
              backgroundColor: hovered
                ? 'rgba(198,166,44,0.15)'
                : 'rgba(255,255,255,0.06)',
              color: hovered ? '#C6A62C' : 'rgba(255,255,255,0.35)',
            }}
          >
            {step.tag}
          </div>

          <h3 className="text-xl font-bold text-white mb-3 leading-snug">{step.title}</h3>
          <p
            className="leading-relaxed mb-8 text-[15px]"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            {step.description}
          </p>

          {/* Detail indicator */}
          <div
            className="flex items-center gap-2 text-sm font-semibold transition-colors duration-300"
            style={{ color: hovered ? '#e8c84a' : 'rgba(198,166,44,0.65)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: hovered ? '#e8c84a' : 'rgba(198,166,44,0.5)',
                boxShadow: hovered ? '0 0 6px rgba(198,166,44,0.7)' : 'none',
              }}
            />
            {step.detail}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="process"
      className="py-28"
      style={{ backgroundColor: '#060A18' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <div
            className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.14em] uppercase mb-5"
            style={{
              backgroundColor: 'rgba(198,166,44,0.1)',
              border: '1px solid rgba(198,166,44,0.22)',
              color: '#C6A62C',
            }}
          >
            Our Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            From assessment
            <br />
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #C6A62C, #e8c84a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              to action.
            </span>
          </h2>
          <p className="text-xl font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Three steps. No fluff. You walk out with a plan and the team trained to execute it.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <TiltCard key={step.number} step={step} i={i} inView={inView} />
          ))}
        </div>

        {/* Connector line (desktop only) */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          className="hidden lg:block mt-10 mx-auto"
          style={{ transformOrigin: 'left' }}
        >
          <div
            className="relative h-px max-w-4xl mx-auto"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(198,166,44,0.3) 20%, rgba(198,166,44,0.3) 80%, transparent)',
            }}
          >
            {[0, 50, 100].map((pct) => (
              <div
                key={pct}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{
                  left: `${pct}%`,
                  transform: pct === 100 ? 'translateX(-100%) translateY(-50%)' : pct === 50 ? 'translateX(-50%) translateY(-50%)' : 'translateY(-50%)',
                  backgroundColor: '#C6A62C',
                  boxShadow: '0 0 8px rgba(198,166,44,0.6)',
                }}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
