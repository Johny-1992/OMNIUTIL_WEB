'use client';
export default function DevelopmentPanel() {
  return (
    <div className="bg-zinc-900/40 p-8 rounded-[40px] border border-white/5 backdrop-blur-3xl animate-in slide-in-from-bottom duration-500 text-center">
      <h3 className="text-[#06b6d4] text-[10px] tracking-[0.5em] font-black mb-6 uppercase">03_PROPOSER_UN_NOEUD</h3>
      <input className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-white text-[10px] mb-4 outline-none focus:border-[#06b6d4]" placeholder="NOM_ECOSYSTEME" />
      <textarea className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-white text-[10px] h-32 mb-4 outline-none focus:border-[#06b6d4]" placeholder="DESCRIPTION_SERVICES" />
      <button className="w-full bg-white text-black font-black py-4 rounded-full text-[9px] tracking-[0.4em]">SOUMETTRE_IA_IAD1</button>
    </div>
  );
}
