from src.service.unit_of_work import AbstractUnidadeDeTrabalho
from src.service import (
    criar_servico,
    alterar_servico,
    remover_servico,
    consultar_servico,
)
from src.domain.exceptions import (
    ServicoInvalido,
    ServicoNaoEncontrado,
)
from tests.mocks import servico_base, mock_criar_servico
import pytest

def criar_servico_service(session_maker, servico_base):
    uow = AbstractUnidadeDeTrabalho(session_maker)
    
    # Serviço base para teste
    servico = servico_base()
    
    # Criando serviço com sucesso
    criar_servico(
        uow=uow,
        nome=servico.nome,
        descricao=servico.descricao,
        preco_min=servico.preco,
        preco_max=servico.preco,
        oficina_id=servico.oficina_id,
    )

    # Verificando se serviço foi criado
    with uow:
        servico_encontrado = uow.servicos.consultar_por_nome(servico.nome)
        assert servico_encontrado is not None
        assert servico_encontrado.nome == servico.nome
        assert servico_encontrado.preco_min == servico.preco_min
        assert servico_encontrado.preco_max == servico.preco_max
        assert servico_encontrado.descricao == servico.descricao
        assert servico_encontrado.oficina_id == servico.oficina_id

    # ServicoInvalido: Dados de serviço inválidos.
    with pytest.raises(ServicoInvalido):
        criar_servico(
            uow=uow,
            nome=None,
            descricao=None,
            preco_min=None,
            preco_max=None,
            oficina_id=None,
        )

    with pytest.raises(ServicoNaoEncontrado):
        criar_servico(
            uow=uow,
            nome=servico.nome,
            descricao=servico.descricao,
            preco_min=servico.preco,
            preco_max=servico.preco,
            oficina_id=9999,  # ID inválido
        )

def alterar_servico_service(session_maker, servico_base):
    uow = AbstractUnidadeDeTrabalho(session_maker)
    
    # Serviço base para teste
    servico = servico_base()
    
    # Alterando serviço com sucesso
    alterar_servico(
        uow=uow,
        nome="Novo Nome",
        descricao="Nova Descrição",
        preco_min=56,
        preco_max=100,
    )

    # Verificando se serviço foi alterado
    with uow:
        servico_alterado = uow.servicos.consultar_por_id(servico.id)
        assert servico_alterado is not None
        assert servico_alterado.nome == "Novo Nome"
        assert servico_alterado.preco_min == 56
        assert servico_alterado.preco_max == 10

    # ServicoNaoEncontrado: Serviço não encontrado.
    with pytest.raises(ServicoNaoEncontrado):
        alterar_servico(
            uow=uow,
            servico_id=9999,  # ID inválido
            nome="Nome Inexistente",
            preco_min=10.0,
            preco_max=100.0,
            descricao="Descrição Inexistente",
        )

def remover_servico_service(session_maker, mock_criar_servico):
    uow = AbstractUnidadeDeTrabalho(session_maker)

    # Serviço base para teste
    servico = mock_criar_servico()

    # Removendo serviço com sucesso
    remover_servico(
        uow=uow,
        servico_id=servico.id,
    )

    # Verificando se serviço foi removido
    with uow:
        servico_encontrado = uow.servicos.consultar_por_id(servico.id)
        assert servico_encontrado is None

    # ServicoNaoEncontrado: Serviço não encontrado.
    with pytest.raises(ServicoNaoEncontrado):
        remover_servico(
            uow=uow,
            servico_id=9999,  # ID inválido
        )

def consultar_servico_service(session_maker, mock_criar_servico):
    uow = AbstractUnidadeDeTrabalho(session_maker)

    # Serviço base para teste
    servico = mock_criar_servico()

    # Consultar serviço existente
    servico_encontrado = consultar_servico(
        uow=uow,
        servico_id=servico.id,
    )

    assert servico_encontrado.get("nome") == servico.nome
    assert servico_encontrado.get("descricao") == servico.descricao
    assert servico_encontrado.get("preco_min") == servico.preco_min
    assert servico_encontrado.get("preco_max") == servico.preco_max