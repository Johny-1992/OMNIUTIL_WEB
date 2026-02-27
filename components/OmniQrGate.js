"use client";
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Activity, ShieldCheck } from 'lucide-react';

export default function OmniQrGate() {
  const GATEWAY_URL = "https://omniutil-web.vercel.app";

  return (
    <div className="flex flex-col items-center p-10 bg-black/40 border-2 border-cyan-500/30 rounded-[3rem] backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] group hover:border-cyan-400 transition-all duration-700">
      <div className="relative p-6 bg-white rounded-3xl mb-8 group-hover:scale-105 transition-transform duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-3xl animate-pulse"></div>
        {/* MOTEUR DE GÉNÉRATION LOCAL SANS ERREUR */}
        <QRCodeSVG 
          value={GATEWAY_URL} 
          size={200} 
          fgColor="#000000" 
          level="H"
          includeMargin={false}
        />
      </div>
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-cyan-400 font-black tracking-[0.4em] text-[10px] uppercase">
          <Activity size={14} className="animate-pulse" />
          Scanner pour Adhésion
        </div>
        <div className="text-white/30 font-mono text-[9px] flex items-center justify-center gap-2">
          <ShieldCheck size={12} /> ID: OMNI_SUPREME_2026_VERIFIED
        </div>
      </div>
    </div>
  );
}

