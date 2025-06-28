from uuid import uuid4
from dataclasses import dataclass, field
from datetime import datetime

from .value_objects import *
from .exceptions import *

@dataclass
class Usuario:
    nome: str
    email: str
    senha: str
    tipo: TipoUsuario
    telefone: str | None = None
    id: str = field(default_factory=lambda: str(uuid4()))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
            "senha": self.senha,
            "tipo": str(self.tipo),
            "telefone": self.telefone,
        }

@dataclass
class Peca:
    nome: str
    descricao: str
    quantidade: int
    preco: float
    imagem: bytes
    id: str = field(default_factory=lambda: str(uuid4()))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "nome": self.nome,
            "descricao": self.descricao,
            "quantidade": self.quantidade,
            "preco": self.preco,
            "imagem": self.imagem.hex() if self.imagem else None,
        }

@dataclass
class Oficina:
    nome: str
    cnpj: str
    endereco: str
    proprietario: Usuario
    id: str = field(default_factory=lambda: str(uuid4()))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "nome": self.nome,
            "cnpj": self.cnpj,
            "endereco": self.endereco,
            "proprietario": self.proprietario.to_dict(),
        }

@dataclass
class Servico:
    nome: str
    descricao: str
    tempo: int
    preco_min: float
    preco_max: float
    oficina: Oficina
    id: str = field(default_factory=lambda: str(uuid4()))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "nome": self.nome,
            "descricao": self.descricao,
            "tempo": self.tempo,
            "preco_min": self.preco_min,
            "preco_max": self.preco_max,
            "oficina": self.oficina.to_dict(),
        }

@dataclass
class PecaDoAgendamento:
    peca: Peca
    quantidade: int
    id: str = field(default_factory=lambda: str(uuid4()))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "peca":self.peca.to_dict(),
            "quantidade":self.quantidade,
        }

@dataclass 
class Agendamento:
    data: datetime
    status: StatusAgendamento
    cliente: Usuario
    servico: Servico
    pecas_do_agendamento: list[PecaDoAgendamento]
    id: str = field(default_factory=lambda: str(uuid4()))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "data": self.data.isoformat(),
            "status": self.status.value,
            "cliente": self.cliente.to_dict(),
            "servico": self.servico.to_dict(),
            "pecas_do_agendamento": [peca.to_dict() for peca in self.pecas_do_agendamento],
        }

@dataclass
class Avaliacao:
    nota: NotaAvaliacao
    comentario: str
    data: datetime
    cliente: Usuario
    servico: Servico
    id: str = field(default_factory=lambda: str(uuid4()))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "nota": self.nota.value,
            "comentario": self.comentario,
            "data": self.data.isoformat(),
            "cliente": self.cliente.to_dict(),
            "servico": self.servico.to_dict(),
        }