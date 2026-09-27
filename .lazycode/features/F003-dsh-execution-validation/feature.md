# F003: DSH Execution Compatibility Validation

State: Defined — product-definition revision 1 approved; technical draft under discussion
Last updated: 2026-09-26
Planning alias: V1
Parent Epics: none assigned
Delivery: not assigned
Product-definition approval: revision 1 explicitly approved by the user on 2026-09-26 ("I approve them", in response to the joint F003/F004 product-scope approval request)
Technical-specification approval: pending

Technical direction: the user confirmed the discussed adapter-process design on 2026-09-26, with combined resource-overhead measurement required. Final detailed specification approval and Delivery start remain separate.

Technical planning: [revision 1 draft](technical-plan.md) and [acceptance matrix](acceptance.md), informed by [source inspection](../../project/research/execution-and-isolation-validation.md). Architecture direction is confirmed; detailed specification approval is pending and no runtime experiment has run.

## Purpose and current state

Establish whether the pinned DSH integration supports LazyCode's required execution controls behind a separate backend. F001 proves a single read-only delegation path, not the full application/execution boundary.

As the developer, I need an evidence-backed integration contract and clear capability gaps before production work depends on the runtime.

## Approved desired outcome

A bounded executable adapter prototype, deterministic contract tests, and a capability report for starting, messaging, stopping, and observing activations. Exercise the real pinned Harness integration with scripted model responses; faking the Harness itself does not prove compatibility. Recommend a process/adapter arrangement and separate LazyCode, DSH, and executor responsibilities.

## Approved product acceptance coverage

1. Load the pinned packages/profile and retain existing delegation compatibility.
2. Start from explicit context, role, allowed tools, and structured-output requirements. Bind distinct activations to a stable fixture worker identity. Distinguish requested routing/usage from actually observed or unavailable information.
3. Demonstrate message delivery, cancellation, terminal events, partial output, and disposal; document unsupported semantics rather than assuming them.
4. Exercise success, refusal, invalid output, startup/termination failures, duplicate or late events, and uncertain dispatch. A small fixture coordinator must not duplicate execution, override a later pause/approval gate, or interpret an ended turn as accepted work.
5. Reconstruct an activation from supplied fixture state without inherited conversation history; identify any Harness session dependencies.
6. Test authorization and input/result interception at the actual tool integration points, including alternate underlying tool routes. Synthetic secret-bearing output must not reach models or ordinary raw logs. This proves hooks, not OS containment.
7. Fail attempted live model calls even when credentials exist. Use no personal conversations or live-agent control.
8. Report each required capability as demonstrated, unsupported, or unresolved, with versioned evidence, diagnostics, limitations, and production implications. A negative finding blocks the corresponding production capability; it is not a passing execution gate.

## Scope and non-goals

Use a minimal fixture host, representative worker identity, multiple activations, controlled tools, and synthetic state/events. Do not build the production backend, scheduler, SQLite schema, model catalog, web UI, OS sandbox, or a general multi-runtime framework. No Harness fork, automatic upgrade, production installation, or paid model benchmark. Prototype reuse requires later assessment.

A completed investigation with negative findings requires user review and a revised dependent plan; it cannot silently waive an unmet requirement.

## Dependencies and next approval

Follow [the execution boundary](../../project/deepseek-harness-boundary.md) and [the sequence](../../project/minimum-application-feature-sequence.md). Fixture state allows planning independently of F002's storage findings without creating an alternative production database. Coordinate the tool/process boundary with [F004](../F004-local-execution-isolation/feature.md).

After product approval, inspect pinned source and primary documentation to specify hooks, process/transport layout, interfaces, event correlation, fault oracles, test-authoring ownership, and acceptance commands. Required upgrades or behavior changes return for approval. Product approval permits technical planning only; technical approval, Delivery scheduling, and explicit start remain separate. Creating this draft runs no experiment.
