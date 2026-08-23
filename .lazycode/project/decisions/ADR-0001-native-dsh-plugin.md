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
- Upgrades require explicit dependency, configuration, build, unit, profile, and live-smoke verification.
- A provider-neutral orchestration process is deferred until experiments reveal a concrete need.

## Alternatives considered

- **Independent control-plane process:** stronger harness portability, but adds a protocol and lifecycle boundary before the organizational contracts are proven.
- **Harness fork:** maximum control, but creates unnecessary upstream synchronization and maintenance work.
