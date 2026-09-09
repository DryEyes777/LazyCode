# Context and Memory

Status: established
Last updated: 2026-09-05

## Purpose

This reference defines the context workers receive, how they obtain additional information, how source provenance is retained, and how progress survives compaction. It also defines checkpoint review and the propagation of changed guidance. These are intended product contracts; the current read-only Explorer spike does not implement the complete context system.

## Initial context

Every worker receives:

- its role and permissions;
- its Task or assignment contract, including applicable tests;
- relevant approved definitions and Decisions;
- applicable project development guidance;
- parent and child relationships;
- a brief explanation of what its parent is doing and why this assignment is needed.

LazyCode supplies the mandatory role and project instructions. The assigning parent supplies relevant references and may add necessary information beyond the default context.

Large documents and Reports may be summarized with links to their sources instead of being loaded in full. The worker receives selected information rather than automatically inheriting the parent's conversation.

A returning worker also receives its current plan, recorded progress, checkpoint, and unresolved issues.

## Bounded context access

A worker accesses its assigned scope, relevant files, and project development guidance. The breadth of that scope follows its role and assignment. A narrow implementation assignment does not authorize exploration of the entire Project before starting work.

Workers consult LazyCode's project documentation first for recorded project knowledge. Missing documentation is not permission to broaden the assignment silently.

### Small expansions

When a small amount of additional context is needed, the worker requests access to specific files or documents and explains the question it needs answered.

An ephemeral activation acting with the parent's approval authority evaluates the request. An approved expansion grants the relevant read access; it does not grant permission to modify those sources.

### Larger investigations

Larger investigations use Explorers or Oracles through the delegation-plan approval process in [Delegation and Task Contracts](delegation-and-task-contracts.md).

Each request states:

- the precise question;
- why the answer matters to the Task;
- the information already available;
- what remains unknown.

Related questions are grouped where useful, and previous answers are reused when applicable. Repeated investigation without new justification is flagged to the parent. Specialist calls are subject to the approved delegation plan and its safeguards against duplication and excessive spawning.

## Source provenance

Every supplied summary identifies the source document or Report and the exact version or commit it describes. Source references remain inspectable within the worker's permissions.

This provenance allows LazyCode to detect stale summaries and allows workers to distinguish approved information from Findings, uncertainties, and proposed changes.

## Durable progress

Workers record progress throughout execution so a new activation can determine what is done and what remains.

The durable record includes the current plan, completed and unfinished work, child assignments, unresolved issues, and the relevant evidence or repository references needed to continue.

Updates follow the meaningful-transition reporting rules in [Reporting and Information Compression](reporting-and-information-compression.md). Checkpoint preparation builds on those records instead of relying on the old conversation as the only account of progress.

## Compaction triggers

Compaction may begin in three ways:

- the worker initiates it early at a suitable transition between steps;
- LazyCode requests it when context size reaches a warning threshold;
- a hard threshold requires compaction before further ordinary work.

The warning lets the worker reach a safe point. Early compaction lets it prepare for another substantial step without an avoidable interruption midway through that step.

Threshold values, model-specific sizing, and the capacity reserved for checkpoint preparation remain implementation details to define. The hard threshold must leave enough capacity to prepare the checkpoint.

## Reconstruction after compaction

Compaction starts a fresh activation of the same logical worker. Its identity, assignment, branch, worktree, and ownership continue under [Worker Identity and Lifecycle](worker-identity-and-lifecycle.md).

The new activation reconstructs its context from:

- the current contract and permissions;
- its plan and recorded progress;
- its checkpoint;
- relevant approved definitions and Decisions;
- child state and unresolved issues;
- selected evidence and repository references.

It tours the relevant actual state before resuming work, following the established reconstruction contract.

The prior conversation remains in the execution log. Specific excerpts may be retrieved when needed within the worker's access permissions, without loading the entire previous conversation by default.

## Checkpoint review

A lightweight, inexpensive Reviewer checks the proposed checkpoint for omissions. It receives:

- the Task contract;
- the current plan and progress;
- the proposed checkpoint;
- relevant repository changes;
- open child and alert state.

The Reviewer reports missing or inconsistent information for the worker to correct. Unresolved disagreements escalate to the parent.

The Reviewer does not take over the Task or act with the parent's approval authority. Commissioning follows the existing parent-owned verification rules in [Roles and Ownership](roles-and-ownership.md).

## Contradictory or stale information

When supplied documentation disagrees with code or another approved document, the worker records the discrepancy and escalates before relying on a disputed interpretation.

Unaffected work may continue. An Explorer or Oracle may investigate through the approved delegation process when additional evidence is needed.

## Propagating changed context

Updates from merges, approved changes, or user redirection originate at the point in the hierarchy responsible for the change. Existing workers propagate relevant consequences to their affected children.

For example, a Delivery Manager summarizes a merge into the Delivery branch or guidance received from the user. Each affected Feature Lead then communicates the consequences relevant to its own workers.

Each update identifies what changed and which assumptions or plan steps may be affected. Receiving workers reconcile their plans and checkpoints before continuing affected work.

This propagation belongs to the existing hierarchy; it does not introduce a separate update agent.

## Worker memory and canonical knowledge

Progress and checkpoints preserve worker continuity across activations. Accepted conclusions become canonical knowledge through the promotion and approval process in [Reporting and Information Compression](reporting-and-information-compression.md).

Raw conversations and routine execution detail remain in logs. Reconstructed context preserves the unresolved blockers, material uncertainty, failed or skipped required checks, risks, deviations, approval requirements, relevant Decision rationale, and future constraints that must survive compression under PD-14.

## Remaining implementation detail

The product policy is established. Later technical planning must define context sizing, warning and hard thresholds, checkpoint reserves, context selection and retrieval mechanisms, and enforcement of resource-scoped access.

Grant scope, lifetime, ephemeral approval, revocation, and appeals follow [Permissions and Escalation](permissions-and-escalation.md); their runtime enforcement remains technical planning work. Worktree databases, record versions, replication, and portable restoration follow [Persistence and Schemas](persistence-and-schemas.md). Concrete storage, synchronization, and log-retention mechanisms still require technical design.
