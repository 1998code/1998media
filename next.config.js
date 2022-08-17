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
        {
          protocol: 'https',
          hostname: '**.apple-mapkit.com',
        },
        {
          protocol: 'https',
          hostname: '**.medium.com',
        },
      ],
      allowFutureImage: true,
    },
  },
}

module.exports = nextConfig
