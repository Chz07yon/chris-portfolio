"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight, X, Cpu, Layers, ExternalLink, Activity, CheckCircle2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  problem: string;
  category: string;
  stack: string[];
  liveUrl?: string; // Optional: Only present if project has an active live website
  thumbnailBadge: string;
  modal: {
    problemStatement: string;
    buildDescription: string;
    stackDetails: string[];
    outcomeMetrics: string;
  };
}

const emptySubscribe = () => () => { };

export default function EngineerWorksPage() {
  const { setHeaderHidden } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const openProject = (project: Project) => {
    setScrollProgress(0);
    setSelectedProject(project);
  };

  // Prevent background page movement and vanish header while the full-screen report is open
  useEffect(() => {
    if (selectedProject) {
      setHeaderHidden(true);
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedProject(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        setHeaderHidden(false);
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      setHeaderHidden(false);
    }
  }, [selectedProject, setHeaderHidden]);

  const handleReportScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight > clientHeight) {
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    }
  };

  const projects: Project[] = [
    {
      id: "rdx-engine",
      title: "RDX 3.0",
      category: "STUDIO WEBAPP",
      problem: "A Functional Structure For a Studio House with an aim to reach out to Social Platforms with a functional and engaging user interface.",
      stack: ["Next.js", "Redux Toolkit", "Node.js", "PostgreSQL", "Redis", "Cloudinary", "GraphQL", "WebSockets"],
      liveUrl: "https://rdx3.vercel.app/",
      thumbnailBadge: "MEDIA / DESIGN",
      modal: {
        problemStatement:
          "A Functional Structure For a Studio House with an aim to reach out to Social Platforms with a functional and engaging user interface.",
        buildDescription:
          "Engineered with The Basic Coading Language (HTML, CSS, and JavaScript) with The encryption vault ",
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
      id: "sdm-hub",
      title: "Smart Disastar Management (SIH 2026) ",
      category: "EMBEDDED HARDWARE & IOT",
      problem: "Real-time remote telemetry transmission in disaster-prone environments.",
      stack: ["ESP32-S3", "LoRa SX1278", "MQTT", "Node-RED"],
      liveUrl: "https://smart-disaster-monitoring.vercel.app",
      thumbnailBadge: "IOT / EMBEDDED",
      modal: {
        problemStatement:
          "To build a system that can collect environmental data from remote locations and transmit it to a central server for analysis and decision making.",
        buildDescription:
          "Engineered with a common microcontroller and using IOT concepts an interface developed with typescript (node-red) and MQTT for communication between the microcontroller and the interface.",
        stackDetails: [
          "Microcontroller: ESP32-S3 (ARM Cortex-M4)",
          "RF Protocol: LoRaWAN 868MHz point-to-point mesh",
          "Interface: Node-RED with MQTT",
        ],
        outcomeMetrics:
          "Demonstrated 4.8 km line-of-sight packet transmission at 99.4% reliability on single solar battery charge. Awarded 1st Place at SDM Engineering Hackathon.",
      },
    },
    {
      id: "vvce-connect",
      title: "VVCE Connect",
      category: "INSTITUTIONAL ARCHITECTURE",
      problem: "Fragmented department communications, delayed academic notices, and resource bottlenecks across 4,200+ students.",
      stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis"],
      liveUrl: "https://vvceconnect-bay.vercel.app/#login",
      thumbnailBadge: "CAMPUS",
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
      id: "vvce-hotel",
      title: "VVCE Restaurant & Billing Terminal",
      category: "COMMERCIAL POS & BILLING SYSTEM",
      problem: "Manual order ticketing, slow bill computation, and lack of real-time sales analytics during high-volume restaurant rush hours.",
      stack: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "POS Terminal", "Thermal Printing"],
      liveUrl: "https://vvcehotel.vercel.app/",
      thumbnailBadge: "POS / TERMINAL",
      modal: {
        problemStatement:
          "Traditional dining environments face operational bottlenecks with handwritten order chits, manual calculation errors, delayed invoice generation, and an absence of real-time sales metrics for management.",
        buildDescription:
          "Developed a lightweight, high-performance web-based billing terminal and owner dashboard featuring rapid menu selection, order type routing (Dine-In, Takeaway, Delivery), automated discount/tax computation, printable thermal invoices, and real-time revenue analytics.",
        stackDetails: [
          "Terminal Frontend: Semantic HTML5, Modular CSS3, and Vanilla JavaScript (ES6+)",
          "State & Storage Engine: LocalStorage caching for session persistence and invoice history",
          "Analytics Engine: Real-time revenue calculations, completed orders, and top-selling items",
          "Printing Architecture: Media print stylesheets formatted for standard 80mm thermal receipt printers",
        ],
        outcomeMetrics:
          "Achieved sub-second order processing and receipt generation, cutting guest checkout wait time by 75% with zero external database latency.",
      },
    },
    {
      id: "crowd-counter",
      title: "Smart Crowd Counting & Overcrowding Alert",
      category: "EMBEDDED HARDWARE & SENSOR NETWORKS",
      problem: "Real-time occupancy tracking and false-trigger rejection in enclosed venues with visual crowd-level alerts.",
      stack: ["Arduino Uno", "4x IR Sensors", "C/C++", "Non-Blocking millis()", "RGB Telemetry"],
      thumbnailBadge: "ARDUINO / IR",
      modal: {
        problemStatement:
          "Enclosed public venues and transit portals require reliable occupancy tracking without cost-prohibitive camera networks, while eliminating false counts caused by doorway hesitations and partial sensor obstructions.",
        buildDescription:
          "Engineered a dual-stage directional counter utilizing an Arduino Uno and four digital IR obstacle sensors arranged in detector-confirmer pairs (E1/E2 for entry, X1/X2 for exit). Implemented a 5-second time-window validation algorithm to prevent erratic triggers, coupled with a dynamic common-cathode RGB LED status indicator and a non-blocking millis()-driven 300ms flashing alert when crowd capacity reaches or exceeds 20.",
        stackDetails: [
          "Microcontroller: Arduino Uno (ATmega328P @ 16MHz, 5V Logic)",
          "Sensor Array: 4x Active IR Obstacle Detectors with digital interrupt pins (D2-D5)",
          "Validation Logic: Non-blocking millis() timing with 5000ms confirmation window",
          "Status Display: Common-cathode RGB LED (Green: 0-5, Blue: 6-10, Red: 11-19, Blink Red: 20+)",
          "Telemetry & Diagnostics: Dedicated count/rejection indicator LED + 9600-baud serial reporting",
        ],
        outcomeMetrics:
          "Achieved 100% directional accuracy in movement verification with instant rejection of unconfirmed sequences, sustaining seamless non-blocking sensor polling during active overcrowding alerts.",
      },
    },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050807] text-[#E8F5EF] pb-36">
      {/* Subtle Uniform Inner-Page Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-[0.08] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 md:pt-16">
        {/* Header Breadcrumb & Center-Right Ambient Logo */}
        <div className="relative mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <ScrollReveal direction="down" className="max-w-2xl relative z-10">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#E8F5EF] mb-4">
              FEATURED <br />
              <span className="text-[#00FF9C] drop-shadow-[0_0_20px_rgba(0,255,156,0.35)]">
                ENGINEERING
              </span>{" "}
              PROJECTS.
            </h1>
            <p className="text-[#7C9A8E] text-base md:text-lg leading-relaxed">
              Production systems, hardware prototypes, and scalable institutional applications.
              Inspect problem statements, technical architecture, and verified metrics.
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

                {/* CARD ACTIONS: View Project (Only shown if website exists) + View Description */}
                <div className={`pt-4 border-t border-[#12261F] flex items-center ${project.liveUrl ? 'justify-between' : 'justify-end'} gap-3`}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7C9A8E] hover:text-[#00FF9C] transition-colors"
                    >
                      <span>View Project</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <MagneticButton
                    variant="primary"
                    onClick={() => openProject(project)}
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

      {/* FULL-SCREEN ENGINEERING TECHNICAL REPORT DOSSIER */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                data-lenis-prevent="true"
                onScroll={handleReportScroll}
                className="fixed inset-0 z-[100] bg-[#050807] overflow-y-auto overscroll-contain flex flex-col text-[#E8F5EF] report-scrollbar select-text"
              >
                {/* STICKY TOP TECHNICAL STATUS BAR */}
                <div className="sticky top-0 z-50 bg-[#0A1210]/95 backdrop-blur-md border-b border-[#12261F] px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#12261F] text-[#00FF9C] font-mono text-xs uppercase tracking-wider border border-[#12261F]">
                      <span className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse" />
                      <span>TECHNICAL EVALUATION REPORT // {selectedProject.id.toUpperCase()}</span>
                    </span>
                    <span className="hidden lg:inline text-xs font-mono text-[#7C9A8E]">
                      CLASSIFICATION: UNRESTRICTED ENGINEERING DOSSIER
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-[#050807] border border-[#12261F] font-mono text-[11px] text-[#7C9A8E]">
                      <span>READOUT:</span>
                      <span className="text-[#00FF9C] font-bold">{Math.round(scrollProgress)}%</span>
                    </div>

                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#050807] border border-[#00FF9C]/50 text-[#00FF9C] text-xs font-mono hover:bg-[#00FF9C] hover:text-[#050807] transition-all"
                      >
                        <span>LAUNCH PROJECT</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedProject(null)}
                      aria-label="Close report dossier"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#12261F] hover:bg-[#C8102E] text-xs font-mono text-[#E8F5EF] hover:text-[#FFFAF2] transition-colors border border-[#12261F]"
                    >
                      <span className="hidden sm:inline text-[10px] text-[#7C9A8E] hover:text-white mr-1">[ESC]</span>
                      <span>CLOSE REPORT</span>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Glowing Neon Telemetry Scroll Progress Bar */}
                <div className="sticky top-[65px] z-50 w-full h-[2px] bg-[#12261F]">
                  <div
                    className="h-full bg-[#00FF9C] shadow-[0_0_10px_#00FF9C] transition-all duration-75"
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>

                {/* REPORT BODY CONTAINER */}
                <div className="relative flex-1 max-w-5xl w-full mx-auto px-6 py-12">
                  {/* Subtle background tech grid */}
                  <div className="absolute inset-0 bg-tech-grid opacity-[0.06] pointer-events-none -z-10" />

                  {/* REPORT MASTHEAD */}
                  <div className="border border-[#12261F] bg-[#0A1210]/70 p-6 md:p-8 mb-8 relative">
                    {/* Corner reticle marks */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#00FF9C]" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#00FF9C]" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#00FF9C]" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#00FF9C]" />

                    <div className="pt-6">
                      <div className="text-xs font-mono text-[#FFC900] tracking-widest uppercase mb-2">
                        {"// ARCHITECTURAL EVALUATION & TELEMETRY BRIEF"}
                      </div>
                      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#E8F5EF] mb-4">
                        {selectedProject.title}
                      </h1>
                      <p className="text-sm md:text-base text-[#7C9A8E] max-w-3xl leading-relaxed">
                        Formal engineering brief outlining system constraints, hardware/software implementation methodologies, component stacks, and benchmarked operational metrics.
                      </p>
                    </div>

                    {/* 4-COLUMN METADATA MATRIX */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 mt-6 border-t border-[#12261F] font-mono text-xs">
                      <div>
                        <div className="text-[10px] text-[#7C9A8E] uppercase tracking-wider mb-1">REFERENCE ID</div>
                        <div className="text-[#00FF9C] font-semibold">{`ENG-${selectedProject.id.toUpperCase()}-2026`}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#7C9A8E] uppercase tracking-wider mb-1">PRIMARY DOMAIN</div>
                        <div className="text-[#E8F5EF]">{selectedProject.category}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#7C9A8E] uppercase tracking-wider mb-1">SYSTEM ARCHITECT</div>
                        <div className="text-[#E8F5EF]">Chris Zeyon Pinto</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#7C9A8E] uppercase tracking-wider mb-1">FIELD EVALUATION</div>
                        <div className="text-[#00FF9C] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9C]" />
                          BENCHMARKED
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* REPORT SECTIONS */}
                  <div className="space-y-8">
                    {/* 01 // PROBLEM STATEMENT */}
                    <section className="p-6 md:p-8 bg-[#0A1210] border border-[#12261F]">
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#12261F]">
                        <div className="text-xs font-mono text-[#00FF9C] uppercase tracking-wider flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          <span>SECTION 01 // PROBLEM STATEMENT &amp; OPERATIONAL CONSTRAINTS</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#7C9A8E]">PHASE_01</span>
                      </div>
                      <p className="text-sm md:text-base text-[#E8F5EF] leading-relaxed">
                        {selectedProject.modal.problemStatement}
                      </p>
                    </section>

                    {/* 02 // BUILD & IMPLEMENTATION */}
                    <section className="p-6 md:p-8 bg-[#0A1210] border border-[#12261F]">
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#12261F]">
                        <div className="text-xs font-mono text-[#00FF9C] uppercase tracking-wider flex items-center gap-2">
                          <Cpu className="w-4 h-4" />
                          <span>SECTION 02 // SYSTEM BUILD &amp; IMPLEMENTATION METHODOLOGY</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#7C9A8E]">PHASE_02</span>
                      </div>
                      <p className="text-sm md:text-base text-[#7C9A8E] leading-relaxed">
                        {selectedProject.modal.buildDescription}
                      </p>
                    </section>

                    {/* 03 // ARCHITECTURAL STACK */}
                    <section className="p-6 md:p-8 bg-[#0A1210] border border-[#12261F]">
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#12261F]">
                        <div className="text-xs font-mono text-[#00FF9C] uppercase tracking-wider flex items-center gap-2">
                          <Layers className="w-4 h-4" />
                          <span>SECTION 03 // ARCHITECTURAL COMPONENT SPECIFICATIONS</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#7C9A8E]">PHASE_03</span>
                      </div>

                      {/* Detailed specs matrix */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {selectedProject.modal.stackDetails.map((detail, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 bg-[#050807] border border-[#12261F] flex items-start gap-3"
                          >
                            <span className="text-[10px] font-mono text-[#00FF9C] bg-[#12261F] px-1.5 py-0.5 mt-0.5">
                              {`#0${idx + 1}`}
                            </span>
                            <span className="text-xs font-mono text-[#E8F5EF] leading-relaxed">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* High level tech chips */}
                      <div className="pt-4 border-t border-[#12261F]">
                        <span className="text-[10px] font-mono text-[#7C9A8E] uppercase tracking-wider block mb-2">
                          INTEGRATED SUBSYSTEM TECHNOLOGIES:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.stack.map((item) => (
                            <span
                              key={item}
                              className="text-xs font-mono text-[#00FF9C] bg-[#050807] px-3 py-1 border border-[#12261F]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* 04 // VERIFIED OUTCOME & IMPACT */}
                    <section className="p-6 md:p-8 bg-[#0A1210] border-2 border-[#00FF9C]/40 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF9C]/5 rounded-bl-full pointer-events-none" />
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#12261F]">
                        <div className="text-xs font-mono text-[#FFC900] uppercase tracking-wider flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>SECTION 04 // EMPIRICAL VALIDATION &amp; BENCHMARKED OUTCOME</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#00FF9C] bg-[#12261F] px-2 py-0.5">
                          VERIFIED
                        </span>
                      </div>
                      <p className="text-sm md:text-base text-[#E8F5EF] font-mono leading-relaxed">
                        {selectedProject.modal.outcomeMetrics}
                      </p>
                    </section>
                  </div>

                  {/* REPORT FOOTER SIGN-OFF */}
                  <div className="mt-12 pt-8 border-t border-[#12261F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="font-mono text-xs text-[#7C9A8E]">
                      <div>AUTHORIZED SIGN-OFF: <span className="text-[#E8F5EF]">CHRIS ZEYON PINTO</span></div>
                      <div className="text-[10px] text-[#7C9A8E]/70 mt-1">HASH: SHA256//7A9C22B4800F19D8E1 // ECE DEPARTMENT</div>
                    </div>

                    <div className="flex items-center gap-4">
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00FF9C] text-[#050807] font-mono font-semibold text-xs hover:bg-[#00FF9C]/90 transition-all shadow-[0_0_25px_rgba(0,255,156,0.3)]"
                        >
                          <span>VIEW LIVE PROJECT</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      <button
                        onClick={() => setSelectedProject(null)}
                        className="px-5 py-2.5 bg-[#12261F] text-xs font-mono text-[#E8F5EF] hover:bg-[#1A382D] transition-colors"
                      >
                        CLOSE REPORT
                      </button>
                    </div>
                  </div>
                </div>

                {/* FLOATING PROMPT & BACK TO TOP BUTTONS */}
                {scrollProgress < 12 && (
                  <div className="sticky bottom-6 z-40 self-center pointer-events-none transition-opacity duration-300">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#0A1210]/95 border border-[#00FF9C]/40 text-[#00FF9C] font-mono text-xs rounded-full shadow-[0_0_20px_rgba(0,255,156,0.25)] animate-bounce">
                      <span>SCROLL DOWN TO INSPECT COMPLETE SPECIFICATION</span>
                      <span>↓</span>
                    </div>
                  </div>
                )}

                {scrollProgress > 30 && (
                  <button
                    onClick={(e) => {
                      const modal = e.currentTarget.closest("[data-lenis-prevent]") as HTMLDivElement;
                      modal?.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="fixed bottom-6 right-6 z-40 px-3.5 py-2 bg-[#0A1210]/95 border border-[#00FF9C]/50 hover:bg-[#00FF9C] text-[#00FF9C] hover:text-[#050807] font-mono text-xs flex items-center gap-1.5 transition-all shadow-[0_0_20px_rgba(0,255,156,0.2)]"
                  >
                    <span>↑ TOP</span>
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </main>
  );
}
