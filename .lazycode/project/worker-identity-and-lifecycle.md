# Worker Identity and Lifecycle

Status: established
Last updated: 2026-09-04

## Purpose

This reference defines logical worker identity, activation, durable reconstruction state, user-visible lifecycle states, replacement, disposal, restoration, and permanent deletion. These are intended product contracts, not a claim that the current spike implements the complete lifecycle.

## Terminology

A **logical worker** is a durable organizational identity.

An **activation** is one running process, model session, or reconstructed context acting for that logical worker.

A **conversation** is execution history associated with an activation. It is not the worker's identity.

The same logical worker may use several activations over its lifetime.

## Creation scope

Workers are created for these scopes:

- **Project Guide:** one project-facing conversation;
- **Project Manager:** one planning or documentation conversation;
- **Delivery Manager:** one Delivery;
- **Feature Lead:** one Feature;
- **Implementation Worker:** one Task;
- **Explorer:** one bounded investigation;
- **Oracle:** one knowledge question;
- **Reviewer:** one review scope;
- **Tester:** one isolated QA scope.

Project Guides and Project Managers are created per conversation rather than existing as unique permanent project agents.

Several Project Managers may exist concurrently.

## Branch isolation and authority

A Project Manager fully owns its role and documentation responsibilities.

Its branch or worktree isolates concurrent modifications; it does not reduce the Project Manager's organizational authority.

A Project Manager may work directly against the integration branch when no isolated changes are being made.

When several Project Managers modify project state concurrently, the later merge must reconcile earlier accepted changes.

## Durable identity

Each logical worker has a stable worker ID.

Its durable state includes:

- role;
- parent and child relationships;
- owned Project scope, Delivery, Feature, Task, or assignment;
- original contract and expected output;
- branch and worktree;
- permissions and resource scope;
- approved definitions and Decisions;
- current plan;
- progress;
- checkpoint and recovery state;
- Findings;
- Reports;
- escalations;
- divergences from the original premise;
- current lifecycle state.

Workers keep their progress current so a reconstructed activation can continue without relying on the previous model conversation.

## Identity continuity

Logical identity survives:

- model-session replacement;
- model-provider changes;
- process restart;
- context reconstruction;
- graceful pause;
- external failure recovery;
- parent-authorized worker replacement.

A replacement does not receive a new worker identity. It becomes a new activation of the same logical worker.

Model-policy updates apply to new logical workers by default. Existing workers keep their recorded configuration across compaction or replacement unless the user requests a change, an approved availability fallback applies, or the parent exceptionally reassigns after execution failure. See [Models and Provider Routing](models-and-provider-routing.md).

It receives the existing contract, environment, state, history references, and ownership, then tours them before continuing.

## Runtime activation

Whether a model session is currently loaded is not a user-facing lifecycle state.

LazyCode may release an inactive model conversation while preserving the worker's logical identity and state.

A child Report, escalation, user message, or new assignment can reconstruct the parent's context and reactivate it.

There is no `Dormant` worker state.

## Lifecycle states

### Active

The worker is currently reasoning, using tools, coordinating children, implementing, reviewing, testing, or otherwise performing its assignment.

### Waiting

The worker has active children and no useful independent work remaining until one of them reports or requires coordination.

A worker should enter Waiting only after checking that it cannot:

- spawn other useful children;
- review completed work;
- perform integration;
- update its plan or artifacts;
- progress another independent part of its assignment.

A child event returns it to Active.

### Paused

The user requested the worker's work to pause.

Pause follows the established graceful checkpoint and resource-cleanup process.

User resume and a successful state tour return the worker to Active.

### Blocked

Human input is required before the worker can proceed.

Internal dependencies, ordinary child work, and recoverable technical problems do not by themselves create Blocked.

The worker returns to Active after the user answers and the response is incorporated.

### Completed

The worker considers its current assignment done and sends its result to its parent.

Completed does not mean the parent has accepted the result or that the owned Feature or Delivery is complete.

The logical worker remains available. A user message, parent correction, valid review Finding, or new assignment returns it to Active.

Because Completed workers may be reconstructed later, no separate Dormant state is needed.

### Failed

An external or mandatory process prevents the worker from completing its assignment and cannot be repaired within the current attempt.

Examples include:

- unavailable model API;
- mandatory command that cannot complete;
- unavailable required execution environment;
- unrecoverable external service failure;
- required process that repeatedly fails without an in-scope remedy.

A Failed worker reports the failure to its parent.

Repairing the external condition, retrying, or replacing the activation returns the same logical worker to Active.

Bounded retries, inspection of uncertain outcomes, and shared-incident recovery follow [Scheduling, Failure, and Recovery](scheduling-failure-and-recovery.md). These mechanisms preserve worker identity and do not add lifecycle states.

### Disposed

The worker's Task or owned scope is no longer needed.

This may happen when:

- a Feature change makes the Task obsolete;
- a Task is explicitly disposed;
- a parent scope change removes the child contract;
- a parent disposal propagates to its descendants.

Disposed is a soft delete by default.

The worker's identity, Task, progress, Findings, and history remain available for inspection and possible restoration under the retention policy. Branches and worktrees remain subject to [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md): obsolete unmerged Task code may be discarded at Feature completion, while unmerged Feature and Delivery work is preserved recoverably during cleanup.

## Transition model

```text
Created -> Active

Active -> Waiting
Active -> Paused
Active -> Blocked
Active -> Completed
Active -> Failed
Active -> Disposed

Waiting -> Active
Waiting -> Paused
Waiting -> Blocked
Waiting -> Failed
Waiting -> Disposed

Paused -> Active
Paused -> Disposed

Blocked -> Active
Blocked -> Disposed

Completed -> Active
Completed -> Disposed

Failed -> Active
Failed -> Disposed

Disposed -> Active after restoration and reconciliation
Disposed -> permanently deleted
```

## Worker state versus work state

Worker lifecycle and owned-work lifecycle are separate.

Examples:

- An Implementation Worker may be Completed while its parent is still reviewing its Task.
- A Feature Lead may be Waiting while the Feature remains Active.
- A Failed worker does not automatically make its Task or Feature failed.
- A Completed Feature does not require its Feature Lead activation to remain loaded.
- Replacing an activation does not replace the Task or worker identity.

The parent evaluates the worker's result and advances the Task, Feature, or Delivery state.

## Reconstruction

Before a reconstructed worker becomes Active, it tours:

1. Its role and contract.
2. Parent and child relationships.
3. Current owned-work state.
4. Approved definitions and Decisions.
5. Plan and recorded progress.
6. Branch and worktree.
7. Existing implementation and artifacts.
8. Child Reports and unresolved Findings.
9. Permissions and accessible resources.
10. Alerts, escalations, and premise divergences.
11. Processes or environments that may still exist.

If durable state and actual state disagree, the worker reconciles them or escalates before continuing.

Context selection, warning and mandatory compaction triggers, and lightweight Reviewer checks of checkpoints follow [Context and Memory](context-and-memory.md). Compaction creates a fresh activation of the same worker and preserves its ownership and durable progress.

After an unexpected LazyCode or machine restart, reconstruction does not authorize automatic execution. The user chooses whether to resume all interrupted work or none, excluding deliberately Paused and user-blocked work. Recovery resolves unexpected or ambiguous state before affected work resumes, under [Scheduling, Failure, and Recovery](scheduling-failure-and-recovery.md).

Restoring a Git checkpoint on another installation uses committed database state and referenced code and evidence. Previously active Tasks become Paused, and retained worker records support reconstruction without the original conversations. Ownership, replicas, and restoration follow [Persistence and Schemas](persistence-and-schemas.md).

## Waiting parents

Delivery Managers and Feature Leads remain logical owners while their children work.

They may enter Waiting and release their active model session.

Children can wake or reconstruct their parent when they:

- complete;
- fail;
- emit an alert;
- escalate;
- require integration;
- need a parent Decision;
- produce review Findings.

The parent returns to Active, handles the event, and may return to Waiting afterward.

## Soft disposal and restoration

Restoring a soft-disposed worker preserves the same identity.

Before returning to Active, it must:

- confirm its Task or scope is needed again;
- reconcile its contract with current Feature and Delivery definitions;
- inspect existing branch and worktree state;
- update against the current base;
- resolve or plan conflicts;
- inspect child state;
- rebuild its plan and checkpoint;
- restore valid permissions.

Restoration does not imply that old implementation remains valid.

It also does not guarantee that a cleaned-up Task's unmerged code still exists. Restoration must account for what remains in integrated history, preserved Feature or Delivery work, and retained artifacts.

## Permanent deletion

A soft-disposed worker may be permanently deleted.

Worker-exclusive data that provides no continuing project value may be deleted with it, including:

- raw conversation history;
- private transient notes;
- unpromoted execution detail;
- worker-only checkpoint data;
- worker-specific artifacts with no remaining references.

Project-level knowledge must not be deleted merely because its originating worker is removed.

Project-wide aggregate data may remain, including:

- timing metrics;
- model and usage aggregates;
- error-rate statistics;
- system reliability measurements.

Retained aggregate data should not require retaining the deleted worker's conversation or other worker-exclusive content.

## Ownership transfer

The parent authorizes ownership transfer or replacement.

The logical worker retains:

- worker ID;
- role;
- Task or ownership contract;
- branch and worktree;
- permissions;
- plan and progress;
- child relationships;
- unresolved Findings and escalations.

Only the activation changes.

## Deferred detail

Later topics define lifecycle-event schemas, concurrency admission, context assembly, persistence layout, aggregate-metric privacy, Task lifecycle, and runtime cleanup mechanics.
