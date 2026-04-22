import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { GoalsService } from '../services/goals.service';
import { HttpResponse } from '@/shared/utils/http-response';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  async listAll() {
    return HttpResponse.of(await this.goalsService.listAll());
  }

  @Post()
  async create(@Body('name') name: string) {
    return HttpResponse.of(await this.goalsService.create(name));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return HttpResponse.of(await this.goalsService.delete(id));
  }
}
