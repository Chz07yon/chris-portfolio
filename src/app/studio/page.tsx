"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CursorReveal } from "@/components/effects/CursorReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SocialIconRow } from "@/components/ui/SocialIconRow";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";
import { socials } from "@/lib/socials";
import { Camera, ArrowUpRight, Palette, Clapperboard, Compass, ChevronDown } from "lucide-react";

export default function StudioHomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#F6EFE4] text-[#1E0F10]">
      {/* FULL-VIEWPORT HERO SECTION */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between pt-4 pb-16 px-6 max-w-7xl mx-auto z-10">
        {/* HERO BACKGROUND: Responsive Desktop / Mobile Asset */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <picture className="w-full h-full block opacity-25 mix-blend-multiply">
            <source media="(max-width: 767px)" srcSet="/assets/studio/studio-bg-mobile.png" />
            <Image
              src="/assets/studio/studio-bg.png"
              alt="The Red Studios Ambient Background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-[#F6EFE4]/30 via-transparent to-[#F6EFE4]" />
        </div>

        {/* HERO MAIN CONTENT GRID */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2 md:pt-6">
          {/* LEFT COLUMN: Editorial Narrative, CTAs & Socials */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <ScrollReveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFAF2] border border-[#E5D5C2] rounded-full text-xs text-[#C8102E]">
                <Camera className="w-3.5 h-3.5" />
                <span>VISUAL STORYTELLER &amp; CREATIVE PRODUCER</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1E0F10] leading-[1.06]">
                POETRY IN <br />
                <span className="text-[#C8102E] italic">MOTION</span> &amp;{" "}
                <span className="text-[#C99A2E]">LIGHT.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-[#7A6A62] text-base md:text-lg max-w-xl leading-relaxed">
                Curating high-impact visual media, brand narratives, and cinematic production.
                From intimate portraiture to grand conceptual direction, crafting pieces that linger.
              </p>
            </ScrollReveal>

            {/* PRIMARY CTA & WHATSAPP BUTTONS */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton
                  variant="primary"
                  onClick={() => {
                    window.location.href = `mailto:${socials.studio.email}`;
                  }}
                >
                  {"LET'S CREATE TOGETHER"}
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </MagneticButton>

                <MagneticButton
                  variant="secondary"
                  onClick={() => router.push("/studio/works")}
                >
                  EXPLORE PRODUCTIONS
                  <ArrowUpRight className="w-4 h-4 ml-1 text-[#C99A2E]" />
                </MagneticButton>
              </div>
            </ScrollReveal>

            {/* SOCIAL ICON ROW WITH HOVER GLOW IN --ACCENT */}
            <ScrollReveal direction="up" delay={0.5}>
              <div className="pt-4 border-t border-[#E5D5C2] flex items-center gap-4">
                <span className="text-xs text-[#7A6A62] uppercase tracking-wider font-medium hidden sm:inline">
                  STUDIO CHANNELS:
                </span>
                <SocialIconRow mode="studio" />
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: PORTRAIT CUTOUT WITH SACRED MANDALA REVEAL */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <ScrollReveal direction="left" delay={0.25} className="w-full max-w-sm sm:max-w-md">
              <div className="relative group">
                {/* Soft Studio Ambient Glow Halo */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#C8102E]/20 to-[#C99A2E]/25 rounded-3xl blur-2xl -z-10" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-40 px-3 py-1 bg-[#FFFAF2]/90 border border-[#E5D5C2] rounded-full text-[10px] text-[#C8102E] font-medium shadow-sm">
                  SACRED REVEAL: HOVER OR TOUCH
                </div>

                {/* CURSOR REVEAL PORTRAIT EXHIBITION (Vertical Anchor) */}
                <div className="w-full aspect-[4/5] bg-[#FFFAF2] border border-[#E5D5C2] rounded-2xl overflow-hidden shadow-2xl">
                  <CursorReveal
                    radius={135}
                    className="w-full h-full"
                  />
                </div>

                {/* Mobile / Desktop Inspection Cue */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-[#7A6A62]">
                  <span>TAP &amp; DRAG TO UNVEIL INNER MANDALA</span>
                  <span className="text-[#C8102E] font-medium">STUDIO CURSOR ACTIVE</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="pt-8 flex justify-center">
          <a
            href="#craft"
            className="flex flex-col items-center gap-1 text-[11px] text-[#7A6A62] hover:text-[#C8102E] transition-colors"
          >
            <span>SCROLL TO EXPLORE CRAFT</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#C8102E]" />
          </a>
        </div>
      </section>

      {/* CREATIVE PILLARS */}
      <section id="craft" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-[#E5D5C2]">
        <ScrollReveal direction="up">
          <div className="border-b border-[#E5D5C2] pb-4 mb-8 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold text-[#C8102E] tracking-widest uppercase">
                {"// CREATIVE DISCIPLINES"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1E0F10] mt-1">
                STUDIO CRAFT
              </h2>
            </div>
            <span className="text-xs text-[#7A6A62] hidden sm:block">
              SERIES 02 // CREATIVE PRACTICE
            </span>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaggerItem>
            <div className="p-7 bg-[#FFFAF2] border border-[#E5D5C2] rounded-2xl hover:border-[#C8102E]/50 hover:shadow-lg transition-all duration-300 group">
              <div className="w-11 h-11 rounded-full bg-[#F6EFE4] flex items-center justify-center text-[#C8102E] mb-5 group-hover:bg-[#C8102E] group-hover:text-[#FFFAF2] transition-colors">
                <Clapperboard className="w-5 h-5" />
              </div>
              <div className="text-xs text-[#C8102E] font-semibold mb-1">01 / PRODUCTION</div>
              <h3 className="text-lg font-bold text-[#1E0F10] mb-2">Cinematography &amp; Video</h3>
              <p className="text-xs text-[#7A6A62] leading-relaxed">
                Color grading, lighting design, narrative pacing, and camera movements crafted to evoke emotion and elevate identity.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-7 bg-[#FFFAF2] border border-[#E5D5C2] rounded-2xl hover:border-[#C8102E]/50 hover:shadow-lg transition-all duration-300 group">
              <div className="w-11 h-11 rounded-full bg-[#F6EFE4] flex items-center justify-center text-[#C8102E] mb-5 group-hover:bg-[#C8102E] group-hover:text-[#FFFAF2] transition-colors">
                <Palette className="w-5 h-5" />
              </div>
              <div className="text-xs text-[#C8102E] font-semibold mb-1">02 / VISUAL IDENTITY</div>
              <h3 className="text-lg font-bold text-[#1E0F10] mb-2">Editorial &amp; Brand Systems</h3>
              <p className="text-xs text-[#7A6A62] leading-relaxed">
                Curating brand aesthetics, typography hierarchies, campaign art direction, and spatial visual experiences.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-7 bg-[#FFFAF2] border border-[#E5D5C2] rounded-2xl hover:border-[#C8102E]/50 hover:shadow-lg transition-all duration-300 group">
              <div className="w-11 h-11 rounded-full bg-[#F6EFE4] flex items-center justify-center text-[#C8102E] mb-5 group-hover:bg-[#C8102E] group-hover:text-[#FFFAF2] transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-xs text-[#C8102E] font-semibold mb-1">03 / DIRECTION</div>
              <h3 className="text-lg font-bold text-[#1E0F10] mb-2">Spatial &amp; Set Curation</h3>
              <p className="text-xs text-[#7A6A62] leading-relaxed">
                Transforming physical environments into mood-evoking stages, marrying natural illumination with tailored prop staging.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>
    </main>
  );
}
