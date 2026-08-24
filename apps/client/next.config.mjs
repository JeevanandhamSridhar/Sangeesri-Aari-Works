/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/gallery/admin',
        destination: 'http://localhost:3001/gallery',
        permanent: false,
      },
      {
        source: '/admin',
        destination: 'http://localhost:3001/gallery',
        permanent: false,
      },
      {
        source: '/admin/gallery',
        destination: 'http://localhost:3001/gallery',
        permanent: false,
      },
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig


