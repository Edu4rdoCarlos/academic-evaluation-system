import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoalsService } from '../services/goals.service';
import { HttpResponse } from '@/shared/utils/http-response';
import { CreateGoalDto } from '../dto/create-goal.dto';
import { ListGoalsApi, CreateGoalApi, DeleteGoalApi } from '../decorators/goals-api.decorator';

@ApiTags('goals')
@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  @ListGoalsApi()
  async listAll() {
    return HttpResponse.of(await this.goalsService.listAll());
  }

  @Post()
  @CreateGoalApi()
  async create(@Body() body: CreateGoalDto) {
    return HttpResponse.of(await this.goalsService.create(body.name));
  }

  @Delete(':id')
  @DeleteGoalApi()
  async delete(@Param('id') id: string) {
    return HttpResponse.of(await this.goalsService.delete(id));
  }
}
