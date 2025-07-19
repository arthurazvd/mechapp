from src.service.unit_of_work import UnidadeDeTrabalho
from src.service import (
    criar_agendamento,
    alterar_agendamento,
    remover_agendamento,
    consultar_agendamento,
    listar_agendamentos,
)
from database.connection import get_uow
from pydantic import BaseModel
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from datetime import datetime

class AgendamentoCreate(BaseModel):
    servico_id: str
    cliente_id: str
    data: str = datetime.now().isoformat(),
    status: str = "PENDENTE",

class AgendamentoUpdate(BaseModel):
    servico_id: str | None = None
    data: str | None = None 
    status: str | None = None

router = APIRouter(
    prefix="/agendamento",
    tags=["agendamento"],
)

@router.post("/criar")
def criando_agendamento(
    agendamento: AgendamentoCreate,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    if isinstance(agendamento.data, str):
        agendamento.data = datetime.fromisoformat(agendamento.data)

    agendamento_id = criar_agendamento(
        uow=uow,
        servico_id=agendamento.servico_id,
        cliente_id=agendamento.cliente_id,
        data=agendamento.data,
        status=agendamento.status,
    )

    return JSONResponse(
        status_code=201,
        content={"mensagem":"Sucesso ao criar agendamento!","agendamento_id":agendamento_id }
    )

@router.get("/listar", response_model=list[dict])
def listando_agendamentos(
    cliente_id: str | None = None,
    oficina_id: str | None = None,
    status: str | None = None,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    agendamentos = listar_agendamentos(
        uow=uow,
        cliente_id=cliente_id,
        oficina_id=oficina_id,
        status=status
    )

    return JSONResponse(
        status_code=200,
        content=agendamentos
    )

@router.get("/{agendamento_id}", response_model=dict)
def consultando_agendamento(
    agendamento_id: str,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    agendamento = consultar_agendamento(
        uow=uow,
        agendamento_id=agendamento_id,
    )
    
    return JSONResponse(
        status_code=200,
        content=agendamento
    )

@router.patch("/{agendamento_id}")
def atualizando_oficina(
    agendamento_id: str,
    novo_agendamento: AgendamentoUpdate,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    alterar_agendamento(
        uow=uow,
        agendamento_id=agendamento_id,
        novo_servico_id=novo_agendamento.servico_id,
        nova_data=novo_agendamento.data,
        novo_status=novo_agendamento.status,
    )

    return JSONResponse(
        status_code=200,
        content={"mensagem":"Agendamento atualizado com sucesso!"}
    )

@router.delete("/{agendamento_id}")
def removendo_agendamento(
    agendamento_id: str,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    remover_agendamento(
        uow=uow,
        agendamento_id=agendamento_id,
    )

    return JSONResponse(
        status_code=200,
        content={"mensagem":"O agendamento foi excluído do sistema!"}
    )