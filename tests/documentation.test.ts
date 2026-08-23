import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, extname, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const repositoryRoot = resolve(import.meta.dirname, '..')

function markdownFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = resolve(directory, entry)
    return statSync(path).isDirectory() ? markdownFiles(path) : extname(path) === '.md' ? [path] : []
  })
}

const documents = [resolve(repositoryRoot, 'README.md'), ...markdownFiles(resolve(repositoryRoot, '.lazycode'))]

describe('project documentation', () => {
  it('contains no broken relative links', () => {
    const failures: string[] = []
    for (const document of documents) {
      const markdown = readFileSync(document, 'utf8')
      for (const match of markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/gu)) {
        const target = match[1]
        if (target === undefined || /^(?:https?:|mailto:|#)/u.test(target)) continue
        const path = resolve(dirname(document), decodeURIComponent(target.split('#')[0] ?? ''))
        if (!existsSync(path)) failures.push(`${document}: ${target}`)
      }
    }
    expect(failures).toEqual([])
  })

  it('preserves every major concept from the initial design', () => {
    const corpus = documents.map(path => readFileSync(path, 'utf8')).join('\n')
    for (const concept of [
      'Project Manager',
      'Delivery Manager',
      'Team Lead',
      'Feature Lead',
      'Explorer',
      'Reviewer',
      'Tester',
      'Oracle',
      'Context',
      'Information compression',
      'Escalation',
      'Permissions',
      'model-independent',
    ]) {
      expect(corpus.toLowerCase()).toContain(concept.toLowerCase())
    }
  })
})
