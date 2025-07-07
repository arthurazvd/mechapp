from src.service.unit_of_work import UnidadeDeTrabalho
from src.service.services.agendamento_services import (
    criar_agendamento,
    alterar_agendamento,
    remover_agendamento,
    consultar_agendamento,
)
from src.domain.exceptions import (
    AgendamentoInvalido,
    AgendamentoNaoEncontrado,
)
from tests.mocks import agendamento_base, mock_criar_agendamento
import pytest

def test_criar_agendamento_service(session_maker, agendamento_base):
    uow = UnidadeDeTrabalho(session_maker)
    
    # Agendamento base para teste
    agendamento = agendamento_base()
    
    # Criando agendamento com sucesso
    criar_agendamento(
        uow=uow,
        status=agendamento.status,
        cliente_id=agendamento.cliente_id,
        servico_id=agendamento.servico_id,
        data=agendamento.data,
    )

    # Verificando se agendamento foi criado
    with uow:
        agendamento_encontrado = uow.agendamentos.consultar_por_id(agendamento.id)
        assert agendamento_encontrado is not None
        assert agendamento_encontrado.status == agendamento.status

    # AgendamentoInvalido: Dados de agendamento inválidos.
    with pytest.raises(AgendamentoInvalido):
        criar_agendamento(
            uow=uow,
            status=None,
            cliente_id=None,
            servico_id=None,
            data=None,
        )

    with pytest.raises(AgendamentoNaoEncontrado):
        criar_agendamento(
            uow=uow,
            status=agendamento.status,
            cliente_id=agendamento.cliente_id,
            servico_id=agendamento.servico_id,
            data="2023-01-01T00:00:00Z",  # Data inválida
        )

def test_alterar_agendamento_service(session_maker, agendamento_base):
    uow = UnidadeDeTrabalho(session_maker)
    
    # Agendamento base para teste
    agendamento = agendamento_base()
    
    # Criando agendamento para ser alterado
    criar_agendamento(
        uow=uow,
        status=agendamento.status,
        cliente_id=agendamento.cliente_id,
        servico_id=agendamento.servico_id,
        data=agendamento.data,
    )

    # Alterando agendamento com sucesso
    novo_status = "concluido"
    novo_cliente_id = "cliente-123"
    novo_servico_id = "servico-456"
    nova_data = "2023-01-02T00:00:00Z"

    alterar_agendamento(
        uow=uow,
        agendamento_id=agendamento.id,
        nova_data=nova_data,
        novo_status=novo_status,
        novo_cliente_id=novo_cliente_id,
        novo_servico_id=novo_servico_id,
    )

    with uow:
        agendamento_alterado = uow.agendamentos.consultar_por_id(agendamento.id)
        assert agendamento_alterado.status == novo_status
        assert agendamento_alterado.cliente_id == novo_cliente_id
        assert agendamento_alterado.servico_id == novo_servico_id
        assert agendamento_alterado.data == nova_data

    # AgendamentoInvalido: Dados de agendamento inválidos.
    with pytest.raises(AgendamentoInvalido):
        alterar_agendamento(
            uow=uow,
            agendamento_id=agendamento.id,
            nova_data=None,
            novo_status=None,
            novo_cliente_id=None,
            novo_servico_id=None,
        )

    # AgendamentoNaoEncontrado: O agendamento com o ID informado não foi encontrado.
    with pytest.raises(AgendamentoNaoEncontrado):
        alterar_agendamento(
            uow=uow,
            agendamento_id="inexistente",
            nova_data=nova_data,
            novo_status=novo_status,
            novo_cliente_id=novo_cliente_id,
            novo_servico_id=novo_servico_id,
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
        agendamento_encontrado = uow.agendamentos.consultar_por_id(agendamento.id)
        assert agendamento_encontrado is None

    # AgendamentoNaoEncontrado: O agendamento com o ID informado não foi encontrado.
    with pytest.raises(AgendamentoNaoEncontrado):
        remover_agendamento(
            uow=uow,
            agendamento_id="inexistente",
        )

def test_consultar_agendamento_service(session_maker, mock_criar_agendamento):
    uow = UnidadeDeTrabalho(session_maker)

    # Agendamento base para teste
    agendamento = mock_criar_agendamento()

    # Consultar agendamento existente
    agendamento_encontrado = consultar_agendamento(
        uow=uow,
        agendamento_id=agendamento.id,
    )

    assert agendamento_encontrado.get("id") == agendamento.id
    assert agendamento_encontrado.get("status") == agendamento.status
    assert agendamento_encontrado.get("cliente_id") == agendamento.cliente_id
    assert agendamento_encontrado.get("servico_id") == agendamento.servico_id
    assert agendamento_encontrado.get("data") == agendamento.data

    # Consultar agendamento não-existente
    with pytest.raises(AgendamentoNaoEncontrado):
        consultar_agendamento(
            uow=uow,
            agendamento_id="inexistente",
        )