"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Globe, Activity, Repeat, Send, Info, Mail, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react'; 
import Logo from '../components/Logo';
import RewardSimulator from '../components/RewardSimulator';
import FortuneCounter from '../components/FortuneCounter';
import AirdropBanner from '../components/AirdropBanner';

export default function Home() {
  const [lang, setLang] = useState('FR');
  const [activeTab, setActiveTab] = useState('HOME');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  const content = {
    FR: {
      welcome: "BIENVENUE CONQUÉRANT",
      desc: "L'infrastructure N°1 mondiale transformant la consommation réelle en actifs liquides.",
      partner: "GATEWAY PARTENAIRE",
      swap: "ÉCHANGE & P2P",
      about: "À PROPOS",
      contact: "CONTACT: https://omniutil-web.vercel.app",
      logic: "LOGIQUE MÈRE ACTIVÉE"
    },
    EN: {
      welcome: "WELCOME CONQUEROR",
      desc: "World's No.1 infrastructure transforming real consumption into liquid assets.",
      partner: "PARTNER GATEWAY",
      swap: "SWAP & P2P",
      about: "ABOUT",
      contact: "CONTACT: https://omniutil-web.vercel.app",
      logic: "MOTHER LOGIC ACTIVE"
    }
  };

  const t = content[lang];
  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-[#020617] text-cyan-400 font-mono">
      <AirdropBanner lang={lang} />
      
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/5 via-black to-black z-0 pointer-events-none"></div>

      {/* NAV STYLE BINANCE */}
      <nav className="relative z-50 flex justify-between items-center px-6 py-6 border-b border-cyan-500/20 backdrop-blur-md bg-black/60 sticky top-0">
        <div className="text-2xl font-black italic text-white tracking-tighter flex items-center gap-3">
          <Logo size={32} /> OMNIUTIL<span className="text-cyan-500">.IO</span>
        </div>
        <div className="hidden md:flex gap-8 text-[9px] font-black tracking-widest uppercase">
          {['HOME', 'DASHBOARD', 'PARTNER', 'SWAP', 'ABOUT'].map((id) => (
            <button key={id} onClick={() => setActiveTab(id)} className={`transition-all ${activeTab === id ? 'text-cyan-400 border-b-2 border-cyan-400' : 'opacity-40 hover:opacity-100'}`}>
              {id}
            </button>
          ))}
          <button onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')} className="ml-4 border border-cyan-500 px-2 py-1 rounded text-white hover:bg-cyan-500 hover:text-black transition-all">
            {lang}
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto p-6 mt-12">
        <AnimatePresence mode="wait">
          {activeTab === 'HOME' && (
            <motion.div key="h" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center py-20">
              <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-8">{t.welcome}</h1>
              <p className="max-w-2xl mx-auto text-xs opacity-60 leading-loose uppercase mb-10 tracking-[0.2em]">{t.desc}</p>
              <div className="flex justify-center gap-6">
                <button onClick={() => setActiveTab('PARTNER')} className="bg-cyan-500 text-black px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all">{t.partner}</button>
              </div>
            </motion.div>
          )}

          {activeTab === 'PARTNER' && (
            <motion.div key="p" initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="flex flex-col items-center py-10 space-y-10">
              <h2 className="text-white text-3xl font-black italic uppercase tracking-tighter">{t.partner}</h2>
              <div className="p-8 bg-white rounded-[3rem] shadow-[0_0_80px_rgba(6,182,212,0.3)]">
                <QRCodeSVG value="https://omniutil-web.vercel.app" size={240} fgColor="#000000" />
              </div>
              <div className="text-[10px] opacity-40 uppercase tracking-[0.4em] animate-pulse">SCELLÉ: OMNI_SUPREME_2026_VERIFIED</div>
            </motion.div>
          )}

          {activeTab === 'SWAP' && (
            <motion.div key="s" initial={{x:50, opacity:0}} animate={{x:0, opacity:1}} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-10 bg-cyan-500/5 border border-cyan-500/20 rounded-[2.5rem] backdrop-blur-xl">
                <Repeat className="mb-6 text-cyan-400" size={32} />
                <h3 className="text-white font-bold mb-6 italic uppercase">UTIL / USDT SWAP</h3>
                <button className="w-full py-5 bg-cyan-500 text-black font-black text-[11px] rounded-2xl uppercase tracking-widest shadow-lg">EXECUTER LE SWAP</button>
              </div>
              <div className="p-10 bg-purple-500/5 border border-purple-500/20 rounded-[2.5rem] backdrop-blur-xl">
                <Send className="mb-6 text-purple-400" size={32} />
                <h3 className="text-white font-bold mb-6 italic uppercase">TRANSFERT P2P</h3>
                <input placeholder="ADRESSE DU CONQUÉRANT (0x...)" className="w-full bg-black/50 border border-zinc-800 p-4 rounded-xl mb-6 text-[10px] text-white outline-none focus:border-purple-500"/>
                <button className="w-full py-5 bg-purple-600 text-white font-black text-[11px] rounded-2xl uppercase tracking-widest">ENVOYER UTIL</button>
              </div>
            </motion.div>
          )}

          {activeTab === 'ABOUT' && (
            <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto text-center space-y-10 py-10">
              <h2 className="text-white text-4xl font-black italic uppercase tracking-tighter">INFRASTRUCTURE SUPRÊME</h2>
              <p className="text-[11px] leading-loose opacity-60 uppercase tracking-[0.2em] text-center">
                Le protocole OMNIUTIL connecte les flux de consommation mondiale à la liquidité blockchain. Chaque scan, chaque achat génère une valeur réelle.
              </p>
              <div className="pt-10 border-t border-white/10 flex justify-center text-[10px] font-black uppercase text-cyan-500">
                {t.contact}
              </div>
            </motion.div>
          )}

          {activeTab === 'DASHBOARD' && (
            <motion.div key="d" initial={{y:20}} animate={{y:0}} className="space-y-12">
               <FortuneCounter />
               <RewardSimulator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
