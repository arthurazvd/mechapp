from src.service.unit_of_work import AbstractUnidadeDeTrabalho
from src.domain.models import Agendamento, StatusAgendamento, Usuario, Servico, PecaDoAgendamento
from src.domain.exceptions import (
    AgendamentoInvalido, 
    AgendamentoNaoEncontrado, 
    UsuarioNaoEncontrado,
    ServicoNaoEncontrado
)
from datetime import datetime
from uuid import uuid4

def criar_agendamento(
    uow: AbstractUnidadeDeTrabalho,
    status: str,
    cliente_id: str,
    servico_id: str,
    data: datetime = datetime.now(),
    pecas_do_agendamento: list[PecaDoAgendamento] = None,
) -> str:
    """
    Serviço de criação de agendamentos no sistema. Recebendo as informações de um agendamento, 
    levantando possíveis problemas e persistindo as informações quando possível.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        status (str): Status do agendamento.
        cliente_id (str): ID do cliente associado ao agendamento.
        servico_id (str): ID do serviço associado ao agendamento.
        data (datetime): Data do agendamento.
        pecas_do_agendamento (list[PecaDoAgendamento]): Lista de peças do agendamento.

    Returns:
        str: ID do agendamento criado.

    Raises:
        AgendamentoInvalido: Os dados do agendamento são inválidos.
        UsuarioNaoEncontrado: O cliente não foi encontrado.
        ServicoNaoEncontrado: O serviço não foi encontrado.
    """   
    
    # Validar dados obrigatórios
    if not data or not status or not cliente_id or not servico_id:
        raise AgendamentoInvalido("Dados de agendamento inválidos")
    
    # Validar status
    try:
        status_enum = StatusAgendamento(status)
    except ValueError:
        raise AgendamentoInvalido("Status de agendamento inválido")

    with uow:
        # Verificar se cliente existe
        cliente = uow.usuarios.consultar(cliente_id)
        if not cliente:
            raise UsuarioNaoEncontrado("Cliente não encontrado")
        
        # Verificar se serviço existe
        servico = uow.servicos.consultar(servico_id)
        if not servico:
            raise ServicoNaoEncontrado("Serviço não encontrado")
        
        # Criar agendamento
        agendamento_id = str(uuid4())
        agendamento = Agendamento(
            id=agendamento_id,
            data=data,
            status=status_enum,
            cliente=cliente,
            servico=servico,
            pecas_do_agendamento=pecas_do_agendamento or []
        )
        
        uow.agendamentos.adicionar(agendamento)
        uow.commit()
        
        return agendamento_id

def alterar_agendamento(
    uow: AbstractUnidadeDeTrabalho,
    agendamento_id: str,
    nova_data: datetime = None,
    novo_status: str = None,
    novo_cliente_id: str = None,
    novo_servico_id: str = None,
):
    """
    Serviço de alteração de informações de um agendamento no sistema. Recebendo o agendamento 
    identificado, modificando seus valores e verificando a possibilidade de persistência do dado.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        agendamento_id (str): ID do agendamento a ser alterado.
        nova_data (datetime): Nova data do agendamento.
        novo_status (str): Novo status do agendamento.
        novo_cliente_id (str): Novo ID do cliente associado ao agendamento.
        novo_servico_id (str): Novo ID do serviço associado ao agendamento.
    
    Raises:
        AgendamentoInvalido: Os dados do agendamento são inválidos.
        AgendamentoNaoEncontrado: O agendamento com o ID informado não foi encontrado.
        UsuarioNaoEncontrado: O cliente não foi encontrado.
        ServicoNaoEncontrado: O serviço não foi encontrado.
    """
    
    # Validar se pelo menos um campo foi informado
    if not any([nova_data, novo_status, novo_cliente_id, novo_servico_id]):
        raise AgendamentoInvalido("Pelo menos um campo deve ser informado para alteração")

    with uow:
        # Buscar agendamento
        agendamento = uow.agendamentos.consultar(agendamento_id)
        if not agendamento:
            raise AgendamentoNaoEncontrado("Agendamento não encontrado")

        # Alterar data se informada
        if nova_data is not None:
            agendamento.data = nova_data
        
        # Alterar status se informado
        if novo_status is not None:
            try:
                agendamento.status = StatusAgendamento(novo_status)
            except ValueError:
                raise AgendamentoInvalido("Status de agendamento inválido")
        
        # Alterar cliente se informado
        if novo_cliente_id is not None:
            cliente = uow.usuarios.consultar(novo_cliente_id)
            if not cliente:
                raise UsuarioNaoEncontrado("Cliente não encontrado")
            agendamento.cliente = cliente
        
        # Alterar serviço se informado
        if novo_servico_id is not None:
            servico = uow.servicos.consultar(novo_servico_id)
            if not servico:
                raise ServicoNaoEncontrado("Serviço não encontrado")
            agendamento.servico = servico

        uow.agendamentos.atualizar(agendamento)
        uow.commit()

def remover_agendamento(
    uow: AbstractUnidadeDeTrabalho,
    agendamento_id: str,
):
    """
    Serviço de remoção de um agendamento no sistema. Recebendo o ID do agendamento, 
    verificando sua existência e removendo-o.
    
    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        agendamento_id (str): ID do agendamento a ser removido.
    
    Raises:
        AgendamentoNaoEncontrado: O agendamento com o ID informado não foi encontrado.
    """

    with uow:
        agendamento = uow.agendamentos.consultar(agendamento_id)
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
        agendamento = uow.agendamentos.consultar(agendamento_id)
        if agendamento is not None:
            return agendamento.to_dict()
        return {}

def listar_agendamentos(
    uow: AbstractUnidadeDeTrabalho,
) -> list[dict]:
    """
    Serviço para listar todos os agendamentos no sistema.
    
    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
    
    Returns:
        list[dict]: Lista de dicionários com as informações dos agendamentos.
    """
    
    with uow:
        agendamentos = uow.agendamentos.listar()
        return [agendamento.to_dict() for agendamento in agendamentos]
