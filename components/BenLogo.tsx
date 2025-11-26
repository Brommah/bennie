
import React from 'react';

const BenLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg 
        viewBox="0 0 160 60" 
        className="w-full h-full overflow-visible" 
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="benLogoGradient" x1="0" y1="0" x2="1" y2="1">
             <stop offset="0%" stopColor="#ecfccb" /> {/* Pale Lime */}
             <stop offset="40%" stopColor="#84cc16" /> {/* Acid Green */}
             <stop offset="100%" stopColor="#14532d" /> {/* Deep Green */}
          </linearGradient>
          
          <filter id="glow">
             <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
             <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
             </feMerge>
          </filter>

          <pattern id="scanlines" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
             <line x1="0" y1="2" x2="4" y2="2" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
          </pattern>
          
          <clipPath id="textClip">
            <text
              x="80"
              y="52"
              textAnchor="middle"
              fontSize="68"
              fontWeight="900"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.08em' }}
            >
              BEN
            </text>
          </clipPath>
        </defs>
        
        {/* Layer 1: Hard Shadow Offset */}
        <text
          x="80"
          y="52"
          textAnchor="middle"
          fontSize="68"
          fontWeight="900"
          fill="#18181b" 
          stroke="#14532d"
          strokeWidth="6"
          transform="translate(3, 3)"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.08em' }}
        >
          BEN
        </text>

        {/* Layer 2: Main Gradient Body */}
        <text
          x="80"
          y="52"
          textAnchor="middle"
          fontSize="68"
          fontWeight="900"
          fill="url(#benLogoGradient)"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.08em' }}
          filter="url(#glow)"
        >
          BEN
        </text>

        {/* Layer 3: Scanline Texture Overlay */}
        <rect x="0" y="0" width="160" height="60" fill="url(#scanlines)" clipPath="url(#textClip)" opacity="0.4" pointerEvents="none" />
        
        {/* Layer 4: Inner Highlight / Stroke */}
        <text
          x="80"
          y="52"
          textAnchor="middle"
          fontSize="68"
          fontWeight="900"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.08em' }}
        >
          BEN
        </text>
        
        {/* Cyber Accents */}
        <rect x="10" y="12" width="4" height="4" fill="#84cc16" className="animate-pulse" />
        <rect x="10" y="19" width="4" height="4" fill="#84cc16" opacity="0.6"/>
        
        <path d="M 135 52 L 150 52 L 150 48 L 135 48 Z" fill="#84cc16" opacity="0.8" />
        <circle cx="154" cy="12" r="2" fill="#fff" />

      </svg>
    </div>
  );
};

export default BenLogo;
