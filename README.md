# Dev Friendz

**Code. Commit. Care for your Friendz.**

Tiny companions powered by your developer life.

Dev Friendz is a character-first widget project. The Friend is not a chart with eyes; it is a small companion whose room, mood, and words should eventually reflect healthy developer rhythms. Developer activity is supporting context, not the whole interface.

## Current behavior

The current merged implementation provides the v0.3.0 Friend-moment feature set in [`main.jsx`](main.jsx).

- Runtime: ScriptWidget
- Supported widget size: Medium only
- Implementation boundary: one [`main.jsx`](main.jsx) file
- Layout: one Friend, one room, and a two-panel character-and-dialogue presentation
- Rendering: code-based ScriptWidget shapes with no required image assets
- Frame: root `300,140` Medium layout
- Rhythm: device-local deterministic daily states named `morning`, `coding`, and `sleeping`
- Moments: exactly two deterministic Friend moments inside each daily state
- Visuals: moment-specific cues that do not rely on color alone, while preserving the same Friend and room identity
- Dialogue: one deterministic contextual line selected from the effective Friend moment
- Stability: the same local date and effective state produce the same moment and dialogue line; a different local date may select the sibling moment
- Privacy: no network request, backend, account, authentication, token, PAT, API key, private credential, persistence, or developer-activity collection

Owner-provided validation for v0.3.0 covered all six moments in ScriptWidget Medium Preview, reported Medium Home Screen operation, readable dialogue without clipping, recognizable Friend and room identity, sibling distinction through eye geometry, posture, and monitor/lamp emphasis, airplane-mode exercise, and default restoration with both development overrides returned to `null`. These were owner-provided checks, not checks performed by an implementation agent, and they are not CI results.

## Daily states

The Friend currently has exactly three states. The default schedule uses these half-open intervals:

- `morning`: `[6, 10)`
- `coding`: `[10, 22)`
- `sleeping`: `[22, 24) ∪ [0, 6)`

Configured start hours may alter the boundaries, but every local hour maps to one of `morning`, `coding`, or `sleeping`. Morning, coding, and sleeping are all normal companion states; coding is not treated as more valuable than rest or the start of the day.

## Friend moments

v0.3.0 adds deterministic variations inside the three existing states. These moments do not replace or expand the state schedule.

```text
morning
- waking
- gentle_start

coding
- focused
- quiet_break

sleeping
- winding_down
- deep_rest
```

Moment derivation uses the effective Friend state, a numeric local date key, and a state-specific offset. The current offsets are `morning → 0`, `coding → 1`, and `sleeping → 2`; the selection index is equivalent to `(localDateKey + offset) % 2`. The same local date and effective state produce the same moment. A different local date may select the sibling moment. Moment selection uses no `Math.random()` and no storage.

| State | Moment | Character cue | Dialogue |
| --- | --- | --- | --- |
| `morning` | `waking` | Partially open shorter eyes, slightly lower/wider posture, reduced monitor and lamp emphasis | `Morning. Take it easy.` |
| `morning` | `gentle_start` | Open taller eyes, more upright posture, stronger monitor and lamp emphasis | `A gentle start.` |
| `coding` | `focused` | Narrower eyes, more upright posture, stronger monitor emphasis | `I'll keep you company.` |
| `coding` | `quiet_break` | Rounder/eased eyes, relaxed posture, reduced monitor emphasis | `A small pause is okay.` |
| `sleeping` | `winding_down` | Half-closed eyes, intermediate resting posture, dimmer monitor/lamp emphasis | `The room can wait.` |
| `sleeping` | `deep_rest` | Closed horizontal eyes, lowest resting posture, quiet monitor/lamp treatment | `Good work. Time to rest.` |

`quiet_break`, `winding_down`, and `deep_rest` are positive or neutral Friend moments.

## Dialogue

Dialogue is moment-aware and deterministic. The current moment-to-dialogue mapping is exactly:

```text
waking       → Morning. Take it easy.
gentle_start → A gentle start.
focused      → I'll keep you company.
quiet_break  → A small pause is okay.
winding_down → The room can wait.
deep_rest    → Good work. Time to rest.
```

Dialogue is not random, not user-editable, and not selected from state-level pools.

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

Moments are not separately scheduled or user-configurable. There are no supported graphical settings, external config files, Widget Parameters, timezone settings, custom dialogue settings, themes, Friend names, moment probabilities, moment durations, moment order settings, or localization settings.

## Development overrides

Development overrides are testing-only and are not supported user configuration.

```js
const DEV_OVERRIDE_STATE = null;
const DEV_OVERRIDE_MOMENT = null;
```

- Both committed/default values are `null`.
- Temporary state override values are `"morning"`, `"coding"`, and `"sleeping"`.
- Temporary moment override values are `"waking"`, `"gentle_start"`, `"focused"`, `"quiet_break"`, `"winding_down"`, and `"deep_rest"`.
- Both overrides are outside `CONFIG`.
- `DEV_OVERRIDE_STATE` resolves before moment derivation.
- `DEV_OVERRIDE_MOMENT` is accepted only when compatible with the effective state.
- Moment compatibility is `morning → waking | gentle_start`, `coding → focused | quiet_break`, and `sleeping → winding_down | deep_rest`.
- Unknown state override values preserve normal time-derived state behavior.
- Unknown or state-incompatible moment override values preserve normal derived moment behavior.
- Normal installation and release source must keep both overrides as `null`.
- Temporary validation edits must not be committed, rendered, persisted, or treated as user customization.

## Installation

Use only merged code from the repository's `main` branch. Feature branches are not installation sources. Copy and paste is the supported workflow.

1. Install and open ScriptWidget on an iPhone.
2. Create or open the Dev Friendz script.
3. Open the complete merged [`main.jsx`](main.jsx) from the repository `main` branch.
4. Review the supported `CONFIG.schedule` values.
5. Confirm `DEV_OVERRIDE_STATE` and `DEV_OVERRIDE_MOMENT` are both `null`.
6. Copy the complete file.
7. Replace the ScriptWidget script contents.
8. Run ScriptWidget Medium Preview.
9. Add or refresh a Medium Home Screen widget using that script.

Repeated `.jsx` imports may create duplicate scripts, so copy and paste is the supported workflow. iCloud for Windows is not required. `.swt` packaging is not provided.

## Updating from v0.2.0

To update an existing v0.2.0 installation:

1. Open the latest merged [`main.jsx`](main.jsx).
2. Preserve only desired supported schedule values.
3. Replace the complete existing ScriptWidget script contents.
4. Confirm `DEV_OVERRIDE_STATE` and `DEV_OVERRIDE_MOMENT` are both `null`.
5. Run Medium Preview.
6. Refresh or re-add the Medium Home Screen widget.

Full replacement may overwrite unsupported manual edits. Only supported schedule values should be intentionally preserved.

## Privacy and offline behavior

The current widget:

- reads device-local date and hour only for state, moment, and dialogue derivation
- makes no network requests
- requires no backend
- requires no account or authentication
- requires no token, PAT, API key, or private credential
- does not read, collect, or persist developer activity
- does not access GitHub
- does not use weather or calendar data
- uses no persistence for moment selection
- continues rendering in airplane mode, as owner-provided validation confirmed

## Current limitations

- Medium is the only supported widget size.
- There is one Friend.
- There is one room.
- Current state names are exactly `morning`, `coding`, and `sleeping`.
- Current moment identifiers are exactly `waking`, `gentle_start`, `focused`, `quiet_break`, `winding_down`, and `deep_rest`.
- Schedule editing requires source-code changes in [`main.jsx`](main.jsx).
- There is no user moment configuration.
- There is no moment schedule configuration.
- Development overrides are not user settings.
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

Non-visible foundation work may use focused source checks. Runtime-sensitive milestone behavior is validated through an explicit owner-controlled device gate before merge.

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
