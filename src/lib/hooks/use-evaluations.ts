import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEvaluations, upsertEvaluation } from "@/lib/api/evaluations";

export function useEvaluations(classId?: string) {
  return useQuery({ queryKey: ["evaluations", classId], queryFn: () => fetchEvaluations(classId) });
}

export function useUpsertEvaluation() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: upsertEvaluation, onSuccess: () => qc.invalidateQueries({ queryKey: ["evaluations"] }) });
}
