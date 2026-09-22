/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['gsap', 'split-type', 'lenis', '@gsap/react'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;

