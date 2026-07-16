# Decisions

This file records accepted decisions that already constrain Dev Friendz. It is not a roadmap.

## D001

- Status: Accepted
- Decision: ScriptWidget is the initial runtime.
- Rationale: The first working Friend is implemented and owner-validated in ScriptWidget.
- Consequences: Runtime-sensitive changes must respect ScriptWidget constraints and require real-device validation before merge.

## D002

- Status: Accepted
- Decision: Medium is the only supported widget size through the current v0.3.0 implementation.
- Rationale: The current implementation and owner validation target the Medium widget size.
- Consequences: Documentation and validation must not claim Small or Large support.

## D003

- Status: Accepted
- Decision: The merged `main` branch is the stable installation source.
- Rationale: Users need an installation source that excludes unfinished feature-branch work.
- Consequences: Installation instructions must point to merged [`main.jsx`](main.jsx) from `main`.

## D004

- Status: Accepted
- Decision: Installation and updates use copy and paste from merged `main.jsx` into ScriptWidget.
- Rationale: Repeated `.jsx` imports may create duplicate scripts, while copy and paste updates the intended script directly.
- Consequences: `.swt` packaging and import-based installation are not documented as supported for the current installation workflow.

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
- Consequences: The v0.1.0 static slice remains the visual foundation; later deterministic local signals may extend it without weakening the character-first hierarchy.

## D008

- Status: Accepted
- Decision: The current v0.3.0 widget requires no backend.
- Rationale: The current widget is local and deterministic.
- Consequences: Backend services, cloud synchronization, and server setup are out of scope for the current widget.

## D009

- Status: Accepted
- Decision: The current v0.3.0 widget requires no account or credential.
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
- Decision: Runtime-sensitive milestone behavior must pass an explicit real-device gate before release readiness; individual scoped Pull Requests may defer device checks only when the later gate is identified and remaining owner validation is reported.
- Rationale: ScriptWidget behavior must be confirmed on device, not only by source inspection, while related scoped changes may be batched into one owner-controlled milestone validation pass.
- Consequences: Documentation and Pull Requests must distinguish focused source checks from owner-controlled device validation, must name any deferred validation gate, and must not treat batching as permission to skip runtime validation.


## D014

- Status: Accepted
- Decision: Device-local JavaScript date and hour are the initial runtime signal for daily rhythm.
- Rationale: Device-local time enables deterministic offline behavior without external time services.
- Consequences: Timezone is inherited from the device, no remote timezone lookup is required, and direct time access remains isolated.

## D015

- Status: Accepted
- Decision: The current schedule model uses exactly `morning`, `coding`, and `sleeping`; moments do not add schedule states, and normalized schedule boundaries determine the half-open intervals.
- Rationale: Three explicit states are small, deterministic, complete, and character-readable.
- Consequences: Every local hour maps to exactly one state, state names remain stable for current moment derivation, presentation, and dialogue maps, and adding another schedule state requires a future explicit design decision.

## D016

- Status: Accepted
- Decision: Supported user configuration is only the three schedule start hours in `main.jsx`, and invalid schedules fall back atomically to `{6, 10, 22}`.
- Rationale: Narrow local configuration is understandable and safe without settings UI or persistence.
- Consequences: There is no partial fallback, coercion, clamping, sorting, external config, or Widget Parameter support; config normalization precedes domain-state derivation.

## D017

- Status: Accepted
- Decision: Dialogue is selected deterministically from the effective Friend moment; the same local date and effective state produce the same moment and therefore the same dialogue.
- Rationale: Deterministic moment-aware dialogue prevents refresh flicker without storage, networking, or uncontrolled randomness.
- Consequences: The same local date and effective state produce the same moment and line, dialogue may vary across dates when the sibling moment is selected, and `Math.random()` and persistence are unnecessary.

## D018

- Status: Accepted
- Decision: `DEV_OVERRIDE_STATE` is development/testing-only, exists outside `CONFIG`, resolves before moment derivation, and is committed as `null`.
- Rationale: All states must be reproducible for device validation without exposing a user-facing forced-state feature.
- Consequences: Only temporary local validation copies use forced values, unsupported override values preserve normal derived behavior, and release and installation source must keep `null`.


## D019

- Status: Accepted
- Decision: v0.3.0 defines exactly two deterministic Friend moments per existing daily state: `morning` has `waking` and `gentle_start`, `coding` has `focused` and `quiet_break`, and `sleeping` has `winding_down` and `deep_rest`.
- Rationale: Small state-compatible variations add character expressiveness without replacing the established three-state schedule.
- Consequences: Moments are selected from effective state and local date, moments do not create new schedule states, and adding or removing moment identifiers requires a future explicit decision.

## D020

- Status: Accepted
- Decision: Friend moment remains separate from visual state and platform UI; explicit visual and dialogue mappings consume the same effective moment, and JSX consumes presentation data.
- Rationale: Keeping the domain moment distinct from presentation prevents time, schedule, or moment-selection logic from spreading through the UI tree.
- Consequences: Moment-specific presentation belongs in explicit mappings, and visual/dialogue changes must preserve the shared effective-moment boundary.

## D021

- Status: Accepted
- Decision: Each current Friend moment has one intentional dialogue line selected explicitly and deterministically.
- Rationale: One line per moment keeps the widget calm, readable, and easy to validate while avoiding random or user-editable copy.
- Consequences: Rest and break copy remains supportive, dialogue is not selected from state-level pools, and changing dialogue requires updating the explicit moment mapping.

## D022

- Status: Accepted
- Decision: `DEV_OVERRIDE_MOMENT` is validation-only, outside `CONFIG`, committed as `null`, and accepted only when compatible with the effective state's domain moment pool.
- Rationale: Reproducible six-moment validation is needed without exposing moment forcing as user configuration or breaking state/moment consistency.
- Consequences: Unknown or incompatible moment override values preserve derived behavior; release and installation source must keep `DEV_OVERRIDE_MOMENT` as `null`.

## D023

- Status: Accepted
- Decision: Issues #17 through #19 used focused source checks, and Issue #20 provided one owner-controlled six-fixture real-device gate plus default restoration for the v0.3.0 milestone sequence.
- Rationale: Batched validation reduced repeated owner device cycles while still validating the integrated runtime-sensitive behavior before documentation and release readiness.
- Consequences: This pattern does not permit skipping runtime validation; future runtime-sensitive milestone behavior still needs explicit owner-controlled device validation or clearly reported remaining owner checks.
