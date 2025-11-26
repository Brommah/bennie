import React from 'react';
import {
  MovementHero,
  RevolutionTimeline,
  ExtractionThreat,
  InjectionWeapon,
  UndergroundInfra,
  TrojanHorseStrategy,
  ResistanceCTA,
} from './movement';
import { ScanlineOverlay } from './injection-machine';

/**
 * Manifesto / Movement Page
 * The Sovereign Dance Floor - A cinematic journey through the revolution
 */
const Manifesto: React.FC = () => {
  return (
    <main className="bg-black min-h-screen font-mono selection:bg-acid selection:text-black relative">
      {/* Scanline overlay for CRT effect */}
      <ScanlineOverlay />

      {/* 00. HERO - Revolution Boot Sequence */}
      <MovementHero />

      {/* 01. HISTORY - Music Hacks History */}
      <RevolutionTimeline />

      {/* 02. THE THREAT - Extraction Economy */}
      <ExtractionThreat />

      {/* 03. THE WEAPON - Reclaim The Signal */}
      <InjectionWeapon />

      {/* 04. INFRASTRUCTURE - Underground Tech */}
      <UndergroundInfra />

      {/* 05. STRATEGY - The Trojan Horse */}
      <TrojanHorseStrategy />

      {/* 06. CTA - Join The Resistance */}
      <ResistanceCTA />
    </main>
  );
};

export default Manifesto;
