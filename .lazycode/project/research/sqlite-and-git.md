# SQLite and Git Feasibility

Research date: 2026-09-09
Scope: supporting the PD-21 storage decision
Status: documented feasibility research; no implementation spike completed

## Verified building blocks

### Consistent database snapshots

SQLite's Online Backup API can produce a consistent snapshot of a live database. The backup documentation also describes `VACUUM INTO` as another snapshot technique. This provides a basis for preparing database snapshots before Git commits. See [SQLite backup documentation](https://sqlite.org/backup.html).

Copying only the main file of an active WAL-mode database can omit committed state or produce an invalid copy, because the WAL is part of its persistent state. Snapshot preparation must use a supported consistency mechanism. See [SQLite WAL documentation](https://sqlite.org/wal.html).

### Git handling

Git can track binary files and supports external diff and merge drivers. Its built-in binary merge driver leaves a conflicting path for resolution rather than combining database records. A human-readable text conversion can improve diff display but does not itself implement database merging. See [Git attributes documentation](https://git-scm.com/docs/gitattributes).

### Logical changes and conflicts

SQLite's session extension can record row changes, apply changesets to compatible databases, and detect certain data and constraint conflicts. It is a candidate building block, not a complete LazyCode merge policy. It requires appropriate build support and has schema and table limitations, including requirements around primary keys and no capture of virtual-table changes. See [SQLite session extension](https://sqlite.org/sessionintro.html).

### Concurrent access

SQLite serializes writes and supports isolation between connections. That protects database transactions, but it does not implement LazyCode's worker roles, ownership rules, or stale business-record update policy. See [SQLite isolation documentation](https://sqlite.org/isolation.html).

## Design inference

The documented mechanisms support storing project data in SQLite and committing consistent snapshots to Git. LazyCode must still implement semantic comparison, authorization checks, conflict handling, and restoration coordinated with code history.

The selected product policy is [Persistence and Schemas](../persistence-and-schemas.md): one working database per worktree, controlled access, parent integration, and selected live reporting replication. The session extension is not yet selected as the implementation mechanism.

## Validation still required

- Demonstrate snapshot consistency during concurrent authorized writes.
- Restore a checkpoint with its exact available code and evidence references.
- Merge independent edits without dropping unrelated parent state.
- Detect stale, conflicting, or unauthorized changes and validate permitted omissions.
- Retry replication without duplicate records or acknowledgments of unstored data.
- Reconcile database changes across schema and project-format migrations.
- Measure complete-copy and Git-history growth with realistic project data.
- Evaluate attachment sizes and whether Git LFS is useful for specific file types.

Feasibility is supported by documentation, but performance and end-to-end correctness are not yet experimentally established for LazyCode.
