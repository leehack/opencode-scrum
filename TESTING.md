# Testing the Scrum Plugin

We have set up a test project at `/Users/jhin.lee/Documents/personal/scrum-test-project`.

## How to Run

1. Open a new terminal
2. Navigate to the test project:
   ```bash
   cd /Users/jhin.lee/Documents/personal/scrum-test-project
   ```
3. Start OpenCode with the Product Owner agent:
   ```bash
   opencode --agent product-owner
   ```

## Verification Steps

### 1. Sprint Planning
**Command:** `/sprint-planning`
**Action:**
- Tell the agent: "I want to build a simple To-Do List app with React and Node.js."
- Answer any clarifying questions.
- **Success Criteria:**
  - Agent acknowledges the request.
  - Agent creates a backlog using `todowrite`.
  - Agent confirms sprint is planned.

### 2. Sprint Execution (Autonomous)
**Action:**
- Tell the agent: "Start the sprint."
- **Success Criteria:**
  - Product Owner delegates tasks to `@dev-frontend` and `@dev-backend`.
  - Subagents create files (you can verify in the file explorer).
  - QA Engineer verifies the work.
  - Tasks in `todo` list are marked as completed.

### 3. Sprint Review
**Command:** `/sprint-review`
**Action:**
- Run the command when the agent says work is done.
- **Success Criteria:**
  - Agent presents what was built.
  - Agent asks for feedback.

### 4. Daily Standup (Optional)
**Command:** `/daily-standup`
**Action:**
- Run this during the sprint.
- **Success Criteria:**
  - Agent provides a brief status update.

## Troubleshooting

- If agents get stuck, try typing "status?" to prompt them.
- If tools fail, check the `opencode-scrum` directory for build errors.
