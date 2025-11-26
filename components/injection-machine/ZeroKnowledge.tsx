import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Zero Knowledge - ADVANCED CRYPTOGRAPHIC VISUALIZATION
 * 
 * Features:
 * - Matrix-style encrypted data streams
 * - Complex handshake protocol animation
 * - Encrypted vector comparison visualization
 * - Cryptographic proof generation effects
 */

// =============================================================================
// SOPHISTICATED HANDSHAKE SVG
// =============================================================================

interface HandshakeSVGProps {
  isMatched: boolean;
}

const HandshakeSVG: React.FC<HandshakeSVGProps> = ({ isMatched }) => {
  const matchColor = isMatched ? '#84cc16' : '#f87171';

  return (
    <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="zkGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="600" height="200" fill="#050505" />

      {/* Left User */}
      <g transform="translate(100, 100)">
        <circle r="40" fill="#0a0a0a" stroke={matchColor} strokeWidth="2" />
        <circle cy="-8" r="12" fill={matchColor} opacity="0.4" />
        <ellipse cy="18" rx="18" ry="10" fill={matchColor} opacity="0.4" />
        <text y="60" textAnchor="middle" fill={matchColor} fontSize="10" fontFamily="monospace" fontWeight="bold">USER_A</text>
      </g>

      {/* Right User */}
      <g transform="translate(500, 100)">
        <circle r="40" fill="#0a0a0a" stroke={matchColor} strokeWidth="2" />
        <circle cy="-8" r="12" fill={matchColor} opacity="0.4" />
        <ellipse cy="18" rx="18" ry="10" fill={matchColor} opacity="0.4" />
        <text y="60" textAnchor="middle" fill={matchColor} fontSize="10" fontFamily="monospace" fontWeight="bold">USER_B</text>
      </g>

      {/* Center Black Box */}
      <g transform="translate(300, 100)">
        <rect x="-50" y="-40" width="100" height="80" fill="#000" stroke={matchColor} strokeWidth="2" rx="8" />
        <rect x="-10" y="5" width="20" height="15" fill={matchColor} opacity="0.3" rx="2" />
        <path d="M -5 5 V -2 A 5 5 0 0 1 5 -2 V 5" fill="none" stroke={matchColor} strokeWidth="2" />
        <text y="-50" textAnchor="middle" fill={matchColor} fontSize="10" fontFamily="monospace" fontWeight="bold">ZK-BOX</text>
        <text y="55" textAnchor="middle" fill={matchColor} fontSize="8" fontFamily="monospace" opacity="0.6">
          {isMatched ? 'VERIFIED' : 'CHECKING'}
        </text>
      </g>

      {/* Connection lines */}
      <line x1="140" y1="100" x2="250" y2="100" stroke={matchColor} strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
      <line x1="350" y1="100" x2="460" y2="100" stroke={matchColor} strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />

      {/* Data particles */}
      <circle r="4" fill={matchColor}>
        <animateMotion path="M 140 100 L 250 100" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle r="4" fill={matchColor}>
        <animateMotion path="M 460 100 L 350 100" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

// =============================================================================
// BINARY STREAM BACKGROUND
// =============================================================================

const BinaryStream: React.FC<{ side: 'left' | 'right'; color: string }> = ({ side, color }) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const generate = () =>
      Array(16)
        .fill(0)
        .map(() =>
          Array(24)
            .fill(0)
            .map(() => (Math.random() > 0.5 ? '1' : '0'))
            .join('')
        );
    setLines(generate());
    const interval = setInterval(() => setLines(generate()), 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`absolute top-0 bottom-0 ${side === 'left' ? 'left-2' : 'right-2'} w-16 overflow-hidden pointer-events-none`}
      style={{ opacity: 0.08 }}
    >
      <div className={`font-mono text-[6px] leading-tight ${side === 'left' ? 'text-right' : 'text-left'}`} style={{ color }}>
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// FEATURE ITEM
// =============================================================================

const FeatureItem: React.FC<{ text: string; delay: number }> = ({ text, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="flex items-center gap-3 group"
  >
    <div className="w-7 h-7 bg-acid/10 border border-acid/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-acid/20 transition-colors">
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-acid" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
    <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">{text}</span>
  </motion.div>
);

// =============================================================================
// MAIN EXPORT COMPONENT
// =============================================================================

export const ZeroKnowledge: React.FC = () => {
  const [isMatched, setIsMatched] = useState(true);
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setIsMatched((p) => !p);
      setCount((c) => c + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isInView]);

  const currentColor = isMatched ? '#84cc16' : '#f87171';

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 md:px-12 bg-black relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${currentColor} 1px, transparent 0)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="order-2 lg:order-1"
          >
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 relative overflow-hidden">
              <BinaryStream side="left" color={currentColor} />
              <BinaryStream side="right" color={currentColor} />

              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: currentColor }}
                  />
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                    Handshake Protocol
                  </span>
                </div>
                <span className="font-mono text-xs" style={{ color: currentColor }}>
                  HANDSHAKES: {count}
                </span>
              </div>

              <div className="h-[300px] relative z-10">
                <HandshakeSVG isMatched={isMatched} />
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10 bg-gradient-to-r from-acid to-transparent" />
              <span className="font-mono text-xs text-acid uppercase tracking-[0.2em]">04. Zero Knowledge</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-5">
              Blind Match
              <br />
              Protocol
            </h2>

            <p className="text-lg text-zinc-400 leading-relaxed mb-4">
              How do you find a party your whole squad likes without sharing your embarrassing playlists?
            </p>

            <p className="text-base text-zinc-500 leading-relaxed mb-8">
              Your agents compare <span className="text-white font-medium">encrypted taste profiles</span>—never sharing
              song names, only mathematical slopes. The result: a binary "Go/No-Go" with{' '}
              <span className="text-acid">zero leakage</span>.
            </p>

            <div className="space-y-4">
              <FeatureItem text="Raw data never leaves your device" delay={0.2} />
              <FeatureItem text="Only encrypted vectors are compared" delay={0.3} />
              <FeatureItem text="Result is binary: Match or No Match" delay={0.4} />
              <FeatureItem text="No third party sees your taste" delay={0.5} />
            </div>

            {/* Proof visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-8 bg-zinc-900/50 border border-zinc-800 rounded-lg p-4"
            >
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-3">
                Cryptographic Proof
              </div>
              <div className="font-mono text-xs text-acid/70 break-all leading-relaxed">
                proof_π = g^r · h^v mod p | verify(π, commitment) → {isMatched ? '✓ TRUE' : '✗ FALSE'}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ZeroKnowledge;
