"use client";

import React from "react";

export interface CircuitEmblemProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Draw progress of the circuit wing lines:
   * 0 = Hidden (dashoffset = 1, via dots invisible)
   * 1 = Fully drawn (dashoffset = 0, via dots fully lit)
   * Default is 1
   */
  progress?: number;
  /** Alias for progress */
  drawProgress?: number;
  /** Size in pixels (sets both width and height) */
  size?: number | string;
  /** Primary circuit trace stroke color (default: var(--accent, #00FF9C)) */
  accentColor?: string;
  /** Secondary highlight / via core color (default: var(--gold, #FFC900)) */
  sparkColor?: string;
  /** Stroke width of circuit traces (default: 2.2) */
  strokeWidth?: number;
}

// 8 open-stroke PCB traces fanning from base upward into the wing / phoenix shape
const CIRCUIT_TRACES = [
  // Primary spine / upper wing lead
  "M 45 160 L 75 125 L 75 90 L 120 48 L 138 32",
  // Upper feather 1
  "M 52 160 L 82 122 L 92 90 L 130 62 L 150 56",
  // Mid feather 2
  "M 60 162 L 90 126 L 108 102 L 142 88 L 160 90",
  // Lower feather 3
  "M 68 165 L 98 132 L 118 122 L 148 122 L 162 132",
  // Bottom branch
  "M 76 168 L 105 145 L 124 145 L 142 158",
  // Left crest spine
  "M 45 150 L 38 124 L 42 95 L 56 70 L 68 56",
  // Left crest inner
  "M 52 142 L 46 118 L 54 94 L 66 78",
  // Bottom-right branch
  "M 126 168 L 146 150 L 164 150 L 175 162",
];

// PCB via-dots at prominent junctions with activation thresholds
const VIA_JUNCTIONS = [
  { id: "via-spine-mid", x: 75, y: 125, threshold: 0.3 },
  { id: "via-spine-upper", x: 120, y: 48, threshold: 0.75 },
  { id: "via-feather-mid", x: 92, y: 90, threshold: 0.5 },
  { id: "via-feather-tip", x: 150, y: 56, threshold: 0.88 },
  { id: "via-branch-mid", x: 108, y: 102, threshold: 0.62 },
  { id: "via-crest-node", x: 42, y: 95, threshold: 0.55 },
];

export function CircuitEmblem({
  progress,
  drawProgress,
  size = 200,
  accentColor = "var(--accent, #00FF9C)",
  sparkColor = "var(--gold, #FFC900)",
  strokeWidth = 2.2,
  className = "",
  style,
  ...props
}: CircuitEmblemProps) {
  const currentProgress = Math.max(
    0,
    Math.min(1, progress !== undefined ? progress : drawProgress !== undefined ? drawProgress : 1)
  );

  const dashoffset = 1 - currentProgress;

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
        {/* Neon glow filter for matrix cybernetic lines */}
        <filter id="circuit-neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor={accentColor} floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Faint unpowered substrate traces so the circuit pattern is legible when dormant */}
      <g opacity={0.25}>
        {CIRCUIT_TRACES.map((d, index) => (
          <path
            key={`ghost-${index}`}
            d={d}
            fill="none"
            stroke={accentColor}
            strokeWidth={strokeWidth * 0.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </g>

      {/* 8 Open-Stroke Angular Circuit Paths with pathLength=1 */}
      <g filter="url(#circuit-neon-glow)">
        {CIRCUIT_TRACES.map((d, index) => (
          <path
            key={index}
            id={`circuit-trace-${index}`}
            d={d}
            fill="none"
            stroke={accentColor}
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
        ))}
      </g>

      {/* Via-Dots at Junctions: Fade and scale in as the stroke passes their position */}
      {VIA_JUNCTIONS.map((via) => {
        const isReached = currentProgress >= via.threshold;
        const opacity = isReached ? 1 : 0;
        const scale = isReached ? 1 : 0.2;

        return (
          <g
            key={via.id}
            transform={`translate(${via.x}, ${via.y}) scale(${scale})`}
            style={{
              opacity,
              transformOrigin: "center",
              transition: "opacity 0.2s ease-out, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Outer copper pad */}
            <circle
              cx="0"
              cy="0"
              r="3.5"
              fill="var(--bg, #050807)"
              stroke={accentColor}
              strokeWidth="1.6"
            />
            {/* Center drill hole / gold spark core */}
            <circle cx="0" cy="0" r="1.4" fill={sparkColor} />
          </g>
        );
      })}
    </svg>
  );
}

export default CircuitEmblem;
