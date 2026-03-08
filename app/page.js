"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Repeat, Send, ArrowRight, ShieldCheck, Info, Mail, Heart } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Logo from '../components/Logo';
import FortuneCounter from '../components/FortuneCounter';

export default function Home() {
  const [lang, setLang] = useState('FR');
  const [activeTab, setActiveTab] = useState('HOME');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { 
    setIsClient(true); 
    const saved = localStorage.getItem('omni_lang') || 'FR';
    setLang(saved);
  }, []);

  const content = {
    FR: { title: "v6.8-GALAXY", manifesto: "L’OMNIUTIL ne spécule pas, il administre le flux mondial. Rareté imposée à 3 650 $ par iad1.", color: "#06b6d4", qr: "SCANNEZ POUR GREFFER L'ÉCOSYSTÈME", about: "Qui sommes-nous", contact: "Contact", accumulation: "3.65B USDT", sig: "Sceau de l'Empire OMNIUTIL - 2026" },
    EN: { title: "v6.8-GLOBAL", manifesto: "OMNIUTIL does not speculate, it administers global flux. Scarcity imposed at $3,650 by iad1.", color: "#a855f7", qr: "SCAN TO GRAFT THE ECOSYSTEM", about: "About Us", contact: "Contact", accumulation: "3.65B USDT", sig: "Seal of OMNIUTIL Empire - 2026" },
    ZH: { title: "v6.8-CHINA", manifesto: "OMNIUTIL 不投机，它管理全球流量。iad1 强加的稀缺性为 3,650 美元。", color: "#ef4444", qr: "扫描以嫁接生态系统", about: "关于我们", contact: "联系", accumulation: "3.65B USDT", sig: "OMNIUTIL 帝国印章 - 2026" }
  };

  if (!isClient) return null;
  const current = content[lang] || content.FR;

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono flex flex-col transition-all duration-1000">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-10" style={{backgroundColor: current.color}}></div>
      </div>

      <nav className="relative z-50 flex justify-between items-center px-10 py-6 border-b border-white/5 backdrop-blur-3xl bg-black/60 sticky top-0">
        <div className="flex items-center gap-4 text-xl font-black italic" style={{color: current.color}}><Logo size={35} /> OMNIUTIL {current.title}</div>
        <div className="flex items-center gap-4">
          {['HOME', 'SWAP', 'DASHBOARD', 'ABOUT'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-[9px] font-black rounded-full border transition-all ${activeTab === tab ? 'text-black' : 'bg-white/5 border-white/10'}`} style={activeTab === tab ? {backgroundColor: current.color, borderColor: current.color} : {}}>{tab}</button>
          ))}
          <div className="flex gap-2 ml-4 text-[9px] font-black border-l border-white/10 pl-4">
            {['FR', 'EN', 'ZH'].map(l => (
              <span key={l} onClick={() => {setLang(l); localStorage.setItem('omni_lang', l);}} className={`cursor-pointer ${lang === l ? '' : 'opacity-30'}`} style={lang === l ? {color: current.color} : {}}>{l}</span>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex-grow max-w-7xl mx-auto p-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <AnimatePresence mode="wait">
            {activeTab === 'HOME' && (
              <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0}}>
                <h1 className="text-8xl font-black italic mb-6 leading-none uppercase">Reality<br/><span style={{color: current.color}}>Coded.</span></h1>
                <p className="text-sm opacity-70 border-l-4 pl-6 uppercase tracking-tighter" style={{borderColor: current.color}}>{current.manifesto}</p>
              </motion.div>
            )}
            {activeTab === 'DASHBOARD' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-6">
                <FortuneCounter />
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                  <h3 className="text-[10px] font-black mb-4 uppercase opacity-50">Statut IAD1_WASHINGTON</h3>
                  <div className="flex justify-between text-xs font-bold"><span>Accumulation Est.</span><span className="text-cyan-400">{current.accumulation}</span></div>
                </div>
              </motion.div>
            )}
            {activeTab === 'ABOUT' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid grid-cols-1 gap-4">
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl"><h3 className="text-xs font-black uppercase mb-2">{current.about}</h3><p className="text-[10px] opacity-60 uppercase">Protocole RWA transformant la consommation en méritocratie.</p></div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl"><h3 className="text-xs font-black uppercase mb-2">{current.contact}</h3><p className="text-[10px] opacity-60 uppercase">iad1 Headquarters - Washington / Kinshasa.</p></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center">
           <div className="p-8 bg-white rounded-[3rem] shadow-2xl transition-all duration-1000" style={{boxShadow: `0 0 60px ${current.color}33`}}>
             <QRCodeSVG value="https://omniutil-web.vercel.app" size={260} />
           </div>
           <p className="mt-8 text-[10px] font-black animate-pulse tracking-[0.3em]" style={{color: current.color}}>{current.qr}</p>
        </div>
      </div>

      <footer className="relative z-50 p-8 border-t border-white/5 flex justify-between items-center px-10">
        <div className="text-[8px] font-black uppercase opacity-40 tracking-widest">{current.sig}</div>
        <div className="text-[8px] font-black text-green-500 flex items-center gap-2"><ShieldCheck size={12}/> AUDIT: 89.65 | SCELLÉ</div>
      </footer>
    </main>
  );
}
