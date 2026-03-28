import GraftForm from './components/GraftForm';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020202] text-zinc-300 p-6 md:p-20 font-sans selection:bg-[#06b6d4] selection:text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* COLONNE GAUCHE : LOGIQUE MÈRE & ÉCOSYSTÈMES */}
        <div className="space-y-12">
          <header className="space-y-2">
            <p className="text-[#06b6d4] text-[8px] tracking-[0.8em] font-black">OMNIUTIL_NODE_IAD1_VERIFIED</p>
            <h1 className="text-7xl font-black italic tracking-tighter leading-none text-white">
              LOGIQUE<br/><span className="text-[#06b6d4]">MÈRE</span>
            </h1>
            <p className="text-[10px] tracking-[0.4em] opacity-40">IA COORDONNATRICE DE SOUVERAINETÉ iad1</p>
          </header>

          <div className="space-y-6 border-l-2 border-zinc-800 pl-8">
            <div className="group">
              <p className="text-[7px] text-[#06b6d4] mb-1">01_GREFFE ÉCOSYSTÈME</p>
              <p className="text-[10px] opacity-60 leading-relaxed uppercase">AIRTEL / CANAL+ / AMAZON / E-BANK / HOTELS / PARIS SPORTIFS</p>
            </div>
            <div className="group">
              <p className="text-[7px] text-[#06b6d4] mb-1">02_MAPPING ID (WALLETS AI)</p>
              <p className="text-[10px] opacity-60 leading-relaxed uppercase">NUMÉRO SIM / ID ABONNÉ / COMPTE BANCAIRE = WALLET UNIQUE UTIL</p>
            </div>
            <div className="group">
              <p className="text-[7px] text-[#06b6d4] mb-1">03_CAPTURE FLUX (MÉRITE)</p>
              <p className="text-[10px] opacity-60 leading-relaxed uppercase">RÉCOMPENSE À TEMPS RÉEL (PRIX UTIL: 3 650 USDT) SUR CONSOMMATION RÉELLE</p>
            </div>
          </div>

          <div className="p-8 bg-zinc-900/20 border border-zinc-800 rounded-[32px]">
            <p className="text-[9px] uppercase leading-loose tracking-widest italic text-white/80">
              "L'INFRASTRUCTURE OMNIUTIL EST LE JUGE ABSOLU DE LA MÉRITOCRATIE. 
              NI CORRUPTION, NI PIRATERIE, NI ERREUR. PERFECTION ABSOLUE."
            </p>
          </div>
        </div>

        {/* COLONNE DROITE : OPÉRATIONNEL & GREFFE */}
        <div className="space-y-8 bg-white/[0.01] border border-white/5 p-8 rounded-[48px] shadow-2xl">
          <div className="text-center space-y-4">
             <div className="inline-block p-6 bg-white rounded-[40px] shadow-[0_0_50px_-10px_rgba(6,182,212,0.3)]">
                {/* QR UNIQUE OMNIPRÉSENT - PORTE D'ENTRÉE */}
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=omniutil:partner_graft_protocol" alt="QR_OMNIUTIL" />
             </div>
             <p className="text-[8px] tracking-[0.5em] font-black text-[#06b6d4]">SCAN_TO_GRAFT_NODE</p>
          </div>

          {/* LE CŒUR DE LA GREFFE (FORMULAIRE) */}
          <GraftForm />

          <div className="grid grid-cols-2 gap-4 text-[7px] tracking-widest opacity-40 uppercase pt-4">
             <div className="p-4 border border-zinc-800 rounded-2xl">OWNER_FEE: 0.5% (ROYALTY)</div>
             <div className="p-4 border border-zinc-800 rounded-2xl">TREASURY: 0.5% (SUPPORT)</div>
          </div>
        </div>

      </div>

      <footer className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-zinc-900 pt-10 text-[7px] tracking-[0.5em] opacity-30 uppercase">
        <p>CONTRACT: 0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B</p>
        <div className="flex gap-8">
           <span>WHITEPAPER</span>
           <span>SUPPORT</span>
           <span>© 2040 OMNIUTIL EMPIRE</span>
        </div>
      </footer>
    </main>
  );
}
