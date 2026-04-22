import { Inject, Injectable } from '@nestjs/common';
import { IGoalRepository, GOAL_REPOSITORY } from '../repositories/goal.repository.interface';

@Injectable()
export class GoalsService {
  constructor(
    @Inject(GOAL_REPOSITORY)
    private readonly goalRepository: IGoalRepository,
  ) {}

  listAll() { return this.goalRepository.findAll(); }
  findById(id: string) { return this.goalRepository.findById(id); }
  create(name: string) { return this.goalRepository.create(name); }
  delete(id: string) { return this.goalRepository.delete(id); }
}
