"use client";
import React from 'react';
import { Gift, ShieldCheck, Zap } from 'lucide-react';

export default function AirdropBanner() {
  // PRIX FIXE INDEXÉ SUR L'INFRASTRUCTURE (DÉFINI DANS LA LOGIQUE MÈRE)
  const UTIL_PRICE = "1.25";

  return (
    <div className="bg-[#00ff88] p-2 text-center relative z-50 border-b border-black/10 shadow-[0_0_15px_rgba(0,255,136,0.3)]">
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-black text-[10px] md:text-[11px] font-black uppercase tracking-widest">
        
        {/* SECTION PRIX FIXE - VISIBILITÉ N°1 MONDIAL */}
        <div className="flex items-center gap-2 bg-black text-[#00ff88] px-3 py-1 rounded-sm">
          <Zap size={14} fill="#00ff88" />
          <span>UTIL PRICE: ${UTIL_PRICE} USDT</span>
        </div>

        {/* MESSAGE AIRDROP */}
        <div className="flex items-center gap-2">
          <Gift size={16} className="animate-bounce" />
          <span className="hidden sm:inline">AIRDROP LIVE : 1 UTIL SCELLÉ POUR LES 10 000 PREMIERS CONQUÉRANTS</span>
          <span className="sm:hidden">1 UTIL SCELLÉ OFFERT</span>
        </div>

        {/* BOUTON D'ACTION EXPLOITABLE */}
        <button 
          onClick={() => window.alert('Initialisation du Logic-Seal... Connectez votre Wallet OMNIUTIL pour réclamer.')} 
          className="bg-black text-[#00ff88] border border-[#00ff88] px-5 py-1 rounded-full text-[9px] hover:bg-white hover:text-black hover:border-black transition-all shadow-xl font-bold"
        >
          RÉCLAMER MAINTENANT
        </button>

        <div className="hidden lg:flex items-center gap-1 opacity-60">
          <ShieldCheck size={14} />
          <span>GOD_MODE_SECURED</span>
        </div>
      </div>
    </div>
  );
}

