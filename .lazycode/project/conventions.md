# Project Conventions

## Artifact ownership

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
- `.lazycode/project/` contains project-wide durable knowledge and decisions.
- `.lazycode/deliveries/<id>/` contains delivery intent, acceptance, and status.
- `.lazycode/features/<id>/` contains feature behavior, contracts, and status.
- DeepSeek Harness session storage contains execution history; it is not canonical product documentation.

Use stable identifiers such as `D001-foundation`, `F001-read-only-delegation`, and `ADR-0001`. Update status artifacts when work changes state. Promote only durable conclusions into project documents.

Persist Decisions with their rationale, alternatives, evidence, and affected scope. Store Feature-associated Reports at Feature level. Store Reports without an owning Feature at Project level, including Delivery-wide completion summaries and project research Reports; other objects reference these records rather than duplicate them.

Research and POC artifacts are Git-tracked under `.lazycode/`, with associated metadata in the project's SQLite database. The exact storage and synchronization model is deferred to PD-21; this is a product contract, not an existing database implementation.

## Documentation modes

- Vision and architecture pages explain concepts and rationale.
- Contracts and acceptance pages are precise reference material.
- README commands are task-oriented how-to guidance.
- Research notes separate verified upstream facts, inferences, and open questions.

## Delegation

Every delegated task states a question or deliverable, repository scope, allowed capabilities, expected output, and completion criteria. A child must not infer authority from its role name.

## Source and test style

- TypeScript uses ESM, strict type checking, and explicit public contracts.
- Runtime errors must identify the failed boundary and preserve useful partial diagnostics.
- Tests cover cleanup and failure paths, not only successful results.
- Dependency versions for developer-preview Harness packages are exact and updated deliberately.

## Security and credentials

Never commit API keys or generated Harness credentials. Keep the user's npm release-age policy intact; use any temporary override only on an explicit, exact-version install command. Read-only role restrictions must be enforced by the tool registry or a lower runtime layer, not only requested in prose.
