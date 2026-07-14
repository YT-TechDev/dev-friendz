# Agent Instructions

These instructions apply to work in `YT-TechDev/dev-friendz`.

- Read the assigned Issue and relevant project docs before making changes.
- Confirm repository, branch, target state, scope, and constraints before editing.
- Start a fresh implementation context for each substantial Issue.
- Do not broaden scope, scan unrelated repository areas, or perform unrelated refactoring.
- GitHub Issues and Milestones are the canonical task tracker.

## Responsibility split

- GPT owns exploration, Issue analysis, architecture, invariants, validation planning, review, and final merge judgment.
- Codex Cloud handles scoped implementation, commits, pushes, and Pull Requests.
- Claude Code is reserved for difficult localized implementation from a scoped Context Packet.

## Implementation rules

- Treat ScriptWidget as a constrained native-widget runtime, not a browser or normal React application.
- Do not invent ScriptWidget APIs or platform behavior.
- Prefer [`main.jsx`](main.jsx) until real implementation pressure justifies extraction.
- Do not add secrets, PATs, tokens, private repository data, or tracked credentials.
- Never include AI session-sharing URLs in Issues, Pull Requests, commits, or documentation.
- Distinguish source validation from real-device validation.
- Never claim validation that was not performed.
- Inspect the final diff before reporting completion.
- Stop and report instead of guessing when a platform constraint or required fact cannot be verified.
