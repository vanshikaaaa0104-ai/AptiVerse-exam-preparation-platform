# 🎨 AptiVerse Design System & Visual Identity

> **Target Platform**: AptiVerse Intelligent Exam Preparation Platform  
> **Aesthetic Theme**: Modern Dark Glassmorphism, Tactile Neumorphism & Asymmetric Bento Grid  
> **Status**: Approved & Implemented (Cycle-002 Upgrade)

---

## 1. Design Philosophy & Triple-Paradigm Integration

The AptiVerse design system harmonizes three distinct design languages into a cohesive, high-performance web interface:

1. **Glassmorphism (Atmosphere & Elevation)**:
   - High-translucency frosted glass surfaces (`backdrop-blur-xl`, `backdrop-blur-2xl`).
   - Semi-transparent fills (`rgba(255, 255, 255, 0.03)` to `0.07`).
   - Luminous hairline borders (`border-white/[0.08]` to `border-white/[0.15]`).
   - Floating ambient gradient orbs creating deep atmospheric lighting behind content.

2. **Neumorphism (Tactility & Focus)**:
   - Soft dual-source 3D shadow models (`box-shadow: 4px 4px 10px rgba(0,0,0,0.4), -2px -2px 6px rgba(255,255,255,0.04)`).
   - Inset carved shadows (`.neu-inset`) for progress bar tracks, search bars, and counters.
   - Raised embossed surfaces (`.neu-raised`, `.neu-stat`, `.neu-icon`) for metric pods and actionable cards.
   - Micro-tactile press reactions (`active:scale-[0.97]` and dynamic inner shadows).

3. **Bento Grid (Structure & Information Hierarchy)**:
   - Asymmetric multi-span magazine grid layouts (`.bento-grid`).
   - High-information-density metric cards with distinct visual weights (`.bento-hero`, `.bento-side`, `.bento-tall`, `.bento-wide`).
   - Responsive breakpoints (1 col on mobile, 2 on tablet, 3-4 on desktop).

---

## 2. Color Palette & Semantic Tokens

### Base Surface & Backgrounds
- **Dark Mode Primary Surface**: `#090D16` (Deep Obsidian Void)
- **Glass Card Background**: `rgba(255, 255, 255, 0.03)` with `backdrop-filter: blur(16px)`
- **Glass Subtle Background**: `rgba(255, 255, 255, 0.02)`
- **Glass Sidebar / Topbar**: `rgba(15, 23, 42, 0.75)` with `backdrop-blur-2xl`
- **Luminous Border**: `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.15)`

### Brand & Semantic Accents
- **Primary Brand Indigo**: `#6366F1` (`indigo-500` / `indigo-600`) — Primary CTA, focus rings, glow auras
- **Secondary Violet Accent**: `#8B5CF6` (`violet-500`) — Mastery badges, milestone achievements
- **Success Emerald**: `#10B981` (`emerald-500`) — Correct answers, completed milestones
- **Warning Amber**: `#F59E0B` (`amber-500`) — Review flags, urgent timer countdowns
- **Error Rose**: `#F43F5E` (`rose-500`) — Mistakes, unattempted indicators
- **Sky & Cyan**: `#06B6D4` (`cyan-500`) — Speed telemetry, accuracy quadrant graphs

---

## 3. CSS Utility Classes (`globals.css`)

### Glassmorphism Utilities
| Class | CSS Properties | Usage |
|---|---|---|
| `.glass` | `backdrop-blur-md bg-white/[0.04] border-white/[0.08]` | Generic frosted panels |
| `.glass-card` | `backdrop-blur-xl bg-white/[0.03] border-white/[0.08] shadow-2xl hover:border-white/[0.15]` | Primary dashboard & catalog cards |
| `.glass-subtle` | `backdrop-blur-sm bg-white/[0.02] border-white/[0.05]` | Nested inner panels, table rows |
| `.glass-sidebar` | `backdrop-blur-2xl bg-slate-950/80 border-r-white/[0.08]` | Primary navigation sidebar |
| `.glass-topbar` | `backdrop-blur-xl bg-slate-950/70 border-b-white/[0.08]` | Sticky top navigation bar |
| `.glass-input` | `backdrop-blur-md bg-white/[0.04] border-white/[0.10]` | Form inputs and global search |

### Neumorphic Utilities
| Class | Properties / Shadow Model | Usage |
|---|---|---|
| `.neu-raised` | `box-shadow: 4px 4px 10px rgba(0,0,0,0.4), -2px -2px 6px rgba(255,255,255,0.04)` | Elevated actionable cards |
| `.neu-inset` | `box-shadow: inset 2px 2px 5px rgba(0,0,0,0.5), inset -1px -1px 3px rgba(255,255,255,0.03)` | Progress tracks, input wells |
| `.neu-flat` | Subtle border and background elevation | Nav items, toolbar buttons |
| `.neu-icon` | Rounded embossed tile with gradient border | Category and section icons |
| `.neu-stat` | Embossed stat pod with gradient depth | KPI counter containers |

### Bento Grid System
| Class | Grid Coordinates | Purpose |
|---|---|---|
| `.bento-grid` | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4` | Bento layout container |
| `.bento-hero` | `md:col-span-2 md:row-span-2` | Main featured tile (Readiness, Key Exam) |
| `.bento-tall` | `md:row-span-2` | Vertical tile (Daily Goals, Leaderboard) |
| `.bento-wide` | `md:col-span-2` | Horizontal tile (Accuracy Trend, Recent Activity) |
| `.bento-half` | `md:col-span-2` | Half-width section container |
| `.bento-third`| `lg:col-span-1` | Single unit KPI block |

---

## 4. UI Primitives Specification

- **Card (`card.tsx`)**: Default styling adopts `.glass-card` with hover elevation and subtle border luminosity.
- **Button (`button.tsx`)**: Includes new `glass` variant, animated accent shimmers, and tactile `active:scale-[0.97]` click physics.
- **Badge (`badge.tsx`)**: Translucent tinted pill with `backdrop-blur-sm`, semantic glow shadow, and crisp typography.
- **Progress (`progress.tsx`)**: `.neu-inset` track with rounded glowing gradient indicator bar.
- **Sidebar & Topbar**: Frosted-glass shells with smooth route transitions and active indicator glows.
