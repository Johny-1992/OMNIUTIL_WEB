import { aboutData } from './about-content';
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Repeat, Send, ShieldCheck, Heart, Globe, Activity } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Logo from '../components/Logo';

export default function Home() {
  const [lang, setLang] = useState('FR');
  const [activeTab, setActiveTab] = useState('HOME');
  const [isClient, setIsClient] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const s = localStorage.getItem('omni_lang') || 'FR';
    setLang(s);
    if (window.ethereum && window.ethereum.selectedAddress) setAccount(window.ethereum.selectedAddress);
  }, []);

  const content = {
    FR: { 
      title: "INFRASTRUCTURE OMNIUTIL", v: "v7.5-SOUVERAIN", 
      manifesto: "L'OMNIUTIL est l'infrastructure de confiance n°1 mondiale de récompense sur consommation réelle. Basée sur la méritocratie, cette valeur s'applique via Code QR et IA Coordinatrice.", 
      color: "#06b6d4", swap: "SWAP USDT", p2p: "TRANSFERT P2P", recharge: "SERVICES 5D", donate: "SCELLER DONATION", about: "À PROPOS", sig: "Sceau de l'Empire OMNIUTIL - 2026" 
    },
    EN: { 
      title: "OMNIUTIL INFRASTRUCTURE", v: "v7.5-GLOBAL", 
      manifesto: "OMNIUTIL is the world's #1 trusted infrastructure for real consumption rewards. Based on meritocracy, this value applies via QR Code and Coordinating AI.", 
      color: "#a855f7", swap: "SWAP USDT", p2p: "P2P TRANSFER", recharge: "5D SERVICES", donate: "SEAL DONATION", about: "ABOUT US", sig: "Seal of OMNIUTIL Empire - 2026" 
    },
    ZH: { 
      title: "OMNIUTIL 基础设施", v: "v7.5-CHINA", 
      manifesto: "OMNIUTIL 是全球排名第一的真实消费奖励信任基础设施。基于功绩制，该价值通过二维码和协调人工智能应用。", 
      color: "#ef4444", swap: "交换 USDT", p2p: "转账 P2P", recharge: "5D 服务", donate: "捐赠", about: "关于我们", sig: "OMNIUTIL 帝国印章 - 2026" 
    },
    AR: { 
      title: "بنية أومنيوتيل التحتية", v: "v7.5-ARABIA", 
      manifesto: "أومنيوتيل هي البنية التحتية الموثوقة رقم 1 في العالم لمكافآت الاستهلاك الحقيقي. بناءً على الجدارة، تنطبق هذه القيمة عبر رمز QR والذكاء الاصطناعي التنسيقي.", 
      color: "#10b981", swap: "تبادل", p2p: "تحويل", recharge: "خدمات 5D", donate: "تبرع", about: "معلومات عنا", sig: "ختم إمبراطورية أومنيوتيل - 2026" 
    }
  };

  const current = content[lang] || content.FR;

  const handleAction = async (type) => {
    if (!window.ethereum) return alert("MetaMask requis.");
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      if (type === 'DONATE') {
        const tx = { to: '0x40BB46B9D10Dd121e7D2150EC3784782ae648090', from: accounts[0], value: '0x38D7EA4C68000' };
        await window.ethereum.request({ method: 'eth_sendTransaction', params: [tx] });
        alert("SCELLÉ SUR LA BLOCKCHAIN ✅");
      } else {
        alert(`ORDRE ${type} TRANSMIS À WASHINGTON IAD1.`);
      }
    } catch (e) { alert("ANNULÉ."); }
  };

  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono flex flex-col transition-all duration-1000">
      <nav className="relative z-50 flex justify-between items-center px-10 py-6 border-b border-white/5 backdrop-blur-3xl bg-black/60 sticky top-0">
        <div className="flex flex-col">
          <span className="text-[9px] font-black opacity-40 tracking-[0.4em]">{current.v}</span>
          <div className="flex items-center gap-4 text-xl font-black italic" style={{color: current.color}}><Logo size={30} /> {current.title}</div>
        </div>
        <div className="flex items-center gap-4">
          {['HOME', 'SWAP', 'ABOUT', 'DONATE'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 text-[9px] font-black rounded-full border transition-all ${activeTab === t ? 'text-black' : 'bg-white/5 border-white/10'}`} style={activeTab === t ? {backgroundColor: current.color, borderColor: current.color} : {}}>{t}</button>
          ))}
          <div className="flex gap-2 ml-4 text-[9px] font-black border-l border-white/10 pl-4">
            {['FR', 'EN', 'ZH', 'AR'].map(l => (
              <span key={l} onClick={() => {setLang(l); localStorage.setItem('omni_lang', l);}} className={`cursor-pointer ${lang === l ? '' : 'opacity-30'}`} style={lang === l ? {color: current.color} : {}}>{l}</span>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex-grow max-w-7xl mx-auto p-10 w-full grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <AnimatePresence mode="wait">
            {activeTab === 'HOME' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <h1 className="text-5xl font-black italic mb-6 leading-tight uppercase">Confiance<br/><span style={{color: current.color}}>Méritocratique.</span></h1>
                <p className="text-xs opacity-70 border-l-4 pl-6 leading-relaxed uppercase tracking-tighter" style={{borderColor: current.color}}>{current.manifesto}</p>
                <div className="mt-10 p-6 glass bg-white/5 border border-white/10 rounded-3xl flex justify-between items-center">
                  <div className="flex flex-col"><span className="text-[8px] opacity-40 uppercase">Status Node</span><span className="text-xs font-black text-green-500">IAD1_GALAXY_PRO_ACTIVE</span></div>
                  <div className="flex flex-col text-right"><span className="text-[8px] opacity-40 uppercase">Rareté Scellée</span><span className="text-xs font-black text-cyan-400">3 650 $ / UTIL</span></div>
                </div>
              </motion.div>
            )}
            {activeTab === 'SWAP' && (
              <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-4">
                <button onClick={() => handleAction('SWAP')} className="w-full py-6 rounded-2xl font-black text-black uppercase shadow-2xl" style={{backgroundColor: current.color}}>{current.swap}</button>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => handleAction('P2P')} className="p-6 bg-white/5 border border-white/10 rounded-2xl font-black text-[9px] uppercase hover:border-white transition-all">{current.p2p}</button>
                  <button onClick={() => handleAction('SERVICE')} className="p-6 bg-white/5 border border-white/10 rounded-2xl font-black text-[9px] uppercase hover:border-white transition-all">{current.recharge}</button>
                </div>
              </motion.div>
            )}
            {activeTab === 'DONATE' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-10 glass bg-white/5 border border-white/10 rounded-[3rem] text-center">
                <Heart style={{color: current.color}} className="mx-auto mb-6 animate-pulse" size={64}/>
                <h2 className="text-2xl font-black uppercase mb-4">{current.donate}</h2>
                <button onClick={() => handleAction('DONATE')} className="w-full py-4 rounded-xl font-black text-black uppercase" style={{backgroundColor: current.color}}>
                   {account ? "TRANSFÉRER VERS CREATOR" : "OUVRIR METAMASK"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center">
           <div className="p-8 bg-white rounded-[3rem] shadow-2xl" style={{boxShadow: `0 0 60px ${current.color}33`}}>
             <QRCodeSVG value="https://omniutil-web.vercel.app" size={260} />
           </div>
           <p className="mt-8 text-[10px] font-black animate-pulse tracking-[0.3em]" style={{color: current.color}}>SCAN TO GRAFT DATABASE</p>
        </div>
      </div>

      <footer className="relative z-50 p-8 border-t border-white/5 flex justify-between items-center px-10">
        <div className="text-[8px] font-black uppercase opacity-40 tracking-widest">{current.sig}</div>
        <div className="text-[8px] font-black text-green-500 flex items-center gap-2"><ShieldCheck size={12}/> AUDIT: 89.65 | WASHINGTON iad1</div>
      </footer>
    </main>
  );
}
