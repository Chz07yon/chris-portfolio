"use client";

import React from "react";

export interface MandalaMotifProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Draw progress of the mandala flower petals and concentric rings:
   * 0 = Hidden (dashoffset = 1)
   * 1 = Fully drawn (dashoffset = 0)
   * Default is 1
   */
  progress?: number;
  /** Alias for progress */
  drawProgress?: number;
  /** Size in pixels (sets both width and height) */
  size?: number | string;
  /** Primary petal stroke color (default: var(--accent, #C8102E)) */
  accentColor?: string;
  /** Secondary alternating petal & ring color (default: var(--gold, #C99A2E)) */
  goldColor?: string;
  /** Stroke width of petal outlines (default: 1.8) */
  strokeWidth?: number;
  /** Number of radiating petals: 8 or 12 (default: 8) */
  petalCount?: 8 | 12;
}

// Center of 200x200 viewBox
const CX = 100;
const CY = 100;

// Single centered lotus petal path drawing upward from base (100, 78) to pointed tip (100, 14)
const PETAL_PATH_D = "M 100 78 C 82 55, 84 28, 100 14 C 116 28, 118 55, 100 78";

// Inner delicate petal stamen / core line
const PETAL_INNER_D = "M 100 78 L 100 36";

export function MandalaMotif({
  progress,
  drawProgress,
  size = 200,
  accentColor = "var(--accent, #C8102E)",
  goldColor = "var(--gold, #C99A2E)",
  strokeWidth = 1.8,
  petalCount = 8,
  className = "",
  style,
  ...props
}: MandalaMotifProps) {
  const currentProgress = Math.max(
    0,
    Math.min(1, progress !== undefined ? progress : drawProgress !== undefined ? drawProgress : 1)
  );

  const dashoffset = 1 - currentProgress;
  const stepAngle = 360 / petalCount;
  const indices = Array.from({ length: petalCount }, (_, i) => i);

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
        {/* Soft warm aura glow filter */}
        <filter id="mandala-warm-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor={accentColor} floodOpacity="0.4" />
        </filter>
      </defs>

      {/* 1. Concentric Ring Strokes Radiating from Center */}
      <g>
        {/* Innermost seed circle */}
        <circle
          cx={CX}
          cy={CY}
          r="8"
          fill="none"
          stroke={goldColor}
          strokeWidth={strokeWidth}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={dashoffset}
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />

        {/* Inner hub ring intersecting petal bases */}
        <circle
          cx={CX}
          cy={CY}
          r="24"
          fill="none"
          stroke={accentColor}
          strokeWidth={strokeWidth * 0.9}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={dashoffset}
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />

        {/* Mid concentric ring intersecting petal bodies with gold dashed rhythm */}
        <circle
          cx={CX}
          cy={CY}
          r="54"
          fill="none"
          stroke={goldColor}
          strokeWidth="1.2"
          strokeDasharray="4 3"
          pathLength={1}
          strokeDashoffset={dashoffset}
          opacity={currentProgress}
          style={{ transition: "opacity 0.15s ease-out" }}
        />

        {/* Outer boundary concentric ring framing petal tips */}
        <circle
          cx={CX}
          cy={CY}
          r="88"
          fill="none"
          stroke={accentColor}
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity={Math.max(0, (currentProgress - 0.3) / 0.7)}
          style={{ transition: "opacity 0.2s ease-out" }}
        />
      </g>

      {/* 2. Petal Outlines Radiating from Center with Alternating Colors */}
      <g filter="url(#mandala-warm-glow)">
        {indices.map((i) => {
          const isEven = i % 2 === 0;
          const stroke = isEven ? accentColor : goldColor;

          return (
            <g key={i} transform={`rotate(${i * stepAngle} ${CX} ${CY})`}>
              {/* Outer pointed lotus petal arch */}
              <path
                id={`mandala-petal-${i}`}
                d={PETAL_PATH_D}
                fill="none"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={dashoffset}
                style={{
                  transition: "stroke-dashoffset 0.05s linear",
                }}
              />

              {/* Inner petal center vein / stamen */}
              <path
                d={PETAL_INNER_D}
                fill="none"
                stroke={isEven ? goldColor : accentColor}
                strokeWidth={strokeWidth * 0.65}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={dashoffset}
                opacity={0.8}
                style={{
                  transition: "stroke-dashoffset 0.05s linear",
                }}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default MandalaMotif;
