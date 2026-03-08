"use client";
import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle } from 'lucide-react';

export default function PartnershipRequest() {
  const [rate, setRate] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState("IDLE");
  const [lang, setLang] = useState("FR");

  useEffect(() => {
    const savedLang = localStorage.getItem('omni_lang') || 'FR';
    setLang(savedLang);
  }, []);

  const content = {
    FR: { title: "Manifeste de Souveraineté", alert: "⚠️ Anti-Fraude Active - La triche entraîne la Révocation.", label: "J'accepte le Manifeste de Rupture de Ban.", btn: "Sceller le Partenariat", success: "Greffe Réussie - Node Activé" },
    EN: { title: "Sovereignty Manifesto", alert: "⚠️ Anti-Fraud Active - Breach results in Revocation.", label: "I accept the Partnership Breach Manifesto.", btn: "Seal Partnership", success: "Graft Successful - Node Active" },
    ZH: { title: "主权宣言", alert: "⚠️ 反欺诈激活 - 违约导致撤销。", label: "我接受伙伴关系违约宣言。", btn: "封印合伙关系", success: "嫁接成功 - 节点激活" }
  };

  const handleSeal = () => {
    setStatus("SEALING");
    localStorage.setItem('partner_rate', rate);
    setTimeout(() => setStatus("SUCCESS"), 1500);
  };

  if (status === "SUCCESS") return (
    <div className="min-h-screen bg-[#010103] text-white flex items-center justify-center font-mono p-6">
      <div className="text-center p-12 border border-green-500 rounded-[3rem] bg-green-500/5 max-w-lg">
        <CheckCircle className="text-green-500 mx-auto mb-6" size={64} />
        <h2 className="text-2xl font-black uppercase tracking-tighter">{content[lang].success}</h2>
        <p className="mt-4 opacity-50 text-[10px] uppercase">API_KEY: OMNI-ADMISSION-7210C77D</p>
      </div>
    </div>
  );

  const current = content[lang] || content.FR;

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono p-10 flex flex-col items-center">
      <div className="max-w-3xl w-full border border-cyan-500/30 p-10 rounded-[3rem] bg-black/50 backdrop-blur-3xl shadow-2xl">
        <h1 className="text-4xl font-black italic mb-8 text-cyan-500 uppercase">{current.title}</h1>
        <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-2xl mb-8">
          <p className="text-[12px] text-red-500 font-black uppercase">{current.alert}</p>
        </div>
        <input type="number" placeholder="Taux (ex: 0.1)" value={rate} onChange={(e) => setRate(e.target.value)}
          className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-2xl font-black text-cyan-400 mb-8 outline-none focus:border-cyan-500" />
        <div className="flex items-start gap-4 mb-8">
          <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="w-6 h-6 rounded border-cyan-500 cursor-pointer" />
          <label className="text-[11px] opacity-70 uppercase cursor-pointer leading-tight">{current.label}</label>
        </div>
        <button disabled={!agreed || !rate || status === "SEALING"} onClick={handleSeal}
          className={`w-full py-8 rounded-full font-black uppercase transition-all ${agreed && rate ? 'bg-cyan-500 text-black shadow-[0_0_30px_rgba(6,182,212,0.6)]' : 'bg-white/5 text-white/20'}`}>
          {status === "SEALING" ? "SCELLAGE..." : current.btn}
        </button>
      </div>
    </main>
  );
}
