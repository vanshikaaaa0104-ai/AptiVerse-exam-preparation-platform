# AptiVerse Design System & Component Guidelines

## 1. Visual Philosophy & Identity

AptiVerse delivers a sophisticated, motivation-inducing SaaS aesthetic matching top-tier tools like Linear, Notion, and Raycast. The design rejects cluttered coaching institute templates in favor of crisp typography, intentional whitespace, subtle elevation, and purposeful micro-interactions.

---

## 2. Design Tokens & Color System

```
                  ┌──────────────────────────────────────────────┐
                  │            APTIVERSE COLOR PALETTE           │
                  └──────────────────────────────────────────────┘

     PRIMARY (Indigo/Violet)       SECONDARY (Electric Blue)      SUCCESS (Emerald)
   ┌──────────────────────────┐  ┌──────────────────────────┐  ┌──────────────────────────┐
   │ 500: #6366f1             │  │ 500: #3b82f6             │  │ 500: #10b981             │
   │ 600: #4f46e5 (Brand)     │  │ 600: #2563eb             │  │ 600: #059669             │
   │ 700: #4338ca             │  │ 700: #1d4ed8             │  │ 700: #047857             │
   └──────────────────────────┘  └──────────────────────────┘  └──────────────────────────┘

     WARNING (Amber)               ERROR (Rose/Red)              SURFACES (Dark / Light)
   ┌──────────────────────────┐  ┌──────────────────────────┐  ┌──────────────────────────┐
   │ 500: #f59e0b             │  │ 500: #ef4444             │  │ Light: #ffffff / #f8fafc │
   │ 600: #d97706             │  │ 600: #dc2626             │  │ Dark:  #0b0f19 / #0f172a │
   │ 700: #b45309             │  │ 700: #b91c1c             │  │ Border: #e2e8f0 / #1e293b│
   └──────────────────────────┘  └──────────────────────────┘  └──────────────────────────┘
```

### 2.1 CSS Variables (Light & Dark Themes)

```css
:root {
  /* Brand Tokens */
  --primary: 239 84% 67%;          /* #6366f1 */
  --primary-foreground: 0 0% 100%;
  --primary-hover: 243 75% 59%;    /* #4f46e5 */
  
  --secondary: 217 91% 60%;        /* #3b82f6 */
  --secondary-foreground: 0 0% 100%;
  
  --success: 160 84% 39%;          /* #10b981 */
  --success-foreground: 0 0% 100%;
  --success-muted: 152 76% 96%;
  
  --warning: 38 92% 50%;           /* #f59e0b */
  --warning-foreground: 0 0% 100%;
  --warning-muted: 48 96% 95%;
  
  --destructive: 0 84% 60%;        /* #ef4444 */
  --destructive-foreground: 0 0% 100%;
  
  /* Surfaces & Backgrounds */
  --background: 210 40% 98%;       /* #f8fafc */
  --foreground: 222 47% 11%;       /* #0f172a */
  --card: 0 0% 100%;               /* #ffffff */
  --card-foreground: 222 47% 11%;
  --popover: 0 0% 100%;
  --popover-foreground: 222 47% 11%;
  
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 239 84% 67%;
  --radius: 0.75rem; /* 12px */
}

.dark {
  --background: 224 71% 4%;        /* #080c14 - Deep night */
  --foreground: 210 40% 98%;       /* #f8fafc */
  --card: 224 45% 8%;              /* #0e1422 - Elevated slate */
  --card-foreground: 210 40% 98%;
  --popover: 224 45% 8%;
  --popover-foreground: 210 40% 98%;
  
  --primary: 239 84% 67%;          /* #6366f1 */
  --primary-foreground: 0 0% 100%;
  --primary-hover: 243 75% 59%;
  
  --secondary: 217 91% 60%;
  --secondary-foreground: 0 0% 100%;
  
  --success: 160 84% 39%;
  --warning: 38 92% 50%;
  --destructive: 0 62.8% 30.6%;
  
  --muted: 223 47% 12%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 223 47% 14%;
  --accent-foreground: 210 40% 98%;
  
  --border: 223 47% 14%;
  --input: 223 47% 14%;
  --ring: 239 84% 67%;
}
```

### 2.2 Question Palette State Tokens

| Palette State | Background Token | Border Token | Text Token | Icon / Indicator |
|---|---|---|---|---|
| `NOT_VISITED` | `bg-muted/40` | `border-border` | `text-muted-foreground` | Simple number badge |
| `SKIPPED` | `bg-amber-500/10` | `border-amber-500/40` | `text-amber-600 dark:text-amber-400` | Amber outline |
| `ANSWERED` | `bg-emerald-500` | `border-emerald-600` | `text-white font-semibold` | Solid emerald |
| `MARKED_FOR_REVIEW` | `bg-violet-500/15` | `border-violet-500` | `text-violet-600 dark:text-violet-400` | Violet circular ring |
| `ANSWERED_AND_MARKED` | `bg-violet-600` | `border-emerald-400` | `text-white font-semibold` | Violet badge with emerald dot |

---

## 3. Typography & Spacing Hierarchy

- **Primary Font**: `Inter` / `Plus Jakarta Sans` with fallback to `system-ui, -apple-system, sans-serif`.
- **Display Scale**:
  - `Display / Hero`: `text-4xl sm:text-5xl font-extrabold tracking-tight`
  - `H1 / Page Title`: `text-2xl sm:text-3xl font-bold tracking-tight text-foreground`
  - `H2 / Section Title`: `text-xl sm:text-2xl font-semibold tracking-tight text-foreground`
  - `H3 / Card Title`: `text-base sm:text-lg font-semibold text-foreground`
  - `Body`: `text-sm sm:text-base leading-relaxed text-muted-foreground`
  - `Caption / Monospace`: `text-xs font-mono tracking-wide text-muted-foreground`
- **Elevation & Radius**:
  - Cards: `rounded-2xl border bg-card p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200`
  - Badges & Buttons: `rounded-lg sm:rounded-xl`
  - Inputs & Selects: `rounded-xl border bg-background/50 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-primary/20`

---

## 4. Reusable Component Inventory

1. **`AppShell`**: Unified responsive layout with persistent desktop left sidebar, top progress bar, search trigger (`⌘K`), streak indicator, and mobile bottom navigation dock.
2. **`Sidebar`**: Collapsible navigational spine with categorized sections (Learn, Practice, Mock Tests, Analytics, Mistakes, Bookmarks, Gamification, Admin).
3. **`MobileNav`**: Ergonomic bottom tab bar for thumb-zone navigation (Home, Practice, Mocks, Analytics, Profile).
4. **`ExamCard`**: Rich visual card displaying exam badge, conducting body, total questions, duration, and verified status indicator.
5. **`ProgressCard`**: Bento widget visualizing daily goal completion ring, active streak flame, and XP level.
6. **`WeakTopicCard`**: Remediation card displaying topic accuracy, struggle duration, and a one-click **"Revise & Drill"** CTA.
7. **`RecommendationCard`**: Priority-driven actionable prompt explaining *why* the task is suggested.
8. **`QuestionCard`**: Accessible question display supporting rich formatting, LaTeX formulas, passage side-by-side view, and TITA input fields.
9. **`AnswerOption`**: Interactive MCQ choice component with clear hover state, selected indigo border, and radio/checkbox indicator.
10. **`QuestionPalette`**: Interactive grid for jumping between questions with instant visual status feedback and filter tabs (All, Answered, Marked, Unvisited).
11. **`Timer`**: Resilient countdown display with remaining time alert states (Normal $\rightarrow$ Amber at $<5$ min $\rightarrow$ Pulsing Red at $<1$ min).
12. **`SolutionPanel`**: 4-part solution viewer (Detailed Derivation, Shortcut/Elimination Method, Concept Tested, Common Trap/Distractor Breakdown).
13. **`MasteryHeatmap`**: Grid visualization mapping student proficiency across all topics from Level 1 (Needs Practice) to Level 5 (Mastered).
14. **`VerificationPanel`**: Admin inspection screen with multi-point validation checklist and one-click status transitions (`Draft` $\rightarrow$ `Review` $\rightarrow$ `Verified`).
15. **`EmptyState`**: Motivating placeholder screens when no mistakes or bookmarks exist, directing the student to active practice.
16. **`SkeletonLoaders`**: Content-shaped shimmer placeholders for all dashboard widgets, quiz cards, and analytics charts.
