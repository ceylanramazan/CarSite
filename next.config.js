/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/CarSite',
  assetPrefix: '/CarSite/',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig

