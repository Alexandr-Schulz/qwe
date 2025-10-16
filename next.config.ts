import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Подсказка Turbopack, чтобы не путался из‑за внешних lockfile
  experimental: {
    turbopack: {
      root: __dirname,
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "bcalabs.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
