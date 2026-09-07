# Models and Provider Routing

Status: established
Last updated: 2026-09-07

## Purpose

This reference defines model configuration, portable identities, parent selection, availability fallback, exceptional reassignment, Reviewer model policy, and execution evidence. These are intended product contracts; the current delegation spike does not implement the complete routing system.

## Configuration and selection

LazyCode provides installation-wide defaults, Project overrides, and configurations for each role or specialization.

A role may have several approved configurations. The parent chooses among them according to the assignment's difficulty, scope, and required capabilities.

Each configuration includes:

- model identity;
- provider-route requirements or preferences;
- supported reasoning settings;
- context limits;
- an ordered list of permitted fallbacks;
- a description of capabilities and intended use cases.

Selection follows the established priority: quality first, affordability second, speed third. Descriptions help parents select an appropriate approved configuration for narrow or demanding work.

## Portable model references

Projects use model identifiers with consistent meaning across installations. Model identity is separate from local provider connections and credentials.

Each installation resolves the requested configuration through its available connections. Routing the same model through another supported provider is distinct from substituting a different model. A different model must be an approved fallback rather than silently resolving as the requested identity.

If a required configuration cannot be resolved or accessed and no approved fallback is available, affected work cannot start. The user resolves the problem by configuring access, correcting the mapping, or changing the approved model or fallback policy.

Project overrides remain portable policy. They do not imply that another installation has the necessary provider access.

The identifier format, catalog maintenance, and supported route mappings remain for technical planning.

## Availability fallback

Each configuration defines an ordered fallback list. LazyCode may switch automatically only to listed, approved alternatives when availability requires it.

If no approved alternative is available, the retry, shared-outage, and escalation rules in [Scheduling, Failure, and Recovery](scheduling-failure-and-recovery.md) apply. Unaffected work may continue.

A fallback preserves the worker's logical identity, assignment, role, permissions, and organizational obligations. Context reconstruction must fit the selected model's configured limits under [Context and Memory](context-and-memory.md).

## Difficulty and exceptional reassignment

A worker struggling with its assignment requests guidance from an ephemeral parent activation. The normal response is better guidance, investigation, or Task decomposition.

The worker does not request a stronger model as its ordinary remediation path.

If the execution attempt fails because the worker cannot complete the assignment, the parent may exceptionally select a stronger approved configuration or subdivide the work further.

Reassignment keeps the same logical Task and worker identity, progress, and environment. The new activation receives the existing work state and reconciles it before continuing. Subdivision creates new child Tasks and worker identities through the approved delegation process.

The failed attempt is not treated as automatic abandonment of the logical Task. Identity continuity follows [Worker Identity and Lifecycle](worker-identity-and-lifecycle.md).

## Reviewer model policy

Reviewers normally use the same model as the implementer, keeping review cost proportionate to the assignment.

For the most expensive implementation configurations, policy may instead select the strongest approved review configuration at a lower cost.

Review independence comes from the Reviewer's separate responsibility, guidance, and context. A different model family is not universally required. Reviewer context and follow-up behavior remain governed by [Review, Testing, Integration, and Completion](review-testing-and-completion.md).

## Policy changes

Changes to Project model policy apply to newly started workers by default.

Existing logical workers retain their recorded configuration unless:

- the user explicitly requests a change;
- an approved availability fallback occurs;
- the parent authorizes exceptional reassignment after failure.

Compaction or activation replacement does not by itself make a worker newly created for policy selection. Retaining a configuration does not override current access permissions.

## Execution evidence

Each activation records both the requested configuration and the actual model and provider used, together with:

- fallback or reassignment reasons;
- effective reasoning settings;
- token usage;
- cache usage where available;
- runtime;
- estimated cost;
- provider-reported usage or charges where available.

Missing data remains unknown. Estimates remain distinguishable from measured or provider-reported values.

The record must make configuration changes and the actual execution route inspectable while preserving the same logical worker identity.

## Capacity and usage

Provider capacity and availability constraints follow the scheduling and reserved-capacity rules in [Scheduling, Failure, and Recovery](scheduling-failure-and-recovery.md).

Model selection operates within approved Project and role policy. Existing plan-specific time, token, and cost allowances remain governed by [Delegation and Task Contracts](delegation-and-task-contracts.md). This topic does not set new universal numerical budgets.

## Remaining implementation detail

Concrete model choices, capability validation, pricing, cache duration and behavior, and provider adapters remain for technical research and implementation planning. This document does not assert current capabilities or prices for particular commercial models.

Physical policy references, local connection mappings, and execution-evidence storage continue in `PD-21`. Runtime integration continues in `PD-22`.
