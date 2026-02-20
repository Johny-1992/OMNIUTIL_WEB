'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Globe, Cpu } from 'lucide-react';

const OmniDashboard = () => {
  const [data, setData] = useState({ supply: 'Chargement...', status: 'Syncing' });

  // Connexion temps réel à ton API Vercel
  useEffect(() => {
    fetch('https://omniutil-infra.vercel.app')
      .then(res => res.json())
      .then(json => setData({ supply: json.circulating_supply, status: 'Operational' }))
      .catch(() => setData({ supply: 'Error', status: 'Offline' }));
  }, []);

  return (
    <div className="min-h-screen bg-black text-cyan-400 p-8 font-mono overflow-hidden relative">
      {/* Effet 4D : Background animé Nebula */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-transparent to-black" />
      
      <header className="relative z-10 flex justify-between items-center mb-12 border-b border-cyan-900 pb-4">
        <h1 className="text-3xl font-bold tracking-tighter uppercase italic">OMNIUTIL // SUPREME_INFRA</h1>
        <div className="flex items-center gap-4">
          <span className={`h-3 w-3 rounded-full animate-pulse ${data.status === 'Operational' ? 'bg-green-500' : 'bg-red-500'}`} />
          <p className="text-xs tracking-widest">{data.status} SYSTEM</p>
        </div>
      </header>

      <main className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Module 1: Supply Dynamique */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gray-900/50 border border-cyan-500/30 p-6 rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.1)]">
          <Activity className="mb-4 text-cyan-300" />
          <h2 className="text-xs text-cyan-500 uppercase mb-2">Circulating Supply</h2>
          <p className="text-4xl font-black text-white leading-none">{data.supply}</p>
        </motion.div>

        {/* Module 2: AI Fraud Engine Status */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gray-900/50 border border-purple-500/30 p-6 rounded-xl backdrop-blur-md">
          <ShieldCheck className="mb-4 text-purple-400" />
          <h2 className="text-xs text-purple-500 uppercase mb-2">AI Fraud Validation</h2>
          <p className="text-2xl font-bold text-white leading-tight italic">ACTIVE & SCANNING</p>
        </motion.div>

        {/* Module 3: BSC Connection */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gray-900/50 border border-yellow-500/30 p-6 rounded-xl backdrop-blur-md">
          <Globe className="mb-4 text-yellow-400" />
          <h2 className="text-xs text-yellow-500 uppercase mb-2">Mainnet Oracle</h2>
          <p className="text-lg text-white font-semibold tracking-tighter italic">CONNECTED_VIA_RPC</p>
        </motion.div>

        {/* Module 4: Processor Load */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gray-900/50 border border-red-500/30 p-6 rounded-xl backdrop-blur-md">
          <Cpu className="mb-4 text-red-400" />
          <h2 className="text-xs text-red-500 uppercase mb-2">Orchestrator Load</h2>
          <div className="w-full bg-red-950 h-2 rounded-full mt-4">
            <motion.div animate={{ width: "12%" }} className="bg-red-500 h-full rounded-full" />
          </div>
        </motion.div>
      </main>

      <footer className="fixed bottom-4 left-8 text-[10px] opacity-40 uppercase tracking-widest">
        © 2026 OMNIUTIL INFRASTRUCTURE // INVINCIBILITY_MODE_ENABLED
      </footer>
    </div>
  );
};

export default OmniDashboard;
