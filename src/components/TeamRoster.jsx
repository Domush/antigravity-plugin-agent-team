import React, { useState } from 'react';
import { ROSTER_AGENTS } from '../data/rosterData';
import { Shield, FileCode, CheckCircle2, Terminal, AlertTriangle, Layers, Lock, Unlock, Eye, Sparkles } from 'lucide-react';

export default function TeamRoster() {
  const [selectedAgentId, setSelectedAgentId] = useState('coder');
  const [tabMode, setTabMode] = useState('dispatch'); // 'dispatch' or 'output'

  const activeAgent = ROSTER_AGENTS.find((a) => a.id === selectedAgentId) || ROSTER_AGENTS[0];

  const getBorderColor = (color) => {
    switch (color) {
      case 'cyan': return 'border-brand-cyan/60';
      case 'sky': return 'border-brand-sky/60';
      case 'purple': return 'border-brand-purple/60';
      case 'magenta': return 'border-brand-magenta/60';
      case 'violet': return 'border-brand-violet/60';
      default: return 'border-slate-700';
    }
  };

  const getBadgeStyle = (color) => {
    switch (color) {
      case 'cyan': return 'bg-cyan-950/60 text-cyan-300 border-cyan-800/80';
      case 'sky': return 'bg-sky-950/60 text-sky-300 border-sky-800/80';
      case 'purple': return 'bg-purple-950/60 text-purple-300 border-purple-800/80';
      case 'magenta': return 'bg-pink-950/60 text-pink-300 border-pink-800/80';
      case 'violet': return 'bg-fuchsia-950/60 text-fuchsia-300 border-fuchsia-800/80';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="roster" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-brand-cyan text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multi-Disciplinary Specialization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            The 6 Autonomous Agent Personas
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Strict separation of concerns. Every agent operates within a dedicated permission boundary, governed by authoritative rule contracts.
          </p>
        </div>

        {/* Agent Selector Badges / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {ROSTER_AGENTS.map((agent) => {
            const isSelected = agent.id === selectedAgentId;
            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? `bg-slate-900 shadow-lg ${getBorderColor(agent.color)} scale-[1.03] ring-1 ring-cyan-500/20`
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm mb-2"
                  style={{
                    backgroundColor: `${agent.accentColor}18`,
                    color: agent.accentColor,
                    border: `1px solid ${agent.accentColor}40`
                  }}
                >
                  {agent.handle.replace('@team-', '').slice(0, 3).toUpperCase()}
                </div>
                <span className="font-mono text-xs font-semibold text-slate-200 mb-1">
                  {agent.handle}
                </span>
                <span className="text-[11px] text-slate-400 line-clamp-1">
                  {agent.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Agent Detailed Dossier Card */}
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          {/* Card Top Banner */}
          <div className="bg-slate-900/90 border-b border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start md:items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-extrabold text-xl shadow-inner flex-shrink-0"
                style={{
                  backgroundColor: `${activeAgent.accentColor}25`,
                  color: activeAgent.accentColor,
                  border: `2px solid ${activeAgent.accentColor}60`
                }}
              >
                {activeAgent.handle.replace('@team-', '').slice(0, 3).toUpperCase()}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {activeAgent.handle}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${getBadgeStyle(activeAgent.color)}`}>
                    {activeAgent.role}
                  </span>
                </div>
                <p className="text-sm text-slate-400">
                  {activeAgent.focusArea}
                </p>
              </div>
            </div>

            {/* Write Access Pill */}
            <div className="flex items-center gap-2 self-start md:self-center">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border ${
                  activeAgent.writeAllowed
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                    : 'bg-rose-950/40 text-rose-400 border-rose-800/60'
                }`}
              >
                {activeAgent.writeAllowed ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>{activeAgent.writeAccess}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>{activeAgent.writeAccess}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Dossier Body */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Rules & Invariants */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-2 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-brand-cyan" />
                  Primary Rule Standards
                </h4>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="font-mono text-xs text-brand-sky font-semibold mb-1">
                    {activeAgent.primaryStandard}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Strict adherence required from line 1 to EOF. Zero stubs and whole-file compliance enforced.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Adversarial Constraints & Lifecycle
                </h4>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    <strong className="text-amber-300">Constraint:</strong> {activeAgent.adversarialConstraint}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1 border-t border-slate-800">
                    <strong className="text-brand-purple">Lifecycle:</strong> {activeAgent.lifecycle}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Core Guarantees & Invariants
                </h4>
                <ul className="space-y-2">
                  {activeAgent.keyInvariants.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-brand-cyan font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Interactive Dispatch / Execution Log Terminal */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-t-xl px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-brand-cyan" />
                  <span className="text-xs font-mono font-medium text-slate-300">
                    {tabMode === 'dispatch' ? 'Planner Contract Dispatch' : 'Simulated Execution Output'}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setTabMode('dispatch')}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                      tabMode === 'dispatch'
                        ? 'bg-slate-800 text-brand-cyan font-semibold border border-slate-700'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Dispatch Prompt
                  </button>
                  <button
                    onClick={() => setTabMode('output')}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                      tabMode === 'output'
                        ? 'bg-slate-800 text-brand-cyan font-semibold border border-slate-700'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Simulated Output
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-slate-950 border-x border-b border-slate-800 rounded-b-xl p-4 font-mono text-xs overflow-x-auto shadow-inner min-h-[220px]">
                {tabMode === 'dispatch' ? (
                  <pre className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {activeAgent.sampleDispatch}
                  </pre>
                ) : (
                  <pre className="text-emerald-300 leading-relaxed whitespace-pre-wrap">
                    {activeAgent.simulatedOutput}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
