'use client';
import { useState } from 'react';

export default function ContactPanel() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendToOwner(e: any) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const payload = {
      sender: formData.get('sender'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (result.success) setStatus('✓_TRANSMISSION_GMAIL_CONFIRMÉE');
    setLoading(false);
  }

  return (
    <div className="bg-zinc-900/40 p-10 rounded-[48px] border border-[#06b6d433] backdrop-blur-3xl uppercase font-black">
      <h3 className="text-[#06b6d4] text-[10px] tracking-[0.6em] mb-10 text-center">04_CANAL_DIRECT_ARCHITECTE</h3>
      
      {status ? (
        <div className="text-center py-20 space-y-4 animate-pulse">
          <p className="text-[#06b6d4] text-[12px] tracking-[0.5em]">{status}</p>
          <p className="text-[7px] opacity-40">DESTINATION: JOHNYMULENDA5@GMAIL.COM</p>
          <button onClick={() => setStatus('')} className="text-[7px] border-b border-white/20 mt-4">NOUVEAU_MESSAGE</button>
        </div>
      ) : (
        <form onSubmit={sendToOwner} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input name="sender" required className="w-full bg-black/60 border border-zinc-800 p-5 rounded-2xl text-white text-[10px] outline-none focus:border-[#06b6d4]" placeholder="VOTRE_IDENTIFIANT_OU_MAIL" />
             <select name="subject" className="w-full bg-black/60 border border-zinc-800 p-5 rounded-2xl text-white text-[10px] outline-none">
                <option>RECOMMANDATION_SYSTÉMIQUE</option>
                <option>PARTENARIAT_HAUTE_VALEUR</option>
                <option>URGENCE_INFRASTRUCTURE</option>
             </select>
          </div>
          <textarea name="message" required className="w-full bg-black/60 border border-zinc-800 p-5 rounded-2xl text-white text-[10px] h-40 outline-none focus:border-[#06b6d4]" placeholder="MESSAGE_SOUVERAIN_POUR_L_OWNER" />
          <button disabled={loading} className="w-full bg-white text-black py-6 rounded-full text-[10px] tracking-[0.5em] hover:bg-[#06b6d4] transition-all font-black shadow-xl">
            {loading ? 'TRANSMISSION...' : 'PROPULSER_LE_MESSAGE'}
          </button>
        </form>
      )}
    </div>
  );
}
