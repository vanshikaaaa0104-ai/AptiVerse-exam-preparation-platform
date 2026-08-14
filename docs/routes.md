# AptiVerse Application Routes & URL Architecture

This document defines the complete route tree, access controls, page roles, and data dependencies for AptiVerse.

---

## 1. Route Map Overview

```
├── (marketing)
│   └── / .............................. High-converting, interactive landing page
├── (auth)
│   ├── /login ......................... Authentication portal
│   └── /register ...................... Student onboarding & exam selection
├── (student)
│   ├── /dashboard ..................... Primary Bento-grid preparation control center
│   ├── /exams ......................... Exam catalog & comparison hub
│   │   └── /exams/[examSlug] .......... Dedicated exam blueprint & syllabus breakdown
│   ├── /learn ......................... Subject & section learning pathways
│   │   ├── /learn/[sectionSlug] ....... Section topic explorer (QA / DILR / VARC)
│   │   └── /learn/[sectionSlug]/[topicSlug] .. Interactive concept module & formula cards
│   ├── /practice ...................... Practice hub & drill selectors
│   │   ├── /practice/custom ........... Custom test builder (difficulty, topic, time limit)
│   │   ├── /practice/weak ............. Targeted weak area drill
│   │   ├── /practice/daily ............ Daily Challenge (Streak keeper)
│   │   └── /practice/previous-year .... Verified previous year question sets
│   ├── /quiz/[quizId] ................. Interactive timed practice runner
│   │   └── /quiz/[quizId]/result ...... Quiz result & step-by-step solution review
│   ├── /mocks ......................... Full mock & sectional test catalog
│   │   ├── /mocks/[mockId] ............ Mock test overview & syllabus coverage
│   │   ├── /mocks/[mockId]/instructions Standard exam instructions & declaration
│   │   ├── /mocks/[mockId]/attempt .... Full-screen proctored-style mock exam environment
│   │   └── /mocks/[mockId]/result ..... Comprehensive mock analytics & percentile breakdown
│   ├── /analytics ..................... High-level performance dashboard
│   │   ├── /analytics/topics .......... Granular topic mastery heatmap
│   │   ├── /analytics/sections ........ Sectional strength vs time analysis
│   │   ├── /analytics/speed ........... Solving speed vs benchmark telemetry
│   │   └── /analytics/history ......... Historical test progression & accuracy trends
│   ├── /mistakes ...................... Mistake Book (Error log & retry system)
│   ├── /bookmarks ..................... Saved questions repository with custom notes
│   ├── /leaderboard ................... National & peer rank boards
│   ├── /achievements .................. Gamified XP badges & milestones
│   ├── /profile ....................... Student target exam settings & streak stats
│   └── /settings ...................... Account preferences & notification settings
└── /admin (Role: ADMIN / SUPERADMIN / REVIEWER)
    ├── /admin ......................... Overview analytics & system health
    ├── /admin/exams ................... Exam registry & convening body manager
    ├── /admin/exam-versions ........... Yearly blueprint & rule configurations
    ├── /admin/sections ................ Section structure & marking schemes
    ├── /admin/topics .................. Knowledge graph topic hierarchy
    ├── /admin/concepts ................ Theory, formula sheets & trap guides
    ├── /admin/questions ............... Question bank table with rich filters
    │   ├── /admin/questions/new ....... Multi-step question authoring studio
    │   └── /admin/questions/[id] ...... Question editor & live preview
    ├── /admin/verification ............ 4-stage content audit & verification queue
    ├── /admin/mock-tests .............. Mock test builder & blueprint assembler
    ├── /admin/users ................... User roles & activity monitoring
    ├── /admin/sources ................. Source authority & copyright clearance ledger
    ├── /admin/analytics ............... Platform-wide learning analytics
    └── /admin/settings ................ System configurations & feature flags
```

---

## 2. Detailed Route Specification

### 2.1 Public & Authentication
| Route | Access | Purpose | Key Components |
|---|---|---|---|
| `/` | Public | SaaS Landing Page showcasing platform power, supported exams, mock engine previews, and real methodology. | `HeroSection`, `ExamGrid`, `FeatureShowcase`, `MockEnginePreview`, `TaxonomyExplainer`, `CTA` |
| `/login` | Public | Secure credential and OAuth sign-in. | `LoginForm`, `SocialAuthButtons`, `AuthCard` |
| `/register` | Public | User registration with target exam selection and initial diagnostic prompt. | `RegisterForm`, `ExamPickerStep` |

### 2.2 Student Dashboard & Learning Hub
| Route | Access | Purpose | Key Components |
|---|---|---|---|
| `/dashboard` | Student | Central command center: Daily Goal tracker, active streak, target exam progress, weak area alerts, next action card. | `AppShell`, `DailyGoalWidget`, `ExamProgressCard`, `WeakAreaAlert`, `NextBestActionCard`, `RecentAccuracyChart` |
| `/exams` | Student | Official exam directory (CAT, XAT, SNAP, NMAT, CMAT, MAT, MAH CET). | `ExamCardGrid`, `VerificationBadge`, `ExamFilterTabs` |
| `/exams/[examSlug]` | Student | Deep-dive blueprint: duration, marking scheme, sectional rules, syllabus graph. | `ExamHeader`, `SectionTimingRuleCard`, `TopicTaxonomyAccordion` |
| `/learn` | Student | Subject pathways (Quant, DILR, VARC, and Exam-Specifics). | `SubjectTrackCards`, `CompletionPercentageBar` |
| `/learn/[sectionSlug]` | Student | Topic lists with progress meters and mastery badges. | `TopicListTable`, `MasteryIndicatorBadge` |
| `/learn/[sectionSlug]/[topicSlug]` | Student | Concept deep-dive with formula cards, key traps, and instant mini-quiz. | `ConceptReader`, `FormulaSheetCard`, `TrapWarningBox`, `PracticeDrillCTA` |

### 2.3 Practice & Timed Quiz System
| Route | Access | Purpose | Key Components |
|---|---|---|---|
| `/practice` | Student | Hub for all practice modes. | `PracticeModeCards` (Topic, Weak Areas, Daily, Custom, Past Papers) |
| `/practice/custom` | Student | Custom drill creator (select topics, difficulties, number of questions, timer). | `CustomQuizBuilderForm`, `TopicMultiSelect` |
| `/practice/weak` | Student | Instant 10-question drill targeting student's lowest accuracy topics. | `WeakAreaAutoGenerator`, `MasterySummary` |
| `/practice/daily` | Student | 5-question daily challenge to maintain streak and earn bonus XP. | `DailyChallengeCard`, `StreakMultiplierBadge` |
| `/quiz/[quizId]` | Student | Live timed quiz environment with question palette, bookmarking, and autosave. | `QuizHeader`, `TimerDisplay`, `QuestionCard`, `AnswerOptionGroup`, `QuestionPalette`, `SubmitModal` |
| `/quiz/[quizId]/result` | Student | Immediate score breakdown, detailed step-by-step solutions, shortcuts, and common mistakes. | `ScoreSummaryCard`, `QuestionReviewAccordion`, `SolutionPanel`, `ShortcutBox` |

### 2.4 Mock Test Environment
| Route | Access | Purpose | Key Components |
|---|---|---|---|
| `/mocks` | Student | Mock test library categorized by exam and type (Full Mocks vs Sectional Tests). | `MockTestGrid`, `ExamFilterPills`, `MockStatusBadge` |
| `/mocks/[mockId]/instructions` | Student | Official instructions, marking scheme disclaimer, and readiness confirmation. | `InstructionsList`, `MarkingSchemeTable`, `TermsCheckbox`, `StartTestButton` |
| `/mocks/[mockId]/attempt` | Student | High-fidelity exam simulator matching real exam rules (section locks, timers, palette). | `ExamHeaderTimer`, `SectionTabNav`, `QuestionViewer`, `PaletteGrid`, `ReviewFlagButton`, `LockCountdown` |
| `/mocks/[mockId]/result` | Student | Full performance analysis: sectional scores, negative mark penalty, time per question, estimated percentile. | `MockResultHeader`, `SectionalScoreTable`, `TimeDistributionChart`, `ComprehensiveSolutionViewer` |

### 2.5 Analytics, Mistake Book & Gamification
| Route | Access | Purpose | Key Components |
|---|---|---|---|
| `/analytics` | Student | Overall performance metrics: accuracy, average pace, streak, total questions solved. | `MetricCardsGrid`, `AccuracyTrendLineChart`, `SolvingSpeedBarChart` |
| `/analytics/topics` | Student | Interactive mastery heatmap across all topics and difficulty tiers. | `MasteryHeatmap`, `TopicFilterDropdown` |
| `/mistakes` | Student | Mistake Book: All incorrect questions logged with option to retry and mark resolved. | `MistakeTable`, `RetryQuestionModal`, `MarkLearnedAction` |
| `/bookmarks` | Student | Filterable list of bookmarked questions with student notes. | `BookmarkList`, `QuestionPreviewCard`, `NotesEditor` |
| `/leaderboard` | Student | National and exam-specific leaderboards based on XP and mock scores. | `LeaderboardTable`, `UserRankHighlight`, `WeeklyResetTimer` |
| `/achievements` | Student | Visual trophy case displaying unlocked and in-progress milestones. | `AchievementGrid`, `ProgressBar`, `TierBadge` |

### 2.6 Admin & Content Governance
| Route | Access | Purpose | Key Components |
|---|---|---|---|
| `/admin` | Admin | High-level system stats: question bank counts, verification backlog, active students. | `AdminStatCards`, `VerificationQueueWidget`, `RecentActivityFeed` |
| `/admin/questions` | Admin | Searchable and filterable question repository with status filters. | `QuestionDataTable`, `StatusPill`, `BulkActionToolbar` |
| `/admin/questions/new` | Admin | Comprehensive question creation form with options, LaTeX support, shortcuts, and solutions. | `QuestionEditorForm`, `OptionsBuilder`, `SolutionEditor`, `LiveQuestionPreview` |
| `/admin/verification` | Reviewer/Admin | 4-Stage audit queue: Review, approve, or reject questions with itemized checklists. | `VerificationReviewPanel`, `ChecklistVerifier`, `RejectFeedbackModal` |
| `/admin/mock-tests` | Admin | Assembly studio for creating official full mocks and sectional tests. | `MockBuilder`, `SectionConfigurator`, `QuestionSelectorModal` |
