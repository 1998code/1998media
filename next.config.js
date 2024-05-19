/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.1998.media',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
