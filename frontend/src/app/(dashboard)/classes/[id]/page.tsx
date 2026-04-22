'use client';

import { use, useState } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, UserPlus, UserMinus } from 'lucide-react';
import Link from 'next/link';

import { useClassWithStudents, useEnrollStudent, useUnenrollStudent } from '@/lib/hooks/use-classes';
import { useStudents } from '@/lib/hooks/use-students';
import { useGoals } from '@/lib/hooks/use-goals';
import { useEvaluationsByClass, useUpsertEvaluation } from '@/lib/hooks/use-evaluations';
import type { EvaluationConcept } from '@/lib/types';

import { EmptyState } from '@/components/shared/EmptyState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/primitives/card';
import { Button } from '@/components/primitives/button';
import { Badge } from '@/components/primitives/badge';
import { Skeleton } from '@/components/primitives/skeleton';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/primitives/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/primitives/dialog';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/primitives/table';

const CONCEPTS: EvaluationConcept[] = ['MANA', 'MPA', 'MA'];

const conceptVariant: Record<EvaluationConcept, 'default' | 'secondary' | 'outline'> = {
  MA: 'default',
  MPA: 'secondary',
  MANA: 'outline',
};

export default function ClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const { data: classData, isLoading: classLoading } = useClassWithStudents(id);
  const { data: studentsData } = useStudents(1, 200);
  const { data: goals } = useGoals();
  const { data: evaluations } = useEvaluationsByClass(id);
  const enrollMutation = useEnrollStudent(id);
  const unenrollMutation = useUnenrollStudent(id);
  const upsertMutation = useUpsertEvaluation(id);

  const enrolledIds = new Set(classData?.enrollments.map((e) => e.studentId) ?? []);
  const enrolledStudents = (studentsData?.data ?? []).filter((s) => enrolledIds.has(s.id));
  const unenrolledStudents = (studentsData?.data ?? []).filter((s) => !enrolledIds.has(s.id));

  function getEvaluation(studentId: string, goalId: string) {
    return evaluations?.find((e) => e.studentId === studentId && e.goalId === goalId);
  }

  async function handleEnroll() {
    if (!selectedStudentId) return;
    await enrollMutation.mutateAsync(selectedStudentId);
    toast.success('Aluno matriculado');
    setSelectedStudentId('');
    setEnrollDialogOpen(false);
  }

  async function handleUnenroll(studentId: string, studentName: string) {
    await unenrollMutation.mutateAsync(studentId);
    toast.success(`${studentName} removido da turma`);
  }

  async function handleConcept(studentId: string, goalId: string, concept: EvaluationConcept) {
    await upsertMutation.mutateAsync({ classId: id, studentId, goalId, concept });
    toast.success('Avaliação salva');
  }

  if (classLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!classData) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href="/classes"><ArrowLeft /></Link>
        </Button>
        <div>
          <h2 className="text-2xl font-semibold">{classData.topic}</h2>
          <p className="text-sm text-muted-foreground">
            {classData.year} · {classData.semester}º semestre
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle>Alunos matriculados ({enrolledStudents.length})</CardTitle>
          <Button
            size="sm"
            onClick={() => setEnrollDialogOpen(true)}
            disabled={unenrolledStudents.length === 0}
          >
            <UserPlus />
            Matricular
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {enrolledStudents.length === 0 ? (
            <EmptyState
              title="Nenhum aluno matriculado"
              description="Adicione alunos a esta turma"
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead className="w-16" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrolledStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell className="text-muted-foreground">{student.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleUnenroll(student.id, student.name)}
                        disabled={unenrollMutation.isPending}
                      >
                        <UserMinus className="text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {enrolledStudents.length > 0 && goals && goals.length > 0 && (
        <Card>
          <CardHeader className="py-4">
            <CardTitle>Grade de avaliações</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="h-10 px-4 text-left font-medium text-foreground">Aluno</th>
                    {goals.map((goal) => (
                      <th key={goal.id} className="h-10 px-2 text-center font-medium text-foreground min-w-32">
                        {goal.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {enrolledStudents.map((student) => (
                    <tr key={student.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="px-4 py-2 font-medium">{student.name}</td>
                      {goals.map((goal) => {
                        const evaluation = getEvaluation(student.id, goal.id);
                        return (
                          <td key={goal.id} className="px-2 py-2 text-center">
                            <Select
                              value={evaluation?.concept ?? ''}
                              onValueChange={(v: string | null) =>
                                v && handleConcept(student.id, goal.id, v as EvaluationConcept)
                              }
                            >
                              <SelectTrigger className="mx-auto w-24 h-7 text-xs">
                                <SelectValue placeholder="—" />
                              </SelectTrigger>
                              <SelectContent>
                                {CONCEPTS.map((c) => (
                                  <SelectItem key={c} value={c}>
                                    <Badge variant={conceptVariant[c]} className="text-xs">
                                      {c}
                                    </Badge>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={enrollDialogOpen} onOpenChange={(o: boolean) => !o && setEnrollDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Matricular aluno</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={selectedStudentId} onValueChange={(v: string | null) => v && setSelectedStudentId(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um aluno" />
              </SelectTrigger>
              <SelectContent>
                {unenrolledStudents.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEnrollDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleEnroll}
              disabled={!selectedStudentId || enrollMutation.isPending}
            >
              {enrollMutation.isPending ? 'Matriculando...' : 'Matricular'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
