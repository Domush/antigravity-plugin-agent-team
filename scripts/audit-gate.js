#!/usr/bin/env node
/**
 * Autonomous Agent Team — Deterministic Static Audit Gate
 * Enforces P0 laws: zero stubs in code, line count limits, and banned kill-terms.
 */

const fs = require('fs');
const path = require('path');

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    files: [],
    killTerms: [],
    maxLines: 500
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-f' || arg === '--files') {
      const val = args[++i] || '';
      options.files = val.split(',').map(s => s.trim()).filter(Boolean);
    } else if (arg === '-k' || arg === '--kill-terms') {
      const val = args[++i] || '';
      options.killTerms = val.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    } else if (arg === '--max-lines') {
      options.maxLines = parseInt(args[++i], 10) || 500;
    }
  }

  return options;
}

const CODE_EXTENSIONS = new Set([
  '.js', '.ts', '.jsx', '.tsx', '.mjs', '.cjs',
  '.py', '.rs', '.go', '.cs', '.cpp', '.c', '.h', '.hpp',
  '.java', '.kt', '.rb', '.php', '.swift', '.sh', '.ps1', '.sql'
]);

// Use joined character sequences so the scanner does not match its own definitions
const sTodo = ['T', 'O', 'D', 'O'].join('');
const sFixme = ['F', 'I', 'X', 'M', 'E'].join('');
const sNotImpl = ['Not', 'Implemented'].join('');
const sUnimpl = ['unimplemented', '!'].join('');
const sTodoMacro = ['todo', '!'].join('');

const DEFAULT_STUB_PATTERNS = [
  { regex: new RegExp('\\b' + sTodo + '\\b', 'i'), label: 'Found ' + sTodo + ' stub' },
  { regex: new RegExp('\\b' + sFixme + '\\b', 'i'), label: 'Found ' + sFixme + ' stub' },
  { regex: new RegExp('\\b' + sNotImpl + '(Exception)?\\b'), label: 'Found ' + sNotImpl + ' reference' },
  { regex: new RegExp('\\b' + sUnimpl + '\\s*\\('), label: 'Found ' + sUnimpl + ' macro' },
  { regex: new RegExp('\\b' + sTodoMacro + '\\s*\\('), label: 'Found ' + sTodoMacro + ' macro' },
  { regex: /\b\.(skip|only)\s*\(/, label: 'Found test suite modifier (.skip/.only)' }
];

function auditFile(filePath, options) {
  const fullPath = path.resolve(process.cwd(), filePath);
  const violations = [];

  if (!fs.existsSync(fullPath)) {
    return [{ line: 0, message: `File does not exist: ${filePath}` }];
  }

  const stat = fs.statSync(fullPath);
  if (stat.isDirectory()) {
    return [];
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split(/\r?\n/);
  const ext = path.extname(filePath).toLowerCase();
  const isCode = CODE_EXTENSIONS.has(ext);

  // Line count ceiling
  if (lines.length > options.maxLines) {
    violations.push({
      line: lines.length,
      message: `File exceeds maximum line limit (${lines.length} > ${options.maxLines} lines)`
    });
  }

  // Self-exclusion for the audit gate script itself
  const baseName = path.basename(filePath);
  if (baseName.startsWith('audit-gate')) {
    return violations;
  }

  // Line by line scan
  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const lineText = lines[i];

    // Only check code files for stub patterns (avoids flagging markdown rule docs)
    if (isCode) {
      for (const stub of DEFAULT_STUB_PATTERNS) {
        if (stub.regex.test(lineText)) {
          violations.push({
            line: lineNum,
            message: `${stub.label}: "${lineText.trim()}"`
          });
        }
      }
    }

    // Check custom kill-terms across all files
    const lowerLine = lineText.toLowerCase();
    for (const term of options.killTerms) {
      if (lowerLine.includes(term)) {
        violations.push({
          line: lineNum,
          message: `Banned kill-term "${term}" found: "${lineText.trim()}"`
        });
      }
    }
  }

  return violations;
}

function main() {
  const options = parseArgs();

  if (options.files.length === 0) {
    console.log("Usage: node audit-gate.js -f <file1,file2,...> [-k <killTerm1,killTerm2>] [--max-lines 500]");
    process.exit(0);
  }

  console.log("==================================================");
  console.log("   AUTONOMOUS AGENT TEAM STATIC AUDIT GATE        ");
  console.log("==================================================");
  console.log(`Auditing ${options.files.length} file(s)...`);

  let totalViolations = 0;

  for (const file of options.files) {
    const violations = auditFile(file, options);
    if (violations.length > 0) {
      console.log(`\n❌ [FAIL] ${file}`);
      for (const v of violations) {
        console.log(`   Line ${v.line}: ${v.message}`);
      }
      totalViolations += violations.length;
    } else {
      console.log(`✓ [PASS] ${file}`);
    }
  }

  console.log("\n--------------------------------------------------");
  if (totalViolations === 0) {
    console.log("GATE VERDICT: PASS (0 violations detected)");
    console.log("--------------------------------------------------");
    process.exit(0);
  } else {
    console.log(`GATE VERDICT: REJECT (${totalViolations} violation(s) detected)`);
    console.log("--------------------------------------------------");
    process.exit(1);
  }
}

main();