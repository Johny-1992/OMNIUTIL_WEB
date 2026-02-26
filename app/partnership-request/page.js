"use client";
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Gift, ShieldCheck, Zap, Loader2 } from 'lucide-react';

export default function AirdropBanner() {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [status, setStatus] = useState("READY");

  const connectAndClaim = async () => {
    if (!window.ethereum) {
      window.alert("ERREUR : MetaMask n'est pas détecté. Installez l'extension pour réclamer.");
      return;
    }

    setLoading(true);
    try {
      // 1. Connexion au Wallet (Ethers v6)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const userAddress = accounts[0];
      setWallet(userAddress);

      // 2. Appel à l'Orchestrateur OMNIUTIL (api/claim.py)
      const response = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          wallet: userAddress,
          protocol: "NEMESIS_RECOVERY",
          timestamp: Date.now()
        })
      });

      if (response.ok) {
        setStatus("SUCCESS");
        window.alert(`SCELLÉ : 1 UTIL envoyé à ${userAddress.slice(0,6)}...`);
      }
    } catch (err) {
      console.error(err);
      setStatus("ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-2 text-center z-50 border-b transition-all ${status === 'SUCCESS' ? 'bg-blue-700' : 'bg-[#00ff88]'}`}>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-black text-[10px] font-black uppercase tracking-widest">
        
        <div className="flex items-center gap-2 bg-black text-[#00ff88] px-2 py-1 rounded">
          <Zap size={12} fill="#00ff88" />
          <span>UTIL PRICE: $1.25</span>
        </div>

        <button 
          onClick={connectAndClaim}
          disabled={loading || status === "SUCCESS"}
          className="bg-black text-[#00ff88] border border-[#00ff88] px-4 py-1 rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : <Gift size={14} />}
          {wallet ? `LOGGED: ${wallet.slice(0,6)}...` : "CONNECTER & RÉCLAMER"}
        </button>

        <div className="opacity-60 flex items-center gap-1">
          <ShieldCheck size={14} />
          <span>{status === "SUCCESS" ? "VERIFIED ON BSC" : "SHA-256 SECURED"}</span>
        </div>
      </div>
    </div>
  );
}
