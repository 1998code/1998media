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

  // Cloudflare Pages requires specific image optimization settings or unoptimized images
  // if you are not using a specific loader. 
  // For Next.js on Cloudflare Pages (via @cloudflare/next-on-pages), images usually work with some config,
  // but standard Next.js Image Optimization API (sharp) isn't supported out of the box on Edge.
  // We'll keep it as is, but be aware.
  
  async rewrites() {
    return [
      {
        source: '/blog/:path*',
        destination: 'https://blog.1998.media/:path*',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml',
      },
    ];
  },
};

export default nextConfig;
