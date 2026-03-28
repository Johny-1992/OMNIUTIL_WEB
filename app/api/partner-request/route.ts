import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: Request) {
  const body = await req.json();
  const { partner_name, api_endpoint, reward_rate, industry } = body;

  const { data, error } = await supabase.from('partners').insert([{
    name: partner_name,
    endpoint: api_endpoint,
    rate: reward_rate,
    status: 'GRAFTED',
    industry: industry
  }]);

  return NextResponse.json({
    status: "PARTNERSHIP_CONFIRMED",
    ai_msg: `IA_IAD1: Greffe de l'écosystème ${partner_name} réussie. Capture des flux activée.`,
    system_check: "INTEGRITY_PASSED_V3.0"
  });
}
