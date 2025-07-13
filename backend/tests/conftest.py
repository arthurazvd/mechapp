import pytest
from sqlalchemy import StaticPool, create_engine, event
from sqlalchemy.orm import sessionmaker, clear_mappers
from src.adapters.orm import start_mappers, metadata
from .mocks import mock_criar_oficina, mock_criar_usuario, mock_criar_servico, mock_criar_avaliacao

# ==================
# FIXTURES DE SQLITE
# ==================

@pytest.fixture
def in_memory_db():
    # Engine criada
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False}, 
        poolclass=StaticPool,
    )

    # Habilita foreign keys para SQLite
    def enable_foreign_keys(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()
    
    event.listen(engine, "connect", enable_foreign_keys)

    # Criando tabelas do banco de dados
    metadata.create_all(engine)
    
    # Generator a engine para ficar em lazy memory
    yield engine

    # Encerrando engine
    engine.dispose()

@pytest.fixture
def session_maker(in_memory_db):
    # Iniciando o mapemaento de ORM 
    start_mappers()

    # Introduzindo a sessionmaker
    yield sessionmaker(bind=in_memory_db, expire_on_commit=False)
    
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