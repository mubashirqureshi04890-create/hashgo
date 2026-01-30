
import React, { useState, useEffect } from 'react';
import MiningBackground from './components/MiningBackground';
import { fetchAppDescription } from './services/geminiService';
import { Download, Smartphone, ShieldCheck, Cpu, Globe, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [appData, setAppData] = useState<any>(null);

  useEffect(() => {
    // Load data with a catch to ensure the app never stays blank
    fetchAppDescription()
      .then(setAppData)
      .catch((err) => {
        console.error("Critical Load Error:", err);
        // Ensure state is set even on error to trigger render
        setAppData({}); 
      });
  }, []);

  const handleDownload = () => {
    setDownloading(true);
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

  // Content fallbacks to prevent empty text nodes
  const headline = appData?.headline || "PREMIUM MINING ENGINE";
  const subheadline = appData?.subheadline || "The industry's most efficient mobile mining utility. High-performance analysis and secure node connectivity.";
  const features = appData?.features || [
    { title: "Peak Hashrate", description: "Optimized algorithms for maximum hardware efficiency." },
    { title: "Secure Node", description: "Encrypted communication for safe data transmission." },
    { title: "Smart Metrics", description: "Real-time performance tracking and analytics." }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* Dynamic Mining Canvas Background */}
      <MiningBackground />

      {/* Main Content Shell */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">
        
        {/* Navigation Header */}
        <header className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center">
          <div className="group cursor-default">
            <h2 className="font-orbitron font-black text-xl md:text-2xl tracking-tighter text-white">HASHGO</h2>
            <div className="h-[1px] w-0 group-hover:w-full bg-white transition-all duration-500 opacity-20"></div>
            <p className="text-[7px] md:text-[8px] font-orbitron text-zinc-500 tracking-[0.4em] uppercase mt-1">Mining Infrastructure</p>
          </div>
          <div className="hidden md:flex gap-8 text-[9px] font-orbitron text-zinc-600 tracking-widest uppercase">
            <span>Protocol v1.0</span>
            <span className="opacity-20">|</span>
            <span>Stable Build</span>
          </div>
        </header>

        {/* Hero Section - Centered */}
        <div className="max-w-3xl w-full flex flex-col items-center gap-8 animate-in fade-in duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900/50 border border-white/10 rounded-full text-[9px] font-orbitron uppercase tracking-widest text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 
            System Verified Build
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-6xl font-orbitron font-black leading-tight tracking-tighter italic uppercase text-white">
              {headline}
            </h1>
            <p className="text-zinc-500 text-sm md:text-lg max-w-xl mx-auto leading-relaxed font-light">
              {subheadline}
            </p>
          </div>

          {/* Central Download Call-to-Action */}
          <div className="mt-6 group relative">
            {/* Pulsing Atmosphere behind button */}
            <div className="absolute -inset-10 bg-white/[0.03] blur-3xl rounded-full animate-pulse pointer-events-none" />
            <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent blur opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <button 
              onClick={handleDownload}
              disabled={downloading}
              className="relative flex items-center justify-center gap-5 bg-white hover:bg-zinc-100 text-black font-orbitron font-black py-5 px-12 md:py-6 md:px-16 rounded-2xl transition-all transform active:scale-95 disabled:opacity-50 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              {downloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  CONNECTING...
                </>
              ) : (
                <>
                  <Download className="w-6 h-6" />
                  <span className="text-sm md:text-lg tracking-wider">DOWNLOAD APK</span>
                </>
              )}
            </button>
          </div>

          {/* Compatibility Grid */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-[9px] font-orbitron text-zinc-500 uppercase tracking-widest">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded">
              <Smartphone className="w-3 h-3" /> Android 10+
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded">
              <Globe className="w-3 h-3" /> Global Pool
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded">
              <Cpu className="w-3 h-3" /> HW Engine
            </div>
          </div>
        </div>

        {/* Features Bottom Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-5xl w-full">
          {features.map((f: any, idx: number) => (
            <div key={idx} className="group p-8 rounded-2xl border border-white/[0.03] bg-zinc-900/10 hover:bg-zinc-900/30 hover:border-white/10 transition-all duration-500 text-left">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                <h3 className="text-[10px] md:text-[11px] font-orbitron font-bold text-white uppercase tracking-widest">{f.title}</h3>
              </div>
              <p className="text-[11px] md:text-xs text-zinc-500 leading-relaxed font-light">{f.description}</p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-white/[0.03] w-full max-w-2xl opacity-40">
          <p className="text-[8px] md:text-[9px] font-orbitron tracking-[0.6em] uppercase text-zinc-600">
            &copy; 2024 HASHGO GLOBAL INFRASTRUCTURE
          </p>
        </footer>

      </main>

      {/* Static Visual Overlays */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.01)_0%,_transparent_80%)] pointer-events-none -z-1" />
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-0" />
    </div>
  );
};

export default App;
