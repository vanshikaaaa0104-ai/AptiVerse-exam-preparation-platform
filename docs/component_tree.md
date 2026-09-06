# 🌳 AptiVerse Component Tree & Interface Hierarchy

> **Platform**: AptiVerse Next.js App Router Application  
> **Status**: Approved & Implemented

---

## 1. Top-Level Layout Architecture

```
RootLayout (`src/app/layout.tsx`)
├── ThemeProvider / Global Styles (`src/app/globals.css`)
└── AppShell (`src/components/layout/AppShell.tsx`)
    ├── Topbar (`src/components/layout/Topbar.tsx`)
    │   ├── Exam Selector Dropdown
    │   ├── Streak Counter Indicator
    │   ├── Notification Bell
    │   └── User Profile Menu
    ├── Sidebar (`src/components/layout/Sidebar.tsx`)
    │   ├── Brand Logo (AptiVerse)
    │   ├── Primary Navigation Links (Dashboard, Exams, Learn, Practice, Mocks, Analytics)
    │   └── Secondary Links (Mistakes, Bookmarks, Leaderboard, Settings)
    └── Page Content `<main>`
```

---

## 2. Core Feature Page Component Trees

### A. Exam Simulation Engine (`/mocks/[mockId]/attempt`)
```
MockAttemptPage (`src/app/mocks/[mockId]/attempt/page.tsx`)
├── ExamHeader
│   ├── Exam Title & Section Tabs
│   ├── Section Countdown Timer (`src/components/quiz/QuizTimer.tsx`)
│   └── Finish / Submit Section Button
├── Split-View Exam Workspace
│   ├── Left Column: QuestionViewer
│   │   ├── Section & Question Number Header
│   │   ├── Passage / Comprehension Context (for VARC / DILR)
│   │   ├── Question Text & Formula Renderer
│   │   └── Option Selector:
│   │       ├── MCQ Option Cards (A, B, C, D) with selection states
│   │       └── TITA Input Field (Numeric input keyboard)
│   └── Right Column: ExamSidebar & QuestionPalette
│       ├── Palette Summary Counters (Answered, Marked, Unvisited)
│       ├── Grid of Question Number Buttons with state-based badges
│       └── Legend Guide
└── ExamFooter
    ├── Mark for Review & Next Button
    ├── Clear Response Button
    └── Save & Next Button
```

### B. Diagnostic & Performance Analytics (`/analytics`, `/mocks/[mockId]/result`)
```
MockResultPage (`src/app/mocks/[mockId]/result/page.tsx`)
├── Performance Overview Hero
│   ├── Total Scaled Score & Percentile Projection
│   ├── Overall Accuracy & Attempt Rate
│   └── Sectional Score Breakdown Cards
├── Diagnostic Visualizations
│   ├── Accuracy by Section (Bar / Radar Chart)
│   ├── Speed vs Accuracy Quadrant Plot
│   └── Topic Strengths vs Critical Vulnerabilities
└── Solution Review Drawer / Tab
    ├── Filter by: All | Incorrect | Skipped | Correct
    └── Step-by-Step Explanation Accordions with Shortcut Methods
```

### C. Curriculum & Chapter Learning (`/learn/[sectionSlug]/[topicSlug]`)
```
TopicLearnPage (`src/app/learn/[sectionSlug]/[topicSlug]/page.tsx`)
├── Topic Header & Progress Meter
├── Chapter Hierarchy List
│   ├── Concept Summary Cards
│   ├── Key Formulas & Theorems
│   └── Sample Solved Problems
└── TopicPracticeModal (`src/components/practice/TopicPracticeModal.tsx`)
    └── Interactive 5-10 question adaptive diagnostic
```
