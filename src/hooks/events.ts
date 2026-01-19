import type { Event, Project } from "@opencode-ai/sdk";
import type { createOpencodeClient } from "@opencode-ai/sdk";

type Client = ReturnType<typeof createOpencodeClient>;

export function createEventHooks(client: Client, project: Project) {
  return {
    async handleEvent(event: Event) {
      switch (event.type) {
        case "session.created":
          break;

        case "todo.updated":
          await handleTodoUpdate(event.properties);
          break;

        case "session.idle":
          break;

        default:
          break;
      }
    },
  };
}

async function handleTodoUpdate(properties: { sessionID: string; todos: Array<{ content: string; status: string; priority: string; id: string }> }) {
  const { todos } = properties;

  const completed = todos.filter((t) => t.status === "completed").length;
  const total = todos.length;
  const inProgress = todos.filter((t) => t.status === "in_progress").length;

  if (total > 0 && completed === total) {
  } else if (inProgress > 0 || completed > 0) {
  }
}
