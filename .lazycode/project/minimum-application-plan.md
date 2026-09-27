# Minimum Application Plan

Status: Step 3 planning in progress; implementation not authorized
Last updated: 2026-09-26

The milestone remains one repository, one active Delivery, and a minimal local web application. Persistence assumptions depend on the approved but unexecuted F002 spike. This page records agreed planning decisions; it is not an approved Delivery or a complete technical specification.

## Confirmed workflow decisions

### Delivery-owned Tasks

Deliveries may directly own Tasks for integration and Delivery-specific work inside approved scope. The Delivery Manager commissions Implementation Workers and owns review and integration; it does not code. New product behavior still requires a Feature.

### Correction ownership and traceability

- Before parent integration, corrections remain with the existing Task and logical worker; a Completed but unintegrated Feature may return Active within its approved contract.
- After Task integration into an unmerged Feature or parent Task, corrections use new corrective Tasks and Reports under the relevant remaining parent.
- After Feature integration but before Delivery merge, corrections to already-approved behavior use a new Delivery-owned Task and branch. Link the original Feature, Finding, prior Report, corrective branch/commits, tests, review, and new Report. The integrated Feature remains closed.
- After Delivery merge, fixes use a new linked Feature in a subsequent Delivery.
- Changes to desired behavior always follow the normal Feature definition and approval process; calling them corrections does not bypass approval.

The user accepted traceable Delivery-owned corrections instead of creating a new Feature for every integration defect. Review this choice against ordinary use; no extra work type is introduced.

### General test-authoring bootstrap

When executable behavioral contracts do not yet exist, a non-coding manager may commission an ordinary test-authoring Task from approved written requirements and interfaces. Its Implementation Worker writes tests and necessary test scaffolding, not the target implementation. Independent review checks those tests against the approved contract before the parent accepts them and delegates implementation with the tests outside the implementer's write scope.

This is the general narrowly bounded bootstrap rule, not a new role or work category. Coding parents still author tests for their delegated helpers normally. It does not allow managers to code or implementation workers to weaken supplied tests. F002's already-approved specific plan remains unchanged.

## Confirmed hosting and coordination decisions

LazyCode runs as a separate local backend serving its browser interface. The backend owns application state, scheduling, permissions, databases, and Git operations. DSH remains the first execution integration behind the internal adapter; it does not own the application lifecycle. The native out-of-tree bundle/no-fork decision remains intact.

Closing or refreshing the browser does not pause work. Work continues while the backend remains running; reconnecting displays authoritative current state. Unexpected backend restart retains the established reconciliation and user-resume approval requirements, not automatic execution.

Coordination is event-driven. The backend processes command completions, child results, and routine scheduling under approved plans without repeatedly activating an agent to poll. It activates or reconstructs the appropriate logical worker when reasoning, evaluation, or a decision is needed. This preserves parent authority; deterministic scheduling cannot invent approvals, accept disputed findings, or override pauses.

Exact process layout beneath the adapter, DSH hooks, event delivery/recovery, local web security, and startup/shutdown mechanisms remain technical design work. This decision does not assert that those capabilities have been implemented or validated.

## Confirmed initial execution boundary

The first usable version includes the minimum process isolation needed to enforce file, database, Git, and secret restrictions. Full sandbox-provider integration and automated browser QA remain later work. If an operation cannot be safely supported, it remains unavailable rather than falling back to unrestricted execution. The enforcement mechanism still requires technical investigation and validation; command approval alone does not contain worker-written code executed by that command.

The user confirmed native sandbox evaluation with an explicit low-resource requirement. Measure total adapter, supervisor, proxy, and workload costs—including idle behavior—and validate safe release/recreation before choosing practical capacity limits. Environment ownership remains worktree-based, not one VM per agent; normal desktop applications must retain usable headroom. The selected candidate is not yet proven suitable.

Implementation commands have no network access by default. Approved dependency installation and external-service tests may receive explicit scoped access through the existing grant rules. Model API communication is a separate backend responsibility, not general network access for worker commands.

Eligible workers, including Explorers assigned external research, may receive controlled internet search/fetch capabilities under role, assignment, and grant constraints. Research access is distinct from command network permission; it does not grant a shell, test execution, arbitrary external actions, or other roles' capabilities. External content is evidence, never authority to alter permissions or approved instructions.

Authorized research can search and fetch public pages within its assigned question without approval for every URL. Domain restrictions are available as a Project setting but are not enabled by default. Initial research is public and unauthenticated, with no inherited browser sessions or access to local/private network services. Secrets must never be included in research requests; sending private project content externally requires explicit authorization. Authenticated/private research integrations are deferred. Concrete destination validation, outward-data enforcement, and source-recording mechanisms still need technical specification.

## Confirmed dogfooding and version-switch boundary

The version managing development is a clean bundled/compiled application artifact, independent of the source/worktrees being developed. It must not load changing development files or be modified by candidate builds. Bundled does not select a native desktop wrapper or a specific packaging technology; the product surface remains the local web UI.

Initial updates are manual: the user stops the old version and runs a new version against the same repository. No automatic downloader, self-update, hot replacement, or in-place updater is required initially. Repository identity and durable Project state are retained subject to format compatibility and the existing migration/backup policy; starting a different executable does not authorize destructive conversion or automatic resumption.

The default version-switch prerequisite is that no work is actively executing and owned runtime processes have stopped. Incomplete work may be safely checkpointed and paused; it need not be discarded or completed merely to change versions. Candidate testing must not mutate the managing instance's live state.

A later optional pause–update–resume action may record which work was active before the update, gracefully pause it, switch versions, reconcile state, and resume only that recorded set when still authorized and eligible. Previously paused or user-blocked work is not included. The exact representation of the pre-update set, waiting descendants, failed updates, and resume eligibility requires technical definition. This convenience is not required for the initial manual update path and is distinct from unexpected-crash recovery.

## Approved sequence order

The [Feature sequence](minimum-application-feature-sequence.md) separates persistence/DSH/isolation validation from eight application candidates, records dependencies, and defines a scripted end-to-end acceptance proposal. The user approved the order on 2026-09-26. Individual Feature specifications and detailed acceptance still require approval; this is not a Delivery start.

## Remaining planning

1. Concrete host/DSH execution contracts under the confirmed separate-backend design.
2. Enforcement mechanisms for the approved local boundary, managed commands, secret handling, and controlled web research.
3. Executable worker/scheduler transitions and verification contracts.
4. Minimal web workflow and model/provider configuration.
5. Concrete clean-build packaging, isolated candidate testing, version/format compatibility, scripted acceptance, and ordered implementation Features; initial version switching is manual.

Concrete schemas, APIs, and tests are still required for the confirmed policies above. See [readiness decisions](development-readiness.md) and the [progress checklist](development-readiness-checklist.md).
