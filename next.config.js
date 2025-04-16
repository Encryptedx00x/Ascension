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
    unoptimized: process.env.NODE_ENV === 'production',
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
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      if (process.env.NETLIFY) {
        console.log('Configurando para ambiente Netlify...');
      }
    }
    
    return config;
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL || 'file:./prisma/data.db',
    JWT_SECRET: process.env.JWT_SECRET || 'ascension-website-jwt-secret-2024',
  }
};

module.exports = nextConfig; 