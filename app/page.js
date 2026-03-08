"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Repeat, Send, ArrowRight, Heart, Mail, Info, Copyright, ShieldCheck } from 'lucide-react';
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
    FR: { 
      title: "v6.8-GALAXY", manifesto: "L’OMNIUTIL ne spécule pas, il administre le flux mondial. Rareté imposée à 3 650 $ par iad1.", 
      color: "#06b6d4", partner: "PARTNER", scan: "Scanner pour Greffer la Base de Données",
      about: "Qui sommes-nous", aboutTxt: "Protocole de mérite RWA transformant la consommation en actifs souverains.",
      contact: "Contact", contactTxt: "Direction iad1 - Washington / Kinshasa.",
      swap: "SWAP", dashboard: "DASHBOARD", signature: "Sceau de l'Empire OMNIUTIL - Tous droits réservés 2026"
    },
    EN: { 
      title: "v6.8-GLOBAL", manifesto: "OMNIUTIL does not speculate, it administers global flux. Scarcity imposed at $3,650 by iad1.", 
      color: "#a855f7", partner: "PARTNER", scan: "Scan to Graft Traceable Database",
      about: "About Us", aboutTxt: "RWA merit protocol transforming consumption into sovereign assets.",
      contact: "Contact", contactTxt: "iad1 HQ - Washington / Kinshasa Hub.",
      swap: "SWAP", dashboard: "DASHBOARD", signature: "Seal of OMNIUTIL Empire - All rights reserved 2026"
    },
    ZH: { 
      title: "v6.8-CHINA", manifesto: "OMNIUTIL 不投机，它管理全球流量。iad1 强加的稀缺性为 3,650 美元。", 
      color: "#ef4444", partner: "合作伙伴", scan: "扫描以嫁接可追溯数据库",
      about: "关于我们", aboutTxt: "全球首个功绩协议，将实际消费转化为智权资产。",
      contact: "联系我们", contactTxt: "iad1 总部 - 华盛顿 / 金沙萨枢纽。",
      swap: "交换", dashboard: "仪表板", signature: "OMNIUTIL 帝国印章 - 2026 版权所有"
    }
  };

  if (!isClient) return null;
  const current = content[lang] || content.FR;

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono flex flex-col transition-colors duration-1000">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] opacity-20" style={{backgroundColor: current.color}}></div>
      </div>

      <nav className="relative z-50 flex justify-between items-center px-10 py-8 border-b border-white/5 backdrop-blur-3xl bg-black/40 sticky top-0">
        <div className="text-2xl font-black italic flex items-center gap-4 transition-all" style={{color: current.color}}>
          <Logo size={40} /> OMNIUTIL {current.title}
        </div>
        <div className="flex items-center gap-4">
          {['HOME', 'PARTNER', 'SWAP', 'DASHBOARD', 'ABOUT'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-[9px] font-black rounded-full border transition-all ${activeTab === tab ? 'text-black' : 'bg-white/5 border-white/10'}`} style={activeTab === tab ? {backgroundColor: current.color, borderColor: current.color} : {}}>{tab}</button>
          ))}
          <div className="flex gap-2 ml-4 text-[9px] font-black border-l border-white/10 pl-4">
            {['FR', 'EN', 'ZH'].map(l => (
              <span key={l} onClick={() => {setLang(l); localStorage.setItem('omni_lang', l);}} className={`cursor-pointer ${lang === l ? '' : 'opacity-30'}`} style={lang === l ? {color: current.color} : {}}>{l}</span>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex-grow max-w-7xl mx-auto p-10 pt-10 w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'HOME' && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="py-20">
              <h1 className="text-[100px] font-black italic leading-none mb-10 uppercase">Reality<br/><span style={{color: current.color}}>Coded.</span></h1>
              <div className="max-w-2xl text-lg opacity-70 border-l-4 pl-6 uppercase" style={{borderColor: current.color}}>{current.manifesto}</div>
            </motion.div>
          )}

          {activeTab === 'PARTNER' && (
            <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} className="flex flex-col items-center py-10">
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl mb-8"><QRCodeSVG value="https://omniutil-web.vercel.app" size={280} /></div>
              <p className="font-black animate-pulse uppercase tracking-[0.3em]" style={{color: current.color}}>{current.scan}</p>
            </motion.div>
          )}

          {activeTab === 'ABOUT' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
              <div className="p-10 bg-white/5 border border-white/10 rounded-[2rem]"><Info style={{color: current.color}} className="mb-4"/><h3 className="font-black mb-4 uppercase">{current.about}</h3><p className="text-xs opacity-60 leading-relaxed">{current.aboutTxt}</p></div>
              <div className="p-10 bg-white/5 border border-white/10 rounded-[2rem]"><Mail style={{color: current.color}} className="mb-4"/><h3 className="font-black mb-4 uppercase">{current.contact}</h3><p className="text-xs opacity-60 leading-relaxed">{current.contactTxt}</p></div>
              <div className="p-10 bg-white/5 border border-white/10 rounded-[2rem]"><Heart style={{color: current.color}} className="mb-4"/><h3 className="font-black mb-4 uppercase">Support</h3><p className="text-xs opacity-60 leading-relaxed">iad1 Washington / Galaxy Node Active.</p></div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <footer className="relative z-50 p-10 border-t border-white/5 flex justify-between items-center px-10">
        <div className="text-[8px] font-black uppercase opacity-40 tracking-widest">{current.signature}</div>
        <div className="text-[8px] font-black text-green-500 flex items-center gap-2"><ShieldCheck size={12}/> AUDIT: 89.65 | SCELLÉ</div>
      </footer>
    </main>
  );
}
