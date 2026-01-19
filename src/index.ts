/**
 * OpenCode Scrum Plugin - Public API entry point
 * This docstring is necessary for npm package documentation.
 */

import type { Plugin, Hooks } from "@opencode-ai/plugin";

import { productOwnerAgent } from "./agents/product-owner";
import { scrumMasterAgent } from "./agents/scrum-master";
import { devFrontendAgent } from "./agents/dev-frontend";
import { devBackendAgent } from "./agents/dev-backend";
import { qaEngineerAgent } from "./agents/qa-engineer";
import { uiUxDesignerAgent } from "./agents/ui-ux-designer";
import { techLeadAgent } from "./agents/tech-lead";
import { devopsEngineerAgent } from "./agents/devops-engineer";
import { technicalWriterAgent } from "./agents/technical-writer";

import { sprintBacklogTool } from "./tools/sprint-backlog";
import { burndownTool } from "./tools/burndown";
import { dailyStandupTool } from "./tools/daily-standup";
import { startSprintPlanningTool, startSprintReviewTool, startDailyStandupTool as startStandupCmd } from "./tools/ceremonies";

import { createEventHooks } from "./hooks/events";
import { parseCommand } from "./commands/sprint-ceremonies";

const plugin: Plugin = async (input) => {
  const { client, project, directory } = input;

  const hooks: Hooks = {
    config: async (config) => {
      config.agent = config.agent ?? {};

      config.agent["product-owner"] = productOwnerAgent;
      config.agent["scrum-master"] = scrumMasterAgent;
      config.agent["dev-frontend"] = devFrontendAgent;
      config.agent["dev-backend"] = devBackendAgent;
      config.agent["qa-engineer"] = qaEngineerAgent;
      config.agent["ui-ux-designer"] = uiUxDesignerAgent;
      config.agent["tech-lead"] = techLeadAgent;
      config.agent["devops-engineer"] = devopsEngineerAgent;
      config.agent["technical-writer"] = technicalWriterAgent;
    },

    tool: {
      "scrum-sprint-backlog": sprintBacklogTool,
      "scrum-burndown": burndownTool,
      "scrum-daily-standup": dailyStandupTool,
      
      "sprint-planning": startSprintPlanningTool,
      "sprint-review": startSprintReviewTool,
      "standup": startStandupCmd,
    },

    event: async ({ event }) => {
      const eventHooks = createEventHooks(client, project);
      await eventHooks.handleEvent(event);
    },

    "chat.message": async (input, output) => {
      const { parts } = output;
      
      for (const part of parts) {
        if (part.type === "text" && part.text) {
          const result = parseCommand(part.text);
          if (result.type) {
            part.text = result.transformedContent;
          }
        }
      }
    },
  };

  return hooks;
};

export default plugin;
