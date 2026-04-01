import React, { useState } from 'react';
import { Search, Wallet, ShieldCheck } from 'lucide-react';

export const MeritScanner = () => {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-8 bg-zinc-900/50 border border-[#06b6d4]/20 rounded-[40px] backdrop-blur-xl italic">
      <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3">
        <Wallet className="text-[#06b6d4]" /> Scanner mon Mérite
      </h3>
      <div className="relative">
        <input 
          type="text" 
          placeholder="Entrez votre ID (N° Téléphone / ID Abonné)"
          className="w-full bg-black/60 border border-white/10 p-6 rounded-3xl outline-none focus:border-[#06b6d4] font-bold text-sm"
          onChange={(e) => setId(e.target.value)}
        />
        <button 
          className="absolute right-3 top-3 bottom-3 px-6 bg-[#06b6d4] text-black rounded-2xl font-black uppercase text-[10px]"
          onClick={() => {setLoading(true); setTimeout(() => setLoading(false), 1500);}}
        >
          {loading ? 'Recherche AI...' : 'Vérifier'}
        </button>
      </div>
      {id && !loading && (
        <div className="mt-6 p-4 bg-[#06b6d4]/5 border border-[#06b6d4]/10 rounded-2xl animate-pulse">
          <p className="text-[10px] text-white/40 uppercase tracking-widest">Statut du Wallet Unique</p>
          <p className="text-sm font-bold mt-1">ID: {id} ➔ Connecté à IAD1</p>
          <p className="text-lg font-black text-[#06b6d4] mt-2">SOLDE: --.--- UTIL</p>
        </div>
      )}
    </div>
  );
};
