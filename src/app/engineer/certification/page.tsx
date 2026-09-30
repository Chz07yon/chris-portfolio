"use client";

import React, { useState } from "react";
import { Terminal, ShieldCheck, ExternalLink, Award, Trophy, CheckCircle2 } from "lucide-react";

interface Credential {
  id: string;
  type: "certificate" | "hackathon";
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  skills: string[];
}

export default function EngineerCertificationPage() {
  const [filter, setFilter] = useState<"all" | "certificate" | "hackathon">("all");

  const credentials: Credential[] = [
    {
      id: "ipc-pcb",
      type: "certificate",
      title: "Advanced High-Speed PCB Design & Impedance Control",
      issuer: "IPC / Industry Technical Standard",
      date: "August 2024",
      credentialId: "IPC-HS-2024-8841",
      verifyUrl: "https://linkedin.com/in/chris-zeyon-pinto-21329a397",
      skills: ["Differential Stripline", "Layer Stack Planning", "DFM / DFA Verification"],
    },
    {
      id: "sdm-hack",
      type: "hackathon",
      title: "SDM State-Level Hardware Hackathon — 1st Place Winner",
      issuer: "SDM College of Engineering & Technology",
      date: "November 2023",
      credentialId: "SDM-HACK-WINNER-01",
      verifyUrl: "https://github.com/Chz07yon",
      skills: ["LoRa Telemetry", "Rapid Prototyping", "Low-Power Firmware"],
    },
    {
      id: "arm-rtos",
      type: "certificate",
      title: "ARM Cortex-M Microcontrollers & Real-Time Kernel Design",
      issuer: "ARM University Program",
      date: "September 2023",
      credentialId: "ARM-EMB-66023",
      verifyUrl: "https://linkedin.com/in/chris-zeyon-pinto-21329a397",
      skills: ["ARM Cortex-M4", "FreeRTOS Scheduling", "DMA & Peripherals"],
    },
    {
      id: "vvce-innovate",
      type: "hackathon",
      title: "VVCE Innovate Sprint — Best Embedded Architecture",
      issuer: "Vidyavardhaka College of Engineering",
      date: "March 2024",
      credentialId: "VVCE-INNOVATE-2024",
      verifyUrl: "https://github.com/Chz07yon",
      skills: ["Campus Telemetry", "Full-Stack Hardware", "System Reliability"],
    },
    {
      id: "ieee-rf",
      type: "certificate",
      title: "RF Fundamentals & Electromagnetic Compatibility (EMC)",
      issuer: "IEEE Communications Society",
      date: "December 2023",
      credentialId: "IEEE-COMSOC-2023-911",
      verifyUrl: "https://linkedin.com/in/chris-zeyon-pinto-21329a397",
      skills: ["S-Parameters", "EMI Shielding", "Antenna Matching"],
    },
    {
      id: "robotics-olympiad",
      type: "hackathon",
      title: "National Autonomous Robotics Championship Finalist",
      issuer: "National Technical Robotics Council",
      date: "October 2023",
      credentialId: "NTRC-ROBO-2023-F09",
      verifyUrl: "https://github.com/Chz07yon",
      skills: ["Motor Control (PWM)", "Sensor Fusion", "PID Control Loops"],
    },
    {
      id: "matlab-dsp",
      type: "certificate",
      title: "MATLAB & Simulink for Digital Signal Processing",
      issuer: "MathWorks Certified Training",
      date: "June 2022",
      credentialId: "MW-DSP-2022-7714",
      verifyUrl: "https://linkedin.com/in/chris-zeyon-pinto-21329a397",
      skills: ["FFT Analysis", "Digital Filtering (FIR/IIR)", "Simulink Modeling"],
    },
  ];

  const filtered = credentials.filter((c) => filter === "all" || c.type === filter);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050807] text-[#E8F5EF] pb-36">
      {/* Subtle Uniform Inner-Page Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-[0.08] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 md:pt-16">
        {/* Header Breadcrumb */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A1210] border border-[#12261F] text-xs font-mono text-[#00FF9C] mb-6">
            <Terminal className="w-3.5 h-3.5" />
            <span>CREDENTIAL_VAULT // SCANNABILITY &amp; AUTHENTICITY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#E8F5EF] mb-4">
            VERIFIED <br />
            <span className="text-[#00FF9C] drop-shadow-[0_0_20px_rgba(0,255,156,0.35)]">
              CREDENTIALS
            </span>{" "}
            &amp; HACKATHONS.
          </h1>
          <p className="text-[#7C9A8E] text-base md:text-lg max-w-2xl leading-relaxed mb-10">
            A comprehensive record of accredited industry certifications, academic distinctions, and competitive engineering hackathon awards.
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="flex items-center gap-3 pb-8 border-b border-[#12261F] mb-8">
          <span className="text-xs font-mono text-[#7C9A8E] uppercase tracking-wider hidden sm:inline">
            FILTER:
          </span>
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-xs font-mono transition-colors ${
              filter === "all"
                ? "bg-[#00FF9C] text-[#050807] font-bold"
                : "bg-[#0A1210] text-[#7C9A8E] hover:text-[#E8F5EF] border border-[#12261F]"
            }`}
          >
            ALL CREDENTIALS ({credentials.length})
          </button>
          <button
            onClick={() => setFilter("certificate")}
            className={`px-3 py-1.5 text-xs font-mono transition-colors ${
              filter === "certificate"
                ? "bg-[#00FF9C] text-[#050807] font-bold"
                : "bg-[#0A1210] text-[#7C9A8E] hover:text-[#E8F5EF] border border-[#12261F]"
            }`}
          >
            CERTIFICATIONS (4)
          </button>
          <button
            onClick={() => setFilter("hackathon")}
            className={`px-3 py-1.5 text-xs font-mono transition-colors ${
              filter === "hackathon"
                ? "bg-[#00FF9C] text-[#050807] font-bold"
                : "bg-[#0A1210] text-[#7C9A8E] hover:text-[#E8F5EF] border border-[#12261F]"
            }`}
          >
            HACKATHONS (3)
          </button>
        </div>

        {/* CLEAN TABULAR / GRID LIST FOR MAXIMUM SCANNABILITY */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 md:p-6 bg-[#0A1210] border border-[#12261F] hover:border-[#00FF9C]/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 flex-1">
                {/* Badge Row */}
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                      item.type === "hackathon"
                        ? "bg-[#FFC900]/15 text-[#FFC900] border border-[#FFC900]/30"
                        : "bg-[#00FF9C]/15 text-[#00FF9C] border border-[#00FF9C]/30"
                    }`}
                  >
                    {item.type === "hackathon" ? (
                      <Trophy className="w-3 h-3" />
                    ) : (
                      <Award className="w-3 h-3" />
                    )}
                    <span>{item.type}</span>
                  </span>

                  <span className="text-xs font-mono text-[#7C9A8E]">
                    {item.date}
                  </span>

                  <span className="text-[10px] font-mono text-[#7C9A8E] opacity-75 hidden sm:inline">
                    ID: {item.credentialId}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg md:text-xl font-bold text-[#E8F5EF] group-hover:text-[#00FF9C] transition-colors">
                  {item.title}
                </h2>

                {/* Issuer */}
                <p className="text-xs font-mono text-[#7C9A8E]">
                  Issued by: <span className="text-[#E8F5EF]">{item.issuer}</span>
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono text-[#7C9A8E] bg-[#050807] px-2 py-0.5 border border-[#12261F]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action: Verify / View Link */}
              <div className="pt-2 md:pt-0 flex items-center">
                <a
                  href={item.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#050807] border border-[#12261F] text-xs font-mono text-[#00FF9C] hover:bg-[#00FF9C] hover:text-[#050807] hover:border-[#00FF9C] transition-all duration-200 select-none"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER NOTICE */}
        <div className="mt-12 p-4 bg-[#0A1210] border border-[#12261F] flex items-center justify-between text-xs font-mono text-[#7C9A8E]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00FF9C]" />
            <span>ALL CERTIFICATIONS AND HACKATHON CITATIONS VERIFIABLE UPON INQUIRY</span>
          </div>
          <span className="text-[#00FF9C] hidden sm:inline">VAULT STATUS: SYNCHRONIZED</span>
        </div>
      </div>
    </main>
  );
}
