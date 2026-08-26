import { CASE_STUDIES } from '@/lib/case-studies';

const SITE_URL = 'https://nxtapexai.com';

export default function sitemap() {
  return [
    { url: SITE_URL,                              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/case-studies`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...CASE_STUDIES.map(cs => ({
      url: `${SITE_URL}/case-studies/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    { url: `${SITE_URL}/faq`,                     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/aeo-services`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/aeo-for-real-estate`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/aeo-for-home-services`,   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/aeo-for-medical`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/aeo-for-dental`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/aeo-for-law-firms`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/aeo-for-insurance`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/aeo-for-med-spa`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/reviews`,                 lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  ];
}
