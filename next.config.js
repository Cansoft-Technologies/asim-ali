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
      domains: ['asimali.ca'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
}));


