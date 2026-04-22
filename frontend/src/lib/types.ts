export type EvaluationConcept = 'MANA' | 'MPA' | 'MA';

export interface Student {
  id: string;
  name: string;
  cpf: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Class {
  id: string;
  topic: string;
  year: number;
  semester: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClassEnrollment {
  id: string;
  classId: string;
  studentId: string;
  enrolledAt: string;
}

export interface ClassWithEnrollments extends Class {
  enrollments: ClassEnrollment[];
}

export interface Goal {
  id: string;
  name: string;
  createdAt: string;
}

export interface Evaluation {
  id: string;
  classId: string;
  studentId: string;
  goalId: string;
  concept: EvaluationConcept;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMetadata {
  page: number;
  perPage: number;
  totalPage: number;
  totalItems: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  metadata: PaginationMetadata;
}
