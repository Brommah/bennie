import React, { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Extraction vs Injection - ULTRA DETAILED DATA FLOW VISUALIZATION
 * 
 * Features:
 * - Complex SVG filter chains
 * - Generative circuit board patterns
 * - Advanced particle systems
 * - Isometric depth perception
 * - Real-time data stream animations
 */

// =============================================================================
// EXTRACTION DIAGRAM - Sophisticated data harvesting visualization
// =============================================================================

const ExtractionDiagram: React.FC = () => {
  // Generate procedural data points for users
  const userNodes = useMemo(() => [
    { x: 80, y: 320, label: 'USER_A', data: ['profile', 'location', 'history'] },
    { x: 200, y: 340, label: 'USER_B', data: ['prefs', 'contacts', 'media'] },
    { x: 320, y: 320, label: 'USER_C', data: ['search', 'purchase', 'social'] },
  ], []);

  return (
    <svg viewBox="0 0 400 420" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        {/* Simple glow filter */}
        <filter id="extractGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Danger gradient */}
        <linearGradient id="dangerPulse" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#ef4444" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0.4" />
        </linearGradient>

        {/* Data stream gradient */}
        <linearGradient id="dataStreamRed" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
          <stop offset="40%" stopColor="#ef4444" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#ef4444" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </linearGradient>

        {/* Data stream gradient */}
        <linearGradient id="dataStreamRed" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
          <stop offset="50%" stopColor="#ef4444" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Simple background */}
      <rect width="400" height="420" fill="#050505" />

      {/* === THE CLOUD SERVER (TOP) === */}
      <g transform="translate(200, 70)">
        {/* Main server box */}
        <rect x="-75" y="-45" width="150" height="90" fill="#0a0505" stroke="#ef4444" strokeWidth="2" rx="6" />

        {/* Server rack details - simplified */}
        <g transform="translate(-60, -35)">
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(0, ${i * 20})`}>
              <rect width="120" height="16" fill="#1a0808" stroke="#7f1d1d" strokeWidth="0.5" rx="2" />
              <circle cx="110" cy="8" r="3" fill="#ef4444" opacity="0.7" />
            </g>
          ))}
        </g>

        {/* Labels */}
        <text x="0" y="-55" textAnchor="middle" fill="#ef4444" fontSize="11" fontFamily="monospace" fontWeight="bold">
          THE CLOUD
        </text>
      </g>

      {/* === USER DEVICES (BOTTOM) === */}
      {userNodes.map((user, i) => (
        <g key={i} transform={`translate(${user.x}, ${user.y})`}>
          {/* Device frame - simplified */}
          <rect x="-30" y="-45" width="60" height="90" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" rx="8" />
          <rect x="-26" y="-40" width="52" height="75" fill="#0a0a0a" rx="4" />
          
          {/* Screen content - simplified */}
          <g transform="translate(-22, -35)">
            {user.data.map((d, di) => (
              <g key={di} transform={`translate(0, ${di * 22})`}>
                <rect width="44" height="18" fill="#1a0808" rx="2" />
                <text x="22" y="12" textAnchor="middle" fill="#ef4444" fontSize="6" fontFamily="monospace" opacity="0.7">
                  {d.toUpperCase()}
                </text>
              </g>
            ))}
          </g>

          {/* Label */}
          <text x="0" y="60" textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="monospace">{user.label}</text>
        </g>
      ))}

      {/* === DATA EXTRACTION FLOWS === */}
      {userNodes.map((user, i) => {
        const startX = user.x;
        const startY = user.y - 50;
        const endX = 200;
        const endY = 125;
        const pathD = `M ${startX} ${startY} Q ${(startX + endX) / 2} ${(startY + endY) / 2 - 30} ${endX} ${endY}`;

        return (
          <g key={`flow-${i}`}>
            {/* Path line */}
            <path d={pathD} fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />

            {/* Single flowing particle */}
            <circle r="5" fill="#ef4444">
              <animateMotion path={pathD} dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Status text */}
      <text x="200" y="400" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="monospace" opacity="0.5">
        // YOUR DATA FLOWS UP
      </text>
    </svg>
  );
};

// =============================================================================
// INJECTION DIAGRAM - Sovereign data architecture
// =============================================================================

const InjectionDiagram: React.FC = () => {
  const agents = useMemo(() => [
    { x: 100, y: 60, label: 'AGENT_α' },
    { x: 200, y: 40, label: 'AGENT_β' },
    { x: 300, y: 60, label: 'AGENT_γ' },
  ], []);

  return (
    <svg viewBox="0 0 400 420" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        {/* Simple glow */}
        <filter id="injectGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Simple background */}
      <rect width="400" height="420" fill="#050505" />

      {/* === AGENTS (TOP) === */}
      {agents.map((agent, i) => (
        <g key={i} transform={`translate(${agent.x}, ${agent.y})`}>
          <rect x="-45" y="-22" width="90" height="44" fill="#050a02" stroke="#84cc16" strokeWidth="1.5" rx="6" />
          <circle cx="-25" cy="0" r="8" fill="#84cc16" opacity="0.3" />
          <circle cx="-25" cy="0" r="4" fill="#84cc16" opacity="0.8" />
          <text x="10" y="4" textAnchor="middle" fill="#84cc16" fontSize="10" fontFamily="monospace" fontWeight="bold">
            {agent.label}
          </text>
        </g>
      ))}

      {/* === YOUR VAULT (CENTER) === */}
      <g transform="translate(200, 280)">
        {/* Simple vault */}
        <ellipse rx="90" ry="50" fill="#84cc16" opacity="0.05" />
        <rect x="-70" y="-35" width="140" height="70" fill="#000" stroke="#84cc16" strokeWidth="2" rx="8" />
        
        {/* Lock icon */}
        <g transform="translate(0, 0)">
          <rect x="-15" y="5" width="30" height="22" fill="#84cc16" opacity="0.2" rx="3" />
          <path d="M -8 5 V -2 A 8 8 0 0 1 8 -2 V 5" fill="none" stroke="#84cc16" strokeWidth="2.5" />
          <circle cx="0" cy="14" r="4" fill="#84cc16" />
        </g>

        <text x="0" y="-45" textAnchor="middle" fill="#84cc16" fontSize="11" fontFamily="monospace" fontWeight="bold">
          YOUR VAULT
        </text>
      </g>

      {/* === INJECTION FLOWS === */}
      {agents.map((agent, i) => {
        const startX = agent.x;
        const startY = agent.y + 22;
        const endX = 200;
        const endY = 230;
        const pathD = `M ${startX} ${startY} Q ${(startX + endX) / 2} ${(startY + endY) / 2} ${endX} ${endY}`;

        return (
          <g key={`inj-${i}`}>
            {/* Path line */}
            <path d={pathD} fill="none" stroke="#84cc16" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />

            {/* Single flowing particle */}
            <circle r="5" fill="#84cc16">
              <animateMotion path={pathD} dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Status text */}
      <text x="200" y="400" textAnchor="middle" fill="#84cc16" fontSize="9" fontFamily="monospace" opacity="0.5">
        // AGENTS FLOW DOWN
      </text>
    </svg>
  );
};

// =============================================================================
// COMPARISON CARD COMPONENT
// =============================================================================

interface ComparisonCardProps {
  label: string;
  before: string;
  after: string;
  index: number;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ label, before, after, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
    className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg relative overflow-hidden group hover:border-acid/30 transition-colors duration-300"
  >
    {/* Hover glow effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-acid/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    <div className="relative z-10">
      <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">{label}</div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-sm text-red-400 line-through opacity-70">{before}</span>
        <svg className="w-5 h-5 text-zinc-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        <span className="font-mono text-sm text-acid font-bold">{after}</span>
      </div>
    </div>
  </motion.div>
);

// =============================================================================
// MAIN EXPORT COMPONENT
// =============================================================================

export const ExtractionVsInjection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-12 bg-black relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #84cc16 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-[50px] bg-gradient-to-r from-acid to-transparent" />
            <span className="font-mono text-xs text-acid uppercase tracking-[0.2em]">01. The Inversion</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6">
            Extraction <span className="text-zinc-600">vs</span> Injection
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
            The Extraction Economy is over. <span className="text-white font-semibold">The Injection Economy begins.</span>{' '}
            Web 2.0 scrapes your behavior and sells it. BEN inverts the stack completely.
          </p>
        </motion.div>

        {/* Diagrams */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-zinc-950 border border-red-500/30 rounded-xl p-4 h-[480px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent" />
              <div className="relative z-10">
                <div className="font-mono text-xs font-bold text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Extraction Model
                </div>
                <ExtractionDiagram />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-zinc-950 border border-acid/40 rounded-xl p-4 h-[480px] relative overflow-hidden shadow-[0_0_60px_-20px_rgba(132,204,22,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-b from-acid/5 to-transparent" />
              <div className="relative z-10">
                <div className="font-mono text-xs font-bold text-acid uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
                  Injection Model
                </div>
                <InjectionDiagram />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Comparison stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ComparisonCard label="Data Exported" before="100%" after="0%" index={0} />
          <ComparisonCard label="User Control" before="NONE" after="FULL" index={1} />
          <ComparisonCard label="Privacy" before="VIOLATED" after="SOVEREIGN" index={2} />
          <ComparisonCard label="Trust Model" before="BLIND" after="VERIFIED" index={3} />
        </div>
      </div>
    </section>
  );
};

export default ExtractionVsInjection;
