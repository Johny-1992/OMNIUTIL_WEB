"use client";
import { aboutData } from './about-content';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Repeat, Send, ShieldCheck, Heart, Globe, Activity, Terminal, Cpu, Radio, Satellite, Lock, ChevronRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Logo from '../components/Logo';
import Countdown from '../components/Countdown';
import RoyaltyTracker from '../components/RoyaltyTracker';
import MilitaryGrid from '../components/MilitaryGrid';
import RadarHUD from '../components/RadarHUD';

// Military OS transition variants
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    filter: 'blur(10px)'
  },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    filter: 'blur(10px)',
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  }
};

export default function Home() {
  const [lang, setLang] = useState('FR');
  const [activeTab, setActiveTab] = useState('HOME');
  const [isClient, setIsClient] = useState(false);
  const [account, setAccount] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setIsClient(true);
    const s = localStorage.getItem('omni_lang') || 'FR';
    setLang(s);
    
    // Real-time clock for military aesthetic
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }) + ' UTC');
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // PRESERVED: All original multilingual content
  const content = {
    FR: { title: "INFRASTRUCTURE OMNIUTIL", v: "v9.0-SOUVERAIN", manifesto: "L'OMNIUTIL est l'infrastructure de confiance n°1 mondiale de récompense sur consommation réelle.", color: "#06b6d4", swap: "SWAP USDT", p2p: "TRANSFERT P2P", recharge: "SERVICES 5D", donate: "SCELLER DONATION", about: "À PROPOS", manifesto_full: "L'infrastructure OMNIUTIL est le standard mondial de confiance pour la monétisation du mérite.\n\nPROTOCOLE DE GREFFE QR :\n1. Le CTO initie la synchronisation via le Code QR.\n2. L'IA Coordinatrice génère des portefeuilles déterministes uniques pour chaque abonné.\n3. Chaque acte de consommation validé déclenche un mint de récompense en UTIL, distribué sans intermédiaire.", contact_label: "NOUS ÉCRIRE", contact_email: "partnership@omniutil.com", next_mint: "PROCHAINE INJECTION (21 JANVIER 2027)" },
    EN: { title: "OMNIUTIL INFRASTRUCTURE", v: "v9.0-GLOBAL", manifesto: "OMNIUTIL is the world's #1 trusted infrastructure for real consumption rewards.", color: "#06b6d4", swap: "SWAP USDT", p2p: "P2P TRANSFER", recharge: "5D SERVICES", donate: "SEAL DONATION", about: "ABOUT US", manifesto_full: "OMNIUTIL infrastructure is the global trust standard for merit monetization.\n\nQR GRAFT PROTOCOL:\n1. The CTO initiates synchronization via QR Code.\n2. Coordinating AI generates unique deterministic wallets for each subscriber.\n3. Each validated consumption triggers an UTIL reward mint, distributed directly.", contact_label: "CONTACT US", contact_email: "partnership@omniutil.com", next_mint: "NEXT MINT INJECTION (JAN 21, 2027)" },
    ZH: { title: "OMNIUTIL 基础设施", v: "v9.0-CHINA", manifesto: "OMNIUTIL 是全球排名第一的真实消费奖励信任基础设施。", color: "#06b6d4", swap: "交换 USDT", p2p: "转账 P2P", recharge: "5D 服务", donate: "捐赠", about: "关于我们", manifesto_full: "OMNIUTIL 基础设施是功绩货币化的全球信任标准。\n\nQR 嫁接协议：\n1. CTO 通过二维码启动同步。\n2. 协调 AI 为每个订户生成唯一的确定性钱包。\n3. 每个经过验证的消耗都会触发 UTIL 奖励代币，直接分发。", contact_label: "联系我们", contact_email: "partnership@omniutil.com", next_mint: "下一次注入 (2027年1月21日)" },
    AR: { title: "بنية أومنيوتيل التحتية", v: "v9.0-ARABIA", manifesto: "أومنيوتيل هي البنية التحتية الموثوقة رقم 1 في العالم لمكافآت الاستهلاك الحقيقي.", color: "#06b6d4", swap: "تبادل", p2p: "تحويل", recharge: "خدمات 5D", donate: "تبرع", about: "معلومات عنا", manifesto_full: "بنية أومنيوتيل هي المعيار العالمي للثقة لتحقيق مادية الجدارة.\n\nبروتوكول تطعيم QR:\n1. يبدأ المدير التقني المزامنة عبر رمز QR.\n2. يقوم الذكاء الاصطناعي التنسيقي بإنشاء محافظ فريدة لكل مشترك.\n3. كل استهلاك تم التحقق منه يؤدي إلى سكه مكافأة UTIL.", contact_label: "اتصل بنا", contact_email: "partnership@omniutil.com", next_mint: "الحقن القادم (21 يناير 2027)" }
  };
  
  const current = content[lang] || content.FR;
  
  // PRESERVED: Original MetaMask logic
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
    <main className="min-h-screen bg-[#010409] text-white font-mono flex flex-col relative overflow-hidden">
      {/* 3D Military Grid Background */}
      <MilitaryGrid />
      
      {/* Top Status Bar - Military HUD Style */}
      <div className="relative z-50 px-4 py-2 border-b border-cyan-500/10 bg-black/40 backdrop-blur-xl flex items-center justify-between text-[9px] font-bold tracking-widest">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 status-active" />
            <span className="text-green-500">SYSTEM ONLINE</span>
          </div>
          <div className="h-3 w-px bg-cyan-500/20" />
          <span className="text-cyan-500/60">{currentTime}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-cyan-500/60">NODE: IAD1_WASHINGTON</span>
          <div className="h-3 w-px bg-cyan-500/20" />
          <span className="text-cyan-500/60">AUDIT: 89.65%</span>
          <div className="h-3 w-px bg-cyan-500/20" />
          <span className="text-amber-500">3 650 $ / UTIL</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-6 md:px-10 py-4 border-b border-cyan-500/10 glass-military sticky top-0">
        {/* Logo & Title */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-cyan-500/40 tracking-[0.5em]">{current.v}</span>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Logo size={32} />
              <div className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-md -z-10" />
            </div>
            <span className="text-lg md:text-xl font-black tracking-tight text-cyan-400">{current.title}</span>
          </div>
        </div>
        
        {/* Tab Navigation - Military Style */}
        <div className="flex items-center gap-2 md:gap-4">
          {['HOME', 'SWAP', 'ABOUT', 'DONATE'].map((t) => (
            <motion.button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`relative px-3 md:px-5 py-2 text-[9px] md:text-[10px] font-black tracking-wider transition-all duration-300 ${
                activeTab === t 
                  ? 'text-black bg-cyan-500 rounded-sm' 
                  : 'text-cyan-500/70 hover:text-cyan-400 border border-cyan-500/20 hover:border-cyan-500/40 rounded-sm bg-black/40'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === t && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-cyan-500 rounded-sm -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="flex items-center gap-1">
                <ChevronRight size={10} className={activeTab === t ? 'text-black' : 'text-cyan-500/50'} />
                {t}
              </span>
            </motion.button>
          ))}
          
          {/* Language Selector */}
          <div className="flex gap-1 md:gap-2 ml-2 md:ml-4 text-[9px] font-black border-l border-cyan-500/20 pl-2 md:pl-4">
            {['FR', 'EN', 'ZH', 'AR'].map(l => (
              <motion.span
                key={l}
                onClick={() => { setLang(l); localStorage.setItem('omni_lang', l); }}
                className={`cursor-pointer px-2 py-1 rounded-sm transition-all ${
                  lang === l 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' 
                    : 'text-cyan-500/30 hover:text-cyan-500/60'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {l}
              </motion.span>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 flex-grow max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16 w-full grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        
        {/* Left Content Panel */}
        <div className="space-y-8">
          <AnimatePresence mode="wait">
            
            {/* HOME Tab */}
            {activeTab === 'HOME' && (
              <motion.div
                key="home"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-8"
              >
                {/* Hero Title */}
                <motion.div variants={staggerContainer} initial="initial" animate="animate">
                  <motion.div variants={staggerItem} className="flex items-center gap-2 mb-4">
                    <Terminal size={14} className="text-cyan-500" />
                    <span className="text-[10px] font-bold text-cyan-500/60 tracking-widest">COMMAND INTERFACE</span>
                  </motion.div>
                  <motion.h1 
                    variants={staggerItem}
                    className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight"
                  >
                    <span className="text-white/90">Confiance</span>
                    <br />
                    <span className="text-cyan-400 relative">
                      Méritocratique.
                      <div className="absolute -inset-2 bg-cyan-500/10 blur-xl -z-10" />
                    </span>
                  </motion.h1>
                </motion.div>

                {/* Manifesto */}
                <motion.div 
                  variants={staggerItem}
                  className="relative glass-military p-6 rounded-lg"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent rounded-l-lg" />
                  <p className="text-[11px] leading-relaxed text-cyan-100/70 uppercase tracking-wide pl-4">
                    {current.manifesto}
                  </p>
                </motion.div>

                {/* Status Panel */}
                <motion.div 
                  variants={staggerItem}
                  className="glass-military p-6 rounded-lg liquid-reflection"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] text-cyan-500/40 uppercase tracking-widest flex items-center gap-2">
                        <Satellite size={10} />
                        Status Node
                      </span>
                      <span className="text-sm font-black text-green-500 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 status-active" />
                        IAD1_GALAXY_PRO_ACTIVE
                      </span>
                    </div>
                    <div className="flex flex-col text-right gap-1">
                      <span className="text-[8px] text-cyan-500/40 uppercase tracking-widest flex items-center justify-end gap-2">
                        <Lock size={10} />
                        Rareté Scellée
                      </span>
                      <span className="text-sm font-black text-amber-400">3 650 $ / UTIL</span>
                    </div>
                  </div>
                </motion.div>

                {/* Data Stream Indicator */}
                <motion.div variants={staggerItem} className="flex items-center gap-4 text-[9px] text-cyan-500/50">
                  <div className="flex items-center gap-2">
                    <Radio size={12} className="animate-pulse" />
                    <span>LIVE TELEMETRY</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                  <span>1,000,000 UTIL / CYCLE</span>
                </motion.div>
              </motion.div>
            )}

            {/* ABOUT Tab */}
            {activeTab === 'ABOUT' && (
              <motion.div
                key="about"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Cpu size={14} className="text-cyan-500" />
                  <span className="text-[10px] font-bold text-cyan-500/60 tracking-widest">PROTOCOL DOCUMENTATION</span>
                </div>

                {/* About Content - Using aboutData */}
                <div className="glass-military p-6 rounded-lg relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent rounded-l-lg" />
                  <p className="text-[10px] leading-relaxed text-cyan-100/70 uppercase tracking-wide whitespace-pre-line pl-4 font-mono">
                    {aboutData[lang] || aboutData.FR}
                  </p>
                </div>

                {/* Countdown Panel */}
                <div className="glass-military p-6 rounded-lg">
                  <h3 className="text-[10px] font-bold text-cyan-500/60 tracking-widest mb-6 flex items-center gap-2">
                    <Zap size={12} />
                    {current.next_mint}
                  </h3>
                  <Countdown targetDate={1800503642000} color="#06b6d4" />
                </div>

                {/* Contact Panel */}
                <div className="glass-military p-6 rounded-lg border-cyan-500/30">
                  <h3 className="text-[10px] font-bold text-cyan-500 tracking-widest mb-4 flex items-center gap-2">
                    <Globe size={12} />
                    {current.contact_label}
                  </h3>
                  <a 
                    href={`mailto:${current.contact_email}`} 
                    className="text-lg font-black text-cyan-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {current.contact_email}
                  </a>
                </div>
              </motion.div>
            )}

            {/* SWAP Tab */}
            {activeTab === 'SWAP' && (
              <motion.div
                key="swap"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Repeat size={14} className="text-cyan-500" />
                  <span className="text-[10px] font-bold text-cyan-500/60 tracking-widest">EXCHANGE TERMINAL</span>
                </div>

                <RoyaltyTracker color="#06b6d4" />

                <motion.button
                  onClick={() => handleAction('SWAP')}
                  className="w-full py-5 rounded-lg font-black text-black uppercase tracking-wider btn-military text-sm"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Repeat size={16} />
                    {current.swap}
                  </span>
                </motion.button>

                {/* Swap Info */}
                <div className="glass-military p-4 rounded-lg text-[9px] text-cyan-500/60 space-y-2">
                  <div className="flex justify-between">
                    <span>Exchange Rate</span>
                    <span className="text-cyan-400">1 UTIL = 3,650 USDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Network Fee</span>
                    <span className="text-cyan-400">0.001 BNB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Slippage</span>
                    <span className="text-green-500">0.5%</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* DONATE Tab */}
            {activeTab === 'DONATE' && (
              <motion.div
                key="donate"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Heart size={14} className="text-cyan-500" />
                  <span className="text-[10px] font-bold text-cyan-500/60 tracking-widest">DONATION PROTOCOL</span>
                </div>

                <div className="glass-military p-8 rounded-lg text-center space-y-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="mx-auto text-cyan-500" size={64} />
                  </motion.div>
                  
                  <h2 className="text-2xl font-black uppercase tracking-wide text-cyan-400">
                    {current.donate}
                  </h2>
                  
                  <p className="text-[10px] text-cyan-500/60 uppercase tracking-wide">
                    Secure blockchain transaction via MetaMask
                  </p>

                  <motion.button
                    onClick={() => handleAction('DONATE')}
                    className="w-full py-5 rounded-lg font-black text-black uppercase tracking-wider btn-military text-sm"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Lock size={16} />
                      {account ? "SCELLER SUR LA BLOCKCHAIN" : "OUVRIR METAMASK"}
                    </span>
                  </motion.button>

                  {account && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] text-green-500 font-mono"
                    >
                      Connected: {account.slice(0, 6)}...{account.slice(-4)}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right Panel - QR Code with Radar HUD */}
        <motion.div 
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <RadarHUD size={260}>
            <QRCodeSVG 
              value="https://omniutil.is-a.dev" 
              size={260}
              level="H"
              includeMargin={false}
            />
          </RadarHUD>
          
          <motion.p 
            className="mt-8 text-[10px] font-black tracking-[0.3em] uppercase text-cyan-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SCAN TO GRAFT DATABASE
          </motion.p>
          
          {/* Additional HUD Info */}
          <div className="mt-6 flex items-center gap-6 text-[8px] text-cyan-500/50 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <ShieldCheck size={10} />
              <span>256-BIT ENCRYPTED</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={10} />
              <span>LIVE SYNC</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-50 px-6 md:px-10 py-4 border-t border-cyan-500/10 glass-military">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-4 text-cyan-500/40">
            <span>Sceau de l'Empire OMNIUTIL - 2026</span>
            <div className="h-3 w-px bg-cyan-500/20 hidden md:block" />
            <span className="hidden md:inline">INFRASTRUCTURE MONDIALE DE CONFIANCE</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-green-500">
              <ShieldCheck size={12} />
              <span>AUDIT: 89.65%</span>
            </div>
            <div className="h-3 w-px bg-cyan-500/20" />
            <div className="flex items-center gap-2 text-cyan-500/60">
              <Satellite size={12} />
              <span>WASHINGTON IAD1</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
// v9.0_FORCE_SYNC_1773767722
// OMNI_SCELLEMENT_1773843243
// OMNI_SYNC_CONTENT_1773874468
// PROD_FORCE_DEPLOY_1774141131
