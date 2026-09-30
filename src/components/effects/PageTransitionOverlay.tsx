"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

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

    // In-world Engineer transition
    if (wasEng && isNowEng) {
      setInWorldType("engineer");
      const timer = setTimeout(() => {
        setInWorldType(null);
      }, isReducedMotion ? 220 : 520);
      return () => clearTimeout(timer);
    }

    // In-world Studio transition
    if (wasStudio && isNowStudio) {
      setInWorldType("studio");
      const timer = setTimeout(() => {
        setInWorldType(null);
      }, isReducedMotion ? 220 : 520);
      return () => clearTimeout(timer);
    }
  }, [pathname, isReducedMotion, worldSwitchState.isSwitching]);

  // World-Switch Origin & Colors
  const { isSwitching, phase, fromMode, toMode, origin } = worldSwitchState;
  const outgoingAccent = fromMode === "engineer" ? "#00FF9C" : "#C8102E";
  const outgoingBg = fromMode === "engineer" ? "#050807" : "#F6EFE4";

  return (
    <>
      {/* 1. WORLD-SWITCH TRANSITION (PHASE 7) */}
      <AnimatePresence>
        {isSwitching && (
          <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden select-none">
            {isReducedMotion ? (
              // Reduced motion: simple instantaneous crossfade
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-[#050807]"
              />
            ) : (
              <>
                {/* A. CIRCULAR IRIS CURTAIN (CLOSING FROM PILL OUTWARD 0-400ms, THEN OPENING 400-800ms) */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: outgoingBg,
                  }}
                  initial={{
                    clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
                  }}
                  animate={
                    phase === "closing"
                      ? {
                          clipPath: `circle(160% at ${origin.x}px ${origin.y}px)`,
                        }
                      : {
                          clipPath: `circle(160% at ${origin.x}px ${origin.y}px)`,
                          opacity: [1, 1, 0],
                        }
                  }
                  transition={{
                    duration: 0.4,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  {/* Outer Accent Rim of the expanding iris */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at ${origin.x}px ${origin.y}px, transparent 40%, ${outgoingAccent} 90%, transparent 100%)`,
                    }}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: phase === "closing" ? 0.9 : 0 }}
                    transition={{ duration: 0.35 }}
                  />

                  {/* Midpoint Emblem / Status Brief */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.1, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      <span
                        className="text-xs font-mono tracking-[0.3em] uppercase block"
                        style={{ color: outgoingAccent }}
                      >
                        {fromMode === "engineer" ? "ENTERING STUDIO REALM" : "INITIALIZING HARDWARE MATRIX"}
                      </span>
                      <h3
                        className="text-3xl font-bold tracking-tight"
                        style={{ color: fromMode === "engineer" ? "#E8F5EF" : "#1E0F10" }}
                      >
                        {toMode === "studio" ? "THE RED STUDIOS" : "CHRIS // ECE SYSTEMS"}
                      </h3>
                    </motion.div>
                  </div>
                </motion.div>

                {/* B. INCOMING REVEAL SPECIAL EFFECTS (400ms - 800ms) */}

                {/* Case 1: ENGINEER → STUDIO: Quick blur→sharp focus-pull on incoming content */}
                {phase === "opening" && toMode === "studio" && (
                  <motion.div
                    initial={{ backdropFilter: "blur(24px)", opacity: 1 }}
                    animate={{ backdropFilter: "blur(0px)", opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-[#F6EFE4]/30 pointer-events-none"
                  />
                )}

                {/* Case 2: STUDIO → ENGINEER: Thin circuit traces from pill + single fast scanline sweep */}
                {phase === "opening" && toMode === "engineer" && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Circuit traces drawing outward from the pill origin */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 700" preserveAspectRatio="none">
                      {/* Left outward trace from pill */}
                      <motion.path
                        d={`M ${origin.x} ${origin.y} L ${origin.x - 180} ${origin.y - 120} L 100 300 L 0 300`}
                        fill="none"
                        stroke="#00FF9C"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        filter="drop-shadow(0 0 6px #00FF9C)"
                      />
                      {/* Right outward trace from pill */}
                      <motion.path
                        d={`M ${origin.x} ${origin.y} L ${origin.x + 180} ${origin.y - 120} L 900 300 L 1000 300`}
                        fill="none"
                        stroke="#00FF9C"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        filter="drop-shadow(0 0 6px #00FF9C)"
                      />
                      {/* Center upward trace from pill */}
                      <motion.path
                        d={`M ${origin.x} ${origin.y} L ${origin.x} ${origin.y - 300} L ${origin.x - 100} 100 L ${origin.x} 0`}
                        fill="none"
                        stroke="#FFC900"
                        strokeWidth="1.2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                        transition={{ duration: 0.38, ease: "easeOut" }}
                        filter="drop-shadow(0 0 5px #FFC900)"
                      />
                    </svg>

                    {/* FAST SINGLE SCANLINE SWEEP: Thin horizontal gradient line moving top→bottom once */}
                    <motion.div
                      initial={{ top: "0%", opacity: 0 }}
                      animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute left-0 right-0 h-[2px] z-50 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #00FF9C 20%, #E8F5EF 50%, #00FF9C 80%, transparent)",
                        boxShadow:
                          "0 0 15px #00FF9C, 0 0 30px rgba(0, 255, 156, 0.6), 0 0 50px rgba(0, 255, 156, 0.3)",
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
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
              // ENGINEER: Animated circuit-trace lines drawing across the screen from edges toward center (~500ms)
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, times: [0, 0.2, 0.8, 1] }}
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
                    transition={{ duration: 0.42, ease: "easeInOut" }}
                    filter="drop-shadow(0 0 6px #00FF9C)"
                  />
                  <motion.path
                    d="M 1000 60 L 780 60 L 640 220 L 500 300"
                    fill="none"
                    stroke="#00FF9C"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1] }}
                    transition={{ duration: 0.42, ease: "easeInOut" }}
                    filter="drop-shadow(0 0 6px #00FF9C)"
                  />
                  <motion.path
                    d="M 0 520 L 220 520 L 360 380 L 500 300"
                    fill="none"
                    stroke="#00FF9C"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1] }}
                    transition={{ duration: 0.42, ease: "easeInOut" }}
                    filter="drop-shadow(0 0 6px #00FF9C)"
                  />
                  <motion.path
                    d="M 1000 540 L 760 540 L 630 380 L 500 300"
                    fill="none"
                    stroke="#00FF9C"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1] }}
                    transition={{ duration: 0.42, ease: "easeInOut" }}
                    filter="drop-shadow(0 0 6px #00FF9C)"
                  />
                  <motion.path
                    d="M 500 0 L 500 160 L 500 300"
                    fill="none"
                    stroke="#FFC900"
                    strokeWidth="1.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1] }}
                    transition={{ duration: 0.38, ease: "easeInOut" }}
                    filter="drop-shadow(0 0 5px #FFC900)"
                  />
                  <motion.path
                    d="M 500 600 L 500 440 L 500 300"
                    fill="none"
                    stroke="#FFC900"
                    strokeWidth="1.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1] }}
                    transition={{ duration: 0.38, ease: "easeInOut" }}
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
                  animate={{ scale: [0.2, 1.8, 2.5], opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="w-20 h-20 border border-[#00FF9C] rounded-none absolute"
                />
              </motion.div>
            ) : (
              // STUDIO: Animated mandala lines blooming outward from center and fading (~500ms)
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, times: [0, 0.2, 0.8, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-[#F6EFE4]/60 backdrop-blur-[2px]" />

                <motion.div
                  initial={{ scale: 0.3, rotate: 0 }}
                  animate={{ scale: [0.3, 1, 1.4], rotate: [0, 45, 90] }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative w-[500px] h-[500px] flex items-center justify-center"
                >
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <circle
                      cx="200"
                      cy="200"
                      r="40"
                      fill="none"
                      stroke="#C8102E"
                      strokeWidth="1.2"
                      opacity="0.8"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="85"
                      fill="none"
                      stroke="#C99A2E"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.7"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="140"
                      fill="none"
                      stroke="#C8102E"
                      strokeWidth="1.2"
                      opacity="0.6"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="190"
                      fill="none"
                      stroke="#C99A2E"
                      strokeWidth="0.8"
                      strokeDasharray="6 4"
                      opacity="0.5"
                    />

                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                      <g key={angle} transform={`rotate(${angle} 200 200)`}>
                        <line
                          x1="200"
                          y1="200"
                          x2="200"
                          y2="15"
                          stroke={idx % 2 === 0 ? "#C8102E" : "#C99A2E"}
                          strokeWidth="1.2"
                          opacity="0.75"
                        />
                        <circle
                          cx="200"
                          cy="30"
                          r="3"
                          fill={idx % 2 === 0 ? "#C99A2E" : "#C8102E"}
                          opacity="0.9"
                        />
                        <path
                          d="M 194 90 Q 200 70 206 90 Z"
                          fill="none"
                          stroke="#C8102E"
                          strokeWidth="1"
                          opacity="0.7"
                        />
                      </g>
                    ))}

                    <circle cx="200" cy="200" r="5" fill="#C8102E" />
                    <circle cx="200" cy="200" r="12" fill="none" stroke="#C99A2E" strokeWidth="1.5" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
