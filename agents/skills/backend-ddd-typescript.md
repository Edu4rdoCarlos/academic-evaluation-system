# Skill: Backend TypeScript (DDD)

## Arquitetura

* controllers/
* services/
* repositories/
* models/

## Regras

* Controller: recebe request
* Service: regra de negócio
* Repository: persistência

## Exemplo

Controller:

* POST /students

Service:

* createStudent()

Repository:

* save(student)

## Boas práticas

* Usar interfaces
* Separar responsabilidades
* Evitar lógica no controller
