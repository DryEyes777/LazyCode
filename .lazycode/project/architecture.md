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

Future context builders may add architecture decisions, feature contracts, failing tests, and child reports based on role and task, but they must keep selection explicit and observable.

The v1 plugin validates scope paths and places them in the child contract, but DSH's base read/search tools remain workspace-wide. Runtime enforcement currently covers read-only tool access, not path-level scope. Resource-scoped read authority is deferred to the capability work.

## Failure behavior

Startup or capability mismatches fail loudly. Cancellation flows through the Harness request signal. Refusal, model error, token exhaustion, invalid structured output, and disposal failures are reported as tool failures. Once a child run exists, LazyCode attempts disposal regardless of how result collection ends.

## Deferred architecture

The following are not implemented in D001: durable agent identity, delivery scheduling, feature integration, general permission leases, escalation routing, document indexing, automatic context selection, reviewer/tester workflows, multi-model role routing, and external human messaging.
