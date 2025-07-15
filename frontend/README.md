# MechApp

Aplicativo mobile para gerenciamento de oficinas mecânicas e contratação de serviços de mecânicos. Desenvolvido em **React Native**, o MechApp conecta clientes a oficinas, oferecendo uma plataforma simples, rápida e eficiente para agendamento e controle de serviços automotivos.

## 🚗 Funcionalidades principais

- Cadastro e login de usuários (clientes e mecânicos)
- Listagem de oficinas
- Agendamento de serviços
- Compra de peças
- Avaliação de oficinas
- Histórico de serviços realizados
- Painel de gerenciamento para oficinas (agendamentos, serviços, mecânicos)

## Iniciando Aplicação

- Como iniciar de forma generalizada.

### Banco de Dados

Iniciado automaticamente através do `docker-compose.yaml` e com integração do `Dockerfile`. O banco de dados é inicializado com o `database/` tendo várias opções. Dentre elas, há as `migrations/` e `seeds/`.

- **migrations:** controle de atualizações do banco de dados, executado de forma sequencial, criando tabelas, triggers, índices...
- **seeds:** criação de dados iniciais para testar na aplicação.

### Iniciando Backend

Para iniciar todos os serviços de uma só vez, certifique-se que outros processos no seu computador não estejam utilizando as portas `:8000` e `:5555`. É possível realizar esse passo todo de uma só vez com o **Docker**.

```bash
docker-compose up
```

Caso queira iniciar o servidor individualmente, certifique-se de colocar no `.env` dentro do `/backend` um `DATABASE_URL` com o link do banco de dados online. Esse banco terá tudo iniciado pelo SQLAlchemy, mas pode-se usar as `database/migrations` para iniciar as tabelas e `database/seeds` para popular o banco.

```bash
uvicorn src.entrypoints.fastapi:app --host 0.0.0.0 --port 8000 --reload
```

> A flag `--reload` serve para que o servidor atualize a cada inicialização no backend, caso não queira, coloque sem essa flag.

### Iniciando Frontend

O _frontend_ é feito com o `expo` e é executado através do `npx`.

```bash
npx expo start
```
