/**
 * Changelog Data
 * History of releases, core enhancements, and governance standards.
 */

export const CHANGELOG_ITEMS = [
  {
    version: '1.0.0',
    date: '2026-11-22',
    tag: 'Latest Release',
    title: 'Initial Release: Autonomous Multi-Disciplinary Agent Team',
    category: 'Release',
    summary: 'The initial public release of antigravity-plugin-agent-team. Project-agnostic, multi-disciplinary agent team plugin for Google Antigravity featuring 6 specialized roles, 5-stage pipeline, and zero-stub architecture.',
    highlights: [
      {
        section: 'Core Agent Personas',
        badge: 'Agents',
        items: [
          '@team-planner (Lead Architect & Orchestrator): Coordinates tasks across specialists, formulates dependency graphs (DAGs), manages subagent lifecycles, and enforces the final acceptance and visual scrutiny gate.',
          '@team-coder (Full-Stack & Systems Engineer): Implements production-grade software contracts across backend systems, APIs, user interfaces, CLI utilities, and algorithms in any target language.',
          '@team-modeler (3D Asset & Rigging Specialist): Authors 3D meshes, 2-manifold topology, quad-dominant edge flow, non-overlapping UVs in [0, 1], PBR materials, collision hulls, descending LOD chains, and headless Blender Python automation scripts.',
          '@team-auditor (Adversarial Code & Asset Auditor): Read-only static analysis and security auditor. Operates with zero write tools, conducting line 1 to EOF audits to catch stubs, memory leaks, and contract violations.',
          '@team-test (Adversarial Test Author): Authors comprehensive unit, integration, boundary, and negative-path test fixtures. Strictly prohibited from running test suites and from modifying production code.',
          '@team-qa (Test Execution Runner & Visual QA Gate): Sole execution runner for automated test suites across all frameworks. Enforces the zero-warning compiler and linter gate and inspects rendered visual captures.'
        ]
      },
      {
        section: 'Governance & Operational Standards',
        badge: 'Governance',
        items: [
          'Universal Root Operational Law (rules/AGENTS.md): Defines non-negotiable P0 laws including Zero Stubs, Fix or Fail, Fail-Fast Architecture, 500-Line Source Ceiling, Zero Warnings, and Safe Non-Destructive Modifications.',
          'Agent Governance (rules/agent-governance-standards.md): Codifies role boundaries, tool permission matrices, verbatim defect relay protocols, and asymmetric subagent lifecycles.',
          'Universal Coding Standards (rules/coding-standards.md): Typed error handling, deterministic resource disposal, immutability, and pre/post-edit verification.',
          '3D Modeling Standards (rules/modeling-standards.md): 2-manifold geometry, metric scale (1 unit = 1m), applied transforms, and LOD hierarchies.',
          'Test Engineering Standards (rules/testing-standards.md): Anti-Presence Law, negative-path coverage, symmetrical teardown, and deterministic assertions.',
          'Adversarial Audit Standards (rules/audit-standards.md): Exhaustive single-pass defect classification ([P0] blocker vs [P1] maintainability) and binary pass/reject criteria.'
        ]
      },
      {
        section: 'Tooling & CI/CD',
        badge: 'Tooling',
        items: [
          'Deterministic Static Audit Gate (scripts/audit-gate.js & scripts/audit-gate.ps1): Cross-platform verification tools scanning for stubs, line limits, and banned kill-terms.',
          'CLI Installer (bin/cli.js): Interactive and headless zero-configuration installation utility supporting npx antigravity-plugin-agent-team install [--global|--workspace].',
          'Automated CI/CD Pipeline (.github/workflows/publish.yml): GitHub Actions workflow automating test execution, npm publishing with provenance, and GitHub Release generation.',
          'Workflows Skill (skills/agent-team/SKILL.md): Complete guide covering the 5-Stage Delivery Pipeline, remediation loops, and headless 3D asset generation workflows.'
        ]
      }
    ]
  }
];
