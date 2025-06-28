import pytest
from sqlalchemy.orm import clear_mappers
from src.adapters.orm import start_mappers
from database import connection

@pytest.fixture
def session_maker():
    # Iniciando o mapemaento de ORM 
    start_mappers()

    # Introduzindo a sessionmaker
    yield connection.session_maker
    
    # Limpando mapeamento de ORM
    clear_mappers()

@pytest.fixture
def session(session_maker):
    # Criando sessão
    session = session_maker()

    # Disponibilizando sessão
    yield session

    # Fechando sessão
    session.close()