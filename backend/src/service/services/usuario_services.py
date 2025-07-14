from src.service.unit_of_work import AbstractUnidadeDeTrabalho
from src.domain.models import Usuario, TipoUsuario
from src.domain.exceptions import *

def criar_usuario(
    uow: AbstractUnidadeDeTrabalho,
    nome: str,
    email: str,
    senha: str,
    tipo: str,
    telefone: str | None = None,
):
    """
    Serviço de criação de usuários no sistema. Recebendo as informações de um usuário, levantando possíveis problemas
    e persistindo as informações quando possível.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        nome (str): Nome do usuário.
        email (str): Email do usuário.
        senha (str): Senha do usuário.
        tipo (str): Tipo de usuário: CLIENTE ou MECANICO.
        telefone (str): Telefone do usuário. 
    Raises:
        EmailInvalido: O email informado não é válido.
        TipoInvalido: O tipo de usuário está inválido, insira CLIENTE Ou MECANICO.
        EmailExistente: O e-mail inserido já está sendo utilizado por outro usuário.
    """
    
    # Verificar se o E-mail é válido
    if Usuario.validar_email(email) is False:
        raise EmailInvalido("O email informado não é válido.")

    # Verificar se o Tipo é válido
    if TipoUsuario.valor_valido(tipo) is False:
        raise TipoInvalido("O tipo de usuário está inválido, insira CLIENTE Ou MECANICO.")

    with uow:
        # Verificando se o e-mail já esta sendo utilizado
        usuario_com_email = uow.usuarios.consultar_por_email(email)
        if usuario_com_email is not None:
            raise EmailExistente("O e-mail inserido já está sendo utilizado por outro usuário.")

        # Adicionando usuário
        usuario = Usuario(nome, email, senha, TipoUsuario(tipo), telefone)
        uow.usuarios.adicionar(usuario)
        uow.commit()

def alterar_usuario(
    uow: AbstractUnidadeDeTrabalho,
    usuario_id: str,
    novo_nome: str | None = None,
    novo_email: str | None = None,
    nova_senha: str | None = None,
    novo_tipo: str | None = None,
    novo_telefone: str | None = None,
):
    """
    Serviço de alteração de informações de um usuário no sistema. Recebendo o usuário identificado, modificando seus valores 
    e verificando a possibilidade de persistência do dado.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        usuario_id (str): Identificador do usuário.
        novo_nome (str): Nome do usuário.
        novo_email (str): Email do usuário.
        nova_senha (str): Senha do usuário.
        novo_tipo (str): Tipo de usuário: CLIENTE ou MECANICO.
        novo_telefone (str): Telefone do usuário. 
    Raises:
        TipoInvalido: O tipo de usuário está inválido, insira CLIENTE Ou MECANICO.
        EmailInvalido: O Email informado não é válido.
        EmailExistente: O e-mail inserido já está sendo utilizado por outro usuário.
        UsuarioNaoEncontrado: O usuário informado não foi encontrado.
    """
    
    # Verificar se o E-mail é válido
    if Usuario.validar_email(novo_email) is False:
        raise EmailInvalido("O email informado não é válido.")

    # Verificar se o Tipo é válido
    if TipoUsuario.valor_valido(novo_tipo) is False:
        raise TipoInvalido("O tipo de usuário está inválido, insira CLIENTE Ou MECANICO.")

    with uow:
        # Verificando se o e-mail já esta sendo utilizado
        usuario_com_email = uow.usuarios.consultar_por_email(novo_email)
        if usuario_com_email is not None and usuario_com_email.id != usuario_id:
            raise EmailExistente("O e-mail inserido já está sendo utilizado por outro usuário.")

        # Buscando usuário no sistema
        usuario = uow.usuarios.consultar(usuario_id)
        if usuario is None:
            raise UsuarioNaoEncontrado("O usuário informado não foi encontrado.")

        # Atualizando usuário
        usuario.nome = novo_nome or usuario.nome
        usuario.tipo = novo_tipo or usuario.tipo
        usuario.email = novo_email or usuario.email
        usuario.senha = hash(nova_senha) or usuario.senha
        usuario.telefone = novo_telefone or usuario.telefone
        uow.usuarios.salvar(usuario)
        uow.commit()

def remover_usuario(
    uow: AbstractUnidadeDeTrabalho,
    usuario_id: str,
):
    """
    Serviço para remoção de um usuário no sistema.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        usuario_id (str): Identificador do usuário.
    Raises:
        UsuarioNaoEncontrado: O usuário informado não foi encontrado.
    """

    with uow:
        # Buscando usuário no sistema
        usuario = uow.usuarios.consultar(usuario_id)
        if usuario is None:
            raise UsuarioNaoEncontrado("O usuário informado não foi encontrado.")
        
        # Removendo usuário
        uow.usuarios.remover(usuario)
        uow.commit()

def consultar_usuario(
    uow: AbstractUnidadeDeTrabalho,
    usuario_id: str,
) -> dict:
    """
    Serviço para consulta de usuários no sistema. 
    
    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        usuario_id (str): Identificador do usuário.
    Returns:
        dict: Dicionário com as informações do usuário encontrado, ou nada caso não haja.
    """

    with uow:
        # Buscando usuário no sistema
        usuario = uow.usuarios.consultar(usuario_id)
        if usuario is not None:
            return usuario.to_dict()
        return {}

def autenticar(
    uow: AbstractUnidadeDeTrabalho,
    email: str,
    senha: str,
) -> dict:
    """
    Serviço para autenticar usuários no sistema.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        email (str): Email do usuário
        senha (str): Senha do usuário
    Raises:
        UsuarioNaoEncontrado: Não foi encontrado um usuário com esse e-mail e senha.
    Returns:
        dict: Dicionário com as informações do usuário encontrado.
    """

    with uow:
        # Buscando usuário no sistema
        usuario = uow.usuarios.consultar_por_email(email)
        if usuario is None or usuario.senha != str(hash(senha)):
            raise UsuarioNaoEncontrado("Não foi encontrado um usuário com esse e-mail e senha.")
        return usuario.to_dict()