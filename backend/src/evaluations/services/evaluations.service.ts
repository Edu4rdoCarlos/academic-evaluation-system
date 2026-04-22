import { Inject, Injectable } from '@nestjs/common';
import {
  IEvaluationRepository,
  EVALUATION_REPOSITORY,
  UpsertEvaluationData,
} from '../repositories/evaluation.repository.interface';
import { EmailDigestService } from '@/email-digest/services/email-digest.service';

@Injectable()
export class EvaluationsService {
  constructor(
    @Inject(EVALUATION_REPOSITORY)
    private readonly evaluationRepository: IEvaluationRepository,
    private readonly emailDigestService: EmailDigestService,
  ) {}

  findByClass(classId: string) {
    return this.evaluationRepository.findByClass(classId);
  }

  async upsert(data: UpsertEvaluationData) {
    const result = await this.evaluationRepository.upsert(data);
    await this.emailDigestService.queueChange(data.studentId, result.changeLog.id);
    return result;
  }
}
