import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/**
 * Movement Hero - Manifesto Opening
 * Sets the ideological tone for the revolution
 */

// Animated soundwave bars
const SoundWave: React.FC<{ count?: number }> = ({ count = 40 }) => {
  return (
    <div className="flex items-end justify-center gap-[3px] h-20">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-acid/60 to-acid rounded-full"
          animate={{
            height: [
              `${20 + Math.sin(i * 0.3) * 15}%`,
              `${60 + Math.sin(i * 0.3 + 2) * 30}%`,
              `${20 + Math.sin(i * 0.3) * 15}%`,
            ],
          }}
          transition={{
            duration: 1.2 + Math.random() * 0.8,
            repeat: Infinity,
            delay: i * 0.03,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Floating particle effect
const FloatingParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-acid/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Animated year counter
const YearCounter: React.FC = () => {
  const years = ['1969', '1989', '2000', '2026'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % years.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 font-mono text-sm text-zinc-500">
      <span className="text-acid">{'>'}</span>
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-white font-bold"
      >
        {years[index]}
      </motion.span>
      <span className="text-zinc-600">// THE BEAT CONTINUES</span>
    </div>
  );
};

export const MovementHero: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black pt-28 pb-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Radial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(132,204,22,0.08) 0%, transparent 60%)',
          }}
        />
        
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(132, 204, 22, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(132, 204, 22, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <FloatingParticles />

      <motion.div style={{ opacity, y }} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Year counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <YearCounter />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.85] mb-8"
        >
          <span className="text-white">MUSIC IS</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-acid via-emerald-400 to-acid">
            REVOLUTION
          </span>
        </motion.h1>

        {/* Soundwave visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <SoundWave count={50} />
        </motion.div>

        {/* Manifesto opening */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-zinc-300 font-bold leading-relaxed">
            From Woodstock to Berlin to the warehouses of tomorrow—
            <span className="text-white"> the dancefloor has always been where we fight back.</span>
          </p>
        </motion.div>

        {/* The problem statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="inline-block"
        >
          <div className="bg-zinc-950 border border-zinc-800 px-8 py-6 max-w-3xl">
            <p className="text-lg md:text-xl text-zinc-400 font-mono leading-relaxed">
              <span className="text-red-500 font-bold">But now,</span> the corporations are
              <span className="text-red-400"> strip-mining our culture</span>—turning taste into data,
              subcultures into spreadsheets, and freedom into surveillance.
            </p>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12"
        >
          <p className="text-2xl md:text-4xl font-black text-white uppercase tracking-wide">
            It's time to <span className="text-acid">take it back.</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-zinc-600"
        >
          <span className="font-mono text-xs uppercase tracking-widest">The History</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-acid">
            <path d="M8 2L8 14M8 14L2 8M8 14L14 8" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Corner decoration */}
      <div className="absolute top-24 left-6 font-mono text-[10px] text-zinc-700">
        MANIFESTO_001
      </div>
      <div className="absolute top-24 right-6 font-mono text-[10px] text-zinc-700">
        EST. 2026
      </div>
    </section>
  );
};

export default MovementHero;
