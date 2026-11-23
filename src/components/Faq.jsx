import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does Google Antigravity coordinate subagents without busy-polling?',
      a: 'Antigravity employs an asynchronous, event-driven messaging system. When @team-planner or an authoring subagent launches a specialist task, it concludes its turn or launches reactive background tasks. The Antigravity runtime automatically reactivates the calling agent as soon as the subagent returns a message or task completion event occurs, completely eliminating token-wasting polling loops.'
    },
    {
      q: 'Why are @team-auditor and @team-qa strictly forbidden from editing code?',
      a: 'Allowing an auditor or tester to modify production code creates severe confirmation bias—they inevitably write forgiving tests or apply cosmetic patches that mask underlying design flaws. By withholding write tools, @team-auditor is forced to provide mathematically rigorous proof and line citations, and @team-qa must report truthful exit codes.'
    },
    {
      q: 'Can the agent team be used with any programming language or technology stack?',
      a: 'Yes. The team is 100% project-agnostic. @team-coder and @team-auditor support TypeScript/JavaScript, Python, Rust, Go, C#, C++, Java, Swift, Ruby, PHP, and shell scripts. The P0 operational laws (zero stubs, fail-fast, 500-line ceiling) apply universally across all paradigms.'
    },
    {
      q: 'How does the 3D digital asset pipeline operate headlessly in CI or CLI?',
      a: 'The @team-modeler authors procedural Blender Python scripts (`blender -b -P script.py`). These scripts inspect topology, generate quad-dominant meshes, unwrap UVs in [0, 1] texture space, configure PBR materials, export GLTF/GLB models, and render multi-angle inspection frames to disk for visual verification without requiring a physical monitor or GUI display.'
    },
    {
      q: 'What is the "Asymmetric Lifecycle" model and why is it important?',
      a: 'In traditional workflows, reusing conversational context for auditors leads to halo effects where the auditor assumes code works because it previously instructed the author. In this plugin, auditors and QA runners are always spawned as fresh instances with zero preconceptions. Conversely, authoring specialists are resumed via conversational message for up to two remediation attempts to preserve their working implementation memory.'
    },
    {
      q: 'How does the static audit gate integrate with pre-commit hooks and CI/CD?',
      a: 'The audit gate is zero-dependency Node.js (`scripts/audit-gate.js`) and PowerShell (`scripts/audit-gate.ps1`). You can invoke it locally via `npm test` or `node scripts/audit-gate.js -f "<files>"`. In CI/CD pipelines (like GitHub Actions), any violation of P0 laws exits with code 1, automatically blocking pull requests that contain unfinished stubs.'
    }
  ];

  return (
    <section id="faq" className="py-20 relative bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-brand-cyan text-xs font-mono font-medium mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Architecture & Governance FAQ
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Everything you need to know about autonomous subagents, permission boundaries, and zero-stub engineering.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded-lg bg-slate-900 border border-slate-800 flex-shrink-0 text-slate-400">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
