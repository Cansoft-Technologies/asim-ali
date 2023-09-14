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
  optimizeImages: true,
    images: {
      domains: ["localhost","asimaliprod.wpengine.com"],
      optimized: true,
      allowFutureImage: true,
    },
    async redirects() {
      return [
        {
          source: '/b-lender-mortgage-bc',
          destination: '/b-lender-bc-mortgage',
          permanent: true,
        },
        {
          source: '/refinance-your-mortgage-in-vancouver',
          destination: 'https://asimali.ca',
          permanent: true,
        },
        {
          source: '/best-mortgage-rates-in-vancouver',
          destination: 'https://asimali.ca',
          permanent: true,
        },
        {
          source: '/vancouver-empty-home-tax',
          destination: 'https://asimali.ca',
          permanent: true,
        },
      ]
    },
    async headers() {
      return [
        {
          source: "/:all*(svg|jpg|png|webp|jpeg)",
          locale: false,
          headers: [
            {
              key: "Cache-Control",
              value: 'public, max-age=9999999999, must-revalidate',
            },
          ],
        },
      ];
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
})));






