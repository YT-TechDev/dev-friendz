# Project Context

## Identity

Dev Friendz is an open-source companion-widget project.

- Name: Dev Friendz
- Tagline: Code. Commit. Care for your Friendz.
- Description: Tiny companions powered by your developer life.
- Concept: Virtual Pet × Developer Dashboard × Design Lab

## Character-first principle

The Friend is the product center. Developer activity may influence the experience over time, but it should remain supporting context. The interface should feel like caring for a tiny companion, not like monitoring productivity.

Rest, inactivity, sleep, and breaks must be treated positively or neutrally. Dev Friendz must not frame healthy pauses as failure.

## Current product state

`v0.1.0 — First Friend on iPhone` established the first working static Dev Friendz widget on an iPhone Home Screen.

The current merged v0.2.0 milestone implementation adds a deterministic daily rhythm to that foundation. One Medium Friend and one room remain the current product boundary, implemented in [`main.jsx`](main.jsx) for ScriptWidget.

The current Friend has `morning`, `coding`, and `sleeping` states derived from device-local time and normalized schedule configuration. All three states were owner-validated in Medium Preview, on a Medium Home Screen widget, and in airplane mode. Release publication and tagging remain separate from implementation state.

## Current runtime and implementation boundary

- Runtime: ScriptWidget
- Supported size: Medium only
- Preferred implementation boundary: [`main.jsx`](main.jsx)
- Supported configuration surface: the three schedule start hours in `CONFIG.schedule`
- Validation override: `DEV_OVERRIDE_STATE`, outside supported configuration and committed as `null`

The confirmed GitHub-to-iPhone workflow is copying the complete merged `main.jsx` from the `main` branch into ScriptWidget on an iPhone. iCloud for Windows is not required, and `.swt` packaging is not currently provided.

## Architecture direction

Long-term data and rendering work should follow this conceptual flow:

```text
raw source → normalized signal → domain state → visual state → platform UI
```

The current concrete implementation follows the same layering without requiring a universal state engine:

```text
device-local Date
+ raw CONFIG.schedule
→ normalized time signal
+ normalized schedule
→ configured Friend domain state
→ development-only effective-state resolution
→ deterministic dialogue
+ visual state
→ ScriptWidget Medium UI
```

Device-local time is the current raw runtime signal. Config is normalized before state derivation, and invalid configuration falls back safely to the complete default schedule. Domain state remains separate from visual state, and dialogue is deterministic rather than random. `DEV_OVERRIDE_STATE` is validation-only, not a normal user customization feature. The supported config surface is intentionally narrow.

## Offline-first and privacy-conscious direction

The current widget makes no network requests and requires no account, backend, or credential. It reads device-local date and hour for state and dialogue derivation. Future features should prefer offline-first behavior and minimal data collection. Private developer data must not be used without a clear threat model and secure credential strategy.

Public or low-risk signals are the acceptable starting point for future integrations.

## Micro UI, readability, and accessibility

Dev Friendz should remain readable at widget scale:

- prioritize simple silhouettes and clear hierarchy
- keep text short and legible
- avoid relying on color alone for important meaning
- preserve sufficient contrast
- treat rest and sleeping as positive states
- consider reduced motion and cognitive load before adding animation
- validate runtime-sensitive visual changes on a real device

The current daily states use color-independent cues such as eye shape, silhouette posture, monitor emphasis, and room treatment so that state changes are not communicated by color alone.

## Runtime constraints

ScriptWidget should be treated as a constrained native-widget runtime, not a browser or normal React application.

Current constraints and directions:

- avoid unnecessary dependencies and packaging
- avoid network requirements for the core experience
- protect battery by keeping rendering simple
- avoid arbitrary remote content or code execution
- do not invent or rely on undocumented ScriptWidget APIs
- distinguish source validation from real-device validation

## Current non-goals

The current v0.2.0 implementation does not include:

- GitHub integration
- weather or calendar integration
- multiple Friendz
- graphical settings UI
- external config
- localization
- backend services
- accounts or authentication
- cloud synchronization
- animation or interaction
- additional supported widget sizes
- native WidgetKit implementation
- release automation
- package manifests or build tooling

Future directions such as additional Friendz, public or low-risk developer signals, alternate widget-size presentations, replaceable character presentation, Character Packs, or native WidgetKit are exploratory and not current behavior.

## AI-assisted development responsibility split

GPT owns exploration, Issue analysis, architecture, invariants, validation planning, review, and final merge judgment.

Codex Cloud handles scoped implementation, commits, pushes, and Pull Requests.

Claude Code is reserved for difficult localized implementation from a scoped Context Packet.

Each substantial Issue should start from a fresh implementation context.
