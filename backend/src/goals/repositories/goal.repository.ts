import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { IGoalRepository } from './goal.repository.interface';
import { Goal } from '../models/goal.model';

@Injectable()
export class GoalRepository implements IGoalRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Goal[]> {
    return this.prisma.goal.findMany({ orderBy: { name: 'asc' } });
  }

  findById(id: string): Promise<Goal | null> {
    return this.prisma.goal.findUnique({ where: { id } });
  }

  create(name: string): Promise<Goal> {
    return this.prisma.goal.create({ data: { name } });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.goal.delete({ where: { id } });
  }
}
