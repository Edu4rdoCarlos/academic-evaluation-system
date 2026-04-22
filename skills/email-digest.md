# Skill: Email Digest

## Objetivo

Enviar 1 email por dia por aluno

## Regras

* Agrupar alterações do dia
* Não enviar múltiplos emails

## Estratégia

* Criar fila de eventos
* Agrupar por aluno
* Enviar no final do dia

## Estrutura

{
studentId,
changes: []
}

## Boas práticas

* Evitar duplicação
* Garantir consistência
