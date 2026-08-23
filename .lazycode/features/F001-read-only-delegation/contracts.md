# F001 Contracts

## Input

```ts
{
  question: string
  scope: string[]
}
```

The question must contain non-whitespace text. Scope must contain repository-relative paths with no parent traversal, absolute paths, drive prefixes, or null bytes.

In F001, scope is a validated task/context boundary rather than a filesystem authorization boundary. The Explorer is instructed to remain within it, while DSH's workspace sandbox and read-only tool restriction provide the enforced boundary. Path-scoped read enforcement is deferred.

## Output

```ts
{
  summary: string
  evidence: Array<{
    path: string
    observation: string
  }>
  uncertainties: string[]
}
```

Evidence may be empty when the repository does not support a conclusion, but the report must explain the gap in `uncertainties`.

## Child policy

- Provider: `spawn`
- Conversation inheritance: none
- Maximum delegation depth: `1`
- Tools: `read`, `glob`, `grep`
- Canonical memory root: configurable, default `.lazycode`
- Result: required structured output
- Cleanup: dispose every published child run
