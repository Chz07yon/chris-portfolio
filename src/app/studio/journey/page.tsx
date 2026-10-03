"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Sparkles, Camera, ChevronDown, Aperture } from "lucide-react";

interface StudioMilestone {
  id: string;
  year: string;
  title: string;
  category: string;
  frameNumber: string;
  summary: string;
  details: {
    gearAndLighting: string[];
    deliverables: string;
    artisticTakeaway: string;
  };
}

export default function StudioJourneyPage() {
  const [activeNode, setActiveNode] = useState<string>("shoots");

  const milestones: StudioMilestone[] = [
    {
      id: "founding-rdx",
      year: "2020",
      category: "GENESIS // FIRST FRAMES",
      frameNumber: "FRAME_01",
      title: "Founding of RDX RED",
      summary: "First independent creative experiments in stills photography, kinetic typography, and short-form music vignettes under the original moniker RDX RED.",
      details: {
        gearAndLighting: [
          "Manual prime lenses & handheld stabilization",
          "Golden hour natural lighting & tungsten practical lamps",
          "Custom color curves & early film emulation experiments",
        ],
        deliverables: "Portfolio of 40+ curated still frames, musical teaser clips, and street photo essays.",
        artisticTakeaway: "Emotion is not created by expensive gear; it is discovered through patient observation of light.",
      },
    },
    {
      id: "icym-role",
      year: "2021 — 2022",
      category: "COMMUNITY // CULTURAL DOCUMENTATION",
      frameNumber: "FRAME_02",
      title: "ICYM Kokkada Parish Media Leadership",
      summary: "Entrusted with directing media operations, live multicam broadcasts, and cultural archives for ICYM Kokkada Parish celebrations.",
      details: {
        gearAndLighting: [
          "Multi-camera live switching & high-dynamic range capture",
          "Fast telephoto lenses for candid, unscripted human emotion",
          "Direction of on-ground youth media crew during multi-day festivals",
        ],
        deliverables: "15+ community documentary films, hundreds of event retrospectives, and live broadcasts reaching thousands.",
        artisticTakeaway: "Unscripted communal moments require total presence and an intuitive readiness to capture authentic grace.",
      },
    },
    {
      id: "rebrand-studio",
      year: "2023",
      category: "TRANSFORMATION // STUDIO PRACTICE",
      frameNumber: "FRAME_03",
      title: "Rebrand to THE RED STUDIOS",
      summary: "Transitioned from a casual creative outlet to a dedicated cinematic and visual architecture studio with professional cinema glass and workflow rigor.",
      details: {
        gearAndLighting: [
          "Anamorphic lenses & cinema cameras (Red / FX series)",
          "Dedicated DaVinci Resolve color suites with calibrated Rec.709 & DCI-P3 monitoring",
          "Haze diffusion, negative fill, and deliberate chiaroscuro key lighting",
        ],
        deliverables: "Full studio visual identity launch, brand manifesto film, and upgraded post-production pipeline.",
        artisticTakeaway: "Elevating from a hobbyist to a director demands relentless intentionality in every frame ratio, cut, and shadow.",
      },
    },
    {
      id: "red-cyan-division",
      year: "2023 — 2024",
      category: "EXPANSION // DUAL SPECTRUM",
      frameNumber: "FRAME_04",
      title: "RED + CYAN Divisions Formed",
      summary: "Formalized the agency into two specialized wings: RED for cinematic motion pictures, and CYAN for editorial brand architecture and design systems.",
      details: {
        gearAndLighting: [
          "RED: Cinema prime lenses, gimbal choreography, color grading suites",
          "CYAN: Vector identity grids, Swiss typography systems, print monograph design",
          "Cross-discipline synthesis bridging film grading with brand color psychology",
        ],
        deliverables: "Dual-identity guidelines, client onboarding matrix, and unified creative direction handbook.",
        artisticTakeaway: "Motion without typographic architecture is chaotic; design without cinematic warmth is sterile. Together they are invincible.",
      },
    },
    {
      id: "shoots",
      year: "2024 — PRESENT",
      category: "EXHIBITION // CINEMATIC LANDMARKS",
      frameNumber: "FRAME_05",
      title: "High-Concept Brand Campaigns & Narrative Films",
      summary: "Directing luxury editorial fashion films, spatial architectural studies, and bespoke commercial productions across India.",
      details: {
        gearAndLighting: [
          "Arri / Sony FX cinema suites with vintage prime lenses",
          "Precision wireless follow-focus & calibrated LED RGBACL lighting matrices",
          "Spatial binaural sound design married with custom score compositions",
        ],
        deliverables: "Award-winning commercial campaigns, festival submissions, and high-impact editorial publications.",
        artisticTakeaway: "Great cinema does not merely show a story — it creates an atmosphere in which the audience breathes differently.",
      },
    },
  ];

  // Track scroll progress for the filmstrip trace line down the page
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#F6EFE4] text-[#1E0F10] pb-36">
      {/* Subtle Paper-Grain Background Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 -z-10"
        style={{
          backgroundImage: "radial-gradient(rgba(58, 10, 16, 0.05) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 md:pt-16">
        {/* Header Breadcrumb & Center-Right Ambient Logo */}
        <div className="relative mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <ScrollReveal direction="down" className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFAF2] border border-[#E5D5C2] rounded-full text-xs text-[#C8102E] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#C99A2E]" />
              <span>MANDALA &amp; FILMSTRIP // CREATIVE TIMELINE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1E0F10] mb-4">
              CHRONOLOGICAL <br />
              <span className="text-[#C8102E] italic">FILMSTRIP</span> &amp; ODYSSEY.
            </h1>
            <p className="text-[#7A6A62] text-base md:text-lg leading-relaxed">
              A continuous film reel tracing our evolution from initial frames to cinematic direction.
              Click or scroll to any aperture node to open the production reel.
            </p>
          </ScrollReveal>

          {/* Logo with reduced opacity at center-right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 md:relative md:top-auto md:translate-y-0 shrink-0 pointer-events-none select-none z-0 pr-0 md:pr-4 lg:pr-8">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 opacity-30 md:opacity-40">
              <Image
                src="/assets/studio/studio-emblem.png"
                alt="Studio Logo Emblem"
                fill
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
                className="object-contain filter drop-shadow-[0_4px_30px_rgba(200,16,46,0.3)]"
                priority
              />
            </div>
          </div>
        </div>

        {/* TIMELINE CONTAINER WITH CENTRAL FILMSTRIP TRACK */}
        <div className="relative">
          {/* STATIC BASE FILMSTRIP SPINE */}
          <div className="absolute left-6 md:left-12 top-6 bottom-6 w-[3px] bg-[#E5D5C2] pointer-events-none" />

          {/* DYNAMIC SCROLL-DRAWN ACTIVE CRIMSON REEL TRACE */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-6 md:left-12 top-6 bottom-6 w-[3px] bg-[#C8102E] shadow-[0_0_12px_rgba(200,16,46,0.6)] pointer-events-none z-10"
          />

          {/* MILESTONE FILMSTRIP NODES */}
          <div className="space-y-12">
            {milestones.map((node) => {
              const isExpanded = activeNode === node.id;

              return (
                <div key={node.id} className="relative pl-16 md:pl-28 group">
                  {/* APERTURE BLADE / MANDALA NODE BUTTON */}
                  <button
                    onClick={() => setActiveNode(isExpanded ? "" : node.id)}
                    aria-label={`Toggle details for ${node.title}`}
                    className={`absolute left-[13px] md:left-[37px] top-6 -translate-x-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 select-none shadow-md ${
                      isExpanded
                        ? "bg-[#C8102E] text-[#FFFAF2] border-2 border-[#FFFAF2] shadow-[0_0_20px_rgba(200,16,46,0.5)] scale-110"
                        : "bg-[#FFFAF2] text-[#C8102E] border-2 border-[#C8102E]/50 hover:border-[#C8102E] group-hover:scale-105"
                    }`}
                  >
                    <Aperture className={`w-4 h-4 ${isExpanded ? "animate-spin" : ""}`} style={{ animationDuration: "12s" }} />
                  </button>

                  {/* HORIZONTAL FILMSTRIP SPROCKET CONNECTOR */}
                  <div
                    className={`absolute left-6 md:left-12 top-10 w-10 md:w-16 h-[2px] transition-colors duration-300 pointer-events-none ${
                      isExpanded ? "bg-[#C8102E]" : "bg-[#E5D5C2] group-hover:bg-[#C8102E]/40"
                    }`}
                  />

                  {/* PRODUCTION CARD */}
                  <div
                    onClick={() => setActiveNode(isExpanded ? "" : node.id)}
                    className={`cursor-pointer transition-all duration-300 p-7 md:p-8 bg-[#FFFAF2] border rounded-3xl select-none shadow-sm ${
                      isExpanded
                        ? "border-[#C8102E] shadow-[0_15px_40px_rgba(200,16,46,0.15)] ring-1 ring-[#C8102E]/20"
                        : "border-[#E5D5C2] hover:border-[#C8102E]/40 hover:shadow-md"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-[#C8102E] bg-[#F6EFE4] px-2.5 py-0.5 rounded-full font-semibold border border-[#E5D5C2]">
                          {node.frameNumber}
                        </span>
                        <span className="text-xs font-semibold text-[#C99A2E] tracking-wider uppercase">
                          {node.category}
                        </span>
                      </div>
                      <span className="text-xs text-[#7A6A62] font-medium">{node.year}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold text-[#1E0F10] mb-3 group-hover:text-[#C8102E] transition-colors">
                      {node.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-xs md:text-sm text-[#7A6A62] leading-relaxed">
                      {node.summary}
                    </p>

                    {/* EXPANDED PRODUCTION REEL DETAILS */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="pt-6 mt-6 border-t border-[#E5D5C2] space-y-5"
                      >
                        {/* Gear & Lighting Setup */}
                        <div>
                          <div className="text-[11px] font-semibold text-[#C8102E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5" />
                            <span>OPTICAL GEAR, LIGHTING &amp; SETUP:</span>
                          </div>
                          <ul className="space-y-1.5 pl-1">
                            {node.details.gearAndLighting.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-[#1E0F10]">
                                <span className="text-[#C8102E]">&bull;</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Deliverables & Artistic Takeaway */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div className="p-4 bg-[#F6EFE4] rounded-2xl border border-[#E5D5C2]">
                            <div className="text-[10px] text-[#C99A2E] font-semibold uppercase mb-1">
                              PRODUCTION DELIVERABLE
                            </div>
                            <p className="text-xs text-[#7A6A62] leading-relaxed">
                              {node.details.deliverables}
                            </p>
                          </div>
                          <div className="p-4 bg-[#F6EFE4] rounded-2xl border border-[#E5D5C2]">
                            <div className="text-[10px] text-[#C8102E] font-semibold uppercase mb-1">
                              ARTISTIC TAKEAWAY
                            </div>
                            <p className="text-xs text-[#7A6A62] leading-relaxed">
                              {node.details.artisticTakeaway}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Expansion Cue */}
                    <div className="mt-4 flex items-center justify-between text-[11px] text-[#7A6A62] pt-2">
                      <span>{isExpanded ? "CLICK TO COLLAPSE" : "CLICK TO UNROLL PRODUCTION REEL"}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 text-[#C8102E] ${
                          isExpanded ? "rotate-180" : ""
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
