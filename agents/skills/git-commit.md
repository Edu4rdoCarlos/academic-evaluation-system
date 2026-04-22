# Skill: Git Commit

## Objetivo

Criar commits atômicos, descritivos e rastreáveis.

## Regras

* **Nunca executar `git commit` sem aprovação explícita do usuário**
* Antes de commitar: mostrar o diff e a mensagem proposta e aguardar confirmação
* Só prosseguir após o usuário responder com "sim", "ok", "pode commitar" ou equivalente
* Um commit por mudança lógica
* Mensagem em inglês, no imperativo
* Sem co-author
* Nunca usar `--no-verify`
* Staged apenas arquivos relacionados à mudança

## Formato da mensagem

```
<tipo>: <descrição curta>

[corpo opcional explicando o porquê]
```

## Tipos

* `feat` — nova funcionalidade
* `fix` — correção de bug
* `chore` — configuração, dependências, build
* `refactor` — refatoração sem mudança de comportamento
* `test` — adição ou ajuste de testes
* `docs` — documentação

## Exemplos

```
feat: add student CRUD API routes
chore: scaffold Next.js project with shadcn and React Query
fix: prevent duplicate email digest entries per day
```

## Boas práticas

* Verificar compilação antes de commitar
* Não commitar arquivos sensíveis (.env, data/*.json com dados reais)
* Revisar diff antes de staged
