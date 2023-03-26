const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.frogx3.com',
        port: '443',
        pathname: '/wp-content/uploads/**',
      },
    ],
    domains: ['www.frogx3.com'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});
