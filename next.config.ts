import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/indexarch",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
