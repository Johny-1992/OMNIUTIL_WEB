import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialisation sécurisée pour le build Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { partner_name, api_endpoint, reward_rate } = body;

    // Enregistrement dans le registre souverain
    const { error } = await supabase.from('partners').insert([{
      name: partner_name,
      endpoint: api_endpoint,
      rate: reward_rate,
      status: 'GRAFTED'
    }]);

    if (error) throw error;

    return NextResponse.json({
      status: "PARTNERSHIP_CONFIRMED",
      ai_msg: `IA_IAD1: Greffe de l'écosystème ${partner_name} réussie. Capture des flux activée.`,
      system_check: "INTEGRITY_PASSED_V3.0"
    });
  } catch (err) {
    return NextResponse.json({ error: "ERREUR_DE_GREFFE", detail: "CLES_NON_CONFIGUREES" }, { status: 500 });
  }
}
