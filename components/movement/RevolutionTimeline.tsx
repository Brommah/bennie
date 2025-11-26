import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Revolution Timeline - Animated historical moments when music changed the world
 */

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const events: TimelineEvent[] = [
  {
    year: '60s',
    title: 'Flower Power',
    description: "Woodstock wasn't just a gig. It was an anti-war machine. The beat stopped the bombs.",
    color: '#f97316',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 2L12 22M7 7C9.5 9.5 14.5 9.5 17 7M7 12C9.5 14.5 14.5 14.5 17 12M7 17C9.5 19.5 14.5 19.5 17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    year: '89',
    title: 'Berlin Techno',
    description: 'The Wall fell, and the bass kicked in. East and West unified on the dancefloor before the ink was dry.',
    color: '#84cc16',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <rect x="4" y="4" width="6" height="16" stroke="currentColor" strokeWidth="2"/>
        <rect x="14" y="4" width="6" height="16" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    year: '00',
    title: 'Exit Festival',
    description: 'Started by students in Serbia fighting for democracy. A rave that toppled a regime. Freedom through frequency.',
    color: '#06b6d4',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 4V12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const TimelineCard: React.FC<{ event: TimelineEvent; index: number; isActive: boolean; onClick: () => void }> = ({
  event,
  index,
  isActive,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      onClick={onClick}
      className={`relative cursor-pointer group transition-all duration-500 ${isActive ? 'z-10' : 'z-0'}`}
    >
      {/* Card */}
      <div
        className={`bg-zinc-950 border p-8 md:p-10 transition-all duration-500 ${
          isActive
            ? 'border-acid shadow-[0_0_40px_rgba(132,204,22,0.15)] scale-105'
            : 'border-zinc-800 hover:border-zinc-700'
        }`}
      >
        {/* Log ID */}
        <div className="absolute top-3 right-3 font-mono text-[9px] text-zinc-700">
          LOG_ID: {String(index + 1).padStart(3, '0')}
        </div>

        {/* Year */}
        <div
          className={`text-6xl md:text-8xl font-black font-mono mb-4 transition-colors duration-500 ${
            isActive ? 'text-acid' : 'text-zinc-800 group-hover:text-zinc-700'
          }`}
        >
          {event.year}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-black text-white uppercase mb-4">{event.title}</h3>

        {/* Description */}
        <p className="text-base md:text-lg text-zinc-400 font-bold leading-relaxed">{event.description}</p>

        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-acid"
          initial={{ width: 0 }}
          animate={{ width: isActive ? '100%' : 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Connection line to next */}
      {index < events.length - 1 && (
        <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5">
          <motion.div
            className="h-full bg-gradient-to-r from-acid/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
            viewport={{ once: true }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      )}
    </motion.div>
  );
};

// Animated waveform visualization
const WaveformViz: React.FC = () => {
  return (
    <div className="hidden md:flex items-end gap-1 h-12 lg:h-16">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 lg:w-1 bg-acid/40 rounded-full"
          animate={{
            height: [
              `${20 + Math.sin(i * 0.5) * 15}%`,
              `${50 + Math.sin(i * 0.5 + 1) * 30}%`,
              `${20 + Math.sin(i * 0.5) * 15}%`,
            ],
          }}
          transition={{
            duration: 1 + Math.random() * 0.5,
            repeat: Infinity,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export const RevolutionTimeline: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section ref={ref} className="py-28 md:py-40 px-6 bg-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 100px,
              rgba(132,204,22,0.5) 100px,
              rgba(132,204,22,0.5) 101px
            )`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 border border-acid bg-acid/10">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-acid">
                <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-none">
              Music Hacks <span className="text-zinc-600">History</span>
            </h2>
          </div>

          <WaveformViz />
        </motion.div>

        {/* Timeline cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-16">
          {events.map((event, i) => (
            <TimelineCard
              key={event.year}
              event={event}
              index={i}
              isActive={activeIndex === i}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>

        {/* Future call */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center border-t border-zinc-900 pt-12"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-acid/5 border border-acid/30">
            <span className="font-mono text-2xl md:text-4xl font-black text-white">
              &gt; 2026?
            </span>
            <span className="font-mono text-2xl md:text-4xl font-black text-acid">
              IT'S OUR TURN.
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-acid text-2xl"
            >
              █
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RevolutionTimeline;

