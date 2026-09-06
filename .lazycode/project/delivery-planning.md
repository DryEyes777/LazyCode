# Delivery Planning

Status: established
Last updated: 2026-09-03

## Purpose

This document defines the Delivery contract, grouping rules, ownership, readiness, concurrency, integration planning, scope changes, lifecycle, verification, and knowledge promotion. It is an intended product contract, not a claim that the current spike implements Delivery orchestration.

## Definition

A Delivery is an untimed, user-approved batch of implementation-ready Features that are coordinated, integrated, and reviewed as one unit.

A Delivery groups Features for one of two reasons:

1. **Independent verification:** small, non-overlapping Features can be implemented independently and tested efficiently together.
2. **Shared integration:** Features substantially affect the same product area, so their order, overlap, and desired combined result must be planned explicitly.

A Delivery is not a timebox.

## Ownership

Every Delivery has a Delivery Manager responsible for:

- starting Feature work;
- coordinating Feature workers and dependencies;
- monitoring Feature completion;
- creating Delivery-specific Tasks and subagents;
- maintaining the Delivery branch;
- planning integration order;
- resolving Feature overlap;
- ensuring appropriate review and testing;
- commissioning tightly scoped Tester workers in isolated environments for Delivery-level QA;
- integrating Feature results;
- propagating discoveries;
- preparing the Delivery candidate;
- coordinating corrections after user rejection;
- preparing the approved merge.

The user approves, starts, pauses, resumes, abandons, reviews, and authorizes the final merge.

## Lean Delivery definition

The required definition contains only:

- Delivery identifier and name;
- one-sentence intended outcome;
- canonical Feature references;
- Feature dependency relationships;
- parallel and sequential implementation groups;
- Delivery branch and target integration branch;
- Delivery-level verification plan;
- current lifecycle state.

The following are included only when applicable:

- predecessor Delivery merge dependencies;
- overlap and conflict-resolution plan;
- desired combined state for overlapping Features;
- known integration risks or constraints.

For a Delivery spanning repositories, the definition identifies each affected repository, its Delivery and target branch, and dependencies across repositories. One approval covers the combined candidate; all required local merges must succeed before requested pushes begin.

The Delivery references Feature definitions and acceptance criteria rather than duplicating them. It does not require budgets, time estimates, sprint dates, or empty boilerplate sections.

## Readiness to start

A Delivery may enter `Active` only when:

- the user has approved its definition;
- the user explicitly starts it;
- every included Feature is implementation-ready;
- each Feature belongs to this Delivery only;
- dependencies and implementation order are understood;
- no Feature depends on unfinished behavior in an Active Delivery;
- required predecessor Deliveries are at least Completed;
- overlap requiring planned integration has an adequate resolution strategy;
- branch and target integration information are known.

## Feature execution and branch flow

The Delivery Manager starts and coordinates the Feature workers.

Each Feature worker owns its Feature branch in each affected repository. Relevant Delivery-branch changes arrive as review comments alongside other corrections; Feature workers incorporate them during revision and reconcile before acceptance. Urgent risks retain immediate escalation.

A Feature reaches Completed when its Feature Lead has integrated all Task work and every Feature acceptance criterion passes. The Delivery Manager then merges that completed Feature branch into the Delivery branch; this later integration is not part of Feature completion. See [Feature Definition](feature-definition.md).

The Delivery Manager remains responsible for ensuring the combined Delivery branch reaches the intended state.

Managed worktrees, integration, commit history, conflict ownership, cleanup, and multi-repository behavior follow [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md). Exact Git-operation implementation remains technical planning work.

## Multiple active Deliveries

Several Deliveries may be Active simultaneously.

### Functional dependency on Active work

A Delivery cannot start if one of its Features depends on behavior still being implemented in an Active Delivery.

### Dependency on Completed, unmerged work

A Delivery may start on top of a Completed but unmerged Delivery.

```text
Delivery A Completed
  -> Delivery B starts on A
  -> A must merge first
  -> B reconciles with the merged base
  -> B may then become eligible to merge
```

This creates an explicit merge-order dependency.

### Code overlap without functional dependency

Deliveries that overlap in code may run concurrently when neither depends on unfinished behavior from the other.

Before the later Delivery incorporates the updated integration branch:

1. The user explicitly starts the integration process.
2. LazyCode analyzes overlaps and conflicts.
3. LazyCode prepares a conflict-resolution plan.
4. The plan explains the desired combined state.
5. The user reviews and approves it.
6. The Delivery performs the merge and planned reconciliation.

This base-branch integration is never automatic.

## Scope changes after start

Substantially changing an Active Delivery requires:

```text
Pause Delivery
  -> update Delivery and Feature definitions
  -> inspect completed and partial implementation
  -> identify obsolete, conflicting, or missing work
  -> create a revised dependency and integration plan
  -> clean up or rework affected implementation
  -> notify affected workers
  -> resume from the approved revised plan
```

Unrelated work may continue only when it remains valid under the revised definitions.

## Lifecycle states

### Draft

The Delivery is being composed and refined.

- Features and plans may change.
- No implementation is authorized.
- User approval and explicit start move it to `Active`.
- It cannot return to Draft after starting.

### Active

Delivery work is being performed.

- Features may be implementing, reviewing, testing, or integrating.
- It may move to `Paused`.
- It becomes `Completed` when every Feature is complete and merged into the Delivery branch.
- Corrections may move a Completed Delivery back to Active.

### Paused

Work has stopped through the established graceful-pause contract.

- Paused returns to `Active` after the top-down resume and state tour.
- Pause does not change approved scope.

### Completed

Every included Feature is complete and merged into the Delivery branch.

This makes the Delivery eligible for Delivery-level verification and candidate review. Completed does not mean merged into the project's target branch.

- Failed verification, user rejection, required correction, or necessary rework returns it to `Active`.
- A verified and user-approved candidate may proceed toward `Merged`.

The candidate review package is attached to the Completed Delivery; awaiting approval is a presentation condition, not another canonical lifecycle state.

### Merged

The user approved the candidate and authorized its integration into the configured target branch.

When multiple repositories are affected, every required local target-branch merge must succeed before the Delivery becomes Merged. Partial local integration is recorded for resolution. Requested pushes begin only after all local merges succeed, and partial remote publication is reported separately.

After successful merge and reconciliation:

- post-merge checks run;
- Feature and Epic progress is updated;
- roadmap history is updated;
- affected project documentation is updated;
- a Project-level Delivery summary is persisted.

Merged is terminal. A Merged Delivery cannot become Abandoned.

### Abandoned

The user has ended a non-Merged Delivery without integrating it.

Abandonment is a soft deletion:

- history and artifacts remain available;
- the Delivery is excluded from active planning by default;
- implemented or partial branch work is not erased;
- cleanup preserves unmerged Delivery work recoverably under [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md).

Any non-Merged Delivery may become Abandoned.

## Transition model

```text
Draft -> Active
Active <-> Paused
Active <-> Completed
Completed -> Merged

Draft -> Abandoned
Active -> Abandoned
Paused -> Abandoned
Completed -> Abandoned
```

No state transitions out of Merged.

## Verification and user review

After a Delivery enters Completed:

1. Delivery-level integration and acceptance checks run.
2. Failure returns the Delivery to Active.
3. Passing checks produce a Delivery candidate and review package.
4. The user tests the Delivery branch.
5. Rejection returns actionable changes to Active implementation.
6. Approval authorizes merge.
7. Successful integration produces Merged.

Exact review contracts are refined in `PD-19 — Review, testing, integration, and completion`.

## Knowledge promotion

Feature discoveries are first recorded in Feature documentation.

The Delivery Manager then:

- updates Delivery-level definitions and integration knowledge;
- supplies project-wide consequences and affected Epic/roadmap state to a Project Manager;
- integrates the Project Manager's documentation branch into the Delivery branch;
- persists the Delivery-wide summary at Project level;
- links the Delivery to its Feature Reports and Decisions.
