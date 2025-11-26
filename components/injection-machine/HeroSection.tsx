import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * BIOS Boot Sequence Hero - Fixed, No Glitches
 * All lines visible, text types in smoothly
 */

const bootSequence = [
  { text: 'INITIALIZING SYSTEM...', color: 'text-zinc-500' },
  { text: 'LOADING SOVEREIGN KERNEL v2.0.26', color: 'text-zinc-500' },
  { text: 'MOUNTING ENCRYPTED VAULTS', color: 'text-zinc-500' },
  { text: 'ESTABLISHING PEER-TO-PEER MESH', color: 'text-zinc-500' },
  { text: 'INJECTING MICRO-AGENTS', color: 'text-zinc-500' },
  { text: 'ARCHITECTURE: SOVEREIGN', color: 'text-acid font-bold' },
  { text: 'STATUS: OPERATIONAL', color: 'text-acid font-bold' },
];

export const HeroSection: React.FC = () => {
  const [lineTexts, setLineTexts] = useState<string[]>(bootSequence.map(() => ''));
  const [currentLine, setCurrentLine] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Boot sequence typing effect
  useEffect(() => {
    if (currentLine >= bootSequence.length) {
      setBootComplete(true);
      return;
    }

    const line = bootSequence[currentLine].text;
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= line.length) {
        setLineTexts(prev => {
          const newTexts = [...prev];
          newTexts[currentLine] = line.slice(0, charIndex);
          return newTexts;
        });
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setCurrentLine(prev => prev + 1), 80);
      }
    }, 18);

    return () => clearInterval(typeInterval);
  }, [currentLine]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black pt-32 pb-16"
    >
      {/* Grid background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(132, 204, 22, 0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(132, 204, 22, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-acid/5 rounded-full blur-[120px]" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl w-full">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter leading-[0.85]">
            <span className="text-white">THE </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-acid via-emerald-400 to-acid">
              INJECTION
            </span>
            <br />
            <span className="text-white">MACHINE</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="max-w-2xl mx-auto mb-6">
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
            BEN is the first <span className="text-acid font-semibold">music AI platform</span> where{' '}
            <span className="text-white font-semibold">you own your data</span>,{' '}
            <span className="text-white font-semibold">your agents</span>, and{' '}
            <span className="text-white font-semibold">your recommendations</span>.
          </p>
          <p className="mt-3 text-zinc-500">
            The AI helps you—but is{' '}
            <span className="text-red-400 line-through decoration-red-400/50">
              architecturally unable to betray you
            </span>.
          </p>
        </div>

        {/* Terminal - All 7 lines always rendered */}
        <div className="mx-auto w-full max-w-xl mb-10 mt-12">
          <div className="bg-zinc-950/95 backdrop-blur border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/60">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 font-mono text-xs text-zinc-500">ben_kernel.sh</span>
            </div>
            <div className="p-5 font-mono text-sm text-left">
              {bootSequence.map((line, i) => (
                <div key={i} className={`h-6 flex items-center ${line.color}`}>
                  <span className="text-zinc-600 mr-2 w-3">{'>'}</span>
                  <span>{lineTexts[i]}</span>
                  {i === currentLine && currentLine < bootSequence.length && (
                    <span className="text-acid animate-pulse ml-0.5">█</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status + Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: bootComplete ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-acid/40 bg-acid/5 rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-acid" />
            </span>
            <span className="font-mono text-sm text-acid font-medium tracking-wider">SYSTEM READY</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.4em]">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-px h-10 bg-gradient-to-b from-zinc-600 to-transparent" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
