# Codex Worktree Workflow Improvement Plan

Status: implemented and installed; live model routing not exercised by automated tests
Date: 2026-09-10

## Implementation outcome

Installed `worktree-orchestrator@personal` version `0.1.0+codex.20260911005844` from `/Users/alexandrehoule/plugins/worktree-orchestrator`. Ten fixed-model namespaced profiles are installed in `/Users/alexandrehoule/.codex/agents/` and match their source templates byte-for-byte. The generic Reviewer and Oracle have bounded follow-up/adjudication guidance, and the shared delegation skill distinguishes this workflow from simple same-worktree delegation. Global primary-model, reasoning, and context settings were preserved.

The staged implementation passed 23 deterministic tests, including installed-layout checks; an independent standalone copy passed with two expected staging-only skips. Both original Terra reviewers cleared the implementation and focused corrections. Installed source and cache passed plugin validation; the shared skill passed validation. Tests did not call live models.

Implementation evidence: `/Users/alexandrehoule/plugins/backups/worktree-orchestrator-20260911T000849Z/IMPLEMENTATION_REPORT.md`. Original source and profiles are preserved under that private backup directory. The reviewed staging code/config revision was `2da38962ed96955d7978ed5161336a350a603b07`; final staging revision `0dfa0adca31e272d7eafa5066fe6c9fd82ed0fe9` adds the report only. Installation subsequently updated only the manifest cachebuster.

A fresh Codex task is required to pick up the new profile/skill catalog. Select Astra Medium for the main Feature Lead and use an isolated Feature worktree; the plugin does not change the global model picker. Offline `codex debug prompt-input` renders message inputs but did not expose the custom tool-role catalog, so it does not prove live profile routing. Effective metadata remains explicitly unverified until observed during normal authorized work; no paid agent smoke test was run to establish it.

Legacy task state remains inspectable. Explicit `adopt-legacy` requires fresh contract approval and invalidates readiness/verification before v3 execution; there is no silent migration of ongoing tasks. This completes the plugin/profile implementation of the pre-LazyCode tweak, not implementation of the LazyCode application.

## Objective

Improve the existing `worktree-orchestrator` Codex plugin and its cooperating agent profiles so the main conversation acts as a Feature Lead: define the Feature with the user, obtain approval, delegate implementation, evaluate concise evidence, and return a coherent candidate. Reduce repeated review, unnecessary model escalation, context growth, and unapproved design changes without discarding verification.

This records the user's pre-implementation tweak for LazyCode. The user approved explicit Astra/Luna-oriented model routing, two parallel reviewers, and model/effort visibility in agent names. The proposal below is retained as design history; the implementation outcome above records what was deployed and its validation limits.

## Inspected sources and validation

The installed plugin is `worktree-orchestrator@personal`, version `0.1.0+codex.20260831201734`.

- Editable source: `/Users/alexandrehoule/plugins/worktree-orchestrator`.
- Installed cache: `/Users/alexandrehoule/.codex/plugins/cache/personal/worktree-orchestrator/0.1.0+codex.20260831201734`.
- Personal agent profiles: `/Users/alexandrehoule/.codex/agents/`.
- General delegation skill: `/Users/alexandrehoule/.codex/skills/codex-delegation/SKILL.md`.
- Marketplace: `/Users/alexandrehoule/.agents/plugins/marketplace.json`.

`codex plugin list` resolved the editable source above. Source and installed cache compared identically. The editable plugin directory is not currently a Git repository.

Read the skill, lifecycle and packet references, manifest, all six bundled agent templates, all six personal agent profiles, relevant CLI implementation, and its test suite. The existing 22 local CLI tests passed in approximately 37 seconds using temporary Git repositories; no AI agents or model calls were used.

The current conversation exposes the personal `workstream_lead` definition, not the different bundled template. The plugin's slice-specific roles are absent from this conversation's callable role catalog. This is evidence of the current configuration, not a claim about every past run. No historical usage trace was analyzed, so exact time/token attribution and expected savings are not measured.

## Findings driving the proposal

### 1. The workflow makes the primary an additional implementation/integration lead

`skills/orchestrate-worktrees/SKILL.md:8` assigns the primary architecture, top-level integration, the repository-wide final gate, and cleanup. Lines 67 and 108–113 require repeated direct diff inspection and independent top-level review. Delegated leads also write shells/tests, resolve conflicts, inspect full changes, and orchestrate children.

This creates a root -> Feature Lead -> slice lead -> implementer stack even when the user's conversation already contains one Feature. Main-context growth and duplicated inspection are consequences of the prescribed workflow.

### 2. Bundled and personal agents disagree

The bundled `config/workstream-lead.toml` specifies Terra High and permits structural operations on children. The personal `~/.codex/agents/workstream-lead.toml` specifies Terra Medium, sequential writing in one worktree, and forbids creating or merging worktrees. Personal coders also forbid commits, while the plugin requires committed child checkpoints. The general delegation skill forbids delegating commits and directs the parent to resolve conflicts and run checks.

The plugin publishes a skill and keeps templates under `config/`; its effective agents must be installed or registered deliberately. Merely shipping those template files does not establish that this task uses them. The observed role mismatch needs fixing before tuning their prose.

### 3. Repeated review is required, not just improvised

Every writer needs passing review; each converged parent is reviewed again; top-level nodes additionally require a separate Sol Medium primary review. The CLI enforces that final model-specific gate through `primary_review_satisfies_integration()` and `cmd_integrate()`.

Some levels legitimately verify different behavior. The problem is that the instructions do not reliably separate already-reviewed child internals from the parent's new integration responsibilities, so several reviews can rediscover the same subjects.

### 4. Review cycles force and retain Oracle involvement

`cmd_record_review()` counts every blocking review in the node's history and refuses ordinary review recording after two. `cmd_record_oracle()` is enabled by that count rather than an unresolved question. `review_satisfies_readiness()` prefers Oracle records whenever any exist, even if a later ordinary review passes the new HEAD.

A pure-function diagnostic confirmed that an old Oracle pass plus a current ordinary review pass returns not-ready. This can require further Oracle evidence after later changes without a new adjudication need.

### 5. Model matching is not reliable evidence of the actual reviewer model

Bundled reviewer/oracle templates omit `model`; inheritance follows the spawning context, not the identity of the code author. The CLI's `expected_model_family()` searches for `sol`, `terra`, or `luna` in a profile string. The documented names `workstream_lead`, `complex_workstream_lead`, `slice_lead`, and `slice_implementer` all return no expected family. This was confirmed by a local function diagnostic.

Recorded `--model-family` is caller-supplied, not observed execution provenance. An expensive parent commissioning a cheap worker's review therefore needs explicit routing rather than an assumed inheritance rule.

### 6. Approval and Findings are too weakly represented

Task state records paths, dependencies, review outcomes, and free-text evidence, but no durable approved Feature-contract revision, bounded decision authority, or per-Finding disposition. `extend-scope` is root-owned and audited, but an explanation of a changed path is not proof that the user approved a changed product or architectural decision.

The personal Oracle also asks to identify important missed issues during adjudication. Without mode-specific boundaries, a request to settle one disputed Finding can grow into another broad review.

### 7. Synchronization and runtime capacity can create additional work

Child validation requires the current parent branch to be an ancestor. Each sibling integration can force another child synchronization, change its HEAD, and invalidate review evidence. A new revision still needs verification, but not necessarily another unrestricted full review.

The CLI counts active JSON nodes while Codex limits concurrently open spawned threads. Retained reviewers, blocked nodes, and coordinators can make these populations differ. Hardcoded six-writer/two-adviser limits must not be treated as guaranteed available runtime slots.

## Proposed workflow

```text
User and Astra Feature Lead define one Feature
  -> approved contract and delegation/verification plan
  -> Terra execution coordinator handles the implementation loop
  -> Luna-first Implementation Workers in owned worktrees
     -> bounded child Implementation Workers only where useful
  -> responsible parent/coordinator commissions two parallel scoped reviewers
  -> coordinator deduplicates and evaluates Findings within approved authority
  -> same worker corrects accepted Findings
  -> original reviewers check the corrective delta
  -> coordinator performs guarded integration and commissions verification
  -> one Feature acceptance boundary with paired review of the combined outcome
  -> Astra receives a concise final report or a genuine user-decision escalation
  -> user authorizes base-branch integration; coordinator executes it
```

### Main Feature Lead

- Recommend Astra Medium for planning this workflow; preserve explicit user model/effort choices and do not silently change global defaults.
- Own requirements, approved Decisions, non-goals, acceptance criteria, decomposition, and verification planning.
- Do not write production code, test code, or manual conflict-resolution edits. Delegate those to implementation workers.
- Approve the implementation and verification plan with the user, then hand routine scheduling, review disposition, test execution, integration, and cleanup to a Terra coordinator.
- Stay outside the repetitive implementation/integration loop. Receive a concise final report, user interventions, or questions that actually require new authority; do not poll each worker or re-review its diffs.
- Keep one Feature as the default conversation scope. Use one execution coordinator for that Feature rather than another Feature Lead per top-level Task. Multiple requested Features are planned explicitly.

### Execution coordinator

Use Terra Medium to run the approved Feature plan. It is the Feature Lead's bounded operational delegate, not an independent owner of product or architectural decisions.

The coordinator owns day-to-day Task admission, explicit model routing, paired-review scheduling, Finding deduplication and disposition, follow-up, test-runner dispatch, guarded integration, and cleanup. It does not author implementation or manual conflict-resolution code; implementation workers do that.

Use the same designated Feature integration checkout under explicit coordinator authority. Do not introduce another artificial Feature branch merely to host the coordinator. The CLI must recognize that delegated operator while preserving direct-parent structural ownership for nested Tasks.

Routine worker/reviewer events go to the coordinator or immediate implementation parent. Astra is contacted only when the approved contract cannot answer a question, the user intervenes, or the candidate is ready. Completing integration must not require another Astra code review or Astra approval of each internal merge.

This adds one purposeful execution delegate to keep the expensive planning model out of the loop, while removing the old repeated primary -> workstream Feature Lead -> slice lead layers for ordinary Tasks.

### Proposed model routing

The current task advertises Astra, Sol, Terra, and Luna as available model choices. This confirms an available routing surface here, not that newly installed custom profiles have already been exercised. Preflight must still resolve effective profiles in the destination task without making paid test calls.

| Responsibility | Initial configuration | Boundary |
| --- | --- | --- |
| Main Feature Lead | `gpt-6-astra`, Medium | User planning, approved intent, genuine escalations, concise final handoff |
| Execution coordinator | `gpt-5.6-terra`, Medium | Entire routine orchestration and integration loop |
| Clear implementation/helper Task | `gpt-5.6-luna`, Medium | Default writer when the contract is bounded and concrete |
| Broader implementation or demanding recursive Task | `gpt-5.6-terra`, Medium | Explicit assignment when Luna's narrow scope is unsuitable |
| Exceptional difficult implementation | `gpt-5.6-sol`, Medium initially | Deliberate task assignment or parent-authorized recovery; deeper effort only when justified |
| Two reviewers for a Luna Task | Two `gpt-5.6-luna`, Medium activations | Independent initial assessments of one paused revision |
| Integration/Feature review pair | Two `gpt-5.6-terra`, Medium activations by default | Combined behavior and integration responsibilities; Sol review only when explicitly justified |
| Focused lookup, verification runner, routine result summary | `gpt-5.6-luna`, Low or Medium | Prefer deterministic CLI processing where it suffices |
| Oracle for a bounded dispute | Terra Medium initially; Sol Medium/High only when justified | No automatic Astra escalation and no general missed-issue sweep |

For a Terra or Sol implementation Task, match the review configuration to that Task's approved model tier unless the plan records a justified alternative. Astra is not a routine writer, reviewer, Oracle, verifier, or integrator in this workflow. Using it in one of those roles requires an explicit user exception, not availability fallback or silent inheritance.

Treat Luna-first as scope-based routing rather than a target percentage or automatic weak-model retry loop. Make small work frequent by planning useful bounded contracts, not by manufacturing helper services or splitting tightly coupled changes just to create more agents.

These are proposed effort defaults, not a change to the current thread or global Codex configuration. Keep standard speed by default unless the user requests otherwise; do not assume more reasoning or faster service gives better allowance efficiency.

### Visible model and effort labels

Agent names should let the user identify the configured model, responsibility, and reasoning effort at a glance. Examples:

| Visible label | Example profile identifier |
| --- | --- |
| Astra · Feature Lead · Medium | Main conversation; no redundant spawned lead |
| Terra · Coordinator · Medium | `wt_terra_coordinator_medium` |
| Luna · Implementer · Medium | `wt_luna_implementer_medium` |
| Terra · Implementer · Medium | `wt_terra_implementer_medium` |
| Luna · Reviewer A · Medium | `wt_luna_reviewer_medium`, review-pair slot A |
| Luna · Reviewer B · Medium | `wt_luna_reviewer_medium`, review-pair slot B |
| Terra · Reviewer A/B · Medium | `wt_terra_reviewer_medium`, with explicit instance slot |
| Sol · Oracle · High | `wt_sol_oracle_high`, only when justified |

Use model/role/effort-specific profile identifiers for fixed configurations rather than relying on generic role names that hide model inheritance. Reviewer A/B identifies separate instances of the same review role, not different authority. Include the assigned Task identifier in status output or instance labels where supported.

Configure native role names/nicknames and spawn task names to expose this information where the current app supports it. Always include it in CLI status and orchestration summaries so visibility does not depend entirely on how a particular app version renders agent cards.

Names describe intended configuration. Record requested and effective model/effort separately when runtime metadata is available, flag mismatches, and do not report a label as proof that routing succeeded. If effective metadata is unavailable, mark it unverified rather than inferring it from the name. Authorized model changes update the activation's visible configuration without replacing its logical worker identity.

### Approved contract and decision boundary

Persist a small versioned Feature contract and Task packets: current and desired behavior, acceptance, in/out of scope, approved architecture, forbidden changes, interfaces, owned paths, test obligations, dependencies, and escalation conditions.

Record the approved revision and approval reference before writer activation. A genuine change to behavior, schema, public interfaces, dependencies, security assumptions, or architecture must return to the Feature Lead and user unless already covered by approved decisions. Routine implementation choices remain delegated.

Scope extensions must state whether they merely add a necessary implementation path or change the contract. Changed contract revisions invalidate dependent readiness/acceptance. Reviewers and Oracles cannot approve new product direction.

These are cooperative Codex workflow guards. A CLI flag or recorded approval reference alone is not proof of authenticated human consent, and this plugin is not a replacement for Codex's sandbox or LazyCode's future authority system.

### Implementation and tests

Use one Implementation Worker responsibility with the Luna-first configurations above. File count or the presence of children alone does not force a stronger model; contract clarity, coupled reasoning, and known complexity guide the choice. Preserve or confirm supported configurations during implementation rather than using model-name substring matching.

Allow useful recursive helper delegation within the approved plan, without forcing a model handoff merely because delegation is needed. Ask for parent guidance before treating difficulty as a reason for a stronger model. Reassignment after failure remains parent-owned.

Test authoring stays inside normal implementation work. The initial worker's plan must establish its tests before production implementation; recursive child contracts receive tests from their implementing parent. The exact first-test checkpoint/authorization sequence under the non-coding primary must be made explicit when implementing the new flow; do not add a permanent test-author role or waive testing for new code.

Retain the agreed test coverage obligations. Use a delegated verification runner for long execution and structured results. No duplicate invocation of an identical required check at an unchanged commit merely because another agent takes over; changed code invalidates old test evidence, and the combined Feature still receives its required full verification. Missing legacy suites are reported as No tests available, not as tested behavior.

### Scoped review and a Finding ledger

The direct parent commissions review of its child's work. For the Feature Lead's direct Tasks, its authorized execution coordinator performs this routine responsibility. The implementer does not choose or accept its own reviewers.

Give each review a declared purpose:

- Task contract/correctness review over the assigned change and relevant execution path.
- Parent convergence review over its own changes, wiring, interactions, and unverified integration risks; refer to accepted child evidence.
- One Feature acceptance boundary against the combined Feature contract, using the paired-review protocol below. This replaces the mandatory separate Sol re-review of each top-level Task, rather than adding another blanket scan. If convergence and Feature acceptance cover the same result and contract, combine them instead of launching duplicate pairs.

For each initial review round, launch two independent reviewers against the same paused commit. Give both the relevant approved contract and evidence, with complementary emphasis: one on behavior/acceptance and one on edge cases, error paths, and interactions. Do not show either reviewer's initial Findings to the other before both return. Specialized architecture or safety review keeps its own scoped guidance; two reviewers do not mean two unrestricted repository audits.

The coordinator merges duplicate Findings into one correction item while retaining both sources, resolves conflicting interpretations within approved authority, and batches accepted corrections for the implementer. Two reviews can improve coverage but do not guarantee independence of model errors or a clean result.

Maintain a small structured Finding ledger with stable IDs, reviewed revision, violated requirement or concrete defect, trigger, impact, evidence, and parent disposition: accepted for correction, rejected with rationale, needs clarification, or resolved. Suggestions and new design proposals do not automatically block implementation.

After a batch of corrections, return the delta and Finding dispositions to the original pair for focused follow-up. Do not restart two broad reviews after each individual fix. Both required reviewer records must cover the final revision before acceptance; old passes are not relabeled with a new SHA. Reviewers may report real newly introduced defects, and material interface or scope changes may require broader review with an explicit reason.

Bind new follow-up evidence to the current HEAD. Reusing context is not reusing stale approval. Exact changed-file scope and parent integration checks remain enforced.

### Oracle as adjudicator

Remove automatic Oracle invocation after a lifetime count of two blocking reviews. Request an Oracle only for a specific disputed Finding, unresolved technical question, or demonstrated lack of progress that needs another opinion.

The packet identifies the question, competing interpretations, approved context, evidence already gathered, and required answer. In adjudication mode, it does not conduct another broad missed-issue search. Additional serious issues can be reported with evidence but do not silently expand the task.

An Oracle result resolves its bounded question; it does not permanently replace review readiness for the node. Later revisions can return to ordinary follow-up review. Neither review nor Oracle judgment substitutes for user approval of changed intent.

### Context, model routing, and capacity

Use self-contained Task packets and references instead of full conversation forks for ordinary implementation and review. Explicitly choose the model and supported effort using the capabilities of the current Codex runtime. Review model selection follows the work reviewed, not the model of the commissioning parent.

Namespace and encode model/effort in plugin profiles, for example `wt_terra_coordinator_medium`, `wt_luna_implementer_medium`, `wt_luna_reviewer_medium`, and the relevant Oracle/verifier variants, to avoid the existing `workstream_lead` collision and expose intended routing. Use explicit settings and fresh-context spawning where supported. Never silently fall back to an unavailable generic role or an expensive inherited model.

The Astra Feature Lead lives in the main conversation through skill instructions. Its one Terra execution coordinator handles the loop; there is no separate Feature Lead child for each Task. Retain a bounded research/guidance capability without mandatory approval-agent calls for routine actions.

Start with two concurrent writing Tasks as a configurable workflow default, leaving capacity for the coordinator, implementation parents, verification, and a pair of reviewers. Reserve both review leases atomically before launching a pair, so two branches cannot each occupy one slot while waiting for a second. By default one branch receives its review pair at a time; parallelizing two reviewers does not imply four simultaneous reviewers for two branches.

Respect the actual Codex thread ceiling and account for idle retained threads as well as JSON node states. Persist reviewer identity and ledger for follow-up; if a session must be reconstructed to release thread capacity, restore its existing review scope and dispositions instead of treating it as a new broad review. Do not release a lease while its corresponding reviewer is still running.

Do not change global parent-model or context-window settings as an incidental part of this work. The current global compaction/context settings and agent capabilities should be recorded during preflight; routing must not assume a child received a cheaper model just because a packet says so.

## Implementation work packages

### 1. Align source, discovery, and responsibilities

Update the editable plugin, never only its installed cache. Keep its manifest/default prompt, skill, lifecycle reference, and task packets consistent around an Astra planning Feature Lead, one Terra execution coordinator, and Luna-first writers.

Install/register namespaced personal agent profiles using a supported current Codex mechanism. The current bundled `config/` templates must have a deliberate distribution path. Add a configuration check that verifies profile presence, names, model/effort selection, and permissions. Verify the callable catalog in a new task after installation.

Generate visible labels and fixed-configuration profile IDs from the same routing definitions. Include review-pair instance labels and requested/effective configuration in status output; do not maintain contradictory naming and model tables independently.

Update the general `codex-delegation` skill to distinguish its simple same-worktree mode from this worktree-owned workflow. Its blanket no-child-commits rule must not apply to authorized isolated writers. Retain its conservative behavior outside this workflow.

Avoid silently replacing general-purpose personal agents. If compatibility aliases are retained, document their mode and behavior. Narrow the generic Oracle's adjudication mode and give generic reviewers a follow-up mode if those profiles will still be used here. Generic coder reassignment instructions should favor guidance before automatic promotion.

### 2. Add contract, Finding, and review-session records

Extend the current JSON state rather than importing LazyCode's planned SQLite architecture. Store contract revisions/approval references, delegated coordinator authority, explicit model configuration, review purpose, pair/session IDs, both reviewer identities and statuses, baseline and current SHA, deduplicated Finding dispositions, bounded Oracle requests, and verification evidence.

Add guarded operations for contract approval/change, Finding disposition, and review follow-up. Change review commissioning to be parent-owned while still targeting the paused child's worktree. Do not rely solely on the current command's working directory as an authenticated actor identity.

### 3. Repair convergence and readiness logic

Replace lifetime blocking-count escalation and sticky Oracle precedence with explicit outstanding Findings and required review sessions. Remove the hardcoded Sol Medium primary gate for every top-level Task and introduce the single combined Feature acceptance boundary. The new pair gate requires both current reviewer results and resolution of accepted blockers; a single pass cannot silently satisfy it.

Separate child-change evidence from current integration-baseline evidence. Batch relevant parent synchronization with corrections and review the resulting delta/integration effects; do not stamp an old review as approval of a new HEAD. Preserve scope validation and changed-HEAD rejection.

Integrate independently ready children when their dependencies permit rather than waiting for every unrelated sibling before any useful integration. Keep structural operations parent-owned and safe cleanup conditional on verified ancestry and retained work.

### 4. Validate without live AI calls

Keep existing structural invariants and update policy tests deliberately. Add deterministic fixtures for:

- activation without an approved contract or with a stale contract revision;
- changed scope versus changed product intent;
- rejected Findings not automatically creating correction work;
- follow-up using the same review identity and exact new SHA;
- atomic two-slot admission, independent pair records, and release only after actual reviewer completion;
- both required reviews present before acceptance, with duplicate Findings creating only one correction item;
- batched delta follow-up for the original pair without stale-SHA approval;
- new concrete defects remaining blocking;
- ordinary review after prior Oracle adjudication;
- bounded Oracle invocation without a mandatory two-review threshold;
- no duplicate mandatory top-level Sol review;
- model lookup for actual role IDs and explicit routing from the subject worker;
- profile identifiers and visible labels matching configured model/effort, including distinct Reviewer A/B instances;
- effective-routing mismatches or unavailable metadata being visible rather than hidden by a reassuring name;
- Astra excluded from routine integration, verification, and review dispatch, including fallback paths;
- coordinator-authorized structural operations without delegated product-decision authority;
- parent-owned review, direct-child integration, reserved capacity, and recoverable conflicts;
- old state remaining inspectable and recoverable.

Use mocked agents and temporary Git repositories. Do not launch real subagents to benchmark the workflow or consume live model/API usage for tests. Static configuration checks cannot prove every installed-app runtime behavior; any later observation of effective routing should happen during ordinary user-authorized development.

### 5. Safe rollout

Before edits, back up the source and personal profiles because the source directory currently has no Git history. Keep old task state and old policy interpretation available; migrate active tasks only through an explicit version-aware path, not by rewriting their approvals or declaring them verified.

Validate the updated plugin and skill, run local tests, use the plugin-creator cachebuster helper, and reinstall through the confirmed `personal` marketplace. Do not hand-edit cache copies or marketplace files. New profiles and instructions are picked up and inspected in a new Codex task.

The later implementation will need filesystem approval for plugin and personal-agent paths outside the LazyCode workspace. This proposal does not edit or reinstall them.

## What stays deliberately small

Preserve guarded worktrees, direct-parent integration, path containment, locks, exact-SHA evidence, no automatic pushes, and safe cleanup. Do not build LazyCode's database, sandbox service, complete lease system, or every organizational role inside this plugin.

Guarded commit compaction can be a later improvement; do not add blanket amend/reset permission while changing review semantics. Do not reduce required testing merely to improve timing metrics.

## Acceptance and expected effect

After approval and implementation, a normal task should visibly follow: plan with Astra, user approves the contract, Terra coordinates Luna-first implementation and paired review, the original pair checks corrective deltas, and Astra receives the concise integrated candidate for user review. Astra is not repeatedly invoked for worker completion, Finding disposition, test execution, or internal merges.

Success indicators during actual development are fewer repeated full-diff reviews, fewer automatic Oracle calls, less primary-context code/log ingestion, explicit approval before material design changes, correct model/profile routing, and preserved verification evidence. No percentage savings are promised without usage measurements.

Paired review intentionally adds an initial second review. Measure its Findings and usage during normal work; concurrency may shorten elapsed review time but does not remove the second model's consumption. The intended savings come from cheaper explicit routing, removing duplicate review layers, batching corrections, and keeping Astra outside the loop. Do not run paid A/B Tasks to prove the hypothesis.

## Official configuration references

The [official subagent documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents) describes personal/project agent TOMLs, configuration inheritance and overrides, explicit model/effort selection, and the legacy `max_threads` alias. The current task's available spawn controls and exposed role catalog must also be checked rather than assuming every documented configuration is active.

The [official model guidance](https://learn.chatgpt.com/docs/models) identifies Astra for demanding work, Terra for everyday work, and Luna for clear bounded work. The [Codex usage guidance](https://learn.chatgpt.com/docs/pricing#what-are-the-usage-limits-for-my-plan) includes focused coding among Luna's uses and explains that model, context, reasoning, tools, and caching affect allowance consumption. No API-price ratio or fixed messages-per-Task estimate is used as a prediction of this account's savings.

Local plugin maintenance follows `/Users/alexandrehoule/.codex/skills/.system/plugin-creator/references/installing-and-updating.md`: modify source, validate, refresh the cachebuster, reinstall, and inspect in a new task.
