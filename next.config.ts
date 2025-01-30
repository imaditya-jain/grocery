import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

export default nextConfig;
