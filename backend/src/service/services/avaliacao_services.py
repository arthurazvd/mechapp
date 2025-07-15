from src.service.unit_of_work import AbstractUnidadeDeTrabalho
from src.domain.models import Avaliacao
from datetime import datetime
from src.domain.exceptions import AvaliacaoInvalida, AvaliacaoNaoEncontrada

def criar_avaliacao(
    uow: AbstractUnidadeDeTrabalho,
    nota: int,
    cliente_id: str,
    servico_id: str,
    comentario: str | None = None,
    data: datetime = datetime.now(),
):
    """
    Serviço de criação de avaliações no sistema. Recebendo as informações de uma avaliação, levantando possíveis problemas
    e persistindo as informações quando possível.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        nota (int): Nota da avaliação.
        comentario (str | None): Comentário da avaliação.
        data (datetime): Data da avaliação.
        cliente_id (str): ID do cliente associado à avaliação.
        servico_id (str): ID do serviço associado à avaliação.

    Raises:
        AvaliacaoInvalida: Os dados da avaliação são inválidos.
        AvaliacaoNaoEncontrada: A avaliação não foi encontrada.
    """

    if not nota or not cliente_id or not servico_id:
        raise AvaliacaoInvalida("Dados de avaliação inválidos")
    
    with uow:
        avaliacao = Avaliacao(nota, comentario, data, cliente_id, servico_id)
        uow.avaliacoes.adicionar(avaliacao)
        uow.commit()

def alterar_avaliacao(
    uow: AbstractUnidadeDeTrabalho,
    avaliacao_id: str,
    cliente_id: str,
    servico_id: str,
    nova_nota: int | None = None,
    novo_comentario: str | None = None,
    nova_data: datetime | None = None,
):
    with uow:
        avaliacao = uow.avaliacoes.consultar(avaliacao_id)
        if avaliacao is None:
            raise AvaliacaoNaoEncontrada("A avaliação informada não foi encontrada.")

        if avaliacao.cliente_id != cliente_id or avaliacao.servico_id != servico_id:
            raise AvaliacaoInvalida("A avaliação não pertence ao cliente ou serviço informados.")
        
        if nova_nota is not None:
            avaliacao.nota = nova_nota
        if novo_comentario is not None:
            avaliacao.comentario = novo_comentario
        if nova_data is not None:
            avaliacao.data = nova_data

        # Alterado para usar o método salvar que já existe
        uow.avaliacoes.salvar(avaliacao)
        uow.commit()

def remover_avaliacao(
    uow: AbstractUnidadeDeTrabalho,
    avaliacao_id: str,
):
    """
    Serviço de remoção de uma avaliação do sistema. Recebendo o ID da avaliação, verificando se ela existe e removendo-a.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        avaliacao_id (str): ID da avaliação a ser removida.

    Raises:
        AvaliacaoNaoEncontrada: A avaliação não foi encontrada.
    """
    
    with uow:
        avaliacao = uow.avaliacoes.consultar(avaliacao_id)
        if avaliacao is None:
            raise AvaliacaoNaoEncontrada("A avaliação informada não foi encontrada.")

        uow.avaliacoes.remover(avaliacao)
        uow.commit()

def consultar_avaliacao(
    uow: AbstractUnidadeDeTrabalho,
    avaliacao_id: str,
) -> dict:
    """
    Serviço para consulta de avaliações no sistema.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        avaliacao_id (str): Identificador da avaliação.

    Returns:
        dict: Dicionário com as informações da avaliação encontrada.
    
    Raises:
        AvaliacaoNaoEncontrada: A avaliação informada não foi encontrada.
    """
    with uow:
        avaliacao = uow.avaliacoes.consultar(avaliacao_id)
        if avaliacao is None:
            raise AvaliacaoNaoEncontrada("A avaliação informada não foi encontrada.")
        
        # Garante que os campos cliente_id e servico_id estejam no dicionário
        resultado = avaliacao.to_dict()
        resultado['cliente_id'] = avaliacao.cliente_id
        resultado['servico_id'] = avaliacao.servico_id
        return resultado