/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Mark these packages as server-only (works for both webpack and Turbopack)
  serverExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],

  // Turbopack config (Next.js 16+)
  turbopack: {},

  // Webpack config for backwards compatibility (Next.js 15 and below)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude puppeteer and chromium from client-side bundle
      config.resolve.alias = {
        ...config.resolve.alias,
        'puppeteer-core': false,
        'puppeteer': false,
        '@sparticuz/chromium': false,
      };
    }
    return config;
  },
};

export default nextConfig;
