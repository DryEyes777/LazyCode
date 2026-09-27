# F002: Deterministic Acceptance

Status: technical specification revision 1 — approved 2026-09-26; not executed
Last updated: 2026-09-26

These cases use the [contracts](contracts.md) and form part of technical specification revision 1. No passing results are claimed. G0–G5 refer to the Git/database recovery phases in those contracts.

## Test harness and ordering

Use file-backed real SQLite and temporary local Git repositories/worktrees, one Project/repository/Delivery with a parent and two child branches. Seed authorized actors plus an unauthorized actor, owned/unrelated records, approval revisions, and deterministic evidence bytes. IDs/time are injected; schedules use explicit barriers, never timing guesses or sleeps as correctness assertions. Real helper chains, SQLite transactions, and Git operations execute; scripted agents replace model behavior only.

Fail any model invocation through a deny adapter and an invocation counter that must stay zero outside intentional guard self-tests. Exclude provider initialization and inherited model credentials. Before loading the subject, deny outbound Node HTTP/HTTPS/fetch/net/TLS/DNS calls in the dedicated test processes, and restrict subprocesses to local Git and the known Node fixture worker with sanitized environments. Provider modules are forbidden imports in the persistence dependency graph. Negative harness self-tests exercise the deny adapter, fetch and socket paths without contacting a service; inability to establish guards fails preflight. This is an acceptance anti-fallback guard, not the production R-05 command sandbox. Do not exercise real secrets or remote Git services.

The explicitly approved F002 bootstrap exception allows one Implementation Worker to author executable tests/infrastructure from the written contract before persistence implementation exists. Review and accept those tests first; dependent implementers cannot edit them. Define the expected service interfaces in test-owned contract types and use a test-owned adapter loader. Before the production module exists, the loader supplies a test-only subject whose operations throw `FeatureNotImplemented`; expected-success assertions must fail on that result. Only the exact missing target module is eligible for this fallback; dependency or syntax failures are real errors. Once present, always load the real subject. No test is skipped, marked todo, or weakened to accept unimplemented behavior. Independent harness tests verify both loader paths. The initial red run demonstrates executable unmet behavior, not feature success.

Place unit/internal integration and harness self-tests in `tests/persistence/**/*.test.ts`, included by existing `vitest.config.ts`. Place the A01–A25 local-dependency contracts in `tests/persistence/acceptance/*.contract.ts`, included by a new `vitest.persistence.config.ts`; this keeps deliberately red future acceptance separate from Task full-unit obligations. The test-author owns both configs and adapter wiring. Add an explicit aggregate `check` entry for both configurations before final Feature verification so no acceptance layer is silently omitted. During Tasks, the full default suite and the Task's required A-cases run; the final Feature and Delivery run every A-case without filtering.

## Cases

| ID | Deterministic actions | Required result |
| --- | --- | --- |
| A01 | Authorized read/update; out-of-scope read/write; revoke ancestor grant before retry. | Correct update once; denied reads expose no payload; denied writes leave semantic state unchanged; derived grants cannot bypass revocation. |
| A02 | Two actors read revision r; one commits r1; second updates using r. | Second update fails stale; r1 survives unchanged. Two independent branch revisions never compare equal by counter alone. |
| A03 | Parent changes unrelated X; child changes owned Y; import child. | X retains exact parent revision/content; Y matches accepted child revision; relationships and import receipt valid. |
| A04 | Both branches change same record; also stage an independent valid child change. Repeat with different fields of the same record and with edit/delete. | Entire import withheld pending reconciliation in all three cases; independent change does not slip through. |
| A05 | Child attempts unauthorized definition edit plus independent valid Report edit; parent reviews exclusion. Repeat with a Report depending on that definition edit. | First imports only valid independent work and records exclusion; second returns for correction with no partial import. |
| A06 | Change parent/authority after proposal; inject unlogged mutation, ownership forgery, invalid relationship, or wrong project/schema. | Application rejects stale/invalid proposal without domain changes; reviewed approval cannot authorize different content. |
| A07 | Lose import response after commit; retry same ID/content, then same ID/different content. | One effect/receipt; matching retry returns original result; mismatched reuse fails. |
| A08 | Barrier-controlled writer commits paired updates around a backup on a separate connection. | Snapshot contains a complete committed state, never a torn pair; integrity and foreign-key checks pass. Later writes remain in live database. |
| A09 | Restore Git checkpoint into fresh installation fixture without original local files. | IDs, assignments/progress, unresolved issues and evidence survive; active work is Paused; grants inactive; no execution or model calls. |
| A10 | Retry failed delivery; crash after receiver commit before acknowledgment; deliver duplicate and out-of-order revisions. | Pending survives; exact receipts only after storage; no duplicate logical revision; current state does not regress; evaluations remain separate. |
| A11 | Alter/delete attachment, substitute manifest/snapshot, use traversal or symlink evidence path. | Validation blocks publication/restoration as appropriate; no accepted checkpoint falsely claims intact required evidence. |
| A12 | Create code/checkpoint commit; amend with changed code; restore both required evidence targets. | Each checkpoint resolves its exact enclosing commit; old evidence never validates new commit; old required object remains recoverable without reflog. |
| A13 | Crash at every G0–G5 boundary, including immediately before/after ref replacement and DB commit; repeat recovery twice. | Determine real outcome, no duplicate commit/merge/import; preserve unrelated/newer local state; ambiguity stops affected work. |
| A14 | Approved merge succeeds, then closure recording crashes. | Recovery records actual merge and Report completion once; following checkpoint restores facts; no circular hashes or alteration of completed history. |
| A15 | Delete referenced record, unreferenced disposable record, and record needed by old branch/pending delivery. | Invalid deletion blocked; eligible soft-deleted payload removed; required state retained; old branch cannot resurrect removed data. |
| A16 | Settle old generations and remove eligible markers; return old offline copy. | Markers actually removed; stale import/replication rejected pending fresh reconciliation; no silent retirement of pending work. |
| A17 | Open future format; attempt import across incompatible formats; interrupt synthetic migration. | No writes/import on unsupported format; original recoverable; migration either validates and activates or remains unapplied; deterministic recovery. |
| A18 | Attempt change to Completed Report; parent evaluates replica; exercise unsupported Task-to-Delivery relationship. | Immutable Report unchanged; evaluation separate; unsupported relationship rejected without deciding R-06. |
| A19 | Publish a checkpoint containing synthetic values only in local tables; restore it and inspect portable table contents and file bytes. | No local sentinel in snapshot/manifest; pending delivery and historical authority remain; no active imported grant/resume authorization. |
| A20 | Restore parent and active child in a new fixture after deleting original worktrees/local baseline caches; perform authorized child import. | Tracked baseline and its dependencies suffice; missing baseline fails explicitly; identity and unrelated parent state preserved. |
| A21 | Amend a referenced commit three times; clone only the final branch into an independent repository and remove source access; recover earlier targets from tracked bundles. | Exact old commits and evidence recover; final code differs; no reflog/local-ref dependency; bundle sizes reported. Reject amendment at an integrated boundary. |
| A22 | Introduce unexpected tracked/untracked edits during G1–G4 and change the expected parent ref. | Affected operation stops without overwriting or adopting manual content; diagnostics require user reconciliation; unrelated worktree unaffected. |
| A23 | Run fail-closed model/network guard self-tests, then scripted scenarios. | Intentional attempts throw without network access; all real scenario model counters zero; no provider initialization or credentials. |
| A24 | Inject I/O failures at attachment, journal, snapshot and migration writes; hold a SQLite write lock. | Typed failure, no false publication/acknowledgment; prior committed checkpoint and recoverable live state preserved; Busy bounded; valid retry completes once. |
| A25 | Independent child insert IDs share a readable label; replay same revision with changed bytes; edit an approved definition as a draft. | Both distinct IDs remain identifiable; forged revision rejected; draft never changes the exact approved revision pointer. |

## Fault schedule and oracles

For A08, commit pair `(x,y)=(0,0)`, then barrier-controlled `(1,1)` before backup, `(2,2)` while it progresses on another connection, and `(3,3)` after completion. The snapshot must include at least `(1,1)`, may include `(2,2)`, cannot include `(3,3)`, and never contains mixed pairs. Set backup `rate: 1`, make more than 100 pages, and assert that the during-backup barrier actually ran before the final batch; a vacuous single-step run fails the scenario. A separate worker/process commits while the backup progress barrier is held; do not rely on an unawaited async progress callback to control ordering.

Kill the operation-owning child process at explicit durable-phase barriers for G0–G5, not by graceful exceptions alone. Also fault before/after journal rename, between snapshot/manifest file replacements, before/after migration transaction and activation rename, and after receiving a replica transaction but before acknowledgment. Reopen through a new process. At each fault, assert actual Git ref/parent count, logical record/revision digest, receipt counts, file digests, and unresolved-operation visibility. Recovery twice must leave the same result. Simulated disk-full/I/O exceptions complement process termination; physical power-loss and arbitrary filesystem/hardware durability are not claimed.

A10 includes r2-before-r1, r1-after-r2, duplicate r1, divergent r2 alternatives, false/mismatched acknowledgments, and a newer parent replica when an older submitted snapshot is imported. Assert both canonical and live-replica heads, author identity, and pending delivery counts. A16 includes retired known branches, unknown old copies, and unauthorized generation-number changes.

For A03–A07, capture before/after canonical digests excluding permissible audit/receipt metadata; assert exact expected delta, not merely row counts. Compare actual columns and relationship sets. On failed imports assert no accepted item was applied. For snapshots, compare logical data and required-file manifests; do not require byte-identical SQLite output across versions.

## Measurements and evidence

Use seed `F002-v1` with 1,000 and 10,000 records, including 10% Reports with 8 KiB summary payloads and remaining records with 512-byte payloads; three revisions per record. Include 20 immutable attachments of 256 KiB for the small set and 100 of 1 MiB for the larger set. Use deterministic nonrepeating bytes as well as a repetitive-text subset so compression is not unrealistically favorable. Record exact generated byte counts and dataset digest. These are synthetic planning-scale samples, not a claim about actual user workloads.

Run ten checkpoint cycles, each modifying 1% of records and soft-deleting 0.1% (disjoint selected IDs); reconcile eligible deletions. Include three consecutive evidence-preserving amendments. Record full-copy/snapshot/import elapsed times, peak process RSS, DB size, baseline/bundle/attachment bytes separately, and `.git` object bytes before and after a fixture-only repack. Repeat timings three times and report all samples plus median; no timing threshold decides correctness. At both sizes run preservation, import/conflict, cleanup, integrity and fresh-restore checks; the full adversarial fault matrix runs on the small deterministic fixture. Unexpected resource exhaustion is a finding, not a silently reduced workload.

Each case records tested code commit, fixture inputs, commands, expected/actual assertions, and permitted diagnostics. Failures and unverified checks remain explicit. Task, Feature, and separate Delivery full-suite obligations remain unchanged; no live AI smoke test is part of acceptance.

## Execution commands to supply during implementation

Preflight must check Node against the existing package engine (the planning shell was 22.17.0, below minimum), record the bundled SQLite version/compile options, and confirm STRICT/WAL/backup support. Require SQLite 3.51.3 or later, or one of the explicitly documented fixed backports 3.50.7/3.44.6, under the [upstream WAL-reset advisory](https://sqlite.org/wal.html). Unit-test this version guard with accepted/rejected version fixtures; no corruption reproducer or unpatched runtime is required. Check Git supports `merge-tree --write-tree`, `commit-tree`, compare-and-swap `update-ref` and bundles; the planning environment reports Git 2.46.0. Do not silently upgrade Node, Git, Harness or other dependencies. Select an already available compatible runtime or report the unmet prerequisite.

Use installed project tooling, without implicit downloads:

- `npm run typecheck`
- `npm test` — full existing/default unit and internal integration configuration, including harness self-tests.
- `npm exec --no -- vitest run --config vitest.persistence.config.ts` — every real SQLite/Git acceptance contract.
- `npm run build`

The future aggregate `npm run check` must run these four steps. A Task may additionally select its owned A-cases by test-name filter; record the selection and never present it as full Feature/Delivery verification. Bootstrap evidence records green harness/default suites and intentional red persistence contracts separately. Later implementation acceptance requires the owned contracts to pass, and F002 completion requires all A01–A25 cases plus measurements and review. Live external regression tests are not applicable to this local spike; no optional model smoke test runs.

Future evidence output: a machine-readable results file and concise human report containing case IDs, exact tested commit, fixture seed/digest, environment, commands, counts, stdout/stderr references, crash phase/outcome, storage measurements, review dispositions and remaining limitations. Files contain synthetic fixture data only. Evidence for this planning pass is limited to document/link consistency checks.
