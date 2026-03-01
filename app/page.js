"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Globe, Repeat, Send, Cpu, Database, BarChart3 } from 'lucide-react';
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
      contact: "SUPPORT SUPRÊME: https://omniutil-web.vercel.app",
      manifesto: "OMNIUTIL connecte Supermarchés, Casinos, Banques et Telcos à la Blockchain. Une rareté mathématique de 1M UTIL/an scellée à Washington D.C."
    },
    EN: {
      welcome: "WELCOME CONQUEROR",
      desc: "World's No.1 infrastructure transforming real consumption into liquid assets.",
      partner: "PARTNER GATEWAY",
      swap: "SWAP & P2P",
      about: "ABOUT",
      contact: "SUPREME SUPPORT: https://omniutil-web.vercel.app",
      manifesto: "OMNIUTIL connects Supermarkets, Casinos, Banks and Telcos to the Blockchain. A mathematical scarcity of 1M UTIL/year sealed in Washington D.C."
    }
  };

  const t = content[lang];
  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-[#020617] text-cyan-400 font-mono">
      <AirdropBanner lang={lang} />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/5 via-black to-black z-0 pointer-events-none"></div>

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
              <p className="text-[10px] opacity-60 max-w-md text-center uppercase tracking-widest">Scannez pour intégrer votre Écosystème (Casino, Bank, Retail) au Protocole Nemesis.</p>
            </motion.div>
          )}

          {activeTab === 'ABOUT' && (
            <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto text-center space-y-12 py-10">
              <h2 className="text-white text-5xl font-black italic uppercase tracking-tighter">PROTOCOLE SUPRÊME v5.4</h2>
              <p className="text-[12px] leading-loose opacity-80 uppercase tracking-[0.2em] text-center max-w-3xl mx-auto">
                {t.manifesto}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10">
                <div className="flex flex-col items-center gap-3">
                  <Database className="text-cyan-400" size={24} />
                  <span className="text-[9px] font-black uppercase">Mémoire : Vercel_KV Scellée</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Cpu className="text-purple-400" size={24} />
                  <span className="text-[9px] font-black uppercase">IA : Washington_Node_3.12</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <BarChart3 className="text-green-400" size={24} />
                  <span className="text-[9px] font-black uppercase">Rareté : 1M UTIL / AN</span>
                </div>
              </div>
              <div className="text-[10px] font-black uppercase text-cyan-500 tracking-[0.4em]">
                {t.contact}
              </div>
            </motion.div>
          )}

          {activeTab === 'SWAP' && (
            <motion.div key="s" initial={{x:50, opacity:0}} animate={{x:0, opacity:1}} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-10 bg-cyan-500/5 border border-cyan-500/20 rounded-[2.5rem] backdrop-blur-xl transition-all hover:bg-cyan-500/10">
                <Repeat className="mb-6 text-cyan-400" size={32} />
                <h3 className="text-white font-bold mb-6 italic uppercase">UTIL / USDT SWAP</h3>
                <button className="w-full py-5 bg-cyan-500 text-black font-black text-[11px] rounded-2xl uppercase tracking-widest shadow-lg">EXECUTER LE SWAP</button>
              </div>
              <div className="p-10 bg-purple-500/5 border border-purple-500/20 rounded-[2.5rem] backdrop-blur-xl transition-all hover:bg-purple-500/10">
                <Send className="mb-6 text-purple-400" size={32} />
                <h3 className="text-white font-bold mb-6 italic uppercase">TRANSFERT P2P</h3>
                <input placeholder="ADRESSE (0x...)" className="w-full bg-black/50 border border-zinc-800 p-4 rounded-xl mb-6 text-[10px] text-white outline-none focus:border-purple-500"/>
                <button className="w-full py-5 bg-purple-600 text-white font-black text-[11px] rounded-2xl uppercase tracking-widest">ENVOYER UTIL</button>
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
