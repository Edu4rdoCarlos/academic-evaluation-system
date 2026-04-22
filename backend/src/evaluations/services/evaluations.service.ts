import { Inject, Injectable } from '@nestjs/common';
import {
  IEvaluationRepository,
  EVALUATION_REPOSITORY,
  UpsertEvaluationData,
} from '../repositories/evaluation.repository.interface';

@Injectable()
export class EvaluationsService {
  constructor(
    @Inject(EVALUATION_REPOSITORY)
    private readonly evaluationRepository: IEvaluationRepository,
  ) {}

  findByClass(classId: string) {
    return this.evaluationRepository.findByClass(classId);
  }

  upsert(data: UpsertEvaluationData) {
    return this.evaluationRepository.upsert(data);
  }
}
