import Link from 'next/link';

const VERTICALS = [
  { label: 'AEO for Real Estate', href: '/aeo-for-real-estate' },
  { label: 'AEO for Home Services', href: '/aeo-for-home-services' },
  { label: 'AEO for Medical', href: '/aeo-for-medical' },
  { label: 'AEO for Dental', href: '/aeo-for-dental' },
  { label: 'AEO for Law Firms', href: '/aeo-for-law-firms' },
  { label: 'AEO for Insurance', href: '/aeo-for-insurance' },
  { label: 'AEO for Med Spa', href: '/aeo-for-med-spa' },
];

const LOOP_LINKS = [
  { label: 'Speed to Lead', href: '/speed-to-lead' },
  { label: 'AI Receptionist', href: '/ai-receptionist' },
  { label: 'Database Reactivation', href: '/database-reactivation' },
  { label: 'Website Manager', href: '/website-manager' },
  { label: 'Reputation Manager', href: '/reputation-manager' },
  { label: 'Pipeline Manager', href: '/pipeline-manager' },
];

const SERVICES = [
  { label: 'AI Readiness Assessment', href: '/' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'AEO Services', href: '/aeo-services' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Reviews', href: '/reviews' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#060A18', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <img src="/logo-trans-light.png" alt="Nxt Apex AI" className="h-8 w-auto" />
              <span className="text-white font-extrabold tracking-tight">Nxt Apex AI</span>
            </Link>
            <p className="text-white/35 text-[13px] leading-relaxed mb-5">
              AI consulting and implementation for service businesses. We find where you leak revenue and fix it.
            </p>
            <a
              href="tel:+15042904780"
              className="text-[13px] font-semibold transition-colors"
              style={{ color: '#C6A62C' }}
            >
              (504) 290-4780
            </a>
          </div>

          {/* Services */}
          <div>
            <p className="text-white/25 text-[11px] font-bold uppercase tracking-widest mb-4">Services</p>
            <ul className="space-y-2.5">
              {SERVICES.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/45 text-[13px] hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The Six Loops */}
          <div>
            <p className="text-white/25 text-[11px] font-bold uppercase tracking-widest mb-4">The Six Loops</p>
            <ul className="space-y-2.5">
              {LOOP_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/45 text-[13px] hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <p className="text-white/25 text-[11px] font-bold uppercase tracking-widest mb-4">Industries</p>
            <ul className="space-y-2.5">
              {VERTICALS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/45 text-[13px] hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Legal */}
          <div>
            <p className="text-white/25 text-[11px] font-bold uppercase tracking-widest mb-4">Company</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:sean@nxtapexai.com"
                  className="text-white/45 text-[13px] hover:text-white transition-colors duration-150"
                >
                  sean@nxtapexai.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/sean-conerly-49063054/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/45 text-[13px] hover:text-white transition-colors duration-150"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link href="/faq" className="text-white/45 text-[13px] hover:text-white transition-colors duration-150">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-white/45 text-[13px] hover:text-white transition-colors duration-150">
                  Client Reviews
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-white/20 text-[12px]">&copy; 2026 Nxt Apex AI. All rights reserved.</p>
          <p className="text-white/15 text-[11px]">New Orleans, LA · AI Consulting · CILAS Framework</p>
        </div>
      </div>
    </footer>
  );
}
