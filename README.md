# HelpDesk API

API Back-End do sistema de gestão de chamados de suporte (HelpDesk), desenvolvida com
Node.js, Express e MySQL.

> Status atual: **Sprint 1 e Sprint 2 concluídas.**
> As demais funcionalidades (chamados, atualizações, regras de negócio, filtros e
> relatórios) serão implementadas nas próximas sprints.

## Tecnologias

- Node.js
- Express
- MySQL (mysql2/promise)
- dotenv
- cors / helmet

## Estrutura do projeto

```
helpdesk-api/
├── src/
│   ├── config/database.js
│   ├── controllers/
│   ├── models/
│   ├── services/
│   ├── routes/
│   ├── middlewares/errorMiddleware.js
│   ├── database/ (scripts SQL)
│   ├── utils/validateEmail.js
│   └── tests/ (.rest para testar os endpoints)
├── server.js
├── .env
└── package.json
```

## Como instalar e executar

1. Instale as dependências:
   ```
   npm install
   ```
2. Configure o arquivo `.env` (já incluso um exemplo) com os dados do seu MySQL local.
3. Crie o banco e as tabelas, executando na ordem, dentro do seu cliente MySQL:
   ```
   src/database/create_database.sql
   src/database/create_tables.sql
   src/database/seed_data.sql   (opcional, cria dados de exemplo)
   ```
4. Rode o projeto:
   ```
   npm run dev
   ```
   O servidor sobe em `http://localhost:3000` (ou na porta definida em `PORT`).
5. Use os arquivos em `src/tests/*.rest` (extensão REST Client do VS Code) ou o
   Insomnia/Postman para testar os endpoints.

## Endpoints implementados

### Sprint 1 — Categorias e Técnicos (somente consulta)
- `GET /categorias` — lista todas as categorias cadastradas.
- `GET /tecnicos` — lista todos os técnicos cadastrados.

### Sprint 2 — CRUD de Solicitantes
- `GET /solicitantes` — lista todos os solicitantes.
- `GET /solicitantes/:id` — consulta um solicitante específico.
- `POST /solicitantes` — cadastra um novo solicitante.
- `PUT /solicitantes/:id` — atualiza um solicitante existente.
- `DELETE /solicitantes/:id` — remove um solicitante.

**Regras aplicadas em Solicitantes:**
- `nome` e `email` são obrigatórios.
- `email` deve ter formato válido.
- `email` não pode se repetir entre solicitantes.
- Ao consultar/atualizar/excluir um id inexistente, a API retorna `404`.
- Erros de validação retornam `400`.

## Modelo de dados

O banco possui 4 tabelas (`SOLICITANTES`, `CATEGORIAS`, `TECNICOS`, `CHAMADOS`), conforme
o diagrama ER do Projeto Integrador. A tabela `CHAMADOS` já foi criada para manter a
integridade do modelo, mas suas operações (criação, consulta, atualização, filtros) serão
implementadas a partir da Sprint 3.
