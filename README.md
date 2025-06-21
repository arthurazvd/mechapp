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

### Monólito

- Como iniciar o monólito
