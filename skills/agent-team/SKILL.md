---
name: agent-team
description: "Orchestrates the project-agnostic autonomous agent team across planning, full-stack software development, 3D modeling, adversarial auditing, testing, and QA."
---

# Autonomous Agent Team Guide & Operational Workflows

The **Autonomous Agent Team** plugin provides a disciplined, 6-role agent architecture built to deliver software, systems, and 3D digital assets across any language or technology stack.

## Team Roster & Responsibilities

| Agent Handle | Role & Mandate | Tool Access | Governing Standard |
| :--- | :--- | :--- | :--- |
| **`@team-planner`** | **Lead Architect & Coordinator:** Task decomposition, specialist dispatch, visual scrutiny gate. Strictly forbidden from writing code. | Read-Only / Dispatch | `planning-standards.md` |
| **`@team-coder`** | **Software Engineer:** Implements complete production code contracts across backend, frontend, systems, APIs, and algorithms. | Authoring (Write/Edit) | `coding-standards.md` |
| **`@team-modeler`** | **3D Asset Specialist:** Authors 3D meshes, topology, UVs, PBR materials, LODs, collision hulls, and Blender headless scripts. | Authoring (Write/Edit) | `modeling-standards.md` |
| **`@team-auditor`** | **Adversarial Auditor:** Read-only code and contract reviewer. Single-pass line 1 to EOF review. Issues binary `PASS` or `REJECT`. | Read-Only (No Write) | `audit-standards.md` |
| **`@team-test`** | **Adversarial Test Author:** Authors unit, integration, boundary, and negative-path test fixtures. Forbidden from running tests or modifying code. | Tests Only | `testing-standards.md` |
| **`@team-qa`** | **Test Runner & Visual QA:** Executes automated test runners, checks compiler/linter warnings, inspects visual captures. | Read-Only (Runner) | `testing-standards.md` |

---

## The 5-Stage Delivery Pipeline

### Stage 1: Implementation
- `@team-planner` assigns clear contract specifications and constraints to `@team-coder` (for software) or `@team-modeler` (for 3D assets).
- The authoring specialist implements the complete contract, validates syntax/linting locally, and runs `node scripts/audit-gate.js -f "<files>"`.

### Stage 2: Adversarial Audit
- `@team-planner` spawns a fresh `@team-auditor`.
- `@team-auditor` performs a whole-file inspection from line 1 to EOF against `rules/coding-standards.md` or `rules/modeling-standards.md`.
- If any defect is found: emits `VERDICT: REJECT` with line citations and required fixes.
- `@team-planner` relays the exact defect report to the authoring specialist via `send_message` (up to 2 remediation attempts).

### Stage 3: Test Authoring & Test Audit
- **Stage 3a:** `@team-planner` dispatches `@team-test` to author comprehensive unit, boundary, and negative-path test suites.
- **Stage 3b:** `@team-planner` spawns a fresh `@team-auditor` to audit the authored tests against `rules/testing-standards.md` (verifying anti-presence rules, edge case coverage, and teardown cleanliness).

### Stage 4: Quality Assurance Execution
- `@team-planner` spawns a fresh `@team-qa`.
- `@team-qa` runs the project's native test runner (`npm test`, `pytest`, `cargo test`, `go test`, `dotnet test`).
- Enforces the **Zero Warnings Gate**: any compiler warning or unhandled deprecation notice triggers `VERDICT: REJECT`.

### Stage 5: Acceptance & Visual Scrutiny
- `@team-planner` inspects deliverable artifacts:
  - For UI / frontend / 3D models: calls `read_file` on screenshots, renders, or visual captures to inspect layout, alignment, and absence of visual artifacts.
  - Verifies all acceptance criteria before concluding the user task.

---

## Common Project Workflows

### 1. Full-Stack Feature Delivery
```text
User Request
     │
     ▼
@team-planner (Task breakdown & routing)
     │
     ├──► Stage 1: @team-coder (Implements code + runs local audit-gate)
     ├──► Stage 2: @team-auditor (Read-only whole-file audit)
     ├──► Stage 3a: @team-test (Authors negative-path & boundary tests)
     ├──► Stage 3b: @team-auditor (Audits test suites)
     ├──► Stage 4: @team-qa (Executes test runners + zero-warning gate)
     └──► Stage 5: @team-planner (Acceptance review & sign-off)
```

### 2. Headless 3D Asset Pipeline
1. `@team-modeler` authors geometry and automation script:
   ```bash
   blender -b -P scripts/generate_mesh.py -- --out assets/model.glb
   ```
2. Verifies geometry: manifold edges, quad topology, applied scale `(1,1,1)`, non-overlapping UVs in `[0, 1]`, and PBR textures.
3. `@team-auditor` reviews mesh metrics and script safety.
4. `@team-qa` renders turnaround captures and verifies file size / asset headers.
5. `@team-planner` calls `read_file` on turnaround captures for visual scrutiny.