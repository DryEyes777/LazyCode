# Human Control and Autonomy

Status: established
Last updated: 2026-08-24

## Purpose

This document defines how far LazyCode proceeds independently after user approval, when control must return to the human, and how pause, resume, redirection, cancellation, replacement, forced stop, and progress safeguards behave.

## Standard autonomy model

LazyCode initially supports one autonomy model:

> Once the user approves and starts work, LazyCode continues operating until it reaches the next established human gate, the user intervenes, or an escalation requires human authority.

The initial product does not expose several autonomy modes. Continuous-until-complete behavior is the standard operating model.

LazyCode must not stop merely because:

- an agent turn ended;
- a context was rebuilt;
- a worker completed and returned to its parent;
- an internal retry was necessary;
- one worker failed and could be replaced;
- the runtime encountered ordinary implementation difficulty;
- a child worker is still working;
- work requires another internal planning or verification step.

## Human approval boundaries

Routine actions inside an approved scope do not require individual user approval.

The established human gates are:

1. Confirm the project definition.
2. Confirm each Epic.
3. Confirm each Feature's product behavior.
4. Participate in technical Feature planning.
5. Approve the Delivery composition.
6. Explicitly start the Delivery.
7. Verify the Delivery candidate.
8. Approve or reject the Delivery.
9. Authorize merge through final approval.

Additional user approval occurs only when an escalation reaches the human because internal workers and authority cannot resolve it.

Detailed permission exceptions and mandatory safety approvals remain for `PD-16 — Permissions and escalation`.

## Run until complete

Starting a Delivery authorizes LazyCode to continue until it produces a verified Delivery candidate for user review.

```text
User starts Delivery
  -> LazyCode schedules and coordinates work
  -> Features implement, review, test, and integrate
  -> failures are handled internally where possible
  -> blocked work escalates through ownership hierarchy
  -> Delivery-level verification runs
  -> Delivery candidate is presented to user
```

The system remains active through the complete workflow rather than requiring the user to repeatedly prompt it to continue.

## Escalation behavior

Workers first attempt to resolve problems through the internal organization.

```text
Worker cannot safely proceed
  -> relevant internal specialists or Oracles are consulted
  -> direct parent attempts resolution
  -> escalation moves through successive owners
  -> escalation reaches user only when human input or authority is necessary
```

When an escalation reaches the user:

- affected work becomes blocked;
- dependent work waits;
- unrelated work continues;
- the user's answer is required before blocked work resumes;
- the answer propagates to affected workers and durable artifacts.

A local escalation does not unnecessarily stop the entire Delivery.

## Direct user intervention

The user may open any visible worker's chat and send a redirection directly to that worker.

The redirection:

1. Immediately affects the addressed worker.
2. Propagates downward when child contracts or work are affected.
3. Leaves unrelated work running.
4. Updates affected Feature, Delivery, or project documentation.
5. Produces a summary when redirected work settles.
6. Propagates upward so every parent knows that user intervention occurred.

A parent must be informed even when the redirection does not require changes to the parent's broader plan.

## Graceful pause

A graceful pause is a coordinated bottom-up checkpoint operation.

```text
User requests graceful pause
  -> signal enters at top-level owner
  -> pause propagates down active worker tree
  -> no new work is scheduled
  -> leaf workers reach safe points
  -> leaf workers stop owned runtime resources
  -> leaf workers record resumable state
  -> paused status propagates upward
  -> parents pause after their children
  -> Delivery becomes fully paused
```

Before reporting itself paused, each worker must:

- finish or safely interrupt its current atomic action;
- stop owned tests, servers, containers, subprocesses, and temporary resources;
- preserve valid partial work;
- document what was completed;
- document what remains;
- identify blockers and dependencies;
- provide the information required to resume.

## Resume after graceful pause

Resume begins with the top-level owner and propagates downward.

```text
User resumes top-level owner
  -> owner tours Delivery and repository state
  -> resume signal propagates to children
  -> each worker tours its checkpoint and environment
  -> documented state is compared with actual state
  -> children and dependencies are verified
  -> workers resume when ready
```

The same logical workers retain responsibility.

The runtime may reuse an existing warm model session or reconstruct a fresh model context in the same environment. That decision depends on provider cache behavior and pause duration; it must not change organizational identity or ownership.

Model cache duration, invalidation, and pricing require research during `PD-20 — Models and provider routing`.

## Forced stop

A forced stop is an immediate runtime-supervised termination.

```text
User requests forced stop
  -> scheduling stops immediately
  -> all worker threads are terminated
  -> owned process trees and execution environments are terminated
  -> Delivery is marked interrupted
```

Forced stop does not rely on worker cooperation or cleanup.

Before resuming:

- the top-level owner is reconstructed;
- surviving processes and environments are inventoried;
- workers tour repository and artifact state;
- partial changes and inconsistencies are identified;
- ownership and readiness are reconstructed;
- unsafe or ambiguous state is repaired or escalated.

Work resumes only from verified state.

## Cancellation and replacement

Cancelling or replacing a parent affects its complete descendant subtree.

In an orderly cancellation:

```text
Parent cancellation requested
  -> signal propagates to descendants
  -> leaf workers stop and clean resources
  -> child completion propagates upward
  -> parent stops after children settle
  -> partial work and artifacts are reconciled
```

A parent should rarely stop before its children because it owns their coordination and normally waits for their results.

If a worker is replaced, its logical responsibility survives. The replacement tours durable state, repository state, environment state, and child outcomes before continuing or redelegating work.

## Loop and waste safeguards

LazyCode does not initially impose arbitrary time, token, cost, or concurrency limits that stop useful work.

Instead, the runtime detects lack of meaningful progress, including:

- repeated identical actions;
- repeated tool failures;
- circular reasoning;
- repeated context reconstruction without new evidence;
- duplicate delegation of the same work;
- increasing usage without code, artifact, test, or decision progress.

When detected:

```text
Runtime alerts direct parent with evidence
  -> parent evaluates worker and task
  -> parent applies internal remediation
  -> unresolved problem escalates through hierarchy
  -> user is contacted only when necessary
```

Exact remediation—steering, retry, context reconstruction, worker replacement, task redesign, or escalation—is refined under scheduling and recovery.

## User visibility requirement

Because the user may intervene in any worker directly, LazyCode must make workers safely identifiable.

The interaction surface must eventually show enough information to distinguish:

- worker identity and role;
- parent and child relationships;
- current task;
- Feature and Delivery;
- model and provider;
- workspace or worktree;
- runtime duration;
- status, progress, blockers, and recent activity.

Detailed presentation is established in [Interaction Surface](interaction-surface.md).
