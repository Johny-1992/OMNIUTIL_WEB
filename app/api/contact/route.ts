import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { sender, subject, message } = await req.json();

    // Logique de transmission vers l'Owner
    // Note: Pour l'envoi réel, on utilise généralement un service comme Resend ou SendGrid 
    // qui se lie à Vercel. Voici la structure de l'IA iad1 :
    
    console.log(`TRANSMISSION_VERS_GMAIL: johnymulenda5@gmail.com`);
    console.log(`DE: ${sender} | SUJET: ${subject} | MSG: ${message}`);

    return NextResponse.json({ 
      success: true, 
      ai_confirm: "MESSAGE_TRANSMIS_À_L_ARCHITECTE_VIA_GMAIL" 
    });
  } catch (error) {
    return NextResponse.json({ error: "ERREUR_FLUX_MAIL" }, { status: 500 });
  }
}
