import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { GoalsService } from '../services/goals.service';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  listAll() { return this.goalsService.listAll(); }

  @Post()
  create(@Body('name') name: string) { return this.goalsService.create(name); }

  @Delete(':id')
  delete(@Param('id') id: string) { return this.goalsService.delete(id); }
}
