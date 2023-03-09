const { withFaust } = require('@faustjs/next');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust();


  const withPWA = require('next-pwa')({
    dest: 'public'
  })
  
  module.exports = withPWA({
    optimizeImages: false,
      images: {
        domains: ['localhost:10004'],
      },
      eslint: {
        ignoreDuringBuilds: true,
      }
    })
  