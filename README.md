# LazyCode

LazyCode is a personal research project for building a hierarchical software-development organization from bounded-context agents. It is an out-of-tree [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) bundle, not a fork.

The project is in an early spike phase. The first executable capability gives a Project Manager agent one `delegate_exploration` tool. That tool starts a fresh Explorer agent with a standalone prompt, a one-level delegation limit, read-only repository tools, and a structured result contract.

## Architecture boundary

DeepSeek Harness owns the agent loop, model adapters, tool registry, session log, sandbox, approvals, and subagent lifecycle. LazyCode owns organizational roles, task contracts, context policy, and durable project artifacts. This v1 choice couples LazyCode to the evolving Harness plugin API while leaving model selection behind Harness's adapter seam.

The `.lazycode/` directory is the canonical organizational memory for this repository. Conversation history is execution evidence, not the source of project truth.

## Requirements

- Node.js `^22.19.0` or `>=24.0.0`
- pnpm `11.19.0`
- A DeepSeek API key only for the live smoke test

DeepSeek Harness is currently a developer preview with compatibility-breaking changes. This repository pins the exact release candidate it was tested against.

## Development

Install the exact pinned dependencies. The override applies only to this command and does not change the user's npm configuration:

```sh
pnpm --config.minimum-release-age=0 install
npm run check
```

Build and install the bundle into a dedicated headless profile:

```sh
pnpm build
pnpm --config.minimum-release-age=0 dsh plugin --profile lazycode add @deepseek-ai/dsh-headless@0.1.0-rc.8
pnpm --config.minimum-release-age=0 dsh plugin --profile lazycode add .
pnpm dsh --profile lazycode --dump-config
```

With `DEEPSEEK_API_KEY` available, run the read-only spike:

```sh
pnpm dsh --profile lazycode "Delegate an exploration of .lazycode/project/vision.md and .lazycode/project/architecture.md. Identify three design invariants with file-backed evidence."
```

## Project memory

- [Project definition](.lazycode/project/project-definition.md)
- [Project definition workbook](.lazycode/project/project-definition-workbook.md)
- [Primary end-to-end workflow](.lazycode/project/primary-workflow.md)
- [Vision](.lazycode/project/vision.md)
- [Organizational model](.lazycode/project/organizational-model.md)
- [Architecture](.lazycode/project/architecture.md)
- [Conventions](.lazycode/project/conventions.md)
- [Roadmap](.lazycode/project/roadmap.md)
- [DeepSeek Harness research](.lazycode/project/research/deepseek-harness.md)
- [ADR-0001: Native DeepSeek Harness plugin](.lazycode/project/decisions/ADR-0001-native-dsh-plugin.md)
- [D001 foundation delivery](.lazycode/deliveries/D001-foundation/delivery.md)
- [F001 read-only delegation](.lazycode/features/F001-read-only-delegation/feature.md)

## License

[MIT](LICENSE)
