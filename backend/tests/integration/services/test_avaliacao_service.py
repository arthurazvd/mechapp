import pytest
from datetime import datetime, timedelta
from src.service.unit_of_work import UnidadeDeTrabalho
from src.service import (
    alterar_avaliacao,
    remover_avaliacao,
    consultar_avaliacao,
)
from src.domain.exceptions import (
    AvaliacaoInvalida,
    AvaliacaoNaoEncontrada,
    UsuarioNaoEncontrado,
    ServicoNaoEncontrado,
)
from src.domain.models import TipoUsuario
from tests.mocks import (
    mock_criar_avaliacao,
    mock_criar_usuario,
    mock_criar_servico,
)


def test_alterar_avaliacao_service(
    session_maker,
    mock_criar_avaliacao,
    mock_criar_usuario,
    mock_criar_servico,
):
    uow = UnidadeDeTrabalho(session_maker)

    avaliacao_existente = mock_criar_avaliacao()

    alterar_avaliacao(
        uow=uow,
        avaliacao_id=avaliacao_existente.id,
        cliente_id=avaliacao_existente.cliente.id,
        servico_id=avaliacao_existente.servico.id,
        nova_nota=4,
        novo_comentario="Serviço bom, mas pode melhorar.",
        nova_data=datetime.now() + timedelta(days=1),
    )

    with uow:
        avaliacao_alterada = uow.avaliacoes.consultar(avaliacao_existente.id)
        assert avaliacao_alterada.nota == 4
        assert avaliacao_alterada.comentario == "Serviço bom, mas pode melhorar."

    with pytest.raises(AvaliacaoNaoEncontrada):
        alterar_avaliacao(
            uow=uow, 
            avaliacao_id="id-inexistente", 
            cliente_id=avaliacao_existente.cliente.id,
            servico_id=avaliacao_existente.servico.id,
            nova_nota=3
        )

    with pytest.raises(AvaliacaoInvalida):
        alterar_avaliacao(
            uow=uow, 
            avaliacao_id=avaliacao_existente.id,
            cliente_id="cliente-nao-existe",
            servico_id=avaliacao_existente.servico.id,
            nova_nota=3
        )

    with pytest.raises(AvaliacaoInvalida):
        alterar_avaliacao(
            uow=uow, 
            avaliacao_id=avaliacao_existente.id,
            cliente_id=avaliacao_existente.cliente.id,
            servico_id="servico-nao-existe",
            nova_nota=3
        )


def test_remover_avaliacao_service(
    session_maker,
    mock_criar_avaliacao,
):
    uow = UnidadeDeTrabalho(session_maker)

    avaliacao_para_remover = mock_criar_avaliacao()

    remover_avaliacao(uow=uow, avaliacao_id=avaliacao_para_remover.id)

    with uow:
        assert uow.avaliacoes.consultar(avaliacao_para_remover.id) is None

    with pytest.raises(AvaliacaoNaoEncontrada):
        remover_avaliacao(uow=uow, avaliacao_id="id-inexistente")


def test_consultar_avaliacao_service(
    session_maker,
    mock_criar_avaliacao,
):
    uow = UnidadeDeTrabalho(session_maker)

    avaliacao_existente = mock_criar_avaliacao()

    resultado = consultar_avaliacao(uow=uow, avaliacao_id=avaliacao_existente.id)

    assert resultado is not None
    assert resultado["id"] == avaliacao_existente.id
    assert resultado["nota"] == avaliacao_existente.nota
    assert resultado["comentario"] == avaliacao_existente.comentario
    assert "cliente_id" in resultado  # Verifica se a chave existe
    assert "servico_id" in resultado  # Verifica se a chave existe
    assert resultado["cliente_id"] == avaliacao_existente.cliente.id
    assert resultado["servico_id"] == avaliacao_existente.servico.id

    with pytest.raises(AvaliacaoNaoEncontrada):
        consultar_avaliacao(uow=uow, avaliacao_id="id-nao-existe")