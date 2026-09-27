# F004: Minimum Local Execution Isolation Validation

State: Defined — product-definition revision 1 approved; technical draft under discussion
Last updated: 2026-09-26
Planning alias: V2
Parent Epics: none assigned
Delivery: not assigned
Product-definition approval: revision 1 explicitly approved by the user on 2026-09-26 ("I approve them", in response to the joint F003/F004 product-scope approval request)
Technical-specification approval: pending

Technical direction: the user confirmed native Sandbox Runtime evaluation and the restricted secret-handling design on 2026-09-26, requiring low resource use alongside ordinary applications. Final detailed specification approval and Delivery start remain separate.

Technical planning: [revision 1 draft](technical-plan.md) and [acceptance matrix](acceptance.md), informed by [source inspection and platform research](../../project/research/execution-and-isolation-validation.md). The candidate and secret-handling direction are confirmed; nothing has been installed or experimentally validated.

## Purpose and current state

Establish a practical macOS boundary before running worker-authored code. Worktrees and managed tool checks do not by themselves contain a modified test or command; no local isolation mechanism is currently validated.

As the developer, I need evidence of which workloads LazyCode can safely execute locally, their resource cost, and which operations must remain unavailable.

## Approved desired outcome

A bounded executor prototype, adversarial fixture tests, resource measurements, and a supported-capability report. Validate actual enforcement, not mocked authorization responses. Use temporary repositories, synthetic protected files/secrets, and controlled endpoints instead of personal data or credentials.

The user selected native Sandbox Runtime for evaluation, not unconditional production adoption. Heavier dependencies or expanded scope need approval. This is not full OpenSandbox integration or a browser/desktop QA platform.

## Approved product acceptance coverage

1. Allow declared workspace/toolchain operations while denying unauthorized access to sibling workspaces, managing-instance state, controlled database/Git state, and synthetic secret files. Cover worker-modified commands, child processes, and representative path/indirection bypass attempts.
2. Keep privileged data/Git operations behind caller- and scope-validated controls. An approved test launcher must not grant direct mutation of protected state.
3. Enforce default-denied command networking and explicit scoped grants using controlled services. Distinguish command traffic from backend model communication and controlled research; one worker's grant must not authorize another.
4. Test a bounded public-research path with optional domain restrictions, no inherited login sessions, and no local/private destinations. Check redirects/destination changes and outgoing-data policy using fixtures. Research must not send secrets; private project content needs explicit authorization. No live internet requests are needed for acceptance.
5. Inject synthetic secrets only into approved fixture commands and intercept results before agents/logs. Test declared disclosure/bypass cases and withhold unsafe output. Explicitly identify unsupported combinations: approving a command or matching known secret text does not prove arbitrary secret-consuming code safe.
6. Track owned processes/descendants through command exit, cancellation, forced stop, and interruption. Preserve exits and permitted diagnostics; uncertain survivors block a clean-stop claim. Runtime estimates notify rather than automatically cancel.
7. Release/recreate execution resources without losing required workspace/evidence. Ownership follows worktrees, not model activations; environment recreation does not implicitly restore or discard Project database state.
8. Measure setup, startup/teardown, CPU/memory use, and a small controlled concurrent workload. Record machine/runtime conditions and limitations instead of inventing universal defaults or arbitrary-project compatibility.

The report must distinguish application checks, actual containment, trusted components, and excluded threats. Unsupported or unproven operations remain unavailable. If no acceptable mechanism meets the boundary, return evidence and options for user decision—not a prompt-only or unrestricted-host fallback.

## Scope and non-goals

One local macOS installation, temporary worktrees, representative build/test commands, and controlled fixture services. No production scheduler, GUI/browser QA, cloud/Linux deployment, global machine reconfiguration, production secret store, or real personal secrets. Automated actors are scripted; attempted live model calls fail.

General research UX and production permission schemas remain later work, but their core enforcement assumptions cannot be deferred out of this validation. A negative feasibility report is not a passed production gate.

## Dependencies and next approval

Follow [permissions](../../project/permissions-and-escalation.md), [security](../../project/security-and-trust.md), and [environment policy](../../project/isolated-execution-and-qa-environments.md). Agree on broker/tool interception with [F003](../F003-dsh-execution-validation/feature.md). Synthetic authority/database fixtures avoid depending on F002 implementation or inventing a second production policy system.

After product approval, specify the threat model, supported workload, technology/prerequisites, resource controls, secret/egress limits, fault tests, test-authoring ownership, and measured acceptance criteria using primary-source research. Product approval permits planning only; technical approval, installation permissions, Delivery scheduling, and explicit start remain separate. No isolation technology has been installed or tested by creating this draft.
