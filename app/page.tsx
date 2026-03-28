'use client';
import { useState } from 'react';
import GraftForm from './components/GraftForm';
import OperationsTerminal from './components/OperationsTerminal';
import DevelopmentPanel from './components/DevelopmentPanel';

export default function HomePage() {
  const [activeView, setActiveView] = useState('graft'); // graft, operations, development

  return (
    <main className="min-h-screen bg-[#020202] text-zinc-300 p-6 md:p-20 font-sans selection:bg-[#06b6d4] selection:text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* COLONNE GAUCHE : LOGIQUE MÈRE */}
        <div className="space-y-12">
          <header className="space-y-2">
            <div className="flex gap-4 text-[8px] font-black text-[#06b6d4] tracking-widest uppercase mb-4">
               <span>FR</span> <span>EN</span> <span>ZH</span> <span>AR</span> <span>ES</span>
            </div>
            <p className="text-[#06b6d4] text-[8px] tracking-[0.8em] font-black uppercase">OMNIUTIL_NODE_IAD1_VERIFIED</p>
            <h1 className="text-7xl font-black italic tracking-tighter leading-none text-white uppercase">
              OMNI<span className="text-[#06b6d4]">UTIL</span>
            </h1>
            <p className="text-[10px] tracking-[0.4em] opacity-40 uppercase italic">IA COORDONNATRICE DE SOUVERAINETÉ iad1</p>
          </header>

          <nav className="grid grid-cols-1 gap-4 uppercase font-black text-[10px] tracking-[0.3em]">
            <button onClick={() => setActiveView('graft')} className={`p-6 border rounded-3xl text-left transition-all ${activeView === 'graft' ? 'border-[#06b6d4] text-[#06b6d4] bg-[#06b6d411]' : 'border-zinc-800 opacity-40'}`}>01_INITIALISER_LA_GREFFE</button>
            <button onClick={() => setActiveView('operations')} className={`p-6 border rounded-3xl text-left transition-all ${activeView === 'operations' ? 'border-[#06b6d4] text-[#06b6d4] bg-[#06b6d411]' : 'border-zinc-800 opacity-40'}`}>02_ACCÉDER_AUX_OPÉRATIONS</button>
            <button onClick={() => setActiveView('development')} className={`p-6 border rounded-3xl text-left transition-all ${activeView === 'development' ? 'border-[#06b6d4] text-[#06b6d4] bg-[#06b6d411]' : 'border-zinc-800 opacity-40'}`}>03_PROPOSER_UN_NŒUD</button>
          </nav>

          <div className="p-8 bg-zinc-900/20 border border-zinc-800 rounded-[32px]">
            <p className="text-[9px] uppercase leading-loose tracking-widest italic text-white/80">
              "L'INFRASTRUCTURE EST LE JUGE ABSOLU DE LA MÉRITOCRATIE. NI CORRUPTION, NI PIRATERIE, NI ERREUR."
            </p>
          </div>
        </div>

        {/* COLONNE DROITE : AFFICHAGE DYNAMIQUE */}
        <div className="min-h-[600px]">
          {activeView === 'graft' && (
            <div className="space-y-8 animate-in fade-in duration-700">
               <div className="bg-white p-6 rounded-[40px] w-fit mx-auto shadow-[0_0_60px_-15px_rgba(6,182,212,0.4)]">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=omniutil:graft" alt="QR" />
               </div>
               <GraftForm />
            </div>
          )}
          {activeView === 'operations' && <div className="animate-in slide-in-from-right duration-500"><OperationsTerminal /></div>}
          {activeView === 'development' && <div className="animate-in slide-in-from-bottom duration-500"><DevelopmentPanel /></div>}
        </div>
      </div>

      <footer className="mt-20 border-t border-zinc-900 pt-10 text-[7px] tracking-[0.5em] opacity-30 uppercase flex justify-between">
        <p>CONTRACT: 0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B</p>
        <p>© 2040 OMNIUTIL EMPIRE</p>
      </footer>
    </main>
  );
}
