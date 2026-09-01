'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { POSTS_BY_DATE } from '@/lib/blog';

const EASE = [0.22, 1, 0.36, 1];

function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
}

export default function BlogIndex() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6" style={{ background: '#060A18' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          className="absolute top-0 left-1/3 w-[700px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center top, rgba(198,166,44,0.07) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-3xl mx-auto text-center pt-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-8"
          >
            <span className="text-[11px] font-bold text-white/40 tracking-[0.15em] uppercase">Field Notes</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="font-extrabold text-white leading-[1.06] tracking-tight mb-6"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', textWrap: 'balance' }}
          >
            Answers to the questions that come before the sales call.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="text-white/55 leading-relaxed max-w-xl mx-auto"
            style={{ fontSize: 'clamp(15px, 1.2vw, 18px)' }}
          >
            No theory about where AI is going. Just what we see breaking in real businesses, and what fixes it.
          </motion.p>
        </div>
      </section>

      {/* ── Posts ──────────────────────────────────────────────────────── */}
      <section ref={ref} className="py-24 px-6 bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto">
          {POSTS_BY_DATE.length === 0 ? (
            <p className="text-center text-gray-400 text-[15px]">No posts yet.</p>
          ) : (
            <div className="space-y-5">
              {POSTS_BY_DATE.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <motion.article
                      whileHover={reduceMotion ? {} : { y: -4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                      className="group relative overflow-hidden rounded-2xl p-8 bg-white"
                      style={{ border: '1px solid rgba(0,0,0,0.07)' }}
                    >
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(to right, transparent, #C6A62C 40%, #e8c84a 60%, transparent)' }}
                      />
                      <div className="flex flex-wrap items-center gap-3 mb-4 text-[11px] font-bold uppercase tracking-[0.12em]">
                        <span style={{ color: '#C6A62C' }}>{post.category}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-gray-400">{formatDate(post.date)}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-gray-400">{post.readMinutes} min read</span>
                      </div>
                      <h2 className="text-gray-900 font-extrabold text-2xl mb-3 leading-snug group-hover:text-[#C6A62C] transition-colors duration-200">
                        {post.title}
                      </h2>
                      <p className="text-gray-500 text-[15px] leading-relaxed mb-5">{post.metaDesc}</p>
                      <span className="text-[13px] font-bold" style={{ color: '#C6A62C' }}>
                        Read it →
                      </span>
                    </motion.article>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center" style={{ background: '#060A18', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}>
          <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-5 leading-tight">
            Want this looked at in your business?
          </h2>
          <p className="text-white/45 text-[15px] max-w-xl mx-auto mb-10 leading-relaxed">
            We map where your leads are actually leaking and what it is costing. You leave knowing which loop to close first.
          </p>
          <motion.a
            href="https://api.leadconnectorhq.com/widget/booking/nxtapexai"
            whileHover={reduceMotion ? {} : { scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-9 py-4 rounded-xl font-bold text-black text-[15px]"
            style={{ backgroundColor: '#C6A62C', boxShadow: '0 6px 32px rgba(198,166,44,0.38)' }}
          >
            Book Your Strategy Call →
          </motion.a>
        </motion.div>
      </section>
    </>
  );
}
