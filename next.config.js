const { withFaust } = require('@faustjs/next');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust();

const withPWA = require('next-pwa')({
  dest: 'public'
})
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/]
  },
  optimizeImages: false,
    images: {
      domains: ['hy3nzzcq6pe8xlv2r634wluzm.js.wpenginepowered.com'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
});


