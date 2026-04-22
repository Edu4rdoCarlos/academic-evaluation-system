# Sistema de Provas

Sistema fullstack para gerenciamento de avaliações de alunos em disciplinas acadêmicas. Permite cadastrar alunos, turmas e metas de aprendizado, registrar conceitos por aluno/turma/meta, e enviar digest diário por e-mail com as alterações de avaliação.

## Estrutura do Monorepo

```
sistema-provas/
├── backend/        # API REST — NestJS + TypeScript
├── frontend/       # Interface web — Next.js + TypeScript
├── database/       # Schema, migrações e seed — Prisma + PostgreSQL
├── docs/           # Requisitos e documentação do produto
├── agents/         # Skills de agente para desenvolvimento assistido por IA
├── docker-compose.yml
├── Dockerfile
└── start.sh
```

## Documentação por Módulo

| Módulo | Descrição |
|--------|-----------|
| [Backend](./backend/README.md) | API REST, arquitetura, módulos, autenticação, testes E2E |
| [Frontend](./frontend/README.md) | Interface Next.js, rotas, componentes, testes de aceitação |
| [Database](./database/README.md) | Schema Prisma, entidades, migrações, seed |
| [Requisitos](./docs/README.md) | Requisitos funcionais, backlog, regras de negócio |
| [Skills de Agente](./agents/README.md) | Habilidades disponíveis para desenvolvimento assistido por IA |

## Stack

- **Backend:** NestJS 11 · TypeScript strict · Prisma 6 · JWT · Resend
- **Frontend:** Next.js 16 · React 19 · TanStack Query · React Hook Form · Zod · shadcn/ui · Tailwind CSS 4
- **Database:** PostgreSQL 16 · Prisma ORM
- **Testes:** Cucumber.js (aceitação) · Jest (E2E backend) · Playwright
- **Deploy:** Docker · Railway.app

## Como Rodar

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose

### Desenvolvimento local

```bash
# 1. Subir o banco
docker-compose up -d

# 2. Instalar dependências (monorepo)
npm install

# 3. Gerar cliente Prisma e rodar migrações
cd database
npm run generate
npm run migrate:dev

# 4. Popular banco com dados de seed
npm run seed

# 5. Iniciar backend (porta 3001)
cd ../backend
npm run start:dev

# 6. Iniciar frontend (porta 3000)
cd ../frontend
npm run dev
```

### Variáveis de ambiente

Copie `.env.example` para `.env` no diretório `backend/`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sistema_provas
JWT_SECRET=seu-segredo
RESEND_API_KEY=re_...
API_KEY=chave-interna
```

### Docker (produção)

```bash
docker build -t sistema-provas .
docker run -p 3001:3001 --env-file .env sistema-provas
```

## Autenticação

A API usa duas camadas:

- **API Key** — header `x-api-key` obrigatório em todas as rotas
- **JWT Bearer Token** — obtido via `POST /auth/login`, necessário nas rotas protegidas

Credenciais padrão do seed: `admin@sistema-provas.edu` / `admin123`

## Testes

```bash
# E2E backend
cd backend
npm run test:e2e

# Aceitação frontend (Cucumber + Playwright)
cd frontend
npm run test:acceptance
```
