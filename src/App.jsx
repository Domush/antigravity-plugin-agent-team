import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TeamRoster from './components/TeamRoster';
import PipelineFlow from './components/PipelineFlow';
import Simulator from './components/Simulator';
import AuditGateDemo from './components/AuditGateDemo';
import GovernanceLaws from './components/GovernanceLaws';
import Installation from './components/Installation';
import Changelog from './components/Changelog';
import Faq from './components/Faq';
import Footer from './components/Footer';
import { Check, Copy } from 'lucide-react';

export default function App() {
  const [toastMessage, setToastMessage] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopyCommand = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setToastMessage(`Copied to clipboard: ${text}`);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    }).catch(() => {
      // Fallback
      setCopied(true);
      setToastMessage('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setToastMessage(null), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-brand-cyan/60 text-slate-100 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-800">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono font-medium max-w-xs truncate">
            {toastMessage}
          </span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar onCopyCommand={handleCopyCommand} copied={copied} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero onCopyCommand={handleCopyCommand} copied={copied} />
        <TeamRoster />
        <PipelineFlow />
        <Simulator />
        <AuditGateDemo />
        <GovernanceLaws />
        <Installation onCopyCommand={handleCopyCommand} copied={copied} />
        <Changelog />
        <Faq />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
