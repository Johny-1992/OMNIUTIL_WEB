import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function OmniGenesis() {
  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono p-10 selection:bg-cyan-500 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com')] opacity-10"></div>
      
      <motion.div initial={{y:-50, opacity:0}} animate={{y:0, opacity:1}} className="text-center mb-16 relative z-10">
        <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-cyan-700">OMNIUTIL INFRASTRUCTURE</h1>
        <p className="mt-2 text-xs tracking-[0.5em] uppercase opacity-60">Protocole No.1 Mondial de Récompenses Réelles</p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
        <div className="border-l-2 border-cyan-500 pl-6 space-y-4 bg-cyan-900/10 p-6 rounded-r-xl backdrop-blur-sm">
          <h2 className="text-xl font-bold italic">GATEWAY PARTENAIRE</h2>
          <p className="text-sm text-gray-400">Scannez pour déclencher l'évaluation IA du coordinateur.</p>
          <div className="w-48 h-48 bg-white mx-auto mt-4 rounded-lg flex items-center justify-center border-4 border-cyan-500 shadow-[0_0_30px_rgba(0,255,255,0.3)]">
            <p className="text-black text-[10px] font-bold">QR_OMNI_GATEWAY</p>
          </div>
        </div>

        <div className="border-r-2 border-purple-500 pr-6 text-right space-y-4 bg-purple-900/10 p-6 rounded-l-xl backdrop-blur-sm">
          <h2 className="text-xl font-bold italic">STATUS RÉSEAU</h2>
          <div className="text-xs space-y-2">
            <p>AIRTEL-RDC : <span className="text-green-400">SYNC_PENDING</span></p>
            <p>CANAL+ : <span className="text-green-400">CONNECTED</span></p>
            <p>AMAZON_GATE : <span className="text-yellow-400">SCANNING...</span></p>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-4 w-full text-center text-[10px] tracking-widest opacity-30">
        OMNIUTIL INFRASTRUCTURE - INVINCIBLE - 24/7/365 - COMPLIANT WITH ABI_SUPREME
      </footer>
    </div>
  );
}
