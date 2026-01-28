
import React, { useState, useEffect } from 'react';
import MiningBackground from './components/MiningBackground';
import { fetchAppDescription } from './services/geminiService';
import { Download, Smartphone, ShieldCheck, Cpu, Globe, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [appData, setAppData] = useState<any>(null);

  useEffect(() => {
    fetchAppDescription().then(setAppData).catch(() => {});
  }, []);

  const handleDownload = () => {
    setDownloading(true);
    // Mimic official download process
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = 'apk/hashgo_v1.0.0.apk';
      a.download = 'hashgo_v1.0.0.apk';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloading(false);
    }, 800);
  };

  const headline = appData?.headline || "PREMIUM MINING ENGINE";
  const subheadline = appData?.subheadline || "The industry's most efficient mobile mining utility. High-performance data analysis and secure node connectivity.";
  const features = appData?.features || [
    { title: "Peak Hashrate", description: "Optimized algorithms for maximum hardware efficiency." },
    { title: "Secure Node", description: "Encrypted communication for safe data transmission." },
    { title: "Smart Metrics", description: "Real-time performance tracking and analytics." }
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <MiningBackground />

      {/* Simplified Layout */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 py-12">
        
        {/* Top Branding (Text Only) */}
        <div className="absolute top-0 left-0 w-full p-8 md:px-12 flex justify-between items-center">
          <div className="text-left">
            <h2 className="font-orbitron font-black text-xl tracking-tighter">HASHGO</h2>
            <p className="text-[8px] font-orbitron text-zinc-500 tracking-[0.3em] uppercase">Mining Infrastructure</p>
          </div>
          <div className="hidden md:block text-[9px] font-orbitron text-zinc-600 tracking-widest uppercase">
            V1.0.0 Stable
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-2xl w-full flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-orbitron uppercase tracking-widest text-zinc-400">
            <ShieldCheck className="w-3 h-3 text-white" /> Authorized Build
          </div>
          
          <h1 className="text-3xl md:text-5xl font-orbitron font-black leading-tight tracking-tighter italic uppercase">
            {headline}
          </h1>
          
          <p className="text-zinc-500 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            {subheadline}
          </p>

          {/* Centered Download Action */}
          <div className="mt-8 group relative">
            <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <button 
              onClick={handleDownload}
              disabled={downloading}
              className="relative flex items-center justify-center gap-4 bg-white hover:bg-zinc-200 text-black font-orbitron font-black py-4 px-10 md:py-5 md:px-14 rounded-xl transition-all transform active:scale-95 disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  LOADING...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span className="text-sm md:text-base">DOWNLOAD APK</span>
                </>
              )}
            </button>
          </div>

          {/* Compatibility Chips */}
          <div className="mt-12 flex flex-wrap justify-center gap-4 text-[8px] md:text-[9px] font-orbitron text-zinc-600 uppercase tracking-widest">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/50 rounded border border-white/5">
              <Smartphone className="w-3 h-3" /> Android 10+
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/50 rounded border border-white/5">
              <Cpu className="w-3 h-3" /> HW Accelerated
            </span>
          </div>
        </div>

        {/* Feature Grid - More Compact */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-24 max-w-4xl w-full">
          {features.map((f: any, idx: number) => (
            <div key={idx} className="group p-6 rounded-xl border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-white/10 transition-all text-left">
              <Zap className="w-5 h-5 text-white/20 mb-4 group-hover:text-white transition-colors" />
              <h3 className="text-[10px] font-orbitron font-bold text-white uppercase tracking-widest mb-2">{f.title}</h3>
              <p className="text-[11px] text-zinc-500 leading-normal">{f.description}</p>
            </div>
          ))}
        </section>

        {/* Clean Footer */}
        <footer className="mt-24 pt-12 border-t border-white/5 w-full max-w-xl opacity-30">
          <p className="text-[8px] font-orbitron tracking-[0.5em] uppercase text-zinc-500">
            &copy; 2024 HASHGO SYSTEMS
          </p>
        </footer>

      </main>

      {/* Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none -z-1" />
    </div>
  );
};

export default App;
