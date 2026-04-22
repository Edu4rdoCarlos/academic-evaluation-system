import { readCollection, writeCollection } from "@/server/db/json-db";
import type { Class } from "@/lib/types";

const COLLECTION = "classes";

export class ClassRepository {
  async findAll(): Promise<Class[]> {
    return readCollection<Class>(COLLECTION);
  }

  async findById(id: string): Promise<Class | undefined> {
    const all = await this.findAll();
    return all.find((c) => c.id === id);
  }

  async save(cls: Class): Promise<void> {
    const all = await this.findAll();
    const index = all.findIndex((c) => c.id === cls.id);
    if (index >= 0) {
      all[index] = cls;
    } else {
      all.push(cls);
    }
    await writeCollection(COLLECTION, all);
  }

  async delete(id: string): Promise<boolean> {
    const all = await this.findAll();
    const filtered = all.filter((c) => c.id !== id);
    if (filtered.length === all.length) return false;
    await writeCollection(COLLECTION, filtered);
    return true;
  }
}
