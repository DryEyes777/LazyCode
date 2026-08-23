import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const repositoryRoot = resolve(import.meta.dirname, '..')
const manifest = JSON.parse(readFileSync(resolve(repositoryRoot, 'package.json'), 'utf8')) as Record<string, unknown>
const patch = readFileSync(resolve(repositoryRoot, 'cordis.patch.yml'), 'utf8')

describe('DeepSeek Harness bundle', () => {
  it('declares the installable bundle entry points', () => {
    expect(manifest).toMatchObject({
      name: 'lazycode-dsh',
      private: true,
      type: 'module',
      main: 'lib/index.js',
      types: 'lib/index.d.ts',
      dsh: { bundle: { patch: './cordis.patch.yml' } },
    })
  })

  it('pins the tested Harness RC exactly', () => {
    const devDependencies = manifest.devDependencies as Record<string, string>
    for (const dependency of [
      '@deepseek-ai/dsh',
      '@deepseek-ai/dsh-subagent',
      '@deepseek-ai/dsh-system-prompt',
      '@deepseek-ai/dsh-tools',
    ]) {
      expect(devDependencies[dependency]).toBe('0.1.0-rc.8')
    }
    expect(devDependencies['@deepseek-ai/cordis']).toBe('4.0.1')
  })

  it('overrides the Project Manager persona and inserts the delegation plugin', () => {
    const personaPosition = patch.indexOf('- id: system-prompt')
    const pluginPosition = patch.indexOf('- id: lazycode-delegation')
    expect(personaPosition).toBeGreaterThanOrEqual(0)
    expect(pluginPosition).toBeGreaterThan(personaPosition)
    expect(patch).toContain('name: lazycode-dsh')
    expect(patch).toContain('memoryRoot: .lazycode')
  })
})
