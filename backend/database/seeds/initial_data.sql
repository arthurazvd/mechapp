-- Limpeza inicial
TRUNCATE TABLE pecas_do_agendamento, avaliacoes, agendamentos, servicos, oficinas, pecas, usuarios RESTART IDENTITY CASCADE;

-- Inserção de usuários (5 no total: 3 clientes e 2 mecânicos)
INSERT INTO usuarios (nome, email, senha, tipo, telefone) VALUES
-- Mecânicos
('João Silva', 'joao.mecanico@email.com', '$2a$10$xJwL5v5Jz5U6ZQ5Jz5U6Z.Q5Jz5U6ZQ5Jz5U6ZQ5Jz5U6ZQ5Jz5U6Z', 'mecanico', '(11) 99999-1111'),
('Maria Souza', 'maria.mecanica@email.com', '$2a$10$xJwL5v5Jz5U6ZQ5Jz5U6Z.Q5Jz5U6ZQ5Jz5U6ZQ5Jz5U6ZQ5Jz5U6Z', 'mecanico', '(11) 99999-2222'),
-- Clientes
('Carlos Oliveira', 'carlos.cliente@email.com', '$2a$10$xJwL5v5Jz5U6ZQ5Jz5U6Z.Q5Jz5U6ZQ5Jz5U6ZQ5Jz5U6ZQ5Jz5U6Z', 'cliente', '(11) 99999-3333'),
('Ana Santos', 'ana.cliente@email.com', '$2a$10$xJwL5v5Jz5U6ZQ5Jz5U6Z.Q5Jz5U6ZQ5Jz5U6ZQ5Jz5U6ZQ5Jz5U6Z', 'cliente', '(11) 99999-4444'),
('Pedro Costa', 'pedro.cliente@email.com', '$2a$10$xJwL5v5Jz5U6ZQ5Jz5U6Z.Q5Jz5U6ZQ5Jz5U6ZQ5Jz5U6ZQ5Jz5U6Z', 'cliente', '(11) 99999-5555');

-- Inserção de oficinas (3 no total, sendo 2 do mesmo mecânico)
INSERT INTO oficinas (usuario_id, nome, cnpj, endereco) VALUES
-- Oficinas do João (mecânico 1)
(1, 'Oficina do João', '12345678000101', 'Rua das Flores, 100 - São Paulo/SP'),
(1, 'AutoCenter João', '12345678000102', 'Av. Paulista, 500 - São Paulo/SP'),
-- Oficina da Maria (mecânico 2)
(2, 'Mecânica Maria', '98765432000101', 'Rua das Pedras, 200 - São Paulo/SP');

-- Inserção de peças (10 no total)
INSERT INTO pecas (nome, descricao, quantidade, preco) VALUES
('Pastilha de Freio', 'Pastilha de freio dianteira para carros populares', 50, 89.90),
('Disco de Freio', 'Disco de freio ventilado', 30, 199.90),
('Filtro de Óleo', 'Filtro de óleo sintético', 100, 29.90),
('Vela de Ignição', 'Vela de ignição iridium', 80, 49.90),
('Correia Dentada', 'Kit correia dentada + tensor', 25, 349.90),
('Amortecedor', 'Amortecedor dianteiro', 15, 399.90),
('Bateria', 'Bateria 60Ah selada', 20, 499.90),
('Lâmpada Farol', 'Lâmpada H7 55W', 60, 39.90),
('Óleo Motor', 'Óleo sintético 5W30 1L', 40, 59.90),
('Filtro de Ar', 'Filtro de ar esportivo', 35, 119.90);

-- Inserção de serviços (2 para cada oficina)
INSERT INTO servicos (oficina_id, nome, descricao, tempo, preco_min, preco_max) VALUES
-- Oficina do João (ID 1)
(1, 'Troca de Óleo', 'Troca de óleo e filtro', 30, 79.90, 129.90),
(1, 'Alinhamento', 'Alinhamento 3D', 60, 89.90, 149.90),
-- AutoCenter João (ID 2)
(2, 'Troca de Óleo', 'Troca de óleo e filtro premium', 30, 99.90, 159.90),
(2, 'Balanceamento', 'Balanceamento de rodas', 45, 59.90, 99.90),
-- Mecânica Maria (ID 3)
(3, 'Revisão Básica', 'Check-up completo do veículo', 90, 199.90, 299.90),
(3, 'Troca de Pastilhas', 'Troca de pastilhas de freio', 60, 149.90, 249.90);

-- Inserção de agendamentos (1 por cliente em cada oficina = 3 clientes x 3 oficinas = 9 agendamentos)
INSERT INTO agendamentos (cliente_id, servico_id, data, status) VALUES
-- Cliente 3 (Carlos)
(3, 1, CURRENT_TIMESTAMP + INTERVAL '1 day', 'confirmado'),  -- Oficina 1
(3, 3, CURRENT_TIMESTAMP + INTERVAL '2 days', 'pendente'),   -- Oficina 2
(3, 5, CURRENT_TIMESTAMP + INTERVAL '3 days', 'concluido'),  -- Oficina 3
-- Cliente 4 (Ana)
(4, 1, CURRENT_TIMESTAMP + INTERVAL '1 day', 'confirmado'),  -- Oficina 1
(4, 4, CURRENT_TIMESTAMP + INTERVAL '2 days', 'pendente'),   -- Oficina 2
(4, 5, CURRENT_TIMESTAMP + INTERVAL '3 days', 'concluido'),  -- Oficina 3
-- Cliente 5 (Pedro)
(5, 2, CURRENT_TIMESTAMP + INTERVAL '1 day', 'confirmado'),  -- Oficina 1
(5, 3, CURRENT_TIMESTAMP + INTERVAL '2 days', 'pendente'),   -- Oficina 2
(5, 6, CURRENT_TIMESTAMP + INTERVAL '3 days', 'concluido');  -- Oficina 3

-- Inserção de avaliações (1 por agendamento concluído)
INSERT INTO avaliacoes (cliente_id, servico_id, nota, comentario, data) VALUES
-- Avaliações do Carlos
(3, 1, 5, 'Ótimo atendimento, serviço rápido e eficiente!', CURRENT_TIMESTAMP),
(3, 5, 4, 'Bom serviço, mas demorou mais que o previsto', CURRENT_TIMESTAMP),
-- Avaliações da Ana
(4, 1, 3, 'Serviço ok, mas preço alto para o que foi feito', CURRENT_TIMESTAMP),
(4, 5, 5, 'Excelente! Recomendo a oficina', CURRENT_TIMESTAMP),
-- Avaliações do Pedro
(5, 2, 4, 'Profissionais qualificados, ficou muito bom', CURRENT_TIMESTAMP),
(5, 6, 2, 'Não ficou bom, vou ter que levar em outro lugar', CURRENT_TIMESTAMP);

-- Inserção de peças utilizadas nos agendamentos
INSERT INTO pecas_do_agendamento (agendamento_id, peca_id, quantidade) VALUES
-- Agendamento 1 (Troca de Óleo)
(1, 3, 1),  -- Filtro de Óleo
(1, 9, 4),  -- Óleo Motor (4 litros)
-- Agendamento 3 (Revisão Básica)
(3, 1, 1),  -- Pastilha de Freio
(3, 2, 1),  -- Disco de Freio
(3, 3, 1),  -- Filtro de Óleo
-- Agendamento 6 (Revisão Básica)
(6, 5, 1),  -- Correia Dentada
(6, 6, 2),  -- Amortecedor (2 unidades)
-- Agendamento 9 (Troca de Pastilhas)
(9, 1, 2);  -- Pastilha de Freio (2 conjuntos)