import type { NextConfig } from "next";

// GitHub Pages needs static export + repo basePath. Vercel doesn't.
// The GitHub Actions workflow opts in by setting GITHUB_PAGES=true.
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isPages ? "export" : undefined,
  basePath: isPages ? "/indexarch" : "",
  trailingSlash: true,
  // Always unoptimized — not just on Pages. With trailingSlash:true the
  // Next.js image optimizer endpoint (/_next/image?url=…) gets 308
  // redirected to /_next/image/?url=… in dev, which breaks next/image
  // loading (the PDF page images showed as broken locally). Production
  // already runs unoptimized for static export, so making dev match
  // means next/image always emits a plain <img> with a direct,
  // basePath-correct src — no optimizer, no 308, consistent behaviour.
  images: { unoptimized: true },
};

export default nextConfig;
