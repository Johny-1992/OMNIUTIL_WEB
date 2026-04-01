import React from 'react';

export const LiveMeritFlow = () => {
  return (
    <div className="w-full bg-black/90 border-y border-[#06b6d4]/30 py-3 overflow-hidden italic font-black">
      <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
        <span className="text-[10px] text-[#06b6d4] tracking-tighter">
          [OWNER_RESERVE] ➔ MÉRITE DISTRIBUÉ: 0.00042 UTIL ➔ WALLET_AIRTEL_243... (TAXE 1% PRÉLEVÉE)
        </span>
        <span className="text-[10px] text-white/40 tracking-tighter">
          [OWNER_RESERVE] ➔ MÉRITE DISTRIBUÉ: 0.015 UTIL ➔ WALLET_PREMIERBET_NAV... (TAXE 1% PRÉLEVÉE)
        </span>
        <span className="text-[10px] text-[#06b6d4] tracking-tighter">
          [OWNER_RESERVE] ➔ MÉRITE DISTRIBUÉ: 0.0028 UTIL ➔ WALLET_CANAL+_ID92... (TAXE 1% PRÉLEVÉE)
        </span>
        <span className="text-[10px] text-white/40 tracking-tighter">
          [SOUVERAINETÉ] ➔ TAUX ACTUEL: 1 UTIL = 3650 USDT ➔ STABILITÉ GARANTIE
        </span>
      </div>
    </div>
  );
};
