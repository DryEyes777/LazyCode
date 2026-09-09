# Architecture

## Decision status

The initial integration remains an out-of-tree DeepSeek Harness bundle composed from native Cordis plugins. PD-22 establishes a small internal execution interface and application state independent of individual agent sessions. Hosting the larger application inside the plugin host versus a separate local process remains open. The full contract is [DeepSeek Harness Boundary](deepseek-harness-boundary.md).

## System boundary

```text
LazyCode application and organizational state
  workers | scheduling | permissions | databases | Git | context | recovery
                              |
Internal execution interface
  start | message | stop | observe
                              |
DSH integration through native Cordis plugins
  agent loop | model communication | tool execution | raw sessions
```

The initial DSH integration uses execution mechanics exposed through:

- Cordis profile and bundle composition;
- agent loops and model adapters;
- tool registration and guarded execution;
- append-only session events and child lineage;
- subagent startup, cancellation, results, and disposal;
- filesystem, process sandbox, approval, and persistence seams.

LazyCode owns the application and organizational policy:

- named roles and responsibilities;
- web application and Project lifecycle;
- project, delivery, feature, and task contracts;
- rules for constructing bounded context;
- ownership and information-compression policy;
- scheduling, permission grants, and escalation routing;
- databases, replication, and validated database imports;
- Git and workspace controls;
- durable project artifacts and recovery policy.

Underlying tools must remain subject to LazyCode authorization, including shell and CLI paths. Missing functionality or enforcement support is reported as a capability gap for normal implementation work. These are intended product requirements, not capabilities already implemented by the spike.

The intended persistence model is [Persistence and Schemas](persistence-and-schemas.md): structured knowledge and planning in one controlled SQLite database per worktree, validated parent imports, selected live replication, and Git-tracked snapshots and evidence attachments. Harness conversations and raw execution logs remain local. This model is future implementation work; the current spike and its Markdown planning files are unchanged.

## Deployment stance

The initial LazyCode runtime executes completely on the operator's machine. It does not require a hosted LazyCode control plane, persistence service, or collaboration server.

The initial user-facing surface is a web application served by that local runtime and opened in a browser. A separate interactive CLI is not part of the first product interface.

Reusable workflow definitions, role behavior, model/provider configuration, and other non-project-specific LazyCode state belong to the local LazyCode installation. Project definitions, architecture, conventions, commands, deliveries, features, decisions, and operating instructions belong in the repository alongside the product they govern.

The local runtime may register and actively run several projects concurrently. Each project remains isolated in repository state, workers, Deliveries, alerts, settings, and runtime resources.

Model inference is the expected external boundary. Models may run locally, but remote model APIs will commonly be used.

A hosted LazyCode runtime may be introduced later so work can continue independently of the operator's machine and remote users can connect to it. That future option must preserve the repository as the source of project-specific truth and must not become a dependency of the local-first product.

The established information architecture is defined in [Interaction Surface](interaction-surface.md).

Project registration and repository-state ownership are defined in [Project Lifecycle](project-lifecycle.md).

A Project may span a main repository and secondary repositories, with shared Project context and Feature/Delivery ownership. Tasks remain scoped to one repository. Managed worktrees, runtime-controlled Git operations, integration and push ordering, and cleanup follow [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md). These are future product capabilities beyond the current spike.

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

The future product scheduling and recovery contract is established in [Scheduling, Failure, and Recovery](scheduling-failure-and-recovery.md): reserved verification capacity, bounded retries, inspection of uncertain outcomes, shared external incidents, and explicit user authorization after unexpected restart. These runtime capabilities remain beyond the current spike.

## Deferred architecture

The following are not implemented in D001: durable agent identity, delivery scheduling, feature integration, general permission leases, escalation routing, document indexing, automatic context selection, reviewer/tester workflows, multi-model role routing, and external human messaging.
