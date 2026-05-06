import type { NextConfig } from "next";

// GitHub Pages needs static export + repo basePath. Vercel doesn't.
// The GitHub Actions workflow opts in by setting GITHUB_PAGES=true.
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isPages ? "export" : undefined,
  basePath: isPages ? "/indexarch" : "",
  trailingSlash: true,
  images: isPages ? { unoptimized: true } : undefined,
};

export default nextConfig;
