from src.service.unit_of_work import AbstractUnidadeDeTrabalho
from src.domain.models import Oficina
from src.domain.exceptions import OficinaInvalida, OficinaNaoEncontrada

def criar_oficina(
    uow: AbstractUnidadeDeTrabalho,
    nome: str,
    endereco: str,
    cnpj: str,
    proprietario_id: str,
):
    """
    Serviço de criação de oficinas no sistema. Recebendo as informações de uma oficina, levantando possíveis problemas
    e persistindo as informações quando possível.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        nome (str): Nome da oficina.
        endereco (str): Endereço da oficina.
        telefone (str | None): Telefone da oficina.
        email (str | None): Email da oficina.

    Raises:
        OficinaInvalida: A oficina informada é inválida.
    """
    


    if not nome or not endereco:
        raise OficinaInvalida("Nome e endereço não podem ser vazios.")

    if not oficina:
        raise OficinaNaoEncontrada("A oficina informada não foi encontrada.")

    with uow:
        # Adiciona oficina
        oficina = Oficina(nome, endereco, cnpj, proprietario_id)
        uow.oficinas.adicionar(oficina)
        uow.commit()

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
        novo_telefone (str | None): Novo telefone da oficina.
        novo_email (str | None): Novo email da oficina.
    
    Raises:
        OficinaInvalida: A oficina informada é inválida.
        OficinaNaoEncontrada: A oficina com o CNPJ e Proprietario informado não foi encontrada.
    """
    
    with uow:
        # Verifica se a oficina existe
        oficina = uow.oficinas.consultar_por_cnpj(oficina_id)
        if not oficina:
            raise OficinaNaoEncontrada("A oficina com o CNPJ informado não foi encontrada.")
        
        oficina = uow.oficinas.consultar_por_proprietario(oficina_id)
        if not oficina:
            raise OficinaNaoEncontrada("A oficina com o proprietário informado não foi encontrada.")

        # Atualiza os campos da oficina
        if novo_nome is not None:
            oficina.nome = novo_nome
        if novo_endereco is not None:
            oficina.endereco = novo_endereco
        if novo_cnpj is not None:
            oficina.cnpj = novo_cnpj
        if novo_proprietario_id is not None:
            oficina.proprietario_id = novo_proprietario_id

        uow.oficinas.atualizar(oficina)
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
        OficinaNaoEncontrada: A oficina com o CNPJ e Proprietario informado não foi encontrada.
    """
    
    with uow:
        # Verifica se a oficina existe
        oficina = uow.oficinas.consultar_por_cnpj(oficina_id)
        if not oficina:
            raise OficinaNaoEncontrada("A oficina com o CNPJ informado não foi encontrada.")
        
        oficina = uow.oficinas.consultar_por_proprietario(oficina_id)
        if not oficina:
            raise OficinaNaoEncontrada("A oficina com o proprietário informado não foi encontrada.")

        uow.oficinas.remover(oficina)
        uow.commit()

def consultar_oficina(
    uow: AbstractUnidadeDeTrabalho,
    oficina_id: str,
):
    """
    Serviço de consulta de uma oficina no sistema. Recebendo o ID da oficina, retornando suas informações.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        oficina_id (str): ID da oficina a ser consultada.

    Returns:
        Oficina: A oficina consultada.

    Raises:
        OficinaNaoEncontrada: A oficina com o CNPJ e Proprietario informado não foi encontrada.
    """
    
    with uow:
        oficina = uow.oficinas.consultar_por_cnpj(oficina_id)
        if not oficina:
            raise OficinaNaoEncontrada("A oficina com o CNPJ informado não foi encontrada.")
        
        oficina = uow.oficinas.consultar_por_proprietario(oficina_id)
        if not oficina:
            raise OficinaNaoEncontrada("A oficina com o proprietário informado não foi encontrada.")

        return oficina.to_dict()
    
def listar_oficinas(
    uow: AbstractUnidadeDeTrabalho,
):
    """
    Serviço de listagem de todas as oficinas no sistema.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.

    Returns:
        list: Lista de dicionários com as informações de todas as oficinas.
    """
    
    with uow:
        oficinas = uow.oficinas.listar()
        return [oficina.to_dict() for oficina in oficinas]
    
