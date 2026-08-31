# Work Hierarchy and Terminology

Status: established
Last updated: 2026-08-31

## Purpose

This reference defines LazyCode's work objects, their relationships, and the terminology used to coordinate workers. These are product contracts, not claims that the current delegation spike implements the complete work model.

## Project

The Project is the top-level organizational boundary for a software product. It owns product definitions, roadmap, Epics, Features, Deliveries, research, Decisions, and project-level Reports.

## Request or goal

An informal user request does not automatically become a new work object.

LazyCode guides the user toward identifying what they are describing and checks that the chosen category fits the description. It should not silently classify the request or create an unnecessary intermediate entity.

## Roadmap

The roadmap describes what has been implemented, the current product state, and what remains to be implemented.

It contains:

- **Historical timeline:** implemented work, when it was completed, and references to relevant Epics, Features, and Deliveries.
- **Decided future timeline:** accepted work with an established order, dependencies, and priorities.
- **Unscheduled backlog:** work not yet placed on the timeline, with its definition, dependencies, priorities, and readiness.

Roadmap entries reference canonical work definitions rather than duplicate them. Narrative descriptions may capture implemented or planned product areas where more detailed work objects have not been defined.

A roadmap timeline does not impose a timebox on a Delivery.

## Epic

An Epic represents a major product area or capability requiring separate definition.

It groups related Features and provides product-level context. The user confirms an Epic before its Features are derived.

A Feature may belong to multiple Epics. Each Epic references the same canonical Feature rather than maintaining a copy.

## Feature

A Feature is a self-contained, definable, and acceptance-driven chunk of work, similar to a User Story.

It may represent:

- new functionality;
- a bug fix;
- a migration;
- a dependency upgrade;
- maintenance;
- performance or security improvements;
- an architectural change.

The user collaborates with LazyCode to define the Feature's expected outcome and acceptance criteria. Its approved definition then supports technical implementation planning.

Once scheduled, a Feature belongs to only one Delivery. Work spanning two Deliveries must be split into two separately defined Features. Those Features may remain linked through dependencies or related-work references.

Multiple Epic parents do not duplicate a Feature's identity, definition, or completion state.

## Delivery

A Delivery is a coherent group of implementation-ready Features that are implemented, integrated, tested, and approved together.

It resembles a sprint as a batch of work, but has no timebox. Completion is determined by fulfilling the agreed scope and acceptance criteria, not elapsed time.

Every implementation change to the product, including a quick fix, passes through a Delivery. Project-level research and POCs remain distinct from accepted product implementation.

## Task

A Task is a definable, testable, and verifiable subdivision of a Feature.

- Its parent is a Feature or another Task.
- Each Task has an assigned worker.
- The Task serves as the contract between the assigning and receiving workers.
- If a worker subdivides its Task, each new child Task receives a new worker.
- Routine Task definition occurs between workers rather than requiring user participation.

Tasks remain inspectable by the user. Their detailed persistence and lifecycle mechanics are refined with delegation and worker lifecycle.

## Component

A Component is a software building block described by architecture, such as a service, module, or adapter.

A Task may implement or modify a Component. The Component itself is not a work assignment.

## Delegation

Delegation is the assignment of a Task and its contract to a child worker.

It defines the responsibility being transferred for execution while preserving the assigning worker's coordination obligations.

## Finding

A Finding is an observation supported by evidence, such as:

- a defect;
- a constraint;
- an inconsistency;
- an implementation risk;
- a useful discovery.

A Finding may still require validation. Recording one does not automatically make it an accepted fact or Decision.

## Decision

A Decision is an accepted choice affecting the project or its work.

Decisions must be persisted with enough context to revisit them, including:

- what was chosen;
- why it was chosen;
- alternatives considered;
- relevant constraints and tradeoffs;
- supporting evidence;
- affected scope.

The durable rationale should explain the choice without requiring someone to reconstruct it from a worker conversation.

## Escalation

An Escalation is an unresolved question or authority request routed to someone able to resolve it.

It carries the question, blocking impact, relevant evidence, attempted resolution, and required authority.

Routing and intervention follow [Human Control and Autonomy](human-control-and-autonomy.md).

## Report

A Report is a worker's structured account of progress or results, including evidence, Decisions, deviations, and unresolved issues.

Persistence follows these rules:

- Reports associated with a Feature are stored at the Feature level.
- Reports without an owning Feature are stored at the Project level.
- This includes project research Reports and Delivery-wide completion summaries.
- Other objects may reference those Reports without duplicating them.

Reporting upward does not change where the canonical Report is stored. A Delivery may reference its Feature Reports and a Project-level Delivery summary while retaining its own definition and status artifacts.

## Research and proofs of concept

Research and POCs may remain project-level work when their purpose is to gather information, test feasibility, or inform Decisions.

Their artifacts are stored in `.lazycode/` and tracked through Git. Associated metadata is represented in the project's SQLite database; the exact persistence relationship remains for `PD-21 — Persistence and schemas`.

The user must approve research and POC outcomes before they become accepted project knowledge.

If the resulting work introduces a product change, that implementation is defined as a Feature and assigned to a Delivery.

## Remaining detail

This terminology does not yet settle exact schemas, identifiers, state transitions, ownership-transfer rules, or storage synchronization. Those belong to the later planning topics.

No additional work types are established merely because they exist in other Agile systems.
