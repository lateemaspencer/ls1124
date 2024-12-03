import { type NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
