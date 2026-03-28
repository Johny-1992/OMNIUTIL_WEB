'use client';
import { useState } from 'react';

export default function GraftForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  async function handleGraft(e: any) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    const res = await fetch('/api/partner-request', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    setStatus(result.ai_msg);
    setLoading(false);
  }

  return (
    <div className="bg-zinc-900/40 p-8 rounded-[32px] border border-white/5 backdrop-blur-xl uppercase">
      <h2 className="text-[#06b6d4] text-[10px] tracking-[0.5em] mb-8 font-black text-center">INITIALISER_LA_GREFFE</h2>
      <form onSubmit={handleGraft} className="space-y-6">
        <input name="partner_name" required className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-white text-[10px] outline-none" placeholder="NOM_ÉCOSYSTÈME" />
        <input name="api_endpoint" required className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-white text-[10px]" placeholder="API_ENDPOINT" />
        <input name="reward_rate" type="number" step="0.01" required className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-white text-[10px]" placeholder="TAUX_MÉRITE (%)" />
        <button type="submit" disabled={loading} className="w-full bg-[#06b6d4] text-black font-black py-4 rounded-full text-[9px] tracking-[0.4em]">
          {loading ? 'SÉCURISATION...' : 'VALORISER_L_ÉCOSYSTÈME'}
        </button>
      </form>
      {status && <p className="mt-6 text-[#06b6d4] text-[8px] text-center tracking-widest">{status}</p>}
    </div>
  );
}
