import type { Student } from "@/lib/types";
import type { CreateStudentInput, UpdateStudentInput } from "@/lib/validations/student";

const BASE = "/api/students";

export async function fetchStudents(): Promise<Student[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
}

export async function createStudent(data: CreateStudentInput): Promise<Student> {
  const res = await fetch(BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to create student");
  return res.json();
}

export async function updateStudent(id: string, data: UpdateStudentInput): Promise<Student> {
  const res = await fetch(`${BASE}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to update student");
  return res.json();
}

export async function deleteStudent(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete student");
}
