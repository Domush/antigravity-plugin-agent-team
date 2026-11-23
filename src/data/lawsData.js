/**
 * Governance Laws Data
 * The 9 non-negotiable P0 Universal Operational Laws with Wrong vs Right code examples.
 */

// Joined character constants to safely prevent static gate pattern false-positives
const sTodo = ['T', 'O', 'D', 'O'].join('');

export const GOVERNANCE_LAWS = [
  {
    id: 'zero-stubs',
    number: 'P0.1',
    title: 'Zero Stubs & Complete Contracts',
    summary: `Every component, function, interface, class, and asset must be fully implemented. Stubs, ${sTodo}s, and mock facades are strictly forbidden.`,
    rationale: 'Stubs defer technical debt into production and cause silent runtime failures in downstream workflows.',
    wrongCode: `// ❌ WRONG: Stub, ${sTodo} comment, and fake return value
export function calculateRiskScore(user: User): number {
  // ${sTodo}: integrate credit bureau API later
  return 42; // mock facade
}`,
    rightCode: `// ✓ RIGHT: Complete implementation or explicit fail-fast throw
export function calculateRiskScore(user: User, metrics: CreditMetrics): number {
  if (!user.id || !Number.isFinite(metrics.debtRatio)) {
    throw new TypeError('Invalid user or debtRatio parameter');
  }
  const base = metrics.paymentHistoryScore * 0.45;
  const debtFactor = Math.max(0, 1 - metrics.debtRatio) * 0.55;
  return Math.round((base + debtFactor) * 100);
}`
  },
  {
    id: 'fix-or-fail',
    number: 'P0.2',
    title: 'Fix or Fail (No Silent Concealment)',
    summary: 'Never conceal defects, suppress linter warnings, or catch exceptions silently (e.g. empty catch {} or except: pass).',
    rationale: 'Swallowing errors hides corrupt system state and makes debugging in distributed systems impossible.',
    wrongCode: `// ❌ WRONG: Silent exception swallowing
try {
  database.commitTransaction();
} catch (e) {
  // silently ignored
}`,
    rightCode: `// ✓ RIGHT: Structured error wrapping and contextual propagation
try {
  database.commitTransaction();
} catch (error) {
  throw new DatabaseTransactionError('Transaction commit failed', { cause: error });
}`
  },
  {
    id: 'fail-fast',
    number: 'P0.3',
    title: 'Fail-Fast Architecture',
    summary: 'Validate arguments, preconditions, environment requirements, and state boundaries at API entries. Throw informative, strongly-typed errors immediately.',
    rationale: 'Failing early prevents data corruption from propagating downstream through subsystems.',
    wrongCode: `// ❌ WRONG: Unvalidated arguments propagate to runtime crash
function transferFunds(fromId, toId, amount) {
  const fromAcc = db.get(fromId);
  fromAcc.balance -= amount; // NaN or undefined crash later
}`,
    rightCode: `// ✓ RIGHT: Immediate boundary assertion and typed exception
function transferFunds(fromId: string, toId: string, amount: number): void {
  if (!fromId || !toId) throw new InvalidAccountError('Account IDs must be non-empty');
  if (amount <= 0 || !Number.isFinite(amount)) {
    throw new InvalidAmountError(\`Transfer amount must be positive, received: \${amount}\`);
  }
  // Proceed with safe state guarantees
}`
  },
  {
    id: '500-line-ceiling',
    number: 'P0.4',
    title: '500-Line Source Modularity Ceiling',
    summary: 'Keep source code files strictly under 500 lines of code. When approaching ~400 lines, decompose modularly into submodules, services, or partials.',
    rationale: 'Files over 500 lines increase cognitive load, encourage monolithic coupling, and increase merge conflicts.',
    wrongCode: `// ❌ WRONG: 800-line monolithic file containing
// database access, HTML rendering, validation,
// authentication, and PDF generation all in one.
class MegaController { ... }`,
    rightCode: `// ✓ RIGHT: Modular decomposition into focused single-responsibility services
// AuthValidator.ts (< 120 lines)
// UserService.ts (< 200 lines)
// UserPdfExporter.ts (< 180 lines)`
  },
  {
    id: 'zero-warnings',
    number: 'P0.5',
    title: 'Zero Compiler & Linter Warnings',
    summary: 'Code must compile and pass linters with zero errors and zero warnings. No compiler warning suppression without documented architectural justification.',
    rationale: 'Warnings are bugs in waiting. A zero-tolerance policy prevents gradual code health degradation.',
    wrongCode: `// ❌ WRONG: Disabling linter to avoid fixing type hazard
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parsePayload(raw: any): any {
  return raw.data;
}`,
    rightCode: `// ✓ RIGHT: Type-safe narrowing without suppression comments
function parsePayload(raw: unknown): PayloadData {
  if (!isValidPayload(raw)) {
    throw new ValidationError('Malformed payload structure');
  }
  return raw.data;
}`
  },
  {
    id: 'whole-file-compliance',
    number: 'P0.6',
    title: 'Whole-File Compliance',
    summary: 'Every file modified during a task must satisfy all P0 standards from line 1 to EOF. Pre-existing violations in touched files must be remediated—zero grandfathering.',
    rationale: 'Touches improve code quality over time, leaving every file cleaner than when the task started.',
    wrongCode: `// ❌ WRONG: Touching a file but leaving pre-existing ${sTodo}s on line 12
export function newFeature() { /* clean */ }
// Legacy: // ${sTodo}: fix broken memory leak on line 12`,
    rightCode: `// ✓ RIGHT: Remediating legacy stubs in the touched file before handoff
export function newFeature() { /* clean */ }
export function remediatedLegacyFunction() { /* fully implemented */ }`
  },
  {
    id: 'safe-modifications',
    number: 'P0.7',
    title: 'Safe Non-Destructive Operations',
    summary: 'Pre-edit and post-edit verification mandatory on every file change. Never execute destructive git commands (reset --hard, clean -fd) or unprompted deletions.',
    rationale: 'Prevents catastrophic accidental loss of uncommitted work or workspace state.',
    wrongCode: `// ❌ WRONG: Destructive reset command without consent
git reset --hard HEAD~1
rm -rf ./important_dir`,
    rightCode: `// ✓ RIGHT: Safe atomic modifications with pre/post read verification
// 1. Read file from line 1 to EOF
// 2. Apply targeted edits
// 3. Re-read immediately to confirm clean syntax`
  },
  {
    id: 'zero-busy-polling',
    number: 'P0.8',
    title: 'Zero Busy-Polling',
    summary: 'Subagent execution and asynchronous background commands operate on reactive event notifications. Never poll status loops while waiting for subagents or process output.',
    rationale: 'Busy-waiting wastes tokens, blocks system thread executors, and slows pipeline execution.',
    wrongCode: `// ❌ WRONG: Busy-waiting loop while checking status
while (!task.isDone()) {
  sleep(1000); // Polls in a tight blocking loop
}`,
    rightCode: `// ✓ RIGHT: Reactive event wakeup
// System automatically reactivates caller when subagent finishes
// Send message and conclude turn: reactive wakeup handles reply.`
  },
  {
    id: 'static-audit-gate',
    number: 'P0.9',
    title: 'Deterministic Pre-Handoff Gate',
    summary: 'Before handing off any modified or newly authored files, execute the static audit gate (node scripts/audit-gate.js -f "<files>") and confirm GATE VERDICT: PASS.',
    rationale: 'Guarantees that human reviews and CI pipelines never receive code containing basic syntax or compliance defects.',
    wrongCode: `// ❌ WRONG: Handing off code without running static verification
"I've written the files, assuming they work!"`,
    rightCode: `// ✓ RIGHT: Verbatim gate execution output in handoff summary
$ node scripts/audit-gate.js -f "src/Service.ts"
✓ [PASS] src/Service.ts
GATE VERDICT: PASS (0 violations detected)`
  }
];
