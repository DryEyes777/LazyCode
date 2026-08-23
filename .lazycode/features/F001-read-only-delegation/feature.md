# F001: Read-only Exploration Delegation

Status: active

## User outcome

A LazyCode Project Manager can delegate a bounded repository question to a disposable Explorer without passing down the parent conversation or granting mutation capabilities.

## Behavior

The Project Manager calls `delegate_exploration` with a question and repository-relative scope. LazyCode starts a fresh in-process child, supplies an Explorer persona and standalone task, restricts its visible and executable tools, and returns only a structured evidence report.

## Non-goals

The feature does not implement background continuation, implementation work, automatic document updates, general agent identity, or hierarchical escalation.
