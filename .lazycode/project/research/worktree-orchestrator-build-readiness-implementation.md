# Worktree Orchestrator — Build-Readiness Implementation

Date: 2026-09-26
Status: accepted and locally installed as `0.1.0+codex.20260926182109`

## Delivered result

The protected candidate was accepted on 2026-09-26 at `af462a6e717bf96c41d328feca2c15636b461e4c`, tree `fda2ec71c0a1709ae39c2d39fedb958aa5c7ee81`. Both independent final Sol reviewers passed; all ten recorded Findings were resolved. The accepted plugin and eight worktree agent profiles were installed through the supported cachebuster/reinstall flow. No trial registry was migrated or resumed, and no project branch was promoted or pushed.

Delivered changes include managed editable-commit segments without squash, typed lock/permission diagnostics, worktree identity guards, stable correction/review baselines, contract-bound finding lineage, verification profiles v3 with conservative evidence reuse, registry v6 with explicit adoption, capability-aware native execution records, ordered next actions, and Luna-first meaningful decomposition guidance. These are workflow improvements, not a production execution controller.

## Approved scope

The user approved the [build-readiness repair plan](worktree-orchestrator-build-readiness-plan.md), including LazyCode-style editable implementation commits between merge/publication boundaries and explicit merge commits. Squash is excluded.

Implementation uses an isolated development repository because the editable plugin source is not a Git repository. The main conversation retains Feature intent and user decisions; a Sol-medium coordinator owns routine scheduling and integration, with bounded implementation and independent review delegated to subagents. Test workloads use scripted substitutes, not live model calls.

## Baseline and preservation

- Editable plugin source: `/Users/alexandrehoule/plugins/worktree-orchestrator`.
- Starting installed version: `0.1.0+codex.20260923123916`.
- Persistent pre-change backup: `/Users/alexandrehoule/plugins/backups/worktree-orchestrator-20260926-build-readiness`, containing plugin source and live agent profiles.
- Isolated development root: `/private/tmp/wto-v6.ZPQpc0`.
- Frozen source/profile copies: `baseline/plugin` and `baseline/profiles` under that root.
- Protected development destination: `destination` under that root; the coordinator creates a separate candidate using the frozen installed workflow.

The temporary baseline commit is `dc89d9a3ab851700cf676094c9aea1919c59c490`. Feature `WTO-V6-build-readiness` uses candidate `/private/tmp/wto-v6.ZPQpc0/destination/.codex-worktrees/WTO-V6-build-readiness/candidate`. The core lifecycle and verification streams have separate managed child worktrees.

Live source and profiles matched their backup snapshot before implementation. Existing trial repositories, task registries, branches, worktrees, conversations, and global model settings are outside the implementation scope. Existing unrelated LazyCode working-tree edits are preserved.

## Acceptance tracking

Baseline validation: the frozen standalone plugin ran 130 tests in 181.059 seconds, with 2 expected standalone-layout skips and no failures. The LazyCode documentation tests passed 2/2. These results describe the starting package, not acceptance of the update.

Intermediate results reported by the coordinator: the Luna native-execution helper passed 19 focused tests, including four protected parent-authored contract tests; the verification stream passed 42 existing tests and five initial v3 tests. These are stream-local results, not integrated or reviewed Feature acceptance.

Later stream milestones: native execution reached 20 focused tests; verification reported a successful 140-test standalone run and 11 focused v3 tests; core reported 13 focused v6 tests covering publication uncertainty, successful/failed segment boundaries, interrupted checkpoints, retained Git objects, active child bases, amendment-aware review, finding lineage, and decomposition. These intermediate results preceded the final acceptance recorded below.

Independent verification review blocked the initial stream on five accepted findings: early-external evidence reused as final regression, a transitive review-gate cycle, a v2 sidecar bypass through the direct verifier API, an older pass hiding a later same-content failure, and whitespace-prefixed Git paths mishandled by exclusion matching. Corrections and negative tests were returned as one batch to the same owner; the same pair retains follow-up responsibility. Passing test runs before these findings are not final acceptance.

The same verification pair subsequently passed corrective writer SHA `a6928139c96b2a83cad6da8de4b864d57abf55ae`. Managed receipt `f2b3756eb60441099a2334304a99e551` records its full suite and v3-path checks. Findings F-0001 through F-0005 were resolved, guarded readiness passed, and the stream was integrated at candidate merge `6a866b896af435c01a1e0fe40b8249554c699821`. This accepts the verification stream, not the complete Feature.

Native execution required additional pause/approval, progressed-revision resume, strict bridge-correlation, and provider-failure recovery checks. Native reviewer finding F-0006 prevented rearming a possibly live worker after provider failure. The same Luna pair passed corrective child `7ec41e4` following managed receipt `1cbe12458e574d9b8111091fc2b92fcb`, and guarded integration produced core merge `db2124fd0dcf0a919ac31bd5722f80207993ac56`. Core composition and complete Feature acceptance remain separate gates.

The initial Sol core pair blocked that merge on F-0007 through F-0010: adoption evidence/declaration binding, cross-contract Finding closure, Feature follow-up comparison baseline, and global pause enforcement for per-record actions. The same owner corrected these findings, and the same pair passed the corrections and subsequent import-validation delta; the accepted native helper certificate remained intact.

Development exposed a v5 bootstrap gap: `sync-parent` supports nested children but rejects top-level workers, preventing a core worker from inheriting its candidate's sibling integration. The Feature Lead authorized a minimal staging-only backport of guarded top-level synchronization, with focused tests and paired review before use. The original frozen bundle and live installation remain unchanged; no raw-Git bypass or mid-flight registry adoption is authorized. The corresponding supported operation belongs in the v6 result.

The bootstrap backport at `/private/tmp/wto-v6.ZPQpc0/bootstrap-v5` passed an independent scoped Luna pair at commit `9cfe482` (baseline `7aa1149`). Its patch is limited to `composition.py` and a focused regression test; patch SHA-256 is `89f6c1fefc8119338d47904e1126070eb0b605f3763b0cf79dbf3a9d86d1cd06`. Review acceptance does not waive the active Feature's source/process barriers before invoking its CLI.

A second attribution seam required a bounded bootstrap extension: scope validation must distinguish exact inherited content from authored or unknown changes. Production fix `aff26d2` passed managed receipt `9a829eacd8984c358d14cf78a5add106` and its same-pair delta review, then was integrated at `a419acac72932a7916d562e38d86a10c964bbbd7`. The separately reviewed v5 extension `989bbfe` changes only the two affected scripts and focused test; its delta from `9cfe482` has SHA-256 `1948bb1898791ccf65602286556dbd71077587c421830e40efa2e9b9cb2176ba`. Its read-only validation of the active core worktree succeeded without widening the owned-file scope. Neither bootstrap patch was installed as production code.

Two staging coordination mistakes are retained explicitly: a combined test run selected Feature scope when the frozen v5 node-verification gate required node scope; a core full run was launched before its native helper had been reviewed and integrated. Neither result is relabeled as satisfying the missing gate. The coordinator recorded remaining dependencies, checkouts, scopes, SHAs, and gates in `/private/tmp/wto-v6.ZPQpc0/gate-ledger.md`, and parent-before-child readiness is a v6 regression requirement. Unavoidable v5 scope-specific repetition remains distinct from these avoidable dispatch mistakes.

The initial final Feature receipt `76ca5425a6d742109e4a4a6a940235c0` remains failed: its suite passed, but six generated bytecode files triggered the source-drift guard. Only those generated files were removed after the process barrier; a fresh run used an external cache directory. A late declaration correction for four Oracle profile paths was also recorded honestly and followed by a fresh guidance-scope run. An optional bootstrap review test lost its session handle; its exit and descendant state remain unknown, and it is not counted as passing evidence or cleanup authorization.

## Final verification and installation

- Final exact-SHA managed receipt `34e1b395ea58408c97d2d2c5f7d22ba8`: all 16 required checks passed, no exceptions, no missing checks, all owned process groups stopped, and candidate clean. The full Python suite reported 196/196; remaining checks covered the native contract path, nonrecursive profile tests, eight profile mirrors, and plugin/skill validation.
- The independent final pair checked acceptance, composition, and evidence. Three top-level streams and the nested native helper had intact accepted certificates; there was no unresolved authored/unknown integration delta.
- Immutable candidate archive, Git bundle, patch, handoff, gate ledger, and managed evidence are retained under `/Users/alexandrehoule/plugins/backups/worktree-orchestrator-20260926-build-readiness/reviewed-candidate`. The sibling `plugin` and `profiles` directories remain the pre-change backup.
- The live source matched its frozen baseline before replacement. The eight affected live profiles also matched their baseline; unrelated profiles were not replaced. The immutable export matched the installed source before the cachebuster change (an existing empty `scripts` directory was preserved).
- Supported installation produced `0.1.0+codex.20260926182109`. Installed cache and source match byte-for-byte, excluding generated Python caches; all eight live profiles match accepted candidate and source templates. Plugin and skill validators passed against the installed cache. Installed standalone profile tests ran five cases with two expected layout skips and no failures.
- Global `gpt-6-astra` / `medium` settings were preserved. The protected scratch destination remains at `dc89d9a3ab851700cf676094c9aea1919c59c490`, with no promotion. Real LazyCode working-tree edits were not staged or committed.
- LazyCode documentation checks passed 2/2 after the final record update (2026-09-26 14:22 local). This is separate working-tree evidence, not part of the candidate managed receipt.

The eight updated profiles are `wt_luna_implementer_medium`, `wt_luna_reviewer_medium`, `wt_luna_verifier_low`, `wt_sol_coordinator_medium`, `wt_sol_implementer_medium`, `wt_sol_oracle_high`, `wt_sol_oracle_medium`, and `wt_sol_reviewer_medium`. Profile IDs, model choices, efforts, and sandbox settings were retained while workflow instructions changed.

## Use and remaining limitations

Start a fresh Codex task/Feature to pick up the installed skills and profiles. Existing v5 records remain inspectable; adoption to v6 and verification profile changes are explicit operations, not installation side effects.

Managed checkpoints amend the current unpublished, unintegrated implementation commit within its segment. Actual child/parent merges and successful or observed publication close the segment and permit a new implementation commit; merge commits remain explicit. Published or integrated history is not amended, and old history is not compacted. Remote publication uncertainty fails closed; an out-of-band publication subsequently erased before observation cannot be disproved.

The App Server bridge remains disabled and tested with fakes only. Native observations and next-action guidance do not guarantee continuation after the root conversation ends. Effective runtime routing remains unverified unless actually observed. Managed workspace checks do not constitute an OS sandbox, and cooperative authority records are not authentication. No paid/live-model benchmark was performed, so no cost or speed improvement is claimed. The development run still exposed coordination overhead, documented above; ordinary use must establish whether these changes reduce it.
