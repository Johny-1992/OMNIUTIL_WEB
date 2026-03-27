'use client';import {useState,useEffect} from 'react';import {motion} from 'framer-motion';import {SovereignHUD} from '../components/SovereignHUD';

const VortexSchematic = ({ s }) => (
  <svg viewBox="0 0 400 150" className="w-full max-w-lg mx-auto my-4 border border-[#06b6d405] p-2 bg-black/40 backdrop-blur-3xl rounded-full">
    <circle cx="200" cy="75" r="70" className="stroke-white/5 fill-none" />
    <motion.path d="M 50 75 Q 125 75, 175 40 Q 200 20, 225 40 Q 275 75, 350 75" stroke="#06b6d4" fill="none" strokeWidth="0.5" animate={{ pathLength: [0, 1], opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 3, repeat: Infinity }} />
    <motion.path d="M 50 75 Q 125 75, 175 110 Q 200 130, 225 110 Q 275 75, 350 75" stroke="#06b6d4" fill="none" strokeWidth="0.5" animate={{ pathLength: [0, 1], opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} />
    <text x="50" y="75" className="fill-[#06b6d4] text-[6px] font-bold" textAnchor="middle">API</text>
    <text x="350" y="75" className="fill-white text-[6px] font-bold" textAnchor="middle">USER</text>
    <text x="200" y="75" className="fill-[#06b6d4] text-[9px] font-black" textAnchor="middle">NODE iad1</text>
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
    <SovereignHUD valuation="3 650 $ / UTIL" version="v2040-SOUVERAIN">
      <div className="relative min-h-screen bg-[#000000] text-white font-mono uppercase overflow-hidden">
        
        {/* NAV MULTILINGUE AVEC HAUTEUR FIGÉE (FIX CLS) */}
        <nav className="relative z-50 flex justify-between items-center h-24 px-6 border-b border-white/5 backdrop-blur-3xl">
          <div className="flex flex-col min-w-[150px]"><span className="text-[#06b6d4] font-black tracking-widest text-[10px]">OMNIUTIL_INFRA</span><span className="text-[6px] opacity-30 italic">Washington iad1 Verified</span></div>
          <div className="hidden md:flex gap-6 text-[8px] font-bold tracking-widest text-white/40">
            <span>HOME</span><span>SWAP</span><span>ABOUT</span><span>DONATE</span>
          </div>
          <div className="flex gap-3 text-[7px] text-[#06b6d4] font-bold min-w-[100px] justify-end">
            <span className="cursor-pointer hover:text-white">FR</span><span className="cursor-pointer hover:text-white">EN</span><span className="cursor-pointer hover:text-white">ZH</span><span className="cursor-pointer hover:text-white">AR</span>
          </div>
        </nav>

        <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-[#06b6d4] text-xs font-black border-l-4 border-[#06b6d4] pl-4">PROTOCOLE DE GREFFE (v9.0)</h2>
              <div className="text-[9px] space-y-2 text-white/50 bg-white/[0.02] p-6 rounded-3xl border border-white/5">
                <p>1. SCAN CTO : ACCÈS TERMINAL ANTI-FRAUDE</p>
                <p>2. CONFIG MÉRITE : PARAMÉTRAGE TAUX PARTENAIRE</p>
                <p>3. CAPTURE API : LIAISON FLUX NODE IAD1</p>
                <p>4. WALLET ID : GÉNÉRATION (+243...)</p>
                <p>5. DISTRIBUTION : CONSOMMATION RÉELLE</p>
              </div>
              <div className="pt-4 border-t border-white/5">
                <p className="text-[7px] text-white/20 mb-2 tracking-[0.3em]">PROCHAINE INJECTION (2027)</p>
                <div className="flex gap-4 text-3xl font-black italic">
                  <span>{tm.d}D</span><span>{tm.h}H</span><span>{tm.m}M</span>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -15 }} onClick={() => setSt(1)} className="group relative p-10 bg-white/[0.01] border border-white/10 rounded-[60px] cursor-pointer shadow-[0_0_100px_-20px_rgba(6,182,212,0.1)]">
              <div className="absolute inset-0 group-hover:bg-[#06b6d405] transition-colors rounded-[60px]" />
              <img src="/qr-code.png" className="w-56 h-56 grayscale invert brightness-200 mx-auto mb-4 group-hover:brightness-100 group-hover:invert-0 transition-all duration-1000" />
              <p className="text-center text-[8px] tracking-[0.5em] text-[#06b6d4] animate-pulse">SCAN TO GRAFT DATABASE</p>
            </motion.div>
          </div>

          <VortexSchematic s={st} />

          <footer className="mt-20 w-full pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 text-[7px] text-white/20 tracking-[0.2em] items-center">
            <div className="text-left font-bold italic">BSC: {bsc}</div>
            <div className="text-center"><a href="mailto:johnymulenda5@gmail.com" className="text-white border border-white/10 px-6 py-2 hover:bg-white hover:text-black transition-all font-black">partnership@omniutil.com</a></div>
            <div className="text-right italic uppercase">© 2040 OMNIUTIL EMPIRE - iad1 VERIFIED</div>
          </footer>
        </main>
      </div>
    </SovereignHUD>
  );
}
