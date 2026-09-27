# Execution and Isolation — Technical Planning Evidence

Date: 2026-09-26
Status: source/documentation inspection only; no runtime validation

## Local baseline

The planning shell reports macOS 27.0, build 26A428, arm64, Node 22.17.0. `docker` and `sandbox-exec` executables are present; no daemon, container, or sandbox was started. Presence does not prove availability or enforcement. Node is below the repository's declared minimum; select a compatible runtime before executing either Feature. F002 retains its additional SQLite-version prerequisite.

All inspected DSH packages report `0.1.0-rc.8`. Installed package declarations and JavaScript, rather than moving upstream `master`, are the compatibility baseline. Key files, relative to each package root:

| Package / file | Inspected fact |
| --- | --- |
| `dsh-agent/lib/types/index.d.ts`, `runtime-types.d.ts` | Registry `create`/`resume`, unpublished `setup`, owned handle disposal; Agent `send`, `followup`, `steer`, `inject`, `cancel`, `whenIdle`. Creation cancellation is separate from cancellation after publication. |
| `dsh-subagent/lib/types/index.d.ts` | `startContinuable` acknowledgment is inbox acceptance, not a started turn; follow-up needs the exact live direct parent. `interrupt` is cooperative, retains pending work/descendants, and can be a no-op for absent targets. |
| `dsh-tools/lib/types/index.d.ts` | Async pre-execute policy, monotonic synchronous `guard`, post-execute decisions, and content-only `finalizeContent`. Restrictions apply to inherited tools; scope-local registrations and the reserved presentation transport need separate consideration. |
| `dsh-agent-loop/lib/index.js`, `appendToolCall`/`appendToolResult` | Call arguments are logged; result content, error information, and metadata enter session events. Display-content filtering alone does not establish a whole-result secret boundary. |
| `dsh-llm/lib/types/index.d.ts` | Adapter registration and streaming interception allow a scripted provider without replacing the real agent loop. |
| `dsh-sandbox-local/lib/index.js`, `seatbeltProfileArgs` | The pinned macOS profile begins with `allow default` and then constrains file writes. It is not the required read/network isolation boundary. |

The current `tests/delegation.test.ts` uses a stub subagent service. It remains useful regression evidence but does not prove full DSH execution compatibility.

Inspected bundled JavaScript SHA-256 values: agent-loop `1ca83637892559e88c43b815e8d5d7b065951751e73eee7a7bef99d65a71ad6c`; subagent `e5b4380e65ece1c26c974f647743554b4f2005686a6b562eafb88e781aa9e47f`; tools `47de95d14493dbd22d1a3ade14890fc99d7232db4e363f2190c9063b030dd029`; sandbox-local `fa5489c0017f89574d610ea470e1d8cd2a45a9f355ef936c0fb689966f2f8c3a`. These identify inspected artifacts, not executed tests or independently authenticated upstream builds.

Upstream [subagent documentation](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/subagent.md) corroborates the distinction between one-shot and continuable children. Its moving branch is background, not proof that a different release is compatible.

## Isolation shortlist

| Candidate | Evidence and planning assessment |
| --- | --- |
| Anthropic Sandbox Runtime, proposed evaluation pin `0.0.77` | Native macOS Seatbelt plus network mediation, without a container. Research-preview dependency: prove the narrowed configuration; do not inherit general-purpose defaults. |
| Docker Desktop / Linux containers | Containers run in a Linux VM on Mac. An alternative if native enforcement fails, but changes the workload platform and requires careful mounts/networking. No automatic fallback or installation. |
| Apple `container` | Linux containers in lightweight VMs, requiring Apple silicon and macOS 26 per upstream documentation. Retain as an alternative, not the selected minimum executor. |
| DSH's pinned local sandbox alone | Insufficient for this product boundary based on the inspected profile; do not advertise full enforcement from its write restrictions. |

Sandbox Runtime's versioned documentation describes broad default reads, narrower configurable access, network mediation, and risks from enabling Apple Events or weaker network isolation. Domain filtering is not content-exfiltration prevention. The proposed design therefore disables those relaxations and puts sensitive operations behind separate controls. Filesystem policy is fixed for an already-started command; this fits checking grants on the next managed use, not claiming live filesystem revocation. See the [v0.0.77 documentation](https://raw.githubusercontent.com/anthropics/sandbox-runtime/v0.0.77/README.md).

The [release](https://github.com/anthropics/sandbox-runtime/releases/tag/v0.0.77) identifies tag `v0.0.77`; [package metadata](https://raw.githubusercontent.com/anthropics/sandbox-runtime/v0.0.77/package.json) declares Apache-2.0. npm registry metadata was not retrievable through the browser tool in this pass. Confirm published artifact, integrity, dependency licenses, and the existing release-age policy before any approved installation; a source tag is not npm integrity verification.

Docker sources: [Mac permissions](https://docs.docker.com/desktop/setup/install/mac-permission-requirements/), [network none](https://docs.docker.com/engine/network/drivers/none/), and [bind mounts](https://docs.docker.com/engine/storage/bind-mounts/). A bind mount is host exposure, not a read-only copy by default; network-none and restricted mounts alone do not implement all LazyCode controls. Apple source: [container requirements](https://github.com/apple/container#requirements). No performance comparison was run.

## Design directions subsequently confirmed

After this investigation, the user confirmed the following directions on 2026-09-26 and required low combined resource overhead. This is not experimental evidence or a Delivery start; the detailed technical specifications remain under review.

- F003: backend-owned adapter child process and direct Agent handles, rather than making durable organizational workers depend on DSH continuable-parent residency.
- F004: evaluate the pinned native Sandbox Runtime first; stop for a decision if required controls fail rather than automatically growing into a VM/provider project.
- Keep ordinary worker-modifiable code secret-free. Evaluate secret consumption only in isolated, fixed trusted helper fixtures; arbitrary modified code with secrets and releasable output/network is not declared safe.

Detailed drafts and deterministic acceptance matrices are in [F003](../../features/F003-dsh-execution-validation/technical-plan.md) and [F004](../../features/F004-local-execution-isolation/technical-plan.md). Runtime findings remain absent.
