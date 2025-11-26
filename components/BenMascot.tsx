import React from 'react';

interface BenMascotProps {
  className?: string;
  showSpeechBubble?: boolean;
}

const BenMascot: React.FC<BenMascotProps> = ({ className = '', showSpeechBubble = true }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Speech Bubble - Conditional */}
      {showSpeechBubble && (
        <div className="absolute -top-16 -left-24 z-50 animate-float" style={{ animationDelay: '1s' }}>
          <div className="relative w-[220px] h-[100px] transform -rotate-2">
             <svg className="absolute inset-0 w-full h-full drop-shadow-xl" viewBox="0 0 220 110" fill="none">
                <path d="M10 20C10 14.4772 14.4772 10 20 10H200C205.523 10 210 14.4772 210 20V80C210 85.5228 205.523 90 200 90H170L200 105L180 90H20C14.4772 90 10 85.5228 10 80V20Z" fill="white" stroke="#84cc16" strokeWidth="4"/>
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 pb-4 pl-2 text-center">
                <span className="font-black text-black text-sm uppercase tracking-tight">Hi, I'm BEN.</span>
                <span className="font-black text-acid text-base uppercase tracking-tight drop-shadow-sm">Let's Fucking Party.</span>
             </div>
          </div>
        </div>
      )}

      {/* Friendly Geometric Robot SVG with Disco Ball Earrings */}
      <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible drop-shadow-[0_20px_40px_rgba(20,83,45,0.6)]">
        <defs>
          {/* Metallic Green Body Gradient */}
          <linearGradient id="robotMetal" x1="0" y1="0" x2="1" y2="1">
             <stop offset="0%" stopColor="#d9f99d" />   {/* Light Highlight */}
             <stop offset="30%" stopColor="#84cc16" />  {/* Main Acid Green */}
             <stop offset="80%" stopColor="#3f6212" />  {/* Shadow */}
             <stop offset="100%" stopColor="#14532d" /> {/* Deep Metallic Shadow */}
          </linearGradient>

          {/* Ear Module Gradient */}
          <linearGradient id="earGradient" x1="0" y1="0" x2="1" y2="0">
             <stop offset="0%" stopColor="#1a2e05" />
             <stop offset="50%" stopColor="#4d7c0f" />
             <stop offset="100%" stopColor="#1a2e05" />
          </linearGradient>

          {/* Disco Ball Gradient - Metallic Silver */}
          <radialGradient id="discoBallGrad" cx="30%" cy="30%" r="70%">
             <stop offset="0%" stopColor="#ffffff" />
             <stop offset="20%" stopColor="#e8e8e8" />
             <stop offset="50%" stopColor="#c0c0c0" />
             <stop offset="80%" stopColor="#808080" />
             <stop offset="100%" stopColor="#404040" />
          </radialGradient>

          {/* Disco Ball Sparkle Filter */}
          <filter id="discoSparkle" x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
             <feSpecularLighting in="blur" surfaceScale="3" specularConstant="1.5" specularExponent="20" lightingColor="#ffffff" result="spec">
                <fePointLight x="-100" y="-100" z="200">
                   <animate attributeName="x" values="-100;100;-100" dur="3s" repeatCount="indefinite" />
                   <animate attributeName="y" values="-100;50;-100" dur="2s" repeatCount="indefinite" />
                </fePointLight>
             </feSpecularLighting>
             <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
             <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>

          {/* Rainbow Sparkle Gradient for light reflections */}
          <linearGradient id="rainbowSparkle" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#ff6b6b">
                <animate attributeName="stop-color" values="#ff6b6b;#ffd93d;#6bcb77;#4d96ff;#ff6b6b" dur="2s" repeatCount="indefinite" />
             </stop>
             <stop offset="50%" stopColor="#ffd93d">
                <animate attributeName="stop-color" values="#ffd93d;#6bcb77;#4d96ff;#ff6b6b;#ffd93d" dur="2s" repeatCount="indefinite" />
             </stop>
             <stop offset="100%" stopColor="#6bcb77">
                <animate attributeName="stop-color" values="#6bcb77;#4d96ff;#ff6b6b;#ffd93d;#6bcb77" dur="2s" repeatCount="indefinite" />
             </stop>
          </linearGradient>

          {/* Disco glow effect */}
          <filter id="discoGlow" x="-100%" y="-100%" width="300%" height="300%">
             <feGaussianBlur stdDeviation="2" result="glow" />
             <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
             </feMerge>
          </filter>
        </defs>

        {/* Floating Animation + TILT applied to the whole body */}
        <g className="animate-float-slow" transform="rotate(-8 200 200)">
            
            {/* Antenna */}
            <g transform="translate(200, 90)">
                <line x1="0" y1="0" x2="0" y2="-35" stroke="#3f6212" strokeWidth="4" strokeLinecap="round" />
                <circle cx="0" cy="-35" r="8" fill="#bef264" stroke="#365314" strokeWidth="2" />
                <circle cx="0" cy="-35" r="14" fill="none" stroke="#bef264" strokeWidth="2" className="animate-ping" opacity="0.6" />
            </g>

            {/* Left Ear Module (Back Layer) */}
            <rect x="65" y="170" width="40" height="70" rx="12" fill="url(#earGradient)" stroke="#1a2e05" strokeWidth="2" />
            
            {/* RIGHT DISCO BALL EARRING - Hanging from right ear */}
            <g transform="translate(335, 240)" className="animate-disco-swing-right">
                {/* Earring hook/chain */}
                <line x1="0" y1="0" x2="0" y2="12" stroke="#c0c0c0" strokeWidth="2" />
                <circle cx="0" cy="3" r="3" fill="#e8e8e8" stroke="#808080" strokeWidth="1" />
                
                {/* Chain links */}
                <ellipse cx="0" cy="8" rx="2" ry="3" fill="none" stroke="#c0c0c0" strokeWidth="1.5" />
                <ellipse cx="0" cy="14" rx="2" ry="3" fill="none" stroke="#c0c0c0" strokeWidth="1.5" />
                
                {/* Disco Ball */}
                <g transform="translate(0, 35)">
                   {/* Main sphere */}
                   <circle cx="0" cy="0" r="18" fill="url(#discoBallGrad)" filter="url(#discoSparkle)" />
                   
                   {/* Mirror tile facets - horizontal rings */}
                   <ellipse cx="0" cy="-12" rx="12" ry="4" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />
                   <ellipse cx="0" cy="-6" rx="16" ry="5" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
                   <ellipse cx="0" cy="0" rx="18" ry="5" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.4" />
                   <ellipse cx="0" cy="6" rx="16" ry="5" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
                   <ellipse cx="0" cy="12" rx="12" ry="4" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />
                   
                   {/* Vertical facet lines */}
                   <line x1="0" y1="-18" x2="0" y2="18" stroke="#ffffff" strokeWidth="0.3" opacity="0.3" />
                   <line x1="-12" y1="-14" x2="-12" y2="14" stroke="#ffffff" strokeWidth="0.3" opacity="0.3" />
                   <line x1="12" y1="-14" x2="12" y2="14" stroke="#ffffff" strokeWidth="0.3" opacity="0.3" />
                   <line x1="-16" y1="-8" x2="-16" y2="8" stroke="#ffffff" strokeWidth="0.3" opacity="0.3" />
                   <line x1="16" y1="-8" x2="16" y2="8" stroke="#ffffff" strokeWidth="0.3" opacity="0.3" />
                   
                   {/* Individual mirror tiles (sparkly squares) */}
                   <rect x="-4" y="-16" width="4" height="3" fill="#ffffff" opacity="0.9">
                      <animate attributeName="opacity" values="0.4;1;0.4" dur="0.8s" repeatCount="indefinite" />
                   </rect>
                   <rect x="6" y="-10" width="4" height="3" fill="#ffffff" opacity="0.7">
                      <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.2s" repeatCount="indefinite" begin="0.2s" />
                   </rect>
                   <rect x="-12" y="-4" width="4" height="3" fill="#ffffff" opacity="0.8">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="0.9s" repeatCount="indefinite" begin="0.4s" />
                   </rect>
                   <rect x="10" y="2" width="4" height="3" fill="#ffffff" opacity="0.6">
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.1s" repeatCount="indefinite" begin="0.1s" />
                   </rect>
                   <rect x="-8" y="8" width="4" height="3" fill="#ffffff" opacity="0.75">
                      <animate attributeName="opacity" values="0.4;0.95;0.4" dur="1s" repeatCount="indefinite" begin="0.5s" />
                   </rect>
                   <rect x="2" y="12" width="4" height="3" fill="#ffffff" opacity="0.65">
                      <animate attributeName="opacity" values="0.35;0.85;0.35" dur="0.7s" repeatCount="indefinite" begin="0.3s" />
                   </rect>
                   
                   {/* Rainbow light reflections shooting out */}
                   <g filter="url(#discoGlow)">
                      <line x1="15" y1="-8" x2="28" y2="-18" stroke="url(#rainbowSparkle)" strokeWidth="2" opacity="0.8">
                         <animate attributeName="opacity" values="0;0.8;0" dur="1.5s" repeatCount="indefinite" />
                      </line>
                      <line x1="-14" y1="5" x2="-26" y2="12" stroke="url(#rainbowSparkle)" strokeWidth="2" opacity="0.7">
                         <animate attributeName="opacity" values="0;0.7;0" dur="1.8s" repeatCount="indefinite" begin="0.3s" />
                      </line>
                      <line x1="10" y1="12" x2="22" y2="22" stroke="url(#rainbowSparkle)" strokeWidth="2" opacity="0.6">
                         <animate attributeName="opacity" values="0;0.6;0" dur="1.3s" repeatCount="indefinite" begin="0.6s" />
                      </line>
                      <line x1="-8" y1="-14" x2="-18" y2="-26" stroke="url(#rainbowSparkle)" strokeWidth="2" opacity="0.75">
                         <animate attributeName="opacity" values="0;0.75;0" dur="2s" repeatCount="indefinite" begin="0.9s" />
                      </line>
                   </g>
                   
                   {/* Sparkle stars */}
                   <g fill="#ffffff">
                      <polygon points="25,-5 26,-2 29,-2 27,0 28,3 25,1 22,3 23,0 21,-2 24,-2" opacity="0.9">
                         <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
                         <animate attributeName="transform" values="scale(0.5);scale(1.2);scale(0.5)" dur="1.2s" repeatCount="indefinite" />
                      </polygon>
                      <polygon points="-22,10 -21,12 -18,12 -20,14 -19,17 -22,15 -25,17 -24,14 -26,12 -23,12" opacity="0.8">
                         <animate attributeName="opacity" values="0;0.9;0" dur="1.5s" repeatCount="indefinite" begin="0.4s" />
                         <animate attributeName="transform" values="scale(0.6);scale(1.1);scale(0.6)" dur="1.5s" repeatCount="indefinite" begin="0.4s" />
                      </polygon>
                   </g>
                   
                   {/* Highlight gleam */}
                   <circle cx="-6" cy="-10" r="4" fill="#ffffff" opacity="0.5">
                      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                   </circle>
                </g>
            </g>
            
            {/* Right Ear Module (Back Layer) */}
            <rect x="295" y="170" width="40" height="70" rx="12" fill="url(#earGradient)" stroke="#1a2e05" strokeWidth="2" />

            {/* LEFT DISCO BALL EARRING - Hanging from left ear */}
            <g transform="translate(65, 240)" className="animate-disco-swing-left">
                {/* Earring hook/chain */}
                <line x1="0" y1="0" x2="0" y2="12" stroke="#c0c0c0" strokeWidth="2" />
                <circle cx="0" cy="3" r="3" fill="#e8e8e8" stroke="#808080" strokeWidth="1" />
                
                {/* Chain links */}
                <ellipse cx="0" cy="8" rx="2" ry="3" fill="none" stroke="#c0c0c0" strokeWidth="1.5" />
                <ellipse cx="0" cy="14" rx="2" ry="3" fill="none" stroke="#c0c0c0" strokeWidth="1.5" />
                
                {/* Disco Ball */}
                <g transform="translate(0, 35)">
                   {/* Main sphere */}
                   <circle cx="0" cy="0" r="18" fill="url(#discoBallGrad)" filter="url(#discoSparkle)" />
                   
                   {/* Mirror tile facets - horizontal rings */}
                   <ellipse cx="0" cy="-12" rx="12" ry="4" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />
                   <ellipse cx="0" cy="-6" rx="16" ry="5" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
                   <ellipse cx="0" cy="0" rx="18" ry="5" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.4" />
                   <ellipse cx="0" cy="6" rx="16" ry="5" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
                   <ellipse cx="0" cy="12" rx="12" ry="4" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />
                   
                   {/* Vertical facet lines */}
                   <line x1="0" y1="-18" x2="0" y2="18" stroke="#ffffff" strokeWidth="0.3" opacity="0.3" />
                   <line x1="-12" y1="-14" x2="-12" y2="14" stroke="#ffffff" strokeWidth="0.3" opacity="0.3" />
                   <line x1="12" y1="-14" x2="12" y2="14" stroke="#ffffff" strokeWidth="0.3" opacity="0.3" />
                   <line x1="-16" y1="-8" x2="-16" y2="8" stroke="#ffffff" strokeWidth="0.3" opacity="0.3" />
                   <line x1="16" y1="-8" x2="16" y2="8" stroke="#ffffff" strokeWidth="0.3" opacity="0.3" />
                   
                   {/* Individual mirror tiles (sparkly squares) */}
                   <rect x="-4" y="-16" width="4" height="3" fill="#ffffff" opacity="0.9">
                      <animate attributeName="opacity" values="0.4;1;0.4" dur="0.9s" repeatCount="indefinite" begin="0.1s" />
                   </rect>
                   <rect x="6" y="-10" width="4" height="3" fill="#ffffff" opacity="0.7">
                      <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.1s" repeatCount="indefinite" begin="0.3s" />
                   </rect>
                   <rect x="-12" y="-4" width="4" height="3" fill="#ffffff" opacity="0.8">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" begin="0.5s" />
                   </rect>
                   <rect x="10" y="2" width="4" height="3" fill="#ffffff" opacity="0.6">
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.2s" repeatCount="indefinite" begin="0.2s" />
                   </rect>
                   <rect x="-8" y="8" width="4" height="3" fill="#ffffff" opacity="0.75">
                      <animate attributeName="opacity" values="0.4;0.95;0.4" dur="0.8s" repeatCount="indefinite" begin="0.6s" />
                   </rect>
                   <rect x="2" y="12" width="4" height="3" fill="#ffffff" opacity="0.65">
                      <animate attributeName="opacity" values="0.35;0.85;0.35" dur="0.95s" repeatCount="indefinite" begin="0.4s" />
                   </rect>
                   
                   {/* Rainbow light reflections shooting out */}
                   <g filter="url(#discoGlow)">
                      <line x1="-15" y1="-8" x2="-28" y2="-18" stroke="url(#rainbowSparkle)" strokeWidth="2" opacity="0.8">
                         <animate attributeName="opacity" values="0;0.8;0" dur="1.6s" repeatCount="indefinite" begin="0.2s" />
                      </line>
                      <line x1="14" y1="5" x2="26" y2="12" stroke="url(#rainbowSparkle)" strokeWidth="2" opacity="0.7">
                         <animate attributeName="opacity" values="0;0.7;0" dur="1.7s" repeatCount="indefinite" begin="0.5s" />
                      </line>
                      <line x1="-10" y1="12" x2="-22" y2="22" stroke="url(#rainbowSparkle)" strokeWidth="2" opacity="0.6">
                         <animate attributeName="opacity" values="0;0.6;0" dur="1.4s" repeatCount="indefinite" begin="0.8s" />
                      </line>
                      <line x1="8" y1="-14" x2="18" y2="-26" stroke="url(#rainbowSparkle)" strokeWidth="2" opacity="0.75">
                         <animate attributeName="opacity" values="0;0.75;0" dur="1.9s" repeatCount="indefinite" begin="0.1s" />
                      </line>
                   </g>
                   
                   {/* Sparkle stars */}
                   <g fill="#ffffff">
                      <polygon points="-25,-5 -24,-2 -21,-2 -23,0 -22,3 -25,1 -28,3 -27,0 -29,-2 -26,-2" opacity="0.9">
                         <animate attributeName="opacity" values="0;1;0" dur="1.3s" repeatCount="indefinite" begin="0.2s" />
                         <animate attributeName="transform" values="scale(0.5);scale(1.2);scale(0.5)" dur="1.3s" repeatCount="indefinite" begin="0.2s" />
                      </polygon>
                      <polygon points="22,10 23,12 26,12 24,14 25,17 22,15 19,17 20,14 18,12 21,12" opacity="0.8">
                         <animate attributeName="opacity" values="0;0.9;0" dur="1.6s" repeatCount="indefinite" begin="0.6s" />
                         <animate attributeName="transform" values="scale(0.6);scale(1.1);scale(0.6)" dur="1.6s" repeatCount="indefinite" begin="0.6s" />
                      </polygon>
                   </g>
                   
                   {/* Highlight gleam */}
                   <circle cx="-6" cy="-10" r="4" fill="#ffffff" opacity="0.5">
                      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.2s" repeatCount="indefinite" begin="0.3s" />
                   </circle>
                </g>
            </g>

            {/* MAIN HEAD CHASSIS (Squircle) */}
            <rect x="90" y="90" width="220" height="200" rx="55" fill="url(#robotMetal)" stroke="#1a2e05" strokeWidth="3" />
            
            {/* Specular Highlight (Gloss) */}
            <path d="M 120 100 Q 200 85, 280 100 C 290 100, 270 120, 250 115 Q 200 105, 150 115 C 130 120, 110 100, 120 100 Z" fill="white" opacity="0.3" filter="blur(2px)" />

            {/* Face Visor (Black Glass) */}
            <rect x="115" y="150" width="170" height="90" rx="20" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* EYES (Digital LED Panels) */}
            <g transform="translate(200, 195)">
                {/* Left Eye */}
                <g transform="translate(-40, 0)">
                    <rect x="-22" y="-18" width="44" height="36" rx="8" fill="#bef264" className="animate-pulse" filter="drop-shadow(0 0 4px rgba(132, 204, 22, 0.5))" />
                    {/* Digital Pupil */}
                    <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#1a2e05" />
                    {/* Highlight */}
                    <circle cx="8" cy="-8" r="3" fill="white" opacity="0.8" />
                </g>
                
                {/* Right Eye */}
                <g transform="translate(40, 0)">
                    <rect x="-22" y="-18" width="44" height="36" rx="8" fill="#bef264" className="animate-pulse" filter="drop-shadow(0 0 4px rgba(132, 204, 22, 0.5))" />
                    {/* Digital Pupil */}
                    <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#1a2e05" />
                    {/* Highlight */}
                    <circle cx="8" cy="-8" r="3" fill="white" opacity="0.8" />
                </g>
            </g>
            
            {/* Mouth (Digital Smile) */}
            <path d="M 170 265 Q 200 275, 230 265" stroke="#1a2e05" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />

        </g>
      </svg>
      <style>{`
         .animate-float-slow { animation: float 6s ease-in-out infinite; }
         .animate-wave { animation: wave 3s ease-in-out infinite; }
         .animate-disco-swing-left { 
            animation: discoSwingLeft 2s ease-in-out infinite;
            transform-origin: 0 0;
         }
         .animate-disco-swing-right { 
            animation: discoSwingRight 2s ease-in-out infinite;
            transform-origin: 0 0;
         }
         @keyframes discoSwingLeft {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
         }
         @keyframes discoSwingRight {
            0%, 100% { transform: rotate(3deg); }
            50% { transform: rotate(-3deg); }
         }
      `}</style>
    </div>
  );
};

export default BenMascot;