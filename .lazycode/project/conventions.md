# Project Conventions

## Artifact ownership

The paths below describe this repository's current planning artifacts. For the intended product, [Persistence and Schemas](persistence-and-schemas.md) places structured knowledge and planning in controlled worktree databases, with Git-tracked snapshots and evidence files. The existing files are not automatically converted by this policy.

- `.lazycode/project/project-definition.md` is the canonical high-level definition of LazyCode's purpose, boundaries, current state, and success criteria.
- `.lazycode/project/project-definition-workbook.md` contains unresolved definition questions and the order in which they should be decided; it does not override established project documents.
- `.lazycode/project/primary-workflow.md` is the canonical end-to-end user journey and approval-gate definition.
- `.lazycode/project/human-control-and-autonomy.md` is the canonical worker intervention, pause, resume, cancellation, and continuous-execution contract.
- `.lazycode/project/interaction-surface.md` is the canonical first-version information architecture and user interaction contract.
- `.lazycode/project/project-lifecycle.md` is the canonical project registration, initialization, reconciliation, archive, removal, and portability contract.
- `.lazycode/project/work-hierarchy-and-terminology.md` is the canonical work-object, relationship, and terminology reference.
- `.lazycode/project/request-intake-and-project-planning.md` is the canonical read-only intake, authorized planning handoff, report refinement, and draft-retention contract.
- `.lazycode/project/delivery-planning.md` is the canonical Delivery definition, readiness, concurrency, ownership, integration, and lifecycle contract.
- `.lazycode/project/feature-definition.md` is the canonical Feature template, approval, orchestration, lifecycle, modification, completion, and restoration contract.
- `.lazycode/project/roles-and-ownership.md` is the canonical fixed role catalog, delegation matrix, decision-authority, verification-ownership, and transfer contract.
- `.lazycode/project/worker-identity-and-lifecycle.md` is the canonical logical identity, activation, reconstruction, worker-state, disposal, restoration, and deletion contract.
- `.lazycode/project/delegation-and-task-contracts.md` is the canonical delegation-planning, child-contract, verification-proxy, scope-coordination, and bottom-up integration contract.
- `.lazycode/project/reporting-and-information-compression.md` is the canonical Report-object, reporting-trigger, validation-lifecycle, upward-compression, urgent-propagation, and knowledge-promotion contract.
- `.lazycode/project/context-and-memory.md` is the canonical initial-context, bounded-access, source-provenance, compaction, checkpoint-review, and context-update contract.
- `.lazycode/project/permissions-and-escalation.md` is the canonical permission, delegated-authority, grant-lifetime, revocation, escalation, and permission-appeal contract.
- `.lazycode/project/repository-workspace-and-git.md` is the canonical multi-repository, worktree-ownership, Git-control, commit-history, integration, cleanup, and remote-publication contract.
- `.lazycode/project/scheduling-failure-and-recovery.md` is the canonical scheduling, reserved-capacity, retry, shared-incident, stalled-worker, and restart-recovery contract.
- `.lazycode/project/review-testing-and-completion.md` is the canonical test-layer, verification-scope, Reviewer-context, exception, QA, retesting, and acceptance contract.
- `.lazycode/project/models-and-provider-routing.md` is the canonical model-configuration, portable-identity, selection, fallback, reassignment, Reviewer-model, and execution-evidence contract.
- `.lazycode/project/persistence-and-schemas.md` is the canonical database-boundary, ownership, replication, snapshot, integration, attachment, restoration, and migration contract.
- `.lazycode/project/deepseek-harness-boundary.md` is the canonical application/runtime responsibility, execution-interface, enforcement, capability-gap, and upstream-compatibility contract.
- `.lazycode/project/observability-and-auditability.md` is the canonical inspection, linked-history, usage-attribution, alert-selection, raw-retention, and cleanup-safeguard contract.
- `.lazycode/project/security-and-trust.md` is the canonical managed-environment, secret-output, command-execution, imported-trust, override, and update-approval contract.
- `.lazycode/project/` contains project-wide durable knowledge and decisions.
- `.lazycode/deliveries/<id>/` contains delivery intent, acceptance, and status.
- `.lazycode/features/<id>/` contains feature behavior, contracts, and status.
- DeepSeek Harness session storage contains execution history; it is not canonical product documentation.

Use stable identifiers such as `D001-foundation`, `F001-read-only-delegation`, and `ADR-0001`. Update status artifacts when work changes state. Promote only durable conclusions into project documents.

Persist Decisions with their rationale, alternatives, evidence, and affected scope. In the intended product, definitions, planning, and Reports are structured SQLite records. Feature-associated Reports are logically owned at Feature level; Reports without a Feature are owned at Project level. Selected live replicas retain the author's ID and revision rather than becoming independently authored copies. Each worktree has a database accessed only through LazyCode.

Research and POC knowledge is stored in SQLite under the intended product policy; supporting files may remain Git-tracked under `.lazycode/` and be referenced from the database. Consistent snapshots and required attachments provide portability. Concrete schemas, merge mechanisms, and migration implementation remain technical planning work.

## Documentation modes

- Vision and architecture pages explain concepts and rationale.
- Contracts and acceptance pages are precise reference material.
- README commands are task-oriented how-to guidance.
- Research notes separate verified upstream facts, inferences, and open questions.

## Delegation

Every delegated Task follows [Delegation and Task Contracts](delegation-and-task-contracts.md). It states a question or deliverable, repository scope, allowed capabilities, expected output, tests, and completion criteria. A child must not infer authority from its role name.

## Source and test style

- TypeScript uses ESM, strict type checking, and explicit public contracts.
- Runtime errors must identify the failed boundary and preserve useful partial diagnostics.
- Tests cover cleanup and failure paths, not only successful results.
- Dependency versions for developer-preview Harness packages are exact and updated deliberately.

## Security and credentials

Never commit API keys or generated Harness credentials. Keep the user's npm release-age policy intact; use any temporary override only on an explicit, exact-version install command. Read-only role restrictions must be enforced by the tool registry or a lower runtime layer, not only requested in prose.
