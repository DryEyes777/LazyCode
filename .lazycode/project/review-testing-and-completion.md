# Review, Testing, Integration, and Completion

Status: established
Last updated: 2026-09-07

## Purpose

This reference defines verification at Task, Feature, and Delivery levels, Reviewer context, test sequencing, failure exceptions, QA, and final acceptance. These are intended product contracts; the current delegation spike does not implement the complete verification system.

## Test layers

Verification plans distinguish four layers:

| Layer | Runs for real | May be mocked |
| --- | --- | --- |
| Unit tests | The isolated unit under test | Its dependencies |
| Internal integration tests | Application behavior and its internal helper/service chain | Application-external boundaries, such as databases or remote APIs |
| Local dependency integration tests | Application code and locally provisioned dependencies, such as seeded databases in containers | Truly remote services outside the local scenario |
| Live external tests | Application code and the relevant actual external services | Only dependencies outside the scenario being verified |

Exact commands and environment requirements belong in the relevant repository guidance and verification plan.

## Task verification

Each coding Task must run:

- its added or modified tests;
- the full unit suite in its assigned repository;
- internal integration tests exercising the changed behavior through its real internal helpers and services.

For internal integration tests, a worker changing a service method must exercise the helper services below it without mocking those internal collaborators. Application-external boundaries may be mocked. An endpoint Task similarly exercises the real application behavior beneath that endpoint.

The direct parent verifies the Task contract, evaluates review Findings, and accepts or returns the work before integration. A Task remains scoped to one repository even when its Feature spans several.

## Feature verification

The Feature Lead verifies the integrated Feature against its acceptance criteria and runs the full applicable suites across every repository changed by the Feature.

This includes the full unit, internal integration, and local dependency integration suites, including tests unrelated to the new behavior within those changed repositories. Locally provisioned dependencies may include containers and seeded databases.

Unchanged repositories do not need their suites rerun. Cross-repository behavior is still verified against the relevant combination of repository versions.

Once review corrections are settled and the preceding checks pass, live external regression tests run. Established verification exceptions described below may remain visible without stopping this progression.

A test involving an external service that is itself being added or modified may run earlier because it is necessary to implement the work. That early execution remains subject to existing access permissions and does not replace the later regression obligations.

## Delivery verification

The Delivery Manager runs the full test suite against the integrated Delivery candidate before declaring completion, even when its code appears equivalent to the last verified Feature branch.

The run covers all repositories changed by the Delivery, all applicable test layers, and the relevant integration between those repositories. Feature-level evidence does not replace this Delivery-level run.

The candidate also includes the required review and QA evidence. Verification identifies the exact repository commits examined.

## Independent review

Parents commission review and select required specializations through the verification plan according to scope and risk.

Contract Reviewers receive:

- approved Task requirements;
- applicable guidance;
- changes and relevant source files;
- test evidence.

Initial review does not inherit the implementer's conversation.

Architecture, code-quality, and safety Reviewers receive their own review guidance and relevant code context without automatically receiving the Task narrative. Task details are supplied to the Reviewers whose assignment is to verify that contract.

Reviewers report Findings. The parent evaluates those Findings and directs corrections, optionally consulting Oracles under the existing authority rules.

Follow-up returns to the same logical Reviewer with the changes and prior Finding dispositions. Rejected Findings include their rationale and are not repeated without new evidence. Corrections do not automatically require a full new review.

## Failure classification and exceptions

Failures caused by the new work require correction. Unexplained failures remain under investigation.

A failure may be classified as pre-existing only with supporting evidence, such as reproducing it on the original baseline. A claim that a test was already broken is insufficient by itself.

Established pre-existing failures and transient external-service failures do not stop Feature or Delivery progress. These exceptions remain visible in Reports and the Delivery review package and are recorded as failed or unverified, never passed. Flaky or otherwise unexplained failures are not automatically exempt.

If external unavailability prevents checking a new acceptance criterion, that criterion may remain explicitly unverified, even when critical. The user may resolve the availability issue and request a retest, or approve merging despite the limitation.

The record retains:

- the failing or unavailable check and evidence;
- the reason for its exception classification;
- affected behavior or acceptance criteria;
- known consequences and remaining uncertainty;
- the user's acceptance or retest decision when made.

This refines the earlier strict completion rule: a Completed Feature or Delivery may carry these explicit verification exceptions for user review. It does not convert those exceptions into successful verification or authorize ignoring a defect introduced by the new work.

Relevant unresolved limitations remain documented after merge under the established reporting and knowledge-promotion rules.

## Delivery QA

QA scenarios are planned before implementation. They may be added or refined as implementation reveals new information.

Only the Delivery Manager commissions QA Testers. Each Tester receives:

- a narrow scenario and expected outcomes;
- access instructions;
- an isolated environment containing the candidate application;
- required dependencies and seeded data.

The Delivery Manager coordinates environment preparation through authorized workers. Testers exercise the product and return Findings and evidence without repairing implementation.

Scenarios suit the product: browser interaction where applicable, or appropriate API, infrastructure, or data workflows.

QA requires a fresh browser session and fresh data, with no interference between concurrent Testers. Initial automation targets web applications; unsupported native desktop testing is identified for manual user verification. Provider direction, worktree ownership, shared capacity, and environment profiles follow [Isolated Execution and QA Environments](isolated-execution-and-qa-environments.md).

## Corrections and retesting

After corrections, previous test evidence cannot validate the changed code. Full automated suites rerun across the affected repositories under the Task, Feature, and Delivery rules above, with evidence identifying the tested commits.

QA revisits failed and potentially affected scenarios; unrelated QA scenarios need not automatically repeat. The Delivery Manager determines that scope. This QA round may occur before the expensive automated tests are rerun.

The parent continues evaluating and returning actionable corrections. Suspected loops or lack of progress follow [Scheduling, Failure, and Recovery](scheduling-failure-and-recovery.md).

Corrections before parent integration remain with the same logical Task and worker. Findings after parent integration use a new corrective Task and Report under [Repository, Workspace, and Git Strategy](repository-workspace-and-git.md).

## Completion and user acceptance

A Feature completes after child integration, required review, execution of its required tests, and recording of acceptance evidence and its Feature Report. Introduced defects must be corrected; permitted verification exceptions remain explicit. Delivery integration follows Feature completion.

A Delivery completes after its Features are complete and integrated and its own full test run has been performed, with introduced defects corrected and permitted exceptions recorded. Candidate preparation includes required review and QA before presentation to the user.

The Delivery Manager presents the combined implementation, review results, test and QA evidence, documentation changes, and remaining exceptions. Project-documentation changes are authored by a Project Manager in its own branch and integrated under PD-17.

The user approves the complete candidate across its affected repositories, including any decision to accept documented verification limitations. Integration and publication follow PD-17: required local merges precede user-requested pushes, and repository outcomes remain separately inspectable.

Report completion and immutability still follow their parent integration boundaries in [Reporting and Information Compression](reporting-and-information-compression.md). A work item's Completed state does not imply that all checks passed or that its Report has already crossed its integration boundary.

## Remaining implementation detail

Technical planning must define executable verification plans, evidence schemas, concrete environment provisioning, and test commands. The environment policy and required provider spike are established in [Isolated Execution and QA Environments](isolated-execution-and-qa-environments.md). Structured evidence and exceptions live in worktree databases; required attachments are Git-tracked under `.lazycode/` with relative references and content identifiers under [Persistence and Schemas](persistence-and-schemas.md).
