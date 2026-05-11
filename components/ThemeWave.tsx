"use client";

import { useEffect } from "react";

const RIPPLE_MS = 2000;

/**
 * Page-wide theme-toggle ripple. No coloured overlay (the previous
 * gradient sweep felt cheap). Instead, on every theme change we set
 * `data-theme-transition` on <html>, and globals.css runs a single,
 * subtle keyframe on <main> + <footer> that combines a tiny vertical
 * bump, a tiny skewX, and a brief motion-blur. The body's own
 * `background-color` transition handles the colour fade beneath it,
 * so the page reads as "settling into the new theme" rather than
 * being painted over by something.
 */
export default function ThemeWave() {
  useEffect(() => {
    const html = document.documentElement;
    let prev = html.classList.contains("dark");
    let timer: ReturnType<typeof setTimeout> | null = null;
    const obs = new MutationObserver(() => {
      const now = html.classList.contains("dark");
      if (now === prev) return;
      prev = now;
      html.setAttribute("data-theme-transition", "active");
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        html.removeAttribute("data-theme-transition");
      }, RIPPLE_MS);
    });
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => {
      obs.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return null;
}
