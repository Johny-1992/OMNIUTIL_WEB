'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SovereignQR = () => (
  <div className="relative p-4 bg-white/5 border border-[#06b6d433] rounded-3xl backdrop-blur-xl group cursor-pointer shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)]">
    <svg viewBox="0 0 100 100" className="w-48 h-48 invert brightness-200 opacity-80 group-hover:opacity-100 transition-all duration-500">
      <path d="M10 10h20v5h-15v15h-5zM70 10h20v20h-5v-15h-15zM10 70h5v15h15v5h-20zM75 90v-5h15v-15h5v20z" fill="#06b6d4"/>
      <rect x="30" y="30" width="40" height="40" fill="#06b6d4" opacity="0.2" />
      <text x="50" y="55" textAnchor="middle" fontSize="5" className="fill-[#06b6d4] font-black italic">OMNI_AI</text>
    </svg>
    <p className="mt-4 text-[8px] font-black tracking-[0.5em] text-[#06b6d4] text-center animate-pulse">SCAN TO GRAFT NODE</p>
  </div>
);

export default function Home() {
  const [lang, setLang] = useState('FR');
  const [showModal, setShowModal] = useState(false);
  const bsc = "0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B";

  const translations = {
    FR: {
      hero: "LOGIQUE MÈRE OMNIUTIL",
      sub: "IA COORDONNATRICE DE SOUVERAINETÉ iad1",
      steps: ["GREFFE ÉCOSYSTÈME (API/TAUX)", "MAPPING ID (WALLETS AI)", "CAPTURE FLUX (MÉRITE)"],
      tax: "TAXE DE SOUVERAINETÉ SYSTÉMIQUE",
      cta: "INITIALISER LA GREFFE",
      about: "À PROPOS", donate: "DON OWNER", contact: "NOUS ÉCRIRE",
      modalTitle: "CONSTITUTION TECHNIQUE",
      modalText: [
        "1. SOUVERAINETÉ : L'IA Coordonnatrice est l'unique autorité de gestion des flux UTIL.",
        "2. MÉRITE AUTOMATISÉ : Chaque acte de consommation déclenche une récompense instantanée.",
        "3. L'ÉQUILIBRE (0.5% + 0.5%) : Prélèvement automatique sur chaque mouvement pour l'Infrastructure et la Trésorerie.",
        "4. FONGIBILITÉ : L'UTIL est convertible en USDT ou en services partenaires."
      ]
    },
    EN: {
      hero: "OMNIUTIL MOTHER LOGIC",
      sub: "AI COORDINATOR SOVEREIGNTY iad1",
      steps: ["ECOSYSTEM GRAFTING", "ID MAPPING", "FLOW CAPTURE"],
      tax: "SYSTEMIC SOVEREIGNTY TAX",
      cta: "INITIALIZE GRAFTING",
      about: "ABOUT", donate: "DONATE OWNER", contact: "CONTACT US",
      modalTitle: "TECHNICAL CONSTITUTION",
      modalText: [
        "1. SOVEREIGNTY: The AI Coordinator is the sole authority for UTIL flow management.",
        "2. AUTOMATED MERIT: Every consumption act triggers an instant reward.",
        "3. THE BALANCE (0.5% + 0.5%): Automatic levy on every movement for Infra and Treasury.",
        "4. FUNGIBILITY: UTIL is convertible to USDT or partner services."
      ]
    },
    ZH: {
      hero: "OMNIUTIL 母体逻辑",
      sub: "IAD1 主权协调人工智能",
      steps: ["生态系统植入 (API/费率)", "ID 映射 (AI 钱包)", "流量捕捉 (价值)"],
      tax: "系统主权税收",
      cta: "初始化植入",
      about: "关于", donate: "所有者捐赠", contact: "联系我们",
      modalTitle: "技术章程",
      modalText: [
        "1. 主权：AI 协调员是 UTIL 流量管理的唯一机构。",
        "2. 自动功绩：每项消费行为都会触发即时奖励。",
        "3. 平衡 (0.5% + 0.5%)：每次变动都会自动征收基础设施和财政费用。",
        "4. 可互换性：UTIL 可转换为 USDT 或合作伙伴服务。"
      ]
    },
    AR: {
      hero: "منطق أومني-أوتيل الأم",
      sub: "منسق السيادة الاصطناعي iad1",
      steps: ["تطعيم النظام (API/المعدل)", "خرائط المعرف (محافظ AI)", "التقاط التدفق (الاستحقاق)"],
      tax: "ضريبة السيادة النظامية",
      cta: "بدء التطعيم",
      about: "حول", donate: "تبرع للمالك", contact: "اتصل بنا",
      modalTitle: "الدستور الفني",
      modalText: [
        "1. السيادة: المنسق الاصطناعي هو السلطة الوحيدة لإدارة تدفق UTIL.",
        "2. الاستحقاق الآلي: كل فعل استهلاك يؤدي إلى مكافأة فورية.",
        "3. التوازن (0.5٪ + 0.5٪): ضريبة تلقائية على كل حركة للبنية التحتية والخزانة.",
        "4. القابلية للاستبدال: UTIL قابلة للتحويل إلى USDT أو خدمات الشركاء."
      ]
    }
  };

  const t = translations[lang] || translations.EN;

  return (
    <div className={`min-h-screen bg-[#020202] text-white font-mono uppercase overflow-x-hidden selection:bg-[#06b6d4] ${lang === 'AR' ? 'text-right' : 'text-left'}`}>

      {/* MODALE CONSTITUTION */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="max-w-2xl w-full bg-white/[0.03] border border-[#06b6d433] rounded-[40px] p-10 lg:p-16 relative shadow-[0_0_100px_-20px_rgba(6,182,212,0.2)]"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-[#06b6d4] font-black hover:scale-110 transition-transform">CLOSE [X]</button>
              <h2 className="text-2xl font-black text-[#06b6d4] mb-12 italic tracking-tighter">{t.modalTitle}</h2>
              <div className="space-y-8">
                {t.modalText.map((line, idx) => (
                  <p key={idx} className="text-[10px] leading-relaxed text-white/70 tracking-widest italic">{line}</p>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-white/5 text-[8px] text-white/20 tracking-[0.5em]">OMNIUTIL_PROTOCOL_V2040_SECURED</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="h-24 px-8 flex justify-between items-center border-b border-white/5 backdrop-blur-2xl sticky top-0 z-50 bg-black/40">
        <div className="flex items-center gap-4">
          <div className="w-1 h-8 bg-[#06b6d4] shadow-[0_0_15px_#06b6d4]" />
          <div className="flex flex-col text-left">
            <span className="font-black text-xl italic tracking-tighter">OMNIUTIL</span>
            <span className="text-[7px] text-[#06b6d4] font-bold tracking-[0.4em]">NODE_IAD1_VERIFIED</span>
          </div>
        </div>

        <nav className="hidden lg:flex gap-8 text-[9px] font-black text-white/40">
          <button onClick={() => setShowModal(true)} className="hover:text-white transition-all underline decoration-[#06b6d400] hover:decoration-[#06b6d4] underline-offset-4 uppercase">{t.about}</button>
          <a href={`https://bscscan.com/address/${bsc}`} target="_blank" className="hover:text-white transition-all">{t.donate}</a>
          <a href="mailto:partnership@omniutil.com" className="hover:text-white transition-all">{t.contact}</a>
        </nav>

        <div className="flex gap-3 text-[9px] font-black border border-white/10 p-2 rounded-full px-4 bg-white/5">
          {['FR','EN','ZH','AR'].map(l => (
            <button key={l} onClick={()=>setLang(l)} className={`${lang===l?'text-[#06b6d4]':'text-white/20'} transition-colors px-1`}>{l}</button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-20">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-24 items-center ${lang === 'AR' ? 'direction-rtl' : ''}`}>

          <section className="space-y-12">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter leading-none mb-6">
                {t.hero} <br/> <span className="text-[#06b6d4] drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">2040_GENESIS</span>
              </h1>
              <p className="text-[10px] text-white/30 tracking-[0.4em] font-bold">{t.sub}</p>
            </motion.div>

            <div className="space-y-8 border-l-2 border-[#06b6d433] pl-10">
              {t.steps.map((s, i) => (
                <div key={i} className="group cursor-help">
                  <span className="text-[#06b6d4] text-xs font-black block mb-1">0{i+1}_{s}</span>
                  <div className="h-[1px] w-0 group-hover:w-full bg-[#06b6d433] transition-all duration-700" />
                </div>
              ))}
            </div>

            <div className="p-8 bg-gradient-to-br from-[#06b6d411] to-transparent border border-[#06b6d422] rounded-[40px]">
              <h3 className="text-[10px] font-black mb-6 tracking-[0.5em] text-[#06b6d4]">{t.tax}</h3>
              <div className="grid grid-cols-2 gap-4 text-[10px] font-black italic">
                <div className="p-4 border border-white/5 rounded-2xl bg-black/40 text-center">OWNER: 0.5%</div>
                <div className="p-4 border border-white/5 rounded-2xl bg-black/40 text-center">TREASURY: 0.5%</div>
              </div>
            </div>
          </section>

          <div className="flex flex-col items-center justify-center space-y-10">
             <SovereignQR />
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.98 }}
               onClick={() => setShowModal(true)}
               className="w-full max-w-sm bg-[#06b6d4] text-black font-black py-5 rounded-full text-xs tracking-[0.3em] shadow-[0_0_30px_rgba(6,182,212,0.4)]"
             >
               {t.cta}
             </motion.button>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-white/5 p-10 flex flex-col lg:flex-row justify-between items-center gap-8 text-[8px] text-white/20 tracking-[0.5em]">
        <div className="flex flex-col gap-2 text-left">
          <span>CONTRACT_SOUVERAIN: {bsc}</span>
          <span>INTEGRITY_CHECK: PASSED_V3.0</span>
        </div>
        <div className="flex gap-8">
           <button onClick={() => setShowModal(true)} className="hover:text-white transition-all uppercase">WHITEPAPER</button>
           <a href="mailto:partnership@omniutil.com" className="hover:text-white transition-all uppercase">SUPPORT</a>
        </div>
        <span>© 2040 OMNIUTIL EMPIRE</span>
      </footer>
    </div>
  );
}
