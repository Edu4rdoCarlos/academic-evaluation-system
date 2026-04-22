# Backend

API REST construída com NestJS e TypeScript, seguindo arquitetura limpa com módulos independentes por domínio.

## Stack

- NestJS 11
- TypeScript strict
- Prisma 6 (via `@prisma/client` do workspace `database`)
- JWT (jsonwebtoken + passport)
- Resend (envio de e-mail)
- Swagger (documentação automática em `/api/docs`)
- Jest 30 + Supertest (testes E2E)

## Arquitetura

Cada módulo segue uma estrutura em camadas:

```
src/
├── auth/
│   ├── domain/             # Entidade e interfaces de porta
│   ├── application/        # Caso de uso Login
│   ├── infrastructure/     # PrismaAuthUserRepository, JwtTokenService
│   └── presentation/       # AuthController, DTOs
├── students/
│   ├── models/             # Modelo Student
│   ├── dto/                # CreateStudentDto, UpdateStudentDto
│   ├── repositories/       # Interface + implementação Prisma
│   ├── students.service.ts
│   └── students.controller.ts
├── classes/                # Mesmo padrão
├── goals/                  # Mesmo padrão
├── evaluations/            # Mesmo padrão
├── email-digest/           # Consolidação diária e envio de e-mail
├── email/                  # Serviço Resend
├── prisma/                 # PrismaModule + PrismaService
└── shared/                 # HttpResponse, paginação, middlewares
```

O módulo `auth` segue arquitetura DDD completa (domain → application → infrastructure → presentation). Os demais seguem arquitetura em camadas simplificada (controller → service → repository).

## Módulos

| Módulo | Responsabilidade |
|--------|-----------------|
| `auth` | Login com e-mail/senha, emissão de JWT |
| `students` | CRUD de alunos com paginação |
| `classes` | CRUD de turmas, matrícula de alunos |
| `goals` | CRUD de metas de aprendizado |
| `evaluations` | Upsert de avaliações por aluno/turma/meta, conceitos MANA/MPA/MA |
| `email-digest` | Fila e envio de digest diário de alterações de avaliação |
| `email` | Integração com Resend API |
| `prisma` | Conexão com banco de dados |

## Autenticação

Todas as rotas exigem o header `x-api-key`. As rotas do dashboard também exigem `Authorization: Bearer <jwt>`.

O guard `JwtAuthGuard` é aplicado globalmente por padrão — rotas públicas usam o decorator `@Public()`.

## Como Rodar

```bash
# Instalar dependências
npm install

# Modo desenvolvimento (watch)
npm run start:dev

# Build de produção
npm run build
npm run start:prod
```

### Variáveis de ambiente (`.env`)

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sistema_provas
JWT_SECRET=seu-segredo
RESEND_API_KEY=re_...
API_KEY=chave-interna
```

## Testes E2E

Os testes usam Jest com Supertest, inicializando a aplicação NestJS real contra um banco de testes.

```bash
npm run test:e2e
```

Arquivos em `test/e2e/`:

| Arquivo | Cobertura |
|---------|-----------|
| `auth.e2e-spec.ts` | Login, JWT, rotas protegidas |
| `students.e2e-spec.ts` | CRUD de alunos |
| `classes.e2e-spec.ts` | CRUD de turmas, matrícula |
| `evaluations.e2e-spec.ts` | Upsert e listagem de avaliações |
| `goals.e2e-spec.ts` | CRUD de metas |
| `email-digest.e2e-spec.ts` | Fila e envio de digest |

## Pontos-chave

- **Repositórios por interface:** o serviço depende de `IStudentRepository`, não da implementação Prisma — facilita troca e testes
- **HttpResponse:** utilitário centralizado para respostas padronizadas com paginação
- **Swagger:** toda rota documentada via decorators, acessível em `/api/docs`
- **Validação global:** `ValidationPipe` aplicado na inicialização com `whitelist: true`
- **Email digest:** ao salvar uma avaliação, um `EvaluationChangeLog` é gerado e enfileirado no `DailyEmailDigest` do aluno

## Documentação Relacionada

- [README raiz](../README.md)
- [Database](../database/README.md)
- [Requisitos](../docs/README.md)
