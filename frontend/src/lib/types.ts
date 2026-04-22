export type EvaluationConcept = "MANA" | "MPA" | "MA";

export interface Student {
  id: string;
  name: string;
  cpf: string;
  email: string;
}

export interface Class {
  id: string;
  topic: string;
  year: number;
  semester: 1 | 2;
  studentIds: string[];
}

export interface Evaluation {
  id: string;
  classId: string;
  studentId: string;
  goal: string;
  concept: EvaluationConcept;
  updatedAt: string;
}
