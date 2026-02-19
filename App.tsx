
import React, { useState } from 'react';
import { HookStyle } from './types';
import { improveHook } from './services/geminiService';
import { HookCard } from './components/HookCard';

const App: React.FC = () => {
  const [hook, setHook] = useState('');
  const [style, setStyle] = useState<HookStyle>(HookStyle.Viral);
  const [loading, setLoading] = useState(false);
  const [improvedHooks, setImprovedHooks] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleImprove = async () => {
    if (!hook.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const results = await improveHook(hook, style);
      setImprovedHooks(results);
      setTimeout(() => {
        const resultsHeader = document.getElementById('results-section');
        if (resultsHeader) {
          resultsHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      setError('Something went wrong. Please check your API key or try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const CHAR_LIMIT = 500;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] selection:bg-[#2E5CFF] selection:text-white">
      <div className="max-w-[720px] mx-auto px-6 pt-[120px] pb-20">
        
        {/* Hero Section */}
        <header className="mb-[120px] text-center">
          <h1 className="font-serif italic font-black text-6xl md:text-[64px] text-white leading-[1.1] mb-5 tracking-tight animate-slide-up">
            Hooks That<br />Actually Work
          </h1>
          <p className="font-sans text-[#A0A0A0] text-[0.95rem] max-w-[480px] mx-auto leading-relaxed mb-8">
            AI-powered refinement for creators who demand better. 
            Paste your hook, pick a style, get results that convert.
          </p>
          <div className="w-[60px] h-[3px] bg-[#2E5CFF] mx-auto rounded-none" />
        </header>

        {/* Form Section */}
        <div className="space-y-12">
          {/* Hook Input Area */}
          <div>
            <label className="block text-[#A0A0A0] text-[0.75rem] font-medium uppercase tracking-[0.15em] mb-3">
              Your Hook
            </label>
            <textarea
              value={hook}
              onChange={(e) => setHook(e.target.value.slice(0, CHAR_LIMIT))}
              placeholder="Paste your existing hook here..."
              className="w-full h-[140px] px-6 py-5 bg-[#141414] border border-[#2A2A2A] sharp-edge text-[#FAFAFA] placeholder-[#4A4A4A] focus:outline-none focus:border-[#2E5CFF] transition-all duration-200 text-[0.95rem] leading-relaxed"
            />
            <div className="text-[#4A4A4A] text-[0.7rem] text-right mt-2 font-medium tracking-wider">
              {hook.length} / {CHAR_LIMIT}
            </div>
          </div>

          {/* Style and Action Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div>
              <label className="block text-[#A0A0A0] text-[0.75rem] font-medium uppercase tracking-[0.15em] mb-3">
                Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as HookStyle)}
                className="w-full px-5 py-4 bg-[#141414] border border-[#2A2A2A] sharp-edge text-[#FAFAFA] cursor-pointer focus:outline-none focus:border-[#2E5CFF] transition-all duration-200 text-[0.95rem]"
              >
                {Object.values(HookStyle).map((s) => (
                  <option key={s} value={s} className="bg-[#141414]">{s}</option>
                ))}
              </select>
            </div>

            <div>
              <button
                onClick={handleImprove}
                disabled={loading || !hook.trim()}
                className={`
                  w-full py-[18px] sharp-edge font-sans font-semibold text-[0.85rem] uppercase tracking-[0.1em]
                  transition-all duration-200 shadow-none
                  ${loading || !hook.trim()
                    ? 'bg-[#2A2A2A] text-[#4A4A4A] cursor-not-allowed border-none'
                    : 'bg-[#2E5CFF] text-white hover:bg-[#1E4CDF] hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(46,92,255,0.3)] active:translate-y-0'
                  }
                `}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2 animate-pulse">
                    Improving...
                  </span>
                ) : (
                  'Improve Hook'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="mt-12 p-6 bg-[#1A1A1A] border border-red-900/50 sharp-edge animate-slide-up">
            <p className="text-red-400 text-[0.85rem] font-medium leading-relaxed">
              {error}
            </p>
          </div>
        )}

        {/* Results Section */}
        {improvedHooks.length > 0 && (
          <div id="results-section" className="mt-[80px]">
            <h3 className="text-[#A0A0A0] text-[0.75rem] font-medium uppercase tracking-[0.15em] mb-8">
              Improved Hooks / {style}
            </h3>
            
            <div className="space-y-6">
              {improvedHooks.map((h, i) => (
                <HookCard key={i} hook={h} index={i} />
              ))}
            </div>

            <div className="mt-20 text-center">
              <button 
                onClick={() => {
                  setHook('');
                  setImprovedHooks([]);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#4A4A4A] hover:text-[#2E5CFF] text-[0.75rem] font-semibold uppercase tracking-[0.15em] transition-colors duration-200"
              >
                Reset Workshop
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-[120px] pt-12 border-t border-[#1A1A1A] text-center">
          <p className="text-[#3D4659] text-[0.7rem] font-medium uppercase tracking-[0.2em]">
            Precision Hook Engineering &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
