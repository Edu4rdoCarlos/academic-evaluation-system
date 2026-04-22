import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EvaluationsService } from '../services/evaluations.service';
import { UpsertEvaluationData } from '../repositories/evaluation.repository.interface';
import { HttpResponse } from '@/shared/utils/http-response';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Get('class/:classId')
  async findByClass(@Param('classId') classId: string) {
    return HttpResponse.of(await this.evaluationsService.findByClass(classId));
  }

  @Post()
  async upsert(@Body() data: UpsertEvaluationData) {
    return HttpResponse.of(await this.evaluationsService.upsert(data));
  }
}
