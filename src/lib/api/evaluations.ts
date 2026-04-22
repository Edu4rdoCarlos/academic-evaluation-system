import type { Evaluation } from "@/lib/types";
import type { UpsertEvaluationInput } from "@/lib/validations/evaluation";

const BASE = "/api/evaluations";

export async function fetchEvaluations(classId?: string): Promise<Evaluation[]> {
  const url = classId ? `${BASE}?classId=${classId}` : BASE;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch evaluations");
  return res.json();
}

export async function upsertEvaluation(data: UpsertEvaluationInput): Promise<Evaluation> {
  const res = await fetch(BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Failed to upsert evaluation");
  return res.json();
}
