---
trigger: model_decision
description: "Authoritative software engineering standards across languages: modularity, fail-fast error handling, memory safety, typing contracts, and zero-stub architecture."
---

# Universal Software Engineering Standards

## P0: CORE CODING INVARIANTS

1. **COMPLETE IMPLEMENTATIONS ONLY:**
   - Every function, class, and module must be fully implemented to satisfy its contract.
   - Never write hollow stubs, placeholder responses, or fake return data.
   - If an error state occurs, throw an informative, strongly-typed error immediately.
2. **FAIL-FAST BOUNDARY VALIDATION:**
   - Check all input parameters, environment configurations, and state prerequisites at entry points.
   - Never write silent recovery code that masks invalid inputs (e.g., `if (val == null) return;` without logging or throwing when a value is mandatory).
3. **500-LINE SOURCE DECOMPOSITION:**
   - Keep source code files under 500 lines.
   - Refactor at ~400 lines into specialized submodules, strategy classes, or utility services.
4. **ZERO WARNINGS & STRICT LINTING:**
   - Code must pass compilation, type-checking (e.g. TypeScript, mypy, rustc), and linting (e.g. ESLint, Ruff, Clippy) with zero warnings.
   - Do not disable linter checks or compiler warnings via comment directives (`# pragma`, `eslint-disable`) without documented architectural necessity.
5. **DETERMINISTIC RESOURCE LIFECYCLE:**
   - Always pair resource acquisition with deterministic release using language idioms (e.g., `try...finally`, `using`, `with`, `defer`, RAII).
   - Close file descriptors, network connections, database handles, and subscriptions reliably.
6. **NO COMMENTED-OUT OR DEAD CODE:**
   - Remove commented-out code blocks, obsolete unreachable branches, and unused imports before handoff.

## Architectural Patterns & Best Practices

| Domain | Best Practice (DO) | Anti-Pattern (DON'T) |
| :--- | :--- | :--- |
| **Error Handling** | Throw specific exception types with context messages. | Generic `catch (Exception e) {}` or swallowing errors silently. |
| **Typing** | Use explicit interfaces, schema models, and strict type declarations. | Overusing untyped `any`, raw `Object`, or implicit conversions. |
| **State & Purity** | Prefer immutable data structures and pure functions where feasible. | Hidden global mutable state or undocumented side-effects. |
| **Async Workflows** | Always handle promise rejections, pass cancellation tokens/signals, set timeouts. | Unhandled promises, fire-and-forget background jobs without logging. |
| **Dependencies** | Inject dependencies through constructors or functional arguments. | Hardcoding global singletons and untracked service lookups. |

## Pre-Edit and Post-Edit Checklist

1. **Before Editing:** Read the entire file and search across the codebase for all references to symbols being modified.
2. **During Editing:** Preserve existing coding style, indentation, and architectural conventions.
3. **After Editing:** Re-read the modified file from top to bottom. Run type-checking or build verification to confirm zero errors and zero warnings.