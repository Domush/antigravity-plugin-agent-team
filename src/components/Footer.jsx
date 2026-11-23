import React from 'react';
import { Github, ArrowUp, Terminal, Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border border-slate-800">
                <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="64,14 108,38 108,90 64,114 20,90 20,38" fill="#0f172a" stroke="#00D2FF" strokeWidth="6" strokeLinejoin="round" />
                  <circle cx="64" cy="64" r="8" fill="#ffffff" stroke="#00D2FF" strokeWidth="3" />
                  <circle cx="64" cy="36" r="5" fill="#00D2FF" />
                  <circle cx="38" cy="52" r="5" fill="#4CC9F0" />
                  <circle cx="90" cy="52" r="5" fill="#4CC9F0" />
                  <circle cx="38" cy="82" r="5" fill="#B5179E" />
                  <circle cx="90" cy="82" r="5" fill="#B5179E" />
                  <circle cx="64" cy="98" r="5" fill="#F72585" />
                </svg>
              </div>
              <span className="font-bold text-slate-200 text-base">
                Autonomous Agent Team
              </span>
            </div>
            <p className="max-w-sm text-slate-400 leading-relaxed">
              Official Google Antigravity plugin for orchestrating multi-disciplinary autonomous agents with zero-stub adversarial delivery pipelines.
            </p>
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Governed by P0 Universal Operational Laws</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase text-white mb-3 tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#roster" className="hover:text-white transition-colors">Team Roster (6 Agents)</a></li>
              <li><a href="#pipeline" className="hover:text-white transition-colors">5-Stage Pipeline</a></li>
              <li><a href="#simulator" className="hover:text-white transition-colors">Interactive Simulator</a></li>
              <li><a href="#audit-gate" className="hover:text-white transition-colors">Audit Gate Playground</a></li>
              <li><a href="#governance" className="hover:text-white transition-colors">Governance Standards</a></li>
              <li><a href="#install" className="hover:text-white transition-colors">CLI Installation</a></li>
            </ul>
          </div>

          {/* Community & Ecosystem */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase text-white mb-3 tracking-wider">
              Ecosystem
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/Domush/antigravity-plugin-agent-team"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Domush/antigravity-plugin-context-mode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Antigravity Context Mode
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/antigravity-plugin-agent-team"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  npm Registry Package
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#changelog" className="hover:text-white transition-colors">
                  Changelog (v1.0.0)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400">
            © {new Date().getFullYear()} Autonomous Agent Team Contributors. Open-source under MIT License.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            title="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
