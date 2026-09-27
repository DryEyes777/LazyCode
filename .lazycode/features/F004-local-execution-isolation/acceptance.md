# F004 — Deterministic Acceptance Draft

Status: proposed with technical revision 1; not executed

Run actual selected enforcement on supported macOS, real fixture files/processes, and controlled local servers. Use temporary isolated repositories and synthetic secrets only. Fixture endpoints use explicit test-only mappings; never disable the production destination validator to make a negative test pass. All files/processes under test are owned fixtures. Failed containment stops affected testing and retains safe evidence.

| ID | Scenario and required oracle |
| --- | --- |
| I01 | Missing sandbox, incompatible runtime, invalid policy, or failed enforcement preflight blocks dispatch before worker code starts. No unrestricted fallback. |
| I02 | Allowed Node fixture build/test succeeds; permitted output is captured with correct command/source/policy identity. |
| I03 | Read/write attempts against protected SQLite/WAL, Git common dir, installation, sibling, and secret fixtures fail; fixture digests/contents remain unchanged. |
| I04 | Symlink/hardlink/rename/path-alias/TOCTOU variants cannot widen scope; unsupported unsafe setup is rejected before launch. |
| I05 | Clean env/home/descriptors and protected policy prevent startup hooks, loader injection, inherited credential/IPC, or scope spoofing. |
| I06 | Child processes inherit containment; benign fixture probes verify that app-launch/privileged-IPC routes are denied without opening personal applications. |
| I07 | Raw network attempts and ambient proxy changes fail without a grant; a scoped controlled-service grant permits only the declared invocation/destination. |
| I08 | Two supervisors/worktrees cannot reuse each other's files, secrets, proxy authority, or process identities. |
| I09 | Research handles public queries/links and optional domain restrictions; rejects private addresses, redirect escapes, DNS changes, encoded destinations, and credential-bearing URLs. |
| I10 | A private-origin research request waits for exact transmission authorization; rejected/private/secret queries never reach the fixture server. Broad research permission alone is insufficient. |
| I11 | Worker-code lane receives no secrets. Trusted helper receives its synthetic secret but returns only safe structured output, with isolated writable state and no worker-writable dependency. |
| I12 | Secret-bearing stdout/stderr/errors/files/meta and declared encoded/split cases are withheld or remain inaccessible. Generic dynamic secret-consuming code is refused, not falsely certified by a scanner. |
| I13 | Tool and policy revision changes trigger the appropriate reapproval; revocation denies the next managed use without claiming retroactive filesystem revocation. |
| I14 | Expected-runtime expiry emits a still-running event but no cancellation. Explicit cancellation/forced stop terminate only the owned execution. |
| I15 | Parent exit with living child, detached session, changed PID identity, stuck pipe, and inaccessible process leave truthful non-drained state until resolved. A process-group-only shortcut cannot pass escaped-descendant cases. |
| I16 | Crash at launch/ack/output/drain barriers is inspected before retry; uncertain side effects or survivors are not duplicated or silently cleaned away. |
| I17 | Environment teardown/recreation preserves required workspace and permitted evidence; it does not overwrite database state or affect a sibling/manager fixture. |
| I18 | Repeated startup/teardown and one/two-worktree tests separate baseline, sandbox overhead, workload cost, and combined DSH-adapter/supervisor/proxy cost. Record peak/steady memory, CPU, process counts, disk growth, available pressure/swap observations, idle release/recreation, and leaks. Use only benign fixtures for unsandboxed overhead comparison. Recommend capacity limits for review; measurements alone do not establish acceptable resource use. |
| I19 | Scripted actors and deny-live-call guard prevent all real model use; no production credentials/configuration enter fixtures. |
| I20 | F003 adapter with this real broker/executor exposes only safe outputs and rejects alternate tool routes; shared wire contract versions and authorization identities match. |

Run typecheck, full existing unit suite, dedicated policy/real-helper suite, actual OS acceptance, build, source-integrity and owned-process checks. Record required-case coverage separately from command exit status. Diagnostic/read-only inspection is not execution evidence. Missing OS evidence is blocked, not a pass.

The technical report maps every case to observed results and supported/unsupported/unresolved capabilities, trust assumptions, resource measurements, and downstream restrictions. Reuse of the prototype requires user review of actual findings. I20 and F003 E17 are one shared integration scenario with evidence usable by both when versions match, not duplicated live-model experiments.
