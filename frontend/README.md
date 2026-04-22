# Frontend

Interface web construída com Next.js App Router, TypeScript e shadcn/ui. Consome a API REST do backend via TanStack Query.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript strict
- TanStack React Query 5 (estado do servidor)
- React Hook Form 7 + Zod 4 (formulários e validação)
- shadcn/ui + Tailwind CSS 4 (componentes e estilização)
- Lucide React (ícones)
- Sonner (notificações toast)
- Cucumber.js 12 + Playwright (testes de aceitação)

## Estrutura

```
src/
├── app/
│   ├── (public)/
│   │   └── login/              # Página de login
│   └── (dashboard)/            # Rotas protegidas
│       ├── dashboard/          # Página inicial
│       ├── students/           # Lista e CRUD de alunos
│       ├── classes/
│       │   ├── page.tsx        # Lista de turmas
│       │   └── [id]/page.tsx   # Detalhe: matrículas + tabela de avaliações
│       └── goals/              # CRUD de metas
├── components/
│   ├── layout/                 # AppHeader, AppSidebar
│   ├── primitives/             # Componentes base shadcn/ui
│   ├── providers/              # AuthProvider, QueryProvider
│   └── shared/                 # Pagination, PageHeader, ConfirmDeleteDialog, EmptyState
└── lib/
    ├── api/                    # Hooks React Query por recurso
    ├── contexts/               # Contextos React
    ├── hooks/                  # Hooks customizados
    ├── types.ts                # Interfaces TypeScript (Student, Class, Evaluation…)
    ├── utils/                  # Funções utilitárias
    └── validations/            # Schemas Zod
```

## Rotas

| Rota | Descrição |
|------|-----------|
| `/login` | Autenticação com e-mail e senha |
| `/dashboard` | Página inicial |
| `/students` | Listagem, criação, edição e remoção de alunos |
| `/classes` | Listagem e CRUD de turmas |
| `/classes/[id]` | Detalhe da turma: alunos matriculados e tabela de avaliações |
| `/goals` | Listagem e CRUD de metas |

## Autenticação

`AuthProvider` armazena o JWT em `localStorage`, injeta o token em todas as requisições via header `Authorization: Bearer <token>` e redireciona para `/login` quando não autenticado ou ao expirar.

## Como Rodar

```bash
# Instalar dependências
npm install

# Modo desenvolvimento (porta 3000)
npm run dev

# Build de produção
npm run build
npm run start
```

### Variável de ambiente (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_KEY=chave-interna
```

## Testes de Aceitação (Cucumber + Playwright)

Os testes simulam o uso real da interface no navegador, descritos em Gherkin.

```bash
npm run test:acceptance
```

Feature files em `tests/acceptance/features/`:

| Feature | Cenários |
|---------|----------|
| `login.feature` | Login com credenciais válidas e inválidas |
| `students.feature` | Criar, editar, excluir e listar alunos |
| `classes.feature` | Criar, listar turmas |
| `class-detail.feature` | Ver detalhe de turma, registrar avaliações |
| `goals.feature` | Criar, listar e remover metas |

Step definitions em `tests/acceptance/steps/`, contexto compartilhado via `world.ts`.

## Pontos-chave

- **Route groups:** `(public)` e `(dashboard)` separam layouts sem afetar a URL
- **TanStack Query:** gerencia cache, refetch automático e estado de loading/error por recurso
- **Zod + React Hook Form:** validação declarativa no cliente sem duplicação de lógica
- **shadcn/ui:** componentes acessíveis sem encapsulamento forçado — fácil de customizar
- **Tabela de avaliações:** renderiza dinamicamente alunos x metas na tela de detalhe da turma

## Documentação Relacionada

- [README raiz](../README.md)
- [Backend](../backend/README.md)
- [Skills de Agente](../agents/README.md)
