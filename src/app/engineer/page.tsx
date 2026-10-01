"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CursorReveal } from "@/components/effects/CursorReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SocialIconRow } from "@/components/ui/SocialIconRow";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";
import { socials } from "@/lib/socials";
import { Terminal, Cpu, ArrowUpRight, ShieldCheck, Layers, ChevronDown } from "lucide-react";

export default function EngineerHomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050807] text-[#E8F5EF]">
      {/* FULL-VIEWPORT HERO SECTION */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between pt-4 pb-16 px-6 max-w-7xl mx-auto z-10">
        {/* HERO BACKGROUND: Responsive Desktop / Mobile Asset with Faded Edges */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
          style={{
            maskImage:
              "radial-gradient(ellipse 52% 48% at 50% 50%, #000 20%, rgba(0, 0, 0, 0.85) 45%, rgba(0, 0, 0, 0.25) 70%, transparent 92%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 52% 48% at 50% 50%, #000 20%, rgba(0, 0, 0, 0.85) 45%, rgba(0, 0, 0, 0.25) 70%, transparent 92%)",
          }}
        >
          <picture className="w-full h-full block opacity-30 mix-blend-screen">
            <source media="(max-width: 767px)" srcSet="/assets/engineer/engineer-bg-mobile.png" />
            <Image
              src="/assets/engineer/engineer-bg.png"
              alt="Engineer Cybernetic Background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
          </picture>
          <div className="absolute inset-0 bg-tech-grid opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050807] via-transparent to-[#050807]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050807] via-transparent to-[#050807]" />
        </div>

        {/* HERO MAIN CONTENT GRID */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2 md:pt-6">
          {/* LEFT COLUMN: Technical Narrative, CTAs & Socials */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <ScrollReveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A1210] border border-[#12261F] text-xs font-mono text-[#00FF9C]">
                <Terminal className="w-3.5 h-3.5" />
                <span>ECE HARDWARE ARCHITECT &amp; EMBEDDED DEVELOPER</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#E8F5EF] leading-[1.04]">
                PRECISION <br />
                <span className="text-[#00FF9C] drop-shadow-[0_0_25px_rgba(0,255,156,0.35)]">
                  HARDWARE
                </span>{" "}
                &amp; CIRCUITS.
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-[#7C9A8E] text-base md:text-lg max-w-xl leading-relaxed">
                Designing at the intersection of electrical engineering, high-speed PCB layout,
                and low-level firmware. Dedicated to robust physical architectures and flawless
                signal integrity.
              </p>
            </ScrollReveal>

            {/* PRIMARY CTA & WHATSAPP COMM BUTTONS */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton
                  variant="primary"
                  onClick={() => router.push("/engineer/works")}
                >
                  VIEW MY WORK
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </MagneticButton>

                <MagneticButton
                  variant="secondary"
                  onClick={() => {
                    window.open(socials.shared.whatsapp, "_blank");
                  }}
                >
                  WHATSAPP COMM
                  <ArrowUpRight className="w-4 h-4 ml-1 text-[#FFC900]" />
                </MagneticButton>
              </div>
            </ScrollReveal>

            {/* SOCIAL ICON ROW WITH HOVER GLOW IN --ACCENT */}
            <ScrollReveal direction="up" delay={0.5}>
              <div className="pt-4 border-t border-[#12261F] flex items-center gap-4">
                <span className="text-xs font-mono text-[#7C9A8E] uppercase tracking-wider hidden sm:inline">
                  COMMUNICATION CHANNELS:
                </span>
                <SocialIconRow mode="engineer" />
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: PORTRAIT CUTOUT WITH CURSOR-REVEAL X-RAY */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <ScrollReveal direction="left" delay={0.25} className="w-full max-w-sm sm:max-w-md">
              <div className="relative group">
                {/* Soft Engineer Ambient Glow Halo */}
                <div className="absolute -inset-6 bg-gradient-to-tr from-[#00FF9C]/20 via-[#00FF9C]/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

                {/* CURSOR REVEAL PORTRAIT EXHIBITION (Seamless Floating Cutout) */}
                <div
                  className="relative w-full aspect-[4/5] overflow-hidden"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black 80%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 80%, transparent 100%)",
                  }}
                >
                  <CursorReveal
                    radius={80}
                    className="w-full h-full translate-y-8 md:translate-y-10"
                  />
                </div>

                {/* Mobile / Desktop Inspection Cue */}
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#7C9A8E]">
                  <span>HOVER / TOUCH PORTRAIT TO INSPECT CIRCUITS</span>
                  <span className="text-[#00FF9C]">MASK: 80PX</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="pt-8 flex justify-center">
          <a
            href="#domains"
            className="flex flex-col items-center gap-1 text-[11px] font-mono text-[#7C9A8E] hover:text-[#00FF9C] transition-colors"
          >
            <span>SCROLL TO EXPLORE MATRIX</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#00FF9C]" />
          </a>
        </div>
      </section>

      {/* FEATURED TECHNICAL DOMAINS */}
      <section id="domains" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-[#12261F]">
        <ScrollReveal direction="up">
          <div className="border-b border-[#12261F] pb-4 mb-8 flex items-end justify-between">
            <div>
              <span className="text-xs font-mono text-[#00FF9C] tracking-widest uppercase">
                {"// CAPABILITIES MATRIX"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#E8F5EF] mt-1">
                ENGINEERING DOMAINS
              </h2>
            </div>
            <span className="text-xs font-mono text-[#7C9A8E] hidden sm:block">
              SEC_01 // SYSTEM SPECIFICATION
            </span>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaggerItem>
            <div className="p-6 bg-[#0A1210] border border-[#12261F] hover:border-[#00FF9C]/60 transition-all duration-300 group">
              <div className="w-10 h-10 bg-[#12261F] flex items-center justify-center text-[#00FF9C] mb-4 group-hover:bg-[#00FF9C] group-hover:text-[#050807] transition-colors">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-[#00FF9C] mb-1">01 / HARDWARE</div>
              <h3 className="text-lg font-bold text-[#E8F5EF] mb-2">Circuit Design & Analysis</h3>
              <p className="text-xs text-[#7C9A8E] leading-relaxed">
                Multi-layer impedance matched high-speed routing, thermal dissipation and precision fabric ation standards.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-6 bg-[#0A1210] border border-[#12261F] hover:border-[#00FF9C]/60 transition-all duration-300 group">
              <div className="w-10 h-10 bg-[#12261F] flex items-center justify-center text-[#00FF9C] mb-4 group-hover:bg-[#00FF9C] group-hover:text-[#050807] transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-[#00FF9C] mb-1">02 / FIRMWARE</div>
              <h3 className="text-lg font-bold text-[#E8F5EF] mb-2">Embedded Systems, Protocols, IDE</h3>
              <p className="text-xs text-[#7C9A8E] leading-relaxed">
                Bare-metal C/C++, ARM Cortex microcontrollers, low-power state transitions, bus protocols (SPI, I2C, CAN, UART), and driver design.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-6 bg-[#0A1210] border border-[#12261F] hover:border-[#00FF9C]/60 transition-all duration-300 group">
              <div className="w-10 h-10 bg-[#12261F] flex items-center justify-center text-[#00FF9C] mb-4 group-hover:bg-[#00FF9C] group-hover:text-[#050807] transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-[#00FF9C] mb-1">03 / PROTOTYPING</div>
              <h3 className="text-lg font-bold text-[#E8F5EF] mb-2">Testing, Analysis &amp; Diagnostic</h3>
              <p className="text-xs text-[#7C9A8E] leading-relaxed">
                Oscilloscope signal debugging, logic analyzers, bench power analysis, and rapid turn-around physical prototype validation.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>
    </main>
  );
}
