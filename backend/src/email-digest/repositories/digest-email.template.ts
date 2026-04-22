import { DigestWithDetails } from '@/email-digest/repositories/email-digest.repository.interface';

export function renderDigestEmail(digest: DigestWithDetails): { subject: string; html: string } {
  return {
    subject: 'Suas avaliações foram atualizadas',
    html: buildHtml(digest),
  };
}

function buildHtml(digest: DigestWithDetails): string {
  const rows = digest.items
    .map(({ changeLog: c }) => {
      const previous = c.oldConcept
        ? `<span style="color:#64748b">${c.oldConcept}</span>`
        : `<span style="color:#94a3b8">—</span>`;
      return `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0">${c.class.topic}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0">${c.goal.name}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;text-align:center">${previous}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;text-align:center">
            <strong style="color:#0f172a">${c.newConcept}</strong>
          </td>
        </tr>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;color:#1e293b">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)">

          <tr>
            <td style="background:#0f172a;padding:24px 32px">
              <p style="margin:0;font-size:18px;font-weight:bold;color:#ffffff">Sistema de Provas</p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px">
              <p style="margin:0 0 8px;font-size:20px;font-weight:bold">Olá, ${digest.student.name}!</p>
              <p style="margin:0 0 24px;color:#475569">As seguintes avaliações foram registradas ou alteradas hoje:</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:6px;overflow:hidden;border:1px solid #e2e8f0">
                <thead>
                  <tr style="background:#f1f5f9">
                    <th style="padding:10px 14px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#64748b">Turma</th>
                    <th style="padding:10px 14px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#64748b">Meta</th>
                    <th style="padding:10px 14px;text-align:center;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#64748b">Anterior</th>
                    <th style="padding:10px 14px;text-align:center;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#64748b">Atual</th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 32px 24px;border-top:1px solid #f1f5f9">
              <p style="margin:0;font-size:12px;color:#94a3b8">
                Este é um email automático. Por favor, não responda.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
