---
description: Trigger a non-destructive, surgical development loop to add new features or fix bugs. Orchestrates regression testing, security audits, and updates the Master Blueprint without overwriting code.
---

# Workflow: Continuous Iteration & Feature Deployment

## Trigger
When the user types `/iteratecycle <feature_request_or_bug>`, orchestrate a non-destructive, surgical development loop using `.agents/agents.md` and `.agents/skills/`.

## Guiding Principles:
- **Zero Regression:** Existing functionality must not break. 
- **Surgical Precision:** Agents must only modify files explicitly related to the new feature or bug. Total application rewrites are strictly forbidden.
- **State Synchronization:** The `Master_Blueprint.md` must be updated to reflect the new reality of the codebase.
- **Memory First (v2.0):** Context is loaded via indexed retrieval from `memory/context_index.yaml`, not by re-reading the full `Master_Blueprint.md`. A one-line bugfix should cost one indexed lookup + a scoped diff read — not a full-repository re-ingestion.

## Execution Sequence:

### Phase 0: Memory Briefing (NEW — v2.0, the critical savings phase)
0. Act as the **Context Steward** and execute `manage_memory.md` Phase 1 (Pre-Phase Retrieval). Extract keywords from `<feature_request_or_bug>`. Query `memory/context_index.yaml` for ONLY the entries matching those keywords — do **not** read the full `Master_Blueprint.md`. Pull the most recent 1–3 relevant session briefs and any open (non-superseded) ADRs from `memory/decision_log.md`. Assemble a scoped Context Packet capped at the Context Budget Governor limit (default: 4,000 tokens). Pass this packet to the Product Manager.

### Phase 1: Impact Analysis & Strategy
1. Act as the **Product Manager**. Read the Context Packet from Phase 0 (not the full blueprint) and the user's `<feature_request_or_bug>`. Write a concise `Feature_Update_Spec.md` and save it to `artifacts/task_lists/Feature_Update_Spec.md`, detailing the new user stories and acceptance criteria.
2. Shift context, act as the **Systems Architect**. Using pointers from `memory/context_index.yaml`, locate the exact files, schemas, and API contracts that need modification. Define exactly which tables, APIs, or components need modification, and which new ones must be created. Do not re-read unrelated schema or service files.
   *(PAUSE: Wait for user to type "Approved". Do not allow code modification until the update strategy is validated.)*

### Phase 2: Surgical Implementation
3. Shift context, act as the **Full-Stack Engineer**, and execute `generate_code.md` with a strict override: **DO NOT scaffold a new app**. Only implement the specific changes outlined by the Architect.
    * If modifying a database, write an incremental SQL migration script (do not drop existing tables).
    * If updating an API, maintain backward compatibility or bump the endpoint version (e.g., `/api/v2/`).
    * Before generating any boilerplate, check `memory/cache/` for a hash-matched cached output.
3a. Act as the **Context Steward** and execute `manage_memory.md` Phase 2. Emit a session brief for the Engineer's changes, refresh the context index for all files touched.

### Phase 3: Regression & Security Auditing (Parallel)
4a. Shift context, act as the **QA Engineer**, and execute `audit_code.md`. Focus heavily on **Regression Testing**. Ensure the new logic connects perfectly with the existing state management and does not break previously working routes.
4b. **Concurrently**, shift context, act as the **Security Auditor**. Scan the modified files for vulnerabilities (e.g., ensuring new database queries are parameterized to prevent SQL injection).
   *(Both agents operate against the session brief + diff from Phase 2, not the full repository.)*
   *(CONDITIONAL LOOP: If QA or Security finds a break, generate a diff report and loop back to Step 3. Do not proceed until regression tests pass.)*

### Phase 4: Blueprint Sync, Memory Commit & Deployment
5. Shift context, act as the **Technical Writer**. Read the successfully implemented code and update the `Master_Blueprint.md`, API documentation, and `README.md` so the documentation perfectly matches the new codebase.
6. Act as the **Context Steward** and execute `manage_memory.md` Phases 2, 3, and 4. Commit the iteration's memory:
   - Emit a session brief for this cycle.
   - Append new ADR(s) for any architectural, schema, or contract decisions made.
   - Refresh `memory/context_index.yaml` entries for all files touched.
   - Append token ledger entries for all agents in this cycle.
   - If this is every 10th completed cycle, run garbage collection on stale session briefs.
7. Shift context, act as the **DevOps Master**, and execute `deploy_app.md` or `deploy_cloud_run.md` depending on the environment. If deploying to production, utilize traffic splitting (e.g., route 10% of traffic to the new container revision) to monitor for silent failures before a full rollout. Emit production feedback data (deployment status, error rates, latency metrics, crash-loop signals) to the **Context Steward**, who writes the production session brief to `memory/session_briefs/` so the next `/iteratecycle` starts with deployment feedback, not blind.