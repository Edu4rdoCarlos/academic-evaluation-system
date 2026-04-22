import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchClasses,
  fetchClassWithStudents,
  createClass,
  updateClass,
  deleteClass,
  enrollStudent,
  unenrollStudent,
} from '@/lib/api/classes';
import type { UpdateClassInput } from '@/lib/validations/class';

export function useClasses(page = 1, perPage = 20) {
  return useQuery({
    queryKey: ['classes', page, perPage],
    queryFn: () => fetchClasses(page, perPage),
  });
}

export function useClassWithStudents(id: string) {
  return useQuery({
    queryKey: ['classes', id, 'students'],
    queryFn: () => fetchClassWithStudents(id),
    enabled: !!id,
  });
}

export function useCreateClass() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createClass,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['classes'] }),
  });
}

export function useUpdateClass() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClassInput }) => updateClass(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['classes'] }),
  });
}

export function useDeleteClass() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteClass,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['classes'] }),
  });
}

export function useEnrollStudent(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (studentId: string) => enrollStudent(classId, studentId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['classes', classId] }),
  });
}

export function useUnenrollStudent(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (studentId: string) => unenrollStudent(classId, studentId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['classes', classId] }),
  });
}
