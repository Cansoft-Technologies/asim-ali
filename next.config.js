const { withFaust } = require('@faustjs/next');
const runtimeCaching = require("next-pwa/cache");
const prod = process.env.NODE_ENV === 'production'
/**
 * @type {import('next').NextConfig}
 **/

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: prod ? false : true,
  skipWaiting: true,
  runtimeCaching,
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer ( withFaust ( withPWA({
  optimizeImages: false,
    images: {
      domains: ["localhost","asimaliprod.wpengine.com"],
      optimized: true,
      allowFutureImage: true,
    },
    async headers() {
      return [
        {
          source: "/:all*(svg|jpg|png|webp)",
          locale: false,
          headers: [
            {
              key: "Cache-Control",
              value: "public, s-maxage=10, stale-while-revalidate=59",
            },
          ],
        },
      ];
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
})));






