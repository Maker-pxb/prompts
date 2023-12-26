/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com'
      },
      {
        hostname: 'avatars.githubusercontent.com'
      }
    ]
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true
    }
    return config
  }
}

module.exports = nextConfig
