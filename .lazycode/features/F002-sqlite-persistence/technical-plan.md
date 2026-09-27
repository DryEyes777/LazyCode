# F002: Technical Plan

Status: Approved — technical specification revision 1; execution not started
Last updated: 2026-09-26
Prerequisite: [product-definition revision 1](feature.md) explicitly approved on 2026-09-26

This specification consists of this plan, [persistence contracts](contracts.md), and [deterministic acceptance](acceptance.md). The user approved the complete technical specification revision 1 on 2026-09-26 ("yeah this looks good") in response to the explicit approval request covering all three documents. [The handoff](handoff.md) records approval status and Step 3 implications. No spike code, dependency installation, data migration, or experimental validation has occurred.

## Confirmed technical choices

### T-01 — SQLite binding

Use Node's built-in `node:sqlite`, behind a narrow internal storage adapter. Use `DatabaseSync` for short database operations and the exposed backup API for consistent snapshot creation. No third-party SQLite dependency or ORM is selected for the spike. Process/thread placement for the production application remains Step 3 work; concurrent-write acceptance must still exercise separate real connections with deterministic coordination.

The project's declared Node engine is `^22.19.0 || >=24.0.0`. Node 22.19.0 documentation lists `DatabaseSync`, foreign-key enforcement, extension-loading controls, a busy timeout, and `backup()`. The module is marked Stability 1.1, Active development; it is not a stable API commitment. Its synchronous database operations are a production responsiveness consideration. See [version-specific Node documentation](https://nodejs.org/download/release/v22.19.0/docs/api/sqlite.html).

The inspected shell reports Node 22.17.0, below the declared project minimum. Future execution must select and record a compatible runtime and its SQLite version. Require SQLite 3.51.3 or later, or an explicitly documented fixed backport (3.50.7 or 3.44.6): current [SQLite WAL guidance](https://sqlite.org/wal.html) identifies a concurrency corruption bug affecting earlier unpatched builds. Merely satisfying the Node engine range is insufficient. No runtime change is authorized or performed in this planning task; if no suitable runtime is available, report that prerequisite instead of silently upgrading or changing bindings.

Alternative considered: evaluate an external binding, accepting an additional dependency and compatibility work. The user selected the built-in binding; no external binding has been exhaustively compared.

### T-02 — Import mechanism

Use explicit comparison of the immutable branch baseline, submitted child state, and current parent state using stable record identities, revisions, and canonical content. Cross-check actual changes against controlled mutation evidence and current authority. Produce a reviewable proposal before an atomic validated parent import. The contracts specify whole-record conflict detection, reviewed omissions, current-authority revalidation and idempotent application.

Prefer this explicit comparison for the spike over SQLite session changesets: the key experiment is LazyCode's ownership and import policy, which still needs application-level validation with either mechanism. Comparison must detect unexpected changes rather than trusting a child's reported mutation list alone. Measure its scan/copy cost instead of assuming production scalability.

SQLite's [session extension](https://sqlite.org/sessionintro.html) supplies changesets and database conflict handling, but has schema/build limitations and does not establish LazyCode authority. It remains a possible later optimization, not a chosen dependency.

## Confirmed schema and layout directions

### T-03 — Bounded structured schema

Use a relational core with explicitly typed identity, revision, author, owner, scope, relationship, and deletion fields. Use SQLite STRICT tables, foreign keys, and explicit constraints; permit validated JSON only for bounded type-specific content such as Report summaries and evidence details. Ownership and authorization must not be hidden in unrestricted JSON. [SQLite STRICT tables](https://www.sqlite.org/stricttables.html) support type enforcement while retaining normal key and CHECK constraints.

Organize the physical design around these bounded groups; the contracts specify required data, invariants and payload validators:

- representative project/work records, stable worker identities, and relationships;
- revisions, controlled mutations, authority/approval records, and import decisions;
- Reports, progress, events, and separate parent evaluations;
- branches/baselines, checkpoints, attachments, and integration facts;
- replication delivery/receipt records, recovery operations, and deletion/cleanup bookkeeping.

Keep Task-parent relationships separate from Task payloads. The spike accepts only explicitly supported fixture relationships; unsupported relationships fail validation. This permits a later versioned extension after R-06 decisions without implicitly permitting Delivery-owned Tasks now or permanently requiring every Task to have a Feature parent.

Use UUIDv4 for stable internal identities, separate human-readable labels, and distinct revision tokens with predecessor linkage and canonical-content hashes. Independent edits on two branches must not appear identical merely because each incremented a counter to the same number. Tests inject deterministic identities. Duplicate readable labels are disambiguated by stable IDs; they do not trigger identity renumbering.

Use explicit LazyCode schema and portable-format versions. Unknown/newer formats remain unwritable and unimportable; supported synthetic migrations operate on recoverable copies and validate before activation. This is not a promise to migrate current Markdown or support arbitrary future formats.

### T-04 — Portable checkpoint layout

Use a complete SQLite snapshot as the portable database representation, with a small JSON manifest and separate content-addressed evidence files:

| Path | Purpose |
| --- | --- |
| `.lazycode/local/project.sqlite` | Ignored live database, with its WAL/SHM files; one per worktree. Other installation-local state remains outside portable storage. |
| `.lazycode/checkpoint/project.sqlite` | Git-tracked consistent snapshot at a fixed path; never directly edited by workers or merged as database bytes. |
| `.lazycode/checkpoint/manifest.json` | Generated format/checkpoint identity, snapshot digest, attachment inventory, and code-reference metadata. It is not an independently authored source of project facts. |
| `.lazycode/attachments/sha256/<digest>` | Git-tracked immutable evidence bytes referenced by repository-relative path and digest. |
| `.lazycode/baselines/sha256/<digest>.sqlite` | Git-tracked immutable baseline while active branches or recovery require it. |

Historical checkpoints remain in Git history rather than accumulating a new database file for every checkpoint in the current tree. Required branch baselines are retained separately until dependent reconciliation completes. Existing planning Markdown stays in place.

Use the backup API to prepare a staged snapshot, strip explicitly local tables and compact that copy, validate it and its attachment references, then publish a complete checkpoint. File-set integrity and the journaled publication protocol detect interruption between replacements; fixed paths do not make publication atomic. Manifest file digests detect mixed/incomplete sets. Human-readable logical comparison output supports review but is not a second editable canonical database.

Ordinary Git binary merging is insufficient even when only the child changed the snapshot: managed integration must explicitly produce the validated parent result, preserve unrelated parent state, and stage its snapshot. [Git attributes](https://git-scm.com/docs/gitattributes) can mark files binary but do not implement this import policy. The contracts define G0–G5 managed publication and recovery phases.

Alternative considered: use a text export as the checkpoint representation. This could improve ordinary diff readability but introduces an additional reconstruction format and does not remove the need for semantic validation. The user selected the complete SQLite file for this spike; Git storage growth must be measured.

## Confirmed checkpoint, cleanup and test directions

### T-05 — Commit references without circular hashes (direction confirmed)

The user explicitly confirmed T-05 and T-06 on 2026-09-26 ("Yeah those are good"). Their detailed mechanisms were subsequently approved within technical specification revision 1.

Give each checkpoint an independent ID. For code saved in the same Git commit as that checkpoint, the manifest uses an explicit `containing-commit` reference and a digest of the code paths covered. Restoration resolves that reference to the exact Git commit being opened and verifies its content; it never interprets it as the current branch tip. The snapshot does not contain its own eventual Git hash. References to earlier code, tests, reviews, or integration facts use exact already-existing commit IDs.

Amendment creates a new checkpoint identity for the replacement commit. Earlier evidence stays bound to its original exact commit and does not validate the amended version. Preserve required earlier commit objects as verified content-addressed Git-bundle attachments rather than relying on reflogs. [Git commit documentation](https://git-scm.com/docs/git-commit) describes amendment as replacement of the branch tip.

An approved merge first produces the real merge commit. Once that outcome is established, record its exact hash and Report completion, then save those facts in a following checkpoint. A crash between these steps leaves an explicit unfinished finalization operation; recovery inspects actual Git state and completes recording without repeating the merge. Never put a predicted merge hash in its own snapshot or amend integrated history to insert closure facts.

The following checkpoint contains only authorized mechanical closure facts plus any separately authorized changes. It is not a new approval of authored conclusions. A checkpoint does not need another checkpoint merely to record its own enclosing commit hash: `containing-commit` supplies that association on restoration. It occupies the next editable commit slot after the merge. Exact test evidence remains external to the tested commit until a later checkpoint captures it; that later checkpoint never inherits a claim that its own new commit was tested.

Alternative: split code and database into separate commits on every checkpoint. This supplies an earlier code hash but changes ordinary commit sequencing and still requires handling evidence/amendments. Prefer the containing-commit reference and subsequent closure checkpoint.

### T-06 — Cleanup with stale-branch protection (direction confirmed)

Reconciliation classifies each soft-deleted record by current references, required history/evidence, pending operations, and active branch/replica dependencies. Remove the record's payload once it is no longer needed; retain minimal deletion identity/revision information only while an older branch or replication retry needs it. Do not keep full useless records solely as synchronization markers.

To eventually remove those markers as well, use a recorded reconciliation generation per receiving-parent branch. Before retiring a generation, affected registered branches/replicas must reconcile and settle their pending work, or be explicitly retired through an authorized reconciliation decision. Never silently retire active work or discard pending results merely to enable cleanup. A previously unknown/offline old copy cannot import or replicate using an expired baseline/generation: return it for fresh reconciliation before accepting any of its changes.

This bounds deletion bookkeeping without allowing older copies to recreate deleted rows. The generation is a compatibility boundary for imports, not a new Task lifecycle or ownership rule. The contracts define retirement authority, eligibility, generation propagation, and old-copy reconciliation. Ordinary cleanup does not rewrite Git history; historical snapshots may still contain the removed record.

Alternative: retain deletion markers indefinitely. Simpler stale-copy detection, but the user requires removal of records that no longer serve a purpose. Prefer explicit retirement and reconciliation of old copies rather than permanent per-record deletion accumulation.

### T-07 — Earliest test authoring and implementation ordering (bootstrap exception approved)

The [delegation contract](../../project/delegation-and-task-contracts.md#child-task-contract) requires "executable failing tests that demonstrate the required behavior" before starting a child, and makes the parent responsible for ensuring those tests exist before implementation is delegated. [Role policy](../../project/roles-and-ownership.md#implementation-authority) prohibits managers and Feature Leads from writing implementation code. Test authoring itself is ordinary Implementation Worker work. Existing tests cover the earlier delegation Feature, not the new persistence contract.

The user explicitly approved this F002-only bootstrap exception on 2026-09-26 ("Yes I approve this"): the first test-authoring Task's Implementation Worker may start from the approved written acceptance matrix and interfaces without already having parent-supplied executable persistence tests. This Task may author test fixtures, test infrastructure, and behavioral contract tests; it may not implement persistence behavior or modify the approved acceptance requirements. The exception does not authorize managers to code, introduce a new work category, or apply to later implementation Tasks. The complete technical plan is now approved; Delivery scheduling/start remains separate.

Approved ordering:

1. Complete and approve F002's technical interfaces and deterministic acceptance matrix. Schedule and explicitly start a Delivery separately before execution.
2. The Feature Lead commissions an ordinary Feature-owned test-authoring Task under the approved bootstrap exception. An Implementation Worker authors the real-SQLite/temp-Git fixture harness, scripted actors, fail-closed model boundary, deterministic fault barriers, and executable behavioral contracts. No production persistence behavior is supplied by that Task.
3. Independent review checks the tests against the approved contract. Demonstrate that checks run, assert the intended outcomes, and fail for absent behavior rather than incidental import/build failures. Acceptance specifies test discovery, test-owned interfaces and intentional unimplemented-subject scaffolding. The Feature Lead evaluates evidence and accepts the test work.
4. The Feature Lead supplies these accepted executable tests to persistence implementers. Tests are outside those implementers' write scope; implementers may add edge cases but cannot weaken the supplied contract. Corrections to a mistaken contract test return through its authorized author, review, and the parent; changing approved behavior requires the normal approval process.
5. Delegate implementation in dependency order. Each Task executes its required new/changed tests, full unit suite, and real-helper internal integration checks. Real SQLite and Git acceptance remains required, not mocked away.
6. After Task integration and review corrections, run full applicable Feature suites on the integrated Feature version. Later Delivery integration requires a separate full Delivery run. New changes invalidate prior test evidence under existing policy. Managers commission and evaluate; Implementation Workers author code and execute required suites.

No agent is spawned and no test infrastructure is authored in this planning task. The exception is recorded here as Feature-specific; it does not change the project's default delegation policy.

### T-08 — Whole-record conflicts (confirmed)

The user confirmed on 2026-09-26 that concurrent edits to different fields of the same record still conflict. No field-level auto-merge is included. Exact already-received revisions are idempotent; distinct concurrent revisions return the complete import for reconciliation.

## Verified snapshot building blocks

The [SQLite Online Backup API](https://sqlite.org/backup.html) supports consistent snapshots. [WAL documentation](https://sqlite.org/wal.html) explains why the WAL is part of database state and why copying only an active main database file is unsafe. The contracts separately specify publication, attachment consistency, and crash recovery; using the backup API alone does not make a Git checkpoint atomic.

These are documented capabilities, not experimental findings from this repository.

## Components, Tasks and execution order

Keep F002 behind `src/persistence/`; do not wire it into DSH, existing delegation flows, or a production host. Controlled data operations, import planner, replica receiver, snapshot/attachment store and Git/recovery coordinator are the affected new Components. The test-owned adapter exercises their real composition. Existing configuration changes are limited to test discovery/aggregate checks and future ignore/binary-attribute rules. No new external runtime dependency is selected; no public package API commitment is made.

All assignments below are ordinary Tasks owned by F002, one repository each. Managers coordinate and review; Implementation Workers author code and run tests. Separate managed Task branches/worktrees start from the Feature parent when execution is authorized; the Codex worktree plugin is development tooling only. This table is technical decomposition, not an approved Delivery start or a runtime delegation-plan admission.

| Order | Task / owned output | Prerequisite and evidence |
| --- | --- | --- |
| S0 | Test-author: `tests/persistence/`, `vitest.persistence.config.ts`, test adapter/types, and aggregate test-script wiring. | Approved bootstrap exception; green harness/default suites, reviewed intentional red A-cases, test-to-contract map. No persistence implementation. |
| S1 | Core storage: `src/persistence/core/`, schema/types, actor checks, revisions and controlled mutation APIs. | Accepted S0 contracts; A01–A02, A18–A19 core portions, A25; default suites. |
| S2 | Branch imports: `src/persistence/imports/`, baselines/proposals/omissions, atomic import receipts. | S1; A03–A07 and baseline unit/integration checks. |
| S3 | Replication and reconciliation: `src/persistence/replication/`, `src/persistence/reconciliation/`. | S1–S2; A10, A15–A16 and real-helper integration. |
| S4 | Checkpoints: `src/persistence/checkpoints/`, attachment integrity, portable snapshots, restore and synthetic migrations. | S1–S3; A08–A09, A11, A17, A19–A20. |
| S5 | Git/recovery composition: `src/persistence/git/`, coordinator entry point and fault recovery. | S1–S4; A12–A14, A21–A24, all cross-component cases, full matrix and measurements. |

Execute these Tasks serially for this bounded spike. Keep initial worker depth one under the Feature Lead; any subdivision requires a separate approved delegation plan with protected executable child contracts. No speculative concurrency or model/token budget is assigned by this planning document; Delivery planning must set resource allowances before start. Review is commissioned by the direct parent, initially independent of implementer conversation, with follow-up to the same logical Reviewer. S0 tests/configs remain writable only by the test-author; new tests may be added by implementers in their own scope. Shared interface changes require coordinated review rather than opportunistic edits to another Task's contract.

Each accepted Task gets contract/code review focused on its contribution; parent review covers composition and new integration deltas. Reuse of intact child review does not waive real-helper integration tests or full suites. At S5 completion, run typecheck, both full test configurations, build, all fault cases and measurements; repeat affected full suites after corrections. Report to the Delivery Manager only after evidence and independent review settle. The eventual Delivery performs a separate full run and appropriately scoped QA; no Tester is commissioned by a Feature Lead.

## Proof boundary and production deferrals

The spike must prove service-level ownership and revision checks, consistent portable snapshots, record-level imports/omissions, preservation of parent state, idempotent replication, deletion cleanup, attachment integrity, actual SQLite transactions, actual Git operations and recoverable process-crash sequences. It supplies reproducible measurements and a limitations report. Failure to meet a criterion is a finding to correct or return for specification change, not permission to quietly drop it.

It does not prove hostile-worker OS enforcement, arbitrary filesystem/power-loss durability, network replication, scheduler fairness, provider execution, web UX, multi-repository atomicity, large-scale performance, indefinite schema compatibility, automatic evidence-file garbage collection, or efficient long-history bundle packing. Production code reuse is conditional on review of spike findings. R-06 Delivery-level Task and post-integration correction ownership remain user decisions for Step 3.

## Approval boundary

Technical specification revision 1, including the detailed contracts and A01–A25 acceptance cases, is explicitly approved on 2026-09-26. F002 is Approved and Step 2 planning is complete. This is not a Delivery start. End this planning task with the handoff; do not start S0, install dependencies, migrate records, call models, or message another chat.
