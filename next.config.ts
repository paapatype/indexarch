import type { NextConfig } from "next";

// GitHub Pages needs static export + repo basePath. Vercel doesn't.
// The GitHub Actions workflow opts in by setting GITHUB_PAGES=true.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/indexarch" : "";

const nextConfig: NextConfig = {
  output: isPages ? "export" : undefined,
  basePath,
  // Exposed to the client (inlined at build) so components can prefix
  // public-folder asset URLs (e.g. /kayu-kov/page-1.png) with the
  // basePath. next/image does NOT auto-prefix basePath onto public
  // asset src, so on GitHub Pages those images 404'd ("/kayu-kov/…"
  // instead of "/indexarch/kayu-kov/…"). The asset() helper in
  // lib/asset.ts reads this. Empty string locally → no-op.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  // Always unoptimized — not just on Pages. With trailingSlash:true the
  // Next.js image optimizer endpoint (/_next/image?url=…) gets 308
  // redirected to /_next/image/?url=… in dev, which breaks next/image
  // loading (the PDF page images showed as broken locally). Production
  // already runs unoptimized for static export, so making dev match
  // means next/image always emits a plain <img> with a direct,
  // basePath-correct src — no optimizer, no 308, consistent behaviour.
  images: { unoptimized: true },

  // ── PostHog reverse proxy (Vercel only) ──────────────────────────────
  // Route analytics through our own domain so ad blockers that block
  // *.posthog.com (≈10–30% of visitors) don't silently drop events. The
  // browser talks to https://indexarch.com/ingest/* (first-party, not
  // blocked); Vercel's edge transparently proxies to PostHog EU.
  //   • /ingest/static/* → eu-assets CDN  (surveys.js, recorder.js, …)
  //   • /ingest/*        → eu.i.posthog.com (events /e/, /flags, and the
  //                         /array/<token>/config.js remote config)
  // PostHogProvider sets api_host:"/ingest" to match (Vercel build only).
  //
  // Gated to NON-Pages builds: GitHub Pages is a static export with no
  // server, so rewrites can't run there (and Next warns if they're
  // present alongside output:"export"). On Pages, PostHogProvider falls
  // back to talking to PostHog EU directly.
  //
  // skipTrailingSlashRedirect: with our global trailingSlash:true, a
  // PostHog request to a slashless endpoint would 308-redirect; skipping
  // that keeps the proxied API requests intact (PostHog's documented
  // requirement). Scoped to Vercel so the Pages export is untouched.
  ...(isPages
    ? {}
    : {
        skipTrailingSlashRedirect: true,
        async rewrites() {
          return [
            {
              source: "/ingest/static/:path*",
              destination: "https://eu-assets.i.posthog.com/static/:path*",
            },
            {
              source: "/ingest/:path*",
              destination: "https://eu.i.posthog.com/:path*",
            },
          ];
        },
      }),
};

export default nextConfig;
