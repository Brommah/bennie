import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/**
 * Neural Stack - SOPHISTICATED CIRCUIT BOARD ARCHITECTURE
 * 
 * Features:
 * - Generative circuit board patterns
 * - Animated data traces
 * - 3D-like layer depth
 * - Interactive layer exploration
 */

interface StackLayer {
  id: string;
  layer: string;
  name: string;
  description: string;
  details: string[];
  color: string;
  hex: string;
}

const stackLayers: StackLayer[] = [
  {
    id: 'l4',
    layer: 'L4',
    name: 'The Skin',
    description: 'Natural Language Interfaces',
    details: [
      'Voice-activated taste queries',
      'Conversational recommendation UI',
      'Multi-modal input processing',
    ],
    color: '#a855f7',
    hex: 'a855f7',
  },
  {
    id: 'l3',
    layer: 'L3',
    name: 'The Muscle',
    description: 'Dockerized Micro-Agents',
    details: [
      'Ephemeral compute instances',
      'Zero-state execution environments',
      'Auto-scaling worker pools',
    ],
    color: '#3b82f6',
    hex: '3b82f6',
  },
  {
    id: 'l2',
    layer: 'L2',
    name: 'The Bones',
    description: 'Distributed Data Clusters',
    details: [
      'Peer-to-peer data mesh',
      'Encrypted shard distribution',
      'Consensus-based validation',
    ],
    color: '#84cc16',
    hex: '84cc16',
  },
  {
    id: 'l1',
    layer: 'L1',
    name: 'The Soul',
    description: 'Zero Knowledge Proofs',
    details: [
      'Privacy-preserving computations',
      'Cryptographic taste vectors',
      'Trustless verification',
    ],
    color: '#f59e0b',
    hex: 'f59e0b',
  },
];

// =============================================================================
// CIRCUIT BOARD VISUALIZATION
// =============================================================================

interface CircuitVisualizationProps {
  activeLayer: string | null;
}

const CircuitVisualization: React.FC<CircuitVisualizationProps> = ({ activeLayer }) => {
  const activeIndex = stackLayers.findIndex((l) => l.id === activeLayer);

  // Generate procedural circuit traces
  const traces = useMemo(() => {
    return stackLayers.map((layer, i) => {
      const baseY = 50 + i * 95;
      return {
        mainPath: `M 20 ${baseY} L 45 ${baseY} L 45 ${baseY + 15} L 65 ${baseY + 15}`,
        branchPath: `M 45 ${baseY} L 45 ${baseY - 20} L 180 ${baseY - 20}`,
        dataPaths: [
          `M 65 ${baseY + 15} L 90 ${baseY + 15} L 90 ${baseY + 30} L 120 ${baseY + 30}`,
          `M 120 ${baseY + 30} L 150 ${baseY + 30} L 150 ${baseY + 15} L 180 ${baseY + 15}`,
        ],
      };
    });
  }, []);

  return (
    <svg viewBox="0 0 200 430" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        {/* Simple circuit pattern */}
        <pattern id="circuitBg" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <line x1="10" y1="0" x2="10" y2="20" stroke="#84cc16" strokeWidth="0.2" opacity="0.1" />
          <line x1="0" y1="10" x2="20" y2="10" stroke="#84cc16" strokeWidth="0.2" opacity="0.1" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="200" height="430" fill="url(#circuitBg)" />

      {/* Main vertical spine */}
      <g>
        {/* Spine shadow */}
        <line x1="22" y1="25" x2="22" y2="405" stroke="#000" strokeWidth="6" opacity="0.3" />
        {/* Spine base */}
        <line x1="20" y1="20" x2="20" y2="400" stroke="#1a1a1a" strokeWidth="4" />
        {/* Spine highlight */}
        <line x1="20" y1="20" x2="20" y2="400" stroke="#2a2a2a" strokeWidth="2" />
        
        {/* Active spine segment */}
        {activeIndex >= 0 && (
          <line
            x1="20"
            y1="20"
            x2="20"
            y2={50 + activeIndex * 95}
            stroke={stackLayers[activeIndex].color}
            strokeWidth="3"
            filter={`url(#${stackLayers[activeIndex].id}Glow)`}
          />
        )}
      </g>

      {/* Layer nodes and circuits */}
      {stackLayers.map((layer, i) => {
        const y = 50 + i * 95;
        const isActive = layer.id === activeLayer;
        const isCompleted = activeIndex >= 0 && i < activeIndex;

        return (
          <g key={layer.id}>
            {/* Layer circuit traces */}
            <g opacity={isActive ? 1 : 0.3}>
              {/* Main horizontal trace */}
              <path
                d={traces[i].mainPath}
                fill="none"
                stroke={isActive ? layer.color : '#27272a'}
                strokeWidth={isActive ? 2 : 1}
              />

              {/* Branch traces */}
              <path
                d={traces[i].branchPath}
                fill="none"
                stroke={isActive ? layer.color : '#27272a'}
                strokeWidth={isActive ? 1.5 : 0.5}
                strokeDasharray={isActive ? '0' : '4 2'}
              />

              {/* Data traces */}
              {traces[i].dataPaths.map((path, pi) => (
                <path
                  key={pi}
                  d={path}
                  fill="none"
                  stroke={isActive ? layer.color : '#27272a'}
                  strokeWidth={isActive ? 1 : 0.5}
                  opacity={isActive ? 0.7 : 0.3}
                />
              ))}

              {/* Via holes - simplified */}
              <circle cx="45" cy={y} r="3" fill="none" stroke={layer.color} strokeWidth="1" opacity={isActive ? 0.6 : 0.2} />
            </g>

            {/* Main layer node */}
            <g transform={`translate(20, ${y})`}>
              {/* Node base */}
              <circle
                r={isActive ? 16 : 11}
                fill={isCompleted || isActive ? `#${layer.hex}15` : '#0a0a0a'}
                stroke={layer.color}
                strokeWidth={isActive ? 2.5 : isCompleted ? 2 : 1}
              />

              {/* Layer label */}
              <text
                y={isActive ? 5 : 4}
                textAnchor="middle"
                fill={isCompleted || isActive ? (isActive ? '#fff' : layer.color) : '#52525b'}
                fontSize={isActive ? '10' : '8'}
                fontFamily="monospace"
                fontWeight="bold"
              >
                {layer.layer}
              </text>
            </g>

            {/* Single data flow particle - only when active */}
            {isActive && (
              <circle r="3" fill={layer.color}>
                <animateMotion path={traces[i].mainPath} dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Endpoint chip */}
            <g transform={`translate(165, ${y - 20})`}>
              <rect
                x="0"
                y="0"
                width="30"
                height="40"
                fill={isActive ? `#${layer.hex}10` : '#0a0a0a'}
                stroke={layer.color}
                strokeWidth={isActive ? 1.5 : 0.5}
                rx="3"
                opacity={isActive ? 1 : 0.4}
              />
              {/* Chip activity indicator */}
              {isActive && (
                <rect x="8" y="15" width="14" height="10" fill={layer.color} rx="1" opacity="0.6" />
              )}
            </g>
          </g>
        );
      })}

      {/* System status */}
      <g transform="translate(100, 415)">
        <text textAnchor="middle" fill="#52525b" fontSize="8" fontFamily="monospace">
          NEURAL_STACK_v2.0
        </text>
      </g>
    </svg>
  );
};

// =============================================================================
// LAYER CARD
// =============================================================================

interface LayerCardProps {
  layer: StackLayer;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const LayerCard: React.FC<LayerCardProps> = ({ layer, isActive, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`
      border rounded-lg overflow-hidden cursor-pointer transition-all duration-300
      ${isActive ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'}
    `}
    onClick={onClick}
  >
    <div className="flex items-center gap-4 p-4">
      {/* Layer badge */}
      <div
        className="w-14 h-14 rounded-lg flex items-center justify-center font-mono text-sm font-bold relative overflow-hidden"
        style={{
          backgroundColor: `${layer.color}10`,
          color: layer.color,
          border: `1.5px solid ${layer.color}40`,
        }}
      >
        {/* Animated background pattern */}
        {isActive && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${layer.color} 1px, transparent 0)`,
              backgroundSize: '8px 8px',
            }}
          />
        )}
        <span className="relative z-10">{layer.layer}</span>
      </div>

      {/* Layer info */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-white">{layer.name}</span>
          {isActive && (
            <span
              className="px-1.5 py-0.5 text-[10px] font-mono rounded flex items-center gap-1"
              style={{ backgroundColor: `${layer.color}20`, color: layer.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: layer.color }} />
              ACTIVE
            </span>
          )}
        </div>
        <span className="font-mono text-xs text-zinc-500">{layer.description}</span>
      </div>

      {/* Expand icon */}
      <svg
        className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>

    {/* Expanded content */}
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4 pt-0">
            <div className="pl-[72px] space-y-2">
              {layer.details.map((detail, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color }} />
                  <span className="font-mono text-xs text-zinc-400">{detail}</span>
                </motion.div>
              ))}
            </div>

            {/* Layer metrics */}
            <div className="mt-4 pl-[72px] flex gap-4">
              {[
                { label: 'Latency', value: `${10 + index * 5}ms` },
                { label: 'Throughput', value: `${100 - index * 15}K/s` },
              ].map((metric) => (
                <div key={metric.label} className="bg-zinc-950 border border-zinc-800 rounded px-3 py-2">
                  <div className="font-mono text-[10px] text-zinc-500 uppercase">{metric.label}</div>
                  <div className="font-mono text-sm font-bold" style={{ color: layer.color }}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// =============================================================================
// MAIN EXPORT COMPONENT
// =============================================================================

export const NeuralStack: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>('l3');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-12 bg-zinc-950/50 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#84cc16 1px, transparent 1px), linear-gradient(90deg, #84cc16 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-4 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-acid" />
            <span className="font-mono text-xs text-acid uppercase tracking-[0.2em]">06. Architecture</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-acid" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-5">
            The Neural Stack
          </h2>

          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Four layers of sovereign intelligence. Each layer is independent, verifiable, and{' '}
            <span className="text-white">completely under your control</span>.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Circuit visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-zinc-900/30 border border-zinc-800 rounded-xl p-4 hidden lg:block"
          >
            <div className="h-[430px]">
              <CircuitVisualization activeLayer={activeLayer} />
            </div>
          </motion.div>

          {/* Layer cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-3"
          >
            {stackLayers.map((layer, index) => (
              <LayerCard
                key={layer.id}
                layer={layer}
                isActive={activeLayer === layer.id}
                onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NeuralStack;
