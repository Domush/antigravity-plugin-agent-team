/**
 * Pipeline Flow Data
 * Detailed specifications for the 5-Stage Delivery Pipeline.
 */

export const PIPELINE_STAGES = [
  {
    id: 1,
    stageNumber: '01',
    name: 'Contract Implementation',
    agent: '@team-coder or @team-modeler',
    agentRole: 'Authoring Specialist',
    badge: 'Stage 1: Implementation',
    color: 'sky',
    accentColor: '#4CC9F0',
    icon: 'Code2',
    lifecycle: 'Resumed Context (Max 2 Retries)',
    description: 'The authoring specialist implements 100% of the requested component contract in production code or DCC 3D assets.',
    inputs: 'Feature specification, interface definitions, architectural acceptance criteria.',
    outputs: 'Production files, 3D models, DCC automation scripts, zero stubs.',
    exitCriteria: '0 compiler errors, 0 linter warnings, complete logic implementation from line 1 to EOF.',
    rulesEnforced: ['P0: Zero Stubs', 'P0: Fail-Fast Architecture', 'P0: 500-Line Ceiling'],
    failurePath: 'If local build fails, author immediately resolves root cause before submitting to Stage 2.'
  },
  {
    id: 2,
    stageNumber: '02',
    name: 'Adversarial Code & Asset Audit',
    agent: '@team-auditor',
    agentRole: 'Adversarial Auditor (Read-Only)',
    badge: 'Stage 2: Audit Gate',
    color: 'magenta',
    accentColor: '#F72585',
    icon: 'ShieldAlert',
    lifecycle: 'Fresh Instance (Zero Bias)',
    description: 'An independent, read-only adversarial audit scans line 1 to EOF. Any placeholder, silent error suppression, or edge case omission yields immediate REJECT.',
    inputs: 'Authored production files and component specification.',
    outputs: 'Exhaustive audit report with binary verdict: PASS or REJECT.',
    exitCriteria: 'Strict binary VERDICT: PASS with zero blocking violations.',
    rulesEnforced: ['P0: Fix or Fail', 'P0: Zero Warnings', 'Single-Pass Exhaustive Audit'],
    failurePath: 'VERDICT: REJECT triggers Verbatim Defect Relay back to Stage 1 author with line numbers and required fixes.'
  },
  {
    id: 3,
    stageNumber: '03a',
    name: 'Adversarial Test Authoring',
    agent: '@team-test',
    agentRole: 'Test Engineer',
    badge: 'Stage 3a: Test Fixture',
    color: 'violet',
    accentColor: '#B5179E',
    icon: 'FileCheck2',
    lifecycle: 'Resumed Context (If Feedback Occurs)',
    description: 'Specialist test author writes extensive unit, integration, boundary, and negative-path test fixtures. Strictly forbidden from running test runners or editing production code.',
    inputs: 'Approved production contracts and edge-case boundary specs.',
    outputs: 'Comprehensive test fixture files with concrete assertions.',
    exitCriteria: 'Anti-Presence Law satisfied: tests assert exact values and messages, not truthiness.',
    rulesEnforced: ['Anti-Presence Law', 'Hermetic Isolation', 'Deterministic Assertions'],
    failurePath: 'If test requirements change, test fixtures are updated before advancing to 3b.'
  },
  {
    id: 4,
    stageNumber: '03b',
    name: 'Test Suite Adversarial Audit',
    agent: '@team-auditor',
    agentRole: 'Adversarial Auditor (Read-Only)',
    badge: 'Stage 3b: Test Audit',
    color: 'magenta',
    accentColor: '#F72585',
    icon: 'FileSearch',
    lifecycle: 'Fresh Instance (Zero Bias)',
    description: 'Fresh auditor instance audits test fixtures against testing standards. Rejects shallow tests, missing negative paths, or leaky teardowns.',
    inputs: 'Authored test fixtures.',
    outputs: 'Binary PASS or REJECT verdict on test suite rigor.',
    exitCriteria: 'Verified zero shallow tests and complete boundary coverage.',
    rulesEnforced: ['Negative-Path Completeness', 'Symmetrical Teardown', 'No Flaky Sleeps'],
    failurePath: 'REJECT routes back to @team-test with itemized missing coverage.'
  },
  {
    id: 5,
    stageNumber: '04-05',
    name: 'QA Execution & Lead Scrutiny',
    agent: '@team-qa & @team-planner',
    agentRole: 'QA Runner & Lead Architect',
    badge: 'Stage 4 & 5: Acceptance',
    color: 'cyan',
    accentColor: '#00D2FF',
    icon: 'CheckCircle2',
    lifecycle: 'Fresh QA Instance; Lead Orchestrator',
    description: '@team-qa executes test runners and compiler gates with zero warnings. @team-planner performs final visual and functional scrutiny before delivery.',
    inputs: 'Audited production code, audited test suite, rendered UI captures.',
    outputs: 'Execution test report, zero-warning linter proof, final delivery artifact.',
    exitCriteria: 'All tests pass with exit code 0; zero compiler warnings; planner signs off.',
    rulesEnforced: ['Zero Compiler/Linter Warnings', 'Visual Quality Gate', 'Lead Scrutiny Protocol'],
    failurePath: 'Any test failure stops execution immediately (--bail); verbatim output routed to author for Stage 1 remediation.'
  }
];

export const PIPELINE_PRINCIPLES = [
  {
    title: 'Asymmetric Lifecycle Model',
    description: 'Auditors and QA runners are spawned as fresh subagent instances on every pass to eliminate confirmation bias. Authoring specialists are resumed via message for up to two remediation attempts to preserve active working context.'
  },
  {
    title: 'Verbatim Defect Relay Protocol',
    description: 'When an auditor rejects code or QA detects a failing test, the lead architect (@team-planner) relays the exact line citations and error diagnostics verbatim to the author. No summarizing or paraphrasing is permitted to ensure zero loss of technical context.'
  },
  {
    title: 'Deterministic Binary Gate',
    description: 'Every audit gate emits a strict binary decision: PASS or REJECT. There are no "conditional passes" or "fix later" approvals in production branches.'
  }
];
