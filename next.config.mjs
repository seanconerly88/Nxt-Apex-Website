/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  async redirects() {
    return [
      { source: '/portfolio', destination: '/reviews', permanent: true },
    ];
  },
};

export default nextConfig;
