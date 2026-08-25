/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  async redirects() {
    return [
      { source: '/portfolio', destination: '/reviews', permanent: true },
      { source: '/ai-search', destination: '/aeo-services', permanent: true },
      { source: '/aeo-agency', destination: '/aeo-services', permanent: true },
    ];
  },
};

export default nextConfig;
