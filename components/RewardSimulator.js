"use client";
import React, { useState } from 'react';
import { Zap, Smartphone, Tv, ShoppingBag } from 'lucide-react';

export default function RewardSimulator() {
  const [spent, setSpent] = useState(100);
  const utilPrice = 0.10; 
  const rewardRate = 0.05; 
  const earnedUtil = (spent * rewardRate) / utilPrice;

  return (
    <div className="bg-white/5 border border-cyan-500/20 p-8 rounded-3xl backdrop-blur-2xl mt-8">
      <h3 className="text-xl font-black italic text-white mb-6 flex items-center gap-3 uppercase tracking-tighter">
        <Zap className="text-yellow-400 animate-pulse" /> Simulateur de Gains RWA
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-left">
          <label className="text-[10px] uppercase opacity-50 tracking-[0.3em]">Consommation Réelle (USDT/FC)</label>
          <input 
            type="number" 
            value={spent} 
            onChange={(e) => setSpent(e.target.value)}
            className="w-full bg-black/50 border border-cyan-500/30 p-4 rounded-xl text-2xl font-bold text-cyan-400 focus:outline-none focus:border-cyan-500 transition-all"
          />
          <div className="flex gap-4 opacity-40 text-[10px]">
            <span className="flex items-center gap-1"><Smartphone size={12}/> Airtel</span>
            <span className="flex items-center gap-1"><Tv size={12}/> Canal+</span>
            <span className="flex items-center gap-1"><ShoppingBag size={12}/> Amazon</span>
          </div>
        </div>
        <div className="bg-cyan-500/10 border border-cyan-500/30 p-6 rounded-2xl text-center">
          <div className="text-[10px] uppercase opacity-50 mb-2">Récompense Automatique</div>
          <div className="text-5xl font-black text-white tracking-tighter animate-pulse">
            {earnedUtil.toFixed(0)} <span className="text-cyan-500 text-2xl">UTIL</span>
          </div>
          <div className="text-[10px] mt-3 text-cyan-400/60 italic font-mono">
             Validé par IA Coordinatrice @ Washington D.C.
          </div>
        </div>
      </div>
    </div>
  );
}
