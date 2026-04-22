import { get, getPaginated, post, put, del } from './client';
import type { Class, ClassWithEnrollments, ClassEnrollment, PaginatedResponse } from '@/lib/types';
import type { CreateClassInput, UpdateClassInput } from '@/lib/validations/class';

export function fetchClasses(page = 1, perPage = 20): Promise<PaginatedResponse<Class>> {
  return getPaginated(`/classes?page=${page}&perPage=${perPage}`);
}

export function fetchClass(id: string): Promise<Class> {
  return get(`/classes/${id}`);
}

export function fetchClassWithStudents(id: string): Promise<ClassWithEnrollments> {
  return get(`/classes/${id}/students`);
}

export function createClass(data: CreateClassInput): Promise<Class> {
  return post('/classes', data);
}

export function updateClass(id: string, data: UpdateClassInput): Promise<Class> {
  return put(`/classes/${id}`, data);
}

export function deleteClass(id: string): Promise<Class> {
  return del(`/classes/${id}`);
}

export function enrollStudent(classId: string, studentId: string): Promise<ClassEnrollment> {
  return post(`/classes/${classId}/enrollments`, { studentId });
}

export function unenrollStudent(classId: string, studentId: string): Promise<ClassEnrollment> {
  return del(`/classes/${classId}/enrollments/${studentId}`);
}
