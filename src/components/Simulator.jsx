import React, { useState, useEffect, useRef } from 'react';
import { SIMULATION_SCENARIOS } from '../data/scenariosData';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Terminal, Bot, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function Simulator() {
  const [selectedScenarioId, setSelectedScenarioId] = useState('fullstack-feature');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenario = SIMULATION_SCENARIOS.find((s) => s.id === selectedScenarioId) || SIMULATION_SCENARIOS[0];
  const totalSteps = scenario.steps.length;
  const currentStep = scenario.steps[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps]);

  const handleScenarioChange = (id) => {
    setSelectedScenarioId(id);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  return (
    <section id="simulator" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-brand-cyan text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Live Multi-Agent Orchestration
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Witness how the autonomous agent team communicates, enforces non-negotiable P0 laws, and coordinates specialized subagents in real-time.
          </p>
        </div>

        {/* Scenario Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {SIMULATION_SCENARIOS.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => handleScenarioChange(sc.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border border-brand-cyan shadow-lg shadow-brand-cyan/15 ring-1 ring-brand-cyan/30'
                    : 'bg-slate-950/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{sc.title}</span>
              </button>
            );
          })}
        </div>

        {/* Simulator Main Stage */}
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          {/* Top Control Bar */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-slate-800 text-brand-sky border border-slate-700">
                  {scenario.badge}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {scenario.title}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {scenario.tagline}
              </p>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs font-mono text-slate-400 mr-2">
                Step {currentStepIndex + 1} of {totalSteps}
              </span>

              <button
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
                title="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-cyan/20 hover:bg-brand-cyan/30 text-brand-cyan border border-brand-cyan/40 font-mono text-xs font-semibold transition-colors"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-brand-cyan" />
                    <span>Auto Play</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNext}
                disabled={currentStepIndex === totalSteps - 1}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
                title="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="bg-slate-950 px-6 py-2.5 border-b border-slate-800/80 flex items-center justify-between gap-1 overflow-x-auto">
            {scenario.steps.map((st, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isPassed = idx < currentStepIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors whitespace-nowrap ${
                    isCurrent
                      ? 'bg-brand-cyan/20 text-brand-cyan font-bold border border-brand-cyan/50'
                      : isPassed
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-brand-cyan' : isPassed ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                  <span>{st.step}. {st.agent}</span>
                </button>
              );
            })}
          </div>

          {/* Simulation Content Body */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Message Log & Action */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-mono font-bold text-xs text-brand-cyan border border-slate-700">
                    {currentStep.step}
                  </div>
                  <div>
                    <span className="font-mono text-sm font-bold text-white">
                      {currentStep.agent}
                    </span>
                    <span className="text-slate-400 text-xs ml-2">
                      → {currentStep.targetAgent}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 mb-4">
                  <div className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-1">
                    Current Action
                  </div>
                  <h4 className="text-base font-bold text-slate-100 mb-1">
                    {currentStep.action}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {currentStep.summary}
                  </p>
                </div>

                <div>
                  <div className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-brand-purple" />
                    Agent Exchange Log
                  </div>
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap max-h-[190px] overflow-y-auto">
                    {currentStep.log}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono text-slate-400">
                <span>Autonomous Event: Reactive</span>
                <span className="text-emerald-400 font-medium">● 0-Stub Gate Active</span>
              </div>
            </div>

            {/* Right: Live Artifact / Code Snippet */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-t-xl px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    Live Deliverable Preview
                  </span>
                </div>
                <span className="text-[11px] font-mono text-brand-sky">
                  Stage Contract
                </span>
              </div>

              <div className="bg-slate-950 border-x border-b border-slate-800 rounded-b-xl p-4 font-mono text-xs overflow-x-auto min-h-[300px] text-slate-200 shadow-inner">
                <pre className="whitespace-pre-wrap leading-relaxed text-sky-200">
                  {currentStep.codeSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
