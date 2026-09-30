"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Terminal, ArrowUpRight, X, Cpu, Layers, ExternalLink, Activity, CheckCircle2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  problem: string;
  category: string;
  stack: string[];
  liveUrl: string;
  thumbnailBadge: string;
  modal: {
    problemStatement: string;
    buildDescription: string;
    stackDetails: string[];
    outcomeMetrics: string;
  };
}

export default function EngineerWorksPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "sdm-hub",
      title: "SDM Telemetry Hub",
      category: "EMBEDDED HARDWARE & LORAWAN",
      problem: "Real-time remote telemetry transmission in zero-cellular environments with strict 30mW power budget.",
      stack: ["STM32F4", "LoRa SX1278", "FreeRTOS", "Altium", "CAN 2.0B"],
      liveUrl: "https://github.com/Chz07yon",
      thumbnailBadge: "STM32 / RF",
      modal: {
        problemStatement:
          "In remote agricultural and industrial sensor deployments, cellular signals are completely absent while sensor telemetry must be continuously streamed without human intervention.",
        buildDescription:
          "Engineered a custom 4-layer PCB integrating an STM32F4 microcontroller, an SX1278 LoRa transceiver, and a solar MPPT battery management system. Authored preemptive FreeRTOS tasks to duty-cycle peripherals, driving sleep current down to 24 microamps.",
        stackDetails: [
          "Microcontroller: STM32F411CEU6 (ARM Cortex-M4)",
          "RF Protocol: LoRaWAN 868MHz point-to-point mesh",
          "RTOS: FreeRTOS with DMA circular buffers",
          "PCB CAD: Altium Designer 4-layer with dedicated ground planes",
        ],
        outcomeMetrics:
          "Demonstrated 4.8 km line-of-sight packet transmission at 99.4% reliability on single solar battery charge. Awarded 1st Place at SDM Engineering Hackathon.",
      },
    },
    {
      id: "vvce-connect",
      title: "VVCE Connect Portal",
      category: "INSTITUTIONAL ARCHITECTURE",
      problem: "Fragmented department communications, delayed academic notices, and resource bottlenecks across 4,200+ students.",
      stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis"],
      liveUrl: "https://github.com/Chz07yon",
      thumbnailBadge: "CAMPUS ARCH",
      modal: {
        problemStatement:
          "University departments operated on manual notice boards, fragmented chat groups, and unindexed circulars, resulting in widespread missed deadlines and administrative overload.",
        buildDescription:
          "Architected a unified responsive web platform featuring real-time websocket announcements, student attendance/grade telemetry, departmental circular feeds, and role-based cryptographic access tokens.",
        stackDetails: [
          "Frontend: Next.js App Router, TypeScript, Tailwind CSS",
          "Backend: Node.js microservices, Prisma ORM, Redis Pub/Sub",
          "Database: PostgreSQL with connection pooling",
          "Security: JWT with HTTP-only cookies and granular RBAC",
        ],
        outcomeMetrics:
          "Adopted campus-wide, reducing department announcement propagation time from 48 hours to under 2 seconds, serving 4,200+ active users daily.",
      },
    },
    {
      id: "rdx-engine",
      title: "RDX 3.0 Media Engine",
      category: "DESKTOP MEDIA PIPELINE",
      problem: "High-resolution RAW cinematic asset ingestion, proxy transcoding, and real-time review without cloud upload latency.",
      stack: ["Electron", "Node.js", "FFmpeg", "DaVinci API", "WebSockets"],
      liveUrl: "https://github.com/Chz07yon",
      thumbnailBadge: "MEDIA / NVENC",
      modal: {
        problemStatement:
          "On-set film production workflows with 4K/8K RAW media suffer from multi-hour proxy transcoding delays, stalling editorial review and client feedback.",
        buildDescription:
          "Created a native desktop application that monitors SD/CFast media slots, invokes parallel hardware-accelerated NVENC FFmpeg pipelines for instant proxy creation, and broadcasts streams over local WiFi to iPads.",
        stackDetails: [
          "Framework: Electron with TypeScript",
          "Video Engine: Custom FFmpeg build with CUDA/NVENC acceleration",
          "Integration: DaVinci Resolve Studio scripting API",
          "Networking: Bonjour auto-discovery and local WebSocket streaming",
        ],
        outcomeMetrics:
          "Accelerated post-production turn-around times by 65%, processing over 12TB of RAW footage with zero frame drops.",
      },
    },
    {
      id: "high-speed-daq",
      title: "High-Speed Impedance DAQ",
      category: "ANALOG & DIGITAL HARDWARE",
      problem: "Capturing high-frequency analog signals without ground bounce, crosstalk, or phase jitter in prototype hardware.",
      stack: ["14-bit ADC", "Altium", "Differential Stripline", "Op-Amp Buffers"],
      liveUrl: "https://github.com/Chz07yon",
      thumbnailBadge: "100MSPS ADC",
      modal: {
        problemStatement:
          "High-speed data acquisition boards frequently suffer from ground loop noise, impedance mismatches, and signal degradation above 50MSPS frequencies.",
        buildDescription:
          "Designed a custom 4-layer FR4 PCB with 50-ohm single-ended and 100-ohm differential stripline routing. Incorporated low-noise ultra-low dropout regulators (LDO) and active Bessel anti-aliasing input filters.",
        stackDetails: [
          "ADC: 14-Bit 100MSPS pipelined differential converter",
          "Signal Conditioning: Ultra-low distortion operational amplifiers",
          "CAD: Altium Designer with layer stack manager and impedance profiles",
          "Clocking: Low-jitter TCXO oscillator with dedicated ground island",
        ],
        outcomeMetrics:
          "Measured Signal-to-Noise Ratio (SNR) of 72.4dB and Total Harmonic Distortion (THD) under -84dB across the entire 0-25MHz bandwidth.",
      },
    },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050807] text-[#E8F5EF] pb-36">
      {/* Subtle Uniform Inner-Page Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-[0.08] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 md:pt-16">
        {/* Header Breadcrumb */}
        <ScrollReveal direction="down">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A1210] border border-[#12261F] text-xs font-mono text-[#00FF9C] mb-6">
            <Terminal className="w-3.5 h-3.5" />
            <span>PORTFOLIO_WORKS // HARDWARE &amp; ARCHITECTURAL BUILDS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#E8F5EF] mb-4">
            FEATURED <br />
            <span className="text-[#00FF9C] drop-shadow-[0_0_20px_rgba(0,255,156,0.35)]">
              ENGINEERING
            </span>{" "}
            PROJECTS.
          </h1>
          <p className="text-[#7C9A8E] text-base md:text-lg max-w-2xl leading-relaxed mb-16">
            Production systems, hardware prototypes, and scalable institutional applications.
            Inspect problem statements, technical architecture, and verified metrics.
          </p>
        </ScrollReveal>

        {/* PROJECT GRID */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <div className="p-7 bg-[#0A1210] border border-[#12261F] hover:border-[#00FF9C]/60 transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  {/* Thumbnail / Header Badge */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#12261F]">
                    <span className="text-[10px] font-mono text-[#00FF9C] bg-[#12261F] px-2 py-0.5 border border-[#12261F]">
                      {project.thumbnailBadge}
                    </span>
                    <span className="text-[11px] font-mono text-[#FFC900]">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-[#E8F5EF] mb-3 group-hover:text-[#00FF9C] transition-colors">
                    {project.title}
                  </h2>

                  {/* One-Line Problem */}
                  <div className="mb-6">
                    <span className="text-[10px] font-mono text-[#7C9A8E] uppercase tracking-wider block mb-1">
                      CHALLENGE:
                    </span>
                    <p className="text-xs md:text-sm text-[#E8F5EF] font-mono leading-relaxed">
                      &quot;{project.problem}&quot;
                    </p>
                  </div>

                  {/* Stack Chips */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-mono text-[#7C9A8E] bg-[#050807] px-2.5 py-1 border border-[#12261F] group-hover:border-[#00FF9C]/30 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* TWO ACTIONS PER CARD: View Project & View Description */}
                <div className="pt-4 border-t border-[#12261F] flex items-center justify-between gap-3">
                  {/* Action 1: View Project (Opens in new tab) */}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7C9A8E] hover:text-[#00FF9C] transition-colors"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* Action 2: View Description (Opens in-page modal) */}
                  <MagneticButton
                    variant="primary"
                    onClick={() => setSelectedProject(project)}
                    className="!px-4 !py-2 !text-xs font-mono"
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

      {/* IN-PAGE MODAL: Problem → Build → Stack → Outcome */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#050807]/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#0A1210] border border-[#00FF9C] p-6 md:p-8 shadow-[0_0_50px_rgba(0,255,156,0.25)] max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close project modal"
                className="absolute top-5 right-5 p-1.5 text-[#7C9A8E] hover:text-[#00FF9C] border border-[#12261F] hover:border-[#00FF9C] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="text-[10px] font-mono text-[#FFC900] tracking-widest uppercase mb-1">
                SYSTEM TELEMETRY BRIEF
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#E8F5EF] mb-6">
                {selectedProject.title}
              </h3>

              <div className="space-y-6">
                {/* 1. PROBLEM */}
                <div className="p-4 bg-[#050807] border border-[#12261F]">
                  <div className="text-[11px] font-mono text-[#00FF9C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>01 // THE PROBLEM STATEMENT</span>
                  </div>
                  <p className="text-xs md:text-sm text-[#7C9A8E] leading-relaxed">
                    {selectedProject.modal.problemStatement}
                  </p>
                </div>

                {/* 2. BUILD */}
                <div className="p-4 bg-[#050807] border border-[#12261F]">
                  <div className="text-[11px] font-mono text-[#00FF9C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>02 // THE BUILD &amp; IMPLEMENTATION</span>
                  </div>
                  <p className="text-xs md:text-sm text-[#7C9A8E] leading-relaxed">
                    {selectedProject.modal.buildDescription}
                  </p>
                </div>

                {/* 3. STACK */}
                <div className="p-4 bg-[#050807] border border-[#12261F]">
                  <div className="text-[11px] font-mono text-[#00FF9C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>03 // ARCHITECTURAL STACK</span>
                  </div>
                  <ul className="space-y-1.5">
                    {selectedProject.modal.stackDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-mono text-[#E8F5EF]">
                        <span className="text-[#00FF9C]">&gt;</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. OUTCOME */}
                <div className="p-4 bg-[#050807] border border-[#12261F]">
                  <div className="text-[11px] font-mono text-[#FFC900] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>04 // VERIFIED OUTCOME &amp; IMPACT</span>
                  </div>
                  <p className="text-xs md:text-sm text-[#E8F5EF] font-mono leading-relaxed">
                    {selectedProject.modal.outcomeMetrics}
                  </p>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-8 pt-4 border-t border-[#12261F] flex items-center justify-between">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00FF9C] hover:underline"
                >
                  <span>Open Project Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 bg-[#12261F] text-xs font-mono text-[#E8F5EF] hover:bg-[#00FF9C] hover:text-[#050807] transition-colors"
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
