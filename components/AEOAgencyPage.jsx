'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBooking } from '@/contexts/BookingContext';

const EASE = [0.22, 1, 0.36, 1];

const KEY_FINDINGS = [
  'AI engines — ChatGPT, Perplexity, Google AI Overviews — now recommend businesses directly to buyers before they ever open a search results page.',
  'Fewer than 1 in 5 small businesses appear in AI-generated recommendations, even when they rank well on Google.',
  "Buyers who receive an AI recommendation arrive pre-sold. They've already decided to act — they just need to know who to call.",
  'Most AEO agencies stop at visibility. They audit your citations and walk away. Nobody connects AI-referred leads to a pipeline that closes them.',
  "The window to establish AI citation authority is open now. Businesses that act in the next 6–12 months build a durable lead advantage their competitors won't easily displace.",
  'Nxt Apex AI audits your AI search presence, fixes the gaps, and wires new AI-referred inquiries directly into a pipeline built to close.',
];

const SECTIONS = [
  {
    num: '01',
    id: 'what-is-aeo',
    heading: 'What Is an AEO Agency?',
    content: (
      <>
        <p>An AEO agency — Answer Engine Optimization agency — helps businesses appear in the answers that AI engines generate when people ask questions. Not Google's blue links. The actual AI-written responses from ChatGPT, Perplexity, and Google AI Overviews.</p>
        <p>When someone types <em>"best real estate agent in Austin"</em> into ChatGPT, they don't get a list of links. They get a named recommendation with a reason. The business that gets named didn't get there by accident. They got there because the right signals were in place.</p>
        <p>An AEO agency's job is to build and fix those signals: structured data, citation strength, content clarity, crawler accessibility, entity authority. When those are right, AI engines recommend you. When they're wrong or missing, they recommend your competitor.</p>
        <div className="my-8 rounded-xl p-6 border-l-4" style={{ backgroundColor: '#FEFDF8', borderColor: '#C6A62C' }}>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Sidenote</p>
          <p className="text-gray-700 leading-relaxed">AEO is different from traditional SEO. SEO targets rankings on Google's search results page. AEO targets the data layer those AI engines pull from when generating recommendations. The overlap is real, but the optimization priorities are different — and so are the results.</p>
        </div>
      </>
    ),
  },
  {
    num: '02',
    id: 'why-agencies-stop-short',
    heading: 'Why Most AEO Agencies Stop Short',
    content: (
      <>
        <p>The AEO agency market has exploded in the last 18 months. Most of the agencies that entered it come from an SEO background. They know how to audit citation signals, fix schema markup, and improve how your content is indexed by AI crawlers.</p>
        <p>That's valuable. But it's half the job.</p>
        <p><strong>Visibility without pipeline is a vanity metric.</strong> If an AI engine starts recommending your business and the inbound inquiry hits a dead contact form, a voicemail nobody checks, or a follow-up sequence that fires three days later — you didn't win a lead. You let one walk.</p>
        <p>The agencies charging $3,000–$10,000/month for AEO programs are optimizing your citations. They are not building the system that captures, qualifies, and closes what those citations generate. That gap is where most of the money gets lost.</p>
        <div className="my-8 rounded-xl p-6" style={{ backgroundColor: '#F8F8FF', border: '1px solid rgba(99,102,241,0.15)' }}>
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#6366f1' }}>What a standard AEO agency delivers</p>
          <ul className="space-y-2 text-gray-700">
            {['AI citation audit', 'Structured data fixes', 'Content optimization', 'Monthly reporting on citation frequency'].map(item => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm font-bold uppercase tracking-widest mt-5 mb-3" style={{ color: '#C6A62C' }}>What Nxt Apex AI delivers on top of that</p>
          <ul className="space-y-2 text-gray-700">
            {['AI citation audit + pipeline audit', 'Structured data fixes + CRM integration', 'Content optimization + lead capture setup', 'Monthly reporting on citation frequency + closed revenue'].map(item => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#C6A62C' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </>
    ),
  },
  {
    num: '03',
    id: 'how-we-close-the-loop',
    heading: 'How Nxt Apex Closes the Loop',
    content: (
      <>
        <p>The CILAS framework — Context, Inputs, Logic, Automation, System — is how Nxt Apex AI builds AI infrastructure for businesses. Applied to AEO, it means we don't just fix how you appear in AI search. We build the full system that converts that appearance into revenue.</p>
        <p>Here's how that plays out in practice:</p>
        <div className="my-8 space-y-4">
          {[
            { step: '1', label: 'Audit', desc: 'We run your domain through a six-category AI Visibility Score: crawler access, structured data, content clarity, citation strength, local authority, and AI readiness. You get a clear picture of exactly where you stand and who is outranking you in AI search.' },
            { step: '2', label: 'Fix', desc: 'We implement the fixes: schema markup, robots.txt corrections, llms.txt, content restructuring, FAQ optimization, citation cleanup. The goal is to make your business the obvious answer when AI engines are asked about your category.' },
            { step: '3', label: 'Connect', desc: 'We wire AI-referred leads into your pipeline. That means intake forms, CRM connections, follow-up sequences, and response speed — all tuned for the buyer who already trusts you because an AI recommended you. These leads convert differently. The system needs to be built for them.' },
            { step: '4', label: 'Compound', desc: 'Unlike paid ads, AI visibility compounds. Every piece of structured content, every citation signal, every schema fix you build today keeps paying off. We track citation frequency, monitor competitors, and optimize continuously.' },
          ].map(({ step, label, desc }) => (
            <div key={step} className="flex gap-5 p-6 rounded-xl" style={{ backgroundColor: '#FAFAF8', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm" style={{ backgroundColor: '#C6A62C' }}>{step}</div>
              <div>
                <p className="font-bold text-gray-900 mb-1">{label}</p>
                <p className="text-gray-600 leading-relaxed text-[15px]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    num: '04',
    id: 'what-ai-engines-look-for',
    heading: 'What AI Engines Actually Look For',
    content: (
      <>
        <p>AI engines don't rank pages. They pull from a data layer built from everything they've crawled, indexed, and been trained on. To show up in that layer, six signals matter most:</p>
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Crawler Access', desc: 'GPTBot, ClaudeBot, and PerplexityBot need to be able to read your site. Robots.txt misconfigurations and missing llms.txt files block them silently.' },
            { label: 'Structured Data', desc: 'Schema markup tells AI engines exactly who you are, what you do, where you operate, and how to contact you. Without it, they guess — and guessing produces inconsistent citations.' },
            { label: 'Content Clarity', desc: 'AI engines favor content that directly answers questions. Short paragraphs, clear headings, FAQ sections, and answer-first writing all improve citation frequency.' },
            { label: 'Citation Strength', desc: 'How consistently your business name, address, phone number, and service descriptions appear across the web. Inconsistency creates doubt. Doubt means you don\'t get recommended.' },
            { label: 'Local Authority', desc: 'For local businesses, proximity and market-specific signals matter. Review volume, local directory presence, and geographic content all feed into local AI recommendations.' },
            { label: 'AI Readiness', desc: 'Technical indicators: page speed, mobile rendering, canonical tags, entity definitions, and knowledge graph presence. These are the infrastructure layer everything else builds on.' },
          ].map(({ label, desc }) => (
            <div key={label} className="p-5 rounded-xl" style={{ backgroundColor: '#080D1C', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="font-bold text-white mb-2 text-[15px]">{label}</p>
              <p className="text-white/50 text-[13px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="my-8 rounded-xl p-6 border-l-4" style={{ backgroundColor: '#FEFDF8', borderColor: '#C6A62C' }}>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Key point</p>
          <p className="text-gray-700 leading-relaxed">You don't need to fix all six at once. Most businesses have two or three critical gaps that account for the majority of their AI invisibility. The audit identifies them. The fix is usually faster than expected.</p>
        </div>
      </>
    ),
  },
  {
    num: '05',
    id: 'industries',
    heading: 'Industries We Serve',
    content: (
      <>
        <p>AI search visibility plays out differently across industries. The questions buyers ask, the signals AI engines weight, and the pipeline mechanics that convert AI-referred leads all vary by category. We've built vertical-specific programs for:</p>
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: 'Real Estate', slug: 'aeo-for-real-estate', line: 'Buyers find agents through AI before they open a browser.' },
            { name: 'Home Services', slug: 'aeo-for-home-services', line: 'Homeowners ask AI for service recommendations before they call.' },
            { name: 'Medical Practices', slug: 'aeo-for-medical', line: 'Patients vet providers through AI engines before they book.' },
            { name: 'Dental Practices', slug: 'aeo-for-dental', line: 'New patients search AI the same way they used to search Google.' },
            { name: 'Law Firms', slug: 'aeo-for-law-firms', line: 'Potential clients ask AI to recommend attorneys before they search.' },
            { name: 'Insurance Agencies', slug: 'aeo-for-insurance', line: 'Buyers ask AI to compare and recommend agents before they shop.' },
            { name: 'Medical Spas', slug: 'aeo-for-med-spa', line: 'Aesthetic clients find med spas through AI before they book.' },
          ].map(({ name, slug, line }) => (
            <Link key={slug} href={`/${slug}`} className="group flex items-center justify-between p-5 rounded-xl transition-all duration-200 hover:-translate-y-0.5" style={{ backgroundColor: '#FAFAF8', border: '1px solid rgba(0,0,0,0.07)' }}>
              <div>
                <p className="font-bold text-gray-900 text-[15px] mb-1">{name}</p>
                <p className="text-gray-500 text-[13px]">{line}</p>
              </div>
              <span className="text-gray-300 group-hover:text-[#C6A62C] transition-colors duration-200 flex-shrink-0 ml-4">→</span>
            </Link>
          ))}
        </div>
      </>
    ),
  },
  {
    num: '06',
    id: 'what-you-get',
    heading: 'What You Get Working With Nxt Apex AI',
    content: (
      <>
        <p>Every engagement starts with a free AI Visibility Report. From there, implementation depends on where your gaps are — but the deliverables are consistent:</p>
        <div className="my-8 space-y-3">
          {[
            { label: 'AI Visibility Report', desc: 'Six-category audit of your current AI search presence. Delivered by email, no sales call required.' },
            { label: 'Competitor Citation Analysis', desc: 'Who is showing up in AI recommendations in your market, what signals they have that you don\'t, and exactly what it takes to displace them.' },
            { label: 'Technical Implementation', desc: 'Schema markup, structured data, llms.txt, robots.txt, content restructuring — all done for you. Not a report telling you what to do. Done.' },
            { label: 'Pipeline Connection', desc: 'Your new AI-referred leads need to land somewhere. We build or connect the intake, CRM, and follow-up so nothing falls through.' },
            { label: 'Ongoing Optimization', desc: 'AI citation patterns shift. We monitor your presence across ChatGPT, Perplexity, and Google AI Overviews monthly and adjust.' },
          ].map(({ label, desc }, i) => (
            <div key={label} className="flex gap-4 p-5 rounded-xl" style={{ backgroundColor: '#FAFAF8', border: '1px solid rgba(0,0,0,0.06)' }}>
              <span className="text-[13px] font-bold mt-0.5 flex-shrink-0" style={{ color: '#C6A62C' }}>0{i + 1}</span>
              <div>
                <p className="font-bold text-gray-900 mb-1">{label}</p>
                <p className="text-gray-500 text-[14px] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

const FAQS = [
  { q: 'How is AEO different from SEO?', a: 'SEO targets rankings on Google\'s traditional search results page. AEO targets the data layer that AI engines pull from when generating recommendations. They overlap — good SEO helps AEO — but the optimization priorities are different. AEO focuses on structured data, entity clarity, FAQ content, and citation signals that influence AI-generated answers, not just page rankings.' },
  { q: 'How long does it take to show up in AI search?', a: 'Structural fixes like schema markup and crawler access corrections typically take effect within a few weeks of a crawler visit. Content and citation improvements compound over 60 to 90 days. Most clients see measurable improvement in AI citation frequency within a quarter.' },
  { q: 'Do I need to be a large company to benefit from AEO?', a: 'No. Local and regional businesses are the biggest opportunity in AEO right now. Enterprise brands are already fighting for visibility. Most small and mid-size businesses have almost no AI presence at all — which means the gap to close is smaller and the competitive advantage of closing it first is larger.' },
  { q: 'What does the free AI Visibility Report include?', a: 'The report audits your domain across six categories: AI crawler access, structured data completeness, content clarity, citation strength, local authority signals, and overall AI readiness. It shows you your score in each category, who is outranking you in AI search in your market, and the highest-impact fixes.' },
  { q: 'Does this replace our current marketing?', a: 'No. AI visibility feeds the top of your pipeline alongside your existing channels. We connect AI-referred leads to the same pipeline your other marketing feeds. It works with what you\'re already doing — not instead of it.' },
];

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AEOAgencyPage({ schema }) {
  const [openFaq, setOpenFaq] = useState(null);
  const { openModal } = useBooking();

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 px-6" style={{ backgroundColor: '#060A18' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(198,166,44,0.12)', color: '#C6A62C', border: '1px solid rgba(198,166,44,0.25)' }}>
                AEO Agency
              </span>
              <span className="text-white/25 text-[12px]">By Sean Conerly, Nxt Apex AI</span>
            </div>
            <h1 className="text-white font-extrabold leading-tight mb-6" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              AEO Agency That Connects AI Visibility to Your Sales Pipeline
            </h1>
            <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-2xl">
              Most AEO agencies stop at citations. We fix your AI search presence and wire new leads directly into a pipeline built to close them.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-[13px] text-white/30">
              <span>10 min read</span>
              <span>·</span>
              <span>Updated July 2026</span>
              <span>·</span>
              <span>Covers: ChatGPT · Perplexity · Google AI Overviews</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">

          {/* Key Findings */}
          <FadeUp>
            <div className="rounded-2xl p-8 mb-14" style={{ backgroundColor: '#080D1C', border: '1px solid rgba(198,166,44,0.2)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: '#C6A62C' }} />
                <p className="text-white font-bold text-[15px] tracking-wide">Key Findings</p>
              </div>
              <ul className="space-y-4">
                {KEY_FINDINGS.map((finding, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-[11px] font-bold mt-0.5 flex-shrink-0 w-5" style={{ color: '#C6A62C' }}>0{i + 1}</span>
                    <p className="text-white/70 text-[15px] leading-relaxed">{finding}</p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* Sections */}
          <div className="space-y-20">
            {SECTIONS.map((section, i) => (
              <FadeUp key={section.id} delay={0.05}>
                <div id={section.id}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[11px] font-black tracking-[0.14em]" style={{ color: '#C6A62C' }}>{section.num}</span>
                    <div className="h-px flex-1" style={{ backgroundColor: 'rgba(0,0,0,0.08)' }} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
                    {section.heading}
                  </h2>
                  <div className="prose prose-gray max-w-none [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-5 [&_p]:text-[16px] [&_strong]:text-gray-900 [&_em]:text-gray-700">
                    {section.content}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* FAQ */}
          <FadeUp className="mt-20">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[11px] font-black tracking-[0.14em]" style={{ color: '#C6A62C' }}>07</span>
              <div className="h-px flex-1" style={{ backgroundColor: 'rgba(0,0,0,0.08)' }} />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(0,0,0,0.07)' }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                    style={{ backgroundColor: openFaq === i ? '#FAFAF8' : 'white' }}
                  >
                    <span className="font-semibold text-gray-900 pr-8 text-[15px]">{faq.q}</span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200" style={{ backgroundColor: 'rgba(198,166,44,0.1)', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1v8M1 5h8" stroke="#C6A62C" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: EASE }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="px-6 pb-6 text-gray-500 leading-relaxed text-[15px]">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* CTA */}
          <FadeUp className="mt-20">
            <div className="rounded-2xl p-10 text-center" style={{ backgroundColor: '#060A18' }}>
              <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest mb-4">Ready to see where you stand?</p>
              <h2 className="text-white text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
                Find out if AI engines are recommending your business.
              </h2>
              <p className="text-white/45 text-[15px] max-w-lg mx-auto mb-8 leading-relaxed">
                Free AI Visibility Report. We audit your domain, score it across six categories, and show you exactly who is beating you in AI search right now.
              </p>
              <button
                onClick={openModal}
                className="inline-flex items-center px-8 py-4 rounded-xl text-white font-bold text-[15px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                style={{ backgroundColor: '#C6A62C', boxShadow: '0 4px 20px rgba(198,166,44,0.3)' }}
              >
                Book a Free Strategy Call →
              </button>
              <p className="mt-4 text-white/25 text-sm">No pitch. No obligation. Just your report and a real conversation.</p>
            </div>
          </FadeUp>

        </div>
      </div>

      <Footer />
    </>
  );
}
