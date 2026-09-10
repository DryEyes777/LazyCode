# Observability and Auditability

Status: established
Last updated: 2026-09-10

## Purpose

This reference defines inspection of current work, linked action history, usage attribution, actionable alerts, raw-history retention, and cleanup safeguards. These are intended product contracts; the current delegation spike does not implement the full inspection and retention system.

## Inspecting current work

The interface explains why work is not progressing and what would allow it to continue. Reasons may include a child result, review capacity, provider recovery, permission resolution, or user input.

These explanations supplement the existing worker lifecycle states; they do not introduce new states.

Automatically observed runtime activity is displayed separately from the worker's last reported progress, with update times. A worker may be running tests while its last checkpoint describes the preceding implementation step.

Stale checkpoints and delayed replicated information must not appear current. Agents do not need to generate Reports on a timer to support runtime inspection.

The main interface remains focused on Deliveries and their owned work under [Interaction Surface](interaction-surface.md).

## Linked action history

Important actions form a navigable history connecting user requests, Decisions, Task changes, permissions, implementation, verification, and integration.

Entries identify the responsible logical worker and activation, including ephemeral agents, and link to available source evidence.

The main views emphasize work, outcomes, and actionable information. Conversations and detailed tool activity remain expandable rather than being the default supervision surface.

Durable action summaries remain distinct from the local raw execution history. The summary must not imply that a linked conversation or log is available when it has been cleaned up or belongs to another installation.

## Usage attribution

Every agent's usage is inspectable.

Each Task shows two totals:

- **Direct usage:** its assigned worker and agents supporting that Task, including its Reviewers.
- **Subtree usage:** its direct usage plus descendant Tasks and their supporting work.

Usage follows the work being supported, not merely the agent that commissioned it. A Reviewer spawned by a parent to check a child Task counts toward the child Task's usage.

A review spanning multiple Tasks runs against their integrated result in the parent's branch. Its usage belongs to that parent rather than being charged in full to every child. It does not require one Reviewer to operate across multiple child worktrees.

Features, Deliveries, and the Project show complete totals. Project-level Guide and planning activity contributes to the Project total rather than being assigned to an unrelated Task or Delivery.

Each activation's usage, including retries and ephemeral agents, is counted once. Replicated database records, parent summaries, and intermediate rollups do not add duplicate consumption. Parent totals include the appropriate child contributions without adding overlapping subtotals twice.

Estimates, provider-reported values, and unavailable data remain distinguishable under [Models and Provider Routing](models-and-provider-routing.md).

## Alerts

The user's alert queue includes unresolved failures, required decisions, capability gaps, verification exceptions, and significant risks.

Routine retries and events resolved internally remain inspectable in history without generating separate user alerts. Shared failures, such as a provider outage, appear as one incident identifying affected workers.

Existing consulted, unresolved, and resolved alert behavior remains as defined in [Interaction Surface](interaction-surface.md). Acknowledging an alert does not resolve the underlying issue.

Reports and unresolved limitations continue to follow [Reporting and Information Compression](reporting-and-information-compression.md), including the requirement not to hide material unresolved information through compression.

## Raw-history retention

Delivery-associated conversations and execution logs are cleaned up after the Delivery is **Merged**, subject to the cleanup safeguards below. Reaching Completed or entering user review is not the cleanup trigger.

Independent Project-documentation and Feature-planning history can be cleaned up when their branches merge into the base. Work associated with a Delivery retains the Delivery merge boundary.

Project Guide history has a separate, potentially limited retention policy informed by measured storage costs. Exact limits remain open.

When history becomes large, LazyCode may offer earlier cleanup. Only the user may initiate that manual cleanup. Such an offer does not itself authorize deleting history before its normal retention boundary.

These rules concern raw conversations and execution logs. They do not automatically delete durable Reports, Decisions, required attachments, or retained usage records.

## Cleanup safeguards

Before cleanup, necessary conclusions, evidence, and recovery state must be durably recorded.

History still required by active workers or ongoing review is preserved. A merge-triggered cleanup must account for those dependencies before removing raw details.

Manual cleanup shows what will be removed and what will remain. Required portable evidence follows [Persistence and Schemas](persistence-and-schemas.md); branch and worktree cleanup remains the separate process in [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md).

Linked audit views preserve durable action summaries after raw details disappear. Unavailable details are explicitly marked as cleaned up or unavailable on the current installation. A missing raw log is not represented as an empty history proving that no action occurred.

## Remaining implementation detail

Detailed retention limits, storage thresholds, event correlation, audit schemas, and aggregation implementation remain technical planning work.

Redaction and protection of sensitive information continue in `PD-24 — Security and trust`.
