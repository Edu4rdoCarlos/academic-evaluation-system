import { get, post, del } from './client';
import type { Goal } from '@/lib/types';

export function fetchGoals(): Promise<Goal[]> {
  return get('/goals');
}

export function createGoal(name: string): Promise<Goal> {
  return post('/goals', { name });
}

export function deleteGoal(id: string): Promise<Goal> {
  return del(`/goals/${id}`);
}
