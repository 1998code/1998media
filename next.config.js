/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimize images from CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.1998.media',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compress output
  compress: true,

  // Optimize production bundle
  productionBrowserSourceMaps: false,

  // Optimize bundle analyzer
  poweredByHeader: false,

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@liveblocks/react', 'framer-motion', 'axios'],
  },

  async rewrites() {
    return [
      {
        source: '/blog/:path*',
        destination: 'https://blog.1998.media/:path*',
      },
    ];
  },
};

export default nextConfig;
