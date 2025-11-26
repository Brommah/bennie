import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * SOPHISTICATED SVG COMPONENTS
 * 
 * Advanced SVG elements featuring:
 * - Complex filter chains (displacement, morphology, lighting)
 * - Generative patterns (circuits, neural networks)
 * - Procedural noise and textures
 * - Isometric 3D-like depth
 * - Advanced gradient techniques
 */

// =============================================================================
// SHARED SVG DEFINITIONS - Use once, reference everywhere
// =============================================================================

export const SharedSVGDefs: React.FC = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      {/* ======================== NOISE & TEXTURE FILTERS ======================== */}
      
      {/* Fractal noise for organic textures */}
      <filter id="fractalNoise" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" seed="15" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      {/* Digital glitch displacement */}
      <filter id="glitchDisplace" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="turbulence" baseFrequency="0.02 0.8" numOctaves="1" seed="2" result="turbulence" />
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="6" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      {/* Chromatic aberration effect */}
      <filter id="chromatic" x="-10%" y="-10%" width="120%" height="120%">
        <feOffset in="SourceGraphic" dx="2" dy="0" result="red">
          <animate attributeName="dx" values="2;-2;2" dur="3s" repeatCount="indefinite" />
        </feOffset>
        <feOffset in="SourceGraphic" dx="-2" dy="0" result="blue">
          <animate attributeName="dx" values="-2;2;-2" dur="3s" repeatCount="indefinite" />
        </feOffset>
        <feColorMatrix in="red" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="redChannel" />
        <feColorMatrix in="blue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blueChannel" />
        <feBlend in="redChannel" in2="blueChannel" mode="screen" result="rbBlend" />
        <feBlend in="rbBlend" in2="SourceGraphic" mode="screen" />
      </filter>

      {/* ======================== GLOW EFFECTS ======================== */}
      
      {/* Intense acid glow */}
      <filter id="acidGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur3" />
        <feMerge>
          <feMergeNode in="blur3" />
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Danger red glow */}
      <filter id="dangerGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
        <feColorMatrix in="blur2" type="matrix" values="1 0 0 0 0.2  0 0.2 0 0 0  0 0 0.2 0 0  0 0 0 1 0" result="tinted" />
        <feMerge>
          <feMergeNode in="tinted" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Ethereal pulse glow */}
      <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
        <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.52  0 0 0 0 0.8  0 0 0 0 0.09  0 0 0 1 0" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* ======================== 3D LIGHTING EFFECTS ======================== */}
      
      {/* Emboss/bevel for depth */}
      <filter id="emboss3d" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
        <feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.75" specularExponent="20" lightingColor="#84cc16" result="specOut">
          <fePointLight x="-5000" y="-10000" z="20000" />
        </feSpecularLighting>
        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2" />
        <feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
      </filter>

      {/* Metallic surface */}
      <filter id="metallicSurface" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
        <feDiffuseLighting in="noise" surfaceScale="2" diffuseConstant="1" lightingColor="#ffffff" result="light">
          <feDistantLight azimuth="45" elevation="60" />
        </feDiffuseLighting>
        <feBlend in="SourceGraphic" in2="light" mode="multiply" />
      </filter>

      {/* ======================== GRADIENTS ======================== */}
      
      {/* Acid gradient - horizontal */}
      <linearGradient id="acidGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#84cc16" stopOpacity="1" />
        <stop offset="50%" stopColor="#22c55e" stopOpacity="1" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
      </linearGradient>

      {/* Acid gradient - vertical */}
      <linearGradient id="acidGradientV" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#84cc16" stopOpacity="0.1" />
        <stop offset="50%" stopColor="#84cc16" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#84cc16" stopOpacity="0.1" />
      </linearGradient>

      {/* Danger gradient */}
      <linearGradient id="dangerGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
        <stop offset="50%" stopColor="#dc2626" stopOpacity="1" />
        <stop offset="100%" stopColor="#b91c1c" stopOpacity="1" />
      </linearGradient>

      {/* Cyber mesh gradient simulation */}
      <radialGradient id="cyberMesh" cx="50%" cy="50%" r="70%" fx="30%" fy="30%">
        <stop offset="0%" stopColor="#84cc16" stopOpacity="0.3" />
        <stop offset="40%" stopColor="#22c55e" stopOpacity="0.15" />
        <stop offset="70%" stopColor="#059669" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>

      {/* Data stream gradient with animation */}
      <linearGradient id="dataStream" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#84cc16" stopOpacity="0">
          <animate attributeName="offset" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </stop>
        <stop offset="50%" stopColor="#84cc16" stopOpacity="1">
          <animate attributeName="offset" values="0.5;1.5;0.5" dur="2s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stopColor="#84cc16" stopOpacity="0">
          <animate attributeName="offset" values="1;2;1" dur="2s" repeatCount="indefinite" />
        </stop>
      </linearGradient>

      {/* ======================== PATTERNS ======================== */}
      
      {/* Circuit board pattern */}
      <pattern id="circuitPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        {/* Horizontal traces */}
        <line x1="0" y1="15" x2="20" y2="15" stroke="#84cc16" strokeWidth="1" opacity="0.3" />
        <line x1="40" y1="15" x2="60" y2="15" stroke="#84cc16" strokeWidth="1" opacity="0.3" />
        <line x1="0" y1="45" x2="30" y2="45" stroke="#84cc16" strokeWidth="1" opacity="0.3" />
        <line x1="45" y1="45" x2="60" y2="45" stroke="#84cc16" strokeWidth="1" opacity="0.3" />
        {/* Vertical traces */}
        <line x1="15" y1="0" x2="15" y2="25" stroke="#84cc16" strokeWidth="1" opacity="0.3" />
        <line x1="45" y1="35" x2="45" y2="60" stroke="#84cc16" strokeWidth="1" opacity="0.3" />
        {/* Connection nodes */}
        <circle cx="15" cy="15" r="2" fill="#84cc16" opacity="0.5" />
        <circle cx="45" cy="45" r="2" fill="#84cc16" opacity="0.5" />
        <rect x="28" y="13" width="4" height="4" fill="#84cc16" opacity="0.4" />
        <rect x="13" y="43" width="4" height="4" fill="#84cc16" opacity="0.4" />
      </pattern>

      {/* Hexagonal grid pattern */}
      <pattern id="hexGrid" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
        <polygon points="28,2 52,15 52,43 28,56 4,43 4,15" fill="none" stroke="#84cc16" strokeWidth="0.5" opacity="0.2" />
        <polygon points="28,58 52,71 52,99 28,112 4,99 4,71" fill="none" stroke="#84cc16" strokeWidth="0.5" opacity="0.2" />
      </pattern>

      {/* Data matrix pattern */}
      <pattern id="dataMatrix" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect x="2" y="2" width="3" height="3" fill="#84cc16" opacity="0.2">
          <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2s" repeatCount="indefinite" begin="0s" />
        </rect>
        <rect x="8" y="2" width="3" height="3" fill="#84cc16" opacity="0.15">
          <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2s" repeatCount="indefinite" begin="0.3s" />
        </rect>
        <rect x="14" y="8" width="3" height="3" fill="#84cc16" opacity="0.25">
          <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2s" repeatCount="indefinite" begin="0.6s" />
        </rect>
        <rect x="2" y="14" width="3" height="3" fill="#84cc16" opacity="0.1">
          <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2s" repeatCount="indefinite" begin="0.9s" />
        </rect>
      </pattern>

      {/* Neural network pattern */}
      <pattern id="neuralNet" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        {/* Nodes */}
        <circle cx="10" cy="20" r="3" fill="#84cc16" opacity="0.4" />
        <circle cx="50" cy="10" r="3" fill="#84cc16" opacity="0.4" />
        <circle cx="90" cy="30" r="3" fill="#84cc16" opacity="0.4" />
        <circle cx="30" cy="50" r="4" fill="#84cc16" opacity="0.5" />
        <circle cx="70" cy="60" r="4" fill="#84cc16" opacity="0.5" />
        <circle cx="20" cy="90" r="3" fill="#84cc16" opacity="0.4" />
        <circle cx="60" cy="85" r="3" fill="#84cc16" opacity="0.4" />
        <circle cx="85" cy="80" r="3" fill="#84cc16" opacity="0.4" />
        {/* Connections */}
        <line x1="10" y1="20" x2="30" y2="50" stroke="#84cc16" strokeWidth="0.5" opacity="0.3" />
        <line x1="50" y1="10" x2="30" y2="50" stroke="#84cc16" strokeWidth="0.5" opacity="0.3" />
        <line x1="50" y1="10" x2="70" y2="60" stroke="#84cc16" strokeWidth="0.5" opacity="0.3" />
        <line x1="90" y1="30" x2="70" y2="60" stroke="#84cc16" strokeWidth="0.5" opacity="0.3" />
        <line x1="30" y1="50" x2="20" y2="90" stroke="#84cc16" strokeWidth="0.5" opacity="0.3" />
        <line x1="30" y1="50" x2="60" y2="85" stroke="#84cc16" strokeWidth="0.5" opacity="0.3" />
        <line x1="70" y1="60" x2="60" y2="85" stroke="#84cc16" strokeWidth="0.5" opacity="0.3" />
        <line x1="70" y1="60" x2="85" y2="80" stroke="#84cc16" strokeWidth="0.5" opacity="0.3" />
      </pattern>

      {/* ======================== MARKERS ======================== */}
      
      {/* Arrow marker */}
      <marker id="arrowAcid" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#84cc16" />
      </marker>

      <marker id="arrowDanger" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
      </marker>

      {/* Diamond marker */}
      <marker id="diamondAcid" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <polygon points="5,0 10,5 5,10 0,5" fill="#84cc16" />
      </marker>

      {/* Circle marker */}
      <marker id="circleAcid" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5">
        <circle cx="5" cy="5" r="4" fill="#84cc16" />
      </marker>

      {/* ======================== CLIP PATHS ======================== */}
      
      {/* Hexagon clip */}
      <clipPath id="hexClip">
        <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
      </clipPath>

      {/* Diamond clip */}
      <clipPath id="diamondClip">
        <polygon points="50,0 100,50 50,100 0,50" />
      </clipPath>

      {/* ======================== MASKS ======================== */}
      
      {/* Fade edges mask */}
      <mask id="fadeEdges">
        <rect width="100%" height="100%" fill="url(#fadeEdgesGrad)" />
      </mask>
      <radialGradient id="fadeEdgesGrad">
        <stop offset="60%" stopColor="white" />
        <stop offset="100%" stopColor="black" />
      </radialGradient>
    </defs>
  </svg>
);

// =============================================================================
// GENERATIVE CIRCUIT BOARD BACKGROUND
// =============================================================================

interface CircuitBoardProps {
  width?: number;
  height?: number;
  density?: number;
  animated?: boolean;
  color?: string;
}

export const CircuitBoard: React.FC<CircuitBoardProps> = ({
  width = 400,
  height = 300,
  density = 8,
  animated = true,
  color = '#84cc16',
}) => {
  const nodes = useMemo(() => {
    const result: { x: number; y: number; type: 'chip' | 'node' | 'via' }[] = [];
    const gridSize = Math.min(width, height) / density;
    
    for (let i = 0; i < density; i++) {
      for (let j = 0; j < density; j++) {
        if (Math.random() > 0.6) {
          result.push({
            x: gridSize * (i + 0.5) + (Math.random() - 0.5) * gridSize * 0.3,
            y: gridSize * (j + 0.5) + (Math.random() - 0.5) * gridSize * 0.3,
            type: Math.random() > 0.7 ? 'chip' : Math.random() > 0.5 ? 'node' : 'via',
          });
        }
      }
    }
    return result;
  }, [width, height, density]);

  const traces = useMemo(() => {
    const result: { x1: number; y1: number; x2: number; y2: number; corners: { x: number; y: number }[] }[] = [];
    
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach((other) => {
        if (Math.random() > 0.7) {
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < Math.min(width, height) / 3) {
            // Create orthogonal path with corner
            const midX = node.x + dx * 0.5;
            result.push({
              x1: node.x,
              y1: node.y,
              x2: other.x,
              y2: other.y,
              corners: Math.random() > 0.5 
                ? [{ x: midX, y: node.y }, { x: midX, y: other.y }]
                : [{ x: node.x, y: node.y + dy * 0.5 }, { x: other.x, y: node.y + dy * 0.5 }],
            });
          }
        }
      });
    });
    return result;
  }, [nodes, width, height]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="traceGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Traces */}
      {traces.map((trace, i) => {
        const pathD = `M ${trace.x1} ${trace.y1} ${trace.corners.map(c => `L ${c.x} ${c.y}`).join(' ')} L ${trace.x2} ${trace.y2}`;
        return (
          <g key={`trace-${i}`}>
            <path
              d={pathD}
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity="0.3"
            />
            {animated && (
              <circle r="2" fill={color} opacity="0.8" filter="url(#traceGlow)">
                <animateMotion
                  path={pathD}
                  dur={`${2 + Math.random() * 2}s`}
                  begin={`${Math.random() * 2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={`node-${i}`} transform={`translate(${node.x}, ${node.y})`}>
          {node.type === 'chip' && (
            <>
              <rect x="-8" y="-6" width="16" height="12" fill="#0a0a0a" stroke={color} strokeWidth="1" rx="1" />
              {/* Pins */}
              {[-6, -2, 2, 6].map((px) => (
                <React.Fragment key={px}>
                  <line x1={px} y1="-6" x2={px} y2="-9" stroke={color} strokeWidth="0.5" opacity="0.5" />
                  <line x1={px} y1="6" x2={px} y2="9" stroke={color} strokeWidth="0.5" opacity="0.5" />
                </React.Fragment>
              ))}
              {animated && (
                <rect x="-6" y="-4" width="3" height="2" fill={color} opacity="0.8">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.1}s`} />
                </rect>
              )}
            </>
          )}
          {node.type === 'node' && (
            <>
              <circle r="3" fill="#0a0a0a" stroke={color} strokeWidth="1" />
              <circle r="1.5" fill={color} opacity="0.6">
                {animated && <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin={`${i * 0.15}s`} />}
              </circle>
            </>
          )}
          {node.type === 'via' && (
            <>
              <circle r="2" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
              <circle r="0.8" fill={color} opacity="0.7" />
            </>
          )}
        </g>
      ))}
    </svg>
  );
};

// =============================================================================
// NEURAL NETWORK VISUALIZATION
// =============================================================================

interface NeuralNetworkProps {
  width?: number;
  height?: number;
  layers?: number[];
  activeConnections?: boolean;
}

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  width = 500,
  height = 300,
  layers = [4, 6, 8, 6, 4],
  activeConnections = true,
}) => {
  const nodePositions = useMemo(() => {
    const positions: { x: number; y: number; layer: number; index: number }[][] = [];
    const layerSpacing = width / (layers.length + 1);
    
    layers.forEach((nodeCount, layerIndex) => {
      const layerNodes: { x: number; y: number; layer: number; index: number }[] = [];
      const nodeSpacing = height / (nodeCount + 1);
      
      for (let i = 0; i < nodeCount; i++) {
        layerNodes.push({
          x: layerSpacing * (layerIndex + 1),
          y: nodeSpacing * (i + 1),
          layer: layerIndex,
          index: i,
        });
      }
      positions.push(layerNodes);
    });
    
    return positions;
  }, [width, height, layers]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#84cc16" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#84cc16" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#84cc16" stopOpacity="0.1" />
        </linearGradient>
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connections */}
      {nodePositions.slice(0, -1).map((layer, layerIndex) =>
        layer.map((node, nodeIndex) =>
          nodePositions[layerIndex + 1].map((nextNode, nextIndex) => {
            const opacity = 0.1 + Math.random() * 0.2;
            const pathId = `conn-${layerIndex}-${nodeIndex}-${nextIndex}`;
            return (
              <g key={pathId}>
                <line
                  x1={node.x}
                  y1={node.y}
                  x2={nextNode.x}
                  y2={nextNode.y}
                  stroke="#84cc16"
                  strokeWidth="0.5"
                  opacity={opacity}
                />
                {activeConnections && Math.random() > 0.7 && (
                  <circle r="2" fill="#84cc16" opacity="0.8">
                    <animateMotion
                      path={`M ${node.x} ${node.y} L ${nextNode.x} ${nextNode.y}`}
                      dur={`${1 + Math.random()}s`}
                      begin={`${Math.random() * 3}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })
        )
      )}

      {/* Nodes */}
      {nodePositions.flat().map((node, i) => {
        const isInputOutput = node.layer === 0 || node.layer === layers.length - 1;
        const radius = isInputOutput ? 6 : 5;
        
        return (
          <g key={`node-${i}`} transform={`translate(${node.x}, ${node.y})`}>
            <circle r={radius + 4} fill="#84cc16" opacity="0.05" />
            <circle r={radius} fill="#0a0a0a" stroke="#84cc16" strokeWidth="1.5" filter="url(#nodeGlow)" />
            <circle r={radius * 0.5} fill="#84cc16" opacity="0.8">
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur={`${1.5 + Math.random()}s`}
                repeatCount="indefinite"
                begin={`${Math.random() * 2}s`}
              />
            </circle>
          </g>
        );
      })}

      {/* Layer labels */}
      {['INPUT', '', 'HIDDEN', '', 'OUTPUT'].map((label, i) => {
        if (!label) return null;
        const x = (width / (layers.length + 1)) * (i + 1);
        return (
          <text
            key={label}
            x={x}
            y={height - 10}
            textAnchor="middle"
            fill="#84cc16"
            fontSize="8"
            fontFamily="monospace"
            opacity="0.5"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
};

// =============================================================================
// ISOMETRIC SERVER RACK (3D-like)
// =============================================================================

interface IsometricServerProps {
  units?: number;
  activeUnits?: number[];
  showActivity?: boolean;
}

export const IsometricServer: React.FC<IsometricServerProps> = ({
  units = 6,
  activeUnits = [0, 1, 2, 3, 4],
  showActivity = true,
}) => {
  // Isometric projection helpers
  const isoX = (x: number, y: number) => (x - y) * Math.cos(Math.PI / 6);
  const isoY = (x: number, y: number, z: number) => (x + y) * Math.sin(Math.PI / 6) - z;

  const unitHeight = 30;
  const rackWidth = 120;
  const rackDepth = 80;

  return (
    <svg viewBox="-100 -50 300 400" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="rackTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id="rackSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id="serverFace" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1f1f1f" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>

      {/* Rack frame - back */}
      <g>
        {/* Back panel */}
        <polygon
          points={`
            ${isoX(0, rackDepth)},${isoY(0, rackDepth, 0)}
            ${isoX(rackWidth, rackDepth)},${isoY(rackWidth, rackDepth, 0)}
            ${isoX(rackWidth, rackDepth)},${isoY(rackWidth, rackDepth, units * unitHeight + 20)}
            ${isoX(0, rackDepth)},${isoY(0, rackDepth, units * unitHeight + 20)}
          `}
          fill="#0a0a0a"
          stroke="#333"
          strokeWidth="1"
        />
      </g>

      {/* Side panel */}
      <polygon
        points={`
          ${isoX(rackWidth, 0)},${isoY(rackWidth, 0, 0)}
          ${isoX(rackWidth, rackDepth)},${isoY(rackWidth, rackDepth, 0)}
          ${isoX(rackWidth, rackDepth)},${isoY(rackWidth, rackDepth, units * unitHeight + 20)}
          ${isoX(rackWidth, 0)},${isoY(rackWidth, 0, units * unitHeight + 20)}
        `}
        fill="url(#rackSide)"
        stroke="#333"
        strokeWidth="1"
      />

      {/* Server units */}
      {Array.from({ length: units }).map((_, i) => {
        const z = i * unitHeight + 10;
        const isActive = activeUnits.includes(i);
        
        return (
          <g key={`unit-${i}`}>
            {/* Server top */}
            <polygon
              points={`
                ${isoX(5, 5)},${isoY(5, 5, z + unitHeight - 5)}
                ${isoX(rackWidth - 5, 5)},${isoY(rackWidth - 5, 5, z + unitHeight - 5)}
                ${isoX(rackWidth - 5, rackDepth - 5)},${isoY(rackWidth - 5, rackDepth - 5, z + unitHeight - 5)}
                ${isoX(5, rackDepth - 5)},${isoY(5, rackDepth - 5, z + unitHeight - 5)}
              `}
              fill={isActive ? '#1a1a1a' : '#111'}
            />
            
            {/* Server front face */}
            <polygon
              points={`
                ${isoX(5, 5)},${isoY(5, 5, z)}
                ${isoX(rackWidth - 5, 5)},${isoY(rackWidth - 5, 5, z)}
                ${isoX(rackWidth - 5, 5)},${isoY(rackWidth - 5, 5, z + unitHeight - 5)}
                ${isoX(5, 5)},${isoY(5, 5, z + unitHeight - 5)}
              `}
              fill="url(#serverFace)"
              stroke={isActive ? '#84cc16' : '#333'}
              strokeWidth={isActive ? 1.5 : 0.5}
            />

            {/* Ventilation holes */}
            {[0.2, 0.35, 0.5, 0.65, 0.8].map((pos, vi) => (
              <line
                key={vi}
                x1={isoX(rackWidth * pos, 5)}
                y1={isoY(rackWidth * pos, 5, z + 5)}
                x2={isoX(rackWidth * pos, 5)}
                y2={isoY(rackWidth * pos, 5, z + unitHeight - 10)}
                stroke={isActive ? '#222' : '#1a1a1a'}
                strokeWidth="3"
              />
            ))}

            {/* Status LEDs */}
            <circle
              cx={isoX(rackWidth - 15, 5)}
              cy={isoY(rackWidth - 15, 5, z + unitHeight / 2)}
              r="3"
              fill={isActive ? '#84cc16' : '#333'}
            >
              {isActive && showActivity && (
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur={`${1 + i * 0.2}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
            <circle
              cx={isoX(rackWidth - 25, 5)}
              cy={isoY(rackWidth - 25, 5, z + unitHeight / 2)}
              r="2"
              fill={isActive ? '#3b82f6' : '#333'}
            />
          </g>
        );
      })}

      {/* Top of rack */}
      <polygon
        points={`
          ${isoX(0, 0)},${isoY(0, 0, units * unitHeight + 20)}
          ${isoX(rackWidth, 0)},${isoY(rackWidth, 0, units * unitHeight + 20)}
          ${isoX(rackWidth, rackDepth)},${isoY(rackWidth, rackDepth, units * unitHeight + 20)}
          ${isoX(0, rackDepth)},${isoY(0, rackDepth, units * unitHeight + 20)}
        `}
        fill="url(#rackTop)"
        stroke="#444"
        strokeWidth="1"
      />

      {/* Front frame edges */}
      <line
        x1={isoX(0, 0)}
        y1={isoY(0, 0, 0)}
        x2={isoX(0, 0)}
        y2={isoY(0, 0, units * unitHeight + 20)}
        stroke="#555"
        strokeWidth="3"
      />
      <line
        x1={isoX(rackWidth, 0)}
        y1={isoY(rackWidth, 0, 0)}
        x2={isoX(rackWidth, 0)}
        y2={isoY(rackWidth, 0, units * unitHeight + 20)}
        stroke="#555"
        strokeWidth="3"
      />
    </svg>
  );
};

// =============================================================================
// DATA FLOW PARTICLES
// =============================================================================

interface DataParticlesProps {
  pathId: string;
  path: string;
  count?: number;
  color?: string;
  speed?: number;
}

export const DataParticles: React.FC<DataParticlesProps> = ({
  pathId,
  path,
  count = 5,
  color = '#84cc16',
  speed = 2,
}) => {
  return (
    <g>
      {/* Define the path */}
      <path id={pathId} d={path} fill="none" stroke="none" />
      
      {/* Particles following the path */}
      {Array.from({ length: count }).map((_, i) => {
        const delay = (i / count) * speed;
        return (
          <g key={i}>
            {/* Main particle */}
            <circle r="3" fill={color}>
              <animateMotion
                dur={`${speed}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              >
                <mpath href={`#${pathId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={`${speed}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* Trail */}
            <circle r="2" fill={color} opacity="0.5">
              <animateMotion
                dur={`${speed}s`}
                begin={`${delay + 0.05}s`}
                repeatCount="indefinite"
              >
                <mpath href={`#${pathId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.5;0.5;0"
                dur={`${speed}s`}
                begin={`${delay + 0.05}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle r="1" fill={color} opacity="0.3">
              <animateMotion
                dur={`${speed}s`}
                begin={`${delay + 0.1}s`}
                repeatCount="indefinite"
              >
                <mpath href={`#${pathId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.3;0.3;0"
                dur={`${speed}s`}
                begin={`${delay + 0.1}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
    </g>
  );
};

// =============================================================================
// CRYPTO HANDSHAKE VISUALIZATION
// =============================================================================

interface CryptoHandshakeProps {
  isMatched: boolean;
  width?: number;
  height?: number;
}

export const CryptoHandshake: React.FC<CryptoHandshakeProps> = ({
  isMatched,
  width = 600,
  height = 300,
}) => {
  const color = isMatched ? '#84cc16' : '#ef4444';
  
  // Generate random-looking but deterministic "encrypted" vectors
  const leftVector = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      x: 80,
      y: 80 + i * 18,
      values: Array.from({ length: 6 }, () => Math.random().toString(16).substr(2, 2).toUpperCase()),
    })), []);

  const rightVector = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      x: width - 80,
      y: 80 + i * 18,
      values: Array.from({ length: 6 }, () => Math.random().toString(16).substr(2, 2).toUpperCase()),
    })), [width]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="cryptoGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <linearGradient id="cryptoBeam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>

        {/* Circuit pattern for background */}
        <pattern id="cryptoGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <line x1="0" y1="20" x2="40" y2="20" stroke={color} strokeWidth="0.3" opacity="0.1" />
          <line x1="20" y1="0" x2="20" y2="40" stroke={color} strokeWidth="0.3" opacity="0.1" />
          <circle cx="20" cy="20" r="1" fill={color} opacity="0.2" />
        </pattern>
      </defs>

      {/* Background grid */}
      <rect width={width} height={height} fill="url(#cryptoGrid)" />

      {/* Left user terminal */}
      <g transform="translate(60, 50)">
        {/* Terminal frame */}
        <rect x="-50" y="-20" width="100" height="180" fill="#0a0a0a" stroke={color} strokeWidth="1" rx="4" opacity="0.8" />
        <rect x="-50" y="-20" width="100" height="24" fill={color} opacity="0.1" />
        <text x="0" y="-2" textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace" fontWeight="bold">USER_A</text>
        
        {/* Vector visualization */}
        <g transform="translate(-40, 15)">
          {leftVector.map((row, i) => (
            <g key={i} transform={`translate(0, ${i * 18})`}>
              <text fill={color} fontSize="7" fontFamily="monospace" opacity="0.7">
                {row.values.join(' ')}
              </text>
            </g>
          ))}
        </g>

        {/* Encryption indicator */}
        <g transform="translate(0, 165)">
          <rect x="-30" y="-8" width="60" height="16" fill={color} opacity="0.1" rx="2" />
          <text textAnchor="middle" y="3" fill={color} fontSize="7" fontFamily="monospace">ENCRYPTED</text>
        </g>
      </g>

      {/* Right user terminal */}
      <g transform={`translate(${width - 60}, 50)`}>
        <rect x="-50" y="-20" width="100" height="180" fill="#0a0a0a" stroke={color} strokeWidth="1" rx="4" opacity="0.8" />
        <rect x="-50" y="-20" width="100" height="24" fill={color} opacity="0.1" />
        <text x="0" y="-2" textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace" fontWeight="bold">USER_B</text>
        
        <g transform="translate(-40, 15)">
          {rightVector.map((row, i) => (
            <g key={i} transform={`translate(0, ${i * 18})`}>
              <text fill={color} fontSize="7" fontFamily="monospace" opacity="0.7">
                {row.values.join(' ')}
              </text>
            </g>
          ))}
        </g>

        <g transform="translate(0, 165)">
          <rect x="-30" y="-8" width="60" height="16" fill={color} opacity="0.1" rx="2" />
          <text textAnchor="middle" y="3" fill={color} fontSize="7" fontFamily="monospace">ENCRYPTED</text>
        </g>
      </g>

      {/* Central verification module */}
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {/* Outer ring */}
        <circle r="55" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 2" opacity="0.3">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite" />
        </circle>
        <circle r="45" fill="none" stroke={color} strokeWidth="1" strokeDasharray="8 4" opacity="0.4">
          <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="15s" repeatCount="indefinite" />
        </circle>
        
        {/* Main module */}
        <rect x="-35" y="-35" width="70" height="70" fill="#050505" stroke={color} strokeWidth="2" rx="6" filter="url(#cryptoGlow)" />
        
        {/* Inner details */}
        <rect x="-28" y="-28" width="56" height="56" fill="none" stroke={color} strokeWidth="0.5" rx="3" opacity="0.3" />
        
        {/* Status icon */}
        {isMatched ? (
          <g stroke={color} strokeWidth="3" strokeLinecap="round">
            <path d="M -12 0 L -4 8 L 14 -10" fill="none">
              <animate attributeName="stroke-dasharray" values="0 30;30 30" dur="0.5s" fill="freeze" />
            </path>
          </g>
        ) : (
          <g stroke={color} strokeWidth="3" strokeLinecap="round">
            <line x1="-10" y1="-10" x2="10" y2="10" />
            <line x1="10" y1="-10" x2="-10" y2="10" />
          </g>
        )}

        {/* Result text */}
        <text y="50" textAnchor="middle" fill={color} fontSize="10" fontFamily="monospace" fontWeight="bold">
          {isMatched ? 'MATCH VERIFIED' : 'NO MATCH'}
        </text>
      </g>

      {/* Data beams - left to center */}
      <g>
        <line x1="115" y1={height / 2} x2={width / 2 - 60} y2={height / 2} stroke="url(#cryptoBeam)" strokeWidth="2" />
        {/* Particles */}
        {[0, 0.3, 0.6].map((delay, i) => (
          <g key={`left-${i}`}>
            <circle r="4" fill={color} filter="url(#cryptoGlow)">
              <animate attributeName="cx" values={`115;${width / 2 - 60}`} dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${height / 2};${height / 2}`} dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </g>

      {/* Data beams - right to center */}
      <g>
        <line x1={width - 115} y1={height / 2} x2={width / 2 + 60} y2={height / 2} stroke="url(#cryptoBeam)" strokeWidth="2" />
        {[0.15, 0.45, 0.75].map((delay, i) => (
          <g key={`right-${i}`}>
            <circle r="4" fill={color} filter="url(#cryptoGlow)">
              <animate attributeName="cx" values={`${width - 115};${width / 2 + 60}`} dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${height / 2};${height / 2}`} dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </g>

      {/* Protocol labels */}
      <text x={width / 2} y="20" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" opacity="0.5">
        ZERO-KNOWLEDGE BLIND MATCH PROTOCOL
      </text>
      <text x={width / 2} y={height - 10} textAnchor="middle" fill={color} fontSize="7" fontFamily="monospace" opacity="0.4">
        // RAW DATA NEVER LEAVES DEVICE
      </text>
    </svg>
  );
};

// =============================================================================
// WAVEFORM VISUALIZATION
// =============================================================================

interface WaveformProps {
  width?: number;
  height?: number;
  bars?: number;
  color?: string;
  animated?: boolean;
}

export const Waveform: React.FC<WaveformProps> = ({
  width = 300,
  height = 80,
  bars = 40,
  color = '#84cc16',
  animated = true,
}) => {
  const barWidth = width / bars - 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {Array.from({ length: bars }).map((_, i) => {
        const baseHeight = Math.sin((i / bars) * Math.PI * 2) * 20 + 30;
        const maxHeight = height - 10;
        
        return (
          <rect
            key={i}
            x={i * (width / bars) + 1}
            y={height / 2}
            width={barWidth}
            rx="1"
            fill="url(#waveGrad)"
            opacity="0.8"
          >
            {animated && (
              <>
                <animate
                  attributeName="height"
                  values={`${baseHeight * 0.3};${baseHeight};${baseHeight * 0.5};${baseHeight * 0.8};${baseHeight * 0.3}`}
                  dur={`${0.8 + Math.random() * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.02}s`}
                />
                <animate
                  attributeName="y"
                  values={`${height / 2 - baseHeight * 0.15};${height / 2 - baseHeight * 0.5};${height / 2 - baseHeight * 0.25};${height / 2 - baseHeight * 0.4};${height / 2 - baseHeight * 0.15}`}
                  dur={`${0.8 + Math.random() * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.02}s`}
                />
              </>
            )}
          </rect>
        );
      })}
    </svg>
  );
};

// =============================================================================
// LOCK/SHIELD ICON (Detailed)
// =============================================================================

interface SecureShieldProps {
  size?: number;
  color?: string;
  locked?: boolean;
}

export const SecureShield: React.FC<SecureShieldProps> = ({
  size = 100,
  color = '#84cc16',
  locked = true,
}) => {
  return (
    <svg viewBox="0 0 100 120" width={size} height={size * 1.2} className="w-full h-full">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <filter id="shieldGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Shield shape */}
      <path
        d="M 50 5 L 90 20 L 90 50 Q 90 90 50 115 Q 10 90 10 50 L 10 20 Z"
        fill="url(#shieldGrad)"
        stroke={color}
        strokeWidth="2"
        filter="url(#shieldGlow)"
      />

      {/* Inner shield detail */}
      <path
        d="M 50 15 L 80 27 L 80 50 Q 80 82 50 103 Q 20 82 20 50 L 20 27 Z"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Lock */}
      <g transform="translate(35, 40)">
        {/* Lock body */}
        <rect x="0" y="20" width="30" height="25" rx="3" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" />
        
        {/* Lock shackle */}
        <path
          d={locked ? "M 5 20 V 12 A 10 10 0 0 1 25 12 V 20" : "M 5 20 V 12 A 10 10 0 0 1 25 12 V 8"}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Keyhole */}
        <circle cx="15" cy="32" r="4" fill={color} />
        <rect x="13" y="32" width="4" height="8" fill={color} />
      </g>

      {/* Decorative circuit lines */}
      <path d="M 25 25 L 25 35 L 15 35" fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <path d="M 75 25 L 75 35 L 85 35" fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <circle cx="25" cy="25" r="2" fill={color} opacity="0.4" />
      <circle cx="75" cy="25" r="2" fill={color} opacity="0.4" />
    </svg>
  );
};

export default {
  SharedSVGDefs,
  CircuitBoard,
  NeuralNetwork,
  IsometricServer,
  DataParticles,
  CryptoHandshake,
  Waveform,
  SecureShield,
};


