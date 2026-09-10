# Security and Trust

Status: established
Last updated: 2026-09-10

## Purpose

This reference defines the product's secret-management rules, managed command execution, trust in configuration and imported approvals, resistance to unauthorized instructions, and user control of updates. These are intended product contracts, not a claim that the current spike implements or has validated the complete security boundary.

## Managed environment configuration

LazyCode manages `.env` files and distinguishes ordinary variables from secrets.

Within their granted scope, agents may create, read, modify, and delete ordinary variables. They may inspect variable and secret names and request new secret definitions.

Secret values are supplied or updated by the user through LazyCode. Deleting a secret requires user approval. Agents cannot read secret values directly.

Secret values belong in managed environment files and the user's secret-management interface. Authorized commands may consume them, but values must not enter agent context, normal logs, Reports, or Project artifacts.

Portable configuration may identify secret names and requirements, but secret values are not part of the Git-tracked Project checkpoints defined in [Persistence and Schemas](persistence-and-schemas.md).

## Commands that use secrets

Secret use is governed by command authorization rather than a separate per-use secret grant.

New commands require review and permission before execution. Commands using secrets require user approval by default.

Once approved, a command may be reused within its granted scope and lifetime. Modifying a command that requires user approval requires renewed approval, as does granting it permanent permission.

These requirements supplement the command and resource controls in [Permissions and Escalation](permissions-and-escalation.md).

## Intercepting results

LazyCode intercepts command results before delivering them to agents or recording them in normal logs.

If detected secret values appear, the result is withheld and the agent receives a safe error. The agent may contest that outcome, but resolution requires user action rather than approval by an ephemeral agent.

The user examines the suspected exposure through the UI and decides whether to release a redacted result or keep it withheld. The original output must not leak through the error, audit record, or contest process.

Technical design must address accidental disclosure, false positives, and transformed secret values. Review and approval alone do not prove that output is safe. The protected handling mechanism for user inspection remains implementation work.

## Managed command execution

Commands and tests run through LazyCode, where access is verified and execution is tracked.

Command definitions describe:

- the command and allowed arguments;
- working directory, execution scope, and resources;
- environment-variable and secret requirements;
- expected runtime when known;
- result-processing rules.

Workers choose between two execution modes.

### Awaiting Command

The worker suspends its activity until command completion or timer expiry. It then returns to Active with the result or a message that the command is still running.

`Awaiting Command` is a new worker lifecycle state, separate from Waiting for children. The logical worker and its owned command remain identifiable throughout the wait.

### Background execution

The worker continues other work. Completion or timer expiry delivers a message through its normal message flow, comparable to another agent's message or user steering.

### Timers and cancellation

Expected runtimes control overrun notifications. If none is defined, the worker may specify a notification interval.

Exceeding an expected runtime or notification interval never automatically cancels the command. A still-running notification lets the worker investigate, wait longer, or cancel. Existing user cancellation and forced-stop controls continue to apply.

Completion and timer events do not override a subsequent user pause, forced stop, or unresolved human block. Those interventions retain their established resume requirements.

### Result processing

Deterministic processing produces compact results while preserving failures, exit status, and references to permitted detailed evidence. Secret interception occurs before output enters ordinary agent or logging flows.

## Project overrides and untrusted content

Projects may customize default guidance and behavior through controlled overrides. User approval is required before an override becomes active.

Repository files, websites, command output, and messages from other agents cannot impersonate user approval, grant permissions, or change a worker's role.

Approved guidance informs execution within the worker's contract. Runtime authorization remains enforced even if a model follows misleading content. CLI tools cannot bypass the controls in [DeepSeek Harness Boundary](deepseek-harness-boundary.md).

## Trust on another installation

Imported approval records are historical evidence, not automatic authorization on a new installation.

The user confirms the Project's executable commands, behavior overrides, and standing grants before they become active locally. This adds a trust-confirmation step to project opening while preserving portable definitions and history.

Existing model-access checks, paused restoration, and reconciliation still apply. Confirming imported policy does not provide missing credentials or automatically resume work.

## LazyCode updates

LazyCode updates are deliberate and require user approval. The user can inspect release notes or the open-source changes before accepting an update.

Version pinning and compatibility checks remain applicable. An agent reporting a missing capability does not thereby authorize modifying the running application.

## Remaining technical work

Implementation planning must define secret storage and injection, result interception, protected handling of contested output, command scheduling, and imported-policy activation.

Initial sandbox direction, worktree ownership, fresh QA state, and installation limits follow [Isolated Execution and QA Environments](isolated-execution-and-qa-environments.md). Concrete provider integration, extension trust, disclosure prevention, threat analysis, and enforcement tests still require technical design and validation.
