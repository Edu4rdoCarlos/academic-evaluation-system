# Database

Schema, migrações e seed do banco de dados PostgreSQL, gerenciados pelo Prisma ORM.

## Stack

- PostgreSQL 16
- Prisma 6 (schema, migrations, client)
- TypeScript (seed script)

## Entidades

```
User              — usuários do sistema (admin/professor)
Student           — alunos cadastrados
Class             — turmas por tópico/ano/semestre
Goal              — metas de aprendizado (ex: Requisitos, Testes)
ClassEnrollment   — matrícula de aluno em turma
Evaluation        — conceito de um aluno em uma meta dentro de uma turma
EvaluationChangeLog     — histórico de alterações de avaliação
DailyEmailDigest        — digest diário pendente por aluno
DailyEmailDigestItem    — item do digest ligado a um change log
```

## Diagrama de Relacionamentos

```
User
Student ──< ClassEnrollment >── Class
Student ──< Evaluation >── Class
                Evaluation ──> Goal
Evaluation ──< EvaluationChangeLog
Student ──< DailyEmailDigest ──< DailyEmailDigestItem >── EvaluationChangeLog
```

## Conceitos de Avaliação

```
MANA  — Melhorar Ainda Não Atingiu
MPA   — Melhorou, Parcialmente Atingiu
MA    — Melhorou, Atingiu
```

## Estrutura

```
prisma/
├── schema.prisma       # Definição das entidades e relacionamentos
├── seed.ts             # Script de população inicial
└── migrations/
    ├── 20260422023109_init/         # Schema inicial
    └── 20260422120000_add_users/    # Tabela de usuários
```

## Scripts

```bash
# Gerar o Prisma Client (necessário após alterar o schema)
npm run generate

# Criar e aplicar nova migração (desenvolvimento)
npm run migrate:dev

# Aplicar migrações pendentes (produção/CI)
npm run migrate:deploy

# Resetar banco e reaplicar tudo do zero
npm run migrate:reset

# Rodar o seed
npm run seed

# Abrir Prisma Studio (explorador visual)
npm run studio
```

## Seed

O seed popula o banco com:

- 1 usuário administrador (`admin@sistema-provas.edu` / `admin123`)
- 5 metas de aprendizado (Requisitos, Projeto, Implementação, Testes, Implantação)
- 6 alunos com dados realistas
- 3 turmas (LP1, ES, ED)
- Matrículas dos alunos nas turmas
- Matriz de avaliações com distribuição de conceitos

## Conexão

O Prisma Client gerado fica em `../../node_modules/.prisma/client`, compartilhado entre `backend` e `database` dentro do monorepo.

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sistema_provas
```

## Pontos-chave

- **pgcrypto:** extensão usada para geração de UUIDs no banco
- **Cascade deletes:** deleção de turma ou aluno remove matrículas e avaliações automaticamente
- **Unique constraints:** matrícula única por aluno+turma; avaliação única por aluno+turma+meta
- **EvaluationChangeLog:** gerado automaticamente ao upsert de avaliação, alimenta o digest de e-mail
- **DailyEmailDigest:** um registro por aluno por dia, consolidando múltiplas alterações

## Documentação Relacionada

- [README raiz](../README.md)
- [Backend](../backend/README.md)
- [Requisitos](../docs/README.md)
