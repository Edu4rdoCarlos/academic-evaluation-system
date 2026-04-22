import { Module } from '@nestjs/common';
import { EmailDigestController } from './controllers/email-digest.controller';
import { EmailDigestService } from './services/email-digest.service';
import { EmailDigestRepository } from './repositories/email-digest.repository';
import { EMAIL_DIGEST_REPOSITORY } from './repositories/email-digest.repository.interface';
import { EmailModule } from '@/email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [EmailDigestController],
  providers: [
    EmailDigestService,
    { provide: EMAIL_DIGEST_REPOSITORY, useClass: EmailDigestRepository },
  ],
  exports: [EmailDigestService],
})
export class EmailDigestModule {}
