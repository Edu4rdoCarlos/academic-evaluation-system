import { Class, ClassEnrollment } from '../models/class.model';

export interface CreateClassData {
  topic: string;
  year: number;
  semester: number;
}

export interface UpdateClassData {
  topic?: string;
  year?: number;
  semester?: number;
}

export interface IClassRepository {
  findAll(): Promise<Class[]>;
  findById(id: string): Promise<Class | null>;
  findWithStudents(id: string): Promise<(Class & { enrollments: ClassEnrollment[] }) | null>;
  create(data: CreateClassData): Promise<Class>;
  update(id: string, data: UpdateClassData): Promise<Class>;
  delete(id: string): Promise<void>;
  enroll(classId: string, studentId: string): Promise<ClassEnrollment>;
  unenroll(classId: string, studentId: string): Promise<void>;
  findEnrollments(classId: string): Promise<ClassEnrollment[]>;
}

export const CLASS_REPOSITORY = Symbol('CLASS_REPOSITORY');
