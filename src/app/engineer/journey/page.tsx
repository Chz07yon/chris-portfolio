"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Cpu, ChevronDown } from "lucide-react";

interface MilestoneNode {
  id: string;
  year: string;
  phase: string;
  title: string;
  summary: string;
  details: {
    specs: string[];
    outcomes: string;
    keyTakeaway: string;
  };
  padNumber: string;
}

export default function EngineerJourneyPage() {
  const [activeNode, setActiveNode] = useState<string>("focus");

  const milestones: MilestoneNode[] = [
    {
      id: "vvce-start",
      year: "2025",
      phase: "01 // GENESIS",
      padNumber: "ERJ_01",
      title: "VVCE Matriculation & ECE Foundations",
      summary: "Started my undergraduate engineering in Electronics & Communication at Vidyavardhaka College of Engineering (VVCE), Mysore.",
      details: {
        specs: [
          "Introduction To Engineering",
          "Semiconductor Device Physics & BJT/MOSFET biased circuits",
          "Digital Logic Design & Karnaugh Minimization",
          "Engineering Mathematics",
          "Problem Solving Using C/C++",
        ],
        outcomes: "Solidified analytical rigor and foundational mathematics behind signal theory and analog hardware.",
        keyTakeaway: "Hardware is governed by the laws of physics — understanding signals at the physical layer eliminates guesswork.",
      },
    },
    {
      id: "first-builds",
      year: "2025-2026",
      phase: "02 // BENCH EXPERIMENTS",
      padNumber: "ERJ_02",
      title: "First Physical Builds & Software Build",
      summary: "Transitioned from textbook theory to hands-on soldering iron, discrete breadboarding, and custom AVR microcontroller breakout boards.",
      details: {
        specs: [
          "Bare-metal C on ATmega328P with direct register bit-manipulation",
          "A smart Crowed Control Device was developed with IR logic",
          "Working Logics of Micro Controllers"
        ],
        outcomes: "Developed functional sensor logger circuits and learned debugging and Time management.",
        keyTakeaway: "Software abstractions crumble without solid grounding and debounce filters in the physical domain.",
      },
    },
    {
      id: "Anvil-hackathon",
      year: "2026",
      phase: "03 // TRIAL BY FIRE",
      padNumber: "ERJ_03",
      title: "Anvil Hackathon",
      summary: "Engineered a Memory Management System in 24 hours at Scalar School of Technology ,Bengaluru.",
      details: {
        specs: [
          "24-hour Memory Management System development",
          "Hardware turnaround & breadboard-to-perfboard migration",
          "Resilient Pattern identifying algorithms",
        ],
        outcomes: "Developed a Memory Management System that Manages Memory with No overhead.",
        keyTakeaway: "Under pressure, clean architectural separation between driver, transport, and application layers saves the project.",
      },
    },
    {
      id: "vvce-connect",
      year: "2026",
      phase: "04 // SYSTEM DEPLOYMENT",
      padNumber: "ERJ_04",
      title: "VVCE Connect Platform Architecture",
      summary: "Architected and delivered the comprehensive institutional gateway bridging student telemetry, department workflows, and campus services.",
      details: {
        specs: [
          "Full-stack campus architecture with microservices and high-throughput databases",
          "Integrated real-time announcement websockets and academic metric dashboards",
          "Robust authentication and role-based permissions matrix",
          "Backend Logics and Interactive UI Implimentation"
        ],
        outcomes: "Deployed across campus faculties, serving thousands of active university members daily.",
        keyTakeaway: "Engineering is validated when real users rely upon the platform continuously without disruption.",
      },
    },
    {
      id: "focus",
      year: "2026",
      phase: "05 // HIGH-SPEED ACTIVE",
      padNumber: "ERJ_05",
      title: "Current Focus: Autonomous Mobile Robot (AMR)",
      summary: "Designing a daily life assistent which is designed to perform a specific task",
      details: {
        specs: [
          "Introduction to OpenCV",
          "Complex Circuit Building",
          "Sensor Fusion",
          "Robotics and Automation"
        ],
        outcomes: "Producing industrial-grade physical prototypes ready for volume fabrication and assembly.",
        keyTakeaway: "The pinnacle of engineering is the invisible perfection where hardware runs cool, quiet, and forever deterministic.",
      },
    },
  ];

  // Track scroll progress for the SVG trace line down the page
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050807] text-[#E8F5EF] pb-36">
      {/* Near-flat background: the circuit trace IS the visual hero */}
      <div className="absolute inset-0 bg-tech-grid opacity-[0.06] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 md:pt-16">
        {/* Header Breadcrumb & Center-Right Ambient Logo */}
        <div className="relative mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <ScrollReveal direction="down" className="max-w-2xl relative z-10">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#E8F5EF] mb-4">
              CHRONOLOGICAL <br />
              <span className="text-[#00FF9C] drop-shadow-[0_0_20px_rgba(0,255,156,0.35)]">
                CIRCUIT TRACE.
              </span>
            </h1>
            <p className="text-[#7C9A8E] text-base md:text-lg leading-relaxed">
              A single continuous signal line routed through pivotal milestones. Click or scroll to any node to inspect its schematics and technical takeaways.
            </p>
          </ScrollReveal>

          {/* Logo with reduced opacity at center-right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 md:relative md:top-auto md:translate-y-0 shrink-0 pointer-events-none select-none z-0 pr-0 md:pr-4 lg:pr-8">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 opacity-35 md:opacity-45">
              <Image
                src="/assets/engineer/engineer-emblem.png"
                alt="Engineer Logo Emblem"
                fill
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
                className="object-contain filter drop-shadow-[0_0_50px_rgba(0,255,156,0.5)] brightness-110"
                priority
              />
            </div>
          </div>
        </div>

        {/* TIMELINE CONTAINER WITH CENTRAL ROUTED CIRCUIT TRACE */}
        <div className="relative">
          {/* STATIC BASE CIRCUIT TRACE (Dark Copper / Substrate) */}
          <div className="absolute left-6 md:left-12 top-6 bottom-6 w-[2px] bg-[#12261F] pointer-events-none" />

          {/* DYNAMIC SCROLL-DRAWN ACTIVE SIGNAL TRACE (Electric Green) */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-6 md:left-12 top-6 bottom-6 w-[2px] bg-[#00FF9C] shadow-[0_0_12px_#00FF9C,0_0_24px_rgba(0,255,156,0.6)] pointer-events-none z-10"
          />

          {/* MILESTONE NODES */}
          <div className="space-y-12">
            {milestones.map((node) => {
              const isExpanded = activeNode === node.id;

              return (
                <div key={node.id} className="relative pl-16 md:pl-28 group">
                  {/* SOLDER PAD VIA (Circular copper pad with central hole) */}
                  <button
                    onClick={() => setActiveNode(isExpanded ? "" : node.id)}
                    aria-label={`Toggle details for ${node.title}`}
                    className={`absolute left-[13px] md:left-[37px] top-6 -translate-x-1/2 z-20 w-7 h-7 flex items-center justify-center transition-all duration-300 select-none ${isExpanded
                      ? "bg-[#00FF9C] border-2 border-[#050807] shadow-[0_0_20px_#00FF9C]"
                      : "bg-[#0A1210] border-2 border-[#00FF9C]/60 hover:border-[#00FF9C] group-hover:scale-110"
                      }`}
                  >
                    {/* Inner Pad Core */}
                    <div
                      className={`w-2 h-2 ${isExpanded ? "bg-[#050807]" : "bg-[#00FF9C] shadow-[0_0_6px_#00FF9C]"
                        }`}
                    />
                  </button>

                  {/* 45-DEGREE CIRCUIT TRACE TAP (horizontal lead into card) */}
                  <div
                    className={`absolute left-6 md:left-12 top-9 w-10 md:w-16 h-[2px] transition-colors duration-300 pointer-events-none ${isExpanded ? "bg-[#00FF9C] shadow-[0_0_8px_#00FF9C]" : "bg-[#12261F] group-hover:bg-[#00FF9C]/40"
                      }`}
                  />

                  {/* MILESTONE CARD */}
                  <div
                    onClick={() => setActiveNode(isExpanded ? "" : node.id)}
                    className={`cursor-pointer transition-all duration-300 p-6 md:p-8 bg-[#0A1210] border select-none ${isExpanded
                      ? "border-[#00FF9C] shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(0,255,156,0.12)] bg-[#0C1714]"
                      : "border-[#12261F] hover:border-[#00FF9C]/50 hover:bg-[#0E1A17]"
                      }`}
                  >
                    {/* Card Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-[#00FF9C] bg-[#12261F] px-2 py-0.5 border border-[#12261F]">
                          {node.padNumber}
                        </span>
                        <span className="text-xs font-mono text-[#FFC900] tracking-wider uppercase font-semibold">
                          {node.phase}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#7C9A8E]">{node.year}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold text-[#E8F5EF] mb-3 group-hover:text-[#00FF9C] transition-colors">
                      {node.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-xs md:text-sm text-[#7C9A8E] leading-relaxed">
                      {node.summary}
                    </p>

                    {/* EXPANDED TECHNICAL DETAIL CARD */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="pt-6 mt-6 border-t border-[#12261F] space-y-5"
                      >
                        {/* Technical Specifications */}
                        <div>
                          <div className="text-[11px] font-mono text-[#00FF9C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Cpu className="w-3.5 h-3.5" />
                            <span>HARDWARE SPECIFICATIONS &amp; DRIVER DESIGN:</span>
                          </div>
                          <ul className="space-y-1.5 pl-1">
                            {node.details.specs.map((spec, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs font-mono text-[#E8F5EF]">
                                <span className="text-[#00FF9C]">&gt;</span>
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Outcomes & Takeaway */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div className="p-4 bg-[#050807] border border-[#12261F]">
                            <div className="text-[10px] font-mono text-[#FFC900] uppercase mb-1">
                              SYSTEM OUTCOME
                            </div>
                            <p className="text-xs text-[#7C9A8E] leading-relaxed">
                              {node.details.outcomes}
                            </p>
                          </div>
                          <div className="p-4 bg-[#050807] border border-[#12261F]">
                            <div className="text-[10px] font-mono text-[#00FF9C] uppercase mb-1">
                              CORE TAKEAWAY
                            </div>
                            <p className="text-xs text-[#7C9A8E] leading-relaxed">
                              {node.details.keyTakeaway}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Expansion Cue */}
                    <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-[#7C9A8E] pt-2">
                      <span>{isExpanded ? "CLICK TO COLLAPSE" : "CLICK TO EXPAND CIRCUIT TELEMETRY"}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 text-[#00FF9C] ${isExpanded ? "rotate-180" : ""
                          }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
