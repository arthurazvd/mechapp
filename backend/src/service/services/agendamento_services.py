from src.service.unit_of_work import AbstractUnidadeDeTrabalho
from src.domain.models import Agendamento
from src.domain.exceptions import AgendamentoInvalido, AgendamentoNaoEncontrado
from datetime import datetime

def criar_agendamento(
    #aqui lascou, soube fazer nao p esses campos
    uow: AbstractUnidadeDeTrabalho,
    status: str,
    cliente_id: str,
    servico_id: str,
    data: datetime = datetime.today(),
):

    """
    Serviço de criação de agendamentos no sistema. Recebendo as informações de um agendamento, levantando possíveis problemas
    e persistindo as informações quando possível.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        data (str): Data do agendamento.
        status (str): Status do agendamento.
        cliente_id (str): ID do cliente associado ao agendamento.
        servico_id (str): ID do serviço associado ao agendamento.

    Raises:
        AgendamentoInvalido: Os dados do agendamento são inválidos.
        AgendamentoNaoEncontrado: O agendamento não foi encontrado.
    """   

    if not data or not status or not cliente_id or not servico_id:
        raise AgendamentoInvalido("Dados de agendamento inválidos")

    if not agendamento:
        raise AgendamentoNaoEncontrado("Agendamento não encontrado")

    with uow:
        # Adiciona agendamento
        agendamento = Agendamento(data, status, cliente_id, servico_id)
        uow.agendamentos.adicionar(agendamento)
        uow.commit()

def alterar_agendamento(
    uow: AbstractUnidadeDeTrabalho,
    agendamento_id: str,
    nova_data: str | None = None,
    novo_status: str | None = None,
    novo_cliente_id: str | None = None,
    novo_servico_id: str | None = None,
):

    """
    Serviço de alteração de informações de um agendamento no sistema. Recebendo o agendamento identificado, modificando seus valores
    e verificando a possibilidade de persistência do dado.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        agendamento_id (str): ID do agendamento a ser alterado.
        nova_data (str | None): Nova data do agendamento.
        novo_status (str | None): Novo status do agendamento.
        novo_cliente_id (str | None): Novo ID do cliente associado ao agendamento.
        novo_servico_id (str | None): Novo ID do serviço associado ao agendamento.
    
    Raises:
        AgendamentoInvalido: Os dados do agendamento são inválidos.
        AgendamentoNaoEncontrado: O agendamento com o ID informado não foi encontrado.
    """

    if not nova_data or not novo_status or not novo_cliente_id or not novo_servico_id:
        raise AgendamentoInvalido("Dados de agendamento inválidos")

    if not agendamento:
        raise AgendamentoNaoEncontrado("Agendamento não encontrado")

    with uow:
        agendamento = uow.agendamentos.consultar_por_dia(agendamento_id)
        if not agendamento:
            raise AgendamentoNaoEncontrado("Agendamento não encontrado")

        if nova_data is not None:
            agendamento.data = nova_data
        if novo_status is not None:
            agendamento.status = novo_status
        if novo_cliente_id is not None:
            agendamento.cliente_id = novo_cliente_id
        if novo_servico_id is not None:
            agendamento.servico_id = novo_servico_id

        uow.agendamentos.atualizar(agendamento)
        uow.commit()

def remover_agendamento(
    uow: AbstractUnidadeDeTrabalho,
    agendamento_id: str,
):
    """
    Serviço de remoção de um agendamento no sistema. Recebendo o ID do agendamento, verificando sua existência e removendo-o.
    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        agendamento_id (str): ID do agendamento a ser removido.
    Raises:
        AgendamentoNaoEncontrado: O agendamento com o ID informado não foi encontrado.
    """

    with uow:
        agendamento = uow.agendamentos.consultar_por_dia(agendamento_id)
        if not agendamento:
            raise AgendamentoNaoEncontrado("Agendamento não encontrado")

        uow.agendamentos.remover(agendamento)
        uow.commit()

def consultar_agendamento(
    uow: AbstractUnidadeDeTrabalho,
    agendamento_id: str,
) -> dict:
    
    """
    Serviço para consultar um agendamento no sistema pelo ID.
    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        agendamento_id (str): ID do agendamento a ser consultado.
    Returns:
        dict: Dicionário com as informações do agendamento encontrado, ou um dicionário vazio.
    """

    with uow:
        agendamento = uow.agendamentos.consultar_por_id(agendamento_id)
        if agendamento is not None:
            return agendamento.to_dict()
        return {}