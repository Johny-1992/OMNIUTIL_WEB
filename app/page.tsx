'use client';import {useState,useEffect} from 'react';import {motion} from 'framer-motion';import {SovereignHUD} from '../components/SovereignHUD';

const VortexSchematic = ({ s }) => (
  <svg viewBox="0 0 400 150" className="w-full max-w-lg mx-auto my-4 border border-[#06b6d405] p-2 bg-black/40 backdrop-blur-3xl rounded-full">
    <defs>
      <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" /><stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" /><stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" /></linearGradient>
    </defs>
    <circle cx="200" cy="75" r="70" className="stroke-white/5 fill-none" />
    {/* Vortex Lines */}
    <motion.path d="M 50 75 Q 125 75, 175 40 Q 200 20, 225 40 Q 275 75, 350 75" className="stroke-neon fill-none" animate={{ pathLength: [0, 1], opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
    <motion.path d="M 50 75 Q 125 75, 175 110 Q 200 130, 225 110 Q 275 75, 350 75" className="stroke-neon fill-none" animate={{ pathLength: [0, 1], opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} />
    
    <text x="50" y="75" className="fill-[#06b6d4] text-[7px] font-bold" textAnchor="middle">API</text>
    <text x="350" y="75" className="fill-white text-[7px] font-bold" textAnchor="middle">USER</text>
    <text x="200" y="75" className="fill-[#06b6d4] text-[10px] font-black" textAnchor="middle">NODE iad1</text>
  </svg>
);

export default function Home() {
  const [st, setSt] = useState(0);
  const [tm, setTm] = useState({d:0,h:0,m:0,s:0});
  const bsc = "0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B";

  useEffect(() => {
    const target = new Date("2027-01-21T00:00:00").getTime();
    const i = setInterval(() => {
      const now = new Date().getTime(), d = target - now;
      setTm({
        d: Math.floor(d/(1e3*60*60*24)),
        h: Math.floor((d%(1e3*60*60*24))/(1e3*60*60)),
        m: Math.floor((d%(1e3*60))/(1e3*60)),
        s: Math.floor((d%(1e3*60))/1e3)
      });
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <SovereignHUD valuation="3 650 $ / UTIL" version="v2040-DEUS">
      <div className="relative min-h-screen bg-[#000000] text-white font-sans selection:bg-[#06b6d4] selection:text-black overflow-hidden font-mono uppercase">
        
        {/* NEURAL BACKGROUND (PULSE) */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#06b6d4" /></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
        </div>
        
        {/* MAIN TERMINAL */}
        <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 flex flex-col items-center">
          
          {/* HEADER (MONOLITHE) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24 space-y-3">
            <h1 className="text-5xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent italic">
              OMNIUTIL PROTOCOL
            </h1>
            <div className="flex gap-4 text-[10px] text-[#06b6d4] justify-center font-bold">
              <span>WASHINGTON_LAYER</span>
              <span>||</span>
              <span>DEUS_ENGINE</span>
            </div>
          </motion.div>

          {/* THE CORE (GLITCH & LEVITATION) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.5, ease: "easeOut" }
              }}
              onClick={() => setSt(1)}
              className="group relative p-8 bg-black/60 border border-white/5 rounded-[50px] backdrop-blur-3xl cursor-pointer overflow-hidden shadow-[0_0_60px_-15px_rgba(6,182,212,0.1)]"
            >
              {/* Magnetic Distortion Glitch (Overlay) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#06b6d40a] to-transparent" />
              <div className="absolute inset-0 group-hover:animate-glitch pointer-events-none" style={{ background: 'linear-gradient(90deg, #ff00ff05 0%, #00ffff05 100%)' }} />

              <img src="/qr-code.png" className="w-60 h-60 grayscale invert brightness-200 mb-6 mx-auto group-hover:brightness-100 group-hover:invert-0 transition-all duration-700" />
              <p className="text-center text-[10px] tracking-[0.6em] text-[#06b6d4] font-black uppercase">Initiate Neural Graft</p>
            </motion.div>

            <div className="space-y-12">
              <div className="space-y-3 p-6 border border-white/5 bg-black/40 rounded-xl">
                <span className="text-[9px] text-white/30 font-bold tracking-widest uppercase border-l-2 border-[#06b6d4] pl-3">Injection_Authority</span>
                <div className="flex gap-8 text-5xl font-light italic">
                  <div className="flex flex-col"><span>{tm.d}</span><span className="text-[8px] opacity-20 not-italic">Days</span></div>
                  <div className="flex flex-col"><span>{tm.h}</span><span className="text-[8px] opacity-20 not-italic">Hours</span></div>
                  <div className="flex flex-col"><span>{tm.m}</span><span className="text-[8px] opacity-20 not-italic">Min</span></div>
                </div>
              </div>

              <VortexSchematic s={st} />
            </div>
          </div>

          {/* DATA STREAMS */}
          <div className="mt-20 w-full text-center text-[8px] font-mono text-white/20 space-y-1 uppercase tracking-widest border-t border-white/5 pt-8">
            <p>BSC_AUTHORITY: {bsc}</p>
            <p>AUDIT: 89.65 | WASHINGTON iad1_v2040-DEUS_VERIFIED</p>
            <p>Airtel RDC || Canal+ || Goma || Kinshasa || Lubumbashi</p>
          </div>

          {/* CONTACT & EMPIRE */}
          <footer className="mt-16 w-full py-10 flex justify-center text-[8px] text-white/30 uppercase tracking-[0.3em]">
            <a href="mailto:johnymulenda5@gmail.com" className="text-white hover:text-[#06b6d4] transition-colors font-black">Contact_Lead_Architect</a>
            <span className="mx-6">||</span>
            <span>© 2040 OMNIUTIL EMPIRE</span>
          </footer>
        </main>
      </div>
    </SovereignHUD>
  );
}
