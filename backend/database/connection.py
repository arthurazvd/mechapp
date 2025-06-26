import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Configuração do banco de dados
LOCAL_URL = "postgresql://admin:admin@localhost:5555/mechapp"
DATABASE_URL = os.getenv("DATABASE_URL") or LOCAL_URL

# Criar engine
engine = create_engine(DATABASE_URL)