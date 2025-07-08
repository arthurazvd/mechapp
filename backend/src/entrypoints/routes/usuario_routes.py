from src.service.unit_of_work import UnidadeDeTrabalho
from src.service import (
    criar_usuario,
    alterar_usuario,
    remover_usuario,
    consultar_usuario,
    autenticar,
)
from database.connection import get_uow
from pydantic import BaseModel
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse


class AutenticacaoModel(BaseModel):
    email: str
    senha: str

class UsuarioCreate(BaseModel):
    nome: str
    email: str
    senha: str
    tipo: str = "CLIENTE"
    telefone: str | None = None

class UsuarioUpdate(BaseModel):
    nome: str | None = None
    email: str | None = None
    senha: str | None = None
    telefone: str | None = None
    tipo: str | None = None

router = APIRouter(
    prefix="/usuario",
    tags=["Usuarios"],
)

@router.post("/registrar")
def criacao_de_usuario(
    usuario: UsuarioCreate,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    id = criar_usuario(
        uow=uow,
        nome=usuario.nome,
        tipo=usuario.tipo,
        email=usuario.email,
        senha=usuario.senha,
        telefone=usuario.telefone,
    )

    return JSONResponse(
        status_code=201,
        content={"mensagem":"Sucesso ao criar usuário!","id":id}
    )

@router.post("/autenticar")
def autenticacao_de_usuario(
    usuario: AutenticacaoModel,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    usuario = autenticar(
        uow=uow,
        email=usuario.email,
        senha=usuario.senha,
    )

    return JSONResponse(
        status_code=200,
        content=usuario,
    )

@router.get("/{usuario_id}", response_model=dict)
def recuperando_usuario(
    usuario_id: str,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    usuario = consultar_usuario(
        uow=uow,
        usuario_id=usuario_id,
    )

    return JSONResponse(
        status_code=200,
        content=usuario
    )

@router.patch("/{usuario_id}")
def atualizando_usuario(
    usuario_id: str,
    novo_usuario: UsuarioUpdate,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    alterar_usuario(
        uow=uow,
        usuario_id=usuario_id,
        novo_nome=novo_usuario.nome,
        novo_email=novo_usuario.email,
        nova_senha=novo_usuario.senha,
        novo_telefone=novo_usuario.telefone,
        novo_tipo=novo_usuario.tipo,
    )

    return JSONResponse(
        status_code=200,
        content={"mensagem":"Usuário atualizado com sucesso!"}
    )

@router.delete("/{usuario_id}")
def removendo_usuario(
    usuario_id: str,
    uow: UnidadeDeTrabalho = Depends(get_uow),
):
    remover_usuario(
        uow=uow,
        usuario_id=usuario_id,
    )

    return JSONResponse(
        status_code=200,
        content={"mensagem":"O usuário foi excluído do sistema!"}
    )