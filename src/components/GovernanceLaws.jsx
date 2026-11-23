import React, { useState } from 'react';
import { GOVERNANCE_LAWS } from '../data/lawsData';
import { BookOpen, AlertOctagon, CheckCircle2, XCircle, Code2, ShieldAlert, Sparkles } from 'lucide-react';

export default function GovernanceLaws() {
  const [selectedLawId, setSelectedLawId] = useState('zero-stubs');
  const [viewMode, setViewMode] = useState('split'); // 'split', 'wrong', 'right'

  const activeLaw = GOVERNANCE_LAWS.find((l) => l.id === selectedLawId) || GOVERNANCE_LAWS[0];

  return (
    <section id="governance" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-brand-sky text-xs font-mono font-medium mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Universal Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            The P0 Universal Operational Laws
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Non-negotiable operational invariants codified in <code className="text-brand-cyan">rules/AGENTS.md</code>. Every agent in the team adheres to these contracts unconditionally.
          </p>
        </div>

        {/* Laws Grid / Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-10">
          {GOVERNANCE_LAWS.map((law) => {
            const isSelected = law.id === selectedLawId;
            return (
              <button
                key={law.id}
                onClick={() => setSelectedLawId(law.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-brand-cyan/70 shadow-lg ring-1 ring-brand-cyan/20'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-brand-cyan">
                    {law.number}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-200 line-clamp-1">
                  {law.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Selected Law Deep-Dive Card */}
        <div className="glass-panel rounded-2xl border border-slate-800 p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-900 border border-slate-700 text-brand-cyan">
                  {activeLaw.number} LAW
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {activeLaw.title}
                </h3>
              </div>
              <p className="text-slate-300 text-sm max-w-3xl mt-1">
                {activeLaw.summary}
              </p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 max-w-sm">
              <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400 block mb-0.5">
                Why this matters:
              </span>
              <p className="text-xs text-slate-300">
                {activeLaw.rationale}
              </p>
            </div>
          </div>

          {/* Interactive Code Comparison (Wrong vs Right) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-brand-cyan" />
                Adversarial Proof: Anti-Pattern vs Law Compliance
              </span>

              <div className="hidden sm:flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    viewMode === 'split' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Side-by-Side
                </button>
                <button
                  onClick={() => setViewMode('wrong')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    viewMode === 'wrong' ? 'bg-rose-950 text-rose-300 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Violation Only
                </button>
                <button
                  onClick={() => setViewMode('right')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    viewMode === 'right' ? 'bg-emerald-950 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Compliant Only
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* WRONG PANEL */}
              {(viewMode === 'split' || viewMode === 'wrong') && (
                <div className={`flex flex-col ${viewMode === 'wrong' ? 'lg:col-span-2' : ''}`}>
                  <div className="bg-rose-950/40 border border-rose-900/60 rounded-t-xl px-4 py-2 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" />
                      NON-COMPLIANT (Triggers Binary REJECT)
                    </span>
                  </div>
                  <pre className="bg-slate-950 border-x border-b border-rose-950/60 rounded-b-xl p-4 font-mono text-xs text-rose-200/90 overflow-x-auto min-h-[160px] leading-relaxed shadow-inner">
                    {activeLaw.wrongCode}
                  </pre>
                </div>
              )}

              {/* RIGHT PANEL */}
              {(viewMode === 'split' || viewMode === 'right') && (
                <div className={`flex flex-col ${viewMode === 'right' ? 'lg:col-span-2' : ''}`}>
                  <div className="bg-emerald-950/40 border border-emerald-900/60 rounded-t-xl px-4 py-2 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      COMPLIANT (Auditor Approved Contract)
                    </span>
                  </div>
                  <pre className="bg-slate-950 border-x border-b border-emerald-950/60 rounded-b-xl p-4 font-mono text-xs text-emerald-200/90 overflow-x-auto min-h-[160px] leading-relaxed shadow-inner">
                    {activeLaw.rightCode}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
