"use client";
import React, { useState } from 'react';
import { Gift, ShieldCheck, Zap, Loader2 } from 'lucide-react';

export default function AirdropBanner() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("READY"); // READY, CLAIMING, SUCCESS, ERROR
  const UTIL_PRICE = "1.25";

  const handleClaim = async () => {
    setLoading(true);
    setStatus("CLAIMING");
    
    try {
      // APPEL À L'ORCHESTRATEUR (Liaison avec OMNI_SUPREME_ORCHESTRATOR.py)
      const response = await fetch('https://omniutil-infra.vercel.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          wallet: "0x_USER_WALLET_DETECTED", // À lier à MetaMask plus tard
          protocol: "NEMESIS_RECOVERY" 
        })
      });

      if (response.ok) {
        setStatus("SUCCESS");
        window.alert("FÉLICITATIONS CONQUÉRANT ! 1 UTIL SCELLÉ A ÉTÉ ATTRIBUÉ À VOTRE ADRESSE.");
      } else {
        throw new Error();
      }
    } catch (err) {
      setStatus("ERROR");
      window.alert("ERREUR CRITIQUE : Échec de la liaison avec le nœud de Washington.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-2 text-center relative z-50 border-b transition-colors duration-500 ${status === 'SUCCESS' ? 'bg-blue-600' : 'bg-[#00ff88]'}`}>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-black text-[10px] md:text-[11px] font-black uppercase tracking-widest">
        
        <div className="flex items-center gap-2 bg-black text-[#00ff88] px-3 py-1 rounded-sm">
          <Zap size={14} fill="#00ff88" />
          <span>UTIL PRICE: ${UTIL_PRICE} USDT</span>
        </div>

        <div className="flex items-center gap-2">
          <Gift size={16} className={loading ? "animate-spin" : "animate-bounce"} />
          <span>{status === 'SUCCESS' ? "1 UTIL SCELLÉ OBTENU !" : "AIRDROP LIVE : 10 000 PLACES DISPONIBLES"}</span>
        </div>

        <button 
          onClick={handleClaim}
          disabled={loading || status === 'SUCCESS'}
          className="bg-black text-[#00ff88] border border-[#00ff88] px-5 py-1 rounded-full text-[9px] hover:bg-white hover:text-black transition-all shadow-xl font-bold flex items-center gap-2 disabled:opacity-50"
        >
          {loading && <Loader2 size={12} className="animate-spin" />}
          {status === 'SUCCESS' ? "SCELLÉ DANS LA BLOCKCHAIN" : "RÉCLAMER MAINTENANT"}
        </button>

        <div className="hidden lg:flex items-center gap-1 opacity-60">
          <ShieldCheck size={14} />
          <span>{status} | SHA-256 SECURED</span>
        </div>
      </div>
    </div>
  );
}
