import React, { useState, useEffect } from 'react';
import { Terminal, Github, Menu, X, Check, Copy, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

export default function Navbar({ onCopyCommand, copied }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [version, setVersion] = useState('1.0.0');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Attempt to fetch current version from npm registry
    fetch('https://registry.npmjs.org/antigravity-plugin-agent-team/latest')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (data && data.version) {
          setVersion(data.version);
        }
      })
      .catch(() => {
        // Fallback to static 1.0.0
        setVersion('1.0.0');
      });
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'Roster', href: '#roster' },
    { label: 'Pipeline', href: '#pipeline' },
    { label: 'Simulator', href: '#simulator' },
    { label: 'Audit Gate', href: '#audit-gate' },
    { label: 'Governance', href: '#governance' },
    { label: 'Install', href: '#install' },
    { label: 'Changelog', href: '#changelog' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Brand */}
          <a href="#hero" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:border-brand-cyan/60 transition-colors shadow-inner">
              <svg className="w-7 h-7" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="64,14 108,38 108,90 64,114 20,90 20,38" fill="#0f172a" stroke="#00D2FF" strokeWidth="6" strokeLinejoin="round" />
                <line x1="64" y1="36" x2="38" y2="52" stroke="#4CC9F0" strokeWidth="3" opacity="0.9" />
                <line x1="64" y1="36" x2="90" y2="52" stroke="#4CC9F0" strokeWidth="3" opacity="0.9" />
                <line x1="38" y1="52" x2="38" y2="82" stroke="#7B2CBF" strokeWidth="3" opacity="0.9" />
                <line x1="90" y1="52" x2="90" y2="82" stroke="#7B2CBF" strokeWidth="3" opacity="0.9" />
                <line x1="38" y1="82" x2="64" y2="98" stroke="#F72585" strokeWidth="3" opacity="0.9" />
                <line x1="90" y1="82" x2="64" y2="98" stroke="#F72585" strokeWidth="3" opacity="0.9" />
                <circle cx="64" cy="64" r="8" fill="#ffffff" stroke="#00D2FF" strokeWidth="3" />
                <circle cx="64" cy="36" r="5" fill="#00D2FF" />
                <circle cx="38" cy="52" r="5" fill="#4CC9F0" />
                <circle cx="90" cy="52" r="5" fill="#4CC9F0" />
                <circle cx="38" cy="82" r="5" fill="#B5179E" />
                <circle cx="90" cy="82" r="5" fill="#B5179E" />
                <circle cx="64" cy="98" r="5" fill="#F72585" />
              </svg>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple opacity-0 group-hover:opacity-30 blur transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-100 text-base md:text-lg tracking-tight group-hover:text-brand-cyan transition-colors">
                Agent Team
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                Antigravity Plugin
              </span>
            </div>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-slate-800/80 text-brand-sky border border-slate-700/60 ml-1">
              v{version}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => onCopyCommand('npx antigravity-plugin-agent-team install')}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-brand-cyan/60 transition-all shadow-sm"
              title="Copy install command"
            >
              <Terminal className="w-3.5 h-3.5 text-brand-cyan" />
              <span>npx ... install</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 ml-1" />
              )}
            </button>

            <a
              href="https://github.com/Domush/antigravity-plugin-agent-team"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
              aria-label="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <a
              href="https://github.com/Domush/antigravity-plugin-agent-team"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white rounded-lg"
              aria-label="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                onCopyCommand('npx antigravity-plugin-agent-team install');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-medium rounded-lg bg-slate-900 text-slate-200 border border-slate-700 hover:border-brand-cyan transition-colors"
            >
              <Terminal className="w-4 h-4 text-brand-cyan" />
              <span>npx antigravity-plugin-agent-team install</span>
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
