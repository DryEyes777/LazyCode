# D002: SQLite Persistence Validation

State: Active — approved start; preflight and Feature setup pending
Definition revision: 1
Last updated: 2026-09-26
Definition approval: revision 1 approved by the user on 2026-09-26
Explicit start: authorized on 2026-09-26, subject to runtime and managed-workflow preflight

The user approved this Delivery and requested F002 execution in a separate task with GPT-6 Sol / High as its main agent, explicitly requiring the installed Worktree Orchestrator plugin. This task retains Delivery ownership, final verification/candidate review, and the user merge gate. The Feature task may prepare and execute the approved scope after preflight; it must not promote into `main` or push. The explicit main-agent model overrides the plugin's default Astra role wording, not its workflow safeguards or bounded subagent routing.

## Outcome and scope

Implement and validate F002's bounded persistence model, producing reproducible evidence and limitations that inform the minimum application's storage design.

Only included Feature: [F002 — SQLite Persistence Validation](../../features/F002-sqlite-persistence/feature.md), product-definition revision 1 and technical specification revision 1, both already approved. Its [technical plan](../../features/F002-sqlite-persistence/technical-plan.md), [contracts](../../features/F002-sqlite-persistence/contracts.md), and [A01–A25 acceptance](../../features/F002-sqlite-persistence/acceptance.md) remain authoritative; this Delivery does not expand them.

This newly defined D002 is not a revival of any earlier provisional roadmap placeholder. It is an untimed, single-Feature validation Delivery, not the first usable application or a public release.

## Repository and ownership

- Repository: LazyCode; target integration branch: `main` (confirmed during planning).
- Proposed Delivery branch: `codex/D002-sqlite-validation`; not created.
- Feature/Task worktrees are isolated beneath the Delivery under managed Git controls. Record the actual base commit and checkout/branch identities at activation; do not execute in the user's primary checkout.
- The Delivery Manager coordinates the candidate; the Feature Lead coordinates S0–S5; Implementation Workers author code/tests. Existing Codex worktree tooling is the development mechanism, not a LazyCode runtime being exercised.
- Project-summary changes are authored in the Project Manager's documentation branch and integrated into the candidate for user review. No unreviewed post-merge product-documentation changes.

## Order and proposed resource allowances

Follow the approved F002 sequence serially:

1. **S0:** test harness and executable contracts under F002's approved bootstrap; no persistence implementation.
2. **S1:** core storage, schema, revisions, and authorization.
3. **S2:** validated parent/child imports and conflicts.
4. **S3:** replication, deletion reconciliation, and stale-copy protection.
5. **S4:** snapshots, attachments, restore, and synthetic migrations.
6. **S5:** Git/checkpoint recovery, full composition, measurements, and report.

One implementation writer at a time; initial implementation depth one under the Feature Lead. Use an independent reviewer pair, batch accepted corrections, and return them to the same logical reviewers. Serialize full verification/measurement runs to avoid collisions and distorted measurements. Fixture processes needed for concurrency/fault tests are not extra implementation workers, but remain owned and bounded by the acceptance plan. No unapproved subdivision or parallel implementation expansion.

Keep accepted S0 contract tests outside later implementers' write scopes. Shared contract changes go through the responsible author and review. Use the established Luna-first development routing for suitable bounded Tasks, with an explicit rationale for stronger models on coupled persistence/recovery work. Retain event-based waiting; do not keep idle agents polling. No hard token/time cap or extra model benchmark is introduced.

## Readiness gates before start/execution

1. User approves this Delivery definition and explicitly authorizes start; F002 becomes Scheduled only after actual assignment to the approved Delivery.
2. Confirm a supported Node runtime and F002's exact SQLite compatibility guard. The previously inspected Node 22.17.0 is insufficient. Select an already available compatible runtime or report the missing prerequisite; do not silently install/upgrade Node, SQLite, Git, or Harness.
3. Verify local Git capabilities, installed project tooling, a safe temporary fixture location, source baseline, ownership, and the no-live-model/network test guards before S0 acceptance or dependent implementation.
4. Translate this plan into managed Task/verification contracts before activation. Creating these documents does not reserve, dispatch, or start agents.

F003/F004 runtime/isolation experiments are not prerequisites for this bounded local SQLite/Git fixture suite. That does not claim F002 provides production hostile-worker containment. All tests use temporary resources and scripted actors, with no real credentials or remote services.

## Exclusions and change control

No DSH activation changes, sandbox dependency, web application, production scheduler, multi-repository support, automatic updater, real-project data migration, or automatic adoption of spike code. Existing planning Markdown remains intact. Later Step 3 decisions about Delivery-owned Tasks do not expand F002's approved fixture relationships; its A18 unsupported-relationship check remains required. Its specific bootstrap plan remains valid despite the later general bootstrap policy.

Implementation problems return actionable corrections. A required product/specification change pauses affected work for reapproval; failed acceptance cannot silently become a reduced scope. Negative findings remain evidence, not passed criteria. The user reviews the combined result under [Delivery acceptance](acceptance.md); merge and any push require their established approvals.
