import React, { useState, useMemo } from 'react';
import { AUDIT_PRESETS } from '../data/auditSnippets';
import { ShieldCheck, ShieldAlert, Terminal, Play, RotateCcw, AlertTriangle, CheckCircle2, FileCode } from 'lucide-react';

export default function AuditGateDemo() {
  const [selectedPresetId, setSelectedPresetId] = useState('clean-pass');
  const [code, setCode] = useState(AUDIT_PRESETS[0].code);

  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setCode(preset.code);
  };

  // Simulate audit-gate.js scanner
  const auditResult = useMemo(() => {
    const lines = code.split(/\r?\n/);
    const violations = [];

    // Line ceiling
    if (lines.length > 500) {
      violations.push({
        line: lines.length,
        message: `File exceeds maximum line limit (${lines.length} > 500 lines)`
      });
    }

    // Use joined character sequences so the scanner does not match its own definitions
    const kwTodo = ['T', 'O', 'D', 'O'].join('');
    const kwFixme = ['F', 'I', 'X', 'M', 'E'].join('');
    const kwNotImpl = ['Not', 'Implemented'].join('');
    const kwUnimpl = ['unimplemented', '!'].join('');
    const kwTodoMacro = ['to', 'do', '!'].join('');

    const stubKeywords = [
      { regex: new RegExp('\\b' + kwTodo + '\\b', 'i'), label: 'Found ' + kwTodo + ' stub' },
      { regex: new RegExp('\\b' + kwFixme + '\\b', 'i'), label: 'Found ' + kwFixme + ' stub' },
      { regex: new RegExp('\\b' + kwNotImpl + '(Exception)?\\b'), label: 'Found ' + kwNotImpl + ' reference' },
      { regex: new RegExp('\\b' + kwUnimpl + '\\s*\\('), label: 'Found ' + kwUnimpl + ' macro' },
      { regex: new RegExp('\\b' + kwTodoMacro + '\\s*\\('), label: 'Found ' + kwTodoMacro + ' macro' },
      { regex: /\b\.(skip|only)\s*\(/, label: 'Found test suite modifier (.skip/.only)' },
      { regex: /catch\s*\([^)]*\)\s*\{\s*\}/, label: 'Found empty catch block (silent error suppression)' }
    ];

    for (let i = 0; i < lines.length; i++) {
      const lineNum = i + 1;
      const lineText = lines[i];

      for (const pattern of stubKeywords) {
        if (pattern.regex.test(lineText)) {
          violations.push({
            line: lineNum,
            message: `${pattern.label}: "${lineText.trim()}"`
          });
        }
      }
    }

    const passed = violations.length === 0;
    return {
      passed,
      violations,
      lineCount: lines.length
    };
  }, [code]);

  return (
    <section id="audit-gate" className="py-20 relative bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-brand-magenta text-xs font-mono font-medium mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Adversarial Playground</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Interactive Audit Gate Playground
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Test any code snippet against the real P0 static audit gate logic. Stubs, mock facades, empty catches, or bloated files trigger immediate binary rejection.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {AUDIT_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-brand-cyan border border-brand-cyan/60 shadow-md ring-1 ring-brand-cyan/20'
                    : 'bg-slate-950/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{preset.name}</span>
                <span
                  className={`ml-2 px-1.5 py-0.2 rounded text-[10px] ${
                    preset.expectedVerdict === 'PASS'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {preset.expectedVerdict}
                </span>
              </button>
            );
          })}
        </div>

        {/* Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Code Editor */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bg-slate-900 border border-slate-800 rounded-t-xl px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-brand-sky" />
                <span className="text-xs font-mono font-medium text-slate-300">
                  Target Component Source
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {auditResult.lineCount} lines / 500 max
              </span>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full bg-slate-950 border-x border-b border-slate-800 rounded-b-xl p-4 font-mono text-xs text-slate-200 focus:outline-none focus:border-brand-cyan/60 resize-y min-h-[340px] leading-relaxed shadow-inner"
              placeholder="// Paste or edit code here to test the audit gate..."
              spellCheck="false"
            />
          </div>

          {/* Right Column: Terminal Gate Scanner Output */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bg-slate-900 border border-slate-800 rounded-t-xl px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brand-magenta" />
                <span className="text-xs font-mono font-medium text-slate-300">
                  scripts/audit-gate.js Output
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
                    auditResult.passed
                      ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                      : 'bg-rose-950/60 text-rose-400 border-rose-800'
                  }`}
                >
                  {auditResult.passed ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>GATE PASS</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-3 h-3" />
                      <span>GATE REJECT</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Terminal Window */}
            <div className="flex-1 bg-slate-950 border-x border-b border-slate-800 rounded-b-xl p-4 font-mono text-xs overflow-x-auto min-h-[340px] shadow-inner flex flex-col justify-between">
              <div className="space-y-1">
                <div className="text-slate-400">
                  $ node scripts/audit-gate.js -f "src/Component.ts"
                </div>
                <div className="text-slate-400">
                  ==================================================
                </div>
                <div className="text-slate-200">
                  &nbsp;&nbsp;&nbsp;AUTONOMOUS AGENT TEAM STATIC AUDIT GATE
                </div>
                <div className="text-slate-400">
                  ==================================================
                </div>
                <div className="text-slate-300">
                  Auditing 1 file(s)...
                </div>

                {auditResult.passed ? (
                  <div className="text-emerald-400 pt-2">
                    ✓ [PASS] src/Component.ts (0 violations detected)
                  </div>
                ) : (
                  <div className="pt-2 space-y-1">
                    <div className="text-rose-400 font-bold">
                      ❌ [FAIL] src/Component.ts
                    </div>
                    {auditResult.violations.map((v, i) => (
                      <div key={i} className="text-rose-300/90 pl-3">
                        &nbsp;&nbsp;Line {v.line}: {v.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-slate-400">
                  --------------------------------------------------
                </div>
                {auditResult.passed ? (
                  <div className="text-emerald-400 font-bold">
                    GATE VERDICT: PASS (0 violations detected) [Exit: 0]
                  </div>
                ) : (
                  <div className="text-rose-400 font-bold">
                    GATE VERDICT: REJECT ({auditResult.violations.length} violation(s) detected) [Exit: 1]
                  </div>
                )}
                <div className="text-slate-400">
                  --------------------------------------------------
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
