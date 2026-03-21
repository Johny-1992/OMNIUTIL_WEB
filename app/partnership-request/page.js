"use client";
import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle, Cpu, Link, Globe, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PartnershipRequest() {
  const [formData, setFormData] = useState({ ecoName: "", api: "", rate: "", agreed: false });
  const [status, setStatus] = useState("IDLE");
  const [lang, setLang] = useState("FR");

  useEffect(() => {
    const s = localStorage.getItem('omni_lang') || 'FR';
    setLang(s);
  }, []);

  const dict = {
    FR: { title: "TERMINAL DE GREFFE IA", alert: "⚠️ ANTI-FRAUDE ACTIVE : RÉVOCATION SI TRICHE SUR FLUX.", eco: "ID ÉCOSYSTÈME (AIRTEL, AMAZON...)", api: "URL API FACTURATION (HTTPS)", rate: "RÉCOMPENSE (%) SUR CONSOMMATION", check: "J'ACCEPTE LE MANIFESTE DE RUPTURE DE BAN.", btn: "SCELLER LE PARTENARIAT", success: "ÉCOSYSTÈME GREFFÉ - MINT ACTIF", note: "Distribution auto (1M UTIL/an)." },
    EN: { title: "AI GRAFT TERMINAL", alert: "⚠️ ANTI-FRAUD ACTIVE: REVOCATION IF FLOW FRAUD.", eco: "ECOSYSTEM ID (AIRTEL, AMAZON...)", api: "BILLING API URL (HTTPS)", rate: "REWARD RATE (%) ON CONSUMPTION", check: "I ACCEPT THE PARTNERSHIP BREACH MANIFESTO.", btn: "SEAL PARTNERSHIP", success: "ECOSYSTEM GRAFTED - MINT ACTIVE", note: "Auto-distribute (1M UTIL/year)." },
    ZH: { title: "人工智能嫁接终端", alert: "⚠️ 反欺诈激活：如果流程欺诈，则撤销。", eco: "生态系统 ID (AIRTEL, AMAZON...)", api: "计费 API URL (HTTPS)", rate: "消费奖励率 (%)", check: "我接受伙伴关系违约宣言。", btn: "封印合伙关系", success: "生态系统已嫁接 - 铸币激活", note: "自动分配 (100万 UTIL/年)。" },
    AR: { title: "محطة تطعيم الذكاء الاصطناعي", alert: "⚠️ مكافحة الاحتيال نشطة: الإلغاء في حالة الغش.", eco: "معرف النظام البيئي (AIRTEL, AMAZON...)", api: "رابط API للفواتير (HTTPS)", rate: "معدل المكافأة (%) على الاستهلاك", check: "أنا أقبل بيان خرق الشراكة.", btn: "ختم الشراكة", success: "تم تطعيم النظام البيئي - السك نشط", note: "توزيع تلقائي (1 مليون UTIL/سنة)." }
  };

  const current = dict[lang] || dict.FR;

  const handleSeal = async () => {
    setStatus("SEALING");
    // L'IA Coordinatrice simule ici la liaison avec api/partner_engine.py
    setTimeout(() => setStatus("SUCCESS"), 3000);
  };

  if (status === "SUCCESS") return (
    <main className="min-h-screen bg-[#010103] text-white flex items-center justify-center font-mono p-6">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-12 border border-cyan-500 rounded-[3rem] bg-cyan-500/5 max-w-lg shadow-[0_0_80px_rgba(6,182,212,0.2)]">
        <CheckCircle className="text-cyan-400 mx-auto mb-6" size={80} />
        <h2 className="text-2xl font-black uppercase text-cyan-400 mb-4">{current.success}</h2>
        <p className="text-[10px] opacity-60 uppercase tracking-[0.2em]">{current.note}</p>
      </motion.div>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono p-6 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full border border-white/10 p-10 rounded-[4rem] bg-black/40 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-5"><Cpu size={300} /></div>
        
        <h1 className="text-3xl font-black italic mb-8 text-cyan-500 uppercase">{current.title}</h1>
        <div className="bg-red-900/20 border border-red-500/40 p-4 rounded-2xl mb-10 text-[10px] text-red-500 font-black uppercase flex items-center gap-3">
          <ShieldAlert size={20}/> {current.alert}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-2">
            <label className="text-[9px] opacity-40 uppercase ml-2">{current.eco}</label>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-4 focus-within:border-cyan-500 transition-all">
              <Globe size={18} className="opacity-20 mr-4" />
              <input type="text" placeholder="AIRTEL_RDC" className="bg-transparent w-full outline-none font-black text-cyan-400 uppercase" 
              onChange={(e) => setFormData({...formData, ecoName: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] opacity-40 uppercase ml-2">{current.api}</label>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-4 focus-within:border-cyan-500 transition-all">
              <Link size={18} className="opacity-20 mr-4" />
              <input type="text" placeholder="https://api.partner.com" className="bg-transparent w-full outline-none font-black text-xs" 
              onChange={(e) => setFormData({...formData, api: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-2">
            <label className="text-[9px] opacity-40 uppercase ml-2">{current.rate}</label>
            <input type="number" placeholder="5" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-2xl font-black text-cyan-400 outline-none focus:border-cyan-500" 
            onChange={(e) => setFormData({...formData, rate: e.target.value})} />
          </div>
          <div className="flex items-center p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
            <p className="text-[8px] opacity-60 uppercase italic leading-relaxed">Génération automatique des Wallets IDs via IA Coordinatrice iad1.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-10 cursor-pointer" onClick={() => setFormData({...formData, agreed: !formData.agreed})}>
          <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all ${formData.agreed ? 'bg-cyan-500 border-cyan-500' : 'border-white/20'}`}>
            {formData.agreed && <CheckCircle size={16} className="text-black" />}
          </div>
          <label className="text-[10px] opacity-50 uppercase leading-snug select-none">{current.check}</label>
        </div>

        <button 
          disabled={!formData.agreed || !formData.ecoName || !formData.api || status === "SEALING"} 
          onClick={handleSeal}
          className="w-full py-8 rounded-[2rem] font-black uppercase text-xl transition-all shadow-[0_0_40px_rgba(6,182,212,0.1)]"
          style={{ backgroundColor: formData.agreed && formData.ecoName ? '#06b6d4' : '#1a1a1a', color: formData.agreed && formData.ecoName ? '#000' : '#444' }}
        >
          {status === "SEALING" ? "INITIALISATION DU NODE iad1..." : current.btn}
        </button>
      </div>
    </main>
  );
}
