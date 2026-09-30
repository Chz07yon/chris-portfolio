"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export function CustomCursor() {
  const { mode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Coordinates
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const targetSnap = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Only enable for desktop fine-pointer devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check proximity to magnetic targets
      const magneticEls = document.querySelectorAll<HTMLElement>(
        '[data-magnetic="true"], button, a, [role="button"]'
      );

      let closest: { dist: number; cx: number; cy: number } | null = null;
      const SNAP_RADIUS = 36; // ~30px proximity threshold

      magneticEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Expand rect by SNAP_RADIUS
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);

        // Within element bounding box + margin
        if (
          e.clientX >= rect.left - SNAP_RADIUS &&
          e.clientX <= rect.right + SNAP_RADIUS &&
          e.clientY >= rect.top - SNAP_RADIUS &&
          e.clientY <= rect.bottom + SNAP_RADIUS
        ) {
          if (!closest || dist < closest.dist) {
            closest = { dist, cx, cy };
          }
        }
      });

      if (closest) {
        setIsHovering(true);
        // Subtle magnetic pull toward element center
        const pull = 0.35;
        const target: { dist: number; cx: number; cy: number } = closest;
        targetSnap.current = {
          x: mouse.current.x + (target.cx - mouse.current.x) * pull,
          y: mouse.current.y + (target.cy - mouse.current.y) * pull,
        };
      } else {
        setIsHovering(false);
        targetSnap.current = null;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    let animationFrameId: number;

    const render = () => {
      // Direct dot positioning (zero latency)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Smooth trailing ring lerp
      if (ringRef.current) {
        const targetX = targetSnap.current ? targetSnap.current.x : mouse.current.x;
        const targetY = targetSnap.current ? targetSnap.current.y : mouse.current.y;
        const ease = 0.18;
        ring.current.x += (targetX - ring.current.x) * ease;
        ring.current.y += (targetY - ring.current.y) * ease;

        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isEng = mode === "engineer";

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Center Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 transition-opacity duration-150 ${
          isEng ? "w-1.5 h-1.5 bg-[#00FF9C] shadow-[0_0_8px_#00FF9C]" : "w-2 h-2 bg-[#C8102E] rounded-full shadow-[0_0_8px_rgba(200,16,46,0.6)]"
        }`}
        style={{
          opacity: isVisible ? (isHovering ? 0.3 : 1) : 0,
        }}
      />

      {/* Trailing Spring Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 transition-[width,height,background-color,border-color] duration-200 ease-out flex items-center justify-center ${
          isEng
            ? isHovering
              ? "w-14 h-14 border border-[#00FF9C] bg-[#00FF9C]/10 backdrop-blur-[1px]"
              : isClicking
              ? "w-7 h-7 border border-[#00FF9C] bg-[#00FF9C]/20"
              : "w-9 h-9 border border-[#00FF9C]/50"
            : isHovering
            ? "w-14 h-14 rounded-full border border-[#C8102E] bg-[#C8102E]/10"
            : isClicking
            ? "w-7 h-7 rounded-full border border-[#C8102E] bg-[#C8102E]/25"
            : "w-9 h-9 rounded-full border border-[#C8102E]/50"
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Subtle technical reticle marks for Engineer */}
        {isEng && isHovering && (
          <>
            <span className="absolute -top-1 w-1.5 h-[1px] bg-[#00FF9C]" />
            <span className="absolute -bottom-1 w-1.5 h-[1px] bg-[#00FF9C]" />
            <span className="absolute -left-1 w-[1px] h-1.5 bg-[#00FF9C]" />
            <span className="absolute -right-1 w-[1px] h-1.5 bg-[#00FF9C]" />
          </>
        )}
      </div>
    </div>
  );
}
