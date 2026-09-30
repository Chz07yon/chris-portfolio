"use client";

import React from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  stagger?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.65,
  distance = 32,
  direction = "up",
  once = true,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getOffset = () => {
    if (shouldReduceMotion) {
      return { x: 0, y: 0 };
    }
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Container for staggered cards or grids
export function StaggerContainer({
  children,
  className = "",
  stagger = 0.1,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger child item
export function StaggerItem({
  children,
  className = "",
  distance = 28,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : distance },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
