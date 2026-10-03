"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";
import { Palette, Layers, ArrowUpRight, X, Layout } from "lucide-react";

interface DesignItem {
  id: string;
  title: string;
  category: string;
  discipline: "Branding" | "Editorial" | "UI/UX" | "Spatial";
  summary: string;
  deliverables: string[];
  dimensions: string;
  typography: string;
  paletteHex: string[];
  previewAccent: string;
}

export default function StudioDesignsPage() {
  const [filter, setFilter] = useState<string>("All");
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);

  const designItems: DesignItem[] = [
    {
      id: "solstice-brand",
      title: "Solstice: Haute Botanical Identity",
      category: "LUXURY BRANDING & PACKAGING",
      discipline: "Branding",
      summary: "Comprehensive visual identity, custom serif ligature logotype, blind debossed paper packaging, and sustainable unboxing architecture for an organic apothecary.",
      deliverables: ["Brand Identity Book", "Custom Ligatures", "Embossed Packaging", "Palette Guidelines"],
      dimensions: "Physical Print + Digital Vector Suite",
      typography: "Ogg Roman & Neue Haas Grotesk",
      paletteHex: ["#00A3C4", "#1E0F10", "#E8D8C4", "#C99A2E"],
      previewAccent: "from-[#00A3C4]/20 via-[#E5D5C2]/40 to-[#FFFAF2]",
    },
    {
      id: "kintsugi-monograph",
      title: "Kintsugi: Art & Philosophy Monograph",
      category: "EDITORIAL PUBLICATION & PRINT",
      discipline: "Editorial",
      summary: "A 160-page hardcover publication exploring the Japanese philosophy of golden repair. Engineered with an asymmetrical 12-column Swiss grid and gold foil stamping.",
      deliverables: ["160-Page Hardcover Monograph", "12-Column Grid System", "Duotone Print Separation", "Metallic Foil Stamping"],
      dimensions: "240 x 320mm Coffee Table Format",
      typography: "GT Super Display & Pitch Sans",
      paletteHex: ["#C99A2E", "#F6EFE4", "#3A0A10", "#00A3C4"],
      previewAccent: "from-[#C99A2E]/20 via-[#F6EFE4] to-[#FFFAF2]",
    },
    {
      id: "aethelgard-ui",
      title: "Aethelgard: Digital Spatial Interface",
      category: "UI/UX & COMPONENT SYSTEM",
      discipline: "UI/UX",
      summary: "Enterprise design system and spatial web interface for an architectural intelligence platform. Built with sub-pixel typography tokens and fluid glassmorphism panels.",
      deliverables: ["Figma Component Library", "Fluid Grid Specs", "Design Token Taxonomy", "Interactive Prototypes"],
      dimensions: "Web / Tablet / Ultra-Wide 4K",
      typography: "Space Grotesk & JetBrains Mono",
      paletteHex: ["#00A3C4", "#0C1714", "#E8F5EF", "#00FF9C"],
      previewAccent: "from-[#00A3C4]/25 via-[#FFFAF2] to-[#FFFAF2]",
    },
    {
      id: "red-identity",
      title: "The Red Studios: Corporate Identity System",
      category: "STUDIO BRAND ARCHITECTURE",
      discipline: "Branding",
      summary: "The definitive visual identity architecture for The Red Studios, constructed on golden ratio circular geometry, negative-space aperture blades, and bold editorial lockups.",
      deliverables: ["Aperture Blade Geometry", "Negative Space Logo Suite", "Motion Identity Guidelines", "Social Media Grid Matrix"],
      dimensions: "Infinite Vector Scalability",
      typography: "Syne Bold & Inter Editorial",
      paletteHex: ["#C8102E", "#1E0F10", "#FFFAF2", "#C99A2E"],
      previewAccent: "from-[#C8102E]/20 via-[#F6EFE4] to-[#FFFAF2]",
    },
    {
      id: "chiron-lab",
      title: "Chiron: Telemetry & Lab Instrument UI",
      category: "HARDWARE INTERFACE DESIGN",
      discipline: "UI/UX",
      summary: "Touchscreen interface for embedded electronic bench instruments. Optimized for low-latency oscilloscope graphing, rapid gesture zooming, and high-ambient legibility.",
      deliverables: ["7-Inch Touchscreen Layout", "Vector Gauge Widgets", "Sub-Millisecond Graphing Specs", "Dark Room Contrast Themes"],
      dimensions: "1024 x 600 Industrial Capacitive Panel",
      typography: "JetBrains Mono & Geist",
      paletteHex: ["#00A3C4", "#050807", "#00FF9C", "#FFC900"],
      previewAccent: "from-[#00A3C4]/20 via-[#0A1210]/10 to-[#FFFAF2]",
    },
    {
      id: "luminescence-stage",
      title: "Luminescence: Spatial Exhibition Stage",
      category: "SET DESIGN & INSTALLATION",
      discipline: "Spatial",
      summary: "Physical spatial curation featuring raw unbleached linen drapes, floating acrylic prisms, and calibrated crimson light bars that cast architectural shadow patterns.",
      deliverables: ["3D Spatial Blueprint", "Lighting Plot Schematics", "Material & Textile Curation", "Acoustic Baffle Placement"],
      dimensions: "12m x 8m Gallery Pavilion",
      typography: "Custom Geometric Monogram",
      paletteHex: ["#C8102E", "#C99A2E", "#F6EFE4", "#1E0F10"],
      previewAccent: "from-[#C99A2E]/20 via-[#C8102E]/15 to-[#FFFAF2]",
    },
  ];

  const categories = ["All", "Branding", "Editorial", "UI/UX", "Spatial"];
  const filtered =
    filter === "All"
      ? designItems
      : designItems.filter((item) => item.discipline === filter);

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
        <div className="relative mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <ScrollReveal direction="down" className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFAF2] border border-[#00A3C4]/40 rounded-full text-xs text-[#00A3C4] mb-6">
              <Palette className="w-3.5 h-3.5" />
              <span>THE CYAN DIVISION // BRANDING, EDITORIAL &amp; INTERFACES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1E0F10] mb-4">
              CYAN DESIGN <br />
              <span className="text-[#00A3C4] italic">PORTFOLIO</span> &amp; SYSTEMS.
            </h1>
            <p className="text-[#7A6A62] text-base md:text-lg leading-relaxed">
              The visual architecture branch of The Red Studios. Uniting Swiss typographic discipline,
              bespoke vector identity systems, and tactile print monographs.
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

        {/* DISCIPLINE FILTER TABS */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-[#E5D5C2] mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 select-none ${
                filter === cat
                  ? "bg-[#00A3C4] text-[#FFFAF2] shadow-sm"
                  : "bg-[#FFFAF2] text-[#7A6A62] hover:text-[#1E0F10] border border-[#E5D5C2]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MASONRY / ASYMMETRIC GRID LAYOUT */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <StaggerItem key={item.id}>
              <div
                onClick={() => setSelectedDesign(item)}
                className="cursor-pointer bg-[#FFFAF2] border border-[#E5D5C2] hover:border-[#00A3C4] rounded-3xl p-7 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Decorative Swatch Header */}
                  <div
                    className={`w-full h-32 rounded-2xl mb-6 bg-gradient-to-tr ${item.previewAccent} border border-[#E5D5C2]/60 p-4 flex flex-col justify-between`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#00A3C4] bg-[#FFFAF2] px-2.5 py-0.5 rounded-full border border-[#00A3C4]/30 shadow-xs">
                        {item.discipline}
                      </span>
                      {/* Color Palette Swatch Dots */}
                      <div className="flex items-center gap-1.5">
                        {item.paletteHex.map((hex, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 rounded-full border border-black/10 shadow-xs"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-[#7A6A62]">
                      {item.typography}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="text-[10px] font-semibold text-[#00A3C4] uppercase tracking-wider mb-1">
                    {item.category}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-[#1E0F10] mb-3 group-hover:text-[#00A3C4] transition-colors">
                    {item.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-xs text-[#7A6A62] leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                <div>
                  {/* Deliverable Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E5D5C2] mb-4">
                    {item.deliverables.slice(0, 3).map((d) => (
                      <span
                        key={d}
                        className="text-[10px] text-[#7A6A62] bg-[#F6EFE4] px-2 py-0.5 rounded-md border border-[#E5D5C2]"
                      >
                        {d}
                      </span>
                    ))}
                    {item.deliverables.length > 3 && (
                      <span className="text-[10px] text-[#00A3C4] font-medium px-1.5 py-0.5">
                        +{item.deliverables.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Link */}
                  <div className="flex items-center justify-between text-xs text-[#00A3C4] font-semibold pt-1">
                    <span>Inspect Design Brief</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* DESIGN SPECIFICATION MODAL */}
      <AnimatePresence>
        {selectedDesign && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#050304]/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#FFFAF2] text-[#1E0F10] border-2 border-[#00A3C4] p-7 md:p-9 rounded-3xl shadow-[0_20px_70px_rgba(0,163,196,0.25)] max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedDesign(null)}
                aria-label="Close design modal"
                className="absolute top-6 right-6 p-2 text-[#7A6A62] hover:text-[#00A3C4] border border-[#E5D5C2] hover:border-[#00A3C4] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-[10px] font-semibold text-[#00A3C4] tracking-widest uppercase mb-1">
                CYAN DESIGN BRIEF // {selectedDesign.discipline}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1E0F10] mb-6">
                {selectedDesign.title}
              </h3>

              <div className="space-y-5">
                <div className="p-5 bg-[#F6EFE4] rounded-2xl border border-[#E5D5C2]">
                  <div className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layout className="w-3.5 h-3.5" />
                    <span>OVERVIEW &amp; DESIGN INTENT</span>
                  </div>
                  <p className="text-xs md:text-sm text-[#7A6A62] leading-relaxed">
                    {selectedDesign.summary}
                  </p>
                </div>

                <div className="p-5 bg-[#F6EFE4] rounded-2xl border border-[#E5D5C2]">
                  <div className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>DELIVERABLE ARTIFACTS</span>
                  </div>
                  <ul className="space-y-1.5">
                    {selectedDesign.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#1E0F10]">
                        <span className="text-[#00A3C4]">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#F6EFE4] rounded-2xl border border-[#E5D5C2]">
                    <div className="text-[10px] font-semibold text-[#C99A2E] uppercase mb-1">
                      SPECIFICATIONS / CANVAS
                    </div>
                    <p className="text-xs text-[#1E0F10] font-medium">
                      {selectedDesign.dimensions}
                    </p>
                  </div>
                  <div className="p-4 bg-[#F6EFE4] rounded-2xl border border-[#E5D5C2]">
                    <div className="text-[10px] font-semibold text-[#00A3C4] uppercase mb-1">
                      PRIMARY TYPOGRAPHY
                    </div>
                    <p className="text-xs text-[#1E0F10] font-medium">
                      {selectedDesign.typography}
                    </p>
                  </div>
                </div>

                {/* Color Taxonomy */}
                <div className="p-4 bg-[#F6EFE4] rounded-2xl border border-[#E5D5C2]">
                  <div className="text-[10px] font-semibold text-[#7A6A62] uppercase mb-2">
                    COLOR TAXONOMY SWATCHES
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedDesign.paletteHex.map((hex, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full border border-black/15 shadow-xs"
                          style={{ backgroundColor: hex }}
                        />
                        <span className="text-[10px] font-mono text-[#7A6A62]">{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E5D5C2] flex items-center justify-between">
                <span className="text-xs text-[#7A6A62]">
                  Designed by The Cyan Division
                </span>
                <button
                  onClick={() => setSelectedDesign(null)}
                  className="px-5 py-2 bg-[#00A3C4] text-xs font-semibold text-[#FFFAF2] hover:bg-[#008CA8] rounded-full transition-colors"
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
