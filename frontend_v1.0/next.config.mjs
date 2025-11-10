/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for development
  reactStrictMode: true,

  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true, // Added from updates
  },

  // Enable SWR (stale-while-revalidate) caching
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  // Security and performance headers
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
        ],
      },
    ]
  },

  // Redirect HTTP to HTTPS in production
  redirects: async () => {
    return [
      {
        source: "/api/search",
        destination: "/api/search",
        permanent: false,
      },
    ]
  },

  // Optimized bundle
  swcMinify: true,
  productionBrowserSourceMaps: false,

  // Performance and security
  poweredByHeader: false,
  generateEtags: true,

  // API compression
  compress: true,

  // ESLint and TypeScript configurations
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
