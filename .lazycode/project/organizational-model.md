# Organizational Model

## Primary hierarchy

```text
Human
  -> Project Manager
    -> Delivery Manager
      -> Team Lead
        -> Feature Lead
          -> Implementation Agent
            -> Subagent
              -> Leaf Agent
```

The hierarchy describes responsibility and escalation. It is not a requirement that every task instantiate every level.

## Worker abstraction

LazyCode organizes accountable workers rather than assuming every responsibility is performed by an AI model. A worker may be an AI agent, human developer, deterministic service, external coding agent, or another compatible execution system.

Replacing one worker type with another should not fundamentally change the project, delivery, feature, task, ownership, reporting, escalation, or verification contracts. Worker-specific capabilities, context delivery, communication, and execution adapters may differ, but organizational semantics remain stable.

LazyCode does not treat assignment to an AI worker as a guarantee of correct execution. The same acceptance and verification obligations apply regardless of worker type.

## Roles

### Project Manager

Owns product discovery, canonical project documentation, architectural direction, roadmap state, Epics, project-wide decisions, and knowledge promoted from completed Deliveries. Product Owner is not a separate role: the Project Manager helps the user define the product, records that intent, identifies major product areas, and coordinates their decomposition into product-defined Features. It normally changes project artifacts rather than implementation code.

### Delivery Manager

Owns one user-approved Delivery from start through merge and closure. It coordinates implementation-ready Features, dependencies, the Delivery branch, integration, Delivery-level verification, review-package preparation, corrective loops after rejection, documentation reconciliation, and the final merge into the configured integration branch.

### Team Lead

Owns one delivery's execution. It breaks the delivery into features, coordinates Feature Leads, resolves cross-feature dependencies, integrates results, and verifies delivery-level acceptance.

### Feature Lead

Owns one feature contract. It designs interfaces and tests, delegates independently implementable components, implements integration logic against those contracts, and requests independent review and testing.

### Implementation and Leaf Agents

Implementation agents recursively decompose meaningful helper contracts. Delegation stops when further decomposition would add coordination cost without creating a useful independent boundary; that work becomes a leaf task.

## Specialized roles

- **Explorer:** investigates repository or dependency questions and returns evidence.
- **Reviewer:** evaluates a completed change against its contract and constraints without inheriting the implementer's reasoning.
- **Tester:** independently verifies acceptance criteria and reports actionable failures.
- **Oracle:** answers focused architecture, repository, history, decision, or dependency questions from read-only evidence.

## Delegation contract

A Task belongs to a Feature or another Task and is the definable, testable, and verifiable contract between assigning and receiving workers. Each Task has an assigned worker. If that worker subdivides the Task, every new child Task receives a new worker. Task planning is ordinarily between workers, while Feature definition is agreed with the user.

Components describe software building blocks rather than work assignments. A Task may implement or modify a Component; Delegation assigns the Task and its contract. See [Work Hierarchy and Terminology](work-hierarchy-and-terminology.md).

A parent delegates when a component has a meaningful, independently verifiable contract. A child receives its role, task, relevant interfaces and files, constraints, allowed resources, expected result, and escalation route. It does not automatically receive ancestral conversations.

Parents continue against the agreed contract and integrate the returned result. Detailed child reasoning stays at the child level unless it exposes a durable constraint or unresolved risk.

## Context reconstruction

A persistent identity can be reconstructed from:

- its role definition;
- current project, delivery, or feature artifacts;
- relevant architecture and decisions;
- repository state and selected source files;
- open work and the latest child reports.

This permits long-lived ownership while allowing model contexts to reset frequently.

## Information compression

Workers return implementation facts to Feature Leads. Feature Leads return feature-level outcomes to Team Leads. Team Leads return delivery outcomes to Delivery Managers. Project Managers promote only project-level consequences and durable knowledge.

Report routing and persistence are distinct: Feature-associated Reports are stored with the Feature, while Reports without a Feature are stored at Project level, including Delivery-wide summaries. Decisions retain their rationale and supporting evidence independently of transient worker conversations.

## Escalation

The intended path is Oracle, direct parent, successive organizational parents, then human. An escalation must carry a reason, a precise question, blocking status, attempted evidence, and the authority required to resolve it. Runtime policy chooses the next recipient.

## Permissions

Capabilities such as filesystem access, shell execution, network use, agent creation, documentation changes, and Git operations must be granted by runtime policy and may be scoped to resources. Planned grants include one action, task, session, delivery, and permanent leases.

The first spike proves only a read-only Explorer tool restriction. General capability leases and permission escalation are deferred.
