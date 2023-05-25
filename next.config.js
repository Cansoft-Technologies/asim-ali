const { withFaust } = require('@faustjs/next');
const withOffline = require('next-offline');


/**
 * @type {import('next').NextConfig}
 **/

const withPWA = require('next-pwa')({
  dest: 'public'
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






