/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.1998.media',
        },
      ],
      allowFutureImage: true,
    },
  },
}

module.exports = nextConfig
