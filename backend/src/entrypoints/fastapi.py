from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager

from sqlalchemy.orm import clear_mappers

from database.mapper import ERROR_MAPPER
from database.connection import engine
from src.domain.exceptions import DomainError
from src.adapters.orm import start_mappers, metadata

from .routes import *

# Configurar banco de dados
@asynccontextmanager
async def lifespan(app: FastAPI):
    start_mappers()                 # Iniciar mapeando banco de dados
    metadata.create_all(engine)     # Criar banco de dados caso necessário
    yield                           # Aplicação On/Off
    clear_mappers()                 # Limpar mapeando de banco de dados

# Aplicação FastAPI
app = FastAPI(title="MechApp", lifespan=lifespan)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Adicionando rotas
app.include_router(usuario_router)
app.include_router(peca_router)
app.include_router(oficina_router)

# Error Handling
@app.exception_handler(DomainError)
async def value_error_handler(request: Request, exc: DomainError):
    """
    Exception handler para não precisar colocar try e except em cada uma das rotas da aplicação.

    Args:
        request (Request): Request que é reconhecido quando a exceção sobe.
        exc (DomainError): tipo de erro esperado, nesse caso, todos os DomainError
    """

    # Recuperando erro mapeado
    error_mapped = ERROR_MAPPER.get(exc.__class__.__name__, {
        "error":"Erro não encontrado.",
        "message":"Erro não mapeado.",
    })

    # Mensagem de erro padrão ou genérica
    mensagem = str(exc) or error_mapped['message']

    # Retornando json com status code, nome do erro e mensagem de erro
    return JSONResponse(
        status_code=error_mapped['status_code'],
        content={"error": exc.__class__.__name__, "mensagem": mensagem},
    )