/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost', 
      'teste.com',
      'example.com',
      'placekitten.com',
      'picsum.photos',
      'images.unsplash.com',
      'via.placeholder.com',
      'loremflickr.com',
      'dummyimage.com',
      'raw.githubusercontent.com',
      'github.com',
      'media.giphy.com',
      'res.cloudinary.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/public/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
  experimental: {
    serverActions: true,
  }
};

module.exports = nextConfig; 