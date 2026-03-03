"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Repeat, Send, Cpu, Database, BarChart3, Globe, ArrowRight, ShieldCheck, Layers } from 'lucide-react';
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
      alert(`LOGIQUE_MÈRE : ${result.status} | CODE: ${result.code || 'SCELLÉ'}`);
    } catch (e) { alert("ERREUR_INFRASTRUCTURE_IAD1"); }
  };

  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono selection:bg-cyan-500 overflow-x-hidden">
      {/* FX 5D : GRADIENTS MULTICOLORES DYNAMIQUES */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-cyan-900/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-900/10 rounded-full blur-[150px]"></div>
      </div>

      <nav className="relative z-50 flex justify-between items-center px-10 py-8 border-b border-white/5 backdrop-blur-3xl bg-black/40 sticky top-0">
        <div className="text-3xl font-black italic tracking-tighter bg-gradient-to-r from-cyan-400 via-white to-purple-500 bg-clip-text text-transparent flex items-center gap-4">
          <Logo size={48} /> OMNIUTIL v6.5 <span className="text-[10px] text-cyan-500 border border-cyan-500 px-2 py-1 rounded ml-2">IAD1_ACTIVE</span>
        </div>
        <div className="flex gap-4">
          {['HOME', 'PARTNER', 'SWAP', 'DASHBOARD'].map(tab => (
            <button key={tab} onClick={() => {setActiveTab(tab); setSubTab(null);}} className={`px-6 py-2 text-[10px] font-black rounded-full transition-all border ${activeTab === tab ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'bg-white/5 border-white/10 hover:border-white/40'}`}>
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto p-10">
        <AnimatePresence mode="wait">
          {activeTab === 'HOME' && (
            <motion.div initial={{opacity:0, x:-50}} animate={{opacity:1, x:0}} className="py-20">
              <h1 className="text-[100px] md:text-[140px] font-black italic leading-[0.85] tracking-tighter mb-10">
                REALITY<br/><span className="text-cyan-500 underline decoration-white/10">CODED.</span>
              </h1>
              <div className="max-w-2xl text-lg opacity-70 leading-relaxed border-l-8 border-purple-600 pl-10 mb-12 uppercase italic">
                "Toute structure possédant une base de données traçable des consommations réelles permanentes est une mine d'or. L'IA Coordinatrice scelle la richesse."
              </div>
              <button onClick={() => setActiveTab('PARTNER')} className="group flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black text-sm hover:bg-cyan-400 transition-all uppercase">
                Déployer Orion <ArrowRight className="group-hover:translate-x-2 transition-transform"/>
              </button>
            </motion.div>
          )}

          {activeTab === 'PARTNER' && (
            <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} className="flex flex-col items-center py-10">
              <h2 className="text-4xl font-black italic mb-12 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent uppercase">Portail Orion : Intégration Géants</h2>
              <div className="relative group p-1 bg-gradient-to-tr from-cyan-500 via-purple-500 to-crimson-500 rounded-[4rem]">
                <div className="bg-white p-12 rounded-[3.8rem]">
                  <QRCodeSVG value="https://omniutil-web.vercel.app" size={300} />
                </div>
              </div>
              <p className="mt-10 text-[11px] font-black text-cyan-500 animate-pulse uppercase tracking-[0.4em]">Scan to Graft Traceable Database</p>
            </motion.div>
          )}

          {activeTab === 'SWAP' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-10 bg-white/5 border border-cyan-500/20 rounded-[3rem] backdrop-blur-xl group hover:border-cyan-500 transition-all">
                <Repeat className="text-cyan-400 mb-6 group-hover:rotate-180 transition-transform duration-700" size={48}/>
                <h3 className="text-2xl font-black italic mb-6">SWAP UTIL/USDT</h3>
                <button onClick={() => executeSovereignAction('service-exchange', {type: 'SWAP'})} className="w-full py-5 bg-cyan-500 text-black font-black rounded-2xl uppercase shadow-lg">Exécuter</button>
              </div>

              <div className="p-10 bg-white/5 border border-purple-500/20 rounded-[3rem] backdrop-blur-xl group hover:border-purple-500 transition-all">
                <Send className="text-purple-400 mb-6 group-hover:translate-x-2 transition-transform" size={48}/>
                <h3 className="text-2xl font-black italic mb-6">P2P TRANSFER</h3>
                <button onClick={() => setSubTab('P2P')} className="w-full py-5 bg-purple-600 text-white font-black rounded-2xl uppercase shadow-lg">Ouvrir Canal</button>
                {subTab === 'P2P' && (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-4 space-y-4">
                    <input placeholder="0x ADRESSE" className="w-full bg-black border border-white/10 p-4 rounded-xl text-[10px]"/>
                    <button onClick={() => executeSovereignAction('p2p', {action: 'send'})} className="w-full py-2 border border-purple-400 text-purple-400 text-[10px] font-black rounded-xl">VALIDER</button>
                  </motion.div>
                )}
              </div>

              <div className="p-10 bg-white/5 border border-red-500/20 rounded-[3rem] backdrop-blur-xl group hover:border-red-500 transition-all">
                <Zap className="text-red-500 mb-6 group-hover:scale-110 transition-transform" size={48}/>
                <h3 className="text-2xl font-black italic mb-6">SERVICES DATA/TV</h3>
                <button onClick={() => setSubTab('SERV')} className="w-full py-5 bg-red-600 text-white font-black rounded-2xl uppercase shadow-lg">Recharger</button>
                {subTab === 'SERV' && (
                   <div className="mt-4 flex flex-wrap gap-2">
                     {['AIRTEL', 'CANAL+', 'VODACOM'].map(s => (
                       <button key={s} onClick={() => executeSovereignAction('service-exchange', {service: s})} className="px-3 py-2 bg-white/10 rounded-lg text-[8px] font-black hover:bg-red-500">{s}</button>
                     ))}
                   </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'DASHBOARD' && (
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FortuneCounter />
                  <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl">
                    <h3 className="text-xl font-black italic text-cyan-400 mb-6 uppercase">Statut IA Washington</h3>
                    <div className="space-y-4 text-[10px]">
                      <div className="flex justify-between border-b border-white/5 pb-2"><span>Rareté :</span><span>1,000,000 UTIL / AN</span></div>
                      <div className="flex justify-between border-b border-white/5 pb-2"><span>Taxation Créateur :</span><span className="text-green-400">0.5% SCELLÉ</span></div>
                      <div className="flex justify-between border-b border-white/5 pb-2"><span>Taxation Trésorerie :</span><span className="text-cyan-400">0.5% SCELLÉ</span></div>
                      <div className="flex justify-between"><span>Node :</span><span className="text-purple-400">IAD1_ACTIVE_5D</span></div>
                    </div>
                  </div>
               </div>
               <RewardSimulator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
