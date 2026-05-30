"use client";

import { useEffect } from "react";

// ─── In-page anchor transition ─────────────────────────────────────
// Page transition for clicks on `<a href="#xxx">` anywhere on the
// page. The transition reads as a true "fade out → arrive → fade in"
// rather than a blur-during-scroll:
//
//   1. <main> fades to opacity 0 over ~300ms (CSS handles this)
//   2. once the fade is complete, the page jumps instantly to the
//      destination (the jump is invisible because the page is at
//      opacity 0)
//   3. <main> fades back to opacity 1 over ~500ms, gently revealing
//      the destination section
//
// Cross-page navigation (e.g. /blog) is untouched because we only
// hook anchors whose href starts with "#". Users with
// `prefers-reduced-motion: reduce` get a single straight jump
// (no fade, no animation) so the motion preference is honoured.

const FADE_OUT_MS = 320;
const HOLD_AFTER_JUMP_MS = 30;
const HEADER_OFFSET_PX = 56;

export default function ScrollTransition() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const handleClick = (e: MouseEvent) => {
      // Bail out for modifier keys / non-left clicks so users can
      // still open links in new tabs / windows the normal way.
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const hash = href.slice(1); // drop leading "#"
      const destination = document.getElementById(hash);
      if (!destination) return;

      e.preventDefault();

      // Reduce-motion fallback: straight jump, no fade.
      if (prefersReduced.matches) {
        destination.scrollIntoView({ behavior: "auto", block: "start" });
        history.pushState(null, "", href);
        return;
      }

      const main = document.querySelector("main");
      if (!main) {
        destination.scrollIntoView({ behavior: "auto", block: "start" });
        history.pushState(null, "", href);
        return;
      }

      // Phase 1 — fade <main> to opacity 0.
      main.setAttribute("data-nav-transition", "fading-out");

      window.setTimeout(() => {
        // Phase 2 — instant scroll while the page is invisible.
        const targetY =
          destination.getBoundingClientRect().top +
          window.scrollY -
          HEADER_OFFSET_PX;
        window.scrollTo({ top: targetY, behavior: "auto" });
        history.pushState(null, "", href);

        // Hold for a frame so the browser commits the new scroll
        // position before we start fading the page back in — without
        // this pause some browsers paint the new view at opacity 1
        // briefly before the transition kicks in.
        window.setTimeout(() => {
          // Phase 3 — fade <main> back to opacity 1.
          main.setAttribute("data-nav-transition", "fading-in");
          // Clear the attribute once the fade-in transition finishes
          // so the element returns to its default styled state.
          window.setTimeout(() => {
            main.removeAttribute("data-nav-transition");
          }, 520);
        }, HOLD_AFTER_JUMP_MS);
      }, FADE_OUT_MS);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
