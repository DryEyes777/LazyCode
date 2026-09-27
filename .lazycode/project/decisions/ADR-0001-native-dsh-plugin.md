# ADR-0001: Use Native DeepSeek Harness Plugins for v1

Status: accepted
Date: 2026-08-19

## Context

LazyCode needs an agent loop, model adapters, tools, sessions, sandboxing, and child-agent lifecycle. DeepSeek Harness exposes those capabilities through Cordis plugins and supports installable out-of-tree bundles.

## Decision

Implement v1 as a separate `lazycode-dsh` bundle installed into a DeepSeek Harness profile. Do not fork Harness. Keep organizational concepts in LazyCode-owned code and `.lazycode/` artifacts, even when they use native Harness services.

The first integration targets exact version `0.1.0-rc.8` and the `spawn` subagent provider.

## Consequences

- LazyCode can prove organizational ideas quickly using existing execution and safety machinery.
- The project remains model-independent within Harness's adapter seam.
- LazyCode is runtime-coupled to unstable DSH and Cordis interfaces for v1.
- Upgrades require dependency, configuration, build, unit, and profile verification. The original live-smoke expectation is refined by PD-25: automated tests use mocked agents, and live AI verification is optional and explicitly requested.
- A provider-neutral orchestration process is deferred until experiments reveal a concrete need.

## PD-22 refinement — 2026-09-09

The out-of-tree DSH integration and no-fork choice remain accepted. LazyCode's broader application state is independent of individual Harness sessions, and DSH-specific execution code is concentrated behind a small internal interface. Stable worker IDs and portable Project records belong to LazyCode; Harness session IDs are execution references.

DSH remains the only initially implemented runtime integration. Whether the long-running application resides inside the plugin host or in a separate local process remains open, refining the original deferral of a separate orchestration process. No second runtime or distributed control plane is required by this decision.

All underlying tools must obey LazyCode authorization. Upgrade checks include enforcement, session events, cancellation, reconstruction, and the delegation flow. The full intended contract is [DeepSeek Harness Boundary](../deepseek-harness-boundary.md).

## PD-25 evaluation refinement — 2026-09-10

Automated acceptance must consume no real AI usage. End-to-end verification uses scripted models with actual application and integration mechanisms in fixtures. Live AI smoke tests are optional and require explicit user request; they are not mandatory adoption or milestone gates. See [Evaluation and Implementation Roadmap](../evaluation-and-implementation-roadmap.md).

## Step 3 hosting refinement — 2026-09-26

The user selected a separate local LazyCode backend serving the web interface and owning state, scheduling, permissions, databases, and Git. DSH remains the first execution integration behind an internal adapter, using the out-of-tree native integration without a Harness fork. This resolves the hosting choice left open in PD-22; it does not select another agent runtime.

Browser refresh/disconnection does not pause work while the backend runs. Routine coordination is event-driven, activating agents for reasoning and decisions rather than repeated polling. Unexpected backend restart retains reconciliation and user-resume gates. Concrete interfaces and enforcement still need technical validation. See the [minimum application plan](../minimum-application-plan.md#confirmed-hosting-and-coordination-decisions).

## Alternatives considered at the original decision

- **Independent control-plane process:** stronger harness portability, but adds a protocol and lifecycle boundary before the organizational contracts are proven.
- **Harness fork:** maximum control, but creates unnecessary upstream synchronization and maintenance work.
