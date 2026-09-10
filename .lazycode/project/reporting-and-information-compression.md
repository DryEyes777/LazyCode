# Reporting and Information Compression

Status: established
Last updated: 2026-09-05

## Purpose

This reference defines LazyCode's reporting channels, logical Report schema, validation lifecycle, upward compression, urgent propagation, knowledge promotion, and conflict resolution. These are intended product contracts. The current spike does not yet implement the planned SQLite-backed reporting system.

## Core principles

Reporting is structured and event-driven.

Information becomes progressively more concise as it moves upward, but unresolved information that can change safety, correctness, authority, or the outcome remains visible.

Routine execution history stays inspectable without being copied into every parent Report or context.

## Reporting channels

Each worker maintains three forms of reporting.

### Progress and checkpoint state

A living record used for supervision and context reconstruction. It tracks:

- the current plan;
- completed steps;
- active work;
- next steps;
- child state;
- current blockers, escalations, or other matters needing attention.

### Event records

Immediate records for meaningful events, including:

- blockers and failures;
- escalations;
- important Findings;
- contract or premise divergence;
- cross-scope risks;
- changes that affect the worker's plan or recovery state.

Event records are append-only and may later be marked acknowledged or resolved. They are not erased merely because their immediate effect has ended.

### Completion Reports

Structured results submitted when a worker believes its owned work is ready for direct-parent validation and integration.

## Reporting triggers

Reporting does not run on a timer. A worker updates its reporting state when the work reaches a meaningful transition, including:

- after planning;
- when starting or completing a significant step;
- when a child changes state;
- when a Finding, divergence, blocker, or escalation appears;
- before entering Waiting or Paused;
- before context replacement or activation release;
- before reporting completion or failure.

This preserves useful checkpoints without interrupting work to produce low-value periodic summaries.

## Storage model

Reports are canonical structured SQLite objects in the relevant worktree database. The LazyCode web application interprets those objects and renders human-facing views; Reports do not require parallel presentation-oriented Markdown files. Worktree copies and live replicas retain explicit authorship and versions under [Persistence and Schemas](persistence-and-schemas.md).

Ownership remains logical:

- Reports associated with a Feature belong to that Feature;
- Delivery-wide Reports belong at Project level and reference their Delivery and Feature Reports;
- project research and Reports without a Feature owner belong at Project level.

Progress/checkpoints, alerts, escalations, and submitted Reports may replicate to parent databases before integration. Each record has one authoritative author; parent evaluations are separate. Pending delivery survives replication failure, retries avoid duplicates, and parents acknowledge stored IDs and revisions. Accepted records remain durable after child cleanup. Exact tables and synchronization algorithms remain technical planning work.

DeepSeek Harness's append-only session log retains raw execution history. It is the inspectable source for conversations, tool activity, complete command output, discarded approaches, rejected hypotheses, and other routine development detail that does not belong in a canonical Report.

Those raw logs remain installation-local. Portable Reports must retain the conclusions and necessary evidence independently, including Git-tracked attachments where appropriate. A restored Project must distinguish unavailable local history from its retained project evidence.

Raw logs follow [Observability and Auditability](observability-and-auditability.md), including cleanup after Delivery merge and protection of history still needed by active work. Durable action summaries remain after cleanup and identify when underlying raw details are unavailable.

## Common Report contract

Every Completion Report has these common data elements:

- stable Report ID;
- Report type;
- lifecycle state;
- producing worker ID;
- owning Feature or Project;
- related Task, Feature, and Delivery IDs;
- creation and submission timestamps;
- outcome summary;
- source Report IDs;
- evidence references;
- relevant Findings and Decisions;
- contract or premise deviations;
- unresolved concerns;
- active risks or blockers;
- proposed knowledge promotions;
- validation history;
- branch, commit, worktree, and integration references when applicable.

Storage ownership, replication, and checkpoint policy follow [Persistence and Schemas](persistence-and-schemas.md). This contract defines the information the system must represent; physical table normalization remains technical planning work.

## Report hierarchy

### Task Report

A Task Report contains:

- the Task contract result;
- changed artifacts;
- implementation detail required for integration;
- tests and verification results;
- relevant child outcomes;
- Decisions and Findings;
- deviations and unresolved concerns;
- integration references;
- proposed durable knowledge.

### Feature Report

A Feature Report contains:

- the user-visible outcome;
- acceptance-criterion coverage;
- integrated Task outcomes;
- the implementation approach;
- schema, interface, and operational changes;
- review results;
- testing instructions and evidence;
- known limitations and remaining risks;
- consequences for the Delivery or Project.

### Delivery Report

A Delivery Report contains:

- the combined outcome;
- included Features;
- integration and QA results;
- user testing instructions;
- known limitations and unresolved alerts;
- merge dependencies;
- proposed project-documentation changes;
- Delivery-candidate readiness.

### Project summary or update

A Project summary or update contains only accepted durable consequences:

- current product behavior;
- architecture and operational knowledge;
- accepted Decisions;
- Epic and roadmap progress;
- links to supporting Reports and evidence.

## Report lifecycle

```text
Draft -> Submitted
Submitted -> Draft when corrections are requested
Submitted -> Completed when the work crosses its parent integration boundary
```

A Draft Report evolves with its work. Submission asks the direct parent to inspect and validate the work.

If the parent rejects the result before integration, the same Task and Report return to Draft with actionable corrections.

A Report becomes Completed when its associated work is accepted and merged across the relevant parent boundary:

- a Task Report completes when the Task branch merges into its parent branch;
- a Feature Report completes when the Feature branch merges into the Delivery branch;
- a Delivery Report completes when the approved Delivery merges into its target branch;
- Project-level changes produced during a Delivery live on the Delivery branch and complete with the approved Delivery merge.

For a Feature or Delivery spanning repositories, the required integration boundary must succeed across all affected repositories. Reports identify each repository and commit under [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md).

A Completed Report is immutable.

If a later review discovers a problem after that integration boundary, LazyCode creates a corrective Task with a new Report. The new Report references the earlier Report and the Finding that caused the correction. Completed historical Reports are not rewritten to represent later code or conclusions.

## Validation ownership

Verification records distinguish passed checks, failed checks, and unverified criteria. Permitted pre-existing or transient external-service exceptions retain classification evidence, affected behavior, consequences, and the user's retest or acceptance decision under [Review, Testing, Integration, and Completion](review-testing-and-completion.md). These unresolved limitations remain visible through compression and promotion.

Report validation follows the organizational hierarchy:

- the child writes its Task Report and the direct parent validates it;
- the Feature Lead writes the Feature Report and the Delivery Manager validates it;
- the Delivery Manager writes the Delivery Report and supplies proposed Project consequences;
- a Project Manager uses that information to update canonical Project documentation in its own branch, which the Delivery Manager integrates into the Delivery branch;
- the user approves the implementation, Reports, and resulting Project-documentation changes together as the Delivery candidate.

The Delivery Manager may read Project documentation and integrate its approved commits, but never receives permission to author modifications to it. Project-documentation write authority remains with the Project Manager.

## Upward compression

Information is compressed by organizational scope:

```text
Task result
  -> Feature outcome
    -> Delivery outcome
      -> durable Project impact
```

The following normally remain at the worker or source-Report level:

- raw conversation;
- individual tool calls;
- complete command output;
- abandoned approaches;
- rejected hypotheses;
- resolved or rejected Findings;
- local implementation detail that does not affect a parent contract.

They may be omitted from higher-level Reports while their retained history remains inspectable through source Reports or execution logs. Raw details are subject to the retention policy; durable summaries and required evidence must not depend on logs scheduled for cleanup.

The following must not be compressed away while relevant:

- unresolved blockers;
- failed or skipped required checks;
- material uncertainty;
- contract or premise deviations;
- unresolved Findings;
- security, safety, privacy, or data-loss risks;
- required approvals;
- Decisions and the rationale needed to understand them;
- constraints that affect future work.

Parent Reports reference their underlying Reports and evidence rather than duplicating their full contents.

## Urgent propagation

Ordinary Findings go to the direct parent for evaluation.

Cross-scope risks immediately reach every affected Feature or Delivery owner.

Blockers, security or safety concerns, data-loss risks, and questions requiring human authority bypass ordinary compression. They remain explicitly visible at every affected higher level until resolved.

Once a Finding is rejected or resolved, it may disappear from higher-level summaries. Its retained history is accessible from its source Report or execution log; the interface identifies raw details removed under the retention policy.

## Knowledge promotion

Workers propose durable conclusions, while the owner of the receiving artifact validates and incorporates them:

```text
Implementation Worker proposes
  -> Feature Lead validates and updates Feature knowledge
    -> Delivery Manager validates Delivery consequences
      -> Project Manager validates and updates Project knowledge
        -> user approves through the Delivery candidate
```

Promotion need not wake every persistent higher-level agent when a conclusion is first discovered. Information may move upward during ordinary branch integration.

When a Decision requires approval before the next regular merge, LazyCode may create an ephemeral activation of the authoritative Feature Lead, Delivery Manager, or Project Manager. The activation evaluates the Decision under that role's authority without adding the validation context to the persistent worker's conversation.

The audit history records the approving activation, evidence, Decision, rationale, and exercised authority. Anything requiring human authority still escalates to the user.

A conclusion is promoted only when it is accepted and affects future work outside the reporting worker's completed scope. Local details that do not alter a contract, architecture, dependency, operation, or future Decision remain in the Task Report or execution log.

## Conflicting Reports

Conflicting Reports are preserved at their owning level while the conflict remains active. The disputed conclusion cannot be promoted.

The responsible parent gathers additional evidence and may commission an Explorer, Reviewer, or Oracle. Resolution is recorded as a Decision with its evidence and rationale.

If approved information cannot resolve the conflict, it escalates through the authority hierarchy and eventually to the user.

After resolution, higher-level summaries retain the accepted consequence without carrying every rejected argument. Rejected and resolved detail remains inspectable in the source Report or execution log.

## Boundary with later definitions

Initial context, source provenance, progress-based reconstruction, compaction, and updates through the worker hierarchy are established in [Context and Memory](context-and-memory.md).

Permission-decision history, ephemeral approval, and appeal routing follow [Permissions and Escalation](permissions-and-escalation.md); runtime enforcement remains future work.

This document establishes logical Report objects and information flow. It does not yet settle:

- physical verification-evidence schemas;
- exact runtime scheduling and resource-allocation algorithms, under the policy in [Scheduling, Failure, and Recovery](scheduling-failure-and-recovery.md);
- concrete database schemas and implementation of migrations, Git checkpoints, and synchronization under [Persistence and Schemas](persistence-and-schemas.md).
