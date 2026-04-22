import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchStudents, createStudent, updateStudent, deleteStudent } from "@/lib/api/students";

export function useStudents() {
  return useQuery({ queryKey: ["students"], queryFn: fetchStudents });
}

export function useCreateStudent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: createStudent, onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }) });
}

export function useUpdateStudent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateStudent>[1] }) => updateStudent(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }) });
}

export function useDeleteStudent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: deleteStudent, onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }) });
}
