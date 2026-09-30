"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";

export type WorldMode = "engineer" | "studio";

export interface WorldSwitchState {
  isSwitching: boolean;
  phase: "closing" | "opening" | "idle";
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

  const switchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      if (currentPath.startsWith("/engineer/certification")) return "/studio/designs";
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

    if (isReducedMotion) {
      // Reduced motion: instantaneous route change + 200ms crossfade
      setPreferredMode(targetMode);
      document.documentElement.setAttribute("data-theme", targetMode);
      try {
        localStorage.setItem(STORAGE_KEY, targetMode);
      } catch {}
      const targetRoute = getMappedRoute(targetMode, pathname || "/");
      router.push(targetRoute);
      return;
    }

    if (switchTimeoutRef.current) clearTimeout(switchTimeoutRef.current);

    // 1. Phase 1: Closing iris outward from pill screen position (0 - 400ms)
    setWorldSwitchState({
      isSwitching: true,
      phase: "closing",
      fromMode: activeMode,
      toMode: targetMode,
      origin: pillOrigin,
    });

    // 2. Midpoint (at exactly 400ms): Fully closed, swap CSS variables, storage & route invisibly
    switchTimeoutRef.current = setTimeout(() => {
      document.documentElement.setAttribute("data-theme", targetMode);
      setPreferredMode(targetMode);
      try {
        localStorage.setItem(STORAGE_KEY, targetMode);
      } catch {}

      const targetRoute = getMappedRoute(targetMode, pathname || "/");
      router.push(targetRoute);

      // Phase 2: Opening iris with focus-pull or circuit/scanline sweep (400ms - 800ms)
      setWorldSwitchState((prev) => ({
        ...prev,
        phase: "opening",
      }));

      // Complete transition at 800ms
      setTimeout(() => {
        setWorldSwitchState((prev) => ({
          ...prev,
          isSwitching: false,
          phase: "idle",
        }));
      }, 420);
    }, 400);
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
