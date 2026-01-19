export type CeremonyType = "planning" | "review" | "standup" | null;

export interface CommandResult {
  type: CeremonyType;
  originalMessage: string;
  transformedContent: string;
}

const CEREMONY_PATTERNS: Record<string, CeremonyType> = {
  "/sprint-planning": "planning",
  "/sprint-review": "review",
  "/daily-standup": "standup",
  "/standup": "standup",
};

const CEREMONY_PROMPTS: Record<NonNullable<CeremonyType>, string> = {
  planning: `[SPRINT PLANNING CEREMONY]

You are now conducting Sprint Planning with the stakeholder.

CEREMONY PROTOCOL:
1. Greet the stakeholder and ask what they want to build this sprint
2. Listen to their requirements and ask clarifying questions
3. Once requirements are clear, say "I'll create the sprint backlog now."
4. Break down the work into tasks with [Frontend] or [Backend] prefixes
5. Use todowrite to create the backlog
6. Confirm: "Sprint planned! The team will work autonomously. I'll update you when ready for Sprint Review."

The user's request follows:
`,

  review: `[SPRINT REVIEW CEREMONY]

You are now conducting Sprint Review with the stakeholder.

CEREMONY PROTOCOL:
1. Check the backlog status with todoread
2. Present completed work to the stakeholder in BUSINESS terms (not technical)
3. For each completed item, explain what it does for the user
4. Ask: "Does this meet your expectations? Any feedback?"
5. If feedback requires changes, note them for the next sprint
6. Close with: "Thank you for your feedback. Ready for the next sprint whenever you are."

Begin the Sprint Review now:
`,

  standup: `[DAILY STANDUP]

Generate a quick standup summary for the stakeholder.

PROTOCOL:
1. Check current backlog with todoread
2. Summarize:
   - What's DONE since last update
   - What's IN PROGRESS
   - Any BLOCKERS (decisions you need from stakeholder)
3. Keep it brief - 3-5 bullet points max
4. Only ask questions if there's a genuine blocker

Generate the standup now:
`,
};

export function parseCommand(content: string): CommandResult {
  const trimmed = content.trim();

  for (const [command, type] of Object.entries(CEREMONY_PATTERNS)) {
    if (trimmed.toLowerCase().startsWith(command)) {
      const remainder = trimmed.slice(command.length).trim();
      const prompt = CEREMONY_PROMPTS[type!];

      return {
        type,
        originalMessage: content,
        transformedContent: prompt + (remainder || ""),
      };
    }
  }

  return {
    type: null,
    originalMessage: content,
    transformedContent: content,
  };
}

export function isCeremonyCommand(content: string): boolean {
  const trimmed = content.trim().toLowerCase();
  return Object.keys(CEREMONY_PATTERNS).some((cmd) => trimmed.startsWith(cmd));
}

export function getCommandHelp(): string {
  return `
**Scrum Ceremony Commands:**
- \`/sprint-planning [optional goal]\` - Start Sprint Planning with stakeholder
- \`/sprint-review\` - Conduct Sprint Review to demo completed work
- \`/daily-standup\` or \`/standup\` - Quick status update

These commands trigger formal Scrum ceremonies where the Product Owner
communicates with you (the stakeholder).
`.trim();
}
