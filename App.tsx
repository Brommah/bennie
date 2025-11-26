
import React, { useState, useEffect } from 'react';
import { Terminal, Globe, ShieldCheck, Cpu, Lock, Database, Zap, Skull, ChevronRight, Music, Users, ArrowDown, Clock } from 'lucide-react';
import PhoneFrame from './components/PhoneFrame';
import Navbar from './components/Navbar';
import BenMascot from './components/BenMascot';
import BenLogo from './components/BenLogo';
import Manifesto from './components/Manifesto'; 
import TheTech from './components/TheTech'; 
import HeroBackground from './components/HeroBackground';
import CyberBackground from './components/CyberBackground';
import { SyncScreen, RadarScreen, PlansScreen, VaultScreen, LockScreen, MatchingScreen, IntelScreen, EventDetailsScreen, SignalScreen } from './components/AppScreens';

const App: React.FC = () => {
  const [scrollPos, setScrollPos] = useState(0);
  const [currentView, setCurrentView] = useState<'LANDING' | 'MANIFESTO' | 'THE_TECH'>('LANDING');

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-void text-signal font-sans selection:bg-acid selection:text-black overflow-x-hidden">
      
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* --- MANIFESTO VIEW --- */}
      {currentView === 'MANIFESTO' && <Manifesto />}

      {/* --- THE TECH VIEW --- */}
      {currentView === 'THE_TECH' && <TheTech />}

      {/* --- LANDING VIEW --- */}
      {currentView === 'LANDING' && (
        <>
            {/* --- SECTION 1: THE HERO --- */}
            <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 md:pt-24 pb-8 md:pb-12 overflow-hidden bg-black border-b border-zinc-900">
                
                {/* Premium Minimal Background */}
                <HeroBackground />

                {/* Hero Content Wrapper */}
                <div className="relative z-30 w-full max-w-[2000px] mx-auto px-6 md:px-12 lg:pl-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">
                    
                    {/* Left Col: Text */}
                    <div className="text-left flex flex-col items-start relative z-40 lg:col-span-7">
                        
                        {/* HEADLINE - Reduced sizes for 100% zoom */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] font-black uppercase leading-[0.85] tracking-tighter text-white mb-4 md:mb-6 drop-shadow-2xl break-words max-w-full">
                            <span className="block text-gradient-red mb-1">STOP CHASING</span>
                            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-1">
                                <div className="relative">
                                    <span className="text-gradient-red opacity-60">HYPE</span>
                                    <span className="absolute top-1/2 left-[-5%] w-[110%] h-[3px] md:h-[5px] bg-red-600 -translate-y-1/2 rotate-[-5deg]"></span>
                                </div>
                                <span className="text-gradient-acid">BEN</span>
                            </div>
                            <span className="block text-white">THE SIGNAL!</span>
                        </h1>

                        {/* SUBTEXT - More compact */}
                        <div className="space-y-4 md:space-y-5 max-w-3xl mb-6 md:mb-8">
                            <p className="text-white font-bold text-lg md:text-xl lg:text-2xl leading-snug">
                                Catch the best events and hottest artists playing near you before anyone else. Experience private AI that doesnt look for profit, but just <span className="text-acid">finds you the party</span>.
                            </p>
                        </div>

                        {/* CTAs - Premium Design */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-5 w-full md:w-auto mb-6 md:mb-8">
                            <a 
                              href="https://ben-black-27161314002.us-west1.run.app/" 
                              className="group relative bg-acid text-black px-10 py-4 font-black text-base uppercase tracking-wide w-full sm:w-auto text-center flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_0_50px_rgba(132,204,22,0.5)] overflow-hidden"
                              style={{ borderRadius: '100px' }}
                            >
                                {/* Animated gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-acid via-[#a3e635] to-acid bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                {/* Button content */}
                                <span className="relative z-10 flex items-center gap-2">
                                  Join Beta
                                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </span>
                                
                                {/* Shine effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                            </a>
                            <button onClick={() => setCurrentView('MANIFESTO')} className="text-zinc-400 font-semibold text-sm uppercase tracking-[0.15em] hover:text-white flex items-center gap-2 group transition-all duration-300 py-2 px-4">
                                <span className="relative">
                                  Read Manifesto
                                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-acid group-hover:w-full transition-all duration-300" />
                                </span>
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 text-acid" />
                            </button>
                        </div>

                        {/* ENHANCED PRIVACY MODULE */}
                        <div className="group relative bg-zinc-950/80 backdrop-blur-sm border border-zinc-800/80 p-4 md:p-5 rounded-lg overflow-hidden w-full max-w-2xl transition-all duration-500 hover:border-acid/40 hover:shadow-[0_0_30px_rgba(132,204,22,0.08)]">
                            
                            {/* Subtle gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-acid/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10 flex items-center gap-4">
                                {/* Icon Module */}
                                <div className="shrink-0">
                                    <div className="w-10 h-10 bg-acid/10 border border-acid/20 rounded-lg flex items-center justify-center relative group-hover:bg-acid/15 group-hover:border-acid/30 transition-all duration-300">
                                        <ShieldCheck className="w-5 h-5 text-acid" strokeWidth={2} />
                                    </div>
                                </div>
                                
                                {/* Text Content */}
                                <p className="text-zinc-400 text-base md:text-lg font-medium leading-relaxed">
                                    Your data is kept secure from major tech platforms, accessed only by AI on <button onClick={() => setCurrentView('MANIFESTO')} className="text-white font-semibold border-b border-acid/40 hover:border-acid hover:text-acid transition-all duration-300 cursor-pointer inline">your terms</button>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Phone & Mascot - Adjusted positioning */}
                    <div className="relative h-[380px] md:h-[550px] lg:h-full flex items-center justify-center lg:justify-end lg:col-span-5">
                        {/* Stronger Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[400px] h-[280px] md:h-[400px] bg-acid rounded-full blur-[80px] md:blur-[100px] opacity-20 pointer-events-none animate-pulse-fast"></div>

                        {/* Phone Group Wrapper */}
                        <div className="relative inline-block z-10 pointer-events-none md:pointer-events-auto lg:mr-4 xl:mr-8">
                            
                            {/* Mascot Floating - Hidden on mobile, shown on md+ */}
                            <div className="hidden md:block absolute md:top-28 md:-left-40 w-64 h-64 z-0 animate-float pointer-events-none">
                                <BenMascot />
                            </div>

                            {/* Phone (Front Center) */}
                            <div className="relative z-20 scale-[0.7] md:scale-[0.85] lg:scale-90 shadow-[0_0_60px_rgba(0,0,0,0.9)] origin-center">
                                <PhoneFrame withCables>
                                    <IntelScreen />
                                </PhoneFrame>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator - Hidden on Mobile */}
                <div className="hidden md:flex absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-zinc-600 animate-bounce">
                    <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
                    <ArrowDown size={14} />
                </div>
            </section>

            {/* --- SECTION 2: THE NARRATIVE --- */}
            <section className="bg-signal py-16 md:py-32 border-y border-zinc-200 relative overflow-hidden">
                {/* Subtle Grid */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}></div>

                <div className="container mx-auto px-4 md:px-12 flex flex-col items-center text-center relative z-10">
                    
                    {/* Tag */}
                    <div className="bg-black inline-block px-3 py-1 mb-8 shadow-md">
                        <span className="text-acid font-mono text-sm font-medium tracking-widest">
                        Private-Owned AI
                        </span>
                    </div>

                    {/* Headline Layout - 2 Straight Bars */}
                    <div className="relative mb-12 md:mb-20 flex flex-col items-center gap-4 w-full"> 
                        
                        {/* Bar 1 */}
                        <div className="bg-black text-white px-6 md:px-12 py-3 md:py-6 shadow-[4px_4px_0px_rgba(132,204,22,1)] md:shadow-[8px_8px_0px_rgba(132,204,22,1)] relative z-10 w-fit max-w-full">
                            <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none break-words">
                                CURATE THE
                            </h2>
                        </div>

                        {/* Bar 2 */}
                        <div className="bg-black text-white px-6 md:px-12 py-3 md:py-6 shadow-[4px_4px_0px_rgba(132,204,22,1)] md:shadow-[8px_8px_0px_rgba(132,204,22,1)] relative z-10 w-fit max-w-full">
                            <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none break-words">
                                <span className="text-gradient-acid">UNDERGROUND</span>
                            </h2>
                            {/* Robot Decoration */}
                            <div className="absolute -right-4 -top-12 md:-right-24 md:-top-24 w-16 h-16 md:w-48 md:h-48 z-20 transform rotate-12">
                                <BenMascot showSpeechBubble={false} />
                            </div>
                        </div>
                    </div>

                    {/* Clean Stacked Text Strips */}
                    <div className="flex flex-col items-center gap-6 md:gap-4 max-w-7xl mx-auto w-full">
                        
                        {/* Line 1 */}
                        <div className="bg-black text-base sm:text-lg md:text-2xl lg:text-3xl font-black px-4 md:px-6 py-3 md:py-4 shadow-lg w-fit max-w-full">
                            <span className="text-gradient-red block whitespace-normal">Big algorithms feed you what pays them.</span>
                        </div>

                        {/* Line 2 with Button (No Glitch) */}
                        <div className="bg-black text-zinc-300 text-base sm:text-lg md:text-2xl lg:text-3xl font-bold px-4 md:px-6 py-3 md:py-4 shadow-lg w-fit max-w-full flex items-center flex-wrap gap-2 justify-center relative">
                            {/* BEN MASCOT POPPING UP */}
                            <div className="relative inline-block mr-2 group">
                                <div className="absolute -top-16 -left-10 w-20 h-20 z-20 pointer-events-none transform -rotate-12 scale-x-[-1]">
                                    <BenMascot showSpeechBubble={false} />
                                </div>
                                <button className="bg-acid text-black font-black uppercase px-3 py-1 shadow-[4px_4px_0_white] hover:bg-white hover:text-black transition-colors relative z-10">
                                    Meet BEN
                                </button>
                            </div>
                            
                            <span className="text-white font-black">He works for you.</span> 
                            <span className="whitespace-normal inline-block">No pay-to-play suggestions. No mainstream filler.</span>
                        </div>

                        {/* Spacer */}
                        <div className="h-0 md:h-8"></div>

                        {/* Conclusion */}
                        <div className="bg-black text-zinc-300 text-base sm:text-lg md:text-2xl lg:text-3xl font-bold px-4 md:px-6 py-3 md:py-4 shadow-lg text-center max-w-6xl w-fit">
                            <span className="whitespace-normal block">Just a private intelligence agent that digs deep to find the artists and venues you actually love—</span>
                            <span className="text-gradient-acid font-black uppercase inline-block mt-2 lg:mt-0 lg:ml-2">AT EARLY BIRD PRICES!</span>
                        </div>
                        
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: CURATION (CREW SYNC) --- */}
            <section className="relative min-h-auto md:min-h-screen bg-black flex flex-col md:flex-row">
                
                {/* Particle Background */}
                <CyberBackground variant="particles" intensity="low" className="opacity-50" />
                
                {/* Left: Copy */}
                <div className="flex-1 p-6 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-zinc-900 z-10 bg-black relative">
                
                <div className="inline-flex items-center gap-2 text-acid font-mono text-xs md:text-sm uppercase tracking-widest mb-6">
                    <Users size={16} />
                    <span>Swarm Intelligence</span>
                </div>
                
                <h2 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4 leading-[0.85] text-white">
                    HIVE MIND. <br/><span className="text-gradient-acid">NO DRAMA.</span>
                </h2>
                
                <div className="space-y-8 md:space-y-12 max-w-2xl">
                    <p className="text-zinc-300 font-bold text-lg md:text-xl leading-relaxed">
                        The group chat is where plans go to die. <span className="text-gradient-red">Stop arguing.</span>
                    </p>
                    <p className="text-zinc-300 font-bold text-lg md:text-xl leading-relaxed">
                        <span className="text-gradient-acid">BEN</span> instantly syncs your squad's music taste using a "Blind-Match Protocol."
                    </p>
                    <p className="text-zinc-300 font-bold text-lg md:text-xl leading-relaxed">
                        Your friends never see your guilty pleasures. They only see the events where everyone vibes together.
                    </p>
                    
                    <div>
                        <h4 className="text-acid font-black text-lg md:text-xl uppercase mb-3 flex items-center gap-2 tracking-wide">
                            <ShieldCheck size={20} className="text-acid" /> Zero Knowledge, Maximum Fun
                        </h4>
                        <p className="text-zinc-300 font-bold text-base md:text-lg leading-relaxed border-l-4 border-zinc-800 pl-6">
                            Your listening data stays on your phone. The plan gets made in seconds.
                        </p>
                    </div>
                </div>
                </div>

                {/* Right: Visualization */}
                <div className="flex-1 relative flex items-center justify-center bg-zinc-950 overflow-hidden h-[500px] md:h-auto md:min-h-[600px] group">
                <div className="absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-40" style={{
                    backgroundImage: 'linear-gradient(rgba(132, 204, 22, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(132, 204, 22, 0.4) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    transform: 'perspective(1000px) rotateX(60deg) translateY(0) scale(1.5)',
                }}></div>

                <div className="relative z-10 scale-90 md:scale-100 pointer-events-none md:pointer-events-auto">
                    <PhoneFrame className="shadow-[0_0_50px_rgba(132,204,22,0.1)]">
                        <RadarScreen />
                    </PhoneFrame>
                </div>
                </div>
            </section>

            {/* --- SECTION 4: THE DISCOVERY (RECOMMENDATIONS) --- */}
            <section className="relative bg-black border-t border-zinc-900 overflow-hidden">
                
                {/* Ticker Tape */}
                <div className="w-full bg-acid text-black py-3 md:py-4 overflow-hidden flex border-y border-black z-20 relative">
                <div className="animate-marquee whitespace-nowrap font-black uppercase text-xl md:text-2xl tracking-tight">
                    OWN YOUR AI // FIND NEW TALENT // OWN YOUR AI // FIND NEW TALENT // OWN YOUR AI // FIND NEW TALENT
                </div>
                </div>

                <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16 relative">
                
                <div className="flex-1 w-full text-left md:text-right z-10">
                    <div className="inline-flex items-center gap-2 text-acid font-mono text-xs md:text-sm uppercase tracking-widest mb-6 justify-end w-full">
                        <span>Personalized Discovery</span>
                        <Cpu size={16} />
                    </div>
                    
                    <h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-white">
                        YOU DEFINE <br/><span className="text-gradient-acid">COOL</span>
                    </h2>
                    
                    <div className="ml-auto max-w-2xl space-y-8 md:space-y-12">
                        <p className="text-white font-bold text-xl md:text-3xl leading-tight">
                        Stop letting big tech decide your taste. Your Personal Agent scans for the small artists and underground shops that mainstream apps ignore.
                        </p>
                        
                        <div className="text-left md:text-right">
                            <h3 className="text-acid font-black uppercase mb-3 text-lg md:text-xl tracking-wide">Your Data. Your Rules.</h3>
                            <p className="text-zinc-300 font-bold text-base md:text-lg leading-relaxed">
                            Your preferences stay in your vault. You train the model, you own the results. No OpenAI, No data brokers.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative flex justify-center z-10 w-full overflow-hidden md:overflow-visible h-[500px] md:h-auto items-center">
                    <div className="relative z-10 flex gap-[-50px] scale-75 md:scale-100 origin-center pointer-events-none md:pointer-events-auto">
                        <div className="transform -translate-x-12 translate-y-12 rotate-[-5deg] hover:rotate-0 transition-transform duration-500 z-0 scale-90 opacity-60 grayscale">
                            <PhoneFrame>
                                <IntelScreen />
                            </PhoneFrame>
                        </div>
                        <div className="transform z-10 hover:scale-105 transition-transform duration-500 shadow-2xl">
                            <PhoneFrame>
                                <MatchingScreen />
                            </PhoneFrame>
                        </div>
                    </div>
                </div>
                </div>
            </section>

            {/* --- SECTION 5: THE ARTIFACT (TICKETS) --- */}
            <section className="relative py-20 md:py-32 bg-zinc-950 border-t border-zinc-900 flex flex-col items-center">
                
                {/* Matrix data rain background */}
                <CyberBackground variant="matrix" intensity="low" className="opacity-30" />
                
                <div className="text-center mb-12 md:mb-20 relative z-10 px-6 max-w-5xl">
                <div className="inline-flex items-center gap-2 text-acid font-mono text-xs md:text-sm uppercase tracking-widest mb-6">
                    <Clock size={16} />
                    <span>BE EARLY</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 md:mb-10 text-white leading-[0.9]">
                    <span className="text-gradient-acid">STOP PAYING</span> <br className="hidden md:block" />FOR BEING LATE!
                </h2>
                
                <p className="text-zinc-300 font-bold text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
                    Get notified well in time when a party <span className="text-gradient-acid">BEN</span> spots and you'll like is announced. You'll only need <span className="text-gradient-acid">BEN</span> a couple minutes per week, and start earning right away - while curating your taste for free!
                </p>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-16 items-center justify-center max-w-6xl mx-auto px-6 relative z-10 pointer-events-none md:pointer-events-auto">
                    {/* Hidden on mobile, shown on md+ */}
                    <div className="hidden md:block transform md:-rotate-3 hover:rotate-0 transition-transform duration-500">
                        <PhoneFrame>
                        <EventDetailsScreen />
                        </PhoneFrame>
                    </div>
                    <div className="transform hover:rotate-0 transition-transform duration-500 scale-90 md:scale-100 md:rotate-3">
                        <PhoneFrame>
                        <VaultScreen />
                        </PhoneFrame>
                    </div>
                </div>
                
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle at center, #3F3F46 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}></div>

            </section>

            {/* --- SECTION 6: THE PROMISE --- */}
            <section className="bg-black py-16 md:py-24 border-t border-zinc-800 relative overflow-hidden">
                <div className="container mx-auto px-6 md:px-20 relative z-10">
                    <h3 className="text-acid font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-8 md:mb-12">
                    // OUR PROMISE
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                    <div>
                        <h4 className="text-4xl md:text-5xl font-black uppercase mb-8 text-white leading-[0.9]">
                            BUILT FOR FANS. <br/>NOT SHAREHOLDERS.
                        </h4>
                        <p className="text-zinc-300 font-medium text-base md:text-lg leading-relaxed mb-8">
                            We believe in a fair ecosystem.
                        </p>
                        <ul className="space-y-8 font-medium text-base text-zinc-400">
                            <li className="flex gap-4 items-start">
                                <span className="text-gradient-acid font-bold text-xl leading-none">01</span>
                                <div>
                                <strong className="text-gradient-acid block mb-2 uppercase text-lg font-black">Anti-Algorithm</strong>
                                We don't sell your data to OpenAI. We use it to create a taste profile that belongs to you.
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <span className="text-gradient-acid font-bold text-xl leading-none">02</span>
                                <div>
                                    <strong className="text-gradient-acid block mb-2 uppercase text-lg font-black">Pure Signal</strong>
                                    Adoption of open-source tech means the code is transparent. No hidden agendas.
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <span className="text-gradient-acid font-bold text-xl leading-none">03</span>
                                <div>
                                    <strong className="text-gradient-acid block mb-2 uppercase text-lg font-black">The Revolution</strong>
                                    Music discovery is broken. We are building the network that gives the scene back to the people on the floor.
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="border border-zinc-800 bg-zinc-900/20 p-8 md:p-10 font-medium text-base text-zinc-400 flex flex-col justify-between rounded-xl">
                        <div>
                            <div className="mb-4 text-gradient-acid font-black uppercase tracking-wider text-xl">
                                Why Join?
                            </div>
                            <p className="mb-8 leading-relaxed text-base md:text-lg">
                                Because music discovery is broken and it's time for a revolution - breaking with technocrats (that's actually a bad word) like Sam Altman, Elon Musk and Mark Zuckerberg. <br/><br/>

                                Join a network that's designed to grow a real world, cyberpunk movement that helps you find the good stuff and coordinate with your crew.
                            </p>
                            <div className="mb-4 text-gradient-acid font-black uppercase tracking-wider text-xl">
                                Who is it for?
                            </div>
                            <p className="leading-relaxed text-base md:text-lg">
                                For real fans, squad planners, and anyone who wants to support the underground scene.
                            </p>
                        </div>
                        
                        <div className="mt-12 pt-8 border-t border-zinc-800">
                            <a href="https://ben-black-27161314002.us-west1.run.app/" className="w-full py-6 bg-gradient-to-r from-acid via-[#4ade80] to-[#1B4D3E] text-black font-black uppercase text-xl md:text-2xl hover:scale-[1.02] transition-transform rounded-sm shadow-[0_0_30px_rgba(132,204,22,0.4)] block text-center relative overflow-hidden group">
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Join the Network <ChevronRight strokeWidth={4} />
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </a>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-black border-t border-zinc-800 p-8 md:p-16 font-mono text-sm text-zinc-500 relative z-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2">
             <div className="w-[120px] md:w-[150px] h-[50px] md:h-[60px] relative mb-6">
                <BenLogo className="w-full h-full" />
             </div>
             <p className="max-w-md mb-6 leading-relaxed text-base">
               The social network for the underground. 
               Pure signal. No ads.
             </p>
             <div className="flex gap-6 text-white font-bold">
                <a href="#" className="hover:text-acid transition-colors">TWITTER</a>
                <a href="#" className="hover:text-acid transition-colors">DISCORD</a>
                <a href="#" className="hover:text-acid transition-colors">GITHUB</a>
             </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest">Explore</h4>
            <ul className="space-y-3 text-base">
              <button onClick={() => setCurrentView('MANIFESTO')} className="hover:text-acid cursor-pointer flex items-center gap-2">Manifesto</button>
              <li className="hover:text-acid cursor-pointer flex items-center gap-2">Events</li>
              <a href="https://ben-black-27161314002.us-west1.run.app/" className="hover:text-acid cursor-pointer flex items-center gap-2">Download</a>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest">System</h4>
            <div className="space-y-4">
               <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-md">
                  <div className="flex justify-between mb-2 font-bold text-white">
                    <span>STATUS</span>
                    <span className="text-acid">ONLINE</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-acid h-full w-[100%]"></div>
                  </div>
               </div>
               <div className="flex items-center gap-2 text-acid font-bold">
                  <ShieldCheck size={18} />
                  <span>SECURE CONNECTION</span>
               </div>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center opacity-50 text-xs">
           <p>© 2026 BEN NETWORK. ALL RIGHTS RESERVED.</p>
           <p>EST. 2026 // AMSTERDAM</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
