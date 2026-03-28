'use client';
import { useState } from 'react';

export default function DevelopmentPanel() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-zinc-900/40 p-8 rounded-[40px] border border-white/5 backdrop-blur-3xl">
      <h3 className="text-[#06b6d4] text-[10px] tracking-[0.5em] font-black mb-6 uppercase">04_EXPANSION_DE_L_INFRASTRUCTURE</h3>
      
      {!submitted ? (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
          <p className="text-[9px] opacity-40 leading-relaxed uppercase">PROPOSEZ UN NOUVEAU NŒUD À GREFFER (SUPERMARCHÉ, BANQUE, RÉSEAU SOCIAL, ETC.)</p>
          
          <input required className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-white text-[10px] outline-none" placeholder="NOM_DE_L_ÉCOSYSTÈME_PROPOSÉ" />
          
          <textarea required className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-white text-[10px] h-32 outline-none" placeholder="DESCRIPTION_DES_SERVICES_À_VALORISER" />
          
          <button type="submit" className="w-full bg-white text-black font-black py-4 rounded-full text-[9px] tracking-[0.4em] hover:bg-[#06b6d4] transition-all">SOUMETTRE_À_L_IA_IAD1</button>
        </form>
      ) : (
        <div className="py-10 text-center space-y-4">
          <div className="text-3xl text-[#06b6d4]">✓</div>
          <p className="text-[10px] font-black text-white tracking-widest uppercase">PROPOSITION_ENREGISTRÉE</p>
          <p className="text-[8px] opacity-40 uppercase tracking-tighter">L'IA COORDONNATRICE ANALYSE LA VIABILITÉ DU FLUX.</p>
        </div>
      )}
    </div>
  );
}
