"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function OmniSupreme() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500 overflow-x-hidden">
      {/* Background Cyber-Espace */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black z-0"></div>
      
      <nav className="relative z-50 flex justify-between p-6 border-b border-white/5 backdrop-blur-xl">
        <div className="text-2xl font-black tracking-tighter text-cyan-400 italic">OMNIUTIL.IO</div>
        <div className="flex gap-8 text-[10px] tracking-widest uppercase opacity-60">
          <span>Infra: Online</span>
          <span className="text-green-400">Node: Washington iad1</span>
        </div>
      </nav>

      <main className="relative z-10 pt-20 px-10">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-6xl mx-auto">
          <h1 className="text-8xl font-black leading-none tracking-tighter mb-4 italic uppercase">
            The World's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">No.1 Reward</span> Protocol.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mb-12">L'infrastructure OMNIUTIL transforme la consommation réelle (Airtel, Canal+, Amazon) en actifs financiers liquides 24h/7j.</p>
          
          <div className="grid grid-cols-3 gap-1 mb-20 border border-white/10 rounded-3xl overflow-hidden bg-white/5 backdrop-blur-3xl">
            <div className="p-10 border-r border-white/10">
              <p className="text-xs uppercase opacity-40 mb-2">Statut IA Coordinateur</p>
              <p className="text-3xl font-bold text-green-400">OPERATIONAL</p>
            </div>
            <div className="p-10 border-r border-white/10">
              <p className="text-xs uppercase opacity-40 mb-2">Flux Partenaires Scannés</p>
              <p className="text-3xl font-bold">5,204,812 +</p>
            </div>
            <div className="p-10">
              <p className="text-xs uppercase opacity-40 mb-2">Index UTIL/USDT</p>
              <p className="text-3xl font-bold tracking-tighter">$ 1.0024</p>
            </div>
          </div>
        </motion.div>
      </main>
      
      <footer className="fixed bottom-6 w-full text-center text-[8px] opacity-20 uppercase tracking-[1em]">
        Omniprésence - Invincibilité - OMNIUTIL Supreme 2026
      </footer>
    </div>
  );
}
