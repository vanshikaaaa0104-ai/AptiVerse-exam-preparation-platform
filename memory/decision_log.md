# 📜 Architecture Decision Records (ADRs)

> **Rule**: Append-only. Never edit or delete a prior entry. To reverse a decision, add a new ADR with status `Superseded by ADR-0XX` referencing the replacement.

---

## ADR-001: Adopt Memory-Augmented Multi-Agent Pipeline (v2.0)
- **Date**: 2026-08-30
- **Phase**: System Architecture (bootstrap)
- **Context**: The v1.0 pipeline required every agent to perform full-file reads of `Master_Blueprint.md` and other artifacts on every invocation — even for scoped one-line bugfixes. No mechanism existed to persist architectural decisions, compress cross-phase context, or account for token usage. This caused monotonically growing costs as the project matured.
- **Decision**: Introduce a persistent Memory Plane (`memory/`) with five components — `context_index.yaml` (pointer index), `decision_log.md` (this file), `session_briefs/` (per-phase digests), `token_ledger.csv` (usage accounting), and `cache/` (idempotent output reuse). Add a 9th persona `@memory_keeper` to own this plane. Enforce Axiom 6: Retrieval Over Re-reading with a configurable Context Budget Governor (starting at 4,000 tokens).
- **Alternatives considered**:
  - Embedding summaries directly in `Master_Blueprint.md` headers (rejected — conflates the spec artifact with operational metadata, and doesn't address cross-phase context passing).
  - Using only session_briefs without an index (rejected — briefs alone don't prevent full-file reads of large specs/schemas; the index is the mechanism that short-circuits those reads).
- **Status**: ✅ Accepted

---

## ADR-002: AptiVerse Competitive Exam Platform Stack & Zero-Leak Engine Architecture
- **Date**: 2026-09-06
- **Phase**: Ideation & Architecture (cycle-001)
- **Context**: AptiVerse requires an enterprise-grade platform supporting competitive exams (CAT, XAT, GMAT, etc.) with strict exam simulation fidelity, timed sections, TITA/MCQ questions, zero client-side answer exposure, and deep diagnostic analytics.
- **Decision**: Adopt Next.js 15+ (App Router), React 19, TypeScript, Tailwind CSS v4, Prisma ORM with SQLite for zero-config resilient local execution, Recharts for analytics, and Zustand/localStorage for test-state durability. Enforce server-side evaluation where correct options and solutions are never sent to the client during active attempts.
- **Alternatives considered**:
  - Pure Single Page App (Vite + Express) - rejected due to SEO limitations and duplicate server/client boilerplate compared to Next.js App Router.
  - Client-side test scoring - strictly rejected due to cheating risk and violation of Zero-Leak Security axiom.
- **Status**: ✅ Accepted

---

## ADR-003: Multi-Stage Containerization & Standalone SQLite Packaging
- **Date**: 2026-09-06
- **Phase**: Delivery & DevOps (cycle-001)
- **Context**: AptiVerse needs to be deployable across local environments, Docker hosts, and cloud runtimes with minimal image size and fast startup.
- **Decision**: Adopt a 3-stage Alpine-based Dockerfile (`base` → `deps` → `builder` → `runner`) running as non-root `nextjs` user. Package `dev.db` with volume mounts for persistent test data.
- **Alternatives considered**:
  - Single-stage heavy Node Debian image (rejected — image size > 1.2GB vs ~180MB).
- **Status**: ✅ Accepted

---

## ADR-004: Triple-Paradigm UI Architecture (Glassmorphism + Neumorphism + Bento Grid)
- **Date**: 2026-09-06
- **Phase**: Implementation & Architecture (cycle-002)
- **Context**: The platform UI needed a major visual uplift for learner retention, premium feel, and clear information hierarchy without introducing performance regressions or breaking backend contracts.
- **Decision**: Adopt a triple-paradigm visual system in Tailwind CSS v4 & React 19:
  1. Glassmorphism for ambient elevation (`backdrop-blur-xl`, luminous hairline borders, semi-transparent backgrounds).
  2. Neumorphism for physical interaction cues (dual-source shadow models, inset progress tracks, embossed stat pods).
  3. Bento Grid layout system for asymmetric information hierarchy with high data density across landing and dashboard surfaces.
  All backend routes, ORM schemas, and test engines remain completely untouched.
- **Alternatives considered**:
  - Full redesign with Tailwind UI / pre-built component kit (rejected — generic feel, violates brand identity and custom mock palette requirements).
  - Heavy canvas/WebGL 3D components (rejected — excessive bundle weight and accessibility degradation).
- **Status**: ✅ Accepted

---

## ADR-005: Dual-Mode Theme System (Light/Night) & Geometric Font Hierarchy
- **Date**: 2026-09-06
- **Phase**: Implementation & Architecture (cycle-003)
- **Context**: Aspirants study across varying lighting conditions (bright daytime study sessions and late-night mock drills). The default typography lacked optical distinction between display headings and dense passages.
- **Decision**:
  1. Implement a zero-dependency, hydration-safe theme system (`ThemeProvider.tsx` using `useSyncExternalStore` and inline anti-FOUC `<ThemeScript />`).
  2. Persist user preference to `localStorage` (`aptiverse_theme`) with auto-fallback to OS media query.
  3. Integrate Google Fonts: `Outfit` (display headings), `Plus Jakarta Sans` (UI & body reading), and `JetBrains Mono` (timers, math, telemetry).
  4. Adapt glassmorphism and neumorphism tokens for both light mode (frosted white surfaces, delicate slate borders, soft ambient drops) and dark mode (obsidian void, luminous hairline borders).
  5. Deconflict port 3000 by moving background MCP tools to port 3999 in `mcp_config.json`.
- **Alternatives considered**:
  - `next-themes` library (rejected — adds external dependency weight when a ~60-line pure React 19 `useSyncExternalStore` store provides cleaner zero-warning performance).
  - System font fallbacks (rejected — lacks visual memorability and brand identity).
- **Status**: ✅ Accepted

---

## ADR-006: Accessible Glassmorphism Visual Language & Light-Mode Contrast Architecture
- **Date**: 2026-09-06
- **Phase**: Implementation & Architecture (cycle-004)
- **Context**: The `/admin` dashboard and layout shells exhibited a critical light-mode contrast failure in the left sidebar where nav labels, section headers, icons, and badges used dark-mode tokens that washed out against light backgrounds. Furthermore, surfaces were inconsistently flat and contained hardcoded dark islands (bottleneck rows, progress tracks).
- **Decision**:
  1. Define semantic navigation tokens in `:root` and `.dark` (`--sidebar-text-primary`, `--sidebar-text-secondary`, `--sidebar-icon`, `--sidebar-section-label`) with guaranteed WCAG 2.1 AA compliance ($\ge 4.5:1$ text, $\ge 3.0:1$ icons) measured against the composite blurred glass background.
  2. Implement a unified glassmorphism design system (`.glass-panel`, `.glass-card`, `.glass-nested`, `.glass-track`, `.glass-input`) with 1px hairlines, 20px blur, 150% saturation, and soft drop elevation.
  3. Resolve dark islands via intentional nested glass tiers: bottleneck rows convert to `.glass-nested` elevated tiers, and exam progress tracks convert to `.glass-track` translucent recessed grooves.
  4. Inject an ambient background canvas gradient and soft blurred color blobs in `AppShell` to guarantee rich optical depth and light refraction behind all frosted surfaces.
  5. Add `@custom-variant dark (&:where(.dark, .dark *));` to `globals.css` ensuring Tailwind v4 `dark:` variants cleanly adhere to the `.dark` class state independently of OS preferences.
  6. Add `@supports not (backdrop-filter)` and `@media (prefers-reduced-transparency: reduce)` fallbacks with solid high-contrast surfaces.
- **Alternatives considered**:
  - Pure flat opaque surfaces in light mode (rejected — breaks design cohesion and eliminates the brand's premium frosted glass aesthetic).
  - Arbitrary hex color overrides per component (rejected — creates maintenance debt and future contrast regressions).
- **Status**: ✅ Accepted

---

## ADR-007: Universal Font Contrast Uplift & Dynamic Ambient Canvas Gradient Architecture
- **Date**: 2026-09-06
- **Phase**: Implementation & Architecture (cycle-005)
- **Context**: Subtitles, metadata tags, Recharts axis labels, dialog text, and secondary button styles across the platform suffered from low-contrast failures in both light mode (where `text-slate-400`/`text-slate-500` rendered at $<3:1$ contrast against light glass surfaces) and dark mode (where muted text on dark glass cards appeared washed out). Concurrently, the platform canvas sat on flat solid `--background` fills, preventing frosted glass panels from refracting luminous color and depth.
- **Decision**:
  1. Establish a multi-stop fixed ambient gradient canvas (`--bg-canvas`) on `body` featuring a radiant warm pastel aurora in light mode and a deep cosmic aurora in dark mode, coupled with fixed ambient glowing refraction orbs (`ambient-orb-indigo`, `ambient-orb-blue`, `ambient-orb-purple`, `ambient-orb-rose`, `ambient-orb-teal`).
  2. Switch root app layout wrappers (`AppShell.tsx`, `page.tsx`) from `bg-background` to `bg-transparent` so the fixed ambient gradient canvas directly illuminates and refracts through all frosted glass panels with zero layout shifts.
  3. Upgrade global muted text tokens in `globals.css`: `--muted-foreground` to `#334155` (light mode 8.9:1) and `#cbd5e1` (dark mode 10.2:1), accompanied by global contrast safeguards ensuring legacy utility classes (`text-slate-400`, `text-slate-500`) automatically comply with WCAG 2.1 AA standards.
  4. Refactor `Button` variants (`secondary`, `outline`, `ghost`, `glass`) and `Dialog` components (`DialogContent`, `DialogTitle`, `DialogDescription`) to eliminate hardcoded dark-mode text classes and ensure complete dual-theme contrast adaptation.
  5. Calibrate Recharts axis tick strokes and legend labels in `src/app/dashboard/page.tsx` for crisp visibility in both themes.
- **Alternatives considered**:
  - Full rewrite of every component page (rejected — violates surgical iteration protocol and increases regression risk).
  - Heavy canvas WebGL shaders (rejected — excess battery consumption, mobile stutter, bundle overhead).
- **Status**: ✅ Accepted




