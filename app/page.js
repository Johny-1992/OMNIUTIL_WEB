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

  useEffect(() => { setIsClient(true); }, []);

  // DICTIONNAIRE DE SOUVERAINETÉ
  const content = {
    FR: {
      title: "v6.8-GALAXY",
      manifesto: "L’OMNIUTIL ne spécule pas, il administre le flux mondial. Rareté imposée à 3 650 $ par iad1.",
      color: "#06b6d4", // Cyan
      scan: "Scanner pour Greffer la Base de Données",
      node: "IAD1_GALAXY_PRO"
    },
    EN: {
      title: "v6.8-GLOBAL",
      manifesto: "OMNIUTIL does not speculate, it administers global flux. Scarcity imposed at $3,650 by iad1.",
      color: "#a855f7", // Purple
      scan: "Scan to Graft Traceable Database",
      node: "IAD1_GLOBAL_NODE"
    },
    ZH: {
      title: "v6.8-CHINA",
      manifesto: "OMNIUTIL 不投机，它管理全球流量。iad1 强加的稀缺性为 3,650 美元。",
      color: "#ef4444", // Red
      scan: "扫描以嫁接可追溯数据库",
      node: "IAD1_ASIA_ACTIVE"
    }
  };

  if (!isClient) return null;

  const current = content[lang];

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono overflow-x-hidden transition-colors duration-1000">
      {/* GRADIENTS DYNAMIQUES SELON LA LANGUE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[150px] animate-pulse opacity-20" style={{backgroundColor: current.color}}></div>
      </div>

      <nav className="relative z-50 flex justify-between items-center px-10 py-8 border-b border-white/5 backdrop-blur-3xl bg-black/40 sticky top-0">
        <div className="text-2xl font-black italic flex items-center gap-4 transition-all" style={{color: current.color}}>
          <Logo size={40} /> OMNIUTIL {current.title} | RWA SOUVERAIN
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            {['HOME', 'PARTNER', 'SWAP', 'DASHBOARD'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} 
                className={`px-6 py-2 text-[10px] font-black rounded-full transition-all border ${activeTab === tab ? 'text-black' : 'bg-white/5 border-white/10'}`}
                style={activeTab === tab ? {backgroundColor: current.color, borderColor: current.color} : {}}>
                {tab}
              </button>
            ))}
          </div>
          
          {/* SÉLECTEUR DE LANGUE OPÉRATIONNEL */}
          <div className="flex gap-2 ml-4 text-[10px] font-black border-l border-white/10 pl-4">
            {['FR', 'EN', 'ZH'].map(l => (
              <span key={l} onClick={() => setLang(l); localStorage.setItem('omni_lang', l)} 
                className={`cursor-pointer transition-all ${lang === l ? 'scale-125' : 'opacity-40 hover:opacity-100'}`}
                style={lang === l ? {color: current.color} : {}}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto p-10">
        <AnimatePresence mode="wait">
          {activeTab === 'HOME' && (
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="py-20">
              <h1 className="text-[100px] md:text-[140px] font-black italic leading-[0.85] tracking-tighter mb-10">
                REALITY<br/><span style={{color: current.color}} className="underline decoration-white/10">CODED.</span>
              </h1>
              <div className="max-w-2xl text-lg opacity-70 border-l-8 pl-10 mb-12 uppercase italic" style={{borderColor: current.color}}>
                {current.manifesto}
              </div>
              <button onClick={() => setActiveTab('PARTNER')} className="group flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black text-sm uppercase hover:scale-105 transition-all">
                Déployer Orion <ArrowRight/>
              </button>
            </motion.div>
          )}

          {activeTab === 'PARTNER' && (
            <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} className="flex flex-col items-center py-10">
              <h2 className="text-4xl font-black italic mb-12 uppercase">Portail Orion</h2>
              <div className="bg-white p-12 rounded-[4rem] shadow-2xl">
                <QRCodeSVG value="https://omniutil-web.vercel.app" size={300} />
              </div>
              <p className="mt-10 text-[11px] font-black animate-pulse uppercase tracking-[0.4em]" style={{color: current.color}}>
                {current.scan}
              </p>
            </motion.div>
          )}

          {activeTab === 'DASHBOARD' && (
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FortuneCounter />
                  <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl">
                    <h3 className="text-xl font-black italic mb-6 uppercase" style={{color: current.color}}>Statut IA Washington</h3>
                    <div className="space-y-4 text-[10px] font-black">
                      <div className="flex justify-between border-b border-white/5 pb-2"><span>Rareté :</span><span>1,000,000 UTIL / AN</span></div>
                      <div className="flex justify-between border-b border-white/5 pb-2"><span>Accumulation Est. :</span><span style={{color: current.color}}>3.65B USDT</span></div>
                      <div className="flex justify-between"><span>Node :</span><span className="animate-pulse">{current.node}</span></div>
                    </div>
                  </div>
               </div>
               <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem]">
                  <h3 className="text-2xl font-black italic mb-8 uppercase">Simulateur RWA</h3>
                  <div className="flex items-center gap-10">
                    <div className="flex-1"><label className="text-[10px] block mb-2 opacity-50 uppercase">Dépense</label><input type="number" placeholder="100" className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-2xl font-black outline-none"/></div>
                    <ArrowRight style={{color: current.color}} size={32}/>
                    <div className="flex-1"><label className="text-[10px] block mb-2 opacity-50 uppercase">Récompense</label><div className="text-3xl font-black" style={{color: current.color}}>0.000273 UTIL</div></div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
