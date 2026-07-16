import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Activity, CircleDollarSign, Loader2, MapPin, Send, Trophy } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analysis');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans p-4">
      <div className="flex-grow flex flex-col w-full max-w-5xl mx-auto h-full">
        {/* Global Status Header */}
        <header className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 w-2 h-8 rounded-full"></div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">ApexArena <span className="text-emerald-400">Orchestrator</span></h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Core Reasoning Engine // v4.2.0-Alpha</p>
            </div>
          </div>
          <div className="hidden md:flex gap-6">
            <div className="text-right">
              <p className="text-[10px] text-slate-500 uppercase">Current Franchise</p>
              <p className="text-sm font-semibold">Metropolis Titans</p>
            </div>
            <div className="text-right border-l border-slate-800 pl-6">
              <p className="text-[10px] text-slate-500 uppercase">Market Cap Position</p>
              <p className="text-sm font-semibold text-emerald-400">Top 4% ($2.1B)</p>
            </div>
            <div className="text-right border-l border-slate-800 pl-6">
              <p className="text-[10px] text-slate-500 uppercase">Engine Status</p>
              <p className="text-sm font-semibold text-cyan-400">Operational</p>
            </div>
          </div>
        </header>

        {/* Main Operational Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-grow min-h-[400px]">
          
          {/* Pillar 1: Operational Pillars (mapped to Scouting in design) */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 flex flex-col">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Operational Pillars
              </h2>
              <span className="text-[10px] text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded">High Precision</span>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-800/40 p-2 rounded border border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-3 h-3 text-cyan-400" />
                  <span className="text-[11px] font-bold text-slate-300 uppercase">Scouting & Analytics</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Player metrics, injury history, undervalued talent.</p>
              </div>
              <div className="bg-slate-800/40 p-2 rounded border border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span className="text-[11px] font-bold text-slate-300 uppercase">Venue & Ticketing</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Sales velocity, dynamic pricing, demand matching.</p>
              </div>
              <div className="bg-slate-800/40 p-2 rounded border border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <CircleDollarSign className="w-3 h-3 text-indigo-400" />
                  <span className="text-[11px] font-bold text-slate-300 uppercase">Sponsorship & Revenue</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Corporate pairings, ROI valuation models.</p>
              </div>
              <div className="mt-auto pt-4">
                <p className="text-[10px] text-slate-500 mb-1 font-mono uppercase">Scouting Pipeline Status</p>
                <div className="h-12 border-l-2 border-dashed border-slate-700 ml-1 pl-3 flex flex-col justify-between">
                  <div className="text-[10px] text-slate-400">Telemetric Sync Active (142 sources)</div>
                  <div className="text-[10px] text-slate-400 italic">Next Roster Update: 14:00 GMT</div>
                </div>
              </div>
            </div>
          </section>

          {/* Input Area (Spans 2 columns, mapped to Data Input) */}
          <section className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-lg p-3 flex flex-col">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Data Input Stream
              </h2>
              <span className="text-[10px] text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded">Awaiting Telemetry</span>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow min-h-0">
              <div className="bg-slate-800/40 rounded border border-slate-700/50 flex flex-col flex-grow relative p-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste telemetry, fan metrics, or venue logistics JSON/text here..."
                  className="w-full h-full flex-grow bg-transparent p-3 text-slate-300 placeholder:text-slate-600 focus:outline-none resize-none font-mono text-[11px] leading-relaxed"
                />
              </div>
              <div className="mt-3 flex justify-between items-center shrink-0">
                <div className="text-[10px] text-slate-500 font-mono uppercase flex items-center gap-2">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  Ready to process stream
                </div>
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex items-center gap-2 px-4 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 border border-indigo-500/30 rounded text-[10px] font-bold uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3" />
                      Analyze Data
                    </>
                  )}
                </button>
              </div>
            </form>
            {error && (
              <div className="mt-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 py-2 rounded text-[10px] flex items-center gap-2 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                {error}
              </div>
            )}
          </section>
        </div>

        {/* Formal Management Proposal Footer (Appears when result exists) */}
        {result && (
          <footer className="mt-4 shrink-0 bg-white text-slate-900 rounded-lg p-5 flex flex-col gap-4 border-t-4 border-emerald-500">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-2 shrink-0">
               <span className="text-[10px] font-black uppercase text-slate-500">Formal Management Proposal</span>
               <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">95% Confidence Interval Reached</span>
            </div>
            
            <div className="text-xs leading-relaxed space-y-3 
              [&_strong]:text-[10px] [&_strong]:font-black [&_strong]:uppercase [&_strong]:text-slate-500 [&_strong]:block [&_strong]:border-b [&_strong]:border-slate-200 [&_strong]:mb-1 [&_strong]:pb-1 [&_strong]:mt-4 first:[&_strong]:mt-0
              [&_h1]:text-slate-800 [&_h1]:font-bold [&_h1]:text-lg [&_h1]:mb-3 
              [&_h2]:text-slate-800 [&_h2]:font-bold [&_h2]:text-md [&_h2]:mb-2 
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 
              [&_li]:text-slate-700 
              [&_p]:mb-2 last:[&_p]:mb-0
              [&_p]:font-medium [&_p]:text-slate-800">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
            
            <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-100 shrink-0">
              <span>AUTHORIZATION REQUIRED // FRONT OFFICE DIRECTIVE</span>
              <span>TIMESTAMP: {new Date().toISOString().split('T')[0]} // AUTH_ID: APX-{Math.floor(Math.random() * 900) + 100}-TX</span>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
