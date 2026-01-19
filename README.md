# opencode-scrum

A Scrum-focused multi-agent orchestration plugin for [OpenCode](https://opencode.ai).

## Overview

This plugin implements Scrum roles as specialized AI agents:

| Agent | Role | Responsibilities |
|-------|------|------------------|
| **Scrum Master** | Orchestrator | Manages sprint, delegates tasks, ensures quality gate |
| **Product Owner** | Planner | Creates backlog, defines acceptance criteria |
| **Dev-Frontend** | Worker | Implements UI/React/CSS code |
| **Dev-Backend** | Worker | Implements API/database/logic |
| **QA Engineer** | Verifier | Tests and verifies completed work |

## Installation

### From npm (when published)

Add to your `opencode.json`:

```json
{
  "plugin": ["opencode-scrum"]
}
```

### Local Development

1. Clone this repository
2. Place in `.opencode/plugin/` directory of your project
3. Or link globally to `~/.config/opencode/plugin/`

## Usage

Start OpenCode with the Scrum Master agent:

```bash
opencode --agent scrum-master
```

Or switch to it during a session by pressing `Tab` to cycle agents.

### Workflow Example

```
You: Add a user authentication system

Scrum Master: I'll coordinate this sprint. Let me have the Product Owner break this down.

[Delegates to Product Owner]

Product Owner: Created sprint backlog:
1. [Backend] Create User model and auth endpoints
2. [Backend] Add JWT token generation
3. [Frontend] Create LoginForm component
4. [Frontend] Add auth context and protected routes
5. [QA] Verify login/logout flow

Scrum Master: Starting sprint. Dev-Backend, please work on item #1.

[Delegates to Dev-Backend]

Dev-Backend: Implemented User model and POST /api/auth endpoints.

Scrum Master: QA, please verify item #1.

[Delegates to QA Engineer]

QA Engineer: Task #1 VERIFIED. Tests pass, endpoints return correct responses.

Scrum Master: Item #1 complete. Moving to item #2...
```

## Custom Tools

The plugin provides Scrum-specific tools:

- `scrum-sprint-backlog` - View backlog with status summary
- `scrum-burndown` - Generate ASCII burndown chart
- `scrum-daily-standup` - Generate standup summary

## Configuration

Override agent settings in your `opencode.json`:

```json
{
  "agent": {
    "scrum-master": {
      "model": "anthropic/claude-sonnet-4-20250514"
    }
  }
}
```

## License

MIT
