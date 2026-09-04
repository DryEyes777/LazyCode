# Organizational Model

## Primary hierarchy

```text
Human
  -> Project Manager
    -> Delivery Manager
      -> Feature Lead
        -> Implementation Worker
          -> Implementation Worker
            -> ...
```

The Project Guide is a separate read-only user entry point. Explorer, Oracle, Reviewer, and Tester workers attach where specialized work is required. Subagent and leaf describe positions in the worker tree, not roles.

## Worker abstraction

LazyCode organizes accountable workers rather than assuming every responsibility is performed by an AI model. A worker may be an AI agent, human developer, deterministic service, external coding agent, or another compatible execution system.

Replacing one worker type with another should not fundamentally change the project, delivery, feature, task, ownership, reporting, escalation, or verification contracts. Worker-specific capabilities, context delivery, communication, and execution adapters may differ, but organizational semantics remain stable.

LazyCode does not treat assignment to an AI worker as a guarantee of correct execution. The same acceptance and verification obligations apply regardless of worker type.

LazyCode has nine fixed core roles. Projects may configure their instructions, model, context, tools, permissions, and specialization, but one worker always holds one role. The complete catalog and child-role matrix are defined in [Roles and Ownership](roles-and-ownership.md).

## Roles

### Project Guide

Acts as the read-only first point of contact for project questions and incoming requests. It explores and explains project state, locates relevant resources, and opens a separate authorized conversation with a self-contained handoff. It owns no canonical project artifacts and has no children.

### Project Manager

Owns product discovery, canonical project documentation, architectural direction, roadmap state, Epics, project-wide decisions, and knowledge promoted from completed Deliveries. Product Owner is not a separate role: the Project Manager helps the user define the product, records that intent, identifies major product areas, and coordinates their decomposition into product-defined Features. It normally changes project artifacts rather than implementation code.

The Project Manager normally receives request-intake handoffs that require project-changing authority. It refines planning reports with the user and coordinates updates to affected work, Decisions, and project documentation within its permissions.

Several Project Managers may work concurrently in separate branches or worktrees. Each owns its planning scope, and the later merge reconciles changes from earlier Project Manager work.

### Delivery Manager

Owns one user-approved Delivery from start through merge and closure. It starts and coordinates Feature workers, dependencies, Delivery-specific Tasks and subagents, the Delivery branch, integration, Delivery-level verification, review-package preparation, corrective loops after rejection, knowledge propagation, and the final merge into the configured integration branch.

Feature workers incorporate relevant Delivery-branch changes into their Feature branches. The Delivery Manager remains accountable for the intended combined state and for any user-approved conflict-resolution plan across overlapping Deliveries. See [Delivery Planning](delivery-planning.md).

### Feature Lead

Owns execution of one approved Feature contract. It verifies the definition and specification, decomposes work into Tasks, assigns and manages Implementation Workers, commissions independent Reviewers, directs Feature-level test execution, integrates child work into the Feature branch, and proves every acceptance criterion before reporting completion to the Delivery Manager.

The Feature Lead does not implement code. It is accountable for orchestration, integration, verification evidence, and fidelity to the approved Feature. See [Feature Definition](feature-definition.md).

### Implementation Worker

Owns one Task and is the only core role permitted to change implementation code. Implementation Workers may recursively decompose meaningful helper contracts into child Tasks with new Implementation Workers. Delegation stops when further decomposition adds more coordination cost than value.

## Specialized roles

- **Explorer:** investigates repository or dependency questions and returns evidence.
- **Reviewer:** evaluates a completed change against its contract and constraints without inheriting the implementer's reasoning.
- **Tester:** performs tightly scoped, human-like QA in an isolated environment before user verification. Only a Delivery Manager may commission one, and it is always a leaf worker.
- **Oracle:** answers focused architecture, repository, history, decision, or dependency questions from read-only evidence.

## Delegation contract

A Task belongs to a Feature or another Task and is the definable, testable, and verifiable contract between assigning and receiving workers. Each Task has an assigned worker. If that worker subdivides the Task, every new child Task receives a new worker. Task planning is ordinarily between workers, while Feature definition is agreed with the user.

Components describe software building blocks rather than work assignments. A Task may implement or modify a Component; Delegation assigns the Task and its contract. See [Work Hierarchy and Terminology](work-hierarchy-and-terminology.md).

A parent delegates when a component has a meaningful, independently verifiable contract. A child receives its role, task, relevant interfaces and files, constraints, allowed resources, expected result, and escalation route. It does not automatically receive ancestral conversations.

Parents continue against the agreed contract and integrate the returned result. Detailed child reasoning stays at the child level unless it exposes a durable constraint or unresolved risk.

Project Managers, Delivery Managers, and Feature Leads orchestrate but do not write implementation code. Explorers, Oracles, Reviewers, and Testers do not modify implementation. Reviewers and Testers report Findings only.

A worker never selects its own Reviewer or Tester. Its parent commissions verification, evaluates Findings, may consult Oracles, sends valid corrections back to the implementer, and repeats independent verification. This pattern applies recursively at every Task boundary. Only Delivery Managers commission Testers.

## Context reconstruction

A persistent identity can be reconstructed from:

- its role definition;
- current project, delivery, or feature artifacts;
- relevant architecture and decisions;
- repository state and selected source files;
- open work and the latest child reports.

This permits long-lived ownership while allowing model contexts to reset frequently.

Logical worker identity, activation, user-visible states, reconstruction, disposal, and deletion follow [Worker Identity and Lifecycle](worker-identity-and-lifecycle.md). There is no Dormant state; a Waiting or Completed worker may release its active model session without losing identity.

## Information compression

Implementation Workers return Task results to their parents. Feature Leads return Feature outcomes to Delivery Managers. Delivery Managers return Delivery outcomes to Project Managers. Project Managers promote project-level consequences and durable knowledge.

Report routing and persistence are distinct: Feature-associated Reports are stored with the Feature, while Reports without a Feature are stored at Project level, including Delivery-wide summaries. Decisions retain their rationale and supporting evidence independently of transient worker conversations.

## Escalation

The intended path is Oracle, direct parent, successive organizational parents, then human. An escalation must carry a reason, a precise question, blocking status, attempted evidence, and the authority required to resolve it. Runtime policy chooses the next recipient.

Workers may resolve child questions from user-approved artifacts and existing Decisions. New questions without precedent escalate upward to the user. Implementation Workers may choose local implementation details within their approved contract; parent evaluation and independent review remain mandatory.

## Permissions

Capabilities such as filesystem access, shell execution, network use, agent creation, documentation changes, and Git operations must be granted by runtime policy and may be scoped to resources. Planned grants include one action, task, session, delivery, and permanent leases.

The first spike proves only a read-only Explorer tool restriction. General capability leases and permission escalation are deferred.
