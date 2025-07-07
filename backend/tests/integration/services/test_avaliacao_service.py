from src.service.unit_of_work import AbstractUnidadeDeTrabalho
from src.service.services.avaliacao_services import (
    criar_avaliacao,
    alterar_avaliacao,
    remover_avaliacao,
    consultar_avaliacao,
)
from src.domain.exceptions import (
    AvaliacaoInvalida,
    AvaliacaoNaoEncontrada,
)
from tests.mocks import avaliacao_base, mock_criar_avaliacao
import pytest

def test_criar_avaliacao_service(session_maker, avaliacao_base):
    uow = AbstractUnidadeDeTrabalho(session_maker)
    
    # Avaliação base para teste
    avaliacao = avaliacao_base()
    
    # Criando avaliação com sucesso
    criar_avaliacao(
        uow=uow,
        nota=avaliacao.nota,
        cliente_id=avaliacao.cliente_id,
        servico_id=avaliacao.servico_id,
        comentario=avaliacao.comentario,
        data=avaliacao.data,
    )

    # Verificando se avaliação foi criada
    with uow:
        avaliacao_encontrada = uow.avaliacoes.consultar_por_id(avaliacao.id)
        assert avaliacao_encontrada is not None
        assert avaliacao_encontrada.nota == avaliacao.nota

    # AvaliacaoInvalida: Dados de avaliação invalidos.
    with pytest.raises(AvaliacaoInvalida):
        criar_avaliacao(
            uow=uow,
            nota=None,
            cliente_id=None,
            servico_id=None,
            comentario=None,
            data=None,
        )

    with pytest.raises(AvaliacaoNaoEncontrada):
        criar_avaliacao(
            uow=uow,
            nota=avaliacao.nota,
            cliente_id=avaliacao.cliente_id,
            servico_id=avaliacao.servico_id,
            comentario="comentario invalido",
            data="2023-01-01T00:00:00Z",  # Data inválida
        )

def test_alterar_avaliacao_service(session_maker, avaliacao_base):
    uow = AbstractUnidadeDeTrabalho(session_maker)
    
    # Avaliação base para teste
    avaliacao = avaliacao_base()
    
    # Alterando avaliação com sucesso
    alterar_avaliacao(
        uow=uow,
        avaliacao_id=avaliacao.id,
        cliente_id=avaliacao.cliente_id,
        servico_id=avaliacao.servico_id,
        nova_nota=5,
        novo_comentario="Novo comentario",
        nova_data=avaliacao.data,
    )

    # Verificando se avaliação foi alterada
    with uow:
        avaliacao_alterada = uow.avaliacoes.consultar_por_id(avaliacao.id)
        assert avaliacao_alterada is not None
        assert avaliacao_alterada.nota == 5
        assert avaliacao_alterada.comentario == "Novo comentario"

    # AvaliacaoNaoEncontrada: A avaliação não foi encontrada.
    with pytest.raises(AvaliacaoNaoEncontrada):
        alterar_avaliacao(
            uow=uow,
            avaliacao_id="id-inexistente",
            cliente_id=avaliacao.cliente_id,
            servico_id=avaliacao.servico_id,
            nova_nota=None,
            novo_comentario=None,
            nova_data=None,
        )

def test_remover_avaliacao_service(session_maker, mock_criar_avaliacao):
    uow = AbstractUnidadeDeTrabalho(session_maker)

    # Avaliação base para teste
    avaliacao = mock_criar_avaliacao()

    # Removendo avaliação com sucesso
    remover_avaliacao(
        uow=uow,
        avaliacao_id=avaliacao.id,
    )

    # Verificando se avaliação foi removida
    with uow:
        avaliacao_encontrada = uow.avaliacoes.consultar_por_id(avaliacao.id)
        assert avaliacao_encontrada is None

    # AvaliacaoNaoEncontrada: A avaliação não foi encontrada.
    with pytest.raises(AvaliacaoNaoEncontrada):
        remover_avaliacao(
            uow=uow,
            avaliacao_id="id-inexistente",
        )

def test_consultar_avaliacao_service(session_maker, mock_criar_avaliacao):
    uow = AbstractUnidadeDeTrabalho(session_maker)

    # Avaliação base para teste
    avaliacao = mock_criar_avaliacao()

    # Consultar avaliação existente
    avaliacao_encontrada = consultar_avaliacao(
        uow=uow,
        avaliacao_id=avaliacao.id,
    )

    assert avaliacao_encontrada.get("nota") == avaliacao.nota
    assert avaliacao_encontrada.get("comentario") == avaliacao.comentario
    assert avaliacao_encontrada.get("data") == avaliacao.data.isoformat()

    # Consultar avaliação não-existente
    with pytest.raises(AvaliacaoNaoEncontrada):
        consultar_avaliacao(
            uow=uow,
            avaliacao_id="id-inexistente",
        )