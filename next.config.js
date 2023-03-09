const { withFaust } = require('@faustjs/next');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust();


module.exports = {
  optimizeImages: false,
    images: {
      domains: ['localhost:10004'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
}
