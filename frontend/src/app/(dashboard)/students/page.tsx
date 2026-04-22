'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';

import { useStudents, useCreateStudent, useUpdateStudent, useDeleteStudent } from '@/lib/hooks/use-students';
import { createStudentSchema, updateStudentSchema } from '@/lib/validations/student';
import type { CreateStudentInput, UpdateStudentInput } from '@/lib/validations/student';
import type { Student } from '@/lib/types';

import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { ConfirmDeleteDialog } from '@/components/shared/ConfirmDeleteDialog';
import { Pagination } from '@/components/shared/Pagination';
import { Card, CardContent } from '@/components/primitives/card';
import { Button } from '@/components/primitives/button';
import { Input } from '@/components/primitives/input';
import { Label } from '@/components/primitives/label';
import { Skeleton } from '@/components/primitives/skeleton';
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

type DialogMode = 'create' | 'edit' | null;

export default function StudentsPage() {
  const [page, setPage] = useState(1);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);

  const { data, isLoading } = useStudents(page);
  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();
  const deleteMutation = useDeleteStudent();

  const createForm = useForm<CreateStudentInput>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: { name: '', cpf: '', email: '' },
  });

  const editForm = useForm<UpdateStudentInput>({
    resolver: zodResolver(updateStudentSchema),
  });

  function openCreate() {
    createForm.reset({ name: '', cpf: '', email: '' });
    setDialogMode('create');
  }

  function openEdit(student: Student) {
    setSelectedStudent(student);
    editForm.reset({ name: student.name, cpf: student.cpf, email: student.email });
    setDialogMode('edit');
  }

  function closeDialog() {
    setDialogMode(null);
    setSelectedStudent(null);
  }

  async function handleCreate(input: CreateStudentInput) {
    await createMutation.mutateAsync(input);
    toast.success('Aluno criado com sucesso');
    closeDialog();
  }

  async function handleEdit(input: UpdateStudentInput) {
    if (!selectedStudent) return;
    await updateMutation.mutateAsync({ id: selectedStudent.id, data: input });
    toast.success('Aluno atualizado');
    closeDialog();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget.id);
    toast.success('Aluno excluído');
    setDeleteTarget(null);
  }

  return (
    <>
      <PageHeader
        title="Alunos"
        description="Gerencie os alunos cadastrados no sistema"
        action={
          <Button onClick={openCreate}>
            <Plus />
            Novo aluno
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : !data || data.data.length === 0 ? (
            <EmptyState
              title="Nenhum aluno cadastrado"
              description="Adicione o primeiro aluno para começar"
              action={<Button onClick={openCreate}><Plus /> Novo aluno</Button>}
            />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead className="w-20" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell className="text-muted-foreground">{student.cpf}</TableCell>
                      <TableCell className="text-muted-foreground">{student.email}</TableCell>
                      <TableCell>
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="icon-sm" onClick={() => openEdit(student)}>
                            <Pencil />
                          </Button>
                          <Button variant="ghost" size="icon-sm" onClick={() => setDeleteTarget(student)}>
                            <Trash2 className="text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {data.metadata.totalPage > 1 && (
                <Pagination metadata={data.metadata} onPageChange={setPage} />
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogMode === 'create'} onOpenChange={(o: boolean) => !o && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo aluno</DialogTitle>
          </DialogHeader>
          <form onSubmit={createForm.handleSubmit(handleCreate)} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nome</Label>
              <Input {...createForm.register('name')} placeholder="Nome completo" />
            </div>
            <div className="space-y-1.5">
              <Label>CPF</Label>
              <Input {...createForm.register('cpf')} placeholder="Somente números" maxLength={11} />
            </div>
            <div className="space-y-1.5">
              <Label>E-mail</Label>
              <Input {...createForm.register('email')} type="email" placeholder="email@exemplo.com" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>Cancelar</Button>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Salvando...' : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogMode === 'edit'} onOpenChange={(o: boolean) => !o && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar aluno</DialogTitle>
          </DialogHeader>
          <form onSubmit={editForm.handleSubmit(handleEdit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nome</Label>
              <Input {...editForm.register('name')} placeholder="Nome completo" />
            </div>
            <div className="space-y-1.5">
              <Label>CPF</Label>
              <Input {...editForm.register('cpf')} placeholder="Somente números" maxLength={11} />
            </div>
            <div className="space-y-1.5">
              <Label>E-mail</Label>
              <Input {...editForm.register('email')} type="email" placeholder="email@exemplo.com" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>Cancelar</Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Excluir aluno"
        description={`Tem certeza que deseja excluir "${deleteTarget?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
