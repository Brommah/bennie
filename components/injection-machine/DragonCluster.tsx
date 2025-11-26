import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Dragon 1 Cluster - ADVANCED INFRASTRUCTURE VISUALIZATION
 * 
 * Features:
 * - Isometric 3D server rack
 * - Real-time network topology
 * - Animated data flow mesh
 * - Live telemetry dashboard
 */

// =============================================================================
// ISOMETRIC 3D SERVER RACK
// =============================================================================

interface IsometricServerRackProps {
  activeUnits?: number[];
}

const IsometricServerRack: React.FC<IsometricServerRackProps> = ({ activeUnits = [0, 1, 2, 3, 4] }) => {
  // Isometric projection helpers
  const isoAngle = Math.PI / 6;
  const cos30 = Math.cos(isoAngle);
  const sin30 = Math.sin(isoAngle);

  const toIso = (x: number, y: number, z: number) => ({
    x: (x - y) * cos30 + 150,
    y: (x + y) * sin30 - z + 200,
  });

  const units = 6;
  const unitHeight = 28;
  const rackWidth = 100;
  const rackDepth = 60;

  return (
    <svg viewBox="0 0 300 350" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        {/* Gradient for rack top */}
        <linearGradient id="rackTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        
        {/* Gradient for server face */}
        <linearGradient id="serverFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1f1f1f" />
          <stop offset="50%" stopColor="#171717" />
          <stop offset="100%" stopColor="#0f0f0f" />
        </linearGradient>

        {/* Server side gradient */}
        <linearGradient id="serverSideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#151515" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>

        {/* LED glow */}
        <filter id="ledGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Rack emboss */}
        <filter id="rackEmboss">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="4" specularConstant="0.5" specularExponent="10" lightingColor="#ffffff" result="spec">
            <fePointLight x="50" y="50" z="200" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="spec2" />
          <feComposite in="SourceGraphic" in2="spec2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>
      </defs>

      {/* Rack base/floor */}
      <polygon
        points={`
          ${toIso(0, 0, 0).x},${toIso(0, 0, 0).y}
          ${toIso(rackWidth, 0, 0).x},${toIso(rackWidth, 0, 0).y}
          ${toIso(rackWidth, rackDepth, 0).x},${toIso(rackWidth, rackDepth, 0).y}
          ${toIso(0, rackDepth, 0).x},${toIso(0, rackDepth, 0).y}
        `}
        fill="#0a0a0a"
        stroke="#333"
        strokeWidth="1"
      />

      {/* Rack back panel */}
      <polygon
        points={`
          ${toIso(0, rackDepth, 0).x},${toIso(0, rackDepth, 0).y}
          ${toIso(rackWidth, rackDepth, 0).x},${toIso(rackWidth, rackDepth, 0).y}
          ${toIso(rackWidth, rackDepth, units * unitHeight + 20).x},${toIso(rackWidth, rackDepth, units * unitHeight + 20).y}
          ${toIso(0, rackDepth, units * unitHeight + 20).x},${toIso(0, rackDepth, units * unitHeight + 20).y}
        `}
        fill="#0a0a0a"
        stroke="#222"
        strokeWidth="0.5"
      />

      {/* Rack side panel */}
      <polygon
        points={`
          ${toIso(rackWidth, 0, 0).x},${toIso(rackWidth, 0, 0).y}
          ${toIso(rackWidth, rackDepth, 0).x},${toIso(rackWidth, rackDepth, 0).y}
          ${toIso(rackWidth, rackDepth, units * unitHeight + 20).x},${toIso(rackWidth, rackDepth, units * unitHeight + 20).y}
          ${toIso(rackWidth, 0, units * unitHeight + 20).x},${toIso(rackWidth, 0, units * unitHeight + 20).y}
        `}
        fill="url(#serverSideGrad)"
        stroke="#333"
        strokeWidth="0.5"
      />

      {/* Server units */}
      {Array.from({ length: units }).map((_, i) => {
        const z = i * unitHeight + 8;
        const isActive = activeUnits.includes(i);
        const serverPadding = 5;

        // Calculate server corners
        const frontTopLeft = toIso(serverPadding, serverPadding, z + unitHeight - 4);
        const frontTopRight = toIso(rackWidth - serverPadding, serverPadding, z + unitHeight - 4);
        const frontBottomLeft = toIso(serverPadding, serverPadding, z);
        const frontBottomRight = toIso(rackWidth - serverPadding, serverPadding, z);
        const topBackLeft = toIso(serverPadding, rackDepth - serverPadding, z + unitHeight - 4);
        const topBackRight = toIso(rackWidth - serverPadding, rackDepth - serverPadding, z + unitHeight - 4);

        return (
          <g key={`unit-${i}`}>
            {/* Server top face */}
            <polygon
              points={`
                ${frontTopLeft.x},${frontTopLeft.y}
                ${frontTopRight.x},${frontTopRight.y}
                ${topBackRight.x},${topBackRight.y}
                ${topBackLeft.x},${topBackLeft.y}
              `}
              fill={isActive ? '#1a1a1a' : '#111'}
              stroke={isActive ? '#333' : '#222'}
              strokeWidth="0.5"
            />

            {/* Server front face */}
            <polygon
              points={`
                ${frontBottomLeft.x},${frontBottomLeft.y}
                ${frontBottomRight.x},${frontBottomRight.y}
                ${frontTopRight.x},${frontTopRight.y}
                ${frontTopLeft.x},${frontTopLeft.y}
              `}
              fill="url(#serverFaceGrad)"
              stroke={isActive ? '#84cc16' : '#333'}
              strokeWidth={isActive ? 1 : 0.5}
              filter={isActive ? 'url(#rackEmboss)' : undefined}
            />

            {/* Ventilation pattern */}
            {isActive && (
              <g>
                {[0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85].map((pos, vi) => {
                  const ventTop = toIso(rackWidth * pos, serverPadding, z + unitHeight - 8);
                  const ventBottom = toIso(rackWidth * pos, serverPadding, z + 4);
                  return (
                    <line
                      key={vi}
                      x1={ventTop.x}
                      y1={ventTop.y}
                      x2={ventBottom.x}
                      y2={ventBottom.y}
                      stroke="#0a0a0a"
                      strokeWidth="3"
                    />
                  );
                })}
              </g>
            )}

            {/* Status LEDs */}
            {(() => {
              const ledPos = toIso(rackWidth - 15, serverPadding, z + unitHeight / 2);
              const pwrPos = toIso(rackWidth - 25, serverPadding, z + unitHeight / 2);
              return (
                <>
                  <circle
                    cx={ledPos.x}
                    cy={ledPos.y}
                    r="3"
                    fill={isActive ? '#84cc16' : '#333'}
                    filter={isActive ? 'url(#ledGlow)' : undefined}
                  >
                    {isActive && (
                      <animate
                        attributeName="opacity"
                        values="0.6;1;0.6"
                        dur={`${1 + i * 0.2}s`}
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                  <circle cx={pwrPos.x} cy={pwrPos.y} r="2" fill={isActive ? '#3b82f6' : '#333'} />
                </>
              );
            })()}

            {/* Activity indicator bar */}
            {isActive && (
              (() => {
                const barStart = toIso(15, serverPadding, z + unitHeight / 2 + 2);
                const barEnd = toIso(15, serverPadding, z + unitHeight / 2 - 2);
                return (
                  <line
                    x1={barStart.x}
                    y1={barStart.y}
                    x2={barEnd.x}
                    y2={barEnd.y}
                    stroke="#84cc16"
                    strokeWidth="3"
                    opacity="0.6"
                  />
                );
              })()
            )}
          </g>
        );
      })}

      {/* Rack top */}
      <polygon
        points={`
          ${toIso(0, 0, units * unitHeight + 20).x},${toIso(0, 0, units * unitHeight + 20).y}
          ${toIso(rackWidth, 0, units * unitHeight + 20).x},${toIso(rackWidth, 0, units * unitHeight + 20).y}
          ${toIso(rackWidth, rackDepth, units * unitHeight + 20).x},${toIso(rackWidth, rackDepth, units * unitHeight + 20).y}
          ${toIso(0, rackDepth, units * unitHeight + 20).x},${toIso(0, rackDepth, units * unitHeight + 20).y}
        `}
        fill="url(#rackTopGrad)"
        stroke="#444"
        strokeWidth="1"
      />

      {/* Front frame edges */}
      <line
        x1={toIso(0, 0, 0).x}
        y1={toIso(0, 0, 0).y}
        x2={toIso(0, 0, units * unitHeight + 20).x}
        y2={toIso(0, 0, units * unitHeight + 20).y}
        stroke="#555"
        strokeWidth="4"
      />
      <line
        x1={toIso(rackWidth, 0, 0).x}
        y1={toIso(rackWidth, 0, 0).y}
        x2={toIso(rackWidth, 0, units * unitHeight + 20).x}
        y2={toIso(rackWidth, 0, units * unitHeight + 20).y}
        stroke="#555"
        strokeWidth="4"
      />

      {/* Status text */}
      <text x="150" y="320" textAnchor="middle" fill="#84cc16" fontSize="10" fontFamily="monospace">
        {activeUnits.length}/{units} NODES ACTIVE
      </text>
    </svg>
  );
};

// =============================================================================
// NETWORK TOPOLOGY VISUALIZATION
// =============================================================================

const NetworkTopology: React.FC = () => {
  // Generate network nodes
  const nodes = useMemo(() => {
    const centerX = 200;
    const centerY = 100;
    const result = [{ x: centerX, y: centerY, type: 'core' as const }];
    
    // Inner ring
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60 - 30) * (Math.PI / 180);
      result.push({
        x: centerX + Math.cos(angle) * 50,
        y: centerY + Math.sin(angle) * 45,
        type: 'relay' as const,
      });
    }
    
    // Outer ring
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 15) * (Math.PI / 180);
      result.push({
        x: centerX + Math.cos(angle) * 90,
        y: centerY + Math.sin(angle) * 80,
        type: 'peer' as const,
      });
    }
    
    return result;
  }, []);

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <radialGradient id="coreGrad" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#84cc16" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#84cc16" stopOpacity="0.3" />
        </radialGradient>
      </defs>

      {/* Connection lines */}
      <g opacity="0.3">
        {/* Core to relays */}
        {nodes.slice(1, 7).map((node, i) => (
          <line
            key={`core-relay-${i}`}
            x1={nodes[0].x}
            y1={nodes[0].y}
            x2={node.x}
            y2={node.y}
            stroke="#84cc16"
            strokeWidth="1.5"
          />
        ))}
        
        {/* Relays to peers */}
        {nodes.slice(1, 7).map((relay, ri) =>
          nodes.slice(7).map((peer, pi) => {
            const dx = peer.x - relay.x;
            const dy = peer.y - relay.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 60) {
              return (
                <line
                  key={`relay-peer-${ri}-${pi}`}
                  x1={relay.x}
                  y1={relay.y}
                  x2={peer.x}
                  y2={peer.y}
                  stroke="#84cc16"
                  strokeWidth="0.5"
                />
              );
            }
            return null;
          })
        )}
      </g>

      {/* Data flow particles - only 3 */}
      {nodes.slice(1, 4).map((node, i) => (
        <circle key={`particle-${i}`} r="3" fill="#84cc16">
          <animateMotion path={`M ${nodes[0].x} ${nodes[0].y} L ${node.x} ${node.y}`} dur="2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.7;0" dur="2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const isCore = node.type === 'core';
        const isRelay = node.type === 'relay';
        const size = isCore ? 12 : isRelay ? 6 : 4;
        
        return (
          <g key={`node-${i}`} transform={`translate(${node.x}, ${node.y})`}>
            {isCore && (
              <circle r="18" fill="url(#coreGrad)" filter="url(#nodeGlow)" />
            )}
            <circle
              r={size}
              fill={isCore ? '#84cc16' : '#0a0a0a'}
              stroke="#84cc16"
              strokeWidth={isCore ? 2 : 1}
              filter={isCore ? 'url(#nodeGlow)' : undefined}
              opacity={isCore ? 1 : 0.7}
            />
            {isCore && (
              <text y="4" textAnchor="middle" fill="#000" fontSize="8" fontFamily="monospace" fontWeight="bold">
                D1
              </text>
            )}
          </g>
        );
      })}

      {/* Labels */}
      <text x="200" y="195" textAnchor="middle" fill="#84cc16" fontSize="8" fontFamily="monospace" opacity="0.6">
        DRAGON_1_MESH_NETWORK
      </text>
    </svg>
  );
};

// =============================================================================
// NETWORK STATUS CHECKMARKS
// =============================================================================

const NetworkStatus: React.FC = () => {
  const statuses = [
    { label: 'P2P Mesh', active: true },
    { label: 'Encrypted', active: true },
    { label: 'Synced', active: true },
  ];

  return (
    <div className="flex flex-col gap-2">
      {statuses.map((status, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${status.active ? 'bg-acid/20 border border-acid' : 'bg-zinc-800 border border-zinc-700'}`}>
            {status.active && (
              <svg className="w-3 h-3 text-acid" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className={`font-mono text-sm ${status.active ? 'text-acid' : 'text-zinc-600'}`}>{status.label}</span>
        </div>
      ))}
    </div>
  );
};

// Legacy waveform - keeping for reference but not used
const _ActivityWaveform: React.FC = () => {
  const [bars] = useState(() =>
    Array.from({ length: 50 }, () => 20 + Math.random() * 60)
  );

  return (
    <svg viewBox="0 0 300 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#84cc16" stopOpacity="1" />
          <stop offset="100%" stopColor="#84cc16" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 20, 40, 60].map((y) => (
        <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#222" strokeWidth="0.5" />
      ))}

      {/* Bars */}
      {bars.map((height, i) => (
        <rect
          key={i}
          x={i * 6 + 1}
          y={80 - height}
          width="4"
          height={height}
          fill="url(#waveGrad)"
          rx="1"
        >
          <animate
            attributeName="height"
            values={`${height * 0.3};${height};${height * 0.5};${height * 0.8};${height * 0.3}`}
            dur={`${0.6 + Math.random() * 0.4}s`}
            repeatCount="indefinite"
            begin={`${i * 0.02}s`}
          />
          <animate
            attributeName="y"
            values={`${80 - height * 0.3};${80 - height};${80 - height * 0.5};${80 - height * 0.8};${80 - height * 0.3}`}
            dur={`${0.6 + Math.random() * 0.4}s`}
            repeatCount="indefinite"
            begin={`${i * 0.02}s`}
          />
        </rect>
      ))}
    </svg>
  );
};

// =============================================================================
// METRIC CARD
// =============================================================================

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  status?: 'online' | 'warning' | 'offline';
  animate?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, status = 'online', animate }) => (
  <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 relative overflow-hidden group hover:border-acid/30 transition-colors">
    <div className="absolute inset-0 bg-gradient-to-br from-acid/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">
    <div className="flex items-center justify-between mb-2">
      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">{label}</span>
      {status && (
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute h-full w-full rounded-full opacity-75 ${
                status === 'online' ? 'bg-acid' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
            />
            <span
              className={`relative h-2 w-2 rounded-full ${
                status === 'online' ? 'bg-acid' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
            />
        </span>
      )}
    </div>
    <div className="flex items-baseline gap-1">
      <span className={`font-mono text-2xl md:text-3xl font-bold ${animate ? 'text-acid' : 'text-white'}`}>
        {value}
      </span>
      {unit && <span className="font-mono text-sm text-zinc-500">{unit}</span>}
      </div>
    </div>
  </div>
);

// =============================================================================
// MAIN EXPORT COMPONENT
// =============================================================================

export const DragonCluster: React.FC = () => {
  const [latency, setLatency] = useState(113);
  const [blockHeight, setBlockHeight] = useState(18547829);
  const [uptime, setUptime] = useState('99.97');
  const [activeUnits, setActiveUnits] = useState([0, 1, 2, 3, 4]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    
    const latencyInterval = setInterval(() => {
      setLatency(110 + Math.floor(Math.random() * 15));
    }, 100);
    
    const blockInterval = setInterval(() => {
      setBlockHeight((h) => h + Math.floor(Math.random() * 3) + 1);
    }, 800);
    
    const uptimeInterval = setInterval(() => {
      setUptime((99.95 + Math.random() * 0.04).toFixed(2));
    }, 5000);

    // Occasional node flicker
    const nodeInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        const randomUnit = Math.floor(Math.random() * 6);
        setActiveUnits((prev) => {
          if (prev.includes(randomUnit)) {
            return prev.filter((u) => u !== randomUnit);
          }
          return [...prev, randomUnit].slice(-5);
        });
      }
    }, 3000);
    
    return () => {
      clearInterval(latencyInterval);
      clearInterval(blockInterval);
      clearInterval(uptimeInterval);
      clearInterval(nodeInterval);
    };
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-12 bg-black relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#84cc16 1px, transparent 1px), linear-gradient(90deg, #84cc16 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-4 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-acid" />
            <span className="font-mono text-xs text-acid uppercase tracking-[0.2em]">05. Infrastructure</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-acid" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-5">
            Dragon 1 Cluster
          </h2>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Self-healing, peer-to-peer infrastructure. No single point of failure.{' '}
            <span className="text-white">Your data, your compute, your rules.</span>
          </p>
        </motion.div>

        {/* Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 md:p-8"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-acid animate-pulse" />
              <span className="font-mono text-sm text-acid font-bold">CLUSTER_STATUS: OPERATIONAL</span>
            </div>
            <span className="font-mono text-xs text-zinc-500">REGION: SOVEREIGN_MESH</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: Isometric server rack */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
              <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-3">Node Cluster</div>
              <div className="h-[350px]">
                <IsometricServerRack activeUnits={activeUnits} />
              </div>
            </div>

            {/* Center: Metrics + Network */}
            <div className="space-y-4">
              <MetricCard label="Latency" value={latency} unit="ms" animate status="online" />
              <MetricCard label="Block Height" value={blockHeight.toLocaleString()} animate status="online" />
              <MetricCard label="Uptime" value={uptime} unit="%" status="online" />
              <MetricCard label="Active Peers" value="2,847" status="online" />
            </div>

            {/* Right: Network + Activity */}
            <div className="space-y-4">
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-3">Network Topology</div>
                <div className="h-[200px]">
                  <NetworkTopology />
                </div>
              </div>
              
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-3">Network Status</div>
                <NetworkStatus />
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2">Consensus</div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-bold text-acid">PROOF_OF_TASTE</span>
                  <span className="px-2 py-0.5 bg-acid/10 border border-acid/30 rounded text-xs text-acid font-mono">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DragonCluster;
