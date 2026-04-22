import { get, getPaginated, post, put, del } from './client';
import type { Student, PaginatedResponse } from '@/lib/types';
import type { CreateStudentInput, UpdateStudentInput } from '@/lib/validations/student';

export function fetchStudents(page = 1, perPage = 20): Promise<PaginatedResponse<Student>> {
  return getPaginated(`/students?page=${page}&perPage=${perPage}`);
}

export function fetchStudent(id: string): Promise<Student> {
  return get(`/students/${id}`);
}

export function createStudent(data: CreateStudentInput): Promise<Student> {
  return post('/students', data);
}

export function updateStudent(id: string, data: UpdateStudentInput): Promise<Student> {
  return put(`/students/${id}`, data);
}

export function deleteStudent(id: string): Promise<Student> {
  return del(`/students/${id}`);
}
