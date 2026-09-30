# Chris — Dual-Identity Portfolio
### ECE Systems Engineering & Hardware Architecture &times; THE RED STUDIOS

A high-performance personal exhibition built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **GSAP**, and **Lenis Smooth Scroll**.

Two interconnected digital worlds under one unified domain, seamlessly transitioned via an 800ms circular iris pill switcher.

---

## ⚡ How to View the Project

### Option A: One-Click Launcher (Windows)
Double-click [`view.bat`](file:///c:/Extacuricular/Antigravity/CHR%202.1/view.bat) in the project root directory. It automatically starts the server and opens `http://localhost:3000` in your browser.

### Option B: Interactive Launchpad
Open [`view.html`](file:///c:/Extacuricular/Antigravity/CHR%202.1/view.html) directly in any browser for clickable route cards into both worlds.

### Option C: Terminal Commands
```bash
npm run dev
# Or on Windows PowerShell:
cmd /c "npm run dev"
```
Then visit **[http://localhost:3000](http://localhost:3000)**.

---

## 🗺️ Exhibition Map & Routes

| World | Route | Purpose & Key Features |
|---|---|---|
| **Engineer** | `/engineer` (or `/`) | Cybernetic landing hero with 60 FPS X-Ray cursor-reveal, hardware specs, WhatsApp comm |
| **Engineer** | `/engineer/about` | Bio, photo block with anchored soft green glow, Three-Lane Identity breakdown |
| **Engineer** | `/engineer/journey` | Scroll-drawn circuit-trace timeline connecting milestones via animated solder vias |
| **Engineer** | `/engineer/works` | SDM Hackathon, VVCE Connect, RDX 3.0, DAQ with interactive in-page deep-dive modals |
| **Engineer** | `/engineer/certification` | Scannable credential vault with category filtering (All, Certifications, Hackathons) |
| **Studio** | `/studio` | Ivory aesthetic landing hero, sacred mandala X-Ray reveal, cinematic direction |
| **Studio** | `/studio/about` | Bio, RED (Motion/Film) & CYAN (Brand Architecture) division breakdown, ICYM spotlight |
| **Studio** | `/studio/journey` | Filmstrip timeline with golden aperture mandala nodes and unrolling production briefs |
| **Studio** | `/studio/works` | Full-bleed dark viewing gallery (`#0C0809`) framed by ivory, documentary spotlight |
| **Studio** | `/studio/designs` | CYAN design suite with discipline filters (Branding, Editorial, UI/UX, Spatial) |

---

## 🌟 Interactive Signature Features

1. **Floating World Pill Switcher**:
   - Fixed at bottom-center of every viewport.
   - Triggers an 800ms circular iris transition from the pill's exact coordinate:
     - **Engineer → Studio**: Closes with green accent, opens with a cinematic focus-pull (blur to sharp).
     - **Studio → Engineer**: Closes with crimson accent, opens with outward circuit traces and a single top-to-bottom scanline sweep.
   - Preserves sub-paths across worlds (e.g. `/engineer/works` ↔ `/studio/works`).

2. **60 FPS Cursor-Reveal X-Ray**:
   - Hover over the portrait on desktop to reveal hidden circuit traces (Engineer) or sacred mandala geometry (Studio) with an orbiting spark on the rim.
   - Mobile tap-and-hold spreads the mask outward at the touch point and smoothly auto-fades after ~1.5s.

3. **In-World Transitions**:
   - Internal navigation runs lightweight, custom micro-transitions: animated inward cybernetic circuit lines (Engineer) or blooming mandala lines (Studio).

4. **Performance & Accessibility**:
   - Canvas particle drift and cursor tracking pause automatically when the tab is hidden (`visibilitychange`).
   - Degrades gracefully on low-power devices and respects `prefers-reduced-motion: reduce`.
   - Comprehensive dynamic SEO with per-world OpenGraph cards, `/sitemap.xml`, and `/robots.txt`.
