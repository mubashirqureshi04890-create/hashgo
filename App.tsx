
import React, { useState, useEffect } from 'react';
import MiningBackground from './components/MiningBackground';
import { fetchAppDescription } from './services/geminiService';
import { Download, Smartphone, ShieldCheck, Cpu, Globe, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [appData, setAppData] = useState<any>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchAppDescription();
        setAppData(data);
      } catch (err) {
        console.error("Failed to load app data", err);
      }
    };
    loadContent();
  }, []);

  const handleDownload = () => {
    setDownloading(true);
    
    // Simulate APK download from 'apk/' folder
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = 'apk/hashgo_v1.0.0.apk';
      a.download = 'hashgo_v1.0.0.apk';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloading(false);
    }, 1000);
  };

  // Immediate Fallbacks
  const headline = appData?.headline || "ELITE MINING ENGINE";
  const subheadline = appData?.subheadline || "The industry's most powerful mobile mining engine. Optimized for efficiency, engineered for the future.";
  const features = appData?.features || [
    { title: "Peak Hashrate", description: "Proprietary algorithms that maximize hardware throughput with minimal heat." },
    { title: "Safe Node", description: "End-to-end encrypted node communication using secure protocols." },
    { title: "Smart Data", description: "Real-time performance tracking and analytics for consistent results." }
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      <MiningBackground />

      {/* Main Content Area */}
      <main className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center min-h-screen text-center py-20">
        
        {/* Navigation Bar - Clean Typography */}
        <nav className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-10 flex justify-between items-center z-50">
          <div className="flex flex-col items-start leading-none text-left cursor-default">
            <span className="font-orbitron font-black text-xl md:text-2xl tracking-tighter text-white">HASHGO</span>
            <span className="text-[8px] md:text-[10px] font-orbitron text-zinc-500 tracking-[0.3em] uppercase">Mining Systems</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-[10px] font-orbitron uppercase tracking-[0.4em] text-zinc-500">
            <a href="#" className="hover:text-white transition-all">Protocol</a>
            <a href="#" className="hover:text-white transition-all">Support</a>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex flex-col items-center max-w-4xl w-full animate-in fade-in slide-in-from-bottom-4 duration-1000 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] font-orbitron uppercase tracking-[0.3em] text-zinc-400 mb-8">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            V1.0.0 Stable Build
          </div>
          
          <h1 className="text-4xl md:text-7xl font-orbitron font-black text-white mb-8 leading-tight tracking-tighter uppercase italic">
            {headline}
          </h1>
          
          <p className="text-zinc-400 text-base md:text-xl max-w-2xl mx-auto mb-14 font-light leading-relaxed">
            {subheadline}
          </p>

          {/* Centered Download Action */}
          <div className="relative group flex flex-col items-center">
            <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
            
            <button 
              onClick={handleDownload}
              disabled={downloading}
              className="relative flex items-center justify-center gap-5 bg-white hover:bg-zinc-100 text-black font-orbitron font-black py-5 px-10 md:py-6 md:px-16 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-wait shadow-2xl z-10 overflow-hidden"
            >
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:left-full transition-all duration-1000 ease-in-out"></div>
              
              {downloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  INITIALIZING...
                </>
              ) : (
                <>
                  <Download className="w-6 h-6" />
                  <span className="text-base md:text-lg tracking-wider">DOWNLOAD APK</span>
                </>
              )}
            </button>
            
            {/* Contextual Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-[9px] md:text-[10px] font-orbitron text-zinc-600 uppercase tracking-[0.3em]">
              <span className="flex items-center gap-2 bg-zinc-900/50 px-3 py-1 rounded-md border border-white/5">
                <Smartphone className="w-3 h-3" /> Android 10+
              </span>
              <span className="hidden sm:inline opacity-10">|</span>
              <span className="flex items-center gap-2 bg-zinc-900/50 px-3 py-1 rounded-md border border-white/5">
                <Globe className="w-3 h-3" /> Global Pool
              </span>
              <span className="hidden sm:inline opacity-10">|</span>
              <span className="flex items-center gap-2 bg-zinc-900/50 px-3 py-1 rounded-md border border-white/5">
                <Cpu className="w-3 h-3" /> HW Powered
              </span>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-6xl w-full px-4">
          {features.map((f: any, idx: number) => (
            <div key={idx} className="group relative bg-zinc-900/20 border border-white/5 p-10 rounded-2xl hover:border-white/20 transition-all duration-500 text-left hover:bg-zinc-900/40">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                   <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-white font-orbitron text-[11px] font-bold uppercase tracking-[0.4em] mb-5">{f.title}</h3>
                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed font-light">{f.description}</p>
                <div className="mt-8 w-8 h-[1px] bg-white/10 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-32 text-center border-t border-white/5 pt-16 w-full max-w-5xl pb-16 flex flex-col items-center gap-10">
          <p className="text-zinc-800 text-[9px] md:text-[10px] font-orbitron tracking-[0.5em] uppercase">
            &copy; 2024 HASHGO GLOBAL INFRASTRUCTURE
          </p>
          
          <div className="flex gap-10 opacity-20 text-[8px] md:text-[9px] font-orbitron tracking-[0.3em] uppercase">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </footer>

      </main>

      {/* Atmospheric FX Layer */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.015)_0%,_transparent_80%)] pointer-events-none -z-1" />
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </div>
  );
};

export default App;
