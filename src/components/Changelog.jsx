import React, { useState } from 'react';
import { CHANGELOG_ITEMS } from '../data/changelogData';
import { History, Search, Tag, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Changelog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Release', 'Agents', 'Governance', 'Tooling'];

  const filteredItems = CHANGELOG_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.version.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.highlights.some(h =>
        h.section.toLowerCase().includes(query) ||
        h.items.some(i => i.toLowerCase().includes(query))
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="changelog" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-brand-purple text-xs font-mono font-medium mb-3">
            <History className="w-3.5 h-3.5" />
            <span>Release History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Changelog & Updates
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Track all improvements, governance revisions, and feature rollouts across the agent team ecosystem.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search release notes..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-brand-cyan/60"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-center overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-brand-cyan font-bold border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Changelog Entries */}
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800 text-slate-400">
              No matching releases found for "{searchQuery}".
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.version}
                className="glass-panel rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-3 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl font-extrabold text-white font-mono">
                        v{item.version}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-cyan-950/60 text-cyan-300 border border-cyan-800/80">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-200">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 self-start sm:self-center">
                    <Calendar className="w-4 h-4 text-brand-purple" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  {item.summary}
                </p>

                {/* Highlights Sections */}
                <div className="space-y-6">
                  {item.highlights.map((h, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-4 sm:p-5 rounded-xl border border-slate-800/80">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800 text-brand-sky border border-slate-700">
                          {h.badge}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {h.section}
                        </h4>
                      </div>
                      <ul className="space-y-2">
                        {h.items.map((it, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                            <span className="text-brand-cyan font-bold mt-0.5">•</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
