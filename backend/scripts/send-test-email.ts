import 'dotenv/config';
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM;

if (!apiKey) throw new Error('RESEND_API_KEY is not set');
if (!from) throw new Error('EMAIL_FROM is not set');

const validatedFrom: string = from;

const resend = new Resend(apiKey);

async function main() {
  const { data, error } = await resend.emails.send({
    from: validatedFrom,
    to: 'xxx',
    subject: 'Test email — Sistema de Provas',
    html: `
      <h2>Email de teste</h2>
      <p>Se você recebeu esta mensagem, a integração com o Resend está funcionando corretamente.</p>
      <p><strong>From:</strong> ${from}</p>
      <p><strong>Sent at:</strong> ${new Date().toISOString()}</p>
    `,
  });

  if (error) {
    console.error('Failed to send email:', error);
    process.exit(1);
  }

  console.log('Email sent successfully. ID:', data?.id);
}

main();
