/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
