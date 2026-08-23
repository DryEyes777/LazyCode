# DeepSeek Harness Research

Research date: 2026-08-19
Target version: `0.1.0-rc.8`

## Verified upstream facts

DeepSeek Harness is an MIT-licensed developer preview that explicitly warns of compatibility-breaking changes. Its architecture treats the model adapter, tool registry, session log, and agent loop as replaceable Cordis plugins. See the [official README](https://github.com/deepseek-ai/deepseek-harness), [architecture guide](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md), and [Cordis project](https://github.com/cordiverse/cordis).

A runnable profile is an ordered composition of bundles. An out-of-tree bundle ships a patch layer, is installed with `dsh plugin add`, and can override or insert Cordis rows without modifying Harness source. See [Package and install a plugin](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/develop/basic/publish.md).

The append-only session log is the source from which model history, replay, forks, persistence, and telemetry are derived. Model-visible inputs must be reconstructable from logged events.

The subagent capability supports multiple named providers. The in-process spawn provider can receive a fresh persona, depth limit, tool filter, and structured output schema. One-shot child runs expose a result and require explicit disposal. See the [subagent subsystem reference](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/subagent.md).

Harness's base profile already mounts filesystem read/search tools, the `spawn` and `fork` subagent providers, sandbox and approval policy, compaction, skills, goals, workflows, and model adapters. The generated [tool catalog](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/tool-catalog.md) identifies `read`, `glob`, and `grep` as distinct discovery tools.

## Fit with LazyCode

Harness is a strong execution substrate because LazyCode can introduce organizational behavior as ordinary plugins while reusing child lifecycle, session evidence, tool restrictions, sandboxing, and model routing.

The main missing layer is organizational semantics. Harness does not itself define Project Manager, delivery, feature, ownership, upward information compression, capability leases, or hierarchical escalation contracts. Those remain LazyCode responsibilities.

## Risks

- Release candidates are changing rapidly and may break configuration rows or TypeScript interfaces.
- Native plugins intentionally couple v1 to Cordis and DSH service contracts.
- Tool filtering is suitable for the narrow Explorer spike, but full resource authority will require lower-level capability and sandbox policies.
- Published package families must stay version-aligned; exact pins and an upgrade checklist are required.
- This machine normally rejects packages younger than seven days. D001 uses a command-scoped override for exact pinned packages only.

## Open questions

- Which Harness events best represent LazyCode task and escalation facts without duplicating session state?
- Should project artifacts remain Markdown-first or gain versioned machine-readable sidecars?
- At what point should the logical organizational layer gain a runtime adapter boundary beyond DSH?
- Which independent model/provider combinations produce useful adversarial review?
