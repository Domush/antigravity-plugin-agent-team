---
trigger: model_decision
description: "Meta-governance taxonomy, subagent lifecycle management, permission boundaries, and pipeline separation of concerns for the agent team."
---

# Agent Architecture & Governance Standards

## P0: META-GOVERNANCE LAWS

1. **STRICT SEPARATION OF CONCERNS:**
   - **Architect (`@team-planner`):** Coordinates tasks, selects pipelines, and verifies visual deliverables. Strictly forbidden from writing or editing production source code directly.
   - **Auditors (`@team-auditor`):** Strictly read-only (`read_file`, `run_command`). Zero file-writing tools. Performs adversarial static checks without patching code.
   - **Authoring Specialists (`@team-coder`, `@team-modeler`):** Focus entirely on their technical domain. Never audit their own deliverables.
   - **Test Author (`@team-test`):** Authors test suites with boundary and negative assertions. Prohibited from running test runners or modifying production code.
   - **QA Runner (`@team-qa`):** Sole runner of automated test suites and visual artifact verifications.
2. **ASYMMETRIC SUBAGENT LIFECYCLE:**
   - **Fresh Auditor & QA:** Always spawn a new instance of `@team-auditor` and `@team-qa` for each verification pass to avoid confirmation bias.
   - **Persistent Authoring Specialists:** Resume the existing `@team-coder` or `@team-modeler` via `send_message` for up to 2 remediation cycles so it retains working context. On a 3rd consecutive failure, terminate and spawn a fresh specialist.
3. **VERBATIM FINDINGS RELAY:**
   - When `@team-auditor` or `@team-qa` returns `VERDICT: REJECT`, the planner relays the exact defect list to the authoring agent without rephrasing, diluting, or adding subjective summaries.
4. **PROMPT CONCISENESS:**
   - Subagent system prompts must remain concise (< 60 lines), defining only identity, tools, target scopes, operational protocol, and pre-handoff verification.

## Tool Permission Matrix

| Role | Tools Declared | Write Access? | Primary Objective |
| :--- | :--- | :--- | :--- |
| **`team-planner`** | `invoke_subagent`, `send_message`, `manage_subagents`, `read_file`, `run_command`, `ask_question` | No | Task decomposition, specialist dispatch, visual scrutiny |
| **`team-coder`** | `read_file`, `edit_file`, `write_file`, `run_command` | Yes | Production software engineering & API development |
| **`team-modeler`** | `read_file`, `edit_file`, `write_file`, `run_command` | Yes | 3D modeling, topology, UVs, rigging, and DCC scripts |
| **`team-auditor`** | `read_file`, `run_command` | No (Strict) | Adversarial whole-file static & security audit |
| **`team-test`** | `read_file`, `edit_file`, `write_file`, `run_command` | Tests Only | Adversarial unit, integration, and negative-path tests |
| **`team-qa`** | `read_file`, `run_command` | No (Strict) | Test runner execution, regression verification, visual QA |