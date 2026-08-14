
# Northstar Sprint – Support Deflection MVP

## Project Overview

Northstar Retail Co. wants to reduce repetitive customer support questions.

Our team will build a simple MVP that handles at least **2 types of customer questions**:

1. Order Status
2. Returns & Refunds
3. Stock Availability

The MVP will use sample/mock data and should be easy to demonstrate.

## Project Goals

* Build a working prototype.
* Handle at least 2 support ticket types.
* Work collaboratively using GitHub.
* Track each member's contribution.
* Prepare a simple go-live note.

## GitHub Project Workflow

Tasks move through:

**Backlog → Ready → In Progress → Review → Done**

## Branch Naming

Use:

```text
type/short-description
```

Examples:

```text
feature/order-status-flow
feature/returns-refunds
feature/mock-data
test/order-status
docs/go-live-readiness
chore/project-setup
```

## Commit Messages

Use:

```text
type: description
```

Examples:

```text
feat: add order status flow
feat: add return request flow
test: add order status tests
fix: handle invalid order number
docs: update README
```

## Git Workflow

```bash
git clone <repository-url>

git checkout main
git pull origin main

git checkout -b feature/order-status-flow

# Work on your task

git status
git add .
git commit -m "feat: add order status flow"

git push -u origin feature/order-status-flow
```

Then:

1. Create a **Pull Request** on GitHub.
2. Ask another team member to review it.
3. Merge the Pull Request into `main`.
4. Move the task to **Done**.

## Team Tasks

| Task                              | Branch                          |
| --------------------------------- | ------------------------------- |
| Team Working Agreement            | `docs/team-working-agreement` |
| Pick MVP Technology               | `chore/select-tech-approach`  |
| Set Up Repository & Project Board | `chore/project-setup`         |
| Prepare Mock Data                 | `feature/mock-ticket-data`    |
| Build Order Status                | `feature/order-status-flow`   |
| Build Returns & Refunds           | `feature/returns-refunds`     |
| Testing                           | `test/integration-tests`      |
| Go-Live Note                      | `docs/go-live-readiness`      |

## Final Deliverables

* Working MVP covering at least 2 ticket types
* GitHub repository
* GitHub Project board
* 1-page go-live readiness note
* Git/Project audit trail showing each member's contribution
