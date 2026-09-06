# Feature Update Spec: Universal Font Contrast Uplift & Ambient Gradient Mesh Canvas

**Cycle**: cycle-005  
**Target Feature**: Dual-Theme Font Legibility & Dynamic Gradient Backgrounds  
**Author**: @pm (Product Manager)  
**Status**: DRAFT (Pending Architectural Review & User Approval)  

---

## 1. Problem Statement & User Pain Points
1. **Low-Contrast Font Failures in Both Themes**:
   - In **Light Mode**: Numerous UI elements across the Dashboard, Admin, Landing Page, Study Plan, and Topbar use hardcoded `text-slate-400` (`#94a3b8`) or `text-slate-500` (`#64748b`). Against light card surfaces (`rgba(255,255,255,0.72)` or `#f8fafc`), `#94a3b8` yields an unreadable **2.45:1 contrast ratio**, failing WCAG AA (minimum 4.5:1).
   - In **Dark Mode**: Muted text in `text-slate-400` on translucent dark glass surfaces (`rgba(15,23,42,0.68)`) appears washed out, dim, and difficult to parse, particularly for small labels (`text-[10px]`, `text-[11px]`, and chart axis ticks).
   - In **Quick Search & Modals**: Hardcoded dark background classes (`bg-slate-900/80`, `text-slate-200`) inside light modals create jarring visual inconsistencies and illegible text.
2. **Flat Background Canvas Lacking Depth**:
   - The body canvas currently falls back to a flat solid color (`#f8fafc` in light, `#060a13` in dark). Without background color variance, frosted glass panels (`backdrop-filter: blur(...)`) cannot refract depth or ambient color, making the UI feel sterile rather than captivating.

---

## 2. User Stories & Acceptance Criteria

### User Story 1: Effortless Readability Across Light & Dark Themes
> *As an exam aspirant studying in either bright daytime light or late-night dark mode, I want every label, subtitle, chart axis, metadata timestamp, and badge to be razor-sharp and effortlessly legible, so that my eyes do not strain during long study sessions.*

**Acceptance Criteria**:
- **AC 1.1**: All primary text achieves $\ge 12:1$ contrast ratio against its composite card/page background in both themes.
- **AC 1.2**: All secondary, muted, and metadata text achieves $\ge 4.5:1$ (WCAG 2.1 AA compliant) contrast ratio in both themes.
- **AC 1.3**: In `globals.css`, define high-contrast token defaults for `:root` (`--muted-foreground: #334155`) and `.dark` (`--muted-foreground: #cbd5e1`).
- **AC 1.4**: Add a global CSS contrast safeguard in `globals.css` ensuring any legacy `text-slate-400` or `text-slate-500` renders with crisp, calibrated contrast in both themes.
- **AC 1.5**: Update Recharts axis tick strokes and tooltip text in `src/app/dashboard/page.tsx` so charts are clear in both light and dark modes.

### User Story 2: Captivating Ambient Gradient Canvas
> *As a user navigating AptiVerse, I want a modern, dynamic, aesthetically rich gradient background that responds to my theme, so that the frosted glass cards feel luminous, alive, and state-of-the-art.*

**Acceptance Criteria**:
- **AC 2.1**: **Light Mode Canvas**: Multi-stop luminous ambient gradient mesh (`--bg-canvas`) combining subtle warm indigo, radiant violet, and soft sky-cyan radial accents over an ethereal off-white base with `background-attachment: fixed`.
- **AC 2.2**: **Dark Mode Canvas**: Deep cosmic aurora mesh combining rich indigo glow (`rgba(79, 70, 229, 0.22)`), deep violet nebula (`rgba(147, 51, 234, 0.16)`), and oceanic cyan highlights (`rgba(14, 165, 233, 0.14)`) over an obsidian void.
- **AC 2.3**: `AppShell.tsx` and `src/app/page.tsx` (Landing) feature synchronized ambient floating orbs with smooth CSS float animations (`ambient-orb`) that refract beautifully through glass panels.
- **AC 2.4**: Background gradients are rendered with `pointer-events-none`, `z-0`, hardware-accelerated CSS transforms, and zero layout shift or scrolling stutter.
- **AC 2.5**: Full accessibility fallback (`prefers-reduced-motion` and `prefers-reduced-transparency`) preserved.

---

## 3. Impact Analysis & Scope of Modification

| Component / File | Current State | Target Enhancement |
|---|---|---|
| `src/app/globals.css` | Flat `--background` solid colors; `--muted-foreground` calibrated at `#475569` (light) / `#94a3b8` (dark) | Add `--bg-canvas` mesh for `:root` and `.dark`; upgrade `--muted-foreground` to `#334155` (light) and `#cbd5e1` (dark); add theme contrast safeguards for secondary/muted text; refine ambient orbs. |
| `src/components/layout/AppShell.tsx` | Ambient orbs present but low opacity; no fixed canvas mesh | Add radiant dual-mode ambient mesh layer; fine-tune orb positions and colors for maximum refraction through frosted glass. |
| `src/app/dashboard/page.tsx` | Multiple subtitles and telemetry labels use `text-slate-500 dark:text-slate-400`; Recharts axes hardcoded to `#64748b` | Elevate subtitles to `text-slate-700 dark:text-slate-300`; update Recharts axes to theme-aware high-contrast strokes (`#475569` light / `#94a3b8` dark). |
| `src/app/page.tsx` (Landing) | Has floating orbs but uses flat `bg-background`; some small labels use `text-slate-500` | Apply ambient gradient canvas; elevate label contrast across hero, bento exam cards, and methodology sections. |
| `src/components/layout/Topbar.tsx` | Search modal uses hardcoded `bg-slate-900/80` and `text-slate-200` in light mode; trigger button text contrast low | Modernize search modal to use glass-nested tokens and high-contrast text in both themes. |
| `src/components/ui/card.tsx` | `CardDescription` uses `text-slate-600 dark:text-slate-400` | Upgrade to `text-slate-700 dark:text-slate-300` for crisp legibility. |
