/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "*"],
    minimumCacheTTL: 60,
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
