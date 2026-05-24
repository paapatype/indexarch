"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

// useLayoutEffect emits an SSR warning when called on the server. Since
// the component is "use client" but Next.js still pre-renders it for
// the initial HTML, we resolve to useEffect on the server (where it
// would no-op anyway) and useLayoutEffect on the client (where we want
// the synchronous-before-paint behaviour for the first dot/arc frame).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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

// Path resolution along each great-circle arc.
const ARC_SAMPLES = 64;

// Color — all elements use currentColor so the globe inherits from the
// parent text class (text-ink-faint), which automatically swaps between
// light and dark themes. Per-element opacity controls the hierarchy.
// Opacity values are tuned for the new `--color-graphic-stroke` token
// (graphite-on-cream in light mode, warm cream-on-black in dark). All
// values bumped from the previous palette so dots are clearly visible
// from the first frame — particularly in dark mode where the prior
// max of 0.55 left front-side dots only just-perceptible during the
// parent's 600ms entrance fade.
const OPACITY_BOUNDARY = 0.4;
const OPACITY_LATITUDE = 0.25;
const OPACITY_EQUATOR = 0.4;
const OPACITY_MERIDIAN_FRONT = 0.45;
const OPACITY_MERIDIAN_BACK = 0.1;
const OPACITY_DOT_FRONT_MAX = 0.75;
const OPACITY_DOT_BACK_MIN = 0.08;

// ── Signal trail ───────────────────────────────────────────────────
// The route arcs are NOT drawn as a static pre-existing rail. The full
// arc geometry is held as an invisible motion path; only the segment
// BEHIND the moving pointer is rendered. The viewer reads the arc as
// being "drawn" by the pointer in real time — a signal travelling
// from origin to destination rather than a dot riding a visible orbit.
const OPACITY_TRAIL_FRONT = 0.55;
const OPACITY_TRAIL_BACK = 0.1;

// Tiny static dots pinned to the start and end of each route so the
// trail reads as a connection between two known points rather than a
// free-floating line in space.
const OPACITY_ENDPOINT_FRONT = 0.55;
const OPACITY_ENDPOINT_BACK = 0.1;

// Expanding stroke-only ring drawn at origin ("signal sent") and
// destination ("signal arrived"). Restrained scale — never more than
// a few units in radius, never bright enough to read as a cartoon
// blip.
const BLIP_PEAK_OPACITY = 0.6;
const BLIP_RADIUS_START = 1.5;
const BLIP_RADIUS_END = 6;

// ── Animation phases (per arc) ─────────────────────────────────────
// Each fraction is relative to one arc's `period` (7.6–9.2s). The
// send → travel → arrive → hold → fade envelope reads as a single
// connected event rather than continuous orbital movement:
//
//   0 ─── ORIGIN_BLIP_END             : pulse at origin (~0.5s)
//   TRAVEL_START ─── TRAVEL_END       : pointer crosses, trail draws
//                                       (~2.7–3.2s — feels deliberate)
//   DEST_BLIP_START ─── DEST_BLIP_END : pulse at destination (~1s)
//   HOLD_END ─── FADE_END             : trail fades out (~0.8s)
//   FADE_END ─── 1                    : rest (~3s of quiet)
const PHASE_ORIGIN_BLIP_END = 0.07;
const PHASE_TRAVEL_START = 0.05;
const PHASE_TRAVEL_END = 0.4;
const PHASE_DEST_BLIP_START = 0.37;
const PHASE_DEST_BLIP_END = 0.48;
const PHASE_HOLD_END = 0.5;
const PHASE_FADE_END = 0.6;

// Easing for trail-draw + pointer travel. cubic-bezier(0.22, 1, 0.36, 1)
// matches the existing site easing — smooth start, no bounce, calm
// settle at the destination.
function easeOutExpo(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return 1 - Math.pow(1 - t, 3);
}

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
  // We intentionally do NOT reset dotRefs.current when dotCount changes:
  // React's inline ref callbacks below already manage attach/detach
  // (callbacks fire during commit with the new element or null), and an
  // explicit `dotRefs.current = new Array(dotCount).fill(null)` in a
  // useEffect would wipe the just-attached refs AFTER React mounts —
  // leaving the first renderFrame call iterating an all-null array, so
  // dots stayed invisible until some other re-render re-ran the ref
  // callbacks. The animation loop's `for (i = 0; i < dots3D.length)`
  // bounds iteration to live entries, so stale trailing nulls are safe.
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const meridianRefs = useRef<(SVGPathElement | null)[]>([]);
  // Arc refs (signal-trail rendering, one of each per arc):
  //   trailPath  — partial path drawn from origin to current pointer
  //   pointer    — moving dot; the "head" of the signal
  //   originMarker / destMarker — tiny static dots pinning the route
  //   originBlip / destBlip     — expanding rings, pulse at start/end
  const trailPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const pointerRefs = useRef<(SVGCircleElement | null)[]>([]);
  const originMarkerRefs = useRef<(SVGCircleElement | null)[]>([]);
  const destMarkerRefs = useRef<(SVGCircleElement | null)[]>([]);
  const originBlipRefs = useRef<(SVGCircleElement | null)[]>([]);
  const destBlipRefs = useRef<(SVGCircleElement | null)[]>([]);

  // ── Animation loop ───────────────────────────────────────────────
  // useIsoLayoutEffect (= useLayoutEffect in the browser) so the initial
  // renderFrame(0, 0) call positions dots/meridians/arcs synchronously
  // after React commits but BEFORE the browser's first paint. Otherwise
  // we'd paint one frame with every dot stacked at cx=0,cy=0,opacity=0
  // (the JSX defaults) before the position pass landed — perceptible on
  // slower hardware as a brief empty globe.
  useIsoLayoutEffect(() => {
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

      // ── Signal-trail arcs ─────────────────────────────────────────
      // For each arc we render five things, all driven by a single
      // `tNorm` cycle in [0, 1]:
      //   1. endpoint markers — tiny static dots at samples[0] and
      //      samples[last] so the route reads as a connection.
      //   2. origin blip — expanding ring at samples[0] during the
      //      first PHASE_ORIGIN_BLIP_END of the cycle ("signal sent").
      //   3. trail path — only the segment from samples[0] up to the
      //      pointer's current position is drawn. The full route is
      //      NEVER visible.
      //   4. pointer — a moving dot at the trail's leading edge.
      //   5. destination blip — expanding ring at samples[last] as the
      //      pointer arrives ("signal arrived").
      // After the pointer reaches destination, the trail is held for
      // a moment then fades cleanly to zero before the loop restarts.
      for (let ai = 0; ai < arcGeom.length; ai++) {
        const arc = arcGeom[ai];

        // Project every sample once — used for the trail rebuild,
        // pointer position, and endpoint markers.
        const projected: { x: number; y: number; z: number }[] = new Array(arc.samples.length);
        for (let i = 0; i < arc.samples.length; i++) {
          projected[i] = project(arc.samples[i], cosW, sinW);
        }
        const lastIdx = projected.length - 1;
        const origin = projected[0];
        const dest = projected[lastIdx];

        // tNorm cycles 0→1 over `period` seconds, offset by `delay`.
        const tNorm = ((((travelElapsed + arc.delay) / arc.period) % 1) + 1) % 1;

        // Travel progress maps the [TRAVEL_START, TRAVEL_END] sub-range
        // of tNorm to [0, 1] and runs it through easeOutExpo so the
        // pointer accelerates out of the origin then settles into the
        // destination — never a flat constant velocity.
        const rawTravel =
          tNorm < PHASE_TRAVEL_START
            ? 0
            : tNorm > PHASE_TRAVEL_END
            ? 1
            : (tNorm - PHASE_TRAVEL_START) /
              (PHASE_TRAVEL_END - PHASE_TRAVEL_START);
        const travelT = easeOutExpo(rawTravel);

        // Trail-opacity envelope: 0 before travel, 1 while drawing
        // and holding, ramp to 0 across the fade phase.
        let envelope: number;
        if (tNorm < PHASE_TRAVEL_START) {
          envelope = 0;
        } else if (tNorm < PHASE_HOLD_END) {
          envelope = 1;
        } else if (tNorm < PHASE_FADE_END) {
          envelope =
            1 -
            (tNorm - PHASE_HOLD_END) / (PHASE_FADE_END - PHASE_HOLD_END);
        } else {
          envelope = 0;
        }

        // Trail path — build the polyline from samples[0] to the
        // pointer position. The fractional last segment is interpolated
        // so the trail's leading edge sits exactly under the pointer
        // rather than snapping to the nearest sample.
        const trailNode = trailPathRefs.current[ai];
        if (trailNode) {
          if (envelope <= 0 || travelT <= 0) {
            trailNode.setAttribute("opacity", "0");
          } else {
            const f = travelT * lastIdx;
            const fullIdx = Math.floor(f);
            const frac = f - fullIdx;
            let d = "";
            let depthSum = 0;
            let depthCount = 0;
            for (let i = 0; i <= fullIdx; i++) {
              const p = projected[i];
              d +=
                (i === 0 ? "M" : "L") +
                p.x.toFixed(2) +
                " " +
                p.y.toFixed(2);
              depthSum += p.z;
              depthCount++;
            }
            if (fullIdx < lastIdx && frac > 0.001) {
              const a = projected[fullIdx];
              const b = projected[fullIdx + 1];
              const ix = a.x + (b.x - a.x) * frac;
              const iy = a.y + (b.y - a.y) * frac;
              const iz = a.z + (b.z - a.z) * frac;
              d += "L" + ix.toFixed(2) + " " + iy.toFixed(2);
              depthSum += iz;
              depthCount++;
            }
            const avgZ = depthSum / Math.max(1, depthCount);
            const depthOp =
              OPACITY_TRAIL_BACK +
              (OPACITY_TRAIL_FRONT - OPACITY_TRAIL_BACK) *
                Math.pow((avgZ + 1) / 2, 1.2);
            trailNode.setAttribute("d", d);
            trailNode.setAttribute("opacity", (envelope * depthOp).toFixed(3));
          }
        }

        // Pointer — at the leading edge of the trail. Fade in across
        // the very first slice of travel, fade out as the destination
        // blip takes over, so the pointer never "pops" on/off.
        const pointerNode = pointerRefs.current[ai];
        if (pointerNode) {
          const visible =
            tNorm >= PHASE_TRAVEL_START && tNorm < PHASE_DEST_BLIP_END;
          if (!visible) {
            pointerNode.setAttribute("opacity", "0");
          } else {
            const f = travelT * lastIdx;
            const fullIdx = Math.floor(f);
            const frac = f - fullIdx;
            const next = Math.min(lastIdx, fullIdx + 1);
            const px =
              projected[fullIdx].x +
              (projected[next].x - projected[fullIdx].x) * frac;
            const py =
              projected[fullIdx].y +
              (projected[next].y - projected[fullIdx].y) * frac;
            const pz =
              projected[fullIdx].z +
              (projected[next].z - projected[fullIdx].z) * frac;
            // Soft fade-in 30ms of cycle, fade-out across dest-blip phase.
            const FADE_IN = 0.03;
            const FADE_OUT_START = PHASE_TRAVEL_END;
            let pulseOp = 1;
            if (tNorm < PHASE_TRAVEL_START + FADE_IN) {
              pulseOp = (tNorm - PHASE_TRAVEL_START) / FADE_IN;
            } else if (tNorm > FADE_OUT_START) {
              pulseOp = Math.max(
                0,
                1 - (tNorm - FADE_OUT_START) / (PHASE_DEST_BLIP_END - FADE_OUT_START)
              );
            }
            const depthOp =
              0.45 + 0.55 * Math.pow((pz + 1) / 2, 1.2);
            pointerNode.setAttribute("cx", px.toFixed(2));
            pointerNode.setAttribute("cy", py.toFixed(2));
            pointerNode.setAttribute(
              "opacity",
              (pulseOp * depthOp).toFixed(3)
            );
          }
        }

        // Static endpoint markers — quiet anchor dots so the trail
        // doesn't look like it floats. Update position every frame
        // (the globe rotates) and dim on the back hemisphere.
        const originMarkerNode = originMarkerRefs.current[ai];
        if (originMarkerNode) {
          originMarkerNode.setAttribute("cx", origin.x.toFixed(2));
          originMarkerNode.setAttribute("cy", origin.y.toFixed(2));
          const op =
            OPACITY_ENDPOINT_BACK +
            (OPACITY_ENDPOINT_FRONT - OPACITY_ENDPOINT_BACK) *
              Math.pow((origin.z + 1) / 2, 1.4);
          originMarkerNode.setAttribute("opacity", op.toFixed(3));
        }
        const destMarkerNode = destMarkerRefs.current[ai];
        if (destMarkerNode) {
          destMarkerNode.setAttribute("cx", dest.x.toFixed(2));
          destMarkerNode.setAttribute("cy", dest.y.toFixed(2));
          const op =
            OPACITY_ENDPOINT_BACK +
            (OPACITY_ENDPOINT_FRONT - OPACITY_ENDPOINT_BACK) *
              Math.pow((dest.z + 1) / 2, 1.4);
          destMarkerNode.setAttribute("opacity", op.toFixed(3));
        }

        // Origin blip — expanding ring drawn over the origin marker
        // at the very start of the cycle ("signal sent"). Radius
        // grows from BLIP_RADIUS_START to BLIP_RADIUS_END and the
        // ring fades from BLIP_PEAK_OPACITY to 0 over the phase.
        const originBlipNode = originBlipRefs.current[ai];
        if (originBlipNode) {
          if (tNorm < PHASE_ORIGIN_BLIP_END) {
            const bt = tNorm / PHASE_ORIGIN_BLIP_END;
            const r =
              BLIP_RADIUS_START +
              (BLIP_RADIUS_END - BLIP_RADIUS_START) * easeOutExpo(bt);
            const depth = (origin.z + 1) / 2; // dim if back
            const op = (1 - bt) * BLIP_PEAK_OPACITY * (0.25 + 0.75 * depth);
            originBlipNode.setAttribute("cx", origin.x.toFixed(2));
            originBlipNode.setAttribute("cy", origin.y.toFixed(2));
            originBlipNode.setAttribute("r", r.toFixed(2));
            originBlipNode.setAttribute("opacity", op.toFixed(3));
          } else {
            originBlipNode.setAttribute("opacity", "0");
          }
        }

        // Destination blip — same treatment as origin, slightly
        // larger peak radius to read as the "arrival" event.
        const destBlipNode = destBlipRefs.current[ai];
        if (destBlipNode) {
          if (
            tNorm >= PHASE_DEST_BLIP_START &&
            tNorm < PHASE_DEST_BLIP_END
          ) {
            const bt =
              (tNorm - PHASE_DEST_BLIP_START) /
              (PHASE_DEST_BLIP_END - PHASE_DEST_BLIP_START);
            const r =
              BLIP_RADIUS_START +
              (BLIP_RADIUS_END + 1 - BLIP_RADIUS_START) * easeOutExpo(bt);
            const depth = (dest.z + 1) / 2;
            const op = (1 - bt) * (BLIP_PEAK_OPACITY + 0.05) * (0.25 + 0.75 * depth);
            destBlipNode.setAttribute("cx", dest.x.toFixed(2));
            destBlipNode.setAttribute("cy", dest.y.toFixed(2));
            destBlipNode.setAttribute("r", r.toFixed(2));
            destBlipNode.setAttribute("opacity", op.toFixed(3));
          } else {
            destBlipNode.setAttribute("opacity", "0");
          }
        }
      }
    };

    // Render a single static frame for SSR/initial paint.
    renderFrame(0, 0);

    if (reduceMotion) {
      // Reduce-motion fallback: replace the animated arc treatment
      // (blip pulse + empty trail at tNorm=0) with a calmer static
      // composition — full faded route between origin and destination,
      // endpoints visible, no pointer, no pulsing rings.
      const cosW0 = 1;
      const sinW0 = 0;
      for (let ai = 0; ai < arcGeom.length; ai++) {
        const arc = arcGeom[ai];
        const trailNode = trailPathRefs.current[ai];
        if (trailNode) {
          let d = "";
          let depthSum = 0;
          for (let i = 0; i < arc.samples.length; i++) {
            const pr = project(arc.samples[i], cosW0, sinW0);
            d +=
              (i === 0 ? "M" : "L") +
              pr.x.toFixed(2) +
              " " +
              pr.y.toFixed(2);
            depthSum += pr.z;
          }
          const avgZ = depthSum / arc.samples.length;
          const depthOp =
            OPACITY_TRAIL_BACK +
            (OPACITY_TRAIL_FRONT - OPACITY_TRAIL_BACK) *
              Math.pow((avgZ + 1) / 2, 1.2);
          // Calmer than the animated peak — reduce-motion users see a
          // hint of the route, not a bright traced signal.
          trailNode.setAttribute("d", d);
          trailNode.setAttribute("opacity", (depthOp * 0.65).toFixed(3));
        }
        // Hide pulsing/moving elements; endpoint markers stay visible
        // from the renderFrame call above.
        const pointerNode = pointerRefs.current[ai];
        if (pointerNode) pointerNode.setAttribute("opacity", "0");
        const originBlipNode = originBlipRefs.current[ai];
        if (originBlipNode) originBlipNode.setAttribute("opacity", "0");
        const destBlipNode = destBlipRefs.current[ai];
        if (destBlipNode) destBlipNode.setAttribute("opacity", "0");
      }
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
      className={`problem-graphic-color relative h-full flex items-center justify-center ${className}`}
    >
      <svg
        ref={svgRef}
        viewBox={`${-vbHalf} ${-vbHalf} ${vbHalf * 2} ${vbHalf * 2}`}
        // Constrain by container height first so the square globe
        // never spills past its mobile slot when the wrapper is
        // narrower than tall.
        className="h-auto max-h-full w-auto max-w-md"
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

        {/* ── Route arcs (signal trail) ──────────────────────────
            Per arc we render, in painting order:
              endpoint markers (back layer, low opacity dots)
              trail path       (only drawn from origin to pointer)
              origin blip ring (pulse at start of cycle)
              destination blip ring (pulse at end of travel)
              pointer dot      (front layer, brightest)
            Every element starts with opacity={0} and zero geometry;
            the RAF loop in the effect above mutates these attributes
            each frame. Nothing here renders a full pre-drawn route. */}
        {arcGeom.map((_, i) => (
          <g key={`arc-${i}`}>
            {/* Static endpoint markers — small, restrained. */}
            <circle
              ref={(el) => {
                originMarkerRefs.current[i] = el;
              }}
              cx={0}
              cy={0}
              r={1.6}
              fill="currentColor"
              opacity={0}
            />
            <circle
              ref={(el) => {
                destMarkerRefs.current[i] = el;
              }}
              cx={0}
              cy={0}
              r={1.6}
              fill="currentColor"
              opacity={0}
            />
            {/* Trail — progressively-drawn path. The full route is
                never rendered; only the segment behind the pointer.
                strokeLinejoin=round keeps the leading edge crisp. */}
            <path
              ref={(el) => {
                trailPathRefs.current[i] = el;
              }}
              fill="none"
              stroke="currentColor"
              strokeWidth={0.85}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0}
            />
            {/* Pulse rings — stroke-only so they read as expanding
                signal waves rather than filled dots. */}
            <circle
              ref={(el) => {
                originBlipRefs.current[i] = el;
              }}
              cx={0}
              cy={0}
              r={BLIP_RADIUS_START}
              fill="none"
              stroke="currentColor"
              strokeWidth={0.55}
              opacity={0}
            />
            <circle
              ref={(el) => {
                destBlipRefs.current[i] = el;
              }}
              cx={0}
              cy={0}
              r={BLIP_RADIUS_START}
              fill="none"
              stroke="currentColor"
              strokeWidth={0.55}
              opacity={0}
            />
            {/* Pointer — the moving signal head, brightest element
                of the arc system. */}
            <circle
              ref={(el) => {
                pointerRefs.current[i] = el;
              }}
              cx={0}
              cy={0}
              r={2.1}
              fill="currentColor"
              opacity={0}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
