"use client";

import React from "react";
import Image from "next/image";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";
import { Cpu, Terminal, Sparkles, HeartHandshake, CheckCircle2 } from "lucide-react";

export default function EngineerAboutPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050807] text-[#E8F5EF] pb-32">
      {/* Subtle Uniform Inner-Page Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-[0.08] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 md:pt-16">
        {/* TOP STATUS BREADCRUMB */}
        <ScrollReveal direction="down">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A1210] border border-[#12261F] text-xs font-mono text-[#00FF9C] mb-6">
            <Terminal className="w-3.5 h-3.5" />
            <span>SYS_ID: CHRIS // ARCHITECTURE &amp; THREE-LANE IDENTITY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#E8F5EF] mb-4">
            BEYOND THE <br />
            <span className="text-[#00FF9C] drop-shadow-[0_0_20px_rgba(0,255,156,0.35)]">
              CIRCUIT BOARD.
            </span>
          </h1>
          <p className="text-[#7C9A8E] text-base md:text-lg max-w-2xl leading-relaxed mb-12">
            A relentless pursuit of technical precision, cinematic craft, and rooted human service.
          </p>
        </ScrollReveal>

        {/* PHOTO & BIO BLOCK WITH ANCHORED SOFT GREEN GLOW */}
        <div className="relative mb-20">
          {/* Soft Green Glow Anchored ONLY behind photo/bio block */}
          <div
            className="absolute -inset-8 pointer-events-none -z-10 rounded-3xl opacity-75 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 60% 40%, rgba(0, 255, 156, 0.18) 0%, rgba(0, 201, 122, 0.08) 45%, transparent 70%)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 md:p-12 bg-[#0A1210]/80 border border-[#12261F] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            {/* LEFT: Portrait Shot */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs aspect-[4/5] bg-[#050807] border border-[#12261F] overflow-hidden group">
                {/* Reticle Marks */}
                <div className="absolute top-2 left-2 z-20 text-[9px] font-mono text-[#00FF9C] bg-[#050807]/90 px-1.5 py-0.5 border border-[#12261F]">
                  ID: CHRIS_07
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#00FF9C]" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#00FF9C]" />

                <Image
                  src="/assets/engineer/engineer-portrait.png"
                  alt="Chris — Engineer & Creative Director"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  priority
                  className="object-contain object-bottom filter contrast-110 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* RIGHT: Biographical Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs font-mono text-[#FFC900] tracking-widest uppercase">
                {"// SYSTEM OPERATOR PROFILE"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#E8F5EF] leading-snug">
                Chris Zeyon Pinto
              </h2>
              <div className="text-xs font-mono text-[#00FF9C] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00FF9C]" />
                <span>ELECTRONICS &amp; COMMUNICATION ENGINEERING @ VVCE</span>
              </div>
              <p className="text-sm md:text-base text-[#7C9A8E] leading-relaxed">
                Trained in the demanding discipline of Electronics and Communication Engineering, I build
                physical computing systems where hardware constraints meet deterministic firmware execution.
                Whether routing impedance-controlled microstrips in Altium or developing low-power RTOS kernels,
                my work prioritizes signal fidelity, thermal endurance, and physical robustness.
              </p>
              <p className="text-sm md:text-base text-[#7C9A8E] leading-relaxed">
                However, engineering does not exist in isolation. My worldview is defined by three interconnected
                pillars: the analytical rigor of engineering, the cinematic aesthetic of The Red Studios, and
                the communal responsibility cultivated through years of parish and community leadership.
              </p>

              <div className="pt-3 flex flex-wrap gap-4 text-xs font-mono text-[#7C9A8E]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF9C]" />
                  <span>Hardware &amp; RTOS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF9C]" />
                  <span>Creative Producer</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF9C]" />
                  <span>Parish Leadership</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* THREE-LANE IDENTITY SECTION */}
        <ScrollReveal direction="up">
          <div className="border-b border-[#12261F] pb-4 mb-8 flex items-end justify-between">
            <div>
              <span className="text-xs font-mono text-[#00FF9C] tracking-widest uppercase">
                {"// MULTIDISCIPLINARY FRAMEWORK"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#E8F5EF] mt-1">
                THE THREE-LANE IDENTITY
              </h2>
            </div>
            <span className="text-xs font-mono text-[#7C9A8E] hidden sm:block">
              TRI-PILLAR SYNCHRONIZATION
            </span>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LANE 1: ENGINEERING */}
          <StaggerItem>
            <div className="p-7 bg-[#0A1210] border border-[#12261F] hover:border-[#00FF9C] transition-all duration-300 h-full flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-[#12261F] flex items-center justify-center text-[#00FF9C] mb-5 group-hover:bg-[#00FF9C] group-hover:text-[#050807] transition-colors">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-[#00FF9C] mb-1">LANE 01 // THE ENGINE</div>
                <h3 className="text-xl font-bold text-[#E8F5EF] mb-3">Hardware &amp; ECE Systems</h3>
                <p className="text-xs text-[#7C9A8E] leading-relaxed mb-4">
                  The intellectual foundation. Designing high-speed PCB layouts, embedded firmware, sensor interfaces, and power telemetry. Grounded in mathematical precision, signal integrity, and the physical reality of circuits.
                </p>
              </div>
              <div className="pt-4 border-t border-[#12261F] text-[11px] font-mono text-[#00FF9C]">
                FOCUS: STM32 / ALTIUM / RTOS / IOT
              </div>
            </div>
          </StaggerItem>

          {/* LANE 2: THE RED STUDIOS */}
          <StaggerItem>
            <div className="p-7 bg-[#0A1210] border border-[#12261F] hover:border-[#FFC900] transition-all duration-300 h-full flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-[#12261F] flex items-center justify-center text-[#FFC900] mb-5 group-hover:bg-[#FFC900] group-hover:text-[#050807] transition-colors">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-[#FFC900] mb-1">LANE 02 // THE EYE</div>
                <h3 className="text-xl font-bold text-[#E8F5EF] mb-3">The Red Studios</h3>
                <p className="text-xs text-[#7C9A8E] leading-relaxed mb-4">
                  The creative aesthetic. Directing cinematic video productions, fine-art lighting, color grading, and editorial brand systems. Bringing emotive visual poetry and storytelling to technical complexity.
                </p>
              </div>
              <div className="pt-4 border-t border-[#12261F] text-[11px] font-mono text-[#FFC900]">
                FOCUS: CINEMATOGRAPHY / COLOR / ART
              </div>
            </div>
          </StaggerItem>

          {/* LANE 3: PARISH & COMMUNITY */}
          <StaggerItem>
            <div className="p-7 bg-[#0A1210] border border-[#12261F] hover:border-[#00FF9C] transition-all duration-300 h-full flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-[#12261F] flex items-center justify-center text-[#00FF9C] mb-5 group-hover:bg-[#00FF9C] group-hover:text-[#050807] transition-colors">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-[#00FF9C] mb-1">LANE 03 // THE ANCHOR</div>
                <h3 className="text-xl font-bold text-[#E8F5EF] mb-3">Parish &amp; Community</h3>
                <p className="text-xs text-[#7C9A8E] leading-relaxed mb-4">
                  The moral compass. Active involvement in church parish management, youth leadership, organizing large-scale regional events, and technical audio-visual operations. Keeping technology tethered to human empathy.
                </p>
              </div>
              <div className="pt-4 border-t border-[#12261F] text-[11px] font-mono text-[#00FF9C]">
                FOCUS: LEADERSHIP / MENTORSHIP / AV
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </main>
  );
}
