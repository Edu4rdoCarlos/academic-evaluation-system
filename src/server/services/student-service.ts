import { randomUUID } from "crypto";
import { StudentRepository } from "@/server/repositories/student-repository";
import type { Student } from "@/lib/types";
import type { CreateStudentInput, UpdateStudentInput } from "@/lib/validations/student";

export class StudentService {
  private readonly repo = new StudentRepository();

  async listAll(): Promise<Student[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<Student | undefined> {
    return this.repo.findById(id);
  }

  async create(data: CreateStudentInput): Promise<Student> {
    const student: Student = { id: randomUUID(), ...data };
    await this.repo.save(student);
    return student;
  }

  async update(id: string, data: UpdateStudentInput): Promise<Student | undefined> {
    const existing = await this.repo.findById(id);
    if (!existing) return undefined;
    const updated: Student = { ...existing, ...data };
    await this.repo.save(updated);
    return updated;
  }

  async remove(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}
