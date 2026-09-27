# Development Readiness

Status: reconciliation complete; technical decisions open
Last updated: 2026-09-26

## Starting point

The previously pending prerequisite was improving the Codex worktree-orchestration plugin and agent profiles. That work is [implemented, reviewed, and installed](research/worktree-orchestrator-build-readiness-implementation.md). It is development tooling, not LazyCode's application runtime. Its installation does not authorize LazyCode implementation or prove autonomous execution, model quality, or cost savings.

LazyCode currently implements only the native DSH bundle and Project Manager-to-read-only-Explorer delegation. Typechecking and all 18 existing tests passed during the 2026-09-26 readiness assessment. Path-level read scope, persistent workers, SQLite storage, scheduling, permissions, and the web application remain unimplemented. The optional live delegation test remains unperformed and is not an automated acceptance gate.

The SQLite persistence spike is now defined and approved; implementation remains separate. Track the next planning step in the [checklist](development-readiness-checklist.md).

Step 2 planning completed, 2026-09-26: [F002](../features/F002-sqlite-persistence/feature.md) product-definition revision 1 and [technical specification revision 1](../features/F002-sqlite-persistence/technical-plan.md) are explicitly approved, including real SQLite/temp-Git acceptance and the F002-only test-authoring bootstrap exception. The Feature is Approved, not scheduled or started; no implementation or experimental validation has begun. R-01–R-03 now have an approved validation plan, not proven outcomes. The [handoff](../features/F002-sqlite-persistence/handoff.md) preserves the unresolved R-06 ownership questions for Step 3.

## Established decisions, not questions to reopen

- Local-first web application; initially one repository and one active Delivery for dogfooding. Broader concurrency, sandbox-provider integration, and automated browser QA come later.
- LazyCode owns organizational state and controls in a separate local backend serving the web UI; DSH is the first execution integration behind an internal interface, with no Harness fork. Browser disconnection does not pause work; backend coordination is event-driven within approved plans.
- One controlled SQLite database per worktree, portable Git checkpoints and attachments, and installation-local conversations/raw logs. Current Markdown documents remain until an approved migration.
- Stable worker identity is distinct from activations and work-object state. An ended turn is not task acceptance; events must respect user pauses and approval gates.
- Product and technical Feature approvals precede Delivery scheduling and explicit start. Completed Features may be corrected before Delivery integration; integrated Features stay closed.
- Parent-commissioned, compositional review; test-first delegation; fresh required testing after changes and a separate full Delivery run. The plugin's evidence-reuse policy does not silently replace LazyCode's testing rules.
- Editable implementation commits between merge/publication boundaries, explicit merge commits, no rewriting published or parent-integrated history, and no squash policy.
- Automated LazyCode acceptance uses scripted agents with real application mechanisms. It must fail attempted live model calls. Deferring sandbox providers does not waive enforced permissions or secret protection.

## Decisions required by upcoming work

The Feature areas below are planning destinations, not newly approved Features or Deliveries. Resolve each question before implementing code that depends on its answer; unrelated future details need not block the persistence spike.

| ID | Open technical decision | Needed by |
| --- | --- | --- |
| R-01 | SQLite binding, minimal schema/IDs/revisions, snapshot format and location, consistent snapshot creation, schema compatibility, and realistic storage/copy measurements. SQLite is selected; a changeset library is not. | Persistence spike — step 2 |
| R-02 | Baseline comparison and authorized imports: ownership, conflicting/stale edits, deletions, relationship validation, safe omission of unauthorized changes, and transaction/crash recovery. | Persistence spike — step 2 |
| R-03 | Code/database checkpoint identity, amended-commit references, attachment integrity, live replication/acknowledgment, restoration, and separation of portable state from local runtime data. Avoid a snapshot that must contain its own eventual Git commit hash. | Persistence spike — step 2 |
| R-04 | Separate local backend selected. Still define package/execution-process layout, concrete start/message/stop/observe interface, event correlation and recovery, local web security, and required DSH hooks. Revalidate the pinned dependency's needed capabilities before selecting an integration design; no automatic upgrade. | Application host and execution integration — step 3 |
| R-05 | Minimum process isolation and fail-closed unsupported operations are required initially. Command network access defaults to denied with scoped exceptions; backend model traffic and controlled research are separate. Still specify/validate enforcement, research destinations/outward data, secret injection/interception, process ownership, forced stop, and supported commands. | Controlled execution and permissions — step 3, before real worker execution |
| R-06 | Executable Task/worker/approval transitions, dispatch acknowledgment, duplicate events, uncertain outcomes, waiting/reactivation, capacity reservations, and pause/restart precedence. Define Task ownership and correction records as discussed below. | Workflow and scheduler — step 3 |
| R-07 | Earliest executable test authoring under non-coding managers, protected contract tests, verification schemas/stages, exceptions, review lineage, and exact evidence invalidation. | Delegation and verification — step 3; the spike needs its own explicit test-authoring plan |
| R-08 | Minimal web operations and backend contracts for project registration, planning/approvals, Delivery supervision, alerts, and candidate review; portable model identifiers versus local provider configuration. | Web workflow and configuration — step 3 |
| R-09 | Clean bundled/compiled managing version and manual replacement against the same repository selected, with no active execution during switching. In-place updating and pause–update–resume are deferred; any future resume is limited to previously active work. Still define packaging, isolated candidate state/ports/credentials, compatibility/backup/recovery mechanics, full scripted acceptance, and deny-live-call guard. | Dogfooding acceptance and installation — step 3 |

### Ownership questions requiring explicit resolution

- **Delivery-level Tasks — resolved in Step 3:** Deliveries may own integration and Delivery-specific Tasks within approved scope. The Delivery Manager commissions Implementation Workers and owns review/integration without coding. New product behavior still requires a Feature.
- **Post-integration corrections — resolved in Step 3:** After Feature integration and before Delivery merge, repairs to approved behavior use a new Delivery-owned corrective Task and branch with explicit Feature/Finding/evidence links. After Delivery merge, fixes use a new linked Feature in a subsequent Delivery. Desired-behavior changes always retain normal Feature approval. Integrated Features and Completed Reports remain closed.
- **Closure records:** Project-documentation changes are authored by a Project Manager on its own branch and included in the reviewed Delivery. F002 specifies automatic recording of successful approved integration facts, immutable Report completion, and subsequent checkpoints without circular commit references. This mechanism is approved for the spike but unimplemented; production schemas must also reflect the Step 3 correction-ownership decisions above.

The [minimum application plan](minimum-application-plan.md) records these user-confirmed Step 3 decisions and the general test-authoring bootstrap replacing the need for repeated Feature-specific exceptions. R-06/R-07 still require executable schemas, transitions, and verification mechanics. Historical F002 planning remains unchanged: its representative relationships and specific test-authoring plan do not automatically expand with these production decisions.

## Reconciliation record

- Closed stale “unspecified tweak” blockers in the roadmap, evaluation plan, workbook, and project definition.
- Updated the workbook's status and description: product topics have recorded answers; technical planning remains open.
- Restored the user's explicit requirement for reapproval when restoring an Abandoned Feature, even if its definitions are unchanged.
- Clarified that Features are already Completed before Delivery merge, and that approved Project-documentation changes travel with the candidate rather than being first authored after merge.
- Kept historical research and earlier plugin plans as dated evidence. The original DSH note now points to superseding storage/runtime decisions; its upstream claims have not been freshly verified in this pass.

No runtime code, dependencies, schema, approved role matrix, or permission policy was changed. No live models were called. Step 1 closes the documentation reconciliation, not the technical decisions listed above or approval to implement them.
