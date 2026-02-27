"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Globe, Activity, Repeat, Send, Info, Cpu, Share2, Mail, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react'; // Moteur QR Local (Assure-toi d'avoir fait : npm install qrcode.react)
import AirdropBanner from '../components/AirdropBanner';
import RewardSimulator from '../components/RewardSimulator';
import FortuneCounter from '../components/FortuneCounter';
import Logo from '../components/Logo';

export default function OmniutilSupreme() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // SCRIPT DE BIENVENUE VOCALE AI
  const triggerVoice = (tabName) => {
    if ('speechSynthesis' in window && tabName !== 'HOME') {
      const msg = new SpeechSynthesisUtterance();
      msg.text = `Initialisation du protocole ${tabName}. Nœud de Washington D.C. en ligne.`;
      msg.lang = 'fr-FR';
      msg.rate = 0.9;
      window.speechSynthesis.cancel(); // Stoppe la voix précédente
      window.speechSynthesis.speak(msg);
    }
  };

  useEffect(() => {
    if (isClient) triggerVoice(activeTab);
  }, [activeTab, isClient]);

  if (!isClient) return null;

  const tabs = [
    { id: 'HOME', label: 'ACCUEIL' },
    { id: 'DASHBOARD', label: 'DASHBOARD' },
    { id: 'PARTENARIAT', label: 'GATEWAY QR' },
    { id: 'SWAP', label: 'ÉCHANGE & P2P' },
    { id: 'ABOUT', label: 'À PROPOS' }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-cyan-400 font-mono overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* BANNIÈRE SUPRÊME : Gère le Claim et les SuccessToast */}
      <AirdropBanner />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black z-0"></div>

      {/* NAVIGATION TACTIQUE STYLE BINANCE / SOLANA */}
      <nav className="relative z-50 flex justify-between items-center px-6 py-6 border-b border-cyan-500/20 backdrop-blur-md sticky top-0 bg-black/60">
        <div className="text-2xl font-black italic tracking-tighter text-white flex items-center gap-3">
          <Logo size={32} /> OMNIUTIL<span className="text-cyan-500">.IO</span>
        </div>
        <div className="flex gap-4 md:gap-8 text-[9px] font-black tracking-widest uppercase">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} 
              className={`transition-all pb-1 ${activeTab === t.id ? 'text-cyan-400 border-b-2 border-cyan-400' : 'opacity-40 hover:opacity-100'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto p-6 mt-12 mb-20">
        <AnimatePresence mode="wait">
          
          {/* 1. SECTION ACCUEIL : MESSAGE DE BIENVENUE & VISION */}
          {activeTab === 'HOME' && (
            <motion.section key="h" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center py-20 space-y-10">
              <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
                World No.1 <br/> <span className="text-cyan-500">Consumption Protocol</span>
              </h1>
              <p className="max-w-3xl mx-auto text-xs md:text-sm opacity-60 leading-relaxed uppercase tracking-widest">
                OMNIUTIL connecte les écosystèmes réels (Airtel, Amazon, Canal+) à la blockchain. 
                Transformez chaque acte de consommation en actif liquide sécurisé par SHA-256.
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-10">
                <button onClick={() => setActiveTab('PARTENARIAT')} className="bg-cyan-500 text-black px-10 py-4 rounded-full font-black text-[10px] uppercase shadow-[0_0_30px_rgba(6,182,212,0.3)]">Scanner Porte d'Orion</button>
                <button onClick={() => setActiveTab('ABOUT')} className="border border-cyan-500/30 px-10 py-4 rounded-full font-black text-[10px] uppercase text-white hover:bg-cyan-500/10">Explorer l'Infrastructure</button>
              </div>
            </motion.section>
          )}

          {/* 2. SECTION DASHBOARD : MÉTRIQUES & SIMULATEUR */}
          {activeTab === 'DASHBOARD' && (
            <motion.div key="d" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-12">
              <FortuneCounter />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-cyan-500/30 p-8 rounded-[2.5rem] backdrop-blur-xl">
                   <Cpu className="text-cyan-400 mb-4" size={32} />
                   <h3 className="text-white font-bold mb-2 uppercase">AI Coordinator</h3>
                   <p className="text-sm opacity-60 tracking-widest">GOD_MODE_ACTIVE | WASHINGTON_DC_NODE</p>
                </div>
                <div className="bg-white/5 border border-purple-500/30 p-8 rounded-[2.5rem] backdrop-blur-xl">
                   <ShieldCheck className="text-purple-400 mb-4" size={32} />
                   <h3 className="text-white font-bold mb-2 uppercase">Nemesis Protocol</h3>
                   <p className="text-sm opacity-60 tracking-widest">SHA-256_SCELLÉ | NEMESIS_RECOVERY</p>
                </div>
              </div>
              <RewardSimulator />
            </motion.div>
          )}

          {/* 3. SECTION PARTENARIAT : LE VRAI CODE QR (PORTE D'ORION) */}
          {activeTab === 'PARTENARIAT' && (
            <motion.div key="p" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center py-10 space-y-10 text-center">
              <h2 className="text-white text-4xl font-black italic uppercase tracking-tighter">Gateway Souveraine</h2>
              <div className="p-8 bg-white rounded-[3rem] shadow-[0_0_80px_rgba(6,182,212,0.3)] border-8 border-black">
                <QRCodeSVG 
                  value="https://omniutil-web.vercel.app" 
                  size={240} 
                  fgColor="#000000" 
                  level="H"
                />
              </div>
              <p className="text-[10px] opacity-40 uppercase tracking-[0.4em] animate-pulse">
                ID_VERIFIED: OMNI_SUPREME_2026 | Scan requis pour Airtel, Amazon, Canal+
              </p>
            </motion.div>
          )}

          {/* 4. SECTION SWAP & P2P (TRANSFERTS INTÉGRÉS) */}
          {activeTab === 'SWAP' && (
            <motion.div key="s" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-10 bg-cyan-500/5 border border-cyan-500/20 rounded-[2.5rem] backdrop-blur-xl">
                <Repeat className="mb-6 text-cyan-400" size={32} />
                <h3 className="text-white font-bold mb-6 italic uppercase">UTIL / USDT SWAP</h3>
                <div className="bg-black/50 p-4 rounded-xl border border-white/5 mb-6 text-[11px] flex justify-between">
                   <span>SOLDE: 300,000.30 UTIL</span>
                   <span className="text-cyan-400">VALEUR: $ 375,000.37</span>
                </div>
                <button className="w-full py-5 bg-cyan-500 text-black font-black text-[11px] rounded-2xl uppercase tracking-[0.2em] shadow-lg">Lancer l'échange</button>
              </div>
              <div className="p-10 bg-purple-500/5 border border-purple-500/20 rounded-[2.5rem] backdrop-blur-xl">
                <Send className="mb-6 text-purple-400" size={32} />
                <h3 className="text-white font-bold mb-6 italic uppercase">Transfert P2P</h3>
                <input placeholder="ADRESSE DU DESTINATAIRE (0x...)" className="w-full bg-black/50 border border-white/5 p-4 rounded-xl mb-6 text-[10px] text-white outline-none focus:border-purple-500"/>
                <button className="w-full py-5 bg-purple-600 text-white font-black text-[11px] rounded-2xl uppercase tracking-[0.2em]">Envoyer UTIL</button>
              </div>
            </motion.div>
          )}

          {/* 5. SECTION À PROPOS & CONTACT */}
          {activeTab === 'ABOUT' && (
            <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto text-center space-y-10">
              <Logo size={80} className="mx-auto" />
              <h2 className="text-white text-4xl font-black italic uppercase tracking-tighter">Infrastructure Suprême</h2>
              <p className="text-[11px] md:text-xs leading-loose opacity-60 uppercase tracking-widest text-justify md:text-center">
                OMNIUTIL est un protocole de récompense RWA (Real World Assets) basé sur la Binance Smart Chain. Notre mission est de redistribuer la valeur générée par la consommation mondiale via une IA Coordinatrice souveraine.
              </p>
              <div className="pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 text-[10px] uppercase font-bold tracking-widest">
                <div className="flex items-center justify-center gap-3 p-4 border border-zinc-800 rounded-xl">
                  <Mail size={16} /> CONTACT: INFRA@OMNIUTIL.IO
                </div>
                <div className="flex items-center justify-center gap-3 p-4 border border-zinc-800 rounded-xl">
                  <Smartphone size={16} /> SUPPORT: D-APP_SCELLÉE
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <footer className="py-20 text-center opacity-20 text-[9px] tracking-[1em] uppercase font-black">
        © OMNIUTIL SUPREME INFRASTRUCTURE 2026
      </footer>
    </main>
  );
}
