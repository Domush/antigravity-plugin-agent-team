# Changelog

All notable changes to `antigravity-plugin-agent-team` will be documented in this file.

## [1.0.0] - 2026-11-22

### Initial Release: Autonomous Multi-Disciplinary Agent Team

Initial release of the project-agnostic **Autonomous Agent Team** plugin for Google Antigravity, providing a structured, 6-role agent architecture designed for full-stack software development, 3D digital asset creation, adversarial code auditing, and automated quality assurance across any codebase or technology stack.

#### Core Agent Personas (`agents/`)
- **`@team-planner` (Lead Architect & Orchestrator)**: Coordinates tasks across specialists, formulates dependency graphs (DAGs), manages subagent lifecycles, and enforces the final acceptance and visual scrutiny gate. Strictly forbidden from writing production code directly to preserve architectural context.
- **`@team-coder` (Full-Stack & Systems Engineer)**: Implements production-grade software contracts across backend systems, APIs, user interfaces, CLI utilities, and algorithms in any target language (TypeScript/JavaScript, Python, Rust, Go, C#, C++, etc.). Enforces zero stubs and fail-fast invariants.
- **`@team-modeler` (3D Asset & Rigging Specialist)**: Authors 3D meshes, 2-manifold topology, quad-dominant edge flow, non-overlapping UVs in `[0, 1]` space, PBR materials, collision hulls, descending LOD chains, and headless Blender Python automation scripts (`blender -b -P script.py`).
- **`@team-auditor` (Adversarial Code & Asset Auditor)**: Read-only static analysis and security auditor. Operates with zero write or edit tools, conducting line 1 to EOF audits to catch stubs, mock facades, memory leaks, and contract violations. Issues binary `PASS` or `REJECT` verdicts with line citations and required fixes.
- **`@team-test` (Adversarial Test Author)**: Authors comprehensive unit, integration, boundary, and negative-path test fixtures. Strictly prohibited from running test suites (delegated to `@team-qa`) and from modifying production code. Enforces the Anti-Presence Law (concrete value assertions).
- **`@team-qa` (Test Execution Runner & Visual QA Gate)**: Sole execution runner for automated test suites across all frameworks (`npm test`, `pytest`, `cargo test`, `go test`, `dotnet test`). Enforces the zero-warning compiler and linter gate and inspects rendered visual captures with `read_file`.

#### Governance & Operational Standards (`rules/`)
- **Universal Root Operational Law (`rules/AGENTS.md`)**: Defines non-negotiable P0 laws including Zero Stubs, Fix or Fail, Fail-Fast Architecture, 500-Line Source Ceiling, Zero Warnings Barrier, Whole-File Compliance, Safe Non-Destructive Modifications, and Zero Busy-Polling.
- **Agent Governance (`rules/agent-governance-standards.md`)**: Codifies role boundaries, tool permission matrices, verbatim defect relay protocols, and asymmetric subagent lifecycles (fresh auditor/QA per pass; authoring specialists resumed up to 2 remediation attempts).
- **Universal Software Engineering (`rules/coding-standards.md`)**: Standards for modularity, typed error handling, deterministic resource disposal (`try...finally`, `using`, `defer`), immutability, and pre/post-edit verification.
- **3D Modeling & Digital Assets (`rules/modeling-standards.md`)**: Standards for 2-manifold geometry, metric scale (1 unit = 1m), applied transforms, non-overlapping UVs, metallic/roughness PBR channels, convex collision geometry, and LOD hierarchies.
- **Test Engineering (`rules/testing-standards.md`)**: Testing standards prohibiting shallow presence-only checks, mandating negative-path coverage, requiring symmetrical setup/teardown, and eliminating timing flakiness.
- **Adversarial Audit (`rules/audit-standards.md`)**: Exhaustive single-pass defect classification (`[P0]` blocker vs `[P1]` maintainability), line citations, and binary pass/reject criteria.
- **Planning & Coordination (`rules/planning-standards.md`)**: Scope selection (Full, With Audit, With Tests, Quick), task decomposition, specialist routing, and deliverable scrutiny protocols.

#### Tooling & CI/CD
- **Deterministic Static Audit Gate (`scripts/audit-gate.js` & `scripts/audit-gate.ps1`)**: Cross-platform pre-completion verification tools scanning for stubs, line limits, and banned terms with zero dependencies.
- **CLI Installer (`bin/cli.js`)**: Interactive and headless zero-configuration installation utility supporting `npx antigravity-plugin-agent-team install [--global|--workspace]`, `uninstall`, and `status`.
- **Automated CI/CD Pipeline (`.github/workflows/publish.yml`)**: GitHub Actions workflow automating test execution, npm publishing with provenance, and GitHub Release generation on `v*` tag pushes.
- **Workflows Skill (`skills/agent-team/SKILL.md`)**: Complete guide covering the 5-Stage Delivery Pipeline, remediation loops, and headless 3D asset generation workflows.