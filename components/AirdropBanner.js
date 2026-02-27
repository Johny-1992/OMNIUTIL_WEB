"use client";
import React, { useState } from 'react';
import { Zap, ShieldCheck, Loader2 } from 'lucide-react';
import SuccessToast from './SuccessToast';

export default function AirdropBanner() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("READY");
  const [showToast, setShowToast] = useState(false);

  const handleClaim = async () => {
    setLoading(true);
    try {
      // Connexion Hybride (Natif)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Simulation de réussite immédiate pour fluidité
      setStatus("SUCCESS");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (err) {
      setStatus("ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessToast show={showToast} wallet="Conquérant" />
      <div className={`p-2 text-center border-b transition-all duration-700 ${status === 'SUCCESS' ? 'bg-blue-900' : 'bg-[#00ff88]'}`}>
        <div className="flex items-center justify-center gap-6 text-black text-[10px] font-black uppercase tracking-widest">
          <div className="bg-black text-[#00ff88] px-2 py-0.5 rounded italic">UTIL: $1.25</div>
          <button onClick={handleClaim} disabled={loading || status === "SUCCESS"} className="bg-black text-[#00ff88] px-6 py-1 rounded-full flex items-center gap-2">
            {loading ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />}
            {status === "SUCCESS" ? "SCELLÉ" : "RÉCLAMER 1 UTIL"}
          </button>
          <div className="opacity-60 flex items-center gap-1 font-mono"><ShieldCheck size={12}/> NEMESIS_ACTIVE</div>
        </div>
      </div>
    </>
  );
}

