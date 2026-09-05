# Architecture

## Decision status

The v1 architecture is decided: LazyCode is an out-of-tree DeepSeek Harness bundle composed from native Cordis plugins. The larger organizational design remains evolutionary and will be validated through narrow vertical slices.

## System boundary

```text
LazyCode organizational layer
  roles | contracts | context policy | project artifacts | future escalation
                              |
DeepSeek Harness plugin seams
  tools | system prompt | subagents | sessions | sandbox | approvals
                              |
Cordis plugin runtime and configured model adapters
```

DeepSeek Harness owns execution mechanics:

- Cordis profile and bundle composition;
- agent loops and model adapters;
- tool registration and guarded execution;
- append-only session events and child lineage;
- subagent startup, cancellation, results, and disposal;
- filesystem, process sandbox, approval, and persistence seams.

LazyCode owns organizational semantics:

- named roles and responsibilities;
- project, delivery, feature, and task contracts;
- rules for constructing bounded context;
- ownership and information-compression policy;
- future permission leases and escalation routing;
- durable `.lazycode/` artifacts.

## Deployment stance

The initial LazyCode runtime executes completely on the operator's machine. It does not require a hosted LazyCode control plane, persistence service, or collaboration server.

The initial user-facing surface is a web application served by that local runtime and opened in a browser. A separate interactive CLI is not part of the first product interface.

Reusable workflow definitions, role behavior, model/provider configuration, and other non-project-specific LazyCode state belong to the local LazyCode installation. Project definitions, architecture, conventions, commands, deliveries, features, decisions, and operating instructions belong in the repository alongside the product they govern.

The local runtime may register and actively run several projects concurrently. Each project remains isolated in repository state, workers, Deliveries, alerts, settings, and runtime resources.

Model inference is the expected external boundary. Models may run locally, but remote model APIs will commonly be used.

A hosted LazyCode runtime may be introduced later so work can continue independently of the operator's machine and remote users can connect to it. That future option must preserve the repository as the source of project-specific truth and must not become a dependency of the local-first product.

The established information architecture is defined in [Interaction Surface](interaction-surface.md).

Project registration and repository-state ownership are defined in [Project Lifecycle](project-lifecycle.md).

## First vertical slice

The bundle overrides the root deployment persona with a Project Manager and registers `delegate_exploration`. A call creates a fresh in-process Explorer through the Harness `spawn` provider.

The child receives a standalone prompt containing the question, requested repository scope, and canonical memory root. It is limited to one delegation level and the `read`, `glob`, and `grep` tools. It must return a structured report containing a summary, file-backed evidence, and uncertainties.

The parent receives only that report. Harness session events retain execution detail and lineage; LazyCode does not create a second runtime database.

## Context policy

The Explorer does not inherit the parent's conversation. Its invocation context consists of:

1. the Explorer persona;
2. the explicit question and scope;
3. the `.lazycode/` memory location;
4. the current repository visible through read-only tools;
5. the structured output contract.

The intended product context policy is established in [Context and Memory](context-and-memory.md): default assignment context, bounded read expansion, source provenance, progress-based reconstruction, compaction thresholds, lightweight checkpoint review, and updates through the existing hierarchy. Its runtime implementation remains future work beyond the Explorer spike described above.

The v1 plugin validates scope paths and places them in the child contract, but DSH's base read/search tools remain workspace-wide. Runtime enforcement currently covers read-only tool access, not path-level scope. Resource-scoped read authority is deferred to the capability work.

## Failure behavior

Startup or capability mismatches fail loudly. Cancellation flows through the Harness request signal. Refusal, model error, token exhaustion, invalid structured output, and disposal failures are reported as tool failures. Once a child run exists, LazyCode attempts disposal regardless of how result collection ends.

## Deferred architecture

The following are not implemented in D001: durable agent identity, delivery scheduling, feature integration, general permission leases, escalation routing, document indexing, automatic context selection, reviewer/tester workflows, multi-model role routing, and external human messaging.
