"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, Cpu, Zap, Activity, Repeat, Send, Info } from 'lucide-react';
import Logo from '../components/Logo';
import RewardSimulator from '../components/RewardSimulator';
import FortuneCounter from '../components/FortuneCounter';
import OmniQrGate from '../components/OmniQrGate';

export default function Home() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);
  if (!isClient) return null;

  const tabs = [
    { id: 'HOME', label: 'ACCUEIL' },
    { id: 'DASHBOARD', label: 'DASHBOARD' },
    { id: 'PARTENARIAT', label: 'PARTENARIAT' },
    { id: 'SWAP', label: 'ÉCHANGE & P2P' },
    { id: 'ABOUT', label: 'À PROPOS' }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-cyan-400 font-mono overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black z-0"></div>

      <nav className="relative z-10 flex justify-between items-center px-6 py-6 border-b border-cyan-500/20 backdrop-blur-md sticky top-0 bg-black/60">
        <div className="text-2xl font-black italic tracking-tighter text-white flex items-center gap-3">
          <Logo size={32} /> OMNIUTIL<span className="text-cyan-500">.IO</span>
        </div>
        <div className="flex gap-4 md:gap-8 text-[9px] font-black tracking-widest">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} 
              className={`transition-all pb-1 ${activeTab === t.id ? 'text-cyan-400 border-b-2 border-cyan-400' : 'opacity-40 hover:opacity-100'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto p-6 mt-12">
        <AnimatePresence mode="wait">
          {activeTab === 'HOME' && (
            <motion.div key="h" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center py-20">
              <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-6">Bienvenue Conquérant</h1>
              <p className="max-w-2xl mx-auto text-xs opacity-60 leading-loose uppercase mb-10">L'infrastructure souveraine OMNIUTIL transforme la consommation réelle en actifs liquides.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setActiveTab('PARTENARIAT')} className="bg-cyan-500 text-black px-8 py-3 rounded-full font-black text-[10px] uppercase">Scanner QR</button>
                <button onClick={() => setActiveTab('ABOUT')} className="border border-cyan-500/30 px-8 py-3 rounded-full font-black text-[10px] uppercase text-white">Explorer</button>
              </div>
            </motion.div>
          )}

          {activeTab === 'DASHBOARD' && (
            <motion.div key="d" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="space-y-12">
              <FortuneCounter />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-cyan-500/30 p-8 rounded-3xl backdrop-blur-xl"><Cpu className="text-cyan-400 mb-4" size={32} /><h3>AI Coordinator</h3><p className="text-sm opacity-60">WASHINGTON_DC_NODE_ACTIVE</p></div>
                <div className="bg-white/5 border border-purple-500/30 p-8 rounded-3xl backdrop-blur-xl"><Shield className="text-purple-400 mb-4" size={32} /><h3>Nemesis Protocol</h3><p className="text-sm opacity-60">SHA-256_SCELLÉ</p></div>
              </div>
              <RewardSimulator />
            </motion.div>
          )}

          {activeTab === 'PARTENARIAT' && (
            <motion.div key="p" initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="flex flex-col items-center py-10">
              <h2 className="text-white text-3xl font-black italic mb-10 uppercase">Gateway Souveraine</h2>
              <OmniQrGate />
            </motion.div>
          )}

          {activeTab === 'SWAP' && (
            <motion.div key="s" initial={{x:30, opacity:0}} animate={{x:0, opacity:1}} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl"><Repeat className="mb-4"/><h3 className="text-white font-bold mb-4 uppercase">UTIL / USDT SWAP</h3><button className="w-full py-4 bg-cyan-500 text-black font-black text-[10px] rounded-xl uppercase">Échanger</button></div>
              <div className="p-8 bg-purple-500/5 border border-purple-500/20 rounded-3xl"><Send className="mb-4 text-purple-400"/><h3 className="text-white font-bold mb-4 uppercase">Transfert P2P</h3><button className="w-full py-4 bg-purple-600 text-white font-black text-[10px] rounded-xl uppercase">Envoyer</button></div>
            </motion.div>
          )}

          {activeTab === 'ABOUT' && (
            <motion.div key="a" initial={{opacity:0}} animate={{opacity:1}} className="max-w-3xl mx-auto text-center space-y-8">
              <Info className="mx-auto text-cyan-400" size={48} />
              <h2 className="text-white text-3xl font-black italic uppercase">À Propos d'OMNIUTIL</h2>
              <p className="text-xs leading-loose opacity-60 uppercase">Protocole de récompense RWA N°1 mondial, connectant Airtel, Amazon et Canal+ à la Binance Smart Chain.</p>
              <div className="text-[10px] opacity-40">CONTACT: INFRA@OMNIUTIL.IO</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
