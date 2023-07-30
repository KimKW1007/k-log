/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "*"],
  },
  // reactStrictMode: false,
  swcMinify: true,
}

module.exports = nextConfig
