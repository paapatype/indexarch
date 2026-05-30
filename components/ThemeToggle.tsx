"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Theme = "light" | "dark";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const initial: Theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const root = document.documentElement;
    if (next === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      // Suppress two visual artifacts that show up after tapping the
      // toggle:
      //   1. The browser's default focus ring — a thick black circle
      //      that lingers around the button on Chrome / Safari after
      //      the click (until focus moves elsewhere). focus:outline-
      //      none hides the focus ring on click, focus-visible: still
      //      shows it for keyboard users so a11y is preserved.
      //   2. iOS Safari's grey tap-highlight overlay — appears as a
      //      faint dark circle on the rounded-full button bounds for
      //      ~300ms after a tap. [-webkit-tap-highlight-color] kills
      //      it without affecting hover/focus states.
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink hover:bg-sand-100 cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [-webkit-tap-highlight-color:transparent] ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme && (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
