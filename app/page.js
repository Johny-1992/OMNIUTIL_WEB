import { aboutData } from './about-content';
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Repeat, Send, ShieldCheck, Heart, Globe, Activity } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Logo from '../components/Logo';
import Countdown from '../components/Countdown';
import RoyaltyTracker from '../components/RoyaltyTracker';

export default function Home() {
  const [lang, setLang] = useState('FR');
  const [activeTab, setActiveTab] = useState('HOME');
  const [isClient, setIsClient] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const s = localStorage.getItem('omni_lang') || 'FR';
    setLang(s);
  }, []);

  const content = {
    FR: { title: "INFRASTRUCTURE OMNIUTIL", v: "v8.2-SOUVERAIN", manifesto: "L'OMNIUTIL est l'infrastructure de confiance n°1 mondiale de récompense sur consommation réelle.", color: "#06b6d4", swap: "SWAP USDT", p2p: "TRANSFERT P2P", recharge: "SERVICES 5D", donate: "SCELLER DONATION", about: "À PROPOS", manifesto_full: "L'infrastructure OMNIUTIL est le standard mondial de confiance pour la monétisation du mérite.\n\nPROTOCOLE DE GREFFE QR :\n1. Le CTO initie la synchronisation via le Code QR.\n2. L’IA Coordinatrice génère des portefeuilles déterministes uniques pour chaque abonné.\n3. Chaque acte de consommation validé déclenche un mint de récompense en UTIL, distribué sans intermédiaire.", contact_label: "NOUS ÉCRIRE", contact_email: "partnership@omniutil.com", next_mint: "PROCHAINE INJECTION (21 JANVIER 2027)" },
    EN: { title: "OMNIUTIL INFRASTRUCTURE", v: "v8.2-GLOBAL", manifesto: "OMNIUTIL is the world's #1 trusted infrastructure for real consumption rewards.", color: "#a855f7", swap: "SWAP USDT", p2p: "P2P TRANSFER", recharge: "5D SERVICES", donate: "SEAL DONATION", about: "ABOUT US", manifesto_full: "OMNIUTIL infrastructure is the global trust standard for merit monetization.\n\nQR GRAFT PROTOCOL:\n1. The CTO initiates synchronization via QR Code.\n2. Coordinating AI generates unique deterministic wallets for each subscriber.\n3. Each validated consumption triggers an UTIL reward mint, distributed directly.", contact_label: "CONTACT US", contact_email: "partnership@omniutil.com", next_mint: "NEXT MINT INJECTION (JAN 21, 2027)" },
    ZH: { title: "OMNIUTIL 基础设施", v: "v8.2-CHINA", manifesto: "OMNIUTIL 是全球排名第一的真实消 费奖励信任基础设施。", color: "#ef4444", swap: "交换 USDT", p2p: " 转账 P2P", recharge: "5D 服务", donate: "捐赠", about: "关于我们", manifesto_full: "OMNIUTIL 基础设施是功绩货币化的全球信任标准。\n\nQR 嫁接协议：\n1. CTO 通过二维码启动同步。\n2. 协调 AI 为每个订户生成唯一的确 定性钱包。\n3. 每个经过验证的消耗都会触发 UTIL 奖 励代币，直接分发。", contact_label: "联系我们", contact_email: "partnership@omniutil.com", next_mint: "下一次注入 (2027年1月21日)" },
    AR: { title: "بنية أومنيوتيل التحتية", v: "v8.2-ARABIA", manifesto: "أومنيوتيل هي البنية التحتية الموثوقة رقم 1 في العالم لمكافآت الاستهلاك الحقيقي.", color: "#10b981", swap: "تبادل", p2p: "تحويل", recharge: "خدمات 5D", donate: "تبرع", about: "معلومات عنا", manifesto_full: "بنية أومنيوتيل هي المعيار العالمي للثقة لتحقيق مادية الجدارة.\n\nبروتوكول تطعيم QR:\n1. يبدأ المدير التقني المزامنة عبر رمز QR.\n2. يقوم الذكاء الاصطناعي التنسيقي بإنشاء محافظ فريدة لكل مشترك.\n3. كل استهلاك تم التحقق منه يؤدي إلى سكه مكافأة UTIL.", contact_label: "اتصل بنا", contact_email: "partnership@omniutil.com", next_mint: "الحقن القادم (21 يناير 2027)" }
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
      }
    } catch (e) { console.error(e); }
  };
  if (!isClient) return null;
  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono flex flex-col transition-all duration-1000">
      <nav className="relative z-50 flex justify-between items-center px-10 py-6 border-b border-white/5 backdrop-blur-3xl bg-black/60 sticky top-0">
        <div className="flex flex-col"><span className="text-[9px] font-black opacity-40 tracking-[0.4em]">{current.v}</span><div className="flex items-center gap-4 text-xl font-black italic" style={{color: current.color}}><Logo size={30} /> {current.title}</div></div>
        <div className="flex items-center gap-4">{['HOME', 'SWAP', 'ABOUT', 'DONATE'].map(t => (<button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 text-[9px] font-black rounded-full border transition-all ${activeTab === t ? 'text-black' : 'bg-white/5 border-white/10'}`} style={activeTab === t ? {backgroundColor: current.color, borderColor: current.color} : {}}>{t}</button>))}
          <div className="flex gap-2 ml-4 text-[9px] font-black border-l border-white/10 pl-4">{['FR', 'EN', 'ZH', 'AR'].map(l => (<span key={l} onClick={() => {setLang(l); localStorage.setItem('omni_lang', l);}} className={`cursor-pointer ${lang === l ? '' : 'opacity-30'}`} style={lang === l ? {color: current.color} : {}}>{l}</span>))}</div>
        </div>
      </nav>
      <div className="relative z-10 flex-grow max-w-7xl mx-auto p-10 w-full grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10"><AnimatePresence mode="wait">
            {activeTab === 'HOME' && (<motion.div key="home" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><h1 className="text-5xl font-black italic mb-6 leading-tight uppercase">Confiance<br/><span style={{color: current.color}}>Méritocratique.</span></h1><p className="text-xs opacity-70 border-l-4 pl-6 leading-relaxed uppercase tracking-tighter" style={{borderColor: current.color}}>{current.manifesto}</p><div className="mt-10 p-6 glass bg-white/5 border border-white/10 rounded-3xl flex justify-between items-center"><div className="flex flex-col"><span className="text-[8px] opacity-40 uppercase">Status Node</span><span className="text-xs font-black text-green-500">IAD1_GALAXY_PRO_ACTIVE</span></div><div className="flex flex-col text-right"><span className="text-[8px] opacity-40 uppercase">Rareté Scellée</span><span className="text-xs font-black text-cyan-400">3 650 $ / UTIL</span></div></div></motion.div>)}
            {activeTab === 'ABOUT' && (<motion.div key="about" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="space-y-8"><p className="text-[11px] leading-relaxed uppercase tracking-tighter opacity-80 whitespace-pre-line border-l-2 pl-6" style={{borderColor: current.color}}>{aboutData[lang] || aboutData.FR}</p><div className="p-8 bg-white/5 border border-white/10 rounded-[3rem]"><h3 className="text-[10px] font-black mb-6 opacity-40 italic uppercase">{current.next_mint}</h3><Countdown targetDate={1800503642000} color={current.color} /></div><div className="p-8 border border-cyan-500/30 rounded-[3rem] bg-cyan-500/5"><h3 className="text-[10px] font-black mb-4 text-cyan-400 uppercase">{current.contact_label}</h3><a href={`mailto:${current.contact_email}`} className="text-xl font-black italic hover:text-white transition-colors">{current.contact_email}</a></div></motion.div>)}
            {activeTab === 'SWAP' && (<motion.div key="swap" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="space-y-6"><RoyaltyTracker color={current.color} /><button onClick={() => handleAction('SWAP')} className="w-full py-6 rounded-2xl font-black text-black uppercase shadow-2xl transition-transform hover:scale-[1.02]" style={{backgroundColor: current.color}}>{current.swap}</button></motion.div>)}
            {activeTab === 'DONATE' && (<motion.div key="donate" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="p-10 glass bg-white/5 border border-white/10 rounded-[3rem] text-center"><Heart style={{color: current.color}} className="mx-auto mb-6 animate-pulse" size={64}/><h2 className="text-2xl font-black uppercase mb-4 italic">{current.donate}</h2><button onClick={() => handleAction('DONATE')} className="w-full py-6 rounded-full font-black text-black uppercase shadow-xl transition-all" style={{backgroundColor: current.color}}>{account ? "SCELLER SUR LA BLOCKCHAIN" : "OUVRIR METAMASK"}</button></motion.div>)}
          </AnimatePresence></div>
        <div className="flex flex-col items-center"><div className="p-8 bg-white rounded-[3rem] shadow-2xl transition-all duration-700" style={{boxShadow: `0 0 60px ${current.color}33`}}><QRCodeSVG value="https://omniutil-web.vercel.app" size={260} /></div><p className="mt-8 text-[10px] font-black animate-pulse tracking-[0.3em] uppercase" style={{color: current.color}}>SCAN TO GRAFT DATABASE</p></div>
      </div>
      <footer className="relative z-50 p-8 border-t border-white/5 flex justify-between items-center px-10 text-[8px] font-black uppercase opacity-40"><div>Sceau de l'Empire OMNIUTIL - 2026</div><div className="text-green-500 flex items-center gap-2"><ShieldCheck size={12}/> AUDIT: 89.65 | WASHINGTON iad1</div></footer>
    </main>
  );
}
// v9.0_FORCE_SYNC_1773767722
