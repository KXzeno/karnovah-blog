import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.buymeacoffee.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
      }
    ]
  }
};

export default nextConfig;
