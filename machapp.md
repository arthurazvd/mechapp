## Desenvolvimento

O desenvolvimento do **MechApp**, um aplicativo de gerenciamento para mecânicos, foi focado na criação das telas de cadastro, edição, visualização e gerenciamento dos serviços e peças, utilizando React Native com Expo. A seguir, descrevemos as principais etapas realizadas.

### 1. Definição das entidades representativas dos casos de uso do sistema

Foram identificadas as entidades principais do sistema correspondentes às operações CRUD relacionadas a Serviços e Peças, que são os objetos centrais do MechApp para o controle das atividades do mecânico. Estas entidades foram modeladas para atender às funcionalidades básicas de cadastro, edição, visualização e gerenciamento.

### 2. Definição dos campos de dados dessas entidades e dados simulados (mockados)

Cada entidade possui seus respectivos campos de dados, representando as informações necessárias para sua correta manipulação. Por exemplo, a entidade Serviço contempla campos como título, descrição, imagens associadas, entre outros. Durante o desenvolvimento inicial, dados simulados (mockados) foram utilizados para permitir a implementação e testes das interfaces, garantindo que a navegação e visualização fossem funcionais antes da integração com backend.

Além disso, já foram implementadas validações e filtros básicos para os dados inseridos nas telas, como a formatação dos campos de preço para o formato monetário e a restrição para que campos numéricos aceitem somente números, evitando entradas inválidas e melhorando a qualidade dos dados coletados.

### 3. Definição do design (layout e apresentação) das telas para as entidades

O design das telas foi pensado para ser funcional e intuitivo, facilitando o fluxo do mecânico durante o uso do aplicativo. Foram criados componentes reutilizáveis, como `CustomInput` (com labels), `TextArea`, `InfoView` e um componente para adicionar imagens, permitindo uma interface organizada e consistente. O layout das telas inclui:

- Tela de Cadastro e Edição de Serviços e Peças, com formulários completos para entrada de dados;
- Tela de Visualização dos Serviços e Peças, apresentando as informações detalhadas;
- Componentes visuais claros e de fácil interação, respeitando as boas práticas de design mobile.

### 4. Implementação das telas e navegação

A implementação das telas foi realizada utilizando React Native com Expo, garantindo alta performance e compatibilidade entre plataformas. A navegação entre as telas foi estruturada utilizando o **Expo Router**, que permite uma organização moderna e simples do fluxo do app, facilitando a manutenção e escalabilidade do código.

As telas implementadas até o momento incluem:

- Cadastro, edição e visualização de Serviços;
- Cadastro, edição e visualização de Peças;
- Componentes auxiliares para entrada de texto e gerenciamento de imagens.

A navegação está configurada para permitir uma transição fluida entre as funcionalidades, facilitando a experiência do usuário.

### 5. Documentação das atividades anteriores

Durante o desenvolvimento, todas as alterações foram registradas em commits claros e organizados, refletindo a evolução do projeto, desde a criação dos componentes básicos até a implementação das telas completas e da navegação. Os desafios encontrados foram principalmente a criação de componentes reutilizáveis que pudessem atender a múltiplas necessidades e a estruturação da navegação com Expo Router, que foi superada com estudo e testes práticos.

Além das funcionalidades atuais, o MechApp prevê a implementação de outras telas e funcionalidades, que serão desenvolvidas nas próximas etapas do projeto.
