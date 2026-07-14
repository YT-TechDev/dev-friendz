# Decisions

This file records accepted decisions that already constrain Dev Friendz. It is not a roadmap.

## D001

- Status: Accepted
- Decision: ScriptWidget is the initial runtime.
- Rationale: The first working Friend is implemented and owner-validated in ScriptWidget.
- Consequences: Runtime-sensitive changes must respect ScriptWidget constraints and require real-device validation before merge.

## D002

- Status: Accepted
- Decision: Medium is the first and only supported widget size for v0.1.0.
- Rationale: The current implementation and owner validation target the Medium widget size.
- Consequences: Documentation and validation must not claim Small or Large support.

## D003

- Status: Accepted
- Decision: The merged `main` branch is the stable installation source.
- Rationale: Users need an installation source that excludes unfinished feature-branch work.
- Consequences: Installation instructions must point to merged [`main.jsx`](main.jsx) from `main`.

## D004

- Status: Accepted
- Decision: v0.1.0 installation uses copy and paste into ScriptWidget.
- Rationale: Repeated `.jsx` imports may create duplicate scripts, while copy and paste updates the intended script directly.
- Consequences: `.swt` packaging and import-based installation are not documented as supported for v0.1.0.

## D005

- Status: Accepted
- Decision: Dev Friendz does not depend on iCloud for Windows.
- Rationale: The confirmed GitHub-to-iPhone workflow uses copied source from the repository.
- Consequences: Windows-specific iCloud setup must not be presented as required.

## D006

- Status: Accepted
- Decision: Prefer a single [`main.jsx`](main.jsx) file until real implementation pressure justifies extraction.
- Rationale: The current project is intentionally minimal and has no build tooling.
- Consequences: Avoid premature structure, package manifests, or refactoring.

## D007

- Status: Accepted
- Decision: Establish a static visual slice before dynamic signals.
- Rationale: A working character-first widget should be validated before adding data complexity.
- Consequences: Current documentation must describe the widget as static and label dynamic behavior as future work.

## D008

- Status: Accepted
- Decision: v0.1.0 requires no backend.
- Rationale: The current widget is local and static.
- Consequences: Backend services, cloud synchronization, and server setup are out of scope for v0.1.0.

## D009

- Status: Accepted
- Decision: v0.1.0 requires no account or credential.
- Rationale: The current widget makes no authenticated requests and has no private integration.
- Consequences: Tokens, PATs, API secrets, credentials, and private repository data must not be committed or required.

## D010

- Status: Accepted
- Decision: Public or low-risk GitHub data is the initial future integration boundary.
- Rationale: Private GitHub access requires a threat model and secure credential strategy that do not exist yet.
- Consequences: Documentation must not imply private GitHub integration is available.

## D011

- Status: Accepted
- Decision: Dev Friendz will not use a reward system based primarily on raw lines of code.
- Rationale: The project should support healthy developer rhythms rather than incentivize volume for its own sake.
- Consequences: Future activity signals should not frame rest or lower activity negatively.

## D012

- Status: Accepted
- Decision: GitHub Issues and Milestones are the canonical task tracker.
- Rationale: The repository does not need a duplicate task file.
- Consequences: Do not add `TASKS.md`; plan substantial work through scoped Issues.

## D013

- Status: Accepted
- Decision: Runtime-sensitive changes require real-device validation before merging.
- Rationale: ScriptWidget behavior must be confirmed on device, not only by source inspection.
- Consequences: Pull Requests that affect rendering or runtime behavior must report device checks or remaining owner checks.
