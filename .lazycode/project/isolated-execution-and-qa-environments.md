# Isolated Execution and QA Environments

Status: established
Last updated: 2026-09-10

## Purpose

This reference defines the initial sandbox direction, environment ownership, installation-wide capacity, allocation state, QA isolation, environment profiles, and integration validation. These are intended product contracts. No sandbox provider has been installed or benchmarked as part of this definition work.

## Initial platform and provider

The first implementation targets running LazyCode locally on macOS alongside the user's normal applications.

OpenSandbox is the first sandbox-provider candidate to validate. CubeSandbox remains a candidate for a later Linux homelab or server deployment. OpenBot remains an architectural reference rather than the foundation for LazyCode.

The [sandbox comparison](research/sandbox-platforms.md) records the research behind this direction and the limits of the available evidence.

A small internal sandbox interface separates environment provisioning and execution from LazyCode's organizational logic. This is separate from the DSH activation interface in [DeepSeek Harness Boundary](deepseek-harness-boundary.md): DSH runs agent activations, while the sandbox provider supplies environments for approved workloads.

Concrete provider support, resource consumption, and enforcement require an implementation spike before being treated as proven.

PD-25 sequences this integration after the smaller dogfooding milestone; it is not a prerequisite to SQLite validation or the initial application. Manual QA is available before automated browser QA. Initial local execution must still enforce its declared permission and secret boundaries. See [Evaluation and Implementation Roadmap](evaluation-and-implementation-roadmap.md).

## Environment ownership

Execution environments belong to worktrees, not model activations. Compaction or reconstruction does not inherently create a new environment.

Workers operating in the same worktree may use its environment through their individual LazyCode permissions. Logical worker count does not require an equal number of running environments.

Coordination and read-only work use controlled tools without requiring a dedicated desktop. Implementation and automated tests use minimal execution environments. Browser environments are provisioned for QA that needs them.

When running processes are no longer needed, LazyCode may release compute while preserving the workspace needed to recreate the environment. This is especially useful when a parent waits for children that need capacity. Active commands and required services retain their established lifecycle controls.

Environment recreation and Project database restoration are distinct operations. Database ownership and portable checkpoints continue to follow [Persistence and Schemas](persistence-and-schemas.md).

## Installation-wide capacity

Users configure environment capacity for their installation across all Projects. A particular development machine is a test case, not a universal hardware requirement.

Settings cover:

- maximum running environments;
- CPU and memory allocation;
- capacity reserved for verification and recovery.

Project requests operate within those limits. When capacity is unavailable, work queues. Lowering a limit prevents further starts until usage fits; it does not automatically terminate existing work.

Practical defaults require measurements on ordinary development machines running their normal applications. The system must account for shared capacity rather than letting each Project independently consume the installation's full budget.

## Awaiting Allocation

A queued worker uses the new **Awaiting Allocation** state. Its parent may remain Waiting for children while the child awaits environment capacity.

When capacity becomes available, eligible queued work may proceed, subject to current permissions, dependencies, and pause or approval conditions. Resource availability does not override a subsequent user pause or human block.

Allocation and reserved verification capacity follow [Scheduling, Failure, and Recovery](scheduling-failure-and-recovery.md). Waiting for children, Awaiting Command, and Awaiting Allocation remain separate reasons and states under [Worker Identity and Lifecycle](worker-identity-and-lifecycle.md).

## QA isolation and initial scope

Each concurrent QA assignment receives:

- a fresh browser session;
- fresh test data;
- the candidate application and required dependencies;
- its scenario, expected outcomes, and access instructions.

Two QA agents must not interfere with each other. Any sharing of underlying infrastructure must preserve that isolation. Shared browser sessions or mutable scenario data cannot be assumed safe merely because the assignments belong to the same Delivery.

The first QA implementation targets web applications. Native desktop application testing is deferred. Unsupported testing is identified in the Delivery review package with instructions for the user to perform it manually; it is not reported as successfully automated.

Only Delivery Managers commission QA Testers. Test and QA ownership remains governed by [Review, Testing, Integration, and Completion](review-testing-and-completion.md).

## Versioned environment profiles

Projects define profiles describing:

- required images or toolchains;
- setup and application-start commands;
- local services and dependencies;
- data seeding and reset procedures;
- environment-variable and secret names;
- supported test capabilities.

Profiles support consistent provisioning across installations while respecting local capacity. Multi-repository candidates identify the repository versions assembled into the environment.

Profile changes follow the established ownership, review, and permission rules. A profile does not itself grant access to its declared resources or secret values.

## Execution and security controls

Sandbox providers operate beneath LazyCode authorization. Agents cannot use provider APIs or unrestricted CLI routes to bypass managed Git, database, command, or secret controls.

Commands support Awaiting Command and background execution. Expected-runtime notifications do not automatically cancel commands or expire their environments. Provider lifecycle configuration must preserve that policy.

Secrets and command results follow [Security and Trust](security-and-trust.md). QA evidence and reproducible environment information follow reporting and persistence policy. Cleanup preserves required evidence and recoverable workspace state before removing owned resources.

## Integration approach

The initial integration should consume pinned SDK/API and runtime artifacts. A source submodule may be introduced if upstream source is needed for custom builds, patches, or contributions. It is not required merely to consume a sandbox service.

No submodule, provider package, or runtime deployment is added by this documentation decision.

## Validation and remaining implementation detail

The implementation spike should measure startup time, memory pressure, CPU use, concurrent implementation and QA workloads, teardown, recreation, and preservation of work.

It must verify scenario isolation, controlled access, secret/result handling, and compatibility with LazyCode's command and recovery lifecycle. Allocation tests should cover queued children, parents waiting for those children, reserved verification capacity, and changes to installation limits.

Measurements determine practical defaults and whether sandboxing every active implementation worktree is viable on smaller machines. Exact allocation algorithms, environment packaging, provider versions, and recreation mechanisms remain technical planning work.
