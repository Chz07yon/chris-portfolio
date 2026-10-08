"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Cpu, Film } from "lucide-react";

export function WorldPill() {
  const { mode, initiateWorldSwitch, worldSwitchState, isHeaderHidden } = useTheme();
  const isEng = mode === "engineer";

  const handleSwitchToEngineer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isEng) {
      const rect = e.currentTarget.getBoundingClientRect();
      const origin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      initiateWorldSwitch("engineer", origin);
    }
  };

  const handleSwitchToStudio = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isEng) {
      const rect = e.currentTarget.getBoundingClientRect();
      const origin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      initiateWorldSwitch("studio", origin);
    }
  };

  return (
    <motion.aside
      aria-label="World Switcher Pill"
      initial={false}
      animate={{
        y: isHeaderHidden ? 100 : 0,
        opacity: isHeaderHidden ? 0 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        pointerEvents: isHeaderHidden ? "none" : "auto",
      }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] pointer-events-auto select-none"
    >
      <div
        data-magnetic="true"
        className={`flex items-center p-1.5 transition-all duration-300 shadow-2xl backdrop-blur-xl ${
          isEng
            ? "bg-[#0A1210]/90 border border-[#12261F] hover:border-[#00FF9C]/60 rounded-none shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(0,255,156,0.18)]"
            : "bg-[#FFFAF2]/95 border border-[#E5D5C2] hover:border-[#C8102E]/40 rounded-full shadow-[0_10px_35px_rgba(30,15,16,0.15),0_0_25px_rgba(200,16,46,0.12)]"
        }`}
      >
        {/* ENGINEER THUMB / BUTTON */}
        <button
          onClick={handleSwitchToEngineer}
          disabled={worldSwitchState.isSwitching}
          aria-label="Switch to Engineer Portfolio"
          aria-pressed={isEng}
          className={`relative flex items-center gap-2 px-4 py-2 text-xs font-mono transition-colors duration-200 select-none ${
            isEng ? "rounded-none text-[#050807] font-bold" : "rounded-none text-[#7A6A62] hover:text-[#1E0F10]"
          }`}
        >
          {isEng && (
            <motion.div
              layoutId="world-pill-thumb"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className="absolute inset-0 bg-[#00FF9C] shadow-[0_0_18px_#00FF9C]"
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span className="tracking-widest">ENGINEER</span>
          </span>
        </button>

        {/* DIVIDER */}
        <div
          className={`w-[1px] h-4 mx-1 transition-colors duration-300 ${
            isEng ? "bg-[#12261F]" : "bg-[#E5D5C2]"
          }`}
        />

        {/* STUDIO THUMB / BUTTON */}
        <button
          onClick={handleSwitchToStudio}
          disabled={worldSwitchState.isSwitching}
          aria-label="Switch to The Red Studios"
          aria-pressed={!isEng}
          className={`relative flex items-center gap-2 px-4 py-2 text-xs transition-colors duration-200 select-none ${
            !isEng
              ? "rounded-full text-[#FFFAF2] font-semibold"
              : "rounded-full text-[#7C9A8E] hover:text-[#E8F5EF] font-mono"
          }`}
        >
          {!isEng && (
            <motion.div
              layoutId="world-pill-thumb"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className="absolute inset-0 bg-[#C8102E] rounded-full shadow-[0_0_18px_rgba(200,16,46,0.55)]"
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5" />
            <span className="tracking-wider">THE RED STUDIOS</span>
          </span>
        </button>
      </div>
    </motion.aside>
  );
}
