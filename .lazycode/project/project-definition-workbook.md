# Project Definition Workbook

Status: in progress
Last updated: 2026-09-07

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

Status: established

- Does the user approve projects, deliveries, features, tasks, plans, or individual actions?
- When may LazyCode proceed autonomously?
- Which decisions always require a human?
- How can the user pause, redirect, cancel, retry, or replace work?
- What does “run until complete” mean operationally?
- How should time, cost, token, and concurrency budgets work?
- Can the user change the autonomy level during active work?
- What happens to ongoing child work when the user intervenes?

Decision summary:

- LazyCode initially has one autonomy model: continuous execution between established human gates.
- Routine actions inside approved scope do not require individual user approval.
- Work stops only for user intervention, an escalation requiring human authority, an established review gate, or terminal completion.
- A human escalation blocks affected and dependent work while unrelated work continues.
- The user can enter any visible worker's chat and redirect it; effects propagate downward and a summary propagates upward.
- Graceful pause propagates downward, checkpoints at leaf safe points, cleans owned resources, and completes upward.
- Resume begins at the top owner, propagates downward, and requires each worker to tour durable and runtime state before continuing.
- Logical worker identity survives pause even when a fresh model session must be reconstructed.
- Forced stop terminates worker threads and owned execution environments immediately, then requires state reconciliation before resume.
- Parent cancellation or replacement cascades to descendants; children normally settle before the parent stops.
- Arbitrary usage ceilings are not part of the initial model. Loop and no-progress detection alert the direct parent for remediation and possible escalation.
- The user must be able to identify and directly supervise every active worker.

Output: recorded in [Human Control and Autonomy](human-control-and-autonomy.md) and referenced by the [Primary End-to-End Workflow](primary-workflow.md#human-approval-gates).

#### PD-05 — Interaction surface

Status: established

- Which surfaces are required: CLI, terminal UI, web application, IDE integration, or several?
- What is the smallest useful interface for the first version?
- How does the user start or resume work?
- How is the active organization shown: tree, timeline, work board, reports, or another form?
- How does the user inspect an agent, artifact, decision, permission, or failure?
- How are questions, escalations, plans, approvals, and completion reports presented?
- Which operations must be possible without a graphical interface?

Decision summary:

- The first product surface is a locally hosted web application. The same service may be hosted remotely later.
- No separate interactive CLI is required for the initial product.
- A project launcher lists known projects and shows project name, active Delivery, active-worker count, and alert count.
- Deliveries is the default project view. Permanent navigation includes Alerts, Deliveries, Epics, Features, Project Documentation, and Project Settings.
- Delivery rows show state, runtime, active workers, Feature progress, and attention status.
- Alerts have unconsulted, consulted-but-unresolved, and resolved states; resolved alerts are hidden by default behind a toggle.
- Epic and Feature pages emphasize definitions and acceptance criteria before lower-level activity.
- Worker pages emphasize task, plan, authority, progress, checkpoint knowledge, findings, divergence, and alerts.
- Raw worker chat, tool activity, command output, and execution history remain available in expandable detail rather than dominating the page.
- Documentation is changed primarily through responsible workers, with optional direct editing.
- Direct edits are Git-backed and reconcile with isolated work at integration rather than live-mutating worker context.
- Delivery candidate review lives on the Delivery page and includes evidence, testing instructions, comments, approval, rejection, and an assisting review worker.
- Persistence format, frontend technology, visual design, authentication, and detailed Git mechanics remain deferred.

Output: recorded in [Interaction Surface](interaction-surface.md) and referenced by [Human Control and Autonomy — User visibility requirement](human-control-and-autonomy.md#user-visibility-requirement).

### Phase 2 — Work representation and planning

#### PD-06 — Project lifecycle

Status: established

- How is LazyCode initialized in a repository?
- What information must exist before work can begin?
- How does it understand an existing codebase?
- What is supplied by the user, inferred by agents, or generated automatically?
- How are initial architecture, conventions, and project risks established?
- How does project knowledge become stale, and how is it refreshed?
- Can one installation manage multiple projects or workspaces?
- What does it mean to archive, transfer, or remove a project?

Decision summary:

- A project combines a local LazyCode registry entry with repository-owned `.lazycode/` state.
- Project creation initially asks only for a name and repository location.
- Existing `.lazycode/` state opens optimistically; incompatibilities appear as actionable errors at the affected boundary.
- New projects create only the empty storage required by the eventual persistence model, then rely on the Project Manager workflow to populate knowledge.
- Mature products use user-chosen comprehensive or progressive reconciliation; LazyCode never launches broad analysis automatically.
- Workers consult LazyCode project documentation before repository docs, source and tests, or external research.
- Undocumented project areas need no explicit coverage markers; they are investigated when approved work makes them relevant.
- Git history is the source for detecting outside changes and validating potentially stale premises during open, resume, integration, candidate preparation, merge, and recovery.
- One local installation may actively run several independent projects at once.
- Relocation changes only the local repository pointer and revalidates project identity.
- Archive hides a project while preserving its local registration and repository state.
- Remove unregisters the project locally without deleting the repository or `.lazycode/` state.
- No transfer workflow is required because repository-owned state provides portability; credentials and machine-specific configuration remain local.

Output: recorded in [Project Lifecycle](project-lifecycle.md) and reflected by [Interaction Surface — Project launcher](interaction-surface.md#project-launcher).

#### PD-07 — Work hierarchy and terminology

Status: established

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

Decision summary:

- Informal requests remain conversation until the user identifies their kind; LazyCode guides and checks that classification rather than silently creating an intake object.
- The roadmap combines an implemented-work timeline, a decided future timeline, and an unscheduled dependency- and priority-aware backlog.
- A Feature is a self-contained, acceptance-driven work unit, including fixes, migrations, upgrades, and maintenance.
- A Feature may have several Epic parents but retains one canonical identity and definition.
- A scheduled Feature belongs to one Delivery. Work spanning Deliveries becomes separate, linked Features.
- Deliveries are coherent batches of work without a timebox.
- A Task belongs to a Feature or another Task and is a verifiable contract between workers. Each Task has a worker; child Tasks receive new workers.
- Components are architectural building blocks, while Delegation assigns a Task and its contract.
- Findings are evidence-backed observations, Decisions are accepted choices, Escalations are unresolved questions or authority requests, and Reports describe progress or results.
- Decisions persist with their rationale, alternatives, evidence, and affected scope.
- Feature-associated Reports persist with the Feature; Reports without a Feature, including Delivery summaries and project research, persist at Project level.
- Research and POCs remain project-level work with Git-tracked `.lazycode/` artifacts and SQLite project metadata. Their outcomes require user approval.
- Exact schemas, lifecycle states, ownership-transfer rules, and storage synchronization remain deferred.

Output: recorded in [Work Hierarchy and Terminology](work-hierarchy-and-terminology.md).

#### PD-08 — Request intake and project planning

Status: established

- How does informal human intent become planned work?
- Who investigates and interprets a new request?
- How are ambiguity, missing requirements, and architectural impact discovered?
- When should the roadmap or project definition change?
- How are alternatives and tradeoffs presented to the human?
- What makes a request ready for delivery planning?
- Can planning be recorded without scheduling implementation?
- How are rejected, postponed, or duplicate requests represented?

Decision summary:

- A project-facing read-only exploration agent is the default entry point for understanding the project and locating the appropriate planning resource.
- Handoff starts a new conversation with an authorized agent, using a self-contained first message containing intent, findings, existing Decisions, related work, and open questions.
- The exploration agent cannot persist planning changes, edit artifacts, create or link work items, or pause Deliveries; authorized agents perform those actions.
- The user identifies the work category, with agent guidance and validation rather than automatic classification.
- Planning investigates Epic placement, similar Features, active-Delivery impact, dependencies, and relevant Decisions.
- An editable and annotatable planning report explains intent, current and desired state, anticipated logic/schema/architecture changes, alternatives, and unresolved questions at documentation-level detail without code.
- Decision conflicts require revision of the proposal or Decision and validation against existing implementation; any necessary corrective work joins the plan.
- Matching requests lead the user to existing Feature definitions before refining them or creating related work.
- Confirmed plans update affected artifacts but may remain unscheduled; Feature readiness, Delivery approval, and explicit start remain required.
- Postponed or rejected planning retains branch-backed progress until explicit deletion or a separately defined cleanup process. Drafts are not accepted project direction.

Output: recorded in [Request Intake and Project Planning](request-intake-and-project-planning.md).

#### PD-09 — Delivery planning

Status: established

- Why and when are features grouped into a delivery?
- Who creates, modifies, approves, pauses, and closes a delivery?
- What must be true before a delivery starts?
- How are dependencies, sequencing, risks, budgets, and acceptance criteria represented?
- Can deliveries overlap or share dependencies?
- How are integration and release boundaries related to deliveries?
- What constitutes delivery completion?
- What information is promoted to project-level memory afterward?

Decision summary:

- A Delivery is an untimed, user-approved batch of implementation-ready Features grouped for efficient independent verification or explicit integration of overlapping changes.
- A Delivery Manager owns Feature startup, orchestration, dependencies, integration, Delivery-specific subagents, verification, knowledge propagation, candidate preparation, corrections, and final merge preparation.
- The lean definition requires identity, outcome, Feature references, dependencies, parallel/sequential groups, branch information, verification plan, and lifecycle state. Predecessor, overlap, conflict, and risk fields are conditional.
- A Delivery starts only with user approval, explicit start, implementation-ready Features, understood sequencing, and satisfied dependency/readiness constraints.
- Feature workers incorporate relevant Delivery-branch changes into their branches; the Delivery Manager owns the correct combined state.
- Multiple Deliveries may be Active. A functional dependency on Active work prevents start, while a Completed unmerged predecessor permits stacked work with enforced merge order.
- Pure code overlap may run concurrently, but later base-branch integration requires a user-started, reviewed, and approved conflict-resolution plan and is never automatic.
- Scope change pauses the Delivery, revises definitions and plan, reconciles partial code, notifies workers, and then resumes valid work.
- Canonical states are Draft, Active, Paused, Completed, Merged, and Abandoned. Completed requires all Features integrated and, as refined by PD-19, the Delivery's own full test run with introduced defects corrected and permitted exceptions documented. Merged means user-approved integration into the target branch.
- Completed may return to Active for verification failure, rejection, or rework. Any non-Merged Delivery may be Abandoned; Merged is terminal and cannot be Abandoned.
- As refined by PD-19, the Delivery's full test run precedes Completed; required review and QA evidence accompany the candidate for user review. Successful approved integration produces Merged and promotes affected project, Epic, Feature, roadmap, Report, and Decision state.

Output: recorded in [Delivery Planning](delivery-planning.md).

#### PD-10 — Feature definition

Status: established

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

Decision summary:

- A Feature is defined through product definition and technical specification, each with a separate user approval gate.
- The concise product definition covers identity, Epic parents, current and desired state, UI where applicable, functionality, logic, scope, non-goals, acceptance criteria, related Features, and dependencies.
- The technical specification covers logic and data/schema changes, Components, interfaces, dependencies, Task decomposition, orchestration, and verification; migration, integration, permissions, and risks are conditional.
- The Project Manager and user define and approve the Feature. The Feature Lead then verifies sufficiency and orchestrates implementation, review, testing, and child integration without ordinarily coding.
- Canonical states are Draft, Defined, Specced, Approved, Scheduled, Active, Paused, Completed, and Abandoned.
- Defined means product behavior is approved; Specced means technical planning is finished but unapproved; Approved means implementation-ready; Scheduled means assigned to a Delivery.
- Completed requires integrated child work, review, required tests, acceptance evidence, and a Feature Report. PD-19 permits documented pre-existing or transient external-service verification exceptions, including unverified criteria, for user review. Delivery-branch integration happens afterward.
- Product-definition changes invalidate the full approval chain and return to Draft. Technical-specification changes preserve product approval and return to Specced. In-scope implementation corrections need reconciliation but no reapproval.
- Completed Features are immutable work history. Further behavior becomes a new linked Feature.
- Splitting or combining creates new Draft Features requiring full reapproval; originals retain history, become Abandoned, and link to replacements.
- Abandoned Features are soft-deleted and restorable only after definition, approval, branch, conflict, and implementation-plan reconciliation.

Output: recorded in [Feature Definition](feature-definition.md).

### Phase 3 — Organization and coordination

Input from PD-10: the Feature Lead is an orchestration owner that ordinarily does not code. Refine how this responsibility relates to other roles, worker replacement, reviewer/tester independence, and ownership transfer.

#### PD-11 — Roles and ownership

Status: established

Refine the proposed Project Guide, Project Manager, Delivery Manager, Feature Lead, Implementation Worker, Explorer, Oracle, Reviewer, and Tester roles.

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

Decision summary:

- LazyCode has nine fixed core roles: Project Guide, Project Manager, Delivery Manager, Feature Lead, Implementation Worker, Explorer, Oracle, Reviewer, and Tester. Team Lead is removed.
- Projects may configure role instructions, models, context, tools, permissions, and specialization, but a worker holds exactly one role and role ownership semantics remain fixed.
- Subagent and leaf describe worker-tree relationships, not roles. Product Owner and Project Owner responsibilities belong to Project Manager.
- Every Delivery has a logical Delivery Manager and every Active Feature has a logical Feature Lead. Waiting or Completed managers may release their activation and be reactivated or reconstructed by child events.
- Multiple Project Managers may work concurrently in separate branches or worktrees; later merges reconcile earlier changes.
- Project Managers, Delivery Managers, and Feature Leads do not write implementation code. Only Implementation Workers modify implementation.
- The fixed delegation matrix limits which child roles each parent may create. Only Delivery Managers may create Testers; Testers are tightly scoped leaf workers in isolated QA environments.
- A worker never selects its own Reviewer or Tester. The parent commissions verification, evaluates Findings, may consult Oracles, and returns valid corrections to the implementer.
- Management and implementation workers may decide within user-approved artifacts and Decisions. New precedent escalates toward the user. Specialized roles provide evidence but create no accepted Decisions.
- The direct parent authorizes replacement or ownership transfer. The same-role replacement receives the contract, branch/worktree, permissions, context, children, and unresolved state and tours it before continuing.

Output: recorded in [Roles and Ownership](roles-and-ownership.md).

#### PD-12 — Worker identity and lifecycle

Status: established

Input from PD-11: logical ownership survives reconstructed conversations; child events may wake a parent. Several Project Managers may exist concurrently. A replacement must retain the same role and tour transferred ownership state.

- What makes a worker logically persistent?
- Is a worker created for a project, delivery, feature, task, or invocation?
- Which identity and state survive process or model replacement?
- When does an agent become active, waiting, blocked, completed, failed, or disposed?
- Can responsibility transfer between agents?
- What state belongs to the agent versus its owned work?
- How is a worker reconstructed after restart?
- How are abandoned, superseded, or failed workers represented?

Decision summary:

- A logical worker is a stable identity distinct from model activations and conversation history. Replacement, restart, provider change, and context reconstruction preserve the same worker ID.
- Project Guides and Project Managers are created per conversation; Delivery Managers per Delivery, Feature Leads per Feature, Implementation Workers per Task, and specialized workers per bounded assignment.
- Project Manager branches isolate concurrent changes without reducing role or documentation authority. Later merges reconcile earlier accepted changes.
- Durable worker state includes role, hierarchy, owned contract/scope, branch/worktree, permissions, approved context, plan, progress, checkpoint, children, Findings, Reports, escalations, premise divergence, and lifecycle state.
- Canonical worker states are Active, Waiting, Paused, Blocked, Completed, Failed, and Disposed. There is no Dormant state; whether an activation is loaded is runtime detail.
- Waiting means active children exist and no useful independent work remains. Blocked is reserved for required human input. Completed workers report upward but may return to Active for new or corrective work.
- Failed records an external or mandatory-process failure that cannot be repaired in the current attempt; repair, retry, or replacement returns the same identity to Active.
- Worker state is separate from Task, Feature, and Delivery state; parents accept results and advance owned work.
- Reconstruction tours durable and actual state before Active work resumes. Child events can wake or reconstruct Waiting parents.
- Disposed follows a no-longer-needed Task or scope and is a soft delete by default. Restoration keeps the same identity and requires reconciliation before returning Active.
- Permanent deletion may remove worker-exclusive conversations, notes, checkpoints, and unreferenced artifacts. Project knowledge and de-associated aggregate timing, usage, error-rate, and reliability data may remain.

Output: recorded in [Worker Identity and Lifecycle](worker-identity-and-lifecycle.md).

#### PD-13 — Delegation rules

Status: established

Input from PD-12: every delegated Task has a stable worker identity whose progress and checkpoint survive activation replacement. Parent events wake Waiting workers, and disposal follows removal of the owned Task or scope.

- When should an agent delegate rather than implement directly?
- Who defines and validates the child contract?
- Can children delegate recursively?
- How are depth, concurrency, cost, time, and token budgets bounded?
- Does the parent wait or continue useful work?
- Can delegated work be cancelled, redirected, retried, or reassigned?
- What information returns to the parent?
- Who integrates or rejects the child result?
- How are duplicate or overlapping delegations prevented?

Decision summary:

- Implementation Workers delegate independently verifiable lower-level units while retaining and integrating the higher-level behavior. Existing suitable implementations are reused, and delegation may recurse under the same policy.
- Before delegation, the parent provides a bounded Task contract, relevant approved context, dependencies, permissions, expected evidence, and executable failing tests. The child tours the context, plans its implementation, and escalates incomplete or conflicting contracts rather than guessing.
- Every proposed child tree requires an approved delegation plan covering dependencies, parallelism, expected depth and worker count, scope reservations, branches and worktrees, tests, integration, and approximate time, token, and cost allowances.
- Fresh verification proxies act with the organizational parent's role and limited authority to approve delegation plans without bloating the persistent parent's context. Proxy provenance, inputs, decisions, rationale, and escalations remain auditable.
- A proxy may consult another fresh proxy or Oracle. Unresolved uncertainty advances through the persistent hierarchy to the user rather than creating an endless verification loop.
- Exceeding an approved plan pauses new delegation until a revised plan is approved; unaffected valid work may continue. Deep, highly parallel, unexpectedly expensive, or diverging trees receive broader Feature-level review.
- Active Tasks reserve files, Components, interfaces, or behavioral scope. Unplanned overlap pauses affected workers while their nearest common parent narrows, orders, combines, or explicitly integrates the work and obtains reapproval.
- Parents continue useful work and enter Waiting only when nothing useful remains while children execute.
- Child completion returns implementation and test references, verification evidence, Decisions, Findings, deviations, unresolved concerns, and branch, commit, and worktree details.
- Each coding Task normally has its own branch and worktree. The direct parent inspects, tests, commissions Reviewers where appropriate, evaluates Findings, and integrates accepted commits bottom-up.
- Rejected work returns to the same logical child for correction. Cancellation, redirection, retry, reassignment, pause, and resume preserve the established control and logical-identity contracts.

Output: recorded in [Delegation and Task Contracts](delegation-and-task-contracts.md).

#### PD-14 — Reporting and information compression

Status: established

- What must every child report?
- What evidence must remain inspectable?
- What details stay at the child level?
- How are risks and blockers prevented from being compressed away?
- What belongs in task, feature, delivery, and project summaries?
- Which conclusions become durable memory?
- Who performs and verifies knowledge promotion?
- How are conflicting reports reconciled?

Decision summary:

- Workers maintain a living progress/checkpoint record, append-only event records, and structured Completion Reports. Reporting occurs at meaningful work transitions rather than on a timer.
- Reports are canonical structured objects in the Project SQLite database and are rendered by the web application. DeepSeek Harness session logs retain raw conversations, tool activity, command output, discarded approaches, and other low-level evidence.
- Common Report data includes stable identity, type, lifecycle, producing worker, owning scope, relationships, summary, source and evidence references, relevant Findings and Decisions, deviations, unresolved concerns, risks, promotions, validation, and integration references.
- Task, Feature, Delivery, and Project summaries become progressively narrower: implementation detail compresses into Feature outcome, Delivery outcome, and finally durable Project impact.
- Reports move from Draft to Submitted and become Completed when their work crosses the relevant parent merge boundary. Parent-requested corrections before merge return the same Report to Draft. Completed Reports are immutable; later corrections use a new Task and Report linked to the original.
- A direct parent validates a Task Report and the Delivery Manager validates a Feature Report. As refined by PD-17, a Project Manager uses Delivery Manager evidence to modify Project documentation in its own branch, which the Delivery Manager integrates. The Delivery Manager never receives permission to author Project-documentation changes.
- Unresolved blockers, failed or skipped checks, material uncertainty, deviations, unresolved Findings, dangerous risks, approvals, Decision rationale, and future constraints cannot be compressed away while relevant.
- Routine or resolved detail stays at the source level. Rejected or resolved Findings may be omitted upward because Reports and execution logs remain inspectable.
- Ordinary Findings go to the direct parent, cross-scope risks reach all affected owners, and blockers or dangerous and human-authority matters bypass normal compression until resolved.
- Promotion may wait for ordinary merges. When earlier approval is required, ephemeral activations of the authoritative management role validate the Decision without waking or bloating the persistent agent; human-authority matters still reach the user.
- Conflicting Reports remain unpromoted while the parent gathers evidence and records a reasoned resolution. Higher summaries retain the accepted consequence rather than every rejected argument.

Output: recorded in [Reporting and Information Compression](reporting-and-information-compression.md).

### Phase 4 — Trustworthy execution

#### PD-15 — Context and memory

Status: established

Input from PD-12: context is reconstructed for the same logical worker from durable role, ownership, approved definitions, plan, progress, child Reports, Findings, escalations, branch/worktree, and permissions rather than requiring the previous conversation.

Input from PD-14: context can use structured SQLite Reports and living checkpoints while leaving raw conversations, tool activity, and routine resolved detail in DeepSeek Harness logs. Compression must retain unresolved blockers, failures, material uncertainty, deviations, risks, required approvals, Decision rationale, and future constraints.

- What context does each role receive?
- How are relevant files, documents, decisions, tests, and reports selected?
- Does a child inherit any parent context?
- How are context size and token budgets allocated?
- How is context provenance recorded and inspected?
- What becomes durable memory?
- When is conversation history retained, summarized, or discarded?
- How are stale, contradictory, or missing documents detected?
- Can an agent request additional context without gaining unrelated authority?

Decision summary:

- Default context includes role, permissions, assignment and applicable tests, relevant approved definitions and Decisions, development guidance, relationships, and a brief explanation of the parent's work and the assignment's purpose. Returning workers also receive their plan, progress, checkpoint, and unresolved issues.
- LazyCode supplies mandatory instructions; parents add necessary context and references. Large sources may be summarized and linked, without inheriting the entire parent conversation.
- Access is bounded to the assignment, relevant files, and development guidance. Small read expansions require a specific question and source request approved by an ephemeral parent activation; they grant no write authority.
- Larger Explorer or Oracle investigations follow PD-13 approval. Requests identify the precise question, Task relevance, available information, and remaining uncertainty. Related questions are grouped, prior answers reused, and unjustified repetition flagged.
- Summaries retain source references and exact versions or commits so stale information can be identified.
- Workers maintain durable progress throughout execution. Compaction may be worker-initiated between steps, requested at a warning threshold, or mandatory at a hard threshold. Exact thresholds and checkpoint reserves remain technical planning details.
- Compaction reconstructs a fresh activation of the same worker from its contract, plan, progress, checkpoint, Decisions, unresolved state, and selected evidence. The previous conversation stays in the execution log with excerpts retrievable as needed.
- A lightweight Reviewer checks the checkpoint against the contract, progress, relevant repository changes, and open child or alert state. It reports omissions for correction and escalates unresolved disagreements; it does not act as the parent approver.
- Documentation/code conflicts are recorded and escalated before relying on disputed interpretations. Unaffected work may continue.
- Context changes propagate from the responsible point down the existing worker hierarchy, including affected assumptions and plan steps. There is no separate update agent. Receiving workers reconcile their plans and checkpoints before continuing affected work.
- Worker memory supports continuity; canonical knowledge follows PD-14 promotion. Unresolved and consequential information required by PD-14 survives reconstruction.

Output: recorded in [Context and Memory](context-and-memory.md).

#### PD-16 — Permissions and escalation

Status: established

Input from PD-15: workers have bounded context access. Specific small read expansions use ephemeral parent approval without write permission; larger investigations use approved Explorer or Oracle delegation. Changed guidance propagates through existing owners and children.

Input from PD-11: role identity and allowed child roles are fixed while instructions, models, context, tools, permissions, and specialization are configurable. Only Implementation Workers modify implementation. Specialized roles provide evidence rather than accepted Decisions.

- Which capabilities exist?
- How are they scoped to files, commands, tools, services, repositories, and agents?
- What authority does each role receive by default?
- Which roles may grant, deny, or revoke authority?
- How do one-action, task, session, delivery, and permanent leases work?
- What happens when a permission is denied or unavailable?
- Which questions go to an Oracle, parent, or human?
- Can non-blocking work continue during escalation?
- How does a decision flow back to every affected agent and artifact?

Decision summary:

- Permissions govern a worker's own actions; authority governs what it may authorize for eligible children and their scope. Role restrictions remain the maximum boundary, including under standing Project permissions.
- Grants identify the action, resources, recipients, lifetime, and approving authority. Managers may authorize child implementation without holding permission to write code themselves.
- Grants support one action, the current Task's implementation/review/correction loop, a Delivery, or a standing Project rule. They follow logical work across compaction and activation replacement. Task grants expire at acceptance and merge; later corrective Tasks need their own or standing grants.
- Agents may grant temporary access within their authority. Standing permissions or expansion to future workers require user approval and eligibility rules.
- Delivery start authorizes routine capabilities within its approved plan and Project settings. Network, dependency, credential, and external-service access follows configured resources and actions; exceptions escalate before execution.
- Command approvals specify the command, arguments, working directory, and resources. Changed executable or script contents trigger a check that the approval still applies.
- Every use passes through a permission check. Revocation or narrowing applies at the next use, including derived descendant access, without interrupting ongoing work. Denials explicitly identify changed permissions.
- Escalations distinguish missing information, permission, and decision authority, potentially using one shared object with a type. Explorers and Oracles provide information; ephemeral authority-holder activations approve grants and Decisions within their authority.
- Escalations record the precise question/action, justification, affected work, evidence, attempted solutions, required authority, and work that may continue. Grant requests include scope and lifetime.
- After denial, a worker tries an authorized alternative, then may resubmit with additional reasons. If denied again, it may appeal directly to the Feature Lead, then Delivery Manager, then Project Manager, skipping consulted levels and using ephemeral verification activations with prior denial history.
- Appeals do not grant access by themselves. Human-authority matters reach the user; affected work waits and unrelated work continues.
- Permission history is inspectable. Worker pages distinguish current permissions from authority over child grants. Accepted guidance propagates through the existing hierarchy.

Output: recorded in [Permissions and Escalation](permissions-and-escalation.md).

#### PD-17 — Repository, workspace, and Git strategy

Status: established

Input from PD-16: Git and workspace actions require scoped grants. Task grants survive review and correction loops but expire at parent merge. Command approvals include arguments, working directory, and resources; changed scripts require approval-applicability checks. Revocation is enforced at the next use.

Input from PD-08: postponed and rejected planning retains draft reports and progress on a branch. Define retention and cleanup safeguards, planning-artifact integration, and reconciliation with active work without treating rejection as deletion.

Input from PD-09: Feature workers incorporate Delivery-branch changes into Feature branches. Completed Deliveries may form the base of later Deliveries before merge, enforcing merge order. Overlapping Deliveries require a user-started and approved conflict-resolution plan before later integration; it is never automatic.

Input from PD-10: the Feature Lead integrates Task branches into the Feature branch. Feature completion occurs before the Delivery Manager merges the Feature branch. Restoration, approval-invalidating changes, and split/combined replacement Features require branch inventory and reconciliation.

Input from PD-11: concurrent Project Managers use isolated branches or worktrees, and the later merge reconciles earlier changes. Ownership transfer moves the same-role worker's branch or worktree and responsibility state.

- Do agents share a working tree or use isolated worktrees?
- How is file ownership represented and enforced?
- Can agents write concurrently?
- Who creates branches, commits, merges, and cleans up worktrees?
- Who integrates child changes?
- How are conflicts, stale branches, and partial changes handled?
- Which Git actions require approval?
- What repository states must agents refuse to modify?

Decision summary:

- A Project may contain one main repository and secondary repositories. Shared Project documentation lives in the main repository; repository-specific guidance stays with its code. Monorepos are encouraged, while existing repository boundaries are supported.
- Features and Deliveries are shared logical work items with branches in each affected repository. Every Task belongs to exactly one repository. Feature Leads coordinate interfaces, versions, dependencies, and integration tests across repositories.
- Deliveries, Features, and coding Tasks use managed worktrees separate from the user's checkout. Git operations run through LazyCode with permission checks and recorded ownership.
- Project Managers author Project-documentation changes in their own branches; Delivery Managers integrate them. This replaces PD-14's direct-write arrangement on the Delivery branch without granting documentation-authoring permission to Delivery Managers.
- Parent-branch updates arrive as review comments with other corrections. Children reconcile before acceptance; urgent risks retain immediate propagation. Receiving owners coordinate conflicts through workers authorized to edit the content, escalating changes outside approved intent.
- Each branch has one editable implementation commit between boundaries. Child merges, parent merges, and successful pushes open a new commit slot. Merges are explicit; incoming condensed history is preserved. Published or parent-integrated commits remain unchanged.
- Changes require new test runs tied to the exact commit. Corrections return to the same logical Reviewer for follow-up with prior Finding dispositions; rejected Findings are not repeated without new evidence.
- Unexpected manual worktree edits stop affected and dependent operations and escalate directly to the user. Unrelated work continues.
- Accepted, integrated work is cleaned up after dependent execution ends and owned processes stop. Feature branches remain until Delivery integration. Obsolete Task descendants are cleaned up at Feature completion, discarding unmerged Task code; unmerged Feature or Delivery work is preserved recoverably before cleanup.
- Pushes require a user request. LazyCode may offer a push only after Delivery pause or completion.
- One user approval covers all affected repositories. Every required local merge must succeed before any requested push begins. Partial local integration and partial remote publication are tracked separately; Merged requires all local merges to succeed.

Output: recorded in [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md).

#### PD-18 — Scheduling, failure, and recovery

Status: established

Input from PD-17: multi-repository integration can partially succeed locally or remotely. All required local merges must finish before requested pushes begin. Recovery must retain per-repository outcomes and avoid repeating successful operations. Unexpected manual worktree edits stop affected work and escalate directly to the user.

Input from PD-12: canonical worker states distinguish Waiting for children, user-requested Paused, human-input Blocked, reusable Completed, recoverable Failed, and soft-deleted Disposed. Activation loading is not a state; reconstruction must tour actual and durable state.

- How are ready tasks selected and scheduled?
- How are dependencies and concurrency limits enforced?
- What happens after process interruption or machine restart?
- How are retries distinguished from duplicate work?
- Which failures are retryable, repairable, blocking, or terminal?
- How are hung or unresponsive agents detected?
- How are partial results and side effects recovered?
- When should responsibility be reassigned?

Decision summary:

- Parents define readiness, dependencies, and order through approved plans; LazyCode enforces dependencies, permissions, workspaces, and concurrency. Ready independent work starts as capacity becomes available without repeated parent authorization.
- Scheduling follows explicit Project or Delivery priorities, then favors work that unlocks dependencies, while ensuring other ready work eventually receives capacity.
- Capacity is reserved for Reviewers, permitted QA Testers, integration workers, and ephemeral escalation agents. These receive priority when branches wait, preventing implementation work from occupying every slot. Role and delegation restrictions still apply.
- Temporary failures receive bounded retries with increasing delays. Exhaustion reports the failed operation to the parent with diagnostics and progress rather than automatically terminating the Task.
- Operations with uncertain outcomes are inspected before retry. Confirmed successes are not repeated; unresolved uncertainty escalates. Multi-repository recovery preserves each merge and push outcome and the all-local-merges-before-push rule.
- Shared external failures are coordinated as one incident across affected workers, avoiding independent retry storms and duplicate alerts. Unaffected providers and work continue.
- Evidence of repeated failures, duplicate actions, circular delegation, or lack of progress is evaluated by an ephemeral parent activation. It may redirect, reconstruct, revise the Task, or escalate within its authority. Long execution alone does not establish a loop.
- Unexpected LazyCode or machine restart prompts the user to resume all interrupted work or none. Deliberately Paused and user-blocked work are excluded. Execution does not resume automatically.
- Recovery checks checkpoints, worktrees, processes, pending operations, permissions, and actual state before resumption. Unexpected changes and uncertain outcomes require resolution; manual worktree edits escalate directly to the user.
- Existing worker states and identities remain unchanged. Issues stop affected and dependent work where necessary; unrelated work continues. Detailed retry, reservation, incident, and recovery algorithms remain technical planning work.

Output: recorded in [Scheduling, Failure, and Recovery](scheduling-failure-and-recovery.md).

#### PD-19 — Review, testing, integration, and completion

Status: established

Input from PD-18: reserved capacity must keep review, permitted QA, integration, and ephemeral escalation available when implementation branches are waiting. Verification priority remains subject to role permissions and approved delegation plans.

Input from PD-10: Feature completion originally required every criterion to pass after child integration, review, tests, and a Feature Report. PD-19 refines this to allow the documented verification exceptions below. Delivery integration still follows Feature completion.

Input from PD-11: the parent, never the implementer, commissions independent verification and evaluates Findings. Reviewers report only and may delegate evidence work. Only Delivery Managers commission tightly scoped leaf Testers in isolated environments for human-like Delivery QA before user verification.

- What verification is required for tasks, features, and deliveries?
- How independent must Reviewers and Testers be?
- Who may reject work or require repair?
- How are findings returned to the responsible agent?
- How many repair cycles are allowed?
- Who integrates completed components and features?
- What constitutes acceptance at each hierarchy level?
- Who updates documentation and status?
- Who declares final completion to the human?

Decision summary:

- Coding Tasks run added/modified tests, the full unit suite in their repository, and internal integration tests using the real internal helper/service chain while mocking only application-external boundaries.
- Feature verification runs full applicable suites across every changed repository, including local dependency integration tests with containers and seeded data. Unchanged repositories do not need suite reruns.
- Live external regression tests follow settled review corrections and preceding checks, subject to documented exceptions. External tests being added or modified may run earlier as implementation work.
- Delivery Managers perform a fresh full test run against the integrated Delivery across its changed repositories, even if equivalent Feature evidence exists, before declaring completion.
- Parents select Reviewer specializations. Contract Reviewers receive Task requirements and relevant guidance/code/evidence without the implementer conversation; architecture, cleanliness, and safety Reviewers receive their own guidance and appropriate code context without automatic Task narratives.
- Corrections return to the same logical Reviewer with Finding dispositions. Rejected Findings are not repeated without new evidence. Parents evaluate Findings and direct corrections.
- New-work failures require correction; unexplained failures require investigation. Pre-existing failures require supporting evidence such as baseline reproduction. Established pre-existing and transient external-service failures do not stop Feature or Delivery progress, but remain failed or unverified in Reports and candidate review.
- External unavailability may leave even a critical new acceptance criterion unverified. The user may request a retest or approve merge with the failure, affected behavior, consequences, and decision documented. This refines earlier all-checks-must-pass completion wording.
- QA scenarios are planned before implementation and may evolve. Delivery Managers alone commission narrowly scoped Testers in isolated environments with the candidate, local dependencies, seeded data, access instructions, and expected outcomes.
- Corrections require full automated-suite reruns across affected repositories; QA revisits failed and potentially affected scenarios and may precede expensive retesting.
- Completion evidence and permitted exceptions accompany the combined multi-repository candidate for user approval. Report finalization and Git integration retain their established boundaries.
- Isolated execution and QA environment options will be evaluated separately in PD-26.

Output: recorded in [Review, Testing, Integration, and Completion](review-testing-and-completion.md).

### Phase 5 — Technical product definition

#### PD-20 — Models and provider routing

Status: not started

Input from PD-18: provider outages are shared incidents across affected workers with coordinated retry and recovery. Temporary failures use bounded retries with increasing delays; unaffected providers and work may continue. Verification and recovery need reserved capacity.

Input from PD-11 and PD-12: the nine role identities are fixed, but each role's model policy and specialization are configurable. Waiting or Completed logical managers may resume an existing model context or receive a reconstructed activation when children wake them.

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

Input from PD-07: research and POC artifacts are Git-tracked in `.lazycode/`, with associated metadata in the project's SQLite database. Define their canonical-data, synchronization, and portability relationship without assuming two independent sources of truth.

Input from PD-12: persist stable worker identity and reconstruction state separately from disposable activation and conversation data. Permanent deletion may erase worker-exclusive data while retaining project knowledge and de-associated aggregate metrics.

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

#### PD-26 — Isolated execution and QA environments

Status: not started

Added during PD-19; existing topic identifiers are retained. Discuss before finalizing the implementation roadmap.

Input from PD-19: Delivery Managers commission narrow QA scenarios in isolated environments containing the candidate, required local dependencies, seeded data, and access instructions. Scenarios vary by product, and QA may precede expensive regression reruns after corrections. The user has candidate tools or approaches to compare.

- Which environment options has the user identified, and how do they fit local operation?
- How are application versions from multiple repositories assembled into a candidate environment?
- How are browsers, local services, containers, seed data, and credentials supplied within approved permissions?
- What isolation does each Tester need, and what may be shared without interfering with another scenario?
- How are environment setup, reset, pause, recovery, and cleanup owned and controlled?
- How are live external tests distinguished from tests using local dependencies?
- What evidence and environment versions must remain available for reproducing QA Findings?
- Which approach should be implemented first, and what should remain deferred?

Output: environment architecture, option comparison, provisioning, isolation, and resource-lifecycle plan.

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
