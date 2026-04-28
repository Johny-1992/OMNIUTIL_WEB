"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Shield, Globe, Activity, Heart, ArrowRight, 
  QrCode, Wallet, Send, RefreshCw, Users, TrendingUp,
  Lock, Cpu, Network, Eye, Scan, ChevronRight, Check,
  Copy, ExternalLink, ShieldCheck
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// ==================== TRANSLATIONS ====================
const translations = {
  fr: {
    nav: { home: 'ACCUEIL', swap: 'SWAP', transfer: 'TRANSFERT', donate: 'DON', about: 'A PROPOS' },
    hero: {
      badge: 'INFRASTRUCTURE SOUVERAINE v9.0',
      title: 'OMNIUTIL',
      subtitle: 'EMPIRE',
      description: 'Infrastructure hyper-intelligente de recompense sur consommation reelle. Confiance meritocratique mondiale.',
      cta: 'SCANNER POUR GREFFER',
      status: 'NODE IAD1 ACTIF'
    },
    stats: {
      price: 'PRIX UTIL', rewards: 'RECOMPENSES DISTRIBUEES', users: 'ABONNES ACTIFS', ecosystems: 'ECOSYSTEMES'
    },
    features: {
      title: 'PUISSANCE QUANTIQUE',
      speed: { title: 'HYPER RAPIDITE', desc: 'Transactions en temps reel avec latence proche de zero' },
      intel: { title: 'HYPER INTELLIGENCE', desc: 'IA Coordinatrice evaluant et validant chaque merite' },
      power: { title: 'ULTRA PUISSANCE', desc: 'Capacite de traitement de millions de transactions' },
      security: { title: 'ULTRA SECURITE', desc: 'Cryptographie quantique et audit Washington verifie' }
    },
    graft: {
      title: 'PROTOCOLE DE GREFFE',
      subtitle: 'Connectez votre ecosysteme a la logique mere',
      ecosystem: 'Nom Ecosysteme',
      api: 'API Endpoint',
      rate: 'Taux de Recompense (%)',
      submit: 'INITIER LA GREFFE',
      success: 'DEMANDE TRANSMISE'
    },
    swap: {
      title: 'SWAP INSTANTANE',
      from: 'DE', to: 'VERS', amount: 'Montant', execute: 'EXECUTER LE SWAP'
    },
    transfer: {
      title: 'TRANSFERT P2P',
      recipient: 'Adresse Destinataire', amount: 'Montant UTIL', send: 'ENVOYER'
    },
    donate: {
      title: 'SCELLER UNE DONATION',
      desc: 'Contribuez a l empire OMNIUTIL',
      connect: 'CONNECTER WALLET',
      seal: 'SCELLER SUR BLOCKCHAIN'
    },
    about: {
      title: 'PROTOCOLE INDUSTRIEL',
      contract: 'CONTRAT', owner: 'OWNER', treasury: 'TREASURY', token: 'TOKEN', royalty: 'ROYALTY'
    },
    footer: {
      audit: 'AUDIT: 89.65 | WASHINGTON IAD1',
      copy: 'SCEAU DE L EMPIRE OMNIUTIL - 2040'
    }
  },
  en: {
    nav: { home: 'HOME', swap: 'SWAP', transfer: 'TRANSFER', donate: 'DONATE', about: 'ABOUT' },
    hero: {
      badge: 'SOVEREIGN INFRASTRUCTURE v9.0',
      title: 'OMNIUTIL',
      subtitle: 'EMPIRE',
      description: 'Hyper-intelligent infrastructure for real consumption rewards. Global meritocratic trust.',
      cta: 'SCAN TO GRAFT',
      status: 'NODE IAD1 ACTIVE'
    },
    stats: {
      price: 'UTIL PRICE', rewards: 'REWARDS DISTRIBUTED', users: 'ACTIVE USERS', ecosystems: 'ECOSYSTEMS'
    },
    features: {
      title: 'QUANTUM POWER',
      speed: { title: 'HYPER SPEED', desc: 'Real-time transactions with near-zero latency' },
      intel: { title: 'HYPER INTELLIGENCE', desc: 'Coordinating AI evaluating and validating each merit' },
      power: { title: 'ULTRA POWER', desc: 'Millions of transactions processing capacity' },
      security: { title: 'ULTRA SECURITY', desc: 'Quantum cryptography and Washington audit verified' }
    },
    graft: {
      title: 'GRAFT PROTOCOL',
      subtitle: 'Connect your ecosystem to the mother logic',
      ecosystem: 'Ecosystem Name',
      api: 'API Endpoint',
      rate: 'Reward Rate (%)',
      submit: 'INITIATE GRAFT',
      success: 'REQUEST TRANSMITTED'
    },
    swap: {
      title: 'INSTANT SWAP',
      from: 'FROM', to: 'TO', amount: 'Amount', execute: 'EXECUTE SWAP'
    },
    transfer: {
      title: 'P2P TRANSFER',
      recipient: 'Recipient Address', amount: 'UTIL Amount', send: 'SEND'
    },
    donate: {
      title: 'SEAL A DONATION',
      desc: 'Contribute to the OMNIUTIL empire',
      connect: 'CONNECT WALLET',
      seal: 'SEAL ON BLOCKCHAIN'
    },
    about: {
      title: 'INDUSTRIAL PROTOCOL',
      contract: 'CONTRACT', owner: 'OWNER', treasury: 'TREASURY', token: 'TOKEN', royalty: 'ROYALTY'
    },
    footer: {
      audit: 'AUDIT: 89.65 | WASHINGTON IAD1',
      copy: 'SEAL OF OMNIUTIL EMPIRE - 2040'
    }
  }
};

// ==================== CONSTANTS ====================
const CONTRACTS = {
  main: '0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B',
  owner: '0x40BB46B9D10Dd121e7D2150EC3784782ae648090',
  treasury: '0xB13B61a6a84ABfAEfF17E92E41ee6F0eBF42693B'
};

// ==================== COMPONENTS ====================

function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="50%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#00ff88" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d="M50 5L93.3 30V70L50 95L6.7 70V30L50 5Z" fill="#020617" stroke="url(#logoGradient)" strokeWidth="3" filter="url(#glow)"/>
      <circle cx="50" cy="50" r="22" stroke="#00d4ff" strokeWidth="2" fill="none" opacity="0.5"/>
      <circle cx="50" cy="50" r="15" stroke="#d946ef" strokeWidth="1.5" fill="none" opacity="0.3"/>
      <path d="M50 32L42 52H50L46 68L58 46H50L54 32H50Z" fill="#00d4ff" filter="url(#glow)"/>
    </svg>
  );
}

function StatusIndicator({ status, label }: { status: 'online' | 'offline'; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-400 status-online' : 'bg-red-400'}`} />
      <span className="text-[10px] font-mono font-bold tracking-widest text-green-400 uppercase">{label}</span>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, suffix, color = 'cyan' }: { 
  icon: React.ElementType; label: string; value: string; suffix?: string; color?: 'cyan' | 'magenta' | 'green' | 'gold' 
}) {
  const colorMap = {
    cyan: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
    magenta: 'text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/5',
    green: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    gold: 'text-amber-400 border-amber-500/20 bg-amber-500/5'
  };
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      className={`glass metric-glow p-6 rounded-2xl border ${colorMap[color]}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-5 h-5 ${colorMap[color].split(' ')[0]}`} />
        <span className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-black tracking-tight ${colorMap[color].split(' ')[0]}`}>{value}</span>
        {suffix && <span className="text-sm font-bold text-muted-foreground">{suffix}</span>}
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon: Icon, title, description, delay = 0 }: { 
  icon: React.ElementType; title: string; description: string; delay?: number 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
      className="holo-card hologram-scan p-6 group hover:border-cyan-500/30 transition-all duration-500"
    >
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        <h3 className="text-lg font-black tracking-tight text-white mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function NavButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-[10px] font-black tracking-widest uppercase rounded-full border transition-all duration-300 ${
        active 
          ? 'bg-cyan-500 text-black border-cyan-500 shadow-lg shadow-cyan-500/30' 
          : 'bg-transparent text-white/60 border-white/10 hover:border-cyan-500/50 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function Input({ label, placeholder, type = 'text', value, onChange }: {
  label: string; placeholder: string; type?: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-mono"
      />
    </div>
  );
}

// ==================== MAIN PAGE ====================
export default function OmniutilGodMode() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [activeTab, setActiveTab] = useState('home');
  const [isClient, setIsClient] = useState(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Form states
  const [graftForm, setGraftForm] = useState({ ecosystem: '', api: '', rate: '' });
  const [swapAmount, setSwapAmount] = useState('');
  const [transferForm, setTransferForm] = useState({ recipient: '', amount: '' });
  
  // Live metrics
  const [metrics, setMetrics] = useState({ price: 3650, rewards: 12500000, users: 850000, ecosystems: 2500 });

  const t = translations[lang];

  useEffect(() => {
    setIsClient(true);
    const savedLang = localStorage.getItem('omni_lang') as 'fr' | 'en';
    if (savedLang) setLang(savedLang);
    
    // Simulate live metrics
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        rewards: prev.rewards + Math.floor(Math.random() * 100),
        users: prev.users + Math.floor(Math.random() * 5)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLangChange = (newLang: 'fr' | 'en') => {
    setLang(newLang);
    localStorage.setItem('omni_lang', newLang);
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && (window as unknown as { ethereum?: { request: (args: { method: string }) => Promise<string[]> } }).ethereum) {
      try {
        const accounts = await (window as unknown as { ethereum: { request: (args: { method: string }) => Promise<string[]> } }).ethereum.request({ method: 'eth_requestAccounts' });
        setWallet(accounts[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert(lang === 'fr' ? 'Veuillez installer MetaMask' : 'Please install MetaMask');
    }
  };

  const copyAddress = useCallback((address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen relative">
      {/* ==================== HEADER ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo size={36} />
              <div className="hidden sm:block">
                <p className="text-[8px] font-mono font-bold tracking-[0.4em] text-muted-foreground">v9.0-SOUVERAIN</p>
                <h1 className="text-lg font-black tracking-tight text-white">OMNIUTIL <span className="text-cyan-400">EMPIRE</span></h1>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-2">
              {(['home', 'swap', 'transfer', 'donate', 'about'] as const).map(tab => (
                <NavButton key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
                  {t.nav[tab === 'transfer' ? 'transfer' : tab]}
                </NavButton>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex gap-2 text-[10px] font-black">
                {(['fr', 'en'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => handleLangChange(l)}
                    className={`px-2 py-1 rounded transition-all ${lang === l ? 'text-cyan-400' : 'text-white/30 hover:text-white/60'}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <StatusIndicator status="online" label={t.hero.status} />
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MOBILE NAV ==================== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 px-4 py-3">
        <div className="flex justify-around">
          {(['home', 'swap', 'transfer', 'donate', 'about'] as const).map(tab => {
            const icons = { home: Globe, swap: RefreshCw, transfer: Send, donate: Heart, about: Eye };
            const Icon = icons[tab];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  activeTab === tab ? 'text-cyan-400' : 'text-white/40'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[8px] font-bold tracking-wider uppercase">{t.nav[tab === 'transfer' ? 'transfer' : tab]}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="pt-24 pb-32 md:pb-16 relative z-10">
        <AnimatePresence mode="wait">
          {/* ==================== HOME TAB ==================== */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-24"
            >
              {/* HERO SECTION */}
              <section className="max-w-7xl mx-auto px-6 pt-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20"
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400">{t.hero.badge}</span>
                    </motion.div>
                    
                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-responsive-hero font-black tracking-tighter"
                    >
                      <span className="gradient-text">{t.hero.title}</span>
                      <br />
                      <span className="text-white">{t.hero.subtitle}</span>
                    </motion.h1>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg text-muted-foreground leading-relaxed max-w-lg"
                    >
                      {t.hero.description}
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-4"
                    >
                      <button className="quantum-btn px-8 py-4 rounded-xl flex items-center gap-3">
                        <Scan className="w-5 h-5" />
                        {t.hero.cta}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  </div>

                  {/* QR CODE */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <div className="quantum-float">
                      <div className="p-8 bg-white rounded-[2rem] quantum-glow-intense">
                        <QRCodeSVG 
                          value={`omniutil:graft:${CONTRACTS.main}`} 
                          size={240}
                          level="H"
                          includeMargin={false}
                        />
                      </div>
                    </div>
                    <p className="mt-6 text-[10px] font-mono font-bold tracking-[0.4em] text-cyan-400 animate-pulse">
                      {t.hero.cta}
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* METRICS */}
              <section className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard icon={TrendingUp} label={t.stats.price} value={`$${metrics.price.toLocaleString()}`} suffix="USDT" color="gold" />
                  <MetricCard icon={Zap} label={t.stats.rewards} value={metrics.rewards.toLocaleString()} suffix="UTIL" color="cyan" />
                  <MetricCard icon={Users} label={t.stats.users} value={`${(metrics.users / 1000).toFixed(0)}K`} suffix="+" color="magenta" />
                  <MetricCard icon={Network} label={t.stats.ecosystems} value={`${(metrics.ecosystems / 1000).toFixed(1)}K`} suffix="+" color="green" />
                </div>
              </section>

              {/* FEATURES */}
              <section className="max-w-7xl mx-auto px-6">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-responsive-title font-black tracking-tight text-center mb-12"
                >
                  <span className="gradient-text">{t.features.title}</span>
                </motion.h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <FeatureCard icon={Zap} title={t.features.speed.title} description={t.features.speed.desc} delay={0} />
                  <FeatureCard icon={Cpu} title={t.features.intel.title} description={t.features.intel.desc} delay={1} />
                  <FeatureCard icon={Activity} title={t.features.power.title} description={t.features.power.desc} delay={2} />
                  <FeatureCard icon={Shield} title={t.features.security.title} description={t.features.security.desc} delay={3} />
                </div>
              </section>

              {/* GRAFT FORM */}
              <section className="max-w-3xl mx-auto px-6">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="holo-card p-8 space-y-6"
                >
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black tracking-tight gradient-text">{t.graft.title}</h3>
                    <p className="text-sm text-muted-foreground">{t.graft.subtitle}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label={t.graft.ecosystem} placeholder="Airtel, Canal+, etc." value={graftForm.ecosystem} onChange={v => setGraftForm({...graftForm, ecosystem: v})} />
                    <Input label={t.graft.api} placeholder="https://api.example.com" value={graftForm.api} onChange={v => setGraftForm({...graftForm, api: v})} />
                  </div>
                  <Input label={t.graft.rate} placeholder="0.5" type="number" value={graftForm.rate} onChange={v => setGraftForm({...graftForm, rate: v})} />
                  <button className="w-full quantum-btn py-4 rounded-xl flex items-center justify-center gap-3">
                    <QrCode className="w-5 h-5" />
                    {t.graft.submit}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </section>
            </motion.div>
          )}

          {/* ==================== SWAP TAB ==================== */}
          {activeTab === 'swap' && (
            <motion.div
              key="swap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-lg mx-auto px-6 pt-12"
            >
              <div className="holo-card p-8 space-y-8">
                <h2 className="text-2xl font-black tracking-tight text-center gradient-text">{t.swap.title}</h2>
                
                <div className="space-y-4">
                  <div className="glass p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground">{t.swap.from}</span>
                      <span className="text-xs text-muted-foreground">Balance: 10,000</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input 
                        type="number" 
                        placeholder="0.00" 
                        value={swapAmount}
                        onChange={e => setSwapAmount(e.target.value)}
                        className="flex-1 bg-transparent text-3xl font-black outline-none placeholder:text-white/20"
                      />
                      <div className="px-4 py-2 bg-amber-500/20 rounded-lg text-amber-400 font-bold">USDT</div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="p-3 rounded-full glass border border-cyan-500/30 cursor-pointer hover:scale-110 transition-transform">
                      <RefreshCw className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>

                  <div className="glass p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground">{t.swap.to}</span>
                      <span className="text-xs text-muted-foreground">Balance: 0.00</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex-1 text-3xl font-black text-white/50">
                        {swapAmount ? (parseFloat(swapAmount) / 3650).toFixed(6) : '0.00'}
                      </span>
                      <div className="px-4 py-2 bg-cyan-500/20 rounded-lg text-cyan-400 font-bold">UTIL</div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  1 UTIL = <span className="text-cyan-400 font-bold">$3,650</span> USDT
                </div>

                <button onClick={connectWallet} className="w-full quantum-btn py-4 rounded-xl flex items-center justify-center gap-3">
                  <Wallet className="w-5 h-5" />
                  {wallet ? t.swap.execute : t.donate.connect}
                </button>
              </div>
            </motion.div>
          )}

          {/* ==================== TRANSFER TAB ==================== */}
          {activeTab === 'transfer' && (
            <motion.div
              key="transfer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-lg mx-auto px-6 pt-12"
            >
              <div className="holo-card p-8 space-y-8">
                <h2 className="text-2xl font-black tracking-tight text-center gradient-text">{t.transfer.title}</h2>
                
                <div className="space-y-4">
                  <Input 
                    label={t.transfer.recipient} 
                    placeholder="0x..." 
                    value={transferForm.recipient} 
                    onChange={v => setTransferForm({...transferForm, recipient: v})} 
                  />
                  <Input 
                    label={t.transfer.amount} 
                    placeholder="0.00" 
                    type="number"
                    value={transferForm.amount} 
                    onChange={v => setTransferForm({...transferForm, amount: v})} 
                  />
                </div>

                <button onClick={connectWallet} className="w-full quantum-btn py-4 rounded-xl flex items-center justify-center gap-3">
                  <Send className="w-5 h-5" />
                  {wallet ? t.transfer.send : t.donate.connect}
                </button>
              </div>
            </motion.div>
          )}

          {/* ==================== DONATE TAB ==================== */}
          {activeTab === 'donate' && (
            <motion.div
              key="donate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-lg mx-auto px-6 pt-12"
            >
              <div className="holo-card p-8 space-y-8 text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-fuchsia-400 animate-pulse" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-black tracking-tight gradient-text">{t.donate.title}</h2>
                  <p className="mt-2 text-muted-foreground">{t.donate.desc}</p>
                </div>

                <div className="glass p-4 rounded-xl text-left">
                  <p className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground mb-2">TREASURY WALLET</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs text-cyan-400 break-all">{CONTRACTS.treasury}</code>
                    <button onClick={() => copyAddress(CONTRACTS.treasury)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                    </button>
                  </div>
                </div>

                <button onClick={connectWallet} className="w-full quantum-btn py-4 rounded-xl flex items-center justify-center gap-3">
                  <Lock className="w-5 h-5" />
                  {wallet ? t.donate.seal : t.donate.connect}
                </button>

                {wallet && (
                  <p className="text-xs text-green-400 flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    {wallet.slice(0, 6)}...{wallet.slice(-4)}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* ==================== ABOUT TAB ==================== */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto px-6 pt-12 space-y-8"
            >
              <div className="text-center">
                <h2 className="text-responsive-title font-black tracking-tight gradient-text">{t.about.title}</h2>
              </div>

              <div className="holo-card p-8 space-y-6">
                {[
                  { label: t.about.contract, value: CONTRACTS.main },
                  { label: t.about.owner, value: CONTRACTS.owner },
                  { label: t.about.treasury, value: CONTRACTS.treasury },
                ].map((item) => (
                  <div key={item.label} className="glass p-4 rounded-xl">
                    <p className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground mb-2">{item.label}</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-sm text-cyan-400 break-all">{item.value}</code>
                      <button onClick={() => copyAddress(item.value)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <a href={`https://bscscan.com/address/${item.value}`} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </a>
                    </div>
                  </div>
                ))}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass p-4 rounded-xl">
                    <p className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground mb-2">{t.about.token}</p>
                    <p className="text-2xl font-black text-cyan-400">UTIL</p>
                    <p className="text-sm text-muted-foreground">1 UTIL = $3,650 USDT</p>
                  </div>
                  <div className="glass p-4 rounded-xl">
                    <p className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground mb-2">{t.about.royalty}</p>
                    <p className="text-2xl font-black text-fuchsia-400">0.5%</p>
                    <p className="text-sm text-muted-foreground">Owner Fee</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="fixed bottom-16 md:bottom-0 left-0 right-0 glass border-t border-white/5 py-4 z-40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground">{t.footer.copy}</p>
          <div className="flex items-center gap-2 text-green-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold tracking-widest">{t.footer.audit}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
