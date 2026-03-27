'use client';
import { SovereignHUD } from '../../components/SovereignHUD';

export default function PartnershipPage() {
  return (
    <SovereignHUD valuation="3 650 $ / UTIL" version="v9.0-PARTNER">
      <div className="p-8 liquid-glass border border-[#06b6d433] max-w-xl mx-auto mt-20">
        <h1 className="text-[#06b6d4] font-black tracking-tighter text-xl mb-4">PORTAIL PARTENAIRE IAD1</h1>
        <p className="text-[10px] font-mono text-white/60">
          En attente de signal de greffe... Connectez votre API de facturation via le QR Code principal.
        </p>
      </div>
    </SovereignHUD>
  );
}
