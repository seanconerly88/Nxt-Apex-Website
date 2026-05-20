'use client';

import { motion } from 'framer-motion';
import { useBooking } from '@/contexts/BookingContext';

function FloatingCapsule({ width, height, gradient, top, right, left, bottom, rotate, delay, opacity = 1, blur = '0px', glow }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width,
        height,
        background: gradient,
        top,
        right,
        left,
        bottom,
        opacity,
        filter: `blur(${blur})`,
        boxShadow: glow || 'none',
        borderRadius: '9999px',
      }}
      initial={{ rotate, y: 0 }}
      animate={{
        y: [0, -28, 0],
        rotate: [rotate, rotate + 5, rotate],
      }}
      transition={{
        duration: 12 + delay * 2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function HeroGeometric() {
  const { openModal } = useBooking();

  return (
    <section className="relative min-h-screen bg-white overflow-hidden flex items-center pt-20">
      {/* Ambient radial warm tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 68% 28%, rgba(198,166,44,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Capsule 1 — large, top-right, primary gold */}
      <FloatingCapsule
        width="660px"
        height="190px"
        gradient="linear-gradient(138deg, rgba(198,166,44,0.38) 0%, rgba(220,188,50,0.22) 55%, rgba(139,105,20,0.32) 100%)"
        top="7%"
        right="-7%"
        rotate={-33}
        delay={0}
        blur="0.5px"
        glow="0 0 120px rgba(198,166,44,0.18)"
      />

      {/* Capsule 2 — very large, bottom-left, faint */}
      <FloatingCapsule
        width="860px"
        height="230px"
        gradient="linear-gradient(138deg, rgba(198,166,44,0.1) 0%, rgba(232,200,74,0.05) 100%)"
        bottom="2%"
        left="-16%"
        rotate={19}
        delay={2.5}
        blur="3px"
      />

      {/* Capsule 3 — small accent, mid-right */}
      <FloatingCapsule
        width="310px"
        height="90px"
        gradient="rgba(198,166,44,0.11)"
        top="50%"
        right="11%"
        rotate={-14}
        delay={1.2}
        blur="4px"
      />

      {/* Very subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(198,166,44,0.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-28 lg:py-36">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-10"
        >
          <span
            className="w-2 h-2 rounded-full bg-[#C6A62C]"
            style={{ boxShadow: '0 0 8px rgba(198,166,44,0.9)' }}
          />
          <span className="text-[11px] font-bold text-gray-500 tracking-[0.14em] uppercase">
            Your AI &amp; Automation Partner
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.12}>
          <h1 className="text-[clamp(52px,8vw,92px)] font-extrabold tracking-tight leading-[1.03] mb-8">
            <span className="block text-gray-900">You Bought the Tools.</span>
            <span
              className="block"
              style={{
                backgroundImage:
                  'linear-gradient(92deg, #C6A62C 0%, #e8c84a 42%, #a08020 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              We'll Make Them Work.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.24}
          className="text-xl md:text-2xl text-gray-500 max-w-2xl mb-14 leading-relaxed font-light"
        >
          We assess your business, identify every AI opportunity, and train your
          team on{' '}
          <strong className="text-gray-800 font-semibold">Claude</strong>{' '}
          or{' '}
          <strong className="text-gray-800 font-semibold">OpenAI for Business</strong>{' '}
          so AI actually accelerates your growth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.36}
          className="flex flex-col sm:flex-row gap-4 mb-24"
        >
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: '#C6A62C',
              boxShadow: '0 8px 32px rgba(198,166,44,0.38)',
            }}
          >
            Start Your Assessment →
          </button>
          <a
            href="#process"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-gray-200 text-gray-700 font-semibold text-lg hover:border-[#C6A62C] hover:text-[#C6A62C] transition-all duration-300 bg-white/60 backdrop-blur-sm"
          >
            See How It Works ↓
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-wrap gap-10 pt-10 border-t border-gray-100"
        >
          {[
            { value: '48 hrs', label: 'Report delivered' },
            { value: '100%', label: 'Custom to your business' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
