from src.service.unit_of_work import UnidadeDeTrabalho
from src.service.services.oficina_services import (
    criar_oficina,
    alterar_oficina,
    remover_oficina,
    consultar_oficina,
)
from src.domain.exceptions import (
    OficinaInvalida,
    OficinaNaoEncontrada,
)
from tests.mocks import oficina_base, mock_criar_oficina
import pytest

def test_criar_oficina_service(session_maker, oficina_base):
    uow = UnidadeDeTrabalho(session_maker)
    
    # Oficina base para teste
    oficina = oficina_base()
    
    # Criando oficina com sucesso
    criar_oficina(
        uow=uow,
        nome=oficina.nome,
        endereco=oficina.endereco,
        cnpj=oficina.cnpj,
        proprietario_id=oficina.proprietario_id,
    )

    # Verificando se oficina foi criada
    with uow:
        oficina_encontrada = uow.oficinas.consultar_por_nome(oficina.nome)
        assert oficina_encontrada is not None
        assert oficina_encontrada.nome == oficina.nome

    # OficinaInvalida: Dados de oficina inválidos.
    with pytest.raises(OficinaInvalida):
        criar_oficina(
            uow=uow,
            nome=None,
            endereco=None,
            cnpj=None,
            proprietario_id=None,
        )

    with pytest.raises(OficinaNaoEncontrada):
        criar_oficina(
            uow=uow,
            nome=oficina.nome,
            endereco=oficina.endereco,
            cnpj=oficina.cnpj,
            proprietario_id=9999,  # ID inválido
        )

def test_alterar_oficina_service(session_maker, oficina_base):
    uow = UnidadeDeTrabalho(session_maker)
    
    # Oficina base para teste
    oficina = oficina_base()
    
    # Alterando oficina com sucesso
    alterar_oficina(
        uow=uow,
        id=oficina.id,
        nome="Nova Oficina",
        endereco="Novo Endereço",
        novo_proprietario_id=oficina.proprietario_id,
    )

    # Verificando se oficina foi alterada
    with uow:
        oficina_alterada = uow.oficinas.consultar_por_id(oficina.id)
        assert oficina_alterada is not None
        assert oficina_alterada.nome == "Nova Oficina"
        assert oficina_alterada.endereco == "Novo Endereço"
        assert oficina_alterada.telefone == "987654321"
        assert oficina_alterada.email == "nova@oficina.com"
        assert oficina_alterada.cnpj == "12.345.678/0001-90"
        assert oficina_alterada.proprietario_id == 1

    # OficinaNaoEncontrada: Oficina não encontrada.
    with pytest.raises(OficinaNaoEncontrada):
        alterar_oficina(
            uow=uow,
            id=9999,  # ID inválido
            nome="Nome Inexistente",
            endereco="Endereço Inexistente",
            novo_proprietario_id=oficina.proprietario_id,
        )


def test_remover_oficina_service(session_maker, mock_criar_oficina):
    uow = UnidadeDeTrabalho(session_maker)

    # Oficina base para teste
    oficina = mock_criar_oficina()

    # Removendo oficina com sucesso
    remover_oficina(
        uow=uow,
        id=oficina.id,
    )

    # Verificando se oficina foi removida
    with uow:
        oficina_encontrada = uow.oficinas.consultar_por_id(oficina.id)
        assert oficina_encontrada is None

    # OficinaNaoEncontrada: Oficina não encontrada.
    with pytest.raises(OficinaNaoEncontrada):
        remover_oficina(
            uow=uow,
            id=9999,  # ID inválido
        )

def test_consultar_oficina_service(session_maker, mock_criar_oficina):
    uow = UnidadeDeTrabalho(session_maker)

    # Oficina base para teste
    oficina = mock_criar_oficina()

    # Consultar oficina existente
    oficina_encontrada = consultar_oficina(
        uow=uow,
        id=oficina.id,
    )

    assert oficina_encontrada.get("nome") == oficina.nome
    assert oficina_encontrada.get("endereco") == oficina.endereco
    assert oficina_encontrada.get("cnpj") == oficina.cnpj
    assert oficina_encontrada.get("proprietario_id") == oficina.proprietario_id

    # Consultar oficina não-existente
    with pytest.raises(OficinaNaoEncontrada):
        consultar_oficina(
            uow=uow,
            id="id-inexistente",
        )