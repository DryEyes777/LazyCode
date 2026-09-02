# Interaction Surface

Status: established
Last updated: 2026-09-02

## Purpose

This document defines LazyCode's first-version information architecture and user interaction model without deciding visual styling, frontend technology, or persistence schemas.

## Primary surface

LazyCode's first product interface is a locally hosted web application.

```text
Local LazyCode service
  -> serves web application
  -> user connects through browser
```

The same service may eventually run on a remote machine so the user can connect through private networking such as Tailscale. LazyCode does not depend on Tailscale specifically.

The initial product does not require a separate interactive CLI. A technical mechanism is still required to start the local service, but the web application is the complete user-facing control surface.

## Project launcher

Before entering a project, the user sees a list of known LazyCode projects.

The launcher allows the user to:

- create a LazyCode project;
- link or open an existing project;
- resume a known project;
- identify projects requiring attention;
- view and restore archived projects.

Each project row shows:

- project name;
- active Delivery;
- active-worker count;
- alert count.

Selecting a project opens its Deliveries view.

Project initialization, registration, reconciliation, relocation, archive, and removal behavior are established in [Project Lifecycle](project-lifecycle.md).

## Project navigation

The first-version project navigation contains:

```text
Project
├── Alerts
├── Deliveries
├── Epics
├── Features
├── Project Documentation
└── Project Settings
```

Objects also remain reachable through their relationships:

```text
Epic
└── Features

Delivery
└── Features
    ├── workers
    ├── artifacts
    └── worker chats
```

The project-wide Features tab shows the complete Feature inventory. Epic and Delivery pages show the Features relevant to their own context.

## Deliveries view

Deliveries is the default project screen.

It separates or filters Deliveries by canonical lifecycle state:

- draft;
- active;
- paused;
- completed;
- merged;
- abandoned.

Blocked, awaiting-approval, interrupted, and candidate-ready are derived conditions and attention indicators rather than additional lifecycle states. Rejection returns a Completed Delivery to Active.

Each Delivery row shows:

- Delivery name and identifier;
- state;
- progress such as `3/5 Features complete`;
- active runtime;
- active worker and subagent count;
- whether user attention is required.

A progress detail or tooltip shows:

- completed Features;
- active Features;
- blocked Features;
- pending Features.

Secondary information may include:

- target integration branch;
- last activity;
- blocked-worker count;
- current Delivery phase;
- whether a Delivery candidate is available.

## Delivery page

Opening a Delivery shows:

- Delivery definition;
- state and progress;
- runtime;
- active-worker count;
- target and Delivery branches;
- included Features;
- dependency and implementation order;
- Delivery workers;
- Delivery artifacts;
- review and test evidence;
- alerts;
- activity history;
- Delivery controls.

Features are the primary progress units. Raw worker activity supports that view rather than replacing it.

## Alerts

Alerts is the dedicated user-attention queue.

Alerts may represent:

- human escalations;
- approval requests;
- failed work requiring intervention;
- loop or no-progress warnings;
- blocked Deliveries or Features;
- Delivery candidates awaiting verification;
- completed pause or forced-stop operations;
- recovery problems after interruption.

Every alert links directly to the responsible Project, Delivery, Feature, worker, artifact, or chat.

### Unconsulted alert

The user has not opened the alert.

- Alerts tab appears red.
- Alert is marked red in the list.
- Project launcher indicates immediate attention is needed.

### Consulted but unresolved alert

The user has opened the alert, but the underlying issue remains unresolved.

- Alerts tab appears yellow when no unconsulted alerts remain.
- Alert remains in the active list.
- The affected object remains visibly blocked or degraded.

### Resolved alert

The underlying issue has been handled.

- Alert is hidden from the default view.
- A toggle includes resolved alerts.
- Resolution and linked context remain inspectable.

Color reinforces state but is not the only indicator. Labels, icons, and counts must also distinguish alert states.

## Epic page

An Epic page emphasizes:

- product-area definition;
- intended outcomes;
- scope and non-goals;
- acceptance conditions;
- current status;
- confirmed product decisions;
- dependencies;
- derived Features;
- Epic artifacts and conversations.

Product definition remains more prominent than implementation activity.

## Feature page

A Feature page emphasizes:

- user-story-like product definition;
- expected behavior;
- requirements;
- scope and non-goals;
- acceptance criteria;
- technical implementation plan;
- dependencies;
- Delivery membership;
- current state and progress;
- review and test evidence;
- workers and artifacts;
- relevant conversations.

The Feature definition and acceptance criteria remain the primary reference for determining whether work is correct.

The page distinguishes product approval, technical-specification approval, Delivery scheduling, active work, pause, completion on the Feature branch, and soft-deleted abandonment according to [Feature Definition](feature-definition.md).

## Worker page

A worker page is a supervision and recovery surface.

It shows:

- worker identity and role;
- assigned task;
- original task premise;
- expected result and acceptance criteria;
- parent and children;
- model and provider;
- runtime and state;
- workspace, worktree, or project area;
- permissions and accessible resources;
- plan and progress;
- completed, active, blocked, and pending steps;
- emitted alerts;
- findings and evidence;
- durable checkpoint and recovery notes;
- information retained across context resets;
- proposed knowledge to promote;
- deviations from the original task premise;
- worker chat.

Worker-local persisted knowledge is distinct from canonical project knowledge. It becomes canonical only after promotion into an owned project artifact.

## Worker chat and execution detail

The worker's raw conversation, tool activity, command output, and execution history are available but are not the focal point of the worker page.

They live in an expandable detail surface.

The default worker view emphasizes:

- task;
- plan;
- progress;
- authority;
- findings;
- divergence;
- recovery state.

The user can open the chat to inspect details or redirect the worker directly.

## Project documentation

The primary way to modify project documentation is through the responsible worker:

```text
User identifies incorrect or missing information
  -> user asks responsible worker to revise it
  -> worker evaluates affected artifacts
  -> worker updates documentation
  -> consequences propagate through the hierarchy
```

Direct document editing may also be available for precise manual corrections.

The storage format remains undecided. The web application presents coherent views regardless of whether canonical data is backed by Markdown, structured files, SQLite, or a hybrid.

## Direct-edit and Git semantics

Direct documentation edits are Git-backed changes.

Workers operating in isolated branches or worktrees do not automatically receive live mutations to their task premises.

Instead:

```text
User edits documentation
  -> edit becomes repository history
  -> active isolated workers continue against their current snapshot
  -> edit reaches affected work during integration or merge
  -> LazyCode detects changed definitions or premises
  -> semantic validation determines whether work must change
  -> affected work is reconciled before acceptance
```

Exact branching, merge, and reconciliation mechanics are deferred to `PD-17 — Repository, workspace, and Git strategy`.

## Delivery candidate review

The Delivery page contains a dedicated candidate-review workspace.

It presents:

- implementation summary;
- explanation of how the work was implemented;
- important choices and tradeoffs;
- deviations from Feature definitions;
- review results;
- test results;
- known limitations and risks;
- Delivery branch;
- checkout and testing instructions;
- diff and changed artifacts;
- unresolved alerts.

The user can:

- inspect evidence;
- test the Delivery branch;
- add comments;
- request modifications;
- describe incorrect behavior;
- approve the candidate;
- reject the candidate.

An assisting review worker helps the user turn comments and observations into clear, actionable corrections. Those corrections update the affected Feature or Delivery definitions and re-enter the implementation loop.

## Project settings

Project Settings will eventually contain project-specific configuration such as:

- repository location;
- integration branch;
- model and provider preferences;
- project instructions;
- build and test commands;
- execution environment;
- permission policy;
- notification behavior.

The precise settings model is refined with the related architecture topics.

## Deferred decisions

This interaction model does not decide:

- visual styling;
- frontend framework;
- canonical artifact format;
- database schema;
- remote authentication;
- hosted deployment topology;
- branch and worktree mechanics;
- exact notification transport;
- detailed accessibility implementation.
