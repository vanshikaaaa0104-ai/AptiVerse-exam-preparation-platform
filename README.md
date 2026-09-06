# 🎯 AptiVerse — Intelligent Exam Preparation Platform

> **Version**: 2.0 (Memory-Augmented Multi-Agent Pipeline)  
> **Framework**: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4, Prisma ORM 7  
> **Supported Exams**: CAT, XAT, GMAT, SNAP, NMAT, CMAT, MAT, MAH MBA CET  
> **Repository**: [vanshikaaaa0104-ai/AptiVerse-exam-preparation-platform](https://github.com/vanshikaaaa0104-ai/AptiVerse-exam-preparation-platform.git)

---

## 🌟 Executive Overview

**AptiVerse** is a high-performance, enterprise-grade test preparation platform engineered to simulate premier management and aptitude exams with absolute fidelity. It combines real-time exam countdowns, non-reversible section switching, MCQ and TITA question formats, zero-leak server-side answer verification, comprehensive post-exam analytics, and gamified learner retention.

- 🎨 **Next-Gen UI (Glassmorphism + Neumorphism + Bento Grid)**: Triple-paradigm visual design with frosted-glass backdrop blur panels, tactile neumorphic 3D shadow pods, ambient glowing light orbs, and asymmetric Bento grid layouts for maximum information clarity.
- ⏱️ **Zero-Leak Timed Mock Simulations**: Exact sectional time allocations (e.g., 40 mins/section for CAT). Answers and step-by-step solutions are kept secure on the server until attempt finalization.
- 📝 **TITA & MCQ Inputs with Exact Marking Rules**: Complete support for numeric Type-In-The-Answer questions (+3 marks, 0 negative) and standard MCQs (+3 marks, -1 negative).
- 🧭 **Interactive Question Palette**: 5-state palette status (Not Visited, Not Answered, Answered, Marked for Review, Answered & Marked for Review) with quick jump navigation.
- 📊 **Deep Diagnostic Analytics**: Post-exam scorecards, section-wise accuracy meters, time-spent analysis, and speed-vs-accuracy quadrant graphs.
- 📓 **Automated Mistakes Notebook**: Automatically logs every incorrect or unattempted question for targeted revision and repetition.
- 📚 **Comprehensive 216-Chapter Curriculum**: Covers Quant, DILR, and VARC with curated concepts, shortcut methods, and verified questions.
- 🔒 **Cryptographic Security**: PBKDF2 with SHA-512 password hashing, salt generation, constant-time `timingSafeEqual` comparison, and HTTP-only session cookies.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v20.x or v22.x+
- **npm**: v9.x+

### Local Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Generate Database Client**:
   ```bash
   npx prisma generate
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or [http://localhost:3001](http://localhost:3001) if configured in `.env`).

4. **Production Build & Test**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🐳 Docker Deployment

To launch AptiVerse as an isolated container:

```bash
# Build and run using Docker Compose
docker-compose -f production_artifacts/docker-compose.yml up -d --build

# View logs
docker-compose -f production_artifacts/docker-compose.yml logs -f
```

---

## 📁 Project Architecture & Key Directories

```
d:/TY-IT/Aptiverse/
├── .agents/                                # Autonomous Multi-Agent Framework (9 personas, workflows, skills)
├── memory/                                 # Persistent Memory Plane (Context index, ADRs, session briefs)
├── artifacts/
│   ├── task_lists/
│   │   └── Master_Blueprint.md             # Active Single Source of Truth
│   └── audit_report.md                     # QA and Security Audit Report
├── docs/
│   ├── design_system.md                    # Visual identity, tokens, exam palette states
│   ├── component_tree.md                   # Next.js UI component hierarchy
│   ├── PIPELINE_GUIDE.md                   # Multi-agent developer guide
│   └── UNIVERSAL_PROMPTS.md                # Prompt library for cycles
├── prisma/
│   ├── schema.prisma                       # Complete database schema
│   └── seed.ts                             # Curriculum & Question Bank seeder
├── production_artifacts/
│   └── docker-compose.yml                  # Production container orchestration
├── public/                                 # Static assets & icons
├── src/
│   ├── app/                                # Next.js 16 App Router (37 static/dynamic routes)
│   ├── components/                         # UI components (Exam palette, timer, layout, ui primitives)
│   └── lib/                                # Database singleton, auth, password crypto, session helpers
├── dev.db                                  # Verified SQLite database
├── Dockerfile                              # Multi-stage production container manifest
└── package.json                            # Scripts & dependencies
```

---

## 🤖 Multi-Agent Operational System

This workspace operates under the **Autonomous Multi-Agent Development Pipeline v2.0**:
- `/startcycle <idea>`: Greenfield project planning and end-to-end execution.
- `/iteratecycle <target>`: Surgical feature additions, bug fixes, or test enhancements without full-file re-reads.
- **Persistent Memory**: ADRs in `memory/decision_log.md`, session digests in `memory/session_briefs/`, and usage accounting in `memory/token_ledger.csv`.
