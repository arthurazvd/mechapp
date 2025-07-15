from src.service.unit_of_work import UnidadeDeTrabalho
from src.service import (
    criar_peca,
    alterar_peca,
    remover_peca,
    consultar_peca,
    listar_pecas,
)
from database.connection import get_uow
from pydantic import BaseModel
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

class PecaCreate(BaseModel):
    nome: str
    descricao: str
    quantidade: int
    preco: float
    imagem: bytes | None = None

class PecaUpdate(BaseModel):
    nome: str | None = None
    descricao: str | None = None
    quantidade: int | None = None
    preco: float | None = None
    imagem: bytes | None = None

router = APIRouter(
    prefix="/peca",
    tags=["Usuarios"],
)

@router.post("/criar")
def criacao_de_peca(
    peca: PecaCreate,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    peca_id = criar_peca(
        uow=uow,
        nome=peca.nome,
        descricao=peca.descricao,
        quantidade=peca.quantidade,
        preco=peca.preco,
        imagem=peca.imagem,
    )

    return JSONResponse(
        status_code=201,
        content={"mensagem":"Sucesso ao criar peça!","peca_id":peca_id}
    )

@router.get("/listar", response_model=list[dict])
def listando_pecas(
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    pecas = listar_pecas(
        uow=uow,
    )

    return JSONResponse(
        status_code=200,
        content=pecas
    )

@router.get("/{peca_id}", response_model=dict)
def recuperando_peca(
    peca_id: str,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    peca = consultar_peca(
        uow=uow,
        peca_id=peca_id,
    )
    
    return JSONResponse(
        status_code=200,
        content=peca
    )

@router.patch("/{peca_id}")
def atualizando_peca(
    peca_id: str,
    novo_usuario: PecaUpdate,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    alterar_peca(
        uow=uow,
        peca_id=peca_id,
        novo_nome=novo_usuario.nome,
        nova_descricao=novo_usuario.descricao,
        nova_quantidade=novo_usuario.quantidade,
        novo_preco=novo_usuario.preco,
        nova_imagem=novo_usuario.imagem,
    )

    return JSONResponse(
        status_code=200,
        content={"mensagem":"Peça atualizada com sucesso!"}
    )

@router.delete("/{peca_id}")
def removendo_peca(
    peca_id: str,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    remover_peca(
        uow=uow,
        peca_id=peca_id,
    )

    return JSONResponse(
        status_code=200,
        content={"mensagem":"A peça foi excluída do sistema!"}
    )