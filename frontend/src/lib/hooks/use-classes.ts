import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchClasses, fetchClass, createClass, updateClass, deleteClass } from "@/lib/api/classes";

export function useClasses() {
  return useQuery({ queryKey: ["classes"], queryFn: fetchClasses });
}

export function useClass(id: string) {
  return useQuery({ queryKey: ["classes", id], queryFn: () => fetchClass(id), enabled: !!id });
}

export function useCreateClass() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: createClass, onSuccess: () => qc.invalidateQueries({ queryKey: ["classes"] }) });
}

export function useUpdateClass() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateClass>[1] }) => updateClass(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: ["classes"] }) });
}

export function useDeleteClass() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: deleteClass, onSuccess: () => qc.invalidateQueries({ queryKey: ["classes"] }) });
}
