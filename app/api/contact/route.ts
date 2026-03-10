import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { nome, cognome, email, messaggio } = await request.json();

  const { error } = await resend.emails.send({
    from: "Poster Media <info@poster-media.com>",
    to: "info@poster-media.com",
    replyTo: email,
    subject: `New collaboration request — ${nome} ${cognome}`,
    html: `
      <p><strong>Nome:</strong> ${nome} ${cognome}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Messaggio:</strong></p>
      <p>${messaggio}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
