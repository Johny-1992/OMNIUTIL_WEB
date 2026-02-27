"use client";
import React, { useState } from 'react';
import { Calculator, Zap } from 'lucide-react';

export default function RewardSimulator() {
  const [amount, setAmount] = useState(100);
  const UTIL_PRICE = 1.25;
  const REWARD_RATE = 1.0; // Taux de base 1:1 sur valeur USD

  const calculatedUtil = (amount * REWARD_RATE) / UTIL_PRICE;

  return (
    <div className="bg-white/5 border border-cyan-500/20 p-8 rounded-[2.5rem] backdrop-blur-md">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="text-cyan-400" />
        <h2 className="text-white font-bold uppercase text-sm">Simulateur RWA</h2>
      </div>
      <div className="space-y-4">
        <label className="text-[10px] opacity-50 uppercase">Dépense (USDT/FC)</label>
        <input 
          type="number" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-black/50 border-b border-cyan-500/50 p-3 text-2xl text-white outline-none"
        />
        <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
          <p className="text-[10px] uppercase opacity-60">Récompense Automatique</p>
          <p className="text-3xl font-black text-cyan-400">{calculatedUtil.toFixed(2)} UTIL</p>
        </div>
      </div>
    </div>
  );
}
