import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { WorldPill } from "@/components/navigation/WorldPill";
import { Header } from "@/components/navigation/Header";
import { PageTransitionOverlay } from "@/components/effects/PageTransitionOverlay";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://chris-portfolio.dev"),
  title: "Chris — Dual-Identity Portfolio | Engineer + The Red Studios",
  description:
    "Two connected personal sites: ECE Engineering & Hardware Systems, and The Red Studios Media & Creative Direction.",
  icons: {
    icon: "/assets/shared/favicon.png",
    shortcut: "/assets/shared/favicon.png",
    apple: "/assets/shared/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="engineer"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-FOUC script: synchronously sets data-theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var p = window.location.pathname;
                  var s = localStorage.getItem('chris-portfolio-world');
                  var m = 'engineer';
                  if (p.startsWith('/studio')) {
                    m = 'studio';
                  } else if (p.startsWith('/engineer')) {
                    m = 'engineer';
                  } else if (s === 'studio') {
                    m = 'studio';
                  }
                  document.documentElement.setAttribute('data-theme', m);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col relative selection:bg-[#00FF9C] selection:text-[#050807]">
        <ThemeProvider>
          <SmoothScroll>
            {/* Ambient Dynamic Background Particles & Bokeh */}
            <ParticleBackground />

            {/* Precision 60fps Custom Cursor */}
            <CustomCursor />

            {/* Smooth World & Page Transition Curtain */}
            <PageTransitionOverlay />

            {/* Transparent Shared Navigation Bar sitting over hero portrait */}
            <Header />

            {/* Main Application Shell */}
            <div className="relative z-10 flex-1 flex flex-col pt-16 md:pt-20">
              {children}
            </div>

            {/* Floating World Switcher Pill */}
            <WorldPill />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
