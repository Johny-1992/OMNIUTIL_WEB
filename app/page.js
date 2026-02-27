"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, Cpu, Zap, Activity, Share2 } from 'lucide-react';
import Logo from '../components/Logo';
import RewardSimulator from '../components/RewardSimulator';
import FortuneCounter from '../components/FortuneCounter';
import OmniQrGate from '../components/OmniQrGate';

export default function Home() {
  const [activeTab, setActiveTab] = useState('DASHBOARD');

  return (
    <main className="min-h-screen bg-[#020617] text-cyan-400 font-mono overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* 🛡️ BANNIÈRE SUPPRIMÉE ICI (DÉJÀ DANS LAYOUT.JS) POUR ÉVITER LE DOUBLON */}

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black z-0"></div>

      {/* NAVIGATION INTERACTIVE STYLE BINANCE */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-6 border-b border-cyan-500/20 backdrop-blur-md sticky top-0 bg-black/40">
        <div className="text-2xl font-black italic tracking-tighter text-white flex items-center gap-3">
          <Logo size={32} /> OMNIUTIL<span className="text-cyan-500">.IO</span>
        </div>
        <div className="flex gap-6">
          {['DASHBOARD', 'PARTENARIAT', 'SIMULATEUR'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] font-black tracking-[0.2em] transition-all ${activeTab === tab ? 'text-cyan-400 border-b border-cyan-400' : 'opacity-40 hover:opacity-100'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-12">
        <AnimatePresence mode="wait">
          {activeTab === 'DASHBOARD' && (
            <motion.div key="dash" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="space-y-12">
              <FortuneCounter />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-cyan-500/30 p-8 rounded-3xl backdrop-blur-xl group hover:border-cyan-400 transition-all">
                   <Cpu className="text-cyan-400 mb-4" size={32} />
                   <h3 className="text-white font-bold mb-2 uppercase">AI Coordinator Status</h3>
                   <p className="text-sm opacity-60">GOD_MODE_ACTIVE | Washington D.C. Node</p>
                </div>
                <div className="bg-white/5 border border-purple-500/30 p-8 rounded-3xl backdrop-blur-xl group hover:border-purple-400 transition-all">
                   <Shield className="text-purple-400 mb-4" size={32} />
                   <h3 className="text-white font-bold mb-2 uppercase">Security Protocol</h3>
                   <p className="text-sm opacity-60">NEMESIS_RECOVERY Enabled | SHA-256 Sealed</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'PARTENARIAT' && (
            <motion.div key="part" initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{opacity:1.1, opacity:0}} className="flex flex-col items-center py-10">
              <h2 className="text-white text-3xl font-black italic mb-10 uppercase tracking-tighter">Portail d'Adhésion</h2>
              <OmniQrGate />
              <p className="mt-8 text-[10px] opacity-40 uppercase tracking-[0.4em] animate-pulse">Scan requis pour Airtel, Canal+, Amazon & Tiers</p>
            </motion.div>
          )}

          {activeTab === 'SIMULATEUR' && (
            <motion.div key="sim" initial={{x:50, opacity:0}} animate={{x:0, opacity:1}} exit={{x:-50, opacity:0}} className="max-w-3xl mx-auto">
              <RewardSimulator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="relative z-10 py-20 text-center opacity-20 text-[9px] tracking-[1em] uppercase">
        © OMNIUTIL SUPREME INFRASTRUCTURE 2026
      </footer>
    </main>
  );
}
