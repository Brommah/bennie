import React from 'react';
import { motion } from 'framer-motion';

/**
 * Premium, minimal hero background with gradient mesh and subtle effects
 * Inspired by Linear, Vercel, and Stripe design systems
 */
const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - deep black to subtle green tint */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(132, 204, 22, 0.08) 0%, transparent 50%)',
        }}
      />
      
      {/* Secondary gradient orb - top right */}
      <motion.div
        className="absolute -top-[30%] -right-[20%] w-[60%] h-[60%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(132, 204, 22, 0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Accent orb - bottom left */}
      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(132, 204, 22, 0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Minimal grid - very subtle */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)',
        }}
      />

      {/* Floating accent line - horizontal */}
      <motion.div
        className="absolute top-1/3 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(132, 204, 22, 0.15) 20%, rgba(132, 204, 22, 0.3) 50%, rgba(132, 204, 22, 0.15) 80%, transparent 100%)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: 1, 
          opacity: [0, 0.5, 0.3],
        }}
        transition={{
          scaleX: { duration: 2, ease: 'easeOut' },
          opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />

      {/* Bottom fade to black */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, #000 0%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default HeroBackground;

