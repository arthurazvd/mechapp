import pytest
from datetime import datetime, timedelta
from src.service.unit_of_work import UnidadeDeTrabalho
from src.service import (
    criar_avaliacao,
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
from src.domain.models import StatusAgendamento, TipoUsuario
from tests.mocks import (
    mock_criar_avaliacao,
    mock_criar_usuario,
    mock_criar_servico,
    mock_criar_oficina,
)


def test_alterar_avaliacao_service(
    session_maker,
    mock_criar_avaliacao,
    mock_criar_usuario,
    mock_criar_servico,
    mock_criar_oficina,
):
    uow = UnidadeDeTrabalho(session_maker)
    
    # Sucesso: Alterar avaliação existente
    avaliacao_existente = mock_criar_avaliacao()
    criar_avaliacao(
        uow=uow,
        nota=avaliacao_existente.nota,
        cliente_id=avaliacao_existente.cliente.id,
        servico_id=avaliacao_existente.servico.id,
        comentario=avaliacao_existente.comentario,
        data=avaliacao_existente.data
    )

    novo_cliente = mock_criar_usuario(email="novo_cliente_aval@test.com", tipo=TipoUsuario.CLIENTE)
    novo_servico = mock_criar_servico(nome="Novo Serviço para Avaliação")

    alterar_avaliacao(
        uow=uow,
        avaliacao_id=avaliacao_existente.id,
        nova_nota=4,
        novo_comentario="Serviço bom, mas pode melhorar.",
        nova_data=datetime.now() + timedelta(days=1),
        novo_cliente_id=novo_cliente.id,
        novo_servico_id=novo_servico.id,
    )

    with uow:
        avaliacao_alterada = uow.avaliacoes.consultar(avaliacao_existente.id)
        assert avaliacao_alterada is not None
        assert avaliacao_alterada.nota == 4
        assert avaliacao_alterada.comentario == "Serviço bom, mas pode melhorar."
        assert avaliacao_alterada.data.date() == (datetime.now() + timedelta(days=1)).date()
        assert avaliacao_alterada.cliente.id == novo_cliente.id
        assert avaliacao_alterada.servico.id == novo_servico.id

    with pytest.raises(AvaliacaoNaoEncontrada):
        alterar_avaliacao(
            uow=uow,
            avaliacao_id="id-inexistente",
            nova_nota=3,
        )

    with pytest.raises(AvaliacaoInvalida, match="A nota da avaliação deve estar entre 1 e 5."):
        alterar_avaliacao(
            uow=uow,
            avaliacao_id=avaliacao_existente.id,
            nova_nota=0,
        )
    
    with pytest.raises(AvaliacaoInvalida, match="A nota da avaliação deve estar entre 1 e 5."):
        alterar_avaliacao(
            uow=uow,
            avaliacao_id=avaliacao_existente.id,
            nova_nota=6,
        )

    with pytest.raises(UsuarioNaoEncontrado):
        alterar_avaliacao(
            uow=uow,
            avaliacao_id=avaliacao_existente.id,
            novo_cliente_id="cliente-nao-existe",
        )
    
    with pytest.raises(ServicoNaoEncontrado):
        alterar_avaliacao(
            uow=uow,
            avaliacao_id=avaliacao_existente.id,
            novo_servico_id="servico-nao-existe",
        )


def test_remover_avaliacao_service(
    session_maker,
    mock_criar_avaliacao,
    mock_criar_oficina,
):
    uow = UnidadeDeTrabalho(session_maker)

    # Sucesso: Remover avaliação existente
    avaliacao_para_remover = mock_criar_avaliacao()
    criar_avaliacao(
        uow=uow,
        nota=avaliacao_para_remover.nota,
        cliente_id=avaliacao_para_remover.cliente.id,
        servico_id=avaliacao_para_remover.servico.id,
        comentario=avaliacao_para_remover.comentario,
        data=avaliacao_para_remover.data
    )

    remover_avaliacao(uow=uow, avaliacao_id=avaliacao_para_remover.id)

    with uow:
        avaliacao_removida = uow.avaliacoes.consultar(avaliacao_para_remover.id)
        assert avaliacao_removida is None

    # Falha: Avaliação não encontrada
    with pytest.raises(AvaliacaoNaoEncontrada):
        remover_avaliacao(uow=uow, avaliacao_id="id-inexistente")


def test_consultar_avaliacao_service(
    session_maker,
    mock_criar_avaliacao,
    mock_criar_oficina,
):
    uow = UnidadeDeTrabalho(session_maker)

    # Sucesso: Consultar avaliação existente
    avaliacao_existente = mock_criar_avaliacao()
    criar_avaliacao(
        uow=uow,
        nota=avaliacao_existente.nota,
        cliente_id=avaliacao_existente.cliente.id,
        servico_id=avaliacao_existente.servico.id,
        comentario=avaliacao_existente.comentario,
        data=avaliacao_existente.data
    )

    avaliacao_encontrada = consultar_avaliacao(uow=uow, avaliacao_id=avaliacao_existente.id)

    assert avaliacao_encontrada is not None
    assert avaliacao_encontrada["id"] == avaliacao_existente.id
    assert avaliacao_encontrada["nota"] == avaliacao_existente.nota
    assert avaliacao_encontrada["comentario"] == avaliacao_existente.comentario
    assert avaliacao_encontrada["data"].date() == avaliacao_existente.data.date()
    assert avaliacao_encontrada["cliente"]["id"] == avaliacao_existente.cliente.id
    assert avaliacao_encontrada["servico"]["id"] == avaliacao_existente.servico.id

    # Falha: Consultar avaliação não existente
    avaliacao_inexistente = consultar_avaliacao(uow=uow, avaliacao_id="id-nao-existe")
    assert avaliacao_inexistente is None
