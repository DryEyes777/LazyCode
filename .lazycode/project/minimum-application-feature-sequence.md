# Minimum Application — Feature Sequence

Status: sequence order approved; individual specifications and detailed acceptance proposal pending
Last updated: 2026-09-26

## Target

Use a clean bundled/compiled LazyCode application to plan and complete further LazyCode development through its local web interface: one repository and one active Delivery, with real persistence, controlled execution, delegation, review, recovery, and user-approved integration.

The [minimum application plan](minimum-application-plan.md) records confirmed product boundaries. The user approved this sequence's order on 2026-09-26: "Yeah the order looks good". This approves ordering, not every technical detail or the full acceptance proposal below. P1–P8 remain temporary planning labels. V1 maps to [F003 — DSH execution validation](../features/F003-dsh-execution-validation/feature.md), and V2 to [F004 — local execution isolation](../features/F004-local-execution-isolation/feature.md). The user subsequently approved product-definition revision 1 for both: they are Defined, with technical planning pending, not scheduled or started. Application candidates still need their own product definitions, technical specifications, acceptance criteria, and approvals; split oversized candidates during planning rather than treating a row as an unrestricted implementation assignment.

## First: validate the foundations

| Work | Required outcome | What it gates |
| --- | --- | --- |
| **F002 — SQLite persistence validation** | Execute the already-approved specification and A01–A25 scenarios; report correctness, failure recovery, copy/storage costs, limitations, and what is suitable for production reuse. | P1/P2 persistence design and all dependent production assumptions. Approved planning is not experimental proof. |
| **V1 — DSH execution compatibility** | Validate the pinned DSH integration behind the separate backend: start/message/stop/observe, activation identity, terminal events, cancellation, reconstruction, tool control, and interception before sensitive output reaches models/logs. Use scripted model substitutes. Document gaps and adapter/process choices; no automatic dependency upgrade. | P4 execution design and DSH-specific controls used by P3. |
| **V2 — Minimum local enforcement** | Select and prove a practical macOS boundary for worker-controlled code, scoped filesystem access, protected database/Git/secret state, network denial and grants, process ownership/termination, and isolation from the managing application. Record actual limits and unsupported operations. | P2/P3 enforcement and any real worker code/command execution. Command-name approval alone is insufficient. |

F002 is the first execution priority after separate scheduling/start approval. V1 and V2 can be researched independently of its storage experiment; their implementation/testing also requires approved scoped work. V1/V2 must agree on the tool interception boundary before production acceptance. Neither requires a production scheduler, live model usage, full sandbox-provider integration, or browser QA.

If a gate fails, return its findings for a scoped design revision. Do not bypass it with prompt-only restrictions, unrestricted host execution, or unverified database reuse. No gate here has run merely because it appears in this plan.

## Application candidates in dependency order

| Candidate | Usable outcome and proof | Prerequisites |
| --- | --- | --- |
| **P1 — Local application and project state** | Start the separate backend; serve a minimal project launcher and navigation; register/open the repository; initialize/read controlled project state; reconnect the browser without losing backend state. Prove one owner of writable project state, incompatible-format handling, local web-access controls, and clean separation of source, installed application, and data. | Accepted F002 findings; chosen host/package layout. |
| **P2 — Managed workspaces, authority, and checkpoints** | Create owned branches/worktrees, assign scoped grants, and perform controlled data/Git operations. Prove parent/child imports, editable-commit boundaries, approval records, revocation checks, external-edit detection, and recovery without touching the user's unrelated checkout. Include the now-approved Delivery-owned Task relationships in the production schema. | P1, F002 findings, V2 findings. |
| **P3 — Controlled commands and information access** | Run approved tests/commands with foreground wait or background notification, process tracking, durable results, and default-denied network access. Provide managed variables/secrets and intercepted output. Add bounded file tools and controlled public research with optional domain restrictions and outgoing-data controls. Prove denial paths, child-process containment, overrun notifications without automatic cancellation, and safe cleanup. | P2, V2; V1 for DSH interception compatibility. |
| **P4 — Durable workers and DSH activations** | Activate a logical worker through the adapter with bounded context, role/grants, and resolved model/provider configuration. Persist requested/observed routing and available usage. Prove message delivery, completion correlation, compaction/reconstruction, cancellation, approved fallbacks, and no acceptance inferred from a finished turn. Wire tools only through P2/P3 controls. | P1–P3, V1. |
| **P5 — Project and Feature planning through the web UI** | Use Project Guide/Project Manager conversations to inspect and refine project documents, Epics, Features, technical plans, and Delivery composition. Show structured drafts, revisions, product/technical approvals, and model/command settings. Prove approval invalidation and planning branch isolation; no automatic start. Define an explicit, user-reviewed route for bringing existing LazyCode Markdown knowledge into application planning without silently migrating or approving it. | P2–P4; approved UI/API and planning schemas. |
| **P6 — Delivery execution and supervision** | Explicitly start an approved Delivery; coordinate bounded Feature/Task trees, test-authoring bootstrap, ephemeral approval, and independent work through backend events. Show progress, ownership, permissions, alerts, and direct worker redirection. Prove reserved completion capacity, duplicate-event handling, no model polling, graceful pause, forced stop, and user-authorized crash recovery. Verification remains an explicit dependency, not an automatic success stub. | P3–P5; approved worker/Task transition and scheduling contracts. |
| **P7 — Verification, corrections, and approved integration** | Run required test layers; commission independent scoped reviews; retain Findings/dispositions and intact child review evidence; send corrections to the proper owner. Integrate verified results, require the separate full Delivery test run, and present a candidate with manual QA instructions, reports, and limitations. Include Project Manager-authored documentation updates. Prove rejection/rework, Delivery-owned correction traceability, exact-revision acceptance, explicit user merge approval, mechanical closure records, and user-requested-only pushes. | P2/P3 Git and evidence mechanisms, P5 approvals, P6 orchestration. |
| **P8 — Clean distribution and dogfooding acceptance** | Produce the standalone bundled/compiled artifact and run the complete browser-driven workflow below with scripted agents. Test candidate versions against isolated fixture state without affecting the installed managing version. Demonstrate manual version replacement on the same fixture repository with no active work, compatibility checks, recoverable state, and no implicit resume. | P1–P7; approved packaging and version/state-compatibility contract. |

This is dependency order, not eight forced sequential implementation sprints. Shared interfaces must be approved before independent pieces run in parallel, and their gates must be integrated before dependent acceptance. Packaging separation starts in P1; P8 verifies the distributable result rather than introducing isolation at the end.

Each candidate includes tests and the smallest useful UI for its own behavior. The final milestone is not backend-only with all interface work postponed. The navigation remains Projects, then Deliveries, Epics, Features, Project Documentation, Project Settings, and Alerts; worker chat/tool detail stays expandable rather than the main supervision view.

## Scripted end-to-end acceptance proposal

Use real application APIs/storage, SQLite, temporary Git repositories/worktrees, real fixture commands, and the web UI. Script agent responses and external research/model/provider services. An attempted live model call must fail the test, including when real credentials happen to exist. This proves application behavior, not real model quality.

1. Launch the packaged backend with isolated settings and a fixture repository. Register/open the Project, inspect it through a scripted Guide, and refine project/Epic/Feature definitions with a scripted Project Manager.
2. Approve product and technical definitions, compose a Delivery, and prove no work starts until explicit start. Confirm that revisions invalidate the appropriate approvals.
3. Execute a small Feature with a coding parent and a genuinely separate helper contract, protected executable tests, and independent review. Use the test-authoring bootstrap where the initial contract tests are absent.
4. Inject a real failing fixture check and a scripted valid Finding. Correct the code, rerun required tests, and return the delta to the same logical Reviewer with settled Findings. Verify parent composition without blanket re-review of intact helpers.
5. Exercise denied file/data/network access and a withheld secret-bearing result. Distinguish permission escalation from unsupported capability; do not allow a generic command or research tool to bypass the denial.
6. Pause while work exists, stop owned processes, persist checkpoints, and reconstruct the same workers. Refresh/disconnect the browser without pausing the backend. Separately test unexpected restart: no automatic work resumption, explicit user authorization, and reconciliation before execution. Duplicate or late completions must not override a user pause or cause duplicate side effects.
7. Integrate the Feature, then introduce a scripted Delivery-level defect in already-approved behavior. Produce a linked Delivery-owned corrective Task/new Report without reopening the integrated Feature. A requested change in desired behavior must instead hit the Feature approval boundary.
8. Run the full Delivery suite, prepare the combined code/documentation/report candidate, and exercise user rejection followed by corrections and renewed verification. Explicit approval permits the target merge; no approval means no merge, and no push request means no push.
9. Restore the committed result without original conversations and check code/data/evidence consistency. Test a separate candidate build against fixtures and a manual clean-version switch while execution is stopped. The old managing instance's code, database, configuration, and credentials remain unaffected by candidate tests.

Record per-stage evidence, failed attempts, required-check coverage, model observations (unknown where unavailable), and direct/subtree usage attribution without claiming measured AI savings from scripted outcomes. Only subsequent user-authorized ordinary development establishes practical dogfooding quality. Live AI smoke tests remain optional, separate activities requiring explicit request.

## Deferred beyond this milestone

Full OpenSandbox/provider integration, automated browser QA workers, native desktop QA automation, multiple repositories, concurrent Deliveries, remote hosting/multi-user collaboration, authenticated/private research integrations, in-place/automatic updates, and pause–update–resume convenience. Basic enforceable isolation, required tests, manual QA, and human approval are not deferred.

## Next approval boundary

With sequence ordering approved, refine candidate boundaries and prepare individual Feature product/technical contracts, including concrete schemas, APIs, dependency choices, security checks, and failure behavior. Review the detailed end-to-end acceptance proposal separately. Do not manufacture Feature approval from roadmap approval. Schedule and start Deliveries separately; F002's existing approval does not automatically start its S0 Task.

Step 3 remains in progress while required contracts and detailed acceptance are not yet settled. The [readiness register](development-readiness.md) continues to track those gaps. No production storage or execution assumption is treated as validated before its respective gate has produced accepted findings.
