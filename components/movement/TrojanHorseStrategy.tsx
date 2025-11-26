import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/**
 * Trojan Horse Strategy - The disguised weapon visualization
 */

// Animated phone mockup
const PhoneMockup: React.FC = () => {
  return (
    <div className="relative w-[280px] md:w-[320px]">
      {/* Phone frame */}
      <div className="bg-zinc-900 rounded-[40px] p-3 border-4 border-zinc-800 shadow-2xl">
        {/* Screen */}
        <div className="bg-black rounded-[28px] overflow-hidden aspect-[9/19]">
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 py-2 text-white text-xs">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2.5 border border-white rounded-sm">
                <div className="w-3/4 h-full bg-acid rounded-sm" />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">Vault</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-acid rounded-full animate-pulse" />
                <span className="text-acid text-xs font-mono">SECURE</span>
              </div>
            </div>

            {/* Vault card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-zinc-900 rounded-xl p-4 border border-acid/30 mb-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-acid/20 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-acid">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Glass Vault</div>
                  <div className="text-zinc-500 text-xs">Encrypted • Local</div>
                </div>
              </div>
              
              {/* Progress bars */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-400">Taste Profile</span>
                  <span className="text-acid">98%</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-acid rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '98%' }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Party card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl overflow-hidden border border-zinc-800"
            >
              <div className="h-24 bg-gradient-to-br from-purple-900/40 to-pink-900/40 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white">
                      <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold text-sm">Shelter</div>
                    <div className="text-zinc-500 text-xs">SAT 23:00</div>
                  </div>
                  <div className="px-2 py-1 bg-acid/20 rounded text-acid text-xs font-bold">
                    MATCH
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-4 bg-acid/20 blur-3xl rounded-full -z-10 animate-pulse" />
    </div>
  );
};

// Animated encryption visualization
const EncryptionViz: React.FC = () => {
  return (
    <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-32 h-64 pointer-events-none hidden lg:block">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-[10px] text-acid/30 whitespace-nowrap"
          style={{ top: `${i * 12.5}%` }}
          animate={{ x: [-20, 0, -20] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        >
          {Array.from({ length: 20 }).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
        </motion.div>
      ))}
    </div>
  );
};

export const TrojanHorseStrategy: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <section ref={ref} className="py-28 md:py-40 px-6 bg-black relative overflow-hidden border-t border-zinc-900">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(132,204,22,0.3) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col xl:flex-row items-center gap-16 xl:gap-24">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, rotate: -2 }}
              animate={isInView ? { opacity: 1, rotate: -2 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block bg-white text-black font-black text-base md:text-lg uppercase px-4 py-2 mb-8 font-mono"
            >
              &gt; STRATEGY_INIT
            </motion.div>

            <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-white uppercase leading-[0.8] mb-10">
              THE TROJAN <br/>
              <span className="text-zinc-700">HORSE</span>
            </h2>

            <p className="text-2xl md:text-4xl font-black text-white leading-tight mb-8">
              BEN looks like a party app.{' '}
              <span className="text-acid">It is actually a weapon.</span>
            </p>

            <p className="text-lg md:text-xl lg:text-2xl font-bold text-zinc-400 leading-relaxed max-w-2xl mb-8">
              We are smuggling military-grade encryption and sovereign AI into your pocket by wrapping it in the one thing everyone needs:
            </p>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border-l-4 border-acid pl-6"
            >
              <span className="text-2xl md:text-4xl font-black text-white font-mono">
                A BETTER NIGHT OUT.
              </span>
            </motion.div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              {[
                { icon: '🔐', label: 'E2E Encrypted' },
                { icon: '🤖', label: 'Local AI' },
                { icon: '👥', label: 'Squad Sync' },
                { icon: '🎵', label: 'Perfect Match' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 px-4 py-3"
                >
                  <span className="text-xl">{feature.icon}</span>
                  <span className="font-mono text-sm text-zinc-400">{feature.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            style={{ y: phoneY, rotate: phoneRotate }}
            className="flex-shrink-0 relative"
          >
            <EncryptionViz />
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrojanHorseStrategy;

