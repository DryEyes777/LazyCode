# LazyCode Project Definition

Status: product definition established; implementation planning pending
Last updated: 2026-09-10

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

## Target user and operating context

LazyCode primarily serves technically capable solo developers and developer/analysts working within small software agencies. Its central agency use case is enabling one capable operator to manage and deliver a substantial software product with the organizational and execution capacity normally associated with a larger development team.

The primary operator must already possess the technical ability to build the product without LazyCode. LazyCode accelerates, organizes, and amplifies that developer's work; it does not replace the judgment required to understand architecture, inspect code, review agent output, interpret tests and failures, or make product-specific technical decisions.

Product-oriented participants may contribute to high-level planning, feature definitions, delivery priorities, and acceptance criteria. Complete operation of the development system still requires technical participation.

Long-running product development is the primary workflow. Quick fixes, production issues, and small isolated changes use proportionate definitions while retaining the Feature/Delivery ownership, verification, and user-approved merge boundaries.

New and early-stage products are the preferred adoption point because LazyCode's definitions and workflows can be established from the beginning. Mature products remain supported through either incremental adoption in selected areas or a deliberate comprehensive effort to import the existing architecture, conventions, workflows, and project state.

The framework is intended to organize any software-engineering project that produces and maintains a software product. LazyCode's organizational concepts should not depend on a language, framework, repository size, or application category. Project-specific knowledge—such as build and test commands, architecture, conventions, deployment procedures, validation requirements, and operating constraints—belongs in the project repository.

The preferred operating model is one primary developer. A small number of developers may work concurrently, but multi-developer collaboration is a supported secondary case rather than the organizing center of the first product.

The first version runs locally on the operator's machine. LazyCode-owned workflow definitions and reusable configuration remain in the local LazyCode installation, while project definitions and operational knowledge are versioned with the repository. AI models may run locally but will commonly be remote APIs. A future hosted LazyCode runtime may allow projects to continue without depending on an operator's machine, but no hosted LazyCode service is required for the initial product.

## Product promise

LazyCode gives a developer a structured, observable, and deeply controllable organization of workers for building long-running software products.

It preserves important project knowledge outside transient conversations, keeps individual worker contexts bounded and reconstructable, makes recursive delegation practical, and gives the developer clear supervision over ongoing work. Its intended result is higher-quality software at an affordable AI cost. Increased development speed is desirable but should emerge from good organization and safe parallelization rather than sacrificing quality.

When goals conflict, LazyCode prioritizes:

1. **Code quality.** The purpose is to build maintainable, correct, and coherent products.
2. **Affordability.** Smaller and cheaper models should handle appropriate bounded responsibilities instead of using the most expensive model for every task.
3. **Speed.** Faster delivery should result from parallel work, reduced repeated investigation, and better coordination—not reduced quality.

LazyCode should improve conventional coding-agent workflows through structured delegation, explicit ownership, bounded context, durable project memory, role-appropriate model selection, independent verification, clear human supervision, reduced repeated reasoning, and accessible project knowledge.

It specifically aims to reduce context rot, bloated general-purpose agent conversations, constant context compaction, circular agent behavior, shallow subagent control, duplicated investigation, architectural knowledge loss, unnecessary use of expensive models, and poor visibility into delegated work.

The operator should be able to inspect the active organization and understand:

- how many workers are running;
- each worker's identity, role, parent, and children;
- the model or provider being used;
- runtime duration, current status, and progress;
- the current task and objective;
- the repository, worktree, files, or project area involved;
- owned resources, permissions, and constraints;
- token and cost usage when available;
- blockers, failures, escalations, completed outputs, and evidence.

Supervision should not require reading every worker's complete conversation.

LazyCode remains a tool. It does not guarantee a good project, correct code, accurate model output, sound plans, or appropriate architectural decisions. It does not remove the need for review, testing, technical judgment, or developer accountability, and it does not transform an unqualified operator into a software engineer.

## Intended user experience

The user creates a LazyCode project, links a repository, and collaborates with the Project Manager to turn a product idea into confirmed project documents. The Project Manager identifies major product areas as Epics; confirmed Epics are decomposed into user-approved, user-story-like Features; developer-led technical planning makes those Features implementation-ready.

Implementation-ready Features are grouped into a user-approved Delivery and implemented in parallel or dependency order on one Delivery branch. Internal review, Feature tests, integration, and Delivery-level verification occur before the user receives a combined review package and testing instructions.

The user may approve the Delivery and authorize merge into the configured integration branch, or reject it with actionable feedback that returns the Delivery to implementation and verification. After merge, LazyCode reconciles Delivery, Feature, Epic, roadmap, and project documentation and returns a final completion report.

Quick fixes use a lighter definition path but still pass through a Delivery, verification, user approval, and the configured merge boundary. The complete established journey is defined in [Primary End-to-End Workflow](primary-workflow.md).

## Request intake and project planning

The Project Guide is the default entry point for understanding an existing project and finding the appropriate planning resource. It is read-only toward project state. LazyCode opens a new conversation with the authorized receiving agent and provides the user's intent, relevant findings, existing Decisions, related work, and open questions in a self-contained first message.

The authorized planning agent works with the user on an editable, annotatable report explaining current and desired state and anticipated logic, schema, and architecture impacts at documentation-level detail without implementation code. It checks Epic placement, matching Features, active-Delivery impact, and consistency with Decisions.

Conflicting Decisions require revision and validation against implemented behavior. Matching requests return the user to existing Feature definitions before creating duplicate work. Confirmed plans can remain unscheduled, and postponed or rejected drafts retain their branch-backed progress until explicit deletion or separately defined cleanup.

The complete intake contract is defined in [Request Intake and Project Planning](request-intake-and-project-planning.md).

## Human control and autonomy

LazyCode initially uses one continuous-until-complete autonomy model. After the user approves and starts work, LazyCode proceeds independently until the next established human gate, a direct user intervention, a human-blocking escalation, or terminal completion. Routine actions inside approved scope do not require individual approval.

Escalations block only affected and dependent work; unrelated work continues. The user may enter any visible worker's chat and redirect that worker directly, with affected changes flowing downward and an intervention summary flowing upward.

Graceful pause is a bottom-up checkpoint and resource-cleanup protocol. Forced stop is an immediate runtime-supervised termination followed by mandatory state reconciliation. Logical worker identity and ownership survive context or model-session reconstruction.

Unexpected LazyCode or machine restart requires a user choice to resume all interrupted work or none, excluding deliberately Paused and user-blocked work. Recovery reconciles actual state before affected work resumes. Scheduling reserves capacity for verification and recovery, temporary retries are bounded, and shared provider failures are coordinated under [Scheduling, Failure, and Recovery](scheduling-failure-and-recovery.md).

LazyCode initially avoids arbitrary usage limits that terminate useful work. Instead, loop and no-progress safeguards alert the responsible parent for remediation and escalation.

The complete intervention and lifecycle contract is defined in [Human Control and Autonomy](human-control-and-autonomy.md).

## Interaction surface

LazyCode's first user-facing surface is a locally hosted web application. A project launcher shows known projects and attention state; inside a project, the default view is a Delivery list with permanent navigation for Alerts, Deliveries, Epics, Features, Project Documentation, and Project Settings.

The interface is Delivery-centered and hierarchy-aware. Delivery, Epic, Feature, and worker pages emphasize their owned definitions, acceptance criteria, progress, authority, evidence, and alerts. Raw worker conversation and execution history remain available as expandable detail rather than the primary supervision view.

Alerts provide a dedicated attention queue, and Delivery candidate review provides the evidence, testing instructions, comments, agent-assisted correction requests, approval, and rejection workflow.

The web application may allow direct document editing, but agent-assisted editing remains primary. Direct edits are Git-backed and reconcile with isolated worker snapshots at integration rather than silently mutating active context.

The complete established information architecture is defined in [Interaction Surface](interaction-surface.md).

## Project lifecycle

A LazyCode project combines a local application registration with repository-owned `.lazycode/` state. Creating or opening a project initially requires only a project name and repository location. Existing LazyCode state opens normally and reports incompatibilities when encountered; new projects create only the empty persistence structure before the Project Manager begins defining the product.

Mature products may use comprehensive reconciliation or progressively document only the areas needed for approved work. The user chooses the strategy; LazyCode does not automatically analyze the complete codebase.

Workers consult LazyCode project knowledge before repository documentation, source and tests, or external research. Git history identifies outside changes and potentially stale premises. One local installation may actively run several independent projects.

Archiving and removal affect local discovery without deleting repository-owned state. Project portability comes from the repository itself, while secrets and machine-specific configuration remain local.

The complete established lifecycle is defined in [Project Lifecycle](project-lifecycle.md).

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

The intended responsibility and execution-interface contract is [DeepSeek Harness Boundary](deepseek-harness-boundary.md). LazyCode owns the application, scheduling, databases, and Git controls independently of agent sessions; DSH is the first implementation behind an internal execution interface. Underlying CLI tools cannot bypass LazyCode authorization. Current runtime flow and limitations are described in [Architecture](architecture.md), with the native-plugin decision and its PD-22 refinement in [ADR-0001](decisions/ADR-0001-native-dsh-plugin.md).

## Organizational model

The established primary hierarchy is:

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

Explorer, Oracle, Reviewer, and Tester roles attach where their specialized work is required. Subagent and leaf describe tree relationships rather than roles. Team Lead is removed, and one worker may hold only one role.

The nine fixed roles and delegation matrix are defined in [Roles and Ownership](roles-and-ownership.md). Their runtime implementation remains future work except for the current Project Manager and Explorer spike.

## Work and delegation model

A Project may include a main repository and secondary repositories. The main repository holds shared Project documentation; each repository retains its development guidance. Features and Deliveries coordinate branches across all affected repositories, while each Task belongs to one repository. Managed worktrees, compact commit history, review follow-up, cleanup, and user-requested pushes follow [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md).

Features are self-contained, acceptance-driven work units, including fixes, migrations, upgrades, and maintenance. A Feature may belong to several Epics, but once scheduled it belongs to only one Delivery. Work spanning Deliveries becomes separate, linked Features. Deliveries are coherent batches of work, not timeboxes.

A Delivery may group independently testable Features or overlapping Features that need an explicit combined-state plan. Multiple Deliveries may run concurrently under functional-dependency and merge-order constraints. Canonical Delivery states distinguish Completed work on the Delivery branch from Merged integration into the target branch. The complete contract is [Delivery Planning](delivery-planning.md).

The roadmap combines a historical implementation timeline, a decided future timeline, and an unscheduled backlog with dependencies and priorities. Informal requests do not automatically become work objects; LazyCode helps the user identify their kind and checks that the description fits.

A Task belongs to a Feature or another Task and forms a verifiable contract between workers. Each Task has a worker; further subdivision creates child Tasks with new workers. The complete reference is [Work Hierarchy and Terminology](work-hierarchy-and-terminology.md).

Feature definition uses separate product and technical approval gates. The Project Manager helps the user define and specify the Feature; after approval, a Feature Lead orchestrates Implementation Workers, Reviewers, and integration without coding. Delivery Managers alone commission tightly scoped Tester workers for isolated QA. Feature completion requires recorded verification before Delivery integration, with permitted pre-existing or transient external-service exceptions explicit for user review. The Delivery runs its own full suite before completion. See [Feature Definition](feature-definition.md) and [Review, Testing, Integration, and Completion](review-testing-and-completion.md).

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

Each logical worker has a stable ID, one role, owned scope, hierarchy, branch/worktree, permissions, plan, progress, checkpoint, Findings, Reports, escalations, and lifecycle state. Model processes and conversations are activations of that identity and may be replaced without changing it.

Canonical worker states are Active, Waiting, Awaiting Command, Awaiting Allocation, Paused, Blocked, Completed, Failed, and Disposed. There is no Dormant state. Worker lifecycle is separate from Task, Feature, and Delivery lifecycle; the parent accepts results and advances the owned work. The complete contract is [Worker Identity and Lifecycle](worker-identity-and-lifecycle.md).

## Durable project memory

The intended product stores structured project knowledge and planning in SQLite, with one complete working database per worktree. Git-tracked database checkpoints and required `.lazycode/` attachments preserve organizational memory. The current Markdown planning documents remain in place until storage implementation and migration work occurs.

DeepSeek Harness sessions are useful execution evidence, but they are not the source of project truth. Durable discoveries should be promoted into the smallest appropriate project artifact.

Decisions persist with rationale, alternatives, evidence, and scope. Reports retain logical Feature or Project ownership across controlled worktree copies and selected live replication. Research and POC outcomes require user approval. All worker data access is mediated by LazyCode; validated database imports follow branch integration. Restoring committed state on another installation pauses previously active Tasks, while conversations and raw logs remain local. The complete policy is [Persistence and Schemas](persistence-and-schemas.md).

Detailed artifact ownership and writing rules are defined in [Project Conventions](conventions.md).

## Information compression

Detailed information should become progressively more concise as it moves upward:

```text
Implementation Worker -> implementation result
Feature Lead          -> feature outcome
Delivery Manager      -> delivery outcome
Project Manager       -> durable project impact
```

The detailed evidence should remain available for inspection without being copied into every parent context.

The complete event-driven reporting, merge-bound completion, validation, compression, urgent-propagation, and promotion contract is [Reporting and Information Compression](reporting-and-information-compression.md).

## Permissions and authority

Agent authority should be enforced by runtime software rather than prompt text alone. Capabilities may include filesystem access, shell and test execution, network access, package installation, Git operations, documentation changes, agent creation, and human messaging.

Permissions govern a worker's own actions; authority governs what it may authorize for eligible children. Resource-scoped grants may cover one action, a Task through review and parent merge, a Delivery, or a user-approved standing Project rule. Grants survive compaction, remain bounded by role, and are checked on every use. The product contract is established in [Permissions and Escalation](permissions-and-escalation.md); runtime enforcement and the detailed capability matrix remain future work.

## Escalation

Managed variables and secrets, intercepted output, user-approved overrides, imported-policy activation, and update approval follow [Security and Trust](security-and-trust.md). Underlying commands remain subject to runtime controls, including when untrusted content misdirects a model.

Agents explicitly distinguish information, permission, and decision-authority requests. Information may come from an authorized Explorer or Oracle; permission and Decision approvals use ephemeral authority-holder activations. Following denial, attempted alternatives, and a rejected justified resubmission, a permission appeal may go directly to the Feature Lead, then Delivery Manager and Project Manager, skipping levels already consulted. Human-authority matters reach the user.

An escalation should carry the reason, precise question, blocking status, evidence already examined, alternatives considered, and authority required. Runtime policy—not model improvisation—should select the next recipient.

## Independent verification

Implementation, review, and testing should be separate responsibilities. Reviewers and Testers should receive fresh context based on contracts, repository state, diffs, tests, and acceptance criteria rather than inherit the implementer's confidence or private reasoning.

Verification results should be structured and durable enough to support integration decisions.

## Model policy

Organizational contracts do not depend on one model. Parents choose from approved role configurations using installation defaults and Project overrides. Portable model identities resolve through local provider connections; availability fallback follows an approved ordered list. Struggling workers request guidance, with stronger-model reassignment reserved for parent-authorized recovery after failure.

Reviewers normally use the implementer's model, with lower-cost approved review configurations available for expensive implementation models. Model changes preserve identity and authority. The complete configuration, fallback, and evidence policy is [Models and Provider Routing](models-and-provider-routing.md).

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
- using smaller and cheaper models for responsibilities they can perform without lowering project quality;
- reducing repeated investigation, unproductive loops, unnecessary compaction, and wasted AI usage;
- keeping project documentation accessible and useful to project-aware workers;
- allowing the operator to understand and supervise active work without reading every conversation;
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

All listed product-definition topics have recorded decisions in the [Project Definition Workbook](project-definition-workbook.md). The next checkpoint is the user's pending design tweak, followed by the technical readiness items in [Evaluation and Implementation Roadmap](evaluation-and-implementation-roadmap.md). No implementation, including the SQLite spike, begins before that tweak is incorporated. The [Roadmap](roadmap.md) sequences a one-repository, one-active-Delivery dogfooding milestone with mocked-agent automated acceptance and later sandbox integration.

## Decision state

### Established for the current version

- LazyCode is the working name.
- The primary user is a technically capable solo developer or developer/analyst in a small agency.
- Long-running product development is primary; quick fixes must have a lightweight path.
- LazyCode is technology agnostic, while project-specific operating knowledge belongs in the repository.
- The initial runtime is local-first and requires no hosted LazyCode service.
- Product priorities are code quality, affordability, then speed.
- LazyCode organizes workers independently of whether they are AI models, humans, services, or external agents.
- LazyCode provides structure and supervision without guaranteeing correct results or replacing developer accountability.
- Project definition proceeds from confirmed project documents to Epics, product-defined Features, technical Feature plans, and Deliveries.
- Project exploration is read-only and hands off into a new authorized planning conversation; planning reports are user-refined and checked against existing work and Decisions.
- Accepting a plan does not schedule implementation, and postponing or rejecting an idea does not discard its draft progress.
- Product Owner is not a separate role; its discovery and definition responsibilities belong to the Project Manager.
- Delivery is the canonical grouping and merge unit; release is not a separate LazyCode concept.
- A Feature may belong to several Epics but only one Delivery; cross-Delivery work becomes separate, linked Features.
- Deliveries have no timebox, and Tasks are worker-owned, verifiable subdivisions of Features or other Tasks.
- Deliveries support controlled concurrency and use Draft, Active, Paused, Completed, Merged, and Abandoned as their canonical lifecycle states.
- Features use separate product and technical approvals; Feature Leads orchestrate rather than ordinarily code, and Feature completion precedes Delivery-branch integration.
- Nine fixed, single-role worker types use an explicit delegation matrix. Only Implementation Workers code; parents commission and evaluate independent verification, and only Delivery Managers commission isolated QA Testers.
- Stable logical worker identity survives activation and model replacement. Nine visible worker states, including Awaiting Command and Awaiting Allocation, separate execution status from work-object lifecycle; Disposed workers are soft-deleted by default.
- Decisions retain rationale; Reports persist with their Feature or, when no Feature owns them, at Project level.
- Project-level research and POC outcomes require user approval.
- Users review and approve a combined Delivery branch rather than every completed Feature.
- Quick fixes retain the Delivery verification and merge boundary.
- Continuous-until-complete is the single initial autonomy mode between established human gates.
- Users may directly redirect any visible worker; graceful pause, forced stop, cancellation, and replacement follow ownership-tree semantics.
- The first user-facing surface is a local web application centered on Deliveries, contextual worker supervision, and an Alerts queue.
- Projects combine local registration with repository-owned state, support user-directed mature-codebase reconciliation, and remain portable through Git.
- The repository and `.lazycode/` artifacts are durable project memory.
- DeepSeek Harness is the v1 execution substrate.
- LazyCode is an out-of-tree bundle, not a Harness fork.
- Context should be assembled rather than inherited wholesale.
- Runtime policy must ultimately enforce authority.
- The system will be developed through narrow, verified vertical slices.

### Implementation detail still to define

Product-level lifecycle, delegation, permission, model-policy, promotion, and human-control rules are established in the linked references. Their concrete implementations remain future work:

- execution-interface and application-hosting contracts;
- physical state schemas, SQLite merge/replication algorithms, and code-checkpoint coordination;
- earliest test authoring and post-merge correction organization;
- local command enforcement and secret protection before sandbox integration;
- executable role, delegation, permission, and model-configuration schemas;
- UI operations, durable events, and recovery mechanisms;
- safe development and testing of LazyCode while another instance manages that work.

The user's pending tweak remains a prerequisite before implementing any of these.
