import pytest
from datetime import datetime, timedelta
from src.service.unit_of_work import UnidadeDeTrabalho
from src.service import (
    criar_agendamento,
    alterar_agendamento,
    remover_agendamento,
    consultar_agendamento,
    listar_agendamentos,
)
from src.domain.exceptions import (
    AgendamentoInvalido, 
    AgendamentoNaoEncontrado, 
    UsuarioNaoEncontrado,
    ServicoNaoEncontrado,
    PecaNaoEncontrada,
    PecaDoAgendamentoNaoEncontrada,
)
from src.domain.models import StatusAgendamento, TipoUsuario
from tests.mocks import (
    mock_criar_agendamento,
    mock_criar_usuario,
    mock_criar_servico,
    mock_criar_peca,
    mock_criar_pecas_do_agendamento,
    oficina_base,
    mock_criar_oficina,
    agendamento_base,
    peca_base,
)
import pytest

def test_criar_agendamento_service(
    session_maker,
    mock_criar_usuario,
    mock_criar_servico,
    mock_criar_oficina,
    agendamento_base,
):
    uow = UnidadeDeTrabalho(session_maker)
    
    # Preparando dados para o agendamento
    cliente = mock_criar_usuario(tipo=TipoUsuario.CLIENTE, email="cliente@gmail.com")
    servico = mock_criar_servico()
    data_agendamento = datetime.now() + timedelta(days=1)
    
    # Criando agendamento com sucesso
    agendamento_id = criar_agendamento(
        uow=uow,
        data=data_agendamento,
        status=StatusAgendamento.PENDENTE.value,
        cliente_id=cliente.id,
        servico_id=servico.id,
    )

    # Verificando se agendamento foi criado
    with uow:
        agendamento_encontrado = uow.agendamentos.consultar(agendamento_id)
        assert agendamento_encontrado is not None
        assert agendamento_encontrado.data.date() == data_agendamento.date()
        assert agendamento_encontrado.status == StatusAgendamento.PENDENTE
        assert agendamento_encontrado.cliente.id == cliente.id
        assert agendamento_encontrado.servico.id == servico.id

    # AgendamentoInvalido: Dados de agendamento inválidos (campos obrigatórios ausentes)
    with pytest.raises(AgendamentoInvalido):
        criar_agendamento(
            uow=uow,
            data=None, # Data ausente
            status=StatusAgendamento.PENDENTE.value,
            cliente_id=cliente.id,
            servico_id=servico.id,
        )
    with pytest.raises(AgendamentoInvalido):
        criar_agendamento(
            uow=uow,
            data=data_agendamento,
            status="STATUS_INVALIDO", # Status inválido
            cliente_id=cliente.id,
            servico_id=servico.id,
        )

    # UsuarioNaoEncontrado: Cliente não encontrado
    with pytest.raises(UsuarioNaoEncontrado):
        criar_agendamento(
            uow=uow,
            data=data_agendamento,
            status=StatusAgendamento.PENDENTE.value,
            cliente_id="cliente-inexistente",
            servico_id=servico.id,
        )

    # ServicoNaoEncontrado: Serviço não encontrado
    with pytest.raises(ServicoNaoEncontrado):
        criar_agendamento(
            uow=uow,
            data=data_agendamento,
            status=StatusAgendamento.PENDENTE.value,
            cliente_id=cliente.id,
            servico_id="servico-inexistente",
        )

def test_alterar_agendamento_service(
    session_maker,
    mock_criar_agendamento,
    mock_criar_usuario,
    mock_criar_oficina,
    mock_criar_servico,
):
    uow = UnidadeDeTrabalho(session_maker)
    
    # Agendamento base para teste
    agendamento = mock_criar_agendamento()
    
    # Novas informações
    novo_cliente = mock_criar_usuario(tipo=TipoUsuario.CLIENTE, email="novo_cliente@gmail.com")
    novo_servico = mock_criar_servico(nome="Novo Serviço")
    nova_data = datetime.now() + timedelta(days=5)

    # Alterando agendamento com sucesso
    alterar_agendamento(
        uow=uow,
        agendamento_id=agendamento.id,
        nova_data=nova_data,
        novo_status=StatusAgendamento.CONFIRMADO.value,
        novo_cliente_id=novo_cliente.id,
        novo_servico_id=novo_servico.id,
    )

    # Verificando se agendamento foi alterado
    with uow:
        agendamento_alterado = uow.agendamentos.consultar(agendamento.id)
        assert agendamento_alterado is not None
        assert agendamento_alterado.data.date() == nova_data.date()
        assert agendamento_alterado.status == StatusAgendamento.CONFIRMADO
        assert agendamento_alterado.cliente.id == novo_cliente.id
        assert agendamento_alterado.servico.id == novo_servico.id
    
    # AgendamentoNaoEncontrado: Agendamento não encontrado
    with pytest.raises(AgendamentoNaoEncontrado):
        alterar_agendamento(
            uow=uow,
            agendamento_id='agendamento-inexistente',
            novo_status=StatusAgendamento.CANCELADO.value,
        )

    # AgendamentoInvalido: Status de agendamento inválido
    with pytest.raises(AgendamentoInvalido):
        alterar_agendamento(
            uow=uow,
            agendamento_id=agendamento.id,
            novo_status="STATUS_MUITO_DOIDO",
        )

    # UsuarioNaoEncontrado: Novo cliente não encontrado
    with pytest.raises(UsuarioNaoEncontrado):
        alterar_agendamento(
            uow=uow,
            agendamento_id=agendamento.id,
            novo_cliente_id='cliente-nao-existe',
        )

    # ServicoNaoEncontrado: Novo serviço não encontrado
    with pytest.raises(ServicoNaoEncontrado):
        alterar_agendamento(
            uow=uow,
            agendamento_id=agendamento.id,
            novo_servico_id='servico-nao-existe',
        )

def test_remover_agendamento_service(session_maker, mock_criar_agendamento):
    uow = UnidadeDeTrabalho(session_maker)

    # Agendamento base para teste
    agendamento = mock_criar_agendamento()

    # Removendo agendamento com sucesso
    remover_agendamento(
        uow=uow,
        agendamento_id=agendamento.id,
    )

    # Verificando se agendamento foi removido
    with uow:
        agendamento_encontrado = uow.agendamentos.consultar(agendamento.id)
        assert agendamento_encontrado is None

    # AgendamentoNaoEncontrado: Agendamento não encontrado.
    with pytest.raises(AgendamentoNaoEncontrado):
        remover_agendamento(
            uow=uow,
            agendamento_id='agendamento-inexistente',
        )

def test_consultar_agendamento_service(
    session_maker,
    mock_criar_agendamento,
    mock_criar_oficina,
):
    uow = UnidadeDeTrabalho(session_maker)

    # Agendamento base para teste
    agendamento = mock_criar_agendamento()

    # Consultar agendamento existente
    agendamento_encontrado = consultar_agendamento(
        uow=uow,
        agendamento_id=agendamento.id,
    )

    assert agendamento_encontrado.get("id") == agendamento.id
    assert agendamento_encontrado.get("status") == agendamento.status.value
    assert agendamento_encontrado.get("cliente").get("id") == agendamento.cliente.id
    assert agendamento_encontrado.get("servico").get("id") == agendamento.servico.id
    assert len(agendamento_encontrado.get("pecas_do_agendamento")) == len(agendamento.pecas_do_agendamento)

    # Consultar agendamento não-existente
    agendamento_inexistente = consultar_agendamento(
        uow=uow,
        agendamento_id="id-inexistente",
    )

    assert agendamento_inexistente.get("id") == None
    assert agendamento_inexistente.get("status") == None
    assert agendamento_inexistente.get("cliente") == None
    assert agendamento_inexistente.get("servico") == None

def test_listar_agendamentos_service(
    session_maker, 
    mock_criar_agendamento,
    mock_criar_usuario,
    mock_criar_oficina,
    mock_criar_servico,
):
    uow = UnidadeDeTrabalho(session_maker)

    # Agendamentos base para teste
    cliente1 = mock_criar_usuario(email="cliente1@test.com", tipo=TipoUsuario.CLIENTE)
    cliente2 = mock_criar_usuario(email="cliente2@test.com", tipo=TipoUsuario.CLIENTE)
    servico1 = mock_criar_servico(nome="Troca de Óleo")
    servico2 = mock_criar_servico(nome="Revisão Completa")

    agendamento1 = mock_criar_agendamento(
        cliente=cliente1, 
        servico=servico1, 
        data=datetime.now() + timedelta(days=1),
        persistir_cliente=True, persistir_servico=True,
    )
    agendamento2 = mock_criar_agendamento(
        cliente=cliente2, 
        servico=servico2, 
        data=datetime.now() + timedelta(days=2),
        persistir_cliente=True, persistir_servico=True,
    )
    agendamento3 = mock_criar_agendamento(
        cliente=cliente1, 
        servico=servico2, 
        data=datetime.now() + timedelta(days=3),
        persistir_cliente=True, persistir_servico=True,
    )

    # Listando todos os agendamentos
    agendamentos_encontrados = listar_agendamentos(uow=uow)

    assert len(agendamentos_encontrados) == 3
    assert agendamento1.to_dict() in agendamentos_encontrados
    assert agendamento2.to_dict() in agendamentos_encontrados
    assert agendamento3.to_dict() in agendamentos_encontrados

    # Listando agendamentos por cliente
    agendamentos_cliente1 = listar_agendamentos(uow=uow, cliente_id=cliente1.id)
    assert len(agendamentos_cliente1) == 2
    assert agendamento1.to_dict() in agendamentos_cliente1
    assert agendamento3.to_dict() in agendamentos_cliente1

    # Listando agendamentos por serviço
    agendamentos_servico1 = listar_agendamentos(uow=uow, servico_id=servico1.id)
    assert len(agendamentos_servico1) == 1
    assert agendamento1.to_dict() in agendamentos_servico1

    # Listando agendamentos por status
    agendamento_cancelado = mock_criar_agendamento(
        status=StatusAgendamento.CANCELADO,
        persistir_cliente=True, persistir_servico=True,
    )
    agendamentos_cancelados = listar_agendamentos(uow=uow, status=StatusAgendamento.CANCELADO.value)
    assert len(agendamentos_cancelados) == 1
    assert agendamento_cancelado.to_dict() in agendamentos_cancelados
