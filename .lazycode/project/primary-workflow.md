# Primary End-to-End Workflow

Status: established
Last updated: 2026-08-31

## Purpose

This document defines the primary user journey from creating a LazyCode project through approving and merging a completed Delivery. It describes the product experience and durable workflow boundaries; lower-level scheduling, schema, permission, Git, and recovery mechanics are refined separately.

## Canonical terminology

- **Project Manager** includes the product-owner responsibilities. Product Owner is not a separate role.
- **Epic** represents a major product area that requires separate refinement before it can be decomposed into Features.
- **Feature** is a self-contained work unit defined first as a user-story-like contract, then given a technical implementation plan. It includes fixes and maintenance, not only new functionality.
- **Delivery** groups implementation-ready Features that can be implemented, integrated, and tested together without a timebox. Release is not a separate LazyCode concept.

Relationships and supporting terms are defined in [Work Hierarchy and Terminology](work-hierarchy-and-terminology.md).

## 1. Create the project

The user creates a project in LazyCode and links it to a repository.

Repository creation assistance may be added later. The initial workflow may require the repository to already exist.

LazyCode creates or discovers the project-specific memory structure in the linked repository. Project-specific definitions and operating knowledge remain versioned with that product.

Initialization, mature-product reconciliation, relocation, archive, removal, and portability are established in [Project Lifecycle](project-lifecycle.md).

## 2. Define the product

The user begins a conversation with the Project Manager and explains the product idea.

The Project Manager:

- asks product-level questions;
- performs surface-level feasibility research;
- identifies unclear assumptions and constraints;
- avoids premature implementation details;
- writes the evolving product understanding into project artifacts.

Initial artifacts include:

- project definition;
- vision;
- goals;
- constraints;
- feasibility findings;
- initial roadmap;
- other project-level documentation required to preserve intent.

The user reviews and corrects these artifacts until they accurately represent the product in the user's mind. Agent-written product artifacts remain drafts until the user confirms them.

## 3. Identify and define Epics

The Project Manager identifies major product areas as Epics.

Each Epic is refined separately with the user and appropriate supporting workers. Epic definition remains product-oriented and should not prematurely prescribe implementation.

Every Epic must be individually confirmed by the user before LazyCode derives Features from it.

## 4. Define Features

Approved Epics are decomposed into Features.

A Feature may have multiple Epic parents; each references the same canonical definition and completion state.

A Feature's initial definition resembles a User Story and describes:

- intended user or system outcome;
- expected behavior;
- requirements;
- acceptance criteria;
- scope;
- non-goals;
- relevant product constraints.

The user reviews and confirms the Feature's product behavior before technical implementation planning begins.

## 5. Plan Feature implementation

After the product contract is confirmed, the developer and technical workers define:

- architecture;
- data-model changes;
- interfaces;
- system behavior and logic;
- dependencies;
- implementation order;
- permissions;
- review requirements;
- testing and verification approach.

Once the product and technical definitions are sufficiently complete, the Feature becomes implementation-ready.

Exact Feature readiness rules are refined in `PD-10 — Feature definition`.

## 6. Define a Delivery

A Delivery groups implementation-ready Features that can be integrated and tested coherently.

A scheduled Feature belongs to only one Delivery. Work that must span Deliveries is split into separate, linked Features.

Delivery composition may begin through system assistance:

```text
User requests Delivery recommendation
  -> LazyCode analyzes ready Features and dependencies
  -> LazyCode proposes a grouping and sequence
  -> user refines and approves
```

Or the user may directly select Features:

```text
User selects Features
  -> LazyCode validates dependencies and compatibility
  -> LazyCode proposes required adjustments
  -> user refines and approves
```

The user explicitly approves the Delivery definition and starts its execution.

## 7. Implement the Delivery

The Delivery Manager coordinates implementation on a Delivery branch.

Features may execute in parallel or dependency order. The user does not need to review every Feature individually; the Delivery exists to group changes that can be integrated and verified together.

For every Feature:

```text
Feature implementation
  -> internal review
  -> Feature testing
  -> integration into Delivery branch
```

A Feature is not complete until its implementation, review, tests, and integration obligations pass.

## 8. Propagate discoveries

New technical decisions and implementation discoveries are recorded at the lowest affected level first:

```text
Feature documentation
  -> Delivery documentation, when Delivery behavior is affected
  -> Project documentation, when project-wide behavior is affected
```

Promotion may happen during implementation. Before presenting the Delivery candidate, the Delivery Manager performs a final reconciliation so higher-level documentation reflects every consequence relevant to its scope.

Detailed evidence remains at the Feature level while higher levels receive the decisions and effects they need.

Decisions retain their rationale. Feature-associated Reports persist with the Feature; Reports without an owning Feature, including Delivery-wide summaries, persist at Project level and are referenced from the relevant Delivery.

## 9. Verify the Delivery

A Delivery cannot become a candidate until every included Feature is complete.

LazyCode then runs Delivery-level integration and acceptance testing across the complete Delivery branch. The user reviews the Delivery as a coherent whole rather than reviewing isolated Features.

## 10. Present the Delivery candidate

LazyCode presents a review package containing:

- what was implemented;
- how it was implemented;
- important product and technical choices;
- deviations from approved Feature definitions;
- completed review and test results;
- known limitations and unresolved risks;
- exact instructions for checking out and testing the Delivery branch.

All Delivery changes must be available together on one branch so the user can test the combined result.

The established candidate-review workspace is defined in [Interaction Surface — Delivery candidate review](interaction-surface.md#delivery-candidate-review).

## 11. Handle rejection

If the user rejects the Delivery, the user describes what is wrong and the required outcome.

LazyCode converts that feedback into actionable corrective work:

```text
User feedback
  -> affected Feature or Delivery definitions updated
  -> corrective implementation assigned
  -> review and tests rerun
  -> Delivery candidate rebuilt
  -> user receives revised review package
```

The Delivery remains active throughout this loop. Rejection does not discard completed work or create an unrelated Delivery.

## 12. Approve and merge

User approval authorizes LazyCode to merge the Delivery branch into the repository's configured integration branch, such as `main` or `dev`.

After the merge:

- post-merge checks run;
- the Delivery is marked complete;
- included Features are marked complete;
- affected Epics record which Features are complete;
- the roadmap reflects implemented product areas;
- Delivery-level knowledge is promoted into project documentation where necessary;
- the user receives a final completion report.

A Delivery is not complete merely because implementation has stopped. It must be fully verified, approved, merged, reconciled with project memory, and closed.

## Ongoing requests and planning

The default entry point for exploring an existing project or bringing a new request is a project-facing read-only exploration agent. It guides the user toward the appropriate resource and hands off relevant context as the first message of a new conversation with an authorized agent. Direct access to existing worker conversations remains available.

The receiving agent investigates related Epics, Features, Decisions, and active Deliveries and refines a planning report with the user. Approved planning does not itself schedule or start implementation. Matching work, Decision conflicts, and postponed or rejected drafts follow [Request Intake and Project Planning](request-intake-and-project-planning.md).

The initial new-product Project Manager workflow above and the existing Feature and Delivery approval gates remain unchanged.

## Quick-fix path

A quick fix uses a lighter planning process but does not bypass the Delivery boundary.

LazyCode first identifies:

- the reported problem;
- expected corrected behavior;
- affected code;
- affected Feature, Epic, Delivery, or project documentation;
- required tests and verification.

The fix may be inserted into an appropriate active Delivery or placed in a dedicated small Delivery.

After implementation, the same review, testing, approval, merge, and knowledge-propagation rules apply.

## Human approval gates

The user participates at these boundaries:

1. Confirm the initial project definition.
2. Confirm each Epic.
3. Confirm each Feature's product behavior.
4. Participate in technical Feature planning as the responsible developer.
5. Approve the Delivery composition.
6. Explicitly start the Delivery.
7. Verify the Delivery branch.
8. Approve or reject the Delivery candidate.
9. Authorize merge through final approval.

Detailed autonomy and approval mechanics are established in [Human Control and Autonomy](human-control-and-autonomy.md).

## Deferred mechanics

This workflow establishes the product experience while deferring:

- exact artifact schemas;
- Feature and Delivery readiness checks;
- worker scheduling and retry policy;
- worktree and branching implementation;
- independent review and testing contracts;
- failure recovery after process interruption;
- permission and escalation policy;
- quantitative quality gates.
