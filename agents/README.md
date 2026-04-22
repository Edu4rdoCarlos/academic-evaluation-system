# Skills de Agente

Skills disponíveis para desenvolvimento assistido por IA neste projeto. Cada skill é um prompt estruturado que instrui o agente a gerar código seguindo os padrões do projeto.

## Arquivos

| Arquivo | Skill |
|---------|-------|
| [AGENTS.md](./AGENTS.md) | Contexto geral do projeto e fluxo de desenvolvimento |
| [skills/backend-ddd-typescript.md](./skills/backend-ddd-typescript.md) | Scaffold de módulo NestJS com DDD |
| [skills/react-frontend-crud.md](./skills/react-frontend-crud.md) | Páginas CRUD no frontend Next.js |
| [skills/cucumber-acceptance.md](./skills/cucumber-acceptance.md) | Feature files Gherkin e step definitions |
| [skills/email-digest.md](./skills/email-digest.md) | Lógica de digest por e-mail |
| [skills/requirements-analysis.md](./skills/requirements-analysis.md) | Análise e documentação de requisitos |
| [skills/json-persistence.md](./skills/json-persistence.md) | Persistência em JSON (protótipos) |
| [skills/git-commit.md](./skills/git-commit.md) | Mensagens de commit padronizadas |

## Como Usar

As skills são invocadas como slash commands no Claude Code:

```
/new-feature <nome> <descrição>
/write-gherkin <feature> <requisitos>
/write-tests <arquivo>
/review [arquivo ou módulo]
```

## Padrões Seguidos pelas Skills

Todas as skills geram código que respeita:

- **Arquitetura limpa:** domain → application → infrastructure → presentation
- **SOLID:** responsabilidade única, inversão de dependência via interfaces
- **TypeScript strict:** sem `any`, tipos explícitos, `readonly` em domínio
- **Sem comentários de código:** o código deve se auto-documentar
- **Sem console.log:** remoção antes de finalizar
- **Testes determinísticos:** isolados, sem estado compartilhado entre cenários

## Documentação Relacionada

- [README raiz](../README.md)
- [Backend](../backend/README.md)
- [Frontend](../frontend/README.md)
