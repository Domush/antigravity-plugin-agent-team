#!/usr/bin/env node
/**
 * Autonomous Agent Team — CLI & Installation Utility
 * Supports zero-config installation into Google Antigravity via npx.
 */

const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '..', 'package.json');
let pkgVersion = '1.0.0';
try {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  if (pkg.version) pkgVersion = pkg.version;
} catch (_) {}

const args = process.argv.slice(2);
const command = args[0] || 'install';

if (args.includes('--help') || args.includes('-h') || command === 'help') {
  console.log(`
Autonomous Agent Team CLI (v${pkgVersion})

Usage:
  npx antigravity-plugin-agent-team [command] [options]

Commands:
  install        Install the agent team plugin into Antigravity (default)
  uninstall      Remove the agent team plugin
  status         Show installation status and paths
  audit          Run the deterministic static audit gate

Options:
  --global, -g    Install globally in ~/.gemini/config/plugins/agent-team (default)
  --workspace, -w Install in current workspace (.gemini/plugins/agent-team)
  --help, -h      Show this help message
  --version, -v   Print plugin version
`);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v') || command === 'version') {
  console.log(`antigravity-plugin-agent-team v${pkgVersion}`);
  process.exit(0);
}

const isWorkspace = args.includes('--workspace') || args.includes('-w');
const homeDir = process.env.USERPROFILE || process.env.HOME || '';
const pluginDirName = 'agent-team';

const targetDir = isWorkspace
  ? path.join(process.cwd(), '.gemini', 'plugins', pluginDirName)
  : path.join(homeDir, '.gemini', 'config', 'plugins', pluginDirName);

const sourceRoot = path.join(__dirname, '..');

if (command === 'status') {
  const globalPath = path.join(homeDir, '.gemini', 'config', 'plugins', pluginDirName);
  const workspacePath = path.join(process.cwd(), '.gemini', 'plugins', pluginDirName);

  console.log('\n==================================================');
  console.log('   AUTONOMOUS AGENT TEAM INSTALLATION STATUS      ');
  console.log('==================================================');
  console.log(`Global Installation:    ${fs.existsSync(globalPath) ? '✔ Installed' : '✖ Not installed'}`);
  console.log(`  Path: ${globalPath}`);
  console.log(`Workspace Installation: ${fs.existsSync(workspacePath) ? '✔ Installed' : '✖ Not installed'}`);
  console.log(`  Path: ${workspacePath}\n`);
  process.exit(0);
}

if (command === 'uninstall') {
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
    console.log('\n✔ Autonomous Agent Team successfully removed from:');
    console.log(`  ${targetDir}\n`);
  } else {
    console.log(`\nℹ Plugin not found at: ${targetDir}\n`);
  }
  process.exit(0);
}

if (command === 'audit') {
  const auditGate = require('../scripts/audit-gate.js');
  process.exit(0);
}

if (command === 'install') {
  console.log('\n==================================================');
  console.log(`   INSTALLING AUTONOMOUS AGENT TEAM v${pkgVersion}   `);
  console.log('==================================================');
  console.log(`Scope:    ${isWorkspace ? 'Workspace' : 'Global'}`);
  console.log(`Location: ${targetDir}\n`);

  try {
    fs.mkdirSync(targetDir, { recursive: true });

    const filesToCopy = [
      'plugin.json',
      'package.json',
      'README.md',
      'CHANGELOG.md'
    ];

    const dirsToCopy = [
      'agents',
      'rules',
      'skills',
      'scripts',
      'assets'
    ];

    for (const file of filesToCopy) {
      const src = path.join(sourceRoot, file);
      const dest = path.join(targetDir, file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }
    }

    for (const dir of dirsToCopy) {
      const srcDir = path.join(sourceRoot, dir);
      const destDir = path.join(targetDir, dir);
      if (fs.existsSync(srcDir)) {
        fs.cpSync(srcDir, destDir, { recursive: true });
      }
    }

    console.log('✔ Copied plugin manifest & personas:');
    console.log('  • @team-planner  (Lead Architect & Orchestrator)');
    console.log('  • @team-coder    (Full-Stack & Systems Engineer)');
    console.log('  • @team-modeler  (3D Asset & Rigging Specialist)');
    console.log('  • @team-auditor  (Adversarial Read-Only Auditor)');
    console.log('  • @team-test     (Adversarial Test Author)');
    console.log('  • @team-qa       (Test Runner & Visual QA Gate)');
    console.log('\n✔ Copied governance & quality standards:');
    console.log('  • rules/AGENTS.md (Universal Operational Laws)');
    console.log('  • rules/agent-governance-standards.md');
    console.log('  • rules/coding-standards.md');
    console.log('  • rules/modeling-standards.md');
    console.log('  • rules/testing-standards.md');
    console.log('  • rules/audit-standards.md');
    console.log('  • rules/planning-standards.md');
    console.log('\n✔ Copied workflows & verification tools:');
    console.log('  • skills/agent-team/SKILL.md');
    console.log('  • scripts/audit-gate.js');
    console.log('  • scripts/audit-gate.ps1');

    console.log('\n✨ Installation successful!');
    console.log(`📍 Installed to: ${targetDir}`);
    console.log('🚀 Restart or open Antigravity to activate the Autonomous Agent Team.\n');
  } catch (err) {
    console.error(`\n❌ Installation failed: ${err.message}\n`);
    process.exit(1);
  }
  process.exit(0);
}

console.error(`Unknown command: ${command}. Run with --help for usage.`);
process.exit(1);