# Delegation and Task Contracts

Status: established
Last updated: 2026-09-04

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

The parent is responsible for ensuring the tests exist before implementation is delegated. A non-implementing parent may commission permitted test preparation rather than authoring implementation code itself.

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

It enters `Waiting` only when active children remain and no useful independent work is available. Child completion, escalation, Finding, or other coordination event reactivates or reconstructs the same logical parent worker.

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

Detailed reporting and upward information compression are refined in `PD-14`.

## Verification and integration

Every coding Task normally receives its own branch and worktree, based on the direct parent's branch. The child commits only its owned Task result there.

When the child reports completion, its direct parent:

1. inspects the returned work and evidence;
2. runs the relevant tests;
3. commissions independent Reviewers when appropriate;
4. evaluates all Findings;
5. accepts the result or returns actionable corrections;
6. integrates accepted commits into the parent's branch.

Integration proceeds bottom-up through the Task tree. A parent cannot report its own Task complete until accepted child work has been integrated and the combined result satisfies the parent's contract.

If the result is rejected, corrections return to the same logical child worker. The child retains its Task, identity, branch, worktree, and durable progress through the repair loop. It may report completion again only after addressing the accepted Findings and rerunning its verification.

## Cancellation, redirection, retry, and reassignment

Delegated work follows the control rules in [Human Control and Autonomy](human-control-and-autonomy.md) and the identity rules in [Worker Identity and Lifecycle](worker-identity-and-lifecycle.md).

- **Cancellation:** the affected Task and unnecessary descendants stop safely and become Disposed by default; their branches and history remain available under the soft-delete policy.
- **Redirection:** affected workers pause safely, their contracts and delegation plans are revised, and changed delegation is reapproved. Unaffected work may continue.
- **Retry:** the same logical worker resumes from its durable state and worktree after touring current state.
- **Reassignment or activation replacement:** the parent authorizes transfer, while the same logical worker ID, role, contract, branch, worktree, plan, progress, children, and unresolved state are preserved.

Forced stop, graceful pause, and resume propagation retain the previously established parent-child behavior.

## Boundary with later definitions

This document establishes delegation planning and child-work lifecycle. It does not yet settle:

- detailed Report schemas and compression rules (`PD-14`);
- context selection and memory budgets (`PD-15`);
- capability leases and permission escalation (`PD-16`);
- exact verification evidence and acceptance mechanics (`PD-19`);
- runtime scheduling and resource-allocation algorithms (`PD-20`).
