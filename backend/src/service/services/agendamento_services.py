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
from sqlalchemy.orm import joinedload  # Adicione esta linha

def criar_agendamento(
    uow: AbstractUnidadeDeTrabalho,
    servico_id: str,
    cliente_id: str,
    data: datetime = datetime.now(),
    status: str = "PENDENTE",
    pecas_do_agendamento: list[PecaDoAgendamento] = [],
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
        agendamento = Agendamento(
            data=data,
            status=status_enum,
            cliente=cliente,
            servico=servico,
            pecas_do_agendamento=pecas_do_agendamento
        )
        
        uow.agendamentos.adicionar(agendamento)
        uow.commit()
        
        return agendamento.id

def alterar_agendamento(
    uow: AbstractUnidadeDeTrabalho,
    agendamento_id: str,
    nova_data: datetime = None,
    novo_status: str = None,
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
        novo_servico_id (str): Novo ID do serviço associado ao agendamento.
    Raises:
        AgendamentoInvalido: Os dados do agendamento são inválidos.
        AgendamentoNaoEncontrado: O agendamento com o ID informado não foi encontrado.
        UsuarioNaoEncontrado: O cliente não foi encontrado.
        ServicoNaoEncontrado: O serviço não foi encontrado.
    """
    
    with uow:
        # Buscar agendamento
        agendamento = uow.agendamentos.consultar(agendamento_id)
        if not agendamento:
            raise AgendamentoNaoEncontrado("Agendamento não encontrado")

        # Alterar data se informada
        agendamento.data = nova_data or agendamento.data
        
        # Alterar status se informado
        if novo_status is not None:
            try:
                agendamento.status = StatusAgendamento(novo_status)
            except ValueError:
                raise AgendamentoInvalido("Status de agendamento inválido")
                
        # Alterar serviço se informado
        if novo_servico_id is not None:
            servico = uow.servicos.consultar(novo_servico_id)
            if not servico:
                raise ServicoNaoEncontrado("Serviço não encontrado")
            agendamento.servico = servico

        uow.agendamentos.salvar(agendamento)
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
    cliente_id: str = None,
    oficina_id: str = None,
    status: str = None,
) -> list[dict]:
    """
    Lista agendamentos com filtros opcionais. Podendo receber todos os agendamentos do sistema, os agendamentos
    de um cliente, os agendamentos de uma oficina e os status dos agendamentos filtrados. 
    """

    with uow:
        if status is not None:
            try:
                status = StatusAgendamento(status)
            except ValueError:
                raise AgendamentoInvalido("Status de agendamento inválido")

        agendamentos = uow.agendamentos.listar(
            cliente_id=cliente_id,
            oficina_id=oficina_id,
            status=status,
        )        

        return [agendamento.to_dict() for agendamento in agendamentos]