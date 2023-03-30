const { withFaust } = require('@faustjs/next');

/**
 * @type {import('next').NextConfig}
 **/

const withPWA = require('next-pwa');

module.exports = withFaust (withPWA({
  pwa: {
    dest: "public",
  },
  optimizeImages: false,
    images: {
      domains: ['hy3nzzcq6pe8xlv2r634wluzm.js.wpenginepowered.com'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
}));


