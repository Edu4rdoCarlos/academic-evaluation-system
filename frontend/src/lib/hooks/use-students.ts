import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchStudents, fetchStudent, createStudent, updateStudent, deleteStudent } from '@/lib/api/students';
import type { UpdateStudentInput } from '@/lib/validations/student';

export function useStudents(page = 1, perPage = 20) {
  return useQuery({
    queryKey: ['students', page, perPage],
    queryFn: () => fetchStudents(page, perPage),
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: ['students', id],
    queryFn: () => fetchStudent(id),
    enabled: !!id,
  });
}

export function useCreateStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['students'] }),
  });
}

export function useUpdateStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStudentInput }) => updateStudent(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['students'] }),
  });
}

export function useDeleteStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['students'] }),
  });
}
