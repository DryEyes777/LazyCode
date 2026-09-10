# Persistence and Schemas

Status: established
Last updated: 2026-09-09

## Purpose

This reference defines authoritative project storage, worktree database boundaries, controlled access, ownership, replication, Git checkpoints, integration, attachments, and migrations. These are intended product contracts. The existing Markdown documents remain this repository's current planning documentation; migrating them or implementing this policy is separate work.

## Project data and local execution data

SQLite is the home for structured project knowledge and planning. It stores Project definitions, Epics, Features, Deliveries, Tasks, Decisions, Reports, progress, checkpoints, relationships, portable configuration, and relevant authorization records.

Git stores recoverable checkpoints of that data. The live database and committed snapshot are working and committed versions of the same project data, not independently authored sources of truth.

Harness conversations and raw execution logs remain with the LazyCode installation. Conclusions and evidence needed to understand portable Reports must be retained with the Project rather than depending on another installation's logs.

Raw-history retention follows [Observability and Auditability](observability-and-auditability.md): Delivery history is cleaned after merge, independent planning history may be cleaned after base integration, and early manual cleanup requires user action. Required active context and durable evidence are preserved, with unavailable raw details explicitly identified.

Provider credentials and installation-specific connection details remain local under [Models and Provider Routing](models-and-provider-routing.md).

Managed environment secrets are also excluded from portable checkpoints, Reports, and normal logs. Secret names and requirements may be stored, while values remain in managed environment files and the user's interface. Imported grants need user confirmation before local activation under [Security and Trust](security-and-trust.md).

This replaces the intended product's earlier Markdown-first artifact split. The main repository remains the home of shared Project knowledge; worker worktrees hold scoped working copies. Separate Markdown files are not required for every definition, Decision, or Report.

## One database per worktree

Each worktree begins with a complete project database snapshot from its parent.

Workers with separate worktrees have separate databases. Agents operating within an existing worktree, including Explorers, Oracles, and ephemeral parent activations, share that database under their individual permissions.

Separate planning branches and Deliveries therefore have separate working databases. Feature and Task worktrees also receive their own databases; there is not one shared writable database for all descendants of a Delivery.

Database integration follows the branch hierarchy, including work in secondary repositories, under [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md).

## Controlled access and ownership

Every worker read and mutation goes through LazyCode's data tools. Possessing a complete database copy does not authorize reading or modifying every record. Workers do not receive unrestricted SQL or direct database-file access.

Missing capabilities are added as controlled LazyCode operations. Tools enforce role, scope, ownership, and the grants defined in [Permissions and Escalation](permissions-and-escalation.md).

Records have explicit ownership, scope, stable identity, and version information. LazyCode minimizes overlapping ownership and checks each update against both the worker's authority and the version on which it was based.

A stale update is rejected for reconciliation instead of silently overwriting another authorized change.

Approved definitions remain distinguishable from draft changes. Sharing a worktree database does not make every draft a new approved instruction. Adoption still follows the established approval and integration process.

## Stable identifiers

Entities use globally unique internal IDs separate from human-readable names and labels. Independent branches do not depend on a shared sequential counter to create entities.

IDs survive branching, replication, integration, restoration, and worker reconstruction. Exact identifier encoding and readable-label collision handling remain technical planning details.

## Git checkpoints and restoration

LazyCode prepares consistent SQLite snapshots for Git checkpoints rather than treating a live database file as an arbitrary file to copy while writers are active.

A portable checkpoint identifies the code commits it describes across affected repositories and includes the required evidence attachments. It must not present uncommitted code as recoverable committed work.

On another installation, the Project restores to its committed checkpoint. Previously active Tasks become Paused and require reconciliation before resumption. Conversations are not required to reconstruct assignments, recorded progress, and unresolved issues.

Restoration also respects existing model-access, permission, and environment checks. Portable authorization history does not provide missing local credentials or automatically start work.

Unexpected restart on the current installation retains the separate recovery rules in [Scheduling, Failure, and Recovery](scheduling-failure-and-recovery.md); portable restoration does not require discarding newer recoverable local state during ordinary crash recovery.

## Validated database integration

LazyCode tracks each branch's permitted changes and actual mutations.

Before importing child changes into a parent database, it checks:

- branch authority and record ownership;
- actual changes against the relevant baseline;
- record versions and parent changes made since that baseline;
- relationships and constraints;
- applicable approval requirements.

Unrelated parent changes must be preserved. Compatible data changes do not automatically constitute approved product or architectural changes.

Unauthorized changes are reviewed individually. Changes that can safely be omitted are excluded from the import. If valid work depends on them, the child receives corrections within its permitted scope so the remaining result can be imported safely.

The parent database is updated only after the proposed result has been validated. A valid result may omit reviewed unauthorized changes; their presence does not require rejecting every otherwise valid child change.

The exact merge and validation algorithm remains subject to a focused implementation spike and tests.

## Live reporting and replication

Progress and checkpoints, alerts, escalations, and submitted Reports may be persisted in both worker and parent databases before branch integration.

Each replicated record has one authoritative author. Parent copies retain the same ID and revision. Parent evaluation and acceptance are separate records rather than edits to the child's account.

Failed replication leaves a durable pending-delivery entry in the worker database. LazyCode retries without creating duplicates. The parent acknowledges the record ID and revision after storing it, and pending or failed delivery remains visible, especially for alerts and escalations.

After child integration and cleanup, accepted records remain durably stored in the parent. Replica storage does not create independent authority to rewrite the originating record.

Canonical definition changes still propagate through integration. Urgent Decisions may travel through escalation without silently replacing either branch's canonical definitions. Report completion and immutability remain governed by [Reporting and Information Compression](reporting-and-information-compression.md).

## Evidence attachments

Screenshots and other evidence files may live under `.lazycode/`, referenced from SQLite. This is the initial attachment-storage choice, not a promise that temporary evidence is immediately deleted.

Attachments are Git-tracked alongside the corresponding database checkpoints. References are repository-relative and include content identifiers so missing or changed files can be detected after restoration.

Files remain available while their Reports require them. Retention and deletion follow the existing artifact and worker-lifecycle rules.

Whether particular file types eventually require Git LFS remains an implementation decision. No LFS dependency is selected by this policy.

## Versioning and migrations

After the first usable release, supported migrations maintain compatibility with subsequent versions.

Migrations may cover SQLite schemas, file layouts, references, configuration, and other persisted Project structures. They retain recoverable backups and validate their results before use.

Newer unsupported formats remain unwritable until the installation is compatible. Branch database integration requires compatible formats.

The concrete version scheme, migration ordering, interruption recovery, and rollback mechanics remain technical planning work.

## Feasibility and implementation validation

The [SQLite and Git research note](research/sqlite-and-git.md) records the verified building blocks and their limits. Snapshot storage in Git is feasible; trustworthy branch integration requires LazyCode-specific logic and validation.

Before relying on this storage model, a focused spike must exercise consistent snapshots, restoration, coordinated code references, record ownership, stale updates, authorized imports, omission of unauthorized changes, conflicting branch edits, idempotent replication, and migration recovery.

Copying cost, storage growth, commit-amendment references, multi-repository checkpoint coordination, attachment retention, and possible LFS adoption require measurement or further technical design. Physical table schemas and service APIs are not finalized by this document.
