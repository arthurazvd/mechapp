from src.service.unit_of_work import UnidadeDeTrabalho
from src.service import (
    criar_peca,
    alterar_peca,
    remover_peca,
    consultar_peca,
    listar_pecas,
)
from src.domain.exceptions import (
    PecaInvalida,
    PecaNaoEncontrada,
)
from tests.mocks import (
    TipoUsuario,
    mock_criar_peca,
    mock_criar_usuario,
)
import pytest

def test_criar_peca_service(
    session_maker,
    mock_criar_usuario
):
    uow = UnidadeDeTrabalho(session_maker)

    proprietario = mock_criar_usuario(tipo=TipoUsuario.MECANICO, email="mecanico@gmail.com")

    peca_id = criar_peca(
        uow=uow,
        nome="Peça Teste",
        descricao="Descrição da peça",
        quantidade=5,
        preco=100.0,
    )

    with uow:
        peca_encontrada = uow.pecas.consultar(peca_id)
        assert peca_encontrada is not None
        assert peca_encontrada.nome == "Peça Teste"
        assert peca_encontrada.descricao == "Descrição da peça"
        assert peca_encontrada.quantidade == 5
        assert peca_encontrada.preco == 100.0

    with pytest.raises(PecaInvalida):
        criar_peca(
            uow=uow,
            nome="Peça Teste",
            descricao="Descrição da peça",
            quantidade=-5,
            preco=100.0,
        )

def test_alterar_peca_service(
    session_maker,
    mock_criar_peca
):
    uow = UnidadeDeTrabalho(session_maker)

    peca = mock_criar_peca()

    alterar_peca(
        uow=uow,
        peca_id=peca.id,
        novo_nome="Peça Alterada",
        nova_descricao="Descrição da peça alterada",
        nova_quantidade=10,
        novo_preco=200.0,
    )

    with uow:
        peca_encontrada = uow.pecas.consultar(peca.id)
        assert peca_encontrada is not None
        assert peca_encontrada.nome == "Peça Alterada"
        assert peca_encontrada.descricao == "Descrição da peça alterada"
        assert peca_encontrada.quantidade == 10
        assert peca_encontrada.preco == 200.0

    with pytest.raises(PecaInvalida):
        alterar_peca(
            uow=uow,
            peca_id=peca.id,
            novo_nome="Peça Alterada",
            nova_descricao="Descrição da peça alterada",
            nova_quantidade=-10,
            novo_preco=200.0,
        )

    with pytest.raises(PecaNaoEncontrada):
        alterar_peca(
            uow=uow,
            peca_id="peca_inexistente",
            novo_nome="Peça Alterada",
            nova_descricao="Descrição da peça alterada",
            nova_quantidade=10,
            novo_preco=200.0,
        )

def test_remover_peca_service(
    session_maker,
    mock_criar_peca
):
    uow = UnidadeDeTrabalho(session_maker)

    peca = mock_criar_peca()

    remover_peca(uow=uow, peca_id=peca.id)

    with uow:
        peca_encontrada = uow.pecas.consultar(peca.id)
        assert peca_encontrada is None

    with pytest.raises(PecaNaoEncontrada):
        remover_peca(uow=uow, peca_id="peca_inexistente")

def test_consultar_peca_service(
    session_maker,
    mock_criar_peca
):
    uow = UnidadeDeTrabalho(session_maker)

    peca = mock_criar_peca()

    peca_encontrada = consultar_peca(uow=uow, peca_id=peca.id)

    assert peca_encontrada.get("nome") == peca.nome
    assert float(peca_encontrada.get("preco")) == pytest.approx(float(peca.preco))
    assert peca_encontrada.get("descricao") == peca.descricao
    assert peca_encontrada.get("quantidade") == peca.quantidade

    peca_inexistente = consultar_peca(uow=uow, peca_id="peca_inexistente")

    assert peca_inexistente.get("nome") is None
    assert peca_inexistente.get("preco") is None
    assert peca_inexistente.get("descricao") is None
    assert peca_inexistente.get("quantidade") is None

def test_listar_peca_service(
    session_maker,
    mock_criar_peca
):
    uow = UnidadeDeTrabalho(session_maker)

    peca1 = mock_criar_peca(nome="Peça 01")
    peca2 = mock_criar_peca(nome="Peça 02")
    peca3 = mock_criar_peca(nome="Peça 03")

    pecas_encontradas = listar_pecas(uow=uow)

    ids_pecas_encontradas = {p["id"] for p in pecas_encontradas}
    assert peca1.id in ids_pecas_encontradas
    assert peca2.id in ids_pecas_encontradas
    assert peca3.id in ids_pecas_encontradas
