'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { useClasses, useCreateClass, useUpdateClass, useDeleteClass } from '@/lib/hooks/use-classes';
import { createClassSchema, updateClassSchema } from '@/lib/validations/class';
import type { CreateClassInput, UpdateClassInput } from '@/lib/validations/class';
import type { Class } from '@/lib/types';

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

type DialogMode = 'create' | 'edit' | null;

export default function ClassesPage() {
  const [page, setPage] = useState(1);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Class | null>(null);

  const { data, isLoading } = useClasses(page);
  const createMutation = useCreateClass();
  const updateMutation = useUpdateClass();
  const deleteMutation = useDeleteClass();

  const createForm = useForm<CreateClassInput>({
    resolver: zodResolver(createClassSchema),
    defaultValues: { topic: '', year: new Date().getFullYear(), semester: 1 },
  });

  const editForm = useForm<UpdateClassInput>({
    resolver: zodResolver(updateClassSchema),
  });

  function openCreate() {
    createForm.reset({ topic: '', year: new Date().getFullYear(), semester: 1 });
    setDialogMode('create');
  }

  function openEdit(cls: Class) {
    setSelectedClass(cls);
    editForm.reset({ topic: cls.topic, year: cls.year, semester: cls.semester as 1 | 2 });
    setDialogMode('edit');
  }

  function closeDialog() {
    setDialogMode(null);
    setSelectedClass(null);
  }

  async function handleCreate(input: CreateClassInput) {
    await createMutation.mutateAsync(input);
    toast.success('Turma criada');
    closeDialog();
  }

  async function handleEdit(input: UpdateClassInput) {
    if (!selectedClass) return;
    await updateMutation.mutateAsync({ id: selectedClass.id, data: input });
    toast.success('Turma atualizada');
    closeDialog();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget.id);
    toast.success('Turma excluída');
    setDeleteTarget(null);
  }

  return (
    <>
      <PageHeader
        title="Turmas"
        description="Gerencie as turmas e suas matrículas"
        action={
          <Button onClick={openCreate}>
            <Plus />
            Nova turma
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
              title="Nenhuma turma cadastrada"
              description="Crie a primeira turma para começar"
              action={<Button onClick={openCreate}><Plus /> Nova turma</Button>}
            />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tópico</TableHead>
                    <TableHead>Ano</TableHead>
                    <TableHead>Semestre</TableHead>
                    <TableHead className="w-28" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell>{cls.topic}</TableCell>
                      <TableCell className="text-muted-foreground">{cls.year}</TableCell>
                      <TableCell className="text-muted-foreground">{cls.semester}º</TableCell>
                      <TableCell>
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="icon-sm" asChild>
                            <Link href={`/classes/${cls.id}`}>
                              <ChevronRight />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon-sm" onClick={() => openEdit(cls)}>
                            <Pencil />
                          </Button>
                          <Button variant="ghost" size="icon-sm" onClick={() => setDeleteTarget(cls)}>
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
            <DialogTitle>Nova turma</DialogTitle>
          </DialogHeader>
          <form onSubmit={createForm.handleSubmit(handleCreate)} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Tópico</Label>
              <Input {...createForm.register('topic')} placeholder="Ex: Algoritmos" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Ano</Label>
                <Input
                  type="number"
                  {...createForm.register('year', { valueAsNumber: true })}
                  min={1900}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Semestre</Label>
                <Select
                  value={String(createForm.watch('semester'))}
                  onValueChange={(v: string | null) => v && createForm.setValue('semester', Number(v) as 1 | 2)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1º</SelectItem>
                    <SelectItem value="2">2º</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            <DialogTitle>Editar turma</DialogTitle>
          </DialogHeader>
          <form onSubmit={editForm.handleSubmit(handleEdit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Tópico</Label>
              <Input {...editForm.register('topic')} placeholder="Ex: Algoritmos" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Ano</Label>
                <Input
                  type="number"
                  {...editForm.register('year', { valueAsNumber: true })}
                  min={1900}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Semestre</Label>
                <Select
                  value={String(editForm.watch('semester') ?? 1)}
                  onValueChange={(v: string | null) => v && editForm.setValue('semester', Number(v) as 1 | 2)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1º</SelectItem>
                    <SelectItem value="2">2º</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
        title="Excluir turma"
        description={`Tem certeza que deseja excluir "${deleteTarget?.topic}"?`}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
