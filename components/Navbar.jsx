'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useBooking } from '@/contexts/BookingContext';

export default function Navbar({ ctaLabel, ctaHref }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openModal } = useBooking();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Assessment', href: '/' },
    { label: 'AI Search', href: '/ai-search' },
    { label: 'AEO Agency', href: '/aeo-agency' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo — Trans Light on dark hero, Trans Dark on white nav */}
          <a href="/" className="flex items-center gap-2.5">
            <img
              src={scrolled ? '/logo-trans-dark.png' : '/logo-trans-light.png'}
              alt="NXT APEX AI"
              className="h-10 w-auto transition-all duration-300"
            />
            <span
              className="text-xl font-extrabold tracking-tight transition-colors duration-300"
              style={{ color: scrolled ? '#111111' : '#ffffff' }}
            >
              Nxt Apex
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#C6A62C] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="w-px h-5 bg-gray-200" />
            <a
              href="tel:+15042904780"
              className="text-sm font-semibold text-gray-700 hover:text-[#C6A62C] transition-colors duration-200"
            >
              (504) 290-4780
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            {ctaHref ? (
              <Link
                href={ctaHref}
                className="inline-flex items-center px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: '#C6A62C', boxShadow: '0 2px 12px rgba(198,166,44,0.28)' }}
              >
                {ctaLabel || 'Book Assessment'}
              </Link>
            ) : (
              <button
                onClick={openModal}
                className="inline-flex items-center px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: '#C6A62C', boxShadow: '0 2px 12px rgba(198,166,44,0.28)' }}
              >
                Book Assessment
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700"
            aria-label="Toggle navigation"
          >
            <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-gray-700 py-1 hover:text-[#C6A62C] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {ctaHref ? (
                <Link
                  href={ctaHref}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl text-white text-sm font-semibold mt-2"
                  style={{ backgroundColor: '#C6A62C' }}
                >
                  {ctaLabel || 'Book Assessment'}
                </Link>
              ) : (
                <button
                  onClick={() => { openModal(); setMobileOpen(false); }}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl text-white text-sm font-semibold mt-2"
                  style={{ backgroundColor: '#C6A62C' }}
                >
                  Book Assessment
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
