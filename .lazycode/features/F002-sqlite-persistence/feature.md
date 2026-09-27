# F002: SQLite Persistence Validation

State: Approved — product definition and technical specification revision 1 approved; not scheduled or started
Product-definition revision: 1
Last updated: 2026-09-26
Parent Epics: none assigned; no Epic inferred or created
Delivery: not assigned
Proposed Delivery: [D002 — SQLite validation](../../deliveries/D002-sqlite-validation/delivery.md), Draft; no assignment/start approval yet
Product-definition approval: revision 1 explicitly approved by the user on 2026-09-26 ("yes I approve")
Technical-specification approval: revision 1 explicitly approved by the user on 2026-09-26 ("yeah this looks good") in response to the complete technical-approval request

## Purpose and current state

Define a bounded persistence spike before the minimum application is planned. SQLite storage, controlled imports, replication, and recovery are not implemented. Existing Markdown planning documents remain authoritative until an approved migration.

This is the Step 2 Feature draft under the [readiness checklist](../../project/development-readiness-checklist.md). The [reconciled baseline](../../project/development-readiness.md), especially R-01 through R-03, is the starting contract.

## Desired outcome

Demonstrate that scoped child work can be checkpointed, imported into its parent, replicated, and recovered without losing unrelated parent state or misrepresenting authority, code versions, or evidence.

Use representative Features, Feature-owned Tasks, Reports, approvals, and evidence to validate persistence, ownership, snapshots, imports, replication, and recovery. Supporting identity, revision, branch, and checkpoint data will be bounded in the technical specification.

The representative Task relationship is a fixture boundary, not a permanent production ownership restriction. The schema must not silently decide Delivery-level Task parentage or post-integration correction ownership. Those R-06 questions remain explicit Step 3 prerequisites before dependent production work.

## Confirmed decisions

The user confirmed these individual choices on 2026-09-26, then separately approved the complete product-definition revision 1.

1. **Bounded representative entities.** Exercise persistence without implementing scheduling or the full workflow. Retain R-06 ownership questions for Step 3; do not make Feature ownership the only permanently supported Task model. This isolates storage validation from unresolved workflow policy.
2. **Return conflicting imports for reconciliation.** If an authorized edit conflicts with newer parent state, return the proposed import for reconciliation before applying it. Do not import the nonconflicting portion while leaving authorized conflicts pending. This keeps the proposed import a coherent reviewed result.
3. **Soft deletion followed by reconciliation cleanup.** The user agreed to soft deletion and then explicitly required permanent removal of useless soft-deleted records during reconciliation, once they have been verified to serve no remaining purpose. Soft-deleted records must not accumulate indefinitely merely because they were once stored. Required history and evidence remain subject to established retention rules; the criteria for proving a record no longer serves a purpose must be explicit in the plan.
4. **Escalation through authorized parents.** User involvement is necessary only when no parent has the authority to resolve the issue. An immediate parent lacking authority escalates through the parent hierarchy.
5. **Automatic integration facts.** After an approved integration succeeds, LazyCode may automatically record the resulting merge commit and Report completion as facts of that operation. New conclusions and definition changes retain their normal approval requirements. This does not settle ownership of future corrective work.

## Required behavior — approved product definition

- One controlled SQLite database per worktree, with stable identity, explicit authorship/ownership, and revision checks. Reject stale controlled updates.
- Consistent Git-tracked snapshots and required evidence attachments; keep raw conversations, logs, credentials, and local execution configuration installation-local.
- Compare actual child mutations with the branch baseline and authority. Preserve unrelated parent changes. Validate relationships, approvals, deletions, and the complete proposed result before importing.
- The receiving parent reviews unauthorized changes individually, recording each exclusion and its reason. Exclude them from the import only when the remaining result is valid and independent of them; otherwise return work for correction within permitted scope. Exclusion leaves the corresponding parent content unchanged and does not silently erase the evidence of the child's attempted change. Escalate through authorized parents before requiring the user.
- Soft-delete records first. During reconciliation, permanently remove those proven to serve no remaining purpose. Check relationships, required history/evidence, pending replication/imports, stale branches, and recovery needs. Return edit/delete conflicts for reconciliation and reject changes leaving invalid relationships. Retain deletion information only while needed to prevent an old branch or retry from silently recreating removed data; its representation and eventual removal conditions belong in the technical plan. Cleanup must exercise actual removal of eligible records as well as preservation of still-needed records.
- Replicate selected progress/checkpoints, alerts, escalations, and submitted Reports with authoritative IDs and revisions. Keep parent evaluations separate. Persist pending delivery, retry idempotently, and acknowledge only durably stored revisions.
- Recover interrupted database, snapshot, import, replication, and Git-checkpoint operations without duplicating effects or silently discarding newer recoverable local state.
- Restore portable checkpoints with required code and attachments, paused work, and inactive imported grants pending local confirmation. Restoration must not automatically resume execution.
- Distinguish exact code versions and amended commits from database checkpoint identity. Avoid requiring a snapshot to contain its own eventual commit hash. Preserve historical evidence and immutable completed Reports.
- Automatically record final integration facts and Report completion only after the approved integration actually succeeds. Recovery must determine the outcome before finalizing or retrying. These facts must be recoverable through a subsequent portable checkpoint without rewriting already completed Reports or silently approving new authored content.
- Validate format compatibility and recoverable migration behavior using synthetic fixtures; measure copy cost and Git/attachment growth.

These requirements inherit [Persistence and Schemas](../../project/persistence-and-schemas.md). Receiving-parent omission review and detailed cleanup safeguards were approved as part of product-definition revision 1.

## Scope and non-goals

Acceptance will use real SQLite, temporary Git repositories/worktrees, and scripted agents in one repository with one representative active Delivery. Multiple child branches may exercise competing edits within that Delivery. An attempted live model call must fail. No web interface is required for this storage spike; inspectable results and evidence are required.

Exclude production scheduling, a complete worker/approval state machine, application hosting, live model evaluation, sandbox integration, production migration of existing documents, multi-repository orchestration, and production attachment cleanup/LFS adoption. The technical plan must distinguish mechanisms the spike proves from production work it does not validate.

This planning task does not authorize dependency installation, runtime code, data migration, or spike execution. Feature approval will not itself authorize a Delivery start.

## Approved acceptance coverage

The technical specification will turn this coverage into deterministic fixtures, operations, expected results, and fault boundaries.

1. Snapshot concurrent committed writes consistently; restore the selected checkpoint and detect unavailable or changed required evidence/code.
2. Enforce scoped mutations and revisions; reject stale edits and protect immutable accepted history.
3. Import independent authorized work while preserving unrelated parent state; return conflicting imports without partial application.
4. Exercise reviewed safe omissions, dependent unauthorized changes, relationship violations, and edit/delete conflicts. Remove eligible soft-deleted records during reconciliation; preserve still-needed records and prevent stale data from resurrecting removed records.
5. Retry replication and lost acknowledgments without duplicate records or false acknowledgment; preserve authoritative authorship and parent evaluations.
6. Recover crashes at database/filesystem/Git boundaries and inspect uncertain outcomes before retry; distinguish local recovery from portable restoration.
7. Track amended code commits and checkpoint publication without circular hashes or relabeling old verification as current. Record and restore final integration facts and Report completion only for successful approved operations, without changing completed historical Reports.
8. Reject unsupported formats for writing/import; exercise interrupted synthetic migration and recovery. Record reproducible storage/copy measurements without claiming unmeasured production limits.

## Approval and unresolved boundaries

The user explicitly approved product-definition revision 1 and then technical specification revision 1 on 2026-09-26, moving the Feature through Defined and Specced to Approved. This completes Step 2 planning. Delivery scheduling/start and implementation authorization remain separate.

Delivery-level Task parentage and post-integration correction ownership remain unresolved R-06 decisions for Step 3. The spike must not implement those cases or encode a permanent Feature-only Task ownership rule. It may validate immutable historical Reports without creating or assigning post-integration corrective work.

The technical contracts specify cleanup eligibility, omission dependency validation, and recoverable closure/checkpoint mechanics for review. If implementation reveals a need for additional product behavior or a contradiction with this definition, return the affected question to the user instead of choosing silently.

## Technical planning and Step 3 dependencies

The [technical plan](technical-plan.md), [contracts](contracts.md), and [acceptance](acceptance.md) form approved technical specification revision 1. The [handoff](handoff.md) records decisions and remaining Step 3 dependencies.

After explicit product approval, specify the binding and bounded schema, IDs/revisions, format/versioning, snapshot layout and consistency, branch baselines, authorized import algorithm, replication/acknowledgment, attachment integrity, recovery, and code/checkpoint references. Verify technical choices against current primary sources where needed.

Include ordered Tasks, interfaces, deterministic acceptance, and an explicit earliest-test authoring plan. Managers do not author implementation; test authoring belongs to Implementation Workers in ordinary Feature/Task work. Resolve how executable contract tests become available before dependent implementation is delegated, without silently waiving that rule.

Step 3 must retain R-06 ownership decisions and use the spike's eventual findings before finalizing dependent production designs. An approved plan alone supplies no experimental results. F001 remains the completed read-only delegation baseline; F002 does not extend its live execution flow. No new Epic or Delivery is approved by this definition.

## Planning handoff status

- Confirmed individual decisions: bounded representative entities; return conflicting imports for reconciliation; soft deletion with permanent removal of records proven useless during reconciliation; escalate to the user only when no parent has authority; automatic recording of successful approved integration facts and Report completion.
- Product-definition revision 1 and technical specification revision 1: explicitly approved on 2026-09-26. Step 2 planning is complete.
- Planning files changed: this Feature definition, technical plan, contracts, acceptance, handoff, and readiness checklist/register links.
- Planning ends here with the handoff for the original planning chat. No implementation has begun and no experimental acceptance results exist. Step 3 and Delivery scheduling/start remain separate future work.
