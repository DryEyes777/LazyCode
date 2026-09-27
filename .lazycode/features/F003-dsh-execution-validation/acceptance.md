# F003 — Deterministic Acceptance Draft

Status: proposed with technical revision 1; not executed

Use real pinned DSH services, scripted LLM chunks, fixture broker operations, explicit synchronization barriers, and temporary logs. Inject clocks for controller logic; actual child-process exit tests use bounded real waits. No sleep-based assumption that a turn or process completed. Scan all fixture model inputs, sessions, diagnostics, metadata, and attachments for synthetic secret sentinels.

| ID | Scenario and required oracle |
| --- | --- |
| E01 | Clean minimal composition loads pinned services; existing F001 checks still pass; no user configuration or production provider is loaded. |
| E02 | Duplicate start ID yields one activation; changed payload under that ID is rejected. Setup failure publishes no falsely-running activation. |
| E03 | Inbox acknowledgment, actual turn start, message consumption, turn end, idle, and disposal are distinct correlated observations. |
| E04 | Follow-up, steering, and quiet context preserve their documented delivery/wake behavior with two messages and a controlled running step. |
| E05 | Valid structured result concludes a turn without accepting a Task; invalid/missing/refused/exhausted/error cases remain failures with sanitized partial evidence. |
| E06 | Cancel before publication and during model/tool work; track whether side effects began. Await actual quiescence/disposal and preserve disposal errors. |
| E07 | Pause racing with input or terminal event never auto-resumes; stale epochs fail admission. Explicit resume requires reconciled state. |
| E08 | Duplicate/out-of-order transport events do not duplicate effects or invent completion. A sequence gap remains unresolved until reconciled. |
| E09 | Drop responses before/after inbox acceptance and kill an adapter at deterministic barriers. Recovery does not blindly redispatch ambiguous work. |
| E10 | New activation reconstructed from bounded fixture checkpoint preserves worker/contract identity and excludes ancestral conversation. Separately report native session-resume behavior. |
| E11 | Unauthorized tool calls, revoked grants, scope-local registrations, alternate/default tools, and attempted code transport calls cannot bypass the guard/broker. |
| E12 | Broker synthetic secrets never enter structured values, result content, error/meta fields, deferred context, observers, logs, or model requests. Test safe rejection before DSH receives raw data. |
| E13 | Register only scripted model adapters; accidental provider requests and outbound network attempts fail tests even with fake credential-shaped environment variables. |
| E14 | Two fixture workers retain distinct tools, contexts, routing observations, and control epochs. Unknown effective model/usage stays unknown. |
| E15 | Real continuable-child fixture demonstrates accepted-versus-started distinction, exact-parent constraints, and interrupt limits. Findings do not change the selected LazyCode ownership model. |
| E16 | Forced termination is independently observed; no clean process barrier on uncertainty. All successfully completed cases dispose owned handles/processes and retain evidence. |
| E17 | Cross-boundary test uses F004's real executor and confirms only broker-sanitized output reaches Harness; unavailable F004 evidence is an explicit unmet integration gate. |
| E18 | Measure adapter startup, active/quiescent CPU and memory, repeated disposal, and safe checkpoint/reconstruction. Include combined adapter/supervisor/proxy overhead in the shared resource report; no persistent activation is justified solely by a retained logical worker. |

Final checks: typecheck, existing full unit suite, the complete dedicated suite, production build, source-integrity/process barriers, and an evidence report mapping every case to actual versions and outcomes. `test:dsh-execution` is a proposed script, not a command currently present. Missing prerequisites produce blocked verification, not skips reported as passes.

F003's standalone capability report may be reviewed before E17 is available, but production integration remains blocked until E17 passes. Unexpected unsupported requirements return for a scoped decision; they are never relabeled as successful compatibility.
