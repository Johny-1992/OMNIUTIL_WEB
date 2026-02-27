"use client";
import React, { useState } from 'react';
import { Gift, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import SuccessToast from './SuccessToast'; // LIAISON AVEC VOTRE NOUVEAU COMPOSANT

export default function AirdropBanner() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("READY");
  const [showToast, setShowToast] = useState(false);
  const [wallet, setWallet] = useState("");

  const connectAndClaim = async () => {
    setLoading(true);
    
    // LOGIQUE DÉTECTION HYBRIDE (PC + MOBILE)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (!window.ethereum) {
      if (isMobile) {
        // Redirection intelligente vers le navigateur MetaMask
        window.location.href = "https://metamask.app.link";
      } else {
        window.alert("INSTALLATION REQUISE : Veuillez installer l'extension MetaMask.");
      }
      setLoading(false);
      return;
    }

    try {
      // 1. CONNEXION SÉCURISÉE
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      setWallet(userAddress);

      // 2. APPEL AU NŒUD DE WASHINGTON
      const response = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: userAddress, protocol: "NEMESIS_RECOVERY" })
      });

      if (response.ok) {
        setStatus("SUCCESS");
        setShowToast(true); // DÉCLENCHEMENT DE LA NOTIFICATION NÉON 4D
        setTimeout(() => setShowToast(false), 6000);
      }
    } catch (err) {
      console.error("LOGIC_ERROR:", err);
      setStatus("ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessToast show={showToast} wallet={wallet} />
      <div className={`p-2 text-center z-50 border-b transition-all duration-700 ${status === 'SUCCESS' ? 'bg-blue-900 border-[#00ff88]' : 'bg-[#00ff88] border-black shadow-[0_0_15px_rgba(0,255,136,0.2)]'}`}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-black text-[10px] font-black uppercase tracking-widest">
          <div className="bg-black text-[#00ff88] px-2 py-1 rounded italic">PRIX UTIL: $1.25</div>
          
          <button 
            onClick={connectAndClaim}
            disabled={loading || status === "SUCCESS"}
            className="group bg-black text-[#00ff88] border border-[#00ff88] px-6 py-1.5 rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2 shadow-xl"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <Zap size={14} className="group-hover:fill-current" />}
            {status === "SUCCESS" ? "SCELLÉ DANS LA BLOCKCHAIN" : "CONNECTER & RÉCLAMER"}
          </button>

          <div className="opacity-60 flex items-center gap-1 font-mono">
            <ShieldCheck size={14} />
            <span>SOUVERAINETÉ_NUMÉRIQUE_ACTIVE</span>
          </div>
        </div>
      </div>
    </>
  );
}

