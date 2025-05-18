import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/my-portfolio",
  assetPrefix: "/my-portfolio/",
  trailingSlash: true,
};

export default nextConfig;
