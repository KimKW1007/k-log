/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", `sel3.cloudtype.app`, "*"],
    minimumCacheTTL: 60,
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
}

module.exports = nextConfig
