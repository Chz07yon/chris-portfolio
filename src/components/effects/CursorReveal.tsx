"use client";

import React, { useRef, useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface CursorRevealProps {
  className?: string;
  portraitSrc?: string;
  portraitMobileSrc?: string;
  portraitAltSrc?: string;
  patternSrc?: string;
  patternMobileSrc?: string;
  radius?: number; // default ~130px
}

function subscribeToTouch(callback: () => void) {
  const mq = window.matchMedia("(pointer: coarse)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getTouchSnapshot() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function getServerTouchSnapshot() {
  return false;
}

export function CursorReveal({
  className = "",
  portraitSrc,
  portraitAltSrc,
  patternSrc,
  patternMobileSrc,
  radius = 130,
}: CursorRevealProps) {
  const { mode } = useTheme();
  const isEng = mode === "engineer";

  const containerRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState(false);
  const [currentRadius, setCurrentRadius] = useState(radius);
  const isTouchDevice = useSyncExternalStore(
    subscribeToTouch,
    getTouchSnapshot,
    getServerTouchSnapshot
  );

  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic asset paths with fallback
  const portraitDesktop =
    portraitAltSrc ||
    portraitSrc ||
    (isEng
      ? "/assets/engineer/engineer-portrait.png"
      : "/assets/studio/studio-portrait.png");

  const patternDesktop =
    patternSrc ||
    (isEng
      ? "/assets/engineer/engineer-circuit-layer.png"
      : "/assets/studio/studio-mandala-layer.png");

  const patternMobile =
    patternMobileSrc ||
    (isEng
      ? "/assets/engineer/engineer-circuit-layer-mobile.png"
      : "/assets/studio/studio-mandala-layer-mobile.png");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isInside = false;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowPower =
      isReducedMotion ||
      (typeof navigator !== "undefined" &&
        navigator.hardwareConcurrency &&
        navigator.hardwareConcurrency < 4);

    // Center by default if not yet hovered
    const rect = container.getBoundingClientRect();
    currentX = rect.width / 2;
    currentY = rect.height / 2;
    targetX = currentX;
    targetY = currentY;

    const applyPositionDirect = (x: number, y: number) => {
      container.style.setProperty("--xray-x", `${x}px`);
      container.style.setProperty("--xray-y", `${y}px`);
      if (rimRef.current) {
        rimRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const updatePosition = () => {
      // Smooth interpolation for fluid rim tracking
      const ease = 0.22;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      applyPositionDirect(currentX, currentY);

      rafId = requestAnimationFrame(updatePosition);
    };

    if (!isLowPower) {
      rafId = requestAnimationFrame(updatePosition);
    } else {
      applyPositionDirect(currentX, currentY);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const bRect = container.getBoundingClientRect();
      targetX = e.clientX - bRect.left;
      targetY = e.clientY - bRect.top;
      if (!isInside) {
        isInside = true;
        setCurrentRadius(radius);
        setIsActive(true);
      }
      if (isLowPower) {
        applyPositionDirect(targetX, targetY);
      }
    };

    const handleMouseEnter = () => {
      isInside = true;
      setCurrentRadius(radius);
      setIsActive(true);
    };

    const handleMouseLeave = () => {
      isInside = false;
      setIsActive(false);
    };

    // Mobile: Tap-and-hold triggers reveal at touch point, spreading outward and auto-fading after ~1.5s
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const bRect = container.getBoundingClientRect();
        targetX = touch.clientX - bRect.left;
        targetY = touch.clientY - bRect.top;
        currentX = targetX;
        currentY = targetY;

        if (isLowPower) {
          applyPositionDirect(targetX, targetY);
        }

        // Spread radius slightly outward on touch
        setCurrentRadius(radius * 0.85);
        setIsActive(true);

        if (!isReducedMotion) {
          setTimeout(() => {
            setCurrentRadius(radius * 1.15);
          }, 50);
        }

        if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
        // Auto-fade after exactly ~1.5s
        touchTimerRef.current = setTimeout(() => {
          setIsActive(false);
        }, 1500);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const bRect = container.getBoundingClientRect();
        targetX = touch.clientX - bRect.left;
        targetY = touch.clientY - bRect.top;
        if (isLowPower) {
          applyPositionDirect(targetX, targetY);
        }
      }
    };

    const handleTouchEnd = () => {
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
      touchTimerRef.current = setTimeout(() => {
        setIsActive(false);
      }, 1500);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else if (!isLowPower) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    };
  }, [radius]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden ${className}`}
      style={
        {
          "--xray-radius": `${currentRadius}px`,
          "--xray-x": "50%",
          "--xray-y": "50%",
        } as React.CSSProperties
      }
    >
      {/* LAYER 1: Base Portrait at ~15% opacity (Revealed during X-Ray) */}
      <div className="absolute inset-0 z-10 opacity-15 transition-opacity duration-300 pointer-events-none">
        <picture className="w-full h-full block">
          <source media="(max-width: 767px)" srcSet={portraitDesktop} />
          <Image
            src={portraitDesktop}
            alt="Chris Portrait Silhouette"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-contain object-bottom"
            priority
          />
        </picture>
      </div>

      {/* LAYER 2: Hidden Pattern Layer (Circuit Traces / Sacred Mandala) */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isActive ? 0.95 : 0,
          maskImage: `radial-gradient(circle var(--xray-radius) at var(--xray-x) var(--xray-y), black 0%, black 50%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle var(--xray-radius) at var(--xray-x) var(--xray-y), black 0%, black 50%, transparent 100%)`,
          transition: "opacity 0.3s ease, mask-size 0.3s ease",
        }}
      >
        <picture className="w-full h-full block">
          <source media="(max-width: 767px)" srcSet={patternMobile} />
          <Image
            src={patternDesktop}
            alt={isEng ? "Circuit Pattern Reveal" : "Mandala Pattern Reveal"}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className={`object-cover object-center ${
              isEng
                ? "brightness-125 contrast-125"
                : "brightness-110 contrast-115"
            }`}
            priority
          />
        </picture>
      </div>

      {/* LAYER 3: Faint Glowing Ghost-Outline Silhouette inside circle */}
      <div
        className="absolute inset-0 z-25 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isActive ? 0.65 : 0,
          maskImage: `radial-gradient(circle var(--xray-radius) at var(--xray-x) var(--xray-y), black 0%, black 55%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle var(--xray-radius) at var(--xray-x) var(--xray-y), black 0%, black 55%, transparent 100%)`,
        }}
      >
        <div
          className={`w-full h-full ${
            isEng
              ? "filter drop-shadow(0 0 16px #00FF9C) brightness-150"
              : "filter drop-shadow(0 0 16px #C8102E) drop-shadow(0 0 8px #C99A2E) brightness-125"
          }`}
        >
          <Image
            src={portraitDesktop}
            alt="Chris Ghost Silhouette"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* LAYER 4: Solid Portrait Cutout (Masked out at cursor position to reveal layers beneath) */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          maskImage: isActive
            ? `radial-gradient(circle var(--xray-radius) at var(--xray-x) var(--xray-y), transparent 0%, transparent 45%, black 100%)`
            : "none",
          WebkitMaskImage: isActive
            ? `radial-gradient(circle var(--xray-radius) at var(--xray-x) var(--xray-y), transparent 0%, transparent 45%, black 100%)`
            : "none",
        }}
      >
        <picture className="w-full h-full block">
          <source media="(max-width: 767px)" srcSet={portraitDesktop} />
          <Image
            src={portraitDesktop}
            alt="Chris — Engineer & Creative Director"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-contain object-bottom"
            priority
          />
        </picture>
      </div>

      {/* LAYER 5: Soft Gradient Rim & Spark on Circle Edge */}
      <div
        ref={rimRef}
        className="pointer-events-none absolute top-0 left-0 z-40 rounded-full transition-all duration-300 flex items-center justify-center"
        style={{
          width: `${currentRadius * 2}px`,
          height: `${currentRadius * 2}px`,
          opacity: isActive ? 1 : 0,
        }}
      >
        {isEng ? (
          // Engineer: Green -> Transparent with Gold Spark
          <div className="relative w-full h-full rounded-full">
            <div className="absolute inset-0 rounded-full border-[1.5px] border-[#00FF9C] shadow-[0_0_24px_rgba(0,255,156,0.6),inset_0_0_20px_rgba(0,255,156,0.25)] opacity-85" />
            <div
              className="absolute inset-[-4px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, transparent 65%, rgba(0,255,156,0.2) 85%, transparent 100%)",
              }}
            />
            {/* Orbiting Gold Spark */}
            <div
              className="absolute w-2 h-2 rounded-full bg-[#FFC900] shadow-[0_0_10px_#FFC900] animate-spin motion-reduce:animate-none"
              style={{
                top: "10%",
                right: "15%",
                animationDuration: "4s",
              }}
            />
          </div>
        ) : (
          // Studio: Red -> Gold -> Transparent
          <div className="relative w-full h-full rounded-full">
            <div className="absolute inset-0 rounded-full border-[1.5px] border-[#C8102E] shadow-[0_0_24px_rgba(200,16,46,0.5),inset_0_0_20px_rgba(201,154,46,0.2)] opacity-85" />
            <div className="absolute inset-[3px] rounded-full border border-[#C99A2E]/40" />
            <div
              className="absolute inset-[-4px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, transparent 65%, rgba(200,16,46,0.2) 82%, rgba(201,154,46,0.3) 94%, transparent 100%)",
              }}
            />
            {/* Orbiting Gold Spark */}
            <div
              className="absolute w-2 h-2 rounded-full bg-[#C99A2E] shadow-[0_0_10px_#C99A2E] animate-spin motion-reduce:animate-none"
              style={{
                bottom: "12%",
                left: "14%",
                animationDuration: "6s",
              }}
            />
          </div>
        )}
      </div>

      {/* Tap-and-hold visual hint for touch devices */}
      {isTouchDevice && !isActive && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[11px] font-mono text-white/70 animate-pulse pointer-events-none">
          Tap & Hold to X-Ray
        </div>
      )}
    </div>
  );
}
