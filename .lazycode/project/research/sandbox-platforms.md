# Sandbox Platform Comparison

Research date: 2026-09-10
Scope: PD-26 local macOS execution and UI QA
Status: documentation comparison; no provider installed or benchmarked

## Requirements used

LazyCode must run locally alongside ordinary desktop applications. Environments belong to worktrees, all Projects share configurable capacity, and QA assignments require fresh browser sessions and data. LazyCode retains permissions, databases, Git controls, command lifecycle, and secret handling.

The local machine inspected during discussion has an Apple M3 Pro, 18 GB of memory, and 11 logical CPU cores. This is an illustrative validation machine, not a product minimum or evidence of achieved concurrency.

## OpenSandbox

OpenSandbox documents Docker and Kubernetes runtimes, sandbox lifecycle and command/file APIs, and a TypeScript SDK. It provides browser and desktop examples. Its local AIO documentation describes Docker Desktop and Colima use on macOS. These make it the first candidate for a local integration spike. See the [project overview](https://github.com/opensandbox-group/OpenSandbox) and [local setup](https://github.com/opensandbox-group/OpenSandbox/blob/main/docs/examples/aio-sandbox.md).

The browser example uses Playwright and Chromium; the desktop example supplies a Linux graphical environment through VNC. Those are not native macOS application environments. See [browser example](https://github.com/opensandbox-group/OpenSandbox/blob/main/docs/examples/playwright.md) and [desktop example](https://github.com/opensandbox-group/OpenSandbox/blob/main/docs/examples/desktop.md).

The TypeScript SDK documents non-expiring sandboxes with manual cleanup. That is relevant to LazyCode's rule that runtime estimates notify workers rather than automatically cancel execution. Exact lifecycle behavior must be verified against the selected release. See [SDK lifecycle documentation](https://github.com/opensandbox-group/OpenSandbox/blob/main/sdks/sandbox/javascript/README.md).

Docker Desktop runs its container engine in a Linux VM. A Docker-backed sandbox is therefore not necessarily a separate full VM per worker. Resource use still includes the workload, browser, application, and dependencies. See [Docker Desktop networking architecture](https://docs.docker.com/desktop/features/networking/).

## CubeSandbox

CubeSandbox's deployment guide supports x86_64 and ARM64 Linux hosts with KVM. Its native Apple Silicon backend request was closed as not planned at the time checked. The README's x86-only quick-start wording differs from the deployment guide's ARM64 support; ARM64 Linux support must not be mistaken for native macOS support. See [deployment guide](https://github.com/TencentCloud/CubeSandbox/blob/master/docs/guide/bare-metal-deploy.md), [README](https://github.com/TencentCloud/CubeSandbox), and [native Mac request](https://github.com/TencentCloud/CubeSandbox/issues/975).

Apple documents nested virtualization support on M3 and later. A Linux host VM may therefore be an avenue to investigate on suitable Macs, but CubeSandbox operation and resource cost through that setup were not validated here. See [Apple nested virtualization documentation](https://developer.apple.com/documentation/virtualization/vzgenericplatformconfiguration/isnestedvirtualizationsupported).

CubeSandbox remains relevant for a later Linux homelab or server deployment. Its advertised sandbox overhead must not be interpreted as the complete RAM requirement for a browser, application, database, and platform services. Published upstream figures are not LazyCode laptop benchmarks.

## OpenBot

OpenBot includes its own agent-facing application, policy gateway, PostgreSQL-backed product data, and conversation infrastructure, with per-Bot computers. Adopting it as the foundation would overlap with responsibilities already assigned to LazyCode. Its gateway and policy architecture remain useful references. See [OpenBot architecture and requirements](https://github.com/CopilotKit/OpenBot).

## Adapting the supplied comparison

The user's earlier comparison favored an independent sandbox interface beneath a custom harness. That direction fits LazyCode, with these refinements:

- A logical manager or model activation does not automatically need a dedicated machine.
- Environments follow worktrees; browser-heavy QA is distinct from automated test commands.
- Child capabilities follow LazyCode's grant authority, which is separate from the parent's personal execution permissions.
- Provider expiry and sample TTL settings must not silently override LazyCode's non-cancelling runtime notifications.
- Managed SQLite, authoritative Git metadata, and secret controls must remain protected from unrestricted workload access.

## Source submodules

Git submodules record another repository at a commit and require initialization/update handling. They are useful for pinned source inspection, builds, or patches, but do not replace consuming an API/SDK or operating a service. See [Git submodule documentation](https://git-scm.com/book/en/v2/Git-Tools-Submodules).

The initial recommendation is pinned SDK/API and runtime artifacts. Introduce a source submodule only when the integration requires upstream source work.

## Proposed validation

Start with one implementation environment and one UI QA environment alongside normal applications, then increase concurrency. Measure memory pressure, swap, CPU use, startup, test duration, and cleanup/recreation behavior. These are proposed experiments, not measured results or fixed product limits.

The accepted direction and remaining implementation work are defined in [Isolated Execution and QA Environments](../isolated-execution-and-qa-environments.md).
