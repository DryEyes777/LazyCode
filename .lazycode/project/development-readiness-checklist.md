# Development Readiness Checklist

Last updated: 2026-09-26
Current focus: Step 3 — plan the minimum end-to-end application (in progress)

Quick progress tracker for moving from product definition to implementation-ready Features. Detailed contracts belong in the resulting Feature plans, not this checklist. Completing this checklist does not automatically authorize implementation.

## 1. Reconcile readiness

- [x] Record the completed orchestration-plugin work as the previously pending prerequisite.
- [x] Reconcile stale or conflicting project guidance and separate established decisions from open technical questions.
- [x] Summarize the remaining decisions and which upcoming Feature needs each one.

Done when: the documentation gives one consistent starting point, with no hidden implementation assumptions.

Completed 2026-09-26. See the [reconciled baseline and open-decision register](development-readiness.md). Unresolved ownership questions are explicitly flagged for technical planning, not silently decided.

## 2. Define the SQLite persistence spike

- [x] Define scope and technical approach for snapshots, ownership, branch imports, conflicts, replication, and recovery.
- [x] Set deterministic acceptance checks using real SQLite and temporary Git repositories, without live AI calls.
- [x] Obtain user approval of the Feature definition and technical plan before implementation.

Done when: the first technical Feature is specified and approved; building the spike is separate work.

Completed 2026-09-26: [F002 — SQLite persistence validation](../features/F002-sqlite-persistence/feature.md) product-definition revision 1 and technical specification revision 1 were explicitly approved. F002 is Approved, not scheduled or started. See the [planning handoff](../features/F002-sqlite-persistence/handoff.md). Acceptance checks are specified, not executed; Step 2 completion does not claim that the spike is implemented or validated.

## 3. Plan the minimum end-to-end application

Decisions confirmed so far: Delivery-owned integration Tasks, traceable post-Feature-integration corrections, a general test-authoring bootstrap, a separate local backend with browser-independent/event-driven coordination, minimum enforced isolation, default-denied command networking, and controlled research access for eligible workers. See the [minimum application plan](minimum-application-plan.md). Concrete execution, enforcement, and remaining application contracts are still open.

- [x] Bound the milestone to one repository, one active Delivery, and a minimal web interface.
- [ ] Define the necessary hosting, execution, permissions, worker-lifecycle, and safe-dogfooding contracts; use persistence-spike findings before finalizing dependent plans.
- [ ] Break the workflow into ordered Features with a scripted-agent acceptance scenario covering review/correction, pause/recovery, and user-approved merge.

The user approved the [Feature sequence order](minimum-application-feature-sequence.md) on 2026-09-26, with explicit F002, DSH, and isolation validation gates. Candidate labels are not Feature approvals or Delivery assignments. Detailed acceptance and technical contracts remain under planning, so the combined checklist items above are not yet complete.

Done when: the implementation sequence and its approval gates are clear. Sandbox providers, automated browser QA, and broader concurrency remain later work.

Product-definition revision 1 for [F003 — DSH execution validation](../features/F003-dsh-execution-validation/feature.md) and [F004 — local execution isolation](../features/F004-local-execution-isolation/feature.md) was explicitly approved on 2026-09-26. Both are Defined, with technical-plan and deterministic-acceptance drafts under discussion. [Source/platform research](research/execution-and-isolation-validation.md) informs proposed choices; technical approval remains pending. Neither is scheduled or started, and no experiment has run.

F003/F004 technical directions were confirmed on 2026-09-26: application-owned activation processes, native sandbox evaluation, and restricted secret helpers. Low resource use is now an explicit selection gate, including combined/idle overhead and measured capacity recommendations. Detailed specifications remain under review; no experiment or installation has started.

Next execution-planning boundary: [D002 — SQLite validation](../deliveries/D002-sqlite-validation/delivery.md), a Draft F002-only Delivery. Its definition/start approvals and runtime preflight remain pending. Preparing it does not complete Step 3 or start the spike.

## References

- [Roadmap](roadmap.md)
- [Evaluation and implementation requirements](evaluation-and-implementation-roadmap.md)
- [Completed orchestration-plugin work](research/worktree-orchestrator-build-readiness-implementation.md)
