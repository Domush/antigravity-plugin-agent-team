---
trigger: model_decision
description: "Authoritative test engineering standards: unit, integration, and E2E testing, negative-path coverage, boundary assertions, and test isolation."
---

# Test Engineering & Quality Assurance Standards

## P0: TEST AUTHORING & EXECUTION INVARIANTS

1. **THE ANTI-PRESENCE LAW:**
   - Never write shallow assertions that only check for non-null existence (e.g. `expect(result).toBeDefined()`, `assert result is not None`).
   - Every assertion must verify concrete state, payload values, return counts, and expected data transitions.
2. **MANDATORY NEGATIVE-PATH & BOUNDARY COVERAGE:**
   - Every test fixture must include negative test cases: invalid argument values, null/empty payloads, boundary conditions (0, -1, MAX_INT), timeouts, and permission failures.
   - Assert that invalid inputs raise the exact expected error types and diagnostic messages.
3. **COMPLETE TEST ISOLATION & DETERMINISM:**
   - Tests must run independently with zero order dependency. A test must pass equally whether run alone or in a parallel test suite.
   - For generative or procedural logic, use deterministic seeds (`seed=42`) and verify deterministic outputs.
   - Use unique, temporary directory paths for disk I/O; never write directly to shared workspace root paths.
4. **SYMMETRICAL SETUP & TEARDOWN:**
   - Every resource acquired during test setup (mock servers, temporary files, open sockets, database connections) must be released in teardown/finally blocks.
   - Always restore environment variables, mocked globals, and system timers to their original states.
5. **ZERO ARBITRARY SLEEPS (FLAKE PREVENTION):**
   - Never use fixed delay sleeps (`setTimeout(..., 1000)`, `time.sleep(2)`) to await asynchronous events.
   - Use predicate polling with explicit timeout guards (e.g. `waitFor(() => condition, { timeout: 3000 })`).
6. **NO TEST MUTILATION:**
   - When a test reveals a bug in production code, NEVER weaken or alter the test assertion to force a green result.
   - Report the production bug clearly with expected vs. actual values for remediation by authoring specialists.