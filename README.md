# Dev Friendz

**Code. Commit. Care for your Friendz.**

Tiny companions powered by your developer life.

Dev Friendz is a character-first widget project. The Friend is not a chart with eyes; it is a small companion whose room, mood, and words should eventually reflect healthy developer rhythms. Developer activity is supporting context, not the whole interface.

## Current behavior

The current merged implementation provides the v0.2.0 daily-rhythm feature set in [`main.jsx`](main.jsx).

- Runtime: ScriptWidget
- Supported widget size: Medium only
- Implementation boundary: one [`main.jsx`](main.jsx) file
- Layout: one Friend, one room, and a two-panel character-and-dialogue presentation
- Rendering: code-based ScriptWidget shapes with no required image assets
- Frame: root `300,140` Medium layout
- Rhythm: device-local deterministic daily states named `morning`, `coding`, and `sleeping`
- Visuals: state-specific non-color cues while preserving the same Friend and room identity
- Dialogue: deterministic contextual dialogue selected from the local calendar date and effective Friend state
- Stability: the same local date and effective state produce the same dialogue line
- Privacy: no network request, backend, account, authentication, token, PAT, API key, or private credential

Owner-provided real-device validation covered all three states in ScriptWidget Medium Preview, a Medium Home Screen widget, readable dialogue, recognizable Friend and room identity, and airplane-mode rendering. These were owner-provided checks, not checks performed by an implementation agent.

## Daily states

The Friend currently has exactly three states. The default schedule uses these half-open intervals:

- `morning`: `[6, 10)` — open eyes, an upright awake silhouette, brighter room treatment, calmer monitor emphasis, and a gentle start-of-day presentation.
- `coding`: `[10, 22)` — focused narrower eyes, an upright/focused silhouette, active monitor emphasis, and calm companion presentation without metrics or productivity pressure.
- `sleeping`: `[22, 24) ∪ [0, 6)` — closed horizontal eyes, a lowered and wider resting silhouette, subdued monitor, calmer/darker room treatment, and positive rest presentation.

Configured start hours may alter the boundaries, but every local hour maps to one of `morning`, `coding`, or `sleeping`. Morning, coding, and sleeping are all normal companion states; coding is not treated as more valuable than rest or the start of the day.

The current dialogue pools are state-specific:

- Morning: `Morning. Take it easy.` / `A gentle start.`
- Coding: `I'll keep you company.` / `One step at a time.`
- Sleeping: `Good work. Time to rest.` / `The room can wait.`

## Schedule configuration

Users edit the supported schedule values directly in [`main.jsx`](main.jsx):

```js
const CONFIG = {
  schedule: {
    morningStartHour: 6,
    codingStartHour: 10,
    sleepingStartHour: 22
  }
};
```

Only these three keys are supported:

- `CONFIG.schedule.morningStartHour`
- `CONFIG.schedule.codingStartHour`
- `CONFIG.schedule.sleepingStartHour`

A valid schedule requires all three values to be JavaScript numbers, integers, within `0` through `23`, and strictly ascending:

```text
0 <= morningStartHour < codingStartHour < sleepingStartHour <= 23
```

State intervals are half-open:

```text
morning:  [morningStartHour, codingStartHour)
coding:   [codingStartHour, sleepingStartHour)
sleeping: [sleepingStartHour, 24) ∪ [0, morningStartHour)
```

A valid custom example is:

```js
{
  morningStartHour: 7,
  codingStartHour: 11,
  sleepingStartHour: 23
}
```

Invalid schedule input falls back atomically to the complete default schedule:

```js
{
  morningStartHour: 6,
  codingStartHour: 10,
  sleepingStartHour: 22
}
```

Invalid examples include string values such as `"6"`, decimal values such as `6.5`, out-of-range values such as `24`, equal boundaries, descending boundaries, and missing values. All invalid cases use the entire default `{6, 10, 22}` schedule. The widget does not perform partial fallback, string conversion, rounding, clamping, sorting, or an error panel for invalid config.

There are no supported graphical settings, external config files, Widget Parameters, timezone settings, custom dialogue settings, themes, Friend names, or localization settings.

## Development state override

The development override is testing-only and is not supported user configuration.

```js
const DEV_OVERRIDE_STATE = null;
```

- The committed/default value is `null`.
- Temporary local test values are `"morning"`, `"coding"`, and `"sleeping"`.
- The override is outside `CONFIG`.
- Unknown values preserve normal time-derived state behavior.
- Normal installation and release source must keep `DEV_OVERRIDE_STATE` as `null`.
- Temporary validation edits must not be committed.
- Users should not leave a forced state enabled for normal use.

## Installation

Use only merged code from the repository's `main` branch. Feature branches are not installation sources. Copy and paste is the supported workflow.

1. Install and open ScriptWidget on an iPhone.
2. Create or open the Dev Friendz script.
3. Open the complete merged [`main.jsx`](main.jsx) from the repository `main` branch.
4. Review the supported `CONFIG.schedule` values.
5. Confirm `DEV_OVERRIDE_STATE` is `null`.
6. Copy the complete file.
7. Replace the ScriptWidget script contents.
8. Run ScriptWidget Medium Preview.
9. Add or refresh a Medium Home Screen widget using that script.

Repeated `.jsx` imports may create duplicate scripts, so copy and paste is the supported workflow. iCloud for Windows is not required. `.swt` packaging is not provided.

## Updating from v0.1.0

To update an existing v0.1.0 installation:

1. Open the latest merged [`main.jsx`](main.jsx).
2. Review or preserve desired supported schedule values.
3. Replace the existing ScriptWidget script contents.
4. Confirm `DEV_OVERRIDE_STATE` is `null`.
5. Run Medium Preview.
6. Refresh or re-add the Medium Home Screen widget.

Replacing the script may overwrite prior manual edits. Only supported schedule values should be intentionally preserved.

## Privacy and offline behavior

The current widget:

- reads device-local date and hour only for state and dialogue derivation
- makes no network requests
- requires no backend
- requires no account or authentication
- requires no token, PAT, API key, or private credential
- does not read or collect developer activity
- does not access GitHub
- does not use weather or calendar data
- continues rendering in airplane mode, as owner-provided validation confirmed

## Current limitations

- Medium is the only supported widget size.
- There is one Friend.
- There is one room.
- Current state names are exactly `morning`, `coding`, and `sleeping`.
- Schedule editing requires source-code changes in [`main.jsx`](main.jsx).
- There is no graphical settings UI.
- There is no localization.
- There are no GitHub signals.
- There are no weather or calendar signals.
- There is no animation.
- There is no tap interaction.
- There are no multiple Friendz.
- There are no gifts.
- There is no growth/economy system.
- There are no accounts.
- There is no cloud synchronization.
- There is no native WidgetKit implementation.
- There is no external Character Pack or custom-character system.

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

The following directions are planned or exploratory. They do not exist in the current widget and are not committed next-version features:

- public or low-risk developer signals
- additional Friendz or community content
- additional widget-size presentations
- supported interactions where the platform allows them
- replaceable character presentation or Character Packs
- possible native WidgetKit implementation

## License

Dev Friendz is licensed under the MIT License. See [`LICENSE`](LICENSE).
