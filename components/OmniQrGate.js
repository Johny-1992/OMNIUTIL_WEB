"use client";
import React from 'react';
import { QrCode, ShieldCheck, Activity } from 'lucide-react';

export default function OmniQrGate() {
  const GATEWAY_URL = "https://omniutil-web.vercel.app";

  return (
    <div className="flex flex-col items-center p-8 bg-black/40 border-2 border-cyan-500/30 rounded-[2.5rem] backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.1)] group hover:border-cyan-400 transition-all duration-500">
      <div className="p-4 bg-white rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-500">
        {/* QR Code SVG Direct */}
        <svg width="180" height="180" viewBox="0 0 29 29" fill="none" shapeRendering="crispEdges">
          <path d="M0 0h7v7H0zM0 11h1v1H0zM0 15h1v1H0zM0 19h1v1H0zM0 22h7v7H0zM2 2h3v3H2zM2 24h3v3H2zM11 0h1v1h-1zM15 0h7v7h-7zM22 0h7v7h-7zM24 2h3v3h-3zM22 22h7v7h-7zM24 24h3v3h-3z" fill="#000"/>
          <rect x="11" y="11" width="7" height="7" fill="#06b6d4" rx="1"/>
        </svg>
      </div>
      <div className="text-center">
        <h3 className="text-cyan-400 font-black tracking-widest text-xs uppercase flex items-center justify-center gap-2">
          <Activity size={14} className="animate-pulse" /> SCANNER POUR ADHÉSION
        </h3>
        <p className="text-white/40 text-[9px] mt-2 font-mono">ID: OMNI_SUPREME_2026</p>
      </div>
    </div>
  );
}
