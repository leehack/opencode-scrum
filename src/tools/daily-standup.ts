import { tool } from "@opencode-ai/plugin";

export const dailyStandupTool = tool({
  description: "Generate a daily standup summary: what was done, what's in progress, blockers",
  args: {
    includeMetrics: tool.schema
      .boolean()
      .optional()
      .describe("Include velocity and completion metrics"),
  },
  async execute(args, context) {
    const includeMetrics = args.includeMetrics ?? true;

    const instruction = `Generate a Daily Standup summary for the Scrum team.

Use todoread to analyze the current sprint state and produce:

## What was completed (Done)
- List all todos marked as "completed"
- Group by assignee type if tagged

## What's in progress (Doing)
- List all todos marked as "in_progress"
- Note who is working on what

## What's blocked or pending (To Do)
- List pending items
- Identify any potential blockers

${includeMetrics ? `## Sprint Metrics
- Total items: X
- Completed: Y (Z%)
- Remaining: W
- Sprint velocity: estimate based on completion rate` : ""}

Format this as a concise standup report the team can quickly scan.`;

    return instruction;
  },
});
