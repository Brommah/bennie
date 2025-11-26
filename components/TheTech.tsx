import React, { Suspense } from 'react';
import {
  ScanlineOverlay,
  HeroSection,
  ExtractionVsInjection,
  EphemeralAgents,
  ExplodedLayers3D,
  ZeroKnowledge,
  DragonCluster,
  NeuralStack,
  FooterCTA,
} from './injection-machine';

/**
 * THE INJECTION MACHINE
 * 
 * A cinematic tech page that treats the browser like a movie screen.
 * We aren't just displaying text; we are simulating a living operating system.
 * 
 * Stack:
 * - Framer Motion (animations)
 * - Three.js / R3F (3D visualizations)
 * - React Flow (node diagrams)
 * - Custom Sci-Fi UI components
 */

// Loading fallback for heavy components
const SectionLoader: React.FC<{ height?: string }> = ({ height = 'h-[500px]' }) => (
  <div className={`${height} flex items-center justify-center bg-zinc-950`}>
    <div className="text-center">
      <div className="inline-flex items-center gap-3 text-acid font-mono text-sm">
        <div className="w-4 h-4 border-2 border-acid border-t-transparent rounded-full animate-spin" />
        LOADING MODULE...
    </div>
    </div>
  </div>
);

const TheTech: React.FC = () => {
  return (
    <main className="bg-black min-h-screen font-mono selection:bg-acid selection:text-black overflow-x-hidden">
      {/* CRT Scanline Effect - Covers entire page */}
      <ScanlineOverlay />

      {/* 00. HERO - BIOS Boot Sequence */}
      <HeroSection />

      {/* 01. THE INVERSION - Extraction vs Injection */}
      <Suspense fallback={<SectionLoader />}>
        <ExtractionVsInjection />
      </Suspense>

      {/* 02. JUST-IN-TIME INTELLIGENCE - Ephemeral Agents */}
      <Suspense fallback={<SectionLoader />}>
        <EphemeralAgents />
      </Suspense>

      {/* 03. THE OVERLAY - 3D Trojan Horse Visualization */}
      <Suspense fallback={<SectionLoader height="h-screen" />}>
        <ExplodedLayers3D />
      </Suspense>

      {/* 04. ZERO KNOWLEDGE - Blind Match Protocol */}
      <Suspense fallback={<SectionLoader />}>
        <ZeroKnowledge />
      </Suspense>

      {/* 05. INFRASTRUCTURE - Dragon 1 Cluster Dashboard */}
      <Suspense fallback={<SectionLoader />}>
        <DragonCluster />
      </Suspense>

      {/* 06. THE STACK - Neural Architecture Accordion */}
      <Suspense fallback={<SectionLoader />}>
                    <NeuralStack />
      </Suspense>

        {/* FOOTER CTA */}
      <FooterCTA />
    </main>
  );
};

export default TheTech;
