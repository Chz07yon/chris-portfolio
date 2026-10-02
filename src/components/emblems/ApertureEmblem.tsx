"use client";

import React from "react";

export interface ApertureEmblemProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Progress of the aperture opening:
   * 0 = Closed (blades rotated inward, covering center hole)
   * 1 = Open (blades rotated outward ~35°, revealing circular center hole)
   * Default is 1 (open)
   */
  progress?: number;
  /** Alias for progress */
  drawProgress?: number;
  /** Size in pixels (sets both width and height) */
  size?: number | string;
  /** Color for even blades (default: var(--ink, #3A0A10)) */
  inkColor?: string;
  /** Color for odd blades (default: var(--accent, #C8102E)) */
  accentColor?: string;
  /** Edge stroke color for blade definition */
  strokeColor?: string;
  /** Rotation angle for fully opened blades in degrees (default: 35) */
  openAngle?: number;
}

// Center of 200x200 viewBox
const CX = 100;
const CY = 100;

// Blade pivot hinge point on outer perimeter
const PIVOT_X = 175;
const PIVOT_Y = 120;

// Quadrilateral blade shape (closed state tip at ~103,102 near center)
const BLADE_PATH_D = "M 103 102 L 128 48 L 184 70 L 175 120 Z";

export function ApertureEmblem({
  progress,
  drawProgress,
  size = 200,
  inkColor = "var(--ink, #3A0A10)",
  accentColor = "var(--accent, #C8102E)",
  strokeColor = "rgba(0, 0, 0, 0.2)",
  openAngle = 35,
  className = "",
  style,
  ...props
}: ApertureEmblemProps) {
  const currentProgress = Math.max(
    0,
    Math.min(1, progress !== undefined ? progress : drawProgress !== undefined ? drawProgress : 1)
  );

  // Rotate blade outward around pivot: 0 deg (closed) -> openAngle deg (open)
  const bladeRotation = currentProgress * openAngle;

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none overflow-visible ${className}`}
      style={style}
      aria-hidden="true"
      {...props}
    >
      <defs>
        {/* Subtle drop shadow for blade depth overlapping */}
        <filter id="aperture-blade-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* 8 Quadrilateral Blades rotated 45° apart around (100, 100) */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const isEven = i % 2 === 0;
        const fillColor = isEven ? inkColor : accentColor;

        return (
          <g key={i} transform={`rotate(${i * 45} ${CX} ${CY})`}>
            <path
              id={`aperture-blade-${i}`}
              d={BLADE_PATH_D}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="0.75"
              strokeLinejoin="round"
              filter="url(#aperture-blade-shadow)"
              transform={`rotate(${bladeRotation} ${PIVOT_X} ${PIVOT_Y})`}
              style={{
                transformOrigin: `${PIVOT_X}px ${PIVOT_Y}px`,
                transition: "transform 0.05s linear",
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}

export default ApertureEmblem;
