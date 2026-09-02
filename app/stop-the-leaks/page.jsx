import StopTheLeaksPage from '@/components/StopTheLeaksPage';

const SITE_URL = 'https://nxtapexai.com';

export const metadata = {
  title: 'Stop Losing the Leads You Already Have | Nxt Apex AI',
  description: 'You do not need more leads. You need to stop losing the ones you have. Answer three questions and find out where your revenue is leaking.',
  alternates: { canonical: `${SITE_URL}/stop-the-leaks` },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Stop Losing the Leads You Already Have',
    description: 'Six AI agents close the six places your leads, calls, and quotes go quiet.',
    url: `${SITE_URL}/stop-the-leaks`,
    type: 'website',
  },
};

export default function Page() {
  return <StopTheLeaksPage />;
}
