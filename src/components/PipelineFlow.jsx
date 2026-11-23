import React, { useState } from 'react';
import { PIPELINE_STAGES, PIPELINE_PRINCIPLES } from '../data/pipelineData';
import { GitBranch, ShieldAlert, CheckCircle2, RefreshCw, FileCode, ArrowRight, CornerDownRight, Check, XCircle } from 'lucide-react';

export default function PipelineFlow() {
  const [selectedStageId, setSelectedStageId] = useState(2); // default to Stage 2 (Audit Gate)

  const activeStage = PIPELINE_STAGES.find((s) => s.id === selectedStageId) || PIPELINE_STAGES[0];

  return (
    <section id="pipeline" className="py-20 relative bg-slate-950/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-brand-purple text-xs font-mono font-medium mb-3">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Deterministic Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            The 5-Stage Delivery Pipeline
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            No self-reviewing. No unvalidated test runs. No unchecked stubs. Every deliverable advances through an adversarial gate.
          </p>
        </div>

        {/* Visual Pipeline Stepper Bar */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-10">
          {PIPELINE_STAGES.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`relative text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-brand-cyan/70 shadow-lg ring-1 ring-brand-cyan/20 scale-[1.02]'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      STAGE {stage.stageNumber}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: stage.accentColor }}
                    />
                  </div>
                  <h3 className="font-bold text-sm text-white mb-1 leading-snug">
                    {stage.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {stage.agent}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">{stage.lifecycle.split(' ')[0]}</span>
                  <span className={isSelected ? 'text-brand-cyan' : 'text-slate-400'}>
                    Inspect →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage Inspection Detail Panel */}
        <div className="glass-panel rounded-2xl border border-slate-800 p-6 md:p-8 mb-12 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-900 border border-slate-700 text-brand-sky">
                  STAGE {activeStage.stageNumber}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {activeStage.name}
                </h3>
              </div>
              <p className="text-slate-300 text-sm max-w-2xl">
                {activeStage.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Owner: </span>
                <span className="text-white font-bold">{activeStage.agent}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Lifecycle: </span>
                <span className="text-brand-purple font-bold">{activeStage.lifecycle}</span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1.5">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Inputs
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                {activeStage.inputs}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Outputs
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                {activeStage.outputs}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Exit Criteria
              </span>
              <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed bg-emerald-950/20 p-3 rounded-xl border border-emerald-900/40">
                {activeStage.exitCriteria}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                On Defect / Failure
              </span>
              <p className="text-xs sm:text-sm text-rose-300 leading-relaxed bg-rose-950/20 p-3 rounded-xl border border-rose-900/40">
                {activeStage.failurePath}
              </p>
            </div>
          </div>
        </div>

        {/* Pipeline Governance Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PIPELINE_PRINCIPLES.map((p, idx) => (
            <div key={idx} className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-5">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                {p.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
