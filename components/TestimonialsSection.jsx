'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATIC_TESTIMONIALS = [
  {
    quote: 'The assessment alone was worth it. We found 6 workflows we could automate. We had no idea where to start before this.',
    name: 'Marcus',
    title: 'CEO, 35-person agency',
  },
  {
    quote: "The AI Opportunity Report changed how we look at our operations. Sean's team made AI feel achievable, not overwhelming.",
    name: 'Karen',
    title: 'Operations Director',
  },
  {
    quote: 'We went from subscribed to actually using Claude for everything within a week of training. The team is completely different now.',
    name: 'David',
    title: 'Founder',
  },
  {
    quote: "I thought we were already using AI well. The assessment showed us we'd barely scratched the surface. Game changer.",
    name: 'Jessica',
    title: 'Managing Partner',
  },
];

function StarIcon({ filled = true }) {
  return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill={filled ? '#C6A62C' : '#e5e7eb'}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function TestimonialCard({ t }) {
  const rating = t.rating ?? 5;
  return (
    <div className="flex-shrink-0 w-[380px] bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex gap-0.5 mb-5">
          {[...Array(5)].map((_, j) => (
            <StarIcon key={j} filled={j < rating} />
          ))}
        </div>
        <p className="text-gray-700 leading-relaxed font-medium text-[15px]">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="font-bold text-gray-900 text-sm">{t.name}</div>
        {(t.company || t.title) && (
          <div className="text-xs text-gray-500 mt-0.5">{t.company || t.title}</div>
        )}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [liveReviews, setLiveReviews] = useState([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.ok ? r.json() : { reviews: [] })
      .then(data => {
        if (data.reviews?.length) setLiveReviews(data.reviews);
      })
      .catch(() => {});
  }, []);

  const base = liveReviews.length ? liveReviews : STATIC_TESTIMONIALS;
  // Duplicate for seamless infinite loop (need at least ~6-8 to scroll naturally)
  const cards = base.length < 4 ? [...base, ...STATIC_TESTIMONIALS, ...base, ...STATIC_TESTIMONIALS] : [...base, ...base];

  return (
    <section id="testimonials" ref={ref} className="py-28 bg-[#FAFAF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What businesses are saying
          </h2>
          <a
            href="/reviews"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-[#C6A62C] hover:text-[#C6A62C] transition-all duration-200 shadow-sm whitespace-nowrap"
          >
            Leave a review
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Carousel track with fade masks */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex gap-6 animate-scroll-testimonials" style={{ width: 'fit-content', paddingLeft: '24px' }}>
          {cards.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
