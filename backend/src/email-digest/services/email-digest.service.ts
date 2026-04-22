import { Inject, Injectable } from '@nestjs/common';
import { IEmailDigestRepository, EMAIL_DIGEST_REPOSITORY } from '../repositories/email-digest.repository.interface';
import { EmailService } from '@/email/email.service';
import { renderDigestEmail } from '@/infra/templates/digest-email.template';

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
    const { subject, html } = renderDigestEmail(digest);
    await this.emailService.send({ to: digest.student.email, subject, html });
    return this.emailDigestRepository.markSent(digestId);
  }
}
