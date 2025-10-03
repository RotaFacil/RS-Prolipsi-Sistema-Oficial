# Documentação de Testes e Migração de Banco de Dados

## Estrutura de Testes

Foram implementados testes unitários e de integração (e2e) para o projeto, utilizando o framework Jest.

### Testes Unitários

Os testes unitários estão localizados junto aos arquivos que eles testam, com a extensão `.spec.ts`. Por exemplo, o teste do serviço `app.service.ts` está no arquivo `app.service.spec.ts`.

Para executar os testes unitários, use o comando:

```bash
npm test
```

Para executar os testes com cobertura:

```bash
npm run test:cov
```

### Testes de Integração (e2e)

Os testes de integração estão localizados na pasta `test/` na raiz do projeto, com a extensão `.e2e-spec.ts`.

Para executar os testes de integração:

```bash
npm run test:e2e
```

## Sistema de Migração de Banco de Dados

Foi implementado um sistema de migração de banco de dados utilizando TypeORM.

### Configuração

A configuração do banco de dados está no arquivo `src/database/database.module.ts` e a configuração para as migrações está no arquivo `typeorm.config.ts`.

As variáveis de ambiente necessárias foram adicionadas ao arquivo `.env.example`.

### Migrações

As migrações estão localizadas na pasta `src/database/migrations/`.

#### Comandos para Gerenciar Migrações

Para gerar uma nova migração:

```bash
npm run migration:generate -- src/database/migrations/NomeDaMigracao
```

Para executar as migrações pendentes:

```bash
npm run migration:run
```

Para reverter a última migração:

```bash
npm run migration:revert
```

### Exemplo de Migração

Foi criada uma migração de exemplo (`InitialMigration`) que cria uma tabela de usuários.

## Como Usar

1. Configure as variáveis de ambiente no arquivo `.env` baseado no `.env.example`
2. Execute as migrações para criar as tabelas no banco de dados
3. Execute os testes para verificar se tudo está funcionando corretamente
4. Inicie o servidor com `npm run dev` para desenvolvimento ou `npm start` para produção