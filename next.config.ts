import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    webpackMemoryOptimizations: true,
    serverSourceMaps: false,
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
