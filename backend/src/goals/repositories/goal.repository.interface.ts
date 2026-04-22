import { Goal } from '../models/goal.model';

export interface IGoalRepository {
  findAll(): Promise<Goal[]>;
  findById(id: string): Promise<Goal | null>;
  create(name: string): Promise<Goal>;
  delete(id: string): Promise<void>;
}

export const GOAL_REPOSITORY = Symbol('GOAL_REPOSITORY');
