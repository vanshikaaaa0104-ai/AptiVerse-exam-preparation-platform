# AptiVerse Phased Development Plan & Verification Roadmap

## 1. Engineering Principles & Phased Rollout Strategy

AptiVerse follows a strict phased implementation model. At the conclusion of every phase, the application must remain 100% buildable, type-safe, runnable, and verifiable.

```
PHASE 0: Foundations & Architecture Specs (Completed)
   │
   ▼
PHASE 1: Project Initialization, Design Tokens & App Shell
   │
   ▼
PHASE 2: Database Modeling, Prisma ORM, Exam Configs & Seed Engine
   │
   ▼
PHASE 3: Student Dashboard, Exam Catalog & Concept Learning Engine
   │
   ▼
PHASE 4: Practice Question Bank, Zero-Leak Quiz Engine & Solution Viewer
   │
   ▼
PHASE 5: Full Mock Engine, Sectional Rules & Server-Side Scoring
   │
   ▼
PHASE 6: Server-Side Analytics, Topic Mastery & Recommendation Engine
   │
   ▼
PHASE 7: Gamification, Streaks, Mistake Book & Bookmarks
   │
   ▼
PHASE 8: Admin Management, Question Authoring & 4-Stage Verification Queue
   │
   ▼
PHASE 9: AI Concept Explanation & Remediation Hints
   │
   ▼
PHASE 10: End-to-End Verification, Performance, Accessibility & Mobile Polish
```

---

## 2. Detailed Phase Specifications

### Phase 0: Research, License Review & Technical Documentation
- **Deliverables**:
  - `/docs/reference-repos.md` (10 repo pattern breakdown & license audit)
  - `/docs/exam-verification.md` (Verified exam blueprints: CAT, XAT, SNAP, NMAT, CMAT, MAT, MAH CET)
  - `/docs/topic-taxonomy.md` (Unified Knowledge Graph & subject mapping)
  - `/docs/architecture.md` (System design, domain engines, zero-leak quiz flow)
  - `/docs/database.md` (Prisma relational schema & indexing strategy)
  - `/docs/routes.md` (Complete route map & access permissions)
  - `/docs/design-system.md` (Design tokens, color system, component guidelines)
  - `/docs/development-plan.md` (Phased implementation roadmap)
- **Status**: Completed & Documented.

---

### Phase 1: Project Setup, Design Tokens, App Shell & Authentication
- **Deliverables**:
  - Scaffold Next.js application with TypeScript, Tailwind CSS, Lucide React, and Framer Motion.
  - Setup core design tokens in `globals.css` (primary indigo/violet, electric blue, emerald success, amber warning, dark mode palette).
  - Build responsive `AppShell` with desktop `Sidebar`, sticky header with streak/XP chips, search palette trigger, and thumb-friendly `MobileNav`.
  - Implement authentication infrastructure with role-based access control (Student vs Admin/Reviewer).
  - Setup public landing page with interactive hero, exam cards, and feature highlights.
- **Verification Gate**:
  - `npm run build` succeeds without type errors.
  - Responsive shell verified across mobile (375px), tablet (768px), and desktop (1440px).

---

### Phase 2: Database Schema, Prisma Setup & Comprehensive Exam Seeding
- **Deliverables**:
  - Configure Prisma schema with all 22 relational models and indexed fields.
  - Build robust seed engine creating verified exam configurations for all 7 exams (CAT, XAT, SNAP, NMAT, CMAT, MAT, MAH MBA CET).
  - Seed canonical Knowledge Graph: Quant (Arithmetic, Algebra, Geometry, Number System, Modern Math), DILR, VARC, and exam-specific subjects (XAT DM, CMAT Innovation, MAT Economy, MAH CET Abstract Reasoning).
  - Seed high-quality verified questions with step-by-step solutions, shortcuts, concept tags, and common traps.
  - Seed realistic demo student profile with historical attempts, streaks, and progress.
- **Verification Gate**:
  - `prisma generate` and seed script execute cleanly.
  - Relations and indexes verified.

---

### Phase 3: Student Dashboard, Exam Catalog & Concept Learning Engine
- **Deliverables**:
  - Implement primary Bento-grid `/dashboard` (Daily Goal progress ring, active streak counter, target exam progress breakdown, weak area warnings, Next Best Action widget).
  - Build `/exams` directory and `/exams/[examSlug]` dynamic blueprint pages with official duration, marking schemes, section rules, and syllabus trees.
  - Build `/learn`, `/learn/[sectionSlug]`, and `/learn/[sectionSlug]/[topicSlug]` concept reader with formula sheets, trap breakdowns, and one-click practice launch.
- **Verification Gate**:
  - Dashboard dynamically updates based on active target exam.
  - Concept navigation renders theory and formula cards cleanly.

---

### Phase 4: Practice Question Bank, Zero-Leak Quiz Engine & Solution Viewer
- **Deliverables**:
  - Build practice selector `/practice` (Topic drills, Weak area drills, Custom quiz builder, Daily challenge).
  - Build `/quiz/[quizId]` live test interface:
    - Zero client answer leakage (answers evaluated only on server).
    - Question palette with 5 states (`NOT_VISITED`, `SKIPPED`, `ANSWERED`, `MARKED_FOR_REVIEW`, `ANSWERED_AND_MARKED`).
    - Resilient timer with amber/red alert thresholds.
    - Local optimistic updates + debounced autosave.
  - Build `/quiz/[quizId]/result` solution review:
    - Score summary card.
    - 4-part solution viewer: Detailed Derivation, Shortcut/Elimination, Concept Tested, Common Trap.
- **Verification Gate**:
  - Quiz submits and scores accurately on server.
  - Solutions are invisible during test and visible post-submission.

---

### Phase 5: Full Mock Engine, Sectional Rules & Server-Side Scoring
- **Deliverables**:
  - Build `/mocks` catalog and `/mocks/[mockId]/instructions` verification screen.
  - Build `/mocks/[mockId]/attempt` full exam simulator:
    - Support CAT-style strict 40-minute section locks without backward jumping.
    - Support XAT/SNAP/CMAT free inter-sectional navigation.
    - Server-side timer validation and auto-submission upon timeout.
  - Implement full scoring engine:
    - Differential scoring ($+3/-1$, $+4/-1$, $+1/-0.25$, $+1/0$).
    - Special rules (XAT unattempted question deduction beyond 8 skips).
    - TITA zero-negative scoring.
  - Build `/mocks/[mockId]/result` comprehensive analytics with sectional score cards, time per question telemetry, and estimated percentiles.
- **Verification Gate**:
  - Mock engine adheres to all exam-specific time and scoring rules.

---

### Phase 6: Server-Side Analytics, Topic Mastery & Recommendation Engine
- **Deliverables**:
  - Build `/analytics` overview (Score trends, accuracy trends, average pace vs benchmark).
  - Build `/analytics/topics` interactive mastery heatmap (Level 1 to Level 5 mastery).
  - Build `/analytics/speed` solving pace diagnostic chart.
  - Implement deterministic **Next Best Action Engine**:
    - Automatic weak topic flagging ($<60\%$ accuracy).
    - Remediation action prompts ("Revise Concept $\rightarrow$ Solve 10 Medium Questions").
    - Spaced repetition refresher prompts.
- **Verification Gate**:
  - Analytics accurately recalculate after quiz and mock submissions.

---

### Phase 7: Gamification, Streaks, Mistake Book & Bookmarks
- **Deliverables**:
  - Build `/mistakes` (Mistake Book) allowing students to filter questions by topic, retry incorrect problems, and mark them resolved.
  - Build `/bookmarks` repository with search, topic filtering, and custom notes.
  - Build `/leaderboard` (Weekly XP rankings and mock test percentiles).
  - Build `/achievements` trophy case (XP rewards, streak milestones, mastery badges).
- **Verification Gate**:
  - Resolving a mistake updates its status in the Mistake Book.
  - XP awards and streak increments trigger accurately.

---

### Phase 8: Admin Management, Question Authoring & 4-Stage Verification Queue
- **Deliverables**:
  - Build `/admin` dashboard with system-wide health and content statistics.
  - Build `/admin/questions` table with advanced filters (Exam, Section, Topic, Difficulty, Status).
  - Build `/admin/questions/new` multi-step question authoring studio (LaTeX support, options builder, solutions, shortcuts, traps, source recording).
  - Build `/admin/verification` 4-stage audit queue (`DRAFT` $\rightarrow$ `REVIEW` $\rightarrow$ `VERIFIED` $\rightarrow$ `PUBLISHED`) with multi-point validation checklists.
  - Build `/admin/mock-tests` builder for assembling full mocks and sectional tests.
- **Verification Gate**:
  - Draft questions are strictly prevented from appearing in public practice sets until marked `VERIFIED`.

---

### Phase 9: AI Concept Explanation & Remediation Hints
- **Deliverables**:
  - Implement contextual explanation assistant for incorrect choices.
  - Add instant step-by-step hint reveals during practice mode.
  - Generate personalized diagnostic learning summaries based on recent attempt patterns.
- **Verification Gate**:
  - AI responses provide clear mathematical reasoning and point back to canonical concepts.

---

### Phase 10: End-to-End Verification, Performance, Accessibility & Mobile Polish
- **Deliverables**:
  - Comprehensive automated unit and integration tests (Scoring, Negative Marking, Timers, RBAC).
  - WCAG 2.1 AA accessibility audit (Screen readers, ARIA labels, keyboard navigation).
  - Lighthouse performance audit (Fast TTFB, minimal bundle size, smooth animations).
  - Final mobile usability pass for 100% ergonomic thumb-zone control.
- **Verification Gate**:
  - All test suites pass with zero regressions.
  - Production build generates cleanly.
