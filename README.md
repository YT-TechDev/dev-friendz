# Dev Friendz

**Code. Commit. Care for your Friendz.**

Tiny companions powered by your developer life.

Dev Friendz is a character-first widget project. The Friend is not a chart with eyes; it is a small companion whose room, mood, and words should eventually reflect healthy developer rhythms. Developer activity is supporting context, not the whole interface.

## Current status

`v0.1.0 — First Friend on iPhone` establishes the first working Dev Friendz widget on an iPhone Home Screen.

The current merged implementation is a minimal static ScriptWidget widget in [`main.jsx`](main.jsx).

## Current runtime and supported size

- Runtime: ScriptWidget
- Supported widget size: Medium only
- Implementation boundary: one [`main.jsx`](main.jsx) file

## Current verified features

The current widget provides:

- one static Friend
- one static room
- one dialogue: `Ready when you are.`
- code-based shapes only
- no required image assets
- no network requests
- no backend
- no account or authentication
- no private credentials
- no configuration interface
- no time-based state changes
- no GitHub integration
- no weather or calendar integration
- no multiple Friendz
- no animation or interaction

Owner-controlled real-device validation already completed:

- ScriptWidget parsing: PASS
- in-app Medium Preview: PASS
- Medium Home Screen rendering: PASS
- visible clipping: none observed
- airplane-mode rendering: PASS

The exact iPhone model, iOS version, and ScriptWidget version were not recorded.

## Installation

Use only merged code from the repository's `main` branch. Do not treat unfinished feature branches as installation sources.

1. Install and open ScriptWidget on an iPhone.
2. Create a new script or open an existing Dev Friendz script.
3. Open the merged [`main.jsx`](main.jsx) from the repository's `main` branch.
4. Copy the complete file contents.
5. Replace the existing ScriptWidget script contents.
6. Select Medium in the ScriptWidget Preview and run it.
7. Add or refresh a Medium ScriptWidget widget on the Home Screen and select the Dev Friendz script.

Repeated `.jsx` imports may create duplicate scripts, so copy and paste is the supported v0.1.0 workflow. iCloud for Windows is not required. `.swt` packaging is not currently provided.

## Updating an existing installation

To update Dev Friendz for v0.1.0, repeat the same copy-and-paste workflow with the latest merged [`main.jsx`](main.jsx) from the `main` branch. Replace the entire existing ScriptWidget script so the installed code matches the repository source.

## Configuration status

v0.1.0 has no supported user configuration surface. Editable Friend names, schedules, themes, localization, widget parameters, and external configuration files are not available in the current widget.

## Privacy and offline behavior

The current widget is static and offline-friendly. It makes no network requests, requires no backend, requires no account, and uses no private credentials. Airplane-mode rendering has been validated by the owner.

## Current limitations

- Medium is the only supported widget size.
- The Friend, room, and dialogue are static.
- There are no dynamic states, animations, interactions, or integrations.
- There is no configuration interface.
- Runtime-sensitive changes still require source review and real-device validation before merge.

## Development workflow

GitHub Issues and Milestones are the canonical task tracker.

1. Check existing Issues and Milestones.
2. Work from a scoped Issue.
3. Create a focused branch.
4. Make the smallest coherent change.
5. Avoid unrelated refactoring.
6. Validate according to the Issue.
7. Open a Pull Request against `main` with validation evidence and known limitations.

For more details, see [`CONTRIBUTING.md`](CONTRIBUTING.md). Implementation agents should also read [`AGENTS.md`](AGENTS.md), [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md), and [`DECISIONS.md`](DECISIONS.md).

## Contribution and security

- Contribution guide: [`CONTRIBUTING.md`](CONTRIBUTING.md)
- Security policy: [`SECURITY.md`](SECURITY.md)

Never commit secrets, personal credentials, private repository data, or AI session-sharing URLs.

## Future directions

The following capabilities are planned or exploratory. They do not exist in the current v0.1.0 widget:

- deterministic daily states
- contextual dialogue
- configuration
- public or low-risk GitHub signals
- additional Friendz or community content
- possible native WidgetKit support

## License

Dev Friendz is licensed under the MIT License. See [`LICENSE`](LICENSE).
