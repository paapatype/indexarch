"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { PROCESS } from "@/lib/constants";

// Step 01 — Share: PDF catalog content flowing into our upload/inquiry system
function ShareIllustration() {
  return (
    <svg viewBox="0 0 120 110" fill="none" className="w-full h-full" aria-hidden="true">

      {/* ── Left side: PDF document (the client's catalog) ── */}
      <g opacity="0.4">
        {/* PDF page */}
        <rect x="4" y="10" width="42" height="56" rx="2" stroke="currentColor" strokeWidth="0.75" />
        {/* PDF badge */}
        <rect x="6" y="12" width="14" height="5" rx="1" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
        <line x1="8" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="0.35" opacity="0.4" />
        {/* Dense spec lines — looks like a real catalog page */}
        <line x1="8" y1="22" x2="40" y2="22" stroke="currentColor" strokeWidth="0.35" />
        <line x1="8" y1="25.5" x2="36" y2="25.5" stroke="currentColor" strokeWidth="0.35" />
        <line x1="8" y1="29" x2="38" y2="29" stroke="currentColor" strokeWidth="0.35" />
        <line x1="8" y1="32.5" x2="34" y2="32.5" stroke="currentColor" strokeWidth="0.35" />
        {/* Table-like grid */}
        <rect x="8" y="36" width="34" height="12" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
        <line x1="20" y1="36" x2="20" y2="48" stroke="currentColor" strokeWidth="0.25" opacity="0.25" />
        <line x1="32" y1="36" x2="32" y2="48" stroke="currentColor" strokeWidth="0.25" opacity="0.25" />
        <line x1="8" y1="42" x2="42" y2="42" stroke="currentColor" strokeWidth="0.25" opacity="0.25" />
        {/* More lines below */}
        <line x1="8" y1="53" x2="40" y2="53" stroke="currentColor" strokeWidth="0.35" />
        <line x1="8" y1="56.5" x2="30" y2="56.5" stroke="currentColor" strokeWidth="0.35" />
        <line x1="8" y1="60" x2="36" y2="60" stroke="currentColor" strokeWidth="0.35" />
      </g>


      {/* ── Arrow / flow indicator — pulse sweeps line then splits into arrowhead ── */}
      <g>
        {/* Static arrow at low opacity */}
        <line x1="50" y1="40" x2="63" y2="40" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
        <line x1="63" y1="40" x2="59" y2="37" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
        <line x1="63" y1="40" x2="59" y2="43" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />

        {/* Phase 1: Pulse travels along horizontal — left to tip */}
        <motion.line
          x1="50" y1="40" x2="50" y2="40"
          stroke="currentColor" strokeWidth="0.8"
          animate={{
            x2: [50, 63, 63, 50],
            opacity: [0.4, 0.45, 0, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.55, 1] }}
        />

        {/* Phase 2: Top arm lights up from tip (63,40) outward to (59,37) */}
        <motion.line
          x1="63" y1="40" x2="63" y2="40"
          stroke="currentColor" strokeWidth="0.8"
          animate={{
            x2: [63, 59, 59, 63],
            y2: [40, 37, 37, 40],
            opacity: [0, 0.45, 0, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0.35, 0.55, 0.7, 1] }}
        />

        {/* Phase 2: Bottom arm lights up from tip (63,40) outward to (59,43) */}
        <motion.line
          x1="63" y1="40" x2="63" y2="40"
          stroke="currentColor" strokeWidth="0.8"
          animate={{
            x2: [63, 59, 59, 63],
            y2: [40, 43, 43, 40],
            opacity: [0, 0.45, 0, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0.35, 0.55, 0.7, 1] }}
        />
      </g>

      {/* ── Right side: Our upload/intake form ── */}
      {/* Form container */}
      <rect x="68" y="6" width="48" height="98" rx="3" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      {/* Header bar */}
      <line x1="68" y1="16" x2="116" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="74" y1="12" x2="100" y2="12" stroke="currentColor" strokeWidth="0.35" opacity="0.2" />

      {/* ── Field 1: Company name — appears first ── */}
      <motion.g
        animate={{ opacity: [0, 0.4, 0.4] }}
        transition={{ duration: 0.8, delay: 0.5, repeat: Infinity, repeatDelay: 11, ease: "easeOut" }}
      >
        <line x1="72" y1="23" x2="86" y2="23" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
        <rect x="72" y="26" width="40" height="6" rx="1" stroke="currentColor" strokeWidth="0.4" />
        <motion.line
          x1="74" y1="30" x2="74" y2="30"
          stroke="currentColor" strokeWidth="0.35" opacity="0.35"
          animate={{ x2: [74, 98, 98] }}
          transition={{ duration: 1.5, delay: 0.8, repeat: Infinity, repeatDelay: 11, ease: "easeOut" }}
        />
      </motion.g>

      {/* ── Field 2: Product data — appears second ── */}
      <motion.g
        animate={{ opacity: [0, 0.4, 0.4] }}
        transition={{ duration: 0.8, delay: 2, repeat: Infinity, repeatDelay: 11, ease: "easeOut" }}
      >
        <line x1="72" y1="38" x2="92" y2="38" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
        <rect x="72" y="41" width="40" height="6" rx="1" stroke="currentColor" strokeWidth="0.4" />
        <motion.line
          x1="74" y1="44.5" x2="74" y2="44.5"
          stroke="currentColor" strokeWidth="0.35" opacity="0.35"
          animate={{ x2: [74, 104, 104] }}
          transition={{ duration: 1.5, delay: 2.3, repeat: Infinity, repeatDelay: 11, ease: "easeOut" }}
        />
      </motion.g>

      {/* ── Field 3: Upload area with file dropping in ── */}
      <motion.g
        animate={{ opacity: [0, 0.4, 0.4] }}
        transition={{ duration: 0.8, delay: 3.5, repeat: Infinity, repeatDelay: 11, ease: "easeOut" }}
      >
        <line x1="72" y1="53" x2="90" y2="53" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
        <rect x="72" y="56" width="40" height="20" rx="1" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 2" />
      </motion.g>

      {/* ── PDF file flying into the upload zone ── */}
      <motion.g
        animate={{
          x: [0, 12, 24, 36, 40],
          y: [0, -10, -6, 4, 14],
          opacity: [0, 0.5, 0.45, 0.35, 0],
        }}
        transition={{
          duration: 2,
          delay: 4.5,
          repeat: Infinity,
          repeatDelay: 11,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.8, 1],
        }}
      >
        {/* Mini PDF */}
        <rect x="38" y="50" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="0.5" />
        <rect x="39" y="51" width="6" height="3" rx="0.5" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
        <line x1="40" y1="57" x2="48" y2="57" stroke="currentColor" strokeWidth="0.25" opacity="0.35" />
        <line x1="40" y1="59.5" x2="47" y2="59.5" stroke="currentColor" strokeWidth="0.25" opacity="0.35" />
        <line x1="40" y1="62" x2="46" y2="62" stroke="currentColor" strokeWidth="0.25" opacity="0.35" />
      </motion.g>

      {/* ── Uploaded file confirmation — appears after drop ── */}
      <motion.g
        animate={{ opacity: [0, 0, 0.4, 0.4] }}
        transition={{ duration: 1.5, delay: 6, repeat: Infinity, repeatDelay: 11, times: [0, 0.2, 0.5, 1] }}
      >
        <rect x="76" y="60" width="24" height="4" rx="1" stroke="currentColor" strokeWidth="0.3" />
        <line x1="78" y1="62" x2="90" y2="62" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
      </motion.g>

      {/* ── Submit button — appears, then pressed state with tick ── */}
      <motion.g
        animate={{ opacity: [0, 0.5, 0.5, 0.5, 0.5] }}
        transition={{ duration: 2, delay: 8.5, repeat: Infinity, repeatDelay: 11, ease: "easeOut", times: [0, 0.2, 0.5, 0.8, 1] }}
      >
        {/* Button background — darkens on "press" */}
        <motion.rect
          x="76" y="79" width="32" height="8" rx="2"
          stroke="currentColor" strokeWidth="0.5"
          animate={{ opacity: [0.08, 0.08, 0.08, 0.25, 0.25] }}
          fill="currentColor"
          transition={{ duration: 2, delay: 8.5, repeat: Infinity, repeatDelay: 11, times: [0, 0.4, 0.6, 0.65, 1] }}
        />
        {/* Button line (placeholder for text) — fades out when tick appears */}
        <motion.line
          x1="85" y1="83" x2="99" y2="83"
          stroke="currentColor" strokeWidth="0.35"
          animate={{ opacity: [0.3, 0.3, 0.3, 0, 0] }}
          transition={{ duration: 2, delay: 8.5, repeat: Infinity, repeatDelay: 11, times: [0, 0.4, 0.6, 0.65, 1] }}
        />
        {/* Tick — centered in the button (button is x=76 w=32 → center x=92, y=79 h=8 → center y=83) */}
        <motion.polyline
          points="90,83.5 91.5,85 93.5,81.5"
          stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" strokeLinejoin="round"
          animate={{ pathLength: [0, 0, 1, 1], opacity: [0, 0, 0.6, 0.6] }}
          transition={{ duration: 2, delay: 8.5, repeat: Infinity, repeatDelay: 11, times: [0, 0.6, 0.85, 1] }}
        />
      </motion.g>

    </svg>
  );
}

// Step 02 — Build: Lego-style stacking — blocks drop one by one, stack neatly
// Step 02 — Build: catalog UI assembling on a browser window
function BuildIllustration() {
  return (
    <svg viewBox="0 0 120 110" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Browser window frame — always visible */}
      <rect x="8" y="6" width="104" height="98" rx="3" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      {/* Title bar */}
      <line x1="8" y1="16" x2="112" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      {/* Window dots */}
      <circle cx="16" cy="11" r="1.5" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <circle cx="22" cy="11" r="1.5" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <circle cx="28" cy="11" r="1.5" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      {/* URL bar */}
      <rect x="36" y="8.5" width="40" height="5" rx="2.5" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />

      {/* ── Component 1: Search bar — slides in from top ── */}
      <motion.g
        animate={{ y: [-8, 0, 0], opacity: [0, 0.45, 0.45] }}
        transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 10, ease: [0.22, 1, 0.36, 1], times: [0, 0.5, 1] }}
      >
        <rect x="14" y="21" width="62" height="7" rx="3.5" stroke="currentColor" strokeWidth="0.5" />
        {/* Search icon */}
        <circle cx="19" cy="24.5" r="2" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
        <line x1="20.5" y1="26" x2="22" y2="27.5" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
        {/* Placeholder text */}
        <line x1="25" y1="24.5" x2="45" y2="24.5" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
      </motion.g>

      {/* ── Component 2: Filter chips — slide in from left ── */}
      <motion.g
        animate={{ x: [-12, 0, 0], opacity: [0, 0.4, 0.4] }}
        transition={{ duration: 1, delay: 1.8, repeat: Infinity, repeatDelay: 10, ease: [0.22, 1, 0.36, 1], times: [0, 0.5, 1] }}
      >
        <rect x="14" y="32" width="16" height="5" rx="2.5" stroke="currentColor" strokeWidth="0.4" />
        <line x1="17" y1="34.5" x2="27" y2="34.5" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
        <rect x="33" y="32" width="14" height="5" rx="2.5" stroke="currentColor" strokeWidth="0.4" />
        <line x1="36" y1="34.5" x2="44" y2="34.5" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
        <rect x="50" y="32" width="18" height="5" rx="2.5" stroke="currentColor" strokeWidth="0.4" />
        <line x1="53" y1="34.5" x2="65" y2="34.5" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
        <rect x="71" y="32" width="12" height="5" rx="2.5" stroke="currentColor" strokeWidth="0.4" />
      </motion.g>

      {/* ── Component 3: Product card 1 — fades up ── */}
      <motion.g
        animate={{ y: [10, 0, 0], opacity: [0, 0.45, 0.45] }}
        transition={{ duration: 1, delay: 3, repeat: Infinity, repeatDelay: 10, ease: [0.22, 1, 0.36, 1], times: [0, 0.5, 1] }}
      >
        <rect x="14" y="42" width="28" height="34" rx="2" stroke="currentColor" strokeWidth="0.5" />
        {/* 3D viewer area */}
        <rect x="16" y="44" width="24" height="16" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
        {/* Rotating cube inside viewer */}
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "28px 52px" }}
        >
          <rect x="23" y="47" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
        </motion.g>
        {/* Product name */}
        <line x1="16" y1="64" x2="34" y2="64" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
        {/* Spec line */}
        <line x1="16" y1="68" x2="28" y2="68" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
        {/* Price / CTA */}
        <rect x="16" y="71" width="14" height="3" rx="1.5" stroke="currentColor" strokeWidth="0.3" opacity="0.25" />
      </motion.g>

      {/* ── Component 4: Product card 2 — fades up, staggered ── */}
      <motion.g
        animate={{ y: [10, 0, 0], opacity: [0, 0.45, 0.45] }}
        transition={{ duration: 1, delay: 3.8, repeat: Infinity, repeatDelay: 10, ease: [0.22, 1, 0.36, 1], times: [0, 0.5, 1] }}
      >
        <rect x="46" y="42" width="28" height="34" rx="2" stroke="currentColor" strokeWidth="0.5" />
        <rect x="48" y="44" width="24" height="16" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
        <motion.g
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 52px" }}
        >
          <polygon points="55,48 65,48 67,52 60,56 53,52" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
        </motion.g>
        <line x1="48" y1="64" x2="66" y2="64" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
        <line x1="48" y1="68" x2="60" y2="68" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
        <rect x="48" y="71" width="14" height="3" rx="1.5" stroke="currentColor" strokeWidth="0.3" opacity="0.25" />
      </motion.g>

      {/* ── Component 5: Product card 3 — fades up, staggered more ── */}
      <motion.g
        animate={{ y: [10, 0, 0], opacity: [0, 0.45, 0.45] }}
        transition={{ duration: 1, delay: 4.6, repeat: Infinity, repeatDelay: 10, ease: [0.22, 1, 0.36, 1], times: [0, 0.5, 1] }}
      >
        <rect x="78" y="42" width="28" height="34" rx="2" stroke="currentColor" strokeWidth="0.5" />
        <rect x="80" y="44" width="24" height="16" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "92px 52px" }}
        >
          <circle cx="92" cy="52" r="5" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
          <circle cx="92" cy="52" r="2" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
        </motion.g>
        <line x1="80" y1="64" x2="98" y2="64" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
        <line x1="80" y1="68" x2="92" y2="68" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
        <rect x="80" y="71" width="14" height="3" rx="1.5" stroke="currentColor" strokeWidth="0.3" opacity="0.25" />
      </motion.g>

      {/* ── Component 6: Comparison bar at bottom — slides up last ── */}
      <motion.g
        animate={{ y: [6, 0, 0], opacity: [0, 0.4, 0.4] }}
        transition={{ duration: 1, delay: 6, repeat: Infinity, repeatDelay: 10, ease: [0.22, 1, 0.36, 1], times: [0, 0.5, 1] }}
      >
        <rect x="14" y="82" width="92" height="8" rx="2" stroke="currentColor" strokeWidth="0.4" />
        {/* Compare items */}
        <rect x="18" y="84" width="20" height="4" rx="2" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
        <rect x="42" y="84" width="20" height="4" rx="2" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
        {/* Compare button */}
        <rect x="82" y="84" width="18" height="4" rx="2" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
        <line x1="86" y1="86" x2="96" y2="86" stroke="currentColor" strokeWidth="0.3" opacity="0.25" />
      </motion.g>

      {/* ── Component 7: Result count — appears with search ── */}
      <motion.g
        animate={{ opacity: [0, 0.3, 0.3] }}
        transition={{ duration: 0.8, delay: 1.2, repeat: Infinity, repeatDelay: 10 }}
      >
        <line x1="82" y1="23" x2="100" y2="23" stroke="currentColor" strokeWidth="0.35" opacity="0.3" />
        <line x1="82" y1="26" x2="94" y2="26" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
      </motion.g>
    </svg>
  );
}

// Step 03 — Go Live: iPhone center, devices orbit like a solar system using CSS
function LaunchIllustration() {
  return (
    <div className="relative w-full h-full">
      {/* Center: iPhone */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <svg width="36" height="70" viewBox="0 0 36 70" fill="none" className="text-ink-muted">
          <rect x="1" y="1" width="34" height="68" rx="8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <rect x="11" y="3.5" width="14" height="4" rx="2" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
          <rect x="4" y="10" width="28" height="48" rx="2" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
          <line x1="8" y1="17" x2="24" y2="17" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <line x1="8" y1="22" x2="20" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <rect x="8" y="27" width="9" height="7" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <rect x="19" y="27" width="9" height="7" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <line x1="8" y1="39" x2="28" y2="39" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <line x1="8" y1="43" x2="22" y2="43" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <line x1="12" y1="63" x2="24" y2="63" stroke="currentColor" strokeWidth="0.8" opacity="0.2" strokeLinecap="round" />
        </svg>
        {/* Live pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 rounded-full bg-ink-muted animate-pulse" />
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-ink-faint animate-ping" />
        </div>
      </div>

      {/* Orbiting devices — each uses CSS animation for circular path */}
      <style>{`
        @keyframes orbit { from { transform: rotate(0deg) translateX(36%) rotate(0deg); } to { transform: rotate(360deg) translateX(36%) rotate(-360deg); } }
        @keyframes orbit120 { from { transform: rotate(120deg) translateX(36%) rotate(-120deg); } to { transform: rotate(480deg) translateX(36%) rotate(-480deg); } }
        @keyframes orbit240 { from { transform: rotate(240deg) translateX(36%) rotate(-240deg); } to { transform: rotate(600deg) translateX(36%) rotate(-600deg); } }
        @keyframes livePing { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(2.5); opacity: 0; } }
      `}</style>

      {/* Tablet — orbit starting at 0° */}
      <div
        className="absolute inset-0 z-0"
        style={{ animation: "orbit 22s linear infinite" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width="36" height="50" viewBox="0 0 28 38" fill="none" className="text-ink-muted">
            <rect x="1" y="1" width="26" height="36" rx="3" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            <rect x="3" y="3.5" width="22" height="28" rx="1" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
            <line x1="6" y1="9" x2="20" y2="9" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
            <line x1="6" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
            <rect x="6" y="17" width="7" height="5" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
            <rect x="15" y="17" width="7" height="5" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
            <circle cx="14" cy="34" r="1.5" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          </svg>
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-pulse" />
            <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-ink-faint" style={{ animation: "livePing 2.5s ease-out infinite 0.8s" }} />
          </div>
        </div>
      </div>

      {/* Laptop — orbit starting at 120° */}
      <div
        className="absolute inset-0 z-0"
        style={{ animation: "orbit120 22s linear infinite" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width="52" height="36" viewBox="0 0 40 28" fill="none" className="text-ink-muted">
            <rect x="4" y="1" width="32" height="20" rx="2" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            <circle cx="20" cy="2.5" r="0.7" fill="currentColor" opacity="0.12" />
            <path d="M1 21 L4 21 L36 21 L39 21 L39 23.5 Q39 25 37.5 25 L2.5 25 Q1 25 1 23.5 Z" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
            <line x1="8" y1="7" x2="24" y2="7" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
            <line x1="8" y1="10.5" x2="20" y2="10.5" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
            <rect x="8" y="13" width="10" height="4.5" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
            <rect x="20" y="13" width="10" height="4.5" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
          </svg>
          <div className="absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-pulse" />
            <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-ink-faint" style={{ animation: "livePing 2.5s ease-out infinite 1.6s" }} />
          </div>
        </div>
      </div>

      {/* Desktop — orbit starting at 240° */}
      <div
        className="absolute inset-0 z-0"
        style={{ animation: "orbit240 22s linear infinite" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width="56" height="44" viewBox="0 0 44 34" fill="none" className="text-ink-muted">
            <rect x="2" y="1" width="40" height="24" rx="2" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            <line x1="22" y1="25" x2="22" y2="29" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
            <line x1="14" y1="29" x2="30" y2="29" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
            <line x1="7" y1="7" x2="28" y2="7" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
            <line x1="7" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
            <rect x="7" y="14" width="9" height="6" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
            <rect x="18" y="14" width="9" height="6" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
            <rect x="29" y="14" width="8" height="6" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
          </svg>
          <div className="absolute top-[34%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-pulse" />
            <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-ink-faint" style={{ animation: "livePing 2.5s ease-out infinite 2.4s" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const illustrations = [
  <ShareIllustration key="share" />,
  <BuildIllustration key="build" />,
  <LaunchIllustration key="launch" />,
];

export default function Process() {
  return (
    <section id="process" className="py-section-sm lg:py-section relative">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* Header — asymmetric layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.h2
            variants={fadeUp}
            className="lg:col-span-6 font-serif text-4xl lg:text-5xl text-ink leading-tight"
          >
            {PROCESS.heading}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-6 text-lg text-ink-muted leading-relaxed lg:pt-3"
          >
            {PROCESS.subtitle}
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PROCESS.steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className={`relative p-8 lg:p-10 ${
                i < PROCESS.steps.length - 1
                  ? "border-b lg:border-b-0 lg:border-r border-rule"
                  : ""
              }`}
            >
              {/* Animated illustration */}
              <div className="h-36 sm:h-40 lg:h-48 mb-8 text-ink-faint">
                {illustrations[i]}
              </div>

              {/* Step number */}
              <span className="block font-mono text-sm text-ink-faint tracking-wider mb-3">
                {step.number}
              </span>
              <h3 className="font-sans text-lg font-semibold text-ink mb-3">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footnote */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center font-mono text-xs text-ink-faint tracking-wide"
        >
          {PROCESS.footnote}
        </motion.p>
      </div>
    </section>
  );
}
