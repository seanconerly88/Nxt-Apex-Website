import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Nxt Apex AI — Equip Your Team. Drive Revenue.',
  description:
    'We assess your business, identify every AI opportunity, and train your team on Claude Cowork and OpenAI for Business — so everyone stops managing tools and starts driving revenue.',
  icons: {
    icon: '/og-logo.png',
    apple: '/og-logo.png',
  },
  openGraph: {
    title: 'Stop learning AI. Start solving with it.',
    description: 'Find where AI fits in your business. Then put it to work.',
    siteName: 'Nxt Apex AI',
    images: [
      {
        url: '/og-logo.png',
        width: 500,
        height: 500,
        alt: 'Nxt Apex AI',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
