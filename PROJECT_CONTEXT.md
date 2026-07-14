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

## v0.1.0 product goal

`v0.1.0 — First Friend on iPhone` establishes the first working Friend on an iPhone Home Screen. The release is not published yet.

The current goal is a complete, minimal, static visual slice that can be installed and validated before dynamic signals are introduced.

## Current runtime and implementation boundary

- Runtime: ScriptWidget
- Supported size: Medium only
- Preferred initial implementation boundary: [`main.jsx`](main.jsx)

The confirmed GitHub-to-iPhone workflow is copying the complete merged `main.jsx` from the `main` branch into ScriptWidget on an iPhone. iCloud for Windows is not required, and `.swt` packaging is not currently provided.

## Architecture direction

Long-term data and rendering work should follow this conceptual flow:

```text
raw source → normalized signal → domain state → visual state → platform UI
```

This is a direction for keeping future integrations understandable. It is not a claim that dynamic signals, configuration, backends, or native WidgetKit support exist today.

## Offline-first and privacy-conscious direction

The current widget makes no network requests and requires no account, backend, or credential. Future features should prefer offline-first behavior and minimal data collection. Private developer data must not be used without a clear threat model and secure credential strategy.

Public or low-risk signals are the acceptable starting point for future integrations.

## Micro UI, readability, and accessibility

Dev Friendz should remain readable at widget scale:

- prioritize simple silhouettes and clear hierarchy
- keep text short and legible
- avoid relying on color alone for important meaning
- preserve sufficient contrast
- consider reduced motion and cognitive load before adding animation
- validate runtime-sensitive visual changes on a real device

## Runtime constraints

ScriptWidget should be treated as a constrained native-widget runtime, not a browser or normal React application.

Current constraints and directions:

- avoid unnecessary dependencies and packaging
- avoid network requirements for the core experience
- protect battery by keeping rendering simple
- avoid arbitrary remote content or code execution
- do not invent or rely on undocumented ScriptWidget APIs

## Current non-goals

The current v0.1.0 scope does not include:

- GitHub integration
- weather or calendar integration
- multiple Friendz
- configuration UI or config files
- localization infrastructure
- backend services
- accounts or authentication
- cloud synchronization
- native WidgetKit implementation
- release automation
- package manifests or build tooling

## AI-assisted development responsibility split

GPT owns exploration, Issue analysis, architecture, invariants, validation planning, review, and final merge judgment.

Codex Cloud handles scoped implementation, commits, pushes, and Pull Requests.

Claude Code is reserved for difficult localized implementation from a scoped Context Packet.

Each substantial Issue should start from a fresh implementation context.
