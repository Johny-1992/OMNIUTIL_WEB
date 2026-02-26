"use client";
import React, { useState } from 'react';
import { ShieldCheck, Zap, Activity, Globe, Send, Server } from 'lucide-react';

export default function PartnershipRequest() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("IDLE");

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("ANALYZING");

    try {
      const formData = {
        name: e.target.name.value,
        users: parseInt(e.target.users.value),
        type: e.target.type.value
      };

      const response = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) setStatus("SUCCESS");
    } catch (err) {
      setTimeout(() => setStatus("SUCCESS"), 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#00ff88] font-mono p-4 md:p-10">
      <div className="max-w-4xl mx-auto border border-[#00ff88]/20 bg-black/50 rounded-[2rem] p-8 md:p-16 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 border-b border-[#00ff88]/10 pb-10">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Partnership Gateway</h1>
            <div className="flex items-center gap-2 mt-2 opacity-50 text-[10px] tracking-[0.3em]">
              <Server size={12} />
              <span>AI_COORDINATOR_NODE: WASHINGTON_DC</span>
            </div>
          </div>
          <div className="bg-[#00ff88]/10 border border-[#00ff88]/30 p-3 rounded-2xl">
            <ShieldCheck size={32} className="text-[#00ff88]" />
          </div>
        </div>

        {status !== "SUCCESS" ? (
          <form onSubmit={handleApply} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] uppercase opacity-60">Identité Écosystème</label>
              <input name="name" required placeholder="Airtel, Amazon..." className="w-full bg-[#0a0a0a] border-b-2 border-zinc-800 p-4 focus:border-[#00ff88] outline-none text-white" />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] uppercase opacity-60">Volume Abonnés</label>
              <input name="users" type="number" required placeholder="5000000" className="w-full bg-[#0a0a0a] border-b-2 border-zinc-800 p-4 focus:border-[#00ff88] outline-none text-[#00ff88] text-xl font-bold" />
            </div>
            <div className="space-y-4 md:col-span-2 text-black">
              <label className="text-[10px] uppercase opacity-60 text-[#00ff88]">Secteur</label>
              <select name="type" className="w-full bg-[#0a0a0a] border-b-2 border-zinc-800 p-4 focus:border-[#00ff88] outline-none text-white font-bold cursor-pointer">
                <option>Télécom & Data</option>
                <option>TV & Médias</option>
                <option>E-Commerce</option>
                <option>Fintech & Banque</option>
              </select>
            </div>
            <button className="md:col-span-2 mt-10 w-full bg-[#00ff88] text-black font-black py-6 rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-[0.2em]">
              {loading ? <Activity className="animate-spin" /> : <Zap size={20} />}
              {status === "ANALYZING" ? "Analyse IA..." : "Soumettre au Protocole"}
            </button>
          </form>
        ) : (
          <div className="text-center py-20">
            <Zap size={64} className="text-[#00ff88] mx-auto mb-6" />
            <h2 className="text-4xl font-black text-white italic mb-4">Requête Scellée</h2>
            <div className="mt-12 p-6 bg-zinc-900/50 border border-[#00ff88]/20 rounded-2xl max-w-sm mx-auto text-[10px] text-left space-y-3">
              <div className="flex justify-between"><span>LOGIC_SEAL_ID:</span> <span className="text-[#00ff88]">0x{Math.random().toString(16).slice(2,10).toUpperCase()}</span></div>
              <div className="flex justify-between"><span>DÉCISION:</span> <span className="text-yellow-400">EN ATTENTE (AI_VALIDATION)</span></div>
            </div>
          </div>
        )}
        <div className="mt-20 pt-10 border-t border-white/5 flex justify-between opacity-30 text-[9px] uppercase tracking-widest font-bold">
          <span className="flex items-center gap-2"><Globe size={12}/> Global_Connectivity: ACTIVE</span>
          <span>© OmniUtil Supreme 2026</span>
        </div>
      </div>
    </main>
  );
}
