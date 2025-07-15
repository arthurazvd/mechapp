from src.service.unit_of_work import UnidadeDeTrabalho
from src.service import (
    criar_usuario,
    alterar_usuario,
    remover_usuario,
    consultar_usuario,
    autenticar,
)
from src.domain.exceptions import (
    EmailInvalido,
    TipoInvalido,
    EmailExistente,
    UsuarioNaoEncontrado,
)
from tests.mocks import usuario_base, mock_criar_usuario
import pytest

def test_criar_usuario_service(session_maker, usuario_base):
    uow = UnidadeDeTrabalho(session_maker)
    
    # Usuário base para teste
    senha = "123456789"
    usuario = usuario_base(senha=senha)
    
    # Criando usuário com sucesso!
    criar_usuario(
        uow=uow,
        nome=usuario.nome,
        email=usuario.email,
        senha=senha,
        tipo=str(usuario.tipo),
        telefone=usuario.telefone,
    )

    # Verificando se usuário foi criado
    with uow:
        usuario_encontrado = uow.usuarios.consultar_por_email(usuario.email)
        assert usuario_encontrado is not None
        assert usuario_encontrado.nome == usuario.nome
        assert usuario_encontrado.senha == str(hash(senha))

    # EmailInvalido: O email informado não é válido.
    with pytest.raises(EmailInvalido):
        criar_usuario(
            uow=uow,
            nome="nome-qualquer",
            email="email-invalido",
            senha="senha-qualquer",
            tipo="CLIENTE",
            telefone=None,
        )

    # TipoInvalido: O tipo de usuário está inválido, insira CLIENTE Ou MECANICO.
    with pytest.raises(TipoInvalido):
        criar_usuario(
            uow=uow,
            nome="nome-qualquer",
            email="email@qualquer.com",
            senha="senha-qualquer",
            tipo="dono_do_servidor",
            telefone=None,
        )

    # EmailExistente: O e-mail inserido já está sendo utilizado por outro usuário.
    with pytest.raises(EmailExistente):
        criar_usuario(
            uow=uow,
            nome="nome-qualquer",
            email=usuario.email,
            senha="senha-qualquer",
            tipo="CLIENTE",
            telefone=None,
        )

def test_alterar_usuario_service(session_maker, mock_criar_usuario):
    uow = UnidadeDeTrabalho(session_maker)

    # Usuário base para teste
    usuario = mock_criar_usuario()

    # Alterando usuário com sucesso!
    alterar_usuario(
        uow=uow,
        usuario_id=usuario.id,
        novo_nome="Novo Nome",
        novo_email="novo@email.com",
        nova_senha="123456789",
        novo_tipo="MECANICO",
        novo_telefone="00912345678"
    )

    # Verificando se usuário foi alterado
    with uow:
        usuario_encontrado = uow.usuarios.consultar_por_email("novo@email.com")
        assert usuario_encontrado is not None
        assert usuario_encontrado.nome == "Novo Nome"
        assert usuario_encontrado.senha == str(hash("123456789"))

    # EmailInvalido: O Email informado não é válido.
    with pytest.raises(EmailInvalido):
        alterar_usuario(
            uow=uow,
            usuario_id=usuario.id,
            novo_nome="Novo Nome",
            novo_email="email-invalido",
            nova_senha="123456789",
            novo_tipo="MECANICO",
            novo_telefone="00912345678"
        )
    
    # TipoInvalido: O tipo de usuário está inválido, insira CLIENTE Ou MECANICO.
    with pytest.raises(TipoInvalido):
        alterar_usuario(
            uow=uow,
            usuario_id=usuario.id,
            novo_nome="Novo Nome",
            novo_email="novo@email.com",
            nova_senha="123456789",
            novo_tipo="outro",
            novo_telefone="00912345678"
        )

    # EmailExistente: O e-mail inserido já está sendo utilizado por outro usuário.
    usuario2 = mock_criar_usuario(email="email-nao@repetido.com")
    with pytest.raises(EmailExistente):
        alterar_usuario(
            uow=uow,
            usuario_id=usuario.id,
            novo_nome="Novo Nome",
            novo_email=usuario2.email,
            nova_senha="123456789",
            novo_tipo="MECANICO",
            novo_telefone="00912345678"
        )

    # UsuarioNaoEncontrado: O usuário informado não foi encontrado.
    with pytest.raises(UsuarioNaoEncontrado):
        alterar_usuario(
            uow=uow,
            usuario_id="123456789",
            novo_nome="Novo Nome",
            novo_email="email-alterado@email.com",
            nova_senha="123456789",
            novo_tipo="MECANICO",
            novo_telefone="00912345678"
        )

def test_remover_usuario_service(session_maker, mock_criar_usuario):
    uow = UnidadeDeTrabalho(session_maker)

    # Usuário base para teste
    usuario = mock_criar_usuario()

    # Removendo usuário com sucesso!
    remover_usuario(
        uow=uow,
        usuario_id=usuario.id,
    )

    # Verificando se usuário foi alterado
    with uow:
        usuario_encontrado = uow.usuarios.consultar_por_email(usuario.email)
        assert usuario_encontrado is None
    
    # UsuarioNaoEncontrado: O usuário informado não foi encontrado.
    with pytest.raises(UsuarioNaoEncontrado):
        remover_usuario(
            uow=uow,
            usuario_id="123456789",
        )

def test_consultar_usuario_service(session_maker, mock_criar_usuario):
    uow = UnidadeDeTrabalho(session_maker)

    # Usuário base para teste
    usuario = mock_criar_usuario()

    # Consultar usuário existente
    usuario_encontrado = consultar_usuario(
        uow=uow,
        usuario_id=usuario.id,
    )

    assert usuario_encontrado.get("nome") == usuario.nome
    assert usuario_encontrado.get("email") == usuario.email
    assert usuario_encontrado.get("senha") == usuario.senha

    # Consultar usuário não-existente
    usuario_inexistente = consultar_usuario(
        uow=uow,
        usuario_id="123456789"
    )

    assert usuario_inexistente.get("nome") is None
    assert usuario_inexistente.get("email") is None
    assert usuario_inexistente.get("senha") is None

def test_autenticar_service(session_maker, mock_criar_usuario):
    uow = UnidadeDeTrabalho(session_maker)

    # Usuário base para teste
    senha = "1234"
    usuario = mock_criar_usuario(senha=senha)

    # Autenticar usuário com sucesso!
    usuario_autenticado = autenticar(
        uow=uow,
        email=usuario.email,
        senha=senha,
    )

    assert usuario_autenticado.get("nome") == usuario.nome
    assert usuario_autenticado.get("email") == usuario.email
    assert usuario_autenticado.get("senha") == usuario.senha

    # UsuarioNaoEncontrado: O usuário informado não foi encontrado.
    with pytest.raises(UsuarioNaoEncontrado):
        autenticar(
            uow=uow,
            email=usuario.email,
            senha="54321"
        )
    
    with pytest.raises(UsuarioNaoEncontrado):
        autenticar(
            uow=uow,
            email="email-inexistente@com.br",
            senha="1234"
        )
    






