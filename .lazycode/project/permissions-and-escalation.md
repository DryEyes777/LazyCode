# Permissions and Escalation

Status: established
Last updated: 2026-09-05

## Purpose

This reference defines worker permissions, delegated authority, grant scope and lifetime, enforcement, revocation, escalation, and permission appeals. These are intended product contracts; the current Explorer spike does not implement the complete permission system.

## Permissions and authority

Permissions govern what a worker may do itself. Authority governs what it may authorize for eligible children, including the scope of their work and resources.

A role establishes the maximum capabilities available to a worker. Its assignment and grants narrow those capabilities to the relevant resources. A standing Project permission cannot override role restrictions.

For example, an Implementation Worker may edit code within its granted scope. An Explorer cannot run tests merely because the Project has approved a test command for other workers.

Management workers may authorize implementation by eligible children without having permission to write implementation code themselves. Authority to grant access and permission to exercise that access are separate controls.

The fixed role responsibilities and allowed child roles remain defined in [Roles and Ownership](roles-and-ownership.md). The detailed role-by-capability and grant-authority matrix remains for technical definition.

## Grant contract

Each grant identifies:

- the permitted action;
- the resources and scope;
- the eligible recipient or recipients;
- the lifetime;
- the approving authority and rationale.

Actions may include scoped reading and writing, local commands and tests, owned development processes, branch and worktree operations, approved delegation, network access, dependency installation, credential use, and interaction with external services.

A standing rule makes an action available to qualifying assignments. It does not give every worker that action or broaden its role.

## Grant lifetimes

Supported lifetimes include:

- one authorized action;
- the current Task's implementation, review, and correction loop;
- a Delivery-scoped grant;
- a standing Project rule for eligible future workers.

Grants follow logical work and survive compaction or activation replacement. Reconstructing a worker retains its applicable grants, subject to current permission checks and any subsequent revocation.

A Task-scoped grant expires when the Task is accepted and merged into its parent branch. Review and corrections before that merge remain covered. A corrective Task created after the merge requires its own grant or access under an applicable standing rule.

Agents may grant temporary access within their delegated authority. Establishing a standing permission or broadening authorization to future workers requires user approval, including the qualifying roles and scopes.

## Project configuration

Starting a Delivery authorizes routine capabilities within its approved plan and Project configuration. It does not bypass role or resource restrictions.

Project settings define standing authorization for resources and actions such as network access, approved dependency registries, development databases, credentials, and external services. Requests outside that authorization escalate before execution.

For example, a user-approved test command may become available to future eligible workers whose assignments require it, without granting unrelated commands or access to unrelated environments.

## Command approvals

Command approvals identify:

- the command;
- allowed arguments;
- the working directory;
- relevant resources.

When the executable or script contents change, LazyCode checks whether the previous approval still applies. A command name alone does not establish that changed behavior remains authorized.

## Enforcement and revocation

Every use passes through a runtime permission check.

Revoking or narrowing permission takes effect at the next use. This also applies to descendant access derived from the revoked authority. Previously issued child grants cannot preserve access that depended on authority which has been removed.

Revocation does not itself interrupt ongoing work. The next affected operation is denied under the current rules, while other authorized work can continue.

A denial caused by a permission change explicitly identifies that access was revoked or narrowed, so the worker can adjust instead of treating the failure as a tooling defect.

Forced stop remains a separate operation governed by [Human Control and Autonomy](human-control-and-autonomy.md).

## Escalation types

LazyCode distinguishes:

- missing information;
- missing permission;
- a Decision outside the worker's authority.

These may be types of a shared escalation object; separate entities are not required by the product definition.

Information requests may use an authorized Explorer or Oracle. Permission and Decision requests use an ephemeral activation acting with the appropriate parent's authority. Oracles supply evidence and advice but cannot grant permissions.

The approving activation checks whether it has authority, grants the smallest sufficient scope when justified, or escalates to the next authorized level. An ephemeral activation does not gain additional authority merely because it was created for an escalation.

## Escalation contract

Each escalation carries:

- its type;
- the precise question or requested action;
- why resolution is necessary;
- affected work;
- relevant evidence;
- attempted solutions;
- the authority required;
- what can continue meanwhile.

Permission requests also state the requested resources and lifetime. Decisions and denials include their rationale so the worker can revise its approach.

## Denial and permission appeal

After a denial, the worker first attempts to proceed within its existing permissions.

If that is insufficient, it may resubmit with additional reasons explaining why the grant is necessary. It does not repeatedly submit an unchanged request without new justification.

Following another denial, it may appeal directly to the Feature Lead, then the Delivery Manager, then the Project Manager. Levels already consulted are skipped. This permits an appeal to bypass intermediate implementation parents rather than repeating the same review at every recursive Task level.

Each appeal uses an ephemeral verification activation of the responsible authority holder. Prior denials and their rationale remain available to the next reviewer.

An appeal changes who reviews the request; it does not authorize the action by itself. Each reviewer can grant only what its authority permits. Matters requiring human authority ultimately reach the user.

Affected work waits when no authorized path remains. Unrelated work continues. When resolution requires the user, affected workers follow the established Blocked lifecycle and cannot resume the blocked work until the answer is incorporated.

## Visibility and propagation

LazyCode records permission requests, approvals, denials, appeals, reasons, scope, lifetime, approving authority, and later revocations. Ephemeral approval activations remain attributable to the authority holder on whose behalf they acted.

The worker interface displays its current permissions separately from its authority to grant capabilities to children.

Accepted Decisions and relevant guidance propagate through the existing hierarchy according to [Reporting and Information Compression](reporting-and-information-compression.md) and [Context and Memory](context-and-memory.md). Canonical documentation changes retain their established ownership and user-approval boundaries.

## Remaining implementation detail

The product policy is established. Technical planning must still define the detailed capability and authority matrix, resource matching, command-change validation, enforcement mechanisms, and physical grant and escalation schemas.

Repository and Git operations are refined in `PD-17`; physical persistence is refined in `PD-21`. Runtime implementation remains future work beyond the current read-only Explorer tool restriction.
