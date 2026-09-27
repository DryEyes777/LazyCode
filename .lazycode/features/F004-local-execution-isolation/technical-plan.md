# F004 — Technical Plan, Revision 1 Draft

Status: native candidate and secret boundary confirmed; detailed technical specification pending final approval
Product definition: revision 1 approved

On 2026-09-26 the user approved the discussed choices: application-owned DSH activation processes, evaluation of the native sandbox candidate, and secret-free ordinary worker code with narrowly trusted secret helpers. The user additionally requires low resource consumption so normal applications remain usable. This is not implementation/start authorization or measured proof of suitability.

## Candidate and prerequisites

Evaluate `@anthropic-ai/sandbox-runtime` at exact version `0.0.77`, using its native macOS mechanism behind a LazyCode-owned supervisor. The user confirmed this candidate for evaluation. The [research note](../../project/research/execution-and-isolation-validation.md) compares it with Docker and Apple container options. It is not an installed dependency or a claim of production safety. If required enforcement or clean termination cannot be demonstrated, return the evidence for a decision; do not automatically adopt a VM or weaken the boundary.

Before installation during separately authorized implementation: verify the npm artifact/version/integrity, release-age eligibility and licenses, then pin/lock it. Keep the user's existing seven-day policy. No global install, `npx` auto-download, unpinned runtime, system policy change, or automatic version substitution. The versioned source tag was inspected; npm artifact verification remains a start prerequisite. A missing or incompatible dependency blocks the run.

Use a supported Node runtime and record exact macOS/architecture/toolchain versions. The planning shell's Node 22.17.0 is below the repository minimum. Executable presence does not satisfy the sandbox probe: a future controlled positive/negative preflight must prove the selected mechanism works on the actual machine.

## Supported workload and threat boundary

Start with secret-free Node/TypeScript fixture builds/tests on macOS, scoped file operations, controlled research, and fixed secret-consuming helper fixtures. No requirement to make arbitrary language toolchains or applications work in this validation. Add capabilities only with evidence and approved profile changes.

Treat repository code, tests, tools' inputs/output, spawned children, and fetched content as potentially hostile. Trust the installed supervisor/broker, reviewed helper code, locked runtime/toolchain, and OS enforcement. Do not load executable supervisor policy from the worktree. Kernel exploits, administrator compromise, and arbitrary covert-channel elimination are not claimed solved. Excluded threats cannot be used to excuse ordinary file/network/IPC bypasses by a sandboxed process.

Use synthetic manager-state, credential, Git-common-dir, SQLite/WAL, sibling-worktree, and installation fixtures. Adversarial payloads target only these fixtures and controlled servers, never real home secrets or personal applications. Ordinary backend authority fixtures identify grants by trusted channel; model-supplied worker IDs cannot authorize anything.

## Proposed process layout and contract

One trusted executor supervisor per fixture worktree, with at most one active command per worktree initially. Two worktrees get separate supervisors/configurations/proxy state for interference tests. Each command receives its own policy snapshot, opaque command ID, clean environment, scratch directory, and owned process record. Sharing a library singleton across differently authorized workers is not assumed safe.

`execute` accepts a registered command definition/revision, validated argument values, authorized cwd/resources, output declaration, network grant, secret references, and notification timing. It does not accept an unrestricted model-authored shell program. Approved executables may run worker-authored code only within the proven containment boundary. Exact quoting and any library-required command-string construction are tested against argument injection; repository text must not become supervisor configuration.

Return accepted/started/command-exited/processes-drained/results-available observations separately. Results identify source/command/policy versions, exit/signal, permitted evidence, and uncertain survivors. Cancellation and forced-stop APIs act only on authenticated owned execution identities. Do not infer process ownership solely from a reusable PID, command-name match, or empty output pipe.

F003's adapter sends authorized requests to the broker over its private IPC channel; raw commands never receive that channel, broker credentials, or policy files. Structured success/error results crossing back must already be safe. F004 initially uses a scripted caller so its own tests do not depend on a production DSH host; the final shared test uses F003.

## Filesystem and process enforcement

- Default-deny reading except explicit toolchain/runtime resources and assigned code; default-deny writes except owned outputs/scratch. Canonicalize resource roots and validate actual containment rather than relying on path-string prefixes.
- Explicitly protect `.git`, the linked common Git directory, `.lazycode` live/checkpoint/baseline data, policy files, installation state, sibling worktrees, and managed secret files. Controlled broker operations are the only route to mutate that state. Read operations also retain record/file scope.
- Close inherited descriptors, remove ambient credentials and loader/startup variables, use an isolated home/temp/cache, and exclude arbitrary user shell startup files. Any runtime-required path is reviewed and bounded, not an automatic broad exception.
- Disable Apple Events/application launching, unrestricted Unix sockets, additional privileged IPC, and weaker network-isolation modes. Probe actual compiled policy for the selected pinned library; do not assume its defaults match LazyCode.
- Test symlinks, hardlinks, parent renames, changed mounts/path identities, inherited descriptors, child processes, detached sessions, and attempts to signal or inspect the broker. No actual personal app is launched in escape tests.
- Track descendants independently of ordinary command exit. A detached process that cannot be accounted for is an enforcement/cleanup failure, not a reason to discard the record. Require a proven way to stop all owned execution before accepting forced-stop support. If native containment cannot meet this, report it as a blocker and revisit mechanism choice.

Filesystem policy is snapshotted for an admitted command. A grant revocation denies subsequent managed uses; it is not a promise to rewrite the OS policy of already-running code. User forced stop remains separate. Notification timing never automatically kills commands.

## Network and controlled research

Ordinary commands have no direct network route. Scoped exceptions use a dedicated controlled path whose authorization binds both destination and invocation. Test raw TCP/UDP, DNS, IPv4/IPv6, localhost/private services, proxy bypass, Unix sockets, changed DNS answers, and cross-worker proxy reuse. Where a needed protocol cannot be mediated safely, report it unsupported.

Dependency installation uses a separate trusted staging operation with only approved manifests/registry inputs and no general worktree secrets or private files. It does not lend its network grant to later tests. Do not assume registry domain allowlisting makes arbitrary package scripts safe. Define script handling and writable outputs before enabling any package-install profile; it is not required to use the internet for fixture acceptance.

Public research runs through a trusted bounded HTTP(S) fetch/search broker, not through `curl` available to an arbitrary worker. No browser sessions, cookies, credential inheritance, arbitrary request bodies, or generic CONNECT tunnel. Canonicalize URLs; validate the actual connected address and each redirect; reject non-public/private/link-local/local-service destinations, encoded alternatives, and DNS changes that violate policy. Configure time/size/redirect bounds and use a fixture search endpoint; no external search vendor is selected here.

No domain restriction applies by default to otherwise authorized public research. The research grant still constrains purpose and outgoing data. For this prototype, permit explicit approved/public query values and public-derived follow-up links in a public-only research context. If an agent has private context or proposes private-origin outbound text, require an explicit transmission authorization bound to that material before sending. A keyword scanner is not proof of arbitrary private-data detection. Implement semantic approval as a fixture/user decision, not an inferred permission. Synthetic private destinations may be used as controlled test endpoints only through a separate test-only transport mapping; production address checks themselves must still reject them.

## Secrets and evidence

Propose two distinct execution lanes:

1. **Worker-code lane:** no secrets in environment/files/descriptors and no inherited privileged network access. Outputs still receive bounded validation and known-secret scanning as defense in depth.
2. **Trusted-helper lane:** fixed reviewed helper code outside the worker-writable tree consumes synthetic secrets for a narrowly approved fixture operation. No loading worker-modifiable modules/config hooks. Keep its writable area quarantined and its network limited to the authorized controlled service. Return only an explicitly safe structured result; release no unrestricted raw stdout, stderr, files, timing payload, or metadata to the agent.

This does not claim that arbitrary code given a secret can be made safe by redaction. For a future project requiring that combination, report the missing capability and obtain an explicit design decision; do not treat ordinary command approval as proof of non-disclosure. A changed helper or approved command definition invalidates its prior execution permission according to existing policy.

Known unsafe output is withheld with a safe error. User inspection and any authorized redacted release use a restricted fixture path separate from ordinary logs/agent evidence. Never put raw secrets in the CLI argument string, sandbox attribution key, log message, error, attachment name, or DSH result. Preserve only permitted evidence; do not archive tainted output as a supposedly safe diagnostic artifact. Synthetic-secret sentinel scans include quarantined-output reference handling and subsequent worker reads.

## Test and implementation ordering

After technical approval and explicit Delivery start, an Implementation Worker authors test-owned interfaces, fixture repositories/endpoints/helpers, fault barriers, positive/negative assertions, and unsupported-platform checks under the approved bootstrap. Independent review validates the contract tests before implementation; managers do not code and implementers cannot weaken them.

Then use bounded serial Tasks for (1) policy/compiler and supervised launcher, (2) file/process enforcement, (3) network/research broker, (4) secret/result boundary, and (5) recovery/measurements plus F003 integration. Shared message contracts are parent-owned and versioned; no opportunistic edits to the other Feature's implementation. Stage process/security tests individually before concurrency; never run adversarial tests unsandboxed as a fallback.

Proposed paths: `src/validation/local-executor/`, `tests/local-executor/`, and `vitest.local-executor.config.ts`. Create an explicit `test:local-executor` script after approval and register it in aggregate verification without double-discovery. The required macOS enforcement suite must block on missing prerequisites rather than silently skip into green. Portable policy-unit tests do not substitute for OS tests.

Measurements use recorded repeated cold/warm runs and one-versus-two worktree workloads, with fixed fixture sizes and actual elapsed time/resource samples. Record median/range and failures; no arbitrary maximum is selected without evidence. Resource caps for test containment do not establish product-wide budgets. Clean stop and absence of cross-worktree effects are correctness gates regardless of speed.

## Low-resource requirement

Resource efficiency is a selection gate, not merely an optional benchmark. The intended workload must coexist with the user's ordinary browser, Docker, and communication applications. Do not promise a safe worker count from library branding or isolated microbenchmarks.

- Report idle baseline, incremental isolation overhead, useful fixture workload consumption, and combined DSH-adapter/supervisor/proxy cost separately. Include peak and steady-state memory, CPU, process count, disk/cache growth, and available system memory-pressure/swap observations; label unavailable metrics honestly.
- Use identical benign fixtures for isolated versus plain execution to estimate overhead. Only the intentionally benign baseline may run outside containment; never run adversarial fixtures unsandboxed for comparison.
- Measure one and two concurrent worktrees with bounded repetitions and recorded machine/background conditions. Do not automatically stress the machine to exhaustion or start/stop the user's other applications.
- Start expensive support processes only when needed. Release idle supervisors/proxies after process drain and evidence/checkpoint preservation, while retaining cheap durable worktree state. Recreate them without permission loss or context identity changes. No VM per agent and no busy polling merely to keep a parent alive.
- Check for residual processes and cumulative memory/disk growth across repeated use. Existing installation-wide capacity settings must ultimately follow measured headroom rather than a fixed universal default; a cheaper idle path may not weaken isolation or kill legitimate active commands.

Numerical memory/CPU targets have not been chosen by the user and are not invented here. The validation report must propose practical limits and expose tradeoffs for approval before claiming the mechanism suitable for ordinary dogfooding. If the measured footprint is unacceptable, revise the design instead of marking the resource requirement passed because measurements exist.

## Remaining approval boundary and limitations

The native Sandbox Runtime evaluation and secret-free worker/trusted-helper boundary are confirmed. Docker/Apple VM approaches remain alternatives requiring a new decision. Concrete process-drain strategy, policy syntax, package integrity, and resource suitability must be validated during the separately started spike; failure returns a gap report, not production readiness. Review the detailed [acceptance](acceptance.md) and resource evaluation with this draft before final technical approval.
