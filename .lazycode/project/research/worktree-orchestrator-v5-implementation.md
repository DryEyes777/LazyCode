# Worktree Orchestrator v5 — Implementation Record

Date: 2026-09-15
Status: production changes installed; disabled turn-control extension subsequently approved and installed (see follow-up below)

## Installed result

Initial v5 plugin version: `0.1.0+codex.20260915140717`. Current version after the approved turn-control follow-up: `0.1.0+codex.20260915143638`.

- Source: `/Users/alexandrehoule/plugins/worktree-orchestrator`
- Installed cache: `/Users/alexandrehoule/.codex/plugins/cache/personal/worktree-orchestrator/0.1.0+codex.20260915140717`
- Pre-update source/profile backup: `/Users/alexandrehoule/plugins/backups/worktree-orchestrator-20260915-v5`

Eight namespaced agent profiles were updated. All ten namespaced live profiles match the shipped templates; model IDs, reasoning efforts, and global model settings were preserved. A new Codex task is required to pick up the refreshed skill/profiles.

## Delivered production behavior

- Registry v5 and explicit v4 adoption preserve owned candidates/worktrees/history. Older reviews and profiles remain audit evidence, not automatically trusted v5 certificates or guessed v2 stages. Existing nested nodes have a guarded declaration-refresh path.
- Contract reapproval retains an existing writer and its unintegrated work while invalidating stale obligations. Same-SHA reviews are contract-sensitive. Known possibly-live runtimes and verification scopes block affected rebinding; never-dispatched reservations can be auditably superseded.
- Bounded hierarchy is the default for useful helper contracts in separately owned files. Parent-retained code and protected behavioral tests are separated from child write scope. Single-owner remains available.
- Generated review packets persist authored patches, relevant tests, exact accepted child content/mode identifiers, review references, and composition responsibilities. Intact helpers are not routinely re-reviewed at every ancestor. Changed or unattributed content stays reviewable; concrete scope expansion is recorded.
- Managed parent synchronization records inherited changes separately and rejects parent edits inside released child-owned paths before merging. Accepted integration certificates survive newer unintegrated child reviews and cleanup.
- Profile v2 stages enforce preflight/full fast checks, internal checks, scoped code review, expensive regression, and narrow final Feature acceptance. Check selection does not bypass dependencies; failed predecessors block subsequent processes. Compatible stage evidence may be composed, while unknown context and later failures remain explicit.
- Prelaunch validation rejects stale contracts/profiles, wrong executable versions, and missing targets before the affected command. Managed probes follow owned-process lifetime rules.
- Run outcomes distinguish partial selected coverage from failure and full acceptance. Recovery updates enclosing run state and preserves history. Main-process exit starts a configurable drain period (30 seconds by default); expiry never automatically kills processes or permits unsafe cleanup.
- Project-invoked failure checkpoints capture declared diagnostics before teardown, with default 10 MiB/file and 50 MiB/check limits, safe paths, explicit exclusions, and secret filtering. Nested probe secret declarations are included in redaction.
- Execution records distinguish reservation, requested dispatch, observed runtime acknowledgment, and runtime completion. IDs, input/output revisions, ownership, event deduplication, uncertain dispatch, and superseded activations are tracked. `next-action` derives authorized work/waits/blockers rather than treating reservations or ended turns as completed tasks.

Updated [delegation contracts](../delegation-and-task-contracts.md#compositional-review) and [review policy](../review-testing-and-completion.md#independent-review) record the compositional-review intent for LazyCode. Its runtime, SQLite implementation, unrelated product policies, and dependency release-age settings were not changed.

## Validation and review

The final frozen standalone package ran **119 tests: 117 passed, 2 intentionally skipped**, without failures. The skips select alternative repository/standalone packaging layouts; this run already exercised a standalone plugin layout. Tests used temporary Git repositories, fake processes/clocks, synthetic artifacts, and scripted transports—no live-model tests or project benchmark replays.

Plugin/skill validators and LazyCode documentation tests passed. After installation, the cache was compared byte-for-byte with source, all namespaced live profiles were compared with templates, and the installed bridge-status and profile tests passed.

One independent Terra reviewer pair assessed a frozen snapshot. Accepted corrections covered parent-owned-file synchronization, authorization of all execution events, nested-probe secret filtering, and live-runtime reapproval guards. The proposed CLI launch race was withdrawn after confirming task/scope exclusion; a narrow stale-snapshot guard was added to the library API. A real CLI concurrency regression also fixed stale PID metadata being mistaken for a held task lock. Both reviewers passed the focused correction delta.

Final reviewed source SHA-256 values:

| Module | SHA-256 |
| --- | --- |
| `worktree_orchestrator.py` | `c6bb92fa4b6fd673ef886df46d367b0fec01b9be4a1dc91374d61cc0b4220521` |
| `composition.py` | `ecbd2030ff93651031cb906b6125281fc4a3303f9f0c06fdd857ef0ca962b449` |
| `verification.py` | `ee592df5417273a99aea6335d3028c9d28674f5ce3895fe5a768762a819ec5b7` |
| `execution.py` | `7664ab52d16bcea37de09dfcd592faa4eeba83b4af8e32222c5222258fd2bb38` |
| `app_server_bridge.py` | `639ee0ab6f65bd5cb841a766a27fd62b32fd735a801a6bb155fb9d997fa57d2f` |

## Initial bridge spike and subsequent approval

The installed CLI generated App Server schemas successfully in `/private/tmp/app-server-schema.88WspE`. The v2 bundle SHA-256 was `7d6386c967b4f7083ce186f5c1b5fe53f2132284b742c2b5b2ad2d9d353ef0fc`. Thread/turn request and completion schema fields were read back. This establishes protocol shape, not live desktop access, authentication, UI visibility, or effective model routing. See the [official protocol documentation](https://learn.chatgpt.com/docs/app-server).

The initial experimental adapter was disabled by default and used injected JSONL transport/notification observations. It did not start a server or resume existing work. The tool guard rejected adding methods capable of starting or interrupting model turns through a live connected transport. The user was informed and explicit approval was requested; no answer was received during that initial implementation. Those methods were not added or indirectly enabled in the initial version. Generic turn-control requests were rejected before bytes were written.

That initial result was observation-only, not a turn-control adapter or autonomous controller. Controller-owned sessions remain the conservative future integration direction; existing desktop/subagent control and visibility remain unverified. A production controller remains a separate approval/design decision. Native execution still depends on the available Codex agent tools and truthful observed-event recording.

### Approved disabled turn-control follow-up

The user subsequently explicitly authorized adding disabled methods and fake-only tests, while prohibiting connection to or control of live agents. The extension was installed as `0.1.0+codex.20260915143638`; backup: `/Users/alexandrehoule/plugins/backups/worktree-orchestrator-20260915-turn-controls`.

- `start_turn(record, prompt, cwd=None)` requires explicit bridge and turn-control opt-in, a supplied transport, a bound thread ID, and explicit requested model/effort. It returns the turn response without changing execution/task state.
- `interrupt_turn(record)` targets the bound thread and turn. Its response acknowledges a request, not confirmed termination, cleanup, rollback, or task completion.
- `JsonlTransport` separately requires boolean turn-control opt-in; defaults still reject generic control requests without writing bytes. No daemon, connection setup, automatic scheduler, or CLI enable flag was added.
- Terminal `turn/completed` events must match both runtime IDs and distinguish completed, interrupted, and failed. Unsupported uncorrelated terminal aliases are rejected without mutation.

Final follow-up suite: **128 tests ran, 126 passed, 2 expected skips**. The focused bridge suite has 17 fake/in-memory tests. Both existing reviewers passed the correction delta; installed/source equality and installed focused tests passed. No live agents were connected to or controlled, and no live-model tests ran. Agent profiles and unrelated production gates were unchanged.

The updated [bridge reference](/Users/alexandrehoule/plugins/worktree-orchestrator/skills/orchestrate-worktrees/references/execution-bridge.md) explains the API and includes a fake-only example. Updated `app_server_bridge.py` SHA-256: `8c6c9549e79dad152f86b60f7ddd29f64222c2976188f9786e1feb24cc1fdcdd`. The earlier hash table describes the initial v5 snapshot.

## Preserved boundaries

The trial repository, its worktrees, benchmarks, and task registries were not modified, migrated, or resumed. No daemon was enabled, no live model workload was started by the spike, and nothing was pushed. Review scope remains cooperative guidance and recorded authority, not an OS sandbox or cryptographic approval system. Runtime/data probes remain project-defined and their semantic adequacy needs review. No measured cost or speed improvement is claimed without ordinary-use evidence.
