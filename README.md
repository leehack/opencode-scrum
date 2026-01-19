# opencode-scrum

A Scrum-focused multi-agent orchestration plugin for [OpenCode](https://opencode.ai).

## Overview

This plugin implements Scrum methodology with specialized AI agents:

| Agent | Role | Responsibilities |
|-------|------|------------------|
| **Scrum Orchestrator** | Your contact | Gathers requirements, runs sprints, presents results |
| **Tech Lead** | Architect | System design, task breakdown |
| **Dev-Frontend** | Developer | Implements UI/React/CSS code |
| **Dev-Backend** | Developer | Implements API/database/logic |
| **DevOps Engineer** | Developer | Infrastructure, CI/CD, deployment |
| **UI/UX Designer** | Designer | Design decisions, styling, accessibility |
| **QA Engineer** | Verifier | Tests and verifies completed work |
| **Technical Writer** | Documenter | Creates sprint docs and guides |

## How It Works

You talk to the **Scrum Orchestrator**. That's it. The orchestrator:

1. **Gathers your requirements** - Asks clarifying questions
2. **Creates user stories** - Translates your needs into backlog items
3. **Runs sprints autonomously** - Delegates to specialists, ensures QA
4. **Presents results** - Shows you what was built in business terms

```
You: Build me a todo app with dark mode

Orchestrator: I'll help you build that. A few questions:
- Should todos persist after refresh?
- Any specific styling preferences?

You: Yes persist them, use a minimal dark theme

Orchestrator: Got it. Here's the plan:
- Todo CRUD with local storage
- Dark minimal UI
Ready to start?

You: Yes

Orchestrator: Sprint started. I'll update you when complete.

[Works autonomously...]

Orchestrator: Done! Your todo app is ready:
- Add/edit/delete todos ✓
- Data persists in localStorage ✓
- Dark minimal theme ✓

Try it out and let me know if you'd like any changes.
```

## Installation

### From npm

```bash
npm install opencode-scrum
```

Add to your `opencode.json`:

```json
{
  "plugin": ["opencode-scrum"]
}
```

### Local Development

1. Clone this repository
2. Place in `.opencode/plugin/` directory
3. Or link globally to `~/.config/opencode/plugin/`

## Usage

Start OpenCode with the Scrum Orchestrator:

```bash
opencode --agent scrum-orchestrator
```

Or press `Tab` to cycle agents during a session.

## Tools

The plugin provides Scrum-specific tools:

| Tool | Description |
|------|-------------|
| `scrum-sprint-backlog` | View backlog with status summary |
| `scrum-burndown` | Generate ASCII burndown chart |
| `scrum-daily-standup` | Generate standup summary |
| `sprint-planning` | Start planning ceremony |
| `sprint-review` | Start review ceremony |
| `standup` | Quick standup check |

## Configuration

Override agent settings in your `opencode.json`:

```json
{
  "agent": {
    "scrum-orchestrator": {
      "model": "anthropic/claude-sonnet-4-20250514"
    }
  }
}
```

## License

MIT
