# Request Intake and Project Planning

Status: established
Last updated: 2026-08-31

## Purpose

This document defines how a user's request becomes an agreed project plan: read-only exploration, handoff to an authorized agent, investigation, report refinement, decision reconciliation, and retention of unfinished planning. It is an intended product contract, not a claim that the current spike implements these workflows.

## First point of contact

A project-facing exploration agent helps the user understand the project and find the appropriate resource for continuing their work.

It explores code and documentation, provides a high-level view, and guides the user toward the relevant Epic, Feature, Decision, Delivery, or authorized planning agent.

This is the default entry point for exploration and new requests; it does not replace the ability to enter existing worker conversations directly.

## Read-only exploration

The exploration agent is read-only toward project state.

It cannot:

- create or modify Epics or Features;
- edit project documentation;
- persist planning changes;
- change relationships between work items;
- pause or modify Deliveries.

It can investigate, explain, identify relevant resources, and prepare a handoff. Project-changing actions belong to an appropriately authorized agent, normally the Project Manager.

## Conversation handoff

When the appropriate resource is identified, LazyCode starts a new conversation with the responsible agent.

The first message contains a self-contained handoff:

- what the user is asking for;
- relevant findings and evidence;
- applicable existing Decisions;
- related Epics and Features;
- potentially affected Deliveries;
- unresolved questions;
- useful document and source references.

The receiving agent processes that message before continuing refinement with the user.

The handoff transfers relevant knowledge rather than copying the entire previous conversation. Starting the receiving conversation is a runtime handoff operation, not authority for the exploration agent to modify project artifacts.

## Classifying and investigating the request

The user identifies the kind of work they are describing. LazyCode guides that choice and checks that the description fits, without silently creating an intermediate request object.

The responsible agent investigates:

- which Epic or Epics the work belongs to;
- whether a new Epic is appropriate;
- whether similar or matching Features exist;
- whether related Features should be linked;
- whether active Deliveries or their dependencies are affected;
- which existing Decisions constrain the proposed work.

Decisions are consulted as questions arise during drafting. The completed proposal is also checked for conflicts with established Decisions.

Affected active work may need to pause until it is safe to continue. Unrelated work remains active under [Human Control and Autonomy](human-control-and-autonomy.md). The read-only exploration agent may identify the impact, but any intervention belongs to an authorized agent.

## Planning report

The authorized planning agent produces a persisted report describing:

- what the user wants;
- the current state;
- the desired state;
- required behavioral changes;
- anticipated changes to logic, schemas, and architecture;
- related work and dependencies;
- affected active work;
- relevant Decisions, alternatives, and tradeoffs;
- unresolved questions.

The report should match the level of the project documentation. It describes the change and its implications but does not contain implementation code or bypass later technical Feature planning.

The user can edit and annotate the report and refine it with the agent until it accurately represents their intent.

Report storage follows [Work Hierarchy and Terminology](work-hierarchy-and-terminology.md): Feature-associated reports belong at Feature level; reports without an owning Feature belong at Project level.

## Conflicts with existing Decisions

When proposed work conflicts with a previous Decision, the proposal or the Decision must be revised.

Revising a Decision requires checking its consequences:

- Does the revised Decision still fit the implemented product?
- Which logic, schemas, interfaces, or documented assumptions depend on the earlier Decision?
- What additional changes are necessary to make the product consistent?

If existing behavior no longer fits, the affected work must be included in the revised plan rather than leaving the contradiction unresolved.

The Decision and its rationale remain durable so the change can be revisited later.

## Matching existing work

When a request appears to match an implemented or active Feature, LazyCode guides the user to that Feature's definition.

The user checks whether it describes the intended outcome.

- If it already fits, there is no reason to create duplicate work.
- If it differs, the user and authorized agent refine the existing Feature or define a new, related Feature.
- If active implementation is affected, its dependencies and assumptions are reconciled before affected work continues.

Any resulting implementation still follows the established Feature readiness and Delivery approval gates.

## Accepted planning and scheduling

Confirmed planning updates the affected project, Epic, Feature, Decision, and roadmap artifacts through the authorized agent.

Accepting a plan does not automatically schedule or start implementation. Accepted work may remain in the unscheduled backlog.

A Feature must still receive its approved product definition and sufficient technical planning before it can enter a Delivery. Delivery composition and execution require their existing user approvals, as defined in [Primary End-to-End Workflow](primary-workflow.md).

## Postponed or rejected planning

Postponing or rejecting an idea does not automatically discard the work already done.

Draft reports and related progress remain persisted on a branch so the user can revisit them. Rejected or deferred drafts are not treated as accepted project direction.

They remain available until the user explicitly requests deletion or a separately defined cleanup process removes them. Cleanup timing and safeguards remain for the Git and persistence topics; this contract does not set a retention deadline or authorize automatic cleanup.

## Deferred detail

Later topics will define:

- exact handoff message and report schemas;
- the exploration agent's formal role name;
- detailed planning-agent permissions;
- Feature readiness checks;
- approval and merge mechanics for planning artifacts;
- draft-branch retention and cleanup;
- reconciliation of active work after scope or Decision changes.
