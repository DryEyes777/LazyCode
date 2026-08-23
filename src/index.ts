import type { Context } from '@deepseek-ai/cordis'
import Schema from '@deepseek-ai/schemastery'
import type { SubagentResult, SubagentRun } from '@deepseek-ai/dsh-subagent'
import type {} from '@deepseek-ai/dsh-system-prompt'
import {
  assertObjectJsonSchema,
  defineTool,
  type ObjectJsonSchema,
  validateJsonSchemaValue,
} from '@deepseek-ai/dsh-tools'

export const name = 'lazycode-delegation'
export const inject = ['tools', 'subagents']

export interface Config {
  memoryRoot: string
}

export const Config: Schema<Config> = Schema.object({
  memoryRoot: Schema.string().default('.lazycode'),
})

export interface ExplorationReport {
  summary: string
  evidence: Array<{
    path: string
    observation: string
  }>
  uncertainties: string[]
}

export const EXPLORER_PERSONA = `You are a LazyCode Explorer. Investigate only the delegated repository question.
Use repository evidence rather than assumptions. You are read-only: do not attempt to modify files, run commands,
access the network, or delegate further. Return the required structured report and make every evidence path precise.`

export const EXPLORATION_OUTPUT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    summary: { type: 'string' },
    evidence: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          path: { type: 'string' },
          observation: { type: 'string' },
        },
        required: ['path', 'observation'],
      },
    },
    uncertainties: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: ['summary', 'evidence', 'uncertainties'],
} as const satisfies ObjectJsonSchema

assertObjectJsonSchema(EXPLORATION_OUTPUT_SCHEMA)

const EXPLORATION_TOOL_VALUE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    summary: { type: 'string', required: true },
    evidence: {
      type: 'array',
      required: true,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          path: { type: 'string', required: true },
          observation: { type: 'string', required: true },
        },
      },
    },
    uncertainties: {
      type: 'array',
      required: true,
      items: { type: 'string' },
    },
  },
} as const

function isRepositoryRelative(value: string): boolean {
  if (value.length === 0 || value.includes('\0')) return false
  if (value.startsWith('/') || value.startsWith('\\') || /^[A-Za-z]:[\\/]/u.test(value)) return false
  return !value.replaceAll('\\', '/').split('/').includes('..')
}

function assertInput(question: string, scope: string[], memoryRoot: string): void {
  if (question.trim().length === 0) throw new Error('delegate_exploration requires a non-empty question')
  if (scope.length === 0) throw new Error('delegate_exploration requires at least one scope path')
  if (!isRepositoryRelative(memoryRoot)) {
    throw new Error(`memoryRoot must be repository-relative: ${JSON.stringify(memoryRoot)}`)
  }
  const invalid = scope.find(path => !isRepositoryRelative(path))
  if (invalid !== undefined) {
    throw new Error(`scope paths must be repository-relative: ${JSON.stringify(invalid)}`)
  }
}

type SubagentOutputBlock = SubagentResult['output'][number]

function outputText(output: SubagentResult['output']): string {
  return output
    .filter((block): block is Extract<SubagentOutputBlock, { type: 'text' }> => block.type === 'text')
    .map(block => block.text)
    .join('')
}

function resultError(result: SubagentResult): Error | undefined {
  if (result.stopReason === 'completed') return undefined
  const partial = outputText(result.output)
  const detail = partial.length === 0 ? '' : `\nPartial output:\n${partial}`
  return new Error(`Explorer ended with stop reason ${JSON.stringify(result.stopReason)}.${detail}`)
}

async function collectAndDispose(run: SubagentRun): Promise<ExplorationReport> {
  let report: ExplorationReport | undefined
  let executionError: unknown
  try {
    const result = await run.result
    const stopped = resultError(result)
    if (stopped !== undefined) throw stopped
    if (result.structured === undefined) {
      throw new Error('Explorer completed without a valid structured exploration report')
    }
    const violations = validateJsonSchemaValue(EXPLORATION_OUTPUT_SCHEMA, result.structured, 'report')
    if (violations.length > 0) {
      throw new Error(`Explorer returned an invalid structured report: ${violations.join('; ')}`)
    }
    report = result.structured as ExplorationReport
  } catch (error: unknown) {
    executionError = error
  }

  let disposalError: unknown
  try {
    await run.dispose()
  } catch (error: unknown) {
    disposalError = error
  }

  if (executionError !== undefined && disposalError !== undefined) {
    throw new AggregateError(
      [executionError, disposalError],
      `Explorer execution failed (${String(executionError)}); disposal also failed (${String(disposalError)})`,
    )
  }
  if (executionError !== undefined) throw executionError
  if (disposalError !== undefined) throw disposalError
  if (report === undefined) throw new Error('Explorer produced no report')
  return report
}

function buildPrompt(question: string, scope: string[], memoryRoot: string): string {
  const paths = scope.map(path => `- ${path}`).join('\n')
  return `Investigate this repository question:\n\n${question.trim()}\n\nCanonical project memory: ${memoryRoot}\n\nAllowed scope:\n${paths}\n\nRead only files inside the allowed scope. Return a concise summary, file-backed evidence, and uncertainties. If evidence is empty, explain why in uncertainties.`
}

export function apply(ctx: Context, config: Config): void {
  ctx.tools.register(defineTool({
    name: 'delegate_exploration',
    description: 'Delegate a bounded, read-only repository question to a fresh LazyCode Explorer and receive a structured evidence report.',
    parameters: {
      question: {
        type: 'string',
        required: true,
        description: 'The precise repository question the Explorer must answer.',
      },
      scope: {
        type: 'array',
        required: true,
        items: { type: 'string' },
        description: 'Repository-relative files or directories the Explorer may inspect.',
      },
    },
    output: {
      schema: EXPLORATION_TOOL_VALUE_SCHEMA,
      render: (_args, value) => [{ type: 'text', text: JSON.stringify(value) }],
    },
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      if (exec.agent === undefined) {
        throw new Error('delegate_exploration requires a calling agent')
      }
      assertInput(args.question, args.scope, config.memoryRoot)
      const run = await ctx.subagents.start('spawn', {
        label: 'LazyCode repository exploration',
        prompt: [{ type: 'text', text: buildPrompt(args.question, args.scope, config.memoryRoot) }],
        parent: exec.agent,
        signal: exec.signal,
        outputSchema: EXPLORATION_OUTPUT_SCHEMA,
        maxDepth: 1,
        toolFilter: { allow: ['read', 'glob', 'grep'] },
        persona: EXPLORER_PERSONA,
      })
      return collectAndDispose(run)
    },
  }))
}
