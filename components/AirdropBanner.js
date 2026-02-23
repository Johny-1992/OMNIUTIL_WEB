"use client";
import React, { useState } from 'react';
import { Gift, ShieldCheck } from 'lucide-react';

export default function AirdropBanner() {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 p-2 text-center relative z-50">
      <div className="flex items-center justify-center gap-4 text-white text-[11px] font-black uppercase tracking-widest">
        <Gift size={16} className="animate-bounce" />
        AIRDROP LIVE : 1 UTIL SCELLÉ POUR LES 10 000 PREMIERS CONQUÉRANTS
        <button onClick={() => window.alert('Connectez votre Wallet pour réclamer votre UTIL')} className="bg-white text-blue-600 px-4 py-1 rounded-full text-[9px] hover:scale-110 transition-all shadow-xl">
          RÉCLAMER MAINTENANT
        </button>
        <ShieldCheck size={16} className="opacity-50" />
      </div>
    </div>
  );
}
