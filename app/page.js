"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Repeat, Send, ArrowRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Logo from '../components/Logo';
import FortuneCounter from '../components/FortuneCounter';
import RewardSimulator from '../components/RewardSimulator';

export default function Home() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [subTab, setSubTab] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  const executeSovereignAction = async (endpoint, payload) => {
    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      alert(`LOGIQUE_MÈRE : ${result.status} | CODE: ${result.service_code || 'SCELLÉ'}`);
    } catch (e) { alert("ERREUR_INFRASTRUCTURE_IAD1"); }
  };

  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono selection:bg-cyan-500 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-cyan-900/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-900/10 rounded-full blur-[150px]"></div>
      </div>

      <nav className="relative z-50 flex justify-between items-center px-10 py-8 border-b border-white/5 backdrop-blur-3xl bg-black/40 sticky top-0">
        <div className="text-3xl font-black italic tracking-tighter bg-gradient-to-r from-cyan-400 via-white to-purple-500 bg-clip-text text-transparent flex items-center gap-4">
          <Logo size={48} /> OMNIUTIL v6.8-GALAXY | RWA SOUVERAIN | SECURITY: 89.65 <span className="text-[10px] text-cyan-500 border border-cyan-500 px-2 py-1 rounded ml-2">IAD1_GALAXY_PRO</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-4">
            {['HOME', 'PARTNER', 'SWAP', 'DASHBOARD'].map(tab => (
              <button key={tab} onClick={() => {setActiveTab(tab); setSubTab(null);}} className={`px-6 py-2 text-[10px] font-black rounded-full transition-all border ${activeTab === tab ? 'bg-cyan-500 text-black border-cyan-500' : 'bg-white/5 border-white/10'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-4 text-[8px] font-black border-l border-white/10 pl-4">
            <span className="text-cyan-500 cursor-pointer">FR</span>|<span className="opacity-50 cursor-pointer">EN</span>|<span className="opacity-50 cursor-pointer">ZH</span>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto p-10">
        <AnimatePresence mode="wait">
          {activeTab === 'HOME' && (
            <motion.div initial={{opacity:0, x:-50}} animate={{opacity:1, x:0}} className="py-20">
              <h1 className="text-[100px] md:text-[140px] font-black italic leading-[0.85] tracking-tighter mb-10">REALITY<br/><span className="text-cyan-500 underline decoration-white/10">CODED.</span></h1>
              <div className="max-w-2xl text-lg opacity-70 border-l-8 border-purple-600 pl-10 mb-12 uppercase italic">
                "L’OMNIUTIL ne spécule pas, il administre le flux mondial. Rareté imposée à 3 650 $ par iad1."
              </div>
              <button onClick={() => setActiveTab('PARTNER')} className="group flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black text-sm uppercase">Déployer Orion <ArrowRight/></button>
            </motion.div>
          )}

          {activeTab === 'PARTNER' && (
            <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} className="flex flex-col items-center py-10">
              <h2 className="text-4xl font-black italic mb-12 uppercase">Portail Orion : Intégration Géants</h2>
              <div className="bg-white p-12 rounded-[4rem] shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                <QRCodeSVG value="https://omniutil-web.vercel.app" size={300} />
              </div>
              <p className="mt-10 text-[11px] font-black text-cyan-500 animate-pulse uppercase tracking-[0.4em]">Scan to Graft Traceable Database</p>
            </motion.div>
          )}

          {activeTab === 'SWAP' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-10 bg-white/5 border border-cyan-500/20 rounded-[3rem] backdrop-blur-xl">
                <Repeat className="text-cyan-400 mb-6" size={48}/><h3 className="text-2xl font-black italic mb-6 uppercase">Swap UTIL/USDT</h3>
                <button onClick={() => executeSovereignAction('service-exchange', {type: 'SWAP', amount: 100})} className="w-full py-5 bg-cyan-500 text-black font-black rounded-2xl uppercase">Exécuter</button>
              </div>
              <div className="p-10 bg-white/5 border border-purple-500/20 rounded-[3rem] backdrop-blur-xl">
                <Send className="text-purple-400 mb-6" size={48}/><h3 className="text-2xl font-black italic mb-6 uppercase">P2P Transfer</h3>
                <button onClick={() => setSubTab('P2P')} className="w-full py-5 bg-purple-600 text-white font-black rounded-2xl uppercase">Ouvrir Canal</button>
              </div>
              <div className="p-10 bg-white/5 border border-red-500/20 rounded-[3rem] backdrop-blur-xl">
                <Zap className="text-red-500 mb-6" size={48}/><h3 className="text-2xl font-black italic mb-6 uppercase">Services 5D</h3>
                <button onClick={() => setSubTab('SERV')} className="w-full py-5 bg-red-600 text-white font-black rounded-2xl uppercase">Recharger</button>
              </div>
            </div>
          )}

          {activeTab === 'DASHBOARD' && (
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FortuneCounter />
                  <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl">
                    <h3 className="text-xl font-black italic text-cyan-400 mb-6 uppercase">Statut IA Washington</h3>
                    <div className="space-y-4 text-[10px] font-black">
                      <div className="flex justify-between border-b border-white/5 pb-2"><span>Rareté :</span><span>1,000,000 UTIL / AN</span></div>
                      <div className="flex justify-between border-b border-white/5 pb-2"><span>Accumulation Est. :</span><span className="text-cyan-400">3.65B USDT</span></div>
                      <div className="flex justify-between border-b border-white/5 pb-2"><span>Taxation Créateur :</span><span className="text-green-400">0.5% SCELLÉ</span></div>
                      <div className="flex justify-between"><span>Node :</span><span className="text-purple-400 animate-pulse">IAD1_GALAXY_PRO</span></div>
                    </div>
                  </div>
               </div>
               <div className="p-10 bg-white/5 border border-white/5 rounded-[3rem]">
                  <h3 className="text-2xl font-black italic mb-8 uppercase">Simulateur RWA Stardust</h3>
                  <div className="flex items-center gap-10">
                    <div className="flex-1"><label className="text-[10px] block mb-2 opacity-50 uppercase">Dépense (USDT/FC)</label><input type="number" placeholder="100" className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-2xl font-black outline-none"/></div>
                    <ArrowRight className="text-cyan-500" size={32}/><div className="flex-1"><label className="text-[10px] block mb-2 opacity-50 uppercase">Récompense au Mérite</label><div className="text-3xl font-black text-cyan-400">0.000273 UTIL</div></div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
// OMNI_GALAXY_SOUVEREIGN_v6.8_SCALED
