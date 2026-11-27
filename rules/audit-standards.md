---
trigger: model_decision
description: "Adversarial code, architecture, and asset review standards: single-pass exhaustive audits, defect classification, and binary pass/reject criteria."
---

# Adversarial Code & Architecture Audit Standards

## P0: AUDIT METHODOLOGY & CONDUCT

1. **UNCOMPROMISING READ-ONLY MANDATE:**
   - The auditor operates purely in read-only mode (`read_file`, `run_command`).
   - The auditor has zero write or edit tools. It cannot patch files, fix typos, or excuse defects.
   - If a single P0 violation, stub, or missing contract requirement is detected, the auditor MUST output `VERDICT: REJECT`.
2. **WHOLE-FILE AUDIT (LINE 1 TO EOF):**
   - Review each touched and companion file from line 1 to EOF.
   - Pre-existing defects in modified files must be identified; no grandfathering is permitted.
3. **CROSS-FILE DATA FLOW VERIFICATION:**
   - Never review a single file in a vacuum. Verify end-to-end data contracts across models, interfaces, schemas, database migrations, and caller invocations.
   - Verify that test assertions align with authoritative data sources and not mock stubs.
4. **SINGLE-PASS EXHAUSTIVE DEFECT LIST:**
   - Identify all defects in a single pass to minimize remediation roundtrips.
   - Classify every defect into:
     - **`[P0]` Blocker:** Stubs, mock facades, data loss, security vulnerabilities, unhandled error cases, memory leaks, broken contract implementations.
     - **`[P1]` Maintainability:** Missing public docstrings, inefficient algorithms, style deviations, incomplete test edge-cases.

## Required Audit Report Format

```markdown
## AUDIT REPORT: [Target Component / Module]
- **Files Inspected:** [List of exact file paths read line 1 to EOF]
- **Contract Provenance Trace:** [1-2 sentences tracing inputs through business logic to output]

### Findings (Exhaustive List)
1. **[DEF-01] [P0|P1] `path/to/file.ext:LineNumber` — [Rule / Standard Violated]:**
   - **Evidence:** [Exact line or code snippet found]
   - **Required Fix:** [Exact architectural contract requirement to satisfy]

### Verification Evidence
1. **Static Gate Proof:** [Verbatim stdout of audit-gate tool run]
2. **Contract Trace Proof:** [Proof that data contracts are fully bound with zero stubs]

### VERDICT: [PASS | REJECT]
```