import { tool } from "@opencode-ai/plugin";

export const sprintBacklogTool = tool({
  description: "View the current sprint backlog with status summary and progress metrics",
  args: {
    format: tool.schema
      .enum(["summary", "detailed", "by-status", "by-assignee"])
      .optional()
      .describe("Output format for the backlog view"),
  },
  async execute(args, context) {
    const format = args.format ?? "summary";

    const instruction = `The sprint backlog tool was invoked with format: ${format}.

This tool helps visualize the current todo list as a sprint backlog.
Use todoread to get the current todos, then format them as requested:

- summary: Show counts by status (pending/in_progress/completed/cancelled)
- detailed: Show all todos with full details
- by-status: Group todos by their status
- by-assignee: Group by [Frontend], [Backend], [QA] tags

Return the formatted backlog view to help the Scrum Master track progress.`;

    return instruction;
  },
});
