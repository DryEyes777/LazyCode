# Worktree Orchestrator — Build-Readiness Repair Plan

Date: 2026-09-26
Status: approved, implemented, and locally installed on 2026-09-26; see the [implementation record](worktree-orchestrator-build-readiness-implementation.md)
Audience: project owner and the agents implementing the plugin changes

## Outcome and scope

Make the existing plugin a practical tool for building LazyCode: retain trustworthy acceptance and isolation controls while reducing manual recovery, repeated checks, oversized assignments, and repeated review. This is a repair and workflow-hardening pass, not a production execution controller or a second agent harness.

The user supplied ten trial reports and additional observations. They consistently support the value of receipts, protected candidates, retained failures, independent review, and scoped corrections. They do not establish successful hierarchical helper implementation or its cost savings. Several later runs continued correctly, while others needed repeated human resumptions. These are qualitative reports, not independently replayed benchmarks or controlled model comparisons.

The plan follows the decision to improve the native plugin first and defer a production controller. User approval authorized its implementation, not live App Server experiments or changes to unrelated LazyCode policies. The source findings and proposed changes below preserve the approved pre-implementation plan; the linked implementation record documents the delivered result.

### Preserve

- Protected candidate worktrees, parent ownership, existing capacity limits, paired review, and separate user-approved promotion and push.
- Required tests, real-helper integration checks, truthful exceptions, retained failures, source-mutation guards, secret filtering, and owned-process barriers.
- Astra for Feature planning/user decisions; GPT-6 Sol medium for coordination and coupled work; GPT-6 Luna for suitable bounded work and proportionate review. Preserve the current profile IDs and efforts.
- Existing logical worker/reviewer identities through corrections and authorized replacements.
- Project-specific commands, versions, test targets, data setup, and environment semantics in project-owned profiles.

### Exclude

- A daemon, persistent background scheduler, live bridge connection, control of existing desktop conversations, or new automatic model calls.
- Guaranteed continuation after the root conversation ends. Native guidance and better next actions can improve operation, not provide that guarantee.
- Squash merges/promotion, retrospective consolidation of existing history, new sandbox providers, or a new runtime database.
- Trial-project repairs, registry migration during installation, branch/worktree cleanup, automatic chat archival/deletion, and pushes.
- Weaker review or test gates, automatic approval of scope changes, and paid AI benchmark replays.

LazyCode's explicit merge policy and mandatory fresh Delivery-level full test run remain unchanged. The plugin will adopt LazyCode's existing editable-commit rules, as confirmed by the user on 2026-09-26; squash is not wanted. See [Git strategy](../repository-workspace-and-git.md) and [verification policy](../review-testing-and-completion.md).

## Current source findings

Editable source: `/Users/alexandrehoule/plugins/worktree-orchestrator`.

Modules below are under `skills/orchestrate-worktrees/scripts/`.

| Area | Current mechanism | Planned correction |
| --- | --- | --- |
| `worktree_orchestrator.py: task_lock` | General filesystem errors can become a busy-state error | Typed diagnostics and bounded contention-only retry |
| `verification.py: _run_one` | Successful target probes require nonempty output | Explicit probe assertions; silent exit-success is valid where output is not required |
| `worktree_orchestrator.py: cmd_start_iteration` | Current HEAD replaces the task comparison baseline | Separate task, correction, review, and integration baselines |
| `composition.py: build_packet` | Packet attribution uses the mutable task baseline and current checkout HEAD | Session-bound immutable target and purpose-specific comparison |
| `execution.py: observe` | Acknowledgment requires agent, thread, and turn IDs together | Capability-aware native observations without invented IDs |
| `execution.py: next_actions` | Actions primarily follow existing execution records | Include lifecycle work without a reservation and clarify dispatch/wait/recovery actions |
| `verification.py: require_receipts` | Evidence is scoped to profile/run records with narrowly supported reuse | Explicit obligation-to-receipt mapping with conservative equivalence rules |

Existing guards must be reused, not duplicated in a parallel state machine. Existing interrupted-run recovery, child synchronization, compositional certificates, and disabled bridge tests remain regression obligations.

## 1. Diagnostics and workspace-safe operations

### Changes

1. Classify lock contention separately from permission denial, missing checkout, invalid state, and other I/O failures. Include a stable error code, operation, sanitized path, and actionable recovery category.
2. Retry only genuine transient contention. Never describe a denied write as a held lock. Treat persisted lock-owner metadata as diagnostic; successful OS lock acquisition is authoritative. Do not delete lock files merely because a recorded PID is gone.
3. Normalize relative task, check, and artifact paths against the registered checkout, not the caller's incidental working directory. Preserve the role-specific parent/candidate/destination checkout rules.
4. Validate canonical worktree path, Git common directory, branch, logical owner, allowed paths, and expected HEAD before managed mutations. Reject symlink/path escapes and unexplained checkout changes.
5. Add a managed writer checkpoint operation because ordinary writer commits currently lack one consistent plugin-owned entry point. Bind staging/commit to the registered worktree and explicit owned paths; never broadly include unrelated changes. Enforce the editable-commit policy below instead of creating a new commit for every checkpoint or correction.
6. Use read-only preflight/status diagnostics before dispatch to surface missing scope, executable, profile, and checkout prerequisites together. Genuine new scope still needs approval.

This protects operations routed through the plugin. It is not an OS sandbox preventing every arbitrary shell edit; instructions must explicitly require the managed path, and validation must expose deviations rather than claim they are impossible.

### Commit consolidation without squash

- Each managed branch has one editable implementation commit per segment. Its first meaningful checkpoint creates that commit; further progress and review corrections amend it. A no-change checkpoint is a no-op, not an empty commit.
- Merging a child into the branch, merging its parent into the branch, or successfully pushing the branch closes the segment and permits another implementation commit. Failed/aborted merges and failed pushes do not open a slot. Never amend a merge commit.
- A leaf without these boundaries produces one implementation commit containing its work and corrections. A coding parent may have an implementation commit, explicit child merge commits, and another implementation commit after integration. No squash or rebase is introduced.
- Published commits and commits already integrated into a parent are immutable. Corrections after integration follow the existing corrective-work rules. Push remains user-requested; this pass does not authorize publication or add a publishing service. If publication status cannot be established, refuse amendment and require reconciliation rather than risk rewriting shared history.
- Persist segment identity, its editable tip, and merge/publication/integration boundaries. Check the expected branch, HEAD, ownership, and publication state under the existing operation locks before amendment. Journal the old/new commit mapping and reconcile uncertain outcomes before retrying.
- Preserve reviewed/tested revisions and active child bases with plugin-owned local references before amendment. Keep these references outside ordinary branch history and retain them while evidence or dependent work needs them; do not rely on reflog expiry. Do not force-update child branches. Parent amendments while children exist require explicit base/synchronization reconciliation before integration.
- Amendments are not necessarily descendants of their previous tip. Correction packets and recovery must use the recorded old/new mapping and exact content comparison, not an ancestry-only assumption. Changed code needs fresh verification and same-reviewer follow-up; historical receipts never become new passes merely because the logical commit slot is unchanged.
- No administrative commits merely to advance task state, finalize a receipt, or satisfy readiness. Existing trial, published, and integrated history is not rewritten by installation or adoption.

### Acceptance

Permission failures return immediately with the correct category; real contention remains retriable. Stale metadata does not block an acquired lock. Wrong-worktree, wrong-branch, unexpected-file, escaped-path, and stale-HEAD operations fail before mutation. A valid nested invocation resolves paths consistently. Repeated leaf checkpoints/corrections leave one implementation commit in branch history; valid merges/publication open new segments without rewriting earlier history. Exact old revisions remain available for review and dependent children.

## 2. Stable correction and readiness transitions

### Changes

1. Keep separate immutable references for the original task baseline, each correction baseline, each reviewed submission, accepted child content, and integration result.
2. Extend existing iteration/reopen commands instead of adding several overlapping recovery commands. Starting an iteration must not erase the original contribution or silently create an empty review range.
3. Support explicit reconciliation when an owned writer advanced or performed a managed amendment before iteration registration. Require recorded prior readiness, actual expected HEAD, ownership, clean checkpoint, the recorded amendment mapping where applicable, and no conflicting live execution. Preserve changes and history; invalidate affected readiness/review/test obligations without a dummy commit. Arbitrary non-descendant history changes are not automatically accepted as managed amendments.
4. Unexpected user edits remain a human escalation. Reconciliation is not permission to absorb arbitrary changes.
5. Permit recording a genuinely observed historical review against its original packet/revision after branch movement. Such a record cannot accept the newer HEAD. Do not fabricate timestamps or retroactively manufacture dispatch/review evidence.
6. Preserve same-owner repair loops before parent acceptance. Post-integration corrections remain explicit corrective work; do not reopen accepted history or create tiny repair streams for every finding.
7. Make transitions retry-safe using expected revisions and recorded operation outcomes. Do not blindly repeat uncertain Git or process operations.

### Acceptance

Late correction registration retains the actual patch. Same-SHA contract reapproval can receive fresh review. Top-level and nested readiness drift have supported recovery. Historical review remains inspectable without validating new code. Existing work, process barriers, and unrelated leases are preserved.

## 3. Session-bound review packets and finding continuity

### Changes

1. Generate packets from the reserved review session's exact target, not mutable HEAD. Include the packet digest, current approved contract, applicable guidance/decisions, immutable source references, and the appropriate comparison baseline.
2. Initial task review covers the authored contribution; correction review covers changes since the relevant preceding review plus outstanding obligations; final Feature review covers acceptance, composition, new integration changes, and evidence.
3. Include settled finding dispositions and their rationale. Keep the two current reviewers' initial findings independent; historical dispositions are shared context, not disclosure of the peer's current review.
4. Preserve accepted child contracts, content/mode hashes, evidence, and ownership. Changes to a helper/interface or conflict-resolution delta require targeted coverage. Unknown attribution is never silently excluded.
5. Reject unexpectedly empty corrective packets. Explicitly allow explained cases such as unchanged-code contract review or composition-only final review; an empty patch is not an automatic pass.
6. Track valid follow-up/replacement lineage across multiple sessions. A descendant review closes a finding only if it explicitly covers that finding at the relevant revision with inherited reviewer responsibility. An unrelated passing review cannot close it.
7. Reopening a settled finding requires new evidence or a changed contract. Keep one stable pair through corrections, batch accepted fixes, and use Oracles only for named disputes. Do not impose a review-count cap that ignores real defects.
8. Preserve Git objects and artifacts still referenced by review certificates through managed cleanup.

### Acceptance

Moving a checkout after reservation cannot change what the reviewer is asked to review. Adjudicated objections are present in follow-up packets. Legitimate multi-hop follow-up closes the correct findings; stale, unrelated, and wrong-contract reviews do not. Recursive helper coverage survives integration and cleanup, and changed helpers lose only the affected coverage.

## 4. Verification plans and conservative evidence reuse

### Profile and probe fixes

- Require explicit coverage categories: changed tests, full applicable fast unit suite, real-helper internal integration, and applicable later regression obligations. A focused test command alone cannot claim full-unit coverage. Projects define and review their actual commands; the plugin cannot infer semantic coverage from a command name.
- Define success assertions for probes. Ordinary target/readiness probes may succeed silently with exit zero. Version/output assertions still require their declared result. Empty context output cannot establish environment identity or enable reuse.
- Validate stage/check dependencies and review gates before execution. Required early tests must be runnable before review; expensive regression may depend on code review, never on final acceptance that itself needs those tests.
- Expose the required/available/missing check plan and the reason a check must rerun. Commands and probes retain drain, output capture, secret, and ownership rules.

### Evidence model

Distinguish an immutable execution receipt from an acceptance obligation and from an equivalence/reuse decision. Several compatible obligations may reference one run without claiming multiple executions.

Reuse is explicit, profile-authorized, and check-specific. It requires:

1. Matching relevant source and test content, including file modes and required generated/loaded code. Default to the whole repository input tree; only specifically approved non-input report paths may be excluded. Do not infer irrelevance from a `.md` extension.
2. Matching check command, runner/tool identity, approved semantics, contract/guidance inputs, and required cases/artifacts.
3. Measured compatible runtime/configuration/data/cache conditions for checks that depend on them. A path string, static claim, or arbitrary echoed token does not establish equivalence. Allow a declared hermetic check policy; do not require external-state probes for a genuinely hermetic check.
4. Valid original evidence, stopped owned processes, and no newer contradictory failure or unaccounted mutation.
5. No requirement for a fresh execution at the receiving boundary.

Supported reuse cases in this pass are identical-content revisions, equivalent child/candidate/Feature obligations within the same managed Feature, and approved report-only changes. Cross-Feature/global caches and general semantic code equivalence are out of scope. Different check IDs or scope names require an explicit mapping; they are not automatically equivalent.

Record both the original tested SHA and the receiving SHA/scope. Reuse does not move a review verdict to different code or waive composition review. Changed application/test/configuration inputs require the established fresh checks. Mandatory final Delivery reruns remain mandatory.

Keep operational receipts outside the application input tree as today. Committed reports may use the narrowly approved exclusion policy; never broadly exclude project instructions, contracts, schemas, test configuration, or source to avoid reruns. Unknown compatibility means rerun.

### Acceptance

Reusing a compatible run removes a redundant scope-only or commit-metadata-only execution. Changes to code, tests, command, contract, environment, data, required cases, or a fresh-run boundary reject reuse. Missing/tampered evidence and later failures cannot be hidden behind old passes. Silent probes work without weakening identity probes. Full fast-suite coverage is required at profile approval.

## 5. Native execution bookkeeping and actionable continuation

### Changes

1. Extend `next-action` to cover the complete Feature lifecycle even when no execution record has yet been reserved. Return ordered actions with the responsible operator, bound checkout, expected revision, prerequisites, and a reason.
2. Distinguish dispatch, reactivate-idle-worker, message-running-worker, wait-on-specific-child/process, collect-result, recover-in-scope, and request-human-decision. Never treat a reservation or announced intention as execution.
3. Define native transport capabilities. Record observed native agent IDs and plugin-owned activation/request IDs; thread/turn IDs are optional when unavailable, not invented. Keep App Server correlation requirements strict for its separate disabled adapter.
4. Record the origin and confidence of observations. An acknowledgment proves only what the native tool returned. Terminal evidence must bind to the recorded activation; uncertain/uncorrelatable outcomes require reconciliation before retry or cleanup.
5. Add guarded reconciliation for never-dispatched reservations, confirmed terminal executions, duplicates, and superseded attempts. Preserve historical events. Unknown possibly-live workers remain blocking for conflicting operations.
6. A runtime turn ending prompts an assessment of remaining task work; it cannot automatically trigger acceptance or fresh dispatch. Partial results stay with the existing owner. Expected owner-authored uncommitted work must be distinguished from unexplained edits during recovery.
7. Update coordinator instructions to perform authorized next actions, wait through the available native event/wait mechanism, and avoid status-only final replies, short polling, unrelated waits, or repeated approval requests. Routine errors should yield a supported recovery action, not a vague blocker.
8. Retain user pause, human approval, and unexpected-restart boundaries. Do not convert every infrastructure failure into a user decision, or every ended turn into an automatic retry.

The main Feature Lead stays out of routine integration. Native wait calls should not deliberately wake a model just to restate unchanged status. If the host cannot provide a required observation or wakeup, expose that limitation rather than claiming autonomous continuation.

Official Codex documentation distinguishes turn start, steering, and completion events; a surrounding controller would still be separate work. See [App Server lifecycle](https://learn.chatgpt.com/docs/app-server#lifecycle-overview). This plan does not enable that controller or use App Server to control live agents.

### Acceptance

Scripted native events show the next authorized action after partial worker completion, review, tests, and integration. A never-started reservation is not running; idle and running targets get different actions. Missing optional thread/turn IDs do not create a permanent dead end. Duplicate/stale events cannot accept work, free live resources, or dispatch duplicate workers. Paused/user-blocked work never resumes from ordinary completion events.

## 6. Meaningful decomposition and model allocation

### Changes

1. Persist a short decomposition assessment before activating implementation: retained responsibility, proposed helper contracts, file ownership, parent-supplied tests, dependencies, integration behavior, and model selection rationale.
2. Require a concrete reason for single-owner work. A change spanning several layers is not automatically indivisible; a useful helper needs an independent behavioral contract, not simply a small line count.
3. Require the coding parent to commit executable behavioral tests before activating the helper. Validate test references and ownership; independent review checks whether tests express the contract, since file existence alone proves little.
4. Prefer Luna for clear bounded implementations and matched leaf review. Record why Sol is selected for broader/coupled work; preserve justified stronger reasoning configurations. Do not require user approval for every in-plan helper or create another mandatory approval agent.
5. Preserve disjoint concurrent ownership. If a helper belongs in an existing shared file, either retain it with the owner or explicitly serialize/replan ownership. No concurrent method-level edits or architecture changes solely to generate tasks.
6. Keep corrections with the accepted logical assignment until its integration boundary. Do not create new streams for every formatting, fixture, or reviewer correction.
7. Use deterministic runner output directly where sufficient. Use the existing Luna verifier when bounded agent investigation is useful, not solely to narrate a completed command.
8. Keep visible model/role/effort labels and requested-versus-observed routing. Measure actual usage and justified selections; do not infer cost improvement from agent counts.

### Acceptance

A scripted parent/helper scenario has protected parent tests, separate implementation ownership, Luna-selected leaf tasks, stable correction ownership, bottom-up integration, and parent-only compositional review. A genuinely cohesive scenario stays single-owner with a reason. Existing helpers are reused; extra tasks are not created to meet a delegation quota.

## 7. Compatibility, implementation boundaries, and rollout

### Versioning

Use registry v6 and verification profile v3 for the changed baseline, editable-commit segment, execution-observation, obligation, and probe/reuse contracts. Reuse existing storage paths and modules. Keep v5/v2 and older records inspectable and preserve original evidence; old data must not silently acquire stronger guarantees.

Provide an explicit v5 adoption path with a dry-run report. Copy only facts that can be established, list ambiguous baselines and missing capability/coverage declarations, and require them to be resolved before affected execution. Do not guess historical observations, verification categories, equivalence, or whether a commit is safely amendable. Preserve pre-adoption history and establish a prospective managed segment only through explicit reconciliation. Installation never invokes adoption, resumes work, or changes saved routing.

### Implementation order and ownership

1. Freeze backups and regression fixtures; define v6/v3 record shapes and compatibility boundaries.
2. Diagnostics, path binding, managed commit segments, and evidence-retaining checkpoints.
3. Stable correction transitions and session-bound review/finding lineage.
4. Profile/probe fixes and obligation/evidence reuse.
5. Native observations and complete next-action recommendations.
6. Decomposition declarations, routing rationale, and coordinator/worker/reviewer instructions.
7. End-to-end deterministic regressions, independent review, packaging, and installation.

Keep one writer per module. The main CLI is a shared integration hotspot: do not assign several concurrent writers to it. Independent helper modules/tests can be delegated after their interfaces and parent contract tests are fixed. Use one independent final reviewer pair with complementary correctness/lifecycle and evidence/ownership scopes; batch accepted corrections and return the delta to that pair. Existing verified helper coverage is carried into that review.

### Test matrix

Use temporary repositories, scripted agent responses, synthetic receipts/artifacts, fake clocks/processes, and no live model calls. Tests must cover:

- Permission denial versus true lock contention, stale lock metadata, symlink escapes, wrong checkout, and unrelated staged/unstaged changes.
- Repeated checkpoint/correction amendments, no-op checkpoints, explicit child/parent merges, successful versus failed push boundaries using local test remotes, published/integrated amendment refusal, unknown publication state, and interrupted checkpoint recovery.
- Old-SHA evidence retained through amendment and Git garbage collection, non-descendant managed correction deltas, active child-base reconciliation, and rejection of unrecorded history rewrites.
- Late iteration registration, valid owned drift, unexpected user edits, unchanged-SHA contract reapproval, and historical review recording.
- Immutable packets, explained/unexplained empty deltas, multi-hop reviewer lineage, invalid closure, and settled findings reopened only with new evidence.
- Recursive accepted helper reuse, changed-helper invalidation, parent synchronization, ownership overlap, protected tests, and cleanup-retained references.
- Silent successful probes, required-output failures, missing full-fast coverage, cyclic gate rejection, and stage prerequisites.
- Same-content different-SHA reuse, scope mapping, report-only reuse, changed execution inputs, mutable environment uncertainty, tampering, later failure, and mandatory fresh boundaries.
- Reservation without dispatch, missing optional native IDs, partial turns, idle reactivation, duplicate/out-of-order events, uncertain dispatch, and paused work.
- Existing promotion, exact target authority, exceptions, process draining, secret filtering, source mutation, routing, cleanup, and older-state safeguards.

Run the full standalone Python suite, plugin/skill validators, live-profile/template equality checks, and applicable LazyCode documentation tests. Implementation/review agents are development participants, not test fixtures; the test suite itself must not invoke real models.

### Install and handoff

- Back up editable source and affected live profiles; compare against the starting snapshot before overwriting concurrent changes.
- Update only relevant plugin instructions/templates/live profiles; preserve global model settings and unrelated skills.
- Use the supported cachebuster helper and personal-marketplace reinstall flow, then verify installed/source equality and installed focused checks.
- Do not change the completed trial or existing task registries. Start a new Codex task/Feature for the new workflow.
- Record delivered changes, tests, known native-runtime limitations, and recovery guidance. Do not claim measured savings or helper-delegation success from fake tests alone.

## Definition of done and next use

The repair is complete when the deterministic scenarios pass, the scoped reviewer pair accepts the implementation, the standalone package installs consistently, and the updated workflow documents its actual limits. No dummy commits or unsupported raw-Git recovery are required for the covered scenarios.

The next suitable real LazyCode implementation feature should naturally exercise a parent plus independently owned helper contracts. Do not build a throwaway feature or repeat the same paid work merely to benchmark models. Observe manual resumptions, model usage, idle wakeups, repeat checks/reuse reasons, infrastructure recoveries, review expansions, and accepted corrective cycles during normal work.

The current pass does not redefine LazyCode. Its lessons are readiness inputs for the already-established [worker lifecycle](../worker-identity-and-lifecycle.md), [delegation](../delegation-and-task-contracts.md), [review](../review-testing-and-completion.md), and [runtime boundary](../deepseek-harness-boundary.md). Reliable autonomous scheduling and any relaxation of Delivery verification remain separately scoped decisions. Squash publication is excluded by the user's preference; commit consolidation follows LazyCode's existing rules instead.
