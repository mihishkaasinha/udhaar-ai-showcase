
import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import InputForm from './components/InputForm';
import StrategyResults from './components/StrategyResults';
import WittyLoader from './components/WittyLoader';
import Logo from './components/Logo';
import { RecoveryInput, AIResponse } from './types';
import { generateCollectionStrategy } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<AIResponse | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Initialize theme based on preference or system
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
    setIsMounted(true);
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSubmit = async (data: RecoveryInput) => {
    setLoading(true);
    setStrategy(null);
    try {
      const result = await generateCollectionStrategy(data);
      setStrategy(result);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    } catch (error) {
      console.error("Collection analysis failed:", error);
      alert("AI had a ledger malfunction. Even our Chanakya Engine has bad days. Try refreshing!");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = () => {
    // Trigger celebration with Indian flag colors + extra vibrance
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#FF9933', '#FFFFFF', '#138808', '#ec4899', '#6366f1'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    setShowSuccessOverlay(true);
    
    setTimeout(() => {
      setShowSuccessOverlay(false);
      setStrategy(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3000);
  };

  return (
    <div className={`min-h-screen selection:bg-indigo-500 selection:text-white pb-20 transition-all duration-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Success Overlay */}
      {showSuccessOverlay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="text-center space-y-6 animate-in zoom-in-50 duration-500">
            <div className="text-9xl mb-4 drop-shadow-2xl animate-float">💰</div>
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
              Cha-ching<span className="text-gradient">!</span>
            </h2>
            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Party time! Who's next?</p>
          </div>
        </div>
      )}

      {/* Dynamic Background with Indian-inspired Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Saffron Blob */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-orange-400/20 dark:bg-orange-500/10 blur-[120px] animate-pulse"></div>
        {/* Magenta/Indigo Blob */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-pink-400/20 dark:bg-pink-500/10 blur-[120px] animate-pulse [animation-delay:2s]"></div>
        {/* Emerald Blob */}
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 blur-[100px] animate-pulse [animation-delay:4s]"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <header className="pt-12 pb-24 px-6 text-center animate-in fade-in slide-in-from-top-8 duration-1000">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex justify-end mb-4">
              <button 
                onClick={toggleDarkMode}
                className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl hover:scale-110 active:scale-95 transition-all group focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? (
                  <span className="text-xl group-hover:rotate-12 transition-transform block">☀️</span>
                ) : (
                  <span className="text-xl group-hover:-rotate-12 transition-transform block">🌙</span>
                )}
              </button>
            </div>

            <Logo size="xl" />
            
            <p className="text-xl md:text-2xl font-extrabold text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Stop chasing payments manually. Let AI be your <span className="text-gradient font-black underline decoration-indigo-200/50">Professional Vasooli Agent.</span>
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
              {["Chanakya Engine", "Tone Calibration", "Settlement Tracking"].map(pill => (
                <span key={pill} className="px-5 py-2.5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-indigo-100 dark:border-indigo-900/50 text-xs font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-widest shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-default">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 -mt-10">
          <div className="max-w-4xl mx-auto mb-20">
            {!strategy && !loading && (
              <div className="mb-10 text-center space-y-2 animate-in fade-in duration-700 delay-500">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">The Situation Room</h2>
                <p className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px] tracking-widest italic">Input your intel. Get your ammunition.</p>
              </div>
            )}
            
            {!strategy && !loading && <InputForm onSubmit={handleSubmit} isLoading={loading} />}
            
            {loading && <WittyLoader />}
          </div>

          {/* Result Zone */}
          {strategy && (
            <div ref={resultsRef} className="pb-24 space-y-16">
              <StrategyResults strategy={strategy} onMarkAsPaid={handleMarkAsPaid} />
              
              <div className="flex flex-col items-center gap-8 py-16">
                <button 
                  onClick={() => {
                    setStrategy(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-10 py-5 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-black rounded-[2rem] hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700"
                >
                  <span>Chase Another Payment</span>
                  <span className="text-2xl animate-float">💰</span>
                </button>
                <p className="text-xs font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.5em] animate-pulse">Victory is near.</p>
              </div>
            </div>
          )}

          {/* Value Props */}
          {!loading && !strategy && (
            <section className="py-24 grid grid-cols-1 md:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
              {[
                { icon: "🛡️", title: "Relationship Shield", text: "Politely firm messages that get you paid without making enemies." },
                { icon: "⚡", title: "Cashflow Boost", text: "Drastically reduce wait times with psychological nudge triggers." },
                { icon: "🎯", title: "Excuses Filter", text: "AI-generated counter-arguments for 'Owner is out' or 'CA on leave'." }
              ].map((prop, i) => (
                <div key={i} className="group bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-white/40 dark:border-slate-800 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:bg-white dark:hover:bg-slate-900">
                  <div className="text-5xl mb-8 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500 origin-left">{prop.icon}</div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{prop.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed">{prop.text}</p>
                </div>
              ))}
            </section>
          )}
        </main>

        <footer className="mt-32 border-t border-slate-100 dark:border-slate-900 bg-white/30 dark:bg-slate-950/30 backdrop-blur-xl py-16 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <Logo size="sm" showTagline={false} className="!items-start" />
            
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex items-center gap-8">
                {["Terms", "Privacy", "Security", "Support"].map(link => (
                  <a key={link} href="#" className="text-xs font-black text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 uppercase tracking-widest transition-colors relative group">
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                  </a>
                ))}
              </div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Built for the Indian B2B Hustle • © 2025 <span className="text-gradient">Udhaari AI</span></p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
