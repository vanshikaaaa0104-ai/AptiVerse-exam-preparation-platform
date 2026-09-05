# AptiVerse Exam Verification & Authority Governance Protocol

## 1. Governance Principles

AptiVerse maintains rigorous standards for competitive entrance exam specifications. Under no circumstances does the platform invent, approximate, or fabricate official exam patterns, syllabus items, cutoffs, or percentiles.

### 1.1 Source-of-Truth Hierarchy
1. **Official Information Bulletins / Notification Gazettes**: Released directly by convening bodies (e.g., IIM CAT Bulletin, XLRI XAT Brochure, GMAC NMAT Guide).
2. **Official Sample Papers / Official Mock Tests**: Directly hosted on the official exam portals.
3. **Official Question Papers (where released by convening authority)**: Authentic past papers released under public disclosure rules.
4. **Derived Preparation Taxonomies**: Curated pedagogical topic breakdowns based on historical trend analysis. These are **explicitly labeled** as `"Derived from Previous Papers"` or `"Recommended Preparation Taxonomy"` and never as `"Official Syllabus"`.

---

## 2. Verification Status Taxonomy

Every exam configuration, version snapshot, section structure, and scoring rule in AptiVerse carries one of three immutable verification statuses:

```
┌─────────────────┐       Admin Audit       ┌────────────────────┐       Authority Check       ┌──────────────────┐
│   NEEDS_REVIEW  │  ───────────────────►   │      DERIVED       │   ─────────────────────►    │     VERIFIED     │
│ Pending audit   │                         │ Past paper derived │                             │ Official Gazette │
└─────────────────┘                         └────────────────────┘                             └──────────────────┘
```

| Status | Code | Meaning & Constraints | UI Presentation Rule |
|---|---|---|---|
| **VERIFIED** | `VERIFIED` | Confirmed with 100% fidelity against the latest official conducting body notification/bulletin. | Green verified badge: `"Official Pattern [Year] • [Authority]"` |
| **DERIVED** | `DERIVED` | Curated by academic experts analyzing past trends; used where convening body publishes broad subject names without micro-topics. | Slate badge: `"Recommended Preparation Taxonomy (Derived from Past Papers)"` |
| **NEEDS_REVIEW** | `NEEDS_REVIEW` | Notification awaited, pattern under active revision, or source document outdated. | Amber badge: `"Pattern Under Review for Current Cycle"` |

---

## 3. Comprehensive Indian Management Entrance Exam Blueprints

Below are the verified exam blueprints codified in the AptiVerse database and rule engine.

### 3.1 CAT (Common Admission Test)
- **Convening Authority**: Indian Institutes of Management (Rotating IIM)
- **Source Authority**: CAT Committee (e.g. `iimcat.ac.in`)
- **Verification Status**: `VERIFIED` (Structure & Scoring) | `DERIVED` (Micro-topic Taxonomy)
- **Official Structure**:
  - **Total Duration**: 120 minutes (2 hours)
  - **Sectional Time Limit**: 40 minutes per section strictly enforced (Auto-advances to next section; NO backward navigation between sections).
  - **Order of Sections**: 1. Verbal Ability & Reading Comprehension (VARC) $\rightarrow$ 2. Data Interpretation & Logical Reasoning (DILR) $\rightarrow$ 3. Quantitative Aptitude (QA).
  - **Total Questions**: 66 questions.
    - VARC: 24 questions (16 RC in 4 passages + 8 VA).
    - DILR: 20 questions (4 sets of 5 questions each or combination of 5-question sets).
    - QA: 22 questions.
  - **Marking Scheme**:
    - Correct: $+3$ marks.
    - Incorrect (MCQ): $-1$ mark (Negative marking applies).
    - Incorrect (TITA / Non-MCQ): $0$ marks (No negative marking).
  - **On-Screen Calculator**: Allowed (Basic standard digital on-screen calculator provided).

---

### 3.2 XAT (Xavier Aptitude Test)
- **Convening Authority**: XLRI Jamshedpur
- **Source Authority**: XLRI XAT Board (`xatonline.in`)
- **Verification Status**: `VERIFIED`
- **Official Structure**:
  - **Part 1 (Core - Counted for Percentile)**:
    - Duration: 175 minutes (Global timer; Free inter-sectional navigation between Part 1 sections).
    - Sections:
      1. Verbal Ability & Logical Reasoning (VALR) ~ 26 questions
      2. Decision Making (DM) ~ 21-22 questions
      3. Quantitative Aptitude & Data Interpretation (QADI) ~ 28 questions
    - Total Part 1: ~75-76 questions.
    - Marking Scheme: $+1$ mark for correct; $-0.25$ mark for incorrect MCQ.
    - **Special Negative Rule**: $-0.10$ mark deduction per unattempted question beyond 8 consecutive unattempted questions in Part 1.
  - **Part 2 (General Knowledge & Analytical Essay)**:
    - Duration: 30 minutes.
    - GK: 25 questions ($+1$, no negative marks; not counted in core XAT percentile calculation).
    - Essay Writing: 1 topic chosen from 2-3 prompts (evaluated during XLRI interview shortlisting).
  - **On-Screen Calculator**: NOT allowed.

---

### 3.3 SNAP (Symbiosis National Aptitude Test)
- **Convening Authority**: Symbiosis International (Deemed University)
- **Source Authority**: SIU SNAP Board (`snaptest.org`)
- **Verification Status**: `VERIFIED`
- **Official Structure**:
  - **Total Duration**: 60 minutes (1 hour) — High-speed precision test.
  - **Sectional Timing**: NO sectional time limits; free navigation across all sections.
  - **Sections & Question Counts**:
    1. General English (Reading Comprehension, Verbal Reasoning, Verbal Ability): 15 questions.
    2. Analytical & Logical Reasoning (A&LR): 25 questions.
    3. Quantitative, Data Interpretation & Data Sufficiency (QA, DI & DS): 20 questions.
  - **Total Questions**: 60 questions.
  - **Marking Scheme**: $+1$ mark for correct, $-0.25$ mark for incorrect MCQ. All questions are standard MCQs.
  - **On-Screen Calculator**: NOT allowed.

---

### 3.4 NMAT by GMAC
- **Convening Authority**: Graduate Management Admission Council (GMAC)
- **Source Authority**: GMAC (`mba.com/exams/nmat`)
- **Verification Status**: `VERIFIED` (Structure & Sectional Timing) | `DERIVED` (Adaptive algorithm behavior)
- **Official Structure**:
  - **Total Duration**: 120 minutes.
  - **Section Order**: Candidate selects the order of the 3 sections before starting the test.
  - **Sectional Time Limits** (Strictly locked per section):
    1. Language Skills: 28 minutes (36 questions).
    2. Quantitative Skills: 52 minutes (36 questions).
    3. Logical Reasoning: 40 minutes (36 questions).
  - **Total Questions**: 108 questions.
  - **Marking Scheme**: $+3$ marks for correct, $0$ negative marks (No negative marking for wrong answers; unattempted questions penalize scaled score).
  - **Adaptive Architecture Notice**: NMAT utilizes a computer-adaptive question selection engine. AptiVerse provides both standard sectional speed drills and simulated difficulty-scaling adaptive practice tests.
  - **On-Screen Calculator**: NOT allowed.

---

### 3.5 CMAT (Common Management Admission Test)
- **Convening Authority**: National Testing Agency (NTA)
- **Source Authority**: NTA CMAT (`cmat.nta.nic.in`)
- **Verification Status**: `VERIFIED`
- **Official Structure**:
  - **Total Duration**: 180 minutes (3 hours).
  - **Sectional Time Limit**: NO sectional time limit (Free navigation between all 5 sections).
  - **Sections & Question Counts**:
    1. Quantitative Techniques and Data Interpretation: 20 questions (80 marks).
    2. Logical Reasoning: 20 questions (80 marks).
    3. Language Comprehension: 20 questions (80 marks).
    4. General Awareness: 20 questions (80 marks).
    5. Innovation & Entrepreneurship: 20 questions (80 marks).
  - **Total Questions**: 100 questions (Total Marks: 400).
  - **Marking Scheme**: $+4$ marks for correct, $-1$ mark for incorrect MCQ.
  - **On-Screen Calculator**: NOT allowed.

---

### 3.6 MAT (Management Aptitude Test)
- **Convening Authority**: All India Management Association (AIMA)
- **Source Authority**: AIMA MAT (`mat.aima.in`)
- **Verification Status**: `VERIFIED`
- **Official Structure**:
  - **Total Duration**: 120 minutes (2 hours).
  - **Sectional Time Limit**: Recommended suggested time per section, but global free navigation is permitted.
  - **Sections & Question Counts**:
    1. Language Comprehension: 30 questions.
    2. Intelligence & Critical Reasoning: 30 questions.
    3. Mathematical Skills: 30 questions.
    4. Data Analysis & Sufficiency: 30 questions.
    5. Economic & Business Environment: 30 questions.
  - **Total Questions**: 150 questions (Updated 150-question 2-hour pattern).
  - **Marking Scheme**: $+1$ mark for correct, $-0.25$ mark for incorrect MCQ.
  - **Composite Score Note**: Composite score (scaled 200–800) is calculated from the first 4 sections; Economic & Business Environment score is reported separately.
  - **On-Screen Calculator**: NOT allowed.

---

### 3.7 MAH MBA / MMS CET
- **Convening Authority**: State Common Entrance Test Cell, Maharashtra State
- **Source Authority**: Maharashtra State CET Cell (`mahacet.org`)
- **Verification Status**: `VERIFIED`
- **Official Structure**:
  - **Total Duration**: 150 minutes (2.5 hours).
  - **Sectional Time Limit**: NO sectional timing; completely free navigation across all 200 questions (often presented in mixed jumbled order).
  - **Sections & Question Breakdown**:
    1. Logical Reasoning: 75 questions (75 marks).
    2. Abstract Reasoning / Visual Reasoning: 25 questions (25 marks).
    3. Quantitative Aptitude: 50 questions (50 marks).
    4. Verbal Ability / Reading Comprehension: 50 questions (50 marks).
  - **Total Questions**: 200 questions (Total Marks: 200).
  - **Marking Scheme**: $+1$ mark for correct, $0$ negative marks (NO negative marking).
  - **On-Screen Calculator**: NOT allowed.

---

### 3.8 GMAT (The GMAT Exam / Focus Edition)
- **Convening Authority**: Graduate Management Admission Council (GMAC)
- **Official Website**: `https://www.mba.com`
- **Source Authority**: Graduate Management Admission Council (GMAC) Official Exam Specifications
- **Source URL**: `https://www.mba.com/exams/gmat-exam/about/exam-structure`
- **Verification Status**: `VERIFIED` (Official Exam Blueprint) | `DERIVED` (Recommended Preparation Taxonomy)
- **Official Structure**:
  - **Total Duration**: 135 minutes (2 hours 15 minutes), plus one optional 10-minute break between any two sections.
  - **Sectional Time Limit**: 45 minutes per section strictly enforced (3 sections $\times$ 45 minutes).
  - **Order of Sections**: Test-taker has complete flexibility to choose section order prior to test launch.
  - **Review & Edit Policy**: Questions can be bookmarked; test-takers may review and edit up to 3 answers per section before section submission.
  - **Total Questions**: 64 questions.
    1. **Quantitative Reasoning**: 21 questions (45 minutes). Focuses exclusively on Problem Solving (Arithmetic and Algebra; Geometry is explicitly excluded). On-screen calculator NOT allowed.
    2. **Verbal Reasoning**: 23 questions (45 minutes). Focuses on Critical Reasoning (CR) and Reading Comprehension (RC); Sentence Correction is explicitly excluded. On-screen calculator NOT allowed.
    3. **Data Insights**: 20 questions (45 minutes). Integrates Data Sufficiency (DS), Multi-Source Reasoning (MSR), Table Analysis, Graphics Interpretation, and Two-Part Analysis. Digital on-screen calculator IS provided.
  - **Scoring & Percentiles**:
    - Total Score Scale: 205 to 805 (in 10-point increments, ending in 5).
    - Section Score Scale: 60 to 90 (in 1-point increments) for each of the three sections. All three sections carry equal weight in the total score composite.
  - **Taxonomy Label**: Sourced under `"Recommended Preparation Taxonomy (Derived from Past Exam Trends)"` as GMAC does not publish an exhaustive micro-chapter syllabus.

---

## 4. Exam Rule Configuration Schema (Database & Engine)

To guarantee zero hardcoding in UI components, each exam's runtime rules are defined as serializable structured records in the database:

```typescript
interface ExamRuleConfiguration {
  examSlug: string;
  versionYear: number;
  totalDurationMinutes: number;
  hasSectionalTiming: boolean;
  allowSectionSwitching: boolean;
  allowQuestionReview: boolean;
  hasCalculator: boolean;
  sections: Array<{
    id: string;
    name: string;
    slug: string;
    questionCount: number;
    durationMinutes?: number; // Present if hasSectionalTiming === true
    orderIndex: number;
    positiveMarksPerQuestion: number;
    negativeMarksPerQuestion: number;
    titaAllowed: boolean;
    titaNegativeMarks: number;
  }>;
  specialRules?: {
    unattemptedPenaltyThreshold?: number; // e.g., 8 in XAT
    unattemptedPenaltyMarks?: number;     // e.g., 0.10 in XAT
    compositeScoreSectionsOnly?: string[]; // e.g., First 4 in MAT
  };
}
```
