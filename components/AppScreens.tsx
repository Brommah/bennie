
import React from 'react';
import { 
  Zap, MapPin, Calendar, ShoppingCart, Radio, 
  ArrowUpRight, CheckCircle2, TrendingDown, Ticket, ChevronRight, Lock, 
  Disc, Check, Music, AudioLines, Plus, X, Play, RefreshCw, AlertCircle, Users, Heart, Signal, ShieldCheck
} from 'lucide-react';

const BottomNav = ({ activeTab }: { activeTab: number }) => (
  <div className="absolute bottom-0 w-full h-[90px] bg-zinc-950 border-t border-zinc-800 flex items-start justify-around px-4 pt-6 z-40">
    <div className={`p-1 rounded-full ${activeTab === 0 ? 'text-acid drop-shadow-[0_0_8px_rgba(132,204,22,1)]' : 'text-zinc-500'}`}><Zap size={24} strokeWidth={activeTab === 0 ? 3 : 2} /></div>
    <div className={`p-1 rounded-full ${activeTab === 1 ? 'text-acid drop-shadow-[0_0_8px_rgba(132,204,22,1)]' : 'text-zinc-500'}`}><Users size={24} strokeWidth={activeTab === 1 ? 3 : 2} /></div>
    <div className={`p-1 rounded-full ${activeTab === 2 ? 'text-acid drop-shadow-[0_0_8px_rgba(132,204,22,1)]' : 'text-zinc-500'}`}><Calendar size={24} strokeWidth={activeTab === 2 ? 3 : 2} /></div>
    <div className={`p-1 rounded-full ${activeTab === 3 ? 'text-acid drop-shadow-[0_0_8px_rgba(132,204,22,1)]' : 'text-zinc-500'}`}><ShoppingCart size={24} strokeWidth={activeTab === 3 ? 3 : 2} /></div>
    <div className={`p-1 rounded-full ${activeTab === 4 ? 'text-acid drop-shadow-[0_0_8px_rgba(132,204,22,1)]' : 'text-zinc-500'}`}><Radio size={24} strokeWidth={activeTab === 4 ? 3 : 2} /></div>
  </div>
);

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-6 pt-14 px-5">
    <h1 className="text-4xl font-black tracking-tighter uppercase leading-[0.85] mb-2 text-white">{title}</h1>
    {subtitle && (
      <div className="text-acid text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-2">
        <span className="text-lg leading-none">›</span> {subtitle}
      </div>
    )}
  </div>
);

// --- SCREEN 0: SYNC ---
export const SyncScreen = () => (
  <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative">
    <Header title="Sync" subtitle="Connect Accounts" />

    <div className="flex-1 flex flex-col justify-center space-y-4 relative z-10 px-5 -mt-10">
        {/* Source Nodes */}
        {['SPOTIFY', 'APPLE_MUSIC', 'SOUNDCLOUD'].map((source, i) => (
            <div key={source} className="bg-zinc-900 border border-zinc-800 p-4 relative z-10 group cursor-pointer hover:border-acid transition-all duration-300 shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 group-hover:text-acid group-hover:border-acid transition-colors">
                             {i === 0 ? <Disc size={18}/> : i === 1 ? <Music size={18}/> : <AudioLines size={18}/>}
                        </div>
                        <div>
                            <div className="text-sm font-black uppercase tracking-wider text-white">{source}</div>
                            <div className="text-[9px] font-mono text-zinc-400 group-hover:text-acid">CONNECTED</div>
                        </div>
                    </div>
                    <div className="w-5 h-5 bg-acid rounded-sm flex items-center justify-center shadow-[0_0_10px_rgba(132,204,22,0.4)]">
                        <Check size={14} className="text-black stroke-[4]" />
                    </div>
                </div>
            </div>
        ))}
    </div>

    {/* Master Input */}
    <div className="mt-auto mb-12 z-10 px-5">
        <div className="h-16 bg-acid flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(132,204,22,0.6)] cursor-pointer hover:bg-white transition-colors group">
             <span className="font-black text-black tracking-widest text-lg uppercase">Start Sync</span>
             <span className="text-black font-mono font-bold animate-pulse group-hover:translate-x-2 transition-transform">{'>'}{'>'}{'>'}</span>
        </div>
        <div className="mt-4 text-center">
             <p className="font-mono text-[9px] text-zinc-500 uppercase">
                // Anti-Algorithm Mode: ON
             </p>
        </div>
    </div>
  </div>
);

// --- SCREEN 1: INTEL (Daily Briefing) ---
export const IntelScreen = () => (
    <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative">
        <Header title="Discover" subtitle="Private Curator" />
        
        <div className="px-5 mb-8">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full border-2 border-acid flex items-center justify-center bg-zinc-900 text-acid shadow-[0_0_10px_rgba(132,204,22,0.5)]">
                        <Plus size={24} strokeWidth={3} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white">Add Taste</span>
                </div>
                {['Sarah', 'Kai', 'Lars', 'Mina'].map((name, i) => (
                    <div key={name} className="flex flex-col items-center gap-2 relative">
                         {i === 0 && <div className="absolute top-0 right-0 w-3 h-3 bg-acid rounded-full border-2 border-zinc-950 z-10 shadow-[0_0_5px_rgba(132,204,22,1)]"></div>}
                        <div className={`w-14 h-14 rounded-full border-2 ${i === 0 ? 'border-acid p-0.5' : 'border-zinc-800'} bg-zinc-900 overflow-hidden`}>
                             <img src={`https://i.pravatar.cc/150?u=${name}`} alt={name} className="w-full h-full object-cover rounded-full grayscale contrast-125" />
                        </div>
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${i === 0 ? 'text-white' : 'text-zinc-500'}`}>{name}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="px-5 flex-1 overflow-y-auto pb-24">
            <div className="flex justify-between items-end mb-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-acid animate-pulse rounded-full shadow-[0_0_5px_rgba(132,204,22,1)]"></span>
                    Live Signal
                </h3>
                <span className="text-[10px] font-mono text-acid border border-acid/50 px-1 bg-acid/10">CONFIDENCE: 99%</span>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden group hover:border-acid transition-colors shadow-xl">
                <div className="relative h-48 bg-zinc-800">
                    <img src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover opacity-80 mix-blend-normal group-hover:opacity-100 transition-opacity" alt="Event" />
                    <div className="absolute top-3 right-3 bg-acid text-black text-[10px] font-black uppercase px-2 py-1 shadow-[0_0_10px_rgba(132,204,22,0.8)]">
                        No Algorithms
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                        <div className="text-[9px] font-bold uppercase tracking-widest text-acid mb-1 drop-shadow-md">Small Venue • 200 Cap</div>
                        <div className="text-3xl font-black uppercase leading-none text-white drop-shadow-lg">Garage Noord</div>
                    </div>
                </div>
                <div className="p-4 bg-zinc-950">
                    <p className="font-mono text-[10px] text-zinc-300 mb-4 leading-relaxed">
                        Hidden gem. Your <span className="text-acid font-bold">Private Model</span> found this. Big apps ignore it.
                    </p>
                    <button className="w-full py-3 bg-white text-black font-black uppercase text-sm hover:bg-acid transition-colors flex justify-between px-4 items-center shadow-lg">
                        <span>Check Event</span>
                        <ArrowUpRight size={16} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </div>

        <BottomNav activeTab={0} />
    </div>
);

// --- SCREEN 2: MATCHING ---
export const MatchingScreen = () => (
    <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative">
        <div className="pt-14 px-5 mb-4">
             <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Your Curation</h1>
             <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
                Data Sovereignty: Active
             </p>
        </div>

        <div className="flex-1 px-5 relative pb-24">
            {/* Background Card (Stack Effect) */}
            <div className="absolute top-2 left-7 right-3 bottom-26 bg-zinc-800 border border-zinc-700 rounded-xl transform rotate-3 -z-10"></div>
            
            {/* Main Card */}
            <div className="h-full bg-white text-black rounded-xl overflow-hidden flex flex-col relative shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                <div className="flex-1 bg-zinc-200 relative overflow-hidden">
                    {/* Updated Folamour/DJ Image - Specific URL provided */}
                    <img src="https://electronicgroove.com/wp-content/uploads/2024/01/Folamour.jpg" className="w-full h-full object-cover grayscale contrast-125" alt="Folamour" />
                    <div className="absolute top-4 left-4">
                         <div className="bg-acid text-black text-[10px] font-black uppercase px-2 py-1 shadow-lg">Verified Cool</div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold border border-white/20">
                        Top Pick for You
                    </div>
                </div>
                
                <div className="p-6 pt-5">
                    <h2 className="text-4xl font-black uppercase leading-[0.85] mb-2 tracking-tighter">Folamour</h2>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-acid rounded-full"></span>
                        Underground Selects
                    </div>
                    
                    <div className="flex justify-between items-end border-t-2 border-black pt-4">
                         <div>
                             <div className="text-[9px] font-bold uppercase text-zinc-500">Vibe</div>
                             <div className="font-mono text-xs font-bold">DISCO HOUSE</div>
                         </div>
                         <div className="text-right">
                             <div className="text-[9px] font-bold uppercase text-zinc-500">Capacity</div>
                             <div className="font-mono text-xs font-bold">SMALL (300)</div>
                         </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="absolute bottom-6 left-5 right-5 flex gap-4">
                <button className="flex-1 py-4 border-2 border-white text-white font-black uppercase text-sm hover:bg-white hover:text-black transition-colors">
                    Next
                </button>
                <button className="flex-1 py-4 bg-black border-2 border-black text-white font-black uppercase text-sm hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-lg">
                    <Heart size={16} className="text-acid fill-acid" />
                    Curate
                </button>
            </div>
        </div>
    </div>
);

// --- SCREEN 3: EVENT DETAILS (Modal) ---
export const EventDetailsScreen = () => (
    <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative">
        <div className="absolute top-0 left-0 w-full h-1/2 z-0">
             {/* Updated Folamour/DJ Image Background - Specific URL provided */}
             <img src="https://electronicgroove.com/wp-content/uploads/2024/01/Folamour.jpg" className="w-full h-full object-cover opacity-60 mix-blend-multiply" alt="Header" />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
             <button className="absolute top-12 right-6 bg-black/50 p-2 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white hover:text-black transition-colors">
                 <X size={20} />
             </button>
        </div>

        <div className="relative z-10 pt-48 px-6 flex-1 flex flex-col">
             <div className="flex gap-2 mb-4">
                 <span className="bg-acid/20 text-acid border border-acid/30 text-[9px] font-bold uppercase px-2 py-1 flex items-center gap-1">
                    <span className="w-1 h-1 bg-acid rounded-full"></span> Verified
                 </span>
                 <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 text-[9px] font-bold uppercase px-2 py-1">
                    Direct Access
                 </span>
             </div>
             
             <h1 className="text-5xl font-black uppercase leading-[0.85] tracking-tighter mb-2 text-white">Folamour</h1>
             
             <div className="flex items-center gap-2 mb-8 text-[10px] font-mono text-zinc-400">
                 <MapPin size={12} className="text-acid" />
                 <span className="text-white font-bold uppercase">Radion</span>
                 <span className="text-zinc-500">|</span>
                 <span className="text-white">Anti-Scalp Mode Active</span>
             </div>

             <div className="space-y-6">
                 <div className="bg-zinc-900/80 p-3 border-l-2 border-acid shadow-lg">
                     <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Private AI Note</h3>
                     <p className="font-mono text-xs text-white leading-relaxed">
                        "This fits your vibe perfectly. The big apps are pushing Top 40, but your data says you want this."
                     </p>
                 </div>
                 
                 <div>
                     <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Lineup</h3>
                     <p className="font-sans text-sm font-bold text-white">Bella, Kamma & Masalo</p>
                 </div>

                 {/* Audio Fingerprint Visualizer */}
                 <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-sm">
                     <div className="flex justify-between items-center mb-2">
                        <div className="text-[9px] font-bold uppercase text-acid flex items-center gap-2">
                            <Play size={10} fill="#84cc16" /> Listen Preview
                        </div>
                        <div className="font-mono text-[9px] text-zinc-500">02:43</div>
                     </div>
                     <div className="flex items-end gap-[2px] h-8">
                         {[...Array(30)].map((_, i) => (
                             <div key={i} className="w-1 bg-zinc-700 hover:bg-acid transition-colors" style={{height: `${Math.random() * 100}%`}}></div>
                         ))}
                     </div>
                 </div>
             </div>

             <div className="mt-auto mb-8">
                 <div className="flex justify-between items-end mb-2 px-1">
                     <span className="text-[10px] font-bold uppercase text-zinc-500">Price (No Fees)</span>
                     <span className="font-mono text-xl font-black text-white">€29.50</span>
                 </div>
                 
                 {/* Slider */}
                 <div className="h-14 bg-zinc-900 border border-zinc-700 relative overflow-hidden flex items-center p-1 group cursor-pointer hover:border-acid transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white transition-colors">Slide to Buy {'>'}{'>'}{'>'}</span>
                    </div>
                    <div className="h-full aspect-square bg-white flex items-center justify-center z-20 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        <ChevronRight className="text-black stroke-[3]" />
                    </div>
                 </div>
             </div>
        </div>
    </div>
);

// --- SCREEN 4: RADAR (Renamed to Group Sync) ---
export const RadarScreen = () => (
  <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative overflow-hidden">
    <div className="absolute inset-0 z-0 opacity-30" style={{
        backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)',
        backgroundSize: '20px 20px',
    }}></div>
    
    <div className="relative z-10 pt-14 px-5 h-full flex flex-col">
        <Header title="Crew" subtitle="Group Sync" />

        {/* Alert Box */}
        <div className="bg-zinc-900 border border-acid p-4 mb-6 shadow-[0_0_20px_rgba(132,204,22,0.15)] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-20 h-20 bg-acid/10 rounded-full blur-xl -mr-10 -mt-10"></div>
             <div className="flex gap-3 relative z-10">
                 <div className="w-8 h-8 bg-acid/20 border border-acid flex items-center justify-center shrink-0 rounded-sm">
                     <Users size={16} className="text-acid" />
                 </div>
                 <div>
                     <h3 className="text-sm font-black uppercase text-white leading-none mb-1">Squad Match Found</h3>
                     <p className="font-mono text-[10px] text-zinc-300 leading-tight">
                        Your secure AI agents agreed: <br/><span className="text-acid font-bold">98% Compatibility</span> for Shelter.
                     </p>
                 </div>
             </div>
        </div>
        
        <div className="flex justify-between items-end mb-2 px-1">
             <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Suggested Events</span>
             <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1">
                 <span className="w-1.5 h-1.5 bg-acid rounded-full animate-pulse shadow-[0_0_5px_rgba(132,204,22,1)]"></span> LIVE
             </span>
        </div>

        {/* Venue List */}
        <div className="space-y-3">
             {/* Item 1 */}
             <div className="bg-zinc-900/80 border border-zinc-700 p-4 backdrop-blur-sm group hover:border-acid transition-colors shadow-lg">
                  <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider group-hover:text-white">
                           <Music size={10} /> Shelter
                       </div>
                       <div className="bg-acid text-black text-[8px] font-black uppercase px-1.5 py-0.5 shadow-[0_0_8px_rgba(132,204,22,0.5)]">Perfect Match</div>
                  </div>
                  <h2 className="text-2xl font-black uppercase leading-none mb-4 text-white">Ben UFO</h2>
                  <div className="flex justify-between items-end">
                       <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-black overflow-hidden"><img src="https://i.pravatar.cc/150?u=Sarah" className="w-full h-full grayscale"/></div>
                                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-black overflow-hidden"><img src="https://i.pravatar.cc/150?u=Kai" className="w-full h-full grayscale"/></div>
                                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-black overflow-hidden"><img src="https://i.pravatar.cc/150?u=Lars" className="w-full h-full grayscale"/></div>
                            </div>
                            <span className="text-[9px] font-mono text-zinc-400">All In</span>
                       </div>
                       <button className="text-[10px] font-mono font-bold text-white hover:text-acid flex items-center gap-1 group-hover:underline decoration-acid underline-offset-4">
                           VOTE {`->`}
                       </button>
                  </div>
             </div>

             {/* Item 2 */}
             <div className="bg-zinc-900/40 border border-zinc-800 p-4 opacity-80 hover:opacity-100 transition-opacity hover:border-zinc-600">
                  <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                           <Music size={10} /> Thuishaven
                       </div>
                       <div className="bg-zinc-800 text-zinc-400 text-[8px] font-black uppercase px-1.5 py-0.5">80% Match</div>
                  </div>
                  <h2 className="text-2xl font-black uppercase leading-none mb-4 text-zinc-300">Joris Voorn</h2>
                  <div className="flex justify-between items-end">
                       <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-black overflow-hidden"><img src="https://i.pravatar.cc/150?u=Mina" className="w-full h-full grayscale"/></div>
                            </div>
                            <span className="text-[9px] font-mono text-zinc-500">Mina likes this</span>
                       </div>
                       <button className="text-[10px] font-mono font-bold text-zinc-500 hover:text-white">
                           VOTE {`->`}
                       </button>
                  </div>
             </div>
        </div>
    </div>
    <BottomNav activeTab={1} />
  </div>
);

// --- SCREEN 5: PLANS (Empty State) ---
export const PlansScreen = () => (
  <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative">
    <Header title="Plans" subtitle="Upcoming" />

    <div className="px-5 mb-8">
        <div className="flex gap-2 pb-2">
          {['FRI|24', 'SAT|25', 'SUN|26', 'MON|27'].map((date, i) => (
              <div key={date} className={`w-14 h-16 border flex flex-col items-center justify-center ${i === 0 ? 'bg-acid border-acid text-black shadow-[0_0_10px_rgba(132,204,22,0.5)]' : 'bg-black border-zinc-800 text-zinc-500'}`}>
                  <span className="text-[9px] font-bold uppercase tracking-wider mb-1">{date.split('|')[0]}</span>
                  <span className="text-xl font-black">{date.split('|')[1]}</span>
              </div>
          ))}
        </div>
        <div className="h-px w-full bg-zinc-900 mt-4"></div>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pb-24">
        <div className="w-16 h-16 border border-zinc-800 flex items-center justify-center mb-6 bg-zinc-900 rounded-full">
            <RefreshCw size={24} className="text-zinc-500" />
        </div>
        <h3 className="text-lg font-black uppercase mb-2 text-white">No Plans Yet</h3>
        <p className="font-mono text-[10px] text-zinc-400 mb-8 max-w-[200px]">
            Sync with your crew to find the perfect night out.
        </p>
        <button className="w-full py-4 bg-acid text-black font-black uppercase text-sm hover:bg-white transition-colors shadow-lg">
            Start Group Sync
        </button>
    </div>
    <BottomNav activeTab={2} />
  </div>
);

// --- SCREEN 6: VAULT (Assets) ---
export const VaultScreen = () => (
  <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative">
    <Header title="Vault" subtitle="My Tickets" />

    <div className="px-5 space-y-4">
        <div className="flex justify-between items-end px-1 mb-1">
             <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Wallet</span>
             <span className="text-[9px] font-mono text-zinc-500">TICKETS: 1</span>
        </div>

        {/* Ticket Stub */}
        <div className="bg-white text-black rounded-sm p-1 relative overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow">
            <div className="border border-dashed border-zinc-300 p-4 h-32 flex flex-col justify-between relative">
                 <div className="absolute top-0 right-0 p-2">
                      <div className="w-3 h-3 border border-black rounded-full animate-ping"></div>
                      <div className="w-3 h-3 border border-black bg-acid rounded-full absolute top-2 right-2"></div>
                 </div>
                 
                 <div className="flex items-start gap-4">
                     <div className="text-[9px] font-mono font-bold uppercase rotate-180 py-1" style={{writingMode: 'vertical-rl'}}>Admit One</div>
                     <div>
                         <h3 className="text-2xl font-black uppercase leading-none mb-1">Bubble Love</h3>
                         <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">Het Sieraad</div>
                         <div className="text-[9px] font-mono text-zinc-500">SAT 22 NOV</div>
                     </div>
                 </div>

                 <div className="flex justify-between items-end">
                      <div className="h-4 w-32 bg-black" style={{backgroundImage: 'repeating-linear-gradient(90deg, transparent 0, transparent 2px, #fff 2px, #fff 4px)'}}></div>
                      <div className="flex flex-col items-end">
                         <div className="font-mono text-xl font-black">€32.80</div>
                         <div className="text-[8px] font-bold uppercase bg-black text-white px-1 mt-0.5">Direct-to-Fan</div>
                      </div>
                 </div>
            </div>
            
            {/* Cutout circles */}
            <div className="absolute top-1/2 -left-2 w-4 h-4 bg-black rounded-full"></div>
            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-black rounded-full"></div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-4 mt-8">
             <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold uppercase text-zinc-500">Status</span>
                  <span className="text-[9px] font-mono text-acid flex items-center gap-1"><ShieldCheck size={10}/> SECURE</span>
             </div>
             <p className="font-mono text-[10px] text-zinc-400">
                 Verified Anti-Scalp Ticket. Tied to your secure ID. Cannot be resold by bots.
             </p>
        </div>

        <div className="mt-8 h-12 bg-zinc-900 border border-zinc-800 flex items-center px-4 relative overflow-hidden opacity-80">
             <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500">Slide to Activate {'>'}{'>'}{'>'}</span>
             </div>
             <div className="w-10 h-full bg-black border-r border-zinc-700 absolute left-0 flex items-center justify-center">
                 <ChevronRight size={14} className="text-zinc-600" />
             </div>
        </div>
    </div>
    <BottomNav activeTab={3} />
  </div>
);

// --- SCREEN 7: SIGNAL (Activity) ---
export const SignalScreen = () => (
  <div className="flex flex-col h-full bg-zinc-950 font-sans text-white relative">
    <Header title="Signal" subtitle="Notifications" />

    <div className="px-5 space-y-3">
        {/* Item 1 */}
        <div className="bg-white text-black p-4 border border-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
             <div className="flex gap-3 mb-3">
                  <div className="w-8 h-8 border border-black flex items-center justify-center font-bold text-sm">S</div>
                  <div className="flex-1">
                      <p className="text-xs font-bold leading-tight">
                          <span className="font-black">Sarah</span> invited you to <span className="underline">Garage Noord</span>.
                      </p>
                  </div>
             </div>
             <div className="flex gap-2 pl-11">
                  <button className="bg-black text-white text-[9px] font-black uppercase px-3 py-1.5 hover:bg-acid hover:text-black transition-colors">I'm In</button>
                  <button className="border border-zinc-300 text-[9px] font-bold uppercase px-3 py-1.5 hover:border-black transition-colors">Ignore</button>
             </div>
        </div>

        {/* Item 2 */}
        <div className="bg-zinc-900 border border-zinc-800 p-4">
             <div className="flex gap-3">
                  <div className="w-8 h-8 bg-acid/10 border border-acid flex items-center justify-center font-bold text-sm text-acid">
                      <Ticket size={14} />
                  </div>
                  <div className="flex-1">
                      <div className="text-[9px] font-bold uppercase text-acid mb-1">Early Access</div>
                      <p className="text-xs font-medium text-zinc-300 leading-tight">
                          Tickets for <span className="font-bold text-white">Thuishaven</span> released. Beat the scalpers.
                      </p>
                  </div>
             </div>
        </div>
    </div>
    <BottomNav activeTab={4} />
  </div>
);

// --- SCREEN 8: LOCK ---
export const LockScreen = () => (
    <div className="flex flex-col h-full bg-zinc-950 items-center justify-center px-6 relative">
        <div className="w-full mb-12 text-center">
            <Lock className="w-12 h-12 text-acid mx-auto mb-6 stroke-1" />
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-2">
                Enter
            </h1>
            <h1 className="text-5xl font-black text-acid tracking-tighter uppercase leading-[0.85]">
                Code
            </h1>
        </div>
        
        <div className="mb-8 font-mono text-[10px] text-zinc-500 uppercase tracking-widest text-center">
            &gt; Secure Access
        </div>

        <div className="flex gap-3">
            <div className="w-12 h-14 border border-zinc-800 bg-zinc-900 flex items-center justify-center">
                 <div className="w-2 h-2 bg-acid rounded-full shadow-[0_0_10px_rgba(132,204,22,0.8)]"></div>
            </div>
            <div className="w-12 h-14 border border-zinc-800 bg-zinc-950"></div>
            <div className="w-12 h-14 border border-zinc-800 bg-zinc-950"></div>
            <div className="w-12 h-14 border border-zinc-800 bg-zinc-950"></div>
        </div>
        
        <div className="absolute bottom-12 text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
            Privacy Active
        </div>
    </div>
);
