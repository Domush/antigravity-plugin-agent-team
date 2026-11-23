import React, { useState } from 'react';
import { Terminal, Copy, Check, Download, Layers, ShieldCheck, Laptop, HelpCircle } from 'lucide-react';

export default function Installation({ onCopyCommand, copied }) {
  const [installScope, setInstallScope] = useState('global'); // 'global', 'workspace', 'manual'
  const [os, setOs] = useState('powershell'); // 'powershell' or 'bash'

  const commands = {
    global: {
      powershell: 'npx antigravity-plugin-agent-team install',
      bash: 'npx antigravity-plugin-agent-team install'
    },
    workspace: {
      powershell: 'npx antigravity-plugin-agent-team install --workspace',
      bash: 'npx antigravity-plugin-agent-team install --workspace'
    },
    manual: {
      powershell: 'git clone https://github.com/Domush/antigravity-plugin-agent-team.git\ncd antigravity-plugin-agent-team\nnode bin/cli.js install',
      bash: 'git clone https://github.com/Domush/antigravity-plugin-agent-team.git\ncd antigravity-plugin-agent-team\nnode bin/cli.js install'
    }
  };

  const currentCmd = commands[installScope][os];

  return (
    <section id="install" className="py-20 relative bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-brand-cyan text-xs font-mono font-medium mb-3">
            <Download className="w-3.5 h-3.5" />
            <span>Zero Configuration Setup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Installation & CLI Commands
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Instantly integrate the agent team into your Google Antigravity environment globally or scoped to a single workspace.
          </p>
        </div>

        {/* Installation Configurator Box */}
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl border border-slate-800 p-6 md:p-8 shadow-2xl mb-12">
          {/* Controls: Scope Switcher + OS Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4 mb-6">
            <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setInstallScope('global')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  installScope === 'global'
                    ? 'bg-brand-cyan text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Global Install (Recommended)
              </button>
              <button
                onClick={() => setInstallScope('workspace')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  installScope === 'workspace'
                    ? 'bg-brand-cyan text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Current Workspace
              </button>
              <button
                onClick={() => setInstallScope('manual')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  installScope === 'manual'
                    ? 'bg-brand-cyan text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Manual Git
              </button>
            </div>

            <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-center">
              <button
                onClick={() => setOs('powershell')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  os === 'powershell' ? 'bg-slate-800 text-brand-sky font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                PowerShell (Windows)
              </button>
              <button
                onClick={() => setOs('bash')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  os === 'bash' ? 'bg-slate-800 text-brand-sky font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                POSIX / Bash
              </button>
            </div>
          </div>

          {/* Terminal Command Output */}
          <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-4 sm:p-5 mb-6 font-mono text-xs sm:text-sm text-slate-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <button
                onClick={() => onCopyCommand(currentCmd)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Command</span>
                  </>
                )}
              </button>
            </div>

            <pre className="whitespace-pre-wrap leading-relaxed text-brand-sky">
              {currentCmd}
            </pre>
          </div>

          {/* Scope Explanation */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            {installScope === 'global' && (
              <p>
                <strong className="text-slate-200">Global Installation:</strong> Copies the plugin assets, rule standards, agent definitions, and skills into your global Antigravity configuration directory (<code className="text-brand-cyan">~/.gemini/config/plugins/agent-team</code>). Available in all workspaces.
              </p>
            )}
            {installScope === 'workspace' && (
              <p>
                <strong className="text-slate-200">Workspace Installation:</strong> Configures the agent team specifically inside the active project workspace root (<code className="text-brand-cyan">./.gemini/plugins/agent-team</code>). Ideal for team repositories with custom override rules.
              </p>
            )}
            {installScope === 'manual' && (
              <p>
                <strong className="text-slate-200">Manual Git Installation:</strong> Clones the repo locally for contributors desiring to modify agent rules, add new subagent personas, or extend DCC Blender scripts.
              </p>
            )}
          </div>
        </div>

        {/* CLI Subcommands Matrix */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h4 className="font-mono text-xs font-bold text-white mb-1">
              $ npx ... status
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verifies whether the agent team plugin is registered, inspects plugin.json paths, and reports agent availability.
            </p>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h4 className="font-mono text-xs font-bold text-white mb-1">
              $ npx ... uninstall
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cleanly unregisters the agent team from Antigravity and removes linked config directories without touching project source files.
            </p>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h4 className="font-mono text-xs font-bold text-white mb-1">
              $ npm test / audit-gate
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deterministic static pre-handoff gate for zero stubs, 500-line modularity ceiling, and banned kill-terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
