# Project Lifecycle

Status: established
Last updated: 2026-09-03

## Purpose

This document defines how a LazyCode project is registered, initialized, opened, reconciled, maintained, relocated, archived, removed, and reconstructed on another installation.

## Project identity

A LazyCode project consists of two related parts:

```text
Local LazyCode project entry
+
repository-owned .lazycode/ state
```

The local entry allows the installation to find, display, and run the project.

The repository-owned state contains the project-specific definitions and organizational memory required for another compatible LazyCode installation to understand the project.

A Project has one main repository and may register secondary repositories. Shared Project documentation lives in the main repository; repository-specific guidance stays with its code. Features and Deliveries may span repositories, while Tasks belong to one repository. Membership and workspace rules follow [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md).

## Create or open project

The project launcher provides:

- create project;
- open existing project;
- resume known project;
- view archived projects.

Creating or opening a project initially requires:

- project name;
- main repository location.

LazyCode inspects only for existing LazyCode project state.

## Existing LazyCode project

If `.lazycode/` exists:

```text
User selects repository
  -> LazyCode registers local project entry
  -> repository-backed state opens normally
  -> compatibility errors appear when affected state cannot be loaded
```

LazyCode does not require a separate onboarding report or automatic codebase investigation before opening the project.

On a new installation, imported approvals do not automatically authorize execution. The user confirms executable commands, behavior overrides, and standing grants before local activation under [Security and Trust](security-and-trust.md). Viewing portable project state remains separate from activating its executable policy, and confirmation does not automatically resume paused work.

Errors should identify:

- incompatible state;
- unsupported schema or version;
- missing required data;
- invalid references;
- unreadable repository state;
- action needed from the user.

## New LazyCode project

If `.lazycode/` does not exist, LazyCode asks whether the repository represents:

- a new product; or
- an existing product requiring reconciliation.

LazyCode then:

1. Creates `.lazycode/`.
2. Creates the empty storage required by the selected persistence model.
3. Registers the project in the local application.
4. Opens the Project Manager workflow.

The intended initial storage is an empty SQLite project schema with the required `.lazycode/` structure for checkpoints and supporting files. [Persistence and Schemas](persistence-and-schemas.md) defines controlled worktree databases and portable snapshots; concrete schema and migration implementation remains technical planning work.

On another installation, committed checkpoints restore Project state without the original conversations or raw Harness logs. Previously active Tasks become Paused and require reconciliation before resumption. Supported Project-format migrations preserve backups and validate results; newer unsupported formats remain unwritable until compatible software is available.

LazyCode does not invent a vision, roadmap, architecture, or Epics before the Project Manager has worked with the user.

## New-product onboarding

For a new product:

```text
Project initialized
  -> Project Manager conversation begins
  -> user explains product
  -> project definitions are drafted
  -> user confirms project intent
  -> Epics and Features are progressively defined
```

The established process is defined in [Primary End-to-End Workflow](primary-workflow.md).

## Mature-product onboarding

For an existing codebase, LazyCode follows the user's chosen reconciliation strategy.

### Comprehensive reconciliation

The user authorizes a broad investigation intended to reconstruct current product and technical knowledge before substantial new work is planned.

The investigation may produce:

- current product definition;
- architecture;
- conventions;
- test and build procedures;
- deployment behavior;
- known Epics and Features;
- project risks;
- unresolved inconsistencies.

### Progressive reconciliation

LazyCode investigates only the areas required by approved work.

Undocumented areas do not require explicit placeholders or unknown-coverage records. LazyCode simply has no durable knowledge about them until they become relevant.

Neither reconciliation strategy starts automatically. LazyCode may explain the tradeoffs and recommend an approach, but the user decides.

## Knowledge lookup order

Workers consult sources in this order:

```text
LazyCode project documentation
  -> relevant repository documentation
  -> source code and tests
  -> external research when required
```

Workers should not repeatedly rediscover information already present in canonical LazyCode artifacts.

When approved work touches an undocumented area, the responsible workers investigate it and promote useful durable knowledge into the appropriate project artifacts.

## External changes and stale knowledge

Git history is the source for identifying repository changes made outside LazyCode or outside an active worker's snapshot.

LazyCode should track the repository state it last understood and compare later history when:

- opening or resuming a project;
- integrating Feature work;
- preparing a Delivery candidate;
- merging a Delivery;
- rebuilding worker context after interruption.

A Git change does not automatically make every document invalid.

Instead:

```text
LazyCode detects new Git history
  -> identifies affected code and artifacts
  -> determines whether current definitions or active work may be stale
  -> validates affected premises at integration
  -> reconciles or escalates when necessary
```

Workspace isolation, branch ownership, synchronization, and integration follow [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md); exact operation mechanics remain technical planning work.

## Multiple projects

One local LazyCode installation may register and actively run multiple projects at the same time.

Each project maintains independent:

- repository state;
- workers;
- Deliveries;
- alerts;
- settings;
- runtime resources;
- project documentation.

The project launcher summarizes attention and active work across all registered projects.

Cross-project scheduling and resource allocation remain implementation details for later definition.

A Project may have several Project Managers concurrently. Each works in a separate branch or worktree, and later merges must reconcile earlier project-planning changes as defined in [Roles and Ownership](roles-and-ownership.md).

## Project relocation

Relocating a project updates the local LazyCode entry to point to the repository's new location.

LazyCode then attempts to open the repository-owned state normally and reports compatibility or identity problems if the selected repository does not match the expected project.

Relocation does not rewrite product knowledge merely because the filesystem path changed.

## Archive

Archiving a project:

- hides it from the default project launcher;
- stops presenting it as an active project;
- keeps its local registration;
- preserves the repository and `.lazycode/` state;
- allows it to be restored through an archived-project view.

Archiving must not delete project data.

Rules for active work during archival can be refined later, but archival does not silently terminate running workers.

## Remove

Removing a project:

- removes it from the local LazyCode project registry and launcher;
- does not delete the repository;
- does not delete `.lazycode/`;
- does not rewrite project history.

The project can be opened again later from its repository.

Removal requires active work to be stopped or safely detached before the local registration disappears.

## Portability

LazyCode does not need a separate project-transfer workflow.

Project-specific state is stored with the repository. Another developer can obtain the repository, install a compatible LazyCode version, and open the project.

Machine-specific items remain outside the repository, including:

- API credentials;
- local model credentials;
- machine paths;
- local runtime resources;
- secrets;
- optional user preferences.

The repository contains everything safe and necessary to reconstruct the project's organizational state, while machine-specific configuration is supplied by the receiving installation.

## Lifecycle summary

```text
Create or Open
  -> Initialize or Load
  -> Define or Reconcile
  -> Active
  -> Pause and Resume as needed
  -> Continue through Deliveries
  -> Archive or Remove from local registry
  -> Reopen from repository when needed
```
