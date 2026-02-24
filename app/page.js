"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, Cpu, Zap, Check, X, Clock } from 'lucide-react';
import Logo from '../components/Logo';
import RewardSimulator from '../components/RewardSimulator';
import FortuneCounter from '../components/FortuneCounter';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-cyan-400 font-mono p-4 md:p-10 overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black z-0"></div>
      
      <nav className="relative z-10 flex justify-between items-center mb-12 border-b border-cyan-500/20 pb-6 backdrop-blur-md">
        <div className="text-3xl font-black italic tracking-tighter text-white flex items-center gap-3">
          <Logo size={40} /> OMNIUTIL<span className="text-cyan-500">.IO</span>
        </div>
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em]">
          <span className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div> 
            Infra: Ready
          </span>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Ton Compteur de Fortune Live */}
        <FortuneCounter />
        
        {/* Ton Simulateur de Gains RWA */}
        <RewardSimulator />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-cyan-500/30 p-8 rounded-3xl backdrop-blur-xl">
             <Cpu className="text-cyan-400 mb-4" size={32} />
             <h3 className="text-white font-bold mb-2">AI Coordinator Status</h3>
             <p className="text-sm opacity-60">GOD_MODE_ACTIVE | Washington D.C. Node</p>
          </div>
          <div className="bg-white/5 border border-purple-500/30 p-8 rounded-3xl backdrop-blur-xl">
             <Shield className="text-purple-400 mb-4" size={32} />
             <h3 className="text-white font-bold mb-2">Security Protocol</h3>
             <p className="text-sm opacity-60">NEMESIS_RECOVERY Enabled | SHA-256 Sealed</p>
          </div>
        </div>
      </div>
    </main>
  );
}
