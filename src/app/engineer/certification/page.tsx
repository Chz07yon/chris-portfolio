"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Award, Trophy, CheckCircle2, ExternalLink, X, Eye, Sparkles } from "lucide-react";

interface Credential {
  id: string;
  type: "certificate" | "hackathon";
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  skills: string[];
  certificateImage: string;
  honors?: string;
}

const emptySubscribe = () => () => { };

export default function EngineerCertificationPage() {
  const { setHeaderHidden } = useTheme();
  const [activeFilter, setActiveFilter] = useState<"all" | "certificate" | "hackathon">("all");
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const credentials: Credential[] = [
    {
      id: "isro-start",
      type: "certificate",
      title: "Scientific Observations from Space",
      issuer: "Indian Space Research Organisation (ISRO) & IIRS",
      date: "May 2026",
      credentialId: "20261772941914",
      skills: ["Space Science & Observations", "Satellite Remote Sensing", "Space Telemetry", "Signal Processing"],
      certificateImage: "/assets/certificates/isro-start-2026.jpg",
      honors: "GRADE A+ (DISTINCTION) // START PROGRAMME",
    },
    {
      id: "iit-bombay-iot",
      type: "certificate",
      title: "Introduction to Internet of Things (IoT)",
      issuer: "Indian Institute of Technology Bombay (IIT Bombay)",
      date: "August 2026",
      credentialId: "JAGV3SOR5BRK",
      verifyUrl: "https://coursera.org/verify/JAGV3SOR5BRK",
      skills: ["IoT Architecture", "Embedded Sensors", "Network Protocols", "Connected Systems"],
      certificateImage: "/assets/certificates/iit-bombay-iot-2026.jpg",
    },
    {
      id: "polimi-ai",
      type: "certificate",
      title: "Artificial Intelligence: An Overview",
      issuer: "Politecnico di Milano 1863 (DEIB)",
      date: "November 2025",
      credentialId: "EAQM2APAIAUX",
      verifyUrl: "https://coursera.org/verify/specialization/EAQM2APAIAUX",
      skills: ["Machine Learning", "AI Technologies & Platforms", "Legal & Ethical AI", "Autonomous Architecture"],
      certificateImage: "/assets/certificates/polimi-ai-specialization.jpeg",
      honors: "5-COURSE ACCREDITED SPECIALIZATION",
    },
    {
      id: "scaler-anvil",
      type: "hackathon",
      title: "Anvil Hackathon — Technical Excellence & Innovation",
      issuer: "Scaler School of Technology (Ascent Builders TechFest)",
      date: "May 2026",
      credentialId: "SCALER-ASCENT-ANVIL-2026",
      skills: ["Rapid Builder Prototyping", "Technical Architecture", "System Design", "Competitive Sprint"],
      certificateImage: "/assets/certificates/scaler-anvil-hackathon.png",
      honors: "TECHNICAL EXCELLENCE CITATION",
    },
    {
      id: "ieee-fusionx",
      type: "hackathon",
      title: "FusionX 1.0 Hackathon — Real-World Engineering",
      issuer: "IEEE Bangalore Section, IEEE PES, PELS & IAS",
      date: "May 2026",
      credentialId: "IEEE-FUSIONX-2026-PART",
      skills: ["Power Electronics", "Hardware Prototyping", "Collaborative Engineering", "Real-World Problem Solving"],
      certificateImage: "/assets/certificates/ieee-fusionx-hackathon.jpg",
    },
    {
      id: "vvce-thermospark",
      type: "hackathon",
      title: "ThermoSpark-2026 — 9-Hour Engineering Sprint",
      issuer: "Vidyavardhaka College of Engineering (Dept. of Mechanical Engg)",
      date: "April 2026",
      credentialId: "VVCE-THERMOSPARK-2026",
      skills: ["Interdisciplinary Prototyping", "Rapid Sprint Execution", "Embedded Hardware", "Thermal Modeling"],
      certificateImage: "/assets/certificates/vvce-thermospark-hackathon.jpg",
      honors: "9-HOUR RAPID HACKATHON SPRINT",
    },
    {
      id: "bits-pilani-math",
      type: "certificate",
      title: "Basic Engineering Mathematics",
      issuer: "Birla Institute of Technology & Science, Pilani (BITS Pilani)",
      date: "November 2025",
      credentialId: "8SZCOCBTUZ6R",
      verifyUrl: "https://coursera.org/verify/8SZCOCBTUZ6R",
      skills: ["Linear Algebra", "Calculus & Differential Equations", "Engineering Mathematical Analysis"],
      certificateImage: "/assets/certificates/bits-pilani-math.jpg",
    },
    {
      id: "vvce-github",
      type: "certificate",
      title: "GitHub: Workshop & Distributed Version Control",
      issuer: "Innovators and Visionaries Club (IVC), VVCE",
      date: "March 2026",
      credentialId: "VVCE-IVC-GITHUB-2026",
      skills: ["Git Version Control", "Branching & Merge Workflows", "CI/CD Deployment", "Open Source Collaboration"],
      certificateImage: "/assets/certificates/vvce-github-workshop.jpg",
    },
    {
      id: "rice-academic-english",
      type: "certificate",
      title: "English and Academic Preparation - Pre-Collegiate",
      issuer: "Rice University",
      date: "November 2025",
      credentialId: "EVNZBUCBEO3K",
      verifyUrl: "https://coursera.org/verify/EVNZBUCBEO3K",
      skills: ["Technical Writing", "Academic Research Presentation", "Engineering Documentation"],
      certificateImage: "/assets/certificates/rice-university-english.jpg",
    },
  ];

  // Lock background scroll and hide header when inspecting a certificate
  useEffect(() => {
    if (selectedCredential) {
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
          setSelectedCredential(null);
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
  }, [selectedCredential, setHeaderHidden]);

  const filteredCredentials = credentials.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  const certificateCount = credentials.filter((c) => c.type === "certificate").length;
  const hackathonCount = credentials.filter((c) => c.type === "hackathon").length;

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050807] text-[#E8F5EF] pb-36">
      {/* Subtle Uniform Inner-Page Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-[0.08] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 md:pt-16">
        {/* Header Breadcrumb & Center-Right Ambient Logo */}
        <div className="relative mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl relative z-10">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#E8F5EF] mb-4">
              CERTIFICATIONS <br />
              <span className="text-[#00FF9C] drop-shadow-[0_0_20px_rgba(0,255,156,0.35)]">
                &amp; HACKATHONS.
              </span>
            </h1>
            <p className="text-[#7C9A8E] text-base md:text-lg leading-relaxed">
              Official records of space technology research training, university certifications, and competitive engineering hackathon achievements.
            </p>
          </div>

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

        {/* FILTER CONTROL TABS */}
        <div className="flex flex-wrap items-center gap-3 mb-8 pb-4 border-b border-[#12261F] font-mono text-xs">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 border transition-all ${activeFilter === "all"
              ? "bg-[#00FF9C] text-[#050807] font-bold border-[#00FF9C] shadow-[0_0_15px_rgba(0,255,156,0.3)]"
              : "bg-[#0A1210] text-[#7C9A8E] border-[#12261F] hover:border-[#00FF9C]/50 hover:text-[#E8F5EF]"
              }`}
          >
            ALL ARCHIVES [{credentials.length}]
          </button>
          <button
            onClick={() => setActiveFilter("certificate")}
            className={`px-4 py-2 border transition-all flex items-center gap-2 ${activeFilter === "certificate"
              ? "bg-[#00FF9C] text-[#050807] font-bold border-[#00FF9C] shadow-[0_0_15px_rgba(0,255,156,0.3)]"
              : "bg-[#0A1210] text-[#7C9A8E] border-[#12261F] hover:border-[#00FF9C]/50 hover:text-[#E8F5EF]"
              }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>CERTIFICATIONS [{certificateCount}]</span>
          </button>
          <button
            onClick={() => setActiveFilter("hackathon")}
            className={`px-4 py-2 border transition-all flex items-center gap-2 ${activeFilter === "hackathon"
              ? "bg-[#FFC900] text-[#050807] font-bold border-[#FFC900] shadow-[0_0_15px_rgba(255,201,0,0.3)]"
              : "bg-[#0A1210] text-[#7C9A8E] border-[#12261F] hover:border-[#FFC900]/50 hover:text-[#E8F5EF]"
              }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>HACKATHONS [{hackathonCount}]</span>
          </button>
        </div>

        {/* EXPANDED CREDENTIALS LIST */}
        <div className="space-y-6">
          {filteredCredentials.map((item) => (
            <div
              key={item.id}
              className="p-6 md:p-8 bg-[#0A1210] border border-[#12261F] hover:border-[#00FF9C]/60 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8 group"
            >
              {/* Information Column */}
              <div className="space-y-3.5 flex-1">
                {/* Badge Row */}
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider ${item.type === "hackathon"
                      ? "bg-[#FFC900]/15 text-[#FFC900] border border-[#FFC900]/30"
                      : "bg-[#00FF9C]/15 text-[#00FF9C] border border-[#00FF9C]/30"
                      }`}
                  >
                    {item.type === "hackathon" ? (
                      <Trophy className="w-3.5 h-3.5" />
                    ) : (
                      <Award className="w-3.5 h-3.5" />
                    )}
                    <span>{item.type}</span>
                  </span>

                  <span className="text-xs font-mono text-[#7C9A8E]">
                    {item.date}
                  </span>

                  {item.honors && (
                    <span className="text-[10px] font-mono text-[#00FF9C] bg-[#00FF9C]/10 border border-[#00FF9C]/30 px-2 py-0.5">
                      {item.honors}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-[#E8F5EF] group-hover:text-[#00FF9C] transition-colors leading-snug">
                  {item.title}
                </h2>

                {/* Issuer */}
                <p className="text-sm font-mono text-[#7C9A8E]">
                  Issued by: <span className="text-[#E8F5EF] font-medium">{item.issuer}</span>
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono text-[#7C9A8E] bg-[#050807] px-2.5 py-1 border border-[#12261F] group-hover:border-[#12261F]/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Verification & Inspection Actions */}
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setSelectedCredential(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#12261F] hover:bg-[#00FF9C] text-[#E8F5EF] hover:text-[#050807] font-mono text-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Certificate</span>
                  </button>

                  {item.verifyUrl && (
                    <a
                      href={item.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7C9A8E] hover:text-[#00FF9C] transition-colors"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Ending: Dedicated Certificate Preview Slot */}
              <div
                onClick={() => setSelectedCredential(item)}
                className="w-full lg:w-80 shrink-0 aspect-[4/3] bg-[#050807] border border-[#12261F] group-hover:border-[#00FF9C]/60 transition-all duration-300 relative flex flex-col items-center justify-center overflow-hidden cursor-pointer group/card shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                {/* Technical Corner Accents */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00FF9C]/60 z-20" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00FF9C]/60 z-20" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00FF9C]/60 z-20" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00FF9C]/60 z-20" />

                <Image
                  src={item.certificateImage}
                  alt={`${item.title} Certificate`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 320px"
                  className="object-cover group-hover/card:scale-105 transition-transform duration-500 filter contrast-105"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#050807]/75 opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-center p-4 z-10 backdrop-blur-[2px]">
                  <Eye className="w-6 h-6 text-[#00FF9C]" />
                  <span className="text-xs font-mono font-bold text-[#E8F5EF] uppercase tracking-wider">
                    CLICK TO EXPAND
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER NOTICE */}
        <div className="mt-12 p-4 bg-[#0A1210] border border-[#12261F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#7C9A8E]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00FF9C]" />
            <span>ALL {credentials.length} CREDENTIALS AND CITATIONS RECORDED &amp; VERIFIED</span>
          </div>
          <div className="flex items-center gap-2 text-[#00FF9C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VAULT STATUS: SYNCHRONIZED</span>
          </div>
        </div>
      </div>

      {/* FULL-SCREEN CERTIFICATE INSPECTOR MODAL */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {selectedCredential && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                data-lenis-prevent="true"
                className="fixed inset-0 z-[100] bg-[#050807]/95 backdrop-blur-xl flex flex-col p-4 md:p-8 select-text overflow-y-auto report-scrollbar"
              >
                {/* MODAL TOP BAR */}
                <div className="max-w-6xl w-full mx-auto flex items-center justify-between pb-4 mb-4 border-b border-[#12261F]">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-[#12261F] text-[#00FF9C] font-mono text-xs uppercase tracking-wider border border-[#12261F]">
                      CREDENTIAL ARCHIVE
                    </span>
                    <span className="hidden sm:inline font-mono text-xs text-[#7C9A8E]">
                      {selectedCredential.issuer}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {selectedCredential.verifyUrl && (
                      <a
                        href={selectedCredential.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00FF9C] text-[#050807] font-mono font-semibold text-xs hover:bg-[#00FF9C]/90 transition-all shadow-[0_0_15px_rgba(0,255,156,0.3)]"
                      >
                        <span>VERIFY CREDENTIAL</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedCredential(null)}
                      aria-label="Close certificate inspector"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#12261F] hover:bg-[#C8102E] text-xs font-mono text-[#E8F5EF] hover:text-[#FFFAF2] transition-colors border border-[#12261F]"
                    >
                      <span className="hidden sm:inline text-[10px] text-[#7C9A8E] hover:text-white mr-1">[ESC]</span>
                      <span>CLOSE</span>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* MODAL MAIN CONTENT */}
                <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 py-4">
                  {/* High-Resolution Certificate Image */}
                  <div className="w-full lg:flex-1 relative aspect-[4/3] max-h-[75vh] bg-[#050807] border border-[#12261F] shadow-[0_10px_50px_rgba(0,255,156,0.15)] flex items-center justify-center overflow-hidden">
                    <Image
                      src={selectedCredential.certificateImage}
                      alt={`${selectedCredential.title} Full Certificate`}
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>

                  {/* Metadata Sidebar */}
                  <div className="w-full lg:w-80 flex flex-col gap-5 p-6 bg-[#0A1210] border border-[#12261F]">
                    <div>
                      <span className="text-[10px] font-mono text-[#7C9A8E] uppercase tracking-wider block mb-1">
                        CREDENTIAL CLASSIFICATION
                      </span>
                      <div className="text-sm font-mono font-bold text-[#00FF9C] uppercase">
                        {selectedCredential.type === "hackathon" ? "HACKATHON AWARD & CITATION" : "ACCREDITED CERTIFICATION"}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#7C9A8E] uppercase tracking-wider block mb-1">
                        TITLE
                      </span>
                      <div className="text-base font-bold text-[#E8F5EF]">
                        {selectedCredential.title}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#7C9A8E] uppercase tracking-wider block mb-1">
                        ISSUING BODY
                      </span>
                      <div className="text-xs font-mono text-[#E8F5EF]">
                        {selectedCredential.issuer}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#7C9A8E] uppercase tracking-wider block mb-1">
                        DATE OF CONFERRAL
                      </span>
                      <div className="text-xs font-mono text-[#E8F5EF]">
                        {selectedCredential.date}
                      </div>
                    </div>

                    {selectedCredential.honors && (
                      <div>
                        <span className="text-[10px] font-mono text-[#7C9A8E] uppercase tracking-wider block mb-1">
                          DISTINCTION
                        </span>
                        <div className="text-xs font-mono text-[#FFC900] bg-[#FFC900]/10 border border-[#FFC900]/30 p-2">
                          {selectedCredential.honors}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-[10px] font-mono text-[#7C9A8E] uppercase tracking-wider block mb-2">
                        VALIDATED COMPETENCIES
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCredential.skills.map((s) => (
                          <span
                            key={s}
                            className="text-[11px] font-mono text-[#7C9A8E] bg-[#050807] px-2 py-0.5 border border-[#12261F]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setSelectedCredential(null)}
                        className="w-full py-2 bg-[#12261F] text-xs font-mono text-[#E8F5EF] hover:bg-[#1A382D] transition-colors"
                      >
                        CLOSE VIEWER
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </main>
  );
}
