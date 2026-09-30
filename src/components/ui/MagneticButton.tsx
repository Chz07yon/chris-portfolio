"use client";

import React, { useRef, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  strength?: number; // magnet strength factor (default: 0.25)
}

export function MagneticButton({
  children,
  variant = "primary",
  className = "",
  strength = 0.25,
  onClick,
  ...props
}: MagneticButtonProps) {
  const { mode } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const isEng = mode === "engineer";

  // Base styling per world theme
  let variantStyles = "";
  if (isEng) {
    switch (variant) {
      case "primary":
        variantStyles =
          "bg-[#00FF9C] text-[#050807] font-semibold tracking-wide hover:bg-[#00C97A] shadow-[0_0_20px_rgba(0,255,156,0.3)] border border-[#00FF9C]";
        break;
      case "secondary":
        variantStyles =
          "bg-[#0A1210] text-[#00FF9C] border border-[#12261F] hover:border-[#00FF9C]/60 hover:bg-[#0E1C18]";
        break;
      case "outline":
        variantStyles =
          "border border-[#00FF9C]/40 text-[#E8F5EF] hover:border-[#00FF9C] hover:text-[#00FF9C] bg-transparent";
        break;
      case "ghost":
        variantStyles = "text-[#7C9A8E] hover:text-[#00FF9C] hover:bg-[#12261F]/40";
        break;
    }
  } else {
    // Studio theme
    switch (variant) {
      case "primary":
        variantStyles =
          "bg-[#C8102E] text-[#FFFAF2] font-medium tracking-normal hover:bg-[#A30D25] shadow-[0_4px_24px_rgba(200,16,46,0.25)] border border-[#C8102E]";
        break;
      case "secondary":
        variantStyles =
          "bg-[#FFFAF2] text-[#3A0A10] border border-[#E5D5C2] hover:border-[#C8102E]/40 hover:bg-[#F2E5D3]";
        break;
      case "outline":
        variantStyles =
          "border border-[#C8102E]/30 text-[#1E0F10] hover:border-[#C8102E] hover:text-[#C8102E] bg-transparent";
        break;
      case "ghost":
        variantStyles = "text-[#7A6A62] hover:text-[#C8102E] hover:bg-[#F2E5D3]/60";
        break;
    }
  }

  const radiusStyle = isEng ? "rounded-none" : "rounded-full";

  return (
    <motion.button
      ref={ref}
      data-magnetic="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.15 }}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-6 py-3 text-sm transition-colors duration-200 select-none ${radiusStyle} ${variantStyles} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

// Wrapper for arbitrary links/custom elements to give magnetic effect
export function MagneticWrapper({
  children,
  strength = 0.25,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    setPosition({
      x: (clientX - centerX) * strength,
      y: (clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      data-magnetic="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.15 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
