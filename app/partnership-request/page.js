"use client";
import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function PartnershipRequest() {
  const [rate, setRate] = useState("");
  const [agreed, setAgreed] = useState(false);

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono p-10 flex flex-col items-center">
      <div className="max-w-3xl w-full border border-cyan-500/30 p-10 rounded-[3rem] bg-black/50 backdrop-blur-3xl">
        <h1 className="text-4xl font-black italic mb-8 text-cyan-500 uppercase">Manifeste de Souveraineté</h1>
        <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-2xl mb-8">
          <p className="text-[12px] text-red-500 font-black uppercase">
            ⚠️ Anti-Fraud Compliance Active - Breach results in Partnership Revocation.
          </p>
        </div>
        <input 
          type="number" 
          placeholder="Taux de Récompense (ex: 0.1)" 
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-2xl font-black text-cyan-400 mb-8 outline-none"
        />
        <div className="flex items-start gap-4 mb-8">
          <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="w-6 h-6" />
          <label className="text-[11px] opacity-70 uppercase">J'accepte le Manifeste de Rupture de Ban en cas de fraude.</label>
        </div>
        <button disabled={!agreed || !rate} className="w-full py-8 rounded-full font-black uppercase bg-cyan-500 text-black shadow-[0_0_30px_rgba(6,182,212,0.6)]">Sceller le Partenariat</button>
      </div>
    </main>
  );
}
