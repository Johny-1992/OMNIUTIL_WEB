"use client";
import React from 'react';
import { Activity } from 'lucide-react';

export default function RoyaltyTracker({ color }) {
  return (
    <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: color }}></div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-[10px] font-black opacity-40 uppercase mb-1">Flux de Réserve</h3>
          <p className="text-2xl font-black italic">1,000,000 <span className="text-[10px] not-italic opacity-60">UTIL / AN</span></p>
        </div>
        <Activity size={20} style={{ color: color }} className="animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-[8px] font-black uppercase opacity-60">
          <span>Injection Stable</span>
          <span>65% Scellé</span>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full transition-all duration-1000" style={{ width: '65%', backgroundColor: color }}></div>
        </div>
      </div>
      <p className="mt-6 text-[9px] font-black opacity-30 uppercase italic">Prochain cycle : 21.01.2027</p>
    </div>
  );
}
