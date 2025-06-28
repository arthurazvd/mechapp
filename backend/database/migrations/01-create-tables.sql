-- Criação do tipo ENUM 
CREATE TYPE tipo_usuario AS ENUM ('cliente', 'mecanico');
CREATE TYPE status_agendamento AS ENUM(
    'pendente','confirmado','concluido','cancelado'
);

-- Criando usuário
CREATE TABLE IF NOT EXISTS usuarios (
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo tipo_usuario NOT NULL,
    telefone VARCHAR(15),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criando oficina
CREATE TABLE IF NOT EXISTS oficinas (
    id VARCHAR(36) PRIMARY KEY,
    usuario_id VARCHAR(36),
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    endereco TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Criando peça
CREATE TABLE IF NOT EXISTS pecas (
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    quantidade INT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    imagem BYTEA,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criando serviço
CREATE TABLE IF NOT EXISTS servicos (
    id VARCHAR(36) PRIMARY KEY,
    oficina_id VARCHAR(36) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    tempo INT NOT NULL,
    preco_max DECIMAL(10, 2),
    preco_min DECIMAL(10, 2),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (oficina_id) REFERENCES oficinas(id) ON DELETE CASCADE
);

-- Criando agendamento
CREATE TABLE IF NOT EXISTS agendamentos (
    id VARCHAR(36) PRIMARY KEY,
    cliente_id VARCHAR(36),
    servico_id VARCHAR(36) NOT NULL,
    data TIMESTAMP NOT NULL,
    status status_agendamento NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(cliente_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY(servico_id) REFERENCES servicos(id) ON DELETE CASCADE
);

-- Criando avaliação
CREATE TABLE IF NOT EXISTS avaliacoes (
    id VARCHAR(36) PRIMARY KEY,
    cliente_id VARCHAR(36) NOT NULL,
    servico_id VARCHAR(36) NOT NULL,
    nota INT NOT NULL,
    comentario TEXT,  
    data TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(cliente_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY(servico_id) REFERENCES servicos(id) ON DELETE CASCADE
);

-- Criando peças do agendamento
CREATE TABLE IF NOT EXISTS pecas_do_agendamento(
    id VARCHAR(36) PRIMARY KEY,
    agendamento_id VARCHAR(36), 
    peca_id VARCHAR(36) NOT NULL,
    quantidade INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(agendamento_id) REFERENCES agendamentos(id) ON DELETE SET NULL,
    FOREIGN KEY(peca_id) REFERENCES pecas(id) ON DELETE CASCADE
);