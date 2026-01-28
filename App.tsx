
import React, { useState, useEffect } from 'react';
import MiningBackground from './components/MiningBackground';
import { fetchAppDescription } from './services/geminiService';
import { Download, Smartphone, ShieldCheck, Cpu, Globe, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [appData, setAppData] = useState<any>(null);

  useEffect(() => {
    const loadContent = async () => {
      const data = await fetchAppDescription();
      setAppData(data);
    };
    loadContent();
  }, []);

  const handleDownload = () => {
    setDownloading(true);
    
    // Simulate professional APK download pointing to the 'apk' folder
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

  return (
    <div className="relative min-h-screen selection:bg-white selection:text-black overflow-x-hidden bg-black text-white">
      <MiningBackground />

      {/* Main Content Area */}
      <main className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center min-h-screen text-center py-16">
        
        {/* Navigation Bar - Text Only */}
        <nav className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-8 flex justify-between items-center z-50">
          <div className="flex flex-col items-start leading-none text-left cursor-default">
            <span className="font-orbitron font-black text-lg md:text-xl tracking-tighter text-white">HASHGO</span>
            <span className="text-[7px] md:text-[9px] font-orbitron text-zinc-500 tracking-[0.2em] uppercase">Mining Systems</span>
          </div>
          
          <div className="hidden md:flex gap-6 text-[9px] font-orbitron uppercase tracking-[0.3em] text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Protocol</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex flex-col items-center max-w-3xl w-full animate-fade-in px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] md:text-[9px] font-orbitron uppercase tracking-[0.2em] text-zinc-400 mb-6">
            <ShieldCheck className="w-3 h-3 text-white" />
            V1.0.0 Stable Build
          </div>
          
          <h1 className="text-3xl md:text-6xl font-orbitron font-black text-white mb-6 leading-tight tracking-tighter uppercase italic">
            {appData?.headline || "ELITE MINING ENGINE"}
          </h1>
          
          <p className="text-zinc-400 text-sm md:text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed">
            {appData?.subheadline || "The industry's most powerful mobile mining engine. Optimized for efficiency, engineered for the future."}
          </p>

          {/* Centered Download Button Container */}
          <div className="relative group flex flex-col items-center">
            <div className="absolute inset-0 bg-white/5 rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
            
            <button 
              onClick={handleDownload}
              disabled={downloading}
              className="relative flex items-center justify-center gap-4 bg-white hover:bg-zinc-100 text-black font-orbitron font-black py-4 px-10 md:py-5 md:px-12 rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-wait shadow-2xl z-10 overflow-hidden"
            >
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-full transition-all duration-1000 ease-in-out"></div>
              
              {downloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  CONNECTING...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span className="text-sm md:text-base">DOWNLOAD APK</span>
                </>
              )}
            </button>
            
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[8px] md:text-[9px] font-orbitron text-zinc-600 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-1.5 bg-zinc-900/50 px-2 py-1 rounded border border-white/5">
                <Smartphone className="w-3 h-3" /> Android 10+
              </span>
              <span className="hidden sm:inline opacity-10">|</span>
              <span className="flex items-center gap-1.5 bg-zinc-900/50 px-2 py-1 rounded border border-white/5">
                <Globe className="w-3 h-3" /> Global Pool
              </span>
              <span className="hidden sm:inline opacity-10">|</span>
              <span className="flex items-center gap-1.5 bg-zinc-900/50 px-2 py-1 rounded border border-white/5">
                <Cpu className="w-3 h-3" /> HW Accelerated
              </span>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20 max-w-5xl w-full px-4">
          {(appData?.features || [
            { title: "Peak Hashrate", description: "Proprietary algorithms that maximize hardware throughput with minimal heat." },
            { title: "Safe Node", description: "End-to-end encrypted node communication using secure protocols." },
            { title: "Smart Data", description: "Real-time performance tracking and analytics for consistent results." }
          ]).map((f: any, idx: number) => (
            <div key={idx} className="group relative bg-zinc-900/20 border border-white/5 p-6 rounded-xl hover:border-white/20 transition-all duration-500 text-left hover:bg-zinc-900/40">
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-10 transition-opacity">
                   <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-orbitron text-[10px] font-bold uppercase tracking-[0.2em] mb-3">{f.title}</h3>
                <p className="text-zinc-500 text-[11px] md:text-xs leading-relaxed font-light">{f.description}</p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center border-t border-white/5 pt-10 w-full max-w-4xl pb-10 flex flex-col items-center gap-6">
          <p className="text-zinc-700 text-[7px] md:text-[8px] font-orbitron tracking-[0.3em] uppercase">
            &copy; 2024 HASHGO GLOBAL SYSTEMS
          </p>
          
          <div className="flex gap-6 opacity-20 text-[7px] md:text-[8px] font-orbitron tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </footer>

      </main>

      {/* Atmospheric Background Layer */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.01)_0%,_transparent_80%)] pointer-events-none -z-1" />
    </div>
  );
};

export default App;
