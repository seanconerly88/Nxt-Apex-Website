'use client';

import { useState } from 'react';

const platforms = [
  { name: 'GoHighLevel',      slug: 'gohighlevel' },
  { name: 'Zapier',           slug: 'zapier' },
  { name: 'Make',             slug: 'make' },
  { name: 'Slack',            slug: 'slack' },
  { name: 'Notion',           slug: 'notion' },
  { name: 'ClickUp',          slug: 'clickup' },
  { name: 'Google Workspace', slug: 'googleworkspace' },
  { name: 'OpenAI',           slug: 'openai' },
  { name: 'Anthropic',        slug: 'anthropic' },
  { name: 'Canva',            slug: 'canva' },
  { name: 'Instantly',        slug: 'instantly' },
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

// Duplicate for seamless infinite loop
const doubled = [...platforms, ...platforms];

function PlatformItem({ platform }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="flex items-center gap-2.5 flex-shrink-0 px-6">
      {!imgFailed ? (
        <img
          src={`https://cdn.simpleicons.org/${platform.slug}/ffffff`}
          alt={platform.name}
          width={20}
          height={20}
          onError={() => setImgFailed(true)}
          className="w-5 h-5 object-contain opacity-80"
        />
      ) : (
        // Fallback dot if icon doesn't exist on SimpleIcons
        <span className="w-2 h-2 rounded-full bg-[#C6A62C] flex-shrink-0" />
      )}
      <span className="text-sm font-medium text-white/70 whitespace-nowrap">
        {platform.name}
      </span>
      {/* Separator */}
      <span className="ml-4 text-white/15 text-lg select-none">·</span>
    </div>
  );
}

export default function PlatformTicker() {
  return (
    <section className="bg-[#111111] py-8 border-y border-white/5 overflow-hidden">
      {/* Eyebrow label */}
      <p className="text-center text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase mb-6">
        Platforms We Integrate With
      </p>

      {/* Ticker */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div
          className="flex animate-scroll-ticker"
          style={{ width: 'fit-content' }}
        >
          {doubled.map((platform, i) => (
            <PlatformItem key={`${platform.slug}-${i}`} platform={platform} />
          ))}
        </div>
      </div>
    </section>
  );
}
