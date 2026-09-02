const SITE_URL = 'https://nxtapexai.com';

export const metadata = {
  title: 'Privacy Policy | Nxt Apex AI',
  description: 'How Nxt Apex AI collects, uses, and protects information submitted through this site.',
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated September 2, 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">What we collect</h2>
            <p>
              When you fill out a form on this site — including name, business name, email, phone number, and answers
              to any qualifying questions — we collect that information to respond to your request and evaluate fit
              for our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">How we use it</h2>
            <p>
              We use the information you submit to contact you about the services you requested, to schedule calls,
              and to send relevant follow-up by email, text, or phone. We store this information in our CRM
              (GoHighLevel). We do not sell your information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Advertising</h2>
            <p>
              This site is used in connection with paid advertising, including Meta (Facebook/Instagram) ads. If you
              arrive here from an ad, standard ad-platform tracking (such as the Meta Pixel) may be used to measure
              ad performance. You can control ad preferences through your Meta account settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Your choices</h2>
            <p>
              You can ask us to delete your information or stop contacting you at any time by emailing{' '}
              <a href="mailto:sean@nxtapexai.com" className="font-semibold" style={{ color: '#C6A62C' }}>
                sean@nxtapexai.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
            <p>
              Nxt Apex AI · New Orleans, LA ·{' '}
              <a href="mailto:sean@nxtapexai.com" className="font-semibold" style={{ color: '#C6A62C' }}>
                sean@nxtapexai.com
              </a>{' '}
              · (504) 290-4780
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
