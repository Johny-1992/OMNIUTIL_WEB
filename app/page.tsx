'use client';
import { useState } from 'react';
import { translations } from './data/locales';
import GraftForm from './components/GraftForm';
import OperationsTerminal from './components/OperationsTerminal';
import DevelopmentPanel from './components/DevelopmentPanel';
import ContactPanel from './components/ContactPanel';

export default function HomePage() {
  const [lang, setLang] = useState('fr');
  const [activeView, setActiveView] = useState('graft');
  const t = translations[lang as keyof typeof translations] || translations.fr;

  return (
    <main className="min-h-screen bg-[#020202] text-zinc-300 p-6 md:p-20 font-sans selection:bg-[#06b6d4] selection:text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        <div className="space-y-12">
          <header className="space-y-4">
            <div className="flex gap-4 text-[9px] font-black tracking-widest uppercase cursor-pointer">
               {['fr', 'en', 'zh', 'es'].map((l) => (
                 <span key={l} onClick={() => setLang(l)} className={lang === l ? 'text-[#06b6d4]' : 'opacity-20 hover:opacity-100'}>
                   {l.toUpperCase()}
                 </span>
               ))}
            </div>
            <p className="text-[#06b6d4] text-[8px] tracking-[0.8em] font-black uppercase">OMNIUTIL_NODE_IAD1_VERIFIED</p>
            <h1 className="text-7xl font-black italic tracking-tighter leading-none text-white uppercase">
              {t.title.split(' ')[0]}<br/><span className="text-[#06b6d4]">{t.title.split(' ')[1] || ''}</span>
            </h1>
            <p className="text-[10px] tracking-[0.4em] opacity-40 uppercase italic">{t.subtitle}</p>
          </header>

          <nav className="grid grid-cols-1 gap-4 uppercase font-black text-[10px] tracking-[0.3em]">
            <button onClick={() => setActiveView('graft')} className={`p-6 border rounded-3xl text-left transition-all ${activeView === 'graft' ? 'border-[#06b6d4] text-[#06b6d4] bg-[#06b6d411]' : 'border-zinc-800 opacity-40'}`}>{t.graft}</button>
            <button onClick={() => setActiveView('operations')} className={`p-6 border rounded-3xl text-left transition-all ${activeView === 'operations' ? 'border-[#06b6d4] text-[#06b6d4] bg-[#06b6d411]' : 'border-zinc-800 opacity-40'}`}>{t.ops}</button>
            <button onClick={() => setActiveView('development')} className={`p-6 border rounded-3xl text-left transition-all ${activeView === 'development' ? 'border-[#06b6d4] text-[#06b6d4] bg-[#06b6d411]' : 'border-zinc-800 opacity-40'}`}>{t.dev}</button>
            <button onClick={() => setActiveView('contact')} className={`p-6 border rounded-3xl text-left transition-all ${activeView === 'contact' ? 'border-[#06b6d4] text-[#06b6d4] bg-[#06b6d411]' : 'border-zinc-800 opacity-40'}`}>{t.contact}</button>
          </nav>
        </div>

        <div className="min-h-[650px] space-y-8">
          {activeView === 'graft' && (
            <div className="space-y-8 animate-in fade-in duration-700 text-center">
               <div className="bg-white p-6 rounded-[40px] inline-block shadow-[0_0_60px_-15px_rgba(6,182,212,0.4)]">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=omniutil:graft" alt="QR" />
               </div>
               <p className="text-[8px] tracking-[0.5em] font-black text-[#06b6d4]">{t.scan}</p>
               <GraftForm />
            </div>
          )}
          {activeView === 'operations' && <OperationsTerminal />}
          {activeView === 'development' && <DevelopmentPanel />}
          {activeView === 'contact' && <ContactPanel />}
        </div>
      </div>

      <footer className="mt-20 border-t border-zinc-900 pt-10 text-[7px] tracking-[0.5em] opacity-30 uppercase flex flex-col md:flex-row justify-between gap-4">
        <p>{t.contract}: 0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B</p>
        <p>{t.owner_fee} | © 2040 OMNIUTIL EMPIRE</p>
      </footer>
    </main>
  );
}
