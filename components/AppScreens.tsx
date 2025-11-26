
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, MapPin, Calendar, ShoppingCart, Radio, 
  ArrowUpRight, Ticket, ChevronRight, Lock, 
  Disc, Check, Music, AudioLines, Plus, X, Play, RefreshCw, Users, Heart, ShieldCheck
} from 'lucide-react';

// =============================================================================
// SHARED SVG COMPONENTS - Sophisticated Visualizations
// =============================================================================

/** Animated Waveform Visualization */
const WaveformSVG: React.FC<{ color?: string; bars?: number; height?: number }> = ({ 
  color = '#84cc16', 
  bars = 32,
  height = 40 
}) => {
  const [amplitudes, setAmplitudes] = useState<number[]>([]);

  useEffect(() => {
    const generate = () => Array(bars).fill(0).map(() => 0.2 + Math.random() * 0.8);
    setAmplitudes(generate());
    const interval = setInterval(() => setAmplitudes(generate()), 100);
    return () => clearInterval(interval);
  }, [bars]);

  return (
    <svg viewBox={`0 0 ${bars * 4} ${height}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {amplitudes.map((amp, i) => (
        <rect
          key={i}
          x={i * 4}
          y={height / 2 - (amp * height) / 2}
          width="2"
          height={amp * height}
          fill="url(#waveGrad)"
          rx="1"
        />
      ))}
    </svg>
  );
};

/** Neural Network Connection Background */
const NeuralNetworkBG: React.FC<{ nodeCount?: number; color?: string }> = ({ 
  nodeCount = 12, 
  color = '#84cc16' 
}) => {
  const nodes = useMemo(() => 
    Array(nodeCount).fill(0).map((_, i) => ({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      id: i,
      delay: Math.random() * 2
    })), [nodeCount]);

  const connections = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach((other) => {
        const dist = Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2));
        if (dist < 35) {
          lines.push({ x1: node.x, y1: node.y, x2: other.x, y2: other.y });
        }
      });
    });
    return lines;
  }, [nodes]);

  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <defs>
        <filter id="neuralGlow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {connections.map((conn, i) => (
        <line
          key={i}
          x1={`${conn.x1}%`}
          y1={`${conn.y1}%`}
          x2={`${conn.x2}%`}
          y2={`${conn.y2}%`}
          stroke={color}
          strokeWidth="0.3"
          opacity="0.2"
        />
      ))}
      {nodes.map((node) => (
        <g key={node.id}>
          <circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="1.5"
            fill={color}
            opacity="0.4"
            filter="url(#neuralGlow)"
          >
            <animate
              attributeName="opacity"
              values="0.2;0.6;0.2"
              dur={`${2 + node.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
};

/** Radar Scan Visualization */
const RadarScanSVG: React.FC<{ size?: number; color?: string }> = ({ 
  size = 200, 
  color = '#84cc16' 
}) => {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="70%" stopColor={color} stopOpacity="0.05" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <filter id="radarGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Concentric rings */}
      {[30, 50, 70, 90].map((r, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity={0.2 - i * 0.03}
        />
      ))}
      
      {/* Cross lines */}
      <line x1="100" y1="10" x2="100" y2="190" stroke={color} strokeWidth="0.5" opacity="0.15" />
      <line x1="10" y1="100" x2="190" y2="100" stroke={color} strokeWidth="0.5" opacity="0.15" />
      
      {/* Rotating sweep */}
      <g filter="url(#radarGlow)">
        <path
          d="M 100 100 L 100 10 A 90 90 0 0 1 155 25 Z"
          fill="url(#radarGrad)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 100 100"
            to="360 100 100"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </g>
      
      {/* Blips */}
      {[[60, 50], [140, 70], [80, 130], [150, 140]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4" fill={color} opacity="0.8">
            <animate
              attributeName="opacity"
              values="0;0.8;0"
              dur="3s"
              begin={`${i * 0.75}s`}
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={x} cy={y} r="8" fill="none" stroke={color} strokeWidth="1">
            <animate
              attributeName="r"
              values="4;12"
              dur="1.5s"
              begin={`${i * 0.75}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;0"
              dur="1.5s"
              begin={`${i * 0.75}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
      
      {/* Center dot */}
      <circle cx="100" cy="100" r="4" fill={color} filter="url(#radarGlow)">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

/** Circuit Board Pattern */
const CircuitPatternSVG: React.FC<{ color?: string }> = ({ color = '#84cc16' }) => {
  const traces = useMemo(() => {
    const paths: string[] = [];
    for (let i = 0; i < 8; i++) {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const midX = startX + (Math.random() - 0.5) * 40;
      const endX = midX + (Math.random() - 0.5) * 30;
      const endY = startY + 20 + Math.random() * 30;
      paths.push(`M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`);
    }
    return paths;
  }, []);

  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
      {traces.map((path, i) => (
        <g key={i}>
          <path d={path} fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
          <circle cx={path.split(' ')[1]} cy={path.split(' ')[2]} r="1.5" fill={color} opacity="0.6" />
        </g>
      ))}
    </svg>
  );
};

/** Data Stream Matrix */
const DataStreamSVG: React.FC<{ columns?: number; color?: string }> = ({ 
  columns = 12, 
  color = '#84cc16' 
}) => {
  const [chars, setChars] = useState<string[][]>([]);

  useEffect(() => {
    const generate = () => 
      Array(columns).fill(0).map(() => 
        Array(8).fill(0).map(() => 
          String.fromCharCode(48 + Math.floor(Math.random() * 10))
        )
      );
    setChars(generate());
    const interval = setInterval(() => setChars(generate()), 80);
    return () => clearInterval(interval);
  }, [columns]);

  return (
    <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="streamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {chars.map((column, ci) => (
        <g key={ci}>
          {column.map((char, ri) => (
            <text
              key={`${ci}-${ri}`}
              x={5 + ci * 8}
              y={5 + ri * 7}
              fontSize="5"
              fontFamily="monospace"
              fill={color}
              opacity={0.3 + (ri / column.length) * 0.5}
            >
              {char}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
};

/** Encrypted Lock Visualization */
const EncryptedLockSVG: React.FC<{ locked?: boolean; color?: string }> = ({ 
  locked = true, 
  color = '#84cc16' 
}) => {
  return (
    <svg viewBox="0 0 100 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="lockGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="lockBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      {/* Shield shape */}
      <path
        d="M 50 5 L 90 20 L 90 55 Q 90 95 50 115 Q 10 95 10 55 L 10 20 Z"
        fill="url(#lockBodyGrad)"
        stroke={color}
        strokeWidth="2"
        filter="url(#lockGlow)"
      />
      
      {/* Lock */}
      <g transform="translate(35, 40)">
        <rect x="0" y="20" width="30" height="25" rx="3" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" />
        <path
          d={locked ? "M 5 20 V 12 A 10 10 0 0 1 25 12 V 20" : "M 5 20 V 12 A 10 10 0 0 1 25 12 V 8"}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="15" cy="32" r="4" fill={color}>
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <rect x="13" y="32" width="4" height="8" fill={color} />
      </g>
      
      {/* Decorative circuit lines */}
      <path d="M 20 25 L 20 35 L 10 35" fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <path d="M 80 25 L 80 35 L 90 35" fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <circle cx="20" cy="25" r="2" fill={color} opacity="0.4" />
      <circle cx="80" cy="25" r="2" fill={color} opacity="0.4" />
    </svg>
  );
};

/** Venue Visualization SVG (replaces static image) */
const VenueVisualizerSVG: React.FC<{ venueName: string }> = ({ venueName }) => {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="venueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
        <filter id="venueGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="spotlightGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#84cc16" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Background */}
      <rect width="300" height="200" fill="url(#venueGrad)" />
      
      {/* Grid floor */}
      <g opacity="0.15">
        {Array(12).fill(0).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={120 + i * 8} x2="300" y2={120 + i * 8} stroke="#84cc16" strokeWidth="0.5" />
        ))}
        {Array(20).fill(0).map((_, i) => (
          <line key={`v${i}`} x1={i * 15} y1="120" x2={150 + (i - 10) * 5} y2="200" stroke="#84cc16" strokeWidth="0.5" />
        ))}
      </g>
      
      {/* Spotlight */}
      <ellipse cx="150" cy="60" rx="120" ry="80" fill="url(#spotlightGrad)" />
      
      {/* DJ Booth silhouette */}
      <rect x="110" y="70" width="80" height="50" rx="4" fill="#0a0a0a" stroke="#84cc16" strokeWidth="1" opacity="0.8" />
      <rect x="120" y="80" width="60" height="30" fill="#84cc16" opacity="0.1" />
      
      {/* Waveform on booth */}
      <g transform="translate(125, 88)">
        {Array(25).fill(0).map((_, i) => (
          <rect
            key={i}
            x={i * 2}
            y={7 - Math.sin(i * 0.5) * 6}
            width="1.5"
            height={Math.sin(i * 0.5) * 12 + 2}
            fill="#84cc16"
            opacity="0.8"
          >
            <animate
              attributeName="height"
              values={`${Math.sin(i * 0.5) * 12 + 2};${Math.sin(i * 0.5 + 1) * 12 + 2};${Math.sin(i * 0.5) * 12 + 2}`}
              dur="0.5s"
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>
      
      {/* Crowd dots */}
      {Array(30).fill(0).map((_, i) => {
        const x = 30 + Math.random() * 240;
        const y = 140 + Math.random() * 50;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={2 + Math.random() * 2}
            fill="#84cc16"
            opacity={0.2 + Math.random() * 0.3}
          >
            <animate
              attributeName="cy"
              values={`${y};${y - 3};${y}`}
              dur={`${0.3 + Math.random() * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
      
      {/* Laser beams */}
      {[[-20, 0], [20, 0], [0, -10], [0, 10]].map(([dx, dy], i) => (
        <line
          key={i}
          x1="150"
          y1="30"
          x2={100 + dx * 3}
          y2={150 + dy}
          stroke="#84cc16"
          strokeWidth="1"
          opacity="0.3"
        >
          <animate
            attributeName="opacity"
            values="0.1;0.4;0.1"
            dur={`${1 + i * 0.2}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}
    </svg>
  );
};

/** Artist Card Visualization */
const ArtistVisualizerSVG: React.FC<{ name: string }> = ({ name }) => {
  const [frequencies, setFrequencies] = useState<number[]>([]);
  
  useEffect(() => {
    const generate = () => Array(64).fill(0).map(() => Math.random());
    setFrequencies(generate());
    const interval = setInterval(() => setFrequencies(generate()), 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="artistGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
        <filter id="artistGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Background */}
      <rect width="300" height="300" fill="url(#artistGrad)" />
      
      {/* Circular frequency visualization */}
      <g transform="translate(150, 150)">
        {frequencies.map((freq, i) => {
          const angle = (i / frequencies.length) * Math.PI * 2;
          const innerR = 60;
          const outerR = innerR + freq * 40;
          const x1 = Math.cos(angle) * innerR;
          const y1 = Math.sin(angle) * innerR;
          const x2 = Math.cos(angle) * outerR;
          const y2 = Math.sin(angle) * outerR;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#84cc16"
              strokeWidth="3"
              strokeLinecap="round"
              opacity={0.4 + freq * 0.4}
            />
          );
        })}
        
        {/* Inner circle */}
        <circle r="55" fill="#0a0a0a" stroke="#84cc16" strokeWidth="2" />
        <circle r="50" fill="none" stroke="#84cc16" strokeWidth="1" opacity="0.3" strokeDasharray="4 4">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Center icon */}
        <circle r="25" fill="#84cc16" opacity="0.2" filter="url(#artistGlow)">
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite" />
        </circle>
        <text y="6" textAnchor="middle" fill="#84cc16" fontSize="20" fontFamily="monospace" fontWeight="bold">♫</text>
      </g>
      
      {/* Decorative corners */}
      <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke="#84cc16" strokeWidth="2" opacity="0.4" />
      <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke="#84cc16" strokeWidth="2" opacity="0.4" />
      <path d="M 290 270 L 290 290 L 270 290" fill="none" stroke="#84cc16" strokeWidth="2" opacity="0.4" />
      <path d="M 30 290 L 10 290 L 10 270" fill="none" stroke="#84cc16" strokeWidth="2" opacity="0.4" />
    </svg>
  );
};

// =============================================================================
// SCREEN COMPONENTS
// =============================================================================

const BottomNav = ({ activeTab }: { activeTab: number }) => (
  <div className="absolute bottom-0 w-full h-[90px] bg-zinc-950 border-t border-zinc-800 flex items-start justify-around px-4 pt-6 z-40">
    <div className={`p-1 rounded-full ${activeTab === 0 ? 'text-acid drop-shadow-[0_0_8px_rgba(132,204,22,1)]' : 'text-zinc-500'}`}><Zap size={24} strokeWidth={activeTab === 0 ? 3 : 2} /></div>
    <div className={`p-1 rounded-full ${activeTab === 1 ? 'text-acid drop-shadow-[0_0_8px_rgba(132,204,22,1)]' : 'text-zinc-500'}`}><Users size={24} strokeWidth={activeTab === 1 ? 3 : 2} /></div>
    <div className={`p-1 rounded-full ${activeTab === 2 ? 'text-acid drop-shadow-[0_0_8px_rgba(132,204,22,1)]' : 'text-zinc-500'}`}><Calendar size={24} strokeWidth={activeTab === 2 ? 3 : 2} /></div>
    <div className={`p-1 rounded-full ${activeTab === 3 ? 'text-acid drop-shadow-[0_0_8px_rgba(132,204,22,1)]' : 'text-zinc-500'}`}><ShoppingCart size={24} strokeWidth={activeTab === 3 ? 3 : 2} /></div>
    <div className={`p-1 rounded-full ${activeTab === 4 ? 'text-acid drop-shadow-[0_0_8px_rgba(132,204,22,1)]' : 'text-zinc-500'}`}><Radio size={24} strokeWidth={activeTab === 4 ? 3 : 2} /></div>
  </div>
);

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-6 pt-14 px-5">
    <h1 className="text-4xl font-black tracking-tighter uppercase leading-[0.85] mb-2 text-white">{title}</h1>
    {subtitle && (
      <div className="text-acid text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-2">
        <span className="text-lg leading-none">›</span> {subtitle}
      </div>
    )}
  </div>
);

// --- SCREEN 0: SYNC ---
export const SyncScreen = () => (
  <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative">
    <CircuitPatternSVG />
    <Header title="Sync" subtitle="Connect Accounts" />

    <div className="flex-1 flex flex-col justify-center space-y-4 relative z-10 px-5 -mt-10">
        {['SPOTIFY', 'APPLE_MUSIC', 'SOUNDCLOUD'].map((source, i) => (
            <div key={source} className="bg-zinc-900/80 backdrop-blur border border-zinc-800 p-4 relative z-10 group cursor-pointer hover:border-acid transition-all duration-300 shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 group-hover:text-acid group-hover:border-acid transition-colors relative overflow-hidden">
                             {i === 0 ? <Disc size={18}/> : i === 1 ? <Music size={18}/> : <AudioLines size={18}/>}
                             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                               <NeuralNetworkBG nodeCount={6} />
                             </div>
                        </div>
                        <div>
                            <div className="text-sm font-black uppercase tracking-wider text-white">{source}</div>
                            <div className="text-[9px] font-mono text-zinc-400 group-hover:text-acid">CONNECTED</div>
                        </div>
                    </div>
                    <div className="w-5 h-5 bg-acid rounded-sm flex items-center justify-center shadow-[0_0_10px_rgba(132,204,22,0.4)]">
                        <Check size={14} className="text-black stroke-[4]" />
                    </div>
                </div>
            </div>
        ))}
    </div>

    <div className="mt-auto mb-12 z-10 px-5">
        <div className="h-16 bg-acid flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(132,204,22,0.6)] cursor-pointer hover:bg-white transition-colors group relative overflow-hidden">
             <div className="absolute inset-0 opacity-30">
               <DataStreamSVG columns={20} />
             </div>
             <span className="font-black text-black tracking-widest text-lg uppercase relative z-10">Start Sync</span>
             <span className="text-black font-mono font-bold animate-pulse group-hover:translate-x-2 transition-transform relative z-10">{'>'}{'>'}{'>'}</span>
        </div>
        <div className="mt-4 text-center">
             <p className="font-mono text-[9px] text-zinc-500 uppercase">
                // Anti-Algorithm Mode: ON
             </p>
        </div>
    </div>
  </div>
);

// --- SCREEN 1: INTEL (Daily Briefing) ---
export const IntelScreen = () => (
    <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative">
        <NeuralNetworkBG nodeCount={15} />
        <Header title="Discover" subtitle="Private Curator" />
        
        <div className="px-5 mb-8 relative z-10">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full border-2 border-acid flex items-center justify-center bg-zinc-900 text-acid shadow-[0_0_10px_rgba(132,204,22,0.5)] relative overflow-hidden">
                        <Plus size={24} strokeWidth={3} className="relative z-10" />
                        <div className="absolute inset-0 bg-acid/10 animate-pulse" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white">Add Taste</span>
                </div>
                {['Sarah', 'Kai', 'Lars', 'Mina'].map((name, i) => (
                    <div key={name} className="flex flex-col items-center gap-2 relative">
                         {i === 0 && <div className="absolute top-0 right-0 w-3 h-3 bg-acid rounded-full border-2 border-zinc-950 z-10 shadow-[0_0_5px_rgba(132,204,22,1)]"></div>}
                        <div className={`w-14 h-14 rounded-full border-2 ${i === 0 ? 'border-acid p-0.5' : 'border-zinc-800'} bg-zinc-900 overflow-hidden relative`}>
                             <div className="absolute inset-0 flex items-center justify-center text-acid font-black text-lg">
                               {name.charAt(0)}
                             </div>
                             <div className="absolute inset-0 opacity-30">
                               <NeuralNetworkBG nodeCount={4} />
                             </div>
                        </div>
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${i === 0 ? 'text-white' : 'text-zinc-500'}`}>{name}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="px-5 flex-1 overflow-y-auto pb-24 relative z-10">
            <div className="flex justify-between items-end mb-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-acid animate-pulse rounded-full shadow-[0_0_5px_rgba(132,204,22,1)]"></span>
                    Live Signal
                </h3>
                <span className="text-[10px] font-mono text-acid border border-acid/50 px-1 bg-acid/10">CONFIDENCE: 99%</span>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden group hover:border-acid transition-colors shadow-xl">
                <div className="relative h-48 bg-zinc-800 overflow-hidden">
                    <VenueVisualizerSVG venueName="Garage Noord" />
                    <div className="absolute top-3 right-3 bg-acid text-black text-[10px] font-black uppercase px-2 py-1 shadow-[0_0_10px_rgba(132,204,22,0.8)]">
                        No Algorithms
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                        <div className="text-[9px] font-bold uppercase tracking-widest text-acid mb-1 drop-shadow-md">Small Venue • 200 Cap</div>
                        <div className="text-3xl font-black uppercase leading-none text-white drop-shadow-lg">Garage Noord</div>
                    </div>
                </div>
                <div className="p-4 bg-zinc-950 relative">
                    <div className="absolute top-0 left-0 right-0 h-8 opacity-50">
                      <WaveformSVG bars={40} height={30} />
                    </div>
                    <p className="font-mono text-[10px] text-zinc-300 mb-4 leading-relaxed relative z-10 pt-6">
                        Hidden gem. Your <span className="text-acid font-bold">Private Model</span> found this. Big apps ignore it.
                    </p>
                    <button className="w-full py-3 bg-white text-black font-black uppercase text-sm hover:bg-acid transition-colors flex justify-between px-4 items-center shadow-lg">
                        <span>Check Event</span>
                        <ArrowUpRight size={16} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </div>

        <BottomNav activeTab={0} />
    </div>
);

// --- SCREEN 2: MATCHING ---
export const MatchingScreen = () => (
    <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative">
        <CircuitPatternSVG />
        <div className="pt-14 px-5 mb-4 relative z-10">
             <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Your Curation</h1>
             <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
                Data Sovereignty: Active
             </p>
        </div>

        <div className="flex-1 px-5 relative pb-24 z-10">
            <div className="absolute top-2 left-7 right-3 bottom-26 bg-zinc-800 border border-zinc-700 rounded-xl transform rotate-3 -z-10"></div>
            
            <div className="h-full bg-white text-black rounded-xl overflow-hidden flex flex-col relative shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                <div className="flex-1 bg-zinc-200 relative overflow-hidden">
                    <ArtistVisualizerSVG name="Folamour" />
                    <div className="absolute top-4 left-4">
                         <div className="bg-acid text-black text-[10px] font-black uppercase px-2 py-1 shadow-lg">Verified Cool</div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold border border-white/20">
                        Top Pick for You
                    </div>
                </div>
                
                <div className="p-6 pt-5">
                    <h2 className="text-4xl font-black uppercase leading-[0.85] mb-2 tracking-tighter">Folamour</h2>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-acid rounded-full"></span>
                        Underground Selects
                    </div>
                    
                    <div className="flex justify-between items-end border-t-2 border-black pt-4">
                         <div>
                             <div className="text-[9px] font-bold uppercase text-zinc-500">Vibe</div>
                             <div className="font-mono text-xs font-bold">DISCO HOUSE</div>
                         </div>
                         <div className="text-right">
                             <div className="text-[9px] font-bold uppercase text-zinc-500">Capacity</div>
                             <div className="font-mono text-xs font-bold">SMALL (300)</div>
                         </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 left-5 right-5 flex gap-4">
                <button className="flex-1 py-4 border-2 border-white text-white font-black uppercase text-sm hover:bg-white hover:text-black transition-colors">
                    Next
                </button>
                <button className="flex-1 py-4 bg-black border-2 border-black text-white font-black uppercase text-sm hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-lg">
                    <Heart size={16} className="text-acid fill-acid" />
                    Curate
                </button>
            </div>
        </div>
    </div>
);

// --- SCREEN 3: EVENT DETAILS ---
export const EventDetailsScreen = () => (
    <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative">
        <div className="absolute top-0 left-0 w-full h-1/2 z-0 overflow-hidden">
             <ArtistVisualizerSVG name="Folamour" />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
             <button className="absolute top-12 right-6 bg-black/50 p-2 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white hover:text-black transition-colors">
                 <X size={20} />
             </button>
        </div>

        <div className="relative z-10 pt-48 px-6 flex-1 flex flex-col">
             <div className="flex gap-2 mb-4">
                 <span className="bg-acid/20 text-acid border border-acid/30 text-[9px] font-bold uppercase px-2 py-1 flex items-center gap-1">
                    <span className="w-1 h-1 bg-acid rounded-full"></span> Verified
                 </span>
                 <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 text-[9px] font-bold uppercase px-2 py-1">
                    Direct Access
                 </span>
             </div>
             
             <h1 className="text-5xl font-black uppercase leading-[0.85] tracking-tighter mb-2 text-white">Folamour</h1>
             
             <div className="flex items-center gap-2 mb-8 text-[10px] font-mono text-zinc-400">
                 <MapPin size={12} className="text-acid" />
                 <span className="text-white font-bold uppercase">Radion</span>
                 <span className="text-zinc-500">|</span>
                 <span className="text-white">Anti-Scalp Mode Active</span>
             </div>

             <div className="space-y-6">
                 <div className="bg-zinc-900/80 p-3 border-l-2 border-acid shadow-lg relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-24 h-full opacity-20">
                       <NeuralNetworkBG nodeCount={6} />
                     </div>
                     <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1 relative z-10">Private AI Note</h3>
                     <p className="font-mono text-xs text-white leading-relaxed relative z-10">
                        "This fits your vibe perfectly. The big apps are pushing Top 40, but your data says you want this."
                     </p>
                 </div>
                 
                 <div>
                     <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Lineup</h3>
                     <p className="font-sans text-sm font-bold text-white">Bella, Kamma & Masalo</p>
                 </div>

                 <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-sm">
                     <div className="flex justify-between items-center mb-2">
                        <div className="text-[9px] font-bold uppercase text-acid flex items-center gap-2">
                            <Play size={10} fill="#84cc16" /> Listen Preview
                        </div>
                        <div className="font-mono text-[9px] text-zinc-500">02:43</div>
                     </div>
                     <div className="h-8">
                         <WaveformSVG bars={45} height={32} />
                     </div>
                 </div>
             </div>

             <div className="mt-auto mb-8">
                 <div className="flex justify-between items-end mb-2 px-1">
                     <span className="text-[10px] font-bold uppercase text-zinc-500">Price (No Fees)</span>
                     <span className="font-mono text-xl font-black text-white">€29.50</span>
                 </div>
                 
                 <div className="h-14 bg-zinc-900 border border-zinc-700 relative overflow-hidden flex items-center p-1 group cursor-pointer hover:border-acid transition-colors">
                    <div className="absolute inset-0 opacity-20">
                      <DataStreamSVG columns={20} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white transition-colors">Slide to Buy {'>'}{'>'}{'>'}</span>
                    </div>
                    <div className="h-full aspect-square bg-white flex items-center justify-center z-20 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        <ChevronRight className="text-black stroke-[3]" />
                    </div>
                 </div>
             </div>
        </div>
    </div>
);

// --- SCREEN 4: RADAR ---
export const RadarScreen = () => (
  <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative overflow-hidden">
    <NeuralNetworkBG nodeCount={20} />
    <div className="absolute inset-0 z-0 opacity-30" style={{
        backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)',
        backgroundSize: '20px 20px',
    }}></div>
    
    <div className="relative z-10 pt-14 px-5 h-full flex flex-col">
        <Header title="Crew" subtitle="Group Sync" />

        <div className="bg-zinc-900 border border-acid p-4 mb-6 shadow-[0_0_20px_rgba(132,204,22,0.15)] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-20 h-20 bg-acid/10 rounded-full blur-xl -mr-10 -mt-10"></div>
             <div className="absolute right-2 top-2 w-16 h-16 opacity-40">
               <RadarScanSVG size={60} />
             </div>
             <div className="flex gap-3 relative z-10">
                 <div className="w-8 h-8 bg-acid/20 border border-acid flex items-center justify-center shrink-0 rounded-sm">
                     <Users size={16} className="text-acid" />
                 </div>
                 <div>
                     <h3 className="text-sm font-black uppercase text-white leading-none mb-1">Squad Match Found</h3>
                     <p className="font-mono text-[10px] text-zinc-300 leading-tight">
                        Your secure AI agents agreed: <br/><span className="text-acid font-bold">98% Compatibility</span> for Shelter.
                     </p>
                 </div>
             </div>
        </div>
        
        <div className="flex justify-between items-end mb-2 px-1">
             <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Suggested Events</span>
             <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1">
                 <span className="w-1.5 h-1.5 bg-acid rounded-full animate-pulse shadow-[0_0_5px_rgba(132,204,22,1)]"></span> LIVE
             </span>
        </div>

        <div className="space-y-3">
             <div className="bg-zinc-900/80 border border-zinc-700 p-4 backdrop-blur-sm group hover:border-acid transition-colors shadow-lg relative overflow-hidden">
                  <div className="absolute right-0 top-0 bottom-0 w-24 opacity-30">
                    <WaveformSVG bars={20} height={80} />
                  </div>
                  <div className="flex justify-between items-start mb-2 relative z-10">
                       <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider group-hover:text-white">
                           <Music size={10} /> Shelter
                       </div>
                       <div className="bg-acid text-black text-[8px] font-black uppercase px-1.5 py-0.5 shadow-[0_0_8px_rgba(132,204,22,0.5)]">Perfect Match</div>
                  </div>
                  <h2 className="text-2xl font-black uppercase leading-none mb-4 text-white relative z-10">Ben UFO</h2>
                  <div className="flex justify-between items-end relative z-10">
                       <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {['S', 'K', 'L'].map((initial, i) => (
                                  <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border border-black flex items-center justify-center text-[8px] font-bold text-acid">{initial}</div>
                                ))}
                            </div>
                            <span className="text-[9px] font-mono text-zinc-400">All In</span>
                       </div>
                       <button className="text-[10px] font-mono font-bold text-white hover:text-acid flex items-center gap-1 group-hover:underline decoration-acid underline-offset-4">
                           VOTE {`->`}
                       </button>
                  </div>
             </div>

             <div className="bg-zinc-900/40 border border-zinc-800 p-4 opacity-80 hover:opacity-100 transition-opacity hover:border-zinc-600">
                  <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                           <Music size={10} /> Thuishaven
                       </div>
                       <div className="bg-zinc-800 text-zinc-400 text-[8px] font-black uppercase px-1.5 py-0.5">80% Match</div>
                  </div>
                  <h2 className="text-2xl font-black uppercase leading-none mb-4 text-zinc-300">Joris Voorn</h2>
                  <div className="flex justify-between items-end">
                       <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-black flex items-center justify-center text-[8px] font-bold text-zinc-500">M</div>
                            </div>
                            <span className="text-[9px] font-mono text-zinc-500">Mina likes this</span>
                       </div>
                       <button className="text-[10px] font-mono font-bold text-zinc-500 hover:text-white">
                           VOTE {`->`}
                       </button>
                  </div>
             </div>
        </div>
    </div>
    <BottomNav activeTab={1} />
  </div>
);

// --- SCREEN 5: PLANS ---
export const PlansScreen = () => (
  <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative">
    <CircuitPatternSVG />
    <Header title="Plans" subtitle="Upcoming" />

    <div className="px-5 mb-8 relative z-10">
        <div className="flex gap-2 pb-2">
          {['FRI|24', 'SAT|25', 'SUN|26', 'MON|27'].map((date, i) => (
              <div key={date} className={`w-14 h-16 border flex flex-col items-center justify-center relative overflow-hidden ${i === 0 ? 'bg-acid border-acid text-black shadow-[0_0_10px_rgba(132,204,22,0.5)]' : 'bg-black border-zinc-800 text-zinc-500'}`}>
                  {i === 0 && <div className="absolute inset-0 opacity-30"><DataStreamSVG columns={4} /></div>}
                  <span className="text-[9px] font-bold uppercase tracking-wider mb-1 relative z-10">{date.split('|')[0]}</span>
                  <span className="text-xl font-black relative z-10">{date.split('|')[1]}</span>
              </div>
          ))}
        </div>
        <div className="h-px w-full bg-zinc-900 mt-4"></div>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pb-24 relative z-10">
        <div className="w-20 h-20 border border-zinc-800 flex items-center justify-center mb-6 bg-zinc-900 rounded-full relative overflow-hidden">
            <div className="absolute inset-0">
              <RadarScanSVG size={80} />
            </div>
            <RefreshCw size={24} className="text-zinc-500 relative z-10" />
        </div>
        <h3 className="text-lg font-black uppercase mb-2 text-white">No Plans Yet</h3>
        <p className="font-mono text-[10px] text-zinc-400 mb-8 max-w-[200px]">
            Sync with your crew to find the perfect night out.
        </p>
        <button className="w-full py-4 bg-acid text-black font-black uppercase text-sm hover:bg-white transition-colors shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-20"><DataStreamSVG columns={15} /></div>
            <span className="relative z-10">Start Group Sync</span>
        </button>
    </div>
    <BottomNav activeTab={2} />
  </div>
);

// --- SCREEN 6: VAULT ---
export const VaultScreen = () => (
  <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative">
    <NeuralNetworkBG nodeCount={12} />
    <Header title="Vault" subtitle="My Tickets" />

    <div className="px-5 space-y-4 relative z-10">
        <div className="flex justify-between items-end px-1 mb-1">
             <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Wallet</span>
             <span className="text-[9px] font-mono text-zinc-500">TICKETS: 1</span>
        </div>

        <div className="bg-white text-black rounded-sm p-1 relative overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow">
            <div className="border border-dashed border-zinc-300 p-4 h-32 flex flex-col justify-between relative">
                 <div className="absolute top-0 right-0 p-2">
                      <div className="w-3 h-3 border border-black rounded-full animate-ping"></div>
                      <div className="w-3 h-3 border border-black bg-acid rounded-full absolute top-2 right-2"></div>
                 </div>
                 
                 <div className="flex items-start gap-4">
                     <div className="text-[9px] font-mono font-bold uppercase rotate-180 py-1" style={{writingMode: 'vertical-rl'}}>Admit One</div>
                     <div>
                         <h3 className="text-2xl font-black uppercase leading-none mb-1">Bubble Love</h3>
                         <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">Het Sieraad</div>
                         <div className="text-[9px] font-mono text-zinc-500">SAT 22 NOV</div>
                     </div>
                 </div>

                 <div className="flex justify-between items-end">
                      <div className="h-6 w-32 opacity-70">
                        <WaveformSVG bars={20} height={24} color="#000000" />
                      </div>
                      <div className="flex flex-col items-end">
                         <div className="font-mono text-xl font-black">€32.80</div>
                         <div className="text-[8px] font-bold uppercase bg-black text-white px-1 mt-0.5">Direct-to-Fan</div>
                      </div>
                 </div>
            </div>
            
            <div className="absolute top-1/2 -left-2 w-4 h-4 bg-black rounded-full"></div>
            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-black rounded-full"></div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-4 mt-8 relative overflow-hidden">
             <div className="absolute right-2 top-2 w-12 h-14 opacity-40">
               <EncryptedLockSVG locked={true} />
             </div>
             <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold uppercase text-zinc-500">Status</span>
                  <span className="text-[9px] font-mono text-acid flex items-center gap-1"><ShieldCheck size={10}/> SECURE</span>
             </div>
             <p className="font-mono text-[10px] text-zinc-400 max-w-[70%]">
                 Verified Anti-Scalp Ticket. Tied to your secure ID. Cannot be resold by bots.
             </p>
        </div>

        <div className="mt-8 h-12 bg-zinc-900 border border-zinc-800 flex items-center px-4 relative overflow-hidden opacity-80">
             <div className="absolute inset-0 opacity-20">
               <DataStreamSVG columns={20} />
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500">Slide to Activate {'>'}{'>'}{'>'}</span>
             </div>
             <div className="w-10 h-full bg-black border-r border-zinc-700 absolute left-0 flex items-center justify-center">
                 <ChevronRight size={14} className="text-zinc-600" />
             </div>
        </div>
    </div>
    <BottomNav activeTab={3} />
  </div>
);

// --- SCREEN 7: SIGNAL ---
export const SignalScreen = () => (
  <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative">
    <NeuralNetworkBG nodeCount={10} />
    <Header title="Signal" subtitle="Notifications" />

    <div className="px-5 space-y-3 relative z-10">
        <div className="bg-white text-black p-4 border border-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.1)] relative overflow-hidden">
             <div className="absolute right-0 top-0 bottom-0 w-16 opacity-10">
               <WaveformSVG bars={12} height={80} color="#000000" />
             </div>
             <div className="flex gap-3 mb-3 relative z-10">
                  <div className="w-8 h-8 border border-black flex items-center justify-center font-bold text-sm bg-acid/20">S</div>
                  <div className="flex-1">
                      <p className="text-xs font-bold leading-tight">
                          <span className="font-black">Sarah</span> invited you to <span className="underline">Garage Noord</span>.
                      </p>
                  </div>
             </div>
             <div className="flex gap-2 pl-11 relative z-10">
                  <button className="bg-black text-white text-[9px] font-black uppercase px-3 py-1.5 hover:bg-acid hover:text-black transition-colors">I'm In</button>
                  <button className="border border-zinc-300 text-[9px] font-bold uppercase px-3 py-1.5 hover:border-black transition-colors">Ignore</button>
             </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-4 relative overflow-hidden">
             <div className="absolute right-2 top-2 w-10 h-10 opacity-40">
               <RadarScanSVG size={40} />
             </div>
             <div className="flex gap-3 relative z-10">
                  <div className="w-8 h-8 bg-acid/10 border border-acid flex items-center justify-center font-bold text-sm text-acid">
                      <Ticket size={14} />
                  </div>
                  <div className="flex-1">
                      <div className="text-[9px] font-bold uppercase text-acid mb-1">Early Access</div>
                      <p className="text-xs font-medium text-zinc-300 leading-tight">
                          Tickets for <span className="font-bold text-white">Thuishaven</span> released. Beat the scalpers.
                      </p>
                  </div>
             </div>
        </div>
    </div>
    <BottomNav activeTab={4} />
  </div>
);

// --- SCREEN 8: LOCK ---
export const LockScreen = () => (
    <div className="flex flex-col h-full bg-zinc-950 items-center justify-center px-6 relative overflow-hidden">
        <NeuralNetworkBG nodeCount={25} />
        <CircuitPatternSVG />
        
        <div className="w-full mb-12 text-center relative z-10">
            <div className="w-24 h-28 mx-auto mb-6">
              <EncryptedLockSVG locked={true} />
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-2">
                Enter
            </h1>
            <h1 className="text-5xl font-black text-acid tracking-tighter uppercase leading-[0.85]">
                Code
            </h1>
        </div>
        
        <div className="mb-8 font-mono text-[10px] text-zinc-500 uppercase tracking-widest text-center relative z-10">
            &gt; Secure Access
        </div>

        <div className="flex gap-3 relative z-10">
            {[true, false, false, false].map((filled, i) => (
              <div key={i} className="w-12 h-14 border border-zinc-800 bg-zinc-900 flex items-center justify-center relative overflow-hidden">
                   {filled && (
                     <>
                       <div className="absolute inset-0 opacity-30"><DataStreamSVG columns={3} /></div>
                       <div className="w-2 h-2 bg-acid rounded-full shadow-[0_0_10px_rgba(132,204,22,0.8)] relative z-10"></div>
                     </>
                   )}
              </div>
            ))}
        </div>
        
        <div className="absolute bottom-12 text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
            Privacy Active
        </div>
    </div>
);
