# Development Readiness Checklist

Last updated: 2026-09-26
Current focus: Step 2 — define the SQLite persistence spike

Quick progress tracker for moving from product definition to implementation-ready Features. Detailed contracts belong in the resulting Feature plans, not this checklist. Completing this checklist does not automatically authorize implementation.

## 1. Reconcile readiness

- [x] Record the completed orchestration-plugin work as the previously pending prerequisite.
- [x] Reconcile stale or conflicting project guidance and separate established decisions from open technical questions.
- [x] Summarize the remaining decisions and which upcoming Feature needs each one.

Done when: the documentation gives one consistent starting point, with no hidden implementation assumptions.

Completed 2026-09-26. See the [reconciled baseline and open-decision register](development-readiness.md). Unresolved ownership questions are explicitly flagged for technical planning, not silently decided.

## 2. Define the SQLite persistence spike

- [ ] Define scope and technical approach for snapshots, ownership, branch imports, conflicts, replication, and recovery.
- [ ] Set deterministic acceptance checks using real SQLite and temporary Git repositories, without live AI calls.
- [ ] Obtain user approval of the Feature definition and technical plan before implementation.

Done when: the first technical Feature is specified and approved; building the spike is separate work.

## 3. Plan the minimum end-to-end application

- [ ] Bound the milestone to one repository, one active Delivery, and a minimal web interface.
- [ ] Define the necessary hosting, execution, permissions, worker-lifecycle, and safe-dogfooding contracts; use persistence-spike findings before finalizing dependent plans.
- [ ] Break the workflow into ordered Features with a scripted-agent acceptance scenario covering review/correction, pause/recovery, and user-approved merge.

Done when: the implementation sequence and its approval gates are clear. Sandbox providers, automated browser QA, and broader concurrency remain later work.

## References

- [Roadmap](roadmap.md)
- [Evaluation and implementation requirements](evaluation-and-implementation-roadmap.md)
- [Completed orchestration-plugin work](research/worktree-orchestrator-build-readiness-implementation.md)
