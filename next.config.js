const { withFaust } = require('@faustjs/next');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust();
const withOptimizedImages = require('next-optimized-images')

module.exports = {
    images: {
      domains: ['localhost:10004'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
  }



module.exports = withOptimizedImages({})
