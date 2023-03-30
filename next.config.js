const withFaust = require('@faustjs/next');
const withPWA = require('next-pwa');

module.exports = withPWA (withFaust ({
  pwa: {
    dest: 'public',
  },
  optimizeImages: false,
    images: {
      domains: ['hy3nzzcq6pe8xlv2r634wluzm.js.wpenginepowered.com'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
}));


