# 🚀 Master Skills — Memory-Augmented Multi-Agent Development Pipeline v2.0

Welcome to the **Master_Skills** workspace — a universal, enterprise-grade framework for autonomous multi-agent software development. v2.0 introduces a persistent **Memory Plane** that eliminates redundant full-file reads, preserves architectural decisions across cycles, and enforces token budgets.

## 📖 Documentation & User Guide

- 📘 **[Pipeline User Guide (`docs/PIPELINE_GUIDE.md`)](file:///d:/TY-IT/Projects/Android%20ICA/docs/PIPELINE_GUIDE.md)** — Step-by-step developer guide on starting projects, adding features, making changes, and using approval gates.
- 📜 **[Universal Prompt Library (`docs/UNIVERSAL_PROMPTS.md`)](file:///d:/TY-IT/Projects/Android%20ICA/docs/UNIVERSAL_PROMPTS.md)** — Copy-paste prompt templates for project kickoff, features, bug fixing, styling, DB migrations, testing & deployments.
- 🏛️ **[Workspace Blueprint (`WORKSPACE_BLUEPRINT.md`)](file:///d:/TY-IT/Projects/Android%20ICA/WORKSPACE_BLUEPRINT.md)** — Complete architectural specification and system internals.

---

## ⚡ Quick Navigation

### Agent Roster & Personas
- [`.agents/agents.md`](file:///d:/TY-IT/Projects/Android%20ICA/.agents/agents.md) — 9 specialized personas + Operational Protocol v2.0

### Workflows
| Command | File | Description |
|---|---|---|
| `/startcycle <idea>` | [`.agents/workflows/startcycle.md`](file:///d:/TY-IT/Projects/Android%20ICA/.agents/workflows/startcycle.md) | Greenfield project from scratch (with Phase 0 memory briefing) |
| `/iteratecycle <request>` | [`.agents/workflows/iteratecycle.md`](file:///d:/TY-IT/Projects/Android%20ICA/.agents/workflows/iteratecycle.md) | Surgical iteration & bug fixes (indexed retrieval, no full re-reads) |

### Skills Playbooks
| Skill | File | Owner |
|---|---|---|
| Context Retrieval & Memory Management | [`.agents/skills/manage_memory.md`](file:///d:/TY-IT/Projects/Android%20ICA/.agents/skills/manage_memory.md) | `@memory_keeper` |
| Spec & Architecture Blueprinting | [`.agents/skills/write_specs.md`](file:///d:/TY-IT/Projects/Android%20ICA/.agents/skills/write_specs.md) | `@pm`, `@architect`, `@uiux` |
| Enterprise Code Generation | [`.agents/skills/generate_code.md`](file:///d:/TY-IT/Projects/Android%20ICA/.agents/skills/generate_code.md) | `@engineer` |
| Code & Security Audit | [`.agents/skills/audit_code.md`](file:///d:/TY-IT/Projects/Android%20ICA/.agents/skills/audit_code.md) | `@qa`, `@sec_auditor` |
| Container Deployment | [`.agents/skills/deploy_app.md`](file:///d:/TY-IT/Projects/Android%20ICA/.agents/skills/deploy_app.md) | `@devops` |
| Google Cloud Run Deployment | [`.agents/skills/deploy_cloud_run.md`](file:///d:/TY-IT/Projects/Android%20ICA/.agents/skills/deploy_cloud_run.md) | `@devops` |

---

## 📁 Key Universal Directories

| Plane | Directory | Purpose |
|---|---|---|
| **Control** | [`.agents/`](file:///d:/TY-IT/Projects/Android%20ICA/.agents) | Core agent configurations, 9 personas, 6 skills, and 2 workflows |
| **Memory** | [`memory/`](file:///d:/TY-IT/Projects/Android%20ICA/memory) | Context index, ADR decision log, session briefs, token ledger, semantic cache |
| **Data** | [`artifacts/task_lists/`](file:///d:/TY-IT/Projects/Android%20ICA/artifacts/task_lists) | Living `Master_Blueprint.md` — single source of truth |
| **Design** | [`docs/`](file:///d:/TY-IT/Projects/Android%20ICA/docs) | UI/UX design tokens, component trees, and API documentation |
| **App** | [`frontend/`](file:///d:/TY-IT/Projects/Android%20ICA/frontend) | Client-side application code |
| **App** | `services/` | Backend microservices and business logic (generated per blueprint) |
| **App** | `database/` | Database schemas, SQL migrations, constraints, and seeds (generated) |
| **Validation** | `app_build/` | Automated test suites and QA validation scripts |
| **Deployment** | `production_artifacts/` | Production `Dockerfile`s, `docker-compose.yml`, and deploy scripts |

---

## 🤖 Multi-Agent Roster (9 Personas)

| # | Persona | Role | Focus Directory |
|---|---|---|---|
| 1 | `@memory_keeper` | Context Steward | `memory/` |
| 2 | `@pm` | Product Manager | `artifacts/task_lists/` |
| 3 | `@architect` | Systems Architect | `artifacts/task_lists/` |
| 4 | `@uiux` | UI/UX Strategist | `docs/` |
| 5 | `@engineer` | Full-Stack Engineer | `services/`, `database/`, `frontend/` |
| 6 | `@qa` | QA Engineer | `app_build/tests/` |
| 7 | `@sec_auditor` | Security Auditor | `artifacts/audit_report.md` |
| 8 | `@devops` | DevOps Master | `production_artifacts/` |
| 9 | `@tech_writer` | Technical Writer | Root, `docs/` |

---

## 🆕 What's New in v2.0

- **Memory Plane** (`memory/`): Persistent cross-phase context via indexed retrieval, eliminating full-file re-reads.
- **`@memory_keeper`**: 9th persona — context steward that runs before and after every agent's phase.
- **Context Budget Governor**: 4,000-token ceiling on raw file content per invocation.
- **Architecture Decision Records (ADRs)**: Append-only decision log surviving across cycles.
- **Parallel QA + Security**: Both run concurrently against diff + session brief, halving context-loading cost.
- **Semantic Cache**: Hash-keyed boilerplate reuse (Dockerfiles, CRUD scaffolds, README skeletons).
- **Closed-Loop Observability**: DevOps writes production feedback briefs consumed by the next iteration's Phase 0.
- **Model Tiering Guidance**: Route formulaic tasks to lightweight models, reserve frontier models for architecture.
- **Handoff Schema Contracts**: Machine-checkable JSON schemas at phase boundaries reduce ambiguity.
