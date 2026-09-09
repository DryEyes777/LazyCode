# DeepSeek Harness Boundary

Status: established
Last updated: 2026-09-09

## Purpose

This reference defines LazyCode's application and execution-runtime responsibilities, the internal execution interface, tool enforcement, capability gaps, and upstream compatibility policy. These are intended product contracts. The existing native-plugin spike does not implement the complete boundary described here.

## Responsibility boundary

LazyCode owns:

- the web application and Project lifecycle;
- logical worker identities and organizational roles;
- scheduling, delegation, permissions, and authority;
- Project databases, replication, and database integration;
- Git and workspace operations;
- reporting, context construction, and recovery policy.

DeepSeek Harness supplies agent execution mechanics: the agent loop, model communication, underlying tool invocation, and raw session logging. Those mechanics operate within the controls assigned by LazyCode.

LazyCode remains independent of individual agent sessions. Its application and Project state continue to exist while activations finish, wait, compact, or restart. This does not waive user restart authorization or other recovery requirements from [Scheduling, Failure, and Recovery](scheduling-failure-and-recovery.md).

## Internal execution interface

DSH-specific integration code is concentrated behind a small internal execution interface.

LazyCode prepares a worker's identity, assignment, context, approved model configuration, and permissions. The integration translates that request into runtime operations and returns activity, results, failures, and execution references.

The interface covers:

- starting worker activations;
- delivering messages;
- stopping activations;
- observing activity, results, and failures.

Organizational code uses LazyCode worker concepts rather than depending directly on DSH classes or session structures. DSH changes should primarily affect its integration code where this boundary applies.

DSH is the first and only initially implemented runtime integration. Another integration is built only for a concrete need; no general multi-runtime framework is required up front.

This interface connects worker lifecycle to execution lifecycle. Model selection and provider routing remain the separate policy defined in [Models and Provider Routing](models-and-provider-routing.md).

## Identity and persistence

LazyCode worker IDs are durable identities. DSH session identifiers are execution references associated with activations.

Portable Project state follows [Persistence and Schemas](persistence-and-schemas.md). Harness conversations and raw logs remain installation-local execution history; restoring a Project does not require those conversations.

Replacing or reconstructing an activation preserves the worker's established identity, ownership, role, and work contract under [Worker Identity and Lifecycle](worker-identity-and-lifecycle.md).

## Tool and permission enforcement

Every agent action affecting controlled resources passes through LazyCode authorization, including actions performed using underlying DSH tools.

A generic shell or CLI must not provide an alternate route around database access restrictions, Git controls, resource scope, or other permissions.

The integration restricts, wraps, or replaces underlying capabilities as necessary to preserve these rules. Prompt instructions alone do not establish the enforcement boundary. Tool visibility and actual executable access must both respect the controls in [Permissions and Escalation](permissions-and-escalation.md).

## Missing capabilities

When a required capability is unavailable or cannot be enforced correctly, affected work reports the gap and cannot proceed through an unauthorized alternative.

The report identifies:

- the required operation;
- why the assignment needs it;
- the affected scope;
- the missing functionality or enforcement support.

Missing functionality can then be implemented in LazyCode through its normal development workflow. Unaffected work may continue.

Permission requests and implementation gaps remain distinguishable. Granting authority does not create functionality that the runtime lacks, and reporting a gap does not itself authorize changes to the running integration.

## Upstream compatibility

Harness versions remain explicitly pinned. Upgrades are deliberate and require compatibility checks before adoption, covering:

- plugin and profile loading;
- model and tool execution;
- permission enforcement, including alternate CLI paths;
- session events and execution references;
- cancellation;
- reconstruction;
- the existing end-to-end delegation flow.

The out-of-tree bundle decision in [ADR-0001](decisions/ADR-0001-native-dsh-plugin.md) remains in place. No Harness fork is introduced.

## Remaining architecture work

The exact execution-interface schema and required DSH hooks need technical validation. This policy does not assert that the pinned Harness version already supports every required control.

Whether the long-running LazyCode application lives inside the plugin host or in a separate local process remains open. Either arrangement must preserve the same ownership boundary, remain local initially, and support the established worker lifecycle and permission rules.

The current runtime implementation and its limits are described in [Architecture](architecture.md); this document establishes the intended boundary for subsequent implementation work.
