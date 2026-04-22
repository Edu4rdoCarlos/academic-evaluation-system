import { Module } from '@nestjs/common';
import { EvaluationsController } from './controllers/evaluations.controller';
import { EvaluationsService } from './services/evaluations.service';
import { EvaluationRepository } from './repositories/evaluation.repository';
import { EVALUATION_REPOSITORY } from './repositories/evaluation.repository.interface';
import { EmailDigestModule } from '@/email-digest/email-digest.module';

@Module({
  imports: [EmailDigestModule],
  controllers: [EvaluationsController],
  providers: [
    EvaluationsService,
    { provide: EVALUATION_REPOSITORY, useClass: EvaluationRepository },
  ],
  exports: [EvaluationsService],
})
export class EvaluationsModule {}
