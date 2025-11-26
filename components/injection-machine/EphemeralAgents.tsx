import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/**
 * Ephemeral Agents - ADVANCED LIFECYCLE VISUALIZATION
 * 
 * Features:
 * - Complex 3D-ish process visualization
 * - DNA helix style agent structure
 * - Particle dissolution effects
 * - Real-time memory wipe animation
 */

const generateProcId = () => `PROC_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

type Phase = 'spawn' | 'execute' | 'destroy';

const phases: { id: Phase; label: string; description: string; color: string; hex: string }[] = [
  { id: 'spawn', label: 'SPAWN', description: 'Agent materialized from void', color: '#84cc16', hex: '84cc16' },
  { id: 'execute', label: 'EXECUTE', description: 'Task isolation in sandbox', color: '#f59e0b', hex: 'f59e0b' },
  { id: 'destroy', label: 'DESTROY', description: 'Memory dissolved to entropy', color: '#ef4444', hex: 'ef4444' },
];

// =============================================================================
// SOPHISTICATED LIFECYCLE VISUALIZATION SVG
// =============================================================================

interface LifecycleSVGProps {
  currentPhase: number;
  procId: string;
}

const LifecycleSVG: React.FC<LifecycleSVGProps> = ({ currentPhase, procId }) => {
  return (
    <svg viewBox="0 0 700 140" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="phaseGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Track line */}
      <g transform="translate(100, 70)">
        <line x1="0" y1="0" x2="500" y2="0" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
        <line x1="0" y1="0" x2={currentPhase * 250} y2="0" stroke={phases[currentPhase].color} strokeWidth="3" strokeLinecap="round" />

        {/* Single flowing particle */}
        {currentPhase < 2 && (
          <circle r="4" fill={phases[currentPhase].color}>
            <animateMotion path={`M ${currentPhase * 250} 0 L ${(currentPhase + 1) * 250} 0`} dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
          </circle>
        )}
      </g>

      {/* Phase nodes */}
      {[0, 1, 2].map((i) => {
        const cx = 100 + i * 250;
        const isActive = i === currentPhase;
        const isCompleted = i < currentPhase;
        const phase = phases[i];

        return (
          <g key={i} transform={`translate(${cx}, 70)`}>
            {/* Node */}
            <circle
              r={isActive ? 22 : 18}
              fill={isCompleted || isActive ? `${phase.color}20` : '#0a0a0a'}
              stroke={phase.color}
              strokeWidth={isActive ? 2.5 : 1.5}
              filter={isActive ? 'url(#phaseGlow)' : undefined}
              opacity={isCompleted || isActive ? 1 : 0.4}
            />

            {/* Simple icon */}
            <g fill={isCompleted || isActive ? phase.color : '#3f3f46'}>
              {i === 0 && <polygon points="0,-8 7,5 -7,5" />}
              {i === 1 && <rect x="-6" y="-6" width="12" height="12" rx="2" />}
              {i === 2 && (
                <>
                  <line x1="-6" y1="-6" x2="6" y2="6" stroke={phase.color} strokeWidth="3" strokeLinecap="round" />
                  <line x1="6" y1="-6" x2="-6" y2="6" stroke={phase.color} strokeWidth="3" strokeLinecap="round" />
                </>
              )}
            </g>

            {/* Label */}
            <text y="-35" textAnchor="middle" fill={isActive ? phase.color : '#52525b'} fontSize="10" fontFamily="monospace" fontWeight="bold">
              {phase.label}
            </text>
            {isActive && (
              <text y="40" textAnchor="middle" fill={phase.color} fontSize="8" fontFamily="monospace">ACTIVE</text>
            )}
          </g>
        );
      })}

      {/* Process ID */}
      <g transform="translate(350, 120)">
        <rect x="-50" y="-10" width="100" height="20" fill="#0a0a0a" stroke="#84cc16" strokeWidth="1" rx="3" />
        <text textAnchor="middle" y="4" fill="#84cc16" fontSize="10" fontFamily="monospace">{procId}</text>
      </g>
    </svg>
  );
};

// =============================================================================
// AGENT STRUCTURE VISUALIZATION (DNA-like)
// =============================================================================

const AgentStructureSVG: React.FC<{ phase: Phase; color: string }> = ({ phase, color }) => {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="structGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* DNA helix strands */}
      <g opacity={phase === 'destroy' ? 0.3 : 1}>
        {/* Strand 1 */}
        <path
          d="M 30 10 Q 50 30 30 50 Q 10 70 30 90 Q 50 110 30 130"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={phase === 'spawn' ? '4 4' : '0'}
          filter="url(#structGlow)"
        >
          {phase === 'spawn' && (
            <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.5s" repeatCount="indefinite" />
          )}
        </path>

        {/* Strand 2 */}
        <path
          d="M 60 10 Q 40 30 60 50 Q 80 70 60 90 Q 40 110 60 130"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={phase === 'spawn' ? '4 4' : '0'}
          filter="url(#structGlow)"
        >
          {phase === 'spawn' && (
            <animate attributeName="stroke-dashoffset" from="0" to="16" dur="0.5s" repeatCount="indefinite" />
          )}
        </path>

        {/* Cross connections */}
        {[20, 40, 60, 80, 100].map((y, i) => (
          <line
            key={i}
            x1={30 + (i % 2) * 10}
            y1={y}
            x2={60 - (i % 2) * 10}
            y2={y}
            stroke={color}
            strokeWidth="1.5"
            opacity={phase === 'execute' ? 0.8 : 0.4}
          >
            {phase === 'execute' && (
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur="0.5s"
                begin={`${i * 0.1}s`}
                repeatCount="indefinite"
              />
            )}
          </line>
        ))}

        {/* Data nodes */}
        {[20, 40, 60, 80, 100].map((y, i) => (
          <React.Fragment key={i}>
            <circle cx={30 + (i % 2) * 10} cy={y} r="4" fill={color} opacity="0.8">
              {phase === 'destroy' && (
                <>
                  <animate attributeName="r" values="4;0" dur="0.5s" begin={`${i * 0.1}s`} fill="freeze" />
                  <animate attributeName="opacity" values="0.8;0" dur="0.5s" begin={`${i * 0.1}s`} fill="freeze" />
                </>
              )}
            </circle>
            <circle cx={60 - (i % 2) * 10} cy={y} r="4" fill={color} opacity="0.8">
              {phase === 'destroy' && (
                <>
                  <animate attributeName="r" values="4;0" dur="0.5s" begin={`${i * 0.15}s`} fill="freeze" />
                  <animate attributeName="opacity" values="0.8;0" dur="0.5s" begin={`${i * 0.15}s`} fill="freeze" />
                </>
              )}
            </circle>
          </React.Fragment>
        ))}
      </g>

      {/* Memory blocks */}
      <g transform="translate(100, 20)">
        <text x="40" y="-5" textAnchor="middle" fill="#52525b" fontSize="8" fontFamily="monospace">MEMORY</text>
        {[0, 1, 2, 3].map((row) => (
          <g key={row} transform={`translate(0, ${row * 25})`}>
            {[0, 1, 2, 3].map((col) => {
              const blockIndex = row * 4 + col;
              const isActive = phase === 'execute';
              const isDestroyed = phase === 'destroy';
              
              return (
                <rect
                  key={col}
                  x={col * 22}
                  y="0"
                  width="18"
                  height="20"
                  fill={isActive ? color : '#1a1a1a'}
                  stroke={color}
                  strokeWidth="0.5"
                  rx="2"
                  opacity={isDestroyed ? 0.1 : isActive ? 0.6 : 0.3}
                >
                  {isActive && (
                    <animate
                      attributeName="opacity"
                      values="0.3;0.8;0.3"
                      dur="0.8s"
                      begin={`${blockIndex * 0.05}s`}
                      repeatCount="indefinite"
                    />
                  )}
                  {isDestroyed && (
                    <animate
                      attributeName="opacity"
                      values="0.3;0"
                      dur="0.3s"
                      begin={`${blockIndex * 0.03}s`}
                      fill="freeze"
                    />
                  )}
                </rect>
              );
            })}
          </g>
        ))}
      </g>
    </svg>
  );
};

// =============================================================================
// TERMINAL OUTPUT COMPONENT
// =============================================================================

const TerminalCode: React.FC<{ phase: Phase; procId: string }> = ({ phase, procId }) => {
  const codeBlocks: Record<Phase, { text: string; type: 'info' | 'process' | 'success' | 'warning' }[]> = {
    spawn: [
      { text: `> INITIALIZING AGENT ${procId}`, type: 'info' },
      { text: '> LOADING CONTEXT VECTORS...', type: 'process' },
      { text: '> SANDBOX ENV: ISOLATED', type: 'info' },
      { text: '> MEMORY ALLOCATED: 0x7FF3...', type: 'process' },
      { text: '> STATUS: SPAWNED ✓', type: 'success' },
    ],
    execute: [
      { text: `> AGENT ${procId} EXECUTING...`, type: 'process' },
      { text: '> FETCHING USER PREFERENCES', type: 'info' },
      { text: '> COMPUTING RECOMMENDATIONS', type: 'process' },
      { text: '> VECTOR SIMILARITY: 0.847', type: 'info' },
      { text: '> RESULT: 3 MATCHES FOUND', type: 'success' },
    ],
    destroy: [
      { text: `> AGENT ${procId} TASK COMPLETE`, type: 'info' },
      { text: '> WIPING MEMORY BUFFERS...', type: 'warning' },
      { text: '> RELEASING RESOURCES', type: 'process' },
      { text: '> ZERO-FILLING REGISTERS', type: 'warning' },
      { text: '> STATUS: TERMINATED ✓', type: 'success' },
    ],
  };

  const typeColors = {
    info: 'text-zinc-500',
    process: 'text-zinc-400',
    success: 'text-acid',
    warning: 'text-amber-500',
  };

  return (
    <div className="font-mono text-xs space-y-1.5">
      {codeBlocks[phase].map((line, i) => (
        <motion.div
          key={`${phase}-${i}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className={`${typeColors[line.type]} flex items-center gap-2`}
        >
          <span className="w-1 h-1 rounded-full bg-current opacity-50" />
          <span>{line.text}</span>
        </motion.div>
      ))}
    </div>
  );
};

// =============================================================================
// MAIN EXPORT COMPONENT
// =============================================================================

export const EphemeralAgents: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [procId, setProcId] = useState(generateProcId());
  const [cycleCount, setCycleCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCurrentPhase((p) => {
        if (p >= 2) {
          setTimeout(() => {
            setProcId(generateProcId());
            setCycleCount((c) => c + 1);
          }, 500);
          return 0;
        }
        return p + 1;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [isInView]);

  const currentColor = phases[currentPhase].color;

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-12 bg-zinc-950/50 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at center, ${currentColor} 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-4 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-acid" />
            <span className="font-mono text-xs text-acid uppercase tracking-[0.2em]">02. Just-In-Time Intelligence</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-acid" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-5">
            Ephemeral Agents
          </h2>

          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Agents exist only to serve. They spawn, execute, and self-destruct—leaving{' '}
            <span className="text-white">zero trace</span> behind.
          </p>
        </motion.div>

        {/* Main visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-900/70">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="font-mono text-xs text-zinc-500">agent_lifecycle.sh</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-zinc-600">CYCLES: {cycleCount}</span>
              <span
                className="font-mono text-xs px-2 py-0.5 rounded border"
                style={{
                  color: currentColor,
                  backgroundColor: `${currentColor}10`,
                  borderColor: `${currentColor}40`,
                }}
              >
                {procId}
              </span>
            </div>
          </div>

          {/* Lifecycle timeline */}
          <div className="px-6 py-8">
            <div className="h-[180px] mb-8">
              <LifecycleSVG currentPhase={currentPhase} procId={procId} />
            </div>

            {/* Current phase details */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Status */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">Status</span>
                  <motion.div
                    key={currentPhase}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span
                        className="animate-ping absolute h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: currentColor }}
                      />
                      <span className="relative h-2.5 w-2.5 rounded-full" style={{ backgroundColor: currentColor }} />
                    </span>
                    <span className="font-mono text-xs font-bold" style={{ color: currentColor }}>
                      {phases[currentPhase].label}
                    </span>
                  </motion.div>
                </div>
                <p className="text-sm text-zinc-400">{phases[currentPhase].description}</p>
              </div>

              {/* Agent Structure */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-3">Agent Structure</div>
                <div className="h-[120px]">
                  <AgentStructureSVG phase={phases[currentPhase].id} color={currentColor} />
                </div>
              </div>

              {/* Terminal */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-3">Terminal Output</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TerminalCode phase={phases[currentPhase].id} procId={procId} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Avg Lifetime', value: '847ms', icon: '⏱' },
            { label: 'Memory Footprint', value: '0 bytes', icon: '💾' },
            { label: 'Data Retention', value: 'NONE', icon: '🔒' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 text-center group hover:border-acid/30 transition-colors duration-300"
            >
              <div className="font-mono text-lg md:text-xl font-bold text-acid group-hover:text-glow-acid transition-all">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EphemeralAgents;
