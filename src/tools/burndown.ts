import { tool } from "@opencode-ai/plugin";

export const burndownTool = tool({
  description: "Generate a text-based burndown chart showing sprint progress over time",
  args: {
    sprintDays: tool.schema
      .number()
      .optional()
      .describe("Total sprint duration in days (default: 10)"),
  },
  async execute(args, context) {
    const days = args.sprintDays ?? 10;

    const instruction = `Generate a text-based burndown chart for a ${days}-day sprint.

Use todoread to get the current todo status, then create a visualization:
- Calculate total story points (count todos as 1 point each)
- Show ideal burndown line
- Show actual progress based on completed items
- Display as ASCII chart

Example output:
Points
  10 |*
   8 | *--*
   6 |     *--*
   4 |         *--o
   2 |             o--o
   0 +--+--+--+--+--+--+
     D1 D2 D3 D4 D5 D6

Legend: * = ideal, o = actual

Return the chart with a brief status summary.`;

    return instruction;
  },
});
