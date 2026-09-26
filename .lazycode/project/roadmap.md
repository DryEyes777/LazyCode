# Roadmap

Last updated: 2026-09-26

Track the next three planning steps in the [Development Readiness Checklist](development-readiness-checklist.md): reconcile readiness, define the SQLite spike, and plan the minimum end-to-end application.

## Established foundation

### D001 — Foundation and read-only delegation

Status: Merged

- Canonical project documentation established.
- Native out-of-tree DeepSeek Harness bundle implemented.
- Project Manager to read-only Explorer delegation covered by automated verification.
- Typechecking, tests, build, packaging, and profile composition verified in the recorded foundation work.

See [D001 status](../deliveries/D001-foundation/status.md). A live API smoke test has not been run; it remains optional and requires explicit user request. Its absence does not reopen D001 or become a dogfooding acceptance requirement.

## Before implementation

The prerequisite orchestration-plugin and agent-profile improvements are complete. The [readiness reconciliation](development-readiness.md) records the current baseline and remaining technical decisions; this tooling work is not implementation of the LazyCode runtime.

Complete documentation reconciliation and resolve the technical contracts needed by the next Feature. Established product topics do not substitute for implementation-ready specifications. See [Evaluation and Implementation Roadmap](evaluation-and-implementation-roadmap.md).

## First usable milestone — build LazyCode using LazyCode

This is a dogfooding milestone, not a release. Initial scope is one repository and one active Delivery with the real web-based planning, delegation, persistence, permissions, review, testing, and approval/integration workflow.

The implementation sequence, after the relevant Feature definitions, technical plans, and Delivery start are approved, is:

1. **SQLite validation:** consistent snapshots, authorized branch integration, ownership, replication, and restoration using deterministic tests.
2. **Minimum application contracts:** specify and implement the backend/host, execution interface, controlled commands, data operations, and web workflow needed for dogfooding.
3. **Simulated end-to-end acceptance:** complete a Feature through definition, implementation artifacts, review, correction, pause/reconstruction, and approved merge using mocked agents. Automated tests must not call live AI models.
4. **Ordinary dogfooding:** the user elects to develop subsequent LazyCode Features through LazyCode. Inspect actual usage, runtime, interventions, and review-driven rework to improve instructions without duplicate benchmark runs.

These phases are sequencing guidance, not approved Delivery records. The earlier D002–D005 headings were provisional planning placeholders; they are superseded by this sequence and are not silently assigned new scope here.

## Later capabilities

- OpenSandbox integration and measured local environment defaults.
- Isolated automated browser QA; manual QA remains available earlier.
- Multiple repositories and concurrent Deliveries.
- Broader execution and model configurations as justified by actual use.
- Linux homelab/server deployment and possible CubeSandbox integration.

Deferring a sandbox provider does not remove the requirement to enforce the initial executor's supported permissions and protect managed state and secrets.

## Evaluation

Use actual authorized development to inspect quality, runtime, token/cost usage, interventions, repeated work, and review corrections with their model and instruction configurations. Do not duplicate Tasks merely to compare LazyCode with another workflow.

Automated acceptance uses scripted models and real application mechanisms in fixtures. Live AI tests are optional and explicitly requested, never automatic gates.
