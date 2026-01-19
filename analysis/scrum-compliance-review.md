# Scrum Compliance Analysis: OpenCode-Scrum Plugin

## 1. Executive Summary
The OpenCode-Scrum plugin provides a solid foundation for iterative development using AI agents. However, it currently deviates from core Scrum principles in two critical areas: **Role Separation** and **Team Self-Organization**. The Product Owner agent acts as a command-and-control orchestrator, which creates a bottleneck and violates the check-and-balance system intended by the Scrum framework.

## 2. Scrum Compliance Analysis

### 2.1 Role Implementation

| Role | Scrum Definition | Plugin Implementation | Gap Analysis |
|------|------------------|----------------------|--------------|
| **Product Owner** | Owns backlog, defines requirements, accepts/rejects work, does NOT assign tasks | Acts as PO + Scrum Master hybrid; selects tasks and assigns them to devs. | ⚠️ **CRITICAL**: Role confusion. The PO should define "What" and "Why," but "How" and "Who" should be team-led. |
| **Scrum Master** | Facilitates process, removes blockers, protects team, ensures self-organization | **MISSING** - No Scrum Master agent exists. Facilitation is split between PO and Tech Lead. | ❌ **MISSING**: The process lacks a dedicated guardian. Need `scrum-master.ts`. |
| **Development Team** | Self-organizing, cross-functional, pulls work from backlog | Devs are "Workers" who wait for PO delegation. No agency in task selection. | ⚠️ **ISSUE**: Team is not self-organizing. This is a "Push" model rather than a "Pull" model. |

### 2.2 Ceremony Analysis

*   **Sprint Planning**: Currently lacks velocity estimation and story points. The "Technical Breakdown" is performed by the Tech Lead alone, whereas it should be a collaborative team activity. There is no concept of a "Sprint Goal" that the team commits to.
*   **Daily Standup**: Implemented as a reporting tool (`daily-standup.ts`) rather than a synchronization event. It tracks what was done but doesn't facilitate the team's self-adjustment of the day's plan.
*   **Sprint Review**: Focused on documentation via the `technical-writer`. While it involves stakeholder feedback, it lacks a formal "Definition of Done" (DoD) verification before presentation.
*   **Sprint Retrospective**: Currently led by the Product Owner. In Scrum, the Scrum Master should facilitate this to ensure the team can safely critique the process—including the PO's backlog management.

### 2.3 Artifact Analysis
*   **Product Backlog**: Well-implemented using `todowrite` ✅.
*   **Sprint Backlog**: Exists as a subset of todos but lacks **Story Points** and **Estimation**. The system assumes every task is equal (1 point).
*   **Increment**: No formal **Definition of Done** (DoD) concept. QA verifies, but against requirements, not necessarily against a global quality standard.
*   **Burndown Chart**: Tool exists ✅ but calculates progress based on task count rather than estimated effort.

## 3. Tool Design Review

The current tool implementation follows a "Meta-Prompt" pattern where tools return instructions to the agent rather than raw data.

```typescript
// Current pattern (src/tools/sprint-backlog.ts):
return `Use todoread to get todos, then format them...`;

// Alternative (actual data-driven):
const todos = await context.tools.todoread();
return formatAsBurndown(todos);
```

**Pros**: Provides flexibility; the agent can interpret the data contextually.
**Cons**: No guarantee of execution; inconsistent outputs; high token overhead for formatting that could be done programmatically.

## 4. Critical Recommendations

### Priority 1 (High) - Role Separation
1.  **Create `scrum-master.ts` agent** with responsibilities:
    *   Facilitating ceremonies (Planning, Standup, Retro).
    *   Monitoring the `todo` list for blockers.
    *   Protecting developers from direct PO interference.
2.  **Refactor `product-owner.ts`**:
    *   Limit to backlog prioritization and requirement definition.
    *   Remove the "Iterative Loop" (SELECT/DELEGATE/WAIT).
    *   PO should only "Accept" or "Reject" work once QA is complete.

### Priority 2 (Medium) - Team Self-Organization
1.  **Implement a "Pull" Model**: Developers should use `todoread` to find the highest-priority "Pending" task they are qualified for and "Claim" it.
2.  **Add `claim-task` tool**: Marks a todo with the agent's name and changes status to `in_progress`.
3.  **PO/SM should NOT use `task` to delegate** individual work items; they should only nudge if the backlog is stalling.

### Priority 3 (Medium) - Ceremony Improvements
1.  **Estimation**: Add a `points` field to the `todo` schema. During Planning, have the team (FE/BE/QA) estimate items.
2.  **Sprint Goal**: Make the `goal` in `sprint-planning` a mandatory artifact that agents reference to stay aligned.

### Priority 4 (Lower) - Missing Concepts
1.  **Definition of Done (DoD)**: Create a `verify-dod` tool that checks code against standards (tests, linting, docs) before it can be moved to "Done".
2.  **Velocity Tracking**: Store the total points completed per session to help the PO plan more realistic future sprints.

## 5. Proposed Architecture Changes

```
CURRENT:                          PROPOSED:
┌─────────────────┐               ┌─────────────────┐
│  Product Owner  │               │  Product Owner  │
│  (Orchestrator) │               │  (Backlog only) │
└────────┬────────┘               └────────┬────────┘
         │ assigns                         │ prioritizes
    ┌────┴────┐                   ┌────────┴────────┐
    ▼         ▼                   │  Scrum Master   │
┌───────┐ ┌───────┐               │  (Facilitator)  │
│Dev-FE │ │Dev-BE │               └────────┬────────┘
└───────┘ └───────┘                        │ protects/monitors
                                  ┌────────┴────────┐
                                  │   Dev Team      │
                                  │ (Self-organizing│
                                  │  pulls work)    │
                                  └─────────────────┘
```

## 6. Implementation Roadmap

| Phase | Task | Effort | Priority |
|-------|------|--------|----------|
| 1 | Create `scrum-master.ts` agent | Medium | High |
| 2 | Refactor `product-owner.ts` to remove orchestration | Short | High |
| 3 | Add `claim-task` tool for pull model | Short | Medium |
| 4 | Add story point estimation to todo schema | Quick | Medium |
| 5 | Add Definition of Done (DoD) verification tool | Short | Lower |
| 6 | Implement velocity history tracking | Medium | Lower |

## 7. Conclusion
The OpenCode-Scrum plugin captures the *mechanics* of iterative development but currently misses the *spirit* of Scrum. By shifting from an Orchestrator-led model to a Facilitator-led model, the plugin will better simulate high-performing, self-organizing Agile teams. The primary technical debt lies in the Product Owner's over-extended responsibilities and the lack of a dedicated Scrum Master agent.
