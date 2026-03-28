'use client';
import { useState } from 'react';

export default function OperationsTerminal() {
  const [activeTab, setActiveTab] = useState('p2p');

  return (
    <div className="bg-zinc-900/40 border border-[#06b6d433] rounded-[40px] p-8 backdrop-blur-3xl animate-in slide-in-from-right duration-500">
      <nav className="flex justify-around mb-10 border-b border-white/5 pb-4">
        {['p2p', 'usdt', 'services'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`text-[9px] font-black tracking-[0.3em] uppercase transition-all ${activeTab === tab ? 'text-[#06b6d4] border-b border-[#06b6d4] pb-4' : 'opacity-20 hover:opacity-100'}`}
          >
            {tab === 'p2p' ? 'TRANSFERT_P2P' : tab === 'usdt' ? 'ÉCHANGE_USDT' : 'SERVICES'}
          </button>
        ))}
      </nav>

      <div className="space-y-6 text-white uppercase font-bold">
        {activeTab === 'p2p' && (
          <div className="space-y-4">
            <input className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-[10px] outline-none focus:border-[#06b6d4]" placeholder="ID_DESTINATAIRE" />
            <input type="number" className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-[10px] outline-none focus:border-[#06b6d4]" placeholder="MONTANT_UTIL" />
            <button className="w-full bg-[#06b6d4] text-black py-4 rounded-full text-[9px] tracking-[0.4em]">TRANSMETTRE_VALEUR</button>
          </div>
        )}
        {activeTab === 'usdt' && (
          <div className="text-center space-y-6">
            <div className="p-6 bg-[#06b6d411] border border-[#06b6d433] rounded-3xl">
              <p className="text-[10px]">TAUX: 3 650 USDT / UTIL</p>
            </div>
            <button className="w-full bg-white text-black py-4 rounded-full text-[9px] tracking-[0.4em]">SORTIE_LIQUIDITÉ</button>
          </div>
        )}
        {activeTab === 'services' && (
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-zinc-800 rounded-2xl text-[8px] bg-white/5">DATA_VOIX</button>
            <button className="p-4 border border-zinc-800 rounded-2xl text-[8px] bg-white/5">TV_BOUQUETS</button>
          </div>
        )}
      </div>
    </div>
  );
}
