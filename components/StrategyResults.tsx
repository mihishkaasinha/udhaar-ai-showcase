
import React from 'react';
import { AIResponse, UrgencyLevel } from '../types';

interface Props {
  strategy: AIResponse;
  onMarkAsPaid: () => void;
}

const ProbabilityGauge: React.FC<{ percentage: number }> = ({ percentage }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  let color = "#f43f5e"; // Rose
  if (percentage > 40) color = "#f59e0b"; // Amber
  if (percentage > 75) color = "#10b981"; // Emerald

  return (
    <div className="relative flex items-center justify-center w-36 h-36 group">
      <div className="absolute inset-0 bg-white/5 dark:bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors"></div>
      <svg className="w-full h-full transform -rotate-90 filter drop-shadow-md relative z-10">
        <circle
          cx="72" cy="72" r={radius}
          stroke="currentColor"
          className="text-slate-100 dark:text-slate-800"
          strokeWidth="10"
          fill="transparent"
        />
        <circle
          cx="72" cy="72" r={radius}
          stroke={color}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-[1.5s] ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center z-20">
        <span className="text-3xl font-black text-slate-900 dark:text-slate-100 leading-none tracking-tighter animate-in fade-in duration-1000 delay-500">{percentage}%</span>
        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Success</span>
      </div>
    </div>
  );
};

const UrgencyBadge: React.FC<{ level: UrgencyLevel }> = ({ level }) => {
  const styles = {
    High: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50',
    Medium: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/50',
    Low: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50',
  };

  return (
    <div className={`px-4 py-2 rounded-2xl border-2 text-[10px] font-black uppercase tracking-[0.2em] ${styles[level]} shadow-sm`}>
      {level} Alert
    </div>
  );
};

const ActionCard: React.FC<{ 
  title: string; 
  icon: string; 
  content: string; 
  theme: string;
  isCall?: boolean;
}> = ({ title, icon, content, theme, isCall }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const themeClasses = {
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-100 hover:shadow-emerald-100/40 dark:hover:shadow-emerald-900/20",
    indigo: "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30 text-indigo-900 dark:text-indigo-100 hover:shadow-indigo-100/40 dark:hover:shadow-indigo-900/20",
    rose: "bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30 text-rose-900 dark:text-rose-100 hover:shadow-rose-100/40 dark:hover:shadow-rose-900/20",
  }[theme];

  const accentColor = {
    emerald: "bg-emerald-500",
    indigo: "bg-indigo-600",
    rose: "bg-rose-500",
  }[theme];

  return (
    <div className={`group rounded-[2rem] border-2 transition-all duration-500 p-8 flex flex-col h-full relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl ${themeClasses}`}>
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 ${accentColor} rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-black/5 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
            {icon}
          </div>
          <h3 className="font-black text-xl tracking-tight uppercase group-hover:translate-x-1 transition-transform">{title}</h3>
        </div>
        <button
          onClick={handleCopy}
          className={`px-6 py-2 rounded-xl text-xs font-black tracking-widest transition-all shadow-md active:scale-90 ${copied ? 'bg-green-500 text-white animate-in zoom-in-50 duration-200' : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
        >
          {copied ? 'COPIED ✓' : 'COPY'}
        </button>
      </div>

      <div className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl p-6 text-[15px] leading-relaxed font-semibold border border-white/50 dark:border-slate-800 min-h-[160px] relative z-10 shadow-inner group-hover:bg-white dark:group-hover:bg-slate-800 transition-colors ${isCall ? 'italic' : ''}`}>
        {content}
      </div>
    </div>
  );
};

const StrategyResults: React.FC<Props> = ({ strategy, onMarkAsPaid }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
      {/* High Level Analysis Section */}
      <div className="bg-slate-900 dark:bg-slate-900 text-white rounded-[3rem] p-10 md:p-14 shadow-3xl relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] group-hover:bg-indigo-500/30 transition-colors duration-1000"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-500/20 rounded-full blur-[100px] group-hover:bg-rose-500/30 transition-colors duration-1000"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] p-4 border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-500">
            <ProbabilityGauge percentage={strategy.payment_probability} />
          </div>
          
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-6 justify-center md:justify-start">
              <h2 className="text-4xl font-black tracking-tighter">The Game Plan</h2>
              <UrgencyBadge level={strategy.urgency} />
            </div>
            <p className="text-slate-300 text-xl font-semibold leading-relaxed max-w-2xl italic animate-in fade-in slide-in-from-left-4 duration-1000 delay-300">
              "{strategy.analysis}"
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <span className="text-xs font-black text-white uppercase tracking-widest bg-indigo-600 px-5 py-2 rounded-full shadow-lg shadow-indigo-900/40 hover:scale-110 transition-transform cursor-default">Primary: {strategy.recommended_channel}</span>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest border border-slate-700 px-5 py-2 rounded-full italic hover:bg-slate-800 transition-colors cursor-default">Relation-First Mode</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mark as Paid Action */}
      <div className="flex justify-center">
        <button
          onClick={onMarkAsPaid}
          className="group relative px-12 py-8 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-[900] text-3xl rounded-[2.5rem] shadow-2xl shadow-emerald-200 dark:shadow-none transition-all transform hover:-translate-y-2 active:scale-95 flex items-center gap-6 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-4">
            <span className="text-4xl group-hover:rotate-12 transition-transform">✅</span>
            Mark as Paid
          </span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>

      {/* The Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ActionCard 
          title="WhatsApp" 
          icon="💬" 
          content={strategy.messages.whatsapp} 
          theme="emerald" 
        />
        <ActionCard 
          title="Formal Mail" 
          icon="📨" 
          content={strategy.messages.email} 
          theme="indigo" 
        />
        <ActionCard 
          title="Phone Script" 
          icon="🎙️" 
          content={strategy.messages.call_script} 
          theme="rose" 
          isCall
        />
      </div>

      {/* Logic and Tactical Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border-2 border-slate-50 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 group">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-3xl flex items-center justify-center text-3xl font-bold shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform">
              🧠
            </div>
            <h3 className="font-black text-2xl text-slate-900 dark:text-white tracking-tight uppercase">AI Rational</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-bold text-lg leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
            {strategy.reasoning}
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 dark:from-slate-900 dark:to-slate-950 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-200/50 dark:shadow-none hover:shadow-indigo-300 dark:hover:shadow-indigo-900/20 transition-all duration-500 group border border-white/5 dark:border-slate-800">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md text-white rounded-3xl flex items-center justify-center text-3xl font-bold border border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-transform">
              ⚡
            </div>
            <h3 className="font-black text-2xl tracking-tight uppercase">Next Maneuvers</h3>
          </div>
          <ul className="space-y-5">
            {strategy.next_steps.map((step, i) => (
              <li key={i} className="flex items-start gap-5 group/item">
                <span className="flex-shrink-0 w-8 h-8 rounded-2xl bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 flex items-center justify-center text-sm font-black shadow-lg group-hover/item:scale-125 transition-transform">
                  {i + 1}
                </span>
                <span className="text-white font-bold text-base leading-snug pt-1 opacity-80 group-hover/item:opacity-100 transition-opacity">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StrategyResults;
