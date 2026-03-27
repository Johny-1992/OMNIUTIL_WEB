'use client';import {useState,useEffect} from 'react';import {motion} from 'framer-motion';import {SovereignHUD} from '../components/SovereignHUD';

const AI_Core_Visual = () => (
  <svg viewBox="0 0 100 100" className="w-64 h-64 mx-auto mb-10 invert brightness-200 opacity-90 group-hover:rotate-180 transition-transform duration-[3000ms]">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#06b6d4" strokeWidth="0.1" strokeDasharray="4 4" className="animate-spin-slow"/>
    <path d="M30 50 L70 50 M50 30 L50 70" stroke="#06b6d4" strokeWidth="0.5" opacity="0.5"/>
    <text x="50" y="52" textAnchor="middle" fontSize="3" className="fill-[#06b6d4] font-black tracking-[0.5em]">AI_COORDINATOR_GLOBAL</text>
  </svg>
);

export default function Home() {
  const [lang, setLang] = useState('FR');
  const bsc = "0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B";

  const content = {
    FR: {
      hero: "LOGIQUE MÈRE OMNIUTIL",
      steps: ["GREFFE CTO (API/TAUX)", "MAPPING ID (WALLETS)", "CAPTURE FLUX (MÉRITE)"],
      tax: "TAXE DE SOUVERAINETÉ (0.5% + 0.5%)",
      cta: "INITIALISER LA GREFFE"
    },
    EN: {
      hero: "OMNIUTIL MOTHER LOGIC",
      steps: ["CTO GRAFTING (API/RATE)", "ID MAPPING (WALLETS)", "FLOW CAPTURE (MERIT)"],
      tax: "SOVEREIGNTY TAX (0.5% + 0.5%)",
      cta: "INITIALIZE GRAFTING"
    },
    ZH: {
      hero: "OMNIUTIL 母体逻辑",
      steps: ["CTO 植入 (API/费率)", "ID 映射 (钱包)", "流量捕捉 (价值)"],
      tax: "主权税收 (0.5% + 0.5%)",
      cta: "初始化植入"
    },
    AR: {
      hero: "منطق أومني-أوتيل الأم",
      steps: ["تطعيم CTO (API/المعدل)", "خرائط المعرف (المحافظ)", "التقاط التدفق (الاستحقاق)"],
      tax: "ضريبة السيادة (0.5% + 0.5%)",
      cta: "بدء التطعيم"
    }
  };

  const c = content[lang] || content.FR;

  return (
    <SovereignHUD valuation="3 650 $ / UTIL" version="v2040-GLOBAL">
      <div className={`min-h-screen bg-black text-white font-mono uppercase ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
        
        <header className="h-24 px-10 flex justify-between items-center border-b border-white/5 backdrop-blur-3xl sticky top-0 z-50 bg-black/80">
          <div className="flex items-center gap-4 border-l-2 border-[#06b6d4] pl-5">
            <span className="text-white font-black text-xl italic tracking-tighter">OMNIUTIL</span>
          </div>
          <div className="flex gap-4 text-[9px] font-black">
            {['FR','EN','ZH','AR'].map(l => (
              <button key={l} onClick={()=>setLang(l)} className={`px-2 py-1 ${lang===l?'text-[#06b6d4] border border-[#06b6d4]':'text-white/20'}`}>{l}</button>
            ))}
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-10 pt-24">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${lang === 'AR' ? 'direction-rtl' : ''}`}>
            
            <section className="space-y-12">
              <h1 className="text-4xl font-black italic tracking-tighter text-[#06b6d4] leading-none">{c.hero}</h1>
              <div className="space-y-6 border-l border-white/10 pl-10">
                {c.steps.map((s, i) => (
                  <div key={i} className="group">
                    <span className="text-[#06b6d4] text-xs font-black block">0{i+1}_{s}</span>
                    <p className="text-[9px] text-white/40 italic">Global Infrastructure Verified</p>
                  </div>
                ))}
              </div>
              <div className="p-8 bg-[#06b6d405] border border-[#06b6d422] rounded-[40px]">
                <h3 className="text-[10px] font-black mb-4 tracking-[0.4em] text-[#06b6d4]">{c.tax}</h3>
                <div className="flex justify-between text-[9px] opacity-60"><span>OWNER/INFRA: 0.5%</span><span>TREASURY: 0.5%</span></div>
              </div>
            </section>

            <div className="text-center bg-white/[0.01] p-16 rounded-[80px] border border-white/5 relative group">
              <AI_Core_Visual />
              <button className="bg-[#06b6d4] text-black px-12 py-4 text-[10px] font-black hover:bg-white transition-all rounded-full">{c.cta}</button>
            </div>
          </div>
        </main>

        <footer className="mt-24 p-10 border-t border-white/5 flex justify-between text-[7px] text-white/20 tracking-[0.5em]">
          <span>BSC: {bsc}</span>
          <span>© 2040 OMNIUTIL EMPIRE</span>
        </footer>
      </div>
    </SovereignHUD>
  );
}
