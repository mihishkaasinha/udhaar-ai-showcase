
import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', showTagline = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-12',
    md: 'w-24',
    lg: 'w-48',
    xl: 'w-64 md:w-80'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-5xl',
    xl: 'text-6xl md:text-7xl'
  };

  const taglineSizeClasses = {
    sm: 'text-[8px]',
    md: 'text-[10px]',
    lg: 'text-lg',
    xl: 'text-xl md:text-2xl'
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className} group cursor-default`}>
      <div className={`${sizeClasses[size]} aspect-square relative transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3`}>
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
          {/* Notes sticking out */}
          <rect x="180" y="80" width="80" height="120" rx="4" transform="rotate(15 180 80)" fill="#F4A261" />
          <path d="M195 105 L225 105" stroke="white" strokeWidth="4" strokeLinecap="round" transform="rotate(15 180 80)" opacity="0.4" />
          
          <rect x="140" y="90" width="80" height="120" rx="4" transform="rotate(-20 140 90)" fill="#074A59" />
          <path d="M155 115 L185 115" stroke="white" strokeWidth="4" strokeLinecap="round" transform="rotate(-20 140 90)" opacity="0.4" />

          <rect x="200" y="100" width="80" height="120" rx="4" transform="rotate(35 200 100)" fill="#E76F51" />
          <path d="M215 125 L245 125" stroke="white" strokeWidth="4" strokeLinecap="round" transform="rotate(35 200 100)" opacity="0.4" />

          {/* Speech Bubble */}
          <path d="M220 60 C220 43 238 30 260 30 C282 30 300 43 300 60 C300 71 292 81 280 86 L285 100 L265 90 C263 90 262 90 260 90 C238 90 220 77 220 60 Z" fill="#074A59" className="animate-pulse" />
          <circle cx="245" cy="60" r="4" fill="white" />
          <circle cx="260" cy="60" r="4" fill="white" />
          <circle cx="275" cy="60" r="4" fill="white" />

          {/* Rupee Coin in front of notes */}
          <circle cx="190" cy="180" r="45" fill="white" stroke="#074A59" strokeWidth="8" />
          <path d="M175 165 H205 M175 178 H205 M190 165 V195 M190 195 C180 195 175 188 175 188" stroke="#074A59" strokeWidth="6" strokeLinecap="round" />

          {/* The Gullak (Pot) */}
          <path d="M100 240 C100 180 300 180 300 240 L310 260 C330 300 330 380 200 380 C70 380 70 300 90 260 L100 240 Z" fill="#F4A261" stroke="#264653" strokeWidth="4" />
          <path d="M120 230 C120 215 280 215 280 230" stroke="#264653" strokeWidth="12" strokeLinecap="round" />
          <path d="M150 205 H250" stroke="#264653" strokeWidth="18" strokeLinecap="round" />
          
          {/* Pot Decorations */}
          <path d="M75 300 Q200 330 325 300" stroke="white" strokeWidth="12" strokeLinecap="round" opacity="0.6" />
          <circle cx="100" cy="320" r="8" fill="white" opacity="0.8" />
          <circle cx="130" cy="328" r="8" fill="white" opacity="0.8" />
          <circle cx="160" cy="332" r="8" fill="white" opacity="0.8" />
          <circle cx="200" cy="335" r="8" fill="white" opacity="0.8" />
          <circle cx="240" cy="332" r="8" fill="white" opacity="0.8" />
          <circle cx="270" cy="328" r="8" fill="white" opacity="0.8" />
          <circle cx="300" cy="320" r="8" fill="white" opacity="0.8" />

          {/* Terracotta Bottom Accent */}
          <path d="M90 260 C70 300 70 380 200 380 C330 380 330 300 310 260 L300 245 Q200 270 100 245 Z" fill="#D65A31" opacity="0.3" />
        </svg>
      </div>
      
      <div className="text-center">
        <h1 className={`${textSizeClasses[size]} font-[900] tracking-tighter text-[#074A59] dark:text-white uppercase italic leading-none`}>
          Udhaari
        </h1>
        {showTagline && (
          <p className={`${taglineSizeClasses[size]} font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mt-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors`}>
            Vasooli made civilized.
          </p>
        )}
      </div>
    </div>
  );
};

export default Logo;
