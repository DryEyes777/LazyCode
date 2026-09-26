# Jev for Decision Lookup Before Escalation

Research date: 2026-09-16
Status: candidate for later evaluation; no integration or live evaluation completed
Scope: preserving the proposed use of TypeSafe AI's Jev in LazyCode decision lookup and escalation

## Purpose

Before an agent makes a design choice or escalates a question, check whether an applicable answer already exists in recorded Decisions or project documentation. If it does, return that answer with its source and scope. Otherwise, let escalation reach someone with sufficient authority to decide, potentially the user. Record the resulting decision so later agents can reuse it.

This note captures a research direction discussed with the user. It does not select Jev as a required dependency, change established authority contracts, or authorize implementation or live AI tests.

## Documented capabilities and limits

TypeSafe's [question primitives](https://docs.typesafe.ai/primitives) support choices among supplied options, ratings against defined levels, and probabilities for yes/no judgments. The documentation recommends focused questions over supplied context, with application code combining the answers. This makes Jev a candidate for checking whether retrieved material settles a specific question.

TypeSafe's [launch announcement](https://typesafe.ai/blog/introducing-system-one-models-and-jev) describes Jev as an early-access model with typed probabilistic outputs instead of free-form text generation. Speed, cost, and calibration claims are vendor-reported and have not been validated for LazyCode. Its schema guarantees do not establish that a selected answer is correct.

Jev would assess retrieved records, not independently discover everything in project memory or write a new authoritative decision. LazyCode would own retrieval and return the original recorded answer and source references.

## Proposed workflow

1. Capture the agent's question, affected scope, and any proposed choice.
2. Retrieve relevant Decisions and documentation within the worker's permitted access. Include record identity, revision, approval status, scope, and supersession information where available.
3. Apply deterministic checks for access and record eligibility. Ask Jev narrow semantic questions about whether eligible evidence answers the question and applies to the current scope.
4. Return one of three outcomes:
   - **Answered:** return the applicable recorded answer, source references, and scope. The worker continues only within its existing authority.
   - **No answer found:** escalate with the question and searched scope. This result is not proof that no decision exists elsewhere.
   - **Ambiguous or conflicting evidence:** escalate with the competing records and unresolved applicability questions.
5. Route unresolved questions through the existing authority hierarchy until an authorized decision-maker can resolve them, including the user when necessary.
6. Persist a new or revised decision through the normal controlled process, with rationale, scope, authority, and any superseded records. Make it available to future lookups.

Example: an agent proposes using Harness session logs as canonical project state. Retrieval finds the established [DeepSeek Harness boundary](../deepseek-harness-boundary.md), which assigns application state to LazyCode and treats session logs as execution history. The checker identifies the applicable rule and LazyCode returns its source. A request to change that rule still requires escalation to the proper authority.

## Boundaries

- A retrieved statement is not automatically an approved Decision. Drafts, research notes, imported content, and superseded records must remain distinguishable from authoritative guidance.
- A high probability or lack of detected conflict does not grant permission, approve a new design, or replace required review.
- Missing evidence, uncertain applicability, and service failure must not silently become an affirmative answer. Preserve the existing escalation path.
- Answers must reference actual retrieved records; code should attach exact source text and references rather than treating generated explanations as project truth.
- The checker must respect existing memory-access and escalation boundaries. Higher-authority lookup must not expose restricted material to the requesting worker.

Relevant established contracts are [Context and Memory](../context-and-memory.md), [Permissions and Escalation](../permissions-and-escalation.md), [Roles and Ownership](../roles-and-ownership.md), and [Persistence and Schemas](../persistence-and-schemas.md).

## Later evaluation

Start with an advisory experiment over representative questions and reviewed records. Include explicit answers, paraphrases, compatible choices, scope mismatches, conflicting documents, superseded decisions, drafts, missing evidence, and retrieval failures. Compare against retrieval alone and, where explicitly authorized, an existing model-based checker.

Measure retrieval coverage separately from Jev's applicability judgments. Track incorrect resolved answers, missed existing answers, unnecessary escalations, source correctness, actual latency, and total cost including retrieval and fallbacks. Evaluate probability thresholds on held-out examples rather than accepting a confidence number as sufficient evidence.

Use scripted substitutes for automated routing and failure-path tests. Live Jev evaluation is optional and requires an explicit request under [Evaluation and Implementation Roadmap](../evaluation-and-implementation-roadmap.md). No live calls are implied by recording this note.

Before possible implementation, resolve access and API availability, data handling, record retrieval and freshness, answer contracts, threshold policy, outage behavior, and audit records. Preserve provider independence so the workflow can be evaluated without committing the project to Jev.
