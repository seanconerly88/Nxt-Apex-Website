'use client';

// slug: null = text-only (not available on SimpleIcons)
const platforms = [
  { name: 'GoHighLevel',      slug: null },
  { name: 'Zapier',           slug: 'zapier' },
  { name: 'Make',             slug: 'make' },
  { name: 'Slack',            slug: 'slack' },
  { name: 'Notion',           slug: 'notion' },
  { name: 'ClickUp',          slug: 'clickup' },
  { name: 'Google Workspace', slug: 'googleworkspace' },
  { name: 'OpenAI',           slug: 'openai' },
  { name: 'Anthropic',        slug: 'anthropic' },
  { name: 'Canva',            slug: 'canva' },
  { name: 'Instantly',        slug: null },
  { name: 'Zoom',             slug: 'zoom' },
  { name: 'Loom',             slug: 'loom' },
  { name: 'Outlook',          slug: 'microsoftoutlook' },
  { name: 'QuickBooks',       slug: 'quickbooks' },
  { name: 'Stripe',           slug: 'stripe' },
  { name: 'Asana',            slug: 'asana' },
  { name: 'Salesforce',       slug: 'salesforce' },
  { name: 'Shopify',          slug: 'shopify' },
  { name: 'HubSpot',          slug: 'hubspot' },
  { name: 'Telegram',         slug: 'telegram' },
  { name: 'Discord',          slug: 'discord' },
  { name: 'Microsoft Teams',  slug: 'microsoftteams' },
];

const doubled = [...platforms, ...platforms];

function PlatformItem({ platform }) {
  return (
    <div className="flex items-center gap-2.5 flex-shrink-0 px-7">
      {platform.slug && (
        <img
          src={`https://cdn.simpleicons.org/${platform.slug}/1a1a1a`}
          alt=""
          style={{
            width: '18px',
            height: '18px',
            objectFit: 'contain',
            opacity: 0.35,
            display: 'inline-block',
          }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}
      <span
        className="text-sm font-semibold whitespace-nowrap"
        style={{ color: 'rgba(26,26,26,0.4)', letterSpacing: '0.01em' }}
      >
        {platform.name}
      </span>
      <span style={{ color: 'rgba(198,166,44,0.4)', marginLeft: '12px', fontSize: '16px', lineHeight: 1 }}>
        ·
      </span>
    </div>
  );
}

export default function PlatformTicker() {
  return (
    <section style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid rgba(0,0,0,0.06)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
    }}>
      {/* Label */}
      <p
        className="text-center pt-6 pb-4"
        style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(0,0,0,0.25)', letterSpacing: '0.18em', textTransform: 'uppercase' }}
      >
        Platforms We Work With
      </p>

      {/* Scrolling track */}
      <div
        className="relative w-full overflow-hidden pb-6"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        }}
      >
        <div
          className="flex items-center animate-scroll-ticker"
          style={{ width: 'fit-content' }}
        >
          {doubled.map((platform, i) => (
            <PlatformItem key={`${platform.name}-${i}`} platform={platform} />
          ))}
        </div>
      </div>
    </section>
  );
}
