"use client";

import React from "react";
import Image from "next/image";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";
import { Palette, Clapperboard, HeartHandshake, CheckCircle2 } from "lucide-react";

export default function StudioAboutPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#F6EFE4] text-[#1E0F10] pb-32">
      {/* Subtle Paper-Grain Background Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 -z-10"
        style={{
          backgroundImage: "radial-gradient(rgba(58, 10, 16, 0.05) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 md:pt-16">
        {/* Top Breadcrumb & Center-Right Ambient Logo */}
        <div className="relative mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <ScrollReveal direction="down" className="max-w-2xl relative z-10">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1E0F10] mb-4">
              VISUAL POETRY &amp; <br />
              <span className="text-[#C8102E] italic">DUAL-SPECTRUM</span> DESIGN.
            </h1>
            <p className="text-[#7A6A62] text-base md:text-lg leading-relaxed">
              The creative agency of Chris Zeyon Pinto. Exploring the raw power of cinematic motion,
              editorial design architecture, and rooted community storytelling.
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

        {/* PHOTO & BIO BLOCK WITH ANCHORED SOFT WARM GLOW */}
        <div className="relative mb-20">
          {/* Soft Warm Glow Anchored ONLY behind photo/bio block */}
          <div
            className="absolute -inset-8 pointer-events-none -z-10 rounded-3xl opacity-80 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 60% 40%, rgba(200, 16, 46, 0.16) 0%, rgba(201, 154, 46, 0.12) 45%, transparent 70%)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end p-8 md:p-12 pb-0 md:pb-0 bg-[#FFFAF2] border border-[#E5D5C2] rounded-3xl shadow-[0_20px_60px_rgba(58,10,16,0.08)]">
            {/* LEFT: Portrait Shot Grounded at Card Base */}
            <div className="lg:col-span-5 flex justify-center self-end">
              <div className="relative w-full max-w-sm aspect-[2/3] pointer-events-none select-none">
                <Image
                  src="/assets/studio/studio-portrait-mandala.png"
                  alt="Chris — The Red Studios"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  priority
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            {/* RIGHT: Biographical Narrative */}
            <div className="lg:col-span-7 space-y-5 pb-8 md:pb-12">
              <div className="text-xs tracking-widest text-[#C99A2E] font-semibold uppercase">
                {"// CREATIVE PRODUCER PROFILE"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E0F10] leading-snug">
                Chris Zeyon Pinto
              </h2>
              <div className="text-xs text-[#C8102E] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
                <span>FOUNDER &amp; VISUAL DIRECTOR — THE RED STUDIOS</span>
              </div>
              <p className="text-sm md:text-base text-[#7A6A62] leading-relaxed">
                The Red Studios was founded on a simple conviction: visual media must linger long after
                the screen turns off. Blending the discipline of electrical engineering with the sensitivity
                of fine art, my work spans narrative cinematography, precision color grading, and editorial brand systems.
              </p>
              <p className="text-sm md:text-base text-[#7A6A62] leading-relaxed">
                Much of my visual foundation was forged in real-world communal documentation as the
                <strong className="text-[#1E0F10] font-semibold"> Media Lead for ICYM Kokkada Parish</strong>.
                Capturing multi-day festivals, youth congresses, and sacred liturgical celebrations taught me
                how to read natural lighting in unscripted environments and preserve human emotion with authenticity.
              </p>

              <div className="pt-3 flex flex-wrap gap-4 text-xs text-[#7A6A62]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>Cinematic Direction</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00A3C4]" />
                  <span>CYAN Design Systems</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A2E]" />
                  <span>ICYM Kokkada Media</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RED + CYAN DIVISION BREAKDOWN */}
        <ScrollReveal direction="up">
          <div className="border-b border-[#E5D5C2] pb-4 mb-8 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold text-[#C8102E] tracking-widest uppercase">
                {"// CREATIVE TAXONOMY"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1E0F10] mt-1">
                THE RED + CYAN DIVISIONS
              </h2>
            </div>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* RED DIVISION */}
          <StaggerItem>
            <div className="p-8 bg-[#FFFAF2] border-2 border-[#C8102E]/30 rounded-3xl hover:border-[#C8102E] transition-all duration-300 shadow-md h-full flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#C8102E]/10 flex items-center justify-center text-[#C8102E] mb-5 group-hover:bg-[#C8102E] group-hover:text-[#FFFAF2] transition-colors">
                  <Clapperboard className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-[#C8102E] mb-1 tracking-wider uppercase">
                  DIVISION 01 // MOTION &amp; FILM
                </div>
                <h3 className="text-2xl font-bold text-[#1E0F10] mb-3">THE RED DIVISION</h3>
                <p className="text-xs md:text-sm text-[#7A6A62] leading-relaxed mb-4">
                  The cinematic powerhouse. Focused exclusively on motion picture production, narrative commercials, music visuals, and mood-driven short films. Characterized by bold chiaroscuro lighting, custom analog film-emulation LUTs, and deliberate camera blocking.
                </p>
                <div className="space-y-1.5 pt-2">
                  <div className="text-xs text-[#1E0F10] font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                    Cinematography &amp; Camera Operating (Red / Sony FX)
                  </div>
                  <div className="text-xs text-[#1E0F10] font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                    Color Grading (DaVinci Resolve Color Science)
                  </div>
                  <div className="text-xs text-[#1E0F10] font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                    Atmospheric Sound Design &amp; Pacing
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E5D5C2] text-xs font-semibold text-[#C8102E]">
                CORE MEDIUM: 4K/8K RAW MOTION PICTURES
              </div>
            </div>
          </StaggerItem>

          {/* CYAN DIVISION */}
          <StaggerItem>
            <div className="p-8 bg-[#FFFAF2] border-2 border-[#00A3C4]/30 rounded-3xl hover:border-[#00A3C4] transition-all duration-300 shadow-md h-full flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#00A3C4]/10 flex items-center justify-center text-[#00A3C4] mb-5 group-hover:bg-[#00A3C4] group-hover:text-[#FFFAF2] transition-colors">
                  <Palette className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-[#00A3C4] mb-1 tracking-wider uppercase">
                  DIVISION 02 // DESIGN &amp; BRAND
                </div>
                <h3 className="text-2xl font-bold text-[#1E0F10] mb-3">THE CYAN DIVISION</h3>
                <p className="text-xs md:text-sm text-[#7A6A62] leading-relaxed mb-4">
                  The visual architecture branch. Dedicated to high-concept brand identities, editorial layout design, digital user interfaces, and bespoke vector iconography. Bringing engineering order and Swiss typographic discipline to creative brands.
                </p>
                <div className="space-y-1.5 pt-2">
                  <div className="text-xs text-[#1E0F10] font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3C4]" />
                    Comprehensive Brand Identity Architecture
                  </div>
                  <div className="text-xs text-[#1E0F10] font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3C4]" />
                    Editorial Print Publications &amp; Monograph Layouts
                  </div>
                  <div className="text-xs text-[#1E0F10] font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3C4]" />
                    Modern Digital Interfaces &amp; Design Systems
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E5D5C2] text-xs font-semibold text-[#00A3C4]">
                CORE MEDIUM: EDITORIAL, BRAND &amp; DIGITAL SYSTEMS
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* ICYM KOKKADA PARISH SPOTLIGHT */}
        <div className="p-8 md:p-10 bg-[#FFFAF2] border border-[#E5D5C2] rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F6EFE4] text-xs text-[#C99A2E] font-medium rounded-full">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>COMMUNITY CREDIBILITY &amp; CULTURAL HERITAGE</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1E0F10]">
                Media Director — ICYM Kokkada Parish
              </h3>
              <p className="text-xs md:text-sm text-[#7A6A62] leading-relaxed">
                Directing media coverage, multi-camera live switching, and visual documentation for church celebrations, regional youth festivals, and community archives. Grounding creative storytelling in real human devotion and community celebration.
              </p>
            </div>

            <div className="flex flex-col gap-2 min-w-[200px] text-xs text-[#1E0F10]">
              <div className="p-3 bg-[#F6EFE4] rounded-xl border border-[#E5D5C2]">
                <span className="text-[#C8102E] font-semibold block mb-0.5">ROLE:</span>
                Media Lead &amp; Documentarian
              </div>
              <div className="p-3 bg-[#F6EFE4] rounded-xl border border-[#E5D5C2]">
                <span className="text-[#C99A2E] font-semibold block mb-0.5">LOCATION:</span>
                Kokkada Parish, Karnataka
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
