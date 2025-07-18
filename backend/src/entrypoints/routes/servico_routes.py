from src.service.unit_of_work import UnidadeDeTrabalho
from src.service import (
    criar_servico,
    alterar_servico,
    remover_servico,
    consultar_servico,
    listar_servicos_de_oficina,
)
from database.connection import get_uow
from pydantic import BaseModel
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

class ServicoCreate(BaseModel):
    nome: str
    descricao: str
    tempo: int
    preco_min: float
    preco_max: float
    oficina_id: str 

class ServicoUpdate(BaseModel):
    nome: str | None = None
    descricao: str | None = None
    tempo: int | None = None
    preco_min: float | None = None
    preco_max: float | None = None

router = APIRouter(
    prefix="/servico",
    tags=["servico"],
)

@router.post("/criar")
def criacao_de_servico(
    servico: ServicoCreate,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    servico_id = criar_servico(
        uow=uow,
        nome=servico.nome,
        descricao=servico.descricao,
        tempo=servico.tempo,
        preco_min=servico.preco_min,
        preco_max=servico.preco_max,
        oficina_id=servico.oficina_id,
    )

    return JSONResponse(
        status_code=201,
        content={"mensagem":"Sucesso ao criar serviço!","servico_id":servico_id}
    )

@router.get("/listar/{oficina_id}", response_model=list[dict])
def listando_servicos_de_oficina(
    oficina_id: str,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    servicos = listar_servicos_de_oficina(
        uow=uow,
        oficina_id=oficina_id,
    )

    return JSONResponse(
        status_code=200,
        content=servicos
    )

@router.get("/{servico_id}", response_model=dict)
def recuperando_servico(
    servico_id: str,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    servico = consultar_servico(
        uow=uow,
        servico_id=servico_id,
    )
    
    return JSONResponse(
        status_code=200,
        content=servico
    )

@router.patch("/{servico_id}")
def atualizando_servico(
    servico_id: str,
    novo_servico: ServicoUpdate,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    alterar_servico(
        uow=uow,
        servico_id=servico_id,
        novo_nome=novo_servico.nome,
        nova_descricao=novo_servico.descricao,
        novo_tempo=novo_servico.tempo,
        novo_preco_min=novo_servico.preco_min,
        novo_preco_max=novo_servico.preco_max,
    )

    return JSONResponse(
        status_code=200,
        content={"mensagem":"Serviço atualizado com sucesso!"}
    )

@router.delete("/{servico_id}")
def removendo_servico(
    servico_id: str,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    remover_servico(
        uow=uow,
        servico_id=servico_id,
    )

    return JSONResponse(
        status_code=200,
        content={"mensagem":"O serviço foi excluído do sistema!"}
    )