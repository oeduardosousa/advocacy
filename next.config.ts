import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export (BRIEF.md): one HTML file per route, output in ./out
  output: "export",
  trailingSlash: true,
  images: {
    // No image server in a static export: images are optimized offline (npm run images)
    // into AVIF/WebP at fixed widths and resolved by a custom loader (DESIGN.md "Imagery").
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 800, 1200, 1600],
    imageSizes: [],
  },
  reactStrictMode: true,
};

export default nextConfig;
