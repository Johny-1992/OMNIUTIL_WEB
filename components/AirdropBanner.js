"use client";
import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Loader2 } from 'lucide-react';
import SuccessToast from './SuccessToast';

export default function AirdropBanner({ lang = 'FR' }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("READY");
  const [showToast, setShowToast] = useState(false);
  const [wallet, setWallet] = useState("");

  // VÉRIFICATION LOCALE AU CHARGEMENT POUR ÉVITER LE DOUBLE CLIC
  useEffect(() => {
    const hasClaimed = localStorage.getItem('omni_claimed');
    if (hasClaimed) setStatus("SUCCESS");
  }, []);

  const connectAndClaim = async () => {
    if (status === "SUCCESS") return; // VERROU DE SÉCURITÉ ABSOLU
    
    setLoading(true);
    let provider = window.ethereum;

    if (provider?.providers) {
      provider = provider.providers.find(p => p.isMetaMask);
    }

    if (!provider) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = "https://metamask.app.link";
      } else {
        window.alert(lang === 'FR' ? "METAMASK NON DÉTECTÉ." : "METAMASK NOT DETECTED.");
      }
      setLoading(false);
      return;
    }

    try {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      setWallet(userAddress);

      // APPEL AU NŒUD DE WASHINGTON AVEC VÉRIFICATION DE FRAUDE
      const response = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: userAddress, type: 'CLAIM' })
      });

      const result = await response.json();

      // SI L'IA COORDINATRICE DÉTECTE UNE FRAUDE
      if (result.status === "REFUSÉ_FRAUDE_DÉTECTÉE") {
        window.alert(lang === 'FR' ? "ERREUR : Réclamation multiple bloquée." : "ERROR: Multiple claims blocked.");
        setStatus("SUCCESS");
        return;
      }

      // SCELLAGE RÉUSSI
      setStatus("SUCCESS");
      localStorage.setItem('omni_claimed', 'true'); // Verrouillage permanent sur ce navigateur
      setShowToast(true);
      setTimeout(() => setShowToast(false), 6000);

    } catch (err) {
      console.error("ERREUR_SOUVERAINE:", err);
      setStatus("ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessToast show={showToast} wallet={wallet} />
      <div className={`p-2 text-center sticky top-0 z-50 border-b transition-all duration-700 ${status === 'SUCCESS' ? 'bg-blue-900 border-[#00ff88]' : 'bg-[#00ff88] border-black'}`}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-black text-[10px] font-black uppercase tracking-widest">
          <div className="bg-black text-[#00ff88] px-2 py-0.5 rounded italic shadow-lg shadow-black/20">
            {lang === 'FR' ? 'PRIX UTIL: $1.25' : 'UTIL PRICE: $1.25'}
          </div>

          <button
            onClick={connectAndClaim}
            disabled={loading || status === "SUCCESS"}
            className="group bg-black text-[#00ff88] border border-[#00ff88] px-6 py-1.5 rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2 shadow-xl disabled:opacity-80"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <Zap size={14} className="group-hover:fill-current" />}
            {status === "SUCCESS" ? (lang === 'FR' ? "SCELLÉ DANS LA BLOCKCHAIN" : "SEALED ON BLOCKCHAIN") : (lang === 'FR' ? "RÉCLAMER 1 UTIL" : "CLAIM 1 UTIL")}
          </button>

          <div className="opacity-60 flex items-center gap-1 font-mono">
            <ShieldCheck size={14} />
            <span>{lang === 'FR' ? 'LOGIQUE_MÈRE_SÉCURISÉE' : 'MOTHER_LOGIC_SECURED'}</span>
          </div>
        </div>
      </div>
    </>
  );
}
