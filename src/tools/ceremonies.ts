import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

export const startSprintPlanningTool = tool({
  description: "Start the Sprint Planning ceremony (Product Owner + Stakeholder)",
  args: {
    goal: z.string().optional().describe("Optional high-level goal for the sprint"),
  },
  execute: async ({ goal }) => {
    return `[SYSTEM EVENT: SPRINT PLANNING STARTED]

You are now conducting Sprint Planning with the stakeholder.

CEREMONY PROTOCOL:
1. Greet the stakeholder.
2. Define USER STORIES (not technical tasks).
3. Delegate breakdown to @tech-lead.
4. MANDATORY: Document plan via @technical-writer.
5. Confirm start.

${goal ? `Stakeholder Goal: ${goal}` : ""}
`;
  },
});

export const startSprintReviewTool = tool({
  description: "Start the Sprint Review ceremony (Product Owner + Stakeholder)",
  args: {},
  execute: async () => {
    return `[SYSTEM EVENT: SPRINT REVIEW STARTED]

You are now conducting Sprint Review.

CEREMONY PROTOCOL:
1. MANDATORY: Document review via @technical-writer.
2. Present completed work.
3. Ask for feedback.
`;
  },
});

export const startDailyStandupTool = tool({
  description: "Generate a Daily Standup summary",
  args: {},
  execute: async () => {
    return `[SYSTEM EVENT: DAILY STANDUP]

Generate a quick standup summary:
- DONE since last update
- IN PROGRESS
- BLOCKERS
`;
  },
});
