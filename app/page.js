"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function OmniSupreme() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500 overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black z-0"></div>
      <nav className="relative z-50 flex justify-between p-6 border-b border-white/5 backdrop-blur-xl">
        <div className="text-2xl font-black tracking-tighter text-cyan-400 italic underline decoration-cyan-500/50">OMNIUTIL.IO</div>
        <div className="flex gap-8 text-[10px] tracking-[0.3em] uppercase opacity-60">
          <span>Global_Protocol: Active</span>
          <span className="text-green-400 animate-pulse">Live_Sync: OK</span>
        </div>
      </nav>
      <main className="relative z-10 pt-24 px-10 text-center">
        <motion.h1 initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase mb-6">
          World <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">No.1</span> Reward.
        </motion.h1>
        <p className="text-xl opacity-50 max-w-2xl mx-auto mb-12">L'infrastructure OMNIUTIL transforme la consommation réelle en actifs financiers liquides 24h/7j.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto border border-white/10 p-2 rounded-[2rem] bg-white/5 backdrop-blur-3xl shadow-2xl">
            <div className="p-10 border-white/10 border-r text-center">
                <h3 className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Statut IA</h3>
                <p className="text-3xl font-bold text-cyan-400">GOD_MODE</p>
            </div>
            <div className="p-10 border-white/10 border-r text-center">
                <h3 className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Flux Airtel/Canal</h3>
                <p className="text-3xl font-bold">5,000,000 +</p>
            </div>
            <div className="p-10 text-center">
                <h3 className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Audit Supply</h3>
                <p className="text-3xl font-bold text-green-500 italic">VERIFIED</p>
            </div>
        </div>
      </main>
      <footer className="fixed bottom-6 w-full text-center text-[8px] opacity-20 uppercase tracking-[1.5em]">
        Omniprésence - Invincibilité - 2026
      </footer>
    </div>
  );
}
