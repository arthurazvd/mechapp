from src.service.unit_of_work import UnidadeDeTrabalho
from src.service import (
    criar_oficina,
    alterar_oficina,
    remover_oficina,
    consultar_oficina,
    listar_oficinas,
)
from src.domain.exceptions import (
    CNPJInvalido, 
    OficinaNaoEncontrada,
    UsuarioNaoEncontrado,
    UsuarioInvalido,
)
from tests.mocks import (
    TipoUsuario,
    oficina_base, 
    usuario_base,
    mock_criar_oficina, 
    mock_criar_usuario
)
import pytest

def test_criar_oficina_service(
    session_maker,
    oficina_base,
    mock_criar_usuario,
):
    uow = UnidadeDeTrabalho(session_maker)
    
    # Oficina base para teste
    proprietario = mock_criar_usuario(tipo=TipoUsuario.MECANICO, email="mecanico@gmail.com")
    oficina = oficina_base(proprietario=proprietario)
    
    # Criando oficina com sucesso
    oficina_id = criar_oficina(
        uow=uow,
        nome=oficina.nome,
        endereco=oficina.endereco,
        cnpj=oficina.cnpj,
        proprietario_id=proprietario.id,
    )

    # Verificando se oficina foi criada
    with uow:
        oficina_encontrada = uow.oficinas.consultar(oficina_id)
        assert oficina_encontrada is not None
        assert oficina_encontrada.nome == oficina.nome
        assert oficina_encontrada.cnpj == oficina.cnpj

    # CNPJInvalido: O CNPJ informado é inválido.
    with pytest.raises(CNPJInvalido):
        criar_oficina(
            uow=uow,
            nome="nome-qualquer",
            endereco="endereco-qualquer",
            cnpj="123456789",
            proprietario_id="proprietario-qualquer"
        )

    # UsuarioNaoEncontrado: O proprietário informado não foi encontrado.
    with pytest.raises(UsuarioNaoEncontrado):
        criar_oficina(
            uow=uow,
            nome="nome-qualquer",
            endereco="endereco-qualquer",
            cnpj="61360928000171",
            proprietario_id='proprietario-inexistente',
        )

    # UsuarioInvalido: O proprietário informado não é um mecânico.
    usuario = mock_criar_usuario(tipo=TipoUsuario.CLIENTE)
    with pytest.raises(UsuarioInvalido):
        criar_oficina(
            uow=uow,
            nome="nome-qualquer",
            endereco="endereco-qualquer",
            cnpj="61360928000171",
            proprietario_id=usuario.id,
        )

def test_alterar_oficina_service(
    session_maker, 
    mock_criar_oficina,
    mock_criar_usuario,
):
    uow = UnidadeDeTrabalho(session_maker)
    
    # Oficina base para teste
    oficina = mock_criar_oficina()
    
    # Alterando oficina com sucesso
    alterar_oficina(
        uow=uow,
        oficina_id=oficina.id,
        novo_nome="Nova Oficina",
        novo_endereco="Novo Endereço",
        novo_cnpj="12.345.678/0001-90",
        novo_proprietario_id=oficina.proprietario.id,
    )

    # Verificando se oficina foi alterada
    with uow:
        oficina_alterada = uow.oficinas.consultar(oficina.id)
        assert oficina_alterada is not None
        assert oficina_alterada.nome == "Nova Oficina"
        assert oficina_alterada.endereco == "Novo Endereço"
        assert oficina_alterada.cnpj == "12.345.678/0001-90"
    
    # CNPJInvalido: O CNPJ informado é inválido.
    with pytest.raises(CNPJInvalido):
        alterar_oficina(
            uow=uow,
            oficina_id=oficina.id,
            novo_nome="Nome Inexistente",
            novo_endereco="Endereço Inexistente",
            novo_cnpj="123456789",
        )

    # OficinaNaoEncontrada: Oficina não encontrada.
    with pytest.raises(OficinaNaoEncontrada):
        alterar_oficina(
            uow=uow,
            oficina_id='proprietario-inexistente',
            novo_nome="Nome Inexistente",
            novo_endereco="Endereço Inexistente",
        )

    # UsuarioNaoEncontrado: O proprietário informado não foi encontrado.
    with pytest.raises(UsuarioNaoEncontrado):
        alterar_oficina(
            uow=uow,
            oficina_id=oficina.id,
            novo_proprietario_id='proprietario-inexistente',
        )

    # UsuarioInvalido: O proprietário informado não é um mecânico.
    usuario = mock_criar_usuario()
    with pytest.raises(UsuarioInvalido):
        alterar_oficina(
            uow=uow,
            oficina_id=oficina.id,
            novo_proprietario_id=usuario.id,
        )

def test_remover_oficina_service(session_maker, mock_criar_oficina):
    uow = UnidadeDeTrabalho(session_maker)

    # Oficina base para teste
    oficina = mock_criar_oficina()

    # Removendo oficina com sucesso
    remover_oficina(
        uow=uow,
        oficina_id=oficina.id,
    )

    # Verificando se oficina foi removida
    with uow:
        oficina_encontrada = uow.oficinas.consultar(oficina.id)
        assert oficina_encontrada is None

    # OficinaNaoEncontrada: Oficina não encontrada.
    with pytest.raises(OficinaNaoEncontrada):
        remover_oficina(
            uow=uow,
            oficina_id='oficina-inexistente',
        )

def test_consultar_oficina_service(session_maker, mock_criar_oficina):
    uow = UnidadeDeTrabalho(session_maker)

    # Oficina base para teste
    oficina = mock_criar_oficina()

    # Consultar oficina existente
    oficina_encontrada = consultar_oficina(
        uow=uow,
        oficina_id=oficina.id,
    )

    assert oficina_encontrada.get("nome") == oficina.nome
    assert oficina_encontrada.get("endereco") == oficina.endereco
    assert oficina_encontrada.get("cnpj") == oficina.cnpj
    assert oficina_encontrada.get("proprietario") == oficina.proprietario.to_dict()

    # Consultar oficina não-existente
    oficina_inexistente = consultar_oficina(
        uow=uow,
        oficina_id="id-inexistente",
    )

    assert oficina_inexistente.get("nome") == None
    assert oficina_inexistente.get("endereco") == None
    assert oficina_inexistente.get("cnpj") == None
    assert oficina_inexistente.get("proprietario_id") == None

def test_listar_oficinas_service(
    session_maker, 
    mock_criar_oficina,
    mock_criar_usuario,
):
    uow = UnidadeDeTrabalho(session_maker)

    # Oficinas base para teste
    proprietario = mock_criar_usuario(tipo=TipoUsuario.MECANICO, email="mecanico@gmail.com")
    oficina1 = mock_criar_oficina(nome="Oficina 01", proprietario=proprietario)
    oficina2 = mock_criar_oficina(nome="Oficina 02", proprietario=proprietario)
    oficina3 = mock_criar_oficina(nome="Oficina 03", proprietario=proprietario)

    # Listando oficinas
    oficinas_encontradas = listar_oficinas(uow=uow)

    assert oficina1.to_dict() in oficinas_encontradas
    assert oficina2.to_dict() in oficinas_encontradas
    assert oficina3.to_dict() in oficinas_encontradas 
