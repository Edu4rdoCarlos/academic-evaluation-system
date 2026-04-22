'use client';

import Link from 'next/link';
import { Users, BookOpen, Target, GraduationCap, ArrowRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/primitives/card';
import { useStudents } from '@/lib/hooks/use-students';
import { useClasses } from '@/lib/hooks/use-classes';
import { useGoals } from '@/lib/hooks/use-goals';

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  href: string;
}

function StatCard({ title, value, description, icon: Icon, colorClass, href }: StatCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        <Link
          href={href}
          className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100"
        >
          Ver detalhes <ArrowRight className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}

function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-16 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-3 w-32 animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { data: studentsData, isLoading: loadingStudents } = useStudents(1, 1);
  const { data: classesData, isLoading: loadingClasses } = useClasses(1, 1);
  const { data: goals, isLoading: loadingGoals } = useGoals();

  const totalStudents = studentsData?.metadata?.totalItems ?? 0;
  const totalClasses = classesData?.metadata?.totalItems ?? 0;
  const totalGoals = goals?.length ?? 0;

  const loading = loadingStudents || loadingClasses || loadingGoals;

  const stats: StatCardProps[] = [
    {
      title: 'Total de Alunos',
      value: totalStudents,
      description: 'Alunos cadastrados no sistema',
      icon: Users,
      colorClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      href: '/students',
    },
    {
      title: 'Turmas Ativas',
      value: totalClasses,
      description: 'Turmas disponíveis para matrícula',
      icon: BookOpen,
      colorClass: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
      href: '/classes',
    },
    {
      title: 'Objetivos',
      value: totalGoals,
      description: 'Objetivos de avaliação cadastrados',
      icon: Target,
      colorClass: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
      href: '/goals',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
          <GraduationCap className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Visão geral do sistema de avaliações</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} />)
          : stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-primary" />
              Acesso Rápido
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {[
              { label: 'Gerenciar Alunos', href: '/students', icon: Users, color: 'text-blue-600' },
              { label: 'Gerenciar Turmas', href: '/classes', icon: BookOpen, color: 'text-indigo-600' },
              { label: 'Gerenciar Objetivos', href: '/goals', icon: Target, color: 'text-violet-600' },
            ].map(({ label, href, icon: Icon, color }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${color}`} />
                  <span className="text-sm font-medium">{label}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sobre o Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Plataforma de gestão de avaliações acadêmicas com suporte a objetivos de aprendizagem e
              conceitos MANA, MPA e MA.
            </p>
            <div className="rounded-lg bg-blue-50/50 dark:bg-blue-950/30 p-3 border border-blue-200/50 dark:border-blue-800/50">
              <p className="text-xs text-blue-900 dark:text-blue-100 font-medium">Conceitos de Avaliação</p>
              <div className="mt-2 flex gap-2">
                {['MANA', 'MPA', 'MA'].map((concept) => (
                  <span
                    key={concept}
                    className="rounded-md bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
