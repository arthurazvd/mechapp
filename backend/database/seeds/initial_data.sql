-- Limpeza inicial
TRUNCATE TABLE pecas_do_agendamento, avaliacoes, agendamentos, servicos, oficinas, pecas, usuarios RESTART IDENTITY CASCADE;

-- Inserção de usuários (5 no total: 3 clientes e 2 mecânicos)
INSERT INTO usuarios (id, nome, email, senha, tipo, telefone) VALUES
('usuario-001', 'João Silva', 'joao.mecanico@email.com', '$2a$10$xJwL5v5Jz5U6ZQ5Jz5U6Z.Q5Jz5U6ZQ5Jz5U6ZQ5Jz5U6ZQ5Jz5U6Z', 'MECANICO', '(11) 99999-1111'),
('usuario-002', 'Maria Souza', 'maria.mecanica@email.com', '$2a$10$xJwL5v5Jz5U6ZQ5Jz5U6Z.Q5Jz5U6ZQ5Jz5U6ZQ5Jz5U6ZQ5Jz5U6Z', 'MECANICO', '(11) 99999-2222'),
('usuario-003','Carlos Oliveira', 'carlos.cliente@email.com', '$2a$10$xJwL5v5Jz5U6ZQ5Jz5U6Z.Q5Jz5U6ZQ5Jz5U6ZQ5Jz5U6ZQ5Jz5U6Z', 'CLIENTE', '(11) 99999-3333'),
('usuario-004','Ana Santos', 'ana.cliente@email.com', '$2a$10$xJwL5v5Jz5U6ZQ5Jz5U6Z.Q5Jz5U6ZQ5Jz5U6ZQ5Jz5U6ZQ5Jz5U6Z', 'CLIENTE', '(11) 99999-4444'),
('usuario-005','Pedro Costa', 'pedro.cliente@email.com', '$2a$10$xJwL5v5Jz5U6ZQ5Jz5U6Z.Q5Jz5U6ZQ5Jz5U6ZQ5Jz5U6ZQ5Jz5U6Z', 'CLIENTE', '(11) 99999-5555');

-- Inserção de oficinas (3 no total, sendo 2 do mesmo mecânico)
INSERT INTO oficinas (id, usuario_id, nome, cnpj, endereco) VALUES
('oficina-001','usuario-001', 'Oficina do João', '12345678000101', 'Rua das Flores, 100 - São Paulo/SP'),
('oficina-002','usuario-001', 'AutoCenter João', '12345678000102', 'Av. Paulista, 500 - São Paulo/SP'),
('oficina-003','usuario-002', 'Mecânica Maria', '98765432000101', 'Rua das Pedras, 200 - São Paulo/SP');

-- Inserção de peças (10 no total)
INSERT INTO pecas (id, nome, descricao, quantidade, preco) VALUES
('peca-001', 'Pastilha de Freio', 'Pastilha de freio dianteira para carros populares', 50, 89.90),
('peca-002', 'Disco de Freio', 'Disco de freio ventilado', 30, 199.90),
('peca-003', 'Filtro de Óleo', 'Filtro de óleo sintético', 100, 29.90),
('peca-004', 'Vela de Ignição', 'Vela de ignição iridium', 80, 49.90),
('peca-005', 'Correia Dentada', 'Kit correia dentada + tensor', 25, 349.90),
('peca-006', 'Amortecedor', 'Amortecedor dianteiro', 15, 399.90),
('peca-007', 'Bateria', 'Bateria 60Ah selada', 20, 499.90),
('peca-008', 'Lâmpada Farol', 'Lâmpada H7 55W', 60, 39.90),
('peca-009', 'Óleo Motor', 'Óleo sintético 5W30 1L', 40, 59.90),
('peca-010', 'Filtro de Ar', 'Filtro de ar esportivo', 35, 119.90);

-- Inserção de serviços (2 para cada oficina)
INSERT INTO servicos (id, oficina_id, nome, descricao, tempo, preco_min, preco_max) VALUES
('servico-001', 'oficina-001', 'Troca de Óleo', 'Troca de óleo e filtro', 30, 79.90, 129.90),
('servico-002', 'oficina-001', 'Alinhamento', 'Alinhamento 3D', 60, 89.90, 149.90),
('servico-003', 'oficina-002', 'Troca de Óleo', 'Troca de óleo e filtro premium', 30, 99.90, 159.90),
('servico-004', 'oficina-002', 'Balanceamento', 'Balanceamento de rodas', 45, 59.90, 99.90),
('servico-005', 'oficina-003', 'Revisão Básica', 'Check-up completo do veículo', 90, 199.90, 299.90),
('servico-006', 'oficina-003', 'Troca de Pastilhas', 'Troca de pastilhas de freio', 60, 149.90, 249.90);

-- Inserção de agendamentos (1 por cliente em cada oficina = 3 clientes x 3 oficinas = 9 agendamentos)
INSERT INTO agendamentos (id, cliente_id, servico_id, data, status) VALUES
('agendamento-001', 'usuario-003', 'servico-001', CURRENT_TIMESTAMP + INTERVAL '1 day', 'CONFIRMADO'),  -- Oficina 1
('agendamento-002', 'usuario-003', 'servico-003', CURRENT_TIMESTAMP + INTERVAL '2 days', 'PENDENTE'),   -- Oficina 2
('agendamento-003', 'usuario-003', 'servico-005', CURRENT_TIMESTAMP + INTERVAL '3 days', 'CONCLUIDO'),  -- Oficina 3
('agendamento-004', 'usuario-004', 'servico-001', CURRENT_TIMESTAMP + INTERVAL '1 day', 'CONFIRMADO'),  -- Oficina 1
('agendamento-005', 'usuario-004', 'servico-004', CURRENT_TIMESTAMP + INTERVAL '2 days', 'PENDENTE'),   -- Oficina 2
('agendamento-006', 'usuario-004', 'servico-005', CURRENT_TIMESTAMP + INTERVAL '3 days', 'CONCLUIDO'),  -- Oficina 3
('agendamento-007', 'usuario-005', 'servico-002', CURRENT_TIMESTAMP + INTERVAL '1 day', 'CONFIRMADO'),  -- Oficina 1
('agendamento-008', 'usuario-005', 'servico-003', CURRENT_TIMESTAMP + INTERVAL '2 days', 'PENDENTE'),   -- Oficina 2
('agendamento-009', 'usuario-005', 'servico-006', CURRENT_TIMESTAMP + INTERVAL '3 days', 'CONCLUIDO');  -- Oficina 3

-- Inserção de avaliações (1 por agendamento concluído)
INSERT INTO avaliacoes (id, cliente_id, servico_id, nota, comentario, data) VALUES
('avaliacao-001', 'usuario-003', 'servico-001', 5, 'Ótimo atendimento, serviço rápido e eficiente!', CURRENT_TIMESTAMP),
('avaliacao-002', 'usuario-003', 'servico-005', 4, 'Bom serviço, mas demorou mais que o previsto', CURRENT_TIMESTAMP),
('avaliacao-003', 'usuario-004', 'servico-001', 3, 'Serviço ok, mas preço alto para o que foi feito', CURRENT_TIMESTAMP),
('avaliacao-004', 'usuario-004', 'servico-005', 5, 'Excelente! Recomendo a oficina', CURRENT_TIMESTAMP),
('avaliacao-005', 'usuario-005', 'servico-002', 4, 'Profissionais qualificados, ficou muito bom', CURRENT_TIMESTAMP),
('avaliacao-006', 'usuario-005', 'servico-006', 2, 'Não ficou bom, vou ter que levar em outro lugar', CURRENT_TIMESTAMP);

-- Inserção de peças utilizadas nos agendamentos
INSERT INTO pecas_do_agendamento (id, agendamento_id, peca_id, quantidade) VALUES
('peca-do-agendamento-001','agendamento-001', 'peca-003', 1),  -- Filtro de Óleo
('peca-do-agendamento-002','agendamento-001', 'peca-009', 4),  -- Óleo Motor (4 litros)
('peca-do-agendamento-003','agendamento-003', 'peca-001', 1),  -- Pastilha de Freio
('peca-do-agendamento-004','agendamento-003', 'peca-002', 1),  -- Disco de Freio
('peca-do-agendamento-005','agendamento-003', 'peca-003', 1),  -- Filtro de Óleo
('peca-do-agendamento-006','agendamento-006', 'peca-005', 1),  -- Correia Dentada
('peca-do-agendamento-007','agendamento-006', 'peca-006', 2),  -- Amortecedor (2 unidades)
('peca-do-agendamento-008','agendamento-009', 'peca-001', 2);  -- Pastilha de Freio (2 conjuntos)