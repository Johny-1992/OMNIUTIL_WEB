"use client";
import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

export default function OmniQrGate() {
  // L'URL souveraine encodée pour les partenaires
  const GATEWAY_URL = "https://omniutil-web.vercel.app";

  return (
    <div className="flex flex-col items-center p-10 bg-black/60 border-2 border-cyan-500/40 rounded-[3rem] backdrop-blur-2xl shadow-[0_0_80px_rgba(6,182,212,0.15)] group hover:border-cyan-400 transition-all duration-700">
      
      {/* CADRE DU QR AVEC EFFET DE SCAN SCANNER LUMINEUX */}
      <div className="relative p-6 bg-white rounded-3xl mb-8 group-hover:rotate-1 transition-transform">
        <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-3xl animate-pulse"></div>
        
        {/* VÉRITABLE MATRICE QR OMNIUTIL (URL ENCODÉE) */}
        <img 
          src={`https://api.qrserver.com{encodeURIComponent(GATEWAY_URL)}&color=06b6d4&bgcolor=ffffff&qzone=2`}
          alt="OMNIUTIL_GATEWAY_QR"
          className="w-[200px] h-[200px] relative z-10"
        />
      </div>

      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-cyan-400 font-black tracking-[0.4em] text-[10px] uppercase">
          <Activity size={14} className="animate-pulse" />
          Scanner pour Adhésion
        </div>
        <div className="flex items-center justify-center gap-2 text-white/30 font-mono text-[9px]">
          <ShieldCheck size={12} />
          ID: OMNI_SUPREME_2026_VERIFIED
        </div>
      </div>

      {/* INDICATION DE PUISSANCE */}
      <div className="mt-8 pt-6 border-t border-white/5 w-full text-center">
        <p className="text-[8px] text-cyan-500/50 uppercase tracking-[0.2em]">Protocole de liaison direct avec le Nœud Washington D.C.</p>
      </div>
    </div>
  );
}
