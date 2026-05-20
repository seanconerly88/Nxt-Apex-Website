'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  {
    quote:
      'The assessment alone was worth it. We found 6 workflows we could automate — we had no idea where to start before this.',
    name: 'M. R.',
    title: 'CEO, 35-person agency',
  },
  {
    quote:
      "The AI Opportunity Report changed how we look at our operations. Sean's team made AI feel achievable, not overwhelming.",
    name: 'K. T.',
    title: 'Operations Director',
  },
  {
    quote:
      'We went from subscribed to actually using Claude Cowork for everything within a week of training. The team is completely different now.',
    name: 'D. L.',
    title: 'Founder',
  },
  {
    quote:
      "I thought we were already using AI well. The assessment showed us we'd barely scratched the surface. Game changer.",
    name: 'J. P.',
    title: 'Managing Partner',
  },
  // Duplicates for seamless infinite loop
  {
    quote:
      'The assessment alone was worth it. We found 6 workflows we could automate — we had no idea where to start before this.',
    name: 'M. R.',
    title: 'CEO, 35-person agency',
  },
  {
    quote:
      "The AI Opportunity Report changed how we look at our operations. Sean's team made AI feel achievable, not overwhelming.",
    name: 'K. T.',
    title: 'Operations Director',
  },
  {
    quote:
      'We went from subscribed to actually using Claude Cowork for everything within a week of training. The team is completely different now.',
    name: 'D. L.',
    title: 'Founder',
  },
  {
    quote:
      "I thought we were already using AI well. The assessment showed us we'd barely scratched the surface. Game changer.",
    name: 'J. P.',
    title: 'Managing Partner',
  },
];

function StarIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="#C6A62C">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-28 bg-[#FAFAF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-900"
        >
          What businesses are saying
        </motion.h2>
      </div>

      {/* Carousel track with fade masks */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex gap-6 animate-scroll-testimonials" style={{ width: 'fit-content', paddingLeft: '24px' }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[380px] bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed font-medium text-[15px]">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
