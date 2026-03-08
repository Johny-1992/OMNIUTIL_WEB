"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Repeat, Send, ArrowRight, ShieldCheck, Heart, Mail, Info, Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Logo from '../components/Logo';

export default function Home() {
  const [lang, setLang] = useState('FR');
  const [activeTab, setActiveTab] = useState('HOME');
  const [amount, setAmount] = useState(100);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); const s = localStorage.getItem('omni_lang'); if(s) setLang(s); }, []);

  const content = {
    FR: { title: "v6.9-GALAXY", manifesto: "L’OMNIUTIL ne spécule pas, il administre le flux mondial. Rareté : 3 650 $.", color: "#06b6d4", swap: "Swap USDT", p2p: "Transfert P2P", recharge: "Services 5D", donate: "Faire un Don", about: "À Propos", sig: "Sceau de l'Empire OMNIUTIL - 2026" },
    EN: { title: "v6.9-GLOBAL", manifesto: "OMNIUTIL does not speculate, it administers global flux. Scarcity: $3,650.", color: "#a855f7", swap: "Swap USDT", p2p: "P2P Transfer", recharge: "5D Services", donate: "Donate", about: "About Us", sig: "Seal of OMNIUTIL Empire - 2026" },
    ZH: { title: "v6.9-CHINA", manifesto: "OMNIUTIL 不投机，它管理全球流量。稀缺性：3,650 美元。", color: "#ef4444", swap: "交换", p2p: "转账", recharge: "5D 服务", donate: "捐赠", about: "关于我们", sig: "OMNIUTIL 帝国印章 - 2026" },
    AR: { title: "v6.9-ARABIA", manifesto: "OMNIUTIL لا يتكهن، بل يدير التدفق العالمي. الندرة: 3650 دولارًا.", color: "#10b981", swap: "تبادل", p2p: "تحويل", recharge: "خدمات 5D", donate: "تبرع", about: "معلومات عنا", sig: "ختم إمبراطورية أومنيوتيل - 2026" }
  };

  const current = content[lang] || content.FR;

  const handleWeb3Action = async (type) => {
    if (!window.ethereum) return alert("Installez MetaMask pour cette action Souveraine.");
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (type === 'DONATE') {
        const tx = { to: '0x40BB46B9D10Dd121e7D2150EC3784782ae648090', from: accounts[0], value: '0x38D7EA4C68000' }; // ~0.001 ETH test
        await window.ethereum.request({ method: 'eth_sendTransaction', params: [tx] });
        alert("Donation Scellée sur la Blockchain !");
      } else {
        alert(`Ordre ${type} envoyé au Node iad1 Washington...`);
      }
    } catch (e) { alert("Action Annulée."); }
  };

  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono flex flex-col transition-all duration-1000">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] opacity-20" style={{backgroundColor: current.color}}></div>
      </div>

      <nav className="relative z-50 flex justify-between items-center px-10 py-6 border-b border-white/5 backdrop-blur-3xl bg-black/60 sticky top-0">
        <div className="flex items-center gap-4 text-xl font-black italic" style={{color: current.color}}><Logo size={35} /> OMNIUTIL {current.title}</div>
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
              <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0}}>
                <h1 className="text-7xl font-black italic mb-6 leading-none uppercase">Reality<br/><span style={{color: current.color}}>Coded.</span></h1>
                <p className="text-sm opacity-70 border-l-4 pl-6 uppercase tracking-tighter" style={{borderColor: current.color}}>{current.manifesto}</p>
                <div className="mt-10 p-6 glass bg-white/5 border border-white/10 rounded-3xl flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase opacity-50 tracking-widest">Accumulation 7D</span>
                  <span className="text-xl font-black text-cyan-400 animate-pulse">3.65B USDT</span>
                </div>
              </motion.div>
            )}
            {activeTab === 'SWAP' && (
              <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-4">
                <div className="p-8 glass bg-white/5 border border-white/10 rounded-[2.5rem]">
                  <h3 className="font-black mb-4 uppercase text-xs opacity-50">{current.swap}</h3>
                  <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} className="w-full bg-black/60 p-4 rounded-xl border border-white/10 text-xl font-black mb-4 outline-none" />
                  <button onClick={() => handleWeb3Action('SWAP')} className="w-full py-4 rounded-xl font-black text-black uppercase" style={{backgroundColor: current.color}}>Exécuter</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => handleWeb3Action('P2P')} className="p-6 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase hover:border-white transition-all">{current.p2p}</button>
                  <button onClick={() => handleWeb3Action('RECHARGE')} className="p-6 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase hover:border-white transition-all">{current.recharge}</button>
                </div>
              </motion.div>
            )}
            {activeTab === 'DONATE' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-10 glass bg-white/5 border border-white/10 rounded-[3rem] text-center">
                <Heart style={{color: current.color}} className="mx-auto mb-6 animate-pulse" size={64}/>
                <h2 className="text-2xl font-black uppercase mb-4">{current.donate}</h2>
                <button onClick={() => handleWeb3Action('DONATE')} className="w-full py-4 rounded-xl font-black text-black uppercase shadow-2xl" style={{backgroundColor: current.color}}>METAMASK DIRECT</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center">
           <div className="p-8 bg-white rounded-[3rem] shadow-2xl transition-all duration-1000" style={{boxShadow: `0 0 60px ${current.color}33`}}>
             <QRCodeSVG value="https://omniutil-web.vercel.app" size={260} />
           </div>
           <p className="mt-8 text-[10px] font-black animate-pulse tracking-[0.3em]" style={{color: current.color}}>SCAN TO GRAFT DATABASE</p>
        </div>
      </div>

      <footer className="relative z-50 p-8 border-t border-white/5 flex justify-between items-center px-10">
        <div className="text-[8px] font-black uppercase opacity-40 tracking-widest">{current.sig}</div>
        <div className="text-[8px] font-black text-green-500 flex items-center gap-2"><ShieldCheck size={12}/> AUDIT: 89.65 | IAD1_GALAXY_PRO</div>
      </footer>
    </main>
  );
}
