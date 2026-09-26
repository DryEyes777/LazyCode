# Evaluation and Implementation Roadmap

Status: established
Last updated: 2026-09-26

## Purpose

This reference defines the first dogfooding milestone, automated acceptance, evaluation during actual use, implementation order, and readiness prerequisites. It defines a development milestone rather than a release. Recording this plan does not start implementation.

## Prerequisite before implementation

The user's prerequisite was improving the Codex orchestration plugin and agent profiles before building LazyCode. That work is [completed and installed](research/worktree-orchestrator-build-readiness-implementation.md). It improves the development workflow; it does not implement LazyCode's runtime or waive its approval gates.

The relevant Feature plans must still resolve outstanding technical contracts before dependent implementation begins. Product-topic approval does not mean every schema, API, or execution mechanism is already specified. The [readiness decision register](development-readiness.md#decisions-required-by-upcoming-work) assigns these questions to upcoming work; the [checklist](development-readiness-checklist.md) tracks planning progress.

## Dogfooding milestone

The first usable version should let the user continue developing LazyCode through LazyCode itself.

It may initially support one repository and one active Delivery while retaining real ownership, approval, delegation, review, testing, persistence, and integration behavior through the web interface.

Multiple repositories, concurrent Deliveries, sandbox-provider integration, and automated browser QA may follow. Manual QA remains available where automation is unsupported.

Deferring the sandbox provider does not waive permission or secret-handling requirements. The initial executor's enforceable scope must be defined before implementation.

## Automated acceptance without AI usage

Automated tests must consume no real AI usage. Scripted agent/model substitutes exercise the actual application mechanisms, including:

- SQLite records, ownership, replication, and snapshots;
- worktree and Git operations in test fixtures;
- permissions and approval gates;
- delegation and review corrections;
- pause, reconstruction, and resume;
- user-approved integration.

An attempted live model call must fail the test rather than silently using available credentials or falling through to a real provider.

The milestone acceptance scenario is:

> Complete a simulated Feature through the web interface, including implementation artifacts, review, corrections, pause, reconstruction, and user-approved merge, using mocked agents.

This validates application behavior, not prompt effectiveness or model reasoning. Synthetic model usage and scripted outcomes are not measured evidence of real agent quality or cost.

Live AI smoke tests are optional, explicitly requested activities. They are not automatic test-suite or milestone requirements, including when credentials happen to be available.

## Evaluation during actual use

Evaluation uses ordinary development the user chooses to perform through LazyCode. Tasks are not duplicated inside and outside the framework merely to compare results.

Record runtime, token usage and cost, human interventions, repeated work, and review-driven corrections alongside the model and instruction configurations used.

These observations guide changes to delegation and role instructions. Individual outcomes support investigation; they do not prove that a configuration is universally better or that a change caused an improvement.

Quality remains the first priority, affordability second, and speed third. Usage attribution and uncertainty follow [Observability and Auditability](observability-and-auditability.md).

## Implementation sequence

The [Jev decision lookup research note](research/jev-decision-lookup.md) records a candidate for later testing: check whether approved Decisions or documentation already answer an agent's question before escalating to someone with sufficient authority, potentially the user. It is not a selected dependency or milestone prerequisite; implementation and live evaluation remain pending.

With the tooling prerequisite complete, proceed through the following sequence, retaining Feature approval and explicit Delivery-start gates:

1. Reconcile stale documentation and conflicting rules, and identify decisions that would otherwise require implementation guesses.
2. Validate SQLite snapshots, branch integration, ownership, replication, and restoration with deterministic tests.
3. Define and implement the minimum application, execution, permission, and web-interface contracts needed for the milestone.
4. Complete the simulated end-to-end acceptance workflow.
5. Use LazyCode for ordinary, explicitly authorized development and improve it from observed results.
6. Add sandbox execution, browser QA, and broader concurrency afterward.

The SQLite spike is the first technical validation priority. OpenSandbox remains the first later sandbox candidate under [Isolated Execution and QA Environments](isolated-execution-and-qa-environments.md); its benchmark is not a prerequisite to beginning the smaller application after the readiness gate is satisfied.

## Clarified Feature and test rules

A Completed Feature may return to Active for corrections to its approved contract before Delivery integration. Once merged, the original Feature remains closed; fixes use new tracked work and a new branch. The precise organization of that post-merge corrective work must be specified in the relevant Feature plan rather than reopening accepted history silently.

Existing projects may adopt test coverage progressively. A missing legacy suite may pass its gate with the explicit reason **No tests available**; this does not claim that behavior was tested or bypass review and user approval.

New implementation still follows LazyCode's test rules, including executable parent-provided tests for delegated implementation. Existing applicable suites run normally. New coverage or infrastructure can be delivered through ordinary Features and Deliveries; there is no new test-preparation assignment category.

## Documentation reconciliation and remaining readiness work

The initial consistency pass identified and reconciled stale D001 roadmap status, Implementation Worker completion wording, Waiting parents whose children await allocation, pre-merge Feature correction, and unconditional live-smoke wording.

The project summary distinguishes established product policies from their still-unimplemented mechanisms. Historical, dated research and current spike limitations remain evidence rather than promises of the intended system's capabilities.

The 2026-09-26 [readiness reconciliation](development-readiness.md) closes stale prerequisite wording and makes unresolved ownership, correction, checkpoint, and runtime contracts explicit. It does not resolve those technical choices by assumption.

Before dependent implementation, technical Feature plans still need to specify:

- initial test authoring and ordering under non-coding managers, within normal Delivery work;
- correction and integration records for closed Features, including partial multi-repository integration when that capability is introduced;
- SQLite merge/replication algorithms and coordinated code-checkpoint references, including amended commits;
- the enforceable local execution boundary before sandbox-provider integration;
- application hosting and execution-interface contracts;
- testing a new LazyCode version separately from the running instance managing that development;
- schemas, operations, failure handling, and acceptance evidence for each implementation slice.

These are readiness items, not authorization to implement now. Detailed Deliveries will be defined and approved from accepted Feature plans. The [Roadmap](roadmap.md) records the current sequence without treating provisional phases as approved Deliveries.
