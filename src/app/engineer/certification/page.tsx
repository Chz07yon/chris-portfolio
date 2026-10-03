"use client";

import React from "react";
import Image from "next/image";
import { Award, Trophy, CheckCircle2 } from "lucide-react";

interface Credential {
  id: string;
  type: "certificate" | "hackathon";
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl?: string;
  skills: string[];
  certificateImage?: string;
}

export default function EngineerCertificationPage() {
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
      certificateImage: "",
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
      certificateImage: "",
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
      certificateImage: "",
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
      certificateImage: "",
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
      certificateImage: "",
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
      certificateImage: "",
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
      certificateImage: "",
    },
  ];

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
              A comprehensive record of accredited industry certifications, academic distinctions, and competitive engineering hackathon awards.
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

        {/* EXPANDED CREDENTIALS LIST */}
        <div className="space-y-6">
          {credentials.map((item) => (
            <div
              key={item.id}
              className="p-6 md:p-8 bg-[#0A1210] border border-[#12261F] hover:border-[#00FF9C]/60 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8 group"
            >
              {/* Information Column */}
              <div className="space-y-3 flex-1">
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

                  <span className="text-xs font-mono text-[#7C9A8E]/80">
                    ID: {item.credentialId}
                  </span>
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
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono text-[#7C9A8E] bg-[#050807] px-2.5 py-1 border border-[#12261F] group-hover:border-[#12261F]/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ending: Dedicated Certificate Slot */}
              <div className="w-full lg:w-80 shrink-0 aspect-[4/3] bg-[#050807] border border-[#12261F] group-hover:border-[#00FF9C]/50 transition-colors relative flex flex-col items-center justify-center p-4 overflow-hidden">
                {/* Technical Corner Accents */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00FF9C]/60" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00FF9C]/60" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00FF9C]/60" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00FF9C]/60" />

                {item.certificateImage ? (
                  <Image
                    src={item.certificateImage}
                    alt={`${item.title} Certificate`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-4 select-none">
                    <div className="w-12 h-12 rounded-none bg-[#12261F]/60 border border-[#12261F] flex items-center justify-center text-[#00FF9C] mb-2.5 group-hover:bg-[#00FF9C]/10 group-hover:border-[#00FF9C]/40 transition-colors">
                      {item.type === "hackathon" ? (
                        <Trophy className="w-6 h-6" />
                      ) : (
                        <Award className="w-6 h-6" />
                      )}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#E8F5EF] tracking-wider uppercase">
                      CERTIFICATE
                    </span>
                    <span className="text-[10px] font-mono text-[#00FF9C] mt-1">
                      {item.credentialId}
                    </span>
                    <span className="text-[9px] font-mono text-[#7C9A8E] mt-1">
                      {"// CERTIFICATE SLOT"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER NOTICE */}
        <div className="mt-12 p-4 bg-[#0A1210] border border-[#12261F] flex items-center justify-between text-xs font-mono text-[#7C9A8E]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00FF9C]" />
            <span>ALL CERTIFICATIONS AND HACKATHON CITATIONS ARCHIVED</span>
          </div>
          <span className="text-[#00FF9C] hidden sm:inline">VAULT STATUS: SYNCHRONIZED</span>
        </div>
      </div>
    </main>
  );
}
