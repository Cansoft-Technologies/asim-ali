const { withFaust } = require('@faustjs/next');
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

/**
 * @type {import('next').NextConfig}
 **/

const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = {
  images: {
    domains: ['example.com'],
    loader: 'imgix',
    path: 'https://example.com/_next/image',
  },
  async headers() {
    return [
      {
        // Define the cache policy for static assets
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};



module.exports = withFaust (withPWA( withPlugins(
    [[optimizedImages]], 
    nextConfig
    ),
  {
  optimizeImages: false,
    images: {
      domains: ['hy3nzzcq6pe8xlv2r634wluzm.js.wpenginepowered.com'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
}));









