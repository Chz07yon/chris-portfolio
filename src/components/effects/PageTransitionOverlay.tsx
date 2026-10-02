"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, type WorldSwitchState } from "@/context/ThemeContext";
import { ApertureEmblem, CircuitEmblem, MandalaMotif } from "@/components/emblems";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerReducedMotionSnapshot() {
  return false;
}

export function PageTransitionOverlay() {
  const pathname = usePathname();
  const { worldSwitchState } = useTheme();

  const prevPathRef = useRef(pathname);
  const [inWorldType, setInWorldType] = useState<"engineer" | "studio" | null>(null);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  );

  // IN-WORLD PAGE NAVIGATION (Phase 6)
  useEffect(() => {
    const prevPath = prevPathRef.current;
    prevPathRef.current = pathname;

    // Skip on initial mount, same path, or during world-switch
    if (!prevPath || prevPath === pathname || worldSwitchState.isSwitching) return;

    const wasEng = prevPath.startsWith("/engineer") || prevPath === "/";
    const isNowEng = pathname.startsWith("/engineer") || pathname === "/";
    const wasStudio = prevPath.startsWith("/studio");
    const isNowStudio = pathname.startsWith("/studio");

    // In-world Engineer transition (~780ms)
    if (wasEng && isNowEng) {
      setInWorldType("engineer");
      const timer = setTimeout(() => {
        setInWorldType(null);
      }, isReducedMotion ? 220 : 780);
      return () => clearTimeout(timer);
    }

    // In-world Studio transition (Phase 6: Mandala Converge ~940ms)
    if (wasStudio && isNowStudio) {
      setInWorldType("studio");
      const timer = setTimeout(() => {
        setInWorldType(null);
      }, isReducedMotion ? 200 : 940);
      return () => clearTimeout(timer);
    }
  }, [pathname, isReducedMotion, worldSwitchState.isSwitching]);

  // World-Switch Origin & Colors
  const { isSwitching, phase, fromMode, toMode, origin } = worldSwitchState;
  const outgoingAccent = fromMode === "engineer" ? "#00FF9C" : "#C8102E";
  const outgoingBg = fromMode === "engineer" ? "#050807" : "#F6EFE4";

  return (
    <>
      {/* 1. WORLD-SWITCH TRANSITION (PHASE 7: "EMBLEM MATERIALIZE") */}
      <AnimatePresence>
        {isSwitching && (
          <WorldEmblemMaterializeTransition
            worldSwitchState={worldSwitchState}
            isReducedMotion={isReducedMotion}
          />
        )}
      </AnimatePresence>

      {/* 2. IN-WORLD PAGE-TO-PAGE TRANSITIONS (PHASE 6) */}
      <AnimatePresence>
        {inWorldType && !isSwitching && (
          <div className="fixed inset-0 z-[9990] pointer-events-none overflow-hidden flex items-center justify-center">
            {isReducedMotion ? (
              // Reduced motion: simple 200ms crossfade
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`absolute inset-0 ${
                  inWorldType === "engineer" ? "bg-[#050807]" : "bg-[#F6EFE4]"
                }`}
              />
            ) : inWorldType === "engineer" ? (
              // ENGINEER: Animated circuit-trace lines drawing across the screen from edges toward center (~700ms)
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.72, times: [0, 0.18, 0.82, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-[#050807]/60 backdrop-blur-[2px]" />

                <svg
                  className="w-full h-full absolute inset-0 pointer-events-none"
                  viewBox="0 0 1000 600"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 0 50 L 250 50 L 380 220 L 500 300"
                    fill="none"
                    stroke="#00FF9C"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1] }}
                    transition={{ duration: 0.58, ease: [0.25, 1, 0.5, 1] }}
                    filter="drop-shadow(0 0 6px #00FF9C)"
                  />
                  <motion.path
                    d="M 1000 60 L 780 60 L 640 220 L 500 300"
                    fill="none"
                    stroke="#00FF9C"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1] }}
                    transition={{ duration: 0.58, ease: [0.25, 1, 0.5, 1] }}
                    filter="drop-shadow(0 0 6px #00FF9C)"
                  />
                  <motion.path
                    d="M 0 520 L 220 520 L 360 380 L 500 300"
                    fill="none"
                    stroke="#00FF9C"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1] }}
                    transition={{ duration: 0.58, ease: [0.25, 1, 0.5, 1] }}
                    filter="drop-shadow(0 0 6px #00FF9C)"
                  />
                  <motion.path
                    d="M 1000 540 L 760 540 L 630 380 L 500 300"
                    fill="none"
                    stroke="#00FF9C"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1] }}
                    transition={{ duration: 0.58, ease: [0.25, 1, 0.5, 1] }}
                    filter="drop-shadow(0 0 6px #00FF9C)"
                  />
                  <motion.path
                    d="M 500 0 L 500 160 L 500 300"
                    fill="none"
                    stroke="#FFC900"
                    strokeWidth="1.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1] }}
                    transition={{ duration: 0.52, ease: [0.25, 1, 0.5, 1] }}
                    filter="drop-shadow(0 0 5px #FFC900)"
                  />
                  <motion.path
                    d="M 500 600 L 500 440 L 500 300"
                    fill="none"
                    stroke="#FFC900"
                    strokeWidth="1.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1] }}
                    transition={{ duration: 0.52, ease: [0.25, 1, 0.5, 1] }}
                    filter="drop-shadow(0 0 5px #FFC900)"
                  />

                  <circle cx="250" cy="50" r="3.5" fill="#FFC900" />
                  <circle cx="780" cy="60" r="3.5" fill="#FFC900" />
                  <circle cx="220" cy="520" r="3.5" fill="#FFC900" />
                  <circle cx="760" cy="540" r="3.5" fill="#FFC900" />

                  <circle
                    cx="500"
                    cy="300"
                    r="6"
                    fill="#00FF9C"
                    filter="drop-shadow(0 0 10px #00FF9C)"
                  />
                </svg>

                <motion.div
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: [0.2, 1, 1.25], opacity: [0, 0.95, 0] }}
                  transition={{ duration: 0.68, ease: "easeOut" }}
                  className="absolute flex items-center justify-center pointer-events-none"
                >
                  <CircuitEmblem size={140} drawProgress={1} />
                </motion.div>
              </motion.div>
            ) : (
              // STUDIO: Phase 6 "Mandala Converge" (v2) in-page transition (~940ms)
              <StudioMandalaConverge />
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * PHASE 6 (STUDIO): In-Page Transition — "Mandala Converge" (v2) (~650ms total)
 *
 * Replaces "Mandala Bloom." On Studio page-to-page navigation, the pattern travels INWARD from edges:
 * 1. (0-300ms) Thin mandala-petal stroke fragments appear scattered near the four edges/corners,
 *    then animate traveling inward toward center — converging, scaling down slightly (1.35 → 1.0)
 *    like the pattern is being pulled into a single point.
 * 2. (300-400ms) As fragments arrive at center, they assemble/snap into the complete <MandalaMotif />
 *    fully formed at center for a brief beat (~100ms) — page content swaps underneath, hidden by converged motif.
 * 3. (400-650ms) The assembled motif at center fades out (opacity 1→0) while scaling down slightly (1 → 0.85),
 *    revealing the new page's content.
 * 4. Reduced-motion fallback: skipped in parent (flat 200ms crossfade).
 */
function StudioMandalaConverge() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 1, 0] }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.92,
        times: [0, 420 / 920, 580 / 920, 1],
        ease: "easeOut",
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {/* Warm Studio veil backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#F6EFE4]/80 backdrop-blur-[3px]"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 1, 0] }}
        transition={{
          duration: 0.92,
          times: [0, 420 / 920, 580 / 920, 1],
          ease: "easeInOut",
        }}
      />

      {/* Centered Converging Mandala Pattern */}
      <div className="relative flex items-center justify-center select-none">
        <svg
          viewBox="0 0 200 200"
          width="320"
          height="320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="select-none overflow-visible"
        >
          <defs>
            <filter
              id="mandala-converge-glow"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="2.5"
                floodColor="#C8102E"
                floodOpacity="0.45"
              />
            </filter>
          </defs>

          {/* 1. (0-420ms) 8 Thin Petal Stroke Fragments Converging Inward */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = i * 45;
            const isEven = i % 2 === 0;
            const strokeColor = isEven ? "#C8102E" : "#C99A2E";
            const stamenColor = isEven ? "#C99A2E" : "#C8102E";

            return (
              <g key={i} transform={`rotate(${angle} 100 100)`}>
                <motion.g
                  initial={{ y: -360, scale: 1.35, opacity: 0 }}
                  animate={{
                    y: [-360, 0, 0, 0],
                    scale: [1.35, 1, 1, 0.88],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 0.92,
                    times: [0, 420 / 920, 580 / 920, 1],
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: "100px 100px" }}
                >
                  {/* Outer concentric arc fragment at petal tip */}
                  <path
                    d="M 80 14 A 86 86 0 0 1 120 14"
                    fill="none"
                    stroke="#C99A2E"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity={0.8}
                  />
                  {/* Outer lotus petal contour */}
                  <path
                    d="M 100 78 C 82 55, 84 28, 100 14 C 116 28, 118 55, 100 78"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    filter="url(#mandala-converge-glow)"
                  />
                  {/* Inner stamen core line */}
                  <path
                    d="M 100 78 L 100 36"
                    fill="none"
                    stroke={stamenColor}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity={0.85}
                  />
                </motion.g>
              </g>
            );
          })}

          {/* 2. (420-580ms) Central Core Rings: snap into place as petals arrive */}
          <motion.g
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 0, 1, 1, 0],
              scale: [0.4, 0.4, 1, 1, 0.88],
            }}
            transition={{
              duration: 0.92,
              times: [0, 390 / 920, 420 / 920, 580 / 920, 1],
              ease: "easeOut",
            }}
            style={{ transformOrigin: "100px 100px" }}
          >
            {/* Innermost seed circle */}
            <circle
              cx="100"
              cy="100"
              r="8"
              fill="none"
              stroke="#C99A2E"
              strokeWidth="1.8"
            />
            <circle cx="100" cy="100" r="3" fill="#C8102E" />

            {/* Inner hub ring */}
            <circle
              cx="100"
              cy="100"
              r="24"
              fill="none"
              stroke="#C8102E"
              strokeWidth="1.6"
            />

            {/* Outer concentric dotted accent ring */}
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="#C99A2E"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              opacity={0.5}
            />
          </motion.g>
        </svg>
      </div>
    </motion.div>
  );
}

/**
 * PHASE 7: WORLD-SWITCH TRANSITION — "EMBLEM MATERIALIZE" (v2)
 *
 * Trigger = pill tap. Full-screen fixed overlay, pointer-events: none, z-index max. ~1750ms total.
 * The DESTINATION world's emblem is always the one used, and it originates at SCREEN CENTER (not the pill),
 * acting as the source the transition expands from.
 *
 * SHARED SEQUENCE (both directions):
 * 1. DIM (0-300ms): semi-black overlay fades in gently over current page (opacity 0 → ~0.6).
 * 2. EMBLEM APPEARS (300-700ms): destination world's emblem fades + scales in smoothly at center,
 *    size ~140px, fully formed & legible. Holds (~150ms) once visible.
 * 3. EMBLEM-DRIVEN REVEAL (700-1400ms): radiates outward from emblem's position (center):
 *    - ENGINEER → STUDIO: <ApertureEmblem progress=0→1 /> blades rotate open at center.
 *      Opening grows into circular mask/clip-path expanding from center, revealing Studio page (ivory), swallowing dim.
 *    - STUDIO → ENGINEER: <CircuitEmblem /> at center line-draws strokes (dashoffset 1→0) while thin circuit traces
 *      shoot outward toward screen edges, branching as they travel; where traces pass, dimmed overlay clears to reveal Engineer page.
 * 4. SETTLE (1400-1750ms): emblem fades out gently (opacity 1→0), dim fully clears, destination page visible and interactive.
 *
 * Route change + CSS variable swap happens at START of step 3 (700ms), hidden beneath dim/emblem.
 * Reduced-motion fallback: flat 200ms crossfade + instant swap, no dim, no emblem, no traces.
 */

// Outward branching PCB traces radiating from center (500, 500) to screen edges/corners in 8 directions
const OUTWARD_CIRCUIT_TRACES = [
  // North branch & sub-branches
  "M 500 425 L 500 310 L 460 230 L 460 70 L 430 0",
  "M 460 230 L 540 150 L 540 0",
  "M 500 310 L 550 260 L 550 140 L 610 80 L 610 0",

  // North-East branch & sub-branches
  "M 555 445 L 640 360 L 760 360 L 880 240 L 1000 240",
  "M 760 360 L 840 280 L 840 120 L 960 0",
  "M 640 360 L 690 310 L 690 180 L 780 90 L 780 0",

  // East branch & sub-branches
  "M 575 500 L 700 500 L 780 440 L 910 440 L 1000 440",
  "M 700 500 L 770 570 L 890 570 L 1000 570",
  "M 780 440 L 850 510 L 1000 510",

  // South-East branch & sub-branches
  "M 555 555 L 650 650 L 780 650 L 890 760 L 1000 760",
  "M 780 650 L 860 730 L 860 880 L 980 1000",
  "M 650 650 L 720 720 L 720 860 L 820 960 L 820 1000",

  // South branch & sub-branches
  "M 500 575 L 500 690 L 540 770 L 540 910 L 510 1000",
  "M 500 690 L 450 770 L 450 920 L 420 1000",
  "M 540 770 L 610 840 L 610 1000",

  // South-West branch & sub-branches
  "M 445 555 L 350 650 L 220 650 L 110 760 L 0 760",
  "M 220 650 L 140 730 L 140 880 L 20 1000",
  "M 350 650 L 280 720 L 280 860 L 180 960 L 180 1000",

  // West branch & sub-branches
  "M 425 500 L 300 500 L 220 560 L 90 560 L 0 560",
  "M 300 500 L 230 430 L 110 430 L 0 430",
  "M 220 560 L 150 490 L 0 490",

  // North-West branch & sub-branches
  "M 445 445 L 360 360 L 240 360 L 120 240 L 0 240",
  "M 240 360 L 160 280 L 160 120 L 40 0",
  "M 360 360 L 310 310 L 310 180 L 220 90 L 220 0",
];

const OUTWARD_CIRCUIT_VIAS = [
  { x: 500, y: 310, r: 3.5, color: "#FFC900", threshold: 0.35 },
  { x: 460, y: 230, r: 4, color: "#00FF9C", threshold: 0.55 },
  { x: 640, y: 360, r: 4, color: "#00FF9C", threshold: 0.4 },
  { x: 760, y: 360, r: 3.5, color: "#FFC900", threshold: 0.6 },
  { x: 700, y: 500, r: 4, color: "#00FF9C", threshold: 0.4 },
  { x: 780, y: 440, r: 3.5, color: "#FFC900", threshold: 0.6 },
  { x: 650, y: 650, r: 4, color: "#00FF9C", threshold: 0.42 },
  { x: 780, y: 650, r: 3.5, color: "#FFC900", threshold: 0.62 },
  { x: 500, y: 690, r: 4, color: "#00FF9C", threshold: 0.38 },
  { x: 540, y: 770, r: 3.5, color: "#FFC900", threshold: 0.58 },
  { x: 350, y: 650, r: 4, color: "#00FF9C", threshold: 0.42 },
  { x: 220, y: 650, r: 3.5, color: "#FFC900", threshold: 0.62 },
  { x: 300, y: 500, r: 4, color: "#00FF9C", threshold: 0.4 },
  { x: 220, y: 560, r: 3.5, color: "#FFC900", threshold: 0.6 },
  { x: 360, y: 360, r: 4, color: "#00FF9C", threshold: 0.4 },
  { x: 240, y: 360, r: 3.5, color: "#FFC900", threshold: 0.6 },
];

function WorldEmblemMaterializeTransition({
  worldSwitchState,
  isReducedMotion,
}: {
  worldSwitchState: WorldSwitchState;
  isReducedMotion: boolean;
}) {
  const { phase, toMode } = worldSwitchState;
  const isTargetStudio = toMode === "studio";

  // Dynamic progress value for emblem internal animation (blades rotating open or circuit line drawing)
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    if (isReducedMotion) return;

    if (phase === "dim" || phase === "emblem") {
      setRevealProgress(0);
    } else if (phase === "reveal") {
      let animId: number;
      const startTime = performance.now();
      const DURATION = 700; // 700ms smooth reveal duration (700ms - 1400ms)

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / DURATION);
        // Luxurious smooth easeOutCubic curve
        const eased = 1 - Math.pow(1 - p, 2.5);
        setRevealProgress(eased);

        if (elapsed < DURATION) {
          animId = requestAnimationFrame(tick);
        } else {
          setRevealProgress(1);
        }
      };

      animId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animId);
    } else if (phase === "settle") {
      setRevealProgress(1);
    }
  }, [phase, isReducedMotion]);

  // Reduced motion: flat 200ms crossfade, NO emblems, NO traces
  if (isReducedMotion) {
    return (
      <div className="fixed inset-0 z-[100000] pointer-events-none select-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.75, 0] }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`absolute inset-0 ${
            toMode === "engineer" ? "bg-[#050807]" : "bg-[#F6EFE4]"
          }`}
        />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100000] pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. DIM OVERLAY (0-300ms fades 0 → 0.6, clears at 1400-1750ms)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity:
            phase === "dim"
              ? 0.6
              : phase === "emblem"
              ? 0.6
              : phase === "reveal"
              ? 0.6
              : 0,
        }}
        transition={{
          duration: phase === "dim" ? 0.3 : phase === "settle" ? 0.35 : 0.05,
          ease: "easeInOut",
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          3A. ENGINEER → STUDIO: Expanding Iris Circle Mask (Ivory)
         ───────────────────────────────────────────────────────────── */}
      {isTargetStudio && (phase === "reveal" || phase === "settle") && (
        <motion.div
          className="absolute inset-0 bg-[#F6EFE4] pointer-events-none z-[100005]"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "settle" ? 0 : 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            clipPath: `circle(${revealProgress * 155}% at 50% 50%)`,
          }}
        >
          {/* Subtle warm ambient exposure halo at iris aperture edge */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(201, 154, 46, 0.25) 0%, rgba(200, 16, 46, 0.08) 50%, transparent 80%)",
            }}
          />
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3B. STUDIO → ENGINEER: Branching Traces + Dark Matrix Reveal
         ───────────────────────────────────────────────────────────── */}
      {!isTargetStudio && (phase === "reveal" || phase === "settle") && (
        <motion.div
          className="absolute inset-0 bg-[#050807] pointer-events-none z-[100005]"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "settle" ? 0 : 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            clipPath: `circle(${revealProgress * 155}% at 50% 50%)`,
          }}
        >
          {/* Outward Circuit Traces SVG radiating from center */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter
                id="outward-circuit-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="3.5"
                  floodColor="#00FF9C"
                  floodOpacity="0.8"
                />
              </filter>
            </defs>

            {/* Outward Circuit Paths */}
            <g filter="url(#outward-circuit-glow)">
              {OUTWARD_CIRCUIT_TRACES.map((d, index) => (
                <path
                  key={index}
                  d={d}
                  fill="none"
                  stroke="#00FF9C"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset={1 - revealProgress}
                />
              ))}
            </g>

            {/* Outward PCB Via-pads lighting up */}
            {OUTWARD_CIRCUIT_VIAS.map((via, i) => {
              const isReached = revealProgress >= via.threshold;
              return (
                <g
                  key={i}
                  transform={`translate(${via.x}, ${via.y}) scale(${
                    isReached ? 1 : 0.2
                  })`}
                  opacity={isReached ? 1 : 0}
                  style={{
                    transformOrigin: "center",
                    transition:
                      "opacity 0.25s ease-out, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r={via.r}
                    fill="#050807"
                    stroke={via.color}
                    strokeWidth="1.5"
                  />
                  <circle cx="0" cy="0" r={via.r * 0.45} fill="#FFC900" />
                </g>
              );
            })}
          </svg>

          {/* Subtle neon wavefront halo at leading edge */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(0, 255, 156, 0.03) 0%, rgba(0, 255, 156, 0.12) 65%, transparent 75%)",
            }}
          />
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2 & 4. DESTINATION EMBLEM AT SCREEN CENTER (140px)
          - Fades/scales in at 300-700ms, holds ~150ms
          - Source of motion in 700-1400ms (Aperture opens, Circuit draws)
          - Fades out at 1400-1750ms
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center z-[100010]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          phase === "dim"
            ? { opacity: 0, scale: 0.8 }
            : phase === "emblem"
            ? { opacity: 1, scale: 1 }
            : phase === "reveal"
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 1 }
        }
        transition={{
          duration:
            phase === "emblem" ? 0.25 : phase === "settle" ? 0.35 : 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {isTargetStudio ? (
          <ApertureEmblem
            progress={
              phase === "reveal"
                ? revealProgress
                : phase === "settle"
                ? 1
                : 0
            }
            size={140}
            inkColor="#1E0F10"
            accentColor="#C8102E"
          />
        ) : (
          <CircuitEmblem
            progress={
              phase === "reveal"
                ? revealProgress
                : phase === "settle"
                ? 1
                : 0
            }
            size={140}
            accentColor="#00FF9C"
            sparkColor="#FFC900"
          />
        )}
      </motion.div>
    </div>
  );
}
