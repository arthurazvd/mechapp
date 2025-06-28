from sqlalchemy import MetaData
from sqlalchemy.orm import registry, relationship
from database.connection import engine
from src.domain.models import *


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
mapper_registry = registry()

def start_mappers():
    """
    Função de mapeamento entre as relações do banco de dados e os objetos Python.
    Utilize sempre que iniciar a aplicação.
    """

    # Usuários
    mapper_registry.map_imperatively(
        Usuario,
        usuarios,
    )

    # Oficinas
    mapper_registry.map_imperatively(
        Oficina,
        oficinas,
        properties={
            'proprietario': relationship(
                Usuario,
                primaryjoin=oficinas.c.usuario_id == usuarios.c.id,
            )
        }
    )

    # Peças
    mapper_registry.map_imperatively(
        Peca,
        pecas,
    )

    # Serviços
    mapper_registry.map_imperatively(
        Servico,
        servicos,
        properties={
            'oficina': relationship(
                Oficina,
                primaryjoin=servicos.c.oficina_id == oficinas.c.id
            )
        }
    )

    # Agendamentos
    mapper_registry.map_imperatively(
        Agendamento,
        agendamentos,
        properties={
            'cliente': relationship(
                Usuario,
                primaryjoin=agendamentos.c.cliente_id == usuarios.c.id,
            ),
            'servico': relationship(
                Servico,
                primaryjoin=agendamentos.c.servico_id == servicos.c.id,
            ),
            'pecas_do_agendamento': relationship(
                Peca,
                secondary=pecas_do_agendamento,
                primaryjoin=agendamentos.c.id == pecas_do_agendamento.c.agendamento_id,
                secondaryjoin=pecas_do_agendamento.c.peca_id == pecas.c.id,
            ),
        }
    )

    # Avaliações
    mapper_registry.map_imperatively(
        Avaliacao,
        avaliacoes,
        properties={
            'cliente': relationship(
                Usuario,
                primaryjoin=avaliacoes.c.cliente_id == usuarios.c.id,
            ),
            'servico': relationship(
                Servico,
                primaryjoin=avaliacoes.c.servico_id == servicos.c.id,
            ),
        }
    )