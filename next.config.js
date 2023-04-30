const { withFaust } = require('@faustjs/next');

/**
 * @type {import('next').NextConfig}
 **/

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withFaust (withPWA({
  optimizeImages: false,
    images: {
      domains: ['hy3nzzcq6pe8xlv2r634wluzm.js.wpenginepowered.com'],
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        require("./scripts/sitemap-generator");
      }
      return config;
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
}));


