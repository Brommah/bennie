import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/**
 * Underground Infrastructure - Animated tech cards
 */

interface InfraCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  code: string[];
}

const infraCards: InfraCard[] = [
  {
    id: 'vault',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
    title: 'The Glass Vault',
    description: 'An encrypted local partition. It ingests your Spotify data and locks it away. The bouncer for your digital soul.',
    code: [
      'const vault = new GlassVault();',
      'vault.ingest(spotifyData);',
      'vault.encrypt(AES_256);',
      '// Access: OWNER_ONLY',
    ],
  },
  {
    id: 'cephalum',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'The Cephalum',
    description: 'A personal AI agent that lives inside the vault. It finds the party without snitching to the feds (marketers).',
    code: [
      'class Cephalum extends Agent {',
      '  discover() {',
      '    return this.scan(LOCAL_ONLY);',
      '  }',
      '}',
    ],
  },
  {
    id: 'squad',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="19" cy="7" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M22 21v-1.5a3 3 0 00-3-3h-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Squad Mode',
    description: 'See where the crew is without leaking coordinates. Secure Multi-Party Computation is the new guestlist.',
    code: [
      'const squad = await Squad.sync();',
      'const location = SMPC.compute(',
      '  squad.members,',
      '  ZERO_KNOWLEDGE',
      ');',
    ],
  },
];

const InfraCardComponent: React.FC<{
  card: InfraCard;
  index: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ card, index, isActive, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
      className={`relative cursor-pointer bg-black border p-8 md:p-10 transition-all duration-500 group ${
        isActive
          ? 'border-acid shadow-[0_0_40px_rgba(132,204,22,0.15)]'
          : 'border-zinc-800 hover:border-zinc-700'
      }`}
    >
      {/* Corner dots */}
      <div className="absolute top-3 right-3 flex gap-1">
        <div className={`w-1.5 h-1.5 transition-colors ${isActive ? 'bg-acid' : 'bg-zinc-600'}`} />
        <div className={`w-1.5 h-1.5 transition-colors ${isActive ? 'bg-acid' : 'bg-zinc-600'}`} />
        <div className={`w-1.5 h-1.5 transition-colors ${isActive ? 'bg-acid' : 'bg-zinc-600'}`} />
      </div>

      {/* Icon */}
      <div className={`mb-6 md:mb-8 transition-colors ${isActive ? 'text-acid' : 'text-white group-hover:text-acid'}`}>
        {card.icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-4xl font-black text-white uppercase mb-4 md:mb-6 leading-none">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-base md:text-lg leading-relaxed text-zinc-400 font-bold font-mono text-sm mb-6">
        {card.description}
      </p>

      {/* Code snippet - shown when active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs md:text-sm">
              {card.code.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-acid/80"
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-acid"
        initial={{ width: 0 }}
        animate={{ width: isActive ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Animated binary stream background
const BinaryStream: React.FC = () => {
  const columns = 20;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-[10px] text-acid whitespace-nowrap"
          style={{ left: `${(i / columns) * 100}%` }}
          animate={{ y: ['0%', '100%'] }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
        >
          {Array.from({ length: 50 }).map((_, j) => (
            <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const UndergroundInfra: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCard, setActiveCard] = useState<string | null>('vault');

  return (
    <section ref={ref} className="py-28 md:py-40 px-6 bg-black relative overflow-hidden">
      <BinaryStream />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase text-white mb-6">
            Underground Infrastructure
          </h2>
          <div className="inline-block bg-zinc-900 border border-zinc-800 px-6 py-3">
            <span className="font-mono text-sm md:text-xl text-acid uppercase tracking-[0.2em]">
              &gt; Built for the rave. verified by code.
            </span>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {infraCards.map((card, i) => (
            <InfraCardComponent
              key={card.id}
              card={card}
              index={i}
              isActive={activeCard === card.id}
              onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
            />
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-4"
        >
          {[
            { value: 'AES-256', label: 'Encryption' },
            { value: 'P2P', label: 'Architecture' },
            { value: 'ZERO', label: 'Data Leaked' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-zinc-950 border border-zinc-800 p-4 md:p-6 text-center hover:border-acid transition-colors"
            >
              <div className="font-mono text-2xl md:text-4xl font-black text-acid mb-2">{stat.value}</div>
              <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UndergroundInfra;



