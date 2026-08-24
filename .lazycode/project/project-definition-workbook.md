# Project Definition Workbook

Status: in progress
Last updated: 2026-08-23

## Purpose

This workbook is the ordered discussion guide for refining LazyCode from its highest-level product use down to implementation architecture. It contains questions, not settled answers.

The current answers belong in [Project Definition](project-definition.md) and its linked detail pages. As each topic is resolved, update the relevant project document and record significant architectural decisions in `decisions/`.

## Definition process

For every topic, record:

1. The decision being made.
2. Concrete user or system examples.
3. Alternatives considered.
4. Chosen behavior and rationale.
5. Explicit non-goals.
6. Unresolved questions.
7. Consequences for later topics.
8. Decision status: established, provisional, or deferred.

Do not design lower-level roles, schemas, or services before the product workflow requires them.

## Discussion order

### Phase 1 — Product experience

#### PD-01 — Target user and situation

Status: established

- Is LazyCode primarily for an individual developer, technical lead, or software team?
- Does it support existing repositories, new projects, or both?
- Is it intended for small changes, long-running projects, or both?
- Is it local-first, team-shared, or eventually hosted?
- What software-development knowledge can LazyCode assume the user has?
- What repository sizes, languages, and project types should the first version target?

Decision summary:

- LazyCode primarily serves technically capable solo developers and developer/analysts in small agencies.
- Its preferred agency model enables one operator to manage a large product; limited parallel human development is supported but secondary.
- The operator must already be capable of building the product without LazyCode.
- Long-running product development is primary, with a graceful lightweight path for quick fixes.
- New and early-stage projects are the preferred adoption point; mature products may adopt incrementally or comprehensively.
- The framework is software-product and technology agnostic; project-specific commands and instructions belong in the repository.
- Reusable organizational behavior belongs to LazyCode, while project definitions and operational knowledge belong to the project.
- The initial runtime is completely local except for optional remote model APIs. Hosted operation may be added later.

Output: recorded in [Project Definition — Target user and operating context](project-definition.md#target-user-and-operating-context) and [Architecture — Deployment stance](architecture.md#deployment-stance).

#### PD-02 — Core product promise

Status: established

- What should LazyCode do better than a normal coding agent?
- Is its primary value autonomy, scalability, reliability, organization, auditability, context efficiency, or a specific combination?
- What outcome should make someone choose LazyCode?
- Which problems are central, and which are incidental benefits?
- What should LazyCode never claim to do?
- How will we recognize that the product promise has been fulfilled?

Decision summary:

- LazyCode provides a structured, observable, and deeply controllable organization of workers for long-running software products.
- Durable project knowledge and reconstructed bounded contexts replace dependence on indefinitely growing conversations.
- Product priorities are code quality first, affordability second, and speed third.
- Smaller and cheaper models should handle appropriate bounded responsibilities; speed should emerge from sound parallelization.
- LazyCode organizes workers rather than defining intelligence. A compatible worker may be an AI model, human, service, or external agent.
- The operator must be able to inspect active workers, ownership, models, runtime, location, activity, permissions, usage, blockers, and results.
- LazyCode is a tool: it does not guarantee good projects, correct code, accurate results, or sound decisions, and it does not replace developer accountability.

Output: recorded in [Project Definition — Product promise](project-definition.md#product-promise), [Project Definition — Definition of success](project-definition.md#definition-of-success), and [Organizational Model — Worker abstraction](organizational-model.md#worker-abstraction).

#### PD-03 — Primary end-to-end workflow

Status: established

Use one realistic request and define the complete golden path:

```text
Human opens project
  -> gives project-level request
  -> LazyCode investigates
  -> asks necessary questions
  -> proposes work
  -> human approves
  -> work is decomposed
  -> agents implement
  -> results are integrated
  -> independent verification runs
  -> project memory is updated
  -> human receives a completion report
```

For every stage:

- What does the human see?
- What does LazyCode do automatically?
- Which role owns the stage?
- What durable artifact is created or updated?
- When must the human respond?
- What evidence allows the workflow to advance?
- How are failure, interruption, or uncertainty represented?

Decision summary:

- The user creates a LazyCode project, links a repository, and defines the product collaboratively with the Project Manager.
- The Project Manager includes product-owner responsibilities and writes the definition, vision, feasibility findings, roadmap, and related project artifacts for user confirmation.
- Major product areas are Epics. Each Epic must be refined and confirmed before decomposition into Features.
- Each Feature receives an approved user-story-like product definition before developer-led technical planning makes it implementation-ready.
- The user may request dependency-aware Delivery recommendations or directly select Features for a Delivery.
- A Delivery groups Features that can be implemented, integrated, and tested together; the user approves and explicitly starts it.
- Features pass internal review and tests before automatic integration into one Delivery branch; the user reviews the combined Delivery, not each Feature.
- Discoveries propagate from Feature to Delivery to project documentation according to affected scope.
- The user receives an evidence-backed review package and can test the Delivery branch before approval.
- Rejection creates actionable corrective work inside the active Delivery and repeats implementation and verification.
- Approval authorizes merge into the configured integration branch. Completion then updates Delivery, Feature, Epic, roadmap, and project state.
- Quick fixes use a lightweight definition but still enter an active or dedicated Delivery and follow the same verification and merge boundary.

Output: recorded in [Primary End-to-End Workflow](primary-workflow.md) and summarized in [Project Definition — Intended user experience](project-definition.md#intended-user-experience).

#### PD-04 — Human control and autonomy

Status: not started

- Does the user approve projects, deliveries, features, tasks, plans, or individual actions?
- When may LazyCode proceed autonomously?
- Which decisions always require a human?
- How can the user pause, redirect, cancel, retry, or replace work?
- What does “run until complete” mean operationally?
- How should time, cost, token, and concurrency budgets work?
- Can the user change the autonomy level during active work?
- What happens to ongoing child work when the user intervenes?

Output: the human-oversight, autonomy, and approval model.

#### PD-05 — Interaction surface

Status: not started

- Which surfaces are required: CLI, terminal UI, web application, IDE integration, or several?
- What is the smallest useful interface for the first version?
- How does the user start or resume work?
- How is the active organization shown: tree, timeline, work board, reports, or another form?
- How does the user inspect an agent, artifact, decision, permission, or failure?
- How are questions, escalations, plans, approvals, and completion reports presented?
- Which operations must be possible without a graphical interface?

Output: a product interaction model without detailed visual design.

### Phase 2 — Work representation and planning

#### PD-06 — Project lifecycle

Status: not started

- How is LazyCode initialized in a repository?
- What information must exist before work can begin?
- How does it understand an existing codebase?
- What is supplied by the user, inferred by agents, or generated automatically?
- How are initial architecture, conventions, and project risks established?
- How does project knowledge become stale, and how is it refreshed?
- Can one installation manage multiple projects or workspaces?
- What does it mean to archive, transfer, or remove a project?

Output: project initialization, maintenance, and lifecycle rules.

#### PD-07 — Work hierarchy and terminology

Status: not started

Define exact meanings and relationships for:

```text
Project
Goal or request
Roadmap item
Delivery
Feature
Task
Component
Delegation
Finding
Decision
Escalation
Report
```

- Which objects are durable artifacts?
- Which are temporary runtime concepts?
- Which objects have owners and lifecycle states?
- Can features belong to multiple deliveries?
- Can a delivery contain research, migration, or maintenance work that is not a feature?
- When does a task become a delegated child task?
- Are initiative, milestone, epic, experiment, and incident concepts needed?

Output: the canonical work ontology and project glossary.

#### PD-08 — Request intake and project planning

Status: not started

- How does informal human intent become planned work?
- Who investigates and interprets a new request?
- How are ambiguity, missing requirements, and architectural impact discovered?
- When should the roadmap or project definition change?
- How are alternatives and tradeoffs presented to the human?
- What makes a request ready for delivery planning?
- Can planning be recorded without scheduling implementation?
- How are rejected, postponed, or duplicate requests represented?

Output: the contract between human intent and project planning.

#### PD-09 — Delivery planning

Status: not started

- Why and when are features grouped into a delivery?
- Who creates, modifies, approves, pauses, and closes a delivery?
- What must be true before a delivery starts?
- How are dependencies, sequencing, risks, budgets, and acceptance criteria represented?
- Can deliveries overlap or share dependencies?
- How are integration and release boundaries related to deliveries?
- What constitutes delivery completion?
- What information is promoted to project-level memory afterward?

Output: the delivery contract, lifecycle, and document standard.

#### PD-10 — Feature definition

Status: not started

Determine whether every feature must define:

```text
Identity
User or system outcome
Motivation
Requirements
Scope
Non-goals
Dependencies
Architecture constraints
Interfaces and contracts
Acceptance criteria
Permissions
Verification plan
Expected durable knowledge
Status
```

- How detailed must a feature be before execution?
- Who defines its architecture and interfaces?
- When are tests or contracts created?
- What makes a feature independently implementable?
- How are changes spanning several features represented?
- Can a feature be split, merged, cancelled, or reopened?
- What distinguishes feature completion from delivery integration?

Output: the canonical feature-planning template and feature lifecycle.

### Phase 3 — Organization and coordination

#### PD-11 — Roles and ownership

Status: not started

Refine the proposed Project Manager, Delivery Manager, Team Lead, Feature Lead, Implementation Agent, Explorer, Oracle, Reviewer, and Tester roles.

For every role, define:

```text
Purpose
Owned artifacts
Allowed decisions
Capabilities
Inputs
Outputs
Parent
Possible children
Escalation path
Completion conditions
```

- Are roles fixed product concepts or configurable templates?
- Which responsibilities must remain separate?
- Can one agent hold several roles?
- When may a hierarchy level be skipped?
- How is ownership transferred?

Output: a role catalog with explicit, non-overlapping responsibilities.

#### PD-12 — Agent identity and lifecycle

Status: not started

- What makes an agent logically persistent?
- Is an agent created for a project, delivery, feature, task, or invocation?
- Which identity and state survive process or model replacement?
- When does an agent become active, waiting, blocked, completed, failed, or disposed?
- Can responsibility transfer between agents?
- What state belongs to the agent versus its owned work?
- How is an agent reconstructed after restart?
- How are abandoned, superseded, or failed agents represented?

Output: the durable agent identity and lifecycle model.

#### PD-13 — Delegation rules

Status: not started

- When should an agent delegate rather than implement directly?
- Who defines and validates the child contract?
- Can children delegate recursively?
- How are depth, concurrency, cost, time, and token budgets bounded?
- Does the parent wait or continue useful work?
- Can delegated work be cancelled, redirected, retried, or reassigned?
- What information returns to the parent?
- Who integrates or rejects the child result?
- How are duplicate or overlapping delegations prevented?

Output: delegation policy and child-work lifecycle.

#### PD-14 — Reporting and information compression

Status: not started

- What must every child report?
- What evidence must remain inspectable?
- What details stay at the child level?
- How are risks and blockers prevented from being compressed away?
- What belongs in task, feature, delivery, and project summaries?
- Which conclusions become durable memory?
- Who performs and verifies knowledge promotion?
- How are conflicting reports reconciled?

Output: report schemas and upward information-compression rules.

### Phase 4 — Trustworthy execution

#### PD-15 — Context and memory

Status: not started

- What context does each role receive?
- How are relevant files, documents, decisions, tests, and reports selected?
- Does a child inherit any parent context?
- How are context size and token budgets allocated?
- How is context provenance recorded and inspected?
- What becomes durable memory?
- When is conversation history retained, summarized, or discarded?
- How are stale, contradictory, or missing documents detected?
- Can an agent request additional context without gaining unrelated authority?

Output: the context-builder contract and memory policy.

#### PD-16 — Permissions and escalation

Status: not started

- Which capabilities exist?
- How are they scoped to files, commands, tools, services, repositories, and agents?
- What authority does each role receive by default?
- Which roles may grant, deny, or revoke authority?
- How do one-action, task, session, delivery, and permanent leases work?
- What happens when a permission is denied or unavailable?
- Which questions go to an Oracle, parent, or human?
- Can non-blocking work continue during escalation?
- How does a decision flow back to every affected agent and artifact?

Output: authority, permission-lease, and escalation models.

#### PD-17 — Repository, workspace, and Git strategy

Status: not started

- Do agents share a working tree or use isolated worktrees?
- How is file ownership represented and enforced?
- Can agents write concurrently?
- Who creates branches, commits, merges, and cleans up worktrees?
- Who integrates child changes?
- How are conflicts, stale branches, and partial changes handled?
- Which Git actions require approval?
- What repository states must agents refuse to modify?

Output: workspace isolation, concurrency, ownership, and Git rules.

#### PD-18 — Scheduling, failure, and recovery

Status: not started

- How are ready tasks selected and scheduled?
- How are dependencies and concurrency limits enforced?
- What happens after process interruption or machine restart?
- How are retries distinguished from duplicate work?
- Which failures are retryable, repairable, blocking, or terminal?
- How are hung or unresponsive agents detected?
- How are partial results and side effects recovered?
- When should responsibility be reassigned?

Output: execution scheduling and recovery semantics.

#### PD-19 — Review, testing, integration, and completion

Status: not started

- What verification is required for tasks, features, and deliveries?
- How independent must Reviewers and Testers be?
- Who may reject work or require repair?
- How are findings returned to the responsible agent?
- How many repair cycles are allowed?
- Who integrates completed components and features?
- What constitutes acceptance at each hierarchy level?
- Who updates documentation and status?
- Who declares final completion to the human?

Output: quality gates, integration ownership, and completion protocol.

### Phase 5 — Technical product definition

#### PD-20 — Models and provider routing

Status: not started

- Which roles need high reasoning quality, coding ability, retrieval, speed, low cost, or model independence?
- Can users configure model policies?
- How are fallback models and providers selected?
- Should reviewers use a different model family from implementers?
- How are rate, token, cost, and availability limits enforced?
- What model and provider information becomes execution evidence?
- What behavior must remain stable across model changes?

Output: model policy, routing, fallback, and budget rules.

#### PD-21 — Persistence and schemas

Status: not started

- Which artifacts are Markdown, YAML, JSON, database records, or generated projections?
- What is canonical versus derived?
- Which runtime state belongs in Git?
- What remains machine-local or external?
- How are identifiers and relationships represented?
- How are schemas versioned and migrated?
- How are concurrent artifact updates protected?
- How is invalid or partially written state recovered?

Output: the durable data model, schema, and migration strategy.

#### PD-22 — DeepSeek Harness boundary

Status: not started

- Which behaviors should be native DSH plugins?
- Which DSH services, events, tools, sessions, and providers should LazyCode consume?
- Which organizational concepts must remain independent of DSH?
- Does LazyCode eventually need a separate control plane?
- How will breaking Harness releases be evaluated and adopted?
- What adapter boundary would permit another runtime later?
- Which current DSH tools or paths must LazyCode restrict or replace?

Output: the stable integration boundary and upstream compatibility policy.

#### PD-23 — Observability and auditability

Status: not started

- What should the human be able to inspect?
- Should LazyCode expose the agent tree, tasks, context sources, decisions, permissions, costs, tool calls, or all of these?
- What information is necessary for debugging and incident review?
- What should a completion report contain?
- How are failed or abandoned runs examined?
- How are progress and uncertainty communicated without overwhelming the user?
- Which records are retained, redacted, or deleted?

Output: event, audit, reporting, and presentation requirements.

#### PD-24 — Security and trust

Status: not started

- Which repositories, credentials, services, and network destinations may agents access?
- How are untrusted repository instructions handled?
- What protects against direct and indirect prompt injection?
- Which actions require sandboxing, approval, isolation, or prohibition?
- How are plugins, models, dependencies, and external connectors trusted?
- How are secrets kept out of prompts, logs, reports, and artifacts?
- What are the security invariants for autonomous operation?

Output: the LazyCode threat model and mandatory security properties.

#### PD-25 — Evaluation and implementation roadmap

Status: not started

- How do we measure whether hierarchy improves results?
- Which single-agent or multi-agent baseline should be used?
- Which metrics matter: success, cost, context size, retries, elapsed time, human interventions, defects, or knowledge retention?
- What is the smallest useful first product?
- Which capabilities can initially be simulated or manual?
- Which vertical slice should follow the Explorer spike?
- What evidence is required before expanding the hierarchy?

Output: the evaluation plan, MVP definition, and evidence-based delivery roadmap.

## Recommended starting session

Begin with PD-01 through PD-04 only:

1. Who uses LazyCode?
2. What do they ask it to accomplish?
3. What is the ideal end-to-end experience?
4. How much control and approval do they retain?

Once those answers are stable, update the project definition with a product-use section before moving to project lifecycle and work terminology.
