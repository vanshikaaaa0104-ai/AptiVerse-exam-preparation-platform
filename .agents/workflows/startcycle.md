---
description: Start the Autonomous AI Developer Pipeline sequence with a new idea
---

When the user types `/startcycle <idea>`, orchestrate a comprehensive, multi-agent development pipeline strictly using `.agents/agents.md` and `.agents/skills/`.

### Guiding Principles:
- **Iterative Refinement:** Code is never generated in a single pass. It must be planned, drafted, reviewed, and refactored.
- **Strict Context Boundaries:** Agents must only act within their assigned roles to prevent hallucinations and overlapping logic.
- **Fail Fast:** If any test or security audit fails, the cycle halts and loops back to the Engineering phase before proceeding.
- **Memory First (v2.0):** Every phase begins with an indexed context load and ends with a memory commit. Full-file reads are the fallback, not the default.

### Execution Sequence:

#### Phase 0: Memory Briefing (NEW — v2.0)
0. Act as the **Context Steward** and execute `manage_memory.md` Phase 1 (Pre-Phase Retrieval). Load `memory/context_index.yaml`, pull the most recent 1–3 relevant session briefs and any open ADRs from `memory/decision_log.md`. Assemble a Context Packet capped at the Context Budget Governor limit (default: 4,000 tokens). Pass this packet to the Product Manager.

#### Phase 1: Ideation & Architecture
1. Act as the **Product Manager** and execute `write_specs.md`. Generate a comprehensive Business Requirements Document (BRD) outlining user stories, edge cases, and success metrics for `<idea>`. Use the Context Packet from Phase 0 to avoid re-reading existing artifacts.
   *(PAUSE: Wait for user to type "Approved". If feedback is given, revise and loop until approved.)*
1a. Act as the **Context Steward** and execute `manage_memory.md` Phase 2 (Post-Phase Compaction). Log BRD decisions to `memory/decision_log.md`, index new artifacts in `memory/context_index.yaml`, emit a session brief.
2. Shift context, act as the **Systems Architect**. Define the underlying data models, entity relationships, API contracts, and technology stack. Ensure the architecture supports scalability and strict data integrity.
   *(PAUSE: Wait for user to type "Approved". Do not write application code until the foundation is validated.)*
2a. Act as the **Context Steward** and execute `manage_memory.md` Phase 2. Append ADR(s) for stack/schema/contract choices, refresh the context index for all new spec files.

#### Phase 2: Implementation & Guardrails
3. Shift context, act as the **UI/UX Strategist**. Use the Context Packet and Architect's session brief from Step 2a to align the visual identity with the approved ERD and API contracts. Generate a component tree and visual styling guidelines to ensure a cohesive, high-retention user experience across all interfaces.
3a. Act as the **Context Steward** and execute `manage_memory.md` Phase 2. Index the new `docs/design_system.md` and `docs/component_tree.md` artifacts, emit a session brief for this phase.
4. Shift context, act as the **Full-Stack Engineer**, and execute `generate_code.md`. Implement the application incrementally (e.g., core domain logic first, then API routes, then frontend). Strictly adhere to the Architect's API contracts and the UI/UX rules. Before generating boilerplate (Dockerfiles, CRUD scaffolds, README skeletons), check `memory/cache/` for a hash-matched cached output.
4a. Act as the **Context Steward** and execute `manage_memory.md` Phase 2. Emit a session brief for this phase, refresh the context index for all files touched by the Engineer.

#### Phase 3: Extreme Validation (Parallel)
5a. Shift context, act as the **QA Engineer**, and execute `audit_code.md`. Verify business logic against the PM's original BRD, check edge cases, and ensure proper error handling is in place.
5b. **Concurrently**, shift context, act as the **Security & Performance Auditor**. Scan the generated codebase for vulnerabilities (e.g., injection risks, insecure endpoints) and inefficient queries.
   *(Both agents operate against the session brief + diff from Phase 2, not the full repository.)*
   *(CONDITIONAL LOOP: If QA or Security finds critical flaws, compile an error report and loop back to Step 4. Do not proceed to deployment until all checks pass.)*
6. Act as the external validation layer — submit a Pull Request for **CodeRabbit** review. Do not proceed to Phase 4 until critical CodeRabbit suggestions are addressed.

#### Phase 4: Delivery
7. Shift context, act as the **DevOps Master**, and execute `deploy_app.md`. Generate production-ready artifacts (e.g., `Dockerfile`, environment variable templates, deployment manifests). Use `memory/cache/` for boilerplate reuse.
8. Shift context, act as the **Technical Writer**. Auto-generate a comprehensive `README.md`, API documentation, and local setup instructions. Output a final readiness summary to the user.
9. Act as the **Context Steward** and execute `manage_memory.md` Phases 2, 3, and 4. Perform full-cycle compaction: emit final session brief, append any remaining ADRs, refresh the entire context index, append token ledger entries for all agents in this cycle, and run garbage collection on stale session briefs.