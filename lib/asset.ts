// Prefix a public-folder asset path with the deployment basePath.
//
// On GitHub Pages the site is served under /indexarch, so a public
// asset like /kayu-kov/page-1.png actually lives at
// /indexarch/kayu-kov/page-1.png. next/image (and a plain <img>) do
// NOT auto-prefix basePath onto these src values, so without this
// helper the images 404 on the deployed site. Locally basePath is ""
// so asset() is a no-op.
//
// NEXT_PUBLIC_BASE_PATH is inlined at build time from next.config.ts
// (env block), mirroring the basePath value.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  // Guard against accidental double-prefix.
  if (BASE_PATH && path.startsWith(BASE_PATH + "/")) return path;
  return `${BASE_PATH}${path}`;
}
