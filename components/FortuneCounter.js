"use client";
import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

export default function FortuneCounter() {
  const [balance, setBalance] = useState(300000.00);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => prev + 0.05);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 relative z-10">
      <div className="bg-gradient-to-br from-green-500/20 to-emerald-900/40 border border-green-500/30 p-6 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-2 opacity-60 uppercase text-[10px] tracking-widest text-green-400 font-black">
          <DollarSign size={14} /> Creator Royalties (Live)
        </div>
        <div className="text-4xl font-black text-white tracking-tighter tabular-nums">
          {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-green-500 text-xl">UTIL</span>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-500/20 to-indigo-900/40 border border-blue-500/30 p-6 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-2 opacity-60 uppercase text-[10px] tracking-widest text-blue-400 font-black">
          <TrendingUp size={14} /> Annual Accumulation Est.
        </div>
        <div className="text-4xl font-black text-white tracking-tighter">
          $ 5.94M <span className="text-blue-500 text-xl">USDT</span>
        </div>
      </div>
    </div>
  );
}
