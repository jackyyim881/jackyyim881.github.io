/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Adjust basePath if your GitHub Pages site is published at a subpath
  basePath: "/my-portfolio",
  assetPrefix: "/my-portfolio/",
  trailingSlash: true,
};

module.exports = nextConfig;
