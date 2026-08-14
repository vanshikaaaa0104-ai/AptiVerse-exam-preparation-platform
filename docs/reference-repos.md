# AptiVerse Reference Repositories Analysis & Architecture Blueprint

This document analyzes the 10 architectural and UI/UX reference repositories, reviewing their licenses, key design and structural patterns, and detailing how AptiVerse adapts them into an enterprise-grade SaaS preparation platform.

---

## 1. Reference Repository Matrix & License Audit

| # | Repository | Primary Domain & Use Case | Key Architectural & UI Patterns | License Review | AptiVerse Implementation Scope |
|---|------------|---------------------------|----------------------------------|----------------|--------------------------------|
| **1** | `JavierFadel/react-lms` | LMS Architecture & Learning Flow | Modular concept tree, topic progress bars, learning path milestone tracker, chapter quizzes | MIT / Open Source | Core student dashboard layout, learning path hierarchy, topic completion calculation |
| **2** | `bPavan16/quizroom` | Timed Quiz UX & Navigation | Question status palette (Answered, Marked, Unvisited, Skipped), resilient client countdown timer, responsive side drawer | MIT / Open Source | Practice quiz and mock test UI shell, question palette, mobile bottom drawer controls |
| **3** | `anshvermadev/Quiz-system` | Quiz Architecture & Autosave | Optimistic local updates, server-side autosave sync, score calculation breakdown | MIT / Open Source | Test attempt autosave engine, question timer telemetry, instant answer persistence |
| **4** | `caomingkai/Online-Exam-System` | Exam Engine & Server Evaluation | Multi-section timed assessment, section jumping rules, server-side verification, negative marking calculation | Apache 2.0 / MIT | Sectional time lock engine, differential scoring engine, TITA/MCQ server-side evaluation |
| **5** | `srajasimman/mern-assessment-app` | Assessment Authoring & Admin | Multi-step question creator, question bank tagging, admin verification pipeline | MIT / Open Source | Admin question management, 4-stage verification workflow (Draft → Review → Verified → Published) |
| **6** | `shadcndashboard/shadcndashboard` | SaaS Dashboard & Data Visualizations | Bento-grid analytics cards, Recharts integration with custom tooltips, accessible data tables | MIT / Open Source | Dark/Light mode tokens, modern Bento dashboard layout, streak counters, speed vs accuracy graphs |
| **7** | `learnhouse/learnhouse` | Course & Content Architecture | Bite-sized concept cards, markdown/LaTeX mathematical notation rendering, modular study plans | AGPL-3.0 (Architecture Reference Only; No code copied) | Pedagogical content model: Concept → Formula Sheet → Worked Examples → Drill Questions |
| **8** | `zijinz456/OpenTutor` | Intelligent Tutoring & Explanations | Misconception diagnosis, step-by-step shortcut hints, targeted remediation prompts | MIT / Open Source | Solution panel architecture: Detailed Solution, Shortcut Method, Concept Tested, Common Trap |
| **9** | `lengvietcuong/examinai` | Modern AI EdTech UX | Adaptive next-step recommendations ("Practice 10 Medium Time & Work questions"), conversational insight cards | MIT / Open Source | "What Should I Do Next?" smart recommendation engine, Mistake Book recovery cycles |
| **10** | `Samkarya/online-exam-questions` | Question Taxonomy & Metadata | Multi-level hierarchy (Exam → Section → Topic → Subtopic → Concept), metadata schema | MIT / Open Source (Schema Reference Only) | Universal Question Knowledge Graph & normalization schema across 7+ competitive exams |

---

## 2. Deep-Dive Pattern Breakdown & AptiVerse Synthesis

### 2.1 Quiz & Exam Engine (`bPavan16/quizroom` + `caomingkai/Online-Exam-System` + `anshvermadev/Quiz-system`)
- **Question Palette State Machine**:
  - `NOT_VISITED`: Silver / Neutral border.
  - `SKIPPED`: Slate / Muted gray.
  - `ANSWERED`: Emerald / Vibrant green.
  - `MARKED_FOR_REVIEW`: Violet / Purple circle.
  - `ANSWERED_AND_MARKED`: Purple circle with emerald badge.
- **Section Locking & Navigation Rules**:
  - CAT requires 40-minute strictly locked sections in fixed order (VARC → DILR → QA) with zero inter-section jumping.
  - XAT/SNAP/CMAT/MAT allow free inter-section navigation within the global test timer.
  - NMAT enforces section selection upfront and locks individual sections sequentially.
- **Secure Server-Side Scoring & Zero Client Leakage**:
  - The client receives only `questionId`, `questionText`, `options`, `questionType`, and `timeLimit`.
  - Correct answers, solutions, and shortcuts are never transmitted to the browser during an active quiz/mock.
  - Scoring calculates: $+S$ for correct, $-N$ for incorrect (where $N$ varies by exam and question type; e.g. TITA has $N=0$, CAT has $N=1$ for $+3$, XAT has unattempted penalties after 8 skips).

### 2.2 Pedagogical Content & Concept Architecture (`learnhouse/learnhouse` + `JavierFadel/react-lms`)
- **Knowledge Graph Hierarchy**:
  ```
  Exam (e.g. CAT)
    └── Section (e.g. Quantitative Aptitude)
          └── Topic (e.g. Arithmetic)
                └── Subtopic (e.g. Time, Speed & Distance)
                      └── Concept (e.g. Relative Speed & Trains)
  ```
- **Unified Preparation Taxonomy**:
  Concepts are canonical (e.g., "Percentages - Successive Change" exists once in the central knowledge base) and dynamically mapped to multiple entrance exams according to their syllabus and difficulty weightings.

### 2.3 Analytics, Mastery & Recommendation Engine (`shadcndashboard` + `lengvietcuong/examinai` + `OpenTutor`)
- **Metric Computation**:
  - **Accuracy Rate**: $\frac{\text{Correct}}{\text{Attempted}} \times 100$
  - **Pace Index / Speed Metric**: $\frac{\text{Actual Time Spent}}{\text{Target Benchmark Time}}$
  - **Mastery Score**: Bayesian weighted moving average of the last 30 attempts across Easy, Medium, and Hard tiers.
- **Deterministic Action Engine ("Next Best Action")**:
  - If Topic Accuracy $< 60\%$ with $\ge 10$ attempts $\rightarrow$ Flagged as **WEAK AREA** $\rightarrow$ Action: "Revise Concept (8 min) + Solve 10 Medium Questions".
  - If Accuracy $> 80\%$ on Medium questions $\rightarrow$ Action: "Unlock Hard CAT-Level Drill".
  - If Topic inactive for $> 14$ days $\rightarrow$ Action: "Quick 5-Question Refresher".

### 2.4 Question Authoring & Verification Pipeline (`srajasimman/mern-assessment-app`)
- **Content Integrity Protocol**:
  - Every question requires a verified source, question type, difficulty rating, estimated solving time, step-by-step solution, shortcut method, and distractor rationale.
  - State machine: `DRAFT` $\rightarrow$ `REVIEW` $\rightarrow$ `VERIFIED` $\rightarrow$ `PUBLISHED`.
  - Only `VERIFIED` questions can be bundled into official mock test blueprints or published practice sets.
