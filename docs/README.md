# Requisitos

Documentação de produto do Sistema de Provas.

## Arquivos

| Arquivo | Conteúdo |
|---------|----------|
| [requirements.md](./requirements.md) | Requisitos funcionais, não funcionais, backlog e regras de negócio |

## Visão Geral do Produto

O **Sistema de Provas** é uma plataforma web para professores gerenciarem avaliações de alunos por competência. O diferencial é o modelo de avaliação por metas — cada aluno recebe um conceito (MANA, MPA ou MA) por meta de aprendizado dentro de cada turma.

## Entidades Principais

| Entidade | Descrição |
|----------|-----------|
| **Aluno** | Pessoa matriculada em uma ou mais turmas |
| **Turma** | Agrupamento por tópico, ano e semestre |
| **Meta** | Critério de avaliação (ex: Requisitos, Testes, Implantação) |
| **Avaliação** | Conceito atribuído a um aluno em uma meta dentro de uma turma |

## Fluxo Principal

```
1. Cadastrar metas de aprendizado
2. Criar turma
3. Matricular alunos na turma
4. Registrar/atualizar avaliações (aluno × meta)
5. Sistema gera histórico de alterações
6. Digest diário de e-mail enviado aos alunos com suas alterações
```

## Conceitos de Avaliação

- **MANA** — Melhorar, Ainda Não Atingiu
- **MPA** — Melhorou, Parcialmente Atingiu
- **MA** — Melhorou, Atingiu

## Documentação Relacionada

- [README raiz](../README.md)
- [Backend](../backend/README.md)
- [Database](../database/README.md)
