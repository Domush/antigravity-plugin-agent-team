# Autonomous Agent Team Plugin

A project-agnostic, multi-disciplinary agent team plugin for Antigravity. It coordinates planning, full-stack software development, 3D modeling, adversarial auditing, testing, and quality assurance across any codebase or technology stack.

## Team Roster

| Agent | Role | Write Access | Primary Standard | Focus Area |
| :--- | :--- | :--- | :--- | :--- |
| **`@team-planner`** | Lead Architect | No (Coordination) | `planning-standards.md` | Task decomposition, specialist dispatch, acceptance scrutiny |
| **`@team-coder`** | Software Engineer | Yes | `coding-standards.md` | Production code, backend, frontend, APIs, algorithms |
| **`@team-modeler`** | 3D Asset Specialist | Yes | `modeling-standards.md` | Meshes, manifold topology, UVs, PBR materials, LODs, DCC scripts |
| **`@team-auditor`** | Adversarial Auditor | No (Strict) | `audit-standards.md` | Read-only static review, contract proof, binary pass/reject |
| **`@team-test`** | Test Engineer | Tests Only | `testing-standards.md` | Unit, integration, boundary, and negative-path test authoring |
| **`@team-qa`** | QA Runner | No (Strict) | `testing-standards.md` | Test suite execution, zero-warning gate, visual artifact QA |

## Key Architectural Principles

1. **Strict Separation of Concerns:** The planner plans and inspects without modifying code. The auditor reviews without write access. Specialists implement without self-review. The test author writes tests without running them. The QA runner executes without editing tests.
2. **Asymmetric Lifecycle:** `@team-auditor` and `@team-qa` are spawned as fresh instances on every pass to eliminate confirmation bias. Authoring specialists are resumed via message for up to two remediation attempts to preserve working context.
3. **P0 Operational Laws:** Zero stubs, fail-fast boundary validation, 500-line modularity ceiling, whole-file compliance, and safe non-destructive file operations.
4. **The 5-Stage Delivery Pipeline:**
   - Stage 1: Implementation (`@team-coder` / `@team-modeler`)
   - Stage 2: Adversarial Audit (`@team-auditor`)
   - Stage 3a: Test Authoring (`@team-test`)
   - Stage 3b: Test Audit (`@team-auditor`)
   - Stage 4 & 5: QA Execution (`@team-qa`) and Final Scrutiny (`@team-planner`)

## Directory Layout

```text
antigravity-plugin-agent-team/
├── .github/workflows/
│   └── publish.yml             # Automated npm publish & GitHub release
├── bin/
│   └── cli.js                  # CLI & npx installation script
├── plugin.json                 # Antigravity plugin manifest
├── package.json                # Project, test, and npm package configuration
├── CHANGELOG.md                # Release history and feature notes
├── assets/
│   └── logo.svg                # High-contrast plugin icon
├── agents/                     # Subagent persona definitions
│   ├── team-planner.md
│   ├── team-coder.md
│   ├── team-modeler.md
│   ├── team-auditor.md
│   ├── team-test.md
│   └── team-qa.md
├── rules/                      # Universal and conditional rulesets
│   ├── AGENTS.md               # Universal root operational law
│   ├── agent-governance-standards.md
│   ├── coding-standards.md
│   ├── modeling-standards.md
│   ├── testing-standards.md
│   ├── audit-standards.md
│   └── planning-standards.md
├── skills/                     # Detailed team workflows
│   └── agent-team/
│       └── SKILL.md
└── scripts/                    # Static audit gate verification
    ├── audit-gate.js
    └── audit-gate.ps1
```

## Quick Installation via npx

Install globally into Antigravity with a single command:

```bash
npx antigravity-plugin-agent-team install
```

Or install scoped to your current workspace:

```bash
npx antigravity-plugin-agent-team install --workspace
```

### CLI Commands

```bash
# Check installation status
npx antigravity-plugin-agent-team status

# Uninstall the plugin
npx antigravity-plugin-agent-team uninstall
```

## Verification Gate

Run the deterministic static audit gate against any set of files:

```bash
npm test
# Or directly:
node scripts/audit-gate.js -f "path/to/file1.ext,path/to/file2.ext"
```