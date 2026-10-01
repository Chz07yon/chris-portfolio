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
  radius?: number; // default ~80px
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
  radius = 80,
}: CursorRevealProps) {
  const { mode } = useTheme();
  const isEng = mode === "engineer";

  const containerRef = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState(false);
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
      ? "/assets/engineer/engineer-portrait-neon.png"
      : "/assets/studio/studio-portrait-mandala.png");

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

  const hitCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const hitCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Pre-render portrait silhouette on a low-res offscreen canvas for instantaneous alpha hit-testing
  useEffect(() => {
    if (!portraitDesktop || typeof window === "undefined") return;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = portraitDesktop;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 160;
      canvas.height = Math.round(160 * (img.naturalHeight / (img.naturalWidth || 1)));
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        hitCanvasRef.current = canvas;
        hitCtxRef.current = ctx;
      }
    };
  }, [portraitDesktop]);

  const checkIsOnPortrait = (x: number, y: number): boolean => {
    const canvas = hitCanvasRef.current;
    const ctx = hitCtxRef.current;
    const container = containerRef.current;
    if (!canvas || !ctx || !container) return false;

    const bRect = container.getBoundingClientRect();
    const contW = bRect.width;
    const contH = bRect.height;
    if (contW <= 0 || contH <= 0) return false;

    const imgAspect = canvas.width / canvas.height;
    const contAspect = contW / contH;

    let renderW = contW;
    let renderH = contH;
    let renderLeft = 0;
    let renderTop = 0;

    // Matches object-contain object-bottom
    if (contAspect > imgAspect) {
      renderH = contH;
      renderW = contH * imgAspect;
      renderLeft = (contW - renderW) / 2;
      renderTop = 0;
    } else {
      renderW = contW;
      renderH = contW / imgAspect;
      renderLeft = 0;
      renderTop = contH - renderH;
    }

    if (x < renderLeft || x > renderLeft + renderW || y < renderTop || y > renderTop + renderH) {
      return false;
    }

    const normX = (x - renderLeft) / renderW;
    const normY = (y - renderTop) / renderH;

    const px = Math.min(canvas.width - 1, Math.max(0, Math.floor(normX * canvas.width)));
    const py = Math.min(canvas.height - 1, Math.max(0, Math.floor(normY * canvas.height)));

    try {
      const pixel = ctx.getImageData(px, py, 1, 1).data;
      return pixel[3] > 25; // alpha > 25 indicates cursor is over actual portrait pixels
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Smooth exposure interpolation (0 = fully unrevealed solid portrait, 1 = fully revealed)
    let targetExposure = 0;
    let currentExposure = 0;

    // Center by default if not yet hovered
    const rect = container.getBoundingClientRect();
    currentX = rect.width / 2;
    currentY = rect.height / 2;
    targetX = currentX;
    targetY = currentY;

    const updatePosition = () => {
      // Smooth tracking interpolation for coordinates
      const easePos = 0.20;
      currentX += (targetX - currentX) * easePos;
      currentY += (targetY - currentY) * easePos;

      // Smooth gradual ease for aperture exposure bloom and dissolve
      const easeExp = targetExposure > currentExposure ? 0.08 : 0.09;
      currentExposure += (targetExposure - currentExposure) * easeExp;

      if (currentExposure < 0.003 && targetExposure === 0) {
        currentExposure = 0;
      }

      const effectiveRadius = currentExposure * radius;
      const x = currentX.toFixed(1);
      const y = currentY.toFixed(1);
      const r = effectiveRadius.toFixed(1);

      container.style.setProperty("--xray-x", `${x}px`);
      container.style.setProperty("--xray-y", `${y}px`);

      // Layer 2: Smooth opacity crossfade & aperture mask (Balanced at ~75% peak intensity)
      if (layer2Ref.current) {
        layer2Ref.current.style.opacity = `${(currentExposure * 0.75).toFixed(3)}`;
        if (currentExposure > 0.005) {
          const mask = `radial-gradient(circle ${r}px at ${x}px ${y}px, black 0%, black 50%, transparent 100%)`;
          layer2Ref.current.style.maskImage = mask;
          layer2Ref.current.style.webkitMaskImage = mask;
        }
      }

      // Layer 3: Glowing ghost outline silhouette (Radiates behind pattern layer at z-15)
      if (layer3Ref.current) {
        layer3Ref.current.style.opacity = `${(currentExposure * 0.45).toFixed(3)}`;
        if (currentExposure > 0.005) {
          const mask = `radial-gradient(circle ${r}px at ${x}px ${y}px, black 0%, black 55%, transparent 100%)`;
          layer3Ref.current.style.maskImage = mask;
          layer3Ref.current.style.webkitMaskImage = mask;
        }
      }

      // Layer 4: Solid portrait cutout with liquid feathered aperture (Retains ~28% portrait so it never completely vanishes)
      if (layer4Ref.current) {
        if (currentExposure <= 0.005) {
          layer4Ref.current.style.maskImage = "none";
          layer4Ref.current.style.webkitMaskImage = "none";
        } else {
          // Retain ~28% portrait visibility at maximum reveal aperture
          const minAlpha = (1 - currentExposure * 0.72).toFixed(2);
          const featherStart = (effectiveRadius * 0.4).toFixed(1);
          const mask = `radial-gradient(circle ${r}px at ${x}px ${y}px, rgba(0,0,0,${minAlpha}) 0px, rgba(0,0,0,${minAlpha}) ${featherStart}px, rgba(0,0,0,1) ${r}px)`;
          layer4Ref.current.style.maskImage = mask;
          layer4Ref.current.style.webkitMaskImage = mask;
        }
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);

    const handleMouseMove = (e: MouseEvent) => {
      const bRect = container.getBoundingClientRect();
      targetX = e.clientX - bRect.left;
      targetY = e.clientY - bRect.top;

      const onPortrait = checkIsOnPortrait(targetX, targetY);
      targetExposure = onPortrait ? 1 : 0;
      setIsActive(onPortrait);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const bRect = container.getBoundingClientRect();
      targetX = e.clientX - bRect.left;
      targetY = e.clientY - bRect.top;
      const onPortrait = checkIsOnPortrait(targetX, targetY);
      targetExposure = onPortrait ? 1 : 0;
      setIsActive(onPortrait);
    };

    const handleMouseLeave = () => {
      targetExposure = 0;
      setIsActive(false);
    };

    // Mobile: Tap-and-hold triggers reveal at touch point only if touching the portrait
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const bRect = container.getBoundingClientRect();
        targetX = touch.clientX - bRect.left;
        targetY = touch.clientY - bRect.top;
        currentX = targetX;
        currentY = targetY;

        const onPortrait = checkIsOnPortrait(targetX, targetY);
        if (!onPortrait) {
          targetExposure = 0;
          setIsActive(false);
          return;
        }

        targetExposure = 1;
        setIsActive(true);

        if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
        // Auto-fade smoothly after ~1.5s
        touchTimerRef.current = setTimeout(() => {
          targetExposure = 0;
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

        const onPortrait = checkIsOnPortrait(targetX, targetY);
        targetExposure = onPortrait ? 1 : 0;
        setIsActive(onPortrait);
      }
    };

    const handleTouchEnd = () => {
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
      touchTimerRef.current = setTimeout(() => {
        targetExposure = 0;
        setIsActive(false);
      }, 1000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
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
  }, [radius, portraitDesktop]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden ${className}`}
      style={
        {
          "--xray-radius": "0px",
          "--xray-x": "50%",
          "--xray-y": "50%",
        } as React.CSSProperties
      }
    >
      {/* LAYER 1: Base Portrait at ~15% opacity (Revealed during X-Ray) */}
      <div className="absolute inset-0 z-10 opacity-15 pointer-events-none">
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

      {/* LAYER 3: Ambient Glowing Ghost-Outline Silhouette (Radiating behind the pattern layer) */}
      <div
        ref={layer3Ref}
        className="absolute inset-0 z-15 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div
          className={`w-full h-full ${
            isEng
              ? "filter drop-shadow(0 0 24px #00FF9C) brightness-125"
              : "filter drop-shadow(0 0 24px #C8102E) drop-shadow(0 0 12px #C99A2E) brightness-110"
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

      {/* LAYER 2: Hidden Pattern Layer (Circuit Traces / Sacred Mandala) - Masked strictly to Portrait Silhouette with high contrast & vivid saturation */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 z-25 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div
          className="w-full h-full"
          style={{
            maskImage: `url(${portraitDesktop})`,
            WebkitMaskImage: `url(${portraitDesktop})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskPosition: "bottom",
            WebkitMaskPosition: "bottom",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <picture className="w-full h-full block">
            <source media="(max-width: 767px)" srcSet={patternMobile} />
            <Image
              src={patternDesktop}
              alt={isEng ? "Circuit Pattern Reveal" : "Mandala Pattern Reveal"}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-center"
              style={{
                filter: isEng
                  ? "contrast(1.45) saturate(1.4) brightness(1.08)"
                  : "contrast(1.4) saturate(1.35) brightness(1.02)",
              }}
              priority
            />
          </picture>
        </div>
      </div>

      {/* LAYER 4: Solid Portrait Cutout (Smoothly apertures open/close) */}
      <div
        ref={layer4Ref}
        className="absolute inset-0 z-30 pointer-events-none"
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

      {/* Tap-and-hold visual hint for touch devices */}
      {isTouchDevice && !isActive && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[11px] font-mono text-white/70 animate-pulse pointer-events-none">
          Tap & Hold to X-Ray
        </div>
      )}
    </div>
  );
}
