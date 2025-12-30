
import React, { useState, useEffect } from 'react';

const WITTY_TEXTS = [
  "Sharpening the collection arrows...",
  "Consulting the ledger stars...",
  "Calculating the 'Bura Na Maane' factor...",
  "Drafting the perfect khadoos nudge...",
  "Munna Bhai is brainstorming recovery tactics...",
  "Polishing your digital reputation...",
  "Analyzing payment probability...",
  "Setting up the situation room...",
  "Convincing the CA that it's Monday morning...",
  "Tracking the check that's 'already in the mail'...",
  "Polishing the 'Gentle' in Gentle Reminder...",
  "Finding the right emoji for 'Urgently pay up'...",
  "Practicing the perfect follow-up cough...",
  "Translating 'I'll pay tomorrow' into actual reality...",
];

const WittyLoader: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % WITTY_TEXTS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 space-y-12 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[3rem] border border-white/40 dark:border-slate-800 shadow-2xl shadow-indigo-100/50 dark:shadow-none transition-colors duration-700">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer Orbitals */}
        <div className="absolute inset-0 border-[3px] border-indigo-100/50 dark:border-indigo-900/30 rounded-full animate-spin [animation-duration:8s]"></div>
        <div className="absolute inset-2 border-[2px] border-dashed border-pink-200/50 dark:border-pink-900/30 rounded-full animate-spin [animation-duration:12s] [animation-direction:reverse]"></div>
        
        {/* Spinning Rings */}
        <div className="absolute inset-0 border-[6px] border-indigo-600 dark:border-indigo-400 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute -inset-2 border-[2px] border-pink-400 dark:border-pink-500 rounded-full border-b-transparent animate-spin [animation-duration:3s]"></div>
        
        {/* Central Icon with Coin Flip Effect */}
        <div className="relative z-10 flex items-center justify-center animate-coin">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center border-4 border-white/20 dark:border-slate-700">
            <span className="text-3xl text-white drop-shadow-md">💰</span>
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-4 max-w-sm">
        <div className="h-16 flex items-center justify-center">
          <p className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent transition-all duration-700 animate-pulse-soft">
            {WITTY_TEXTS[textIndex]}
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-slate-400 dark:text-slate-500 font-extrabold text-[10px] uppercase tracking-[0.3em]">Processing Intelligence</p>
          <div className="w-48 h-1 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 origin-left animate-[loading_2s_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WittyLoader;
