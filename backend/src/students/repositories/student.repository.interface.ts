import { Student } from '../models/student.model';

export interface CreateStudentData {
  name: string;
  cpf: string;
  email: string;
}

export interface UpdateStudentData {
  name?: string;
  cpf?: string;
  email?: string;
}

export interface IStudentRepository {
  findAll(): Promise<Student[]>;
  findById(id: string): Promise<Student | null>;
  findByCpf(cpf: string): Promise<Student | null>;
  create(data: CreateStudentData): Promise<Student>;
  update(id: string, data: UpdateStudentData): Promise<Student>;
  delete(id: string): Promise<void>;
}

export const STUDENT_REPOSITORY = Symbol('STUDENT_REPOSITORY');
