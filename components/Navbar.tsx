
import React, { useState, useRef, useEffect } from 'react';
import BenLogo from './BenLogo';

interface NavbarProps {
  currentView: 'LANDING' | 'MANIFESTO' | 'THE_TECH';
  setCurrentView: (view: 'LANDING' | 'MANIFESTO' | 'THE_TECH') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDropdownLabel = () => {
    if (currentView === 'MANIFESTO') return 'Manifesto';
    if (currentView === 'THE_TECH') return 'The Tech';
    return 'Menu';
  };

  const handleSelect = (view: 'MANIFESTO' | 'THE_TECH') => {
    setCurrentView(view);
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed top-3 md:top-6 left-1/2 transform -translate-x-1/2 z-[100] w-[92%] max-w-6xl">
      <div className="bg-black/90 backdrop-blur-xl border border-zinc-800 rounded-full px-2 py-1.5 md:px-6 md:py-4 flex items-center justify-between relative shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        
        {/* Logo Area (Home) */}
        <div className="flex items-center cursor-pointer group" onClick={() => setCurrentView('LANDING')}>
          <div className="w-14 h-7 md:w-28 md:h-12 relative">
            <BenLogo className="w-full h-full group-hover:scale-105 transition-transform" enableGlitch={false} enableScan={false} />
          </div>
        </div>

        {/* Central Dropdown */}
        <div 
          ref={dropdownRef}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          {/* Dropdown Trigger */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`font-mono text-[9px] md:text-sm font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase transition-all duration-300 px-2.5 py-1.5 md:px-4 md:py-2.5 rounded-full flex items-center gap-1.5 md:gap-2
              ${currentView !== 'LANDING'
                ? 'bg-acid text-black shadow-[0_0_15px_rgba(132,204,22,0.6)]'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
          >
            {currentView !== 'LANDING' && (
              <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-black rounded-full animate-pulse"></span>
            )}
            {getDropdownLabel()}
            <svg 
              className={`w-2.5 h-2.5 md:w-3 md:h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 md:mt-3 w-36 md:w-44 bg-black/95 backdrop-blur-xl border border-zinc-800 rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
              <button
                onClick={() => handleSelect('MANIFESTO')}
                className={`w-full px-3 py-2.5 md:px-4 md:py-3 font-mono text-[9px] md:text-sm font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase transition-all duration-200 flex items-center gap-2 md:gap-3
                  ${currentView === 'MANIFESTO'
                    ? 'bg-acid/20 text-acid'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {currentView === 'MANIFESTO' && (
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-acid rounded-full animate-pulse"></span>
                )}
                {currentView !== 'MANIFESTO' && <span className="w-1 h-1 md:w-1.5 md:h-1.5"></span>}
                Manifesto
              </button>
              <button
                onClick={() => handleSelect('THE_TECH')}
                className={`w-full px-3 py-2.5 md:px-4 md:py-3 font-mono text-[9px] md:text-sm font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase transition-all duration-200 flex items-center gap-2 md:gap-3
                  ${currentView === 'THE_TECH'
                    ? 'bg-white/20 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {currentView === 'THE_TECH' && (
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-pulse"></span>
                )}
                {currentView !== 'THE_TECH' && <span className="w-1 h-1 md:w-1.5 md:h-1.5"></span>}
                The Tech
              </button>
            </div>
          )}
        </div>

        {/* Action Button - Desktop */}
        <a href="https://ben-black-27161314002.us-west1.run.app/" className="bg-white text-black px-6 md:px-10 py-2.5 md:py-3.5 rounded-full font-black text-xs md:text-sm uppercase tracking-wider hover:bg-acid hover:scale-105 transition-all hidden sm:block">
           Get App
        </a>
        
        {/* Mobile Action (Compact) */}
        <a href="https://ben-black-27161314002.us-west1.run.app/" className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-black text-[8px] hover:bg-acid sm:hidden">
            GET
        </a>
      </div>
    </div>
  );
};

export default Navbar;
