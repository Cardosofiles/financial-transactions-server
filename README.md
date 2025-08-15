# Financial Transactions Server

Servidor backend desenvolvido em TypeScript para registro, consulta e gerenciamento de transações financeiras. Ideal para aplicações que precisam de controle de movimentações, histórico e categorização de entradas e saídas.

## Principais Funcionalidades

- Cadastro de transações financeiras (entrada e saída)
- Consulta e listagem de transações por usuário
- Resumo do saldo atual
- Validação de dados com schemas tipados
- Persistência com banco de dados relacional via Knex

## Casos de Uso

- Sistemas de controle financeiro pessoal ou empresarial
- APIs para integração com frontends de dashboards financeiros
- Solução base para projetos de educação financeira

## Stack e Tecnologias Utilizadas

- **TypeScript**: Tipagem estática
- **Node.js**: Ambiente de execução
- **Fastify**: Framework web de alta performance
- **Knex**: Query builder SQL e execução de migrações
- **PostgreSQL** (produção) e **SQLite** (testes): Banco de dados relacional
- **Zod**: Validação de dados e schemas
- **dotenv**: Gerenciamento de variáveis de ambiente
- **Vitest**: Testes automatizados
- **Supertest**: Testes de integração HTTP

## Estrutura de Pastas

```
financial-transactions-server/
├── db/
│   ├── migrations/           # Scripts de migração do banco de dados
│   └── test.db               # Banco SQLite para testes
├── src/
│   ├── @types/               # Tipagens customizadas do projeto
│   ├── env/                  # Configuração das variáveis de ambiente
│   ├── middlewares/          # Middlewares Fastify customizados
│   ├── routes/               # Rotas da API (transações, resumo etc.)
│   ├── app.ts                # Configuração principal do Fastify
│   ├── database.ts           # Setup e exportação do Knex
│   └── server.ts             # Inicialização do servidor HTTP
├── test/
│   └── transactions.spec.ts  # Testes automatizados de transações
├── .env.exemple              # Exemplo de variáveis de ambiente
├── .env.test.exemple         # Exemplo para ambiente de testes
├── knexfile.ts               # Configuração do Knex
├── package.json              # Dependências e scripts
├── tsconfig.json             # Configuração do TypeScript
├── .gitignore
└── package-lock.json
```

### Explicação das Partes

- **db/**: Arquivos e scripts de banco de dados (migrations e DB de testes)
- **src/@types/**: Tipagens customizadas, se necessário
- **src/env/**: Utilitários para leitura/validação de variáveis de ambiente
- **src/middlewares/**: Middlewares para requisições HTTP (ex: autenticação, logs)
- **src/routes/**: Implementação das rotas da API
- **src/app.ts**: Instancia e configura o Fastify com middlewares e rotas
- **src/database.ts**: Exporta a conexão/configuração do Knex
- **src/server.ts**: Ponto de entrada e inicialização do servidor

## Instalação e Execução Local

### Pré-requisitos

- Node.js >= 18
- Banco de dados PostgreSQL (produção) ou SQLite (testes)

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Cardosofiles/financial-transactions-server.git
   cd financial-transactions-server
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   - Copie o arquivo `.env.exemple` para `.env` e ajuste conforme seu ambiente:
     ```
     cp .env.exemple .env
     ```

4. **Execute as migrações do banco de dados**
   ```bash
   npm run knex -- migrate:latest
   # ou
   yarn knex -- migrate:latest
   ```

5. **Inicie o servidor**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

   O servidor estará disponível em `http://localhost:3333` por padrão.

## Como Executar Testes

```bash
npm test
# ou
yarn test
```
Os testes estão localizados em `test/transactions.spec.ts` e utilizam SQLite e Supertest.

## Exemplos de Uso dos Endpoints

### Criar Transação

```http
POST /transactions
Content-Type: application/json

{
  "title": "Salário",
  "amount": 5000,
  "type": "credit"
}
```

### Listar Transações

```http
GET /transactions
```

### Resumo

```http
GET /transactions/summary
```

## Boas Práticas e Recomendações

- Sempre utilize TypeScript em todo o projeto para garantir segurança de tipos.
- Mantenha as validações de entrada com schemas robustos (Zod).
- Escreva e mantenha testes automatizados, principalmente para rotas críticas.
- Use variáveis de ambiente para dados sensíveis e configuração.
- Utilize scripts de migração para manter o banco de dados versionado.
- Prefira Pull Requests para revisões de código e mantenha o padrão de commits semânticos.
- Atualize as dependências periodicamente para segurança e performance.

---

Contribuições são bem-vindas! Consulte as issues para sugestões, dúvidas ou melhorias.

## 📫 Contato

<div align="center">

<a href="mailto:cardosofiles@outlook.com">
  <img src="https://img.shields.io/badge/Email-0078D4?style=for-the-badge&logo=microsoftoutlook&logoColor=white" alt="Email"/>
</a>
<a href="https://www.linkedin.com/in/joaobatista-dev/" target="_blank">
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
</a>
<a href="https://github.com/Cardosofiles" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
</a>
<a href="https://cardosofiles.dev/" target="_blank">
  <img src="https://img.shields.io/badge/Portfólio-222222?style=for-the-badge&logo=about.me&logoColor=white" alt="Portfólio"/>
</a>

</div>
