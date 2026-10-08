"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { MagneticWrapper } from "@/components/ui/MagneticButton";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

export function Header() {
  const pathname = usePathname();
  const { mode, isHeaderHidden } = useTheme();
  const isEng = mode === "engineer";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (mobileMenuOpen) return;
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    if (latest < 40) {
      setIsCollapsed(false);
    } else if (diff > 8) {
      // Scrolling down: collapse nav items except logo
      setIsCollapsed(true);
    } else if (diff < -8) {
      // Scrolling up: reveal header
      setIsCollapsed(false);
    }
  });

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsCollapsed(false);
    setMobileMenuOpen(false);
  }

  // Engineer Navigation: [About] [My Journey] — Emblem — [Works] [Certification]
  const engineerLeftNav: NavItem[] = [
    { label: "About", href: "/engineer/about" },
    { label: "My Journey", href: "/engineer/journey" },
  ];
  const engineerRightNav: NavItem[] = [
    { label: "Works", href: "/engineer/works" },
    { label: "Certification", href: "/engineer/certification" },
  ];

  // Studio Navigation: [About] [My Journey] — Emblem — [Works] [Designs]
  const studioLeftNav: NavItem[] = [
    { label: "About", href: "/studio/about" },
    { label: "My Journey", href: "/studio/journey" },
  ];
  const studioRightNav: NavItem[] = [
    { label: "Works", href: "/studio/works" },
    { label: "Designs", href: "/studio/designs" },
  ];

  const leftNav = isEng ? engineerLeftNav : studioLeftNav;
  const rightNav = isEng ? engineerRightNav : studioRightNav;
  const allNav = [...leftNav, ...rightNav];

  const homeHref = isEng ? "/engineer" : "/studio";
  const emblemSrc = isEng
    ? "/assets/engineer/engineer-emblem.png"
    : "/assets/studio/studio-emblem.png";

  const isLinkActive = (href: string) => {
    if (pathname === href) return true;
    if (href !== "/engineer" && href !== "/studio" && pathname.startsWith(href)) {
      return true;
    }
    return false;
  };

  return (
    <motion.header
      initial={false}
      animate={{
        y: isHeaderHidden ? -100 : 0,
        opacity: isHeaderHidden ? 0 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        pointerEvents: isHeaderHidden ? "none" : undefined,
      }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-colors duration-300"
    >
      <nav
        aria-label="Main Navigation"
        className="max-w-7xl mx-auto px-6 py-4 md:py-5 flex items-center justify-between md:justify-center relative"
      >
        {/* Mobile Header: Brand Emblem + Hamburger */}
        <div className="flex md:hidden items-center justify-between w-full pointer-events-auto">
          <Link href={homeHref} className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src={emblemSrc}
                alt={isEng ? "Engineer Emblem" : "Studio Emblem"}
                fill
                sizes="96px"
                quality={100}
                className={`object-contain transition-transform duration-300 ${
                  isEng
                    ? "filter drop-shadow-[0_0_12px_rgba(0,255,156,0.6)] brightness-110"
                    : "filter drop-shadow-[0_2px_12px_rgba(200,16,46,0.35)] contrast-105"
                }`}
                priority
              />
            </div>
            <motion.span
              animate={{ opacity: isCollapsed ? 0 : 1, x: isCollapsed ? -8 : 0 }}
              transition={{ duration: 0.25 }}
              className={`text-xs font-mono tracking-widest font-bold ${
                isEng ? "text-[#00FF9C]" : "text-[#C8102E]"
              }`}
            >
              {isEng ? "CHRIS // ECE" : "THE RED STUDIOS"}
            </motion.span>
          </Link>

          <motion.button
            animate={{ opacity: isCollapsed ? 0 : 1, scale: isCollapsed ? 0.85 : 1 }}
            transition={{ duration: 0.25 }}
            style={{ pointerEvents: isCollapsed ? "none" : "auto" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`p-2 transition-colors ${
              isEng
                ? "text-[#E8F5EF] hover:text-[#00FF9C] border border-[#12261F] bg-[#0A1210]/80 rounded-none"
                : "text-[#1E0F10] hover:text-[#C8102E] border border-[#E5D5C2] bg-[#FFFAF2]/80 rounded-full"
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Desktop Balanced 5-Part Navigation Bar (Background: none, sits over hero portrait) */}
        <div className="hidden md:flex items-center gap-12 lg:gap-16 pointer-events-auto select-none">
          {/* LEFT NAV ITEMS */}
          <motion.div
            initial={false}
            animate={{
              opacity: isCollapsed ? 0 : 1,
              x: isCollapsed ? 28 : 0,
              scale: isCollapsed ? 0.92 : 1,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ pointerEvents: isCollapsed ? "none" : "auto" }}
            className="flex items-center gap-8 lg:gap-10"
          >
            {leftNav.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <MagneticWrapper key={item.href} strength={0.25}>
                  <Link
                    href={item.href}
                    className={`relative py-1 text-sm tracking-wide transition-colors duration-200 block ${
                      isEng ? "font-mono" : "font-sans font-medium"
                    } ${
                      active
                        ? isEng
                          ? "text-[#00FF9C]"
                          : "text-[#C8102E]"
                        : "text-[var(--text)] opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <motion.span
                        layoutId="active-nav-underline"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className={`absolute -bottom-1 left-0 right-0 h-[2px] ${
                          isEng
                            ? "bg-[#00FF9C] shadow-[0_0_8px_#00FF9C]"
                            : "bg-[#C8102E] shadow-[0_0_8px_rgba(200,16,46,0.5)]"
                        }`}
                      />
                    )}
                  </Link>
                </MagneticWrapper>
              );
            })}
          </motion.div>

          {/* CENTER EMBLEM (Enlarged & static high-clarity anchor, stays visible on scroll) */}
          <Link
            href={homeHref}
            data-no-magnetic="true"
            aria-label={isEng ? "Chris Engineer Home" : "The Red Studios Home"}
            className="relative group block mx-4 lg:mx-8"
          >
            <motion.div
              animate={{
                scale: isCollapsed ? 0.95 : 1,
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-16 h-16 lg:w-20 lg:h-20 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center"
            >
              <Image
                src={emblemSrc}
                alt={isEng ? "Engineer Emblem" : "Studio Emblem"}
                fill
                sizes="(max-width: 768px) 64px, 160px"
                quality={100}
                className={`object-contain transition-all duration-300 ${
                  isEng
                    ? "filter drop-shadow-[0_0_16px_rgba(0,255,156,0.5)] brightness-110 contrast-105"
                    : "filter drop-shadow-[0_4px_16px_rgba(200,16,46,0.3)] brightness-105 contrast-105"
                }`}
                priority
              />
            </motion.div>
          </Link>

          {/* RIGHT NAV ITEMS */}
          <motion.div
            initial={false}
            animate={{
              opacity: isCollapsed ? 0 : 1,
              x: isCollapsed ? -28 : 0,
              scale: isCollapsed ? 0.92 : 1,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ pointerEvents: isCollapsed ? "none" : "auto" }}
            className="flex items-center gap-8 lg:gap-10"
          >
            {rightNav.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <MagneticWrapper key={item.href} strength={0.25}>
                  <Link
                    href={item.href}
                    className={`relative py-1 text-sm tracking-wide transition-colors duration-200 block ${
                      isEng ? "font-mono" : "font-sans font-medium"
                    } ${
                      active
                        ? isEng
                          ? "text-[#00FF9C]"
                          : "text-[#C8102E]"
                        : "text-[var(--text)] opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <motion.span
                        layoutId="active-nav-underline"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className={`absolute -bottom-1 left-0 right-0 h-[2px] ${
                          isEng
                            ? "bg-[#00FF9C] shadow-[0_0_8px_#00FF9C]"
                            : "bg-[#C8102E] shadow-[0_0_8px_rgba(200,16,46,0.5)]"
                        }`}
                      />
                    )}
                  </Link>
                </MagneticWrapper>
              );
            })}
          </motion.div>
        </div>

        {/* MOBILE OVERLAY DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className={`md:hidden absolute top-20 left-6 right-6 p-6 border shadow-2xl backdrop-blur-xl pointer-events-auto ${
                isEng
                  ? "bg-[#0A1210]/95 border-[#12261F] text-[#E8F5EF] rounded-none"
                  : "bg-[#FFFAF2]/95 border-[#E5D5C2] text-[#1E0F10] rounded-2xl"
              }`}
            >
              <div className="flex flex-col gap-4">
                {allNav.map((item) => {
                  const active = isLinkActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-base py-2 border-b flex items-center justify-between ${
                        isEng ? "border-[#12261F] font-mono" : "border-[#E5D5C2]"
                      } ${
                        active
                          ? isEng
                            ? "text-[#00FF9C] font-bold"
                            : "text-[#C8102E] font-bold"
                          : "opacity-80"
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span
                          className={`w-2 h-2 ${
                            isEng ? "bg-[#00FF9C]" : "bg-[#C8102E] rounded-full"
                          }`}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
