# Autonomous Agent Team — Universal Execution & Operational Laws

## P0: UNIVERSAL OPERATIONAL LAWS (NON-NEGOTIABLE)

1. **ZERO STUBS & COMPLETE CONTRACTS:** Every component, function, interface, class, and asset must be fully implemented. Placeholders, mock facades, empty methods, fake return values, and stubs (such as `// TODO`, `pass  # todo`, `throw new NotImplementedException()`, `unimplemented!()`) are strictly forbidden. If an edge case cannot be completed, fail fast with explicit diagnostic error context.
2. **FIX OR FAIL:** Never conceal defects, suppress linter warnings, or catch exceptions silently (e.g. empty `catch {}` or `except: pass`). Never skip failing tests (`.skip`, `[Ignore]`) to make a build pass. Fix the underlying root cause or halt and document the failure.
3. **FAIL-FAST ARCHITECTURE:** Validate arguments, preconditions, environment requirements, and state boundaries at API entries. Throw informative, strongly-typed errors immediately rather than propagating corrupt or invalid state.
4. **500-LINE SOURCE CEILING:** Keep source code files under 500 lines of code. When approaching ~400 lines, decompose modularly into focused submodules, services, or partials. Never strip docstrings or comments simply to meet the line ceiling.
5. **ZERO COMPILER & LINTER WARNINGS:** Code must compile and pass linters with zero errors and zero warnings. No compiler warning suppression without documented architectural justification.
6. **WHOLE-FILE COMPLIANCE:** Every file modified during a task must satisfy all P0 standards from line 1 to EOF. Pre-existing violations in touched files must be remediated—zero grandfathering of legacy defects.
7. **SAFE MODIFICATION PROTOCOL:**
   - *Pre-edit verification:* Read the target file and identify all referencing files before editing.
   - *Post-edit verification:* Re-read the modified file immediately to ensure changes applied cleanly without duplicate blocks or omitted logic.
   - *Non-destructive execution:* Never run destructive version-control commands (`git reset --hard`, `git clean -fd`, `git restore`) or unprompted file deletions (`rm -rf`, `del`, `Remove-Item`) without explicit user consent.
8. **ZERO BUSY-POLLING:** Subagent execution and asynchronous background commands operate on reactive event notifications. Never poll status loops while waiting for subagent completion or process output.
9. **DETERMINISTIC PRE-HANDOFF GATE:** Before handing off any modified or newly authored files, execute the static audit gate (`node scripts/audit-gate.js -f "<files>"`) and include the verbatim stdout in the handoff summary.

---

## The 5-Stage Delivery Pipeline

1. **Stage 1 — Authoring (`@team-coder` / `@team-modeler`):**
   - Implements the complete contract, verifies syntax and local formatting, and ensures zero warnings.
2. **Stage 2 — Adversarial Code Audit (`@team-auditor`):**
   - Independent, read-only audit of the full component contract from line 1 to EOF.
   - Any defect or stub triggers binary `VERDICT: REJECT` and routes back to the author for remediation.
3. **Stage 3a — Test Authoring (`@team-test`):**
   - Authors comprehensive unit, boundary, and negative-path test suites. Strictly prohibited from running test runners or altering production code.
4. **Stage 3b — Test Suite Audit (`@team-auditor`):**
   - Audits authored test suites against testing standards (verifying anti-presence rules and setup/teardown symmetry).
5. **Stage 4 & 5 — QA Execution & Final Scrutiny (`@team-qa` & `@team-planner`):**
   - `@team-qa` executes test runners, checks compiler/linter exit codes, and inspects test output.
   - `@team-planner` performs final deliverable and visual scrutiny before completing the task.

---

## Cross-Platform Execution Matrix

| Subsystem | Windows (PowerShell) | POSIX / Linux / macOS (Bash) | Guardrail |
| :--- | :--- | :--- | :--- |
| **Node.js / TS** | `npm test -- --bail` | `npm test -- --bail` | Always run non-interactive test suites with timeouts. |
| **Python** | `pytest -x -v` | `pytest -x -v` | Isolate virtual environments; fail-fast on first error. |
| **Rust / Go** | `cargo test` / `go test ./...` | `cargo test` / `go test ./...` | Verify exit code 0 and 0 warnings. |
| **Blender 3D** | `blender -b -P <script.py>` | `blender -b -P <script.py>` | Run headless; capture stdout and check for exit code 0. |
| **Static Gate** | `node scripts/audit-gate.js -f "<paths>"` | `node scripts/audit-gate.js -f "<paths>"` | Deterministic static check before handoff. |

---

## Security, Credentials & Privacy Isolation

- Never search for, read, log, export, or pass private keys, API secrets, access tokens, or sensitive user environment variables.
- Keep configuration secrets externalized in `.env.example` templates; never commit live credentials.