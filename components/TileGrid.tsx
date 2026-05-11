"use client";

import { useEffect, useRef } from "react";

const COLS = 14;
const ROWS = 8;
const STAGGER_MS = 28;
const FADE_MS = 320;

/**
 * Hero background grid.
 *
 * Two effects layered together:
 *  1. **Cursor light source.** A radial-gradient mask centred on the
 *     pointer reveals the grid where the cursor is and lets it fade
 *     into the page elsewhere. CSS variables --cx / --cy are updated
 *     directly on each mousemove (no React re-render) for 60fps cost.
 *  2. **Theme-toggle wave.** On `dark` class change, each tile's border
 *     colour is reassigned via setTimeout with delay = (row + col) ×
 *     STAGGER_MS, sweeping a diagonal wave from top-left to bottom-right.
 *     Direct inline-style assignment is used because Chromium does not
 *     reliably trigger transitions when a consumed custom property
 *     changes via class swap on an ancestor.
 */
export default function TileGrid({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Cursor light source — fast path, no React state.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let pending: { x: number; y: number } | null = null;
    const flush = () => {
      raf = 0;
      if (!pending || !el) return;
      el.style.setProperty("--cx", `${pending.x}px`);
      el.style.setProperty("--cy", `${pending.y}px`);
      pending = null;
    };
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      pending = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (!raf) raf = requestAnimationFrame(flush);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Tile colours + theme-change wave.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const html = document.documentElement;
    const tiles = Array.from(root.children) as HTMLDivElement[];

    const readColor = () =>
      getComputedStyle(html).getPropertyValue("--color-rule-light").trim() ||
      "transparent";

    const initial = readColor();
    tiles.forEach((tile) => {
      tile.style.borderRightColor = initial;
      tile.style.borderBottomColor = initial;
    });

    let prevDark = html.classList.contains("dark");
    const timers: ReturnType<typeof setTimeout>[] = [];

    const obs = new MutationObserver(() => {
      const nowDark = html.classList.contains("dark");
      if (nowDark === prevDark) return;
      prevDark = nowDark;

      requestAnimationFrame(() => {
        const newColor = readColor();
        timers.forEach(clearTimeout);
        timers.length = 0;
        tiles.forEach((tile, i) => {
          const row = Math.floor(i / COLS);
          const col = i % COLS;
          const delay = (row + col) * STAGGER_MS;
          timers.push(
            setTimeout(() => {
              tile.style.borderRightColor = newColor;
              tile.style.borderBottomColor = newColor;
            }, delay)
          );
        });
      });
    });
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => {
      obs.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`absolute inset-0 pointer-events-none grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        // Cursor light source: bright at pointer, blurry mid-falloff,
        // dim baseline 12% so the grid is still hinted-at when the
        // cursor isn't on the page. The vertical fade is folded into
        // the same mask via radial reach so we don't need mask-composite
        // (which has weaker browser support).
        maskImage:
          "radial-gradient(320px circle at var(--cx, 50%) var(--cy, 38%), rgba(255,255,255,1) 0%, rgba(255,255,255,0.55) 35%, rgba(255,255,255,0.12) 80%)",
        WebkitMaskImage:
          "radial-gradient(320px circle at var(--cx, 50%) var(--cy, 38%), rgba(255,255,255,1) 0%, rgba(255,255,255,0.55) 35%, rgba(255,255,255,0.12) 80%)",
      }}
    >
      {Array.from({ length: COLS * ROWS }).map((_, i) => (
        <div
          key={i}
          style={{
            borderRightWidth: "1px",
            borderBottomWidth: "1px",
            borderRightStyle: "solid",
            borderBottomStyle: "solid",
            transition: `border-right-color ${FADE_MS}ms ease, border-bottom-color ${FADE_MS}ms ease`,
          }}
        />
      ))}
    </div>
  );
}
