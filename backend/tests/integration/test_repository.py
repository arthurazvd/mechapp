from src.adapters.repositories import *
from tests.mocks import *

def test_peca_repository(session, peca_base):
    peca = peca_base()
    peca_repo = PecaRepository(session)

    # Adicionar
    peca_repo.adicionar(peca)

    # Consultar
    peca_encontrada = peca_repo.consultar(peca.id)
    assert peca_encontrada == peca

    # Salvar
    peca_encontrada.nome = "Novo Nome"
    peca_encontrada.descricao = "Nova Descrição"
    peca_repo.salvar(peca)

    peca_atualizada = peca_repo.consultar(peca.id)
    assert peca_atualizada.nome == "Novo Nome"
    assert peca_atualizada.descricao == "Nova Descrição"

    # Remover
    peca_repo.remover(peca)
    
    peca_deletada = peca_repo.consultar(peca.id)
    assert peca_deletada is None

def test_usuario_repository(session, usuario_base):
    usuario = usuario_base()
    usuario_repo = UsuarioRepository(session)

    # Adicionar
    usuario_repo.adicionar(usuario)

    # Consultar
    usuario_encontrado = usuario_repo.consultar(usuario.id)
    assert usuario_encontrado == usuario

    # Salvar
    usuario_encontrado.nome = "Novo Nome"
    usuario_encontrado.email = "novo@email.com"
    usuario_repo.salvar(usuario)

    usuario_atualizado = usuario_repo.consultar(usuario.id)
    assert usuario_atualizado.nome == "Novo Nome"
    assert usuario_atualizado.email == "novo@email.com"

    # Remover
    usuario_repo.remover(usuario)
    
    usuario_deletado = usuario_repo.consultar(usuario.id)
    assert usuario_deletado is None

def test_oficina_repository(session, oficina_base):
    oficina = oficina_base()
    oficina_repo = OficinaRepository(session)

    # Adicionar
    oficina_repo.adicionar(oficina)

    # Consultar
    oficina_encontrada = oficina_repo.consultar(oficina.id)
    assert oficina_encontrada == oficina

    # Consultar por CNPJ
    oficina_por_cnpj = oficina_repo.consultar_por_cnpj(oficina.cnpj)
    assert oficina_por_cnpj == oficina

    # Consultar por proprietário
    oficinas_do_proprietario = oficina_repo.consultar_por_proprietario(oficina.proprietario.id)
    assert len(oficinas_do_proprietario) == 1
    assert oficinas_do_proprietario[0] == oficina

    # Salvar
    oficina_encontrada.nome = "Nova Oficina"
    oficina_encontrada.endereco = "Novo Endereço, 456"
    oficina_repo.salvar(oficina)

    oficina_atualizada = oficina_repo.consultar(oficina.id)
    assert oficina_atualizada.nome == "Nova Oficina"
    assert oficina_atualizada.endereco == "Novo Endereço, 456"

    # Remover
    oficina_repo.remover(oficina)
    
    oficina_deletada = oficina_repo.consultar(oficina.id)
    assert oficina_deletada is None

def test_servico_repository(session, servico_base):
    servico = servico_base()
    servico_repo = ServicoRepository(session)

    # Adicionar
    servico_repo.adicionar(servico)

    # Consultar
    servico_encontrado = servico_repo.consultar(servico.id)
    assert servico_encontrado == servico

    # Consultar por nome
    servicos_por_nome = servico_repo.consultar_por_nome(servico.nome)
    assert len(servicos_por_nome) == 1
    assert servicos_por_nome[0] == servico

    # Salvar
    servico_encontrado.nome = "Novo Serviço"
    servico_encontrado.descricao = "Nova descrição do serviço"
    servico_repo.salvar(servico)

    servico_atualizado = servico_repo.consultar(servico.id)
    assert servico_atualizado.nome == "Novo Serviço"
    assert servico_atualizado.descricao == "Nova descrição do serviço"

    # Remover
    servico_repo.remover(servico)
    
    servico_deletado = servico_repo.consultar(servico.id)
    assert servico_deletado is None


def test_agendamento_repository(session, agendamento_base):
    agendamento = agendamento_base()
    agendamento_repo = AgendamentoRepository(session)

    # Adicionar
    agendamento_repo.adicionar(agendamento)

    # Consultar
    agendamento_encontrado = agendamento_repo.consultar(agendamento.id)
    assert agendamento_encontrado == agendamento

    # Consultar por dia
    data_inicio = agendamento.data.replace(hour=0, minute=0, second=0, microsecond=0)
    data_fim = agendamento.data.replace(hour=23, minute=59, second=59, microsecond=999999)
    agendamentos_do_dia = agendamento_repo.consultar_por_dia([data_inicio, data_fim])
    assert len(agendamentos_do_dia) == 1
    assert agendamentos_do_dia[0] == agendamento

    # Salvar
    agendamento_encontrado.status = StatusAgendamento.CONFIRMADO
    agendamento_repo.salvar(agendamento)

    agendamento_atualizado = agendamento_repo.consultar(agendamento.id)
    assert agendamento_atualizado.status == StatusAgendamento.CONFIRMADO

    # Remover
    agendamento_repo.remover(agendamento)
    
    agendamento_deletado = agendamento_repo.consultar(agendamento.id)
    assert agendamento_deletado is None


def test_pecas_do_agendamento_repository(
    session, 
    criar_agendamento,
    peca_do_agendamento_base,
):
    peca_do_agendamento = peca_do_agendamento_base()
    agendamento = criar_agendamento()
    pecas_repo = PecasDoAgendamentoRepository(session)

    # Persistindo agendamento na sessão atual
    agendamento = session.merge(agendamento)

    # Adicionar
    pecas_repo.adicionar(peca_do_agendamento)

    # Consultar
    peca_encontrada = pecas_repo.consultar(peca_do_agendamento.id)
    assert peca_encontrada == peca_do_agendamento

    # Salvar
    peca_encontrada.quantidade = 5
    peca_encontrada.agendamento_id = agendamento.id
    pecas_repo.salvar(peca_do_agendamento)

    peca_atualizada = pecas_repo.consultar(peca_do_agendamento.id)
    assert peca_atualizada.quantidade == 5
    assert peca_atualizada.agendamento_id == agendamento.id

    # Consultar por agendamento
    pecas_do_agendamento = pecas_repo.consultar_por_agendamento(agendamento.id)
    assert len(pecas_do_agendamento) == 2
    assert pecas_do_agendamento[1] == peca_do_agendamento

    # Remover
    pecas_repo.remover(peca_do_agendamento)
    
    peca_deletada = pecas_repo.consultar(peca_do_agendamento.id)
    assert peca_deletada is None

def test_avaliacao_repository(session, avaliacao_base):
    avaliacao = avaliacao_base()
    avaliacao_repo = AvaliacaoRepository(session)

    # Adicionar
    avaliacao_repo.adicionar(avaliacao)

    # Consultar
    avaliacao_encontrada = avaliacao_repo.consultar(avaliacao.id)
    assert avaliacao_encontrada == avaliacao

    # Consultar por cliente
    avaliacoes_do_cliente = avaliacao_repo.consultar_por_cliente(avaliacao.cliente.id)
    assert len(avaliacoes_do_cliente) == 1
    assert avaliacoes_do_cliente[0] == avaliacao

    # Consultar por serviço
    avaliacoes_do_servico = avaliacao_repo.consultar_por_servico(avaliacao.servico.id)
    assert len(avaliacoes_do_servico) == 1
    assert avaliacoes_do_servico[0] == avaliacao

    # Salvar
    avaliacao_encontrada.nota = NotaAvaliacao.EXCELENTE
    avaliacao_encontrada.comentario = "Serviço excelente, super recomendo!"
    avaliacao_repo.salvar(avaliacao)

    avaliacao_atualizada = avaliacao_repo.consultar(avaliacao.id)
    assert avaliacao_atualizada.nota == NotaAvaliacao.EXCELENTE
    assert avaliacao_atualizada.comentario == "Serviço excelente, super recomendo!"

    # Remover
    avaliacao_repo.remover(avaliacao)
    
    avaliacao_deletada = avaliacao_repo.consultar(avaliacao.id)
    assert avaliacao_deletada is None



