from src.service.unit_of_work import UnidadeDeTrabalho
from src.service import (
    criar_oficina,
    alterar_oficina,
    remover_oficina,
    consultar_oficina,
    listar_oficinas,
)
from database.connection import get_uow
from pydantic import BaseModel
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

class OficinaCreate(BaseModel):
    nome: str
    endereco: str
    cnpj: str
    proprietario_id: str

class OficinaUpdate(BaseModel):
    nome: str | None = None
    endereco: str | None = None
    cnpj: str | None = None
    proprietario_id: str | None = None

router = APIRouter(
    prefix="/oficina",
    tags=["oficina"],
)

@router.post("/criar")
def criacao_de_oficina(
    oficina: OficinaCreate,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    oficina_id = criar_oficina(
        uow=uow,
        nome=oficina.nome,
        endereco=oficina.endereco,
        cnpj=oficina.cnpj,
        proprietario_id=oficina.proprietario_id,
    )

    return JSONResponse(
        status_code=201,
        content={"mensagem":"Sucesso ao criar oficina!","peca_id":oficina_id}
    )

@router.get("/listar", response_model=list[dict])
def listando_oficinas(
    proprietario_id: str | None = None,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    oficinas = listar_oficinas(
        uow=uow,
        proprietario_id=proprietario_id,
    )

    return JSONResponse(
        status_code=200,
        content=oficinas
    )

@router.get("/{oficina_id}", response_model=dict)
def recuperando_oficina(
    oficina_id: str,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    oficina = consultar_oficina(
        uow=uow,
        oficina_id=oficina_id,
    )
    
    return JSONResponse(
        status_code=200,
        content=oficina
    )

@router.patch("/{oficina_id}")
def atualizando_oficina(
    oficina_id: str,
    nova_oficina: OficinaUpdate,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    alterar_oficina(
        uow=uow,
        oficina_id=oficina_id,
        novo_nome=nova_oficina.nome,
        novo_endereco=nova_oficina.endereco,
        novo_cnpj=nova_oficina.cnpj,
        novo_proprietario_id=nova_oficina.proprietario_id,
    )

    return JSONResponse(
        status_code=200,
        content={"mensagem":"Oficina atualizada com sucesso!"}
    )

@router.delete("/{oficina_id}")
def removendo_peca(
    oficina_id: str,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    remover_oficina(
        uow=uow,
        oficina_id=oficina_id,
    )

    return JSONResponse(
        status_code=200,
        content={"mensagem":"A oficina foi excluída do sistema!"}
    )