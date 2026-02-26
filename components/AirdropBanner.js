"use client";
import React, { useState } from 'react';
import { Gift, ShieldCheck, Zap, Loader2 } from 'lucide-react';

export default function AirdropBanner() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("READY");

  const connectAndClaim = async () => {
    if (!window.ethereum) {
      window.alert("ERREUR : MetaMask non détecté.");
      return;
    }

    setLoading(true);
    try {
      // Utilisation du RPC natif de MetaMask (Pas besoin de ethers.js)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];

      // Appel à ton API Souveraine sur Vercel
      const response = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: userAddress })
      });

      if (response.ok) {
        setStatus("SUCCESS");
        window.alert(`SCELLÉ : 1 UTIL attribué à ${userAddress.slice(0,6)}...`);
      }
    } catch (err) {
      setStatus("ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-2 text-center z-50 border-b ${status === 'SUCCESS' ? 'bg-blue-600' : 'bg-[#00ff88]'}`}>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-black text-[10px] font-black uppercase tracking-widest">
        <div className="bg-black text-[#00ff88] px-2 py-1 rounded">PRIX UTIL: $1.25</div>
        <button 
          onClick={connectAndClaim}
          disabled={loading || status === "SUCCESS"}
          className="bg-black text-[#00ff88] px-4 py-1 rounded-full flex items-center gap-2"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : <Gift size={14} />}
          {status === "SUCCESS" ? "RÉCLAMÉ" : "CONNECTER & RÉCLAMER"}
        </button>
        <div className="opacity-60 flex items-center gap-1">
          <ShieldCheck size={14} />
          <span>NEMESIS_RECOVERY ACTIVE</span>
        </div>
      </div>
    </div>
  );
}

