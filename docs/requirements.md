# Requirements

## System Overview

Web application for managing students, classes, and evaluations.

Stack: React + TypeScript (frontend), Node.js + TypeScript (backend), JSON persistence, Cucumber/Gherkin acceptance tests.

---

## Functional Requirements

1. Manage students: create, edit, remove, and list. Each student must have at minimum name, CPF, and email.
2. Evaluation management page with a table where:
   - The first column contains the student name
   - Each goal (meta) appears in a separate column
   - Each goal is graded with one of: `MANA`, `MPA`, or `MA`
3. JSON persistence for both student records and evaluations.
4. Manage classes: create, edit, remove, and view. Each class must contain:
   - Topic description
   - Year
   - Semester
   - Enrolled students
   - Evaluations for those students in that class
5. View each class individually with its students and evaluations.
6. Send an email to a student when a professor fills in or changes an evaluation.

---

## Business Rules

1. Allowed evaluation concepts:
   - `MANA` — Meta Ainda Não Atingida (Goal Not Yet Achieved)
   - `MPA` — Meta Parcialmente Atingida (Goal Partially Achieved)
   - `MA` — Meta Atingida (Goal Achieved)
2. A student must not receive multiple emails on the same day for different changes.
3. Only one email per student per day is sent, consolidating all evaluations changed during that period.
4. The daily email must include changes made across all classes in which the student is enrolled.
5. Evaluations belong to the context of a class — the same student can have different evaluations in different classes.

---

## Non-Functional Requirements

1. Web application with:
   - React client in TypeScript
   - Node.js server in TypeScript
2. Acceptance tests using Gherkin and Cucumber.
3. Development assisted by an agent (Claude Code or equivalent) with persistent instructions and skills.
4. Code quality equivalent to non-agent development: correctness, modularity, readability, reusability, extensibility, security, and performance.

---

## Process and Delivery Requirements

1. Development in a local git repository with a GitHub remote.
2. For each agent prompt/action:
   - Record the prompt in the history spreadsheet
   - Verify compilation and functionality
   - Review additions and removals
   - Record effectiveness and limitations of the agent
   - Accept, reject, or manually adjust the changes
   - Create a commit for each accepted change
3. Final repository must contain:
   - `sistema/` folder with code and tests
   - `HistóricoDoMeuExperimento.xlsx`
   - `RevisãoDoSistemaDoMeuColega.md`

---

## Entities

| Entity | Fields |
|---|---|
| Student | name, CPF, email |
| Class | topic, year, semester, enrolledStudents |
| Evaluation | student, class, goal, concept |
| Goal | name (e.g. Requirements, Tests, etc.) |
| DailyEmailDigest | studentId, changes[], date |

---

## Backlog

1. Student CRUD
2. Class CRUD
3. Enroll students in classes
4. Evaluation screen per class
5. JSON persistence layer
6. Cucumber acceptance tests
7. Daily email digest mechanism
8. Final quality review and delivery organization
