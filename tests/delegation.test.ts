import type { Context } from '@deepseek-ai/cordis'
import type { SubagentResult, SubagentRun } from '@deepseek-ai/dsh-subagent'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  apply,
  EXPLORATION_OUTPUT_SCHEMA,
  EXPLORER_PERSONA,
  type ExplorationReport,
} from '../src/index.js'

interface RegisteredTool {
  name: string
  execute(
    args: { question: string; scope: string[] },
    execution: { agent?: object; signal: AbortSignal },
  ): Promise<ExplorationReport>
}

const completedReport: ExplorationReport = {
  summary: 'Documentation defines bounded context.',
  evidence: [{ path: '.lazycode/project/vision.md', observation: 'Context is assembled per invocation.' }],
  uncertainties: [],
}

function makeRun(
  result: Promise<SubagentResult> = Promise.resolve({
    output: [{ type: 'text', text: 'done' }],
    structured: completedReport,
    stopReason: 'completed',
  }),
  dispose = vi.fn().mockResolvedValue(undefined),
): { run: SubagentRun; dispose: ReturnType<typeof vi.fn> } {
  return {
    run: {
      id: 'child-session',
      localAgent: undefined,
      result,
      dispose,
    } as unknown as SubagentRun,
    dispose,
  }
}

function mount(start = vi.fn()): { tool: RegisteredTool; start: ReturnType<typeof vi.fn> } {
  let registered: RegisteredTool | undefined
  const ctx = {
    tools: {
      register(tool: RegisteredTool) {
        registered = tool
        return () => undefined
      },
    },
    subagents: { start },
  }
  apply(ctx as unknown as Context, { memoryRoot: '.lazycode' })
  if (registered === undefined) throw new Error('tool was not registered')
  return { tool: registered, start }
}

describe('delegate_exploration', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('registers the public tool name', () => {
    const { tool } = mount()
    expect(tool.name).toBe('delegate_exploration')
  })

  it('requires an owning agent before starting a child', async () => {
    const { tool, start } = mount()
    await expect(tool.execute(
      { question: 'What is the architecture?', scope: ['.lazycode/project'] },
      { signal: new AbortController().signal },
    )).rejects.toThrow('requires a calling agent')
    expect(start).not.toHaveBeenCalled()
  })

  it('starts a fresh, bounded, read-only Explorer and returns its report', async () => {
    const { run, dispose } = makeRun()
    const start = vi.fn().mockResolvedValue(run)
    const { tool } = mount(start)
    const controller = new AbortController()
    const parent = {}

    await expect(tool.execute(
      { question: ' What invariants govern context? ', scope: ['.lazycode/project/vision.md'] },
      { agent: parent, signal: controller.signal },
    )).resolves.toEqual(completedReport)

    expect(start).toHaveBeenCalledOnce()
    const [provider, request] = start.mock.calls[0] as [string, Record<string, unknown>]
    expect(provider).toBe('spawn')
    expect(request).toMatchObject({
      label: 'LazyCode repository exploration',
      parent,
      signal: controller.signal,
      outputSchema: EXPLORATION_OUTPUT_SCHEMA,
      maxDepth: 1,
      toolFilter: { allow: ['read', 'glob', 'grep'] },
      persona: EXPLORER_PERSONA,
    })
    expect(request).not.toHaveProperty('agentOptions')
    expect(request.prompt).toEqual([expect.objectContaining({
      type: 'text',
      text: expect.stringContaining('Canonical project memory: .lazycode'),
    })])
    expect(dispose).toHaveBeenCalledOnce()
  })

  it.each([
    ['', ['.lazycode'], 'non-empty question'],
    ['question', [], 'at least one scope path'],
    ['question', ['../secret'], 'repository-relative'],
    ['question', ['/etc/passwd'], 'repository-relative'],
    ['question', ['C:\\secret'], 'repository-relative'],
  ])('rejects invalid input without starting a child', async (question, scope, message) => {
    const { tool, start } = mount()
    await expect(tool.execute(
      { question, scope },
      { agent: {}, signal: new AbortController().signal },
    )).rejects.toThrow(message)
    expect(start).not.toHaveBeenCalled()
  })

  it('fails on missing structured output and disposes the child', async () => {
    const { run, dispose } = makeRun(Promise.resolve({
      output: [{ type: 'text', text: 'unstructured' }],
      stopReason: 'completed',
    }))
    const { tool } = mount(vi.fn().mockResolvedValue(run))

    await expect(tool.execute(
      { question: 'question', scope: ['.lazycode'] },
      { agent: {}, signal: new AbortController().signal },
    )).rejects.toThrow('without a valid structured exploration report')
    expect(dispose).toHaveBeenCalledOnce()
  })

  it('rejects structured output that violates the report schema', async () => {
    const { run, dispose } = makeRun(Promise.resolve({
      output: [{ type: 'text', text: 'invalid report' }],
      structured: { summary: 'missing arrays' },
      stopReason: 'completed',
    }))
    const { tool } = mount(vi.fn().mockResolvedValue(run))

    await expect(tool.execute(
      { question: 'question', scope: ['.lazycode'] },
      { agent: {}, signal: new AbortController().signal },
    )).rejects.toThrow('invalid structured report')
    expect(dispose).toHaveBeenCalledOnce()
  })

  it('preserves abnormal-stop diagnostics and disposes the child', async () => {
    const { run, dispose } = makeRun(Promise.resolve({
      output: [{ type: 'text', text: 'partial evidence' }],
      stopReason: 'max-tokens',
    }))
    const { tool } = mount(vi.fn().mockResolvedValue(run))

    await expect(tool.execute(
      { question: 'question', scope: ['.lazycode'] },
      { agent: {}, signal: new AbortController().signal },
    )).rejects.toThrow(/max-tokens.*partial evidence/su)
    expect(dispose).toHaveBeenCalledOnce()
  })

  it('disposes after result rejection', async () => {
    const { run, dispose } = makeRun(Promise.reject(new Error('transport failed')))
    const { tool } = mount(vi.fn().mockResolvedValue(run))

    await expect(tool.execute(
      { question: 'question', scope: ['.lazycode'] },
      { agent: {}, signal: new AbortController().signal },
    )).rejects.toThrow('transport failed')
    expect(dispose).toHaveBeenCalledOnce()
  })

  it('reports execution and disposal failures together', async () => {
    const dispose = vi.fn().mockRejectedValue(new Error('dispose failed'))
    const { run } = makeRun(Promise.reject(new Error('transport failed')), dispose)
    const { tool } = mount(vi.fn().mockResolvedValue(run))

    await expect(tool.execute(
      { question: 'question', scope: ['.lazycode'] },
      { agent: {}, signal: new AbortController().signal },
    )).rejects.toThrow(/transport failed.*dispose failed/su)
    expect(dispose).toHaveBeenCalledOnce()
  })
})
