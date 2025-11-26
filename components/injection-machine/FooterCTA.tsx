import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Footer CTA - Final call to action
 */

export const FooterCTA: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 md:px-12 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-acid/5 rounded-full blur-[150px]"/>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at center, #84cc16 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}/>
      </div>

      <div className="max-w-3xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-acid/5 border border-acid/30 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid opacity-75"/>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-acid"/>
            </span>
            <span className="font-mono text-xs text-acid uppercase tracking-widest">System Online</span>
          </div>

          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6">
            Ready to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-acid via-emerald-400 to-acid">
              Take Control?
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-lg mx-auto">
            Join the sovereign music intelligence network. Your data stays yours. Your agents serve only you.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-acid text-black font-mono text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 hover:bg-acid/90 hover:shadow-[0_0_30px_rgba(132,204,22,0.3)]"
            >
              Get Early Access
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-transparent text-white font-mono text-sm font-bold uppercase tracking-wider rounded-lg border border-zinc-700 transition-all duration-200 hover:border-acid hover:text-acid"
            >
              Read Documentation
            </motion.button>
          </div>

          {/* Footer info */}
          <div className="mt-16 pt-8 border-t border-zinc-800">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              {[
                { value: 'v2.0.26', label: 'Kernel Version' },
                { value: '2,847', label: 'Active Nodes' },
                { value: '0', label: 'Data Leaked' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="font-mono text-xl md:text-2xl font-bold text-acid">{stat.value}</div>
                  <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ASCII art footer */}
          <div className="mt-12 font-mono text-[10px] text-zinc-700 leading-relaxed">
            <pre className="inline-block text-left">
{`╔══════════════════════════════════════╗
║  BEN NETWORK  -  SOVEREIGN AI        ║
║  THE FUTURE BELONGS TO YOU           ║
╚══════════════════════════════════════╝`}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
