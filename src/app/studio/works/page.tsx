"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Clapperboard, Sparkles, ArrowUpRight, X, Film, Camera, ExternalLink, Calendar, Layers } from "lucide-react";

interface StudioWork {
  id: string;
  title: string;
  category: string;
  synopsis: string;
  deliverable: string;
  date: string;
  gear: string;
  liveUrl: string;
  badge: string;
  isDarkThemed?: boolean;
  modal: {
    context: string;
    deliverableDetails: string[];
    dateDelivered: string;
    cinematographyNotes: string;
  };
}

export default function StudioWorksPage() {
  const [selectedWork, setSelectedWork] = useState<StudioWork | null>(null);

  const works: StudioWork[] = [
    {
      id: "crimson-solitude",
      title: "Crimson Solitude",
      category: "NARRATIVE SHORT FILM",
      synopsis: "An atmospheric study on silence, internal embers, and isolation against rugged coastal topography.",
      deliverable: "4K Master // 2.39:1 Anamorphic // Original Score",
      date: "October 2024",
      gear: "Arri Alexa Mini LF // Cooke Anamorphic // DaVinci Rec.709",
      liveUrl: "https://instagram.com/rdx._.red",
      badge: "ANAMORPHIC 4K",
      modal: {
        context:
          "Commissioned as a conceptual meditation on solitude. The brief required creating visual tension solely through camera movement, natural golden hour illumination, and negative space without spoken dialogue.",
        deliverableDetails: [
          "Primary Master: 4K DCI Anamorphic (2.39:1 aspect ratio)",
          "Color Grade: Handcrafted 35mm film print emulation with deep rolled-off shadows",
          "Audio: 5.1 Surround binaural coastal field recordings integrated with cello score",
        ],
        dateDelivered: "October 2024",
        cinematographyNotes:
          "Shot exclusively on vintage Cooke Anamorphic glass to achieve signature oval bokeh blooms and subtle organic barrel distortion.",
      },
    },
    {
      id: "chroma-chiaroscuro",
      title: "Chroma & Chiaroscuro",
      category: "HAUTE FASHION CAMPAIGN",
      synopsis: "Direction and color chemistry for an avant-garde apparel line, carving dramatic silhouettes from deep shadows.",
      deliverable: "Commercial Cut (60s) + 3 Editorial Stills",
      date: "July 2024",
      gear: "Red V-Raptor 8K // Atlas Orion Anamorphics // Custom LUT",
      liveUrl: "https://instagram.com/rdx._.red",
      badge: "8K CAMPAIGN",
      modal: {
        context:
          "Created for a progressive apparel house seeking to depart from flat fashion lighting. The creative concept centered on high-contrast chiaroscuro, illuminating models with razor-thin shafts of crimson and amber light.",
        deliverableDetails: [
          "Broadcast Spot: 60s Cinema Teaser + 15s Vertical Social Cuts",
          "Stills Archive: 24 High-Resolution Editorial Stills for print lookbooks",
          "Color Architecture: Bespoke split-tone grade pushing reds into warmth and shadows into cool obsidian",
        ],
        dateDelivered: "July 2024",
        cinematographyNotes:
          "Employed motorized sliders with synchronized lighting shifts to create the illusion of garments emerging organically from the void.",
      },
    },
    {
      id: "icym-retrospective",
      title: "ICYM Kokkada: Sacred Heritage",
      category: "COMMUNITY DOCUMENTARY & EXHIBITION",
      synopsis: "Full-scale visual chronicle of parish cultural festivals, youth congresses, and sacred liturgical celebrations.",
      deliverable: "22-Minute Film + 120-Image Heritage Monograph",
      date: "Annual 2022 — 2024",
      gear: "Sony FX6 // Zeiss Supreme Primes // Multicam Live Feed",
      liveUrl: "https://instagram.com/rdx._.red",
      badge: "PARISH ARCHIVE",
      modal: {
        context:
          "As Media Director for ICYM Kokkada Parish, oversaw multi-day coverage of annual patronal feasts, regional sports tournaments, and liturgical traditions. Grounded in authentic community representation.",
        deliverableDetails: [
          "Documentary Feature: 22-minute festival chronicle with candid elder interviews",
          "Live Broadcast: Multi-camera live-switched stream reaching 5,000+ overseas parishioners",
          "Print Exhibition: Commemorative photo book chronicling 3 generations of parish life",
        ],
        dateDelivered: "Annual Documentation (Latest: February 2024)",
        cinematographyNotes:
          "Prioritized natural candlelit church interiors and high-speed candid portraits, capturing profound devotion and exuberant communal celebration without artificial staging.",
      },
    },
    {
      id: "echoes-sacred",
      title: "Echoes of the Sacred",
      category: "SPATIAL INSTALLATION & ARCHITECTURE",
      synopsis: "A documentary exploration of stone masonry, sacred geometry, and the slow travel of light through ancient ruins.",
      deliverable: "Looping Gallery Video Installation // Dual 4K Projections",
      date: "March 2024",
      gear: "Sony FX3 // Cinema Primes // Natural Ambient Light",
      liveUrl: "https://instagram.com/rdx._.red",
      badge: "INSTALLATION",
      modal: {
        context:
          "Conceived as an ambient physical gallery installation exploring how sacred geometric structures channel morning sunlight. Exhibited in an enclosed architectural gallery space.",
        deliverableDetails: [
          "Dual Projection Feed: Synchronized seamless 12-minute ambient video loop",
          "Spatial Sound: Multi-channel acoustic reverberations recorded on-site",
          "Photo Suite: 16 Fine-art archival pigment prints on textured cotton rag",
        ],
        dateDelivered: "March 2024",
        cinematographyNotes:
          "Shot exclusively over 7 consecutive dawn sessions to capture the exact 14-minute window when sunlight pierces through the sanctum colonnade.",
      },
    },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#F6EFE4] text-[#1E0F10] pb-32">
      {/* 1. TOP IVORY FRAMING SECTION */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-12 md:pt-16 pb-12">
        {/* Header Breadcrumb & Center-Right Ambient Logo */}
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <ScrollReveal direction="down" className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFAF2] border border-[#E5D5C2] rounded-full text-xs text-[#C8102E] mb-6">
              <Clapperboard className="w-3.5 h-3.5" />
              <span>EXHIBITION CATALOG // CINEMATOGRAPHY &amp; VISUALS</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1E0F10] mb-4">
              FEATURED <br />
              <span className="text-[#C8102E] italic">WORKS</span> &amp; PRODUCTIONS.
            </h1>
            <p className="text-[#7A6A62] text-base md:text-lg leading-relaxed">
              Curated motion picture reels, campaign narratives, and cultural documentaries.
              Framed in our dedicated dark viewing gallery for optimal contrast and visual immersion.
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
      </section>

      {/* 2. DEDICATED DARK SECTION (Near-black / charcoal background so photography POPS) */}
      <section className="relative z-20 bg-[#0C0809] text-[#FFFAF2] py-20 px-6 border-y border-[#261215] shadow-2xl">
        {/* Subtle Charcoal Grid / Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0809] via-[#140A0D] to-[#0C0809] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Gallery Status Header */}
          <div className="flex items-center justify-between pb-6 mb-12 border-b border-[#2A1518]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8102E]">
                DARK GALLERY PROJECTION SUITE
              </span>
            </div>
            <span className="text-xs text-[#7A6A62] hidden sm:inline">
              DCI-P3 COLOR ENCODED
            </span>
          </div>

          {/* WORKS GRID */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {works.map((work) => (
              <StaggerItem key={work.id}>
                <div className="p-8 bg-[#140B0E] border border-[#2A1518] hover:border-[#C8102E]/60 rounded-3xl transition-all duration-300 shadow-xl flex flex-col justify-between h-full group">
                  <div>
                    {/* Header Badge */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#261215]">
                      <span className="text-[10px] font-semibold text-[#FFFAF2] bg-[#C8102E] px-2.5 py-0.5 rounded-full shadow-sm">
                        {work.badge}
                      </span>
                      <span className="text-xs font-semibold text-[#C99A2E] tracking-wider uppercase">
                        {work.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-[#FFFAF2] mb-3 group-hover:text-[#C8102E] transition-colors">
                      {work.title}
                    </h2>

                    {/* Synopsis */}
                    <p className="text-xs md:text-sm text-[#A89892] leading-relaxed mb-6">
                      {work.synopsis}
                    </p>

                    {/* Metadata Specs */}
                    <div className="p-3 bg-[#0B0507] rounded-xl border border-[#220E12] space-y-1 mb-8 text-[11px] text-[#A89892]">
                      <div className="flex items-center gap-2">
                        <span className="text-[#C8102E] font-medium">DELIVERABLE:</span>
                        <span className="text-[#E5D5C2]">{work.deliverable}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#C99A2E] font-medium">GEAR / COLOR:</span>
                        <span className="text-[#E5D5C2]">{work.gear}</span>
                      </div>
                    </div>
                  </div>

                  {/* DUAL ACTIONS: View Project & View Description */}
                  <div className="pt-4 border-t border-[#261215] flex items-center justify-between gap-4">
                    {/* Action 1: View Project (External link) */}
                    <a
                      href={work.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#A89892] hover:text-[#FFFAF2] transition-colors"
                    >
                      <span>View Project Reel</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* Action 2: View Description (Opens in-page modal) */}
                    <MagneticButton
                      variant="primary"
                      onClick={() => setSelectedWork(work)}
                      className="!px-5 !py-2 !text-xs font-medium"
                    >
                      View Description
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </MagneticButton>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. BOTTOM IVORY FRAMING FOOTER */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-[#7A6A62]">
          <Sparkles className="w-3.5 h-3.5 text-[#C99A2E]" />
          <span>ALL PRODUCTIONS AVAILABLE FOR SCREENINGS &amp; COMMISSION REVIEW</span>
        </div>
      </section>

      {/* IN-PAGE PRODUCTION BRIEF MODAL: Context → Deliverable → Date */}
      <AnimatePresence>
        {selectedWork && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#050304]/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#FFFAF2] text-[#1E0F10] border-2 border-[#C8102E] p-7 md:p-9 rounded-3xl shadow-[0_20px_70px_rgba(200,16,46,0.3)] max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedWork(null)}
                aria-label="Close production brief modal"
                className="absolute top-6 right-6 p-2 text-[#7A6A62] hover:text-[#C8102E] border border-[#E5D5C2] hover:border-[#C8102E] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="text-[10px] font-semibold text-[#C8102E] tracking-widest uppercase mb-1">
                PRODUCTION ARCHIVE BRIEF
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1E0F10] mb-6">
                {selectedWork.title}
              </h3>

              <div className="space-y-5">
                {/* 1. CONTEXT */}
                <div className="p-5 bg-[#F6EFE4] rounded-2xl border border-[#E5D5C2]">
                  <div className="text-xs font-semibold text-[#C8102E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5" />
                    <span>01 // CREATIVE CONTEXT &amp; MANDATE</span>
                  </div>
                  <p className="text-xs md:text-sm text-[#7A6A62] leading-relaxed">
                    {selectedWork.modal.context}
                  </p>
                </div>

                {/* 2. DELIVERABLES */}
                <div className="p-5 bg-[#F6EFE4] rounded-2xl border border-[#E5D5C2]">
                  <div className="text-xs font-semibold text-[#C8102E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>02 // PRODUCTION DELIVERABLES</span>
                  </div>
                  <ul className="space-y-1.5">
                    {selectedWork.modal.deliverableDetails.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#1E0F10]">
                        <span className="text-[#C8102E]">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. DATE & CINEMATOGRAPHY NOTES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#F6EFE4] rounded-2xl border border-[#E5D5C2]">
                    <div className="text-[10px] font-semibold text-[#C99A2E] uppercase mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>DATE DELIVERED</span>
                    </div>
                    <p className="text-xs text-[#1E0F10] font-medium">
                      {selectedWork.modal.dateDelivered}
                    </p>
                  </div>
                  <div className="p-4 bg-[#F6EFE4] rounded-2xl border border-[#E5D5C2]">
                    <div className="text-[10px] font-semibold text-[#C8102E] uppercase mb-1 flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      <span>OPTICAL NOTES</span>
                    </div>
                    <p className="text-xs text-[#7A6A62] leading-relaxed">
                      {selectedWork.modal.cinematographyNotes}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-4 border-t border-[#E5D5C2] flex items-center justify-between">
                <a
                  href={selectedWork.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C8102E] font-medium hover:underline"
                >
                  <span>Open Full Reel Online</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedWork(null)}
                  className="px-5 py-2 bg-[#C8102E] text-xs font-semibold text-[#FFFAF2] hover:bg-[#A30D25] rounded-full transition-colors"
                >
                  Close Brief
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
