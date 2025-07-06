from src.service.unit_of_work import AbstractUnidadeDeTrabalho
from src.domain.models import Servico
from src.domain.exceptions import ServicoInvalido, ServicoNaoEncontrado

def criar_servico(
    uow: AbstractUnidadeDeTrabalho,
    nome: str,
    descricao: str,
    preco_min: float,
    preco_max: float,
    oficina_id: str,
):
    """
    Serviço de criação de serviços no sistema. Recebendo as informações de um serviço, levantando possíveis problemas
    e persistindo as informações quando possível.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        nome (str): Nome do serviço.
        descricao (str): Descrição do serviço.
        preco (float): Preço do serviço.

    Raises:
        ServicoInvalido: O serviço informado é inválido.
    """

    if not nome or not descricao or preco_min < 0 or preco_max < 0:
        raise ServicoInvalido("Nome, descrição e preços não podem ser vazios ou negativos.")

    with uow:
        # Adiciona serviço
        servico = Servico(nome, descricao, preco_min, preco_max, oficina_id)
        uow.servicos.adicionar(servico)
        uow.commit()

def alterar_servico(
    uow: AbstractUnidadeDeTrabalho,
    servico_id: str,
    novo_nome: str | None = None,
    nova_descricao: str | None = None,
    novo_preco_min: float | None = None,
    novo_preco_max: float | None = None,
):
    """
    Serviço de alteração de informações de um serviço no sistema. Recebendo o serviço identificado, modificando seus valores 
    e verificando a possibilidade de persistência do dado.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        servico_id (str): ID do serviço a ser alterado.
        novo_nome (str | None): Novo nome do serviço.
        nova_descricao (str | None): Nova descrição do serviço.
        novo_preco_min (float | None): Novo preço mínimo do serviço.
        novo_preco_max (float | None): Novo preço máximo do serviço.
    
    Raises:
        ServicoNaoEncontrado: O serviço informado não foi encontrado.
    """
    
    with uow:
        # Verifica se o serviço existe
        servico = uow.servicos.consultar(servico_id)
        if not servico:
            raise ServicoNaoEncontrado("O serviço informado não foi encontrado.")

        # Atualiza os campos informados
        if novo_nome is not None:
            servico.nome = novo_nome
        if nova_descricao is not None:
            servico.descricao = nova_descricao
        if novo_preco_min is not None:
            servico.preco_min = novo_preco_min
        if novo_preco_max is not None:
            servico.preco_max = novo_preco_max

        uow.servicos.atualizar(servico)
        uow.commit()

def remover_servico(
    uow: AbstractUnidadeDeTrabalho,
    servico_id: str,
):
    """
    Serviço de remoção de um serviço no sistema. Recebendo o ID do serviço, verificando sua existência e removendo-o.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        servico_id (str): ID do serviço a ser removido.

    Raises:
        ServicoNaoEncontrado: O serviço informado não foi encontrado.
    """
    
    with uow:
        # Verifica se o serviço existe
        servico = uow.servicos.consultar(servico_id)
        if not servico:
            raise ServicoNaoEncontrado("O serviço informado não foi encontrado.")

        uow.servicos.remover(servico)
        uow.commit()

def consultar_servico(
    uow: AbstractUnidadeDeTrabalho,
    servico_id: str,
):
    """
    Serviço para consultar um serviço no sistema pelo ID.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        servico_id (str): ID do serviço a ser consultado.

    Returns:
        Servico: O serviço consultado.

    Raises:
        ServicoNaoEncontrado: O serviço informado não foi encontrado.
    """
    
    with uow:
        servico = uow.servicos.consultar(servico_id)
        if not servico:
            raise ServicoNaoEncontrado("O serviço informado não foi encontrado.")
        
        return servico.to_dict()