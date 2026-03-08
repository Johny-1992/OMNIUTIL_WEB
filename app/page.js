"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Repeat, Send, ArrowRight, Heart, Mail, Info, Copyright } from 'lucide-react';
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
      title: "v6.8-GALAXY", 
      manifesto: "L’OMNIUTIL ne spécule pas, il administre le flux mondial. Rareté imposée à 3 650 $ par iad1.", 
      color: "#06b6d4",
      about: "Qui sommes-nous", aboutTxt: "OMNIUTIL est le premier protocole de mérite au monde, transformant la consommation réelle en actifs souverains.",
      contact: "Nous contacter", contactTxt: "Direction Générale iad1 - Washington / Hub Kinshasa.",
      donors: "Donateurs", donorsTxt: "Soutenez l'expansion de la Méritocratie Mondiale.",
      signature: "Sceau de l'Empire OMNIUTIL - Tous droits réservés 2026",
      swap: "Échanger", p2p: "Transférer", recharge: "Services 5D"
    },
    EN: { 
      title: "v6.8-GLOBAL", 
      manifesto: "OMNIUTIL does not speculate, it administers global flux. Scarcity imposed at $3,650 by iad1.", 
      color: "#a855f7",
      about: "About Us", aboutTxt: "OMNIUTIL is the world's first merit protocol, transforming real consumption into sovereign assets.",
      contact: "Contact Us", contactTxt: "iad1 Headquarters - Washington / Kinshasa Hub.",
      donors: "Donors", donorsTxt: "Support the expansion of Global Meritocracy.",
      signature: "Seal of OMNIUTIL Empire - All rights reserved 2026",
      swap: "Swap", p2p: "Transfer", recharge: "5D Services"
    },
    ZH: { 
      title: "v6.8-CHINA", 
      manifesto: "OMNIUTIL 不投机，它管理全球流量。iad1 强加的稀缺性为 3,650 美元。", 
      color: "#ef4444",
      about: "关于我们", aboutTxt: "OMNIUTIL 是全球首个功绩协议，将实际消费转化为智权资产。",
      contact: "联系我们", contactTxt: "iad1 总部 - 华盛顿 / 金沙萨枢纽。",
      donors: "捐赠者", donorsTxt: "支持全球功绩制的扩张。",
      signature: "OMNIUTIL 帝国印章 - 2026 版权所有",
      swap: "交换", p2p: "转账", recharge: "5D 服务"
    }
  };

  if (!isClient) return null;
  const current = content[lang] || content.FR;

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono overflow-x-hidden flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[150px] opacity-20 transition-all duration-1000" style={{backgroundColor: current.color}}></div>
      </div>

      <nav className="relative z-50 flex justify-between items-center px-10 py-8 border-b border-white/5 backdrop-blur-3xl bg-black/40 sticky top-0">
        <div className="text-2xl font-black italic flex items-center gap-4 transition-colors duration-500" style={{color: current.color}}>
          <Logo size={40} /> OMNIUTIL {current.title}
        </div>
        <div className="flex items-center gap-4">
          {['HOME', 'SWAP', 'DASHBOARD', 'ABOUT'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-[10px] font-black rounded-full border transition-all ${activeTab === tab ? 'text-black' : 'bg-white/5 border-white/10'}`} style={activeTab === tab ? {backgroundColor: current.color, borderColor: current.color} : {}}>{tab}</button>
          ))}
          <div className="flex gap-2 ml-4 text-[10px] font-black border-l border-white/20 pl-4">
            {['FR', 'EN', 'ZH'].map(l => (
              <span key={l} onClick={() => {setLang(l); localStorage.setItem('omni_lang', l);}} className={`cursor-pointer ${lang === l ? 'text-cyan-400' : 'opacity-40'}`} style={lang === l ? {color: current.color} : {}}>{l}</span>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex-grow max-w-7xl mx-auto p-10 pt-20 w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'HOME' && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <h1 className="text-[80px] md:text-[120px] font-black italic leading-none mb-10">REALITY<br/><span style={{color: current.color}}>CODED.</span></h1>
              <div className="max-w-2xl text-lg opacity-70 border-l-4 pl-6 mb-12 uppercase" style={{borderColor: current.color}}>{current.manifesto}</div>
            </motion.div>
          )}

          {activeTab === 'SWAP' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] text-center">
                <Repeat style={{color: current.color}} className="mx-auto mb-6" size={48}/>
                <h3 className="font-black mb-4 uppercase">{current.swap}</h3>
                <button className="w-full py-4 rounded-xl font-black text-black" style={{backgroundColor: current.color}}>UTIL/USDT</button>
              </div>
              <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] text-center">
                <Send style={{color: current.color}} className="mx-auto mb-6" size={48}/>
                <h3 className="font-black mb-4 uppercase">{current.p2p}</h3>
                <button className="w-full py-4 bg-white text-black rounded-xl font-black uppercase">P2P CHANNEL</button>
              </div>
              <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] text-center">
                <Zap style={{color: current.color}} className="mx-auto mb-6" size={48}/>
                <h3 className="font-black mb-4 uppercase">{current.recharge}</h3>
                <button className="w-full py-4 border border-white/20 rounded-xl font-black uppercase">RECHARGE</button>
              </div>
            </div>
          )}

          {activeTab === 'ABOUT' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-10 bg-white/5 border border-white/10 rounded-3xl">
                <Info style={{color: current.color}} className="mb-4" />
                <h3 className="font-black mb-4 uppercase">{current.about}</h3>
                <p className="text-[12px] opacity-70 leading-relaxed">{current.aboutTxt}</p>
              </div>
              <div className="p-10 bg-white/5 border border-white/10 rounded-3xl">
                <Mail style={{color: current.color}} className="mb-4" />
                <h3 className="font-black mb-4 uppercase">{current.contact}</h3>
                <p className="text-[12px] opacity-70 leading-relaxed">{current.contactTxt}</p>
              </div>
              <div className="p-10 bg-white/5 border border-white/10 rounded-3xl">
                <Heart style={{color: current.color}} className="mb-4" />
                <h3 className="font-black mb-4 uppercase">{current.donors}</h3>
                <p className="text-[12px] opacity-70 leading-relaxed">{current.donorsTxt}</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <footer className="relative z-50 p-10 border-t border-white/5 text-center">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 flex items-center justify-center gap-2">
          <Copyright size={12} /> {current.signature}
        </div>
      </footer>
    </main>
  );
}
