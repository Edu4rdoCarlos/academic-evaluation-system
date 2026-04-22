import { Inject, Injectable } from '@nestjs/common';
import { IEmailDigestRepository, EMAIL_DIGEST_REPOSITORY } from '../repositories/email-digest.repository.interface';

@Injectable()
export class EmailDigestService {
  constructor(
    @Inject(EMAIL_DIGEST_REPOSITORY)
    private readonly emailDigestRepository: IEmailDigestRepository,
  ) {}

  async queueChange(studentId: string, changeLogId: string) {
    const digest = await this.emailDigestRepository.findOrCreateForToday(studentId);
    return this.emailDigestRepository.addItem(digest.id, changeLogId);
  }

  findPending() {
    return this.emailDigestRepository.findPending();
  }

  markSent(digestId: string) {
    return this.emailDigestRepository.markSent(digestId);
  }
}
