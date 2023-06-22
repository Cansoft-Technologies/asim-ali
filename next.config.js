const { withFaust } = require('@faustjs/next');
const withOffline = require('next-offline');
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

module.exports = withBundleAnalyzer ( withOffline ( withFaust ( withPWA({
  optimizeImages: false,
    images: {
      domains: ['asimali.ca'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
}))) );






