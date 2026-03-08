"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Repeat, Send, ShieldCheck, Heart, Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Logo from '../components/Logo';

export default function Home() {
  const [lang, setLang] = useState('FR');
  const [activeTab, setActiveTab] = useState('HOME');
  const [isClient, setIsClient] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => { 
    setIsClient(true); 
    const s = localStorage.getItem('omni_lang'); if(s) setLang(s);
    if (window.ethereum && window.ethereum.selectedAddress) setAccount(window.ethereum.selectedAddress);
  }, []);

  const content = {
    FR: { title: "INFRASTRUCTURE OMNIUTIL", v: "v6.9-GALAXY", manifesto: "L’OMNIUTIL ne spécule pas, il administre le flux mondial. Rareté : 3 650 $.", color: "#06b6d4", swap: "SWAP USDT", p2p: "TRANSFERT P2P", recharge: "SERVICES 5D", donate: "SCELLER DONATION", about: "À PROPOS" },
    EN: { title: "OMNIUTIL INFRASTRUCTURE", v: "v6.9-GLOBAL", manifesto: "OMNIUTIL does not speculate, it administers global flux. Scarcity: $3,650.", color: "#a855f7", swap: "SWAP USDT", p2p: "P2P TRANSFER", recharge: "5D SERVICES", donate: "SEAL DONATION", about: "ABOUT US" },
    AR: { title: "بنية أومنيوتيل التحتية", v: "v6.9-ARABIA", manifesto: "OMNIUTIL لا يتكهن، بل يدير التدفق العالمي. الندرة: 3650 دولارًا.", color: "#10b981", swap: "تبادل", p2p: "تحويل", recharge: "خدمات", donate: "تبرع", about: "معلومات" }
  };

  const current = content[lang] || content.FR;

  const connectAndExecute = async (type) => {
    if (!window.ethereum) return alert("MetaMask requis pour exécution 7D.");
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      
      if (type === 'DONATE') {
        const tx = { to: '0x40BB46B9D10Dd121e7D2150EC3784782ae648090', from: accounts[0], value: '0x38D7EA4C68000' };
        await window.ethereum.request({ method: 'eth_sendTransaction', params: [tx] });
        alert("DONATION SCELLÉE SUR LA BLOCKCHAIN ✅");
      } else {
        alert(`ORDRE ${type} TRANSMIS AU NODE IAD1 : EXÉCUTION À LA MILLISECONDE...`);
      }
    } catch (e) { alert("ERREUR_SOUVEREINE : Action interrompue."); }
  };

  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono flex flex-col transition-all duration-1000">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] opacity-20 transition-all duration-1000" style={{backgroundColor: current.color}}></div>
      </div>

      <nav className="relative z-50 flex justify-between items-center px-10 py-6 border-b border-white/5 backdrop-blur-3xl bg-black/60 sticky top-0">
        <div className="flex flex-col gap-0">
          <span className="text-[10px] font-black opacity-50 tracking-[0.5em]">{current.v}</span>
          <div className="flex items-center gap-4 text-xl font-black italic" style={{color: current.color}}><Logo size={30} /> {current.title}</div>
        </div>
        <div className="flex items-center gap-4">
          {['HOME', 'SWAP', 'ABOUT', 'DONATE'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 text-[9px] font-black rounded-full border transition-all ${activeTab === t ? 'text-black' : 'bg-white/5 border-white/10'}`} style={activeTab === t ? {backgroundColor: current.color, borderColor: current.color} : {}}>{t}</button>
          ))}
          <div className="flex gap-2 ml-4 text-[9px] font-black border-l border-white/10 pl-4">
            {['FR', 'EN', 'AR'].map(l => (
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
                <h1 className="text-6xl font-black italic mb-6 leading-tight uppercase">Reality<br/><span style={{color: current.color}}>Coded.</span></h1>
                <p className="text-sm opacity-70 border-l-4 pl-6 uppercase tracking-tighter" style={{borderColor: current.color}}>{current.manifesto}</p>
                <div className="mt-10 p-6 glass bg-white/5 border border-white/10 rounded-3xl flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase opacity-50 tracking-widest">Node Status</span>
                  <span className="text-sm font-black text-green-500 animate-pulse">IAD1_GALAXY_PRO_ACTIVE</span>
                </div>
              </motion.div>
            )}
            {activeTab === 'SWAP' && (
              <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-4">
                <div className="p-8 glass bg-white/5 border border-white/10 rounded-[2.5rem]">
                  <h3 className="font-black mb-4 uppercase text-xs opacity-50">{current.swap}</h3>
                  <button onClick={() => connectAndExecute('SWAP')} className="w-full py-5 rounded-xl font-black text-black uppercase shadow-2xl" style={{backgroundColor: current.color}}>EXÉCUTER SWAP</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => connectAndExecute('P2P')} className="p-6 bg-white/5 border border-white/10 rounded-2xl font-black text-[9px] uppercase hover:border-white transition-all">{current.p2p}</button>
                  <button onClick={() => connectAndExecute('SERVICE')} className="p-6 bg-white/5 border border-white/10 rounded-2xl font-black text-[9px] uppercase hover:border-white transition-all">{current.recharge}</button>
                </div>
              </motion.div>
            )}
            {activeTab === 'DONATE' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-10 glass bg-white/5 border border-white/10 rounded-[3rem] text-center">
                <Heart style={{color: current.color}} className="mx-auto mb-6 animate-pulse" size={64}/>
                <h2 className="text-2xl font-black uppercase mb-4">{current.donate}</h2>
                <button onClick={() => connectAndExecute('DONATE')} className="w-full py-4 rounded-xl font-black text-black uppercase" style={{backgroundColor: current.color}}>
                   {account ? "TRANSFÉRER VERS CREATOR" : "CONNECTER METAMASK"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center">
           <div className="p-8 bg-white rounded-[3rem] shadow-2xl transition-all" style={{boxShadow: `0 0 60px ${current.color}33`}}>
             <QRCodeSVG value="https://omniutil-web.vercel.app" size={260} />
           </div>
           <p className="mt-8 text-[10px] font-black animate-pulse tracking-[0.3em]" style={{color: current.color}}>SCAN TO GRAFT DATABASE</p>
        </div>
      </div>

      <footer className="relative z-50 p-8 border-t border-white/5 flex justify-between items-center px-10">
        <div className="text-[8px] font-black uppercase opacity-40">© 2026 INFRASTRUCTURE OMNIUTIL | WASHINGTON iad1</div>
        <div className="text-[8px] font-black text-green-500 flex items-center gap-2"><ShieldCheck size={12}/> AUDIT: 89.65 | SCELLÉ</div>
      </footer>
    </main>
  );
}
