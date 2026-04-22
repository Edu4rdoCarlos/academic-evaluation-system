import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EvaluationsService } from '../services/evaluations.service';
import { UpsertEvaluationData } from '../repositories/evaluation.repository.interface';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Get('class/:classId')
  findByClass(@Param('classId') classId: string) {
    return this.evaluationsService.findByClass(classId);
  }

  @Post()
  upsert(@Body() data: UpsertEvaluationData) {
    return this.evaluationsService.upsert(data);
  }
}
