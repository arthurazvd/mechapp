from sqlalchemy import (
    Table, Column, ForeignKey,
    String, Text, Integer, DECIMAL, TIMESTAMP, Enum as SQLEnum, BLOB, func
)
from sqlalchemy.orm import registry, relationship
from src.domain.models import *
from enum import Enum
import enum

# Definindo o enum ANTES de usá-lo
class TipoUsuarioEnum(enum.Enum):
    cliente = 'cliente'
    mecanico = 'mecanico'

class StatusAgendamentoEnum(enum.Enum):
    pendente = 'pendente'
    confirmado = 'confirmado'
    concluido = 'concluido'
    cancelado = 'cancelado'

mapper_registry = registry()
metadata = mapper_registry.metadata

usuarios = Table(
    'usuarios', metadata,
    Column('id', String(36), primary_key=True),
    Column('nome', String(100), nullable=False),
    Column('email', String(100), unique=True, nullable=False),
    Column('senha', String(255), nullable=False),
    Column('tipo', SQLEnum(TipoUsuarioEnum), nullable=False),
    Column('telefone', String(15)),
    Column('created_at', TIMESTAMP, nullable=True, default=func.now()),
    Column('updated_at', TIMESTAMP, nullable=True, default=func.now()),
)

oficinas = Table(
    'oficinas', metadata,
    Column('id', String(36), primary_key=True),
    Column('usuario_id', String(36), ForeignKey('usuarios.id', ondelete='SET NULL')),
    Column('nome', String(100), nullable=False),
    Column('cnpj', String(14), nullable=False),
    Column('endereco', Text),
    Column('created_at', TIMESTAMP, nullable=True, default=func.now()),
    Column('updated_at', TIMESTAMP, nullable=True, default=func.now()),
)

pecas = Table(
    'pecas', metadata,
    Column('id', String(36), primary_key=True),
    Column('nome', String(100), nullable=False),
    Column('descricao', Text),
    Column('quantidade', Integer, nullable=False),
    Column('preco', DECIMAL(10, 2), nullable=False),
    Column('imagem', BLOB),
    Column('created_at', TIMESTAMP, nullable=True, default=func.now()),
    Column('updated_at', TIMESTAMP, nullable=True, default=func.now()),
)

servicos = Table(
    'servicos', metadata,
    Column('id', String(36), primary_key=True),
    Column('oficina_id', String(36), ForeignKey('oficinas.id', ondelete='CASCADE'), nullable=False),
    Column('nome', String(100), nullable=False),
    Column('descricao', Text),
    Column('tempo', Integer, nullable=False),
    Column('preco_max', DECIMAL(10, 2)),
    Column('preco_min', DECIMAL(10, 2)),
    Column('created_at', TIMESTAMP, nullable=True, default=func.now()),
    Column('updated_at', TIMESTAMP, nullable=True, default=func.now()),
)

agendamentos = Table(
    'agendamentos', metadata,
    Column('id', String(36), primary_key=True),
    Column('cliente_id', String(36), ForeignKey('usuarios.id', ondelete='SET NULL')),
    Column('servico_id', String(36), ForeignKey('servicos.id', ondelete='CASCADE'), nullable=False),
    Column('data', TIMESTAMP, nullable=False),
    Column('status', SQLEnum(StatusAgendamentoEnum), nullable=False),
    Column('created_at', TIMESTAMP, nullable=True, default=func.now()),
    Column('updated_at', TIMESTAMP, nullable=True, default=func.now()),
)

avaliacoes = Table(
    'avaliacoes', metadata,
    Column('id', String(36), primary_key=True),
    Column('cliente_id', String(36), ForeignKey('usuarios.id', ondelete='CASCADE'), nullable=False),
    Column('servico_id', String(36), ForeignKey('servicos.id', ondelete='CASCADE'), nullable=False),
    Column('nota', Integer, nullable=False),
    Column('comentario', Text),
    Column('data', TIMESTAMP, nullable=False),
    Column('created_at', TIMESTAMP, nullable=True, default=func.now()),
    Column('updated_at', TIMESTAMP, nullable=True, default=func.now()),
)

pecas_do_agendamento = Table(
    'pecas_do_agendamento', metadata,
    Column('id', String(36), primary_key=True),
    Column('agendamento_id', String(36), ForeignKey('agendamentos.id', ondelete='SET NULL')),
    Column('peca_id', String(36), ForeignKey('pecas.id', ondelete='CASCADE'), nullable=False),
    Column('quantidade', Integer, nullable=False),
    Column('created_at', TIMESTAMP, nullable=True, default=func.now()),
    Column('updated_at', TIMESTAMP, nullable=True, default=func.now()),
)

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

    # Peças do Agendamento
    mapper_registry.map_imperatively(
        PecaDoAgendamento,
        pecas_do_agendamento,
        properties={
            'peca': relationship(
                Peca,
                primaryjoin=pecas_do_agendamento.c.peca_id == pecas.c.id
            ),
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
                PecaDoAgendamento,
                primaryjoin=agendamentos.c.id == pecas_do_agendamento.c.agendamento_id,
                uselist=True,
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