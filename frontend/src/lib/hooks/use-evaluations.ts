import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEvaluationsByClass, upsertEvaluation } from '@/lib/api/evaluations';

export function useEvaluationsByClass(classId: string) {
  return useQuery({
    queryKey: ['evaluations', classId],
    queryFn: () => fetchEvaluationsByClass(classId),
    enabled: !!classId,
  });
}

export function useUpsertEvaluation(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: upsertEvaluation,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['evaluations', classId] }),
  });
}
