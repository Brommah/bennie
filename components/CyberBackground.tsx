import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface CyberBackgroundProps {
  variant?: 'grid' | 'circuit' | 'particles' | 'matrix';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

/**
 * Animated cyberpunk-style SVG background component
 * Adds sophisticated ambient effects without impacting performance
 */
const CyberBackground: React.FC<CyberBackgroundProps> = ({ 
  variant = 'grid', 
  intensity = 'medium',
  className = '' 
}) => {
  const opacityMap = { low: 0.15, medium: 0.25, high: 0.4 };
  const baseOpacity = opacityMap[intensity];

  // Generate random positions for particles/nodes
  const nodes = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 5
    })), 
  []);

  // Generate connection lines between nearby nodes
  const connections = useMemo(() => {
    const lines: Array<{ x1: number; y1: number; x2: number; y2: number; id: string }> = [];
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach((other, j) => {
        const distance = Math.sqrt(
          Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
        );
        if (distance < 25) {
          lines.push({
            x1: node.x,
            y1: node.y,
            x2: other.x,
            y2: other.y,
            id: `${i}-${j}`
          });
        }
      });
    });
    return lines;
  }, [nodes]);

  if (variant === 'grid') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="cyberGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <motion.path 
                d="M 60 0 L 0 0 0 60" 
                fill="none" 
                stroke="#84cc16" 
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: baseOpacity }}
                transition={{ duration: 1 }}
              />
            </pattern>
            <radialGradient id="gridFade" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
            <mask id="gridMask">
              <rect width="100%" height="100%" fill="url(#gridFade)" />
            </mask>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#cyberGrid)" mask="url(#gridMask)" />
          
          {/* Animated scan line */}
          <motion.rect
            x="0"
            width="100%"
            height="2"
            fill="url(#scanGradient)"
            initial={{ y: '0%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            opacity={baseOpacity * 2}
          />
          
          {/* Grid intersection highlights */}
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={`highlight-${i}`}
              r="3"
              fill="#84cc16"
              cx={`${20 + i * 15}%`}
              cy={`${30 + (i % 3) * 20}%`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, baseOpacity, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeInOut'
              }}
            />
          ))}
          
          <defs>
            <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (variant === 'circuit') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id="circuitGlow">
              <feGaussianBlur stdDeviation="0.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Circuit paths */}
          {[
            'M 10 20 H 30 V 40 H 50 V 20 H 70',
            'M 20 80 H 40 V 60 H 60 V 80 H 80',
            'M 5 50 H 25 V 30 H 45 V 70 H 65 V 50 H 95',
            'M 15 10 V 30 H 35 V 50 H 55 V 30 H 75 V 10'
          ].map((path, i) => (
            <g key={`circuit-${i}`}>
              {/* Base path */}
              <motion.path
                d={path}
                fill="none"
                stroke="#84cc16"
                strokeWidth="0.3"
                opacity={baseOpacity * 0.5}
                filter="url(#circuitGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.3 }}
              />
              {/* Animated energy flow */}
              <motion.path
                d={path}
                fill="none"
                stroke="#bef264"
                strokeWidth="0.5"
                strokeDasharray="5 45"
                animate={{ strokeDashoffset: [50, 0] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: 'linear',
                  delay: i * 0.5 
                }}
                opacity={baseOpacity}
              />
            </g>
          ))}
          
          {/* Circuit nodes */}
          {[
            { x: 30, y: 20 }, { x: 50, y: 40 }, { x: 70, y: 20 },
            { x: 40, y: 60 }, { x: 60, y: 80 }, { x: 25, y: 50 },
            { x: 45, y: 30 }, { x: 65, y: 50 }
          ].map((node, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={node.x}
              cy={node.y}
              r="1"
              fill="#84cc16"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [baseOpacity, baseOpacity * 2, baseOpacity]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut'
              }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === 'particles') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id="particleGlow">
              <feGaussianBlur stdDeviation="0.3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="particleFade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#bef264" />
              <stop offset="100%" stopColor="#84cc16" />
            </radialGradient>
          </defs>
          
          {/* Connection lines */}
          {connections.map(({ x1, y1, x2, y2, id }) => (
            <motion.line
              key={`line-${id}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#84cc16"
              strokeWidth="0.2"
              initial={{ opacity: 0 }}
              animate={{ opacity: baseOpacity * 0.5 }}
              transition={{ duration: 1 }}
            />
          ))}
          
          {/* Animated particles */}
          {nodes.map(({ id, x, y, size, delay }) => (
            <motion.circle
              key={`particle-${id}`}
              cx={`${x}%`}
              cy={`${y}%`}
              r={size * 0.3}
              fill="url(#particleFade)"
              filter="url(#particleGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, baseOpacity, baseOpacity * 0.5, baseOpacity, 0],
                scale: [0.5, 1, 1.2, 1, 0.5],
                cx: [`${x}%`, `${x + (Math.random() - 0.5) * 5}%`, `${x}%`],
                cy: [`${y}%`, `${y + (Math.random() - 0.5) * 5}%`, `${y}%`]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay,
                ease: 'easeInOut'
              }}
            />
          ))}
          
          {/* Floating hex shapes */}
          {[...Array(3)].map((_, i) => (
            <motion.polygon
              key={`hex-${i}`}
              points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
              fill="none"
              stroke="#84cc16"
              strokeWidth="0.2"
              opacity={baseOpacity * 0.3}
              transform={`translate(${20 + i * 30}, ${20 + i * 20}) scale(0.1)`}
              animate={{ 
                rotate: [0, 360],
                scale: [0.08, 0.12, 0.08]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 4, repeat: Infinity, delay: i * 0.5 }
              }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === 'matrix') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="matrixFade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#84cc16" stopOpacity="0" />
              <stop offset="50%" stopColor="#84cc16" stopOpacity="1" />
              <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Falling data streams */}
          {[...Array(15)].map((_, i) => (
            <motion.g key={`stream-${i}`}>
              <motion.rect
                x={5 + i * 6.5}
                width="0.5"
                height="20"
                fill="url(#matrixFade)"
                initial={{ y: -20 }}
                animate={{ y: 120 }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'linear'
                }}
                opacity={baseOpacity * (0.5 + Math.random() * 0.5)}
              />
              {/* Character nodes */}
              {[...Array(3)].map((_, j) => (
                <motion.text
                  key={`char-${i}-${j}`}
                  x={5 + i * 6.5}
                  fontSize="2"
                  fill="#84cc16"
                  fontFamily="monospace"
                  initial={{ y: -5 - j * 5 }}
                  animate={{ y: 115 - j * 5 }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: 'linear'
                  }}
                  opacity={baseOpacity * (0.3 + j * 0.2)}
                >
                  {String.fromCharCode(48 + Math.floor(Math.random() * 10))}
                </motion.text>
              ))}
            </motion.g>
          ))}
        </svg>
      </div>
    );
  }

  return null;
};

export default CyberBackground;

