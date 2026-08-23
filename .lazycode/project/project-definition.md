# LazyCode Project Definition

Status: draft for refinement
Last updated: 2026-08-23

## Project name

**LazyCode** is the working name.

## Definition

LazyCode is an experimental software-development agent system designed to behave like a structured engineering organization rather than a single, indefinitely growing AI conversation.

The system organizes agents around explicit roles, responsibilities, scopes, permissions, and deliverables. It decomposes project work into bounded tasks, gives each agent purpose-built context and capabilities, and records durable knowledge in project artifacts rather than relying on conversation history.

LazyCode is initially implemented as an extension layer for DeepSeek Harness. DeepSeek Harness provides the underlying agent runtime; LazyCode provides the organizational system.

## Problem

Most coding-agent workflows center on one general-purpose conversation that gathers requirements, explores the repository, plans, edits code, tests, and reviews the result. As the work grows:

- context accumulates continuously;
- planning, implementation, authority, and verification become mixed together;
- responsibility and ownership become ambiguous;
- important knowledge remains trapped in conversation history;
- verification inherits the implementer's assumptions;
- architectural intent becomes harder to preserve.

LazyCode explores whether software-development agents can work more reliably when responsibility is separated, delegation uses explicit contracts, authority is enforced by software, and project state remains durable and inspectable.

## Core hypothesis

A multi-agent development system becomes more scalable and reliable when its organizational structure exists in software rather than only in prompts.

The central abstraction is:

> Agent = Role + Scope + Context Policy + Capabilities + Parent/Children + Owned Resources + Escalation Policy + Model Policy

An agent therefore represents a reconstructable responsibility, not merely a persistent conversation with a model.

## Intended user experience

A human should eventually be able to give LazyCode project-level intent, such as “add subscription billing to this application,” and have the system:

1. Interpret the request against current project state.
2. Identify unresolved product or architectural questions.
3. Update the project plan.
4. Group the work into a coherent delivery.
5. Decompose the delivery into features and contracts.
6. Delegate bounded implementation work.
7. Coordinate dependencies and integrate results.
8. Request independent review and testing.
9. Escalate decisions that require greater authority.
10. Promote durable discoveries into project documentation.
11. Return a concise, evidence-backed completion report.

The human should not need to manage every individual agent or preserve the project history in one conversation.

## Product boundary

The organizational system is the product. DeepSeek Harness is the initial execution substrate.

DeepSeek Harness currently supplies:

- agent loops and model adapters;
- tool registration and guarded execution;
- sessions and child-agent lineage;
- subagent startup, cancellation, results, and disposal;
- sandbox, approval, and persistence seams;
- Cordis profile and plugin composition.

LazyCode owns or intends to own:

- organizational roles and responsibilities;
- project, delivery, feature, and task contracts;
- ownership and parent/child relationships;
- context selection and reconstruction;
- delegation and information-compression policy;
- runtime capability and permission policy;
- escalation routing;
- independent verification workflows;
- durable `.lazycode/` project artifacts.

The detailed boundary and current runtime flow are defined in [Architecture](architecture.md). The decision to begin with native Harness plugins is recorded in [ADR-0001](decisions/ADR-0001-native-dsh-plugin.md).

## Organizational model

The proposed primary hierarchy is:

```text
Human
  -> Project Manager
    -> Delivery Manager
      -> Team Lead
        -> Feature Lead
          -> Implementation Agents
            -> Subagents
              -> Leaf Agents
```

Explorer, Oracle, Reviewer, and Tester roles operate alongside the management hierarchy. The hierarchy describes ownership and escalation; it does not require every task to instantiate every level.

Role responsibilities and delegation behavior are defined in the [Organizational Model](organizational-model.md). Their runtime contracts remain proposals except for the current Project Manager and Explorer slice.

## Work and delegation model

Delegation should occur at meaningful, independently verifiable software boundaries. A delegated task should state:

- the role and objective;
- relevant project and source context;
- owned resources and repository scope;
- constraints and permitted capabilities;
- expected output and acceptance criteria;
- the escalation route.

Children should not automatically inherit ancestral conversations. Parents should reason against child contracts and returned results rather than absorb every implementation detail.

## Context and persistent identity

Model context is a constructed input, not organizational memory.

For each invocation, LazyCode should eventually assemble context from the agent's role, task, ownership, architecture, relevant decisions, delivery or feature state, selected source files, failing tests, recent child reports, and unresolved escalations.

A responsibility may persist for weeks while its model context is rebuilt for each invocation. This separates:

- **identity:** who is responsible;
- **state:** what currently exists;
- **context:** what the model needs now;
- **conversation:** one temporary execution trace.

## Durable project memory

The repository is the canonical organizational memory. `.lazycode/` stores project, delivery, feature, decision, research, contract, acceptance, and status artifacts.

DeepSeek Harness sessions are useful execution evidence, but they are not the source of project truth. Durable discoveries should be promoted into the smallest appropriate project artifact.

Detailed artifact ownership and writing rules are defined in [Project Conventions](conventions.md).

## Information compression

Detailed information should become progressively more concise as it moves upward:

```text
Implementation Agent -> implementation result
Feature Lead         -> feature outcome
Team Lead            -> integration and delivery status
Delivery Manager     -> delivery outcome
Project Manager      -> durable project impact
```

The detailed evidence should remain available for inspection without being copied into every parent context.

## Permissions and authority

Agent authority should be enforced by runtime software rather than prompt text alone. Capabilities may include filesystem access, shell and test execution, network access, package installation, Git operations, documentation changes, agent creation, and human messaging.

Capabilities should be restrictable to resources and may eventually be granted for one action, task, session, delivery, or permanently. The complete lease and permission model has not yet been designed.

## Escalation

Agents should explicitly escalate questions they cannot safely resolve. The proposed route is the relevant Oracle, direct parent, successive organizational parents, then the human.

An escalation should carry the reason, precise question, blocking status, evidence already examined, alternatives considered, and authority required. Runtime policy—not model improvisation—should select the next recipient.

## Independent verification

Implementation, review, and testing should be separate responsibilities. Reviewers and Testers should receive fresh context based on contracts, repository state, diffs, tests, and acceptance criteria rather than inherit the implementer's confidence or private reasoning.

Verification results should be structured and durable enough to support integration decisions.

## Model policy

Organizational contracts should not depend on one model. Different roles may eventually use different models or providers according to reasoning quality, coding ability, retrieval needs, cost, and independence from the implementer.

The initial implementation is model-independent only within the adapter seams provided by DeepSeek Harness.

## Current implementation

The current software proves one narrow vertical slice:

```text
Human -> Project Manager -> read-only Explorer -> structured evidence report
```

The Project Manager can call `delegate_exploration` with a question and repository-relative scope. LazyCode creates a fresh Explorer that:

- does not inherit the parent conversation;
- receives a standalone task and Explorer persona;
- may use only `read`, `glob`, and `grep`;
- cannot delegate further;
- must return a structured report containing a summary, evidence, and uncertainties;
- is disposed after success or failure.

The bundle, tool contract, failure behavior, documentation links, and package composition have automated tests. A live DeepSeek model-to-model delegation has not yet been run because no API key was available during D001 verification.

## Current limitations

LazyCode does not yet provide:

- a general orchestration engine;
- durable agent identities or lifecycle state machines;
- automatic context construction;
- delivery scheduling or feature decomposition;
- implementation, review, or tester workflows;
- resource-scoped permission leases;
- escalation routing;
- document indexing or automatic artifact updates;
- multi-model role assignment;
- human messaging connectors;
- an organizational user interface.

The root Project Manager retains the ordinary DeepSeek Harness tools and generic subagent tools, so the LazyCode workflow is available but not mandatory. Explorer scope paths are validated and included in its contract, but DSH's read/search tools remain workspace-wide; path-level read authority is not yet enforced.

## Initial non-goals

The first phase should not:

- build the complete hierarchy in one step;
- fork and maintain DeepSeek Harness;
- introduce a distributed control plane before its contracts are proven;
- treat prompts as the only permission boundary;
- persist every conversation indefinitely;
- automate organizational decisions before their semantics are understood;
- add a large user interface before the core workflow is validated.

## Definition of success

LazyCode will be successful if it can complete substantial software-development work while:

- keeping individual agent contexts bounded;
- preserving architectural intent across long-running work;
- making ownership and authority explicit;
- decomposing work at useful software boundaries;
- allowing responsibilities to be reconstructed or transferred;
- verifying results independently;
- escalating unresolved decisions predictably;
- maintaining clear, durable project state;
- avoiding dependence on one model provider;
- producing outcomes a human can understand and audit.

## Current status

The project currently has:

- a defined product hypothesis;
- a proposed organizational model;
- a documented runtime and product boundary;
- a `.lazycode/` artifact convention;
- one accepted architecture decision;
- one implemented delegation feature;
- a native DeepSeek Harness bundle;
- automated tests, type checking, build verification, and profile-composition verification.

The next activity is to refine this definition before designing the first complete organizational workflow. Planned delivery sequencing remains provisional in the [Roadmap](roadmap.md).

## Decision state

### Established for the current version

- LazyCode is the working name.
- The repository and `.lazycode/` artifacts are durable project memory.
- DeepSeek Harness is the v1 execution substrate.
- LazyCode is an out-of-tree bundle, not a Harness fork.
- Context should be assembled rather than inherited wholesale.
- Runtime policy must ultimately enforce authority.
- The system will be developed through narrow, verified vertical slices.

### Proposed and subject to refinement

- the full management hierarchy;
- exact role boundaries and lifecycle;
- delivery and feature semantics;
- artifact and state schemas;
- delegation stopping rules;
- permission leases and escalation routing;
- model selection by role;
- automatic knowledge promotion;
- human interaction and oversight workflows.
