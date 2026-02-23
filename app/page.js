import RewardSimulator from '../components/RewardSimulator';
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, Cpu, Zap, Check, X, Clock } from 'lucide-react';

export default function OmniConsole() {
  const [requests, setRequests] = useState([
    { id: 1, name: 'AIRTEL-RDC', users: '5M', sector: 'Telecom', status: 'PENDING', score: 92 },
    { id: 2, name: 'CANAL+ GLOBAL', users: '12M', sector: 'TV/Media', status: 'ACCEPTED', score: 98 },
    { id: 3, name: 'AMAZON GATEWAY', users: '300M', sector: 'E-Commerce', status: 'SYNCING', score: 99 }
  ]);

  return (
    <div className="min-h-screen bg-[#020617] text-cyan-400 font-mono p-4 md:p-10 overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black z-0" />
      
      <nav className="relative z-10 flex justify-between items-center mb-12 border-b border-cyan-500/20 pb-6 backdrop-blur-md">
        <div className="text-3xl font-black italic tracking-tighter text-white">OMNIUTIL<span className="text-cyan-500">.IO</span></div>
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em]">
          <span className="flex items-center gap-2"><div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"/> Infra: Ready</span>
          <span className="opacity-50">Creator: Johny-1992</span>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLONNE 1: STATS GLOBALES */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-cyan-500/30 p-6 rounded-2xl backdrop-blur-xl">
            <Cpu className="mb-4 text-cyan-400" size={32} />
            <h3 className="text-xs opacity-50 uppercase mb-2">AI Coordinator Status</h3>
            <p className="text-2xl font-bold text-white tracking-widest">GOD_MODE_ACTIVE</p>
          </div>
          <div className="bg-white/5 border border-purple-500/30 p-6 rounded-2xl backdrop-blur-xl">
            <Globe className="mb-4 text-purple-400" size={32} />
            <h3 className="text-xs opacity-50 uppercase mb-2">Global Connectivity</h3>
            <p className="text-2xl font-bold text-white tracking-widest">ANY_ECOSYSTEM_READY</p>
          </div>
        </div>

        {/* COLONNE 2 & 3: GESTION DES PARTENARIATS */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black italic uppercase text-white flex items-center gap-3">
              <Zap className="text-yellow-400" /> Console de Partenariat Universelle
            </h2>
            <span className="text-[10px] bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-500/50">LIVE_FEED</span>
          </div>

          <div className="space-y-4">
            {requests.map((req) => (
              <motion.div key={req.id} initial={{x:20, opacity:0}} animate={{x:0, opacity:1}} className="group flex items-center justify-between p-5 bg-black/40 border border-white/5 rounded-xl hover:border-cyan-500/50 transition-all">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-white tracking-tighter">{req.name}</span>
                    <span className="text-[10px] opacity-40 italic">({req.sector})</span>
                  </div>
                  <div className="text-[10px] mt-1 opacity-60">Impact: {req.users} abonnés | Score IA: {req.score}%</div>
                </div>
                
                <div className="flex gap-2">
                  {req.status === 'PENDING' ? (
                    <>
                      <button className="p-2 bg-green-500/20 border border-green-500/50 rounded-lg hover:bg-green-500 text-green-500 hover:text-white transition-all"><Check size={18}/></button>
                      <button className="p-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg hover:bg-yellow-500 text-yellow-400 hover:text-white transition-all"><Clock size={18}/></button>
                      <button className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500 text-red-500 hover:text-white transition-all"><X size={18}/></button>
                    </>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 italic px-4 py-2 border border-cyan-500/30 bg-cyan-500/10 rounded-lg">
                      {req.status}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-6 w-full text-center text-[8px] opacity-20 uppercase tracking-[1.5em] z-50">
        OMNIUTIL SUPREME - NO.1 WORLDWIDE PROTOCOL - 2026
      </footer>
    </div>
  );
}
