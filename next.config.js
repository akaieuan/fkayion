/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/demo/hitl-ai/components',
        destination: '/demo/hitl-ai',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
