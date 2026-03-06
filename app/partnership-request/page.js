"use client";
import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, Scale } from 'lucide-react';

export default function PartnershipRequest() {
  const [rate, setRate] = useState("");
  const [agreed, setAgreed] = useState(false);

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono p-10 flex flex-col items-center">
      <div className="max-w-3xl w-full border border-cyan-500/30 p-10 rounded-[3rem] bg-black/50 backdrop-blur-3xl">
        <h1 className="text-4xl font-black italic mb-8 text-cyan-500 uppercase italic">Manifeste de Souveraineté</h1>
        
        <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-2xl mb-8">
          <div className="flex items-center gap-4 text-red-500 font-black mb-4">
            <ShieldAlert size={24} /> MISE EN GARDE SOLENNELLE
          </div>
          <p className="text-[12px] leading-relaxed opacity-80 uppercase">
            Toute tentative de flux asymétrique ou de récompense hors-mérite (Sybil Attack) entraîne la révocation instantanée du Node Partenaire et le gel définitif des flux Treasury associés. L'IA Coordinatrice iad1 est le juge unique de la conformité.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-[10px] font-black text-cyan-500 mb-4 tracking-widest uppercase">1. Déclaration du Taux Scripturaire (%)</label>
            <input 
              type="number" 
              placeholder="Ex: 0.1" 
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-2xl font-black text-cyan-400 focus:border-cyan-500 outline-none"
            />
          </div>

          <div className="flex items-start gap-4">
            <input 
              type="checkbox" 
              checked={agreed} 
              onChange={() => setAgreed(!agreed)}
              className="mt-1 w-6 h-6 rounded border-cyan-500"
            />
            <label className="text-[11px] opacity-70 uppercase leading-relaxed">
              Je confirme que ce taux sera scriptuleusement respecté par notre infrastructure. Je reconnais que toute incohérence détectée par l'IA iad1 déclenchera la Rupture de Ban.
            </label>
          </div>

          <button 
            disabled={!agreed || !rate}
            className={`w-full py-8 rounded-full font-black uppercase transition-all ${agreed && rate ? 'bg-cyan-500 text-black shadow-[0_0_30px_rgba(6,182,212,0.6)]' : 'bg-white/5 text-white/20'}`}
          >
            Sceller le Partenariat
          </button>
        </div>
      </div>
    </main>
  );
}
