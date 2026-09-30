"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  isGold?: boolean;
}

interface BokehOrb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  phase: number;
}

export function ParticleBackground() {
  const pathname = usePathname();
  const { mode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isEng = mode === "engineer";

  const isInnerPage =
    pathname !== "/" && pathname !== "/engineer" && pathname !== "/studio";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isPaused = false;
    let isScrolledBelow = false;

    // Check device capabilities
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowPower =
      prefersReducedMotion ||
      (typeof navigator !== "undefined" &&
        navigator.hardwareConcurrency &&
        navigator.hardwareConcurrency < 4);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for subtle parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initElements();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetParallaxX = ((mouseX - width / 2) / (width / 2)) * 10;
      targetParallaxY = ((mouseY - height / 2) / (height / 2)) * 10;
    };

    const handleScroll = () => {
      isScrolledBelow = window.scrollY > window.innerHeight * 0.85;
    };

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused && !isLowPower) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let nodes: Node[] = [];
    let orbs: BokehOrb[] = [];

    const initElements = () => {
      if (isEng) {
        // In inner pages, push nodes toward the edges (x < 16% or x > 84%)
        const count = isInnerPage ? 20 : isLowPower ? 18 : Math.min(42, Math.floor((width * height) / 32000));
        nodes = [];
        for (let i = 0; i < count; i++) {
          let posX = Math.random() * width;
          if (isInnerPage) {
            // Push to edges
            posX = Math.random() > 0.5 ? Math.random() * (width * 0.16) : width - Math.random() * (width * 0.16);
          }
          nodes.push({
            x: posX,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * (isInnerPage ? 0.2 : 0.45),
            vy: (Math.random() - 0.5) * (isInnerPage ? 0.2 : 0.45),
            radius: Math.random() * 1.5 + 1.2,
            baseAlpha: isInnerPage ? Math.random() * 0.3 + 0.15 : Math.random() * 0.5 + 0.3,
            isGold: Math.random() > 0.85,
          });
        }
      } else {
        // Studio Bokeh Orbs
        const count = isInnerPage ? 6 : isLowPower ? 8 : 16;
        orbs = [];
        const colors = [
          "rgba(200, 16, 46, 0.10)",
          "rgba(201, 154, 46, 0.12)",
          "rgba(235, 120, 80, 0.06)",
          "rgba(180, 10, 30, 0.05)",
        ];
        for (let i = 0; i < count; i++) {
          orbs.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * (isInnerPage ? 0.12 : 0.3),
            vy: (Math.random() - 0.5) * (isInnerPage ? 0.1 : 0.25) - 0.05,
            radius: Math.random() * 110 + 60,
            color: colors[i % colors.length],
            alpha: isInnerPage ? 0.2 : Math.random() * 0.4 + 0.3,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    initElements();

    const render = () => {
      if (isPaused) {
        return;
      }

      // Slow down drastically below first viewport on inner pages
      const speedMultiplier = isScrolledBelow ? 0.15 : 1.0;

      // Smooth parallax lerp
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.06;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.06;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(currentParallaxX, currentParallaxY);

      if (isEng) {
        const maxDist = isInnerPage ? 90 : 135;
        ctx.lineWidth = 0.65;

        for (let i = 0; i < nodes.length; i++) {
          const n1 = nodes[i];

          if (!isLowPower) {
            n1.x += n1.vx * speedMultiplier;
            n1.y += n1.vy * speedMultiplier;
            if (n1.x < 0 || n1.x > width) n1.vx *= -1;
            if (n1.y < 0 || n1.y > height) n1.vy *= -1;
          }

          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * (isInnerPage ? 0.1 : 0.18);
              ctx.strokeStyle = `rgba(0, 255, 156, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          }

          ctx.beginPath();
          ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
          if (n1.isGold) {
            ctx.fillStyle = `rgba(255, 201, 0, ${n1.baseAlpha})`;
            ctx.shadowColor = "#FFC900";
            ctx.shadowBlur = isInnerPage ? 3 : 6;
          } else {
            ctx.fillStyle = `rgba(0, 255, 156, ${n1.baseAlpha})`;
            ctx.shadowColor = "#00FF9C";
            ctx.shadowBlur = isInnerPage ? 2 : 4;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      } else {
        // STUDIO BOKEH ORBS
        for (let i = 0; i < orbs.length; i++) {
          const orb = orbs[i];

          if (!isLowPower) {
            orb.phase += 0.01 * speedMultiplier;
            orb.x += (orb.vx + Math.sin(orb.phase) * 0.2) * speedMultiplier;
            orb.y += orb.vy * speedMultiplier;

            if (orb.x < -orb.radius) orb.x = width + orb.radius;
            if (orb.x > width + orb.radius) orb.x = -orb.radius;
            if (orb.y < -orb.radius) orb.y = height + orb.radius;
            if (orb.y > height + orb.radius) orb.y = -orb.radius;
          }

          const grad = ctx.createRadialGradient(
            orb.x,
            orb.y,
            0,
            orb.x,
            orb.y,
            orb.radius
          );
          grad.addColorStop(0, orb.color);
          grad.addColorStop(0.5, orb.color.replace(/[\d\.]+\)$/, "0.02)"));
          grad.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      ctx.restore();

      if (isLowPower) return;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isEng, isInnerPage]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[1] transition-opacity duration-700 ${
        isInnerPage ? "opacity-35" : "opacity-70"
      }`}
      aria-hidden="true"
    />
  );
}
