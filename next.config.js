/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  async redirects() {
    return [
      {
        source: '/views/items/login',
        destination: '/',
        permanent: true,
        has: [
          {
            type: 'cookie',
            key: 'token',
            value: 'true',
          },
        ],
      },
    ]
  },

}

module.exports = nextConfig
