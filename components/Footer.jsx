export default function Footer() {
  const links = [
    { label: 'Process', href: '#process' },
    { label: 'Training', href: '#training' },
    { label: 'Assessment', href: '#assessment' },
    { label: '(504) 290-4780', href: 'tel:+15042904780' },
  ];

  return (
    <footer className="bg-[#111111] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#C6A62C] flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rounded-full" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">Nxt Apex</span>
          </a>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-gray-600">&copy; 2026 Nxt Apex AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
