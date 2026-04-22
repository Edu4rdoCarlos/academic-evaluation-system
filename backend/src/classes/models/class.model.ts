export class Class {
  readonly id: string;
  readonly topic: string;
  readonly year: number;
  readonly semester: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class ClassEnrollment {
  readonly id: string;
  readonly classId: string;
  readonly studentId: string;
  readonly enrolledAt: Date;
}
