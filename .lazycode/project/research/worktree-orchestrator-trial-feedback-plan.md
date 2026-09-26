# Worktree Orchestrator Trial Feedback — Change Plan

Status: approved, implemented, and installed on 2026-09-12; see [implementation record](worktree-orchestrator-trial-feedback-implementation.md)
Date: 2026-09-12

## Objective and scope

Address the user's trial feedback without embedding the trial project's benchmark, Azure, database, or service-management assumptions into the general plugin. Preserve Astra for Feature planning and user decisions, Terra for operational coordination, Luna-first implementation, paired scoped review, and no paid AI test runs.

The central change is to separate internal candidate integration from promotion into the user's destination branch, and require executable evidence and recoverable lifecycle operations around both.

This plan changes the Codex plugin workflow. It does not implement the LazyCode application, repair or reset the trial repository, replay its benchmarks, or delete its worktrees.

## Evidence boundary

Read all twelve items in the supplied trial feedback and inspected the current editable CLI, installed skill and lifecycle/packet references, and coordinator, verifier, and reviewer profiles. The editable CLI matches the installed `0.1.0+codex.20260911005844` copy.

Code-confirmed mechanisms in `/Users/alexandrehoule/plugins/worktree-orchestrator/skills/orchestrate-worktrees/scripts/worktree_orchestrator.py` include:

- `initial_state()` at line 456 records the current branch as the integration branch; `cmd_integrate()` at line 2081 merges into that designated checkout before whole-Feature acceptance.
- `cmd_verify()` at line 2174 accepts nonempty supplied evidence text and ancestry, rather than a command receipt establishing execution and required results.
- `cmd_verify()` and `cleanup_checks()` at line 2203 consult the child's mutable branch tip.
- `cmd_release_lease()` at line 1672 rejects manual release of paired leases; pair outcomes are pass/blocking, while follow-up requires a changed SHA and completed original pair.
- `cmd_accept_feature()` at line 1585 requires passing review records and no unresolved Findings, but does not establish a complete executed verification plan.

The specific branch names, commit IDs, service restarts, benchmark failures, cleanup counts, and observed performance in the feedback are user-supplied incident evidence. They were not independently reproduced or remeasured. Prior passing plugin tests did not cover the missing lifecycle/evidence guarantees exposed by the trial.

## Disposition of the twelve feedback items

| Item | Classification | Planned response |
| --- | --- | --- |
| 1. User branch used for intermediate integration | Core plugin gap | Dedicated candidate branch/worktree and separately authorized promotion |
| 2. Weak ready/verified evidence | Core plugin gap | Runner-generated receipts, declared required checks, distinct acceptance gates |
| 3. Too many repair streams | Workflow rule not followed, plus recovery gap | Single-owner mode and correction iterations under existing ownership; split only for justified independent work |
| 4. Fragmented recovery identities | Core plugin gap | Stable Feature/Task IDs with attempts, iterations, and supported recovery transitions |
| 5. Verification follows moving branch tip | Core plugin gap | Immutable submission/review/integration snapshots plus separately reported branch drift |
| 6. Reviewer unavailability traps leases | Core plugin gap | Infrastructure outcomes, safe lease release, same-SHA retry, authorized replacement lineage |
| 7. Expensive checks before useful evidence; weakened tests missed | Generic workflow and review changes | Cheap checks and representative execution first; behavior/coverage review; full verification before promotion |
| 8. Lost benchmark samples and unsafe runtime restoration | Primarily project harness defects with reusable lifecycle requirements | Generic owned-run records and completion barriers; project harness persists each sample and restores its own services safely |
| 9. Late environment/capacity discovery | Generic preflight framework; project-specific probes | Configurable runtime/tool/data/cache/storage checks; no Azure/Fabric/SQL/Redis logic in core |
| 10. Incomplete benchmark provenance | Generic evidence schema; project-specific equivalence and metrics | Separate application, runner, environment, data, and cache fingerprints; explicit reuse decisions |
| 11. Cleanup permission and ownership unclear | Core ownership/retention gap plus authorization discipline | Policy declared at Feature start; separate merged cleanup, archive, and authorized discard |
| 12. Misleading or noisy status | Generic reporting changes | Status from actual runs/artifacts, explicit unknowns, precise vocabulary, useful updates only |

## 1. Protected candidate integration and promotion — first priority

Feature initialization must explicitly record the protected destination branch, its starting SHA, and a separate plugin-owned candidate integration branch/worktree. A branch having a name such as `feature/...` does not make it disposable.

All implementation iterations, child integrations, review corrections, and experiment failures stay in the candidate area. The existing hierarchy can still integrate direct children, but `integrate` cannot target the protected destination.

Add a distinct promotion operation requiring:

- an accepted current Feature contract;
- the exact validated candidate SHA;
- complete required verification receipts and current paired review coverage;
- dispositions for relevant open work, Findings, and verification exceptions;
- explicit user authorization for promotion, separate from permission to implement;
- the destination branch's current expected SHA and a clean permitted destination state.

If the destination has changed since validation/authorization, reconcile it into the candidate area and revalidate as required. Do not silently resolve conflicts on the user's branch or overwrite its uncommitted work. Promotion must have a recoverable record; failure or uncertain outcome is inspected before retry rather than blindly repeated.

Push remains a separate, explicitly requested operation. Promotion does not imply permission to publish.

## 2. Executed verification receipts — first priority

Add a small managed command/run path that writes structured receipts from actual execution. An agent's summary or supplied JSON is not equivalent to a runner-generated result.

Receipts identify, as applicable:

- Feature, Task, attempt, iteration, and contract revision;
- immutable application/source revision and worktree cleanliness or captured input fingerprint;
- working directory and the code location actually loaded by the runtime;
- executable/argument vector, tool versions, runner revision, and verification-profile revision;
- runtime/image identity and relevant nonsecret configuration;
- declared data/reset policy and cache fingerprints;
- start/end time, process/session ownership, exit status, and completion state;
- required checks/cases and observed coverage;
- logs and expected artifacts with stable references and content hashes;
- verification outcome, exceptions, and any explicit evidence-reuse decision.

Runtime code-location probes are provided by project/language profiles. The plugin cannot infer that a checkout is what a server or container actually imported merely from the command's working directory. Missing or mismatched identity is explicit and cannot satisfy a requirement that depends on it.

Persist results as they become available. For batch runs, completed units survive later failure, with the overall batch marked incomplete when appropriate. A zero exit code alone is insufficient if required cases or artifacts are missing. Secret values remain excluded from receipts and logs.

A receipt establishes what the runner observed; it does not prove that a test's assertions correctly verify production behavior. Coverage and semantic validity remain review obligations.

Use separate conceptual gates: reviewed submission, integrated candidate, validated candidate, user-authorized promotion, and promoted result. Keep low-level node states where useful, but make their evidence requirements and scope explicit. `verify --evidence "passed"` may remain an annotation path, not the machine-verification authority for new-policy tasks.

LazyCode's existing exceptions remain visible: absent legacy tests are No tests available, and pre-existing/transient external failures may be recorded for explicit user acceptance. None are silently converted into successful execution or used to waive testing for new implementation.

## 3. Stable ownership, attempts, and immutable snapshots — first priority

Preserve a stable Feature ID across retries and recovery. Tasks retain logical ownership while attempts/iterations identify new execution and submission states. Do not invent unrelated Feature-shaped registries for each small correction.

Record immutable submitted, reviewed, and integrated source SHAs plus the parent integration commit. Later branch movement is separate state:

- The accepted snapshot remains verifiable as an ancestor of the recorded integration.
- New commits are explicitly unintegrated and cannot borrow the old acceptance evidence.
- A drifted tail is continued in a new iteration or dispositioned for archive/discard.
- Safe merged-branch cleanup still refuses to delete a branch whose current tip contains unintegrated work.

This avoids invalidating historical acceptance simply because the source branch advanced, while preserving the visibility and ownership of the new work. It does not relabel the new tip as merged.

Support retry, supersede, abandon, and archive transitions with reasons, actor/approval references, predecessor links, and retained evidence. Reopening work inside an unpromoted candidate is different from changing already promoted work, which requires new authorized corrective work.

## 4. Reviewer infrastructure recovery — first priority

Separate technical outcomes from execution outcomes. Review sessions/slots need states such as pending, running, completed, unavailable, and aborted; only a completed review has a pass/blocking technical outcome.

Allow the owner to record an infrastructure failure, establish that the reviewer is no longer running, and release its lease without fabricating a pass or a technical rejection. If termination is uncertain, preserve that uncertainty rather than freeing capacity optimistically.

A reviewer that never completed may retry the same SHA. Preserve the other slot's valid same-revision result where its inputs are unchanged. This is a retry path, not the changed-code correction path.

Unavailable reviewers may be replaced through an authorized, recorded transition. Preserve the predecessor identity, failure reason, requested/effective model information, and logical A/B slot lineage. Subsequent correction follow-up uses the current authorized pair and its history.

Replacement must not be a way to discard a completed blocking review or choose a more agreeable reviewer. Existing Findings and valid evidence remain binding until properly dispositioned. Changed code still requires current-revision review coverage.

## 5. Fewer repair worktrees and better review order

Add an explicit single-owner mode for cohesive experiments, refactors, and repairs: one implementation owner works in the isolated candidate area, with logical steps and iterations rather than new worktrees for every formatting or test-expectation correction.

The coordinator remains non-coding. It delegates edits to that owner through an exclusive writing arrangement; it does not repair code itself. In hierarchical mode, an existing child owner may continue a correction iteration under its existing Feature identity. New isolation is introduced for meaningful independent ownership, not merely because a prior submission was integrated.

Retain the paired review policy. Give the two reviewers complementary emphasis, including the actual production path and changes in test coverage. A test that reproduces cleanup itself instead of invoking production cleanup is a coverage regression to identify, not evidence that production behavior works.

Default verification order is:

1. Project preflight and cheap static/combined checks.
2. A representative end-to-end path that exercises the relevant production behavior.
3. Scoped paired review of behavior, coverage, and integration assumptions.
4. Full required regression/benchmark matrix, with durable results.
5. Final evidence/acceptance check and separately authorized promotion.

After corrections, reuse the established owners and reviewer pair for focused follow-up. Do not launch another blanket audit when only receipts were added at an unchanged candidate. Necessary full tests are not dropped to reduce review latency.

## 6. Project-configurable preflight, runs, and provenance

The plugin should provide a verification-profile contract and receipt interface. A project supplies the actual probes, commands, expected artifacts, prerequisites, and acceptance rules.

Generic preflight categories include runtime/code identity, tool versions, configuration loading, owned active jobs, resource/storage availability, data-reset state, cache state, and required source capabilities. Unknowns and unavailable capabilities are explicit.

Cached-path verification and live-source verification are separately named requirements. A cached success does not imply live-source acceptance. Whether either is required is a Feature/project decision, not a universal plugin assumption.

Separate application revision, runner revision, image, configuration, data/reset policy, cache fingerprint, and metric definitions. Evidence keeps its original provenance. A report-only change may permit reuse through a recorded equivalence decision that identifies the unchanged inputs; a production-code change does not automatically qualify. Unknown equivalence requires rerunning the relevant check.

Long-running jobs have durable per-unit results, retained failures, owned process/session identity, cancellation/interruption records, and a completion barrier before dependent environment restoration. Notification timers do not automatically cancel jobs. Cheap injected-failure tests validate orchestration behavior before expensive workloads run.

## What remains project-specific

Do not hardcode these incident-specific details into plugin core:

- Azure Functions or Core Tools versions and startup/restart commands;
- Fabric schema/source requirements, live refresh behavior, and credentials;
- SQL/Redis names, reset procedures, cached objects, or service lifetimes;
- Docker volume/image cleanup rules and storage thresholds;
- specific serialization behavior, test expectations, or application cancellation semantics;
- benchmark matrix contents, resource sampling, metric definitions, and improvement thresholds;
- claims that a particular refactor improved performance.

Those belong in the trial project's verification profile or benchmark implementation. The general plugin can require evidence and enforce lifecycle ordering, but cannot repair those project defects without a separate scoped request.

## 7. Cleanup authority and retention

Declare cleanup policy at Feature creation, including owned resources, retention expectations, and actions requiring further user approval. Preserve ownership across attempts rather than classifying older attempt IDs as unrelated automatically.

Keep distinct operations:

- **Merged cleanup:** remove clean, inactive worktrees and branches whose current tips are safely preserved in accepted history.
- **Archive:** preserve rejected or superseded candidate work and its evidence, then release active worktrees where safe.
- **Discard:** remove specifically identified rejected work only under recorded user authorization and current-state checks.

Do not require failed work to be merged into the user's branch merely to make it cleanable. Do not broaden merged cleanup into unconditional force deletion. Preview exact targets, verify repository/Feature ownership and current tips, and preserve unexpected manual changes.

Distinguish owned from borrowed services and storage. Stopping a process, resetting test data, deleting a Docker volume, and removing a Git worktree are separate authorities. Initial approval is not an unlimited deletion grant, and the plugin cannot promise to override Codex's independent approval controls.

For old registries, explicitly associate verified attempts with the stable Feature before cleanup. Never infer authority merely from similar names.

## 8. Precise, low-noise status

Derive status from run, process, artifact, review, and Git records. Keep source revision, loaded code, running image, configuration, data/cache state, measurement coverage, and acceptance status separate.

Show completed results, current blockers, and next decisions. Report partial measurements as partial. Distinguish observed state from stale reports or unknown values. Discover required hidden files through declared profile paths and deliberate hidden-file lookup.

Do not send another message merely because a status poll returned unchanged data, except when a platform/user update requirement applies. Astra receives decision escalations and concise outcomes; Terra continues routine coordination.

## Implementation sequence and affected files

### A. Protect the destination and model stable state

Extend CLI state with destination/candidate separation, stable Feature/attempt IDs, immutable submission/integration references, and explicit recovery states. Add initialize/promote operations with separate user approval and expected-destination checks. Update skill, lifecycle reference, task packets, and coordinator profile/template together.

### B. Make verification executable

Add managed run receipts and verification-profile requirements. Change verify/accept/promote gates to consume those records. Cover imported-code mismatch, incomplete results, environment identity, and uncertain command outcomes. Keep project-specific benchmark execution behind profiles rather than expanding the CLI into a benchmarking framework.

### C. Complete review and cleanup recovery

Add unavailable/abort/retry/replacement operations and lineage-preserving follow-up. Implement archive/discard separately from accepted-work cleanup. Preserve existing scope, locks, paired-slot capacity, dirty-tree, and ancestry protections.

### D. Simplify execution and reporting

Add the single-owner mode, correction iterations, staged verification guidance, provenance-aware status, and precise coordinator/verifier/reviewer instructions. Both modes share destination protection and final verification requirements; single-owner is not a bypass mode.

The core implementation primarily affects `worktree_orchestrator.py`, its deterministic tests, the skill/lifecycle/task-packet documents, and the namespaced coordinator/verifier/reviewer and relevant implementer profiles with their mirrored templates. Keep model/effort labels and current Astra/Terra/Luna routing unless separately approved.

## Acceptance tests for the plugin changes

Use temporary repositories, local fake executables/processes, synthetic artifacts, and mocked reviewer/model events. Do not run the user's real benchmark or paid AI tests.

- Failed or partial candidate work never changes the destination branch or dirty destination checkout.
- Promotion requires validated candidate, exact approval scope, and unchanged expected destination; moved-target races fail safely.
- Free-text claims, wrong cwd/import/image, missing artifacts, incomplete matrices, and nonzero/unknown exit status cannot become successful verification receipts.
- Explicitly accepted exceptions remain exceptions rather than green results.
- A later sampling failure preserves earlier durable results without marking the full run complete.
- Runtime restoration cannot proceed while an owned workload is still active or its outcome unknown.
- Old integrated SHAs remain verifiable after child branch movement; new tails stay unintegrated and protected from merged cleanup.
- An unavailable reviewer releases capacity through a valid transition and can retry the same SHA; replacement preserves lineage and cannot erase a technical blocker.
- Repeated repairs remain under the same Feature/owner and do not require a new worktree for each correction.
- Approved archive/discard can clean failed experiments without merging them, while wrong-owner, dirty/unexpected, active, or unapproved targets remain protected.
- Evidence reuse preserves original provenance and requires an explicit valid equivalence decision.
- Profiles/templates match and documented examples work from installed layout, retaining the earlier packaging regression coverage.

## Rollout and compatibility

Back up the current source/profiles and relevant state before implementation. Keep the existing v3 registries inspectable; migration must not turn free-text verification into trusted receipts or silently authorize promotion.

Do not resume or clean the trial project's old attempts as part of plugin installation. Import/link them only through an explicit recovery action with ownership and evidence checks.

Validate in isolation, obtain the agreed paired review and focused corrections, refresh the plugin cache through the supported helper/reinstall flow, and inspect in a new task. Evaluate the result during ordinary authorized work rather than replaying expensive experiments for comparison.

## Relationship to LazyCode

These lessons may refine LazyCode's future implementation plans, especially immutable accepted snapshots, reviewer infrastructure recovery, and receipt-backed acceptance. Do not automatically rewrite its established product policies or implement its SQLite/sandbox architecture in this plugin.

The first approved work should cover destination protection, executed evidence, and coherent recovery. Project-specific performance-harness repairs and profile contents remain separate work.
