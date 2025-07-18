from src.service.unit_of_work import UnidadeDeTrabalho
from src.service.services.servico_services import (
    criar_servico,
    alterar_servico,
    remover_servico,
    consultar_servico,
)
from src.domain.exceptions import (
    ServicoInvalido,
    ServicoNaoEncontrado,
    OficinaNaoEncontrada,
)
from tests.mocks import (
    TipoUsuario,
    mock_criar_oficina,
    mock_criar_servico,
    mock_criar_usuario,
)
import pytest

def test_criar_servico_service(
    session_maker,
    mock_criar_usuario,
    mock_criar_oficina,
):
    uow = UnidadeDeTrabalho(session_maker)

    proprietario = mock_criar_usuario(tipo=TipoUsuario.MECANICO)
    oficina = mock_criar_oficina(proprietario=proprietario)

    # Criando serviço com sucesso
    servico_id = criar_servico(
        uow=uow,
        nome="Troca de Óleo",
        descricao="Troca de óleo completa",
        tempo=30,
        preco_min=50.0,
        preco_max=80.0,
        oficina_id=oficina.id,
    )

    # Verificando se serviço foi criado
    with uow:
        servico = uow.servicos.consultar(servico_id)
        assert servico is not None
        assert servico.nome == "Troca de Óleo"
        assert servico.descricao == "Troca de óleo completa"
        assert servico.tempo == 30
        assert servico.preco_min == 50.0
        assert servico.preco_max == 80.0
        assert servico.oficina.id == oficina.id

    # ServicoInvalido: Nome não pode ser vazio
    with pytest.raises(ServicoInvalido):
        criar_servico(
            uow=uow,
            nome="",
            descricao="Serviço inválido",
            tempo=30,
            preco_min=50.0,
            preco_max=80.0,
            oficina_id=oficina.id,
        )

    # ServicoInvalido: Descrição não pode ser vazia
    with pytest.raises(ServicoInvalido):
        criar_servico(
            uow=uow,
            nome="Serviço Válido",
            descricao="",
            tempo=30,
            preco_min=50.0,
            preco_max=80.0,
            oficina_id=oficina.id,
        )

    # ServicoInvalido: Preço mínimo não pode ser negativo
    with pytest.raises(ServicoInvalido):
        criar_servico(
            uow=uow,
            nome="Serviço Válido",
            descricao="Descrição válida",
            tempo=30,
            preco_min=-10.0,
            preco_max=80.0,
            oficina_id=oficina.id,
        )

    # ServicoInvalido: Preço máximo não pode ser negativo
    with pytest.raises(ServicoInvalido):
        criar_servico(
            uow=uow,
            nome="Serviço Válido",
            descricao="Descrição válida",
            tempo=30,
            preco_min=50.0,
            preco_max=-10.0,
            oficina_id=oficina.id,
        )

    # OficinaNaoEncontrada: Oficina não existe
    with pytest.raises(OficinaNaoEncontrada):
        criar_servico(
            uow=uow,
            nome="Serviço Válido",
            descricao="Descrição válida",
            tempo=30,
            preco_min=50.0,
            preco_max=80.0,
            oficina_id="oficina_inexistente",
        )

def test_alterar_servico_service(
    session_maker,
    mock_criar_servico,
    mock_criar_oficina,
    mock_criar_usuario
):
    uow = UnidadeDeTrabalho(session_maker)

    # Criar e persistir proprietário (usuário)
    proprietario = mock_criar_usuario(
        nome="Mecanico",
        email="mecanico@email.com",
        tipo=TipoUsuario.MECANICO,
    )

    # Criar oficina com esse proprietário
    oficina = mock_criar_oficina(proprietario=proprietario)

    # Criar serviço usando a oficina criada acima
    servico = mock_criar_servico(oficina=oficina)

    # Alterando serviço com sucesso
    alterar_servico(
        uow=uow,
        servico_id=servico.id,
        novo_nome="Novo Nome do Serviço",
        nova_descricao="Nova descrição do serviço",
        novo_tempo=45,
        novo_preco_min=60.0,
        novo_preco_max=90.0,
    )

    with uow:
        servico_encontrado = uow.servicos.consultar(servico.id)
        assert servico_encontrado.nome == "Novo Nome do Serviço"
        assert servico_encontrado.descricao == "Nova descrição do serviço"
        assert servico_encontrado.tempo == 45
        assert float(servico_encontrado.preco_min) == 60.0
        assert float(servico_encontrado.preco_max) == 90.0

    # Alteração parcial
    alterar_servico(
        uow=uow,
        servico_id=servico.id,
        novo_nome="Nome Alterado Novamente",
    )

    with uow:
        servico_encontrado = uow.servicos.consultar(servico.id)
        assert servico_encontrado.nome == "Nome Alterado Novamente"
        assert servico_encontrado.descricao == "Nova descrição do serviço"

    # Serviço inexistente
    with pytest.raises(ServicoNaoEncontrado):
        alterar_servico(
            uow=uow,
            servico_id="servico_inexistente",
            novo_nome="Qualquer",
        )


def test_remover_servico_service(
    session_maker,
    mock_criar_servico
):
    uow = UnidadeDeTrabalho(session_maker)

    # Serviço base para teste
    servico = mock_criar_servico()

    # Removendo serviço com sucesso
    remover_servico(
        uow=uow,
        servico_id=servico.id,
    )

    # Verificando se serviço foi removido
    with uow:
        servico_encontrado = uow.servicos.consultar(servico.id)
        assert servico_encontrado is None

    # ServicoNaoEncontrado: Serviço não existe
    with pytest.raises(ServicoNaoEncontrado):
        remover_servico(
            uow=uow,
            servico_id="servico_inexistente",
        )

def test_consultar_servico_service(session_maker, mock_criar_servico):
    uow = UnidadeDeTrabalho(session_maker)

    # Serviço base para teste
    servico = mock_criar_servico()

    # Consultar serviço existente
    servico_encontrado = consultar_servico(
        uow=uow,
        servico_id=servico.id,
    )

    assert servico_encontrado.get("nome") == servico.nome
    assert servico_encontrado.get("descricao") == servico.descricao
    assert servico_encontrado.get("tempo") == servico.tempo
    assert float(servico_encontrado.get("preco_min")) == float(servico.preco_min)
    assert float(servico_encontrado.get("preco_max")) == float(servico.preco_max)
    assert servico_encontrado.get("oficina") == servico.oficina.to_dict()