"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// ─── Tuning ─────────────────────────────────────────────────────────
// Edit these to change globe size, speed, density, and palette without
// touching the geometry/animation logic below.

// Globe geometry — radius in viewBox units. The viewBox is sized
// slightly larger than 2R so route arcs that lift above the surface
// (parabolic mid-point bulge) stay inside the box.
const R = 180;
const VIEW_PADDING = 36;

// Tilt of the globe around the X axis (forward tilt toward viewer).
// 0.42 rad ≈ 24° — enough to give latitudes visible curvature without
// the globe looking top-down.
const TILT = 0.42;

// Seconds per full rotation around the Y axis. 55s reads as a slow,
// calm drift rather than a spin.
const ROTATION_PERIOD = 55;

// Surface dot density. Halved on mobile for perf.
const DOT_COUNT_DESKTOP = 720;
const DOT_COUNT_MOBILE = 380;

// Route arcs — each travels start→end repeatedly with its own period
// and start delay. lat/lon in radians. Three arcs feel like global
// data movement without crowding the surface.
const ARCS = [
  // Mumbai-ish → northern Europe
  { from: { lat: 0.32, lon: 0.12 }, to: { lat: 0.92, lon: 1.55 }, period: 7.6, delay: 0 },
  // South America → eastern Asia
  { from: { lat: -0.22, lon: -0.85 }, to: { lat: 0.58, lon: 2.4 }, period: 9.2, delay: 2.4 },
  // North Atlantic → southern Africa
  { from: { lat: 0.72, lon: -1.75 }, to: { lat: -0.35, lon: 0.78 }, period: 8.3, delay: 4.6 },
];

// Each route head is followed by a short comet-style tail.
const TAIL_COUNT = 5;
// Path resolution along each great-circle arc.
const ARC_SAMPLES = 64;

// Color — all elements use currentColor so the globe inherits from the
// parent text class (text-ink-faint), which automatically swaps between
// light and dark themes. Per-element opacity controls the hierarchy.
const OPACITY_BOUNDARY = 0.30;
const OPACITY_LATITUDE = 0.18;
const OPACITY_EQUATOR = 0.32;
const OPACITY_MERIDIAN_FRONT = 0.32;
const OPACITY_MERIDIAN_BACK = 0.07;
const OPACITY_DOT_FRONT_MAX = 0.55;
const OPACITY_DOT_BACK_MIN = 0.04;
const OPACITY_ARC_FRONT = 0.42;
const OPACITY_ARC_BACK = 0.07;

// ─── Math helpers ───────────────────────────────────────────────────

interface P3 {
  x: number;
  y: number;
  z: number;
}

// Fibonacci sphere — evenly-distributed points on the unit sphere.
// Used for the "data point" surface lattice.
function fibonacciSphere(n: number): P3[] {
  const out: P3[] = new Array(n);
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    out[i] = { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
  }
  return out;
}

function latLonToCart(lat: number, lon: number): P3 {
  return {
    x: Math.cos(lat) * Math.cos(lon),
    y: Math.sin(lat),
    z: Math.cos(lat) * Math.sin(lon),
  };
}

// Spherical linear interpolation between two unit vectors. Returns a
// point on the great circle connecting them.
function slerp(a: P3, b: P3, t: number): P3 {
  const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(dot);
  if (Math.abs(omega) < 1e-6) return a;
  const sinO = Math.sin(omega);
  const wa = Math.sin((1 - t) * omega) / sinO;
  const wb = Math.sin(t * omega) / sinO;
  return {
    x: a.x * wa + b.x * wb,
    y: a.y * wa + b.y * wb,
    z: a.z * wa + b.z * wb,
  };
}

interface IndexArchGlobeProps {
  className?: string;
}

export default function IndexArchGlobe({ className = "" }: IndexArchGlobeProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dotCount, setDotCount] = useState(DOT_COUNT_DESKTOP);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // prefers-reduced-motion + viewport size detection. Setting these in
  // state means we re-mount the dot lattice when the user crosses the
  // mobile breakpoint, but that only happens on rotate/resize — fine.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 768px)");
    setReduceMotion(rm.matches);
    setDotCount(small.matches ? DOT_COUNT_MOBILE : DOT_COUNT_DESKTOP);
    const onRM = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    const onSmall = (e: MediaQueryListEvent) =>
      setDotCount(e.matches ? DOT_COUNT_MOBILE : DOT_COUNT_DESKTOP);
    rm.addEventListener("change", onRM);
    small.addEventListener("change", onSmall);
    return () => {
      rm.removeEventListener("change", onRM);
      small.removeEventListener("change", onSmall);
    };
  }, []);

  // ── Pre-computed geometry ─────────────────────────────────────────
  // All 3D points are unit-sphere coordinates. The RAF loop applies
  // rotation + tilt + projection per frame and writes directly to the
  // SVG attributes (no React re-renders during animation).

  const dots3D = useMemo(() => fibonacciSphere(dotCount), [dotCount]);

  // 6 meridians at 60° spacing. Each sampled as 41 points along a
  // great circle from south pole to north pole.
  const meridianSamples = useMemo(() => {
    const angles = [0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3];
    return angles.map((lon0) => {
      const pts: P3[] = [];
      const N = 40;
      for (let i = 0; i <= N; i++) {
        const phi = -Math.PI / 2 + (i / N) * Math.PI;
        pts.push({
          x: Math.cos(phi) * Math.cos(lon0),
          y: Math.sin(phi),
          z: Math.cos(phi) * Math.sin(lon0),
        });
      }
      return pts;
    });
  }, []);

  // Static latitudes — they don't rotate with the globe (a latitude
  // ring is identical at any rotation), they just sit at fixed φ.
  // Rendered as foreshortened SVG ellipses.
  const latitudeRings = useMemo(() => {
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);
    return [60, 30, 0, -30, -60].map((deg) => {
      const phi = (deg * Math.PI) / 180;
      const rx = R * Math.cos(phi);
      const ry = rx * sinT;
      const cy = -R * Math.sin(phi) * cosT;
      const isEquator = deg === 0;
      return { cy, rx, ry, isEquator };
    });
  }, []);

  // Great-circle arc samples, lifted slightly off the sphere surface
  // so the arc reads as a path above the globe rather than a line
  // painted onto it. Parabolic lift peaks at the midpoint.
  const arcGeom = useMemo(
    () =>
      ARCS.map((arc) => {
        const A = latLonToCart(arc.from.lat, arc.from.lon);
        const B = latLonToCart(arc.to.lat, arc.to.lon);
        const samples: P3[] = new Array(ARC_SAMPLES + 1);
        for (let i = 0; i <= ARC_SAMPLES; i++) {
          const t = i / ARC_SAMPLES;
          const s = slerp(A, B, t);
          const lift = 1 + 0.085 * Math.sin(t * Math.PI);
          samples[i] = { x: s.x * lift, y: s.y * lift, z: s.z * lift };
        }
        return { ...arc, samples };
      }),
    []
  );

  // ── Refs into the SVG DOM ────────────────────────────────────────
  // Direct-mutation refs avoid React reconciliation per frame.
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const meridianRefs = useRef<(SVGPathElement | null)[]>([]);
  const arcPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const arcNodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const arcTailRefs = useRef<(SVGCircleElement | null)[][]>([]);

  useEffect(() => {
    dotRefs.current = new Array(dotCount).fill(null);
  }, [dotCount]);

  // ── Animation loop ───────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!svgRef.current) return;

    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);

    // Y-rotation by ω, then X-tilt by τ, then orthographic projection.
    // Returns 2D screen coords + z (depth, +1 toward viewer / -1 away).
    const project = (p: P3, cosW: number, sinW: number) => {
      const rx = p.x * cosW + p.z * sinW;
      const rz = -p.x * sinW + p.z * cosW;
      const ry = p.y;
      const ty = ry * cosT - rz * sinT;
      const tz = ry * sinT + rz * cosT;
      return { x: rx * R, y: -ty * R, z: tz };
    };

    const renderFrame = (angle: number, travelElapsed: number) => {
      const cosW = Math.cos(angle);
      const sinW = Math.sin(angle);

      // Surface dots — opacity ramps with depth so back-side dots dim
      // without disappearing entirely (gives the lattice some hint of
      // the back hemisphere through the front).
      for (let i = 0; i < dots3D.length; i++) {
        const node = dotRefs.current[i];
        if (!node) continue;
        const pr = project(dots3D[i], cosW, sinW);
        node.setAttribute("cx", pr.x.toFixed(2));
        node.setAttribute("cy", pr.y.toFixed(2));
        const op =
          OPACITY_DOT_BACK_MIN +
          (OPACITY_DOT_FRONT_MAX - OPACITY_DOT_BACK_MIN) *
            Math.pow((pr.z + 1) / 2, 1.7);
        node.setAttribute("opacity", op.toFixed(3));
      }

      // Meridians — each path's average z drives a front/back opacity.
      for (let m = 0; m < meridianSamples.length; m++) {
        const node = meridianRefs.current[m];
        if (!node) continue;
        const pts = meridianSamples[m];
        let d = "";
        let avgZ = 0;
        for (let i = 0; i < pts.length; i++) {
          const pr = project(pts[i], cosW, sinW);
          avgZ += pr.z;
          d += (i === 0 ? "M" : "L") + pr.x.toFixed(2) + " " + pr.y.toFixed(2);
        }
        avgZ /= pts.length;
        const op =
          OPACITY_MERIDIAN_BACK +
          (OPACITY_MERIDIAN_FRONT - OPACITY_MERIDIAN_BACK) *
            Math.pow((avgZ + 1) / 2, 1.4);
        node.setAttribute("d", d);
        node.setAttribute("opacity", op.toFixed(3));
      }

      // Route arcs + traveling node + tail.
      for (let ai = 0; ai < arcGeom.length; ai++) {
        const arc = arcGeom[ai];
        const projected: { x: number; y: number; z: number }[] = new Array(arc.samples.length);
        let d = "";
        let avgZ = 0;
        for (let i = 0; i < arc.samples.length; i++) {
          const pr = project(arc.samples[i], cosW, sinW);
          projected[i] = pr;
          avgZ += pr.z;
          d += (i === 0 ? "M" : "L") + pr.x.toFixed(2) + " " + pr.y.toFixed(2);
        }
        avgZ /= projected.length;
        const pathNode = arcPathRefs.current[ai];
        if (pathNode) {
          pathNode.setAttribute("d", d);
          const op =
            OPACITY_ARC_BACK +
            (OPACITY_ARC_FRONT - OPACITY_ARC_BACK) *
              Math.pow((avgZ + 1) / 2, 1.2);
          pathNode.setAttribute("opacity", op.toFixed(3));
        }

        // tNorm cycles 0→1 over `period` seconds, offset by `delay`.
        const tNorm = ((((travelElapsed + arc.delay) / arc.period) % 1) + 1) % 1;
        const sampleAt = (t: number) => {
          const f = t * (projected.length - 1);
          const i = Math.floor(f);
          const frac = f - i;
          const next = Math.min(projected.length - 1, i + 1);
          return {
            x: projected[i].x + (projected[next].x - projected[i].x) * frac,
            y: projected[i].y + (projected[next].y - projected[i].y) * frac,
            z: projected[i].z + (projected[next].z - projected[i].z) * frac,
          };
        };
        const head = sampleAt(tNorm);
        const headNode = arcNodeRefs.current[ai];
        if (headNode) {
          headNode.setAttribute("cx", head.x.toFixed(2));
          headNode.setAttribute("cy", head.y.toFixed(2));
          const visible = head.z > -0.05;
          headNode.setAttribute(
            "opacity",
            visible ? Math.min(1, 0.6 + (head.z + 0.05) * 0.4).toFixed(3) : "0"
          );
        }
        const tails = arcTailRefs.current[ai] || [];
        for (let ti = 0; ti < tails.length; ti++) {
          const tn = tails[ti];
          if (!tn) continue;
          // Each tail dot lags the head by a small fraction of the cycle.
          const tt = (((tNorm - (ti + 1) * 0.015) % 1) + 1) % 1;
          const p = sampleAt(tt);
          tn.setAttribute("cx", p.x.toFixed(2));
          tn.setAttribute("cy", p.y.toFixed(2));
          const baseOp = 0.55 * (1 - (ti + 1) / (tails.length + 0.6));
          tn.setAttribute("opacity", p.z > -0.05 ? baseOp.toFixed(3) : "0");
        }
      }
    };

    // Render a single static frame for SSR/initial paint.
    renderFrame(0, 0);

    if (reduceMotion) {
      // Static globe — still draws one frame's worth of trails so the
      // composition isn't visually empty, but nothing animates.
      return;
    }

    let raf = 0;
    let paused = false;
    let started = false;
    let t0 = performance.now();

    const tick = () => {
      if (!paused) {
        const elapsed = (performance.now() - t0) / 1000;
        const angle = (elapsed / ROTATION_PERIOD) * 2 * Math.PI;
        renderFrame(angle, elapsed);
      }
      raf = requestAnimationFrame(tick);
    };

    // Pause the RAF loop when the globe leaves the viewport. The loop
    // still ticks (so we can resume cleanly without re-doing setup)
    // but skips the actual render work.
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) {
          if (!started) {
            t0 = performance.now();
            started = true;
            raf = requestAnimationFrame(tick);
          }
          paused = false;
        } else {
          paused = true;
        }
      },
      { threshold: 0.05 }
    );
    io.observe(svgRef.current);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [dots3D, meridianSamples, arcGeom, reduceMotion]);

  // viewBox is centred on origin so transforms aren't needed — every
  // calc above runs in sphere-centric coords. VIEW_PADDING leaves room
  // for the arc bulge.
  const vbHalf = R + VIEW_PADDING;

  return (
    <div
      className={`relative h-full flex items-center justify-center text-ink-faint ${className}`}
    >
      <svg
        ref={svgRef}
        viewBox={`${-vbHalf} ${-vbHalf} ${vbHalf * 2} ${vbHalf * 2}`}
        className="w-full max-w-md"
        aria-hidden="true"
      >
        {/* ── Outer boundary circle ─────────────────────────────── */}
        <circle
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.9}
          opacity={OPACITY_BOUNDARY}
        />

        {/* ── Latitude rings (static foreshortened ellipses) ──── */}
        {latitudeRings.map((lat, i) => (
          <ellipse
            key={`lat-${i}`}
            cx={0}
            cy={lat.cy}
            rx={lat.rx}
            ry={Math.max(0.5, lat.ry)}
            fill="none"
            stroke="currentColor"
            strokeWidth={lat.isEquator ? 0.7 : 0.55}
            opacity={lat.isEquator ? OPACITY_EQUATOR : OPACITY_LATITUDE}
          />
        ))}

        {/* ── Surface dot lattice (animated via RAF) ───────────── */}
        <g>
          {dots3D.map((_, i) => (
            <circle
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              cx={0}
              cy={0}
              r={0.85}
              fill="currentColor"
              opacity={0}
            />
          ))}
        </g>

        {/* ── Meridians (animated paths, rotate with globe) ─────── */}
        {meridianSamples.map((_, i) => (
          <path
            key={`mer-${i}`}
            ref={(el) => {
              meridianRefs.current[i] = el;
            }}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.6}
            opacity={OPACITY_MERIDIAN_FRONT}
            strokeLinecap="round"
          />
        ))}

        {/* ── Route arcs: dim path + tail dots + bright head ───── */}
        {arcGeom.map((_, i) => {
          if (!arcTailRefs.current[i]) {
            arcTailRefs.current[i] = new Array(TAIL_COUNT).fill(null);
          }
          return (
            <g key={`arc-${i}`}>
              <path
                ref={(el) => {
                  arcPathRefs.current[i] = el;
                }}
                fill="none"
                stroke="currentColor"
                strokeWidth={0.7}
                opacity={OPACITY_ARC_FRONT}
                strokeLinecap="round"
              />
              {Array.from({ length: TAIL_COUNT }).map((_, ti) => (
                <circle
                  key={ti}
                  ref={(el) => {
                    arcTailRefs.current[i][ti] = el;
                  }}
                  cx={0}
                  cy={0}
                  r={Math.max(0.7, 1.7 - ti * 0.25)}
                  fill="currentColor"
                  opacity={0}
                />
              ))}
              <circle
                ref={(el) => {
                  arcNodeRefs.current[i] = el;
                }}
                cx={0}
                cy={0}
                r={2.3}
                fill="currentColor"
                opacity={0}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
