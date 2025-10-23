/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel için static export kaldırıldı
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig

