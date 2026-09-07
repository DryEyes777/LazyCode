# Roles and Ownership

Status: established
Last updated: 2026-09-04

## Purpose

This reference defines LazyCode's fixed role catalog, ownership hierarchy, delegation constraints, decision authority, verification independence, completion conditions, and ownership transfer. These are intended product contracts, not a claim that the current spike implements the complete organization.

## Core rules

LazyCode has nine fixed core roles:

```text
Project Guide
Project Manager
Delivery Manager
Feature Lead
Implementation Worker
Explorer
Oracle
Reviewer
Tester
```

Projects may configure each role's instructions, model policy, context policy, permissions, tools, and specialization, but the role's ownership semantics remain stable.

Parents select models from approved role configurations under [Models and Provider Routing](models-and-provider-routing.md). Reviewers normally match the implementer's model; expensive implementation configurations may use a lower-cost approved review configuration. Model changes do not change role or authority.

A worker may hold exactly one role.

The following terms are not roles:

- **Subagent:** any worker created by another worker.
- **Leaf:** a worker that has no children.
- **Product Owner / Project Owner:** responsibilities included in Project Manager.
- **Team Lead:** removed; its responsibilities belong to Feature Lead.

## Ownership hierarchy

```text
Human
├── Project Manager
│   └── Delivery Manager
│       └── Feature Lead
│           └── Implementation Worker
│               └── Implementation Worker
│                   └── ...
└── Project Guide
```

Explorer, Oracle, Reviewer, and Tester workers attach to the hierarchy when specialized work is required.

## Logical ownership and active conversations

Every Delivery has a Delivery Manager, and every Active Feature has a Feature Lead.

These are persistent logical ownership requirements, not requirements to keep model conversations continuously active.

A manager enters Waiting while children work and no useful independent work remains. Its active model session may be released without changing the logical worker state. A child completion, escalation, alert, or coordination request returns that same logical identity to Active through an existing or reconstructed activation.

## Multiple Project Managers

A Project may have several Project Managers concurrently.

For example, two users defining separate Features receive separate Project Managers.

Each Project Manager works in an isolated branch or worktree, uses shared approved project state as its baseline, and records changes independently. The branch isolates modifications but does not reduce the Project Manager's role or documentation authority.

The Project Manager whose work merges later must reconcile changes introduced by earlier merges before its own work can be accepted.

## Delegation matrix

| Parent role | Allowed child roles |
| --- | --- |
| Project Guide | None; may open a separate authorized conversation |
| Project Manager | Delivery Manager, Explorer, Oracle |
| Delivery Manager | Feature Lead, Implementation Worker, Explorer, Oracle, Reviewer, Tester |
| Feature Lead | Implementation Worker, Explorer, Oracle, Reviewer |
| Implementation Worker | Implementation Worker, Explorer, Oracle, Reviewer |
| Explorer | Explorer, Oracle |
| Oracle | Oracle, Explorer |
| Reviewer | Reviewer, Explorer, Oracle |
| Tester | None |

A Tester may only be commissioned by a Delivery Manager.

## Implementation authority

Project Managers, Delivery Managers, and Feature Leads are prohibited from writing implementation code.

Implementation Workers are the only core role that changes implementation code.

Management roles may modify the artifacts they own, coordinate branches, integrate child work, run orchestration, and make in-scope planning decisions.

Explorer, Oracle, Reviewer, and Tester roles do not modify implementation code.

## Recursive verification

A worker never selects the Reviewer or Tester evaluating its own work.

Verification is commissioned by the worker's parent:

```text
Parent assigns work
  -> child implements
  -> child reports completion
  -> parent commissions independent review
  -> parent evaluates findings
  -> valid findings return to implementer
  -> implementation and review repeat
  -> parent accepts child result
```

This principle is recursive.

If an Implementation Worker delegates to a child Implementation Worker, the parent Implementation Worker commissions review of that child's work.

The Feature Lead commissions review of direct Implementation Workers. The Delivery Manager commissions review at the Feature or Delivery boundary and tightly scoped QA at the Delivery boundary.

## Finding evaluation

Reviewers and Testers report findings only. They never repair the work they evaluate.

The commissioning parent:

1. Receives the findings.
2. Evaluates whether they are valid.
3. May consult Oracles for clarification.
4. Converts valid findings into actionable corrections; findings after parent integration require new corrective Tasks.
5. Returns corrections before integration to the same Task and logical implementer, reconstructing its activation if necessary.
6. Requires new test evidence after changes and asks the same logical Reviewer to check the corrections, supplying previous Finding dispositions and reasons for rejected Findings.

A Finding does not alter accepted project state until its responsible parent evaluates and incorporates it.

Commit-specific evidence and follow-up review rules are defined in [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md). Rejected Findings are not raised again without new evidence; a full new review is not automatically required for corrections.

## Decision authority

Workers resolve questions using user-approved artifacts and existing Decisions.

When no approved precedent supports an answer, the question escalates upward and ultimately reaches the user.

### Project Manager

May make planning and documentation choices supported by approved product direction and project Decisions.

New product or project-wide choices require user approval.

### Delivery Manager

May decide scheduling, Task assignment, integration order, branch coordination, and verification execution inside the approved Delivery.

It cannot change approved Feature outcomes or create new project precedent without escalation.

### Feature Lead

May decide Task decomposition, worker assignment, review orchestration, and Feature-branch integration inside the approved Feature specification.

It cannot alter approved product behavior or technical specification without triggering the Feature's change and reapproval process.

### Implementation Worker

May decide implementation details that fit its Task, Feature specification, architecture, and project constraints.

Those choices remain subject to parent evaluation and independent review.

### Specialized roles

Project Guides, Explorers, Oracles, Reviewers, and Testers provide guidance, evidence, answers, Findings, or verification. They do not create accepted project Decisions.

## Project Guide

**Purpose:** Provide a read-only first point of contact for the project.

**Owns:** Its conversation and handoff result; no canonical project artifacts.

**Inputs:** User question and readable project state.

**Outputs:** High-level answer or self-contained handoff into a new authorized conversation.

**Capabilities:** Read, search, explain, locate relevant resources, and start a handoff.

**Children:** None.

**Completion:** The user receives an answer or reaches the appropriate agent.

## Project Manager

**Purpose:** Translate user intent into approved project planning and durable project knowledge.

**Owns:** Its branch-scoped project definitions, roadmap changes, Epics, Feature definitions and specifications, planning Reports, and proposed Decisions.

**Parent:** Human.

**Children:** Delivery Managers, Explorers, and Oracles.

**Outputs:** Approved planning artifacts, Delivery handoffs, and reconciled project documentation.

**Completion:** Its assigned planning or documentation scope is accepted, handed off, merged, abandoned, or transferred. The Project may continue under other Project Managers.

## Delivery Manager

**Purpose:** Orchestrate one Delivery from approved start through merge or abandonment.

**Owns:** Delivery definition, Delivery branch, dependency and integration plan, Delivery workers, candidate review package, and knowledge promotion.

**Parent:** Project Manager.

**Children:** Feature Leads, Delivery-level Implementation Workers, Explorers, Oracles, Reviewers, and Testers.

**Outputs:** Integrated Delivery branch, verification evidence, Project-level Delivery Report, and merge-ready candidate.

**Completion:** Delivery reaches Merged or Abandoned.

## Feature Lead

**Purpose:** Orchestrate one approved Feature without implementing it directly.

**Owns:** Feature execution plan, Task tree, Feature branch, child integration, review cycle, acceptance evidence, and Feature Report.

**Parent:** Delivery Manager.

**Children:** Implementation Workers, Explorers, Oracles, and Reviewers.

**Outputs:** Completed Feature branch with acceptance evidence and any permitted pre-existing or transient external-service exceptions explicit for user review under [Review, Testing, Integration, and Completion](review-testing-and-completion.md).

**Completion:** Feature reaches Completed or Abandoned, or ownership is transferred.

## Implementation Worker

**Purpose:** Implement one Task contract.

**Owns:** Task plan, implementation branch or worktree, child Tasks, implementation changes, local tests, checkpoint state, and Task Report.

**Parent:** Feature Lead, Delivery Manager, or another Implementation Worker.

**Children:** Implementation Workers, Explorers, Oracles, and Reviewers.

**Outputs:** Verifiable implementation result, evidence, Findings, deviations, and unresolved issues.

**Completion:** Parent accepts the Task result, the Task is abandoned, or ownership is transferred.

## Explorer

**Purpose:** Investigate one bounded code, documentation, dependency, feasibility, or integration question.

**Owns:** Investigation plan and evidence Report.

**Parent:** Any role permitted to commission it.

**Children:** Narrower Explorers or Oracles when workload requires decomposition.

**Outputs:** Evidence-backed Findings and uncertainties.

**Completion:** The bounded question is answered or explicitly unresolved.

## Oracle

**Purpose:** Answer a focused knowledge question using authoritative project or external evidence.

**Owns:** Its answer and supporting evidence.

**Parent:** Any role permitted to commission it.

**Children:** Narrower Oracles or Explorers when necessary.

**Outputs:** Answer, evidence, confidence or uncertainty, and relevant Decisions.

**Completion:** The question is answered or escalated as unresolved.

## Reviewer

**Purpose:** Independently assess completed work against its contract and constraints.

**Owns:** Review plan, review scope, Findings, and review Report.

**Parent:** The parent of the worker whose result is being reviewed.

**Context:** Contract Reviewers receive Task requirements and relevant guidance/code/evidence without the implementer's conversation. Architecture, code-quality, and safety Reviewers receive their own guidance and relevant code context without automatically receiving the Task narrative. Parents select specializations in the verification plan.

**Children:** Narrower Reviewers, Explorers, or Oracles.

**Capabilities:** Read and analyze work, run appropriate non-mutating checks, and report Findings.

**Restrictions:** Cannot repair implementation or create accepted Decisions.

**Completion:** Findings and evidence are delivered to the commissioning parent.

## Tester

**Purpose:** Perform tightly scoped, human-like QA before user verification.

**Owns:** Isolated QA environment, test scope, execution evidence, and QA Report.

**Parent:** Delivery Manager only.

**Children:** None.

**Capabilities:** Interact with the test application through its isolated environment, including browser-based workflows and other approved QA tools.

**Restrictions:** Cannot modify implementation. Scope must be made as small and explicit as practical before execution.

**Completion:** QA evidence and Findings are delivered to the Delivery Manager, and the isolated environment is cleaned up.

## Ownership transfer

The direct parent authorizes replacement or ownership transfer.

Replacement preserves the same logical worker ID and role. A new activation receives:

- ownership contract or Task;
- branch and worktree when applicable;
- permissions and resource scope;
- approved definitions and Decisions;
- plan and progress;
- checkpoint and recovery state;
- child relationships;
- unresolved Findings and escalations.

The replacement activation tours transferred state before continuing.

## Deferred detail

Logical identity, activation, reconstruction, visible states, disposal, and deletion are established in [Worker Identity and Lifecycle](worker-identity-and-lifecycle.md). Delegation planning, child Task contracts, verification proxies, scope coordination, and bottom-up integration are established in [Delegation and Task Contracts](delegation-and-task-contracts.md). The distinction between permissions and grant authority, grant lifetimes, and permission appeals is established in [Permissions and Escalation](permissions-and-escalation.md); the detailed capability matrix remains technical planning work. Verification and acceptance policy is established in [Review, Testing, Integration, and Completion](review-testing-and-completion.md); physical evidence schemas and environment implementation remain technical planning work.
