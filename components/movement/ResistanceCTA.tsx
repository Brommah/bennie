import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Resistance CTA - Join the movement finale with animated stats
 */

// Animated counter component
const AnimatedCounter: React.FC<{ value: string; suffix?: string }> = ({ value, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseInt(value.replace(/\D/g, ''), 10);
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const duration = 1500;
    const increment = numericValue / (duration / 16);

    const animate = () => {
      start += increment;
      if (start >= numericValue) {
        setDisplayValue(value);
      } else {
        setDisplayValue(Math.floor(start).toString() + suffix);
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, suffix]);

  return <span ref={ref}>{displayValue}</span>;
};

// Stats grid
const stats = [
  { value: '0%', label: 'Data Sold' },
  { value: '100%', label: 'Open Source' },
  { value: 'E2E', label: 'Encrypted' },
  { value: 'USR', label: 'Owned' },
];

// Animated pulse ring
const PulseRing: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    className="absolute inset-0 border border-acid rounded-full"
    initial={{ scale: 1, opacity: 0.5 }}
    animate={{ scale: 2, opacity: 0 }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay,
      ease: 'easeOut',
    }}
  />
);

export const ResistanceCTA: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-28 md:py-40 px-6 bg-black relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(132, 204, 22, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(132, 204, 22, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-acid/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 text-acid font-mono text-lg md:text-2xl uppercase tracking-[0.3em] mb-8">
            <span className="animate-pulse">{'///'}</span>
            <span>JOIN THE RESISTANCE</span>
            <span className="animate-pulse">{'///'}</span>
          </div>
        </motion.div>

        {/* Main text */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-[0.9] mb-16 uppercase"
        >
          The algorithm does not rule you. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
            You rule the algorithm.
          </span>
        </motion.h2>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="border border-zinc-800 p-4 md:p-6 bg-zinc-950 hover:border-acid transition-colors group"
            >
              <strong className="block text-white text-3xl md:text-6xl font-black mb-2 group-hover:text-acid transition-colors font-mono">
                <AnimatedCounter value={stat.value} />
              </strong>
              <span className="font-mono text-xs md:text-base text-zinc-500 uppercase tracking-widest">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button - Clean and simple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://ben-black-27161314002.us-west1.run.app/"
            className="inline-flex items-center gap-3 bg-acid text-black px-10 md:px-14 py-5 md:py-6 font-bold text-lg md:text-xl uppercase tracking-wider rounded-lg hover:bg-white transition-colors font-mono"
          >
            <span>Get Early Access</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* Footer text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 font-mono text-zinc-600 text-sm"
        >
          <div className="inline-block border border-zinc-800 px-6 py-4 bg-zinc-950">
            <span className="text-acid">&gt;</span> EST. 2026 // AMSTERDAM // SOVEREIGN_NETWORK
          </div>
        </motion.div>

        {/* ASCII art */}
        <motion.pre
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 font-mono text-[8px] md:text-xs text-acid/30 whitespace-pre leading-none"
        >
{`
╔══════════════════════════════════════════════════╗
║                                                  ║
║     ██████╗ ███████╗███╗   ██╗                   ║
║     ██╔══██╗██╔════╝████╗  ██║                   ║
║     ██████╔╝█████╗  ██╔██╗ ██║                   ║
║     ██╔══██╗██╔══╝  ██║╚██╗██║                   ║
║     ██████╔╝███████╗██║ ╚████║                   ║
║     ╚═════╝ ╚══════╝╚═╝  ╚═══╝                   ║
║                                                  ║
║     THE FUTURE BELONGS TO YOU                    ║
║                                                  ║
╚══════════════════════════════════════════════════╝
`}
        </motion.pre>
      </div>
    </section>
  );
};

export default ResistanceCTA;

