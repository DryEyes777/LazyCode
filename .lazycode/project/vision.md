# Vision

## Goal

LazyCode explores a software-development agent system that behaves like a structured engineering organization instead of one indefinitely growing conversation.

The central model is:

> Agent = Role + Scope + Context Policy + Capabilities + Parent/Children + Owned Resources + Escalation Policy + Model Policy

An agent is a reconstructable responsibility, not merely a persistent chat session.

## Desired properties

- Keep model contexts small, relevant, and reconstructable.
- Give agents explicit responsibilities, ownership, and authority.
- Decompose work recursively at meaningful software contracts.
- Let parents reason against child contracts rather than absorb child implementation detail.
- Treat repository artifacts and current code as durable organizational memory.
- Compress information as it moves upward through the hierarchy.
- Route unresolved decisions through deterministic escalation paths.
- Enforce permissions in runtime code instead of prompt prose alone.
- Select models and context policies by role without binding the organization to one model provider.
- Use independent reviewers and testers with fresh, purpose-built context.
- Prioritize code quality over affordability, and affordability over speed.
- Allow the same organizational contracts to coordinate AI models, humans, services, or external agents.

## Core principles

1. Documentation is memory; conversation history is temporary.
2. Context is assembled for an invocation rather than inherited wholesale.
3. Persistent identity does not require persistent conversation.
4. Delegation follows independently testable contracts.
5. Information is compressed upward to what each parent needs.
6. Permissions are runtime capabilities.
7. Escalation routing belongs to software, not model improvisation.
8. Verification uses independent context.
9. Temporary agents are expected and inexpensive to recreate.
10. Models and execution providers are replaceable behind stable organizational contracts.
11. LazyCode is a tool, not a guarantee of correctness or a replacement for developer accountability.

## Long-term outcome

A human should be able to give project-level intent to a system that plans deliveries, decomposes features, delegates bounded implementation work, verifies results, records durable knowledge, and escalates decisions without accumulating the entire organization in one model context.

## Current boundary

The initial spike implements only a Project Manager persona and a disposable, read-only Explorer. The broader organization remains a documented design target until its contracts are proven incrementally.
