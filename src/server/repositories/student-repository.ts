import { readCollection, writeCollection } from "@/server/db/json-db";
import type { Student } from "@/lib/types";

const COLLECTION = "students";

export class StudentRepository {
  async findAll(): Promise<Student[]> {
    return readCollection<Student>(COLLECTION);
  }

  async findById(id: string): Promise<Student | undefined> {
    const all = await this.findAll();
    return all.find((s) => s.id === id);
  }

  async save(student: Student): Promise<void> {
    const all = await this.findAll();
    const index = all.findIndex((s) => s.id === student.id);
    if (index >= 0) {
      all[index] = student;
    } else {
      all.push(student);
    }
    await writeCollection(COLLECTION, all);
  }

  async delete(id: string): Promise<boolean> {
    const all = await this.findAll();
    const filtered = all.filter((s) => s.id !== id);
    if (filtered.length === all.length) return false;
    await writeCollection(COLLECTION, filtered);
    return true;
  }
}
