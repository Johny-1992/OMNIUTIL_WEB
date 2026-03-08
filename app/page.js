"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Repeat, Send, ArrowRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Logo from '../components/Logo';
import FortuneCounter from '../components/FortuneCounter';

export default function Home() {
  const [lang, setLang] = useState('FR');
  const [activeTab, setActiveTab] = useState('HOME');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { 
    setIsClient(true); 
    const saved = localStorage.getItem('omni_lang');
    if (saved) setLang(saved);
  }, []);

  const content = {
    FR: { title: "v6.8-GALAXY", manifesto: "L’OMNIUTIL ne spécule pas, il administre le flux mondial. Rareté imposée à 3 650 $ par iad1.", color: "#06b6d4", scan: "Scanner pour Greffer la Base de Données", node: "IAD1_GALAXY_PRO" },
    EN: { title: "v6.8-GLOBAL", manifesto: "OMNIUTIL does not speculate, it administers global flux. Scarcity imposed at $3,650 by iad1.", color: "#a855f7", scan: "Scan to Graft Traceable Database", node: "IAD1_GLOBAL_NODE" },
    ZH: { title: "v6.8-CHINA", manifesto: "OMNIUTIL 不投机，它管理全球流量。iad1 强加的稀缺性为 3,650 美元。", color: "#ef4444", scan: "扫描以嫁接可追溯数据库", node: "IAD1_ASIA_ACTIVE" }
  };

  if (!isClient) return null;
  const current = content[lang] || content.FR;

  const changeLang = (l) => {
    setLang(l);
    localStorage.setItem('omni_lang', l);
  };

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[150px] opacity-20 transition-all duration-1000" style={{backgroundColor: current.color}}></div>
      </div>

      <nav className="relative z-50 flex justify-between items-center px-10 py-8 border-b border-white/5 backdrop-blur-3xl bg-black/40 sticky top-0">
        <div className="text-2xl font-black italic flex items-center gap-4 transition-colors duration-500" style={{color: current.color}}>
          <Logo size={40} /> OMNIUTIL {current.title} | RWA SOUVERAIN
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            {['HOME', 'PARTNER', 'DASHBOARD'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-[10px] font-black rounded-full border transition-all ${activeTab === tab ? 'text-black' : 'bg-white/5 border-white/10'}`} style={activeTab === tab ? {backgroundColor: current.color, borderColor: current.color} : {}}>{tab}</button>
            ))}
          </div>
          <div className="flex gap-2 text-[10px] font-black border-l border-white/20 pl-4">
            {['FR', 'EN', 'ZH'].map(l => (
              <span key={l} onClick={() => changeLang(l)} className={`cursor-pointer transition-all ${lang === l ? 'scale-125' : 'opacity-40'}`} style={lang === l ? {color: current.color} : {}}>{l}</span>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto p-10 pt-20">
        <AnimatePresence mode="wait">
          {activeTab === 'HOME' && (
            <motion.div key="home" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <h1 className="text-[100px] font-black italic leading-none mb-10">REALITY<br/><span style={{color: current.color}} className="underline decoration-white/10">CODED.</span></h1>
              <div className="max-w-2xl text-lg opacity-70 border-l-4 pl-6 mb-12 uppercase" style={{borderColor: current.color}}>{current.manifesto}</div>
              <button onClick={() => setActiveTab('PARTNER')} className="group flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black text-sm uppercase">Déployer Orion <ArrowRight/></button>
            </motion.div>
          )}
          {activeTab === 'PARTNER' && (
            <div className="flex flex-col items-center py-10">
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl mb-8"><QRCodeSVG value="https://omniutil-web.vercel.app" size={250} /></div>
              <p className="font-black animate-pulse uppercase tracking-widest" style={{color: current.color}}>{current.scan}</p>
            </div>
          )}
          {activeTab === 'DASHBOARD' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FortuneCounter />
              <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem]">
                <h3 className="text-xl font-black mb-6 uppercase" style={{color: current.color}}>Statut {current.node}</h3>
                <div className="space-y-4 text-[12px] font-black uppercase">
                  <div className="flex justify-between border-b border-white/5 pb-2"><span>Accumulation Est. :</span><span style={{color: current.color}}>3.65B USDT</span></div>
                  <div className="flex justify-between"><span>Node Status :</span><span className="text-green-500">ACTIVE</span></div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
