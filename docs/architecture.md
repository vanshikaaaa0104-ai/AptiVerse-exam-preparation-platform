# AptiVerse System Architecture & Engineering Blueprint

## 1. Architectural Principles & Overview

AptiVerse is structured as an enterprise-grade SaaS preparation platform built on modern Next.js architecture, strict TypeScript, PostgreSQL with Prisma ORM, and decoupled domain engines.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT LAYER                                         │
│  ┌───────────────────────┐  ┌────────────────────────┐  ┌───────────────────────────┐  │
│  │   Student Dashboard   │  │ Timed Quiz/Mock Engine  │  │  Admin & Verification UI  │  │
│  │  (Linear/Notion UX)   │  │   (Zero answer leak)   │  │    (4-Stage Pipeline)     │  │
│  └───────────────────────┘  └────────────────────────┘  └───────────────────────────┘  │
│             ▲                           ▲                              ▲               │
│             │                           │                              │               │
│             ▼                           ▼                              ▼               │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                     Presentation & Interaction Shell (shadcn/ui)                 │  │
│  │            Design Tokens • Responsive AppShell • Framer Motion • Lucide          │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ HTTPS / Server Actions / REST API
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                               SERVER & DOMAIN ENGINES                                  │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                       Auth.js Session & RBAC Enforcement                         │  │
│  │               (Role checks: STUDENT | REVIEWER | ADMIN | SUPERADMIN)             │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
│                                           │                                            │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐  │
│  │    Exam & Quiz   │  │    Analytics &   │  │  Recommendation  │  │  Gamification  │  │
│  │  Scoring Engine  │  │  Mastery Engine  │  │   Action Engine  │  │ & Streak Engine│  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  └────────────────┘  │
│                                           │                                            │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                   Content Verification Pipeline & Governance                     │  │
│  │              (DRAFT ──► REVIEW ──► VERIFIED ──► PUBLISHED State Machine)         │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ Type-Safe Querying via Prisma ORM
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                                DATA PERSISTENCE LAYER                                  │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                       PostgreSQL Relational Storage                              │  │
│  │   Indexed across examId, versionId, sectionId, topicId, status, and userId       │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Subsystems & Domain Engines

### 2.1 Quiz & Mock Test Engine
1. **Zero Client Leakage Protocol**:
   - When a student begins a quiz or mock attempt (`POST /api/quiz/start` or `startQuizAttemptAction`), the server returns an attempt payload stripped of all correct answers, solutions, shortcuts, and explanatory notes.
   - Only `questionId`, `questionText`, `questionType`, `options` (for MCQs), and section timing constraints are delivered to the browser.
2. **Deterministic State Machine**:
   - Question statuses: `NOT_VISITED`, `SKIPPED`, `ANSWERED`, `MARKED_FOR_REVIEW`, `ANSWERED_AND_MARKED`.
   - Timer persistence: Local tick paired with server heartbeat timestamps every 15–30 seconds.
   - Autosave: Each answer selection optimistically updates local client state and dispatches a debounced server persistence call (`recordAnswerAction`), preventing loss of work during unexpected network disruptions or browser reloads.
3. **Server-Side Grading & Rule-Driven Evaluation**:
   - On submission (`POST /api/quiz/submit` or `submitQuizAttemptAction`), the server loads the official `ExamRuleConfiguration` and the exact question answer keys.
   - Calculations:
     - Positive score: $\sum (\text{Correct MCQ} \times S_{\text{MCQ}}) + \sum (\text{Correct TITA} \times S_{\text{TITA}})$
     - Negative penalty: $\sum (\text{Incorrect MCQ} \times N_{\text{MCQ}}) + \sum (\text{Incorrect TITA} \times N_{\text{TITA}})$
     - Special exam rules (e.g., XAT unattempted penalty beyond 8 unattempted items: $-0.10$ marks per extra unattempted).
   - Generates an immutable `Attempt` record along with granular `AttemptAnswer` time telemetry.

---

### 2.2 Server-Side Analytics & Topic Mastery Engine
All heavy metrics are computed server-side to keep the frontend fast and reactive.

Key server analytics functions:
- `getUserAccuracy(userId, examId?, timeframe?)`: Computes overall and rolling 30-day accuracy.
- `getTopicAccuracy(userId, topicId)`: Computes topic accuracy, total attempts, and historical trend.
- `getSectionAccuracy(userId, sectionId)`: Returns sectional strengths.
- `getAverageQuestionTime(userId, topicId?, difficulty?)`: Computes average solving time versus benchmark expected time.
- `getDifficultyPerformance(userId)`: Segregates performance across `EASY`, `MEDIUM`, `HARD`.
- `getWeakTopics(userId, limit = 5)`: Identifies topics with $<60\%$ accuracy and $\ge 10$ attempts.
- `getTopicMastery(userId, topicId)`: Computes a 0–100% mastery score:
  $$\text{Mastery} = (0.25 \times \text{EasyAcc}) + (0.45 \times \text{MedAcc}) + (0.30 \times \text{HardAcc}) \times \text{ConfidenceFactor}$$

---

### 2.3 Recommendation Engine (Next Best Action)
The recommendation engine eliminates decision fatigue by answering: **"What should I do right now to improve?"**

- **Rule 1 (Remediation)**:
  - If a topic has accuracy $<60\%$ and attempts $\ge 10$, classify as `WEAK_AREA`.
  - Next Action: "Revise Concept ([Concept Name] - 8 min)" $\rightarrow$ "Practice 10 Medium Questions".
- **Rule 2 (Progression)**:
  - If topic accuracy is $\ge 80\%$ on medium questions, unlock Hard CAT/XAT Level drills.
- **Rule 3 (Spaced Refresher)**:
  - If a student has not practiced a mastered topic in $>14$ days, trigger a 5-question speed quiz.
- **Rule 4 (Exam Pace Optimization)**:
  - If student's average solving time is $>1.5\times$ benchmark time, recommend shortcut technique review.

---

### 2.4 Question Lifecycle & Verification Pipeline
Content integrity is enforced via a mandatory 4-stage pipeline:

```
[ DRAFT ] ────────► [ REVIEW ] ────────► [ VERIFIED ] ────────► [ PUBLISHED ]
  (Created by AI/     (Audited by         (Validated with        (Available in Live
   Faculty)            Senior Reviewer)    Official Source)       Practice & Mocks)
```

Verification Checklist:
- Exact question clarity & correct syntax/LaTeX formatting.
- Unambiguous single correct option (for standard MCQ).
- Verified mathematical calculation & unit consistency.
- High-quality step-by-step explanatory proof.
- Concise shortcut / elimination technique.
- Accurate mapping to canonical topic, subtopic, concept, difficulty, and exam syllabus.
- Source authority attribution & non-infringing copyright clearance.

---

## 3. Tech Stack Specification

- **Framework**: Next.js 15 (App Router, Server Actions, React Server Components)
- **UI Library**: React 19, Tailwind CSS v4 / v3 tokens, shadcn/ui primitive library
- **Icons & Motion**: Lucide React, Framer Motion
- **Charts & Data Viz**: Recharts (with accessible tooltips and theme-aware styling)
- **Forms & Validation**: React Hook Form, Zod schemas
- **Database & ORM**: PostgreSQL, Prisma ORM with connection pooling
- **Authentication**: Auth.js with credentials & OAuth provider support, session cookies, RBAC
- **State Management**: React Server Components + lightweight Zustand stores (only for active timed quiz state & question palette drawer)
- **Type Safety**: Strict TypeScript (`noImplicitAny`, strict null checks).
