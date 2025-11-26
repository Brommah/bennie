import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  withCables?: boolean;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, className = '', withCables = false }) => {
  return (
    <div className={`relative group ${className} w-[300px] sm:w-[350px] shrink-0`}>
      {/* External Frame */}
      <div className="relative mx-auto border-zinc-900 bg-black border-[8px] rounded-[3rem] h-[600px] sm:h-[700px] w-full shadow-2xl flex flex-col overflow-hidden ring-1 ring-zinc-800 z-10 transition-all duration-300">
        
        {/* Dynamic Island / Notch Area */}
        <div className="absolute top-0 w-full h-8 z-50 flex justify-center items-end pb-1 bg-black/0 pointer-events-none">
           <div className="h-[26px] w-[100px] bg-black rounded-full flex items-center justify-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-zinc-900/50"></div>
           </div>
        </div>

        {/* Status Bar */}
        <div className="absolute top-3 left-0 w-full px-6 flex justify-between items-center z-40 text-[10px] font-mono text-white font-bold select-none pointer-events-none">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
                <Signal size={12} strokeWidth={3} />
                <Wifi size={12} strokeWidth={3} />
                <Battery size={12} strokeWidth={3} />
            </div>
        </div>

        {/* Screen Content */}
        <div className="h-full w-full bg-black overflow-hidden relative">
          {children}
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50 pointer-events-none"></div>
      </div>

      {/* Cables (Hero Specific) */}
      {withCables && (
        <div className="absolute top-[98%] left-0 w-full h-screen -z-0 flex justify-center pointer-events-none">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
             {/* Cable 1 */}
             <path 
                d="M 120 -20 C 120 100, 80 200, 20 600" 
                stroke="#84cc16" 
                strokeWidth="4" 
                fill="none" 
                className="opacity-90 drop-shadow-[0_0_8px_rgba(132,204,22,0.8)] animate-pulse" 
             />
             {/* Cable 2 (Center) */}
             <path 
                d="M 175 -20 C 175 120, 175 250, 175 600" 
                stroke="#84cc16" 
                strokeWidth="4" 
                fill="none" 
                className="opacity-100 drop-shadow-[0_0_15px_rgba(132,204,22,1)]" 
             />
             {/* Cable 3 */}
             <path 
                d="M 230 -20 C 230 100, 270 200, 330 600" 
                stroke="#84cc16" 
                strokeWidth="4" 
                fill="none" 
                className="opacity-80 drop-shadow-[0_0_8px_rgba(132,204,22,0.8)] animate-pulse" 
                style={{animationDelay: '0.5s'}}
             />
          </svg>
        </div>
      )}
    </div>
  );
};

export default PhoneFrame;