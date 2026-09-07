# Feature Definition

Status: established
Last updated: 2026-09-03

## Purpose

This document defines the canonical Feature template, approval gates, ownership, lifecycle, modification rules, completion boundary, split and combination behavior, and restoration. It is an intended product contract, not a claim that the current spike implements Feature orchestration.

## Definition

A Feature is a self-contained, acceptance-driven unit of work, similar to a User Story.

It may describe new functionality, a bug fix, migration, upgrade, maintenance, performance or security improvement, or architectural change.

A Feature is defined in two stages:

```text
Product definition
  -> user approval
  -> technical specification
  -> user approval
  -> implementation-ready
```

## Product definition

The product definition concisely describes what is wanted.

Required content:

- Feature identity and name;
- parent Epic references;
- current state;
- desired state;
- UI expectations when applicable;
- required functionality;
- expected logic and behavior;
- scope;
- non-goals;
- acceptance criteria;
- related Features and known dependencies.

The user and Project Manager refine this definition together.

When the user approves it, the Feature enters `Defined`, authorizing technical planning but not implementation.

## Technical specification

The Project Manager helps the user research and specify how the approved Feature should be implemented.

Required content:

- logic changes;
- data and schema changes;
- affected Components;
- interfaces and contracts;
- dependencies;
- Task decomposition;
- worker-orchestration plan;
- verification approach.

Include only when applicable:

- migration and compatibility strategy;
- Feature-branch integration plan;
- unusual permissions;
- risks and additional non-goals.

When technical planning is finished but not yet approved, the Feature enters `Specced`.

User approval moves it to `Approved`, meaning it is implementation-ready and may be placed in a Delivery.

## Feature Lead

The Feature Lead owns execution of the approved Feature.

It:

- verifies the definition and specification are sufficient;
- identifies missing or contradictory information;
- decomposes the Feature into Tasks;
- assigns Tasks to implementation workers;
- manages Task dependencies and child workers;
- starts independent Reviewers and directs Implementation Workers to run required Feature tests;
- integrates child results into the Feature branch;
- ensures implementation matches the approved Feature;
- gathers evidence for every acceptance criterion;
- reports completion to the Delivery Manager.

The Feature Lead does not write implementation code. It manages implementers, Reviewers, Feature-level test execution, and integration. Independent human-like Tester workers are reserved for Delivery-level QA and may only be commissioned by a Delivery Manager.

## Implementation workers

Every implementation worker receives a Task that forms its contract.

A worker may subdivide its Task. Each child Task receives a new worker.

All child work is integrated upward into the Feature branch under the Feature Lead's responsibility.

## Lifecycle states

### Draft

The Feature idea and product definition are being explored.

No product or technical approval exists.

### Defined

The user has approved the general UI, functionality, and logic wanted.

Technical planning may begin.

### Specced

The technical specification is complete but has not yet received final user approval.

### Approved

The user has approved the technical specification.

The Feature is implementation-ready but has not yet been assigned to a Delivery.

### Scheduled

The Feature has been assigned to one approved Delivery.

It may belong to several Epics, but only one Delivery.

### Active

The Feature Lead and child workers are implementing, reviewing, testing, and integrating the Feature.

### Paused

Active work has paused through the established safe checkpoint process.

The Feature remains assigned to its Delivery, but no new Feature work proceeds until it is resumed.

### Completed

Acceptance criteria have been verified against the Feature branch, with any permitted pre-existing or transient external-service exceptions explicitly recorded under [Review, Testing, Integration, and Completion](review-testing-and-completion.md). A new criterion may remain unverified because of external unavailability for user review; introduced defects still require correction.

The Feature Lead has integrated its child work and produced the required verification evidence and Feature Report.

Completed does not mean merged into the Delivery branch. The Delivery Manager performs that integration and later Delivery-level review and QA.

For a Feature spanning repositories, completion covers the combined acceptance criteria across each affected repository's branch. Tasks remain repository-specific. The Feature branches stay available until their required Delivery integrations succeed. See [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md).

### Abandoned

The unfinished Feature is soft-deleted and excluded from active planning.

Its definition, history, branch work, Decisions, Reports, and relationships remain available.

Only non-Completed Features may be Abandoned.

## Normal transition model

```text
Draft -> Defined
Defined -> Specced
Specced -> Approved
Approved -> Scheduled
Scheduled -> Active
Active <-> Paused
Active -> Completed

Any non-Completed state -> Abandoned
```

## Modification and approval invalidation

An Active Feature must enter Paused before its definition or specification is changed.

### Product definition changes

Changing the desired UI, functionality, behavior, logic, scope, or acceptance criteria invalidates the complete Feature approval chain.

```text
Paused
  -> product definition revised
  -> Feature returns to Draft
  -> user reapproves product definition
  -> technical specification is revised
  -> user reapproves specification
  -> implementation is reconciled
  -> work resumes
```

Existing implementation is inspected for:

- obsolete code;
- invalid assumptions;
- missing changes;
- incompatible Tasks;
- unnecessary artifacts;
- branch conflicts.

### Technical specification changes

Changing implementation architecture, schemas, interfaces, dependencies, or orchestration invalidates only technical approval.

The product definition remains approved.

```text
Paused
  -> technical specification revised
  -> Feature returns to Specced
  -> user reapproves specification
  -> implementation is reconciled
  -> work resumes
```

### Implementation correction within approved scope

A correction that does not alter the approved product definition or technical specification may remain Paused while the Feature Lead revises the implementation plan.

No definition approval is invalidated.

## Completion boundary

A Feature becomes Completed when verification on its integrated Feature branch satisfies the requirements in [Review, Testing, Integration, and Completion](review-testing-and-completion.md), including explicit recording of permitted exceptions.

Completion requires:

- all child Tasks settled;
- child work integrated into the Feature branch;
- required review completed;
- required full test suites executed across changed repositories, with introduced defects corrected and permitted exceptions documented;
- acceptance evidence recorded;
- Feature Report persisted.

The Feature does not wait for Delivery-level integration to become Completed.

Afterward:

```text
Feature Completed
  -> Delivery Manager integrates Feature branch
  -> Delivery-level review and QA run
  -> Delivery eventually becomes Completed
```

## Further changes to Completed Features

A Completed Feature does not reopen.

Any newly desired behavior becomes a new linked Feature with its own definition, specification, approvals, Delivery membership, and acceptance criteria.

The prior Feature remains immutable work history.

## Splitting and combining Features

Splitting one unfinished Feature or combining several unfinished Features creates replacement Feature identities.

The original Features:

- keep their identities and history;
- become Abandoned;
- link to their replacements through `superseded by`.

The replacement Features:

- receive new identities;
- link back to their source Features;
- receive no inherited product or technical approval;
- start from Draft;
- require complete reapproval;
- receive new Delivery planning;
- inherit only implementation that remains valid after reconciliation.

Existing branch work is inventoried and assigned to replacement Features where useful.

## Restoring an Abandoned Feature

An Abandoned Feature may be restored.

Restoration requires:

- validating its definition and specification;
- reviewing whether previous approvals remain applicable;
- inspecting abandoned branch work;
- updating against the current base and Delivery state;
- identifying conflicts and obsolete work;
- creating a new implementation and integration plan;
- obtaining reapproval where definitions or specifications changed.

A previously Active or Scheduled Feature does not immediately resume execution. It remains non-running until reconciliation is complete and its valid state and Delivery relationship are restored.

## Deferred detail

Later topics define exact Feature schemas, Task and worker lifecycle, branch operations, review independence, acceptance evidence format, and persistence synchronization.
