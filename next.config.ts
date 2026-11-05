import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export (BRIEF.md): one HTML file per route, output in ./out
  output: "export",
  trailingSlash: true,
  images: {
    // next/image optimization needs a server; images are optimized offline
    // and committed (AVIF/WebP), see DESIGN.md "Imagery".
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
