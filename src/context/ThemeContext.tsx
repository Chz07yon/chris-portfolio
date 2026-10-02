"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";

export type WorldMode = "engineer" | "studio";

export type WorldSwitchPhase = "idle" | "dim" | "emblem" | "reveal" | "settle";

export interface WorldSwitchState {
  isSwitching: boolean;
  phase: WorldSwitchPhase;
  fromMode: WorldMode;
  toMode: WorldMode;
  origin: { x: number; y: number };
}

interface ThemeContextType {
  mode: WorldMode;
  setMode: (mode: WorldMode) => void;
  toggleWorld: (origin?: { x: number; y: number }) => void;
  initiateWorldSwitch: (targetMode: WorldMode, origin?: { x: number; y: number }) => void;
  worldSwitchState: WorldSwitchState;
  isPending: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "chris-portfolio-world";

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

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  );

  // Derive mode from route
  const currentWorld: WorldMode = pathname?.startsWith("/studio") ? "studio" : "engineer";
  const [preferredMode, setPreferredMode] = useState<WorldMode>(currentWorld);

  const activeMode: WorldMode = pathname?.startsWith("/studio")
    ? "studio"
    : pathname?.startsWith("/engineer")
    ? "engineer"
    : preferredMode;

  const [worldSwitchState, setWorldSwitchState] = useState<WorldSwitchState>({
    isSwitching: false,
    phase: "idle",
    fromMode: activeMode,
    toMode: activeMode,
    origin: { x: 500, y: 700 },
  });

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeMode);
    try {
      localStorage.setItem(STORAGE_KEY, activeMode);
    } catch {
      // ignore
    }
  }, [activeMode]);

  // Compute sensible destination route preserving subpath
  const getMappedRoute = (targetMode: WorldMode, currentPath: string): string => {
    if (targetMode === "studio") {
      if (currentPath === "/engineer" || currentPath === "/") return "/studio";
      if (currentPath.startsWith("/engineer/works")) return "/studio/works";
      if (currentPath.startsWith("/engineer/about")) return "/studio/about";
      if (currentPath.startsWith("/engineer/journey")) return "/studio/journey";
      if (currentPath.startsWith("/engineer/certification") || currentPath.startsWith("/engineer/certifications")) return "/studio/designs";
      return "/studio";
    } else {
      if (currentPath === "/studio" || currentPath === "/") return "/engineer";
      if (currentPath.startsWith("/studio/works")) return "/engineer/works";
      if (currentPath.startsWith("/studio/about")) return "/engineer/about";
      if (currentPath.startsWith("/studio/journey")) return "/engineer/journey";
      if (currentPath.startsWith("/studio/designs")) return "/engineer/works";
      return "/engineer";
    }
  };

  const initiateWorldSwitch = (
    targetMode: WorldMode,
    origin?: { x: number; y: number }
  ) => {
    if (targetMode === activeMode && !worldSwitchState.isSwitching) return;

    const defaultOrigin = {
      x: typeof window !== "undefined" ? window.innerWidth / 2 : 500,
      y: typeof window !== "undefined" ? window.innerHeight - 48 : 700,
    };
    const pillOrigin = origin || defaultOrigin;

    clearAllTimers();

    // ACCESSIBILITY: respect prefers-reduced-motion
    // Skip steps 1 and 3 entirely, do a flat 200ms crossfade + instant route/variable swap instead.
    // The flash step (step 1) must NEVER play for reduced-motion users (photosensitivity trigger).
    if (isReducedMotion) {
      setPreferredMode(targetMode);
      document.documentElement.setAttribute("data-theme", targetMode);
      try {
        localStorage.setItem(STORAGE_KEY, targetMode);
      } catch {}
      const targetRoute = getMappedRoute(targetMode, pathname || "/");
      router.push(targetRoute);

      setWorldSwitchState({
        isSwitching: true,
        phase: "settle",
        fromMode: activeMode,
        toMode: targetMode,
        origin: pillOrigin,
      });

      const tReduced = setTimeout(() => {
        setWorldSwitchState((prev) => ({
          ...prev,
          isSwitching: false,
          phase: "idle",
        }));
      }, 200);
      timersRef.current.push(tReduced);
      return;
    }

    // PHASE 7: EMBLEM MATERIALIZE SEQUENCE (v2) (~1750ms total, deliberate, smooth & cinematic)

    // 1. DIM (0-300ms): semi-black overlay fades in gently over current page (opacity 0 -> ~0.6)
    setWorldSwitchState({
      isSwitching: true,
      phase: "dim",
      fromMode: activeMode,
      toMode: targetMode,
      origin: pillOrigin,
    });

    // 2. EMBLEM APPEARS (300-700ms): destination emblem fades + scales in smoothly at screen center (~140px), holds ~150ms
    const tStep2 = setTimeout(() => {
      setWorldSwitchState((prev) => ({
        ...prev,
        phase: "emblem",
      }));

      // 3. EMBLEM-DRIVEN REVEAL (700-1400ms):
      // Route change + CSS variables + localStorage swap happen at START of step 3 (700ms)
      const tStep3 = setTimeout(() => {
        document.documentElement.setAttribute("data-theme", targetMode);
        setPreferredMode(targetMode);
        try {
          localStorage.setItem(STORAGE_KEY, targetMode);
        } catch {}

        const targetRoute = getMappedRoute(targetMode, pathname || "/");
        router.push(targetRoute);

        setWorldSwitchState((prev) => ({
          ...prev,
          phase: "reveal",
        }));

        // 4. SETTLE (1400-1750ms): emblem fades out gently (opacity 1->0), dim fully clears
        const tStep4 = setTimeout(() => {
          setWorldSwitchState((prev) => ({
            ...prev,
            phase: "settle",
          }));

          // Complete transition at 1750ms
          const tDone = setTimeout(() => {
            setWorldSwitchState((prev) => ({
              ...prev,
              isSwitching: false,
              phase: "idle",
            }));
          }, 350);
          timersRef.current.push(tDone);
        }, 700); // 700ms reveal (700ms - 1400ms)
        timersRef.current.push(tStep4);
      }, 400); // 300ms + 400ms = 700ms
      timersRef.current.push(tStep3);
    }, 300); // 0ms + 300ms = 300ms
    timersRef.current.push(tStep2);
  };

  const setMode = (newMode: WorldMode) => {
    initiateWorldSwitch(newMode);
  };

  const toggleWorld = (origin?: { x: number; y: number }) => {
    const nextMode: WorldMode = activeMode === "engineer" ? "studio" : "engineer";
    initiateWorldSwitch(nextMode, origin);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode: activeMode,
        setMode,
        toggleWorld,
        initiateWorldSwitch,
        worldSwitchState,
        isPending: worldSwitchState.isSwitching,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
