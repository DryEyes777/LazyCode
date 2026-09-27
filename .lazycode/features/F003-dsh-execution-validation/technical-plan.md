# F003 — Technical Plan, Revision 1 Draft

Status: architecture direction confirmed; detailed technical specification pending final approval
Product definition: revision 1 approved

On 2026-09-26 the user approved the discussed adapter-process, native-isolation, and restricted-secret choices, adding an explicit low-resource requirement. This confirms design direction, not a Delivery start. The detailed acceptance and resource evaluation must retain that requirement.

## Evidence and approach

The [source inspection](../../project/research/execution-and-isolation-validation.md) identifies concrete hooks in pinned DSH `0.1.0-rc.8`. This plan must prove their composition, not infer it from declarations. No package version changes are proposed. Any directly imported transitive DSH packages must become explicit exact-version development dependencies during separately authorized implementation, with lockfile review and no family upgrade.

Propose a small fixture backend owning one trusted Node adapter process per activation. The adapter loads a minimal Cordis/DSH composition with the real agent/session/tool/LLM loop and only a scripted model adapter. It exposes no HTTP server, web UI, interactive CLI, external plugin discovery, or production provider. Explicitly avoid loading user home/project plugin configuration, real credentials, auto-title models, unrestricted shell tools, or generic child-agent controls.

Create agents through `ctx.agents.create` and install persona, tools, guards, and observers in unpublished `setup`. Use direct `Agent` methods for messages and cancellation; retain the `AgentHandle` for disposal. This avoids requiring a live model-parent Agent merely to deliver a LazyCode-controlled message. Logical hierarchy stays in fixture application state. DSH parent/session metadata may record real ancestry where available, but must not invent a resident parent or claim cross-process structural ownership.

Characterize native continuable start/follow-up/interrupt separately in a small local fixture using real parent handles. Report the differences; do not introduce a second production execution strategy. Keep F001's original one-shot path unchanged.

The adapter-process boundary isolates failure/lifecycle ownership, not hostile code. No worker-authored executable code runs inside it. Command execution belongs to the controlled broker/F004 boundary.

## Proposed interface and identity

Use Node's explicit parent/child IPC channel with versioned, validated JSON envelopes, separate diagnostic pipes, and bounded payloads (initial proposal: 1 MiB per envelope; larger permitted evidence is referenced). No shell-generated protocol or listening public endpoint.

Every operation carries `requestId`, `workerId`, `activationId`, `contractRevision`, `controlEpoch`, and `policyRevision`. The fixture controller generates identities; claims from model/tool arguments do not establish authority. Messages additionally carry `messageId` and a mode: follow-up, next-step steering, or quiet context. Events carry a monotonic adapter sequence, runtime session reference, optional actual turn/message references, and provenance.

| Operation | Required meaning |
| --- | --- |
| `start` | Reserve and persist the request/identity before dispatch; establish the agent and report creation separately from inbox acceptance and actual turn start. Same ID and payload is idempotent; same ID with changed payload is an error. |
| `message` | Admit only under current control/authority; deduplicate by message ID. Map the chosen mode to `followup`, `steer`, or `inject`. An acknowledgment is not proof of model consumption. |
| `stop` | Distinguish cooperative interrupt from activation disposal. Observe quiescence/disposal; a returned cancellation call is not a stopped-process receipt. User forced stop is a separate supervised process action. |
| `observe` | Emit created, inbox-accepted/claimed, turn-start/end, idle, disposed, and failure observations with original references. Missing routing/usage stays unknown. |
| `inspect` | Read the fixture controller's request/event records and known process identity to resolve uncertainty before any retry. Never recreate possibly-live work merely because an IPC response was lost. |

Store only the fixture control ledger and sanitized event mappings in temporary durable JSONL files. DSH's own fixture session logs retain its execution history. This is not a second production project database or full scheduler. Restart replays validated records; incomplete tails/corruption become recovery errors. Do not claim exactly-once side effects across process death: uncertain requests quarantine the activation until the outcome is inspected.

## Lifecycle and reconstruction

At most one admitted activation per fixture worker. Pause increments a control epoch and closes admission before canceling/draining; late events remain evidence but cannot reopen admission. The controller, not DSH auto-wake behavior, decides whether a later input may wake a worker. Test send/cancel races and pending inbox behavior explicitly.

Use session turn events and inbox-claimed references for message-specific completion; `whenIdle()` is only whole-agent quiescence. A submit-result tool validates the fixture schema and may `concludeTurn()`; it never accepts a Task. Invalid/missing results, refusal, exhaustion, errors, and canceled runs remain distinct failures with safe partial diagnostics.

The normal reconstruction experiment creates a new activation/session from supplied role, contract, plan/checkpoint, grants, and selected evidence, preserving worker ID without copying ancestral conversations. Separately characterize same-session `resume()` using the pinned persistence service and report its limitations. Do not require that history-preserving path for portable identity reconstruction.

Cooperative disposal has an injected test deadline solely to detect a stuck adapter. Expiry records uncertainty; it is not a normal command-runtime timeout. Forced-stop tests may explicitly terminate the owned adapter process and require independent process-exit evidence; any broker-owned commands require their own F004 stop barrier.

## Tool and sensitive-output boundary

Expose only enumerated LazyCode fixture tools and submit-result. Use a global deny-capable `tools.guard` plus broker authorization keyed to the trusted IPC identity, with revalidation before side effects. The guard is synchronous, so async policy lookup belongs in the broker/pre-execute path; guards cannot pretend to await it. Scope-local tools and generated code transports must not evade policy. Keep code-mode executors absent by default and test their attempted invocation.

The broker returns an already-safe value or safe error before DSH normalization, tool observers, metadata, error rendering, or session append. Never send raw secret-bearing bytes into a DSH result and rely solely on `finalizeContent`: it only transforms content. Defense-in-depth hooks may deny unexpected values, but provider/debug/telemetry paths must also be checked. Structured values, metadata, deferred contexts, attachments, error messages, and raw logs all belong in sentinel scans.

In the standalone F003 suite the broker is a scripted controlled fixture, which proves ordering and integration but not OS enforcement. The later F003/F004 cross-boundary acceptance uses the real executor with the same message contract.

## Test-authoring and implementation sequence

After technical approval and Delivery start, use the approved general bootstrap: an Implementation Worker first authors fixture interfaces, scripted provider, fail-closed network guards, intentional unimplemented subjects, and contract tests. Tests must reach meaningful assertions, not merely fail imports. An independent review checks them before dependent implementation. Managers author no code; accepted behavioral tests stay outside implementers' write scope.

Then implement serial bounded Tasks: (1) adapter composition and IPC, (2) controller ledger/lifecycle, (3) broker hooks/results, (4) reconstruction and cross-boundary integration/reporting. Separate test-owned files from implementation; interface changes return to the owner for review. Each coding Task retains required unit/real-helper tests and parent-commissioned review. Final Feature and Delivery suites remain separate.

Proposed paths: `src/validation/dsh-execution/`, `tests/dsh-execution/`, and `vitest.dsh-execution.config.ts`. Add explicit `test:dsh-execution` discovery and include it in aggregate checks; avoid duplicating cases through the broad existing Vitest include. Record node/package versions and source digests. Preflight requires a supported Node runtime, current lockfile, writable temporary root, and no live model/provider route. Unknown provider selection fails closed, never falls back.

## Resource accounting

Measure active and quiescent adapter-process memory/CPU, startup latency, and repeated activation/disposal alongside the F004 supervisors/proxies. Report the combined footprint rather than describing a lightweight sandbox while omitting the Node activation cost. Logical worker count does not justify permanently resident processes. Demonstrate safe release/reconstruction from checkpoints when no pending work or owned resource requires residency; do not evict active work just to make idle measurements look favorable.

## Remaining approval boundary

The direct-handle/per-activation-process direction is confirmed. Review the detailed protocol, fixture ledger, and [acceptance](acceptance.md) together before final specification approval. Resource/lifecycle limits are safety test settings, not new product-wide budgets. No experiments have run; dependent production reuse requires accepted findings.
