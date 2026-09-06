# Antigravity Workspace Guidelines & Autonomous Agent Workflows

## Active Workflows & Slash Commands
- `/startcycle <idea>`: Greenfield development cycle (Phase 0 Memory Briefing → Phase 1 Ideation & Architecture → Phase 2 Implementation → Phase 3 Parallel QA & Security → Phase 4 Delivery).
- `/iteratecycle <target>`: Surgical iteration loop for adding features or fixing bugs (Phase 0 Indexed Memory Retrieval → Phase 1 Impact Analysis → Phase 2 Surgical Implementation → Phase 3 Parallel Regression & Security → Phase 4 Blueprint Sync & Commit).

## 9-Persona Roster & Operational Protocol
1. `@memory_keeper`: Owns `memory/` (Context index, ADRs, session briefs, token ledger, cache).
2. `@pm`: Writes BRDs, user stories, acceptance criteria.
3. `@architect`: Defines data models, ERD, API contracts, tech stack.
4. `@uiux`: Creates design systems, component trees, responsive layouts.
5. `@engineer`: Implements modular frontend and backend code matching API contracts. Zero placeholders.
6. `@qa`: Validates business logic against specs, writes test suites, reproduces and verifies bugs.
7. `@sec_auditor`: Scans for OWASP Top 10, SQL injection, XSS, insecure headers, and performance bottlenecks.
8. `@devops`: Creates Dockerfiles, container manifests, and deployment scripts.
9. `@tech_writer`: Generates READMEs, setup guides, and API documentation.

## Guidelines
- Follow the operational protocol in `.agents/agents.md`.
- Read and update `artifacts/task_lists/Master_Blueprint.md` during iteration cycles.
- Never use placeholder comments or delete existing working code unless requested.
