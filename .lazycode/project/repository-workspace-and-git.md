# Repository, Workspace, and Git Strategy

Status: established
Last updated: 2026-09-06

## Purpose

This reference defines repository membership, workspace ownership, Git controls, integration, commit history, verification after changes, cleanup, and remote publication. These are intended product contracts; the current delegation spike does not implement the complete workspace system.

## Project repositories

LazyCode recommends monorepos while supporting Projects whose software spans multiple repositories, such as separate application, infrastructure, or data-engineering repositories.

A Project designates one main repository and may include secondary repositories. The main repository holds canonical shared Project documentation under `.lazycode/`. Repository-specific development guidance lives alongside the code it governs and references the shared Project context.

Epics, Features, and Deliveries belong to the shared LazyCode Project. A Feature or Delivery has a corresponding branch in each repository it affects. Each Task belongs to exactly one repository and has its own branch, worktree, permissions, and commit lifecycle.

Feature Leads coordinate dependencies across repositories, including interfaces, versions, implementation order, and integration tests. Delivery Managers coordinate the combined Delivery. Completion requires the expected outcome across all affected repositories; Reports identify those repositories and the relevant commits.

## Workspace ownership

Deliveries, Features, and coding Tasks use managed branches and worktrees. Workers can run concurrently within their separate worktrees and granted scopes.

The user's existing checkout remains separate. Its uncommitted changes are not automatically included in agent work.

A child coding Task starts from its direct parent's branch in the assigned repository. The parent remains accountable for the combined result and integrates accepted child work into its own branch.

Project Managers make Project-documentation changes on their own branches and worktrees. The Delivery Manager integrates those branches into the Delivery. Project Managers retain authority to author Project documentation; Delivery Managers may integrate approved documentation commits but may not author changes to that content themselves.

This updates PD-14's earlier arrangement for Project Managers writing directly on the Delivery branch. The documentation still becomes part of the candidate the user reviews and approves.

## Git controls

Workers request Git operations through LazyCode. The runtime checks permissions and performs branch creation, commits, merges, pushes, and cleanup while recording ownership and lineage.

The responsible worker decides when an operation is needed and what belongs in it, within the approved work contract. Git actions remain subject to [Permissions and Escalation](permissions-and-escalation.md), including scoped grants, role boundaries, and permission checks on every use.

## Integration and synchronization

Each direct parent validates and integrates its children's work. Integration proceeds bottom-up through the Task, Feature, and Delivery hierarchy.

Relevant parent-branch updates are communicated as review comments alongside other requested corrections. Children incorporate those updates during their revision cycle and reconcile their branches before acceptance. Routine synchronization does not require an immediate notification when the parent changes.

Urgent risks and blocking changes retain the immediate propagation rules in [Reporting and Information Compression](reporting-and-information-compression.md).

The receiving branch's owner coordinates conflict resolution through workers authorized to edit the affected content:

- Implementation Workers resolve code conflicts;
- Project Managers resolve Project-documentation conflicts;
- management workers coordinate the intended result, verification, and integration.

Resolution outside approved intent requires escalation and reapproval. Reconciliation between overlapping Deliveries retains the user-started, reviewed conflict-plan approval process in [Delivery Planning](delivery-planning.md).

## Commit policy

Each branch has one editable implementation commit between integration or publication boundaries. Routine progress and review corrections amend that commit.

A new implementation-commit slot becomes available after:

- merging a child branch into the worker's branch;
- merging the parent branch into the worker's branch;
- successfully pushing the branch.

Without such a boundary, a leaf worker condenses its work and corrections into one commit. A worker with children may make its own implementation commit, integrate child work, and then begin another implementation commit, amending the latest commit until the next boundary.

Merges are explicit merge commits and retain the incoming branch's condensed history. Published commits and commits already integrated into a parent remain unchanged. Changes after a successful push create a new implementation commit instead of rewriting the published commit.

## Verification after changes

Tests must run again after changes. Previous results remain historical evidence but cannot validate the updated code.

Review and test evidence identify the exact commit examined. An amended commit has a new identity, and the evidence must distinguish it from the previous result.

Review corrections return to the same logical Reviewer for follow-up rather than automatically triggering a full new review. The Reviewer receives the changes and the disposition of its prior Findings. Rejected Findings include their rationale so they are not raised again without new evidence.

The parent retains responsibility for evaluating Findings and commissioning verification. If an activation must be replaced, the existing identity and reconstruction rules apply.

Findings discovered after parent integration follow the established corrective-Task and new-Report process. Accepted historical commits and Completed Reports are not rewritten to incorporate later corrections.

## Unexpected worktree changes

Unexpected manual edits in a managed worktree stop affected work and trigger direct escalation to the user. Operations that could overwrite or accidentally include those changes wait for direction.

Dependent operations also wait where necessary; unrelated Features and Deliveries continue. Expected uncommitted edits from the assigned worker remain part of normal execution.

## Cleanup and preservation

Accepted, integrated work triggers branch and worktree cleanup after dependent review or execution has finished and owned processes have stopped. Integrated work remains in the parent's Git history.

A Feature's own branch remains until integration into its Delivery. A Delivery's branch remains until its required integration or preservation obligations are satisfied.

Obsolete paused, abandoned, or rejected Task branches are cleaned up when their owning Feature completes. Unmerged Task code is discarded during that cleanup. These orphaned Task branches do not need to remain for later Findings, which create new corrective Tasks.

Unmerged Feature or Delivery work is preserved in a recoverable form before its active branch or worktree is removed. This applies when unfinished descendants are cleaned up with their owning work. The preservation mechanism remains for technical planning.

Paused, abandoned, or rejected work remains available until the applicable owner-completion cleanup or an explicit cleanup decision. Branch and worktree cleanup does not by itself delete durable Reports or logs; those continue to follow their established retention policies.

## Remote pushes

Pushes occur only when the user requests them. LazyCode may proactively offer a push only after a Delivery pauses or completes.

A successful push ends the current editable commit segment. Subsequent implementation changes create a new commit, preserving published history.

## Integration across repositories

One user approval covers the complete Delivery across all affected repositories. Each repository has its own target branch. The Delivery becomes Merged only after every required local repository merge succeeds.

Git does not provide an atomic merge across repositories. If one local merge fails, partial local integration remains visible and resumable; the overall Delivery must not be presented as fully Merged.

When the user requests merge and push, LazyCode completes all required local merges before starting any push. A local merge failure prevents all pushes in that operation until local integration is resolved.

Pushes to separate repositories can also fail independently. LazyCode tracks each push result and reports partial publication so the remaining pushes can be completed. Successful local integration does not imply that every remote was updated.

Reports and verification identify the combination of repository commits being evaluated, including cross-repository integration-test results. Report completion follows the required integration boundaries across all affected repositories under [Reporting and Information Compression](reporting-and-information-compression.md).

## Remaining implementation detail

The product rules are established. Technical planning must define branch naming, repository registration details, safe Git-operation mechanics, recovery storage for preserved Feature and Delivery work, and the implementation of command and resource controls.

Interruption recovery and retry behavior continue in `PD-18`; detailed review and acceptance mechanics continue in `PD-19`; physical persistence and retention mechanics continue in `PD-21`.
