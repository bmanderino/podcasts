/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.simplecastcdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.art19.com',
      },
    ],
  },
}

module.exports = nextConfig


