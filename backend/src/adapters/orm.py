from sqlalchemy import MetaData
from database.connection import engine

metadata = MetaData()
metadata.reflect(bind=engine)

# Tabelas já geradas
usuarios = metadata.tables['usuarios']
oficinas = metadata.tables['oficinas']
pecas = metadata.tables['pecas']
servicos = metadata.tables['servicos']
agendamentos = metadata.tables['agendamentos']
avaliacoes = metadata.tables['avaliacoes']
pecas_do_agendamento = metadata.tables['pecas_do_agendamento']

# Mapeando relações