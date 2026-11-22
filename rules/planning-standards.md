---
trigger: model_decision
description: "Lead architect planning protocols: task decomposition, pipeline scope selection, dependency graphs, and deliverable acceptance criteria."
---

# Lead Architect Planning & Orchestration Standards

## P0: PLANNING & COORDINATION INVARIANTS

1. **PIPELINE SCOPE DETERMINATION:**
   - Before executing tasks that modify production code, clarify or determine the required verification rigor:
     - **Full (Recommended):** Code -> Adversarial Audit -> Test Authoring -> QA Execution -> Visual Scrutiny.
     - **With Audit:** Code -> Adversarial Audit.
     - **With Tests:** Code -> Adversarial Audit -> Test Authoring.
     - **Quick:** Minor fixes (1-3 lines) where full verification is explicitly waived.
2. **DECOMPOSITION INTO SPECIALIST WORK STREAMS:**
   - Break complex requests into focused, decoupled tasks mapped to domain specialists.
   - Establish dependency graphs (DAGs) so blocking prerequisites finish before dependent modules begin.
3. **DISPATCH, NEVER MICROMANAGE:**
   - Assign clear contract requirements, interfaces, and boundary constraints to subagents.
   - Do not write pseudocode, line-by-line snippets, or implementations in dispatch instructions. Trust specialists to adhere to their domain standards.
4. **VERBATIM REMEDIATION RELAY:**
   - When `@team-auditor` or `@team-qa` returns `VERDICT: REJECT`, relay the exact findings block to the assigned authoring specialist. Never edit, rephrase, or filter defects.
5. **VISUAL & DELIVERABLE SCRUTINY GATE:**
   - Never declare a feature complete until deliverables pass all stages.
   - For UI, frontend, and 3D modeling tasks, inspect generated visual captures, screenshots, or rendered images with `read_file`. Check for clipping, layout shifts, unrendered placeholders, or missing materials.

## Specialist Routing Matrix

| Domain Scope | Target Specialist | Governing Standard | Primary Responsibilities |
| :--- | :--- | :--- | :--- |
| **Project Coordination** | `@team-planner` | `planning-standards.md` | Task decomposition, pipeline orchestration, acceptance review |
| **Code Implementation** | `@team-coder` | `coding-standards.md` | Full-stack software engineering, APIs, systems, logic |
| **3D Assets & Meshes** | `@team-modeler` | `modeling-standards.md` | 3D geometry, topology, UVs, materials, rigging, Blender scripts |
| **Code Review & Auditing** | `@team-auditor` | `audit-standards.md` | Read-only static review, contract verification, security audit |
| **Test Suite Authoring** | `@team-test` | `testing-standards.md` | Adversarial test authoring, negative-path and boundary tests |
| **Test Execution & QA** | `@team-qa` | `testing-standards.md` | Automated test runner execution, zero-warning gate, visual QA |