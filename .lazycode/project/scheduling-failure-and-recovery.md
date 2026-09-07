# Scheduling, Failure, and Recovery

Status: established
Last updated: 2026-09-06

## Purpose

This reference defines how approved work is scheduled, how capacity remains available for verification and coordination, how failures are handled, and how execution resumes after interruption. These are intended product contracts; the current delegation spike does not implement the complete scheduling and recovery system.

## Scheduling ownership

The responsible parent defines Task readiness, dependencies, and execution order through the approved plan. LazyCode enforces dependencies, permissions, workspace availability, and approved concurrency.

Independent Tasks may start when capacity becomes available without repeatedly waking the parent for authorization. Admission remains within the approved delegation plan in [Delegation and Task Contracts](delegation-and-task-contracts.md).

When ready work competes for local resources or provider capacity, scheduling:

1. Follows explicit Project or Delivery priorities.
2. Favors work that unlocks dependent Tasks.
3. Ensures other ready work eventually receives capacity.

## Capacity for completing work

LazyCode reserves capacity for activities needed to finish or unblock existing work, including:

- Reviewers;
- permitted QA Testers;
- integration workers;
- ephemeral escalation agents.

These activities receive priority when branches are waiting. New implementation Tasks must not consume every slot and prevent existing work from reaching completion.

Reserved capacity does not expand a worker's role or permissions. The role restrictions in [Roles and Ownership](roles-and-ownership.md) and the approved delegation plan continue to apply, including Delivery Manager ownership of Tester commissioning.

Exact reservation amounts and scheduling algorithms remain for technical planning.

## Temporary failures

Temporary failures, such as a model API timeout or rate limit, receive automatic retries with increasing delays and a bounded retry policy.

Exhausting that policy reports the failure to the parent for remediation. The bound limits repetition of the failed operation; it does not automatically terminate the entire Task.

Failure records preserve useful diagnostics and worker progress so the parent can determine the next action. Permissions and current work state remain applicable to every retry.

## Operations with uncertain outcomes

If an operation may have succeeded before its response was lost, LazyCode inspects actual state before retrying. This applies to commits, merges, pushes, and commands with side effects.

Confirmed successful operations are not repeated. If the outcome cannot be determined, the uncertainty escalates before another attempt.

Recovery retains each repository's outcome for multi-repository work. All required local merges must succeed before any requested pushes begin, and partial remote publication remains visible under [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md).

## Shared failures

Failures with a common external cause are coordinated as one incident covering the affected workers.

For example, a provider outage affects workers using that provider together. LazyCode coordinates retries and recovery instead of having every worker independently exhaust retries and emit duplicate alerts.

Unaffected providers and work may continue. Grouping an incident does not remove the affected workers' identities, progress, or individual operation outcomes.

## Stalled workers and loops

LazyCode looks for evidence such as:

- repeated failures;
- duplicate actions;
- circular delegation;
- lack of meaningful progress.

A long-running test or model request alone does not establish that a worker is looping.

An ephemeral parent activation evaluates the evidence. Within its authority, it may redirect the worker, reconstruct its activation, revise the Task, or escalate. Revised plans and permissions retain their established approval requirements.

Reconstruction and replacement preserve the logical worker's identity, role, assignment, and durable progress under [Worker Identity and Lifecycle](worker-identity-and-lifecycle.md).

## Unexpected restart

After an unexpected LazyCode or machine restart, execution does not resume immediately. The user is notified that an interruption occurred and asked whether to resume all interrupted work or none.

The restart prompt does not require selecting individual Deliveries or Tasks. Deliberately Paused work and work blocked on a user answer are excluded from the restart authorization and remain stopped until their own resume or resolution requirements are met.

Before execution continues, recovery inspects:

- checkpoints and recorded progress;
- branches and worktrees;
- owned processes and execution environments;
- pending operations and their actual outcomes;
- current permissions;
- actual repository state.

Unexpected changes or uncertain outcomes require resolution before affected work resumes. Manual worktree edits follow the established direct escalation to the user. Resumption uses the same logical workers, reconstructed from durable and actual state.

The user choice controls resumption of work; it does not waive reconciliation or authorize operations outside existing grants.

## Failure containment and lifecycle

An issue stops affected work and dependent operations where necessary. Unrelated work continues.

Existing worker states remain unchanged. Recoverable execution failures use the established Failed and reconstruction process when the current attempt cannot complete. Required human input uses Blocked. Shared incidents, retry attempts, and recovery tracking do not introduce new worker lifecycle states.

Continuous execution still follows [Human Control and Autonomy](human-control-and-autonomy.md), subject to the explicit user restart decision after an unexpected interruption. Deliberate pause, forced stop, and user-blocked work retain their own control rules.

## Remaining implementation detail

The product rules are established. Technical planning must define retry bounds and delays, incident correlation, progress detection, capacity reservations, fair scheduling, and recovery mechanics for uncertain side effects.

Test sequencing, QA scope, acceptance evidence, and permitted external-service verification exceptions follow [Review, Testing, Integration, and Completion](review-testing-and-completion.md). Ordered availability fallback, exceptional stronger-model reassignment, and stable worker configuration follow [Models and Provider Routing](models-and-provider-routing.md); physical recovery records and persistence continue in `PD-21`.
