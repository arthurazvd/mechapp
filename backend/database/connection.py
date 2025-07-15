from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
import time
import os


# Configuração do banco de dados
LOCAL_URL = "postgresql://admin:admin@localhost:5555/mechapp"
DATABASE_URL = os.getenv("DATABASE_URL") or LOCAL_URL

def criar_engine_com_retry(database_url: str, tentativas: int = 10, intervalo: int = 3):
    for tentativa in range(tentativas):
        try:
            engine = create_engine(database_url)
            connection = engine.connect()
            connection.close()
            return engine
        except OperationalError as e:
            print(f"Tentativa {tentativa + 1}/{tentativas} falhou: {e}")
            time.sleep(intervalo)
    raise RuntimeError("Falha ao conectar ao banco de dados após múltiplas tentativas.")


# Criar engine
engine = criar_engine_com_retry(DATABASE_URL)

# Máquina de Sessões
session_maker = sessionmaker(
    bind=engine, 
    expire_on_commit=False,
)

# Unidade de Trabalho
from src.service.unit_of_work import UnidadeDeTrabalho
def get_uow():

    return UnidadeDeTrabalho(session_maker)