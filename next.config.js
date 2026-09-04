/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      '@react-three/drei',
    ],
  },
  async redirects() {
    return [
      {
        source: '/demo/hitl-ai/components',
        destination: '/demo/hitl-ai',
        permanent: true,
      },
      // The practice page was named after one thing it covers; it is now a
      // page about the person, so it is named after what it answers.
      {
        source: '/demo/hitl-practice',
        destination: '/demo/how-i-work',
        permanent: true,
      },
      // The pipeline write-up was named after the game; it is now named after
      // the thing it is about, and the game is the subject inside it.
      {
        source: '/demo/brooklyn-dead',
        destination: '/demo/blenderpipeline',
        permanent: true,
      },
    ]
  },
}

const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({ enabled: true })
    : (config) => config

module.exports = withBundleAnalyzer(nextConfig)
