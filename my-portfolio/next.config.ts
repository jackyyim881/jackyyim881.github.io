import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";
const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "",
  assetPrefix: "/",

  images: {
    unoptimized: true,
  },
  // The trailingSlash option helps with path resolution in static exports
  trailingSlash: true,
  // Make sure PostCSS (which Tailwind uses) runs properly
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
