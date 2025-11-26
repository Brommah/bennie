import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Extraction Threat - Animated visualization of data extraction by big tech
 */

// Animated server visualization - compact version for mobile
const ExtractionDiagramSVG: React.FC = () => {
  return (
    <svg viewBox="0 0 400 320" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="redGlow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Title */}
      <text x="20" y="30" fill="#ef4444" fontSize="14" fontFamily="monospace" fontWeight="bold">
        <tspan fill="#ef4444">●</tspan> EXTRACTION MODEL
      </text>

      {/* Central server - the cloud */}
      <g filter="url(#redGlow)">
        <text x="200" y="70" textAnchor="middle" fill="#ef4444" fontSize="11" fontFamily="monospace" fontWeight="bold">
          THE CLOUD
        </text>
        <rect x="145" y="80" width="110" height="80" fill="#1c1917" stroke="#ef4444" strokeWidth="2" rx="4">
          <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
        </rect>
        {/* Server bars */}
        <rect x="155" y="90" width="80" height="12" fill="#ef4444" rx="2" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1.5s" repeatCount="indefinite"/>
        </rect>
        <rect x="155" y="107" width="80" height="12" fill="#ef4444" rx="2" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.4;0.7" dur="1.8s" repeatCount="indefinite"/>
        </rect>
        <rect x="155" y="124" width="80" height="12" fill="#ef4444" rx="2" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.3;0.5" dur="2s" repeatCount="indefinite"/>
        </rect>
        <rect x="155" y="141" width="80" height="12" fill="#ef4444" rx="2" opacity="0.3"/>
        
        {/* Dots on server */}
        <circle cx="245" cy="96" r="3" fill="#ef4444"/>
        <circle cx="245" cy="113" r="3" fill="#ef4444"/>
        <circle cx="245" cy="130" r="3" fill="#ef4444"/>
        <circle cx="245" cy="147" r="3" fill="#ef4444"/>
      </g>

      {/* Connection lines from users to cloud */}
      <line x1="200" y1="160" x2="90" y2="210" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5"/>
      <line x1="200" y1="160" x2="200" y2="210" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5"/>
      <line x1="200" y1="160" x2="310" y2="210" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5"/>

      {/* Animated particles going UP (extraction) */}
      {[90, 200, 310].map((x, i) => (
        <g key={i}>
          <circle r="5" fill="#ef4444">
            <animate attributeName="cx" values={`${x};200`} dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite"/>
            <animate attributeName="cy" values="210;160" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;1;0" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}

      {/* Users at bottom */}
      {[{ x: 90, data: ['PROFILE', 'LOCATION', 'HISTORY'] }, 
        { x: 200, data: ['PREFS', 'CONTACTS', 'MEDIA'] }, 
        { x: 310, data: ['SEARCH', 'PURCHASE', 'SOCIAL'] }].map((user, i) => (
        <g key={i}>
          {/* Phone outline */}
          <rect x={user.x - 35} y="215" width="70" height="90" fill="#27272a" stroke="#52525b" strokeWidth="1.5" rx="6"/>
          
          {/* Data items being extracted */}
          {user.data.map((item, j) => (
            <g key={j}>
              <rect x={user.x - 28} y={225 + j * 22} width="56" height="16" fill="#7f1d1d" rx="2" opacity="0.6"/>
              <text x={user.x} y={236 + j * 22} textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="monospace">
                {item}
              </text>
            </g>
          ))}
          
          {/* User label */}
          <text x={user.x} y="320" textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="monospace">
            USER_{String.fromCharCode(65 + i)}
          </text>
        </g>
      ))}

      {/* Warning text */}
      <text x="200" y="340" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="monospace" opacity="0.7">
        // YOUR DATA FLOWS UP
      </text>
    </svg>
  );
};

// Animated data leak counter
const DataLeakCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 1000) + 500);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-2xl md:text-4xl text-red-500 font-bold tabular-nums">
      {count.toLocaleString()} <span className="text-xs md:text-sm opacity-60">bytes leaked</span>
    </div>
  );
};

export const ExtractionThreat: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 md:py-32 px-6 bg-black relative overflow-hidden">
      {/* Red warning overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Scanning lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-full h-[2px] bg-red-500/20"
          animate={{ y: ['0vh', '100vh'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Diagram - show first on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-1 lg:order-2"
          >
            <div className="bg-zinc-950/50 border border-red-900/30 rounded-lg p-3 md:p-4">
              {/* Warning header */}
              <div className="absolute top-3 right-3 font-mono text-[8px] md:text-[9px] text-red-500/50">
                SYS_SECURE_ACTIVE
              </div>
              <ExtractionDiagramSVG />
            </div>

            {/* Glowing border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg blur-sm -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            {/* Warning badge */}
            <div className="flex items-center gap-3 text-red-500 font-black uppercase tracking-widest mb-4 md:mb-6 font-mono text-sm">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 md:w-6 md:h-6">
                <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>// THE_THREAT</span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase mb-6 leading-[0.9]">
              THEY ARE <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                STRIP-MINING
              </span> <br/>
              YOUR VIBE.
            </h2>

            <p className="text-lg md:text-2xl font-bold leading-tight mb-6 text-white">
              Ticketmaster and Spotify turned the rave into a spreadsheet.
            </p>

            {/* Error logs */}
            <div className="space-y-2 md:space-y-3 font-mono text-xs md:text-sm text-red-400/80 bg-zinc-950 border border-red-900/30 p-4 md:p-6">
              <div className="flex items-start gap-2 md:gap-3">
                <span className="text-red-500 shrink-0">&gt;</span>
                <span>User taste = "Behavioral Surplus"</span>
              </div>
              <div className="flex items-start gap-2 md:gap-3">
                <span className="text-red-500 shrink-0">&gt;</span>
                <span>Flatten subcultures to sell ads</span>
              </div>
              <div className="flex items-start gap-2 md:gap-3">
                <span className="text-red-500 shrink-0">&gt;</span>
                <DataLeakCounter />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExtractionThreat;
