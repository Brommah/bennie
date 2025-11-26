import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * The Overlay - BEN as Sovereign Intelligence Layer
 * Shows: Music platforms → YOUR VAULT ← Events
 * BEN Overlay sits on top, processing everything
 */

// Main SVG diagram with fixed particle animations
const OverlayDiagram: React.FC = () => {
  return (
    <svg viewBox="0 0 700 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        {/* Gradients */}
        <linearGradient id="acidGradOv" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#84cc16" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.8"/>
        </linearGradient>
        
        {/* Glow filters */}
        <filter id="greenGlowOv">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* ========== TOP: BEN OVERLAY ========== */}
      <g>
        {/* Overlay frame */}
        <rect x="200" y="40" width="300" height="100" rx="6" fill="#050a02" stroke="#84cc16" strokeWidth="2" filter="url(#greenGlowOv)"/>
        
        {/* Animated dashed border */}
        <rect x="195" y="35" width="310" height="110" rx="8" fill="none" stroke="#84cc16" strokeWidth="1" strokeDasharray="8 4" opacity="0.5">
          <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2s" repeatCount="indefinite"/>
        </rect>
        
        {/* Corner brackets */}
        <path d="M 195 55 L 195 35 L 215 35" fill="none" stroke="#84cc16" strokeWidth="3"/>
        <path d="M 505 55 L 505 35 L 485 35" fill="none" stroke="#84cc16" strokeWidth="3"/>
        <path d="M 195 125 L 195 145 L 215 145" fill="none" stroke="#84cc16" strokeWidth="3"/>
        <path d="M 505 125 L 505 145 L 485 145" fill="none" stroke="#84cc16" strokeWidth="3"/>
        
        {/* Text */}
        <text x="350" y="80" textAnchor="middle" fill="#84cc16" fontSize="11" fontFamily="monospace" letterSpacing="0.15em" opacity="0.9">
          SOVEREIGN INTELLIGENCE
        </text>
        <text x="350" y="115" textAnchor="middle" fill="#84cc16" fontSize="24" fontFamily="monospace" fontWeight="bold">
          BEN OVERLAY
        </text>
      </g>

      {/* ========== CENTER: YOUR VAULT ========== */}
      <g>
        {/* Vault glow */}
        <ellipse cx="350" cy="300" rx="90" ry="55" fill="#84cc16" opacity="0.08" filter="url(#greenGlowOv)"/>
        
        {/* Vault box */}
        <rect x="275" y="260" width="150" height="80" rx="8" fill="#050a02" stroke="#84cc16" strokeWidth="2"/>
        
        {/* Lock icon */}
        <g transform="translate(335, 285)">
          <rect x="0" y="10" width="30" height="22" fill="#84cc16" opacity="0.2" rx="3"/>
          <path d="M 5 10 V 4 A 10 10 0 0 1 25 4 V 10" fill="none" stroke="#84cc16" strokeWidth="2.5"/>
          <circle cx="15" cy="20" r="4" fill="#84cc16"/>
        </g>
        
        {/* Labels */}
        <text x="350" y="250" textAnchor="middle" fill="#84cc16" fontSize="12" fontFamily="monospace" fontWeight="bold">
          YOUR VAULT
        </text>
        <text x="350" y="360" textAnchor="middle" fill="#84cc16" fontSize="10" fontFamily="monospace" opacity="0.7">
          SOVEREIGN_DATA
        </text>
      </g>

      {/* ========== LEFT SIDE: Music Platforms ========== */}
      <g>
        {/* Spotify */}
        <rect x="40" y="200" width="120" height="50" rx="6" fill="#18181b" stroke="#1DB954" strokeWidth="1.5"/>
        <circle cx="70" cy="225" r="14" fill="#1DB954" opacity="0.2"/>
        <text x="100" y="230" textAnchor="middle" fill="#1DB954" fontSize="11" fontFamily="monospace" fontWeight="bold">SPOTIFY</text>
        
        {/* SoundCloud */}
        <rect x="40" y="280" width="120" height="50" rx="6" fill="#18181b" stroke="#ff5500" strokeWidth="1.5"/>
        <circle cx="70" cy="305" r="14" fill="#ff5500" opacity="0.2"/>
        <text x="100" y="310" textAnchor="middle" fill="#ff5500" fontSize="10" fontFamily="monospace" fontWeight="bold">SOUNDCLOUD</text>
        
        {/* Apple Music */}
        <rect x="40" y="360" width="120" height="50" rx="6" fill="#18181b" stroke="#fc3c44" strokeWidth="1.5"/>
        <circle cx="70" cy="385" r="14" fill="#fc3c44" opacity="0.2"/>
        <text x="100" y="390" textAnchor="middle" fill="#fc3c44" fontSize="10" fontFamily="monospace" fontWeight="bold">APPLE MUSIC</text>
        
        {/* Label */}
        <text x="100" y="440" textAnchor="middle" fill="#3b82f6" fontSize="10" fontFamily="monospace" opacity="0.7">MUSIC DATA</text>
      </g>

      {/* ========== RIGHT SIDE: Events & Tickets ========== */}
      <g>
        {/* Ticketmaster */}
        <rect x="540" y="200" width="120" height="50" rx="6" fill="#18181b" stroke="#f97316" strokeWidth="1.5"/>
        <circle cx="630" cy="225" r="14" fill="#f97316" opacity="0.2"/>
        <text x="600" y="230" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="monospace" fontWeight="bold">TICKETMASTER</text>
        
        {/* RA */}
        <rect x="540" y="280" width="120" height="50" rx="6" fill="#18181b" stroke="#ff3366" strokeWidth="1.5"/>
        <circle cx="630" cy="305" r="14" fill="#ff3366" opacity="0.2"/>
        <text x="600" y="310" textAnchor="middle" fill="#ff3366" fontSize="11" fontFamily="monospace" fontWeight="bold">RA</text>
        
        {/* Venues */}
        <rect x="540" y="360" width="120" height="50" rx="6" fill="#18181b" stroke="#eab308" strokeWidth="1.5"/>
        <circle cx="630" cy="385" r="14" fill="#eab308" opacity="0.2"/>
        <text x="600" y="390" textAnchor="middle" fill="#eab308" fontSize="11" fontFamily="monospace" fontWeight="bold">VENUES</text>
        
        {/* Label */}
        <text x="600" y="440" textAnchor="middle" fill="#f97316" fontSize="10" fontFamily="monospace" opacity="0.7">EVENT DATA</text>
      </g>

      {/* ========== FLOW LINES: Left to Center ========== */}
      <g>
        <path d="M 160 225 Q 220 225 275 280" fill="none" stroke="#1DB954" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"/>
        <path d="M 160 305 Q 220 305 275 300" fill="none" stroke="#ff5500" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"/>
        <path d="M 160 385 Q 220 385 275 320" fill="none" stroke="#fc3c44" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"/>
        
        {/* Animated particles from left */}
        <circle r="5" fill="#1DB954">
          <animate attributeName="cx" values="160;275" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="225;280" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle r="5" fill="#ff5500">
          <animate attributeName="cx" values="160;275" dur="2.2s" begin="0.3s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="305;300" dur="2.2s" begin="0.3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" begin="0.3s" repeatCount="indefinite"/>
        </circle>
        <circle r="5" fill="#fc3c44">
          <animate attributeName="cx" values="160;275" dur="2.4s" begin="0.6s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="385;320" dur="2.4s" begin="0.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" begin="0.6s" repeatCount="indefinite"/>
        </circle>
      </g>

      {/* ========== FLOW LINES: Right to Center ========== */}
      <g>
        <path d="M 540 225 Q 480 225 425 280" fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"/>
        <path d="M 540 305 Q 480 305 425 300" fill="none" stroke="#ff3366" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"/>
        <path d="M 540 385 Q 480 385 425 320" fill="none" stroke="#eab308" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"/>
        
        {/* Animated particles from right */}
        <circle r="5" fill="#f97316">
          <animate attributeName="cx" values="540;425" dur="2s" begin="0.2s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="225;280" dur="2s" begin="0.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;1;0" dur="2s" begin="0.2s" repeatCount="indefinite"/>
        </circle>
        <circle r="5" fill="#ff3366">
          <animate attributeName="cx" values="540;425" dur="2.2s" begin="0.5s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="305;300" dur="2.2s" begin="0.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" begin="0.5s" repeatCount="indefinite"/>
        </circle>
        <circle r="5" fill="#eab308">
          <animate attributeName="cx" values="540;425" dur="2.4s" begin="0.8s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="385;320" dur="2.4s" begin="0.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" begin="0.8s" repeatCount="indefinite"/>
        </circle>
      </g>

      {/* ========== CONNECTION: Vault to Overlay ========== */}
      <g>
        {/* Vertical connection line */}
        <line x1="350" y1="145" x2="350" y2="250" stroke="#84cc16" strokeWidth="2" strokeDasharray="4 4" opacity="0.4"/>
        
        {/* Bidirectional particles */}
        <circle r="4" fill="#84cc16">
          <animate attributeName="cy" values="250;145" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="cx" values="350;350" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle r="4" fill="#84cc16">
          <animate attributeName="cy" values="145;250" dur="1.5s" begin="0.75s" repeatCount="indefinite"/>
          <animate attributeName="cx" values="350;350" dur="1.5s" begin="0.75s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin="0.75s" repeatCount="indefinite"/>
        </circle>
      </g>

      {/* Status indicator */}
      <g>
        <circle cx="350" cy="475" r="6" fill="#84cc16">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <text x="370" y="480" fill="#84cc16" fontSize="11" fontFamily="monospace" fontWeight="bold">
          MESH_ACTIVE
        </text>
      </g>
    </svg>
  );
};

export const ExplodedLayers3D: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 md:px-12 bg-black relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(132, 204, 22, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(132, 204, 22, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Diagram */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 h-[500px]">
              <OverlayDiagram />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-acid to-transparent" />
              <span className="font-mono text-xs text-acid uppercase tracking-[0.2em]">
                03. The Overlay
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6">
              The Trojan<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-acid to-emerald-400">
                Horse
              </span>
            </h2>

            <p className="text-lg text-zinc-400 leading-relaxed mb-6">
              BEN upgrades your existing apps (Spotify, Ticketing, Wallets) with a 
              private intelligence layer. We operate as a <span className="text-white font-semibold">sovereign overlay</span>, 
              never needing cooperation from legacy platforms.
            </p>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 mb-6">
              <h4 className="font-mono text-sm text-acid uppercase tracking-wider mb-3">
                Cultural Telemetry
              </h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Your listening history, location, and wallet assets are ingested with permission 
                into your local DDC. The compute happens where your data lives.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 text-center">
                <div className="font-mono text-2xl font-bold text-acid">2</div>
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Layer Architecture</div>
              </div>
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 text-center">
                <div className="font-mono text-2xl font-bold text-acid">∞</div>
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">App Compatibility</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExplodedLayers3D;
