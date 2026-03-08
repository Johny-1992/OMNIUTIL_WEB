"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Repeat, Send, ArrowRight, ShieldCheck, Activity, Heart, Mail, Info, Copyright } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Logo from '../components/Logo';
import FortuneCounter from '../components/FortuneCounter';

export default function Home() {
  const [lang, setLang] = useState('FR');
  const [activeTab, setActiveTab] = useState('HOME');
  const [isClient, setIsClient] = useState(false);
  const [amount, setAmount] = useState(100);
  const [executing, setExecuting] = useState(false);

  useEffect(() => { 
    setIsClient(true); 
    const saved = localStorage.getItem('omni_lang') || 'FR';
    setLang(saved);
  }, []);

  const content = {
    FR: { title: "v6.8-GALAXY", manifesto: "L’OMNIUTIL ne spécule pas, il administre le flux mondial. Rareté imposée à 3 650 $ par iad1.", color: "#06b6d4", swap: "Swap UTIL/USDT", p2p: "Transfert P2P", recharge: "Services 5D", donate: "Donation", about: "Qui sommes-nous", contact: "Contact", sig: "Sceau de l'Empire OMNIUTIL - 2026", exec: "Exécuter l'Ordre", donateTxt: "Soutien à la Méritocratie Mondiale" },
    EN: { title: "v6.8-GLOBAL", manifesto: "OMNIUTIL does not speculate, it administers global flux. Scarcity imposed at $3,650 by iad1.", color: "#a855f7", swap: "Swap UTIL/USDT", p2p: "P2P Transfer", recharge: "5D Services", donate: "Donation", about: "About Us", contact: "Contact", sig: "Seal of OMNIUTIL Empire - 2026", exec: "Execute Order", donateTxt: "Support Global Meritocracy" }
  };

  const current = content[lang] || content.FR;

  const handleAction = async (type) => {
    setExecuting(true);
    const res = await fetch('/api/service-exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: "USER_ID", amount: amount, service: type, billing_id: "TX-INSTANT" })
    });
    const data = await res.json();
    setExecuting(false);
    alert(`ORDRE IAD1 SCELLÉ : ${type} - ${data.status}`);
  };

  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono flex flex-col transition-all duration-1000">
      <nav className="relative z-50 flex justify-between items-center px-10 py-6 border-b border-white/5 backdrop-blur-3xl bg-black/60 sticky top-0">
        <div className="flex items-center gap-4 text-xl font-black italic" style={{color: current.color}}><Logo size={35} /> OMNIUTIL {current.title}</div>
        <div className="flex gap-4">
          {['HOME', 'SWAP', 'ABOUT', 'DONATE'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-[9px] font-black rounded-full border transition-all ${activeTab === tab ? 'text-black' : 'bg-white/5 border-white/10'}`} style={activeTab === tab ? {backgroundColor: current.color, borderColor: current.color} : {}}>{tab}</button>
          ))}
          <div className="flex gap-2 ml-4 text-[9px] font-black border-l border-white/10 pl-4">
            {['FR', 'EN'].map(l => (
              <span key={l} onClick={() => {setLang(l); localStorage.setItem('omni_lang', l);}} className={`cursor-pointer ${lang === l ? '' : 'opacity-30'}`} style={lang === l ? {color: current.color} : {}}>{l}</span>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex-grow max-w-7xl mx-auto p-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <AnimatePresence mode="wait">
            {activeTab === 'HOME' && (
              <motion.div key="home" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0}}>
                <h1 className="text-8xl font-black italic leading-none mb-10 uppercase">Reality<br/><span style={{color: current.color}}>Coded.</span></h1>
                <p className="text-sm opacity-70 border-l-4 pl-6 uppercase tracking-tighter" style={{borderColor: current.color}}>{current.manifesto}</p>
                <div className="mt-10 grid grid-cols-2 gap-4"><FortuneCounter /></div>
              </motion.div>
            )}
            {activeTab === 'SWAP' && (
              <motion.div key="swap" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-6">
                <div className="p-8 glass bg-white/5 border border-white/10 rounded-[2.5rem]">
                  <h3 className="font-black mb-4 uppercase text-cyan-400 flex items-center gap-2"><Repeat size={20}/> {current.swap}</h3>
                  <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} className="w-full bg-black/60 p-4 rounded-xl border border-white/10 text-xl font-black mb-4" />
                  <button onClick={() => handleAction('SWAP')} className="w-full py-5 rounded-2xl font-black text-black uppercase" style={{backgroundColor: current.color}}>{current.exec}</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <button onClick={() => handleAction('P2P')} className="p-6 bg-white/5 border border-white/10 rounded-3xl font-black text-[10px] uppercase hover:border-purple-500">{current.p2p}</button>
                   <button onClick={() => handleAction('RECHARGE')} className="p-6 bg-white/5 border border-white/10 rounded-3xl font-black text-[10px] uppercase hover:border-red-500">{current.recharge}</button>
                </div>
              </motion.div>
            )}
            {activeTab === 'DONATE' && (
              <motion.div key="donate" initial={{opacity:0}} animate={{opacity:1}} className="p-10 glass bg-white/5 border border-white/10 rounded-[3rem] text-center">
                <Heart style={{color: current.color}} className="mx-auto mb-6 animate-pulse" size={64}/>
                <h2 className="text-2xl font-black uppercase mb-4">{current.donate}</h2>
                <p className="text-xs opacity-70 mb-8">{current.donateTxt}</p>
                <input placeholder="Montant USDT" className="w-full bg-black/40 p-4 rounded-xl border border-white/10 mb-4 font-bold" />
                <button onClick={() => handleAction('DONATION')} className="w-full py-4 rounded-xl font-black text-black uppercase" style={{backgroundColor: current.color}}>Envoyer Donation</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center">
           <div className="p-8 bg-white rounded-[3rem] shadow-2xl transition-all duration-1000" style={{boxShadow: `0 0 60px ${current.color}33`}}>
             <QRCodeSVG value="https://omniutil-web.vercel.app" size={260} />
           </div>
           <p className="mt-8 text-[10px] font-black animate-pulse tracking-[0.3em]" style={{color: current.color}}>SOUVERAINETÉ IAD1 ACTIVÉE</p>
        </div>
      </div>

      <footer className="relative z-50 p-8 border-t border-white/5 flex justify-between items-center px-10">
        <div className="text-[8px] font-black uppercase opacity-40 tracking-widest">{current.sig}</div>
        <div className="text-[8px] font-black text-green-500 flex items-center gap-2"><ShieldCheck size={12}/> AUDIT: 89.65 | IAD1_GALAXY_PRO</div>
      </footer>
    </main>
  );
}
