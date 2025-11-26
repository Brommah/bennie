import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Injection Weapon - The sovereign protection system
 * More visual, depicting the contrast between extraction and injection
 */

// Animated data streams flowing TO the user (injection)
const DataInjectionViz: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      {/* Central figure - the empowered user */}
      <div className="relative z-10">
        {/* Protective shield aura */}
        <motion.div
          className="absolute -inset-8 rounded-full bg-acid/10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -inset-16 rounded-full border border-acid/20"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute -inset-24 rounded-full border border-acid/10"
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* The phone/vault */}
        <div className="relative w-32 h-56 bg-zinc-900 rounded-3xl border-2 border-acid shadow-[0_0_60px_rgba(132,204,22,0.3)] overflow-hidden">
          {/* Screen glow */}
          <div className="absolute inset-2 rounded-2xl bg-gradient-to-b from-acid/20 to-transparent" />
          
          {/* Shield icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg viewBox="0 0 24 24" className="w-16 h-16 text-acid" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"/>
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>

          {/* Status bar */}
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="text-acid text-xs font-mono font-bold">SOVEREIGN</span>
          </div>
        </div>
      </div>

      {/* Incoming data streams - from platforms TO user */}
      {[
        { angle: -150, label: 'SPOTIFY', delay: 0 },
        { angle: -120, label: 'APPLE', delay: 0.3 },
        { angle: -60, label: 'EVENTS', delay: 0.6 },
        { angle: -30, label: 'TICKETS', delay: 0.9 },
        { angle: 150, label: 'ARTISTS', delay: 1.2 },
        { angle: 120, label: 'VENUES', delay: 1.5 },
      ].map((stream, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2"
          style={{
            transform: `rotate(${stream.angle}deg)`,
          }}
        >
          {/* Stream line */}
          <div className="absolute h-[200px] w-[2px] origin-bottom -translate-x-1/2 overflow-hidden">
            <motion.div
              className="absolute inset-x-0 h-full bg-gradient-to-t from-acid via-acid/50 to-transparent"
              initial={{ y: '-100%' }}
              animate={{ y: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: stream.delay,
                ease: 'linear',
              }}
            />
          </div>
          
          {/* Data particles */}
          {[0, 1, 2].map((p) => (
            <motion.div
              key={p}
              className="absolute w-2 h-2 bg-acid rounded-full shadow-[0_0_10px_rgba(132,204,22,0.8)]"
              style={{ left: '-4px', top: `-${180 + p * 30}px` }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 200, opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: stream.delay + p * 0.3,
                ease: 'easeIn',
              }}
            />
          ))}

          {/* Label */}
          <div 
            className="absolute -top-[220px] left-1/2 -translate-x-1/2 whitespace-nowrap"
            style={{ transform: `translateX(-50%) rotate(${-stream.angle}deg)` }}
          >
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
              {stream.label}
            </span>
          </div>
        </div>
      ))}

      {/* "YOUR DATA STAYS" label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-acid/10 border border-acid/30 px-6 py-3 rounded-full"
        >
          <span className="text-acid font-mono text-sm font-bold uppercase tracking-wider">
            Data flows IN — Never OUT
          </span>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 text-zinc-700 font-mono text-[9px]">
        INJECTION_MODE
      </div>
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-acid rounded-full animate-pulse" />
        <span className="text-acid font-mono text-[9px]">PROTECTED</span>
      </div>
    </div>
  );
};

// Animated principle cards
const PrincipleCard: React.FC<{ number: string; title: string; description: string; delay: number }> = ({ 
  number, title, description, delay 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="flex gap-6 items-start p-6 bg-zinc-950/50 border border-zinc-800 hover:border-acid/50 transition-all">
        {/* Number */}
        <div className="shrink-0">
          <span className="text-5xl font-black text-acid font-mono">{number}</span>
        </div>
        
        {/* Content */}
        <div>
          <h4 className="text-xl font-black text-white uppercase mb-2">{title}</h4>
          <p className="text-zinc-400 font-medium leading-relaxed">{description}</p>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 bg-acid/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </motion.div>
  );
};

export const InjectionWeapon: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 bg-black relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-acid/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-acid font-black uppercase tracking-widest mb-6 font-mono">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>// THE_WEAPON</span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase mb-6 leading-[0.9]">
            THE AI COMES <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-acid to-emerald-400">
              TO YOU
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-medium">
            Instead of your data traveling to corporate servers, 
            <span className="text-white font-bold"> the intelligence travels to your device.</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="relative bg-zinc-950/30 border border-zinc-800 rounded-lg overflow-hidden"
          >
            <DataInjectionViz />
          </motion.div>

          {/* Principles */}
          <div className="space-y-4">
            <PrincipleCard
              number="01"
              title="Local-First AI"
              description="Your taste model lives on your phone. No cloud. No leaks. The algorithm serves you, not advertisers."
              delay={0.2}
            />
            <PrincipleCard
              number="02"
              title="The Glass Vault"
              description="Your listening history, ticket purchases, and location data are encrypted in a vault only you can unlock."
              delay={0.3}
            />
            <PrincipleCard
              number="03"
              title="Dark Mode Culture"
              description="Subcultures thrive in the shadows. We don't surface your underground finds to the mainstream."
              delay={0.4}
            />
          </div>
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-2xl md:text-3xl font-black text-white uppercase">
            Your phone becomes the <span className="text-acid">bouncer</span> for your digital soul.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InjectionWeapon;
