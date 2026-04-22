import type { Class } from "@/lib/types";
import type { CreateClassInput, UpdateClassInput } from "@/lib/validations/class";

const BASE = "/api/classes";

export async function fetchClasses(): Promise<Class[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch classes");
  return res.json();
}

export async function fetchClass(id: string): Promise<Class> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch class");
  return res.json();
}

export async function createClass(data: CreateClassInput): Promise<Class> {
  const res = await fetch(BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to create class");
  return res.json();
}

export async function updateClass(id: string, data: UpdateClassInput): Promise<Class> {
  const res = await fetch(`${BASE}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to update class");
  return res.json();
}

export async function deleteClass(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete class");
}
