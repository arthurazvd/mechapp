# test_agendamento_service.py
import pytest
import uuid
from uuid import uuid4
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
from src.domain.models import StatusAgendamento, TipoUsuario, Agendamento  # Adicionei Agendamento aqui
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

@pytest.fixture
def peca_do_agendamento_base():
    return {
        "peca_id": "123",
        "quantidade": 1,
        "valor_unitario": 10.0
    }

def test_criar_agendamento_service(
    session_maker,
    mock_criar_usuario,
    mock_criar_servico,
    mock_criar_oficina,
    peca_do_agendamento_base
):
    uow = UnidadeDeTrabalho(session_maker)
    
    cliente = mock_criar_usuario(
        tipo=TipoUsuario.CLIENTE, 
        email=f"cliente_{uuid.uuid4().hex[:8]}@test.com"
    )
    servico = mock_criar_servico(nome="Serviço Teste 1")
    data_agendamento = datetime.now() + timedelta(days=1)
    
    agendamento_id = criar_agendamento(
        uow=uow,
        data=data_agendamento,
        status=StatusAgendamento.PENDENTE.value,
        cliente_id=cliente.id,
        servico_id=servico.id,
    )

    with uow:
        agendamento_encontrado = uow.agendamentos.consultar(agendamento_id)
        assert agendamento_encontrado is not None
        assert agendamento_encontrado.data.date() == data_agendamento.date()
        assert agendamento_encontrado.status == StatusAgendamento.PENDENTE
        assert agendamento_encontrado.cliente.id == cliente.id
        assert agendamento_encontrado.servico.id == servico.id

    with pytest.raises(AgendamentoInvalido):
        criar_agendamento(
            uow=uow,
            status="abluble",
            cliente_id=cliente.id,
            servico_id=servico.id,
        )

    with pytest.raises(UsuarioNaoEncontrado):
        criar_agendamento(
            uow=uow,
            data=data_agendamento,
            status=StatusAgendamento.PENDENTE.value,
            cliente_id="cliente-inexistente",
            servico_id=servico.id,
        )

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

    with uow:
        cliente_original = mock_criar_usuario(
            tipo=TipoUsuario.CLIENTE,
            email=f"cliente_original_{uuid.uuid4().hex[:8]}@test.com"
        )
        novo_cliente = mock_criar_usuario(
            tipo=TipoUsuario.CLIENTE,
            email=f"novo_cliente_{uuid.uuid4().hex[:8]}@test.com"
        )

        servico_original = mock_criar_servico(nome="Serviço Original")
        novo_servico = mock_criar_servico(nome="Novo Serviço Único")

        agendamento = mock_criar_agendamento(
            cliente=cliente_original,
            servico=servico_original
        )
        uow.commit()

    nova_data = datetime.now() + timedelta(days=5)

    alterar_agendamento(
        uow=uow,
        agendamento_id=agendamento.id,
        nova_data=nova_data,
        novo_status=StatusAgendamento.CONFIRMADO.value,
        novo_servico_id=novo_servico.id
    )

    with uow:
        agendamento_alterado = uow.agendamentos.consultar(agendamento.id)
        assert agendamento_alterado.data.date() == nova_data.date()
        assert agendamento_alterado.status == StatusAgendamento.CONFIRMADO
        assert agendamento_alterado.servico.id == novo_servico.id

    with pytest.raises(AgendamentoNaoEncontrado):
        alterar_agendamento(
            uow=uow,
            agendamento_id='agendamento-inexistente',
            novo_status=StatusAgendamento.CANCELADO.value,
        )

    with pytest.raises(AgendamentoInvalido):
        alterar_agendamento(
            uow=uow,
            agendamento_id=agendamento.id,
            novo_status="STATUS_INVALIDO",
        )

    with pytest.raises(ServicoNaoEncontrado):
        alterar_agendamento(
            uow=uow,
            agendamento_id=agendamento.id,
            novo_servico_id='servico-nao-existe',
        )

def test_remover_agendamento_service(session_maker, mock_criar_agendamento):
    uow = UnidadeDeTrabalho(session_maker)

    agendamento = mock_criar_agendamento()

    remover_agendamento(uow=uow, agendamento_id=agendamento.id)

    with uow:
        assert uow.agendamentos.consultar(agendamento.id) is None

    with pytest.raises(AgendamentoNaoEncontrado):
        remover_agendamento(uow=uow, agendamento_id='agendamento-inexistente')

def test_consultar_agendamento_service(session_maker, mock_criar_agendamento):
    uow = UnidadeDeTrabalho(session_maker)

    agendamento = mock_criar_agendamento()

    resultado = consultar_agendamento(uow=uow, agendamento_id=agendamento.id)
    
    assert resultado["id"] == agendamento.id
    assert resultado["status"] == agendamento.status.value
    assert resultado["cliente"]["id"] == agendamento.cliente.id
    assert resultado["servico"]["id"] == agendamento.servico.id

    resultado_inexistente = consultar_agendamento(
        uow=uow, 
        agendamento_id="id-inexistente"
    )
    assert resultado_inexistente is None or resultado_inexistente.get("id") is None

def test_listar_agendamentos_service(
    session_maker,
    mock_criar_usuario,
    mock_criar_servico,
    mock_criar_agendamento
):
    # Usar uma única UoW para todo o teste
    with UnidadeDeTrabalho(session_maker) as uow:
        # Criar e persistir os dados
        cliente1 = mock_criar_usuario(
            nome="Cliente 1",
            email="cliente1@test.com",
            tipo=TipoUsuario.CLIENTE
        )
        cliente2 = mock_criar_usuario(
            nome="Cliente 2",
            email="cliente2@test.com",
            tipo=TipoUsuario.CLIENTE
        )
        servico1 = mock_criar_servico(nome="Serviço 1")
        servico2 = mock_criar_servico(nome="Serviço 2")

        # Criar e persistir agendamentos
        agendamento1 = mock_criar_agendamento(
            cliente=cliente1,
            servico=servico1,
            data=datetime.now() + timedelta(days=1)
        )
        agendamento2 = mock_criar_agendamento(
            cliente=cliente2,
            servico=servico2,
            data=datetime.now() + timedelta(days=2)
        )
        agendamento3 = mock_criar_agendamento(
            cliente=cliente1,
            servico=servico2,
            data=datetime.now() + timedelta(days=3),
            status=StatusAgendamento.CANCELADO
        )

        # No need for uow.commit() here as mock_criar_agendamento already commits internally.
        # If you were to add all agendamentos to the session and commit once at the end,
        # then uow.commit() would be necessary here.

        # Debug: verificar dados persistidos
        print("\n=== AGENDAMENTOS PERSISTIDOS ===")
        # Refresh the session to ensure all committed data is visible
        uow.session.expire_all() # This is crucial to clear the session's state and force a reload
        agendamentos = uow.session.query(Agendamento).all()
        for a in agendamentos:
            print(f"ID: {a.id}, Cliente: {a.cliente_id}, Status: {a.status}")

        # Listar todos (usando a mesma UoW)
        todos = listar_agendamentos(uow=uow)
        print("\n=== TODOS AGENDAMENTOS ===")
        for a in todos:
            print(a)

        assert len(todos) >= 3
        
        # Testar filtros
        por_cliente = listar_agendamentos(uow=uow, cliente_id=cliente1.id)
        assert len(por_cliente) >= 2
        
        cancelados = listar_agendamentos(uow=uow, status=StatusAgendamento.CANCELADO.value)
        assert len(cancelados) >= 1