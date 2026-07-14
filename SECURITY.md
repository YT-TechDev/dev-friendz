# Security Policy

## Supported versions

Dev Friendz is a pre-release project preparing for `v0.1.0`. Security fixes are handled on the `main` branch until a release support policy exists.

## Scope

Security issues in scope include:

- committed tokens, PATs, API secrets, credentials, or private repository data
- secrets placed in tracked configuration files
- unsafe dependency or remote-content behavior
- arbitrary remote code execution paths
- misleading instructions that encourage exposing private account data

The current v0.1.0 widget requires no backend, account, network request, or credential.

## Secrets and configuration

Do not commit tokens, PATs, API secrets, credentials, private repository data, or personal configuration. Do not put secrets in tracked config files.

Placeholder example configuration is acceptable only when the placeholder is clearly fake and cannot be mistaken for a real secret.

## Dependencies, remote content, and integrations

Be cautious with dependencies, remote content, and arbitrary remote code. Dev Friendz must not execute arbitrary remote community code.

Public or low-risk GitHub data is the acceptable starting point for future integration. Private GitHub access requires a threat model and secure credential strategy before implementation.

## Reporting a vulnerability

Please do not publish sensitive exploit details or secrets publicly.

If GitHub private vulnerability reporting is available for this repository, use it. If no private reporting option is available, open a minimal public Issue containing no exploit details or secrets and request a private contact path.

Do not include credentials, tokens, personal data, or private repository data in public reports.
