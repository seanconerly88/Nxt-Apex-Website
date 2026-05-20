import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Nxt Apex AI — Train Your Team. Multiply Output.',
  description:
    'We assess your business, identify every AI opportunity, and train your team on Claude Cowork and OpenAI for Business — so AI actually gets used.',
  openGraph: {
    title: 'Nxt Apex AI',
    description: 'Find where AI fits in your business. Then put it to work.',
    siteName: 'Nxt Apex AI',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
