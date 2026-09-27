# Delegation and Task Contracts

Status: established
Last updated: 2026-09-15

## Purpose

This reference defines when LazyCode workers delegate, how they create and approve child Task contracts, how recursive delegation is bounded, and how child work is verified and integrated. These are intended product contracts, not a claim that the current spike implements the complete delegation system.

## Core principles

Delegation is planned, test-backed, recursively verifiable, and isolated through branches and worktrees.

A child reporting completion does not make its work accepted. Its direct parent remains accountable for inspecting, verifying, and integrating the result.

Delegation changes who performs a bounded Task; it does not transfer the parent's responsibility for the combined result.

## When to delegate

An Implementation Worker should delegate when its Task can be decomposed into independently verifiable units.

For example, a worker implementing a higher-level operation retains ownership of that operation while delegating distinct helpers or lower-level behaviors. The parent implements and integrates the higher-level behavior; each child owns one narrower contract.

Existing suitable implementations are reused instead of creating unnecessary Tasks.

Helpers should normally live in separately owned files. The coding parent retains the orchestration method and its tests while children implement bounded helper contracts. Parent-authored behavioral contract tests are available to children for execution and inspection but remain outside their write scope. Children may add their own tests without weakening that contract.

Recursive delegation is allowed. An Implementation Worker may subdivide its Task into child Tasks, whose workers may apply the same rule again. Delegation stops when further subdivision adds more coordination cost, duplication, or risk than useful isolation.

## Child Task contract

Before starting a child, the parent provides a contract containing:

- the objective and boundaries;
- relevant approved requirements and Decisions;
- expected inputs, outputs, and behavior;
- executable failing tests that demonstrate the required behavior;
- relevant dependencies and integration expectations;
- allowed resources, tools, files, Components, branch, and worktree;
- expected deliverables and verification evidence;
- the escalation route.

The parent is responsible for ensuring executable tests exist before target implementation is delegated. Test authoring is ordinary Implementation Worker work within Features and Deliveries, not a separate assignment category.

When those executable contracts do not yet exist, a non-coding manager may bootstrap them through an ordinary test-authoring Task based on approved written requirements and interfaces. That worker may author tests and necessary test scaffolding, but not implement the target behavior. Independent review validates the tests against the approved contract; the parent accepts them before delegating implementation with those tests outside the implementer's write scope. This narrowly bounded test-authoring Task does not itself require pre-existing executable tests for the behavior it is specifying. Coding parents continue authoring tests for their delegated helpers normally. Feature plans must specify the concrete ordering and ownership; managers still do not code.

The child reviews the contract, tours the relevant context and repository state, and creates an implementation plan before changing code. It may add tests for discovered edge cases, but it may not remove, weaken, or replace the tests supplied by the parent merely to make its implementation pass.

If the contract is incomplete, contradictory, infeasible, or inconsistent with approved information, the child escalates instead of guessing.

## Delegation plan

A worker planning to create children records the proposed delegation before starting them. The plan includes:

- the proposed Task tree;
- the responsibility retained by the delegating worker;
- dependencies and execution order;
- parallel execution groups;
- expected depth and worker count;
- scope reservations;
- branch and worktree arrangement;
- test and integration contracts;
- approximate time, token, and cost allowances;
- conditions that require replanning.

The plan must be approved before its child workers start.

These limits are specific to the approved plan rather than universal limits imposed on every project. Creating additional Tasks or exceeding approved depth, concurrency, time, token, or cost allowances pauses further delegation until a revised plan is approved. Existing work that remains within its valid contract may continue.

## Ephemeral verification proxies

Delegation plans are approved by a fresh, temporary activation acting as the plan author's organizational parent. This **verification proxy** receives the parent's role, applicable instructions, approved knowledge, and limited authority to approve or reject that specific plan.

The proxy acts on behalf of the parent without changing the durable worker hierarchy. It is not a new permanent parent, does not retain ownership after the decision, and does not add its review context to the persistent parent's conversation.

The audit history separately records:

- the persistent worker on whose behalf the proxy acted;
- the proxy activation;
- the plan and evidence it received;
- its decision and rationale;
- any escalation it initiated.

If a proxy cannot approve a plan, it may request a second opinion from another fresh proxy or an Oracle. If the issue cannot be resolved from approved information, it follows the persistent escalation hierarchy and eventually reaches the user. Validation may not recursively summon opinions without progress; repeated uncertainty advances the escalation instead.

Deep, highly parallel, unexpectedly expensive, or diverging delegation triggers a broader Feature-level review of the complete Task tree, overlap, cost, and architectural fit.

## Scope coordination

Active Tasks reserve their intended files, Components, interfaces, or behavioral scope. A reservation exposes likely collisions; it is not an exclusive permission when planned integration requires overlap.

Planned overlap must have an explicit integration contract.

When unplanned overlap is detected:

1. Affected workers pause at a safe point.
2. Their nearest common parent evaluates the overlap.
3. The parent merges or reorders the Tasks, narrows their boundaries, or defines an explicit integration contract.
4. Any resulting delegation-plan change is reapproved before affected delegation resumes.

## Parent behavior while children work

A parent continues any useful authorized planning, coordination, verification, integration, or independent work while its children execute.

It enters `Waiting` when unfinished child work remains and no useful independent work is available, including when children await allocation. Child completion, escalation, Finding, or other coordination event reactivates or reconstructs the same logical parent worker.

## Child completion contract

A child that considers its Task complete returns:

- a concise parent-facing summary;
- implementation and test references;
- verification commands and results;
- Decisions made within its authority;
- Findings discovered;
- deviations from the original contract or premise;
- unresolved concerns;
- branch, commit, and worktree information needed for integration.

Detailed schemas, validation lifecycle, storage contract, and upward compression follow [Reporting and Information Compression](reporting-and-information-compression.md).

## Verification and integration

Every coding Task normally receives its own branch and worktree, based on the direct parent's branch. The child commits only its owned Task result there.

Each Task belongs to one repository even when its Feature spans several. Managed Git controls, the single editable commit between merges or pushes, explicit merge commits, synchronization through review comments, and cleanup follow [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md).

When the child reports completion, its direct parent:

1. inspects the returned work and evidence;
2. runs the relevant tests;
3. commissions independent Reviewers when appropriate;
4. evaluates all Findings;
5. accepts the result or returns actionable corrections;
6. integrates accepted commits into the parent's branch.

Integration proceeds bottom-up through the Task tree. A parent cannot report its own Task complete until accepted child work has been integrated and the combined result satisfies the parent's contract.

If the result is rejected, corrections return to the same logical child worker. The child retains its Task, identity, branch, worktree, and durable progress through the repair loop. It may report completion again only after addressing the accepted Findings and rerunning its verification.

The same logical Reviewer performs follow-up on corrections with the previous Findings and their dispositions. New test results must identify the updated commit; earlier results cannot validate changed code.

## Compositional review

A Reviewer evaluates the contribution owned by its target worker. Accepted child implementation and child-authored tests are not routinely re-reviewed at every ancestor. Parent review instead covers the parent's orchestration, contract tests, arguments, sequencing, error handling, and interactions with the accepted helpers.

The parent-facing review packet separates authored changes from inherited child work. It carries the relevant child contracts, exact accepted versions, content identifiers, review references, test evidence, and unresolved Findings. Attribution follows recorded ownership, baselines, and integration history rather than commit-author names. Unattributed changes remain visible for review.

Child evidence remains reusable only while its accepted implementation and relevant contract remain intact. Changes to helper code, interfaces, or merge resolutions invalidate coverage for the affected changes and require targeted review. A concrete suspected defect or integration failure can justify an explicitly recorded review-scope expansion; it does not trigger an automatic broad review of every helper.

Narrow review scope does not narrow required integration testing. Parents continue exercising real helper chains under the existing test-layer rules and remain responsible for the combined result. Completion-level review assesses acceptance, composition, new integration changes, and evidence without duplicating intact child-internal reviews. These rules apply recursively through the Task tree.

Task test layers, full-suite requirements, Reviewer specializations, and permitted verification exceptions follow [Review, Testing, Integration, and Completion](review-testing-and-completion.md).

## Cancellation, redirection, retry, and reassignment

Delegated work follows the control rules in [Human Control and Autonomy](human-control-and-autonomy.md) and the identity rules in [Worker Identity and Lifecycle](worker-identity-and-lifecycle.md).

- **Cancellation:** the affected Task and unnecessary descendants stop safely and become Disposed by default; their branches and history remain available under the soft-delete policy.
- **Redirection:** affected workers pause safely, their contracts and delegation plans are revised, and changed delegation is reapproved. Unaffected work may continue.
- **Retry:** the same logical worker resumes from its durable state and worktree after touring current state.
- **Reassignment or activation replacement:** the parent authorizes transfer, while the same logical worker ID, role, contract, branch, worktree, plan, progress, children, and unresolved state are preserved.

Forced stop, graceful pause, and resume propagation retain the previously established parent-child behavior.

## Boundary with later definitions

Initial context, read-expansion approval, specialist investigation requests, compaction, and checkpoint review are established in [Context and Memory](context-and-memory.md).

Grant authority, scope, lifetimes, revocation, and permission appeals are established in [Permissions and Escalation](permissions-and-escalation.md); runtime enforcement remains future work.

Runtime admission against approved plans, priorities, reserved verification capacity, failure handling, and restart recovery follow [Scheduling, Failure, and Recovery](scheduling-failure-and-recovery.md). Exact scheduling and resource-allocation algorithms remain technical planning work.

This document establishes delegation planning and child-work lifecycle. It does not yet settle:

- physical verification-evidence schemas (`PD-21`);
- concrete model capabilities and provider-adapter implementation, under the policy in [Models and Provider Routing](models-and-provider-routing.md).
