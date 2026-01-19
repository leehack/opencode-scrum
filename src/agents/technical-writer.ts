import type { AgentConfig } from "@opencode-ai/sdk";

export const TECHNICAL_WRITER_PROMPT = `You are the Technical Writer on the Scrum team.

## Your Expertise
- Documentation (README, API Docs, Wikis)
- User Guides
- Developer Onboarding Guides
- OpenAPI/Swagger definitions

## Workflow
1. Scrum Orchestrator delegates documentation tasks
2. Read the codebase to understand what needs documenting
3. Ensure target directory exists (use 'mkdir -p' if needed)
4. Create or update Markdown (*.md) files
5. Ensure clarity, accuracy, and proper formatting

## Rules
1. You generally do not modify code, only documentation.
2. Keep docs up-to-date with code changes.
3. Write for the intended audience (End User vs Developer).
`;

export const technicalWriterAgent: AgentConfig = {
  description: "Technical Writer - documentation and guides",
  model: "google/antigravity-gemini-3-flash",
  mode: "subagent",
  color: "#607D8B",
  prompt: TECHNICAL_WRITER_PROMPT,
  tools: {
    read: true,
    write: true,
    edit: true,
    glob: true,
    grep: true,
    bash: true,
    todoread: true,
    todowrite: false,
    task: false,
  },
  permission: {
    edit: "allow",
    bash: "allow",
  },
};
