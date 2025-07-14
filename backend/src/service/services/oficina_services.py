from src.service.unit_of_work import AbstractUnidadeDeTrabalho
from src.domain.models import Oficina, TipoUsuario
from src.domain.exceptions import (
    CNPJInvalido, 
    OficinaNaoEncontrada,
    UsuarioNaoEncontrado,
    UsuarioInvalido,
)

def criar_oficina(
    uow: AbstractUnidadeDeTrabalho,
    nome: str,
    endereco: str,
    cnpj: str,
    proprietario_id: str,
) -> str:
    """
    Serviço de criação de oficinas no sistema. Recebendo as informações de uma oficina, levantando possíveis problemas
    e persistindo as informações quando possível.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        nome (str): Nome da oficina.
        endereco (str): Endereço da oficina.
        cnpj (str): Cnpj da oficina.
        proprietario_id (str): Proprietário da oficina.
    Returns:
        str: Identificador da oficina
    Raises:
        CNPJInvalido: O CNPJ informado é inválido.
        UsuarioNaoEncontrado: O proprietário informado não foi encontrado.
        UsuarioInvalido: O proprietário informado não é um mecânico.
    """

    # Verificar CNPJ
    if Oficina.validar_cnpj(cnpj) is False:
        raise CNPJInvalido("O CNPJ informado é inválido.")

    with uow:
        # Recuperando proprietário
        proprietario = uow.usuarios.consultar(proprietario_id)

        # Verificando problemas
        if proprietario is None:
            raise UsuarioNaoEncontrado("O proprietário informado não foi encontrado.")
        if proprietario.tipo != TipoUsuario.MECANICO:
            raise UsuarioInvalido("O proprietário informado não é um mecânico.")

        # Criando oficina
        oficina = Oficina(nome=nome, endereco=endereco, cnpj=cnpj, proprietario=proprietario)
        uow.oficinas.adicionar(oficina)
        uow.commit()

        return oficina.id

def alterar_oficina(
    uow: AbstractUnidadeDeTrabalho,
    oficina_id: str,
    novo_nome: str | None = None,
    novo_endereco: str | None = None,
    novo_cnpj: str | None = None,
    novo_proprietario_id: str | None = None,
):
    """
    Serviço de alteração de informações de uma oficina no sistema. Recebendo a oficina identificada, modificando seus valores 
    e verificando a possibilidade de persistência do dado.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        oficina_id (str): ID da oficina a ser alterada.
        novo_nome (str | None): Novo nome da oficina.
        novo_endereco (str | None): Novo endereço da oficina.
        novo_cnpj (str | None): Novo CNPJ da oficina.
        novo_proprietario_id (str | None): Novo proprietario da oficina.
    Raises:
        CNPJInvalido: O CNPJ informado é inválido.
        OficinaNaoEncontrada: A oficina informada não foi encontrada.
        UsuarioNaoEncontrado: O proprietário informado não foi encontrado.
        UsuarioInvalido: O proprietário informado não é um mecânico.
    """

    # Verificar CNPJ
    if novo_cnpj and Oficina.validar_cnpj(novo_cnpj) is False:
        raise CNPJInvalido("O CNPJ informado é inválido.")

    with uow:
        # Verifica se a oficina existe
        oficina = uow.oficinas.consultar(oficina_id)
        if not oficina:
            raise OficinaNaoEncontrada("A oficina informada não foi encontrada.")

        # Buscando novo proprietário
        if isinstance(novo_proprietario_id, str):
            novo_proprietario = uow.usuarios.consultar(novo_proprietario_id)
            
            # Verificando existência de proprietário e validade de usuário
            if novo_proprietario is None:
                raise UsuarioNaoEncontrado("O proprietário informado não foi encontrado.")
            if novo_proprietario.tipo != TipoUsuario.MECANICO:
                raise UsuarioInvalido("O proprietário informado não é um mecânico.")

            oficina.proprietario_id = novo_proprietario or oficina.proprietario
            oficina.proprietario_id = novo_proprietario_id or oficina.proprietario_id

        # Atualiza os campos da oficina
        oficina.nome = novo_nome or oficina.nome
        oficina.cnpj = novo_cnpj or oficina.cnpj
        oficina.endereco = novo_endereco or oficina.endereco

        uow.oficinas.salvar(oficina)
        uow.commit()

def remover_oficina(
    uow: AbstractUnidadeDeTrabalho,
    oficina_id: str,
):
    """
    Serviço de remoção de uma oficina do sistema. Recebendo o ID da oficina, verificando se ela existe e removendo-a.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        oficina_id (str): ID da oficina a ser removida.
    Raises:
        OficinaNaoEncontrada: "A oficina informada não foi encontrada."
    """
    
    with uow:
        # Verificando existência de oficina
        oficina = uow.oficinas.consultar(oficina_id)
        if not oficina:
            raise OficinaNaoEncontrada("A oficina informada não foi encontrada.")
        
        # Removendo a oficina
        uow.oficinas.remover(oficina)
        uow.commit()

def consultar_oficina(
    uow: AbstractUnidadeDeTrabalho,
    oficina_id: str,
) -> dict:
    """
    Serviço de consulta de uma oficina no sistema. Recebendo o ID da oficina, retornando suas informações.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        oficina_id (str): ID da oficina a ser consultada.
    Returns:
        dict: Dicionário com as informações da oficina encontrada.
    """
    
    with uow:
        oficina = uow.oficinas.consultar(oficina_id)
        if oficina:
            return oficina.to_dict()
        return {}
    
def listar_oficinas(
    uow: AbstractUnidadeDeTrabalho,
) -> list[dict]:
    """
    Serviço de listagem de todas as oficinas no sistema.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
    Returns:
        list[dict]: Lista de dicionários com as informações de todas as oficinas.
    """
    
    with uow:
        oficinas = uow.oficinas.listar() 
        return [oficina.to_dict() for oficina in oficinas] 