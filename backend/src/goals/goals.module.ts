import { Module } from '@nestjs/common';
import { GoalsController } from './controllers/goals.controller';
import { GoalsService } from './services/goals.service';
import { GoalRepository } from './repositories/goal.repository';
import { GOAL_REPOSITORY } from './repositories/goal.repository.interface';

@Module({
  controllers: [GoalsController],
  providers: [
    GoalsService,
    { provide: GOAL_REPOSITORY, useClass: GoalRepository },
  ],
  exports: [GoalsService],
})
export class GoalsModule {}
