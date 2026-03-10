"use client";
import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle, Activity } from 'lucide-react';

export default function PartnershipRequest() {
  const [rate, setRate] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState("IDLE");
  const [lang, setLang] = useState("FR");

  useEffect(() => {
    const s = localStorage.getItem('omni_lang') || 'FR';
    setLang(s);
  }, []);

  const dict = {
    FR: { title: "CERTIFICATION IA", alert: "⚠️ Anti-Fraude Active : Révocation en cas de triche.", rate: "Taux de Récompense (%)", check: "J'accepte le Manifeste de Rupture de Ban.", btn: "SCELLER LE PARTENARIAT", success: "ADMISSION VALIDÉE" },
    EN: { title: "AI CERTIFICATION", alert: "⚠️ Anti-Fraud Active: Breach results in Revocation.", rate: "Reward Rate (%)", check: "I accept the Partnership Breach Manifesto.", btn: "SEAL PARTNERSHIP", success: "ADMISSION VALIDATED" },
    ZH: { title: "人工智能认证", alert: "⚠️ 反欺诈激活：违约导致撤销。", rate: "奖励率 (%)", check: "我接受伙伴关系违约宣言。", btn: "封印合伙关系", success: "录取验证" },
    AR: { title: "شهادة الذكاء الاصطناعي", alert: "⚠️ مكافحة الاحتيال نشطة: الانتهاك يؤدي إلى الإلغاء.", rate: "معدل المكافأة (%)", check: "أنا أقبل بيان خرق الشراكة.", btn: "ختم الشراكة", success: "تم التحقق من القبول" }
  };

  const current = dict[lang] || dict.FR;

  if (status === "SUCCESS") return (
    <main className="min-h-screen bg-[#010103] text-white flex items-center justify-center font-mono">
      <div className="text-center p-12 border border-green-500 rounded-[3rem] bg-green-500/5 max-w-lg">
        <CheckCircle className="text-green-500 mx-auto mb-6" size={64} />
        <h2 className="text-2xl font-black uppercase">{current.success}</h2>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#010103] text-white font-mono p-10 flex flex-col items-center">
      <div className="max-w-3xl w-full border border-white/10 p-12 rounded-[3rem] bg-black/50 backdrop-blur-3xl shadow-2xl">
        <h1 className="text-4xl font-black italic mb-8 text-cyan-500 uppercase">{current.title}</h1>
        <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-2xl mb-8 text-[10px] text-red-500 font-black uppercase">{current.alert}</div>
        <input type="number" placeholder={current.rate} value={rate} onChange={(e) => setRate(e.target.value)} className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-2xl font-black text-cyan-400 mb-8 outline-none focus:border-cyan-500" />
        <div className="flex items-start gap-4 mb-8">
          <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="w-6 h-6 rounded border-cyan-500 cursor-pointer" />
          <label className="text-[11px] opacity-70 uppercase leading-tight">{current.check}</label>
        </div>
        <button disabled={!agreed || !rate || status === "SEALING"} onClick={() => {setStatus("SEALING"); setTimeout(()=>setStatus("SUCCESS"), 2000);}} className="w-full py-8 rounded-full font-black uppercase bg-cyan-500 text-black shadow-2xl transition-all">
          {status === "SEALING" ? "PROCESS..." : current.btn}
        </button>
      </div>
    </main>
  );
}
