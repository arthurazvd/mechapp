from src.service.unit_of_work import AbstractUnidadeDeTrabalho
from src.domain.models import Servico
from src.domain.exceptions import ServicoInvalido, ServicoNaoEncontrado, OficinaNaoEncontrada

def criar_servico(
    uow: AbstractUnidadeDeTrabalho,
    nome: str,
    tempo: int,
    descricao: str,
    preco_min: float,
    preco_max: float,
    oficina_id: str,
) -> str:
    """
    Serviço de criação de serviços no sistema. Recebendo as informações de um serviço, levantando possíveis problemas
    e persistindo as informações quando possível.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        nome (str): Nome do serviço.
        tempo (int): Tempo do serviço.
        descricao (str): Descrição do serviço.
        preco_min (float): Preço mínimo do serviço.
        preco_max (float): Preço máximo do serviço.
        oficina_id (str): ID da oficina.
    Returns:
        str: identificador da oficina
    Raises:
        ServicoInvalido: O serviço informado é inválido.
        OficinaNaoEncontrada: A oficina informada não foi encontrada.
    """

    if not nome or not descricao or preco_min < 0 or preco_max < 0:
        raise ServicoInvalido("Nome, descrição e preços não podem ser vazios ou negativos.")

    with uow:
        # Buscar a oficina pelo ID
        oficina = uow.oficinas.consultar(oficina_id)
        if not oficina:
            raise OficinaNaoEncontrada("A oficina informada não foi encontrada.")

        # Criar serviço com o objeto oficina
        servico = Servico(nome, descricao, tempo, preco_min, preco_max, oficina)
        uow.servicos.adicionar(servico)
        uow.commit()
        
        return servico.id

def alterar_servico(
    uow: AbstractUnidadeDeTrabalho,
    servico_id: str,
    novo_nome: str | None = None,
    novo_tempo: int | None = None,
    nova_descricao: str | None = None,
    novo_preco_min: float | None = None,
    novo_preco_max: float | None = None,
    nova_oficina_id: str | None = None
):
    """
    Serviço de alteração de informações de um serviço no sistema. Recebendo o serviço identificado, modificando seus valores 
    e verificando a possibilidade de persistência do dado.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        servico_id (str): ID do serviço a ser alterado.
        novo_nome (str | None): Novo nome do serviço.
        novo_tempo (int | None): Novo tempo do serviço.
        nova_descricao (str | None): Nova descrição do serviço.
        novo_preco_min (float | None): Novo preço mínimo do serviço.
        novo_preco_max (float | None): Novo preço máximo do serviço
    Raises:
        ServicoNaoEncontrado: O serviço informado não foi encontrado.
    """
    
    with uow:
        # Verifica se o serviço existe
        servico = uow.servicos.consultar(servico_id)
        if not servico:
            raise ServicoNaoEncontrado("O serviço informado não foi encontrado.")

        # Atualiza os campos informados
        servico.nome = novo_nome or servico.nome
        servico.tempo = novo_tempo or servico.tempo
        servico.descricao = nova_descricao or servico.descricao
        servico.preco_min = novo_preco_min or servico.preco_min
        servico.preco_max = novo_preco_max or servico.preco_max

        uow.servicos.salvar(servico)
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
        dict: O serviço consultado em formato de dicionário.
    """
    
    with uow:
        servico = uow.servicos.consultar(servico_id)
        if servico is None:
            return {}
        return servico.to_dict(include_oficina=True)
    
def listar_servicos_de_oficina(
    uow: AbstractUnidadeDeTrabalho,
    oficina_id: str,
) -> list[dict]:
    """
    Serviço para consultar todos os serviços de uma oficina

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        oficina_id (str): ID do serviço a ser consultado.
    Returns:
        list[dict]: A lista de todos os serviços de uma oficina
    Raises:
        OficinaNaoEncontrada: A oficina identificada não existe.
    """

    with uow:
        oficina = uow.oficinas.consultar(oficina_id)
        if oficina is None:
            raise OficinaNaoEncontrada("A oficina identificada não existe.")
        servicos = uow.servicos.consultar_por_oficina(oficina_id)
        return [servico.to_dict() for servico in servicos]