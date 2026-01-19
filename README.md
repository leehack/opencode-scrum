# opencode-scrum

A Scrum-focused multi-agent orchestration plugin for [OpenCode](https://opencode.ai).

## Overview

This plugin implements Scrum roles as specialized AI agents:

| Agent | Role | Responsibilities |
|-------|------|------------------|
| **Product Owner** | Orchestrator | Manages backlog, coordinates team, interfaces with stakeholders |
| **Tech Lead** | Architect | System design, task breakdown, complex problems |
| **Dev-Frontend** | Worker | Implements UI/React/CSS code |
| **Dev-Backend** | Worker | Implements API/database/logic |
| **DevOps Engineer** | Worker | Infrastructure, CI/CD, deployment |
| **UI/UX Designer** | Worker | Design decisions, user experience |
| **QA Engineer** | Verifier | Tests and verifies completed work |
| **Technical Writer** | Documenter | Creates sprint docs, reviews, retrospectives |

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

Start OpenCode with the Product Owner agent:

```bash
opencode --agent product-owner
```

Or switch to it during a session by pressing `Tab` to cycle agents.

### Workflow Example

```
You: Add a user authentication system

Product Owner: I'll coordinate this. Let me consult with Tech Lead on feasibility.

[Delegates to Tech Lead]

Tech Lead: Created sprint backlog:
1. [Backend] Create User model and auth endpoints
2. [Backend] Add JWT token generation
3. [Frontend] Create LoginForm component
4. [Frontend] Add auth context and protected routes

Product Owner: Starting sprint. Dev-Backend, please work on item #1.

[Delegates to Dev-Backend]

Dev-Backend: Implemented User model and POST /api/auth endpoints.

Product Owner: QA, please verify item #1.

[Delegates to QA Engineer]

QA Engineer: Task #1 VERIFIED. Tests pass, endpoints return correct responses.

Product Owner: Item #1 complete. Moving to item #2...
```

## Custom Tools

The plugin provides Scrum-specific tools:

### Backlog & Progress
- `scrum-sprint-backlog` - View backlog with status summary
- `scrum-burndown` - Generate ASCII burndown chart
- `scrum-daily-standup` - Generate standup summary

### Ceremonies
- `sprint-planning` - Start sprint planning ceremony
- `sprint-review` - Start sprint review ceremony
- `standup` - Run daily standup

## Configuration

Override agent settings in your `opencode.json`:

```json
{
  "agent": {
    "product-owner": {
      "model": "anthropic/claude-sonnet-4-20250514"
    }
  }
}
```

## License

MIT
