import ClientLayout from '@/components/ClientLayout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SITE_URL = 'https://nxtapexai.com';

export const metadata = {
  title: 'FAQ | Nxt Apex AI — AI Consulting & Implementation',
  description: 'Answers to common questions about Nxt Apex AI, AI readiness assessments, the CILAS framework, pricing, and how Sean Conerly helps businesses implement AI.',
  alternates: { canonical: `${SITE_URL}/faq` },
};

const FAQ_ITEMS = [
  {
    q: 'What is Nxt Apex AI?',
    a: 'Nxt Apex AI is an AI consulting firm founded by Sean Conerly that helps businesses implement artificial intelligence in their day-to-day operations. The firm specializes in AI readiness assessments, custom implementation strategies, and hands-on team training using the proprietary CILAS framework. Nxt Apex AI works with agencies, professional services firms, SaaS companies, and growing businesses across the United States.',
  },
  {
    q: 'Who is Sean Conerly?',
    a: 'Sean Conerly is the founder and lead AI strategist at Nxt Apex AI. He is an MIT-trained strategist specializing in AI infrastructure and business automation. Sean has helped agencies, SaaS companies, and professional services firms implement AI systems that eliminate manual work and drive measurable revenue. He is a LinkedIn educator on practical AI implementation for business owners.',
  },
  {
    q: 'What is the CILAS framework?',
    a: 'The CILAS framework is a proprietary AI infrastructure methodology developed by Nxt Apex AI. CILAS stands for Context, Inputs, Logic, Automation, and System — the five layers that every AI-powered business operation requires. It provides a structured approach to connecting existing tools, automating repetitive workflows, and generating measurable business outcomes without requiring new software purchases.',
  },
  {
    q: 'What is an AI readiness assessment?',
    a: 'An AI readiness assessment is a structured discovery session where Nxt Apex AI evaluates a business\'s current tools, workflows, team structure, and operational bottlenecks. The assessment surfaces every AI opportunity hiding in the business and produces a prioritized implementation roadmap. A full written report is delivered within 48 hours. A free online AI readiness scan is also available at nxtapexai.com.',
  },
  {
    q: 'What is the AI Readiness Report?',
    a: 'The AI Readiness Report is a personalized document produced by Nxt Apex AI after completing the online assessment. It identifies two to three specific AI opportunities based on the business\'s type, existing tools, current AI usage, and primary operational pain point. Each opportunity includes a concrete revenue or time-saving outcome and an action the business can take this week using tools it already owns.',
  },
  {
    q: 'How much does AI consulting cost at Nxt Apex AI?',
    a: 'Nxt Apex AI offers white-glove consulting engagements typically ranging from $20,000 to $30,000. These are full-service retainer arrangements that include the initial assessment, custom strategy development, hands-on implementation, and ongoing team training. A free 30-minute strategy call is available to determine fit before any engagement begins. Book at nxtapexai.com.',
  },
  {
    q: 'What businesses does Nxt Apex AI work with?',
    a: 'Nxt Apex AI works with small to mid-size businesses across multiple industries including agencies, SaaS companies, professional services, consulting firms, e-commerce, healthcare, real estate, financial services, and legal practices. The typical client has a team between 5 and 100 people, uses tools like HubSpot, Salesforce, or GoHighLevel, and wants to reduce manual work and increase revenue without replacing staff.',
  },
  {
    q: 'What AI tools does Nxt Apex AI work with?',
    a: 'Nxt Apex AI works across the major AI platforms including Claude (Anthropic), ChatGPT (OpenAI), Google Gemini, Grok, and Perplexity. The firm also integrates AI with business tools including HubSpot, Salesforce, GoHighLevel, Slack, Notion, Airtable, QuickBooks, Stripe, Shopify, Klaviyo, ActiveCampaign, and more. Training and implementation are tailored to the specific stack the client already uses.',
  },
  {
    q: 'How long does it take to implement AI in a business?',
    a: 'Most Nxt Apex AI clients see their first working AI automation deployed within one to two weeks of the initial assessment. Full team training and system implementation typically takes four to eight weeks depending on the size and complexity of the business. The firm\'s goal is to have every team member actively using AI for their specific role by the end of the engagement.',
  },
  {
    q: 'How is Nxt Apex AI different from other AI consultants?',
    a: 'Nxt Apex AI focuses exclusively on practical implementation, not theory or generic training. Every engagement starts with a business-specific assessment rather than an off-the-shelf playbook. The CILAS framework maps AI to the client\'s existing tools, which means clients do not need to buy new software to see results. Sean Conerly works directly with each client\'s team rather than handing off to junior staff.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ClientLayout>
        <main>
          <Navbar />

          {/* Header */}
          <section style={{ background: '#060A18' }} className="pt-32 pb-16 px-6">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A62C]" style={{ boxShadow: '0 0 6px rgba(198,166,44,0.9)' }} />
                <span className="text-[11px] font-bold text-white/40 tracking-[0.15em] uppercase">Common Questions</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-white/45 text-lg leading-relaxed max-w-xl">
                Everything you need to know about Nxt Apex AI, our process, and how we help businesses put AI to work.
              </p>
            </div>
          </section>

          {/* FAQ list */}
          <section style={{ background: '#080D1C' }} className="py-16 px-6">
            <div className="max-w-3xl mx-auto space-y-0">
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="border-b py-8"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <h2 className="text-white font-bold text-lg mb-3 leading-snug">
                    {item.q}
                  </h2>
                  <p className="text-white/55 leading-relaxed text-[15px]">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: '#060A18', borderColor: 'rgba(255,255,255,0.06)' }} className="py-20 px-6 text-center border-t">
            <p className="text-white/35 text-sm mb-4 uppercase tracking-widest font-semibold">Ready to start?</p>
            <h2 className="text-white text-3xl font-extrabold mb-6">
              Book a free 30-minute strategy call.
            </h2>
            <a
              href="https://api.leadconnectorhq.com/widget/booking/nxtapexai"
              className="inline-block px-8 py-4 rounded-xl font-bold text-black text-base transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: '#C6A62C', boxShadow: '0 6px 28px rgba(198,166,44,0.35)' }}
            >
              Book Your Strategy Call →
            </a>
            <p className="mt-4 text-white/25 text-sm">No pitch. No obligation. We walk through your business together.</p>
          </section>

          <Footer />
        </main>
      </ClientLayout>
    </>
  );
}
