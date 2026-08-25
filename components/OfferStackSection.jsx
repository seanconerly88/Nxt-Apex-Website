'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useBooking } from '@/contexts/BookingContext';

const EASE = [0.22, 1, 0.36, 1];

const OFFERS = [
  {
    tier: '01',
    name: 'DIY Toolkit',
    price: null,
    priceLabel: 'Free',
    tag: 'Start here',
    tagColor: 'rgba(255,255,255,0.15)',
    tagText: 'rgba(255,255,255,0.6)',
    description: 'Every open loop in your business named and ranked, in your hands in 48 hours. You know exactly what to close and in what order.',
    features: ['Full client journey audit', 'Open loops ranked by priority', 'Delivered in 48 hours'],
    cta: 'Book your free Assessment',
    ctaStyle: 'outline',
    highlight: false,
  },
  {
    tier: '02',
    name: 'Advisory',
    price: '$1,500',
    priceLabel: '/mo',
    tag: 'Most popular',
    tagColor: 'rgba(198,166,44,0.15)',
    tagText: '#C6A62C',
    description: 'Monthly retainer. We stay in it, reviewing what is built, catching what breaks, and keeping the system running when you are not watching it.',
    features: ['Everything in DIY', 'Monthly 1:1 strategy sessions', 'Implementation roadmap', 'Async Slack support', 'Pipeline check-ins'],
    cta: 'Book your free Assessment',
    ctaStyle: 'gold',
    highlight: true,
  },
  {
    tier: '03',
    name: 'Done For You',
    price: '$3,500–$10K',
    priceLabel: ' project',
    tag: 'Full deployment',
    tagColor: 'rgba(255,255,255,0.08)',
    tagText: 'rgba(255,255,255,0.5)',
    description: 'Two loops closed by day four. All six running by day twelve. We build it, integrate it, test it, hand it off.',
    features: ['All six agents deployed', 'CRM + tool integrations', 'Two loops live by day 6', 'QA & handoff training', 'Post-launch support'],
    cta: 'Book your free Assessment',
    ctaStyle: 'outline',
    highlight: false,
  },
  {
    tier: '04',
    name: 'Team Training',
    price: '$500',
    priceLabel: '/person',
    tag: 'Workshop',
    tagColor: 'rgba(255,255,255,0.08)',
    tagText: 'rgba(255,255,255,0.5)',
    description: 'Half day or full day, built around your industry. Your team leaves knowing how to run the system, not how to define the word prompt.',
    features: ['Custom curriculum', 'Industry-specific examples', 'Hands-on practice', 'Take-home playbook', 'Min. 5 attendees'],
    cta: 'Book your free Assessment',
    ctaStyle: 'outline',
    highlight: false,
  },
  {
    tier: '05',
    name: 'Seismic Shift',
    price: '$400',
    priceLabel: '/mo',
    tag: 'CILAS framework',
    tagColor: 'rgba(198,166,44,0.08)',
    tagText: 'rgba(198,166,44,0.7)',
    description: 'The full CILAS system — Context, Inputs, Logic, Automation, System — deployed and maintained monthly. For serious operators.',
    features: ['Full CILAS deployment', 'Monthly optimization cycle', 'Agent team management', 'Custom reporting dashboard', 'Priority support'],
    cta: 'Book your free Assessment',
    ctaStyle: 'outline',
    highlight: false,
  },
];

export default function OfferStackSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { openModal } = useBooking();

  return (
    <section
      ref={ref}
      className="py-28 px-6"
      style={{ backgroundColor: '#080D1C' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-[11px] font-bold tracking-[0.14em] uppercase"
            style={{ backgroundColor: 'rgba(198,166,44,0.1)', border: '1px solid rgba(198,166,44,0.2)', color: '#C6A62C' }}>
            After the Assessment
          </div>
          <h2 className="text-white font-extrabold mb-4" style={{ fontSize: 'clamp(30px, 3.5vw, 48px)' }}>
            Implementation, not education.
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Most AI agencies teach you what is possible. We build what is necessary.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className={`rounded-2xl p-7 flex flex-col relative overflow-hidden ${offer.highlight ? 'xl:col-span-1' : ''}`}
              style={{
                backgroundColor: offer.highlight ? 'rgba(198,166,44,0.06)' : 'rgba(255,255,255,0.025)',
                border: offer.highlight
                  ? '1px solid rgba(198,166,44,0.3)'
                  : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Glow for highlighted */}
              {offer.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 rounded-full blur-3xl pointer-events-none"
                  style={{ backgroundColor: 'rgba(198,166,44,0.12)' }} />
              )}

              {/* Tier + tag */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-bold text-white/20 tracking-widest">{offer.tier}</span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: offer.tagColor, color: offer.tagText }}>
                  {offer.tag}
                </span>
              </div>

              {/* Name */}
              <h3 className="text-white font-bold text-xl mb-4">{offer.name}</h3>

              <p className="text-white/40 text-[14px] leading-relaxed mb-6 flex-1">{offer.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-7">
                {offer.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-[13px] text-white/55">
                    <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(198,166,44,0.15)' }}>
                      <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#C6A62C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={openModal}
                className="w-full py-3 rounded-xl text-[14px] font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={offer.ctaStyle === 'gold' ? {
                  backgroundColor: '#C6A62C',
                  color: '#fff',
                  boxShadow: '0 4px 16px rgba(198,166,44,0.3)',
                } : {
                  backgroundColor: 'transparent',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {offer.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="text-center text-white/20 text-[13px] mt-10"
        >
          All paths start with a free AI Readiness Assessment call. No commitment, no sales pitch.
        </motion.p>
      </div>
    </section>
  );
}
