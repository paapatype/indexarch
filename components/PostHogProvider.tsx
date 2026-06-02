"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

// ─── PostHog analytics ───────────────────────────────────────────────
// PostHog project API key (phc_…). This is a *write-only ingest* key —
// it's designed to live in client code, so it's safe to commit. While
// empty, analytics stays completely off (no script, no events).
const POSTHOG_KEY = "phc_sDTxEoBar7GMdmtGseCaRcrADXYn8G5mM4WQFqGM8Ybu";

// This project lives in PostHog's EU Cloud (Region: "EU Cloud").
// Ingest host (US: "https://us.i.posthog.com", EU: "https://eu.i.posthog.com").
const POSTHOG_EU_INGEST = "https://eu.i.posthog.com";

// Where events are actually sent:
//   • Vercel (indexarch.com): "/ingest" — a first-party reverse proxy
//     (see next.config.ts rewrites) so ad blockers that block
//     *.posthog.com don't drop analytics.
//   • GitHub Pages (static export, basePath="/indexarch"): no server to
//     proxy, so we hit PostHog EU directly.
// NEXT_PUBLIC_BASE_PATH is "" on Vercel and "/indexarch" on Pages — it's
// the cleanest build-time signal for which target we're on.
const ON_PAGES = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").length > 0;
const POSTHOG_API_HOST = ON_PAGES ? POSTHOG_EU_INGEST : "/ingest";
// ui_host lets the PostHog toolbar / in-app links resolve to the real EU
// app when api_host is a relative proxy path.
const POSTHOG_UI_HOST = "https://eu.posthog.com";

const ENABLED = POSTHOG_KEY.length > 0;

// init-once guard (survives React strict-mode double effects in dev).
let initialized = false;

// Fire a custom conversion event. No-ops when analytics is off, so it's
// safe to call from anywhere without guarding.
export function track(event: string, props?: Record<string, unknown>) {
  if (!ENABLED || typeof window === "undefined") return;
  posthog.capture(event, props);
}

/**
 * Mounted once in the root layout. Initialises PostHog cookielessly
 * (persistence: "memory" → no cookies/localStorage identifier → no
 * consent banner needed) and captures a pageview on first load and on
 * every client-side route change (static export still soft-navigates
 * between / and /blog/*).
 *
 * Tradeoff of cookieless mode: returning visitors aren't recognised
 * across sessions, so "unique visitors" is approximate. To get accurate
 * uniques, switch `persistence` to "localStorage" (still not a cookie,
 * but stores an id — add a short privacy note if you do).
 */
export default function PostHogProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (!ENABLED || initialized || typeof window === "undefined") return;
    initialized = true;
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_API_HOST,
      ui_host: POSTHOG_UI_HOST,
      person_profiles: "identified_only",
      persistence: "memory",
      autocapture: true,
      capture_pageview: false,
      capture_pageleave: true,
    });
  }, []);

  useEffect(() => {
    if (!ENABLED) return;
    posthog.capture("$pageview");
  }, [pathname]);

  return null;
}
