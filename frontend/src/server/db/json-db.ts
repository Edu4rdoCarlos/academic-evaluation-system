import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.resolve(process.cwd(), "data");

export async function readCollection<T>(name: string): Promise<T[]> {
  const file = path.join(DATA_DIR, `${name}.json`);
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

export async function writeCollection<T>(name: string, data: T[]): Promise<void> {
  const file = path.join(DATA_DIR, `${name}.json`);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}
