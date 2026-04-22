import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EvaluationsService } from '../services/evaluations.service';
import { HttpResponse } from '@/shared/utils/http-response';
import { UpsertEvaluationDto } from '../dto/upsert-evaluation.dto';
import { GetEvaluationsByClassApi, UpsertEvaluationApi } from '../decorators/evaluations-api.decorator';

@ApiTags('evaluations')
@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Get('class/:classId')
  @GetEvaluationsByClassApi()
  async findByClass(@Param('classId') classId: string) {
    return HttpResponse.of(await this.evaluationsService.findByClass(classId));
  }

  @Post()
  @UpsertEvaluationApi()
  async upsert(@Body() data: UpsertEvaluationDto) {
    return HttpResponse.of(await this.evaluationsService.upsert(data));
  }
}
