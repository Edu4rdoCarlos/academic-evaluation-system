import { Inject, Injectable } from '@nestjs/common';
import { IEmailDigestRepository, EMAIL_DIGEST_REPOSITORY, DigestWithDetails } from '../repositories/email-digest.repository.interface';
import { EmailService } from '@/email/email.service';

@Injectable()
export class EmailDigestService {
  constructor(
    @Inject(EMAIL_DIGEST_REPOSITORY)
    private readonly emailDigestRepository: IEmailDigestRepository,
    private readonly emailService: EmailService,
  ) {}

  async queueChange(studentId: string, changeLogId: string) {
    const digest = await this.emailDigestRepository.findOrCreateForToday(studentId);
    return this.emailDigestRepository.addItem(digest.id, changeLogId);
  }

  findPending() {
    return this.emailDigestRepository.findPending();
  }

  async markSent(digestId: string) {
    const digest = await this.emailDigestRepository.findByIdWithDetails(digestId);
    await this.emailService.send({
      to: digest.student.email,
      subject: 'Suas avaliações foram atualizadas',
      html: buildEmailHtml(digest),
    });
    return this.emailDigestRepository.markSent(digestId);
  }
}

function buildEmailHtml(digest: DigestWithDetails): string {
  const rows = digest.items
    .map(({ changeLog: c }) => {
      const from = c.oldConcept ?? '—';
      return `<tr><td>${c.class.topic}</td><td>${c.goal.name}</td><td>${from}</td><td>${c.newConcept}</td></tr>`;
    })
    .join('');

  return `
    <p>Olá, ${digest.student.name}!</p>
    <p>As seguintes avaliações foram registradas ou alteradas hoje:</p>
    <table border="1" cellpadding="6" cellspacing="0">
      <thead><tr><th>Turma</th><th>Meta</th><th>Anterior</th><th>Novo</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}
