# Project Conventions

## Artifact ownership

- `.lazycode/project/project-definition.md` is the canonical high-level definition of LazyCode's purpose, boundaries, current state, and success criteria.
- `.lazycode/project/project-definition-workbook.md` contains unresolved definition questions and the order in which they should be decided; it does not override established project documents.
- `.lazycode/project/primary-workflow.md` is the canonical end-to-end user journey and approval-gate definition.
- `.lazycode/project/human-control-and-autonomy.md` is the canonical worker intervention, pause, resume, cancellation, and continuous-execution contract.
- `.lazycode/project/` contains project-wide durable knowledge and decisions.
- `.lazycode/deliveries/<id>/` contains delivery intent, acceptance, and status.
- `.lazycode/features/<id>/` contains feature behavior, contracts, and status.
- DeepSeek Harness session storage contains execution history; it is not canonical product documentation.

Use stable identifiers such as `D001-foundation`, `F001-read-only-delegation`, and `ADR-0001`. Update status artifacts when work changes state. Promote only durable conclusions into project documents.

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
