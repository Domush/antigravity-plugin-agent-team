import React, { useState } from 'react';
import { Terminal, Copy, Check, ShieldCheck, ArrowRight, Layers, Users, Zap, CheckCircle2, Play } from 'lucide-react';

export default function Hero({ onCopyCommand, copied }) {
  const [activeTab, setActiveTab] = useState('npx');

  const installCommands = {
    npx: 'npx antigravity-plugin-agent-team install',
    npm: 'npm install -g antigravity-plugin-agent-team',
    git: 'git clone https://github.com/Domush/antigravity-plugin-agent-team.git'
  };

  const metrics = [
    {
      title: '6 Autonomous Roles',
      desc: 'Planner, Coder, Modeler, Auditor, Test, QA',
      icon: Users,
      color: 'text-brand-cyan',
      border: 'hover:border-brand-cyan/40'
    },
    {
      title: '5-Stage Delivery Pipeline',
      desc: 'Stage 1 through 5 with binary pass/reject gate',
      icon: Layers,
      color: 'text-brand-purple',
      border: 'hover:border-brand-purple/40'
    },
    {
      title: '0-Stub Adversarial Gate',
      desc: 'Strict read-only proof catching stubs & leaks',
      icon: ShieldCheck,
      color: 'text-brand-magenta',
      border: 'hover:border-brand-magenta/40'
    },
    {
      title: '100% Tech-Agnostic',
      desc: 'Node/TS, Python, Rust, Go, C#, Headless Blender',
      icon: Zap,
      color: 'text-brand-sky',
      border: 'hover:border-brand-sky/40'
    }
  ];

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-brand-cyan/15 via-brand-purple/20 to-brand-magenta/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-12 right-10 w-72 h-72 bg-brand-cyan/10 blur-[90px] pointer-events-none rounded-full" />
      <div className="absolute top-48 left-10 w-72 h-72 bg-brand-magenta/10 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Badges */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 mb-6 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
            </span>
            <span className="text-xs font-semibold text-slate-200 tracking-wide">
              Official Antigravity Plugin
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono font-medium text-brand-sky">v1.0.0 Ready</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
            The Autonomous{' '}
            <span className="gradient-text-brand">Agent Team</span>
            <br />
            for Google Antigravity
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Project-agnostic, multi-disciplinary orchestration across planning, full-stack software development, 3D modeling, adversarial auditing, testing, and quality assurance.
          </p>

          {/* 1-Click Installation Tab Box */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-2 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800/80 px-3 pb-2 mb-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center space-x-1">
                  {['npx', 'npm', 'git'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                        activeTab === tab
                          ? 'bg-slate-800 text-brand-cyan font-bold border border-slate-700'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between px-3 py-2 bg-slate-950/70 rounded-xl border border-slate-800/80">
                <div className="flex items-center space-x-3 overflow-x-auto text-left py-0.5">
                  <Terminal className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-slate-200 whitespace-nowrap">
                    {installCommands[activeTab]}
                  </span>
                </div>
                <button
                  onClick={() => onCopyCommand(installCommands[activeTab])}
                  className="flex items-center gap-1.5 ml-3 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 hover:border-brand-cyan/60 transition-all flex-shrink-0"
                  aria-label="Copy Command"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#simulator"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-magenta text-white font-semibold text-sm shadow-lg shadow-brand-cyan/20 hover:shadow-brand-purple/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Simulator</span>
            </a>
            <a
              href="#roster"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 hover:border-slate-600 transition-all"
            >
              <span>Explore 6 Roles</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#audit-gate"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-850 text-slate-300 hover:text-brand-cyan font-medium text-sm border border-slate-800 hover:border-brand-cyan/40 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-brand-cyan" />
              <span>Audit Gate Playground</span>
            </a>
          </div>
        </div>

        {/* Value Proposition Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className={`glass-panel p-5 rounded-2xl border transition-all duration-300 ${m.border}`}
              >
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${m.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {m.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
