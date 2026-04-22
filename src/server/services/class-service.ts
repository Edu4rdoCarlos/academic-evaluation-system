import { randomUUID } from "crypto";
import { ClassRepository } from "@/server/repositories/class-repository";
import type { Class } from "@/lib/types";
import type { CreateClassInput, UpdateClassInput } from "@/lib/validations/class";

export class ClassService {
  private readonly repo = new ClassRepository();

  async listAll(): Promise<Class[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<Class | undefined> {
    return this.repo.findById(id);
  }

  async create(data: CreateClassInput): Promise<Class> {
    const cls: Class = { id: randomUUID(), ...data };
    await this.repo.save(cls);
    return cls;
  }

  async update(id: string, data: UpdateClassInput): Promise<Class | undefined> {
    const existing = await this.repo.findById(id);
    if (!existing) return undefined;
    const updated: Class = { ...existing, ...data };
    await this.repo.save(updated);
    return updated;
  }

  async remove(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}
