# D002 Acceptance

Status: proposed with Delivery definition revision 1; not executed

## Implementation and Feature evidence

- F002 implements its approved contracts without adding production scheduling, DSH integration, or real-data migration.
- S0 demonstrates meaningful executable red contracts, independently reviewed before dependent implementation. Intentional bootstrap failures are not final passes.
- Each Task runs its required added/modified tests, full unit suite, and real-helper integration checks. Findings are evaluated and corrections rechecked; accepted helper review is reused only while its content/contract stays intact.
- F002 passes all A01–A25 cases, fault schedules, and required measurements from its [acceptance specification](../../features/F002-sqlite-persistence/acceptance.md), with exact tested revisions and environment recorded. All child work is integrated into its Feature branch before completion.

## Separate Delivery verification

After Feature integration, run fresh verification against the actual combined Delivery candidate, even if its code appears equivalent to the Feature:

1. `npm run typecheck`
2. `npm test` — full default suite, not only persistence-related cases.
3. `npm exec --no -- vitest run --config vitest.persistence.config.ts` — all A01–A25 cases; configuration supplied by S0.
4. `npm run build`
5. Required F002 measurement and fault coverage, review evidence, source-integrity checks, and owned-process cleanup verification.

The future aggregate `npm run check` must include both test configurations. Missing tooling/runtime or an unexecuted required layer is blocked/unverified, never a green skip. Changed code invalidates prior test evidence. Keep failures and their recovery records; classify any permitted pre-existing exception with evidence and present it to the user. New defects require correction or explicit scope/specification reapproval.

Tests must make no real model calls or remote-service requests. Normal implementation/review assistance is separate from scripted application tests; this rule does not claim that development agents themselves consume no usage.

## Candidate review package

Provide the Delivery branch, included Feature and exact integrated commits, what was built and how, significant choices, review dispositions, test commands/results, and unresolved limitations. Include reproducible measurements separating SQLite snapshots, baselines, bundles, attachments, and Git growth. Do not claim production scalability, sandbox enforcement, or practical resource limits from an unmeasured assumption.

Provide safe user verification instructions using temporary fixtures: checkpoint/restore, authorized versus conflicting import, and interrupted-operation recovery. This storage spike has no browser/desktop interface, so automated UI QA is not applicable; no browser QA agent or real project migration is required. Include the Project Manager's proposed architecture/roadmap consequences in the candidate.

Completion requires all included work accepted/integrated and the separate Delivery checks performed under the established exception rules. User approval is then required to merge into `main`; no automatic push. Starting implementation, accepting technical findings, merging code, and adopting the prototype for production are distinct decisions.
