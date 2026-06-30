const SITE_URL = 'https://nxtapexai.com';

export default function sitemap() {
  return [
    { url: SITE_URL,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/faq`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/reviews`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  ];
}
