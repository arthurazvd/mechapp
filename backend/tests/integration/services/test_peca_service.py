from src.service.unit_of_work import UnidadeDeTrabalho
from src.service.services.peca_services import (
    criar_peca,
    alterar_peca,
    remover_peca,
    consultar_peca,
)
from src.domain.exceptions import (
    PecaInvalida,
    PecaNaoEncontrada,
)
from tests.mocks import peca_base, mock_criar_peca
import pytest

def test_criar_peca_service(session_maker, peca_base):
    uow = UnidadeDeTrabalho(session_maker)
    
    # Peca base para teste
    peca = peca_base()
    
    # Criando peça com sucesso
    identificador = criar_peca(
        uow=uow,
        nome=peca.nome,
        preco=peca.preco,
        descricao=peca.descricao,
        quantidade=peca.quantidade,
        imagem=peca.imagem,
    )

    # Verificando se peça foi criada
    with uow:
        peca_encontrada = uow.pecas.consultar(identificador)
        assert peca_encontrada is not None
        assert peca_encontrada.nome == peca.nome
        assert peca_encontrada.descricao == peca.descricao

    # PecaInvalida: Quantidade e preço devem ser maiores ou iguais a zero.
    with pytest.raises(PecaInvalida):
        criar_peca(
            uow=uow,
            nome="nome-qualquer",
            preco=-1,
            descricao="descrica-qualquer",
            quantidade=10,
        )

    # PecaInvalida: Quantidade e preço devem ser maiores ou iguais a zero.
    with pytest.raises(PecaInvalida):
        criar_peca(
            uow=uow,
            nome="nome-qualquer",
            preco=1,
            descricao="descrica-qualquer",
            quantidade=-1,
        )

def test_alterar_peca_service(session_maker, mock_criar_peca):
    uow = UnidadeDeTrabalho(session_maker)
    
    # Peca base para teste
    peca = mock_criar_peca()
    
    # Alterando peça com sucesso
    alterar_peca(
        uow=uow,
        peca_id=peca.id,
        novo_nome="Peca Alterada",
        novo_preco=150.0,
        nova_descricao="Descrição alterada",
        nova_quantidade=10,
    )

    # Verificando se peça foi alterada
    with uow:
        peca_alterada = uow.pecas.consultar(peca.id)
        assert peca_alterada is not None
        assert peca_alterada.nome == "Peca Alterada"
        assert peca_alterada.descricao == "Descrição alterada"

    # PecaNaoEncontrada: A peça não foi encontrada.
    with pytest.raises(PecaNaoEncontrada):
        alterar_peca(
            uow=uow,
            peca_id="id-inexistente",
            novo_nome="Peca Inexistente",
            novo_preco=200.0,
            nova_descricao="Descrição inexistente",
            nova_quantidade=5,
        )

    # PecaInvalida: Quantidade e preço devem ser maiores ou iguais a zero.
    with pytest.raises(PecaInvalida):
        alterar_peca(
            uow=uow,
            peca_id=peca.id,
            novo_nome="peça-inexistente",
            novo_preco=0,
            nova_descricao="decrição-inexistente",
            nova_quantidade=5,
        )

    # PecaInvalida: Quantidade e preço devem ser maiores ou iguais a zero.
    with pytest.raises(PecaInvalida):
        alterar_peca(
            uow=uow,
            peca_id=peca.id,
            novo_nome="peça-inexistente",
            novo_preco=5,
            nova_descricao="decrição-inexistente",
            nova_quantidade=-1,
        )

def test_remover_peca_service(session_maker, mock_criar_peca):
    uow = UnidadeDeTrabalho(session_maker)
    
    # Peca base para teste
    peca = mock_criar_peca()
    
    # Removendo peça com sucesso
    remover_peca(
        uow=uow,
        peca_id=peca.id,
    )

    # Verificando se peça foi removida
    with uow:
        peca_removida = uow.pecas.consultar(peca.id)
        assert peca_removida is None

    # PecaNaoEncontrada: A peça não foi encontrada.
    with pytest.raises(PecaNaoEncontrada):
        remover_peca(
            uow=uow,
            peca_id="id-inexistente",
        )

def test_consultar_peca_service(session_maker, mock_criar_peca):
    uow = UnidadeDeTrabalho(session_maker)
    
    # Peca base para teste
    peca = mock_criar_peca()

    # Consultando peça existente
    peca_encontrada = consultar_peca(
        uow=uow,
        peca_id=peca.id,
    )

    assert peca_encontrada.get("nome") == peca.nome
    assert peca_encontrada.get("descricao") == peca.descricao
    assert peca_encontrada.get("quantidade") == peca.quantidade

    # Consultando peça não existente
    peca_inexistente = consultar_peca(
        uow=uow,
        peca_id="id-inexistente",
    )

    assert peca_inexistente.get("nome") == None
    assert peca_inexistente.get("descricao") == None
    assert peca_inexistente.get("quantidade") == None