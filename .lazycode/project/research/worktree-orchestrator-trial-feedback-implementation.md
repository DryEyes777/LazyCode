# Worktree Orchestrator Trial Fixes — Implementation Record

Date: 2026-09-12
Status: implemented, reviewed, validated, and installed locally
Approved scope: [trial-feedback plan](worktree-orchestrator-trial-feedback-plan.md)

## Installed result

The personal `worktree-orchestrator` plugin now uses the v4 lifecycle and verification policy. The package version is `0.1.0+codex.20260912210118`; this is the existing version prefix with the supported cachebuster, not a new LazyCode release.

- Source: `/Users/alexandrehoule/plugins/worktree-orchestrator`
- Installed cache: `/Users/alexandrehoule/.codex/plugins/cache/personal/worktree-orchestrator/0.1.0+codex.20260912210118`
- Original source and agent backup: `/Users/alexandrehoule/plugins/backups/worktree-orchestrator-20260912-trial-fixes`

Eight namespaced coordinator, implementer, reviewer, and verifier profiles were updated under `/Users/alexandrehoule/.codex/agents`. All ten namespaced live profiles match the plugin templates. Model IDs and reasoning efforts were preserved; no global model setting was changed. Use a new Codex task to pick up the updated skill and profiles.

## Behavior delivered

- Explicit `initialize` creates a separate candidate worktree and protected destination. Internal integration cannot use the destination as its sandbox. `promote` requires exact accepted candidate/destination revisions and separate user authorization; `reconcile-destination` works only in the candidate.
- Stable Feature/Task identities, attempts, and correction iterations preserve ownership and accepted history. Single-owner mode keeps cohesive repairs with one implementation owner. Submitted source, integration, combined verification, and live branch tips are distinct.
- Approved project verification profiles execute real commands through `run-check`. Receipts retain provenance, exits, coverage, logs/artifact hashes, incremental results, and owned process identity. Partial runs, stale profiles, source changes, or altered evidence cannot silently satisfy gates.
- Notification thresholds do not cancel commands. Owned process barriers block restoration/cleanup while liveness is active or unresolved; explicit interruption resolution requires a stopped recorded process group and leaves interrupted work non-passing.
- Explicit exceptions name failed required checks; every other required check needs complete evidence. Empty legacy suites require separate explicit approval and remain exceptions. Narrow approved report-only reuse retains the original run and provenance rather than inventing a new execution.
- Unavailable/aborted reviewers can release leases after confirmed termination, retry at the same SHA, or receive authorized replacements. Per-slot identity, routing, and lineage survive follow-up. Unknown effective routing is labelled unverified, not falsely matched.
- Archive and explicitly authorized discard are separate from safely merged cleanup. They do not require failed work to be merged. Archived/discarded descendants no longer block an otherwise valid parent's cleanup.
- Status reports observed candidate/destination revisions, live tails, routing, and verification state. Updated skill/lifecycle/task-packet/profile instructions describe the supported commands and staged checks.

## Validation and review

Final full deterministic test discovery ran **66 tests: 64 passed, 2 intentionally skipped**, with no failures. The skips select alternative repository/standalone packaging layouts; this run already used a standalone plugin layout. Tests use temporary Git repositories, fake local commands/processes, synthetic artifacts, and recorded reviewer events, not live model calls or the trial project's benchmark.

Plugin manifest validation, skill validation, compilation checks, and profile configuration tests passed. After reinstall, the installed cache was byte-compared against source, all namespaced live profiles were compared against templates, and the installed CLI and profile tests ran successfully.

Two independent Terra reviewers assessed one frozen snapshot. Corrections stayed with the implementation owners and the same reviewers inspected the focused delta. Both follow-up reviews passed. Direct regressions cover the accepted findings: terminal archived descendants, replacement routing metadata, check-specific exception coverage, and tracked artifacts mutating source.

The proposed extra gate requiring effective runtime model metadata before review completion was rejected: the approved policy allows unavailable metadata to be honestly marked unverified. The correction instead resets stale routing claims and labels during replacement without changing that policy.

Final reviewed production SHA-256 values:

| File | SHA-256 |
| --- | --- |
| `worktree_orchestrator.py` | `6ea2eb2538adfe3f0775cced83ed39094f8d44f857b5f604612bc6d0270d5e5a` |
| `verification.py` | `0877077b3f398b6605ab5d79a0d1e970ba6053cd1eeb16e74b3cf20f853a1e9f` |
| `recovery.py` | `14c639b6bb1b03e07610b9a3e49fc148d7f87c01979417beef97ff54c5396c5a` |

## Boundaries and compatibility

The trial repository, benchmark code, branches, worktrees, and old registries were not modified, resumed, migrated, or cleaned. V3 and earlier state stays inspectable; adoption is explicit, retains historical evidence, creates a protected candidate, and does not trust old free-text completion claims. New node IDs `feature` and `root` are reserved for Feature-scoped operations.

This plugin is a cooperative Codex workflow, not an OS sandbox or cryptographic user-approval system. Approval references and observed runtime metadata must be recorded truthfully. Project-specific probes still establish actual server/image/data identity; declared descriptors alone are not evidence. Project runners must manage detached/container service lifetimes explicitly. Promotion is local and never implies permission to push.

No Azure/Functions/Fabric/database-specific behavior or benchmark implementation was added to plugin core. No LazyCode application runtime, SQLite architecture, sandbox, product policy, or dependency release-age setting was changed. No benchmark replay or live-model workflow test was run, and no cost/speed improvement is claimed without ordinary-use evidence.
