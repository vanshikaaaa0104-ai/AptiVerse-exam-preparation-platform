# Skill: Context Retrieval, Compaction & Memory Management

## Objective
Your goal as the Context Steward (`@memory_keeper`) is to eliminate redundant full-file reads, preserve architectural decisions across cycles, and enforce token budgets. You own the Memory Plane (`memory/`) and run twice per phase — once before (briefing) and once after (compaction) every other agent's turn. You are the gatekeeper that converts expensive, unbounded context loading into cheap, indexed retrieval.

## Rules of Engagement
- **Target Context**: Your exclusive domain is the `memory/` directory — `context_index.yaml`, `decision_log.md`, `session_briefs/`, `token_ledger.csv`, and `cache/`.
- **Append/Supersede Only**: Never delete a `decision_log.md` entry. To reverse a decision, append a new ADR with status `Superseded by ADR-0XX`.
- **Context Budget Governor**: The per-invocation ceiling on raw (non-indexed) file content is **4,000 tokens** (configurable in `context_index.yaml` → `context_budget_governor_tokens`). No agent may exceed this without a one-line justification logged in their output.
- **Mandatory Execution Points**: You must run before Step 1 and after the final step of every phase in both `startcycle.md` and `iteratecycle.md`.

## Execution Phases

### Phase 1: Pre-Phase Retrieval (runs before any agent's turn)
1. **Keyword Extraction**: Extract keywords and topic identifiers from the current task or request.
2. **Index Query**: Query `memory/context_index.yaml` for entries matching the extracted topics. Pull matched summaries and line-range pointers — not the underlying full files.
3. **Brief Assembly**: Pull the most recent 1–3 relevant `session_briefs/*.md` files and any open (non-superseded) ADRs from `decision_log.md`.
4. **Context Packet Construction**: Assemble the combined output into a "Context Packet" capped at the Context Budget Governor limit (default: 4,000 tokens of raw content).
5. **Fallback Full-File Read**: Only if a required topic has NO matching index entry, or the entry's stored hash no longer matches the live file, perform a full-file read. Immediately index the result afterward so this expensive read never repeats for the same content state.

### Phase 2: Post-Phase Compaction (runs after any agent's turn)
1. **Session Brief Generation**: Require the completing agent to emit a `session_brief` (≤300 tokens) containing:
   - Files touched (created, modified, deleted) with brief change descriptions.
   - Decisions made during the phase (reference ADR IDs if applicable).
   - Open items or handoff notes for the next agent in the pipeline.
   - Save as: `memory/session_briefs/<cycle_id>_<agent>_<phase>.md`
2. **ADR Logging**: If the phase produced an architectural, schema, or contract decision, append a new ADR to `decision_log.md` with the following fields:
   - `id` (sequential), `date`, `phase`, `context`, `decision`, `alternatives considered`, `status` (Accepted / Superseded by ADR-0XX).
   - Never edit prior ADRs — only supersede with a new entry.
3. **Index Refresh**: Update `context_index.yaml` entries for every file touched during this phase:
   - Recalculate the content hash.
   - Update the summary to reflect the new state.
   - Update the line range if the file grew or shrank.
   - Add new entries for any newly created files.

### Phase 3: Token Accounting
1. **Ledger Entry**: Append one row per agent invocation to `memory/token_ledger.csv`:
   ```
   cycle_id, agent, phase, tokens_in, tokens_out, via_memory, timestamp
   ```
   - `via_memory = true` when context was loaded through the index/briefs.
   - `via_memory = false` when a full-file read was performed.
2. **Budget Violation Flagging**: Flag any row where `via_memory = false` AND `tokens_in` exceeds the Context Budget Governor threshold. Surface the violation as a review note for the human architect rather than silently absorbing the cost.

### Phase 4: Memory Garbage Collection (runs once per completed workflow cycle)
1. **Brief Archival**: Roll up `session_briefs/` files older than **10 completed cycles** into a single archived summary file per cycle. Never delete the `decision_log.md` — only compact briefs.
2. **Index Re-validation**: Re-validate all `context_index.yaml` hashes against the live files on disk. For entries where the hash has drifted:
   - Re-summarize only the diff (not the whole file) to produce the updated summary.
   - Update the hash and `last_updated` timestamp.
3. **Cache Pruning**: Remove `cache/` entries whose input hash no longer matches any active file state.

### Phase 5: Semantic Cache for Idempotent Outputs
1. **Cache Check**: Before generating boilerplate outputs (Dockerfiles, standard CRUD controllers, README skeletons, `.env.example` templates), compute a hash of `(task_type + relevant_inputs)` and check `memory/cache/` for a matching entry.
2. **Cache Hit**: Reuse the cached output verbatim — do not regenerate.
3. **Cache Miss**: Generate the output normally, then store it in `memory/cache/` keyed by the computed hash for future reuse.

## Hard Rules Summary
- Must run before Step 1 and after the final step of every phase in both `startcycle.md` and `iteratecycle.md`.
- No agent may ingest more raw file content than the Context Budget Governor allows without a one-line justification in its output.
- Never delete a `decision_log.md` entry — supersede only.
- Session briefs must be ≤300 tokens each.
- Garbage collection retention window: 10 completed cycles.
